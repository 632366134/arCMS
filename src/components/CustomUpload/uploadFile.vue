<template>
  <el-upload
    class="upload-demo"
    action=""
    :accept="accept"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :multiple="multiple"
    :limit="maxNum"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :file-list="fileList"
    :on-change="handleFileChange"
    :disabled="disabled"
  >
    <div v-if="mode === 'edit'">
      <el-button size="small" type="info">{{ btnText }}</el-button>
      <div slot="tip" class="el-upload__tip" v-if="tipsText !== ''">
        {{ tipsText }}
      </div>
    </div>
  </el-upload>
</template>

<script>
import GetMediaSize from './getMediaSize'
import mixins from './mixins'
import { pending } from './status'
let calc
export default {
  name: 'CustomUploadFile',
  mixins: [mixins],
  props: {
    tipsText: {
      type: String,
      default: ''
    },
    value: {
      type: Array
    },
    maxNum: {
      type: Number,
      default: 1
    },
    maxSize: {
      type: Number,
      default: 0
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ''
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
  methods: {
    handleFileChange(file) {
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
      if (this.calcSize) {
        calc = calc || new GetMediaSize()
        calc
          .calc({
            name: file.name,
            mediaType: this.mediaType,
            url: URL.createObjectURL(file.raw)
          })
          .then((res) => {
            Object.assign(newFile, res)
            setTimeout(() => {
              this.$emit('sizeChange', res)
            }, 300)
          })
      }
      this.emit()
    },
    handlePreview() {},
    handleRemove(e) {
      console.log(e)
      this.deleteFileList(e)
      this.emit()
    },
    beforeRemove() {},
    handleExceed() {
      this.$message.warning(`最多只能上传${this.maxNum}个文件`)
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.upload-demo {
  min-height: 60px;
}
.el-upload__tip {
  display: inline-flex;
  align-items: center;
  margin-left: 9px;
  font-size: 12px;
  color: #8c8d8d;
  max-width: 300px;
  vertical-align: top;
  margin-top: 0;
  line-height: 1.4;
  min-height: 32px;
}
.el-button {
  min-width: 200px;
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
