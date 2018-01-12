<template>
  <div class="login">
<x-header :left-options="{backText: ''}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">登录</x-header> 

        <form class="loginForm"  v-on:submit.prevent>
<group>
    <x-input title="账号" placeholder="请输入用户名" novalidate  v-model.lazy="userAccount"></x-input>
    <x-input title="密码" placeholder="请输入密码" novalidate  v-model="passWord"></x-input>
</group>
 <div style="padding:15px;">
    <x-button @click.native="mobileLogin" type="primary"> 登录</x-button>
</div>            
 
        </form>
 

        <div>{{alertText}}</div>
    

  </div>
</template>

<script>
import {XHeader,XInput, Group, XButton } from 'vux'
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      userAccount:'',
       passWord:'',
        userInfo: null, //获取到的用户信息 
        alertText:''
    }
  },
    components:{
     XHeader,XInput, Group, XButton
    },  
  mounted(){
 

  },
    methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),      
            //发送登录信息
             mobileLogin(){
                    if (!this.userAccount) {
                        this.showAlert = true;
                        this.alertText = '请输入用户 名';
                        return
                    }else if(!this.passWord){
                        this.showAlert = true;
                        this.alertText = '请输入密码';
                        return
                    }
                    //用户名登录
                   // this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
             this.userInfo = {
				user_id: this.passWord,
				user_name:  this.userAccount
			  }
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (!this.userInfo.user_id) {
                     // 没有此用户
                }else{
                    this.RECORD_USERINFO(this.userInfo);
                    this.$router.go(-1);

                }
            },      
    },
        watch: {
 
        }      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->、
<style lang="scss" scoped>
.login{
  padding: 44px 0 56px;
  overflow: auto;
  box-sizing: border-box
}
</style>

 