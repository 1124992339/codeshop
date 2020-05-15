<template>
    <div>
        <top :title="title"></top>
        Invitation
    </div>
</template>

<script type="module">
module.exports = {
    name: 'invitation',
    data () {
        return {
            title:'邀请好友',
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