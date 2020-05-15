<template>
    <div>
        <top :title="title"></top>
        <van-list
        v-model="isloading"
        :finished="loadfinished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onScrollLoad"
        :error.sync="error"
        >
            <div class="myteamlistwrap">
                <van-row>
                    <van-col span="24" class="mytlisbox" v-for="(item, i) in datas.items" :key="item.id">
                        <div class="fsz14 fcol999">用户ID：{{item.mobile}}</div>
                        <div class="fsz14 fcol999">佣金收益：{{item.zyj}}元</div>
                        <div class="fsz14 fcol999">注册时间：{{item.createtime}}</div>
                    </van-col>
                </van-row>
            </div>
        </van-list>
    </div>
</template>

<script type="module">
module.exports = {
    name: 'myteam',
    data () {
        return {
            title:'我的团队',
            datas: {//存放请求数据
                items: {}
            }
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
    },
    mounted () {
        
    },
    methods: {
        listInit(t, obj){
            t.utils.vajax('post', 'mytd', obj).then(res => {
                let code = res.data.stare;
                let msg = res.data.msg;
                let myDatas = res.data.data;
                if(code == 200){
                    let num = myDatas.length;
                    if(!num || num < t.itemnum){
                        t.$set(t, 'loadfinished', true);
                    }
                    if(t.yema == 1){
                        t.$set(t.datas, 'items', myDatas);
                    }else{
                        const target = {};
                        myDatas.forEach(a => {
                            const source = a;
                            t.datas.items.push(a);
                        })
                    }
                    if(!t.loadfinished){
                        t.$set(t, 'yema', t.yema + 1);
                    }
                    t.$set(t, 'isloading', false);
                }else{
                    console.log(msg);
                    t.$set(t, 'loadfinished', true);
                }
            }).catch(err => {
                //vant.Toast.fail('加载失败！');
                t.$set(t, 'error', true);
            });
        },
        onScrollLoad(){
            let that = this;
            that.listInit(that, {token: that.token});
        }
    }
}
</script>
 
<style>

</style>