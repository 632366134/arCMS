<template>
  <div>
    <base-dia
      :title="AddComTitle"
      @close="$emit('close')"
      @confirm="handleConfirm"
      width="800px"
      :closeByModal="false"
      :closeByPress="false"
    >
      <el-form label-width="100px">
        <el-form-item label="项目名称:" required>
          <el-input v-trim v-model="projectName"></el-input>
        </el-form-item>
        <el-form-item label="项目简介:">
          <el-input v-trim v-model="projectIntroduce"></el-input>
        </el-form-item>
        <el-form-item label="项目封面:" required>
          <UploadPic
            ref="uploadRef"
            :max="1"
            :uploadInfo="uploadInfo"
            v-model="fileList"
          />
        </el-form-item>
      </el-form>
    </base-dia>
  </div>
</template>

<script>
import baseDia from '@/components/dialogBase.vue'
import UploadPic from '@/components/CustomUpload/uploadPic.vue'
import { loading } from '@/utils/decorator'
import { addAPI, searchAPI, adminPublicApi as piblicApi } from '@/API'
export default {
  name: 'AddCom',
  components: {
    baseDia,
    UploadPic
  },
  props: {
    AddComTitle: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      fileList: [],
      projectName: '',
      projectIntroduce: '',

      uploadInfo: {},
      userCode: sessionStorage.userCode
      // memberType:sessionStorage.memberType
    }
  },
  methods: {
    check() {
      if (this.projectName === '') {
        this.$message.warning('请输入项目名称')
        return false
      }
      if (this.fileList.length === 0) {
        this.$message.warning('请选择封面图')
        return false
      }
      return true
    },
    handleConfirm() {
      console.log('上传', this)
      if (this.check()) {
        // 直接进入
        // this.submitAction()

        if (Object.keys(this.value).length > 0) {
          console.log('编辑提交', this.value)
          this.title = '编辑'
          this.editAction()
        } else {
          this.submitAction()
          // this.$emit('radio',radio)
          // console.log(this.radio,"查看单选框")
          // if(this.radio == 3){
          //   console.log("aaa")
          // }else if(this.radio == 6){
          //   console.log('bbb')
          // }else{
          //   return ;
          // }
        }
      }
    },
    editAction() {
      return piblicApi.getSnowList({ num: 1 }).then((res) => {
        if (res.code === 1000) {
          // console.log("getList",res.data)
          this.fileList[0].code = res.data[0]
          return new Promise((resolve) => {
            this.$nextTick(() => {
              resolve()
              // console.log("上传成功")
            })
          }).then(() => {
            return this.$refs.uploadRef.uploadFileAll().then((res) => {
              // console.log("进入成功",res)
              if (res.code === 1000 && res.errorList.length === 0) {
                // console.log("shangchuan err",res.successList)
                console.log('thisvalue', this.fileList)
                return searchAPI
                  .updateProject({
                    // userCode:this.userCode,
                    projectCode: this.projectCode,
                    projectName: this.projectName, // 未进行判断
                    projectIntroduce: this.projectIntroduce,
                    bookCoverName: this.fileList[0].name,
                    // bookCoverObsName: this.fileList[0].fileOssName,
                    bookCoverObsName:
                      this.fileList[0].fileOssName || this.uploadInfo.fileName,
                    bookCoverObsPath: this.uploadInfo.folder
                  })
                  .then((res) => {
                    console.log(res, 'update成功')
                    if (res.code === 1000) {
                      this.$message.success('操作成功')
                      this.$emit('confirm')
                    }
                  })
              } else {
                this.$message.error('文件上传失败')
              }
            })
          })
        } else {
          this.$message.error('获取编号失败，请重试。')
        }
      })
    },
    @loading()
    submitAction() {
      return piblicApi.getSnowList({ num: 1 }).then((res) => {
        if (res.code === 1000) {
          // console.log("getList",res.data)
          this.fileList[0].code = res.data[0]
          return new Promise((resolve) => {
            this.$nextTick(() => {
              resolve()
              // console.log("上传成功")
            })
          }).then(() => {
            return this.$refs.uploadRef.uploadFileAll().then((res) => {
              // console.log("进入成功",res)
              if (res.code === 1000 && res.errorList.length === 0) {
                // console.log("shangchuan err",res.successList)
                return addAPI
                  .TableAdd({
                    userCode: this.userCode,
                    obsName: this.fileList[0].fileOssName,
                    obsPath: this.uploadInfo.folder
                    // projectName: this.projectName,
                    // projectIntroduce: this.projectIntroduce,
                    // bookCoverName: this.fileList[0].name,
                    // bookCoverObsName: this.fileList[0].fileOssName,
                    // bookCoverObsPath: this.uploadInfo.folder,
                  })
                  .then((res) => {
                    console.log(res, 'TableAdd成功')
                    if (res.code === 1000) {
                      this.$message.success('操作成功')
                      this.$emit('confirm')
                      this.$emit('radio')
                    }
                  })
              } else {
                this.$message.error('文件上传失败')
              }
            })
          })
        } else {
          this.$message.error('获取编号失败，请重试。')
        }
      })
    }
  },
  created() {
    console.log(this.value, 'thisvalue')
    this.projectCode = this.value.projectCode
    this.projectName = this.value.projectName
    this.projectIntroduce = this.value.projectIntroduce
    // this.memberType = this.value.memberType
    if (Object.keys(this.value).length > 0) {
      console.log('cha111')
      this.fileList = [
        { name: this.value.bookCoverName, url: this.value.bookerCover }
      ]
    }
    this.uploadInfo = {
      folder: sessionStorage.userCode + '/',
      fileName: this.value.bookCoverObsName,
      fileNum: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
