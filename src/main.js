import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/element.scss'
import './assets/css/globalDefault.css'
import axios from './utils/axios'
import ELEMENT from 'element-ui'
import upload, { uploadNew } from './utils/upload'
import {
  checkBtnPermission,
  checkSysFilePermission
} from './utils/checkBtnPermission'
import { MessageBox, Message } from 'element-ui'
import { AJAXIP, UPLOADIP, DOWNLOADIP } from './utils/axiosIP'
import { GetDate, GetUtil, DownLoadFile, pagePlugin } from './utils/plugins'
import 'vue2-org-tree/dist/style.css'
import store from './store'
import qs from 'qs'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'default-passive-events'

import md5 from 'js-md5'


Vue.use(ELEMENT, { size: 'small' })
Vue.prototype.$qs = qs
Vue.prototype.$md5 = md5

window.App_Ver = process.env.Ver

if (process.env.NODE_ENV !== 'development') {
  Vue.config.devtools = false
  Vue.config.errorHandler = function (err, vm, info) {
    console.error(getError(vm), '------------', err)
  }
  if (window && window.console && window.console.log) {
    window.console.log = () => { }
  }
} else {
  Vue.config.devtools = true
}

function getError(vm) {
  if (vm.$root === vm) return 'root'
  let name = vm._isVue
    ? (vm.$options && vm.$options.name) ||
    (vm.$options && vm.$options._componentTag)
    : vm.name
  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options && vm.$options.__file
      ? ' at ' + (vm.$options && vm.$options.__file)
      : '')
  )
}

Vue.prototype.$axios = axios
Vue.prototype.$upload = upload
Vue.prototype.$uploadNew = uploadNew
Vue.prototype.$axiosIp = AJAXIP //请求地址
Vue.prototype.$uploadIp = UPLOADIP // 上传地址
Vue.prototype.$downLoadIp = DOWNLOADIP // 下载固定文件地址

Vue.use(GetDate)
Vue.use(GetUtil)
Vue.use(DownLoadFile)
Vue.use(pagePlugin)

/**
 * 日期过滤器 返回 xxxx年xx月xx日
 */
Vue.filter('changeData', (value) => {
  if (!value) {
    return ''
  }
  return value.split(' ')[0].replace('-', '年').replace('-', '月') + '日'
})
//
Vue.filter('getDbNumText', (value) => {
  if (!value) {
    return ''
  }
  if (value.split(' ')[1] === '.0') {
    return value.split(' ')[0]
  } else {
    return value
  }
})
Vue.filter('changeDate', (value) => {
  if (!value) {
    return ''
  }
  return (
    value.split(' ')[0].replace('-', '年').replace('-', '月') +
    '日' +
    ' ' +
    value.split(' ')[1].replace(':', '时').replace(':', '分') +
    '秒'
  )
})
// 2022-12-12 22:22:22 -> 2022年12月12日 22:22
Vue.filter('timeToDateHM', (value) => {
  if (!value) {
    return ''
  }
  let time = value.split(' ')[1]
  return (
    value.split(' ')[0].replace('-', '年').replace('-', '月') +
    '日' +
    ' ' +
    time.substr(0, time.lastIndexOf(':'))
  )
})
Vue.filter('absNum', (value) => {
  if (value === undefined || value === null) {
    return ''
  }
  return Math.abs(value)
})
Vue.filter('timeToDate', (time) => {
  if (!time) {
    return ''
  }
  let d = time / 86400 >= 1 ? Math.floor(time / 86400) : 0
  let h =
    (time - d * 86400) / 3600 >= 1 ? Math.floor((time - d * 86400) / 3600) : 0
  let m = (time - d * 86400 - h * 3600) / 60
  m = m >= 1 ? Math.floor(m) : 0
  let s = time - d * 86400 - h * 3600 - m * 60
  let str = ''
  d > 0 && (str += d + '天')
  h > 0 && (str += h + '小时')
  m > 0 && (str += m + '分钟')
  return str
})

const isInput = (el) => {
  return el.tagName === 'INPUT'
}

Vue.directive('trim', {
  inserted: function (el) {
    let inputEl = isInput(el) ? el : el.querySelector('input')
    if (inputEl) {
      inputEl.addEventListener('blur', (e) => {
        let value = e.target.value
        e.target.value = value.trim()
        let evt = document.createEvent('HTMLEvents')
        evt.initEvent('input', true, true)
        e.target.dispatchEvent(evt)
      })
    }
  }
})

Vue.directive('notempty', {
  inserted: function (el, va) {
    let inputEl = isInput(el) ? el : el.querySelector('input')
    if (inputEl) {
      inputEl.addEventListener('blur', (e) => {
        console.log(va.value.value)
        let value = e.target.value.trim()
        console.log(value)
        if (value === '') {
          Message.warning('不能为空')
          e.target.value = va.value.value
        }
        let evt = document.createEvent('HTMLEvents')
        evt.initEvent('input', true, true)
        e.target.dispatchEvent(evt)
      })
    }
  }
})

Vue.directive('d', {
  inserted: function (el, va) {
    el.addEventListener('click', () => {
      el.disabled = true
      el.style.pointerEvents = 'none'
      setTimeout(() => {
        el.disabled = false
        el.style.pointerEvents = 'auto'
      }, va.value || 2000)
    })
  }
})

Vue.config.productionTip = false
Vue.use(ELEMENT)
// 省市 类型 主题编号  享权后台管理

/**
 * 统一添加mixin GB 判断是否显示该页面的按钮
 */
Vue.mixin({
  components: {},
  methods: {
    /**
     * 页面按钮校验
     * @param {*} type
     */
    GB(type) {
      if (!type) {
        return false
      }
      return checkBtnPermission(type)
    },
    //校验文件按钮权限
    GSB(...arg) {
      return checkSysFilePermission(...arg)
    },
    // 普通的返回上一页
    back() {
      this.$store
        .dispatch('bar/handleBack', { nowRoute: this.$route })
        .then(() => {
          this.$router.back()
        })
        .catch((error) => {
          console.error(error)
          this.$router.back()
        })
    },
    // 返回replace跳转的上一页
    backReplace() {
      if (sessionStorage.replaceFullPath) {
        this.toReplacePath(sessionStorage.replaceFullPath)
        sessionStorage.removeItem('replaceFullPath')
      } else {
        this.back()
      }
    },
    //replace跳转
    toReplacePath(path) {
      this.$store
        .dispatch('bar/handleBack', { nowRoute: this.$route })
        .then(() => {
          this.$router.replace({
            path
          })
        })
    },
    //replace带着缓存跳转
    toReplacePathCatch(path) {
      const { fullPath } = this.$route
      this.$store
        .dispatch('bar/handleBack', { nowRoute: this.$route, mustKeep: true })
        .then(() => {
          sessionStorage.replaceFullPath = fullPath
          this.$router.replace({
            path
          })
        })
    },
    toPage(path) {
      sessionStorage.fullPath = this.$route.fullPath
      this.$router.push(path)
    }
  }
})
let firstLoad = true,
  mainSection = document.querySelector('#mainSection'),
  timer
router.beforeEach(async (to, from, next) => {
  // if (to.path === '/login') return next()

  // const personalInfo = window.sessionStorage.getItem('personalInfo')
  // const staffUserCode = window.sessionStorage.getItem('staffUserCode')
  // const Name = window.sessionStorage.getItem('Name')
  // const phone = window.sessionStorage.getItem('phone')
  // if (!personalInfo && !staffUserCode && !Name) {
  //     return next('/login')
  // }
  mainSection = document.querySelector('#mainSection')
  if (mainSection) {
    mainSection.style.overflow = 'hidden'
  }
  //是否需要缓存
  if (to.meta.keepAlive) {
    store.dispatch('permission/toggleCachList', {
      name: to.name,
      type: 1
    })
  }

  // if (to.path !== '/Login' || to.path !== '/404') {
  //     store.commit('SET_NOWROUTER', to)
  // }
  if (
    store.getters['permission/get_routes'] &&
    store.getters['permission/get_routes'].length == 0
  ) {
    store.dispatch('permission/getRoutes')
    next({ ...to, replace: true })
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
  if (mainSection) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      mainSection.style.overflow = 'auto'
    }, 1000)
  }
})

Vue.prototype.$message = function (msg) {
  Message(msg)
}

Vue.prototype.$message.success = function (msg) {
  return Message.success({
    message: msg,
    duration: 1000
  })
}
Vue.prototype.$message.warning = function (msg, duration = 1000) {
  return Message.warning({
    message: msg,
    duration: duration
  })
}
Vue.prototype.$message.error = function (msg, duration = 1000) {
  return Message.error({
    message: msg,
    duration: duration
  })
}
Vue.prototype.$message.info = function (msg) {
  return Message.info({
    message: msg,
    duration: 1000
  })
}
// Vue.prototype.$confirm.delete = (name) => {
//   return MessageBox.confirm(`此操作将永久删除${name}, 是否继续?`, '提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning'
//   })
//     .then(() => {

//       Message.success('删除成功!')
//     })
//     .catch(() => {
//       Message.info('取消删除!')
//     })
// }
/* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     // router,
//     store,
//     components: { App },
//     template: '<App/>',
// })

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
