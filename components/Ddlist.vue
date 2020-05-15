<template>
    <div>
        <van-list
        v-model="isloading"
        :finished="loadfinished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onScrollLoad"
        :error.sync="error"
        >
            <van-cell-group style="margin-top: 1rem;" v-for="(item, i) in datas.dditems" :key="item.id">
                <van-cell :border="false" title-style="flex:0 1 auto;" title="订单编号：C01254638820" value="待收货"></van-cell>
                <div class="dditemwrap">
                    <van-row gutter="15" @click="router.push({ path: 'dddetals', query: { id: 11 }})">
                        <van-col span="8">
                            <van-image
                            width="9rem"
                            height="9rem"
                            fit="cover"
                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                            />
                        </van-col>
                        <van-col span="16">
                            <div class="fsz14 fcol333">2020包搭建直播盒子运营版影视app +双端影视源码修复后台带...</div>
                        </van-col>
                    </van-row>
                </div>
                <van-cell :border="false" title-style="flex:0 1 auto;">
                    <template #title>
                        订单合计：<span style="color:#FC4353">￥109.00</span>
                    </template>
                    <template #default>
                        <van-button plain type="info" color="#F93333" size="small" round>催发货</van-button>
                    </template>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<script type="module">
module.exports = {
    name: 'ddlist',
    data () {
        return {
            datas: {//存放请求数据
                dditems: {}
            },
            typeid: this.type
        }
    },
    props: ['type'],
    watch: {
        typeid(newval, oldVal){
            console.log(555, newval, oldVal)
        }
    },
    created () {
        let that = this;
        console.log(9999, this.type)
    },
    mounted () {
        
    },
    methods: {
        listInit(t, obj){
            t.utils.vajax('post', 'orderlist', obj).then(res => {
                let code = res.data.stare;
                let msg = res.data.msg;
                let myDatas = res.data.data;
                if(code == 200){
                    let num = myDatas.length;
                    if(!num || num < t.itemnum){
                        t.$set(t, 'loadfinished', true);
                    }
                    if(t.yema == 1){
                        t.$set(t.datas, 'dditems', myDatas);
                    }else{
                        const target = {};
                        myDatas.forEach(a => {
                            const source = a;
                            t.datas.dditems.push(a);
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
            let type = that.typeid;
            let token = localStorage.getItem('token') || '';
            that.$set(that, 'token', token);
            console.log(11122,type)
            that.listInit(that, {yema: that.yema, size: that.itemnum, ddlx: type || 1, token:token});
        }
    }
}
</script>
 
<style>

</style>