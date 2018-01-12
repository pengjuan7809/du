<template>
<div class="detail">
<x-header :left-options="{backText: ''}">商品详情</x-header>
 <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>

    <group title="选择">
      <x-number title="数量" :value="1" :min="1" @on-change="change"></x-number>
    </group>

  <x-button @click.native="showPosition('middle')" type="primary">加入购物车</x-button>
  <x-button  link="/cart" type="primary">购物车</x-button>
<toast v-model="showPositionValue"   :time="2000"  is-show-mask :position="position"  @on-hide="onHide">加入购物车成功</toast>

</div>


</template>


<script>
import {cats,cat} from '../../service/getData'
import { XHeader,Tabbar, TabbarItem,Grid, GridItem,Scroller,LoadMore ,Swiper,Group, XNumber,XButton ,Toast} from 'vux'
const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/3.jpg',
  title: '送你一次旅行'
}]
export default {
name: 'detail',
data() {
  return {
    value: '',
    // 默认数据
    cat1: [],
    catFdq: [],
    cat3: [],
    sub896:false,
    sub3744:false,
      onFetching: false,
      bottomCount: 20,
      demo01_list: baseList,
      demo01_index: 0,
      position: 'default',
      showPositionValue: false

  }
},
    components:{
 XHeader,Tabbar, TabbarItem,Grid, GridItem,Scroller,LoadMore,Swiper,Group, XNumber,XButton ,Toast
    },
created() {
        //获取分类
        cats().then(res => {
            this.cat1 = res.count;
        })
        this.sub896=true
},
mounted(){
        //获取废电器
        cat('896').then(res => {
            this.catFdq = res.count;
        })
        //获取报废汽车
        cat('3744').then(res => {
            this.cat3 = res.count;
        })
},
methods: {
	chang(e){

	  if(e==896){
	this.sub896=true;this.sub3744=false;
	  }else if(e==3744){
	this.sub896=false;this.sub3744=true;
	  }else{
	this.sub896=false;this.sub3744=false;
	  }

	},
    demo01_onIndexChange (index) {
      this.demo01_index = index
    },
    change (val) {
      console.log('change', val)
    }  ,
    showPosition (position) {
      this.position = position
      this.showPositionValue = true
    },
    onHide () {
      console.log('on hide')
    },
}


}

</script>


<style lang="scss" scoped>
.left{
  width:33%;
  height: 100%;
  float:left;
      overflow-y: auto;
      border-right: 1px solid #000000;
      li{
        height:60px;
      }

}
.right{
  width:66%;
  height: 100%;
  float:left;
      overflow-y: auto;
            li{
        min-height:70px;
        p{
          height: 60px;
        }
      }
}
.cat {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 53px;
    left: 0;
}
.weui-tabbar{position: fixed}
.list-tab{
	overflow: hidden;
	li{float: left;width: 25%;list-style-type: none;text-align: center;}
}
.grid-center {
  display: block;
  text-align: center;
  color: #666;
  img{
    width: 80%
  }
}
</style>
