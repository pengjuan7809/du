<template>
  <div class="login">
<x-header :left-options="{backText: ''}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">登录
  <router-link slot="right" :to="{path:'reg'}">注册</router-link>
  </x-header>
        <form class="loginForm"  v-on:submit.prevent>
<group>
    <x-input title="账号" placeholder="请输入用户名" novalidate  v-model.lazy="userAccount"></x-input>
    <x-input title="密码" placeholder="请输入密码" novalidate  v-model.lazy="passWord"></x-input>
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
import {mapState, mapMutations,mapActions} from 'vuex'
export default {
  data () {
    return {
      userAccount:'xiaoyanzi',
       passWord:'admin',
        // userInfo: null, //获取到的用户信息 
        alertText:''
    }
  },
    components:{
     XHeader,XInput, Group, XButton
    },  
    mounted(){
      // if (this.userInfo) {
      //   this.$router.go(-1);
      // } 
    },
    computed:{
      ...mapState(['userInfo']),
    },  
    methods: {
      ...mapMutations([
          'RECORD_USERINFO','SET_USERINFO'
      ]),
      ...mapActions([
        'setUserInfo'
      ]),    
            //发送登录信息
             mobileLogin(){
              let _this=this;
                    if (!this.userAccount) {
                        this.showAlert = true;
                        this.alertText = '请输入用户 名';
                        return
                    }else if(!this.passWord){
                        this.showAlert = true;
                        this.alertText = '请输入密码';
                        return
                    }else{
_this.$http.post('login',{
  loginName:_this.userAccount,
  loginPawd:_this.passWord,
}).then((res)=>{
  if (res.status==200) {
    if (res.data.status==1) {
        // window.sessionStorage.userInfo=JSON.stringify(res.data);
       _this.SET_USERINFO(res.data);
        //_this.$store.dispatch('setUserInfo',res.data);
       // console.log(JSON.stringify(res.data));
         _this.$router.go(-1);
    } else {
        alert(res.data.msg);
    }

  }else{
    alert('请求出现错误');
  }
},(err)=>{

})

                    }
                    //用户名登录
                   // this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
    //          this.userInfo = {
				// user_id: this.passWord,
				// user_name:  this.userAccount
			 //  }
    //             //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
    //             if (!this.userInfo.user_id) {
    //                  // 没有此用户
    //             }else{
    //                 this.RECORD_USERINFO(this.userInfo);
    //                 this.$router.go(-1);

    //             }
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

 