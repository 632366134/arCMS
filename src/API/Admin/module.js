/**
 * 所有登录的接口
 */

import axios from "@/utils/axios.js"

const baseProject = 'brounche/'


/**
 * 
 * 车行查询管理员账号信息
 * @param {*} param0 
 */

const staffSelect = (data) => {
  return axios({
    // url: `${baseProject}customer/customerUserStaffList`,
    url: `${baseProject}customer/customerUserStaffList`,

    data
  })
}
/**
 * 
 * 子账号创建
 * @param {*} param0 
 */

const staffSave = (data) => {
  return axios({
    // url: `${baseProject}customer/customerCompanyStaffSave`,
    url: `${baseProject}customer/operateCustomerUserPermission`,
    data
  })
}
/**
 * 
 * 车行管理员账号修改
 * @param {*} param0 
 */

const updateComInfo = (data) => {
  return axios({
    url: `${baseProject}customer/updateComInfo`,
    data
  })
}
/**
 * 
 * 车行管理员账号详情查看
 * @param {*} param0 
 */

const staffCodeSelect = (data) => {
  return axios({
    // url: `${baseProject}customer/customerUserStaffInfo`,
    url: `${baseProject}customer/customerUserStaffInfo`,

    data
  })
}

/**
 * 查询权限列表
 */
const fetchPermission = (data) => {
  return axios({
    // url: `${baseProject}customer/selPermissionComInfo`,
    url: `${baseProject}customer/selCustomerUserPermissionList`,

    data
  })
}
/**
 * 根据一组客户公司管理员编号查询 对应的支公司渠道列表
 */
const selectChannelList = (data) => {
  return axios({
    url: `${baseProject}customer/selectChannelList`,
    data
  })
}
/**
 * 根据一组客户公司管理员编号查询 对应的支公司列表
 */
const selectComCityList = (data) => {
  return axios({
    url: `${baseProject}customer/selectComCityList`,

    data
  })
}
/**
 * 修改密码
 */
const comEditPassword = (data) => {
  return axios({
    url: `${baseProject}customer/comEditPassword`,

    data
  })
}
/**
 * 校验管理员账户密码
 */
const checkUserPwd = (data) => {
  return axios({
    url: `${baseProject}customer/checkUserPwd`,

    data
  })
}


/**
* 处理权限列表
*/
const handlePermission = (_data) => {
  return new Promise((resolve, reject) => {
    // fetchHasPermission(data).then(infoData => {
    // let infoData = 
    // let info = infoData.data
    // let infoHasCode = []
    // if (info && Array.isArray(info)) {
    //   infoHasCode = info.map((v) => v.permissionCode)
    // }
    // let baseInfo = JSON.parse(JSON.stringify(infoHasCode))
    fetchPermission(_data).then(resData => {

      let res = resData.data || []
      res.sort((a, b) => a.num - b.num)
      let list = []
      let result = []
      if (res && Array.isArray(res)) {
        list = res
        let dataObj = {}
        list.forEach((item) => {
          let keys = item.permissionType
          if (dataObj[keys]) {
            dataObj[keys].push(item)
          } else {
            dataObj[keys] = [item]
          }
        })
        let dataList = []
        for (let i in dataObj) {
          dataList.push(dataObj[i])
        }
        dataList.reverse()

        dataList.forEach((item, index) => {//遍历带层级的数组
          let list = []
          if (index != 0) {
            item.forEach((v, _i) => {//遍历当前层级的数组
              let codeList = []
              for (let rIndex = 0; rIndex < result.length; rIndex++) {
                let hasChild = false
                if (v.permissionCode === result[rIndex].fromPermissionCode) {
                  hasChild = true
                  // v.checked = infoHasCode.includes(v.permissionCode)
                  v.checked = false
                  if (v.children) {
                    v.children.push(result[rIndex])
                  } else {
                    v.children = [result[rIndex]]
                  }
                  if (!codeList.includes(v.permissionCode)) {
                    list.push(v)
                    codeList.push(v.permissionCode)
                  }
                }
                if (!hasChild && !codeList.includes(v.permissionCode)) {
                  codeList.push(v.permissionCode)
                  // v.checked = infoHasCode.includes(v.permissionCode)
                  v.checked = false

                  list.push(v)
                }
              }
            })
          } else {
            item.forEach((v) => {
              // v.checked = infoHasCode.includes(v.permissionCode)
              v.checked = false

            })
            list.push(...item)
          }
          result = list
        })
      }
      resolve({
        // baseInfo,
        result
      })
    }).catch((error) => {
      reject(error)
    })
    // }).catch((error) => {
    //     reject(error)
    // })

  })
}


export default {
  checkUserPwd,
  comEditPassword,
  selectChannelList,
  selectComCityList,
  updateComInfo,
  handlePermission,
  fetchPermission,
  customerSubcomChannelUserSave,
  customerSubChannelUserSave,
  staffCodeSelect,
  staffSelect,
  staffSave
}