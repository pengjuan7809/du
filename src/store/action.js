import {getUser} from '../service/getData'
import {GET_USERINFO} from './mutation-types.js'
 import {SET_USERINFO} from './mutation-types.js'

export default {


	async getUserInfo({commit,state},userInfo) {
		// let res = await getUser();
		// commit(GET_USERINFO, res)
 
		commit(GET_USERINFO,userInfo)		
	},
	async setUserInfo({commit},userInfo){
		commit('SET_USERINFO',userInfo)
	}
}