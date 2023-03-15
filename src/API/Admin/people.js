/**
 * 所有人员的接口
 */

import axios from "@/utils/axios.js"

const baseProject = ''

/**
 * 查询人员列表
 * @param {*} param0 
 */
const fetchPeopleList = (data) => {
    // return Promise.resolve({ "code": 1000, "message": "操作成功", "data": { "total": 3, "list": [{ "birthday": "1987-07-09", "email": "kurapica13@vip.qq.com", "idCard": "320203198707091219", "jobNum": "00001", "name": "员工一", "phone": "13900000000", "sex": "1", "staffUserCode": "103296153683787776", "isManager": false, "tag": "", "depList": [{ "departmentsCode": "1", "departmentsName": "业务运营部", "positionCode": "161536701496609254", "positionName": "业务运营经理" }] }, { "birthday": "1987-08-02", "email": "172782504@vip.qq.com", "idCard": "320204198708021323", "jobNum": "000002", "name": "员工二", "phone": "13800000000", "sex": "0", "staffUserCode": "103298791154417664", "isManager": false, "tag": "", "depList": [{ "departmentsCode": "1", "departmentsName": "业务运营部", "positionCode": "161536702373774279", "positionName": "业务运营坐席" }, { "departmentsCode": "1", "departmentsName": "业务运营部", "positionCode": "161536701496609254", "positionName": "业务运营经理" }] }, { "birthday": "1987-07-09", "email": "ywh@wxxtym.com", "idCard": "320203198707091219", "jobNum": "000003", "name": "员工三", "phone": "13910000000", "sex": "1", "staffUserCode": "103299139810131968", "isManager": false, "tag": "", "depList": [{ "departmentsCode": "1", "departmentsName": "业务运营部", "positionCode": "161536702373774279", "positionName": "业务运营坐席" }, { "departmentsCode": "1", "departmentsName": "业务运营部", "positionCode": "161536701496609254", "positionName": "业务运营经理" }, { "departmentsCode": "3", "departmentsName": "内容运营部", "positionCode": "161672752363097430", "positionName": "内容运营主管" }, { "departmentsCode": "3", "departmentsName": "内容运营部", "positionCode": "161673468961198822", "positionName": "新闻运营专员" }] }], "pageNum": 1, "pageSize": 3, "size": 3, "startRow": 0, "endRow": 2, "pages": 1, "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [1], "navigateFirstPage": 1, "navigateLastPage": 1, "lastPage": 1, "firstPage": 1 } })
    return Promise.resolve({ "code": 1000, "message": "操作成功", "data": { "page": 1,"limit":5, "searchObj": [{ "birthday": "1987-07-09", "email": "kurapica13@vip.qq.com", "idCard": "320203198707091219", "jobNum": "00001", "name": "员工一", "phone": "13900000000", "sex": "1", "staffUserCode": "103296153683787776", "isManager": false, "tag": "", "depList": [{ "departmentsCode": "1", "departmentsName": "业务运营部", "positionCode": "161536701496609254", "positionName": "业务运营经理" }] }, { "birthday": "1987-08-02", "email": "172782504@vip.qq.com", "idCard": "320204198708021323", "jobNum": "000002", "name": "员工二", "phone": "13800000000", "sex": "0", "staffUserCode": "103298791154417664", "isManager": false, "tag": "", "depList": [{ "departmentsCode": "1", "departmentsName": "业务运营部", "positionCode": "161536702373774279", "positionName": "业务运营坐席" }, { "departmentsCode": "1", "departmentsName": "业务运营部", "positionCode": "161536701496609254", "positionName": "业务运营经理" }] }, { "birthday": "1987-07-09", "email": "ywh@wxxtym.com", "idCard": "320203198707091219", "jobNum": "000003", "name": "员工三", "phone": "13910000000", "sex": "1", "staffUserCode": "103299139810131968", "isManager": false, "tag": "", "depList": [{ "departmentsCode": "1", "departmentsName": "业务运营部", "positionCode": "161536702373774279", "positionName": "业务运营坐席" }, { "departmentsCode": "1", "departmentsName": "业务运营部", "positionCode": "161536701496609254", "positionName": "业务运营经理" }, { "departmentsCode": "3", "departmentsName": "内容运营部", "positionCode": "161672752363097430", "positionName": "内容运营主管" }, { "departmentsCode": "3", "departmentsName": "内容运营部", "positionCode": "161673468961198822", "positionName": "新闻运营专员" }] }], "pageNum": 1, "pageSize": 3, "size": 3, "startRow": 0, "endRow": 2, "pages": 1, "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [1], "navigateFirstPage": 1, "navigateLastPage": 1, "lastPage": 1, "firstPage": 1 } })
}


/**
 * 新增人员
 * @param {*} param0 
 */
const addPeople = (data) => {
    return Promise.resolve({ code: 1000 })
}

/**
 * 
 * 查询人员信息
 * @param {*} data 
 */
const fetchPeopleInfo = (data) => {
    return Promise.resolve({ "code": 1000, "message": "操作成功", "data": { "birthday": "1987-07-09", "email": "kurapica13@vip.qq.com", "idCard": "320203198707091219", "jobNum": "00001", "name": "员工一", "phone": "13900000000", "sex": "1", "staffUserCode": "103296153683787776", "isManager": false, "tag": "", "depList": [{ "departmentsCode": "1", "departmentsName": "业务运营部", "positionCode": "161536701496609254", "positionName": "业务运营经理" }] } })
}

/**
 * 查询人员花名册
 */
const fetchPeople = (data) => {
    return axios({
        url: `${baseProject}departments/selRoster`,
        data
    })
}


/**
 * 
 * 设置部门人员
 * @param {*} data 
 */
const setBumenPeople = (data) => {
    return Promise.resolve({ code: 1000 })
}


/**
 * 
 * 给人员设置职位
 * @param {*} data 
 */
const setPeopleZhiwei = (data) => {
    return Promise.resolve({ code: 1000 })
}



/**
 * 
 * 给人员撤销职位
 * @param {*} data 
 */
const deleteZhiwei = (data) => {
    return Promise.resolve({ code: 1000 })
}



/**
 * 
 * 将人员从部门撤销
 * @param {*} data 
 */
const deleteBumen = (data) => {
    return Promise.resolve({ code: 1000 })
}


/**
 * 
 * 修改人员信息
 * @param {*} data 
 */
const updatePeopleInfo = (data) => {
    return Promise.resolve({ code: 1000 })
}

/**
 * 
 * 查询人员名称
 * @param {*} data [code, code]
 */
const fetchUserNameList = (data) => {
    return axios({
        url: `${baseProject}staffUser/selUserNameList`,
        data
    })
}

/**
 * 
 * 
根据权限查询所获权限人员名单
 * @param {*} data 
 */
const selStaffUserInfo = (data) => {
    return axios({
        url: `${baseProject}authorityStaff/selStaffUserInfo`,
        data
    })
}

/**
 * 
 * 查询登录记录
 * @param {*} data 
 */
const fetchLoginList = (data) => {
    return axios({
        url: `${baseProject}staffUser/selStaffLoginList`,
        data
    })
}


export default {
    fetchLoginList,
    fetchPeopleList,
    addPeople,
    fetchPeople,
    setBumenPeople,
    setPeopleZhiwei,
    fetchPeopleInfo,
    deleteZhiwei,
    deleteBumen,
    updatePeopleInfo,
    fetchUserNameList,
    selStaffUserInfo
}