<template>
  <div>
                    <section class="menu_container">
                        <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
                            <ul>
                                <li  v-for="i in 30" :key="i" class="menu_left_li" :class="{activity_menu: i == menuIndex}" @click="chooseMenu(i)">
      
                                    <span>{{i}}</span>
 
                                </li>
                            </ul>
                        </section>
                        <section class="menu_right" ref="menuFoodList">
                            <ul>
                                <li v-for="i in 30" :key="i" ref="foodList">
                                    {{i}}
                                </li>
                            </ul>
                        </section>
                    </section>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data(){
    return {
      menuIndex: 1, //已选菜单索引值，默认为0
      shopListTop: [], //商品列表的高度集合
      menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
    }
  },
  mounted(){
          this._calculateHeight();
  },
  methods: {
            //获取食品列表的高度，存入shopListTop
            _calculateHeight(){
                const listContainer = this.$refs.menuFoodList;
                // let foodList = this.$refs.foodList;
              //  console.log(this.$refs.foodList)
                const listArr = Array.from(listContainer.children[0].children);
                listArr.forEach((item, index) => {
                    this.shopListTop[index] = item.offsetTop;
                });
                this.listenScroll(listContainer)
              //  console.log(this.shopListTop)
            },

            //当滑动食品列表时，监听其scrollTop值来设置对应的食品列表标题的样式
            listenScroll(element){
                this.foodScroll = new BScroll(element, {
                    probeType: 3,
                    deceleration: 0.001,
                    bounce: false,
                    swipeTime: 2000,
                    click: true,
                });

                const wrapperMenu = new BScroll('#wrapper_menu', {
                    click: true,
                });

                const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
                this.foodScroll.on('scroll', (pos) => {
                    if (!this.$refs.wrapperMenu) {
                        return 
                    }
                   
                    this.shopListTop.forEach((item, index) => {
                        if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
                            this.menuIndex = index+1;
                            const menuList=this.$refs.wrapperMenu.querySelectorAll('.activity_menu');
                            const el = menuList[0];
                            wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight/2 - 50));
                        }
                    })
                })
            },
            //点击左侧食品列表标题，相应列表移动到最顶层
            chooseMenu(index){
                this.menuIndex = index;
                //menuIndexChange解决运动时listenScroll依然监听的bug
                this.menuIndexChange = false;
                this.foodScroll.scrollTo(0, -this.shopListTop[index-1], 400);
                this.foodScroll.on('scrollEnd', () => {
                    this.menuIndexChange = true;
                })
            },            
  },
  watch: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.menu_container {
    display: flex;
    position: absolute;
    top: 20px;
    bottom: 20px;
    width: 100%;
    overflow-y: hidden;
}
.menu_left{
  width: 20%;
  float: left;
  li{
    height: 50px;
  }
}
.menu_right{
  width: 80%;
  float: left;
  li{
    height: 50px;
  }  
}
.menu_container .menu_left .activity_menu {
    border-left: 0.15rem solid #3190e8;
    background-color: #fff;
}
</style>
