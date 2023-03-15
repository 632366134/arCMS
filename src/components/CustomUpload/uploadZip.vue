<template>
  <el-upload
    class="upload-demo"
    action=""
    accept=".zip"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :multiple="false"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :file-list="fileList"
    :on-change="handleFileChange"
  >
    <div v-if="mode === 'edit'">
      <!-- :disabled="max !== 0 && fileList.length === max" -->
      <el-button size="small" type="info">{{ btnText }}</el-button>
      <div slot="tip" class="el-upload__tip" v-if="tipsText !== ''">
        {{ tipsText }}
      </div>
    </div>
  </el-upload>
</template>

<script>
// import GetMediaSize from './getMediaSize'
import mixins from './mixins'
import { pending, success } from './status'
// let calc
export default {
  name: 'CustomUploadFile',
  mixins: [mixins],
  inject: {
    mediaDataListFun: {
      from: 'mediaDataListFun',
      default: undefined
    },
    indexFun: {}
  },
  props: {
    max: {
      type: Number,
      default: 0
    },
    tipsText: {
      type: String,
      default: ''
    },
    value: {
      type: Array
    },
    maxSize: {
      type: Number,
      default: 0
    },
    uploadInfo: {
      type: Object,
      required: true,
      default: () => ({
        folder: '',
        fileNum: '',
        name: ''
      })
    },
    disabled: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'edit',
      validator(val) {
        let modeList = ['watch', 'edit']
        if (val !== '' && !modeList.includes(val)) {
          console.error(`mode参数为:${modeList}`)
          return false
        }
        return true
      }
    },
    btnText: {
      type: String,
      default: '点击上传'
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    // 是否需要计算尺寸
    calcSize: {
      type: Boolean,
      default: false
    },
    mediaType: {
      type: [String, Number],
      default: ''
    },
    configInfo: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    value: {
      handler() {
        this.init()
      }
    }
  },
  data() {
    return {
      showFileList: [],
      fileList: []
    }
  },
  computed: {
    index() {
      return this.indexFun()
    }
  },

  methods: {
    init() {
      this.fileList = this.showFileList = this.value
    },
    handleFileChange(file) {
      this.fileList = this.showFileList = []
      let newFile = {
        ...file,
        code: file.uid,
        fileName: '',
        isAdd: true,
        size: {},
        center: {}
      }
      this.fileList.push(newFile)
      Object.assign(newFile, {
        percentage: 0,
        uploadStatus: pending
      })
      // if (this.calcSize) {
      //     calc = calc || new GetMediaSize()
      //     calc.calc({
      //         name: file.name,
      //         mediaType: this.mediaType,
      //         url: URL.createObjectURL(file.raw),
      //     }).then((res) => {
      //         Object.assign(newFile, res)
      //         setTimeout(() => {
      //             this.$emit('sizeChange', res)
      //         }, 300)
      //     })
      // }
      this.emit()
    },
    handlePreview() {},
    handleRemove(e) {
      console.log('handleRemove', e, this.index)
      if (this.mediaDataList) {
        this.mediaDataList.mediaObsName = ''
        this.mediaDataList.mediaObsPath = ''
      }

      this.fileList = this.showFileList = []
      // let list = this.$store.state.successUploadList
      // let index = list.findIndex((v) => {
      //   return v.fileCode === e.uid
      // })
      // if (index != -1) {
      //   this.$store.commit('SET_UPLOADINDEX', index)
      //   this.$store.commit('Del_successUploadList', {})
      // }
      // if (this.mediaDataList) {
      //   index = this.mediaDataList?.findIndex((v) => {
      //     return v.mediaObsName === e.name
      //   })
      //   index--
      //   console.log(index)
      //   if (index != -1) {
      //     this.$store.commit('SET_UPLOADINDEX', index)
      //     this.$store.commit('Del_successUploadList', {})
      //   }
      // }
      // this.$store.commit('Del_modelParamList', index)
      this.$store.commit('SET_UPLOADINDEX', this.index)
      this.$store.commit('Del_successUploadList', {})
      this.deleteFileList(e)
      this.emit()
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed() {},
    /**
     * 上传所有文件
     * @param {*} title 标题
     * @param {*} secCode 其他文件夹编号 带/ 媒体资源 传mediaCode
     * @param {*} isRealName 是否保留原文件名称
     * @param {*} fileList 文件列表
     * @returns
     */
    async uploadFileAll(title = '', secCode = '', fileList = this.fileList) {
      let successList = [],
        errorList = []
      for (let fileItem of fileList) {
        if (fileItem.isAdd) {
          try {
            let folder = fileItem.folder === '' ? '' : fileItem.folder + '/'
            let fileRes = await this.uploadOne(fileItem, secCode + folder, true)
            if (fileRes?.code === 1000) {
              Object.assign(fileItem, {
                mediaObsPath: folder
              })
              successList.push(
                Object.assign(fileRes, {
                  isAdd: fileItem.isAdd,
                  name: fileItem.file.name
                })
              )
            } else {
              errorList.push(fileItem)
            }
          } catch (error) {
            errorList.push(fileItem)
          }
        } else {
          successList.push({
            uploadStatus: success,
            percentage: 100,
            fileNum: this.uploadInfo.fileNum,
            fileName: fileItem.fileName,
            folder: this.uploadInfo.folder + secCode,
            code: 1000
          })
        }
      }
      return Promise.resolve({
        code: errorList.length > 0 ? 1006 : 1000,
        successList,
        errorList,
        message: `${title}上传成功${successList.length}个,失败${errorList.length}个`
      })
    }
  },
  created() {
    // this.mediaDataList = this.mediaDataListFun()

    this.init()
  }
}
</script>

<style lang="scss" scoped>
.upload-demo {
  min-height: 80px;
}
.el-upload_re {
}
.el-upload__tip {
  display: inline-flex;
  align-items: center;
  margin-left: 9px;
  font-size: 12px;
  color: #8c8d8d;
  max-width: 400px;
  vertical-align: top;
  margin-top: 0;
  line-height: 1.4;
  min-height: 32px;
  word-break: break-all;
  text-align: justify;
}
.el-button {
  min-width: 150px;
  vertical-align: top;
}
::v-deep {
  .el-upload {
    text-align: left;
  }
  .el-upload-list {
    position: absolute;
    padding-bottom: 20px;
  }
}
</style>
