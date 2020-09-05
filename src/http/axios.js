import axios from 'axios'


//axios  全局，默认值的配置
//基础网址
axios.defaults.baseURL = 'http://175.24.65.62:8900';
//头部的配置 数据以表单的方式传递
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default axios;