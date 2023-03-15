/**
 * 所有登录的接口
 */

import axios from "@/utils/axios.js"

const baseProject = ''


/**
 * 
 * 
 * @param {*} param0 
 */

const addPermit = (data) => {
    return axios({
        url: `${baseProject}customer/operateCustomerUserPermission`,
        data
    })
}

/**
 * 
 * 平台推出登录
 * @param {*} param0 
 */




export default {
    addPermit

}