import axios from 'axios'
import qs from 'qs'
import { AJAXIP, getSessionStr } from './axiosIP'
import { MessageBox, Message } from 'element-ui'
const ajax = axios.create({
  timeout: '30000'
})
import router from '../router/index'
import md5 from 'js-md5'

let firstAlert = true

// axios拦截器
ajax.interceptors.request.use((config) => {
  if (sessionStorage.token) {
    config.headers.token = sessionStorage.token
    // config.headers.buttonToken = md5(sessionStorage.permissionOldButton).toUpperCase()
    // config.headers.pageToken = sessionStorage.pageToken
  }
  if (config.method == 'post') {
    if (typeof config.data == 'string') {
    } else {
      // config.data = qs.stringify(config.data)
    }
    return config
  } else {
    return config
  }
})

ajax.interceptors.response.use(
  (data) => {
    return data
  },
  (error) => {
    if (error.message) {
      if (error.message.indexOf('timeout') != -1) {
        // 请求超时
        console.error('请求超时')
        Message.error('请求超时')
      } else if (error.message.indexOf('404') != -1) {
        // 404
        console.error('接口404')
        Message.error('请求404')
      } else if (error.message.indexOf('500') != -1) {
        // 500
        // console.error('接口500')
        // Message.error('服务端异常')
        // Message.error('服务端异常')
        if (error.message.path === "/brounche/user/updatePwd") {
          Message.error('原密码输入错误111')
        } else {
          // console.err('接口500')
          Message.error('服务端异常')
        }
      } else {
        Message.error('请求失败111')
      }
    }
  }
)

function jump() {
  sessionStorage.removeItem('LOGIN_STATE')
  if (sessionStorage.permission === '0') {
    sessionStorage.clear()
    return router.replace('/Login')
  } else {
    sessionStorage.clear()
    return router.replace('/Login')
  }
}

export default function ({
  url = '',
  ip = AJAXIP,
  data,
  params,
  type = 'POST',
  header = {
    // 正式上线后图片上传有问题
    'content-type': 'application/json;charset=utf-8'
  },
  responseType = 'application/json',
  noError
}) {
  return new Promise((resolve, reject) => {
    url = getSessionStr(url)
    ajax({
      url: ip + url,
      data,
      params,
      method: type,
      headers: header,
      responseType: responseType
    })
      .then((res) => {
        if (res.data.code === 0 || res.data.code === 2) {
          if (firstAlert) {
            firstAlert = false
            MessageBox.alert(res.data.message, '提示', {
              confirmButtonText: '确定',
              callback: (action) => {
                jump()
              }
            })
          } else {
            jump()
          }
          reject()
          return
        }
        firstAlert = true
        if (responseType === 'blob') {

          resolve(res)
        } else {

          if (res.data.code === 1006) {
            Message.error(res.data.message || '操作失败')
          } else if (res.data.code === 1011) {
            Message.error(res.data.message || '操作失败')
          }
          resolve(res.data)
        }
      })
      .catch((err) => {
        reject()
        // if (noError !== 1) {
        //     Message.error('请求失败')
        // }
      })
  })
}
