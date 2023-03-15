<template>
  <div>
    <div class="picList">
      <div
        class="picItem"
        v-for="item in fileList"
        :key="item.uid"
        :style="style"
      >
        <el-image
          :class="item.imgClass"
          :src="item.url"
          :preview-src-list="[item.url]"
        >
        </el-image>
        <div class="btnImg" @click.stop="delPic(item)" v-if="mode === 'edit'">
          <i class="el-icon-delete" style="font-size: 14px; color: #ffffff"></i>
        </div>
      </div>
      <el-upload
        v-if="mode === 'edit' && (max === 0 || max > fileList.length)"
        :multiple="multiple"
        :accept="accept"
        class="avatar-uploader relative"
        action=""
        :show-file-list="true"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="handleChange"
        :file-list="value"
        :disabled="memberType == 0"
      >
        <div class="showPicBox" @click="openTestLoad">
          <i :style="style" class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </el-upload>
      <el-dialog
        style="z-index: 2006"
        title="上传封面"
        :visible.sync="testFlag"
        center
        :modal="testFlag"
        append-to-body
      >
        <div class="dialog-body">
          <el-image
            class="dialog-image"
            :style="img.url == item.url ? 'opacity:0.5' : 'opacity:1'"
            v-for="(item, index) in imgUrl"
            :key="item.uid"
            :src="item.url"
            @click="imageTap(index)"
          ></el-image>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click=";(testFlag = false), (img = '')">取 消</el-button>
          <el-button :disabled="img == ''" type="primary" @click="confirmTest"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <div class="el-upload__tip" v-if="tipsText !== ''">
        {{ tipsText }}
      </div>
    </div>
  </div>
</template>
<script>
import mixins from './mixins'
import { pending } from './status'
export default {
  name: 'CustomUploadPic',
  mixins: [mixins],
  computed: {
    style() {
      return { width: this.picSize, height: this.picSize }
    }
  },
  props: {
    tipsText: {
      type: String,
      default: ''
    },
    picSize: {
      type: String,
      default: '148px'
    },
    value: {
      type: Array
    },
    accept: {
      type: String,
      default: '.jpg,.png,.jpeg'
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
    multiple: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 0
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
    size: {
      type: Number,
      default: 0
    },
    // 最大尺寸
    maxSize: {
      type: Number,
      default: 0
    },
    minSize: {
      type: Number,
      default: 0
    },
    code: {
      type: String,
      default: ''
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    // 是否需要计算尺寸
    calcSize: {
      type: Boolean,
      default: false
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
      fileList: [],
      memberType: 4,
      imgUrl: [
        {
          name: 'eintoo',
          url: 'https://ar-p2.obs.cn-east-3.myhuaweicloud.com/11.png',
          uid: 1
        },
        {
          name: 'clothes',
          url: 'https://ar-p2.obs.cn-east-3.myhuaweicloud.com/22.png',
          uid: 2
        },
        {
          name: 'car',
          url: 'https://ar-p2.obs.cn-east-3.myhuaweicloud.com/33.png',
          uid: 3
        }
      ],
      testFlag: false,
      img: ''
    }
  },
  methods: {
    confirmTest() {
      this.testFlag = false
      this.$emit('imgUrl', this.img)
    },
    imageTap(id) {
      this.img = this.imgUrl[id]
      console.log(this.img)
    },
    openTestLoad() {
      if (this.memberType != 0) return
      this.testFlag = true
    },
    delPic(item) {
      this.deleteFileList(item)
      this.emit()
    },
    getPicSize(newFile) {
      return new Promise((resolve, reject) => {
        if (newFile) {
          let img = new Image()
          img.src = newFile.url
          img.onload = () => {
            const { width, height } = img
            let imgClass = width > height ? 'heng' : 'shu'
            newFile.imgClass = imgClass
            let size = {
              x: width,
              y: height
            }
            Object.assign(newFile, {
              width,
              height,
              size: size
            })
            setTimeout(() => {
              this.$emit('sizeChange', size)
            }, 300)
            resolve({
              width,
              height
            })
          }
        } else {
          reject()
        }
      })
    },
    async handleChange(file) {
      if (this.size > 0) {
        const isLt2M = file.raw.size / 1024 / 1024 < this.size
        if (!isLt2M) {
          return this.$message.error(`上传的图片大小不能超过 ${this.size}MB!`)
        }
      }
      console.log(file)
      let newFile = {
        ...file,
        code: file.uid,
        url: URL.createObjectURL(file.raw),
        imgClass: '',
        fileName: '',
        isAdd: true,
        size: {},
        center: {}
      }

      {
        let { width, height } = await this.getPicSize(newFile)
        if (
          this.maxSize !== 0 &&
          (width > this.maxSize || height > this.maxSize)
        ) {
          return this.$message.error(
            `上传的图片尺寸不能超过 ${this.maxSize}px!`,
            2000
          )
        }
        if (
          this.minSize !== 0 &&
          (width < this.minSize || height < this.minSize)
        ) {
          return this.$message.error(
            `上传的图片尺寸不能小于 ${this.minSize}px!`,
            2000
          )
        }
      }
      this.fileList.push(newFile)
      Object.assign(newFile, {
        percentage: 0,
        uploadStatus: pending
      })
      {
        // this.uploadFile(newFile)
        //   .then(() => {})
        //   .catch(() => {
        //     this.delPic(newFile);
        //     this.$message.error("文件上传失败");
        //   });
      }
      console.log(this.fileList, 'filelist')
      this.emit()
    },
    handleDownload(file) {
      console.log(file)
    }
  },
  mounted() {
    this.init()
    console.log(this.fileList)
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .avatar-uploader .el-upload {
    border-color: #829fff;
  }
}
.el-upload__tip {
  display: inline-flex;
  margin-left: 9px;
  font-size: 12px;
  color: #8c8d8d;
  max-width: 300px;
  vertical-align: top;
  margin-top: 0;
  line-height: 1.4;
  min-height: 32px;
  margin-bottom: 10px;
  height: 148px;
  align-items: flex-end;
}
.btnImg {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  -webkit-clip-path: polygon(0px 0px, 38px 0px, 38px 38px);
  clip-path: polygon(0px 0px, 38px 0px, 38px 38px);
  position: absolute;
  width: 38px;
  height: 38px;
  background: #829fff;
  right: 0;
  top: 0;
  padding-right: 5px;
  padding-top: 5px;
  box-sizing: border-box;
  z-index: 10;
  background: #00baff;
}
.avatar-uploader {
  display: inline-block;
  margin-bottom: 10px;
  margin-right: 10px;
}
.avatar-uploader-icon {
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #829fff;
}
.showPicBox {
  position: relative;
  overflow: hidden;
}
.picList {
  float: left;
}
.picItem {
  float: left;
  position: relative;
  // border: 1px solid #829fff;
  // border-radius: 6px;
  box-sizing: content-box;
  margin-right: 10px;
  margin-bottom: 10px;
  .el-image {
    width: 100%;
    height: 100%;
  }
  ::v-deep {
    .el-image.shu img {
      width: 100%;
      height: auto;
    }
    .el-image.heng img {
      height: 100%;
      width: auto;
      border: 1px solid #829fff;
      border-radius: 6px;
    }
  }
}
.dialog-body {
  display: flex;
  justify-content: center;
}
.dialog-image {
  width: 130px;
  height: 130px;
  box-sizing: content-box;
  padding: 20px;
}
</style>
