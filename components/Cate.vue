<template>
    <div>
        <top :title="title"></top>
        <goods :cid="cid"></goods>
    </div>
</template>
<script>
module.exports = {
    name: 'home',
    data () {
        return {
            msg:'首页',
            datas: {//存放请求数据
                a:'aa'
            },
            title:this.$route.query.title || '分类列表'
        }
    },
    components:{
        'goods': httpVueLoader('./Goods.vue'),
        'top': httpVueLoader('./Header.vue')
    },
    watch: {},
    created () {
        let that = this;
        var cid = that.$route.query.cid;
        var title = that.$route.query.title;
        // that.$set(that, 'cid', cid);
        // that.$set(that, 'cid', title);
        that.cid = cid;
    },
    mounted () {},
    methods: {
        
    }
}
</script>
 
<style>

</style>