<template>
  <div class="container">
    <PageBG />
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/ProjectManage/ProjectList' }"
          >项目管理</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="prevPage">{{
          projectName
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>当前单页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="projectList">
      <div class="projectItem addItem" @click="handleAdd">
        <img src="@assets/images/add.png" alt="" />
        <div>创建新AR资源</div>
      </div>
      <div class="projectItem" v-for="item in list" :key="item.mediaCode">
        <el-dropdown class="dropDown" trigger="click">
          <span class="el-dropdown-link">
            <img src="@assets/images/more.png" alt="" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleEdit(item)"
              >编辑</el-dropdown-item
            >
            <el-dropdown-item @click.native="handleDelete(item)"
              >删除</el-dropdown-item
            >
            <el-dropdown-item @click.native="handleRename(item)"
              >重命名</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <div class="projectIcon">
          <!-- <AutoImg :src="item.mediaUrl" /> -->
          <div class="edit">
            <div class="imgBox" @click="handleToEdit(item)">
              <img src="@assets/images/edit.png" alt="" />
            </div>
          </div>
        </div>
        <div class="projectInfo">
          <div class="mediaIcon">
            <MediaIcon :mediaType="item.mediaType" />
          </div>
          <div class="projectName">{{ item.mediaObsName }}</div>
        </div>
      </div>
      <i v-for="v in 8" :key="v" class="zhanwei"></i>
    </div>
  </div>
</template>

<script>
import PageBG from '@/components/PageBG.vue'
import { adminPublicApi as publicApi, searchAPI } from '@/API'
import { loading } from '@/utils/decorator'
import AutoImg from '@/components/AutoImg.vue'
import MediaIcon from '@/components/MediaCom/MediaIcon.vue'
export default {
  name: 'ProjectPicInfo',
  components: {
    PageBG,
    AutoImg,
    MediaIcon
  },
  data() {
    return {
      list: [],
      showAdd: false,
      projectCode: '',
      mediaData: {},
      prevPage: {},
      projectName: ''
    }
  },
  computed: {
    nowRouter() {
      return this.$route.meta.showRouter || ''
    }
  },
  methods: {
    handleEdit(item) {
      this.toPage(
        `/ProjectManage/EditProjectInfoApp/${this.$encode(
          this.projectCode
        )}/${this.$encode(this.projectName)}/${this.$encode(
          JSON.stringify(item)
        )}`
      )
    },
    handleDelete() {
      this.$message.warning('暂无该功能')
    },
    handleRename() {
      this.$message.warning('暂无该功能')
    },
    handleToEdit(item) {
      this.toPage(
        `/ProjectManage/EditProjectInfoApp/${this.$encode(
          this.projectCode
        )}/${this.$encode(this.projectName)}/${this.$encode(
          JSON.stringify(item)
        )}`
      )
    },
    handleAdd() {
      let appType = this.mediaData.appType
      console.log(appType)

      this.toPage(
        `/ProjectManage/EditProjectInfoApp/${this.$encode(
          this.projectCode
        )}/${this.$encode(this.projectName)}/${this.$encode({})}/${this.$encode(
          appType
        )}`
      )
    },
    handleAddConfirm() {
      this.fetchList()
      this.showAdd = false
    },
    // fetchClass() {
    //   return searchAPI
    //     .selBasePic({
    //       customerCode: sessionStorage.customerCode,
    //       projectCode: this.projectCode,
    //       basePicCode: this.basePicCode
    //     })
    //     .then((res) => {
    //       if (res.code === 1000) {
    //         // 默认一个分类
    //         return res.data.classifyList[0].classCode
    //       }
    //       return Promise.reject()
    //     })
    // },
    @loading()
    fetchList() {
      return searchAPI
        .selMediaApps({
          projectCode: this.projectCode
        })
        .then((res) => {
          if (res.code === 1000) {
            let mediaList = res.data.mediaList
              .filter((item) => {
                return item.parentCode === this.mediaData.mediaCode
              })
              .filter((item) => {
                return (
                  (2 < item.mediaType && item.mediaType < 7) ||
                  item.mediaType == 12
                )
              })
            this.list = mediaList
            console.log(mediaList)
            // let list = []
            // try {
            // let pathList = res.data.map(
            //     (v) =>
            //         v.bookCoverObsPath + v.bookCoverObsName
            // )
            // if (pathList.length > 0) {
            //     list = await publicApi
            //         .getPicUrl(pathList)
            //         .then((res) => {
            //             if (res.code === 1000) {
            //                 return res.data
            //             }
            //         })
            // }
            // } catch (error) {}
            // res.data.forEach((item) => {
            //   let mediaObsPath = ''
            //   if (item.mediaType === 1) {
            //     mediaObsPath = item.mediaObsPath
            //   }
            //   Object.assign(item, {
            //     mediaUrl: mediaObsPath
            //   })
            // })
            // this.list = res.data.map((v) => {
            //   return {
            //     ...v,
            //     popshow: false,
            //     addTime: v.addTime || ''
            //   }
            // })
          }
        })
    },
    init() {
      const { projectCode, projectName, mediaData } = this.$route.params
      this.projectCode = this.$decode(projectCode)
      this.projectName = this.$decode(projectName)
      console.log(mediaData, 'mediaDatamediaDatamediaData')
      this.mediaData = JSON.parse(this.$decode(mediaData))
      console.log(
        projectName,
        this.projectName,
        'projectNameprojectNameprojectName'
      )

      this.fetchList()
      this.prevPage = {
        path: `/ProjectManage/ProjectPicApp/${projectCode}/${projectName}`
      }
      console.log(this.prevPage)
    }
  },
  created() {
    this.init()
  }

  // activated() {
  //   this.init()
  // }
}
</script>

<style lang="scss" scoped>
.projectList {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .zhanwei {
    flex: 0 0 360px;
    width: 360px;
    margin-bottom: 30px;
  }
  .projectItem {
    position: relative;
    cursor: pointer;
    flex: 0 0 360px;
    width: 360px;
    height: 300px;
    margin-bottom: 30px;
    border-radius: 10px;
    background: #f7f8fa;
    .dropDown {
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 10;
    }
    &:hover {
      box-shadow: 0 0 10px rgb(211, 209, 209);
      .edit {
        opacity: 1 !important;
      }
    }
    &.addItem {
      flex-direction: column;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #829fff;
      img {
        width: 40px;
        height: 40px;
        display: block;
        margin-bottom: 31px;
      }
    }
    .projectIcon {
      position: relative;
      height: 250px;
      border-radius: 10px 10px 0 0;
      overflow: hidden;
      .edit {
        transition: all 0.1s linear;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.7) 0%,
          rgba(0, 0, 0, 0.3) 100%
        );
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
    .projectInfo {
      position: relative;
      border-radius: 0 0 10px 10px;
      height: 50px;
      color: #020202;
      font-size: 14px;
      padding: 12px 9px;
      box-sizing: border-box;
      background: #f7f8fa;
      display: flex;
      align-items: center;
      .projectName {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #020202;
      }
    }
  }
}
</style>
