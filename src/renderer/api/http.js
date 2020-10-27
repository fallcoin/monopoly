import axios from 'axios';
import qs from 'qs';
import store from '../store'

axios.defaults.baseURL = 'http://172.22.238.215:8080';
// axios.defaults.withCredentials = true;
axios.defaults.headers["Content-type"] = "application/json";
// axios.defaults.transformRequest = data => qs.stringify(data);
axios.defaults.timeout = 0;

axios.interceptors.request.use(config => {
    // config.headers['X-Token'] = ""
    if (store.getters.getToken) {
        config.headers.Authorization = token;
    }
    return config;
})

axios.interceptors.response.use(response => {
    return response.data;
}, reason => {
    if (reason.response) {
        // 获取到数据
    } else {
        if (!window.navigator.onLine) {
            // 断网
        }
    }
    return Promise.reject(reason);
})

export default axios