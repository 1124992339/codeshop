<template>
    <div>
        <transition :name="transitionName" mode="out-in">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>
<script>
module.exports = {
    name: 'agent',
    data () {
        return {
            msg:'代理中心',
            datas: {//存放请求数据
                a:'aa'
            },
            transitionName: ''
        }
    },
    watch: {},
    created () {},
    mounted () {},
    methods: {}
}
</script>
 
<style>
</style>