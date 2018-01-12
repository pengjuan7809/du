<template>
<div class="list">
<ul class="list-tab clear"> 
	<li class="new"><a class="active" href="#"> 新品</a></li> 
	<li class="sale"><a class="" href="#">销量</a></li> 
	<li class="new"><a class="active" href="#"> 新品</a></li> 
	<li class="sale"><a class="" href="#">销量</a></li> 	
</ul>

    <scroller lock-x height="85vh" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200" style="margin-bottom: 50px;">
      <div class="box2">
	     <grid :cols="2">
	      <grid-item v-for="i in bottomCount" :key="i">
	        	<router-link :to="{name: 'Detail', params: { cat: i,id: i }}" class="grid-center" >商品{{i}}
	        <img src="http://www.ezaisheng.com/file/upload/201712/28/14-56-57-26-50057.png" alt="" srcset=""></router-link>
	      </grid-item>
	    </grid>
    	<load-more tip="loading"></load-more>
    </div>
    </scroller>  
    
    <tabbar>
      <tabbar-item link="/home"  >
        <img slot="icon" src="http://m.ezaisheng.com/apph5/img/zhaobiao.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot   link="/cat"  selected>
        <img slot="icon" src="http://m.ezaisheng.com/apph5/img/zhaobiao.png">
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item  link="/component/demo">
        <img slot="icon" src="http://m.ezaisheng.com/apph5/img/zhaobiao.png">
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <img slot="icon" src="http://m.ezaisheng.com/apph5/img/zhaobiao.png">
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <img slot="icon" src="http://m.ezaisheng.com/apph5/img/zhaobiao.png">
        <span slot="label">我的</span>
      </tabbar-item>      
    </tabbar>  
</div>


</template>


<script>
import {cats,cat} from '../../service/getData'
import { XHeader,Tabbar, TabbarItem,Grid, GridItem,Scroller,LoadMore } from 'vux'
export default {
name: 'list',
data() {
  return {
    value: '',
    // 默认数据  
    cat1: [],
    catFdq: [],
    cat3: [],
    sub896:false,
    sub3744:false,
      onFetching: false,
      bottomCount: 20
 
  }
},
    components:{
 XHeader,Tabbar, TabbarItem,Grid, GridItem,Scroller,LoadMore
    }, 
created() {
        //获取分类
        cats().then(res => {
            this.cat1 = res.count;
        })
        this.sub896=true
},
mounted(){
        //获取废电器
        cat('896').then(res => {
            this.catFdq = res.count;
        })
        //获取报废汽车
        cat('3744').then(res => {
            this.cat3 = res.count;
        })        
},
methods: {
	chang(e){
	
	  if(e==896){
	this.sub896=true;this.sub3744=false;
	  }else if(e==3744){
	this.sub896=false;this.sub3744=true;
	  }else{
	this.sub896=false;this.sub3744=false;
	  }
	
	},
    onScrollBottom () {
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true
        setTimeout(() => {
          this.bottomCount += 10
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
.left{
  width:33%;
  height: 100%;
  float:left;
      overflow-y: auto;
      border-right: 1px solid #000000;
      li{
        height:60px;
      }

}
.right{
  width:66%;
  height: 100%;
  float:left;
      overflow-y: auto;
            li{
        min-height:70px;
        p{
          height: 60px;
        }
      }
}
.cat {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 53px;
    left: 0;
}
.weui-tabbar{position: fixed}
.list-tab{
	overflow: hidden;
	li{float: left;width: 25%;list-style-type: none;text-align: center;}
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
