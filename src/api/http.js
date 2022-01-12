import axios from 'axios';
import { getCookie } from '../utils/cookie';
import { Message } from 'element-ui'
import getMess from '../utils/state'


// import {getCookie} from '../utils/cookie'
//对不同测试环境选择不同的基本url访问(不同的服务器)
// switch(process.env.NODE_ENV)  {
//     case "production": 
//         axios.defaults.baseURL = "http://xxx.com";
//         break;
//     case "test":
//         axios.defaults.baseURL = "http://test.com";
//         break;
//     default:
//         axios.defaults.baseURL = "http://127.0.0.1:8083";
// }
//设置请求超时时间
axios.defaults.timeout = 10000;
//设置cors跨域允许携带资源凭证(如cookie)
axios.defaults.withCredentials = true;
//设置post请求发送的数据格式
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

//设置请求拦截器(对所有请求拦截)
axios.interceptors.request.use(config => {
    let token = getCookie("Authorization");
    //获取到token且设置token到header成功
    //有token才设置,相当于if(token存在)才存储,js为null时也为假
    token && (config.headers.Authorization = token);
    return config;
}, error => {//请求发送失败时执行
    return Promise.reject(error);
});

//设置响应成功的码的范围,用于后边响应拦截器的不同执行
axios.defaults.validateStatus = status => {
    //根据传入的响应码进行校验返回true或false判断执行响应拦截器的哪一个方法
    return /^(2|3)\d{2}$/.test(status);//2,3开头的都算成功
}
//设置响应拦截器(对所有响应拦截)
axios.interceptors.response.use(response => {
    console.log("(((",response.headers['content-type'])
    if(response.headers['content-type'] == "application/octet-stream;charset=UTF-8") {
        return response
    }
    if (response.data.state != 1) {
        let mess = getMess(response.data.state)
        Message({
            showClose: true,
            message: mess.mess,
            type: mess.type,
        });
        if (response.data.state == 0) {
            return null
        } else if (response.data.state == -13) {
            // this.$router.push({path: '/login'})
            // localStorage.removeItem("userName")
            // localStorage.removeItem("userId")
            // localStorage.removeItem("roleId")
            // localStorage.removeItem("roleName")
            // localStorage.removeItem("menuIds")
            return null
        }
    }
    return response

}, error => {//主要是对失败的统一处理
    let {
        response //应该是等价于 error.response
    } = error;
    if (response) {//虽然失败了,但服务器返回了东西
        switch (response.status) {
            case 401://需要用户验证,未登录,权限
                //跳转页面或...
                Message({
                    message: '未登录',
                    type: 'error',
                    duration: 2 * 1000,
                })
                break;
            case 403://token过期,服务器拒绝执行

                break;
            case 404: //找不到地址
                Message({
                    message: '路径错误',
                    type: 'error',
                    duration: 2 * 1000,
                })
                break;
            // default: 
            // Message({
            //     message: '未登录',
            //     type: 'error',
            //     duration: 2 * 1000,
            // })
        }
    } else {//失败了且服务器没有返回东西(断网处理)
        if (!window.navigator.onLine) {
            //断网处理,可以跳转到断网页面
            Message({
                message: "网络错误",
                type: 'error',
                duration: 2 * 1000,
            })
            return;
        }
        Message({
            message: error.message,
            type: 'error',
            duration: 2 * 1000,
        })
        return Promise.reject(error);
        //返回错误给代码??直接执行失败的方法???(自己调用???)
    }
})


export default axios;
//返回自己修改过的axios,而不是自动从axios库中获取原始的axios