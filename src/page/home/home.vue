<template>
  <div class="home">
    <header>
      <search
      @result-click="resultClick"
      @on-change="getResult"
      :auto-fixed="autoFixed"
      v-model="value"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search">
      </search>
      <router-link to="/login" class="login">登录</router-link> 
    </header>


    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/5"><div class="flex-demo"><img src="https://img.alicdn.com/tfs/TB1Kxe8QFXXXXbSXVXXXXXXXXXX-183-129.png" alt="" srcset=""></div></flexbox-item>
      <flexbox-item :span="1/5"><div class="flex-demo"><img src="https://img.alicdn.com/tfs/TB1Kxe8QFXXXXbSXVXXXXXXXXXX-183-129.png" alt="" srcset=""></div></flexbox-item>
      <flexbox-item :span="1/5"><div class="flex-demo"><img src="https://img.alicdn.com/tfs/TB1Kxe8QFXXXXbSXVXXXXXXXXXX-183-129.png" alt="" srcset=""></div></flexbox-item>
      <flexbox-item :span="1/5"><div class="flex-demo"><img src="https://img.alicdn.com/tfs/TB1Kxe8QFXXXXbSXVXXXXXXXXXX-183-129.png" alt="" srcset=""></div></flexbox-item>
      <flexbox-item :span="1/5"><div class="flex-demo"><img src="https://img.alicdn.com/tfs/TB1Kxe8QFXXXXbSXVXXXXXXXXXX-183-129.png" alt="" srcset=""></div></flexbox-item>
      <flexbox-item :span="1/5"><div class="flex-demo"><img src="https://img.alicdn.com/tfs/TB1Kxe8QFXXXXbSXVXXXXXXXXXX-183-129.png" alt="" srcset=""></div></flexbox-item>
      <flexbox-item :span="1/5"><div class="flex-demo"><img src="https://img.alicdn.com/tfs/TB1Kxe8QFXXXXbSXVXXXXXXXXXX-183-129.png" alt="" srcset=""></div></flexbox-item>
      <flexbox-item :span="1/5"><div class="flex-demo"><img src="https://img.alicdn.com/tfs/TB1Kxe8QFXXXXbSXVXXXXXXXXXX-183-129.png" alt="" srcset=""></div></flexbox-item>
      <flexbox-item :span="1/5"><div class="flex-demo"><img src="https://img.alicdn.com/tfs/TB1Kxe8QFXXXXbSXVXXXXXXXXXX-183-129.png" alt="" srcset=""></div></flexbox-item>
      <flexbox-item :span="1/5"><div class="flex-demo"><img src="https://img.alicdn.com/tfs/TB1Kxe8QFXXXXbSXVXXXXXXXXXX-183-129.png" alt="" srcset=""></div></flexbox-item>
  </flexbox>
    <swiper auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
      <swiper-item><p>义务爱了 fghdfhdf 完成传奇世界H5-王者归来任务 获得20金币</p></swiper-item>
      <swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>
      <swiper-item><p>零哥章魚 完成传奇世界H5-王者归来任务 获得30金币</p></swiper-item>
      <swiper-item><p>做迎而為 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>
      <swiper-item><p>只知道不知道 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>
      <swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>
    </swiper>
    <scroller lock-y :scrollbar-x=false>
      <div class="box1">
        <div class="box1-item" v-for="i in 7" :key="i"><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>
    <grid :cols="2">
      <grid-item v-for="i in 6" :key="i">
        <span class="grid-center">{{i}}
        <img src="http://www.ezaisheng.com/file/upload/201712/28/14-56-57-26-50057.png" alt="" srcset=""></span>
      </grid-item>
    </grid>


<div id="search-popup" class="search-popup" style="display: block;"> 
  <div class="hotwords swiper-container-horizontal swiper-container-free-mode"> 
    <p class="hotwords-tit">热搜
    </p> 
    <div class="swiper-wrapper"> 
      <span class="swiper-slide" style="width: 75px;">熊本熊
      </span> 
      <span class="swiper-slide" style="width: 75px;">T恤
      </span> 
      <span class="swiper-slide swiper-slide-prev" style="width: 75px;">免烫衬衫
      </span> 
      <span class="swiper-slide swiper-slide-active" style="width: 75px;">帆布鞋
      </span> 
      <span class="swiper-slide swiper-slide-next" style="width: 75px;">短袖衬衫
      </span> 
      <span class="swiper-slide" style="width: 75px;">polo
      </span> 
      <span class="swiper-slide" style="width: 75px;">空调衫
      </span> 
      <span class="swiper-slide" style="width: 75px;">牛仔裤
      </span> 
      <span class="swiper-slide" style="width: 75px;">休闲裤
      </span> 
    </div> 
  </div> 
  <div class="search-history"> 
    <span class="search-history-tit">历史搜索
    </span> 
    <ul>
      <li>77
      </li>
      <li>55
      </li>
    </ul> 
  </div> 
  <div id="clear-srhHistory" class="clear-srhHistory">清除历史
  </div> 
</div>

    <foot :sel=sel></foot>
  </div>
</template>

<script>
import { Swiper,XHeader,SwiperItem,Flexbox,FlexboxItem,Scroller,Grid, GridItem,Tabbar, TabbarItem, Search} from 'vux'
import foot from "../../components/foot";

const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你们朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/3.jpg',
  title: '送你一次旅行'
}]

export default {
  data () {
    return {
      sel:0,
      demo01_list: baseList,
      demo01_index: 0,
      results: [],
      autoFixed: true,
      value: ''
    }
  },
  components: {
    foot,
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    Scroller,
    Grid, GridItem,
    Tabbar, TabbarItem, Search,XHeader
  },

  methods: {
    demo01_onIndexChange (index) {
      this.demo01_index = index
    },
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    }
  },

}
function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.search-popup {
    position: fixed;
    top: 44px;
    max-width: 640px;
    width: 100%;
    height: 100%;
    display: none;
    color: #000;
    background-color: rgba(255,255,255,0.8);
    z-index: 1000;
    padding: 20px
}
.hotwords {
    width: 100%;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #000;
    overflow-x: hidden;
}
.swiper-wrapper{
  overflow-x: auto;
  white-space: nowrap;
  .swiper-slide{
    display: inline-block;
    padding: 0 5px
  }
}
.search-history{
  margin: 20px 0 0;
  li{
    list-style: none;
    border-bottom: 1px dotted #999
  }
}
.clear-srhHistory{
  width: 35%;
    height: 2rem;
    line-height: 2rem;
    margin: 1rem auto 0;
    border: 1px solid #000;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
}
.home{
  padding: 44px 0 56px;
  overflow: auto;
  box-sizing: border-box
}
header{
  position: fixed;
  top: 0  ;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #29afa3;
  height: 44px;
}
.vux-search-box{
  width: 88%
}
.vux-search-box.vux-search-fixed{
width: 100%
}
.login{
  position: absolute;
  right: 10px;
  top: 10px;
  color: #fff
}
 .flex-demo {
  text-align: center;
  color: #fff;
  background-color: #fff;
  margin: 10% 0 0;
  background-clip: padding-box;
  img{
    width: 100%;
    height: 100%;
  }
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
 p{
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
}
.box1 {
  height: 100px;
  position: relative;
  width: 1490px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
}
.box1-item:first-child {
  margin-left: 0;
}
.grid-center {
  display: block;
  text-align: center;
  color: #666;
  img{
    width: 80%
  }
}

</style>
