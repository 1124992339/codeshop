<template>
    <div>{{msg}}</div>
</template>

<script>
// export default {
//     name: "Home",
//     components: {},//组件
//     data () {
//         return {
//             msg:'测试组件'
//         }
//     },
//     watch: {},
//     created () {},
//     mounted () {},
//     methods: {}
// };
module.exports = {
    data () {
        return {
            msg:'测试组件',
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

</style>