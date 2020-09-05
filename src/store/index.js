import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import login_stat from "./module/login"

const store = new Vuex.Store({
    state: {
        user_stat: true,
        admin_stat: false,
        sadmin_stat: false,
        token: '',

    },
    getters: {},
    mutations: {
        clear_stat() {
            console.log('清除登录状态成功');
            this.state = {
                user_stat: true,
                admin_stat: false,
                sadmin_stat: false,
                token: ''
            }
            sessionStorage.removeItem('token');
        },


        set_token(state, token) {
            console.log("添加token成功");
            state.token = token
            sessionStorage.token = token
        },






    },
    modules: {
        login_stat
    }
});

export default store


