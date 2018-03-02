<template>
    <div  class="rating_page" >
        <x-header :left-options="{backText: '返回'}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">账户信息</x-header>
        <div v-if="userInfo">
            <group>
            <cell-box is-link>
                <input type="file"  name="logo" accept="audio/mpeg,image/png,image/jpeg"  class="profileinfopanel"  ref="avatarInput" @change="changeAvatar($event)"/>
                <span style="flex:1">头像</span><img :src="userInfo.user_photo" class="privateImage">
            </cell-box>
            <cell-box>
                <span style="flex:1">用户名</span>{{userInfo.user_name}}
            </cell-box>            
            </group>
            <!-- <form method="POST" enctype="multipart/form-data" class="form-horizontal" @submit.prevent="submit" ref="inputUpload">
                <input type="file"  name="logo" accept="audio/mpeg,image/png,image/jpeg"  class="profileinfopanel"  ref="avatarInput" @change="changeAvatar($event)"/>
                <button native-type="submit" class="el-icon-upload">上传</button>
            </form> -->
 
            <div style="margin:10px">
                <x-button type="primary" @click.native.stop.prevent="outLogin">退出登录</x-button>
            </div>
            
        </div>
        <div v-else>        
        <router-link :to="{name:'Login'}"> <x-button type="warn">登录</x-button> </router-link>
        </div> 
        <div>{{alertText}}</div>
    </div>
</template>

<script>
import {mapGetters,mapState, mapActions,mapMutations} from 'vuex' 
import { XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon,XButton, Group, Cell, CellBox } from 'vux'
import {removeStore} from '@/config/mUtils'

export default {
    data(){
        return {
            alertText:''
        }
    },
    components:{
        XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon,XButton , Group, Cell, CellBox 
    },
    mounted(){

    },
    computed: {
    ...mapState(['userInfo']),
   // ...mapGetters(['currentUser'])
    },     
    methods:{
        changeAvatar(e){
             var file = e.target.files[0];
             if(file){
                 this.submit();
             }
        },
            async submit(){
                // let _this=this;
                //上传头像
                if (this.userInfo) {
                    let data = new FormData();
                    data.append('logo', this.$refs.avatarInput.files[0]);
                    data.append('userId', this.userInfo.user_id);
                    try{
                        let _this=this;
                        _this.$http.post('avatar',data,{
                            headers: {
                            "Content-Type": "multipart/form-data"
                            }                             
                        }).then((res)=>{
                            this.userInfo.user_photo = res.data.photo;
                            console.log('success');
                        },(err)=>{
                            console.log('fail');
                        })                        
                    }catch (error) {
                        this.showAlert = true;
                        this.alertText = '上传失败';
                        throw new Error(error);
                    }
                }
            },        
                    //选择地址
            chooseAddress(){
               // this.CHOOSE_ADDRESS({address, index});
                this.$router.go(-1);
            },
        ...mapMutations([
            'OUT_LOGIN'
        ]),
        outLogin(){
            
            this.OUT_LOGIN();
                this.$router.go(-1);
                removeStore('user_id')            
 
        }              
    }				
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/style/mixin';
    .rating_page{
        // padding: 44px;
        z-index: 999;
    }
.profileinfopanel{
    display: block;
    position: absolute;
    opacity: 0; 
    top: 0;
    left: 0;
    width: 100%;
    height: 71px;
}      
.privateImage {
    display: inline-block;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    vertical-align: middle;
    text-align: right;
    margin-right: 13px;
}
</style>
