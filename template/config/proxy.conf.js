const prefix = '{{name}}' // 前缀

const cookieLocal = {}
const routerLocal = {}

const frontPort = process.env.PORT || '8083'

// const frontPort = '8083'
const serverPort = '8443'

//********************************************************************//
//**-------------！！看这里！看着里！！------------------
// 需要配一波host
//127.0.0.1 新增
////
// prefix-x.aym.com
//** ------- 开发小哥哥的ip和port---//**//
//**
const devHostName = '' //10.10.80.205 xx.xx.xx.xx
const devPort = '' // xx
//***********************************************************************//

const env = [
    'test',
    'aliyun1',
    'aliyun2',
    'aliyun4',
    'testper',
]

const formatDomain = (type) => {
    return {
        dev: env.map(item => `${prefix}-${item}.aym.com`),
        server: env.map(item => `${prefix}-${item}-static.aiyoumi.com`)
    }[type]
}

let frontList = formatDomain('dev')
let serverList = formatDomain('server')

serverList.forEach((item, i) => {
    cookieLocal[item] = frontList[i]
})
frontList.forEach((item, i) => {
    routerLocal[`${item}:${frontPort}`] = `https://${serverList[i]}:${serverPort}`
})
if (devHostName) {
    cookieLocal[devHostName] = 'dev.aiyoumi.com'
    cookieLocal['*'] = 'dev.aiyoumi.com'
    routerLocal[`dev.aiyoumi.com:${frontPort}`] = `http://${devHostName}:${devPort}`
}

module.exports = {
    proxyTable: {
     '/api/**/*': {
            logLevel: 'debug',
            target: 'http://192.168.4.102:9999/mockjsdata/212', // rap
            changeOrigin: true,
            cookieDomainRewrite: cookieLocal,
            router: routerLocal
        }
    }
}


