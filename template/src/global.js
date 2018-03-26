import { getPromise, postPromise, allPromise } from '@/api/base'

const alog = (msg) => {
    let obj = {
        msg,
        userId: sessionStorage && sessionStorage.getItem('userId')
    }
    // console.log(JSON.stringify(obj))
    if (window.alog && typeof window.alog.behavior === 'function') {
        window.alog.behavior(JSON.stringify(obj))
    }
}

export const install = function(Vue, config = {}) {
    Vue.config.productionTip = false
    Vue.config.devtools = process.env.NODE_ENV !== 'production'
    Vue.prototype.$_get = getPromise
    Vue.prototype.$_post = postPromise
    Vue.prototype.$_all = allPromise
    Vue.prototype.$_alog = alog
}
