import Index from "@/Layout/Index"
import base from "./module/perosonlRouter/base"
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const baseRouter = [
  {
    path: '/',
    redirect: '/showPage',
    hidden: true,
    meta: {
      noLogin: true
    },
  },
  // 产品展示页
  {
    path: '/showPage',
    nama: 'showPage',
    hidden: true,
    meta: {
      noLogin: true
    },
    component: () => import("@/pages/show/index.vue")
  },
  // 价格展示页
  {
    path: '/showPrice',
    nama: 'showPrice',
    hidden: true,
    meta: {
      noLogin: true
    },
    component: () => import("@/pages/show/price/index.vue")
  },
  {
    path: '/Login',
    name: 'Login',
    hidden: true,
    meta: {
      noLogin: true
    },
    component: () => import("@/pages/Login/index.vue"),
  },
  {
    path: "/Register",
    name: "Register",
    hidden: true,
    meta: { noLogin: true },
    component: () => import("@/pages/Login/components/Register.vue")
  },
  ...base,

]

function createRouter() {
  return new Router({ routes: baseRouter })
}

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}


export default router