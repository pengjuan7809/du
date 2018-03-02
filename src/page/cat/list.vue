<template>
<div class="list">
  <x-header :left-options="{backText: ''}"  style="position:fixed;left:0;right:0;top:0;z-index:100;">分类</x-header> 
<ul class="list-tab clear"> 
	<li class="new"><a class="active" href="#"> 新品</a></li> 
	<li class="sale"><a class="" href="#">销量</a></li> 
	<li class="new"><a class="active" href="#"> 新品</a></li> 
	<li class="sale"><a class="" href="#">销量</a></li> 	
</ul>

    <scroller lock-x   height="-71" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200" >
      <div class="box2">
	     <grid :cols="2">
	      <grid-item v-for="(item,i) in cateGoodsData" :key="i">
	        	<router-link :to="{name: 'Detail', params: {id: item.product_id }}" class="grid-center" >
             <img :src="item.product_img_url" alt="" > 
             <span>{{item.product_name}}</span>	        
             </router-link>
	      </grid-item>
	    </grid>
      <load-more :show-loading="showload" :tip="tip"></load-more>
    </div>
    </scroller>   
</div>


</template>


<script>
import {cats,cat} from '../../service/getData'
import { XHeader,Tabbar, TabbarItem,Grid, GridItem,Scroller,LoadMore } from 'vux'
export default {
name: 'list',
data() {
  return {
      catId:null,
      cateGoodsData:[],
      onFetching: false,
      bottomCount: 20,
      page:1,
      empdata:false,
      showload:true,
      tip:"正在加载"
 
  }
},
    components:{
 XHeader,Tabbar, TabbarItem,Grid, GridItem,Scroller,LoadMore
    }, 
created() {
  this.catId=this.$route.params.id || 0;  
},
mounted(){
  this.initData(this.catId);        
},
methods: {
  initData(id){
				var _this=this;
				
				_this.$http.get('/categorygoods',{
					params: {
            mId: id,
            page:_this.page
					}
				}).then((res)=>{
          if (res.data.length) {
            _this.cateGoodsData = res.data;
            _this.page++;
          }else{
            _this.empdata=true;
            _this.showload=false;
            _this.tip="暂无数据";
          }
				},(err)=>{
					console.log(err);
				})
  },
    onScrollBottom () {
      if (this.onFetching || this.empdata) {
        // do nothing
      } else {
        this.onFetching = true
        setTimeout(() => {

				var _this=this;				
				_this.$http.get('/categorygoods',{
					params: {
            mId: this.catId,
            page:_this.page
					}
				}).then((res)=>{ 
          if (res.data.length) {
            _this.cateGoodsData = _this.cateGoodsData.concat(res.data);
            _this.page++;
          }else{
            _this.empdata=true;
            _this.showload=false;
            _this.tip="暂无数据";
          }

				},(err)=>{
					console.log(err);
				})

          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
          this.onFetching = false
        }, 2000)
      }
    }	
}


}

</script>


<style lang="scss" scoped>
.list{
  padding-top: 46px;
  background: #fff
}

.list-tab{
	overflow: hidden;
	li{
    float: left;width: 25%;list-style-type: none;text-align: center;
    }
} 
.grid-center {
  display: block;
  text-align: center;
  color: #666;
  img{
    width: 80%
  }
  span{
    height: 25px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
