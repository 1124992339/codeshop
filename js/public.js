const apiroot = 'http://tz.dgssywl.cn/index.php/api/index/';
const host = 'http://tz.dgssywl.cn/';
const imghost = 'http://tz.dgssywl.cn/';

const vajax = (method, url, data, form) => {
    let ajax = new Promise((resolve, reject) => {
        // var CancelToken = axios.CancelToken;
        // Vue.prototype.__cansels = [];
        // axios.interceptors.request.use((config) => {
        //     vant.Toast.loading({
        //         duration: 0,
        //         message: '加载中...',
        //         forbidClick: true
        //     });
        //     config.cancelToken = new CancelToken((c) => {
        //         Vue.prototype.__cansels.push(c);
        //     });
        //     return config;
        // }, (error) => {
        //     //vant.Toast.fail('请求失败！');
        //     return error;
        // });
        // axios.interceptors.response.use((config) => {
        //     console.log('加载完毕！');
        //     vant.Toast.clear();
        //     return config.data;
        // }, (error) => {
        //     vant.Toast.fail('请求失败！');
        //     return error;
        // });
        vant.Toast.loading({
            duration: 0,
            message: '加载中...',
            forbidClick: true
        });
        let type = method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded';
        let config = {}
        config.data = Qs.stringify(data);
        if(form){
            type = 'multipart/form-data';
            config.data = data;
        }
        // console.log(config, config.headers, config.data)
        axios({
            baseURL: apiroot,
            method: method,
            url: url,
            data: config.data,
            headers: {
                'Content-Type': type
            }
        }).then((response) => {
            vant.Toast.clear();
            resolve(response)
            if(response.data.stare != 200){
                setTimeout(() => {
                    vant.Toast.fail(response.data.msg || '请求失败！');
                }, 400);
            }
        }).catch((error) => {
            vant.Toast.clear();
            setTimeout(() => {
                vant.Toast.fail(error.data.msg || '请求失败！');
            }, 400);
            reject(error)
        });
    })
    return ajax;
}

const formatTime = (time, split) => {
    let date = new Date(time - 0);
    let s = split;
    if (!s) {
        s = '-'
    }
    let year = date.getFullYear(),
    month = date.getMonth() + 1, //月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
    let newTime =
    year +
    s +
    (month < 10 ? "0" + month : month) +
    s +
    (day < 10 ? "0" + day : day) +
    " " +
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (min < 10 ? "0" + min : min) +
    ":" +
    (sec < 10 ? "0" + sec : sec);

    return newTime;
}

export default {
    vajax,
    imghost,
    apiroot,
    host,
    formatTime
};