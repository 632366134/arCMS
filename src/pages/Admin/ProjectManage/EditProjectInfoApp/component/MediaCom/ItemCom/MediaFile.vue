<template>
  <div>
    <div class="tips" v-if="mediaType === ''">请先选择资源类型</div>
    <div v-else>
      <CustomUploadZip
        ref="uploadRef"
        :btnText="btnText"
        v-model="fileList"
        :uploadInfo="uploadInfo"
        @input="handleFileInput"
        :accept="accept"
        :mediaType="mediaType"
        :configInfo="configInfo"
        :max="1"
        :calcSize="false"
      />
    </div>
  </div>
</template>

<script>
/**
 * 媒体文件
 * 1.选择文件
 *  如果是压缩包 解压然后挨个上传
 * 2.上传文件 需要获取文件的路径 customerCode/projectCode/ios|android/xxx
 */
import { CustomUploadZip } from '@/components/CustomUpload'
import { MediaLimit } from '../../../config'
import { ZipClass } from '@/utils/zipUtil'
import { loading } from '@/utils/decorator'
export default {
  name: 'MediaFile',
  inject: {
    basePicData: {
      from: 'basePicData',
      default: {}
    },
    getSnowCode: {
      from: 'getSnowCode',
      default: {}
    },
    registeredCheckEvent: {
      from: 'registeredCheckEvent',
      default: {}
    },
    warning: {
      from: 'warning',
      default: {}
    },
    removeCheckEvent: {
      from: 'removeCheckEvent',
      default: {}
    },
    registeredResetEvent: {
      from: 'registeredResetEvent',
      default: {}
    },
    removeResetEvent: {
      from: 'removeResetEvent',
      default: {}
    },
    mediaDataList: {
      from: 'mediaDataList',
      default: {}
    }
  },
  components: {
    CustomUploadZip
  },
  props: {
    mediaCode: {
      type: String,
      requreid: true
    },
    mediaType: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    btnText() {
      return (
        this.configList.find((v) => v.mediaType === this.mediaType)?.text || ''
      )
    },
    tipsText() {
      return (
        this.configList.find((v) => v.mediaType === this.mediaType)?.tips || ''
      )
    },
    accept() {
      return (
        this.configList.find((v) => v.mediaType === this.mediaType)?.accept ||
        ''
      )
    },
    configInfo() {
      return this.configList.find((v) => v.mediaType === this.mediaType) || {}
    },
    baseData() {
      return this.basePicData()
    }
  },
  watch: {
    mediaType() {
      this.init()
    },
    baseData: {
      immediate: true,
      handler() {
        let basePicData = this.baseData
        this.uploadInfo = {
          folder: `${basePicData.customerCode}/${basePicData.projectCode}/${basePicData.appTypeName}/`,
          fileNum: ''
        }
      }
    }
  },
  data() {
    return {
      configList: [
        {
          mediaType: 3,
          text: '上传压缩包',
          tips: `仅支持${MediaLimit.mediaPicType}文件，尺寸不超过${MediaLimit.mediaPicPX}像素,文件大小不超过${MediaLimit.mediaPicSize}M`,
          accept: MediaLimit.mediaPicType
        },
        {
          mediaType: 4,
          text: '上传压缩包',
          tips: `请将视频和封面图压缩成zip。视频仅支持${MediaLimit.mediaVideoType}文件并且大小不超过${MediaLimit.mediaVideoSize}M,封面图尺寸不超过${MediaLimit.mediaVideoPicPX}`,
          accept: '.zip'
        },
        {
          mediaType: 5,
          text: '上传压缩包',
          tips: `请将模型、贴图等压缩成zip。模型仅支持${MediaLimit.mediaModelType}文件并且大小不超过${MediaLimit.mediaModelSize}M, 贴图尺寸不超过${MediaLimit.mediaModelPicPX}，大小不超过${MediaLimit.mediaModelPicSize}M`,
          accept: '.zip'
        },
        {
          mediaType: 6,
          text: '上传压缩包',
          tips: `请将模型、贴图等压缩成zip。模型仅支持${MediaLimit.mediaModelType}文件并且大小不超过${MediaLimit.mediaModelSize}M, 贴图尺寸不超过${MediaLimit.mediaModelPicPX}，大小不超过${MediaLimit.mediaModelPicSize}M`,
          accept: '.zip'
        },
        {
          mediaType: 12,
          text: '上传压缩包',
          tips: `请将模型、贴图等压缩成zip。模型仅支持${MediaLimit.mediaModelType}文件并且大小不超过${MediaLimit.mediaModelSize}M, 贴图尺寸不超过${MediaLimit.mediaModelPicPX}，大小不超过${MediaLimit.mediaModelPicSize}M`,
          accept: '.zip'
        }
      ],
      fileList: [],
      uploadInfo: {},
      realFileList: [] // 真实文件 zip解压后的文件
    }
  },
  methods: {
    // 获取资源type
    getMediType(fileName = this.mediaDataList()?.mediaObsName) {
      console.log(fileName, 'fileNamefileNamefileName')
      let fileTypeList = fileName.split('_')
      let type = fileTypeList.pop(),
        mtlType = fileTypeList.pop()
      let result = '',
        isBenti = false
      let { mediaTypeConfig, mediaTypeMaterialList, appMediaOtherFiles } =
        this.$store.state.base
      let baseItem = mediaTypeConfig.find((v) => v.value === this.mediaType)
      // 如果是其他文件 赋值为其他文件
      let otherItem = appMediaOtherFiles.find((v) => v.reg.test(type))
      if (otherItem) {
        baseItem = otherItem
      }
      console.warn(type)
      if (baseItem) {
        if (mtlType === 'mtl' && type === 'txt') {
          // mtl打包出来是 xxx_mtl_txt
          result = 9
        } else if (mtlType === 'om' && type === 'txt') {
          // unity打包出来的xxx_om_txt
          result = 11
        } else if (baseItem.reg.test(type)) {
          // 主体文件
          result = baseItem.value
          isBenti = true
        } else {
          // 不是主体文件 先判断是不是视频的封面图 在判断贴图
          let value =
            mediaTypeMaterialList.find(
              (v) => v.reg.test(type) && v.mediaType === this.mediaType
            ) || mediaTypeMaterialList.find((v) => v.reg.test(type))
          if (value) {
            result = value.value
          } else {
            console.log('未知类型')
          }
        }
      } else {
        // 未知文件
      }
      return { result, isBenti }
    },
    getMedaiData() {
      console.log(this.realFileList)
      return {
        codeLength: this.realFileList.length,
        data: () => {
          return this.realFileList.map((item) => {
            return {
              isInteraction: this.mediaType === 6,
              mediaObsName: item.fileOssName,
              mediaObsPath: this.uploadInfo.folder,
              mediaType: this.getMediType(item.fileOssName).result,
              isBenti: item.isBenti
            }
          })
        }
      }
    },
    getData() {
      const { codeLength: mediaCodeLength, data: medaiDataFun } =
        this.getMedaiData()
      return {
        codeLength: mediaCodeLength,
        medaiDataFun
      }
    },
    check() {
      let fileList = this.realFileList
      if (fileList.length === 0) {
        this.warning('请上传文件')
        return Promise.reject()
      }
      let chinese = this.$store.state.reg.chinese
      let chineseItem = fileList.find((v) => chinese.test(v.raw?.name))
      if (chineseItem) {
        this.warning('文件名称不能包含中文汉字，标点符号')
        return Promise.reject()
      }
      if (
        fileList.some(
          (v) => v.file?.name === this.$store.state.base.Assetbundle
        )
      ) {
        this.warning('请勿重复上传配置文件')
        return Promise.reject()
      }
      let result = Promise.resolve({ code: 1000 })
      return result.then((res) => {
        return res
      })
    },
    emit(data) {
      this.$emit('input', data)
    },
    handleUpload() {
      return this.check().then((res) => {
        console.log(res)
        if (res.code === 1000) {
          return this.$refs.uploadRef
            .uploadFileAll('媒体资源', '', this.realFileList)
            .then((res) => {
              console.log(res)
            })
        }
      })
    },
    @loading()
    handleFile(file) {
      return new ZipClass().load(file.raw).then((res) => {
        // 是否有未知文件
        let hasOther = false
        res.fileList.forEach((item) => {
          let { isBenti, result } = this.getMediType(item.file.name)
          item.isBenti = isBenti
          hasOther = result === '' ? true : hasOther
          item.isAdd = true
        })
        if (hasOther) {
          this.fileList = []
          this.warning('zip/rar中存在未知文件，请确认。')
          return
        }
        this.realFileList = res.fileList
        return this.handleUpload()
      })
    },
    handleFileInput() {
      let file = this.fileList[0]
      if (file) {
        this.handleFile(file)
      } else {
        this.realFileList = []
        this.emit([])
      }
    },
    init() {},
    reset() {
      console.log(
        this.mediaDataList()?.mediaObsName,
        'this.mediaDataList().mediaObsName'
      )
      if (this.mediaDataList()?.mediaObsName) {
        console.log('object')
        this.fileList = this.realFileList = [
          {
            name: this.mediaDataList()?.mediaObsName,
            url: this.mediaDataList()?.mediaObsPath
          }
        ]
      } else {
        this.fileList = []
        this.realFileList = []
      }
    }
  },
  created() {
    let name = this.mediaDataList()?.mediaObsName
    let url = this.mediaDataList()?.mediaObsPath
    if (name) {
      this.fileList = this.realFileList = [
        {
          name,
          url
        }
      ]
    } else {
      this.fileList = this.realFileList = []
    }

    console.log(this.fileList, 'fileList')
    this.checkIndex = 'checkMediaFile' + this.$getCode()
    this.registeredCheckEvent(this.checkIndex, this.check)
    // this.resetIndex = 'resetMediaFile' + this.$getCode()
    // this.registeredResetEvent(this.resetIndex, this.reset)
  },
  beforeDestroy() {
    console.log('remove---', this.checkIndex)
    this.removeCheckEvent(this.checkIndex)
    // this.removeResetEvent(this.checkIndex)
  }
}
</script>

<style lang="scss" scoped>
.tips {
  color: #8c8d8d;
}
</style>
