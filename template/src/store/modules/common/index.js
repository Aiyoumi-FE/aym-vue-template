import * as types from './mutation-types'

const debug = process.env.NODE_ENV !== 'production'

export default {
    strict: debug,
    namespaced: true,
    state: {
        test: ''
    },
    getters: {},
    mutations: {
        [types.XX](state, obj) {
            state.test = obj
        }
    },
    modules: {

    }
}
