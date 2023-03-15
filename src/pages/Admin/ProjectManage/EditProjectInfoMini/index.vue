<template>
  <!-- 编辑页面111 -->
  <div class="container">
    <div class="piclist">
      <div class="current">
        <img src="@assets/images/icon-list.png" alt="" />
        当前单页
      </div>
      <div class="pic">
        <el-scrollbar class="scrollbar-wrapper">
          <div class="projectPicItem">
            <keep-alive>
              <img class="cover" :src="picUrl" />
            </keep-alive>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="leftMain">
      <!-- <PageBG /> -->
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/ProjectManage/ProjectList' }">
            项目管理
          </el-breadcrumb-item>
          <!-- <el-breadcrumb-item :to="prevPage">{{
            projectName
          }}</el-breadcrumb-item> -->
          <el-breadcrumb-item>修改资源</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main">
        <div style="margin-top: 25px">
          <MediaCom :picUrl="picUrl" :mediaCode="mediaCode" v-if="isShow" />
        </div>
      </div>
    </div>
    <el-button
      class="el-scroll-icon"
      :icon="iconArrow"
      circle
      @click="rightMenuHide()"
    >
      <div class="is-dark">点击{{ hideShow }}预览效果</div>
    </el-button>

    <div class="preView" v-show="rightMenuShow">
      <div class="showpre">
        <div class="previewTitle">预览效果</div>
        <div class="preViewPic">
          <Canvas3D v-if="isShow" :projectCode="projectCode"></Canvas3D>
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
import Canvas3D from '@/components/Canvas3D/Canvas3D.vue'
// import MediaCom from '../CreateInfoMini/component/MeidaCom.vue'
import { adminPublicApi as publicApi, searchAPI } from '@/API'
import { mapMutations } from 'vuex'
export default {
  name: 'EditInfoMini',
  provide() {
    return {
      mediaDataListFun: () => this.mediaData,
      paramInfoList: this.paramInfo,
      paramsList: this.paramsList,
      initPic: this.changeinitPic
    }
  },
  components: {
    PageBG,
    MediaCom,
    Canvas3D
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
      mediaData: [],
      // mediaData: {
      //   appType: ''
      // },
      paramInfo: [],
      isShow: false,
      modelParamCode: '',
      picUrl: '',
      projectCode: '',
      classCode: '',
      rightMenuShow: false,
      iconArrow: 'el-icon-arrow-left',
      hideShow: '显示'
    }
  },
  computed: {
    detail() {
      return this.$store.state.detail
    }
  },
  methods: {
    mediaDataFun() {
      return this.mediaData
    },
    rightMenuHide() {
      if (this.rightMenuShow) {
        this.iconArrow = 'el-icon-arrow-left'
        document.querySelector('.el-scroll-icon')

        this.hideShow = '显示'
      } else {
        this.iconArrow = 'el-icon-arrow-right'
        document.querySelector('.el-scroll-icon')

        this.hideShow = '隐藏'
      }
      this.rightMenuShow = !this.rightMenuShow
    },
    // 修改picUrl地址
    changeinitPic(v) {
      console.log(v)
      this.picUrl = v
    },
    // ...mapMutations([detail]),
    async paramsList(e) {
      return await searchAPI
        .selMediaApps({
          projectCode: this.projectCode
        })
        .then((res) => {
          console.log(res, 'res')
          if (res.code === 1000) {
            let list = []
            let modelParamInfo = []
            let { mediaList } = res.data
            console.log('根据classCode找到识别图和模型', mediaList)

            console.log('根据classCode找到识别图和模型', mediaList)
            this.mediaData = mediaList.filter((v3) => {
              return v3.classCode == this.classCode
            })
            // 根据classCode找到识别图和模型
            console.log('根据classCode找到识别图和模型', this.mediaData)
            if (this.mediaData.length > 0) {
              // this.mediaData = res.data.mediaList
              // data = res.data.modelParamList.filter((item) => {
              //   return item.mediaCode == this.mediaData.mediaCode
              // })
              // let modelParamList = res.data.modelParamList.filter((item) => {
              //   return item.mediaCode == this.mediaCode
              // })
              let modelParamList2 = res.data.modelParamList
              for (let i = 0; i < this.mediaData.length; i++) {
                let index = modelParamList2.findIndex((v2, i2, l2) => {
                  return v2.mediaCode == this.mediaData[i].mediaCode
                })
                if (index != -1) {
                  let d = [
                    modelParamList2[index],
                    modelParamList2[index + 1],
                    modelParamList2[index + 2],
                    modelParamList2[index + 3]
                  ]
                  console.log(d, 'list23')
                  list.push(d)
                }
                console.log(list, 'list23')
              }

              console.log(list, '根据mediaCode找到模型的高级设置参数')
              // this.modelParamCode = list[0][0].modelParamCode
              // 顺序不能乱
              if (list.length > 0) {
                list.forEach((element2) => {
                  let paramList = {}
                  console.log(element2, 'element2')
                  element2.forEach((element) => {
                    switch (element.modelParamType) {
                      case 1:
                        paramList.position = element.modelParamInfo

                        break
                      case 2:
                        paramList.scale = element.modelParamInfo
                        break
                      case 3:
                        paramList.rotate = element.modelParamInfo
                        break
                      case 4:
                        let modelParamInfo2 = element.modelParamInfo.split('|')
                        paramList.width = modelParamInfo2[0]
                        paramList.height = modelParamInfo2[1]
                        break
                      default:
                        break
                    }
                  })
                  this.paramInfo.push(paramList)
                  console.log(paramList, 'element')
                })
              }
            } else {
              this.mediaData.mediaType = e
              this.mediaData.mediaObsName = ''
              this.mediaData.mediaObsPath = ''
            }
            // this.paramInfo = Object.assign({}, this.paramInfo, paramList)
            this.paramInfo.modelParamCode = this.modelParamCode

            // this.paramInfo = paramList
            // 得到了对应的图片地址，模型地址 ，以及模型的参数
            console.log(this.paramInfo, 'set')

            console.log(this.mediaData, ' set')
            this.$store.commit(
              'EDIT_successUploadList',
              this.mediaData.slice(1)
            )
            this.$store.commit('EDIT_modelParamList', list)
            this.isShow = true
          }
        })
    },
    //初始化
    async init() {
      const viewIndex = sessionStorage.getItem('cacheListIndex')
        ? JSON.parse(sessionStorage.getItem('cacheListIndex'))
        : []

      console.log('viewIndex', viewIndex)
      this.viewList = sessionStorage.getItem('cacheList')
        ? JSON.parse(sessionStorage.getItem('cacheList'))
        : []
      console.log(this.viewList[viewIndex], 'ceshiksdjbksdf')
      this.picUrl =
        this.viewList.length > 0 ? this.viewList[viewIndex].picObsPath : ''
      console.log(this.$route.params)
      this.mediaCode =
        this.viewList.length > 0 ? this.viewList[viewIndex].mediaCodeAKA : ''
      console.log('mmmmmmmmmmedia', this.mediaCode)
      console.log(this.viewList, 'viewList')
      this.classCode =
        this.viewList.length > 0 ? this.viewList[viewIndex].classCode : ''
      console.log('CCCCCclassCode', this.classCode)
      this.projectCode =
        this.viewList.length > 0 ? this.viewList[viewIndex].projectCode : ''
      console.log('pppprojectCode', this.projectCode)
    }
  },
  mounted() {
    // this.paramsList()
    console.log('调用mounted')
    // this.picUrl = this.viewList.length > 0 ? this.viewList[viewIndex].picObsPath : ''
  },
  watch: {
    // init(newVal,oldVal){
    //   console.log(newVal)
    // }
  },
  async created() {
    console.log('调用created')
    this.init()
    // const query = this.$route.query
    // const viewIndex = query.viewIndex
    // const viewIndex = sessionStorage.getItem('cacheListIndex')
    // ? JSON.parse(sessionStorage.getItem('cacheListIndex')) :[]

    // console.log("viewIndex",viewIndex)
    // this.viewList = sessionStorage.getItem('cacheList')
    //   ? JSON.parse(sessionStorage.getItem('cacheList'))
    //   : []

    //   console.log(this.viewList[viewIndex],"ceshiksdjbksdf")
    // this.picUrl = this.viewList.length > 0 ? this.viewList[viewIndex].picObsPath : ''
    // console.log(this.$route.params)
    // this.mediaCode = this.viewList.length > 0 ? this.viewList[viewIndex].mediaCodeAKA : ''
    // console.log('mmmmmmmmmmedia', this.mediaCode)
    // this.classCode = this.viewList.length > 0 ? this.viewList[viewIndex].classCode : ''
    // console.log('CCCCCclassCode', this.classCode)
    // this.projectCode = this.viewList.length > 0 ? this.viewList[viewIndex].projectCode : ''
    // console.log('pppprojectCode', this.projectCode)

    // const {
    //   projectCode,
    //   projectName,
    //   mediaData = {},
    //   appType = ''
    // } = this.$route.params
    // this.projectCode = this.$decode(this.$route.params.projectCode)
    // this.projectName = this.$decode(projectName)
    // this.mediaData = JSON.parse(this.$decode(mediaData))
    await this.paramsList()
    // if (!appType) {
    //   this.mediaData = JSON.parse(this.$decode(mediaData))
    //   await this.paramsList()
    // } else {
    //   this.isShow = true
    //   this.mediaData.appType = this.$decode(appType)
    // }
    this.isShow = true
    this.step = 2
    // this.prevPage = {
    //   path: `/ProjectManage/ProjectPicApp/${projectCode}/${projectName}`
    // }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  overflow: auto;
  .piclist {
    float: left;
    width: 200px;
    height: 1200px;
    position: relative;
    .current {
      position: absolute;
      width: 20px 22px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      margin: 14px auto;
      // margin-left: 30px;
      margin-bottom: 30px;
      img {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-left: 17px;
        margin-right: 9px;
        vertical-align: middle;
      }
    }
    .pic {
      height: 1150px;
    }
    .scrollbar-wrapper {
      margin-top: 50px;
      height: 100%;

      .other {
        position: absolute;
        width: 20px 22px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        // margin-top: 302px;
        margin-top: 282px;
        // margin-left: 30px;
        img {
          width: 20px;
          height: 20px;
          display: inline-block;
          margin-left: 17px;
          margin-right: 9px;
          vertical-align: middle;
        }
      }
      .projectPicItem {
        // width: 182px;
        // margin: 0 auto;
        height: 200px;
        padding: 0 10px;
        margin-bottom: 20px;
        cursor: pointer;
        position: relative;
        .dropDown {
          position: absolute;
          right: 20px;
          top: 10px;
          // z-index: 10;
        }
        &:hover:not(.actived) {
          background-color: #f5f4f5;
        }
        &:hover {
          // background-color: #f5f4f5;
          // box-shadow: 0 0 10px rgb(211, 209, 209);
          .edit {
            opacity: 0.8 !important;
          }
        }

        .cover {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 10px;
        }
        .edit {
          // transition: all 0.1s linear;
          // position: absolute;
          // left: 0;
          margin-top: -120px;
          // z-index: 2;
          // width: 100%;
          // height: 100%;
          opacity: 0;
          // opacity: 0.8;
          display: flex;
          justify-content: center;
          align-items: center;
          // background: linear-gradient(
          //   0deg,
          //   rgba(0, 0, 0, 0.7) 0%,
          //   rgba(0, 0, 0, 0.3) 100%
          // );
          .imgBox {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            border-radius: 50%;
          }
          img {
            width: 22px;
            height: 22px;
            display: block;
          }
        }
      }
      .actived {
        // margin-top: 53px;
        // padding: 0px 10px 20px;
        // 其他单页的位置
        padding: 0px 10px 0px;
        // background-color: #eaeaec;

        // margin-bottom: 52px;
        border-radius: 10px;
        .cover {
          display: block;
        }
      }
    }
  }

  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .leftMain {
    float: left;
    width: 1000px;
    padding-top: 15px;
    vertical-align: top;
    .breadcrumb {
      display: inline-block;
      .el-breadcrumb {
        font-size: 18px;
      }
    }
    .main {
      position: relative;
      // z-index: 1;
    }
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
  .el-scroll-icon {
    position: fixed;
    right: 18px;
    top: 8%;
    .is-dark {
      display: none;
      position: absolute;
      right: calc(100% + 13px);
      top: 3px;
      border-radius: 4px;
      padding: 10px;
      z-index: 9999;
      font-size: 12px;
      line-height: 1.2;
      min-width: 10px;
      word-wrap: break-word;
      background: #303133;
      color: #fff;
      &::after {
        content: '';
        position: absolute;
        top: 11px;
        // left: -6px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-right-color: #303133;
        border-left-width: 0;
      }
    }
    &:hover {
      .is-dark {
        display: block;
      }
    }
  }
  .preView {
    z-index: 9999;
    position: fixed;
    width: 600px;
    // height: 970px;
    // float: right;
    right: 18px;
    top: 104px;
    background: transparent;

    .previewTitle {
      top: 0px;
      height: 30px;
      background: transparent;
      font-size: 18px;
      // margin-bottom: 10px;
    }
    .preViewPic {
      // top: 110px;
      width: 600px;
      height: 990px;
      background-color: #fafafa;
      // margin-bottom: 110px;
    }
  }
}
</style>
