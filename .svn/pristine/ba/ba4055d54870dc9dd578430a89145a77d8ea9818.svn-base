import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    userInfo: {},
    count: [],
    index: '0',//tab当前页
    SavePages: ['index'],//路由缓存 页面
    menus: [],
    tabs:'',//导航栏
    modules:[]//账户下的所有菜单
}

const mutations = {
    saveUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    saveUserMenu(state, menus) {
        state.menus = menus
    },
    push(state, count) {
        state.count = count
    },
    change(state, currentIndex) {
        state.index = currentIndex
    },
    save(state, pages) {
        state.SavePages = pages
    },
    tabsChange(state,tabs){
        state.tabs = tabs
    },
    saveModules(state,modules){
        state.modules = modules
    },
}

//发送请求，查看用户是否登录过
const actions = {
    // async getAdminData({ commit }) {
        //         try {
        //             const res = await getAdminInfo()
        //             if (res.status == 1) {
        //                 commit('saveAdminInfo', res.data);
        //             } else {
        //                 throw new Error(res)
        //             }
        //         } catch (err) {
        //             console.log('您尚未登陆或者session失效')
        //         }
    // }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
})