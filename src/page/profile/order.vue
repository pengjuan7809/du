<template>
  <div class=" ">
<mt-header title="交易流水">
  <router-link to="/profile" slot="left">
    <mt-button icon="back"></mt-button>
  </router-link>
</mt-header>


    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <ul class="page-infinite-list clear page-ddzx" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="1">
        
<li class="mui-table-view-cell order" v-for="(item,index) in list" :key="index">
  <div class="mui-table">
    <div class="title mui-ellipsis">
      <span class="mui-ellipsis">{{item.truename}}
      </span>
      <p class="mui-ellipsis">{{item.addtime}}  订单号：{{item.itemid}}
      </p>
    </div>
    <ul class="mui-table-view" data-id="10000061417">
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="http://www.ezaisheng.com/file/upload/201711/07/14-57-27-11-43330.jpg" width="80" height="80">
          <div class="mui-media-body">
            <div class="mui-ellipsis"> {{ item.title }}
            </div>
            <p class="mui-ellipsis">60.59元 /台
              <span class="num">× 1/台
              </span>
            </p>
          </div></a>
      </li>
    </ul>
    <div class="price mui-ellipsis">
      <span class="status">待付款
      </span>合计：￥60.59
    </div>
    <div class="action">
      <button type="button" class="mui-btn mui-btn-red mui-btn-outlined" onclick="topay('10000061417','02')">付款
      </button>
    </div>	
  </div>
</li>        
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div>   

 
<foot selected='/profile'></foot>

  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import {order} from '../../service/getData'
import foot from "../../components/foot";
import { removeStore } from "../../config/mUtils";
export default {
  data() {
    return {
      value: "111",
        list: [],
        loading: false,
        allLoaded: false,
        wrapperHeight: 0 ,
        pageNo:1,      
    };
  },
  computed: {
 
  },
  components: {
    foot
  },
  methods: {
      loadMore() {
        this.loading = true;        
        setTimeout(() => {
          this.pageNo += 1;          
          order(this.pageNo).then(res => {
              this.list = this.list.concat(res.content)
          })    
           
          this.loading = false;
        }, 2500);
      } 
  },
  mounted() {
        //获取res.content最新现货      
     this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        order(this.pageNo).then(res => {
            this.list = res.content;
        })  
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mui-pull-left {
    float: left;
}
.page-ddzx .order{padding:0;margin:10px 0;}
.page-ddzx .order:after{height:0;}
.page-ddzx .num{float:right;}
.page-ddzx .title{font-size:0.28rem;padding:0.2rem;background-color:#fff;}
.page-ddzx .title span{width: 20%;display: inline-block;}
.page-ddzx .title p{width: 80%;display: inline-block;font-size:0.26rem;}
.page-ddzx .mui-table-view{background-color:#eee;}
.page-ddzx .price{font-size:0.28rem;padding:0.2rem;background-color:#fff;color:#363636;text-align:right;}
.page-ddzx .price .status{float:left;color:#fe9901;}
.page-ddzx .action{background-color:#fff;border-top:1px solid #eee;text-align:right;padding:0.2rem;}
.page-ddzx .mui-media-body p.mui-ellipsis{margin-bottom: 0.5em;bottom: 0;width: 100%;font-size:0.28rem;}
.page-ddzx .mui-media-body div.mui-ellipsis{font-size:0.28rem;}
.page-ddzx .mui-table-view .mui-media{overflow: hidden}
.mui-media-body{float: left}
.page-ddzx .mui-media-body{position: relative}
      .page-infinite-loading{
        padding-bottom: 100px;
      }
</style>
