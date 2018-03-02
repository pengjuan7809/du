<template> 
<div class="map">
        <div class="header">
            <div class="top cl">
                <div class="choose_city fl" >
                    <em class="city1" v-text="city"></em>
                </div>
                <div class="search fl">
                    <input type="text" class="search_add" placeholder="请输入地址" v-model="searchKey" @input="simpleList" />
                     <span class="sure_btn" @click="toSearch">搜索</span>
                </div>
               
            </div>
            
            <div id="allmap"></div>

            <div class="toReloadPositon" @click="toReloadPositon"><span>重新定位</span></div>
        </div>
				    	<div class="addr-list">
				    		<ul class="items" v-if="nearAddress.length > 0">
				    			<li class="item cl" v-for="(items,i) in nearAddress" :key="i">
			    					<p class="nearAddr"> {{items.name}}</p>
			    					<p class="addr-name">{{items.city}}{{items.district}}</p>
				    			</li>
				    		</ul>
 
				    	</div>


<foot :sel="sel"></foot>
</div>
</template>

<script>
import foot from "../../components/foot";

export default {
data () {
  return {
    sel:5,
    city:'bj',
    nearAddress:[],
    searchKey:'桑德',
    lng:116.331398,
    lat:39.897445
  }
},
mounted(){
this.simpleList();
 this.toReloadPositon();
},
components: {
  foot
},  
computed:{

},
methods: { 
  toReloadPositon(){
      let _this=this;
	// 百度地图API功能
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(_this.lng,_this.lat);
	map.centerAndZoom(point,15);  

	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
      _this.lng=r.point.lng;
      _this.lat=r.point.lat;
		//	alert('您的位置：'+r.point.lng+','+r.point.lat);
	var point = new BMap.Point(r.point.lng,r.point.lat);
	map.centerAndZoom(point,15);
	var geoc = new BMap.Geocoder(); 
	
		geoc.getLocation(r.point, function(rs){
      var addComp = rs.addressComponents;
      _this.city=addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber
		});  		
			
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})
	
	// 百度地图API功能
  },  
simpleList(){
  console.log('输入');
  let _this=this;
  var jsonp = require('jsonp');
  var Arraylist=[];

jsonp('https://map.baidu.com/su?cid=131&type=0&pc_ver=0&wd='+_this.searchKey, null, function (err, data) {
  if (err) {
    console.error(err.message);
  } else {
    
    let addrlist=data.s;
    
    for (const item of addrlist) {
      var adr = new Object(); 
      adr.district = item.substring(item.indexOf("$") + 1,item.indexOf("$$")); 
      adr.name = item.substring(item.indexOf("$$") + 2,item.indexOf("$131$")); 
      adr.city = item.substring(0,item.indexOf("$")); 
      Arraylist.push(adr);         
    }
    _this.nearAddress=Arraylist;
  //  console.log(Arraylist); 
  }
});  
  
},
toSearch(){
  console.log('搜索')
}
},

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
li.item{border-bottom: 1px dashed skyblue}
.toReloadPositon{border: 1px solid rebeccapurple;padding: 5px 10px;display: inline-block}
#allmap {width: 100%;height: 232px;overflow: hidden;margin:0;font-family:"微软雅黑";}
</style>
