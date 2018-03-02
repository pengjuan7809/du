<template>
  <div class="foot">
    <tabbar v-model="selecte">
      <tabbar-item link="/home">
        <x-icon type="home" size="30"  slot="icon"></x-icon>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot   link="/cat">      
        <x-icon type="navicon-round" size="30"  slot="icon"></x-icon>
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item  link="/faxian">
      <x-icon type="compass" size="30"  slot="icon"></x-icon>
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item badge="2"   link="/cart">
        <x-icon type="android-cart" size="30"  slot="icon"></x-icon>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item badge="2"  link="/profile">
        <x-icon type="person" size="30"  slot="icon"></x-icon>
        <span slot="label">我的</span>
      </tabbar-item>
      <tabbar-item  link="/baidu">
        <x-icon type="person" size="30"  slot="icon"></x-icon>
        <span slot="label">地图</span>
      </tabbar-item>      
    </tabbar>
  </div>
</template>

<script>
import {Tabbar, TabbarItem} from 'vux'
export default {
  props: {
    sel: {
      type: Number,
      required: true,
    }   
  }, 
  // props:['sel'] ,
  data () {
    return {
         selecte:this.sel 
    }
  },
  mounted(){
// console.log(this.sel);

  },
  components:{
    Tabbar, TabbarItem
  },  
    methods: {
  
    },
        watch: {
            selected: function (value) {
                if (value) {
                    this.$router.push(value);
                }
            }
        }      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.vux-x-icon path {
  fill: #999;
}
.weui-tabbar__item.weui-bar__item_on .vux-x-icon path {
  fill: #f23030;
}
.weui-tabbar{position: fixed;bottom: 0;left: 0;right: 0}
</style>
