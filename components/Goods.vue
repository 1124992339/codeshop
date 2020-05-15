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
            <van-row gutter="15" class="lybox">
                <van-col span="12" v-for="(item, i) in datas.items" :key="item.id">
                    <div class="itemswrap">
                        <router-link :to="{ path: '/gdetail', query: { id: item.id, title: item.name }}">
                            <van-image
                            class="itemspic"
                            width="100%"
                            height="13rem"
                            fit="cover"
                            :src="imghost+item.fengmian"></van-image>
                            <div class="itemsfooter">
                                <div class="itemstitle fcol666 fsz14">{{item.name}}</div>
                                <div class="itemsjgbtn fx">
                                    <span class="maincol fsz16">￥{{item.money}}</span>
                                    <!-- <van-button class="ibbuybtn" color="#E42D32" plain hairline type="info" size="mini">立即购买</van-button> -->
                                </div>
                            </div>
                        </router-link>
                    </div>
                </van-col>
            </van-row>
        </van-list>
    </div>
    
</template>
<script>
module.exports = {
    name: 'goods',
    props: ['cid'],
    data () {
        return {
            msg:'首页',
            datas: {//存放请求数据
                items:{}
            }
        }
    },
    watch: {},
    created () {
        let that = this;
        //that.listInit(that);
    },
    mounted () {},
    methods: {
        // {yema: t.yema, size: t.itemnum}
        listInit(t, obj, type){
            t.utils.vajax('post', type, obj).then(res => {
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
            if(that.cid == 'like'){
                that.listInit(that, {token: that.token}, 'sclist');
            }else{
                that.listInit(that, {yema: that.yema, size: that.itemnum, category_id: that.cid || ''}, 'flxqsp');
            }
        }
    }
}
</script>
 
<style>

</style>