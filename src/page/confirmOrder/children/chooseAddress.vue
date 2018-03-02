<template>
    <div  class="rating_page" >
<x-header :left-options="{backText: '返回'}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">收货地址</x-header>
<div id="addressList" class="address_list">
    <swipeout class="vux-1px-tb">
      <swipeout-item transition-mode="follow" v-for="(item,i) in address" :key="i" >
        <div slot="right-menu">
          <swipeout-button type="warn">删除</swipeout-button>
        </div>
        <div slot="content"  @click.prevent.stop="chooseAddress(item.address_id)">
            <ul class="selected"> 
                <li class="icon"><icon  type="circle" v-if="item.isdefault !== '1'"></icon><icon  type="success" v-else></icon></li>
                <li>{{item.addressarea}}</li>
                <li><strong>{{item.sname}}</strong>{{item.user_phone}}</li>   
                <li class="edit" adid="60577497" type="1"><icon type="search"></icon>编辑</li> 
            </ul> 
        </div>
      </swipeout-item>
    </swipeout>    
</div>

<router-link :to="{path: '/confirmOrder/chooseAddress/addAddress'}" class="add_icon_footer">
<span>新增收货地址</span>
</router-link>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>  
    </div>
</template>

<script>
import { XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon  } from 'vux'
import {removeStore,getStore} from '@/config/mUtils'
export default {
    data(){
        return {
            address:[]
        }
    },
    mounted(){
        this.initData();
    },
    components:{
        XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon 
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
                _this.address=res.data;
            },(err)=>{
                console.log(err);
            })
        },        
                //选择地址
        chooseAddress(Id){
            let _this=this;
            _this.$http.post('updateaddress',{
                userId:JSON.parse(getStore('userInfo')).user_id,
                addressId:Id,

            }).then((res)=>{
                this.$router.push('/confirmOrder');
                console.log('success');
            },(err)=>{
                console.log('fail');
            })            
            
            // this.CHOOSE_ADDRESS({address, index});
           // this.$router.go(-1);
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
    ul,li{margin: 0;padding: 0;list-style: none}
    .address_list{
   position: fixed;
    top: 46px;
    bottom: 46px;
    overflow-y: auto;
    width: 100%;
    }
.address_list ul {
    padding: 15px 40px;
    position: relative;
    overflow: hidden;
}
.address_list .edit {
    color: transparent;
    width: 30px;
    position: absolute;
    top: 40%;
    right: 0;
    z-index: 2;
}
.address_list .icon {
    width: 40px;
    position: absolute;
    top: 40%;
    left: 0px;
    z-index: 2;
}
.vux-swipeout-item{
        border-bottom: 1px solid #e5e5e5;
}
.add_icon_footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.5rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
