<template>
    <div>
        <top :title="title"></top>
        <van-cell-group :border="false">
            <van-field label="提现金额" v-model="forms.rmb" :border="false" type="number" input-align="right" placeholder="单次最少提现100元"></van-field>
            <van-field label="姓名" v-model="forms.name" :border="false" type="text" input-align="right" placeholder="请填写您的真实姓名"></van-field>
            <van-field label="支付宝账号" v-model="forms.alipay" :border="false" type="text" input-align="right" placeholder="请输入支付宝账号"></van-field>
        </van-cell-group>
        <div class="fsz16 fcol999" style="padding:1.5rem 1.3rem;">提现需要{{shouxufei}}%手续费</div>
        <br /><br /><br /><br /><br /><br /><br /><br />
        <div style="padding:0 2rem 1.5rem;">
            <van-button @click="tosubmit" type="primary" size="large" round color="linear-gradient(254deg,rgba(249,51,51,1) 0%,rgba(244,111,111,1) 100%)">确定</van-button>
        </div>
    </div>
</template>

<script type="module">
module.exports = {
    name: 'tixian',
    data () {
        return {
            title:'提现',
            datas: {//存放请求数据
                
            },
            forms: {
                
            },
            shouxufei: ''
        }
    },
    components:{
        'top': httpVueLoader('../Header.vue')
    },
    watch: {},
    created () {
        let that = this;
        let hasLogin = that.islogin || localStorage.getItem('islogin');
        if(!hasLogin || hasLogin == 'false'){
            that.$router.push({ path: '/login', query: {}});
            return;
        }
        let token = localStorage.getItem('token') || '';
        that.$set(that, 'token', token);

        that.utils.vajax('post', 'hqxtbl', {}).then(res => {
            let code = res.data.stare;
            let msg = res.data.msg;
            let myDatas = res.data.data;
            if(code == 200){
                that.shouxufei = myDatas[0].value;
                console.log(myDatas[0].value);
            }else{
                console.log(msg);
                vant.Toast.fail(msg);
            }
        }).catch(err => {
            vant.Toast.fail('加载失败！');
        });
    },
    mounted () {
        
    },
    methods: {
        tosubmit(){
            let that = this;
            const vrouter = that.luyou.router;
            let val = that.forms;
            that.utils.vajax('post', 'withdrawcash', {token: that.token, realname: val.name, zfb: val.alipay, money: parseFloat(val.rmb)}).then(res => {
                let code = res.data.stare;
                let msg = res.data.msg;
                let myDatas = res.data.data;
                if(code == 200){
                    vant.Toast.success(msg);
                    setTimeout(() => {
                        vrouter.go(-1);
                    }, 700);
                }else{
                    console.log(msg);
                    vant.Toast.fail(msg);
                }
            }).catch(err => {
                vant.Toast.fail('加载失败！');
                setTimeout(() => {
                    vrouter.go(-1);
                }, 700);
            });
        }
    }
}
</script>
 
<style>

</style>