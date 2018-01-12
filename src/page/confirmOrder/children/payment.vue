<template>
    <div  class="rating_page" >
<x-header :left-options="{backText: '返回'}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">在线支付</x-header>
 
<br><br><br>
 支付宝 微信

<x-button  link="/confirmOrder/payment/finish" type="primary">确认支付</x-button>

         <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>  
    </div>
</template>

<script>
import { XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon,XButton} from 'vux'
    export default {
        data(){
            return {

            }
				},
    components:{
    XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon,XButton 
    },
    methods:{
                    //选择地址
            chooseAddress(){
               // this.CHOOSE_ADDRESS({address, index});
                this.$router.go(-1);
            },
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
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
