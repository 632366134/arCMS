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

const checkP = (data) => {
    return axios({
        url: `${baseProject}managerUser/selBasePermission`,
        data
    })
}

/**
 * 
 * 查询全部基础权限

 * @param {*} param0 
 */




export default {
    checkP

}