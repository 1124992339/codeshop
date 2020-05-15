<template>
    <div>
        <top :title="title"></top>
        <van-cell-group :border="false">
            <van-field label="密码" v-model="forms.password" type="password" input-align="right" placeholder="请输入密码"></van-field>
            <van-field label="确认密码" v-model="forms.oldpassword" type="password" input-align="right" placeholder="请输入确认密码"></van-field>
            <van-field
            v-model="forms.yzm"
            label="验证码"
            border="{{false}}"
            type="number"
            input-align="right"
            placeholder="请输入验证码">
                <template #button>
                    <van-count-down v-if="issend" :time="60000" format="ss s" :auto-start="yzmstart" @finish="finish"></van-count-down>
                    <van-button @click="sendcode" v-else size="small" plain color="#FA1D1D" round type="primary">发送验证码</van-button>
                </template>
            </van-field>
            <!-- <van-field label="退出登录" v-model="forms.nick" type="text" is-link input-align="right" placeholder=""></van-field> -->
        </van-cell-group>
        <br />
        <br /><br /><br /><br /><br /><br /><br /><br />
        <div style="padding:0 2rem 1.5rem;">
            <van-button @click="tosubmit" type="primary" size="large" round color="linear-gradient(254deg,rgba(249,51,51,1) 0%,rgba(244,111,111,1) 100%)">确定</van-button>
        </div>
    </div>
</template>

<script type="module">
module.exports = {
    name: 'passwordreset',
    data () {
        return {
            title:'修改密码',
            datas: {//存放请求数据
                
            },
            forms: {
                phone: this.$route.query.phone
            },
            issend: false,
            yzmstart: false
        }
    },
    components:{
        'top': httpVueLoader('./Header.vue')
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
    },
    mounted () {
        
    },
    methods: {
        finish(){
            let that = this;
            that.issend = false;
            that.yzmstart = false;
        },
        sendcode(){
            let that = this;
            let form = that.forms;
            that.utils.vajax('post', 'fsyzm', {mobile: form.phone}).then(res => {
                let code = res.data.stare;
                let msg = res.data.msg;
                let myDatas = res.data.data;
                if(code == 200){
                    that.issend = true;
                    that.yzmstart = true;
                    vant.Toast.success(msg);
                }else{
                    vant.Toast.fail(msg);
                }
            }).catch(err => {
                console.log(2,err);
                //vant.Toast.fail('加载失败！');
            });
        },
        tosubmit(){
            let that = this;
            let val = that.forms;
            const vrouter = that.luyou.router;
            if(val.password == '' || val.password == null){
                vant.Toast.fail('请输入密码');
                return;
            }
            if(val.oldpassword == '' || val.oldpassword == null){
                vant.Toast.fail('请输入确认密码');
                return;
            }
            that.utils.vajax('post', 'zhaohuipassword', {mobile: that.userinfo.mobile, password: val.password, yzm: val.yzm, passwordqr: val.oldpassword}).then(res => {
                let code = res.data.stare;
                let msg = res.data.msg;
                let myDatas = res.data.data;
                if(code == 200){
                    //that.$set(that.datas, 'lb', myDatas);
                    vant.Toast.success(msg);
                    setTimeout(() => {
                        vrouter.go(-1);
                    }, 700);
                }else{
                    console.log(msg);
                }
            }).catch(err => {
                //vant.Toast.fail('加载失败！');
            });
        }
    }
}
</script>
 
<style>

</style>