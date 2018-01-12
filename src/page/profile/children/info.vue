<template>
    <div  class="rating_page" >
<x-header :left-options="{backText: '返回'}"  style="width:100%;position:fixed;left:0;top:0;z-index:100;">账户信息</x-header>
 
<br><br><br>
 

<x-button  link="/profile" type="primary">返回</x-button>

    </div>
</template>

<script>
import { XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon,XButton} from 'vux'
    export default {
        data(){
            return {

            }
				},
    components:{
    XHeader, Swipeout, SwipeoutItem, SwipeoutButton,Icon,XButton 
    },
    methods:{
                    //选择地址
            chooseAddress(){
               // this.CHOOSE_ADDRESS({address, index});
                this.$router.go(-1);
            },
    }				
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import 'src/style/mixin';
  
    .rating_page{
        padding: 44px 0 0px;
        z-index: 999;
    }

</style>
