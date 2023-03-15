<template>
  <!-- <div class="mediaCom">
    <div class="mediaContainer">
      <el-form label-width="120px">
        <el-form-item label="请选择平台:">
          <el-radio-group
            v-model="appType"
            @change="handleTypeChange"
            :disabled="!!appType"
          >
            <el-radio :label="'1'">IOS</el-radio>
            <el-radio :label="'2'">ANDROID</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="请选择识别文件:" v-if="appType !== ''">
          <CustomUploadFile
            ref="baseFileRef"
            :maxNum="1"
            v-model="baseFileList"
            :uploadInfo="uploadInfo"
            :disabled="!!appType"
          />
        </el-form-item>
        <el-form-item label="请选择配置文件:" v-if="appType !== ''">
          <CustomUploadFile
            ref="configRef"
            :maxNum="1"
            v-model="configFileList"
            :uploadInfo="uploadInfo"
            @input="handleConfigChange"
            :disabled="!!appType"
          />
        </el-form-item>
        <el-form-item label="资源信息:" v-if="appType !== ''">
          <ClassList :classCode="classCode" v-if="load" />
        </el-form-item>
        <el-form-item label="" v-if="appType !== ''">
          <div class="btnBox">
            <el-button @click="submit" type="primary"> 确认 </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div> -->
</template>

<script>
import { adminPublicApi as publicApi, searchAPI } from '@/API'
/**
 * 上传媒体资源
 */
import ClassList from './MediaCom/ClassList.vue'
import { loading } from '@/utils/decorator'
import { CustomUploadFile } from '@/components/CustomUpload'
export default {
  name: 'MediaCom',
  props: {},
  inject: ['mediaDataList', 'paramInfoList'],
  computed: {
    appTypeName() {
      return this.appType === 1 ? 'ios' : 'android'
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
      registeredResetEvent: this.registeredResetEvent
    }
  },
  components: {
    ClassList,
    CustomUploadFile
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
      ...this.mediaDataList()
      // ...mediaData
    }
  },
  methods: {
    // 查询册子信息
    @loading()
    fetchProjectInfo() {
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
        (v) => v.mediaType === 2 && v.appType == this.appType
      )
      if (hasItem) {
        this.needLoad = false
        this.classCode = hasItem?.classCode || ''
      } else {
        this.classCode = ''
        this.needLoad = true
      }
    },
    handleConfigChange(e) {
      let Assetbundle = this.$store.state.base.Assetbundle
      if (e[0] && e[0].name !== Assetbundle) {
        this.configFileList = []
        this.$message.warning(`文件名称错误，请确认是${Assetbundle}`)
      }
    },
    async handleTypeChange() {
      this.uploadInfo = {
        folder: `${this.basePicData.customerCode}/${this.basePicData.projectCode}/${this.appTypeName}/`,
        fileNum: ''
      }
      this.reset()
      // 保证只写入一条配置文件 判断是否有配置文件 如果没有重新查询
      {
        if (this.appType !== '' && !this.needLoad) {
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
        ...this.basePicData,
        appTypeName: this.appTypeName,
        appType: this.appType
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
    async check() {
      if (this.appType === '') {
        this.$message.warning('请选择平台')
        return Promise.reject()
      }
      // if (this.baseFileList.length === 0) {
      //   this.$message.warning('请选择识别文件')
      //   return Promise.reject()
      // }
      // if (this.needLoad && this.configFileList.length === 0) {
      //   this.$message.warning('请选择配置文件')
      //   return Promise.reject()
      // }
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
        console.log(res)
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
      return {
        ...baseData,
        appType: this.appType,
        classCode: classData.classCode,
        mediaCode: this.basePicData.basePicCode,
        mediaType: 1,
        isInteraction: false,
        mediaObsName: this.baseFileList[0].raw.name,
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
        appType: this.appType,
        classCode: classData.classCode,
        mediaCode: data,
        mediaType: 2,
        isInteraction: false,
        mediaObsName: this.configFileList[0].raw.name,
        mediaObsPath: this.uploadInfo.folder,
        parentCode: '0'
      }
    },
    async getData() {
      try {
        // 1个配置文件
        let allCodeLength = 1,
          eventList = []
        // await this.uploadBaseFile()
        // // 每次都执行上传配置文件 如果数据库已有配置文件并且选择了配置文件 就重新上传 覆盖源文件 但是不写入数据
        // await this.uploadConfigFile()
        for (let i = 0; i < this.getDataEventInfo.length; i++) {
          let data = await this.getDataEventInfo[i].fun()
          console.log(data)
          allCodeLength += data.codeLength
          eventList.push(data.fun)
        }
        if (allCodeLength > 0) {
          await this.getMoreSnowCode(allCodeLength)
        }
        let result = {}
        for (let i = 0; i < eventList.length; i++) {
          let data = await eventList[i]()
          console.log(data)
          Object.assign(result, data)
        }
        // let baseFileData = await this.getBaseFileData(result.insertClassify[0])
        // if (this.needLoad) {
        //   let configFileData = await this.getConfigFileData(
        //     result.insertClassify[0]
        //   )
        //   result.configFileData = configFileData
        // }
        // result.baseFileData = baseFileData
        // console.log(result)
        // let list = [],
        //   paramList = []
        // list.push(result.baseFileData)
        // if (this.needLoad) {
        //   list.push(result.configFileData)
        // }
        let list = []
        let paramList = []
        result.insertMediaList.forEach((item) => {
          if (
            item[0].mediaObsName != '' &&
            typeof item[0].mediaObsName != 'undefined'
          ) {
            console.log('1')
            list.push(...item)
            // 因为未知问题insertMediaList的，mediaType不准确，强制换成provide保存的mediaType
            // list[0].mediaType = this.mediaDataList().mediaType
            // list[0].parentCode = this.mediaDataList().parentCode
            // list[0].classCode = this.mediaDataList().classCode
          } else {
            console.log(list[0], ' list[0] list[0] list[0]')
            list[0] = Object.assign({}, list[0], this.mediaDataList())
          }
          // if (item.length > 0) {
          // } else {
          //   list.push(...item)
          // }
        })
        result.insertModelParamList.forEach((item) => {
          paramList.push(...item)
        })
        const { data } = await this.getSnowCode()
        // list[0].mediaCode = this.mediaDataList().mediaCode

        console.log(list, paramList, 'list')

        return { mediaList: list, paramList }
      } catch (error) {
        console.log(error)
        return Promise.reject()
      }
    },
    createMediaApps(data) {
      return searchAPI.createMediaApps(data)
    },
    createMediaModelParamApps(data) {
      return searchAPI.createMediaModelParamApps(data)
    },
    submitAction(data) {
      console.log(data, 'datadatadatadata')
      // return Promise.all([
      //   this.createMediaApps(data.mediaList),
      //   this.createMediaModelParamApps(data.paramList)
      // ]).then((resList) => {
      //   let noItem = resList.find((v) => v.code !== 1000)
      //   if (noItem) {
      //     this.$message.error('提交失败')
      //   } else {
      //     this.$message.success('操作成功')
      //     this.handleSubmitSuccess()
      //   }
      // })
    },
    handleSubmitSuccess() {
      this.appType = ''
      this.init()
      this.handleTypeChange()
    },
    @loading()
    submit() {
      return this.check().then(() => {
        return this.getData().then((data) => {
          return this.submitAction(data)
        })
      })
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
      if (code === 1000) {
        this.basePicData = {
          projectCode: this.projectCode,
          customerCode: sessionStorage.customerCode,
          basePicCode: data
        }
      }
    }
  },
  async created() {
    // this.appType = this.mediaData().appType
    console.log(this.mediaDataList(), this.appType, 'injectthis.mediaData')
    await this.init()
    let basePicData = this.basePicData
    this.uploadInfo = {
      folder: `${basePicData.customerCode}/${basePicData.projectCode}/`,
      fileNum: ''
    }
    this.$nextTick(() => {
      this.load = true
    })
  }
}
</script>

<style lang="scss" scoped>
.mediaCom {
  .mediaContainer {
    padding-left: 40px;
    box-sizing: border-box;
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
}
</style>
