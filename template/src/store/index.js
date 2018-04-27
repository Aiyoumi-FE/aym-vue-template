import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {},
    mutations: {},
    modules: {
        common
    }
})
