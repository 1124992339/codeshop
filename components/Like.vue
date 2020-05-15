<template>
    <div>
        <top :title="title"></top>
        <goods :cid="cid"></goods>
    </div>
</template>
<script>
module.exports = {
    name: 'like',
    data () {
        return {
            msg:'收藏',
            datas: {//存放请求数据
                a:'aa'
            },
            title:this.$route.query.title || '收藏'
        }
    },
    components:{
        'goods': httpVueLoader('./Goods.vue'),
        'top': httpVueLoader('./Header.vue')
    },
    watch: {},
    created () {
        let that = this;
        that.cid = 'like';
        let hasLogin = that.islogin || localStorage.getItem('islogin');
        if(!hasLogin || hasLogin == 'false'){
            that.$router.push({ path: '/login', query: {}});
            return;
        }
        let token = localStorage.getItem('token') || '';
        that.$set(that, 'token', token);
    },
    mounted () {},
    methods: {
        
    }
}
</script>
 
<style>

</style>