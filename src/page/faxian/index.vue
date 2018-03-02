<template>
  <div>
  <x-header :left-options="{backText: ''}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">发现</x-header>    
      <div class="box">
        <div class="tab">
       <tab :line-width=2 active-color='#fc378c'>
        <tab-item class="vux-center" :selected="curindex === index" v-for="(item, index) in list2" @on-item-click="onItemClick" :key="index">{{item}}</tab-item>
      </tab>
</div>
<div class="content" ref="con">
        <div v-for="(item, index) in list2" :key="index" v-show="curindex === index" class="list">
          <div>{{item}} Container
            <div v-for="src in list"  :key="src" style="background-color:yellow;text-align:center;" >
              <span style="font-size:20px;">Loading</span>
              <x-img :src="src"  @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
            </div> 
            </div>
        </div>
</div>


       


 
    </div> 
   
   
    <foot :sel="sel"></foot>
  </div>
</template>

<script>
import {XHeader, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,XImg } from 'vux'
import foot from '@/components/foot.vue'
const list = () => ['精选', '美食', '电影', '酒店', '外卖']
export default {
  data(){
    return {
      sel: 2,
       list2: list(),
       curindex: 0,
       index: 0,
      list: [
        'https://o5omsejde.qnssl.com/demo/test1.jpg',
        'https://o5omsejde.qnssl.com/demo/test2.jpg',
        'https://o5omsejde.qnssl.com/demo/test0.jpg',
        'https://o5omsejde.qnssl.com/demo/test4.jpg',
        'https://o5omsejde.qnssl.com/demo/test5.jpg',
        'https://o5omsejde.qnssl.com/demo/test6.jpg',
        'https://o5omsejde.qnssl.com/demo/test7.jpg',
        'https://o5omsejde.qnssl.com/demo/test8.jpg'
      ]       
    }
  },
  created(){

  },
  mounted(){

  },
  components:{
XHeader,foot,    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,XImg 
  },
  computed: {

  },
  methods: {
    onItemClick (index) {
      this.curindex=index;
      console.log('on item click:', index);
      window.scrollTo(0,0);
    },
    success (src, ele) {
      console.log('success load', src)
      const span = ele.parentNode.querySelector('span')
      ele.parentNode.removeChild(span)
    },
    error (src, ele, msg) {
      console.log('error load', msg, src)
      const span = ele.parentNode.querySelector('span')
      span.innerText = 'load error'
    }    
  },
  watch: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.box {
    padding: 90px 0 56px;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
}
.vux-slider > .vux-swiper{
  overflow: auto
}
.tab{position: fixed;top:46px;width: 100%}
// .list{
// margin-bottom: 56px
// }
.ximg-demo {
  width: 100%;
  height: auto;
}
.ximg-error {
  background-color: yellow;
}
.ximg-error:after {
  content: '加载失败';
  color: red;
}
</style>
