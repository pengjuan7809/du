<template>
  <div class="login">
<x-header :left-options="{backText: ''}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">注册
  <router-link slot="right" :to="{path:'login'}">登录</router-link>
  </x-header>
        <form class="loginForm"  v-on:submit.prevent>
<group>
    <x-input title="账号" placeholder="请输入用户名" novalidate  v-model.lazy="userAccount"></x-input>
    <x-input title="密码" placeholder="请输入密码" novalidate  v-model.lazy="passWord"></x-input>
    <x-input title="确认密码" placeholder="请再次输入密码" novalidate  v-model.lazy="regpasswd_ag"></x-input>
</group>
 <div style="padding:15px;">
    <x-button @click.native="mobileReg" type="primary"> 登录</x-button>
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
      userAccount:'',
       passWord:'',
         regpasswd_ag: '', 
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
      mobileReg(){
      let _this=this;
            if (!this.userAccount) {
                this.showAlert = true;
                this.alertText = '请输入用户 名';
                return
            }else if(!this.passWord){
                this.showAlert = true;
                this.alertText = '请输入密码';
                return
            }else if(_this.passWord!==_this.regpasswd_ag){
              this.showAlert = true;
              this.alertText = '两次输入的密码不一致';               
            }else{
              _this.$http.post('reg',{
                regName:_this.userAccount,
                regPasswd:_this.passWord,
              }).then((res)=>{
                if (res.status==200) {
                  if (res.data.status==1) {
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

 