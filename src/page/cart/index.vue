<template>
<div style="padding-top: 46px;  padding-bottom: 111px;">
  <x-header :left-options="{showBack: false}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">购物车</x-header>
  <main class="cart_box">
  <div class="cart_content clearfix" v-for="(item,index1) in cartDatas" :key="index1">
      <div class="cart_shop clearfix">
          <div class="cart_check_box">
              <div class="check_box">
                <input type="checkbox" class="ui-checkbox c-shop" v-model="item.selected"  @click="selectShop(item)">
              </div>
          </div>
          <div class="shop_info clearfix">
              <img src="../../assets/images/buy-logo.png" alt="" class="shop_icon">
              <span class="shop_name">{{item.shop_name}}</span>
          </div>
          <div class="cart_free clearfix">
              <span class="free_tip">优惠券></span>
          </div>
      </div>
      <div class="cart_item"  v-for="(good,index) in item.list" :key="index">
          <div class="cart_item_box">
              <div class="check_box">
                <input type="checkbox" class="ui-checkbox c-goods" v-model="good.selected" @click="selecteItem(good)">
              </div>
          </div>
          <div class="cart_detial_box clearfix">
              <a href="#" class="cart_product_link">
                  <img :src="good.img" alt="">
              </a>
              <div class="item_names">
                  <router-link :to="{path:'/detail/'+good.id}">
                      <span>{{good.name}}</span>
                  </router-link>
              </div>
              <div class="cart_weight">
                  <i class="my_weigth">重量:0.45kg</i>
                  <span class="my_color">颜色:AT800/16</span>
              </div>
              <div class="cart_product_sell">
                  <span class="product_money">￥<strong class="real_money">{{good.price}}</strong>.00</span>
                  <div class="cart_add clearfix">
                      <span class="my_jian"  @click="calcitemNum(-1, good)">-</span>
                      <input type="tel" class="my_count" :value="good.num"  v-on:keyUp="numEntry(good)" v-on:keyDown="numEntry(good)">
                      <span class="my_add"  @click="calcitemNum(1, good)">+</span>
                  </div>
              </div>
              <div class="cart_del clearfix" @click="delGoods(index1,index)">
                  <div class="del_top">
                  </div>
                  <div class="del_bottom">
                  </div>
              </div>
          </div>
      </div>    
  </div>
  </main>
<footer class="cart_footer">
    <div class="all_check_box">
        <div class="check_box">
            <input type="checkbox" name="c-all" class="ui-checkbox c-all" v-model="selecteAllState" @click="selecteAll">
        </div>
        <span>全选</span>
    </div>
    <div class="count_money_box">
        <div class="heji">
            <strong>合计:</strong>
            <strong>￥</strong>
            <strong>{{totalNowPrice}}</strong>
        </div>
        <div class="total_money clearfix">
            <span>总额:</span>
            <i>￥</i>
            <span>537.80</span>
            <span>立减:</span>
            <i>￥</i>
            <span>0.00</span>
        </div>
            
        <router-link :to="{path:'/confirmOrder'}"  class="go_pay">                       
        <span>去计算({{totalNum}})</span> 
        </router-link>
            
    </div>
</footer>
<foot :sel="sel"> </foot>
    <div v-transfer-dom>
        <confirm v-model="show"
        :close-on-confirm="false"
        title="操作提示"
        @on-cancel="onCancel"
        @on-confirm="onConfirm"
        @on-show="onShow"
        @on-hide="onHide">
        <p style="text-align:center;">确定咩？</p>
        </confirm>
    </div>        
</div>
</template>


<script>
import {XHeader, Confirm,Loading, TransferDomDirective as TransferDom } from 'vux'
import foot from "../../components/foot";
const goodsObj = [
  {
    shop_name : '大胖的店',
    selected : false,
    list : [
      {
        name : '麻辣二胖',
        price : 23.00,
        realStock : 10,
        fare : 1.5,
        num : 1,
        selected : false,
      },

      {
        name : '香辣二胖',
        price : 21.00,
        realStock : 2,
        fare : 1.5,
        num : 2,
        selected : false,
      },

      {
        name : '红烧二胖',
        price : 88.00,
        realStock : 8,
        fare : 1.5,
        num : 4,
        selected : false,
      }
    ]
  },

  {
    shop_name : '二胖的店',
    selected : false,
    list : [
      {
        name : '漂亮的裙子',
        price : 166.00,
        realStock : 10,
        fare : 2,
        num : 1,
        selected : false,
      },

      {
        name : '漂亮的短袖',
        price : 188.00,
        realStock : 2,
        fare : 1.5,
        num : 2,
        selected : false,
      },

      {
        name : '漂亮的鞋子',
        price : 299.00,
        realStock : 1,
        fare : 3,
        num : 1,
        selected : false,
      }
    ]
  },

  {
    shop_name : '胖胖的店',
    selected : false,
    list : [
      {
        name : '福满多',
        price : 3.00,
        realStock : 10,
        fare : .5,
        num : 10,
        selected : false,
      },

      {
        name : '精品卫龙',
        price : 1.50,
        realStock : 2,
        fare : 2,
        num : 2,
        selected : false,
      },

      {
        name : '周长江',
        price : 2.50,
        realStock : 3,
        fare : 5,
        num : 2,
        selected : false,
      }
    ]
  },
]
const itemObj = [
      {
    shop_name : '大胖的店',
    selected : false,
    list : []
      }
]
export default {
    data() {
        return {
            sel:3,
           // cartDatas : goodsObj,
            selecteAllState: false,
            show: false,
            shopindex:'',
            goodsindex:'',
            cartDatas:itemObj
        }
    },
    mounted(){
        this.initdata();
    } ,
    directives: {
        TransferDom
    },   
    components:{
        XHeader,Confirm,Loading,foot
    },
    computed: {
        totalNowPrice () {
            let price = 0
            this.cartDatas.forEach(shop => {
            shop.list.forEach(item => {
                if (item['selected']) {
                price += item.num * item.price
                }
            })
            })
            return price.toFixed(2)
		},
        totalNum () {
            let num = 0
            this.cartDatas.forEach(shop => {
            shop.list.forEach(item => {
                if (item['selected']) {
                num += item.num
                }
            })
            })
            return num
		},			
    } ,
    methods:{	
        initdata(){
            let _this=this;
            _this.$http.get('/cart').then((res)=>{ 
                var list=[];              
                res.data.forEach((item,index) => {
                    list.push({
                        id:item.product_id,
                        name : item.product_name,
                        price:item.product_uprice,
                        realStock : item.product_num,
                        fare: item.goods_num,
                        num: item.goods_num,
                        img: item.product_img_url,
                        selected  : false    
                    });
                });
                _this.cartDatas[0].list=list;
                  console.log(_this.cartDatas);

            },(err)=>{

            })
        },
         // 判断是否选择所有商品的全选
        checkSelect () {
          let allSelected = true
          this.cartDatas.forEach(shop => {
            let shopSelectAll = true
            shop.list.forEach(item => {
              if (!item['selected']) {
                shopSelectAll = false
                allSelected = false
              }
            })
            shop.selected = shopSelectAll
          })
          this.selecteAllState = allSelected
        },        		
		// 单个选择
		selecteItem (item) {
		  item.selected = !item.selected
			this.checkSelect()
		},
        // 每个店铺全选
        selectShop (shop) {
          shop.selected = !shop.selected
          shop.list.forEach(item => {
            item['selected'] = shop.selected
          })
          this.checkSelect()
        },
         // 全部商品全选
        selecteAll () {
          this.selecteAllState = !this.selecteAllState
          this.cartDatas.forEach(shop => {
            shop.selected = this.selecteAllState
            shop.list.forEach(item => {
              item['selected'] = this.selecteAllState
            })
          })
        },
        //商品数量加减操作
        calcitemNum (step, obj) {
          //item.number += Math.floor(step)
          if(step == -1){
              if(obj.num <= obj.realStock && obj.num > 1){
                  obj.num = parseInt(obj.num) - 1;
              }
          }else{
              if(obj.num < obj.realStock){
                  obj.num = parseInt(obj.num) + 1;
              }
          }
        },
        // 用户填写容错处理
        numEntry(obj) {     
            if ( obj.num <=1 ) {
                obj.num = 1;
            }

            if ( obj.num > obj.realStock ) {
                obj.num = obj.realStock;
            }
        },
    // 删除操作
        delGoods(shopindex, goodsindex) {
					this.show = true
					this.shopindex=shopindex
					this.goodsindex=goodsindex
          //  shop.list.splice(index,1)
        },       
        onCancel () {
            console.log('on cancel')
        },
        onConfirm () {					
            console.log('on confirm')
            this.cartDatas[this.shopindex].list.splice(this.goodsindex,1)
            if(this.cartDatas[this.shopindex].list.length<1){
                this.cartDatas.splice(this.cartDatas[this.shopindex],1)
            }
            this.$vux.loading.show({
                transition: '',
                text: '请求加载中...'
            })
            setTimeout(() => {
                this.$vux.loading.hide()
                this.show = false
            }, 1000)
        },
        onHide () {
            console.log('on hide')
        },
        onShow () {
            console.log('on show')
        }                
}      

 }
</script>

<style lang="scss" scoped>
body {
    background-color: #F0F2F5;
}
.child-view{
  height: auto;
}
#carttp .top_bar {
    position: static;
}

.cart_box {
    width: 100%;
}

.cart_box .cart_tip {
    width: 100%;
    height: 42px;
    border-bottom: 1px solid #bfbfbf;
    line-height: 42px;
    text-align: center;
    color: #aaa;
}

.login {
    color: #fff;
    display: inline-block;
    background: #f15353;
    border-radius: inherit;
    padding: 4px 12px;
    line-height: 1.2em;
    color: #fff;
}

.cart_content {
    background-color: #fff;
    margin: 10px 8px 0px 8px;
    overflow: hidden;
}

.cart_content .cart_shop {
    height: 44px;
    width: 100%;
}


/*the common checkbox*/

.check_box {
    display: block;
    width: 20px;
    height: 20px;
    background: url("../../assets/images/shop-icon.png") no-repeat;
    background-size: 50px 100px;
    background-position: 0 0;
    position: absolute;
    left: 6px;
    top: 12px;
}
.check_box input {
    display: block;
    width: 20px;
    height: 20px;
    background: url("../../assets/images/shop-icon.png") no-repeat;
    background-size: 50px 100px;
    background-position: 0 0;
    position: absolute;
    left: 0px;
    top: 0px;
		appearance: none;
}

.check_box input:checked{
    display: block;
    width: 20px;
    height: 20px;
    background: url("../../assets/images/shop-icon.png") no-repeat;
    background-size: 50px 100px;	
	background-position: -25px 0;
}
.check_box[checked] {
    background-position: -25px 0;
}

.cart_check_box {
    width: 40px;
    height: 40px;
    position: absolute;
}

.shop_info {
    width: 100px;
    float: left;
    height: 44px;
    line-height: 44px;
    margin-left: 32px;
}

.shop_info .shop_icon {
    width: 16px;
    height: 13px;
    display: inline-block;
}

.cart_free {
    height: 44px;
    float: right;
    line-height: 44px;
    text-align: center;
    color: #F23C30;
    padding-right: 4px;
}

.cart_item {
    background-color: #fff;
    height: 130px;
    position: relative;
    width: 100%;
}

.cart_item .cart_item_box {
    position: relative;
    width: 40px;
    float: left;
    background-color: #fff;
}

.cart_item_box .check_box {
    position: absolute;
    top: 31px;
    left: 6px;
}

.cart_item .cart_detial_box {
    float: left;
    background-color: #fff;
    margin-left: 30px;
    width: 100%;
}

.cart_detial_box .cart_product_link {
    width: 100px;
    height: 100px;
    display: block;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 10px;
    float: left;
    background-color: #fff;
    margin-right: 10px;
    box-sizing: border-box
}

.cart_detial_box .cart_product_link img {
    width: 100%;
    height: 100%;
    display: block;
}

.cart_detial_box .item_names {
    height: 34px;
    overflow: hidden;
    a{
        display: block;
        line-height: 21px;
        height: 21px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
    }
}

.cart_detial_box .cart_weight {
    margin-top: 2px;
    color: #BCCCCA;
    font-size: 12px;
    margin-bottom: 10px;
    line-height: 16px;
}

.cart_detial_box .cart_weight .my_weigth {
    font-style: normal;
}

.cart_detial_box .cart_product_sell {
    width: 100%;
}

.cart_detial_box .cart_product_sell .product_money {
    font-size: 12px;
    color: #F23030;
}

.real_money {
    font-size: 16px;
}

.cart_product_sell .cart_add {
    width: 100px;
    height: 26px;
    float: right;
    margin-right: 20px;
}

.cart_product_sell .cart_add .my_add,
.cart_product_sell .cart_add .my_jian {
    width: 25px;
    height: 24px;
    border: 1px solid #CBCBCB;
    text-align: center;
    float: left;
}

.cart_product_sell .cart_add .my_add {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.cart_product_sell .cart_add .my_jian {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.cart_product_sell .cart_add .my_count {
    height: 24px;
    width: 30px;
    border: 0;
    border-top: 1px solid #CBCBCB;
    border-bottom: 1px solid #CBCBCB;
    text-align: center;
    float: left;
}

.cart_detial_box .cart_del {
    position: absolute;
    right: 11px;
    top: 98px;
}

.cart_del .del_top {
    width: 20px;
    height: 5px;
    background: url("../../assets/images/delete_up.png") no-repeat;
    background-size: 20px 5px;
    margin-left: -1px;
}

.cart_del .del_bottom {
    width: 18px;
    height: 18px;
    background: url("../../assets/images/delete_down.png") no-repeat;
    background-size: 18px 18px;
    margin-top: -3px;
}

.cart_footer {
    width: 100%;
    height: 50px;
    border-top: 1px solid #cccccc;
    position: fixed;
    bottom: 56px;
    left: 0;
    background-color: #fff;
}

.cart_footer .all_check_box {
    width: 80px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
}

.cart_footer .all_check_box .check_box {
    top: 15px;
    left: 14px;
}

.cart_footer .all_check_box span {
    text-align: center;
    line-height: 50px;
    margin-left: 36px;
    color: #232326;
    font-weight: 600;
}

.cart_footer .count_money_box {
    float: left;
    height: 50px;
    margin-left: 80px;
}

.count_money_box .heji {
    margin-top: 6px;
}

.count_money_box .total_money {
    color: #aaa;
    font-size: 12px;
}

.count_money_box .total_money i {
    font-style: normal;
    text-decoration: none;
}

.count_money_box .go_pay {
    position: absolute;
    right: 0;
    top: 0;
    max-width: 98px;
    line-height: 50px;
    text-align: center;
    background: #f23030;
    color: #fff;
    font-size: 16px;
    height: 49px;
    margin-top: 1px;
    padding: 0 16px;
}

.pop {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
    padding: 0 5%;
}

.pop .pop_box {
    width: 85%;
    height: 140px;
    background-color: #fff;
    border-radius: 8px;
    margin: 50% auto;
    padding: 0 5%;
}

.pop_box .del_info {
    text-align: center;
    line-height: 70px;
    font-size: 16px;
    color: #888888;
}

.pop_box .del_cancel {
    float: left;
    width: 35%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
    margin-right: 15%;
}

.pop_box .del_ok {
    float: left;
    width: 35%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
    background: #D8505C;
    color: #fff;
    margin-left: 15%;
}

@keyframes delBoxOut {
    0% {
        opacity: 0;
        transform: translateY(-2000px);
        -webkit-transform: translateY(-2000px);
    }
    60% {
        opacity: 1;
        transform: translateY(30px);
        -webkit-transform: translateY(30px);
    }
    75% {
        transform: translateY(-10px);
        -webkit-transform: translateY(-10px);
    }
    90% {
        transform: translateY(5px);
        -webkit-transform: translateY(5px);
    }
    100% {
        opacity: 1;
        transform: none;
        -webkit-transform: none;
    }
}

.delBoxOut {
    animation: delBoxOut 1s ease;
}

</style>
