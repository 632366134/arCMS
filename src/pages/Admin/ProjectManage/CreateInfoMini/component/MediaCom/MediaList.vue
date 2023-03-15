<template>
  <div class="mediaList">
    <div>
      <el-button @click="handleAdd" v-d type="primary" v-if="memberType != 0">
        新增资源
      </el-button>
      <!-- <el-button type="info">保存并退出</el-button> -->
    </div>
    <div class="ma20">
      <MediaItem
        ref="mediaRef"
        @triggerPhone="triggerPhone"
        :openCode.sync="openCode"
        :index="index"
        :data="item"
        v-for="(item, index) in mediaList"
        :key="item.mediaCode"
        @delete="handleItemDelete"
        :allLength="mediaList.length"
        @getParam="getParam"
      />
    </div>
  </div>
</template>

<script>
import { MediaLimit } from '../../config'
/**
 * 媒体列表
 */
import MediaItem from './MediaItem.vue'
export default {
  name: 'MediaList',
  inject: [
    'basePicData',
    'getSnowCode',
    'registeredGetDataEvent',
    'removeGetDataEvent',
    'registeredResetEvent',
    'removeResetEvent'
  ],
  watch: {
    openCode() {
      this.reTrigger()
    }
  },
  components: {
    MediaItem
  },
  props: {
    classData: {
      type: Object,
      default: () => ({}),
      requreid: true
    }
  },
  data() {
    return {
      mediaList: [],
      openCode: '',
      memberType: sessionStorage.memberType
    }
  },
  methods: {
    async getParam(index) {
      console.log('getParam')
      let modelParamList = []
      let refs = this.$refs.mediaRef
      let mediaData = await refs[index].getParamFun()
      modelParamList = mediaData
      this.$store.commit('SET_PARAMINDEX', index)
      this.$store.commit('SET_modelParamList', modelParamList)
    },
    reset() {
      this.mediaList = []
      this.$nextTick(() => {
        this.handleAdd()
      })
    },
    async getData() {
      let codeLength = 0,
        mediaFunList = [],
        paramFunList = []
      let refs = this.$refs.mediaRef
      for (let i = 0; i < refs.length; i++) {
        let mediaData = await refs[i].getData()
        codeLength += mediaData.codeLength
        mediaFunList.push(mediaData.mediaFun)
        paramFunList.push(mediaData.modelParamFun)
      }
      console.log(codeLength, refs.length)
      return {
        codeLength: codeLength,
        fun: async () => {
          let insertMediaList = [],
            insertModelParamList = []
          for (let i = 0; i < mediaFunList.length; i++) {
            let result = await mediaFunList[i]()
            insertMediaList.push(result)
          }
          for (let i = 0; i < paramFunList.length; i++) {
            let result = await paramFunList[i]()
            insertModelParamList.push(result)
          }
          console.log(
            insertMediaList,
            insertModelParamList,
            'insertMediaList----'
          )
          return {
            insertMediaList: insertMediaList,
            insertModelParamList
          }
        }
      }
    },
    // 触发手机渲染
    triggerPhone() {},
    reTrigger() {
      this.$nextTick(() => {
        let index = this.mediaList.findIndex(
          (v) => v.mediaCode === this.openCode
        )
        let ref = this.$refs.mediaRef[index]
        if (ref) {
          ref.handleTriggerPhone()
        }
      })
    },
    getBaseInfo(mediaCode) {
      return {
        projectCode: this.basePicData.projectCode,
        basePicCode: this.basePicData.basePicCode,
        mediaCode: mediaCode,
        classCode: this.classData.classCode,
        mediaSequence: '',
        mediaCombinationType: '',
        mediaType: '',
        mediaTitle: '',
        mediaIntroduce: '',
        isInteraction: '',
        mediaName: '',
        mediaObsName: '',
        mediaObsPath: '',
        fileSuffix: ''
      }
    },
    async handleAdd() {
      if (this.mediaList.length === MediaLimit.mediaNum) {
        return this.$message.warning(`最多只能上传${MediaLimit.mediaNum}个资源`)
      }
      this.$store.commit('SET_UPLOADINDEX', this.mediaList.length)
      this.$store.commit('SET_PARAMINDEX', this.mediaList.length)
      this.$store.commit('SET_modelParamList', null)
      this.$store.commit('SET_successUploadList', null)

      this.getSnowCode().then((res) => {
        if (res.code === 1000) {
          this.mediaList.push(this.getBaseInfo(res.data))
          this.openCode = res.data
        }
      })
    },
    // 当前展开的资源被删除
    handleDelete() {},
    handleItemDelete({ data, index }) {
      let code = data.mediaCode
      this.$confirm('您确定要删除这个资源吗?', '提示')
        .then(() => {
          // let index = this.mediaList.findIndex((v) => v.mediaCode === code)
          this.mediaList.splice(index, 1)
          this.$store.commit('SET_UPLOADINDEX', index)
          this.$store.commit('SET_PARAMINDEX', index)
          this.$store.commit('SET_delModelFlag', true)
          this.$store.commit('Del_successUploadList')
          this.$store.commit('Del_modelParamList')

          if (this.openCode === code) {
            this.$nextTick(() => {
              // if(this.openIndex === 0 && index === 0){
              //     this.$refs.mediaRef[0].triggerSlide()
              //     this.reTrigger()
              // }else{
              //     }
              this.openCode = this.mediaList[Math.max(0, index - 1)].mediaCode
            })
            this.handleDelete()
          }
        })
        .catch(() => {})
    }
  },
  created() {
    console.log("this.memberType",this.memberType)
    this.handleAdd()
    this.getDataIndex = 'getDataMediaList' + this.$getCode()
    this.registeredGetDataEvent(this.getDataIndex, this.getData)
    this.resetIndex = 'resetMediaFile' + this.$getCode()
    this.registeredResetEvent(this.resetIndex, this.reset)
  },
  beforeDestroy() {
    this.removeGetDataEvent(this.getDataIndex)
    this.removeResetEvent(this.checkIndex)
  }
}
</script>

<style lang="scss" scoped>
</style>