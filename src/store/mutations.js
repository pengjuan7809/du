import {
	RECORD_ADDRESS,
	ADD_CART,
	REDUCE_CART,
	INIT_BUYCART,
	CLEAR_CART,
	RECORD_SHOPDETAIL,
	RECORD_USERINFO,
	GET_USERINFO,
	SET_USERINFO,
	CONFIRM_REMARK,
	CONFIRM_INVOICE,
	CHOOSE_SEARCH_ADDRESS,
	SAVE_GEOHASH,
	CONFIRM_ADDRESS,
	CHOOSE_ADDRESS,
	NEED_VALIDATION,
	SAVE_CART_ID_SIG,
	SAVE_ORDER_PARAM,
	CHANGE_ORDER_PARAM,
	ORDER_SUCCESS,
	SAVE_SHOPID,
	SAVE_ORDER,
	OUT_LOGIN,
	RETSET_NAME,
	SAVE_AVANDER,
	SAVE_ADDRESS,
	SAVE_ADDDETAIL,
	SAVE_QUESTION,
	ADD_ADDRESS,
	BUY_CART,
} from './mutation-types.js'

import {setStore, getStore,removeStore} from '../config/mUtils'

// import {localapi, proapi} from 'src/config/env'

export default {
	updateLoadingStatus (state, payload) {
		state.isLoading = payload.isLoading
	  },	

	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.user_id);
		setStore('user_name', info.user_name);
	},
	[SET_USERINFO](state, info) {
		state.userInfo = info;
		setStore('userInfo', JSON.stringify(info));
	},	
	//获取用户信息存入vuex
	[GET_USERINFO](state,info) {
		 state.userInfo = {...info};
		// if(sessionStorage.getItem('user_id')){
			
		// 	state.userInfo=  {
		// 		   user_id: sessionStorage.getItem('user_id'),
		// 		   user_name: sessionStorage.getItem('user_name')
		// 		 };			
			   
		//    }else{
		// 	state.userInfo = null;
			
		//    }		
	},

	//退出登录
	[OUT_LOGIN](state) {
		state.userInfo = null;
		state.login = false;
		removeStore('userInfo');
	}

}
