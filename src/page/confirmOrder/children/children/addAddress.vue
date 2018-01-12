<template>
    <div  class="rating_page">
<x-header :left-options="{backText: '返回'}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">添加地址</x-header>

    <group title=" " label-width="5.5em" label-margin-right="2em" label-align="justify">
      <x-input title="收货人" v-model="value1"></x-input>
      <x-input title="联系方式" v-model="value2"></x-input>
      <x-address title="地址选择" v-model="addressValue" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address>
      <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea>
      <cell title="地址标签" value="value" >
    <div class="box">
      <checker v-model="demo1" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
      <checker-item value="1">公司</checker-item>
      <checker-item value="2">学校</checker-item>
      <checker-item value="3">家</checker-item>
      <checker-item value="4">自定义</checker-item>
      </checker>
      <br>
      <span>{{ demo1 }}</span>
      <br>
    </div>                    
          </cell>
               
    </group>
  <x-button type="primary"   @click.native="saveAddress">确认</x-button>
    </div>
</template>

<script>
import {XButton, Checker, CheckerItem,XHeader,  GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch } from 'vux'
    export default {
        data(){
            return {
        addressData: ChinaAddressData,
        addressValue: ['广东省', '深圳市', '南山区'],
        value1: '张三',
        value2: '15589658658',
        demo1: '2',
            }
				},
    components:{
    XButton,Checker, CheckerItem,XHeader,
      Group,
      GroupTitle,
      Cell,
      XInput,
      Selector,
      PopupPicker,
      XAddress,
      Datetime,
      XNumber,
      XTextarea,
      XSwitch    
    },
    methods:{
        saveAddress(){
            // this.CHOOSE_ADDRESS({address, index});
          //  this.$router.go(-1);
            this.$router.push('/confirmOrder');
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
        padding-top: 46px;
    }
.box {
  padding: 0 15px;
}
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.demo1-item-selected {
  border: 1px solid green;
}
</style>
