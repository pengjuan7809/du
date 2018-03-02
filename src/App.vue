<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  components: {
    Loading
  },  
   computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  }, 
  mounted () {
  },
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果
  watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
html, body,#app {
  height: 100%;
  width: 100%;
  // overflow-x: hidden;
}
body {
  background-color: #f5f5f5;
}
.child-view {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
