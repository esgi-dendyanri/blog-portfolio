import axios from 'axios'
import config from '../config'

axios.defaults.baseURL = config.BACKEND_URL; //BASE URL
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use(function (axios_config: any) {
    axios_config.headers.token = localStorage.getItem('token')
    return axios_config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default axios