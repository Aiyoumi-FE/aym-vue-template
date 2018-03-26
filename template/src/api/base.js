import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

const vm = new Vue()
const retFilter = (data) => {
    return data.ret || data
}
let $loading

let requestCount = 0
let responseCount = 0

/**
 * [loading 逻辑处理]
 * @param  {[number]} type [0:request ,1: response]
 * @return {[type]}      [description]
 */
const reqLoadingLogical = () => {
    $loading = vm.$_loading()
    requestCount += 1
    // console.log('request-count:', requestCount)
    if (!$loading.isVisible) {
        $loading.show()
    }
}
const resLoadingLogical = () => {
    responseCount += 1
    // console.log('response-count:', responseCount)
    if (responseCount >= requestCount) {
        requestCount = responseCount = 0
        // vm.$nextTick(() => {
        $loading.hide()
        // })
    }
}

/**
 * 说明：
 * 如果接口success :true ,那么直接返回 result ,(如果 想要完整数据，传入format:false即可)
 * success :false ,会返回
 */
const formatRes = (res) => {
    if (res.success) {
        return Promise.resolve(res.result)
    }
    return Promise.reject(res)
}
// Add a request interceptor
axios.interceptors.request.use((config) => {
    config.withCredentials = true
    // console.log('config:', config)
    config.loading && reqLoadingLogical()

    return config
}, (error) => {
    console.log('request-error:', error)
    // Do something with request error
    return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use((response) => {
    let retFilterData = retFilter(response.data)
    // console.log(response.config.loading)
    response.config.loading && resLoadingLogical()
    // if (response.config.format)
    return response.config.format ? formatRes(retFilterData) : retFilterData
}, (error) => {
    console.log('response-error:', error)
    error.config.loading && resLoadingLogical()
    vm.$_toast('服务器出错了')
    return Promise.reject(error)
})

export const getPromise = (url, data = {}, { format = true, loading = true, ...other } = {}) => {
    // console.log('format:', format, ',loading:', loading)
    return axios.get(url, { params: data, loading, format, ...other }).then(response => {
        return Promise.resolve(response)
    }).catch((error) => {
        return Promise.reject(error)
    })
}

export const postPromise = (url, data = {}, { format = true, loading = true, ...other } = {}) => {
    // console.log('other:', other)
    return axios.post(url, qs.stringify(data), { loading, format, ...other }).then(response => {
        return Promise.resolve(response)
    }).catch((error) => {
        return Promise.reject(error)
    })
}
export const allPromise = (list = []) => {
    return axios.all(list).then(axios.spread((...ls) => {
        return Promise.resolve(ls)
    })).catch((error) => {
        return Promise.reject(error)
    })
}
