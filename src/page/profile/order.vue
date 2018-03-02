<template>
  <div class="order">
  <x-header :left-options="{backText: ''}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">交易流水</x-header> 


    <div class="page-infinite-wrapper" ref="wrapper"  >
 
    <scroller lock-x  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200" height="-46">
      <div class="box2 page-ddzx">
        <div class="mui-table-view-cell order" v-for="(item,index) in list" :key="index">
          <div class="mui-table">
            <div class="title mui-ellipsis">
              <span class="mui-ellipsis">桑德再生桑德再生桑德再生桑德再生桑德再生桑德再生桑德再生桑德再生
              </span>
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
      <x-button mini plain  type="primary" class="custom-primary-red">付款</x-button>                           
            </div>	
          </div>
        </div> 
        <load-more tip="loading"></load-more>
        <br>
      </div>
    </scroller>
    </div>   

 


  </div>
</template>

<script>
import {XHeader, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,XImg,Scroller,LoadMore } from 'vux'
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import {order} from '../../service/getData'
import { removeStore,getStore } from "../../config/mUtils";
export default {
  data() {
    return {
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
    XHeader,Scroller,LoadMore,XButton
  },
  methods: {
    onScrollBottom () {
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true
        setTimeout(() => {
          // this.bottomCount += 10
          // this.$nextTick(() => {
          //   this.$refs.scrollerBottom.reset()
          // })
          this.pageNo += 1;          
          order(this.pageNo).then(res => {
              this.list = this.list.concat(res.content)
          })           
          this.onFetching = false
        }, 2000)
      }
    }
  },
  mounted() {
        order(this.pageNo).then(res => {
            this.list = res.content;
        })  
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.order{box-sizing: border-box;}
.page-infinite-wrapper{
    padding-top: 46px;box-sizing: border-box
}
.mui-pull-left {
    float: left;
}
.page-ddzx .order{padding:0;margin:10px 0;}
.page-ddzx .order:after{height:0;}
.page-ddzx .num{float:right;}
.page-ddzx .title{font-size:0.28rem;padding:0.2rem;background-color:#fff;}
.page-ddzx .title span{width: 100%;display: inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size: 16px;padding: 0 2em 0 0;}
.page-ddzx .title p{width: 80%;display: inline-block;font-size:0.26rem;}
.page-ddzx .mui-table-view{background-color:#eee;}
.page-ddzx .price{font-size:0.28rem;padding:0.2rem;background-color:#fff;color:#363636;text-align:right;}
.page-ddzx .price .status{float:left;color:#fe9901;}
.page-ddzx .action{background-color:#fff;border-top:1px solid #eee;text-align:right;padding:0.2rem;}
.page-ddzx .mui-media-body p.mui-ellipsis{margin-bottom: 0.5em;bottom: 0;width: 100%;font-size:0.28rem;}
.page-ddzx .mui-media-body div.mui-ellipsis{font-size:0.28rem;}
.page-ddzx .mui-table-view .mui-media{overflow: hidden;padding: 10px}
.mui-media-body{float: left;color: #363636;margin: 10px}
.page-ddzx .mui-media-body{position: relative}
      .page-infinite-loading{
        padding-bottom: 100px;
      }
.custom-primary-red {
  border-color: #CE3C39!important;
  color: #CE3C39!important;
  &:active {
    border-color: rgba(206, 60, 57, 0.6)!important;
    color: rgba(206, 60, 57, 0.6)!important;
    background-color: transparent;
  }
}      
</style>
