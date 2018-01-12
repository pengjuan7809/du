<template>
  <div class="home">

 

 <div v-if="invoice">
 HI welcome to world 
 <button class="quitlogin"  @click="out">退出</button>
 </div>
  <div v-else>
    <button class="quitlogin"  @click="inn">登录</button>

 </div>


 
    <foot type='home'></foot>

  </div>
</template>

<script>
    import {mapGetters,mapState, mapActions,mapMutations} from 'vuex' 
    import foot from '../../components/foot'
    import {removeStore} from '../../config/mUtils'
export default {
  data () {
    return {
      value: '111',
  
    }
  },
    computed: {
    ...mapState(['userInfo','invoice']),
    ...mapGetters(['currentUser'])
    },
  components:{
    foot
  },    
    methods: {
          ...mapMutations([
              'OUT_LOGIN'
          ]),      
        ...mapActions([
            'getUserInfo'
        ]),
        async out(){this.invoice=true},
        async inn(){this.invoice=false},
            //退出登录
            async outLogin(){
                this.OUT_LOGIN();
            //    this.$router.go(-1);
                removeStore('user_id')
             //   await signout();
            },        
    }, 
      mounted(){
          //获取用户信息
          this.getUserInfo(); 
   console.log('444'+this.userInfo)
      },
        watch: {

        }      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->