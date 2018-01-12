<template>
  <div class="mall">
<div class="page-search" v-on:keyup.13="searching">
<mt-search autofocus v-model="currentValue"  @keyup.enter="testsearch()"  placeholder="请输入关键词" cancel-text="重置"></mt-search>
</div>
<!-- <form @submit="searching">
          <input
        ref="input"
        type="search"
        v-model="currentValue"
        @focus="visible = false"
        placeholder="搜索歌曲">
        <span @click="visible = false;currentValue=''" >取消</span>
</form> -->

    <span style="display:inline-block;width:50%" @click="gotoSort('asc')">价格</span><span style="width:50%;display:inline-block;" @click="gotoSort('desc')">销量</span>

    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <ul class="page-infinite-list clear" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="1">
        <li v-for="(item,index) in list" :key="index" class="page-infinite-listitem">
          {{ item.title }}
          <img :src="item.thumb" :alt="item.title" />
          </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div>
     <foot selected='/mall'></foot>

  </div>
</template>

<script>
import {mall} from '../../service/getData'
import foot from '../../components/foot'
export default {
  data () {
    return {
      value: '',
        list: [],
        loading: false,
        allLoaded: false,
        wrapperHeight: 0 ,
        pageNo:1,
      currentValue:'',
      visible:true,        
    }
  },
    components:{
        foot
    },  
  mounted(){
        //获取res.content最新现货      
     this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        mall(this.pageNo).then(res => {
            this.list = res.content;
        })  

  },
    methods: {
      loadMore() {
        this.loading = true;        
        setTimeout(() => {
          this.pageNo += 1;          
          mall(this.pageNo).then(res => {
              this.list = this.list.concat(res.content)
          })    
           
          this.loading = false;
        }, 2500);
      },
        	gotoSort(value){
            this.pageNo = 1;
            mall(this.pageNo,4,null,value).then(res => {
                this.list = res.content;
            })  
          } ,
//点击确定按钮时，弹出打印search的值
  searching(e){
    e && e.preventDefault();
            this.pageNo = 1;
            mall(this.pageNo,8,null,'asc',this.currentValue).then(res => {
                this.list = res.content;
            }) 
  }               
    },
        watch: {

        }      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
      .mint-swipe {
        height: 200px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
      }
      .mint-swipe-item {
        line-height: 200px;
        img{
          width:100%;
          height: 200px;
        }
      }
      .cat li{width: 33.3%;text-align: center;float: left;
      img{
        width: 60%;
      }}
      .hotnew{text-align: center;margin: 30px 0}
      .page-infinite-listitem{
          width: 45%;
          margin: 2.5%;
          padding: 2.5%;
          float: left;
          height: 210px;
          background-color: #fff;

          img{width: 100%;height: 150px}
      }
      .page-infinite-loading{
        padding-bottom: 100px;
      }
</style>
