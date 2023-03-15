

function createUploader() {
  this.urlOptions = {
    authUrl: `brounche/obs/getPostSignature`
    // authUrl:``
  }
  this.authInfo = {}
  // console.log('华为云')
}

createUploader.prototype = {
  async start(_target, options = { fileNum: "", folder: "", file: null, fileName: "", code: "", isRealName: false }) {
    this._target = _target
    if (!_target.$axios || !_target.$uploadNew) {
      console.error(`传入数据异常，请检查是否带有$axios, $uploadNew方法`);
      return Promise.reject()
    }
    this.$axios = _target.$axios
    this.$uploadIp - _target.uploadIp
    this.$uploadNew = _target.$uploadNew
    try {
      let authInfo = await this.getAuth(options)
      // console.log("authInfo",authInfo)
      const { code, fileOssName, fileCode, fileType } = await this.uploadFile(Object.assign({}, authInfo, options))
      // console.log(code,fileOssName, fileCode, fileType,"day")
      if (code === 1000) {
        console.log("promise成功")
        console.log("10171")
        return Promise.resolve({ ...options, code: 1000, fileOssName, fileCode, fileType })

      }
      return Promise.reject()

      // this.createFileInfo(Object.assign({}, fileInfo, options)).then(res => {
      //     if (res.code == 1000) {
      //         return Promise.resolve(Object.assign({}, res, { fileInfo }))
      //     } else {
      //         return Promise.reject(res)
      //     }
      // })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 获取临时秘钥
  getAuth({ fileNum, path, folder }) {
    try {
      if (Object.keys(this.authInfo).length > 0) {

        return Promise.resolve(this.authInfo)
      }
      console.log('获取临时密钥')
      return this.$axios({
        // url: `${this.urlOptions.authUrl}?fileNum=${fileNum}&folder=${folder}&num=1`,
        url: `${this.urlOptions.authUrl}`,
        // url: 'http://192.168.1.24:8081/brounche/obs/getLogoPostSignature',
        ip: `${process.env.VUE_APP_BASEFILEIP}`,


      }).then(res => {
        if (res.code == 1000) {
          let credentials = res.data.credentials
          this.authInfo = {
            ...res.data,
            // fileOssName: res.data.fileNameList[0]
            // XCosSecurityToken: credentials.sessionToken,
            // Authorization: {
            //     SecretId: credentials.tmpSecretId,
            //     SecretKey: credentials.tmpSecretKey,
            //     Method: 'POST',
            //     Pathname: path,
            // }
          }
          console.log('url成功', this.authInfo)
          return this.authInfo
        } else {
          console.log('url失败')
          return Promise.reject(res)
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // getAuth({ fileNum, path, folder }) {
  //     try {
  //         return this.$axios({
  //             url: `${this.urlOptions.authUrl}`,
  //             data: {
  //                 fileNum: fileNum,
  //                 folder
  //             }
  //             // url: `http://192.168.31.175:8080/FileManage/upLoad/getCosKeyTest?fileNum=${fileNum}`,
  //         }).then(res => {
  //             if (res.code == 1000) {
  //                 let credentials = res.data.credentials
  //                 return {
  //                     ...res.data,
  //                     XCosSecurityToken: credentials.sessionToken,
  //                     Authorization: CosAuth({
  //                         SecretId: credentials.tmpSecretId,
  //                         SecretKey: credentials.tmpSecretKey,
  //                         Method: 'POST',
  //                         Pathname: path,
  //                     })
  //                 }
  //             } else {
  //                 return Promise.reject(res)
  //             }
  //         })
  //     } catch (error) {
  //         return Promise.reject(error)
  //     }
  // },
  getContentType(fileType) {
    fileType = fileType.toLowerCase()
    let config = {
      '.mp4': 'video/mp4',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.obj': 'model/obj',
      '.mtl': 'model/mtl',
    }
    return config[fileType] || 'image/jpeg'
  },
  // 文件上传
  uploadFile(signInfo) {
    let fileOssName = signInfo.isRealName ? signInfo.file.name.substr(0, signInfo.file.name.lastIndexOf('.')) : signInfo.code
    let fileType = '.' + signInfo.file.name.split('.').pop()
    if (!signInfo.file.name.includes('.')) {
      fileType = ''
      fileOssName = signInfo.file.name
    }
    let fd = new FormData()
    console.log("test")
    // console.log(signInfo.folder , fileOssName , fileType);
    let info = {
      key: signInfo.folder + fileOssName + fileType, // Object name,
      'x-obs-acl': 'public-read', // Object ACL
      'content-type': 'image/jpeg',
      policy: signInfo.policy,
      AccessKeyId: signInfo.accessKeyId,
      signature: signInfo.signature,
      // success_action_status: 200,
      // name: fileOssName + fileType,
    }
    for (let i in info) {
      fd.set(i, info[i])
    }
    // XCosSecurityToken && fd.append('x-cos-security-token', XCosSecurityToken);
    // console.log(signInfo.file);
    fd.append('file', signInfo.file); // file 字段放在表单最后，避免文件内容过长影响签名判断和鉴权
    // console.log(fd,"fd")
    return this.$uploadNew({
      ip: '//' + signInfo.requestUrl,
      url: ``,
      data: fd,
      // 添加上传的headers
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      onUploadProgress: (...arg) => {
        signInfo.onUploadProgress && signInfo.onUploadProgress(...arg)
      }
    }).then(res => {
      // console.log(res,"res")
      if (res) {
        return {
          ...res,
          fileOssName: fileOssName + fileType,
          fileCode: fileOssName,
          fileName: signInfo.file.name,
          fileType: fileType
        }
      } else {
        return res
      }
    })
  },
  // 写入文件数据
  createFileInfo(options) {
    return Promise.resolve(options)
  }
}

export const COSUploader = createUploader
