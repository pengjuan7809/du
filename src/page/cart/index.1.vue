<template>
<div style="  padding-top: 46px;  padding-bottom: 55px;">
  <x-header :left-options="{backText: ''}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">购物车</x-header>
  <div class="store-item" v-for="(item, index1) in goodsObj">
      <p>
        <span v-html="item.name"></span>
        <label class="choose-all">
          <input type="checkbox" name="all" @click="chooseShopGoods(index1)" v-model="item.checked" />
          <span>全选</span>
        </label>
      </p>
      <table class="store-item">
        <col width="10%"></col>
        <col width="15%"></col>
        <col width="15%"></col>
        <col width="10%"></col>
        <col width="40%"></col>
        <col width="10%"></col>
        <thead class="thead">
        <tr>
            <th>选择</th>
            <th>商品</th>
            <th>单价</th>
            <th>运费</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
      </thead>
        <tbody>
        <tr v-for="(data, index) in item.list">
            <td>
              <input type="checkbox" name="all" v-model="data.checked" v-on:click="choose(index1, index)" />
            </td>
            <td>
              <p>{{index}}<span v-html="data.name"></span></p>
            </td>
            <td v-html="(data.price).toFixed(2)"></td>
            <td v-html="(data.fare).toFixed(2)"></td>
            <td>
              <div class="quantity-selector clearfix">
                <span class="reduce" v-on:click="numChange(index1, index, -1)" v-bind:class="{ 'disable' : data.num==1 }">－</span>
                <input type="number" class="number" v-bind:data-realStock="data.realStock" v-on:keyUp="numEntry(index1, $index)" v-on:keyDown="numEntry(index1, index)" v-model="data.num"/>
                <span class="add" v-on:click="numChange(index1, index, 1)" v-bind:class="{ 'disable' : data.num==data.realStock }">＋</span>
              </div>
            </td>
            <td><a href="javascript:;"   rel="external nofollow" v-on:click="delGoods(index1, index)">删除</a></td>
          </tr>
      </tbody>
      </table>
    <div class="cal-store-box">
      <p>店铺总运费: <span v-html="calEveryFare(index1)"></span></p>
      <p>店铺商品总金额: <span v-html="calEveryStore(index1)"></span></p>
    </div>
  </div>
   
  <div class="store-footer">
      <label>
        <input type="checkbox" v-on:click="chooseAllGoods($event)" v-model="allChecked" />
        <span>全选</span>
      </label>
      <div class="cal-box">
        <p>商品总运费:<span v-html="totalFare.toFixed(2)"></span></p>
        <p>商品总金额:<span v-html="totalMoney.toFixed(2)"></span></p>
      </div>
    <input type="button" value="结算">
  </div>

</div>
</template>


<script>
import {cats,cat} from '../../service/getData'
import { XHeader } from 'vux'
const goodsObj = [
  {
    name : '大胖的店',
    checked : false,
    list : [
      {
        name : '麻辣二胖',
        price : 23.00,
        realStock : 10,
        fare : 1.5,
        num : 1,
        checked : false,
      },

      {
        name : '香辣二胖',
        price : 21.00,
        realStock : 2,
        fare : 1.5,
        num : 2,
        checked : false,
      },

      {
        name : '红烧二胖',
        price : 88.00,
        realStock : 8,
        fare : 1.5,
        num : 4,
        checked : false,
      }
    ]
  },

  {
    name : '二胖的店',
    checked : false,
    list : [
      {
        name : '漂亮的裙子',
        price : 166.00,
        realStock : 10,
        fare : 2,
        num : 1,
        checked : false,
      },

      {
        name : '漂亮的短袖',
        price : 188.00,
        realStock : 2,
        fare : 1.5,
        num : 2,
        checked : false,
      },

      {
        name : '漂亮的鞋子',
        price : 299.00,
        realStock : 1,
        fare : 3,
        num : 1,
        checked : false,
      }
    ]
  },

  {
    name : '胖胖的店',
    checked : false,
    list : [
      {
        name : '福满多',
        price : 3.00,
        realStock : 10,
        fare : .5,
        num : 10,
        checked : false,
      },

      {
        name : '精品卫龙',
        price : 1.50,
        realStock : 2,
        fare : 2,
        num : 2,
        checked : false,
      },

      {
        name : '周长江',
        price : 2.50,
        realStock : 3,
        fare : 5,
        num : 2,
        checked : false,
      }
    ]
  },
]
export default {
  data() {
    return {
      goodsObj : goodsObj,
      totalMoney : 0,
      totalFare : 0,
      allChecked : false
    }
  },
  components:{
    XHeader
  },
  methods : {

    // 全部商品全选
    chooseAllGoods : function() {
      var flag = true;
      if ( this.allChecked ) {
        flag = false;
      }
      for ( var i = 0, len = this.goodsObj.length; i < len; i++ ) {
        this.goodsObj[i]['checked'] = flag;
        var list = this.goodsObj[i]['list'];
        for ( var k = 0, len1 = list.length; k < len1; k++ ) {
          list[k]['checked'] = flag;
        }
      }
      this.allChecked = !this.allChecked;
      this.calTotalMoney();
      this.calTotalFare();
    },

    // 每个店铺全选
    chooseShopGoods : function( index) {
      var list = this.goodsObj[index]['list'],
        len = list.length;
      if ( this.goodsObj[index]['checked'] ) {
        for (var i = 0; i < len; i++ ) {
          list[i]['checked'] = false;
        }
      } else {
        for (var i = 0; i < len; i++ ) {
          list[i]['checked'] = true;
        }
      }
      this.goodsObj[index]['checked'] = !this.goodsObj[index]['checked'];

      // 判断是否选择所有商品的全选
      this.isChooseAll();

      this.cal(index);
    },

    // 单个选择
    choose : function( index1, index) {
      var list = this.goodsObj[index1]['list'],
        len = list.length;
      if ( list[index]['checked'] ) {
        this.goodsObj[index1]['checked'] = false;
        this.allChecked = false;
        list[index]['checked'] = !list[index]['checked'];
      } else {
        list[index]['checked'] = !list[index]['checked'];

        // 判断是否选择当前店铺的全选
        var flag = true;
        for (var i = 0; i < len; i++ ) {
          if ( list[i]['checked'] == false ) {
            flag = false;
            break;
          }
        }
        flag == true ? this.goodsObj[index1]['checked'] = true : this.goodsObj[index1]['checked'] = false;
      }

      // 判断是否选择所有商品的全选
      this.isChooseAll();

    //  this.cal(index1);
    },

    // 判断是否选择所有商品的全选
    isChooseAll : function() {
      var flag1 = true;
      for ( var i = 0, len = this.goodsObj.length; i < len; i++ ) {
        if ( this.goodsObj[i]['checked'] == false ) {
          flag1 = false;
          break;
        }
      }
      flag1 == true ? this.allChecked = true : this.allChecked = false;
    },

    // 商品数量控制
    numChange : function(index1, index, numChange) {
      var goods = this.goodsObj[index1]['list'][index],
        oThis = this;
      if ( numChange == 1 ) {
        goods.num++;
      } else if ( numChange == -1 ) {
        goods.num--;
      }

      if ( goods.num <= 1 ) {
        goods.num = 1;
      }

      if ( goods.num >= goods.realStock ) {
        goods.num = goods.realStock;
      }

      this.cal(index);
    },

    // 用户填写容错处理
    numEntry : function(index1, index) {
      var goods = this.goodsObj[index1]['list'][index];
      if ( goods.num <=1 ) {
        goods.num = 1;
      }

      if ( goods.num > goods.realStock ) {
        goods.num = goods.realStock;
      }
      this.cal(index);
    },

    // 计算每个店铺的商品总额
    calEveryStore : function(index) {
     // console.log(index);
      var everyStoreMoney = 0,
        list = this.goodsObj[index]['list'];
      list.forEach(function(item, index, arr) {
        if ( list[index]['checked'] ) {
          everyStoreMoney += parseFloat(item.price) * parseFloat(item.num);
        }
      });
      return everyStoreMoney.toFixed(2);
    },

    // 计算每个店铺的运费总额
    calEveryFare : function(index) {
      var everyStoreFare = 0,
        list = this.goodsObj[index]['list'];
      list.forEach(function(item, index, arr) {
        if ( list[index]['checked'] ) {
          everyStoreFare += parseFloat(item.fare) * parseFloat(item.num);
        }
      });
      return everyStoreFare.toFixed(2);
    },

    // 计算商品总金额
    calTotalMoney : function () {
      var oThis = this;
      this.totalMoney = 0;
      for ( var i = 0, len = this.goodsObj.length; i < len; i++ ) {
        var list = this.goodsObj[i]['list'];
        list.forEach(function(item, index, arr) {
          if ( list[index]['checked'] ) {
            oThis.totalMoney += parseFloat(item.price) * parseFloat(item.num);
          }
        });
      }
    },

    // 计算商品总运费
    calTotalFare : function () {
      var oThis = this;
      this.totalFare = 0;
      for ( var i = 0, len = this.goodsObj.length; i < len; i++ ) {
        var list = this.goodsObj[i]['list'];
        list.forEach(function(item, index, arr) {
          if ( list[index]['checked'] ) {
            oThis.totalFare += parseFloat(item.fare) * parseFloat(item.num);
          }
        });
      }
    },

    // 计算方法集合
    cal : function(index) {
      this.calEveryStore(index);
      this.calEveryFare(index);
      this.calTotalMoney();
      this.calTotalFare();
    },

    // 删除操作
    delGoods : function(index1, index) {
      this.goodsObj[index1]['list'].splice(index, 1);
      this.cal(index);
    }

  }

 }
</script>

<style lang="scss" scoped>
.child-view{
  min-height: 100%;
}
  a {
    text-decoration: none;
    color: #333;
  }
  .clearfix:after {
    content: ".";
    visibility: hidden;
    display: block;
    height: .1px;
    font-size: .1em;
    line-height: 0;
    clear: both;
  }
  .quantity-selector {
    margin: 0 auto;
    width: 8.571rem;
    line-height: 30px;
    border: 1px solid #d1d6e4;
    border-radius: 3px;
  }
  .quantity-selector .reduce,
  .quantity-selector .add {
    float: left;
    width: 33.33%;
    border-right: 1px solid #d1d6e4;
    text-align: center;
    cursor: pointer;
  }
  .quantity-selector .number {
    float: left;
    width: 33.33%;
    height: 30px;
    border: none;
    padding-left: 10px;
    text-align: center;
  }
  .quantity-selector .add {
    border-left: 1px solid #d1d6e4;
    border-right: none;
  }
  .quantity-selector .disable {
    color: #d2d2d2;
    cursor: default;
  }

  label {
    cursor: pointer;
  }

  .choose-all {
    margin-left: 20px;
  }

  /*店铺开始*/
  .store-item {
    width: 100%;
    margin: 30px auto;
  }
  .store-item th {
    height: 40px;
    background: #d2d2d2;
    -webkit-text-stroke: 1px #ff7500;
    font-size: 18px;
  }
  .store-item td {
    height: 60px;
    text-align: center;
  }
  .cal-store-box {
    text-align: right;
  }
  .store-footer {
    background-color: #fff;
    border-top:1px solid #ddd;
    position: fixed;
    bottom:0;
    width: 100%;
    margin: 50px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  /*店铺结束*/
</style>
