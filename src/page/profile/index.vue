<template>
    <div  class="rating_page" >
<x-header :left-options="{showBack: false}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">我的</x-header>
<div class="user">
     <router-link :to="{path:'/profile/info'}" v-if="userInfo">
     <img :src="userInfo.user_photo" class="privateImage">
      <span >
        {{userInfo.user_name}}
        <!-- <button class="quitlogin"  @click.stop.prevent="outLogin">退出登录</button> -->
    </span>
    </router-link>
    <span v-else>
      <router-link :to="{name:'Login'}"  style="color:#fff"> 登录 </router-link>
    </span>     
</div>
<div class="or">
       <card  :header="{title: '我的订单'}" @click.native="openOrder">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span> <img   src="/src/assets/logo.png" width="40"></span>
          <br/>
          待付款
        </div>
        <div class="vux-1px-r">
          <span><img   src="/src/assets/logo.png" width="40"></span>
          <br/>
          待发货
        </div>
        <div class="vux-1px-r">
          <span><img   src="/src/assets/logo.png" width="40"></span>
          <br/>
          已发货
        </div>
        <div>
          <span><img   src="/src/assets/logo.png" width="40"></span>
          <br/>
          售后
        </div>
      </div>
    </card>    
</div>

    <panel header="标题X" :list="list" type="3"></panel>
    <panel header="标题X" :list="list2" type="3"></panel>    
    <foot :sel="sel"> </foot>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>  
    </div>
</template>

<script>
import {mapGetters,mapState, mapActions,mapMutations} from 'vuex' 
import {removeStore,getStore} from '@/config/mUtils'
import foot from "../../components/foot";
import { Grid, GridItem, XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon,XButton, Group, Cell, CellBox,Panel,Card} from 'vux'
    export default {
        data(){
            return {
                sel:4,
      list: [{
        src: '/src/assets/logo.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '收货地址',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/order'
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '浏览记录',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/profile',
          replace: false
        }
      },{
        src: '/src/assets/logo.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '关于我们',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/profile'
      }],
      list2: [{
        src: '/src/assets/logo.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '收货地址',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/profile'
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '浏览记录',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/profile',
          replace: false
        }
      }]      
            }
				},
    components:{
    Grid, GridItem, XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon,XButton, Group, Cell, CellBox ,Panel,foot,Card
    },
      mounted(){
        this.initData()
      },    
    computed: {
    ...mapState(['userInfo']),
   // ...mapGetters(['currentUser'])
    },    
    methods:{
        ...mapActions([
            'getUserInfo'
        ]),
        ...mapMutations([
            'OUT_LOGIN'
        ]),
        initData(){
          let _this=this;
          if (!getStore('userInfo')) {
            return;
          }
          _this.$http.get('/userinfo',{
            params:{
              uId:JSON.parse(getStore('userInfo')).user_id
            }
          }).then((res)=>{
              _this.getUserInfo(res.data);
          },(err)=>{
              console.log(err);
          })          
        },
        outLogin(){            
            this.OUT_LOGIN();
                this.$router.go(-1);
                removeStore('user_id')
        },
        openOrder(){
          this.$router.push('/order')
        }        

    }				
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/style/mixin';
  
    .rating_page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 1;
  padding: 44px 0 56px;
  overflow: auto;
  box-sizing: border-box
    }
 
.privateImage {
    display: inline-block;
    width: 5em;
    height: 5em;
    border-radius: 50%;
    vertical-align: middle;
}

    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
    .user{
        padding: 30px;
        background-color: #de181b;
        span{
            color: #ffffff;
            font-size: 16px
        }
    }
 .card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
</style>
