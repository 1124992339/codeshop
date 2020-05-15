<template>
    <div>
        <top :title="title"></top>
        <div class="aheader">
            <van-row>
                <van-col span="24">
                    <van-image
                    round
                    width="5.5rem"
                    height="5.5rem"
                    fit="cover"
                    :src="(userinfo.avatar == '' || typeof(userinfo.avatar) == 'undefined') ? defaultTx : imghost+userinfo.avatar"></van-image>
                </van-col>
                <van-col span="24" class="fsz16">
                    {{userinfo.nickname}}
                </van-col>
                <van-row>
                    <van-col span="12" class="fsz20">
                        ￥{{userinfo.tjsy}}
                    </van-col> 
                    <van-col span="12" class="fsz20">
                        {{userinfo.group_id}}
                    </van-col>
                    <van-col span="12" class="fsz14">
                        总收益
                    </van-col>
                    <van-col span="12" class="fsz14">
                        我的团队
                    </van-col>
                </van-row>
            </van-row>
        </div>
        <br />
        <div class="acellwrap">
            <van-cell-group :border="false">
                <!-- <van-cell :border="false" title="用户订单" value="" icon="location-o" is-link :to="{ path: 'userorder', query: {}}"></van-cell> -->
                <van-cell :border="false" title="我的团队" value="" icon="./imgs/agent/team.png" is-link :to="{ path: 'myteam', query: {}}"></van-cell>
                <van-cell :border="false" title="我的收益" value="" icon="./imgs/agent/shouyi.png" is-link :to="{ path: 'myprofit', query: {}}"></van-cell>
                <van-cell :border="false" title="邀请好友" value="" icon="./imgs/agent/yaoqing.png" is-link :to="{ path: 'invitation', query: {}}"></van-cell>
                <van-cell :border="false" title="设置" value="" icon="./imgs/agent/reset.png" is-link :to="{ path: '/my/myset', query: {}}"></van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script type="module">
module.exports = {
    name: 'agentcenter',
    data () {
        return {
            title:'代理中心',
            datas: {//存放请求数据
                
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
        
    }
}
</script>
 
<style>

</style>