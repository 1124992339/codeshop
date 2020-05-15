let mixin = {
  data() {
    return {
      userinfo: JSON.parse(localStorage.getItem('userinfo') || '{}'),
      islogin: localStorage.getItem('islogin') || false,
      token:localStorage.getItem('token') || null,
      yema: 1,
      itemnum: 12,
      isloading: false,
      loadfinished: false,
      error: false,
      defaultTx: './imgs/public/defaulttx.png'
    }
  },
  created () {
    let that = this;
    that.imghost = that.utils.imghost;
  },
  computed: {},
  methods: {},
  watch: {
      islogin: {
          handler(val, oldVal){
              //console.log(333, val, oldVal, this)
              this.$set(this, 'islogin', val);
          }
          //immediate: true
      },
      token: {
        handler(val, oldVal){
            //console.log(444, val, oldVal, this)
            this.$set(this, 'token', val);
        }
      },
      userinfo: {
        handler(val, oldVal){
            //console.log(555, val, oldVal, this)
            this.$set(this, 'userinfo', val);
        },
        deep: true
      }
  }
  // beforeRouteEnter (to, from, next) {
  //   next();
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(1111)
  //     // let isBack = this.$router.isBack
  //     // if (isBack) {
  //     //   this.transitionName = 'slide-right'
  //     // } else {
  //     //   this.transitionName = 'slide-left'
  //     // }
  //     // // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
  //     // this.$router.isBack = false
  //     next()
  // },
  // beforeRouteLeave (to, from, next) {
  //     //this.$router.isBack = true
  //     next()
  // }
}
export default mixin;