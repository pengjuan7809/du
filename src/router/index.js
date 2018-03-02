import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home/home'
import Cat from '@/page/cat/index'
import Auction from '@/page/auction/index'
import Mall from '@/page/mall/index'
import cattest from '@/page/cat/test'
import Search from '@/page/search/search'
import Order from '@/page/profile/order'
import List from '@/page/cat/list'
import Detail from '@/page/cat/detail'
import Cart from '@/page/cart/index'
import Login from '@/page/login/login'
import Reg from '@/page/login/reg'
//const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
// const remark = r => require.ensure([], () => r(require('../page/confirmOrder/children/remark')), 'remark')
// const payment = r => require.ensure([], () => r(require('../page/confirmOrder/children/payment')), 'payment')
// const userValidation = r => require.ensure([], () => r(require('../page/confirmOrder/children/userValidation')), 'userValidation')
// const invoice = r => require.ensure([], () => r(require('../page/confirmOrder/children/invoice')), 'invoice')
 //const chooseAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/chooseAddress')), 'chooseAddress')
// const addAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/addAddress')), 'addAddress')
// const searchAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/children/searchAddress')), 'searchAddress')
import confirmOrder from '@/page/confirmOrder/confirmOrder'
import chooseAddress from '@/page/confirmOrder/children/chooseAddress'
import addAddress from '@/page/confirmOrder/children/children/addAddress'
const payment = r => require.ensure([], () => r(require('../page/confirmOrder/children/payment')), 'payment')
const finish = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/finish')), 'finish')

const profile = r => require.ensure([], () => r(require('../page/profile/index')), 'profile')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const faxian = r => require.ensure([], () => r(require('../page/faxian/index')), 'faxian')
// const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')

import Baidu from '@/page/baidu/index'

Vue.use(Router)

export default new Router({
  routes: [    
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/baidu',
      name: 'Baidu',
      component: Baidu
    },    
    {
      path: '/search',
      name: 'Search',
      component: Search
    },    
    {
      path: '/faxian',
      name: 'faxian',
      component: faxian
    },    
        //确认订单页
        {
          path: '/confirmOrder',
          component: confirmOrder,
           children: [
             {
              path: 'chooseAddress', //选择地址
              component: chooseAddress ,
              children: [{
                  path: 'addAddress', //添加地址
                  component: addAddress
              }, ]              
            },{
                  path: 'payment', //付款页面
                  component: payment,
                  children: [{
                    path: 'finish', //支付成功
                    component: finish
                }, ]                   
              }            
           ]
      },
        //个人信息页
        {
          path: '/profile',
          component: profile,
          children: [{
              path: 'info', //个人信息详情页
              component: info
          }]
      },               
    {
      path: '/cat',
      name: 'Cat',
      component: Cat
    },
    {
      path: '/list/:id',
      name: 'List',
      component: List
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/auction',
      name: 'Auction',
      component: Auction
    },
    {
      path: '/mall',
      name: 'Mall',
      component: Mall
    },
    // {
    //   path: '/profile',
    //   name: 'Profile',
    //   component: Profile
    // },
     {
      path: '/cattest',
      name: 'cattest',
      component: cattest
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },    
    {
      path: '/order',
      name: 'Order',
      component: Order
    }
  ]
})
