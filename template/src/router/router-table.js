
const Notfound  ={
  template:'<div>404</div>'
}
const allRouter = (r => {
    return r.keys().map(key => r(key).default)
})(require.context('./module', false, /\.js$/))

let otherRouter = [{
    path: '/',
    redirect: { name: 'index' }
}, {
    path: '*',
    component: Notfound,
    name: '404',
    meta: { title: '404-页面不存在' }
}]
let result = []
allRouter.forEach(item => result.push(...item))

result.push(...otherRouter)
export default result
