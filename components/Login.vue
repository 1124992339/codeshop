<template>
    <div>
        <top :title="title"></top>
        <header class="lgheader"></header>
        <van-tabs class="loginwrap" v-model="tabactive">
            <van-tab title="登录">
                <div class="lginputwrap">
                    <van-field
                    v-model="forms.username"
                    label=""
                    border="{{false}}"
                    left-icon="user-o"
                    placeholder="请输入您的手机号/邮箱"></van-field>
                </div>
                <div class="lginputwrap">
                    <van-field
                    v-model="forms.password"
                    label=""
                    border="{{false}}"
                    left-icon="other-pay"
                    type="password"
                    placeholder="请输入您的登录密码"></van-field>
                </div>
            </van-tab>
            <van-tab title="注册">
                <div class="lginputwrap">
                    <van-field
                    v-model="forms.username"
                    label=""
                    border="{{false}}"
                    left-icon="user-o"
                    type="number"
                    placeholder="请输入您的手机号"></van-field>
                </div>
                <div class="lginputwrap">
                    <van-field
                    v-model="forms.yzm"
                    label=""
                    border="{{false}}"
                    left-icon="records"
                    type="number"
                    placeholder="请输入您的验证码">
                        <template #button>
                            <van-count-down v-if="issend" :time="60000" format="ss s" :auto-start="yzmstart" @finish="finish"></van-count-down>
                            <van-button @click="sendcode" v-else size="small" plain color="#FA1D1D" round type="primary">发送验证码</van-button>
                        </template>
                    </van-field>
                </div>
                <div class="lginputwrap">
                    <van-field
                    v-model="forms.password"
                    label=""
                    border="{{false}}"
                    left-icon="other-pay"
                    type="password"
                    placeholder="请输入您的密码"></van-field>
                </div>
                <div class="lginputwrap">
                    <van-field
                    v-model="forms.phone"
                    label=""
                    border="{{false}}"
                    left-icon="smile-o"
                    type="number"
                    placeholder="请输入邀请人的手机号"></van-field>
                </div>
            </van-tab>
        </van-tabs>
        <div class="fxfooter lgbtn">
            <van-button @click="login" round type="info" size="large" color="linear-gradient(-87deg,rgba(255,73,50,1) 0%,rgba(255,120,67,1) 100%)">立即登录</van-button>
        </div>
    </div>
</template>

<script type="module">
module.exports = {
    name: 'login',
    components:{
        'top': httpVueLoader('./Header.vue')
    },
    data () {
        return {
            title:'登录',
            datas: {//存放请求数据
                a:'aa'
            },
            forms:{},
            tabactive:0,
            issend: false,
            yzmstart: false
        }
    },
    watch: {},
    created () {
        let that = this;
        const vrouter = that.luyou.router;
        //console.log(3333,this.islogin, typeof(this.islogin))
        if(this.islogin == 'true'){
            vrouter.go(-1);
        }
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
            that.utils.vajax('post', 'fsyzm', {mobile: form.username}).then(res => {
                console.log(1,res);
                let code = res.data.stare;
                let msg = res.data.msg;
                let myDatas = res.data.data;
                if(code == 200){
                    that.issend = true;
                    that.yzmstart = true;
                    vant.Toast.success(msg);
                }else{
                    //vant.Toast.fail(msg);
                }
            }).catch(err => {
                console.log(2,err);
                //vant.Toast.fail('加载失败！');
            });
        },
        login(){
            let that = this;
            let form = that.forms;
            const vrouter = that.luyou.router;
            let post = 'login';
            let data = {mobile: form.username || '', password:form.password || ''};
            if(this.tabactive == 1){
                post = 'register';
                data.yzm = form.yzm || '';
                data.tjrtel = form.phone || '';
            }else{
                post = 'login';
            }
            that.utils.vajax('post', post, data).then(res => {
                console.log(1,res);
                let code = res.data.stare;
                let msg = res.data.msg;
                let myDatas = res.data.data;
                if(code == 200){
                    vant.Toast.success(msg);
                    Vue.set(that, 'userinfo', myDatas.user || {});
                    Vue.set(that, 'islogin', true);
                    Vue.set(that, 'token', myDatas.token || null);
                    localStorage.setItem('userinfo', JSON.stringify(myDatas.user) || '{}');
                    localStorage.setItem('islogin', true);
                    localStorage.setItem('token', myDatas.token || null);
                    setTimeout(() => {
                        // that.utils.vajax('get', 'tongji').then(res => { //统计
                        //     let code = res.data.stare;
                        //     let msg = res.data.msg;
                        //     let myDatas = res.data.data;
                        // }).catch(err => {
                        //     console.log(2,err);
                        //     //vant.Toast.fail('加载失败！');
                        // });
                        vrouter.go(-1);
                    }, 700);
                }else{
                    //vant.Toast.fail(res.msg);
                }
            }).catch(err => {
                console.log(2,err);
                //vant.Toast.fail('加载失败！');
            });
        }
        // openview(){
        //     let that = this;
        //     that.$emit('openview', that.datas)
        // }
    }
}
</script>
 
<style>
body{
    background: #fff;
}
</style>