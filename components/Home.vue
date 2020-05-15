<template>
    <div>
        <van-nav-bar class="headbg">
            <template #title>LOGO</template>
        </van-nav-bar>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#EB4247" lazy-render="{{true}}" height="258">
            <van-swipe-item v-for="(lb, i) in datas.lb" :key="lb.id">
                <van-image fit="cover" width="100%" :src="imghost+lb.url" />
            </van-swipe-item>
        </van-swipe>
        <van-grid :border="false" square>
            <van-grid-item :to="{ path: '/cate', query: {cid: cate.id, title: cate.name}}" v-for="(cate, i) in datas.cate" :key="cate.id" class="gridicon" :icon="cate.tubiao == '' ? './imgs/home/jiaoyi.png' : cate.tubiao" :text="cate.name" />
        </van-grid>
        <div class="slideggbox bgfff clearfix">
            <div class="fl ggtt fsz16">公告</div>
            <van-swipe class="" :show-indicators="false" vertical :autoplay="3000" height="30">
                <van-swipe-item>
                    <span class="fsz14 fcol666">公告公告公告公告</span>
                </van-swipe-item>
                <van-swipe-item>
                    <span class="fsz14 fcol666">公告公告公告公告公告公告公告公告公告公告公告公告</span>
                </van-swipe-item>
            </van-swipe>
        </div>
        <goods></goods>
        <van-button type="primary" size="large" to="/login">大号按钮</van-button>
    </div>
</template>
<script>
module.exports = {
    name: 'home',
    data () {
        return {
            msg:'首页',
            datas: {//存放请求数据
                lb:{},
                cate:{}
            }
        }
    },
    components:{
        'goods': httpVueLoader('./Goods.vue')
    },
    watch: {},
    created () {
        let that = this;
        that.utils.vajax('post', 'lunbotu', {}).then(res => {
            let code = res.data.stare;
            let msg = res.data.msg;
            let myDatas = res.data.data;
            if(code == 200){
                that.$set(that.datas, 'lb', myDatas);
            }else{
                console.log(msg);
            }
        }).catch(err => {
            //vant.Toast.fail('加载失败！');
        });
        that.utils.vajax('post', 'hqfl', {}).then(res => {
            let code = res.data.stare;
            let msg = res.data.msg;
            let myDatas = res.data.data;
            if(code == 200){
                that.$set(that.datas, 'cate', myDatas);
            }else{
                console.log(msg);
            }
        }).catch(err => {
            //vant.Toast.fail('加载失败！');
        });
    },
    mounted () {},
    methods: {
        openpage(){
            alert(111);
        }
    }
}
</script>
 
<style>

</style>