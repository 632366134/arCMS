import axios from "@/utils/axios.js"

const baseProject = 'brounche'


/* 
获取后台用户分页列表(带搜索)√
*/
// export function getPageList(pageNum, pageSize, userAccount) {
//     return axios({
//       url: `${baseProject}/user/selUserOnUserAccountByPage`,
//       method: 'post',
//       params: {pageNum,pageSize,userAccount} // 
//     })
//   }

// 根据用户名搜索
  const getPageList = (data) =>{
    return axios({
      url: `${baseProject}/user/selUserOnUserAccountByPage`,
      method: 'post',
      params:data// 
    })
  }


// 根据公司名搜索
  const getPageList2 = (data) =>{
    return axios({
      url: `${baseProject}/user/selUserOnCompanyNameByPage`,
      method: 'post',
      params:data// 
    })
  }
//   /* 
//   根据ID获取某个后台用户
//   */
  export function getById(id) {
    return request({
      url: `${baseProject}/get/${id}`,
      method: 'get'
    })
  }
  
  /* 
  保存一个新的后台用户
  */
  export function add(user) {
    return axios({
      url: `${baseProject}/save`,
      method: 'post',
      data: user
    })
  }
  
  /* 
  更新一个后台用户
  */
  // export function update(user) {
  //   return axios({
  //     url: `${baseProject}/update`,
  //     method: 'put',
  //     data: user
  //   })
  // }
  
  const update = (data)=>{
    return axios({
      url:`${baseProject}/user/updateUserMemberType`,
      method:'put',
      params:data
    })

  }
  /* 
  获取某个用户的所有角色
  */
  export function getRoles(userCode) {
    return axios({
      url: `${baseProject}/toAssign/${userCode}`,
      method: 'get'
    })
  }
  
  /* 
  给某个用户分配角色
  roleId的结构: 字符串, 'rId1,rId2,rId3'
  */
  export function assignRoles(userId, roleId) {
    return axios({
      url: `${baseProject}/doAssign`,
      method: 'post',
      params: {
        userId,
        roleId
      }
    })
  }
  
  /* 
  删除某个用户  √
  */
  // export function removeById(userCode) {
  //   return axios({
  //     url: `${baseProject}/remove/${userCode}`,
  //     method: 'delete'
  //   })
  // }
  const delUserByAdmin = (data) =>{
    return axios({
      url: `${baseProject}/user/delUserByAdmin`,
      method: 'post',
      params:data// 
    })
  }
  
  /* 
  批量删除多个用户
  ids的结构: ids是包含n个id的数组
  */

  export function removeUsers(userCodes) {
    return axios({
      url: `${baseProject}/batchRemove`,
      method: 'delete',
      data: userCodes
    })
  }
  // const removeUsers = (data) =>{
  //   return axios({
  //     url: `${baseProject}/user/delUserByAdmin`,
  //     method: 'post',
  //     params:data// 
  //   })
  // }

  export default{
    getPageList,
    getPageList2,
    delUserByAdmin,
    update,
    removeUsers,

  }
  