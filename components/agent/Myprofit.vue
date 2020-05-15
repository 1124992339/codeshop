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
            <div class="mpwrpa">
                <van-row>
                    <van-col span="24" class="fsz14">总收益</van-col>
                    <van-col span="24">
                        <van-row>
                            <van-col span="16" class="fsz22">￥{{datas.myprofit[0]}}</van-col>
                            <van-col span="8" class="fsz14" style="text-align:right;">
                                <router-link :to="{ path: 'tixian', query: {}}" style="color:#fff;">
                                    提现<van-icon name="arrow" style="top: .15rem;" />
                                </router-link>
                            </van-col>
                        </van-row>
                    </van-col>
                    <van-col span="24">
                        <van-row>
                            <van-col span="12" class="fsz14">今天收益：￥{{datas.myprofit[2]}}</van-col>
                            <van-col span="12" class="fsz14">昨天收益：￥{{datas.myprofit[1]}}</van-col>
                        </van-row>
                    </van-col>
                </van-row>
            </div>
            <div class="mplis">
                <van-row>
                    <div class="fsz16 fcol333">明细</div>
                    <div class="mplisbox clearfix" v-for="(item, i) in datas.items" :key="item.id">
                        <van-col span="24" class="fsz14 fcol333">
                            <van-row>
                                <van-col span="16" class="fsz16">购买人：{{item.username}}</van-col>
                                <van-col span="8" class="fsz20" style="text-align:right; color:#FE3F10;">+{{item.money}}</van-col>
                            </van-row>
                            <van-row style="color:#808080;">
                                <van-col span="16" class="fsz12">{{item.goodsname}}</van-col>
                                <van-col span="8" class="fsz12" style="text-align:right;">{{item.goodsname}}</van-col>
                            </van-row>
                        </van-col>
                    </div>
                </van-row>
            </div>
        </van-list>
    </div>
</template>

<script type="module">
module.exports = {
    name: 'myprofit',
    data () {
        return {
            title:'我的收益',
            datas: {//存放请求数据
                myprofit: [],
                items:{}
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
            t.utils.vajax('post', 'tjsy', obj).then(res => {
                let code = res.data.stare;
                let msg = res.data.msg;
                let myDatas = res.data.data;
                if(code == 200){
                    t.datas.myprofit = [res.data.ztjsy, res.data.zrsy, res.data.jrsy]
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