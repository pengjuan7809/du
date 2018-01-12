<template>
  <div class="">
<mt-header title="竞价">
  <router-link to="/" slot="left">
    <mt-button icon="back">返回</mt-button>
  </router-link>
  <mt-button icon="more" slot="right"></mt-button>
</mt-header>    
<mt-search autofocus v-model="value" placeholder="请输入关键词" cancel-text="重置"></mt-search>
    <div class="nav">
<mt-navbar v-model="selected">
  <mt-tab-item id="1">正在进行</mt-tab-item>
  <mt-tab-item id="2">即将开始</mt-tab-item>
  <mt-tab-item id="3">已结束</mt-tab-item>
</mt-navbar>
    </div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="selected" swipeable>
        <mt-tab-container-item id="1">          
          <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-if="selected==1">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
              <ul class="page-loadmore-list">
                <li v-for="(item,index) in list1" :key="index">
                  <h4 class="mui-ellipsis">{{item.title}}</h4>
                  <img :src="item.disagreeinfo" alt="" width="60%">
                </li>
              </ul>
              <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                <span v-show="bottomStatus === 'loading'">
                  <mt-spinner type="snake"></mt-spinner>
                </span>
              </div>
            </mt-loadmore>
          </div>       
        </mt-tab-container-item>
        
        <mt-tab-container-item id="2">
          <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-if="selected==2">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
              <ul class="page-loadmore-list">
                <li v-for="(item,index) in list2" :key="index">
                  <h4 class="mui-ellipsis">{{item.title}}</h4>
                  <img :src="item.disagreeinfo" alt="" width="60%">
                </li>
              </ul>
              <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                <span v-show="bottomStatus === 'loading'">
                  <mt-spinner type="snake"></mt-spinner>
                </span>
              </div>
            </mt-loadmore>
          </div> 
        </mt-tab-container-item>

        <mt-tab-container-item id="3">
          <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-if="selected==3">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
              <ul class="page-loadmore-list">
                <li v-for="(item,index) in list3" :key="index">
                  <h4 class="mui-ellipsis">{{item.title}}</h4>
                  <img :src="item.disagreeinfo" alt="" width="60%">
                </li>
              </ul>
              <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                <span v-show="bottomStatus === 'loading'">
                  <mt-spinner type="snake"></mt-spinner>
                </span>
              </div>
            </mt-loadmore>
          </div> 
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- <foot type='home'></foot> -->

  </div>
</template>

<script>
import {banners,auction} from '../../service/getData'
import foot from '../../components/foot'
export default {
  name: 'HelloWorld',
  data () {
    return {
       isActive: true,
      value: '',
      banners:[],
        list1: [],
        list2: [],
        list3: [],
        pageNo1:1  ,
        pageNo2:1  ,
        pageNo3:1  ,
         selected: '1' ,
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0 ,
        wrapper3Height: 0           
    }
  },
    components:{
        foot
    },  
  created(){
        //获取正在进行
        auction(this.pageNo1,4,3).then(res => {
            this.list1 = res.auctions;
        }) 
        auction(this.pageNo2,4,2).then(res => {
            this.list2 = res.auctions;
        }) 
        auction(this.pageNo3,4,1).then(res => {
            this.list3 = res.auctions;
        })                  

  },
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        setTimeout(() => {
          if(this.selected==1){
            this.pageNo1 += 1;
            auction(this.pageNo1,4,3).then(res => {
                this.list1 = this.list1.concat(res.auctions)
                res.auctions.length<4? this.allLoaded = true:"";
            }) 
          }else if(this.selected==2){
            this.pageNo2 += 1;
            auction(this.pageNo2,4,2).then(res => {
                this.list3 = this.list2.concat(res.auctions)
                res.auctions.length<4? this.allLoaded = true:"";
            })
          }else{
            this.pageNo3 += 1;
            auction(this.pageNo3,4,1).then(res => {
                this.list3 = this.list3.concat(res.auctions)  
                res.auctions.length<4? this.allLoaded = true:"";            
            }) 
          }
          
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      }   
    },
        watch: {
            selected: function (value) {
                 this.allLoaded = false;
                 this.pageNo1=1;
                 this.pageNo3=1;
                 this.pageNo2=1;
            }
        },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }            
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mui-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.page-tab-container{    margin: 4px auto;}
.mint-tab-container{overflow: auto;background-color: #fff}
      .mint-tab-container-item{background-color: #fff;padding: 0px 10%;text-align: center;
      margin: 0px auto;
      }
</style>
