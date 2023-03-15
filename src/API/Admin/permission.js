import axios from "@/utils/axios.js"
const baseProject = 'StaffWeb/'

/**
 * 查询权限列表
 */
const fetchPermission = () => {
    return Promise.resolve({"code":1000,"message":"操作成功","data":[{"id":1,"permissionCode":"00001","permissionName":"平台业务管理","permissionType":1,"fromPermissionCode":"0","urlInfo":"","enable":true,"activity":true,"createrCode":"84799832753192961","addTime":"2021-03-03 17:16:36","num":1},{"id":2,"permissionCode":"00001SHAREORDER","permissionName":"运营业务分配管理","permissionType":2,"fromPermissionCode":"00001","urlInfo":"","enable":true,"activity":true,"createrCode":"84799832753192961","addTime":"2021-03-17 11:21:17","num":1},{"id":3,"permissionCode":"00001CHECKORDER","permissionName":"认证业务处理管理","permissionType":2,"fromPermissionCode":"00001","urlInfo":"","enable":true,"activity":true,"createrCode":"84799832753192961","addTime":"2021-03-10 17:33:37","num":2},{"id":4,"permissionCode":"00002","permissionName":"平台基本参数设置管理","permissionType":1,"fromPermissionCode":"0","urlInfo":"","enable":true,"activity":true,"createrCode":"84799832753192961","addTime":"2021-03-26 13:15:22","num":2},{"id":5,"permissionCode":"00002SERTYPE","permissionName":"业务分类管理","permissionType":2,"fromPermissionCode":"00002","urlInfo":"","enable":true,"activity":true,"createrCode":"84799832753192961","addTime":"2021-03-26 13:15:12","num":1},{"id":6,"permissionCode":"00002SERTYPE_SET","permissionName":"业务分类设置","permissionType":3,"fromPermissionCode":"00002SERTYPE","urlInfo":"","enable":true,"activity":true,"createrCode":"84799832753192961","addTime":"2021-03-26 13:15:12","num":1},{"id":7,"permissionCode":"00002SERMOD","permissionName":"业务模板管理","permissionType":2,"fromPermissionCode":"00002","urlInfo":"","enable":true,"activity":true,"createrCode":"84799832753192961","addTime":"2021-03-26 13:15:13","num":2},{"id":8,"permissionCode":"00002SERMOD_SET","permissionName":"业务模板设置管理","permissionType":3,"fromPermissionCode":"00002SERMOD","urlInfo":"","enable":true,"activity":true,"createrCode":"84799832753192961","addTime":"2021-03-26 13:15:13","num":1},{"id":9,"permissionCode":"00001SHAREORDER_SET","permissionName":"运营业务指派","permissionType":3,"fromPermissionCode":"00001SHAREORDER","urlInfo":"","enable":true,"activity":true,"createrCode":"84799832753192961","addTime":"2021-03-26 13:15:14","num":1},{"id":10,"permissionCode":"00001CHECKORDER_WORK","permissionName":"认证业务处理","permissionType":3,"fromPermissionCode":"00001CHECKORDER","urlInfo":"","enable":true,"activity":true,"createrCode":"84799832753192961","addTime":"2021-03-26 13:15:16","num":1},{"id":11,"permissionCode":"00003","permissionName":"内容运营管理","permissionType":1,"fromPermissionCode":"0","urlInfo":"","enable":true,"activity":true,"createrCode":"84799832753192961","addTime":"2021-03-26 13:15:24","num":3},{"id":12,"permissionCode":"00003NEWS","permissionName":"新闻内容管理","permissionType":2,"fromPermissionCode":"00003","urlInfo":"","enable":true,"activity":true,"addTime":"2021-03-26 13:15:59","num":1},{"id":13,"permissionCode":"00003NEWS_SET","permissionName":"新闻内容设置","permissionType":3,"fromPermissionCode":"00003NEWS","urlInfo":"","enable":true,"activity":true,"addTime":"2021-03-26 13:16:26","num":1}]})
}


/**
 * 处理权限列表
 */
const handlePermission = (data) => {
    return new Promise((resolve, reject) => {
        fetchHasPermission(data).then(infoData => {
            let info = infoData.data
            let infoHasCode = []
            if (info && Array.isArray(info)) {
                infoHasCode = info.map((v) => v.permissionCode)
            }
            let baseInfo = JSON.parse(JSON.stringify(infoHasCode))
            fetchPermission().then(resData => {
                let res = resData.data
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
                            item.forEach((v, i) => {//遍历当前层级的数组
                                let codeList = []
                                for (let rIndex = 0; rIndex < result.length; rIndex++) {
                                    let hasChild = false
                                    if (v.permissionCode === result[rIndex].fromPermissionCode) {
                                        hasChild = true
                                        v.checked = infoHasCode.includes(v.permissionCode)
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
                                        v.checked = infoHasCode.includes(v.permissionCode)
                                        list.push(v)
                                    }
                                }
                            })
                        } else {
                            item.forEach((v) => {
                                v.checked = infoHasCode.includes(v.permissionCode)
                            })
                            list.push(...item)
                        }
                        result = list
                    })
                }
                resolve({
                    baseInfo,
                    result
                })
            }).catch((error) => {
                reject(error)
            })
        }).catch((error) => {
            reject(error)
        })

    })
}

/**
 * 处理已有权限列表
 */
const handleHasPermission = (data) => {
    return new Promise((resolve, reject) => {
        fetchHasPermission(data).then(resData => {
            let res = resData.data
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
                        item.forEach((v, i) => {//遍历当前层级的数组
                            let codeList = []
                            for (let rIndex = 0; rIndex < result.length; rIndex++) {
                                let hasChild = false
                                if (v.permissionCode === result[rIndex].fromPermissionCode) {
                                    hasChild = true
                                    v.checked = true
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
                                    v.checked = true
                                    list.push(v)
                                }
                            }
                        })
                    } else {
                        item.forEach((v) => {
                            v.checked = true
                        })
                        list.push(...item)
                    }
                    result = list
                })
            }
            resolve({
                result
            })
        }).catch((error) => {
            console.error(error)
            reject(error)
        })
    })
}


/**
 * 
 * 查询已有权限
 * @param {*} param0 
 */
const fetchHasPermission = ({
    positionCode
}) => {
    return Promise.resolve({"code":1000,"message":"操作成功","data":[{"id":7,"positionCode":"161536701496609254","permissionCode":"00001","permissionName":"平台业务管理","permissionType":1,"fromPermissionCode":"0","urlInfo":"0","enable":"1","activity":"1","createrCode":"84799832753192961","addTime":"2021-03-10 17:03:58"},{"id":8,"positionCode":"161536701496609254","permissionCode":"00001SHAREORDER","permissionName":"运营业务分配管理","permissionType":2,"fromPermissionCode":"00001","urlInfo":"0","enable":"1","activity":"1","createrCode":"84799832753192961","addTime":"2021-03-10 17:03:58"},{"id":11,"positionCode":"161536701496609254","permissionCode":"00002","permissionName":"平台基本参数设置管理","permissionType":1,"fromPermissionCode":"0","urlInfo":"0","enable":"1","activity":"1","createrCode":"84799832753192961","addTime":"2021-03-26 12:58:59"},{"id":12,"positionCode":"161536701496609254","permissionCode":"00002SERTYPE","permissionName":"业务分类管理","permissionType":2,"fromPermissionCode":"00002","urlInfo":"0","enable":"1","activity":"1","createrCode":"84799832753192961","addTime":"2021-03-26 12:59:00"},{"id":13,"positionCode":"161536701496609254","permissionCode":"00002SERTYPE_SET","permissionName":"业务分类设置","permissionType":3,"fromPermissionCode":"00002SERTYPE","urlInfo":"0","enable":"1","activity":"1","createrCode":"84799832753192961","addTime":"2021-03-26 12:59:00"},{"id":14,"positionCode":"161536701496609254","permissionCode":"00002SERMOD","permissionName":"业务模板管理","permissionType":2,"fromPermissionCode":"00002","urlInfo":"0","enable":"1","activity":"1","createrCode":"84799832753192961","addTime":"2021-03-26 12:59:00"},{"id":15,"positionCode":"161536701496609254","permissionCode":"00002SERMOD_SET","permissionName":"业务模板设置管理","permissionType":3,"fromPermissionCode":"00002SERMOD","urlInfo":"0","enable":"1","activity":"1","createrCode":"84799832753192961","addTime":"2021-03-26 12:59:00"},{"id":22,"positionCode":"161536701496609254","permissionCode":"00001SHAREORDER_SET","permissionName":"运营业务指派","permissionType":3,"fromPermissionCode":"00001SHAREORDER","urlInfo":"0","enable":"1","activity":"1","createrCode":"84799832753192961","addTime":"2021-04-06 14:53:43"}]})
}


/**
 * 
 * 设置权限
 * @param {*} data 
 */
const setPermission = (data) => {
    return Promise.resolve({code: 1000})
}

/**
 * 
 * 排序
 * @param {*} data 
 */
const upPermissionStaff = (data) => {
    return Promise.resolve({code: 1000})
}

/**
 * 
 * 新增
 * @param {*} data 
 */
const insPermissionStaff = (data) => {
    return Promise.resolve({code: 1000})
}


/**
 * 
 * 修改
 * @param {*} data 
 */
const upPermissionStaffCode = (data) => {
    return Promise.resolve({code: 1000})
}


export default {
    upPermissionStaffCode,
    insPermissionStaff,
    upPermissionStaff,
    fetchPermission,
    handlePermission,
    fetchHasPermission,
    setPermission,
    handleHasPermission
}