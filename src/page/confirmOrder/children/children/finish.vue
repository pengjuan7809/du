<template>
    <div  class="rating_page" >
<x-header :left-options="{backText: '返回'}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">支付完成</x-header>
 
<br><br><br>
 <msg title="完成订单" description="内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现"   icon="success"></msg>
<!-- <router-link :to="{path:'/home'}"  class="go_pay">                       
    <span>查看订单</span> 
</router-link> -->
   <x-button  link="/home" type="primary">查看订单</x-button>
    </div>
</template>

<script>
import { XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon ,Msg ,XButton} from 'vux'
    export default {
        data(){
            return {

            }
				},
    components:{
    XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon ,Msg,XButton
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

</style>
