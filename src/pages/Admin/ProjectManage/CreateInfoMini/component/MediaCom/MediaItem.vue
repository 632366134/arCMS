<template>
  <!-- 新后台新增资源 -->
  <div class="mediaItem">
    <div class="mediaBox">
      <div class="mediaContorl">
        <!-- <div class="mediaIcon">
                    <div class="mediaIconItem no" v-if="mediaType === ''"></div>
                    <img
                        class="mediaIconItem"
                        v-else-if="mediaType === 3"
                        src="@/assets/images/img.png"
                        alt=""
                    />
                    <img
                        class="mediaIconItem"
                        v-else-if="mediaType === 4"
                        src="@/assets/images/video.png"
                        alt=""
                    />
                    <img
                        class="mediaIconItem"
                        v-else-if="mediaType === 5"
                        src="@/assets/images/model.png"
                        alt=""
                    />
                    <img
                        class="mediaIconItem"
                        v-else-if="mediaType === 6"
                        src="@/assets/images/aniModel.png"
                        alt=""
                    />
                </div> -->
        <div class="mediaName">
          <div>资源信息配置详情</div>
          <!-- <el-input
                        placeholder="请输入资源名称"
                        v-model="mediaName"
                    ></el-input> -->
        </div>
        <div
          :class="['controlIcon', openCode === data.mediaCode ? 'open' : '']"
          @click="handleTrigger"
        >
          <img src="@assets/images/arrow.png" alt="" />
        </div>
        <div class="deleteItem" @click="handleDelete" v-if="allLength !== 1">
          <el-button type="text" icon="el-icon-remove-outline"></el-button>
        </div>
      </div>
      <div class="mediaInfo">
        <el-form label-width="120px" class="mediaInfoMain">
          <el-form-item label="资源类型:">
            <MediaType @preview="handleTriggerPhone" v-model="mediaType" />
          </el-form-item>
          <el-form-item label="资源文件上传:">
            <MediaFile
              @preview="handleTriggerPhone"
              @changeAniParam="handleAniChange"
              ref="mediaFileRef"
              :mediaType="mediaType"
              :mediaCode="data.mediaCode"
            />
          </el-form-item>
          <el-form-item label="高级设置:">
            <el-switch
              v-model="highvalue"
              inactive-color="grey"
              :active-text="valueText"
              @change="changehighvalue"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="参数设置:" v-if="highvalue == true">
            <MediaParam v-model="paramInfo" @preview="handleTriggerPhone" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 单个媒体资源
 */
import MediaType from './ItemCom/MediaType.vue'
import MediaFile from './ItemCom/MediaFile.vue'
import { debounce } from '@/utils/decorator'
import MediaParam from './ItemCom/MediaParam.vue'
export default {
  name: 'MediaItem',
  provide() {
    return {
      indexFun: this.indexFun
    }
  },
  inject: [
    'registeredCheckEvent',
    'warning',
    'removeCheckEvent',
    'basePicData',
    'getSnowCode'
  ],
  props: {
    data: {
      type: Object,
      required: true
    },
    openCode: {
      type: String
    },
    index: {
      type: Number
    },
    allLength: {
      type: Number,
      default: 0
    }
  },
  watch: {
    mediaType() {
      this.reset()
    },
    paramInfo() {
      this.$emit('getParam', this.index)
    },
    openCode: {
      handler() {
        this.triggerSlide()
      }
    }

    // this.changehighvalue()
  },
  components: {
    MediaType,
    MediaFile,
    MediaParam
  },
  data() {
    return {
      mediaName: '',
      mediaIntroduce: '',
      mediaType: '',
      // 动画模型基础参数
      baseParamList: [],
      baseParmCodeToSnowCodeInfo: {},
      highvalue: true,
      valueText: '开启',
      paramInfo: {
        position: '0|0|0',
        rotate: '0|0|0',
        scale: '1|1|1',
        width: 0,
        height: 0
      }
      // paramInfo: this.$store.state.paramInfo
    }
  },
  computed: {
    // paramInfo() {
    //   return this.$store.state.paramInfo
    // }
  },
  methods: {
    indexFun() {
      return this.index
    },
    changehighvalue() {
      this.highvalue = this.highvalue
      if (this.highvalue == true) {
        this.valueText = '开启'
      } else {
        this.valueText = '关闭'
      }
      // console.log(this.mediaType,"mediaType")
    },
    check() {
      // if (this.mediaType === '') {
      //     this.warning('请选择资源类型')
      //     return Promise.reject()
      // }
      return Promise.resolve()
    },
    async handlebaseParmCodeToSnowCodeInfo() {
      for (let i = 0; i < this.baseParamList.length; i++) {
        if (!this.baseParmCodeToSnowCodeInfo[this.baseParamList[i].value]) {
          let { code, data } = await this.getSnowCode()
          if (code === 1000) {
            this.baseParmCodeToSnowCodeInfo[this.baseParamList[i].value] = data
          }
        }
      }
    },
    async getParamFun() {
      let result = [],
        projectCode = this.basePicData().projectCode
      const { position, scale, rotate, width, height } = this.paramInfo
      // 顺序不能乱
      let list = [position, scale, rotate, width + '|' + height]
      for (let i = 0; i < list.length; i++) {
        let { data } = await this.getSnowCode()
        result.push({
          projectCode: projectCode,
          mediaCode: this.data.mediaCode,
          modelParamCode: data,
          modelParamInfo: list[i],
          modelParamType: i + 1
        })
      }
      return result
    },
    async getData() {
      try {
        let ref = this.$refs.mediaFileRef
        let fileData = ref.getData()
        let codeLength = 0
        // 媒体资源以及材质的编号
        codeLength += fileData.codeLength
        // 位置参数code数量
        codeLength += 4
        return {
          codeLength: codeLength,
          mediaFun: async () => {
            let list = fileData.medaiDataFun(),
              result = []
            for (let i = 0; i < list.length; i++) {
              let { data } = await this.getSnowCode()
              let item = list[i]
              let isBenti = item.isBenti
              delete item.isBenti
              if (isBenti) {
                data = this.data.mediaCode
              }
              console.log('mediaCode:-----', data)
              result.push({
                ...item,
                appType: this.basePicData().appType,
                projectCode: this.basePicData().projectCode,
                parentCode: this.basePicData().basePicCode,
                classCode: this.data.classCode,
                mediaCode: data
              })
            }
            console.log('合并后的result', result)
            return result
          },
          modelParamFun: async () => {
            let data = await this.getParamFun()
            return data
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleAniChange(data) {
      this.baseParamList = data
    },
    @debounce()
    handleTriggerPhone() {},
    handleDelete() {
      this.$emit('delete', {
        data: this.data,
        index: this.index
      })
    },
    handleOpen() {
      let el = this.$el.querySelector('.mediaInfo')
      el.style.display = 'block'
      el.style.height =
        this.$el.querySelector('.mediaInfoMain').offsetHeight + 'px'
      setTimeout(() => {
        el.style.height = 'auto'
      }, 300)
    },
    handleHide() {
      let el = this.$el.querySelector('.mediaInfo')
      el.style.height =
        this.$el.querySelector('.mediaInfoMain').offsetHeight + 'px'
      setTimeout(() => {
        el.style.height = 0
        setTimeout(() => {
          el.style.display = 'none'
        }, 300)
      }, 50)
    },
    triggerSlide() {
      if (this.openCode === this.data.mediaCode) {
        this.handleOpen()
      } else {
        this.handleHide()
      }
    },
    // 切换类型 重置所有资源信息
    reset() {
      // this.paramInfo = this.$options.computed.paramInfo
      // this.$store.commit('SET_paramInfo', {
      //   position: '0|0|0',
      //   rotate: '0|0|0',
      //   scale: '1|1|1',
      //   width: 0,
      //   height: 0
      // })
      this.paramInfo = this.$options.data().paramInfo
      this.baseParamList = this.$options.data().baseParamList
      this.baseParmCodeToSnowCodeInfo = {}
      this.$refs.mediaFileRef.reset()
    },
    handleTrigger() {
      if (this.openCode !== this.data.mediaCode) {
        this.$emit('update:openCode', this.data.mediaCode)
      }
    }
  },
  created() {
    this.checkIndex = 'checkMediaItem' + this.$getCode()
    this.registeredCheckEvent(this.checkIndex, this.check)
  },
  mounted() {
    setTimeout(() => {
      this.triggerSlide()
    }, 100)
  },
  beforeDestroy() {
    this.removeCheckEvent(this.checkIndex)
  }
}
</script>

<style lang="scss" scoped>
.mediaItem {
  width: 100%;
  max-width: 1000px;
  padding-right: 133px;
  box-sizing: border-box;
  font-size: 14px;
  margin-bottom: 20px;
  @media screen and (max-width: 1380px) {
    // padding-right: 20px;
  }
  .mediaBox {
    box-shadow: 0 0 10px rgb(211, 209, 209);
    border-radius: 5px;
    .mediaContorl {
      position: relative;
      height: 68px;
      background: #f0f3fd;
      display: flex;
      align-items: center;
      padding: 0 30px 0 10px;
      box-sizing: border-box;
      .mediaIcon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        .mediaIconItem {
          width: 100%;
          height: 100%;
          &.no {
            background: #d2d2d2;
          }
        }
      }
      .mediaName {
        display: flex;
        align-items: center;
        color: #020202;
        white-space: nowrap;
        flex: 1;
        .el-input {
          width: 50%;
          height: 40px;
          margin-left: 14px;
          line-height: 40px;
        }
      }
      .controlIcon {
        top: 0;
        right: 0;
        position: absolute;
        width: 68px;
        height: 100%;
        cursor: pointer;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 5px;
        transition: all 0.3s linear;
        transform-origin: center center;
        &.open {
          transform: rotateX(180deg);
        }
        img {
          width: 22px;
          height: 22px;
        }
      }
      .deleteItem {
        position: absolute;
        right: -45px;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        .el-button {
          font-size: 24px;
        }
      }
    }
    .mediaInfo {
      transition: all 0.3s linear;
      overflow: hidden;
      .textarea {
        max-width: 480px;
      }
    }
  }
}
</style>