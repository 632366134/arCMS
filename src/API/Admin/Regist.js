/**
 * 所有登录的接口
 */

import axios from "@/utils/axios.js"

const baseProject = 'brounche/'


/**
 * 
 * 
 * @param {*} param0 
 */

const Regist = (data) => {
    return axios({
        url: `${baseProject}user/register`,
        params:data
    })
}

/**
 * 
 * 

 */



export default {
    Regist

}