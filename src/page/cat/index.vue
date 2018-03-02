<template>
  <div class="catWrapper">
    <x-header :left-options="{backText: ''}"  style="position:fixed;left:0;right:0;top:0;z-index:100;">分类</x-header>     
    <section class="menu_container">
        <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
            <ul>
                <li  v-for="(item,i) in catDatas" :key="i" class="menu_left_li" :class="{activity_menu: i == menuIndex}" @click="chooseMenu(i)">
                        <span>{{item.category_name}}</span>                   
                </li>
            </ul>
        </section>
        <section class="menu_right" ref="menuFoodList">
            <ul>
                <li v-for="(item,i) in catDatas" :key="i" ref="foodList">
                   <h3><router-link :to="{path:'/list/'+item.category_id}">{{item.category_name}}</router-link></h3> 
                    <div class="category-style-1">
                        <template v-for="(good,index) in goodDatas" >
                             <router-link v-if="good.category_id==item.category_id"  :to="{path: '/detail/'+good.product_id}">
                                <img :src="good.product_img_url" alt="">
                                <span>{{good.product_name}}</span>
                             </router-link>
                        </template>
                    </div>                  
                </li>
            </ul>
        </section>
    </section>
<foot :sel="sel"></foot>     
  </div>
</template>

<script>
import { XHeader,Tabbar, TabbarItem } from 'vux'
import foot from "../../components/foot";
import BScroll from 'better-scroll'
import { setTimeout } from 'timers';
export default {
  data(){
    return {
      sel:1,
      menuIndex: 0, //已选菜单索引值，默认为0
      shopListTop: [], //商品列表的高度集合
      menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
      catDatas:[],
      goodDatas:[]
    }
  },
  created(){
    this.getCatDatas();
  },
  mounted(){                 
                    
  },
    components:{
        XHeader,foot
    },   
  methods: {     
    getCatDatas(){
        let _this=this;
        _this.$http.get('/category').then((res)=>{
            _this.catDatas=res.data;  
               
        },(err)=>{
            console.log(err);        
        });
        _this.$http.get('/goods').then((res)=>{
            _this.goodDatas=res.data;
      // DOM 还没有更新       
      this.$nextTick(function () {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        _this._calculateHeight();
      })            
         //   console.log(_this.goodDatas)   
        },(err)=>{
            console.log(err);        
        })            
        
    },
            //获取食品列表的高度，存入shopListTop
            _calculateHeight(){
                const listContainer = this.$refs.menuFoodList;
                // let foodList = this.$refs.foodList;
                
                const listArr = Array.from(listContainer.children[0].children);
               // console.log(listArr)
                listArr.forEach((item, index) => {
                    this.shopListTop[index] = item.offsetTop;
                });
                this.listenScroll(listContainer)
               // console.log(this.shopListTop)
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
                            this.menuIndex = index;
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
                this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
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
// .catWrapper{
//   padding: 44px 0 56px;
//   box-sizing: border-box;
//   height: auto;
// }
.menu_container {
    display: flex;
    position: absolute;
    top: 46px;
    bottom: 56px;
    width: 100%;
    overflow-y: hidden;
}
.menu_left{
  width: 20%;
  float: left;
  background-color: #fff;
  margin-right: 10px;
  li{
    height: 50px;
  }
}
.menu_right{
  width: 80%;
  float: left;
  margin-right: 10px;  
  li{
    list-style: none;
    div.category-style-1{
background-color: #fff;
margin: 5px 0 20px;
      a{
width: 33%;
display: inline-block;
text-align: center;
img{
    width: 55px;
    height: 55px;
}
span{
    display: block;
    text-align: center;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
  } 
        
    }   
}
}
.menu_container .menu_left .activity_menu {
    border-left: 0.15rem solid #3190e8;
    background-color: #fff;
}
</style>
