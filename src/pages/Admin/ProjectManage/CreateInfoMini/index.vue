<template>
  <div class="container">
    <div class="piclist">
      <div class="current">
        <img src="@assets/images/icon-list.png" alt="" />
        单页管理
      </div>
      <div class="pic">
        <el-scrollbar class="scrollbar-wrapper">
          <!-- <div class="other" v-if="this.list.length>1">
        <img src="@assets/images/icon-list.png" alt="" />
        其他单页
      </div> -->
          <div
            class="projectPicItem"
            :class="{ actived: isActivedIndex == index ? true : false }"
            v-for="(item, index) in list"
            :key="index"
          >
            <el-dropdown class="dropDown" trigger="click">
              <span class="el-dropdown-link">
                <img src="@assets/images/more.png" alt="" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleDown(index)"
                  >识别图下载</el-dropdown-item
                >
                <el-dropdown-item @click.native="handleDelete(index)"
                  >删除</el-dropdown-item
                >
                <!-- <el-dropdown-item @click.native="handleWatchQR(item)"
              >查看小程序码</el-dropdown-item
            > -->
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <div class="projectIcon"> -->
            <!-- <AutoImg :src="item.picObsPath" /> -->
            <img class="cover" :src="item.picObsPath" />
            <div class="edit">
              <div class="imgBox" @click="handleToEdit(item, index)">
                <img src="@assets/images/edit.png" alt="" />
              </div>
            </div>

            <!-- </div> -->
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
          <el-breadcrumb-item>上传资源</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main">
        <div style="margin-top: 25px">
          <MediaCom v-if="isShow" />
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
          <Canvas3D :projectCode="projectCode"></Canvas3D>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 创建识别文件和上传资源
 */
import { loading, throttle } from '@/utils/decorator'
import { searchAPI } from '@/API'
import PageBG from '@/components/PageBG.vue'
import Canvas3D from '@/components/Canvas3D/Canvas3D.vue'
import MediaCom from './component/MeidaCom.vue'
import { adminPublicApi as publicApi } from '@/API'
import { Scrollbar, MessageBox } from 'element-ui'

export default {
  name: 'CreateInfoApp1',
  provide() {
    return {
      mediaData: this.mediaData
    }
  },
  components: {
    PageBG,
    MediaCom,
    Canvas3D
  },
  data() {
    return {
      prevPage: {},
      projectName: '',
      projectCode: '',
      mediaData: {},
      step: 1,
      isShow: false,
      list: [],
      isActivedIndex: 0,
      rightMenuShow: false,
      iconArrow: 'el-icon-arrow-left',
      hideShow: '显示'
    }
  },
  methods: {
    load() {
      this.index += 3
    },

    @loading()
    fetchList() {
      return searchAPI
        .selPicVoList({
          userCode: sessionStorage.userCode,
          projectCode: this.projectCode
        })
        .then((res) => {
          if (res.code === 1000) {
            console.log('图片基本图列表', res.data)
            // 根据classCode进行去重
            let hash = {}
            var newArr = res.data.reduce((item, next) => {
              hash[next.classCode]
                ? ''
                : (hash[next.classCode] = true && item.push(next))
              return item
            }, [])
            console.log(newArr, '查看去重后的结果')
            // this.list = unlink(res.data)
            // console.log("去重后的list",this.list)
            this.list = newArr
            console.log(this.list, 'this.listthis.listthis.list')
            // sessionStorage.setItem('list2', JSON.stringify(this.list.slice(0)))
            // console.log(this.list, 'this.listthis.listthis.list2222')
            // console.log(this.list[0].picObsPath,"------------------path")
            // this.calcColumn(true)
          }
        })
    },
    handleToEdit(item, index) {
      // this.$message.warning('暂无该功能')
      console.log(this.list[index].classCode, '打印总的list')
      this.mediaData.projectCode = this.list[index].projectCode
      const viewIndex = index

      sessionStorage.setItem('cacheList', JSON.stringify(this.list))
      sessionStorage.setItem('cacheListIndex', JSON.stringify(viewIndex))
      this.$router.push({
        path: `/ProjectManage/EditProjectInfoMini/${this.$encode(
          this.mediaData.projectCode
        )}/${this.$encode(this.list[index].classCode)}`,
        query: { viewIndex }
      })
    },
    // 图片下载
    img_download(src) {
      //src是图片路径
      var eleLink = document.createElement('a')
      eleLink.download = src
      eleLink.style.display = 'none'
      //字符内容转变成blob地址
      eleLink.href = src
      //触发点击
      document.body.appendChild(eleLink)
      eleLink.click()
      //然后移除
      document.body.removeChild(eleLink)
    },

    handleDown(index) {
      // this.$message.warning('暂无该功能')
      // this.list[index].picObsPath
      // 图片code编码
      // console.log(this.list[index].picObsPath)
      this.img_download(this.list[index].picObsPath)
    },
    handleDelete(index) {
      // this.$message.warning('暂无该功能')
      console.log(this.list[index], '查找删除')
      MessageBox(`此操作将永久删除文件, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('开始调用删除接口')
          searchAPI
            .delMediaApps({
              // userCode: sessionStorage.userCode,
              classCode: this.list[index].classCode,
              mediaCode: this.list[index].mediaCode
            })
            .then((res) => {
              console.log('调用删除接口成功')
              if (res.code === 1000) {
                this.$message.success('删除成功!')
                this.fetchList()
              } else {
                this.$message.error('删除失败!')
              }
            })
        })
        .catch(() => {
          this.$message.info('取消删除!')
        })
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
    }
  },
  async created() {
    const { projectCode, projectName, mediaData } = this.$route.params
    this.projectCode = this.$decode(projectCode)
    this.projectName = this.$decode(projectName)
    console.log(mediaData) // undefined
    if (typeof mediaData !== 'undefined') {
      this.mediaData = JSON.parse(this.$decode(mediaData))
    }
    this.isShow = true
    this.step = 2
    this.prevPage = {
      path: `/ProjectManage/ProjectPic/${projectCode}/${projectName}`
    }
  },

  // 获取创造的识别图和模型

  mounted() {
    this.fetchList()
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
  // .rightMain {
  //   position: absolute;
  //   vertical-align: top;
  //   height: 100%;
  //   width: 500px;
  //   display: inline-block;
  //   box-sizing: border-box;
  //   border-left: 1px solid #e5e5e5;
  //   padding: 0 25px;
  //   box-sizing: border-box;
  //   .rightTitle {
  //     line-height: 48px;
  //     color: #020202;
  //     font-size: 14px;
  //   }
  // }
}
</style>
