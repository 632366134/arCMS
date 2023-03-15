//超管登录
export function adminLogin(res) {
    // res.token = new Date().getTime()
    if (res.isManager == 0) {
        sessionStorage.permission = 0
    } else {
        sessionStorage.permission = 1
    }
    // sessionStorage.permission = res.isManager
    if (res.unUserPermissionPcInfo2) {
        sessionStorage.pagePermission = JSON.stringify(res.unUserPermissionPcInfo2.map((v) => v.permissionCode))
    }
    sessionStorage.pageOldPermission = JSON.stringify(res.unUserPermissionPcInfo2)
    if (res.unUserPermissionPcInfo3) {
        sessionStorage.permissionButton = JSON.stringify(res.unUserPermissionPcInfo3.map((v) => v.permissionCode))
    }
    sessionStorage.token = res.token
    sessionStorage.pageToken = res.pageToken
    sessionStorage.permissionOldMode = JSON.stringify(res.unUserPermissionPcInfo1)
    sessionStorage.permissionOldButton = JSON.stringify(res.unUserPermissionPcInfo3)
    sessionStorage.LOGIN_STATE = 1
    sessionStorage.Name = res.name || ''
    sessionStorage.phone = res.phone;
    sessionStorage.staffUserCode = res.staffUserCode;
    sessionStorage.staffUserName = res.staffUserName;
    this.$store.commit('base/changeManager')
    this.$store.dispatch("permission/getRoutes");
    this.$router.push("/Home");
    this.$store.commit('bar/Reset_BarList')

}

//普通用户登录
export function personalLogin(res) {
    sessionStorage.permission = "0";// 用户权限
    sessionStorage.token = res.token
    sessionStorage.pageToken = res.pageToken

    // if(res.unUserPermissionPcInfo1[0]){
    //     sessionStorage.nowMenuPermission = res.unUserPermissionPcInfo1[0].permissionCode //当前模块
    // }
    sessionStorage.permissionOldMode = JSON.stringify(res.unUserPermissionPcInfo1)// 大模块权限
    if (res.unUserPermissionPcInfo2) {
        sessionStorage.pagePermission = JSON.stringify(res.unUserPermissionPcInfo2.map((v) => v.permissionCode))
    }
    sessionStorage.pageOldPermission = JSON.stringify(res.unUserPermissionPcInfo2)// 页面权限
    if (res.unUserPermissionPcInfo3) {
        sessionStorage.permissionButton = JSON.stringify(res.unUserPermissionPcInfo3.map((v) => v.permissionCode))
    }
    sessionStorage.permissionOldButton = JSON.stringify(res.unUserPermissionPcInfo3)// 按钮功能权限

    sessionStorage.LOGIN_STATE = 1;
    sessionStorage.userCode = res.userCode;
    sessionStorage.companyCode = res.companyCode;
    sessionStorage.Name = res.name || ''
    this.$store.commit('base/changeManager')
    this.$store.dispatch("permission/getRoutes");
    this.$router.push("/Home");
    this.$store.commit('bar/Reset_BarList')

}