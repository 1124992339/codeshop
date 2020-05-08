const apiroot = 'http://duoshop.dgssywl.cn/api/index/';
const imghost = 'http://duoshop.dgssywl.cn/';

const vajax = (method, url, data) => {
    let ajax = new Promise((resolve, reject) => {
        axios.interceptors.request.use((config) => {
            vant.Toast.loading({
                duration: 0,
                message: '加载中...',
                forbidClick: true
            });
            return config;
        }, (error) => {
            vant.Toast.fail('请求失败！');
            return error;
        });
        axios.interceptors.response.use((config) => {
            console.log('加载完毕！');
            vant.Toast.clear();
            return config.data;
        }, (error) => {
            vant.Toast.fail('请求失败！');
            return error;
        });
        axios({
            baseURL: apiroot,
            method: method,
            url: url,
            data: data
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        });
    })
    return ajax;
}
export default {
    vajax,
    imghost
};