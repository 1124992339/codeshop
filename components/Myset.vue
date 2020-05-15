<template>
    <div>
        <top :title="title"></top>
        <van-cell-group :border="false">
            <van-field label="头像" v-model="forms.tx" type="text" input-align="right" placeholder="请选择头像">
                <template #input>
                    <van-uploader :after-read="fileRead" v-model="forms.fileList" preview-size="60px" max-count="1" />
                </template>
            </van-field>
            <van-field label="昵称" v-model="forms.nick" type="text" input-align="right" :placeholder="userinfo.nickname ? userinfo.nickname : '请输入您的昵称'"></van-field>
            <van-field label="QQ" v-model="forms.qq" type="number" input-align="right" :placeholder="userinfo.qq ? userinfo.qq : '请输入您的QQ号'"></van-field>
            <van-field label="微信" v-model="forms.wx" type="text" input-align="right" :placeholder="userinfo.wx ? userinfo.wx : '请输入您的微信号'"></van-field>
        </van-cell-group>
        <br />
        <van-cell-group :border="false">
            <van-field label="真实姓名" v-model="forms.name" type="text" input-align="right" :placeholder="userinfo.realname ? userinfo.realname : '请输入您的真实姓名'"></van-field>
            <van-field label="支付宝账号" v-model="forms.alipay" type="text" input-align="right" :placeholder="userinfo.zfb ? userinfo.zfb : '请输入您的支付宝账号'"></van-field>
        </van-cell-group>
        <br />
        <van-cell-group :border="false">
            <!-- <van-field label="密码" v-model="forms.password" type="password" is-link input-align="right" placeholder="修改密码"></van-field> -->
            <!-- <van-field label="退出登录" v-model="forms.nick" type="text" is-link input-align="right" placeholder=""></van-field> -->
            <van-cell title="密码" :border="false" value="修改密码" is-link :to="{ path: 'passwordreset', query: {phone: userinfo.mobile}}"></van-cell>
            <van-cell @click="logout" title="退出登录" :border="false" value="" is-link></van-cell>
        </van-cell-group>
        <br /><br /><br /><br /><br /><br /><br /><br />
        <div style="padding:0 2rem 1.5rem;">
            <van-button @click="tosubmit" type="primary" size="large" round color="linear-gradient(254deg,rgba(249,51,51,1) 0%,rgba(244,111,111,1) 100%)">确定</van-button>
        </div>
    </div>
</template>

<script type="module">
module.exports = {
    name: 'myset',
    data () {
        return {
            title:'设置',
            datas: {//存放请求数据
                
            },
            forms: {
                fileList: []
            }
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
        fileRead(file, detail){
            console.log(file, detail)
            this.forms.tx = file.file;
        },
        tosubmit(){
            let that = this;
            const vrouter = that.luyou.router;
            let val = that.forms;
            let params = new FormData(); //创建form对象
            params.append("token", that.token);
            params.append("nickname", val.nick);
            params.append("realname", val.name);
            params.append("zfb", val.alipay);
            params.append("qq", val.qq);
            params.append("wx", val.wx);
            params.append("file", val.tx);
            // let p = {token: that.token, nickname: val.nick, realname: val.name, zfb: val.alipay, qq: val.qq, wx: val.wx, file: val.tx};
            that.utils.vajax('post', 'xiugaiziliao', params, true).then(res => {
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
                    vant.Toast.fail(msg);
                }
            }).catch(err => {
                //vant.Toast.fail('加载失败！');
                setTimeout(() => {
                    vrouter.go(-1);
                }, 700);
            });
        },
        logout(){
            let that = this;
            const vrouter = that.luyou.router;
            that.utils.vajax('post', 'tuichu', {token: that.token}).then(res => {
                let code = res.data.stare;
                let msg = res.data.msg;
                let myDatas = res.data.data;
                if(code == 200){
                    //that.$set(that.datas, 'lb', myDatas);
                    vant.Toast.success(msg);
                    localStorage.clear();
                    setTimeout(() => {
                        vrouter.go(-1);
                    }, 700);
                }else{
                    vant.Toast.success('退出成功！');
                    localStorage.clear();
                    setTimeout(() => {
                        vrouter.go(-1);
                    }, 700);
                }
            }).catch(err => {
                vant.Toast.success('退出成功！');
                localStorage.clear();
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