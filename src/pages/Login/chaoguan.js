export function adminLogin(res) {
  console.log(res)
  // res.token = new Date().getTime()
  if (res.isManager == 0) {
    sessionStorage.permission = 0
  } else {
    sessionStorage.permission = 1
  }
  // sessionStorage.permission = res.isManager
  if (res.unUserPermissionPcInfo2) {
    sessionStorage.pagePermission = JSON.stringify(
      res.unUserPermissionPcInfo2.map((v) => v.permissionCode)
    )
  }
  sessionStorage.pageOldPermission = JSON.stringify(res.unUserPermissionPcInfo2)
  if (res.unUserPermissionPcInfo3) {
    sessionStorage.permissionButton = JSON.stringify(
      res.unUserPermissionPcInfo3.map((v) => v.permissionCode)
    )
  }
  sessionStorage.token = res.token
  sessionStorage.pageToken = res.pageToken
  sessionStorage.permissionOldMode = JSON.stringify(res.unUserPermissionPcInfo1)
  sessionStorage.permissionOldButton = JSON.stringify(
    res.unUserPermissionPcInfo3
  )
  sessionStorage.LOGIN_STATE = 1
  sessionStorage.Name = res.name || ''
  sessionStorage.phone = res.phone
  sessionStorage.staffUserCode = res.staffUserCode
  // sessionStorage.userCode = this.userCode
  sessionStorage.staffUserName = res.staffUserName
  this.$store.commit('base/changeManager')
  this.$store.dispatch('permission/getRoutes')
  this.$router.push('/Home')
  this.$store.commit('bar/Reset_BarList')
}
