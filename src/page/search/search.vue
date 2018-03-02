<template>
  <div class="home">
    <header>
      <search
      @result-click="resultClick"
      @on-change="getResult"
      :auto-fixed="autoFixed"
      v-model="keyword"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search">
      </search>
      <router-link to="/home" class="login">首页</router-link> 

<ul id="searchSort20" class="new-search-tab bdr-bom">
  <li v-bind:class="[{ active: isActive1 }, 'newchangeeleven']" id="searchSort12" @click="searchsort('','','',$event)">
    <span>综合</span>
  </li>
  <li v-bind:class="[{ active: isActive2 }, 'newchangeeleven']" id="searchSort13" @click="searchsort('hot','','',$event)">
    <span class="J_ping">销量 </span>
  </li>
  <li v-bind:class="[{ active: isActive3 }, 'newchangeeleven', 'newsortprice']" id="searchSort14" @click="searchsort('','up','',$event)">
    <span class="J_ping arrow-up">价格</span>
  </li>
  <li v-bind:class="[{ active: isActive4 }, 'newchangeeleven']" id="searchSort19" >
    <span class="J_ping">筛选<span class="choose-icon"></span></span>
  </li>
  </ul> 

    </header>


<div id="search-popup" class="search-popup"  v-show="showSearch"> 
  <div class="hotwords swiper-container-horizontal swiper-container-free-mode"> 
    <p class="hotwords-tit">热搜
    </p> 
    <div class="swiper-wrapper"> 
      <span class="swiper-slide" @click="onSubmit('外套')">外套
      </span> 
      <span class="swiper-slide"  @click="onSubmit('连衣裙')">连衣裙
      </span> 
      <span class="swiper-slide swiper-slide-prev"  @click="onSubmit('羽绒服')">羽绒服
      </span> 
      <span class="swiper-slide swiper-slide-active"  @click="onSubmit('卫衣')">卫衣
      </span> 
      <span class="swiper-slide swiper-slide-next"  @click="onSubmit('短袖衬衫')">短袖衬衫
      </span> 
      <span class="swiper-slide"  @click="onSubmit('polo')">polo
      </span> 
      <span class="swiper-slide"  @click="onSubmit('空调衫')">空调衫
      </span> 
      <span class="swiper-slide" @click="onSubmit('牛仔裤')" >牛仔裤
      </span> 
      <span class="swiper-slide"  @click="onSubmit('休闲裤')">休闲裤
      </span> 
    </div> 
  </div> 
  <div class="search-history"> 
    <span class="search-history-tit">历史搜索
    </span> 
    <ul>
      <li v-for="item in searchHistory" :key="item">{{item}}</li>
    </ul> 
  </div> 
  <div id="clear-srhHistory" class="clear-srhHistory" @click="delhistory">清除历史
  </div> 
</div>
      <confirm v-model="historyshow" title="确定要清空吗?"  @on-confirm="onConfirm">
        <p style="text-align:center;">??</p>
      </confirm>
		<main class="main_goods_box">
	        <ul>
	            <li class="goods_item" v-for="item in mDatas">
	                <router-link :to="'/detail/'+item.product_id" class="goods_item_link">
	                    <img :src="item.product_img_url" alt="" class="goods_item_pic">
	                    <div class="goods_right">
	                        <div class="pp_name">
	                            <span>
	                                {{item.product_name}}
	                            </span>
	                        </div>
	                        <div class="price_box">
	                            <span>￥</span>
	                            <span>{{item.product_uprice}}</span>
	                            <span>.00</span>
	                        </div>
	                        <div class="pinglun_box">
	                            <span>{{item.product_comment_num}}条评价</span>
	                            <span>{{item.shop_name}}</span>
	                        </div>
	                    </div>
	                </router-link>
	            </li>
	          
	        </ul>
    	</main>
  </div>
</template>

<script>
import {mapGetters,mapState, mapActions,mapMutations} from 'vuex' 
import { Swiper,XHeader,SwiperItem,Flexbox,FlexboxItem,Scroller,Grid, GridItem,Tabbar, TabbarItem, Search,Confirm,Divider} from 'vux'
import foot from "../../components/foot";
import {setStore,getStore,removeStore} from '@/config/mUtils'

export default {
  data () {
    return {
      isActive1:true,
      isActive2:false,
      isActive3:false,
      isActive4:false,
      sel:0,
      demo01_index: 0,
      results: [],
      autoFixed: true,
      keyword: '',
      showSearch:false,
      historyshow:false,
      homeDatas : [],
      searchHistory:[],
      wid:0,
      mDatas:[]
    }
  },
  mounted(){
        //获取搜索历史记录
        if (getStore('searchHistory')) {
            this.searchHistory = JSON.parse(getStore('searchHistory'));
        }
 
    // console.log(JSON.parse(getStore('searchHistory')))
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
    onSubmit (historyValue) {
      if (historyValue) {
          this.keyword = historyValue;
      }else if (!this.keyword) {
          return 
      }      
      let _this = this;
      this.showSearch=false;
      this.$refs.search.setBlur();
				if(_this.keyword == ''){
					alert('请输入商品名称');
				}else{
					_this.$http.get('/search',{
						params:{
							kw:_this.keyword,
							hot:'',
							priceUp:'',
							priceDown:''
						}
						}).then((res)=>{
							_this.mDatas = res.data;
							console.log(_this.mDatas);
						},(err)=>{
							console.log(err);
            });
            /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
            let history = getStore('searchHistory');
            if (history) { 
                let checkrepeat = false;
                _this.searchHistory = JSON.parse(history);
                _this.searchHistory.forEach(item => {
                    if (item == _this.keyword) {
                        checkrepeat = true;
                    }
                })
                if (!checkrepeat) {
                    _this.searchHistory.push(_this.keyword)
                }
            }else {
                _this.searchHistory.push(_this.keyword)
            }
            setStore('searchHistory',_this.searchHistory)            
					}
    },
			searchsort(hot,up,down,event){
        console.log(event);
        let _this = this;        
				if(_this.keyword == ''){
					alert('请输入商品名称');
				}else{
          if (hot) {
            _this.isActive2=true
            _this.isActive1=false
            _this.isActive3=false
          } else if (up) {
            _this.isActive3=true
            _this.isActive2=false
            _this.isActive1=false            
          } else {
            _this.isActive1=true
            _this.isActive3=false
            _this.isActive2=false            
          }  
          
					_this.$http.get('/search',{
						params:{
							kw:_this.keyword,
							hot:hot,
							priceUp:up,
							priceDown:down
						}
						}).then((res)=>{
							_this.mDatas = res.data;
					//		console.log(_this.mDatas);
						},(err)=>{
							console.log(err);
						});
					}
			},    
    onFocus () {
      console.log('on focus');
      this.showSearch=true
    },
    onCancel () {
      console.log('on cancel')
      this.showSearch=false
    },
    onConfirm(){
      this.searchHistory = [];
      setStore('searchHistory',this.searchHistory);
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
.new-search-tab {
	position: fixed;
  top: 44px;
	height: 2.5rem;
	font-size: 0;
	width: 100%;
	background-color: #fff
}
.newchangeeleven {
	width: 25%;
	border-right: 0;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	display: inline-block;
	font-size: .875rem;
	text-align: center;
	line-height: 2.4rem
}
.newchangeeleven span {
	color: #232326;
	display: block
}
.newchangeeleven.active span {
	color: #f15353 !important
}
.main_goods_box {
    width: 100%;
    border-top: 1px solid #DFDFDF;
}

.main_goods_box .goods_item {
    width: 100%;
    height: 120px;
    padding: 10px;
    box-sizing: border-box
}

.goods_item .goods_item_link {
    display: block;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #eee;
    position: relative;
    color: #333
}

.goods_item_link .goods_item_pic {
    display: inline-block;
    width: 100px;
    height: 100px;
}

.goods_item_link .goods_right {
    position: absolute;
    left: 104px;
    top: 0;
    height: 100%;
}
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
  padding: 84px 0 56px;
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
  height: 84px;
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
