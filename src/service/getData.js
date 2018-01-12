import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 获取首页banner
 */

export const banners = () => fetch('/ezaisheng/apph5/index/banner.do');

/**
 * 获取首页最新现货
 */

export const homeproduct = (pageNo,pageSize='4') => fetch('/ezaisheng/apph5/index/queryZXSellBuyInfo.do',{
	pageNo:pageNo,
	pageSize:pageSize
});
/**
 * 获取竞价
 */

export const auction = (pageNo,pageSize='4',status) => fetch('/ezaisheng/apph5/auction/go/searchAuction.do',{
	pageNo:pageNo,
	pageSize:pageSize,
	status:status
});
/**
 * 获取商城
 */

export const mall = (pageNo,pageSize='4',pricesort,hotsort,v='') => fetch('/ezaisheng/apph5/index/querySeBuSpOrInfor.do',{
	pageNo:pageNo,
	pageSize:pageSize,
	pricesort:pricesort,
	hotsort:hotsort,
	title:v
});
/**
 * 获取分类
 */

export const cats = () => fetch('/ezaisheng/apph5/index/getfristcategory.do');

export const cat = (id) => fetch('ezaisheng/apph5/index/gettwtscategory.do',{catid:id});

/**
 * 获取订单
 */

export const order = (pageNo,pageSize='5') => fetch('/ezaisheng/apph5/index/querySeBuSpOrInfor.do',{
	pageNo:pageNo,
	pageSize:pageSize
});
/**
 * 获取用户信息
 */
 // export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});
  export const getUser = () => fetch('ezaisheng/apph5/index/gettwtscategory.do', {user_id: getStore('user_id')});


/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');
