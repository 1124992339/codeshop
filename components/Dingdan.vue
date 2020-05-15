<template>
    <div>
        <top :title="title"></top>
        <van-tabs v-model="tabactive" :click="tabchange()" :sticky="true">
            <van-tab title="全部" name="0">
                <ddlist :type="typeid"></ddlist>
            </van-tab>
            <van-tab title="待付款" name="1">
                <ddlist :type="typeid"></ddlist>
            </van-tab>
            <van-tab title="交易中" name="2">
                <ddlist :type="typeid"></ddlist>
            </van-tab>
            <van-tab title="已完成" name="3">
                <ddlist :type="typeid"></ddlist>
            </van-tab>
            <van-tab title="已取消" name="4">
                <ddlist :type="typeid"></ddlist>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script type="module">
module.exports = {
    name: 'goodsdetail',
    components:{
        'top': httpVueLoader('./Header.vue'),
        'ddlist': httpVueLoader('./Ddlist.vue')
    },
    data () {
        return {
            title:'我的订单',
            datas: {//存放请求数据
                
            },
            tabactive: this.$route.query.tab || 0,
            typeid: this.$route.query.type || 1
        }
    },
    beforeRouteEnter (to, from, next) {
        console.log(111)
        next()
    },
    beforeRouteUpdate (to, from, next) {
        let index = to.query.tab;
        let type = to.query.type;
        this.$set(this, 'tabactive', index);
        this.$set(this, 'typeid', type);
        next()
    },
    beforeRouteLeave (to, from, next) {
        console.log(333)
        next()
    },
    watch: {
        tabactive(newVal, oldVal){
            //console.log(typeof(newVal), oldVal)
            this.$set(this, 'typeid', parseInt(newVal)+1);
        }
    },
    created () {
        let that = this;
        let hasLogin = that.islogin || localStorage.getItem('islogin');
        if(!hasLogin || hasLogin == 'false'){
            that.$router.push({ path: '/login', query: {}});
            return;
        }
        // var active = this.$route.query.tab;
        // that.tabactive = active;
        // that.$set(that, 'tabactive', active);
        // console.log(that.tabactive)
    },
    mounted () {
        
    },
    methods: {
        tabchange(){
            this.typeid = parseInt(this.tabactive)+1;
            console.log(this.tabactive, this.typeid)
        }
    }
}
</script>
 
<style>

</style>