<template>
    <div>
        <top :title="title"></top>
        <div class="headbg dlstitle fsz18 fwb7">
            {{datas.ddinfo.quxiao == 2 ? '订单已取消' : (datas.ddinfo.zhuangtai == 1 ? '未付款' : (datas.ddinfo.zhuangtai == 1 ? '未发货' : '已发货'))}}
        </div>
        <div class="dditemwrap detalbox">
            <van-row gutter="15">
                <van-col span="8">
                    <van-image
                    width="9rem"
                    height="9rem"
                    fit="cover"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                    />
                </van-col>
                <van-col span="16">
                    <div class="fxv" style="height:9rem;">
                        <div class="fsz14 fcol333" style="width:100%;">{{datas.ddinfo.name}}</div>
                        <div class="fsz14 fcol333" style="color:#FC4353;">￥{{datas.ddinfo.moneydk}}</div>
                    </div>
                </van-col>
            </van-row>
        </div>
        <van-cell-group style="margin-top: 1rem;">
            <van-cell :border="false" title-style="flex:0 1 auto;" title="订单详情" value=""></van-cell>
            <van-cell :border="false" title-style="flex:0 1 auto;" title="联系方式：" :value="datas.ddinfo.mobile"></van-cell>
            <van-cell :border="false" title-style="flex:0 1 auto;" title="邮箱：" :value="datas.ddinfo.email"></van-cell>
            <!-- <van-cell :border="false" title-style="flex:0 1 auto;" title="支付方式：" :value="datas.ddinfo.money"></van-cell> -->
            <van-cell :border="false" title-style="flex:0 1 auto;" title="订单编号：" :value="datas.ddinfo.order"></van-cell>
            <van-cell :border="false" title-style="flex:0 1 auto;" title="下单时间：" :value="this.utils.formatTime(datas.ddinfo.createtime * 1000, '-')"></van-cell>
        </van-cell-group>
        <van-goods-action v-if="status">
            <div class="fxfooterboxwrap" style="text-align:right; width:100%;">
                <van-button type="primary" size="small" color="linear-gradient(90deg,rgba(253,48,50,1) 0%,rgba(254,103,103,1) 100%)" round  :to="{ path: '/buy', query: {id: goodsid}}">去支付</van-button>
            </div>
        </van-goods-action>
    </div>
</template>

<script type="module">
module.exports = {
    name: 'dddetails',
    data () {
        return {
            title:'订单详情',
            datas: {//存放请求数据
                ddinfo : {}
            },
            payid: this.$route.query.payid || '',
            status: true, //默认为未支付状态
            goodsid: 0
        }
    },
    components:{
        'top': httpVueLoader('./Header.vue')
    },
    props: [],
    watch: {
        
    },
    created () {
        let that = this;
        let hasLogin = that.islogin || localStorage.getItem('islogin');
        if(!hasLogin || hasLogin == 'false'){
            that.$router.push({ path: '/login', query: {}});
            return;
        }
        that.payid = this.$route.query.payid;
        // if(!this.$route.query.payid){
        //     that.$router.push({ path: '/login', query: {}});
        //     return;
        // }
        that.utils.vajax('post', 'orderxq', {order: that.payid}).then(res => {
            let code = res.data.stare;
            let msg = res.data.msg;
            let myDatas = res.data.data;
            if(code == 200){
                console.log(myDatas)
                that.$set(that.datas, 'ddinfo', myDatas);
                that.$set(that, 'goodsid', myDatas.goods.id);
                if(myDatas.zhuangtai == 2){
                    that.$set(that, 'status', false);//已支付隐藏支付按钮
                }
            }else{
                vant.Toast.fail('异常！');
                setTimeout(() => {
                    that.$router.push({ path: '/', query: {}});
                }, 700);
            }
        }).catch(err => {
            vant.Toast.fail('加载失败！');
            setTimeout(() => {
                that.$router.push({ path: '/', query: {}});
            }, 700);
        });
    },
    mounted () {
        
    },
    methods: {
        
    }
}
</script>
 
<style>
.dlstitle{
    padding: 2rem 1.2rem;
    color: #fff;
}
.dditemwrap.detalbox{
    background: #fff;
    padding: 1.3rem;
}
</style>