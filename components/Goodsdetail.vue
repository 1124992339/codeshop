<template>
    <div>
        <top :title="title"></top>
        <div class="gdheader">
            <van-image
            width="100%"
            fit="cover"
            :src="imghost+datas.detals.fengmian"></van-image>
            <div class="gdinfo">
                <div class="gdtitle fsz14 fcol333">{{datas.detals.name}}</div>
                <div class="gdprice fwb6 fsz20">
                    ￥{{datas.detals.money}}
                    <span class="fcol999 fsz12">￥{{datas.detals.moneyhx}}</span>
                </div>
            </div>
        </div>
        <van-tabs v-model="tabactive">
            <van-tab title="商品详情">
                <div class="gdcontent bgfff">
                    <div v-html="datas.detals.xiangqing" style="padding:1.5rem 1.5rem 5rem;"></div>
                </div>
            </van-tab>
            <van-tab title="交易规则">
                <div class="gdcontent bgfff">
                    <div v-html="datas.detals.xiangqing" style="padding:1.5rem 1.5rem 5rem;"></div>
                </div>
            </van-tab>
        </van-tabs>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" @click="dfooterclick(1)"></van-goods-action-icon>
            <van-goods-action-icon :icon="hassc ? 'star' : 'star-o'" :text="hassc ? '已收藏' : '收藏'" @click="dfooterclick(2, hassc)"></van-goods-action-icon>
            <van-goods-action-button
            type="danger"
            color="linear-gradient(-90deg,rgba(249,51,51,1) 0%,rgba(244,111,111,1) 100%)"
            text="立即购买"
             @click="dfooterclick(3)"
            :to="{ path: '/buy', query: { id: datas.detals.id }}"></van-goods-action-button>
        </van-goods-action>
        <van-overlay :show="showoverlay" @click="showoverlay = false">
            <div class="overlaycontentwrap" @click.stop>
                <div class="kefubox">
                    <p class="fcol333 fsz16">微信：{{wx}}</p>
                    <p class="fcol333 fsz16">QQ：{{qq}}</p>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script type="module">
module.exports = {
    name: 'goodsdetail',
    components:{
        'top': httpVueLoader('./Header.vue')
    },
    data () {
        return {
            title:this.$route.query.title || '详情',
            datas: {//存放请求数据
                detals: {}
            },
            tabactive:0,
            hassc: false,
            showoverlay: false,
            qq: '',
            wx: ''
        }
    },
    watch: {},
    created () {
        let that = this;
        var id = that.$route.query.id;
        that.id = id;
        //console.log(this.toekn, localStorage.getItem('token'))
        let token = localStorage.getItem('token') || '';
        that.$set(that, 'token', token);
        that.utils.vajax('post', 'shopxx', {id: id, token: token}).then(res => {
            let code = res.data.stare;
            let msg = res.data.msg;
            let myDatas = res.data.data;
            if(code == 200){
                that.$set(that.datas, 'detals', myDatas);
                if(myDatas.shoucan == '已收藏'){
                    that.$set(that, 'hassc', true);
                }else{
                    that.$set(that, 'hassc', false);
                }
            }else{
                console.log(msg);
            }
        }).catch(err => {
            //vant.Toast.fail('加载失败！');
        });
    },
    mounted () {
        
    },
    methods: {
        dfooterclick(type){
            let that = this;
            if(type == 2){
                that.utils.vajax('post', 'shopsc', {uploadid: that.id, token: that.token}).then(res => {
                    let code = res.data.stare;
                    let msg = res.data.msg;
                    let myDatas = res.data.data;
                    if(code == 200){
                        if(msg == '收藏'){
                            that.$set(that, 'hassc', true);
                        }else{
                            that.$set(that, 'hassc', false);
                        }
                    }else{
                        vant.Toast.fail('收藏失败！');
                        that.$set(that, 'hassc', false);
                    }
                }).catch(err => {
                    //vant.Toast.fail('加载失败！');
                });
            }else if(type == 3){
                // let hasLogin = that.islogin || localStorage.getItem('islogin');
                // if(hasLogin || hasLogin == 'true'){
                    
                // }
                let info = localStorage.getItem('goodsinfo') || '{}';
                let arr = []
                if(!info || info == '{}'){
                    arr.push(that.datas.detals)
                    localStorage.setItem('goodsinfo', JSON.stringify(arr) || '{}');
                }else{
                    let newArr = JSON.parse(info);
                    newArr.push(that.datas.detals)
                    let infoArr = this.unique(newArr);
                    localStorage.setItem('goodsinfo', JSON.stringify(infoArr));
                }
            }else if(type == 1){
                let that = this;
                that.utils.vajax('post', 'hqxtbl', {}).then(res => {
                    let code = res.data.stare;
                    let msg = res.data.msg;
                    let myDatas = res.data.data;
                    if(code == 200){
                        that.showoverlay = true;
                        this.qq = myDatas[6].value || '暂无！';
                        this.wx = myDatas[4].value || '暂无！';
                        console.log(myDatas)
                    }else{
                        vant.Toast.fail(msg);
                    }
                }).catch(err => {
                    vant.Toast.fail('加载失败！');
                });
            }
        },
        unique(arr) { //json数组去重
            const res = new Map();
            return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
        }
    }
}
</script>
 
<style>
.overlaycontentwrap{
    background: url(../imgs/goods/showkfbg.png) no-repeat center /contain;
    width: 26rem;
    height: 21rem;
    position: absolute;
    left: 50%;
    margin-left: -13rem;
    top: 50%;
    margin-top: -10.5rem;
    text-align: center;
    display: flex;
    align-items: flex-end;
}
.kefubox{
    line-height: 3rem;
    width: 100%;
    margin-bottom: 2rem;
}
/* .kefubox p{
    padding: 0 4rem;
} */
</style>