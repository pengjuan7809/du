<template>
    <div class="confirmOrderContainer" style="  padding-top: 46px;  padding-bottom: 55px;">
<x-header :left-options="{backText: ''}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">确认订单</x-header>

    <group>
      <cell title="彭娟娟 188****5324" :link="{path:'/confirmOrder/chooseAddress'}" inline-desc='北京昌平区六环以内沙河镇沙阳路北科院励行楼307 '></cell>
    </group>
    <group title="">
      <cell title="优惠" link="/confirmOrder/chooseAddress"  >    赠品      </cell>
      <cell title="发票信息" :link="{path:'/confirmOrder/chooseAddress'}"  >电子发票个人 商品明细</cell>
      <cell title="京豆" link="/confirmOrder/chooseAddress"  ><em>共有790个<br>不够1000整数倍，不可用</em></cell>
    </group>
		<footer class="cart_footer">
		    <div class="count_money_box">
		        <div class="heji">
		            <strong>合计:</strong>
		            <strong>￥</strong>
		            <strong>58.36</strong>
		        </div>		            
                <router-link :to="{path:'/confirmOrder/payment'}"  class="go_pay">                       
                    <span>提交订单</span> 
                </router-link>
		           
		    </div>
		</footer>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>            
    </div>
</template>

<script>
import { XHeader,Cell, Group } from 'vux'
    export default {
        data(){
            return {

            }
				},
    components:{
    XHeader,Cell, Group
    },				
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

.cart_footer {
    width: 100%;
    height: 50px;
    border-top: 1px solid #cccccc;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
}
.count_money_box .go_pay {
    position: absolute;
    right: 0;
    top: 0;
    max-width: 98px;
    line-height: 50px;
    text-align: center;
    background: #f23030;
    color: #fff;
    font-size: 16px;
    height: 49px;
    margin-top: 1px;
    padding: 0 16px;
}
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
