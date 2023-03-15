import md5 from "js-md5"
let ip = process.env.VUE_APP_BASEIP
let fileIp = process.env.VUE_APP_BASEFILEIP
let AJAXIP = ip//请求地址
let GETFILEIP = process.env.getFileIp// 获取文件地址
let UPLOADIP = fileIp// 上传地址
let DOWNLOADIP = process.env.downLoadIp// 下载固定文件地址
let DOWNLOADFILEIP = process.env.downloadFileIp// 下载二进制文件地址

/**
 * 
 * 权限判断
 * @param {*} url 请求地址
 */
function getSessionStr(url) {
    if (sessionStorage.LOGIN_STATE) {
        // console.log(sessionStorage)
        let sessionStr = ``

        // sessionStr = `?userCode=${staffUserCode}&token=${token}`
        // sessionStr = `?userSessCode&comSessCode=${sessionStorage.customerCode}`
        sessionStr = `?userCode=${sessionStorage.userCode}`

        if (url.indexOf('?') != -1) {
            url = url.split('?')[0] + sessionStr + '&' + url.split('?')[1]
        } else {
            url = url + sessionStr
        }
        // console.log("权限判断getSessionStr")
        return url
    } else {
        return url
    }
}

export { AJAXIP, UPLOADIP, getSessionStr, DOWNLOADIP, DOWNLOADFILEIP, GETFILEIP }


