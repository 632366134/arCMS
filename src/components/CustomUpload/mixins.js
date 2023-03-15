import { COSUploader } from './util'
import { success, fail } from './status'
import { adminPublicApi as publicApi } from '@/API/'
export default {
  computed: {
    // tipsText() {
    //     let acceptText = this.accept.replace(/\./g, '').replace(/,/g, '/')
    //     if (this.accept !== '' && this.maxSize !== 0) {
    //         return `只能上传${acceptText}文件，且不超过${this.maxSize}kb`
    //     }
    //     if (this.accept !== '') {
    //         return `只能上传${acceptText}文件`
    //     }
    //     if (this.maxSize !== 0) {
    //         return `文件最多不超过${this.maxSize}kb`
    //     }
    // }
  },
  methods: {
    uploadOne(file, secCode, isRealName) {
      console.log('uploadOne');
      return new COSUploader().start(this, {
        isRealName,
        fileNum: this.uploadInfo.fileNum,
        folder: this.uploadInfo.folder + secCode,
        file: file.raw,
        fileName: file.fileOssName,
        code: file.code,
        // fileOssName:fileOssName,
        onUploadProgress: (progress) => {
          file.percentage = progress
        }
      })
        .then((_res) => {
          Object.assign(file, {
            uploadStatus: success,
            fileOssName: _res.fileOssName,
            fileCode: file.uid,
            fileType: _res.fileType,
          })
          this.changeEmit()
          return Object.assign({}, {
            uploadStatus: file.uploadStatus,
            percentage: file.percentage,
            fileNum: this.uploadInfo.fileNum,
            fileName: file.fileOssName,
            fileOssName: file.code,
            fileCode: file.uid,
            folder: this.uploadInfo.folder + secCode,
            code: 1000
          })
        })
        .catch((error) => {
          Object.assign(file, {
            uploadStatus: fail
          })
          this.changeEmit()
          return Promise.reject(error)
        })
    },
    /**
     * 上传所有文件
     * @param {*} title 标题
     * @param {*} secCode 其他文件夹编号 带/ 媒体资源 传mediaCode
     * @param {*} isRealName 是否保留原文件名称
     * @param {*} fileList 文件列表
     * @returns
     */
    async uploadFileAll(title = '', secCode = '', isRealName = false, fileList = this.fileList) {
      let successList = [], errorList = []
      for (let file of fileList) {
        if (file.isAdd) {
          try {
            let fileRes = await this.uploadOne(file, secCode, isRealName)
            if (fileRes?.code === 1000) {
              successList.push(Object.assign(fileRes, { isAdd: file.isAdd, name: file.name }))
            } else {
              errorList.push(file)
            }
          } catch (error) {
            errorList.push(file)
          }
        } else {
          successList.push({
            uploadStatus: success,
            percentage: 100,
            fileNum: this.uploadInfo.fileNum,
            fileName: this.uploadInfo.fileNum,
            folder: this.uploadInfo.folder + secCode,
            code: 1000
          })
        }
      }

      // if (errorList.length > 0) {
      //     this.$alert(`${title}上传成功${successList.length}个,失败${errorList.length},`, '提示', {
      //         confirmButtonText: '确定',
      //         callback: action => {
      //
      //         }
      //     });
      // }
      return Promise.resolve({
        code: errorList.length > 0 ? 1006 : 1000,
        successList,
        errorList,
        message: `${title}上传成功${successList.length}个,失败${errorList.length}个`
      })
    },
    async uploadFile(file) {
      let fileName = this.uploadInfo.name
      if (!fileName) {
        fileName = await publicApi.getCosFileName().then(res => {
          if (res.code === 1000) {
            return res.data[0] + '.' + file.name.split('.').pop()
          }
        })
      }
      Object.assign(file, {
        // fileOssName: fileName
      })
      return new COSUploader().start(this, {
        fileNum: this.uploadInfo.fileNum,
        folder: this.uploadInfo.folder,
        file: file.raw,
        fileName: fileName,
        onUploadProgress: (progress) => {
          file.percentage = progress
        }
      })
        .then((res) => {
          Object.assign(file, {
            uploadStatus: success
          })
          this.emit()
          return res
        })
        .catch((error) => {
          Object.assign(file, {
            uploadStatus: fail
          })
          this.emit()
          return Promise.reject(error)
        })
    },

    emit() {
      this.$emit('input', this.fileList)
    },
    changeEmit() {
      this.$emit('change', this.fileList)
    },
    /**
     * 删除文件列表的某个文件
     * @param {*} obj 文件对象
     */
    deleteFileList({ uid, fileCode }) {
      let index = -1
      if (uid) {
        index = this.fileList.findIndex((v) => v.uid === uid)
      }

      if (index === -1) {
        index = this.fileList.findIndex((v) => v.fileCode === fileCode)
      }

      if (index !== -1) {
        this.fileList.splice(index, 1)
      }
    },

    init() {
      // console.log("test",this.value)
      this.fileList = this.value.map((item) => {
        // let nItem = {
        //     ...item,
        //     url: item.url,
        //     name: item.name,
        //     imgClass: item.imgClass || '',
        //     uid: item?.uid || this.$getCode()
        // }
        // console.log("查看初始化和编辑的区别",item)
        if (this.getPicSize && !item.imgClass) {
          this.getPicSize(item)
        }
        // return nItem
        Object.assign(item, {
          uid: item?.uid || this.$getCode()
        })


        return item
      })
    }
  }
}
