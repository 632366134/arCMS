<template>
  <div class="container">
    <div class="leftMain">
      <PageBG />
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/ProjectManage/ProjectList' }">
            项目管理
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="prevPage">{{
            projectName
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>上传资源</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main">
        <div style="margin-top: 25px">
          <MediaCom v-if="isShow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 创建识别文件和上传资源
 */

import PageBG from '@/components/PageBG.vue'
import MediaCom from './component/MeidaCom.vue'
import { adminPublicApi as publicApi, searchAPI } from '@/API'
export default {
  name: 'CreateInfoApp1',
  provide() {
    return {
      mediaDataList: () => this.mediaData,
      paramInfoList: () => this.paramInfo,
      paramsList: this.paramsList
    }
  },
  components: {
    PageBG,
    MediaCom
  },
  // watch: {
  //   'mediaData.mediaType': function (val) {
  //     this.paramsList()
  //   }
  // },
  data() {
    return {
      prevPage: {},
      projectName: '',
      projectCode: '',
      step: 1,
      mediaData: {
        appType: ''
      },
      paramInfo: {
        position: '0|0|0',
        rotate: '0|0|0',
        scale: '1|1|1',
        width: 0,
        height: 0
      },
      isShow: false,
      modelParamCode: ''
    }
  },
  methods: {
    async paramsList(e) {
      return await searchAPI
        .selMediaApps({
          projectCode: this.projectCode
        })
        .then((res) => {
          if (res.code === 1000) {
            let paramList = {
              position: '0|0|0',
              rotate: '0|0|0',
              scale: '1|1|1',
              width: 0,
              height: 0
            }
            let modelParamInfo = []
            let data = []
            let mediaList = res.data.mediaList.filter((item) => {
              return (
                item.mediaType == this.mediaData.mediaType &&
                item.mediaCode == this.mediaData.mediaCode
              )
            })
            if (mediaList.length > 0) {
              data = res.data.modelParamList.filter((item) => {
                return item.mediaCode == this.mediaData.mediaCode
              })
              console.log(data)
              this.modelParamCode = data[0].modelParamCode

              console.log(mediaList, data, 'mediaListmediaListmediaList')

              if (data.length > 0) {
                data.forEach((element) => {
                  switch (element.modelParamType) {
                    case 1:
                      paramList.position = element.modelParamInfo
                      break
                    case 2:
                      paramList.rotate = element.modelParamInfo
                      break
                    case 3:
                      paramList.scale = element.modelParamInfo
                      break
                    case 4:
                      modelParamInfo = element.modelParamInfo.split('|')
                      paramList.width = modelParamInfo[0]
                      paramList.height = modelParamInfo[1]
                      break
                    default:
                      break
                  }
                })
              }
              this.mediaData = mediaList[0]
            } else {
              this.mediaData.mediaType = e
              this.mediaData.mediaObsName = ''
              this.mediaData.mediaObsPath = ''
            }

            // this.paramInfo = Object.assign({}, this.paramInfo, paramList)
            paramList.modelParamCode = this.modelParamCode
            this.paramInfo = paramList
            console.log(this.mediaData, this.paramInfo, 'set')

            this.isShow = true
          }
        })
    }
  },
  async created() {
    const {
      projectCode,
      projectName,
      mediaData = {},
      appType = ''
    } = this.$route.params
    this.projectCode = this.$decode(projectCode)
    this.projectName = this.$decode(projectName)
    if (!appType) {
      this.mediaData = JSON.parse(this.$decode(mediaData))
      await this.paramsList()
    } else {
      this.isShow = true
      this.mediaData.appType = this.$decode(appType)
    }
    this.step = 2
    this.prevPage = {
      path: `/ProjectManage/ProjectPicApp/${projectCode}/${projectName}`
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  overflow: auto;
  .leftMain {
    width: 100%;
    padding-top: 15px;
    display: inline-block;
    vertical-align: top;
    .stepBox {
      display: flex;
      justify-content: center;
    }
  }
  .rightMain {
    position: absolute;
    vertical-align: top;
    height: 100%;
    width: 500px;
    display: inline-block;
    box-sizing: border-box;
    border-left: 1px solid #e5e5e5;
    padding: 0 25px;
    box-sizing: border-box;
    .rightTitle {
      line-height: 48px;
      color: #020202;
      font-size: 14px;
    }
  }
}
.main {
  position: relative;
  z-index: 1;
}
</style>
