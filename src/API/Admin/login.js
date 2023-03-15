/**
 * 所有登录的接口
 */

import axios from '@/utils/axios.js'

// const baseProject = 'brounche/'
const baseProject = 'brounche/'

/**
 *
 * 平台账号密码登录接口
 * @param {*} param0
 */

const AdminLogin = (data) => {
  return axios({
    url: `${baseProject}user/login`,
    // data
    params:data
  })
}

/**
 *
 * 平台账号密码修改接口
 * @param {*} param0
 */
 const updatePwd = (data) => {
  return axios({
    url: `${baseProject}user/updatePwd`,
    // data
    params:data
  })
}
/**
 *
 * 平台推出登录
 * @param {*} param0
 */

const loginOut = (data) => {
  return axios({
    url: `${baseProject}staffUser/staffLogBack`,
    data
  })
}

export default {
  AdminLogin,
  loginOut,
  updatePwd
}
