/**
 * 所有登录的接口
 */

import axios from "@/utils/axios.js"

const baseProject = ''


/**
 * 
 * 上传数据
 * @param {*} param0 
 */

const SearchChild = (data) => {
    return axios({
        url: `${baseProject}customer/user/selCustomerUserList`,
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
    SearchChild

}