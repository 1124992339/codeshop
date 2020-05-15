<template>
    <div>
        <div class="cheader">
            <div class="myheaderwrap">
                <div style="height:46px;"></div>
                <van-nav-bar
                title="个人中心"
                class="headbg centertoptitle"></van-nav-bar>
                <div class="myinfocontentwrap fx" v-if="islogin">
                    <div class="fxv">
                        <van-image
                        round
                        width="5.5rem"
                        height="5.5rem"
                        fit="cover"
                        :src="(userinfo.avatar == '' || typeof(userinfo.avatar) == 'undefined') ? defaultTx : imghost+userinfo.avatar"></van-image>
                        <span class="nick fsz14 fwb7">{{userinfo.nickname}}</span>
                    </div>
                    <div class="fxv userdj">
                        <van-image
                        round
                        width="2.3rem"
                        height="2.3rem"
                        fit="cover"
                        src="./imgs/my/jinpai.png"></van-image>
                        <span class="nick fsz14" style="margin-left:.5rem; margin-right:1.2rem">{{userinfo.dengjiname}}</span>
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="myinfocontentwrap fx" v-else>
                    <router-link :to="{ path: '/login', query: {}}" style="color:#fff;">
                        <div class="fxv">
                            <van-image
                            round
                            width="5.5rem"
                            height="5.5rem"
                            fit="cover"
                            :src="(userinfo.avatar == '' || typeof(userinfo.avatar) == 'undefined') ? defaultTx : imghost+userinfo.avatar"></van-image>
                            <span class="nick fsz14 fwb7">请登录</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <van-cell-group :border="false">
            <van-cell :border="false" title-style="color:#A6A6A6" title="全部订单" is-link :to="{ path: 'dingdan', query: {type: 1, tab: 0}}"></van-cell>
            <van-grid :column-num="2" :clickable="true">
                <!-- <van-grid-item to="{ path: '/my/dingdan', query: {type: 1, title: '我的订单', tab: 0}}" v-for="value in 4" :key="value" icon="photo-o" text="文字" /> -->
                <van-grid-item :to="{ path: 'dingdan', query: {type: 2, tab: 1}}" icon="./imgs/my/jiaoyi.png" text="立即付款">
                    <template #icon>
                        <div class="fx">
                            <van-image
                            width="2rem"
                            height="2rem"
                            fit="contain"
                            style="margin-left: -3rem; padding-right: 2rem;"
                            src="./imgs/my/fukuan.png"></van-image>
                            待付款
                        </div>
                    </template>
                </van-grid-item>
                <van-grid-item :to="{ path: 'dingdan', query: {type: 3, tab: 2}}" icon="./imgs/my/jiaoyi.png" text="等待发送">
                    <template #icon>
                        <div class="fx">
                            <van-image
                            width="2rem"
                            height="2rem"
                            fit="contain"
                            style="margin-left: -3rem; padding-right: 2rem;"
                            src="./imgs/my/jiaoyi.png"></van-image>
                            交易中
                        </div>
                    </template>
                </van-grid-item>
                <van-grid-item :to="{ path: 'dingdan', query: {type: 4, tab: 3}}" icon="./imgs/my/jiaoyi.png" text="已完成">
                    <template #icon>
                        <div class="fx">
                            <van-image
                            width="2rem"
                            height="2rem"
                            fit="contain"
                            style="margin-left: -3rem; padding-right: 2rem;"
                            src="./imgs/my/done.png"></van-image>
                            已完成
                        </div>
                    </template>
                </van-grid-item>
                <van-grid-item :to="{ path: 'dingdan', query: {type: 5, tab: 4}}" icon="./imgs/my/jiaoyi.png" text="再次购买">
                    <template #icon>
                        <div class="fx">
                            <van-image
                            width="2rem"
                            height="2rem"
                            fit="contain"
                            style="margin-left: -3rem; padding-right: 2rem;"
                            src="./imgs/my/quxiao.png"></van-image>
                            已取消
                        </div>
                    </template>
                </van-grid-item>
            </van-grid>
        </van-cell-group>
        <br />
        <van-cell-group :border="false">
            <van-cell :border="false" title="成为代理" value="" icon="./imgs/my/daili.png" is-link :to="{ path: '/agent/agentcenter', query: {}}"></van-cell>
            <van-cell :border="false" title="设置" value="" icon="./imgs/my/reset.png" is-link :to="{ path: 'myset', query: {}}"></van-cell>
            <van-cell :border="false" title="收藏" value="" icon="./imgs/my/shoucang.png" is-link :to="{ path: 'like', query: {}}"></van-cell>
        </van-cell-group>
    </div>
</template>
<script>
module.exports = {
    name: 'center',
    data () {
        return {
            msg:'个人中心',
            datas: {//存放请求数据
                a:'aa'
            }
        }
    },
    watch: {},
    created () {},
    mounted () {},
    methods: {}
}
</script>
 
<style>
.headbg.centertoptitle{
    background: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    display: block;
}
.headbg.centertoptitle:after{
        border: none;
    }
.van-grid-item__text{
    margin-top:1rem;
    width: 4rem;
    text-align: right;
}
</style>