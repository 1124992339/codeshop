<template>
    <div>
        <van-nav-bar
        class="headbg"
        :title="title"
        left-text=""
        left-arrow
        @click-left="clicktoback(-1)"
        :border="false"
        />
    </div>
</template>
<script>
module.exports = {
    name: 'header',
    data () {
        return {
            datas: {//存放请求数据
                a:'aa'
            }
        }
    },
    props: ['title'],
    watch: {},
    created () {},
    mounted () {},
    methods: {
        clicktoback(x){
            const vrouter = this.luyou.router;
            vrouter.go(x);
        }
    }
}
</script>
 
<style>

</style>