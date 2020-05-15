<template>
    <div>
        <top :title="title"></top>
        <div class="bgfff dditem">
            <van-row gutter="10">
                <van-col span="8">
                    <van-image
                    width="100%"
                    fit="cover"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
                </van-col>
                <van-col span="16" class="dditeminfo fxv">
                    <div style="width:100%;" class="fcol333 fsz14">{{datas.goodsInfo.name}}</div>
                    <div class="fcol333 fsz14 dijg">￥{{datas.goodsInfo.money}}</div>
                </van-col>
            </van-row>
        </div>
        <van-cell-group>
            <van-cell :border="false" title="配送方式" value="虚拟发货"></van-cell>
            <van-cell :border="false" title="手机号码" :value="userinfo.mobile"></van-cell>
            <van-cell :border="false" title="邮箱" :value="userinfo.email"></van-cell>
            <van-cell :border="false" title="余额抵扣">
                <template #title>
                    余额抵扣<span class="fcol999 fsz12" style="padding-left:.6rem;">余额抵扣{{datas.goodsInfo.money}}元</span>
                </template>
                <template #default>
                    <van-switch active-color="#f14043" size="20" v-model="forms.yue" />
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group title="选择支付方式" class="paytypebox">
            <van-radio-group v-model="forms.pay" direction="horizontal">
                <van-cell icon="./imgs/goods/wx.png" :border="false" title="微信支付" value="支付宝">
                    <template #default>
                        <van-radio name="1" checked-color="#f14043"></van-radio>
                    </template>
                </van-cell>
                <van-cell icon="./imgs/goods/zfb.png" :border="false" title="支付宝" value="支付宝">
                    <template #default>
                        <van-radio name="2" checked-color="#f14043"></van-radio>
                    </template>
                </van-cell>
            </van-radio-group>
        </van-cell-group>
        <van-submit-bar text-align="left" :price="datas.goodsInfo.money*100" button-text="提交订单" @submit="ontobuy" />
    </div>
</template>

<script type="module">
module.exports = {
    name: 'goodsdetail',
    components:{
        'top': httpVueLoader('./Header.vue')
    },
    data () {
        return {
            title:'确认订单',
            forms: {
                pay:'1',
                yue:false
            },
            datas: {//存放请求数据
                goodsInfo: []
            },
            id: this.$route.query.id
        }
    },
    watch: {
        islogin: {//监听登录状态，如有变化执行
            handler(newval, oldval){
                console.log('更新了', newval)
                if(newval == false || newval == 'false'){
                    this.$router.push({ path: '/login', query: {}});
                }else{
                    this.$router.go(0);
                }
            }
            //,immediate: true
        },
        $route: {
            handler() {
                this.id = this.$route.query.id;
                let id = this.id;
                if(!id){
                    this.$router.go(-1);
                    return;
                }
            }
            //,deep: true
        }
    },
    created () {
        let that = this;
        let hasLogin = that.islogin || localStorage.getItem('islogin');
        if(!hasLogin || hasLogin == 'false'){
            that.$router.push({ path: '/login', query: {}});
            return;
        }
    },
    mounted () {
        let that = this;
        let id = that.id;
        if(!id){
            this.$router.go(-1);
            return;
        }
        let infoArr = JSON.parse(localStorage.getItem('goodsinfo'));
        infoArr.filter((item, index) => {
            let gid = ''+item.id;
            //console.log(gid.indexOf(id))
            if (gid.indexOf(id) !== -1) {
                that.$set(that.datas, 'goodsInfo', item);
            }
        });
    },
    methods: {
        ontobuy(){
            let that = this;
            let yue = that.forms.yue;
            let pay = that.forms.pay;
            let token = localStorage.getItem('token') || '';
            let id = that.id;
            let ginfo = that.datas.goodsInfo;
            let user = that.userinfo;
            let paytype = 2;
            let apppay = '';
            if(yue){
                paytype = 1;
                if(parseFloat(user.money) < parseFloat(ginfo.money)){
                    vant.Toast.fail('您的余额不足，无法使用余额支付！');
                    that.forms.yue = false;
                    paytype = 2;
                    return;
                }
            }
            if(pay == '1'){
                apppay = 'wxgf'
            }else{
                apppay = 'pay'
            }
            let data = {
                token: token,
                goodsid: id,
                name: ginfo.name,
                mobile: user.mobile,
                email: user.email,
                sfdk: paytype,
                type: 1,
                dengji: user.dengji
            };
            // console.log(yue, pay)
            // if(that.payid){//继续支付订单！
            //     that.utils.vajax('post', 'paydice', {order: that.payid, biaoshi: apppay}).then(res => {
            //         let code = res.data.stare;
            //         let msg = res.data.msg;
            //         let myDatas = res.data.data;
            //         if(code == 200){
            //             //that.$set(that.datas, 'lb', myDatas);
            //             // console.log(112223345, myDatas)
            //             // console.log(222,that.utils.apiroot, myDatas);
            //             //     return;
            //             if(msg == '支付成功'){
            //                 vant.Toast.success(msg);
            //             }else{
            //                 window.location.href = that.utils.host + myDatas;
            //             }
            //         }else{
            //             vant.Toast.fail('异常！');
            //         }
            //     }).catch(err => {
            //         vant.Toast.fail('加载失败！');
            //     });
            //     return;
            // }
            that.utils.vajax('post', 'ordersc', data).then(res => {
                let code = res.data.stare;
                let msg = res.data.msg;
                let payId = res.data.order;
                that.payid = payId;
                if(code == 200){
                    //that.$set(that.datas, 'lb', myDatas);
                    that.utils.vajax('post', 'paydice', {order: payId, biaoshi: apppay}).then(res => {
                        let code = res.data.stare;
                        let msg = res.data.msg;
                        let myDatas = res.data.data;
                        if(code == 200){
                            //that.$set(that.datas, 'lb', myDatas);
                            // console.log(111,that.utils.apiroot, myDatas);
                            // return;
                            if(msg == '支付成功'){
                                vant.Toast.success(msg);
                                that.$router.push({ path: '/my/dddetals', query: { payid: payId}})
                            }else{
                                window.location.href = that.utils.host + myDatas;
                            }
                            // console.log(1113455653777, myDatas)
                        }else{
                            vant.Toast.fail('异常！');
                        }
                    }).catch(err => {
                        vant.Toast.fail('加载失败！');
                    });
                }else{
                    console.log(msg);
                }
            }).catch(err => {
                vant.Toast.fail('加载失败！');
            });
        }
    }
}
</script>
 
<style>

</style>