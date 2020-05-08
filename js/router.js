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
        meta:[]
    },{
        path: "*", redirect: "/"
    }
]
const router = new VueRouter({
    routes
  })
export default {
    router,
    tp
};