/**
 * 需要设置权限的按钮
 * { "按钮名称": ['权限1', '权限2'] }
 */
const btnList = {


    /**
        * 业务管理按钮
        */
    distributionBusiness: ['00001SHAREORDER_SET'],//业务分配
    handleBusiness: ['00001CHECKORDER_WORK'], //业务处理

    /**
    * 平台信息管理
    */
    platformInfoSet: ['00002SERTYPE_SET'], //业务分类设置
    platformInfoMouldSet: ['00002SERMOD_SET'], //业务模板设置管理

    /**
    * 新闻内容后台管理
    */
    newsSet: ['00003NEWS_SET'], //新闻内容设置操作功能权限

    //文件管理点击文件分类查询的权限  this.GB()
    fileTypeFetch: [],
    //文件管理分类新增权限
    fileTypeAdd: [],
    //文件管理分类修改权限
    fileTypeUpdate: [],
    //文件管理分类删除权限
    fileTypeDelete: [],
    /**
     * 部门按钮
     */
    insertBumen: ['00001COM_DPTCREATE'],//部门创建
    deleteBumen: ['00001COM_DPTDEL'],//删除部门
    updateBumen: ['00001COM_DPTUPDATE'],//编辑部门

    /**
     * 职位按钮
     */
    insertZhiwei: ['00001COM_POSCREATE'],//职位创建
    updateZhiwei: ['00001COM_POSUPDATE'], //职位修改
    deleteZhiwei: ['00001COM_POSDEL'], //职位删除

    /**
     * 权限配置
     */
    updateQuanxian: ['00001COM_PERSET'], // 权限配置

    /**
     * 人事按钮
     */
    insertPeople: ['00001USER_INFOCREATE'],//人员新增
    updatePeople: ['00001USER_INFOUPDATE'],//人员修改
    updatePeopleBumen: ['00001USER_DPTSET'], //配置人员部门
    updatePeopleZhiwei: ['00001USER_POSSET'], //配置人员职位
    updatePeopleLvli: ['00001USER_NOTESSET'], //人员合同
    updatePeopleZhicheng: ['00001USER_TITLESET'], //人员职称

}

/**
 * 系统自带文件权限配置
 */
const sysBtn = {

}

/**
 * 根据当前用户的按钮权限控制按钮是否出现
 * @param {*} type 按钮类型
 */
export function checkBtnPermission(type) {
    let permissionButton
    if (sessionStorage.permissionButton) {
        permissionButton = JSON.parse(sessionStorage.permissionButton)
    }
    if (!permissionButton || !type || !btnList[type]) {
        return false
    }
    if (btnList[type].length == 0) {
        return true
    }

    let btnItem = btnList[type], boo = false
    for (let i = 0; i < btnItem.length; i++) {
        if (permissionButton.includes(btnItem[i])) {
            boo = true
            break
        }
    }
    return boo

}

/**
 * 
 * @param {*} type 按钮类型
 * @param {*} fileNum 文件编号
 */
export function checkSysFilePermission(type, fileNum) {
    let permissionButton
    if (sessionStorage.permissionButton) {
        permissionButton = JSON.parse(sessionStorage.permissionButton)
    }
    if (!permissionButton) {
        return false
    }
    if (!sysBtn[type]) {
        return true
    }
    let sysList = sysBtn[type]
    let [sysItem] = sysList.filter((item, index) => {
        if (item.value && item.value.includes(fileNum)) {
            return true
        }
    })
    if (sysItem) {
        if (permissionButton.includes(sysItem.key)) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}