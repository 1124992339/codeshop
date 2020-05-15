// const app = require('../components/app.vue');
// import app from '../components/app.vue'
//const Foo = { template: '<div>foo</div>' }
let tp = (src) => {
    return httpVueLoader(src)
}
const routes = [
    {
        name: 'home',
        path: '/',
        component: tp('./components/Home.vue'),
        meta:{
            title: "首页", //配置title
            keepAlive: true, //是否缓存
            nav: true
        },
        props: true
    },{
        name: 'item',
        path: '/item',
        component: tp('./components/Item.vue'),
        meta:{
            title: "项目", //配置title
            keepAlive: true, //是否缓存
            nav: true
        },
        props: true
    },{
        name: 'my',
        path: '/my',
        component: tp('./components/My.vue'),
        meta:{
            title: "个人中心", //配置title
            keepAlive: true, //是否缓存
            nav: true,
            haslogin: true
        },
        props: true,
        children: [
            {
                name: 'center',
                path: 'center',
                component: tp('./components/Center.vue'),
                meta:{
                    title: "个人中心", //配置title
                    keepAlive: true, //是否缓存
                    nav: true,
                    haslogin: true
                }
            },
            {
                name: 'dingdan',
                path: 'dingdan',
                component: tp('./components/Dingdan.vue'),
                meta:{
                    title: "我的订单", //配置title
                    keepAlive: true, //是否缓存
                    nav: false,
                    haslogin: true
                },
            },
            {
                name: 'dddetals',
                path: 'dddetals',
                component: tp('./components/Dddetails.vue'),
                meta:{
                    title: "订单详情", //配置title
                    keepAlive: true, //是否缓存
                    nav: false,
                    haslogin: true
                },
            },
            {
                name: 'myset',
                path: 'myset',
                component: tp('./components/Myset.vue'),
                meta:{
                    title: "设置", //配置title
                    keepAlive: true, //是否缓存
                    nav: false, 
                    haslogin: true
                }
            },
            {
                name: 'passwordreset',
                path: 'passwordreset',
                component: tp('./components/Passwordreset.vue'),
                meta:{
                    title: "修改密码", //配置title
                    keepAlive: true, //是否缓存
                    nav: false,
                    haslogin: true
                },
            },
            {
                name: 'like',
                path: 'like',
                component: tp('./components/Like.vue'),
                meta:{
                    title: "收藏", //配置title
                    keepAlive: true, //是否缓存
                    nav: false,
                    haslogin: true
                },
            }
        ]
    },{
        name: 'agent',
        path: '/agent',
        component: tp('./components/agent/Agent.vue'),
        meta:{
            title: "代理", //配置title
            keepAlive: true, //是否缓存
            nav: true
        },
        props: true,
        children: [
            {
                name: 'agentcenter',
                path: 'agentcenter',
                component: tp('./components/agent/Agentcenter.vue'),
                meta:{
                    title: "代理中心", //配置title
                    keepAlive: true, //是否缓存
                    nav: false,
                    haslogin: true
                },
            },
            {
                name: 'userorder',
                path: 'userorder',
                component: tp('./components/agent/Userorder.vue'),
                meta:{
                    title: "用户订单", //配置title
                    keepAlive: true, //是否缓存
                    nav: false,
                    haslogin: true
                },
            },
            {
                name: 'myteam',
                path: 'myteam',
                component: tp('./components/agent/Myteam.vue'),
                meta:{
                    title: "我的团队", //配置title
                    keepAlive: true, //是否缓存
                    nav: false,
                    haslogin: true
                },
            },
            {
                name: 'myprofit',
                path: 'myprofit',
                component: tp('./components/agent/Myprofit.vue'),
                meta:{
                    title: "我的收益", //配置title
                    keepAlive: true, //是否缓存
                    nav: false,
                    haslogin: true
                },
            },
            {
                name: 'invitation',
                path: 'invitation',
                component: tp('./components/agent/Invitation.vue'),
                meta:{
                    title: "邀请好友", //配置title
                    keepAlive: true, //是否缓存
                    nav: false,
                    haslogin: true
                },
            },
            {
                name: 'tixian',
                path: 'tixian',
                component: tp('./components/agent/Tixian.vue'),
                meta:{
                    title: "提现", //配置title
                    keepAlive: true, //是否缓存
                    nav: false,
                    haslogin: true
                },
            }
        ]
    },{
        name: 'login',
        path: '/login',
        component: tp('./components/Login.vue'),
        meta:{
            title: "登录", //配置title
            keepAlive: true //是否缓存
        },
        props: true
    },{
        name: 'gdetail',
        path: '/gdetail',
        component: tp('./components/Goodsdetail.vue'),
        meta:{
            title: "详情", //配置title
            keepAlive: true, //是否缓存
            haslogin: true
        },
        props: true
    },{
        name: 'buy',
        path: '/buy',
        component: tp('./components/Buy.vue'),
        meta:{
            title: "确认订单", //配置title
            keepAlive: true, //是否缓存
            haslogin: true
        },
        props: true
    },{
        name: 'cate',
        path: '/cate',
        component: tp('./components/Cate.vue'),
        meta:{
            title: "分类列表", //配置title
            keepAlive: true //是否缓存
        },
        props: true
    },{
        path: "*", redirect: "/"
    }
]
VueRouter.prototype.go = function () {
    this.isBack = true
    window.history.go(-1)
}
const router = new VueRouter({
        routes,
        scrollBehavior (to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                if (from.meta.keepAlive) {
                    from.meta.savedPosition = document.body.scrollTop
                }
                return { x: 0, y: to.meta.savedPosition || 0 }
            }
        }
    })

export default {
    router,
    tp
};