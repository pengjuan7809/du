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
      <router-link to="/profile" class="login" v-if="userInfo"><x-icon type="person" size="30"></x-icon></router-link>
      <router-link to="/login" class="login" v-else>登录</router-link> 
    </header>

    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>

    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/5" v-for="i in 10" :key="i">
        <div class="flex-demo"><img src="../../assets/image/nav9.png" alt=""><span>链接{{i}}</span></div>
      </flexbox-item>
  </flexbox>
  <div class="express-news">
    <a href="#" class="tit">NEWS</a>
    <div class="news-list-wrapper">
        <swiper auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
          <swiper-item  v-for="i in 10" :key="i"><p>{{i}}义务爱了 fghdfhdf 完成传奇世界H5-王者归来任务 获得20金币</p></swiper-item>
        </swiper>    
    </div>
    <a href="#" class="more">更多</a>
  </div>

<div class="future">
  <img src="../../assets/image/1.jpg" alt="">
  <scroller lock-y :scrollbar-x="false">
    <div class="box1" :style="{width:wid+'px'}">
      <div class="box1-item" v-for="(item,index) in recomDatas" :key="index">
        <router-link :to="{path:'/detail/'+item.product_id}">
          <img :src="item.product_img_url" alt="">
        </router-link>        
      </div>
    </div>
  </scroller>
</div>

<divider>为您推荐{{wid}}</divider>
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/2" v-for="(item,index) in homeDatas" :key="index">
        <div class="tuijian">
        <router-link :to="{path:'/detail/'+item.product_id}">
          <img :src="item.product_img_url" alt="">
          <span class="title">{{item.product_name}}</span>
        </router-link>             
        </div>
      </flexbox-item>
  </flexbox>
    <!-- <grid :cols="2">
      <grid-item v-for="i in 6" :key="i">
        <span class="grid-center">{{i}}
        <img src="http://www.ezaisheng.com/file/upload/201712/28/14-56-57-26-50057.png" alt="" srcset=""></span>
      </grid-item>
    </grid> -->


<div id="search-popup" class="search-popup"  v-show="showSearch"> 
  <div class="hotwords swiper-container-horizontal swiper-container-free-mode"> 
    <p class="hotwords-tit">热搜
    </p> 
    <div class="swiper-wrapper"> 
      <span class="swiper-slide" >熊本熊
      </span> 
      <span class="swiper-slide" >T恤
      </span> 
      <span class="swiper-slide swiper-slide-prev" >免烫衬衫
      </span> 
      <span class="swiper-slide swiper-slide-active" >帆布鞋
      </span> 
      <span class="swiper-slide swiper-slide-next" >短袖衬衫
      </span> 
      <span class="swiper-slide" >polo
      </span> 
      <span class="swiper-slide" >空调衫
      </span> 
      <span class="swiper-slide" >牛仔裤
      </span> 
      <span class="swiper-slide" >休闲裤
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
  <div id="clear-srhHistory" class="clear-srhHistory" @click="delhistory">清除历史
  </div> 
</div>
      <confirm v-model="historyshow"
      title="确定要清空吗?">
        <p style="text-align:center;">??</p>
      </confirm>
    <foot :sel="sel"></foot>
  </div>
</template>

<script>
import {mapGetters,mapState, mapActions,mapMutations} from 'vuex' 
import { Swiper,XHeader,SwiperItem,Flexbox,FlexboxItem,Scroller,Grid, GridItem,Tabbar, TabbarItem, Search,Confirm,Divider} from 'vux'
import foot from "../../components/foot";

const baseList = [{
  url: 'javascript:',
  img: '/src/assets/image/l1.jpg',
  title: '送你们朵fua'
}, {
  url: 'javascript:',
  img: '/src/assets/image/l5.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: '/src/assets/image/l1.jpg',
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
      value: '',
      showSearch:false,
      historyshow:false,
      homeDatas : [],
      recomDatas:[],
      wid:0
    }
  },
  mounted(){
    this.getData();
    //  this.$toast.top('top text 自定义文本');
   // this.$toast('top text 自定义文本','top');
    
  //  console.log(this.$msgmsg)
 
  },
  components: {
    foot,
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    Scroller,
    Grid, GridItem,
    Tabbar, TabbarItem, Search,XHeader,Confirm,Divider
  },  
computed:{
  ...mapState(['userInfo']),
},
  methods: { 
      ...mapActions([
        'getUserInfo'
      ]), 
            getData(){              
                let _this = this;
                _this.$http.get('/recom').then((res)=>{
                    _this.recomDatas = res.data;
                    _this.wid=_this.recomDatas.length*110;
                     // console.log(_this.recomDatas.length)
                },(err)=>{
                    console.log(err);
                }),                
                _this.$http.get('/home').then((res)=>{
                    _this.homeDatas = res.data;
                    // console.log(this.mainDatas)
                },(err)=>{
                    console.log(err);
                });
              if (window.sessionStorage.userInfo) {
                _this.$http.get('/userinfo',{
                  params:{
                    uId:JSON.parse(window.sessionStorage.userInfo).user_id
                  }
                }).then((res)=>{
                    _this.getUserInfo(res.data);
                },(err)=>{
                    console.log(err);
                })   
              }


            },    
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
        text: 'loading'
      })
      this.$router.push('/search')
    },
    onFocus () {
      this.$router.push('/search')
      console.log('on focus');
     // this.showSearch=true
    },
    onCancel () {
      console.log('on cancel')
      this.showSearch=false
    },
    delhistory(){
      this.historyshow=true
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
.tuijian{
  background-color: #fff;
  margin-bottom: 4px;
  padding-bottom: 5px;
  .title{
    height: 33px;
    font-size: 12px;
    line-height: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    margin: 5px    
  }
  img{width: 100%}
}
.vux-flexbox-item:nth-child(2n+1) .tuijian {
    margin-right: 2PX;   
}
.vux-flexbox-item:nth-child(2n) .tuijian {
    margin-left: 2PX;
}
.search-popup {
    position: fixed;
    top: 44px;
    max-width: 640px;
    width: 100%;
    height: 100%;
  //  display: none;
    color: #000;
    background-color: rgba(255,255,255,1);
    z-index: 1000;
    padding: 10px 20px;
    box-sizing: border-box
}
.hotwords {
    width: 100%;
    padding-bottom: 0.5rem;
}
.swiper-wrapper{
  // overflow-x: auto;
  // white-space: nowrap;
  .swiper-slide{
    display: inline-block;
    padding: 0 6px;
    background-color: #ddd;
    border-radius: 6px;
    margin: 5px;
    font-size: 14px
  }
}
.search-history{
  margin: 20px 0 0;
  li{
    display: inline-block;
    padding: 0 6px;
    background-color: #ddd;
    border-radius: 6px;
    margin: 5px;
    font-size: 14px
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
  box-sizing: border-box;
  height: auto;
  // overflow-y: auto
}
header{
  position: fixed;
  top: 0  ;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #de181b;
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
  margin: 10% 0 0;
  background-clip: padding-box;
  img{
    width: 50%;
    height: 50%;
  }
  span{
    color: #000;
    display: block;
    font-size: 12px
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
}
.box1-item {
  width: 100px;
  height: 100px;
  background-color: #ccc;
  float: left;
  text-align: center;
  line-height: 100px;
  margin: 0 5px;
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
.express-news{
  margin: 10px 0;
  position: relative;
  .news-list-wrapper{
    padding: 0 60PX 0 75PX;
  }
  a.tit{
position: absolute;left: 10px;top: 5px;font-weight: bold;color: #de181b
  }
  a.more{
position: absolute;right: 5px;top: 5px;color: #666;font-size: 14px
  }
  .text-scroll{
    border: 0;
    p{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.future{
  text-align: center;
  img{
    width: 60%;
  }
  .box1 img{
    width: 100%
  }
}
.vux-x-icon {
  fill: #fff;
}


</style>
