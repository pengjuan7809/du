<template>
    <div class="confirmOrderContainer" style="  padding-top: 46px;  padding-bottom: 55px;">
    <x-header :left-options="{showBack: false,preventGoBack:true}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">
    <router-link :to="{path:'/cart'}" slot="overwrite-left" >
    <x-icon  type="ios-arrow-back" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
    </router-link>
    确认订单
    </x-header>

    <group>
      <cell :title="address.sname +'-'+address.user_phone " :link="{path:'/confirmOrder/chooseAddress'}" :inline-desc='address.addressarea ' v-if="address"></cell>
      <cell title="请添加一个收获地址 " :link="{path:'/confirmOrder/chooseAddress/addAddress'}" inline-desc=' ' v-else></cell>
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
import {removeStore,getStore} from '@/config/mUtils'
    export default {
        data(){
            return {
                address:null
            }
        },
        mounted(){
            this.initData();
            
        },
    components:{
    XHeader,Cell, Group
    },
    methods:{
        //初始化信息
        initData(){
            let _this=this;
            _this.$http.get('/address',{
                params:{
                    userId:JSON.parse(getStore('userInfo')).user_id
                }
            }).then((res)=>{
                res.data.forEach((item,index) => {
                    if (item.isdefault=='1') {
                        _this.address=item; 
                       // console.log(_this.address);                        
                    } 
                });


            },(err)=>{
                console.log(err);
            })
        },          
    }				
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
