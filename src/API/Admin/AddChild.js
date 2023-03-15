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

const childAdd = (data) => {
    return axios({
        url: `${baseProject}customer/user/register`,
        data
    })
}

/**
 * 
 * 平台推出登录
 * @param {*} param0 
 */




export default {
    childAdd

}