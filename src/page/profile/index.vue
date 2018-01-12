<template>
    <div  class="rating_page" >
<x-header :left-options="{showBack: false}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">我的</x-header>
   <group>
    <cell-box  >
     <img   src="http://cangdu.org:8001/img/160d8a71df11850.png" class="privateImage">
     彭娟娟<br>125845696
      <div v-if="userInfo">
        {{userInfo.user_name}}
        <button class="quitlogin"  @click.stop.prevent="outLogin">退出登录</button>
    </div>
    <div v-else>
      <router-link :to="{name:'Login'}"> login </router-link>
    </div>     
    </cell-box>
  </group>
    <grid>
      <grid-item link="/profile" label="我的额度">
        <img slot="icon" src="/src/assets/logo.png">
      </grid-item>
      <grid-item :link="{ path: '/profile'}" label="我的优惠">
        <img slot="icon" src="/src/assets/logo.png">
      </grid-item>
      <grid-item link="/profile">
        <img slot="icon" src="/src/assets/logo.png">
        <span slot="label">我的积分</span>
      </grid-item>
    </grid>
    <panel header="" :list="list" type="3"></panel>
<!-- <x-button  link="/profile/info" type="primary">信息</x-button> -->
<foot :sel=sel> </foot>
         <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>  
    </div>
</template>

<script>
import {mapGetters,mapState, mapActions,mapMutations} from 'vuex' 
    import {removeStore} from '@/config/mUtils'
import foot from "../../components/foot";
import { Grid, GridItem, XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon,XButton, Group, Cell, CellBox,Panel} from 'vux'
    export default {
        data(){
            return {
                sel:4,
      list: [{
        src: '/src/assets/logo.png',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '我的订单',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/order'
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '我的浏览记录',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/profile',
          replace: false
        }
      }]
            }
				},
    components:{
    Grid, GridItem, XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon,XButton, Group, Cell, CellBox ,Panel,foot
    },
      mounted(){
          //获取用户信息
          this.getUserInfo(); 
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
        outLogin(){
            
            this.OUT_LOGIN();
                this.$router.go(-1);
                removeStore('user_id')            
 
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
        background-color: #fff;
        z-index: 1;
  padding: 44px 0 56px;
  overflow: auto;
  box-sizing: border-box
    }
 
.privateImage {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
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
</style>
