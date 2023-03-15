/**
 * 所有部门接口
 */
import axios from "@/utils/axios.js"
const baseProject = 'StaffWeb/'

/**
 * 查询部门列表
 */
const fetchBumenList = () => {
   return Promise.resolve({"code":1000,"message":"操作成功","data":{"count":3,"list":[{"departmentsLevel":1,"list":[{"id":0,"departmentsCode":"1","departmentsName":"业务运营部","fromDepartmentsCode":0,"enable":"1","activity":"1","departmentsType":0},{"id":0,"departmentsCode":"2","departmentsName":"客户运营部","fromDepartmentsCode":0,"enable":"1","activity":"1","departmentsType":0},{"id":0,"departmentsCode":"3","departmentsName":"内容运营部","fromDepartmentsCode":0,"enable":"1","activity":"1","departmentsType":0}]}]}})
}
/**
 * 处理部门列表 返回树形控件的格式
 */
const handleBumenList = () => {
    let result = []
    return new Promise((resolve, reject) => {
        try {
            fetchBumenList().then(res => {
                if (res.data.list && Array.isArray(res.data.list)) {
                    let resList = res.data.list
                    resList.sort((a, b) => b.departmentsLevel - a.departmentsLevel)
                    resList.forEach((item, index) => {//遍历带层级的数组
                        let list = []
                        if (item.list) {
                            item.list.forEach((v) => {
                                Object.assign(v, {
                                    label: v.departmentsName,
                                    orgId: v.departmentsCode,
                                    departmentsLevel: item.departmentsLevel
                                })
                            })
                        }
                        if (index != 0) {
                            item.list.forEach((v, i) => {//遍历当前层级的数组

                                let codeList = []
                                for (let rIndex = 0; rIndex < result.length; rIndex++) {
                                    let hasChild = false // 是否在上一次有子部门
                                    if (v.departmentsCode == result[rIndex].fromDepartmentsCode) {
                                        hasChild = true
                                        if (v.children) {
                                            v.children.push(result[rIndex])
                                        } else {
                                            v.children = [result[rIndex]]
                                        }
                                        if (!codeList.includes(v.departmentsCode)) {
                                            list.push(v)
                                            codeList.push(v.departmentsCode)
                                        }
                                    }
                                    if (!hasChild && !codeList.includes(v.departmentsCode)) {//没有子部门
                                        codeList.push(v.departmentsCode)
                                        list.push(v)
                                    }
                                }
                            })
                        } else {
                            list.push(...item.list)
                        }
                        result = list
                    })
                    resolve({
                        count: res.data.count || 0,
                        data: result
                    })
                } else {
                    resolve(res)
                }

            }).catch((error) => {
                reject(error)
            })
        } catch (error) {
        }
    })
}


/**
 * 处理部门列表 返回组织架构格式
 */
const handleBumenZuzhi = () => {
    let result = []
    return new Promise((resolve, reject) => {
        fetchBumenList().then(res => {
            if (res.list && Array.isArray(res.list)) {
                let resList = res.list
                resList.forEach((v) => {
                    v.list && v.list.forEach((item) => {
                        item.label = item.departmentsName
                        item.id = item.departmentsCode
                        item.departmentsLevel = v.departmentsLevel
                    })
                })
                resList.sort((a, b) => b.departmentsLevel - a.departmentsLevel)
                resList.forEach((item, index) => {//遍历带层级的数组
                    let list = []
                    if (index != 0) {
                        item.list.forEach((v, i) => {//遍历当前层级的数组
                            let codeList = []
                            for (let rIndex = 0; rIndex < result.length; rIndex++) {
                                let hasChild = false // 是否在上一次有子部门
                                if (v.departmentsCode === result[rIndex].fromDepartmentsCode) {
                                    hasChild = true
                                    if (v.children) {
                                        v.children.push(result[rIndex])
                                    } else {
                                        v.children = [result[rIndex]]
                                    }
                                    if (!codeList.includes(v.departmentsCode)) {
                                        list.push(v)
                                        codeList.push(v.departmentsCode)
                                    }
                                }
                                if (!hasChild && !codeList.includes(v.departmentsCode)) {//没有子部门
                                    codeList.push(v.departmentsCode)
                                    list.push(v)
                                }
                            }
                        })
                    } else {
                        list.push(...item.list)
                    }
                    result = list
                })
                resolve({
                    count: res.count || 0,
                    data: result
                })
            } else {
                resolve(res)
            }

        }).catch((error) => {
            reject(error)
        })
    })
}

/**
 * 查询部门详情
 * @param {*} param0 
 */
const fetchBuInfo = ({ departmentsCode }) => {
    return Promise.resolve({"code":1000,"message":"操作成功","data":{"activity":true,"addTime":"2021-03-10 17:01:24","createrCode":"84799832753192961","departmentsCode":1,"departmentsLeaderCode":"","departmentsLevel":1,"departmentsName":"业务运营部","departmentsType":0,"enable":true,"fromDepartmentsCode":0,"id":4}})
}

/**
 * 新增部门
 * @param {*} param0 
 */
const bumenAdd = (data) => {
    return Promise.resolve({code: 1000})
}

/**
 * 修改部门
 * @param {*} param0 
 */
const bumenUpdate = (data) => {
    return Promise.resolve({code: 1000})
}


/**
 * 
 * 查询职位
 * @param {*} data 
 */
const fetchZhiwei = (data) => {
    return Promise.resolve({"code":1000,"message":"操作成功","data":[{"id":4,"positionCode":"161536701496609254","positionName":"业务运营经理","fromPositionCode":"1","positionLevel":1,"enable":"1","activity":"1","createrCode":"84799832753192961","addTime":"2021-03-10 17:03:34","departmentsCode":"1","isUserPosition":true},{"id":5,"positionCode":"161536702373774279","positionName":"业务运营坐席","fromPositionCode":"161536701496609254","positionLevel":2,"enable":"1","activity":"1","createrCode":"84799832753192961","addTime":"2021-03-10 17:03:43","departmentsCode":"1","isUserPosition":true}]})
}

/**
 * 
 * 处理职位结构
 * @param {*} data 
 */
const handleZhiweiList = (data) => {
    return new Promise((resolve, reject) => {
        fetchZhiwei(data).then(res => {
            let list = []
            let result = []
            if (res.data && Array.isArray(res.data)) {
                list = res.data
                list.forEach((v) => {
                    v.id = v.positionCode
                    v.label = v.positionName,
                        Object.assign(v, {
                            id: v.positionCode,
                            label: v.positionName,
                            orgId: v.positionCode,
                            hasPermission: v.isUserPosition
                        })
                })

                let dataObj = {}
                list.forEach((item) => {
                    let keys = item.positionLevel
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
                                let hasChild = false // 是否在上一次有子部门
                                if (v.positionCode === result[rIndex].fromPositionCode) {
                                    hasChild = true
                                    if (v.children) {
                                        v.children.push(result[rIndex])
                                    } else {
                                        v.children = [result[rIndex]]
                                    }
                                    if (!codeList.includes(v.positionCode)) {
                                        list.push(v)
                                        codeList.push(v.positionCode)
                                    }
                                }
                                if (!hasChild && !codeList.includes(v.positionCode)) {//没有子部门
                                    codeList.push(v.positionCode)
                                    list.push(v)
                                }
                            }
                        })
                    } else {
                        list.push(...item)
                    }
                    result = list
                })
            }
            result = result[0] || {}
            resolve(result)
        }).catch((error) => {
            reject(error)
        })
    })
}


/**
 * 
 * 创建职位
 * @param {*} data 
 */
const zhiweiAdd = (data) => {
    return Promise.resolve({code: 1000})
}

/**
 * 
 * 获取公司名称
 * @param {*} data 
 */
const fetchCompanyName = (data) => {
    return axios({
        url: `${baseProject}company/selCompanyName`,
        data
    })
}

/**
 * 
 * 职位修改
 * @param {*} data  [
    {
        "positionCode": "LHlP3WwwqoeRxEU0TUXcb0jpW",
        "PositionName": "行政助理(女)"
    }
]
 */
const updateZhiName = (data) => {
    return Promise.resolve({code: 1000})
}

/**
 * 
 * 通过code获取职位信息
 * @param {*} data  
 */
const fetchPosInfoByCode = (data) => {
    return axios({
        url: `${baseProject}staff/position/selPositionInfo`,
        data
    })
}


/**
 * 
 * 获取职位人员
 * @param {*} data  
 */
const fetchPeopleListByPos = (data) => {
    return axios({
        url: `${baseProject}position/selPositionUser`,
        data
    })
}


/**
 * 
 * 给人员设置职位
 * @param {*} data 
 */
const setPeopleZhiwei = (data) => {
    return Promise.resolve({code: 1000})
}


/**
 * 
 * 给人员撤销职位
 * @param {*} data 
 */
const deleteZhiwei = (data) => {
    return Promise.resolve({code: 1000})
}




export default {
    setPeopleZhiwei,
    fetchPosInfoByCode,
    fetchPeopleListByPos,
    fetchBumenList,
    handleBumenList,
    fetchBuInfo,
    bumenAdd,
    bumenUpdate,
    deleteZhiwei,
    fetchZhiwei,
    handleZhiweiList,
    zhiweiAdd,
    handleBumenZuzhi,
    fetchCompanyName,
    updateZhiName,
}