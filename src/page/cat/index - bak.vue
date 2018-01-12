<template>
<div class="cat">
  <x-header :left-options="{backText: ''}"  style="position:fixed;left:0;right:0;top:0;z-index:100;">分类</x-header>  
<div class="left">
<ul>
  <li v-for="(item,index) in cat1" :key="index" @click="chang(item.catid)">{{item.catname}}</li>

</ul>

</div>
<div class="right">
  <ul  v-show="sub896">
    <li v-for="(item,index) in catFdq" :key="index">
      <h2>{{item.type}}</h2>
      <p v-for="(item,index) in item.count1" :key="index">
      	<router-link :to="{name: 'List', params: { id: item.catname }}">
        {{item.catname}}
       </router-link>
      	</p>
    </li> 
  </ul>
  <ul  v-show="sub3744">
    <li v-for="(item,index) in cat3" :key="index">
      <h2>{{item.type}}</h2>
      <p v-for="(item,index) in item.count1" :key="index">{{item.catname}}</p>
    </li> 
  </ul>  
</div>
<foot :sel=sel></foot> 
</div>


</template>


<script>
import foot from "../../components/foot";
import {cats,cat} from '../../service/getData'
import { XHeader,Tabbar, TabbarItem } from 'vux'
export default {
name: 'page-search',
data() {
  return {
    sel:1,
    value: '',
    // 默认数据  
    cat1: [],
    catFdq: [],
    cat3: [],
    sub896:false,
    sub3744:false,
 
  }
},
    components:{
 XHeader,Tabbar, TabbarItem,foot
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

}
}


}

</script>


<style lang="scss" scoped>
.cat{
  padding: 44px 0 56px;
  overflow: auto;
  box-sizing: border-box
}
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
// .cat {
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 53px;
//     left: 0;
// }
.weui-tabbar{position: fixed}
</style>
