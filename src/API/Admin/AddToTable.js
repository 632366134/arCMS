/**
 * 所有登录的接口
 */

import axios from "@/utils/axios.js"

const baseProject = 'brounche/'


/**
 *
 * 上传数据
 * @param {*} param0
 */

const TableAdd = (data) => {
  return axios({
    url: `${baseProject}resource/insertLogo`,
    // url: 'http://192.168.1.24:8081/brounche/resource/insertLogo',
    data
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
  TableAdd

}