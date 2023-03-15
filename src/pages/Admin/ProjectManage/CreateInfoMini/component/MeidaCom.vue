<template>
  <!-- 新小程序 -->
  <div class="mediaCom">
    <div class="mediaContainer">
      <el-form label-width="150px">
        <!-- <el-form-item label="请选择平台:">
          <el-radio-group v-model="appType" @change="handleTypeChange">
            <el-radio :label="1">IOS</el-radio>
            <el-radio :label="2">ANDROID</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="请选择识别文件:" v-if="appType !== ''"> -->

        <el-form-item label="请选择识别图片:" @change="handleTypeChange">
          <!-- <el-tooltip
            class="item"
            effect="dark"
            content="压缩文件名称仅支持数字，英文命名"
            placement="top-start"
          > -->
          <UploadPic
            ref="baseFileRef"
            :max="1"
            :uploadInfo="uploadInfo"
            v-model="baseFileList"
          />
          <!-- <CustomUploadFile
              ref="baseFileRef"
              :maxNum="1"
              v-model="baseFileList"
              :uploadInfo="uploadInfo"
            /> -->
          <!-- </el-tooltip> -->
        </el-form-item>

        <!-- <el-form-item label="请选择配置文件:" v-if="appType !== ''"> -->

        <!-- <el-form-item label="APP专用配置:"> -->
        <!-- <el-tooltip
            class="item"
            effect="dark"
            content="压缩文件命名仅支持数字，英文命名"
            placement="top-start"
          > -->
        <!-- <CustomUploadFile
              ref="configRef"
              :maxNum="1"
              v-model="configFileList"
              :uploadInfo="uploadInfo"
              @input="handleConfigChange"
            /> -->

        <!-- </el-tooltip> -->
        <!-- </el-form-item> -->

        <!-- <el-form-item label="资源信息:" v-if="appType !== ''"> -->
        <el-form-item label="资源信息:">
          <ClassList :classCode="classCode" v-if="load" />
        </el-form-item>
        <!-- <el-form-item label="" v-if="appType !== ''"> -->
        <el-form-item label="">
          <div class="btnBox">
            <el-button @click="submit" type="primary"> 确认 </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="preView">
      <!-- <div class="previewTitle">预览效果
      </div>
      <div class="preViewPic">
      </div> -->
    </div>
  </div>
</template>

<script>
import { adminPublicApi as publicApi, searchAPI } from '@/API'
/**
 * 上传媒体资源
 */
import ClassList from './MediaCom/ClassList.vue'
import { loading } from '@/utils/decorator'
import UploadPic from '@/components/CustomUpload/uploadPic.vue'
import { CustomUploadFile } from '@/components/CustomUpload'
export default {
  name: 'MediaCom',
  props: {},
  inject: ['mediaData'],
  computed: {
    // appTypeName() {
    //   return this.appType === 1  ? 'ios' : 'android'
    // },
    mediaData() {
      return this.mediaData
    }
  },
  provide() {
    return {
      basePicData: this.getBasePicData,
      getSnowCode: this.getSnowCode,
      registeredCheckEvent: this.registeredCheckEvent,
      removeCheckEvent: this.removeCheckEvent,
      registeredGetDataEvent: this.registeredGetDataEvent,
      removeGetDataEvent: this.removeGetDataEvent,
      warning: this.warning,
      removeResetEvent: this.removeResetEvent,
      registeredResetEvent: this.registeredResetEvent,
      getData: this.getData
    }
  },
  components: {
    ClassList,
    CustomUploadFile,
    UploadPic
  },
  data() {
    return {
      basePicData: {},
      snowCode: [],
      checkEventInfo: [], // 存储所有check事件
      getDataEventInfo: [], // 存储所有getData事件
      // 是否提交过防止重复提交
      classSubmit: false,
      mediaSubmit: false,
      resourSubmit: false,
      baseFileList: [],
      configFileList: [],
      uploadInfo: {},
      load: false,
      appType: '',
      resetEventInfo: [],
      needLoad: false,
      hasInfo: [],
      classCode: '',
      prev: false
    }
  },
  methods: {
    // 查询册子信息
    @loading()
    fetchProjectInfo() {
      console.log('查询册子信息')
      return searchAPI
        .selMediaApps({
          projectCode: this.basePicData.projectCode
        })
        .then((res) => {
          if (res.code === 1000) {
            this.hasInfo = res.data.mediaList || []
          }
        })
    },
    // 判断是否显示上传配置文件 如果已经传过 不用再次上传
    checkLoadConfig() {
      let hasItem = this.hasInfo.find(
        // (v) => v.mediaType === 2 && v.appType == this.appType
        (v) => v.mediaType === 2
      )
      if (hasItem) {
        this.needLoad = false
        this.classCode = hasItem?.classCode || ''
      } else {
        this.classCode = ''
        this.needLoad = true
      }
    },

    // 判断是否是Assetbundle格式的文件
    handleConfigChange(e) {
      let Assetbundle = this.$store.state.base.Assetbundle
      if (e[0] && e[0].name !== Assetbundle) {
        this.configFileList = []
        this.$message.warning(`文件名称错误，请确认是${Assetbundle}`)
      }
    },
    // 判断ios/android 类型
    async handleTypeChange() {
      this.uploadInfo = {
        // 这个的appTypeName一点要有
        folder: `${this.basePicData.userCode}/${this.basePicData.projectCode}/${this.appTypeName}/`,
        // folder: `${this.basePicData.userCode}/${this.basePicData.projectCode}/`,
        fileNum: ''
      }
      this.reset()
      // 保证只写入一条配置文件 判断是否有配置文件 如果没有重新查询
      {
        // if (this.appType !== '' && !this.needLoad) {
        //   await this.fetchProjectInfo()
        //   this.checkLoadConfig()
        // }

        if (!this.needLoad) {
          await this.fetchProjectInfo()
          this.checkLoadConfig()
        }
      }
    },
    reset() {
      this.needLoad = false
      this.baseFileList = []
      this.configFileList = []
      for (let i = 0; i < this.resetEventInfo.length; i++) {
        this.resetEventInfo[i].fun()
      }
    },
    getBasePicData() {
      return {
        ...this.basePicData
        // appTypeName: this.appTypeName,
        // appType: this.appType
      }
    },
    warning(msg) {
      this.$message.warning(msg, 3000)
    },
    // 注册获取数据函数
    registeredGetDataEvent(key, fun) {
      this.getDataEventInfo.push({
        key,
        fun
      })
      return this.getDataEventInfo.length - 1
    },
    // 注册重置函数
    registeredResetEvent(key, fun) {
      this.resetEventInfo.push({
        key,
        fun
      })
      return this.resetEventInfo.length - 1
    },
    // 删除重置函数
    removeResetEvent(key) {
      this.resetEventInfo.splice(
        this.checkEventInfo.findIndex((v) => v.key === key),
        1
      )
    },
    // 删除获取数据函数
    removeGetDataEvent(key) {
      this.getDataEventInfo.splice(
        this.checkEventInfo.findIndex((v) => v.key === key),
        1
      )
    },
    // 注册校验函数
    registeredCheckEvent(key, fun) {
      this.checkEventInfo.push({
        key,
        fun
      })
      return this.checkEventInfo.length - 1
    },
    // 删除校验函数
    removeCheckEvent(key) {
      this.checkEventInfo.splice(
        this.checkEventInfo.findIndex((v) => v.key === key),
        1
      )
    },
    // 检查是否都选择
    async check() {
      // if (this.appType === '') {
      //   this.$message.warning('请选择平台')
      //   return Promise.reject()
      // }
      if (this.baseFileList.length === 0) {
        this.$message.warning('请选择识别文件')
        return Promise.reject()
      }
      if (this.needLoad && this.configFileList.length === 0) {
        this.$message.warning('请选择配置文件')
        return Promise.reject()
      }
      let result = true
      for (let i = 0; i < this.checkEventInfo.length; i++) {
        try {
          await this.checkEventInfo[i].fun()
        } catch (error) {
          console.log(error)
          result = false
          break
        }
      }
      console.log(result, 'result----')
      if (!result) {
        return Promise.reject()
      }
      return Promise.resolve()
    },
    uploadBaseFile() {
      return this.$refs.baseFileRef.uploadFileAll('识别文件').then((res) => {
        console.log(res, '识别图片')
      })
    },
    uploadConfigFile() {
      if (this.configFileList.length === 0) {
        return Promise.resolve()
      }
      return this.$refs.configRef.uploadFileAll('配置文件').then((res) => {
        console.log(res)
      })
    },
    getBaseData() {
      return {
        projectCode: this.basePicData.projectCode
      }
    },
    async getBaseFileData(classData) {
      let baseData = this.getBaseData()
      console.log(baseData, 'baseData--------')
      console.log(
        this.baseFileList,
        'this.baseFileListthis.baseFileListthis.baseFileList'
      )
      return {
        ...baseData,
        // appType: this.appType,
        classCode: classData.classCode,
        mediaCode: this.basePicData.basePicCode,
        mediaType: 1,
        isInteraction: false,
        // mediaObsName: this.baseFileList[0].raw.name,
        mediaObsName: this.baseFileList[0].fileOssName,
        // mediaCoverObsName: this.baseFileList[0].fileOssName,
        mediaObsPath: this.uploadInfo.folder,
        parentCode: '0'
      }
    },
    async getConfigFileData(classData) {
      let baseData = this.getBaseData()
      let { code, data } = await this.getSnowCode()
      if (code !== 1000) {
        return Promise.reject()
      }
      return {
        ...baseData,
        // appType: this.appType,
        classCode: classData.classCode,
        mediaCode: data,
        mediaType: 2,
        isInteraction: false,
        mediaObsName: this.configFileList[0].raw.name,

        //服务器地址
        // bookCoverObsName: this.configFileList[0].fileOssName,
        mediaObsPath: this.uploadInfo.folder,
        parentCode: '0'
      }
    },
    async getData() {
      try {
        // 1个配置文件
        let allCodeLength = 1,
          eventList = []
        await this.uploadBaseFile()
        // 每次都执行上传配置文件 如果数据库已有配置文件并且选择了配置文件 就重新上传 覆盖源文件 但是不写入数据
        await this.uploadConfigFile()
        // console.log('getData -------------------')
        for (let i = 0; i < this.getDataEventInfo.length; i++) {
          let data = await this.getDataEventInfo[i].fun()
          console.log(data)
          allCodeLength += data.codeLength
          eventList.push(data.fun)
        }
        if (allCodeLength > 0) {
          await this.getMoreSnowCode(allCodeLength)
          console.log('getMoreSnowCode------ceshi----------')
        }
        let result = {}
        for (let i = 0; i < eventList.length; i++) {
          let data = await eventList[i]()
          console.log(data)
          Object.assign(result, data)
        }

        let baseFileData = await this.getBaseFileData(result.insertClassify[0])
        console.log('baseFileData ==================', this.baseFileData)
        if (this.needLoad) {
          let configFileData = await this.getConfigFileData(
            result.insertClassify[0]
          )
          result.configFileData = configFileData
        }
        result.baseFileData = baseFileData
        console.log(result, 'result --------- 测试合并到主体')
        let list = [],
          paramList = []
        list.push(result.baseFileData)
        if (this.needLoad) {
          list.push(result.configFileData)
        }
        result.insertMediaList.forEach((item) => {
          list.push(...item)
        })
        result.insertModelParamList.forEach((item) => {
          paramList.push(...item)
        })
        return { mediaList: list, paramList }
      } catch (error) {
        console.log(error)
        return Promise.reject()
      }
    },

    // 创建
    createMediaApps(data) {
      return searchAPI.createMediaApps(data)
    },
    // 创建
    createMediaModelParamApps(data) {
      return searchAPI.createMediaModelParamApps(data)
    },
    //
    // uploadResourceAMB({

    //     }){

    //     },
    submitAction(data) {
      console.log(data)
      return Promise.all([
        this.createMediaApps(data.mediaList),
        this.createMediaModelParamApps(data.paramList)
      ]).then((resList) => {
        console.log('提交模型data', data)
        let noItem = resList.find((v) => v.code !== 1000)
        if (noItem) {
          this.$message.error('提交失败')
        } else {
          this.$message.success('操作成功')
          searchAPI
            .insertBasePic({
              // userCode:this.sessionStorage.userCode,
              projectCode: data.mediaList[1].projectCode, // 项目code
              picCode: data.mediaList[1].mediaCode,
              // 服务器中识别图的名称
              picObsName: data.mediaList[0].mediaObsName,
              // bookCoverObsName: mediaList[0].fileOssName,
              // 识别图地址
              picObsPath: data.mediaList[0].mediaObsPath,
              // 资源压缩包名称
              fsetName: data.mediaList[1].mediaObsName,
              // 资源压缩包地址
              fsetObsPath: data.mediaList[1].mediaObsPath
            })
            .then((res) => {
              if (res.code === 1000) {
                this.$message.success('数据库添加成功')
              }
            })
          this.handleSubmitSuccess()
        }
      })
    },
    handleSubmitSuccess() {
      // this.appType = ''

      // this.handleTypeChange()
      // this.toPage(
      //   `/ProjectManage/ProjectPic/${this.$encode(this.projectCode)}/${this.$encode(this.projectName)}`
      // )
      // this.fetchList()

      // this.$router.go(-1)
      // window.history.back()
      // 成功后刷新当前页面
      location.reload()
    },
    @loading()
    submit() {
      // if(this.classCode == []){
      //   console.log("新建")
      return this.check().then(() => {
        return this.getData().then((data) => {
          return this.submitAction(data)
        })
      })
      // }else {
      //   console.log("bianji")
      // }

      // 返回上一页重新获取信息表
      // this.toPage(
      //   `/ProjectManage/ProjectPic/${this.$encode(this.projectCode)}/${this.$encode(this.projectName)}`
      // )
      // 编辑
    },
    // 获取不足的雪花编号
    getMoreSnowCode(num) {
      if (num - this.snowCode.length <= 0) {
        return Promise.resolve({ code: 1000 })
      }
      return publicApi
        .getSnowList({ num: num - this.snowCode.length })
        .then((res) => {
          if (res.code === 1000) {
            this.snowCode.push(...res.data)
            return {
              code: 1000
            }
          } else {
            this.$message.error('获取编号失败，请重试。')
          }
        })
    },
    getSnowCode() {
      if (this.snowCode.length > 0) {
        return Promise.resolve({
          code: 1000,
          data: this.snowCode.shift()
        })
      } else {
        return publicApi.getSnowList({ num: 10 }).then((res) => {
          if (res.code === 1000) {
            this.snowCode = res.data
            return {
              code: 1000,
              data: this.snowCode.shift()
            }
          } else {
            this.$message.error('获取编号失败，请重试。')
          }
        })
      }
    },
    async init() {
      const { code, data } = await this.getSnowCode()
      this.projectCode = this.$decode(this.$route.params.projectCode)
      // this.projectName = this.$decode(this.$route.params.projectName)
      if (code === 1000) {
        this.basePicData = {
          projectCode: this.projectCode,
          userCode: sessionStorage.userCode,
          basePicCode: data
        }
      }
    }
  },
  beforeDestroy() {
    this.$store.commit('SET_UPLOADINDEX', null)
    this.$store.commit('SET_PARAMINDEX', null)
    this.$store.commit('Clear_modelParamList')
    this.$store.commit('Clear_successUploadList')
  },
  async created() {
    // console.log(this.mediaData, 'this.mediaData')
    await this.init()
    console.log('this.basePicData')
    let basePicData = this.basePicData
    this.uploadInfo = {
      // 图片位置
      folder: `undefined/${basePicData.projectCode}/undefined/`,
      fileNum: ''
    }
    this.$nextTick(() => {
      this.load = true
    })
  },
  // 获取对应的基准图列表
  activated() {
    this.fetchList()
  }
}
</script>

<style lang="scss" scoped>
.mediaCom {
  margin-left: 40px;
  .el-form-item__label {
    font-size: 18px;
  }
  .mediaContainer {
    // display: flex;
    width: 1200px;
    padding-left: 40px;
    font-size: 18px;
    box-sizing: border-box;
    // .el-form-item__label{
    //   font-size: 18px;
    // }
    .btnBox {
      padding-left: 131px;
      box-sizing: border-box;
      padding-bottom: 108px;
      .el-button {
        width: 360px;
        height: 50px;
      }
    }
  }
  // .preView {
  //   z-index: 2;
  //   position: fixed;;
  //   width: 600px;
  //   // height: 970px;
  //   // float: right;;
  //   right: 40px;
  //   top:100px;
  //   // background-color:beige;
  //   .previewTitle{
  //     top:0px;
  //     height: 30px;
  //     background-color: #fff;
  //     // margin-bottom: 10px;
  //   }
  //   .preViewPic{
  //     // top: 110px;
  //     width: 600px;
  //     height: 990px;
  //     background-color: #fafafa;
  //     // margin-bottom: 110px;

  //   }
  // }
}
</style>
