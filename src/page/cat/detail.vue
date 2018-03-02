<template>
<div class="detail">
    <x-header title="slot:overwrite-title" style="position:fixed;left:0;right:0;top:0;z-index:100;">
      <div class="overwrite-title-demo" slot="overwrite-title">
        <button-tab v-model="demo01">
          <button-tab-item selected @on-item-click="consoleIndex()">商品</button-tab-item>
          <button-tab-item @on-item-click="consoleIndex()">详情</button-tab-item>
        </button-tab>
      </div>
    </x-header>
<!-- <x-header :left-options="{backText: ''}">商品详情</x-header> -->
<div :style="{width:wid*2+'px',height:'100%',transform: 'translate3d('+juli+'px, 0px, 0px)',transition:'300ms ease',overflow:'hidden'}"   ref="itemList">
  <div class="header-slider-item"  :style="{width:wid+'px'}">
    <swiper  height="370px">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in goodsImages" :key="index"><img :src="item.image_url"></swiper-item>
    </swiper>

    <h1 class="tit">{{goodsData.product_name}}</h1>
    <div class="price">{{goodsData.product_price}}元</div>
    
    <div v-transfer-dom>
      <popup v-model="show13" position="bottom" max-height="50%">
        <group title="请选择">
          <x-number title="数量" :value="1" :min="1" @on-change="change" fillable></x-number>
        </group> 
        <span style="font-size:14px;color:#999999;margin-left:15px">选择类型</span>
        <checker
          v-model="demo5"
          default-item-class="demo5-item"
          selected-item-class="demo5-item-selected"
          >
        <checker-item v-for="i in ['红', '绿', '蓝']" :key="i" :value="i">{{i}}</checker-item>    
        </checker>       
        <div style="padding: 15px;">
          <x-button @click.native="showPosition('middle')"  type="warn"> 加入 </x-button>
        </div>
      </popup>
    </div>
    
  </div>
  <div class="header-slider-item" :style="{width:wid+'px'}"> 
    <p>{{goodsData.product_detail}}</p> 
    <p v-for="(item, index) in goodsImages" :key="index">
      <img :src="item.image_url" alt="" width="100%">
    </p>
  </div>
</div>

<toast v-model="showPositionValue"   :time="3000"  is-show-mask :position="position"  @on-hide="onHide">加入购物车成功</toast>
    <footer v-show="!demo01">
      <router-link :to="{path:'/cart'}" class="left"><x-icon type="ios-cart" size="22"></x-icon><span>购物车</span></router-link>
      <!-- <router-link :to="{path:'/cart'}" v-on:click.stop.prevent="show13=true" class="right">加入购物车</router-link> -->
      <a href="#/cart" v-on:click.stop.prevent="joincart()"  class="right">加入购物车</a>
      
    </footer>
</div>
</template>
<script>
import {cats,cat} from '../../service/getData'
import {removeStore,getStore} from '@/config/mUtils'
import { Checker, CheckerItem,TransferDom, Popup,XHeader,Tabbar, TabbarItem,Grid, GridItem,Scroller,LoadMore ,Swiper,SwiperItem,Group, XNumber,XButton ,Toast,Cell, ButtonTab, ButtonTabItem } from 'vux'
export default {
name: 'detail',
data() {
  return {
    itemHei:[],
    value: '',
    show13: false,
    cat1: [],
    catFdq: [],
    cat3: [],
    sub896:false,
    sub3744:false,
      onFetching: false,
      bottomCount: 20,
      position: 'default',
      showPositionValue: false,
      demo5: '绿',
      demo01:0,
      wid:100,
      hei:0,
      juli:0 ,
      goodsImages:[],
      goodsData:{},
      goodsNums:1,

  }
},
  computed: {
    goodsNum: function () {
      return this.goodsNums
    }
  },
  directives: {
    TransferDom
  },
    components:{
 Checker, CheckerItem,Popup, XHeader,Tabbar, TabbarItem,Grid, GridItem,Scroller,LoadMore,Swiper,SwiperItem,Group, XNumber,XButton ,Toast,Cell, ButtonTab, ButtonTabItem 
    },
created() {
 this.fetchData(this.$route.params.id);
},
mounted(){
  this.wid=document.body.clientWidth;
  // const listContainer = this.$refs.itemList.children;
  // const listArr = Array.from(listContainer);
  // listArr.forEach((item, index) => {
  //     this.itemHei[index] = item.clientHeight;
  // });
 
},
methods: {
         fetchData(id){
                var _this=this;                
                 _this.$http.get('/detail',{
                    params: {
                        mId: id
                    }
                }).then((res)=>{
                    _this.goodsImages = res.data[0];
                    _this.goodsData = res.data[1][0];
                },(err)=>{
                    console.log(err);
                })
            }   ,  
    change (val) {
      this.goodsNums=val;   
    }  ,
  joincart(){
    var _this=this;    
    if (getStore('userInfo')) {
      _this.show13=true
    }else{
      _this.$router.push('/login');
    }    
  },    
    showPosition (position) {
      let _this=this;
          _this.$http.post('/addcart',{
            productId:_this.$route.params.id,
            userId:JSON.parse(getStore('userInfo')).user_id,
            goodsNum:_this.goodsNums
          }).then((res)=>{
            _this.position = position
            _this.showPositionValue = true
            _this.show13=false
          },(err)=>{
            console.log(err);
          })          
    },
    onHide () {
      console.log('on hide')
    },
    consoleIndex () {      
      this.juli=-document.body.clientWidth*this.demo01
    //  this.hei=this.itemHei[this.demo01];
    },
     
}


}

</script>


<style lang="scss" scoped>
.child-view{
  overflow: hidden
}
.header-slider-item{
  float: left;
  height: 100%;
  overflow: auto;    
  padding: 50px 0;
  box-sizing: border-box;
}
h1{
  font-size: 16px;
  font-weight: normal;
padding: 5px
}
.price{
  padding: 0 5px;
  color: #de181b;
  font-weight: bold
}
footer{
  background-color: #fff;
  border-top: 1px solid #dedede;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
.left{
  width: 50%;
  float: left;
  line-height: 25px;
  text-align: center;
  span{
    display: block;
    margin-top: -5px;
    color: #333
  }
}
.right{
  width: 50%;
  float: left;
  background-color: #de181b;
  color: #fff;
  text-align: center;
    line-height: 50px
}
}
.vux-x-icon {
  fill: #333;
}
.demo5-item {
  width:25%;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin: 2%;
}
.demo5-item-selected {
  background: #ffffff url(../../assets/image/active.png) no-repeat right bottom;
  border-color: #ff4a00;
}
</style>
