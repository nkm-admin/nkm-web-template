import Vue from 'vue'
import Router from 'vue-router'
import { APP_TITLE } from '@/config'

Vue.use(Router)

// 遍历所有路由
const getRoutesModules = () => {
  const context = require.context('../modules', true, /\.router\.js$/)
  const routesModules = []
  context.keys().forEach(routerPath => {
    const router = context(routerPath).default
    Array.isArray(router) ? router.map(item => routesModules.push(item)) : routesModules.push(router)
  })
  return routesModules
}
const getBaseRoutesModules = () => {
  const context = require.context('../pages', true, /\.router\.js$/)
  const routesModules = []
  context.keys().forEach(routerPath => {
    const router = context(routerPath).default
    Array.isArray(router) ? router.map(item => routesModules.push(item)) : routesModules.push(router)
  })
  return routesModules
}

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      meta: {
        title: '主页'
      },
      redirect: '/dashboard',
      component: () => import( /* webpackChunkName: "login" */ '../pages/main/index.vue'),
      children: getRoutesModules()
    },
    ...getBaseRoutesModules(),
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

// 路由全局拦截-进入页面前
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || APP_TITLE
  next()
})

export default router
