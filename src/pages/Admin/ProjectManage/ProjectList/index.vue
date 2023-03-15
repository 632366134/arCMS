<template>
  <div class="container">
    <PageBG />

    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="projectList">
      <div class="projectItem addItem" @click="handleAdd">
        <img src="@assets/images/add.png" alt="" />
        <div>创建新项目</div>
      </div>
      <div
        class="projectItem"
        v-for="(item, index) in list"
        :key="item.projectCode"
      >
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
            <el-dropdown-item @click.native="handleWatchQR(item)"
              >查看小程序码</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <div class="projectIcon">
          <AutoImg :src="item.bookerCover" />
          <div class="edit">
            <div class="imgBox" @click="handleToEdit(item, index)">
              <img src="@assets/images/edit.png" alt="" />
            </div>
          </div>
        </div>
        <div
          class="projectInfo"
          @mouseenter="handlePop(item, true)"
          @mouseleave="handlePop(item, false)"
        >
          <div class="projectName">{{ item.projectName }}</div>
          <div class="projectTime">
            {{ item.addTime | timeToDateHM }}
          </div>
          <Popover
            :show="item.popshow"
            :content="item.projectIntroduce"
            :left="84"
          />
        </div>
      </div>
      <i v-for="v in 8" :key="v" class="zhanwei"></i>
    </div>
    <AddCom
      v-if="showAdd"
      :AddComTitle="AddComTitle"
      @close="showAdd = false"
      @confirm="handleAddConfirm"
      v-model="mediaData"
    />
    <PreviewCom v-if="showImg" @close="showImg = false" :info="imgInfo" />
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>请选择平台</span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisibleChangeApp">APP</el-button> -->
        <el-button type="primary" @click="dialogVisibleChangeMini"
          >小程序</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PageBG from '@/components/PageBG.vue'
import { adminPublicApi as publicApi, searchAPI } from '@/API'
import { loading } from '@/utils/decorator'
import Popover from '@/components/Popover.vue'
import AddCom from './components/AddCom.vue'
import AutoImg from '@/components/AutoImg.vue'
import PreviewCom from './components/Preview.vue'
import { MessageBox } from 'element-ui'
export default {
  name: 'ProjectList',
  components: {
    PageBG,
    Popover,
    AddCom,
    AutoImg,
    PreviewCom
  },
  data() {
    return {
      list: [],
      AddComTitle: '',
      showAdd: false,
      showImg: false,
      imgInfo: {},
      dialogVisible: false,
      mediaData: {},
      index: 0,
      flag: true,
      memberType: sessionStorage.getItem('memberType')
    }
  },
  methods: {
    dialogVisibleChangeApp() {
      this.dialogVisible = false
      if (this.mediaData.projectCode) {
        let list = [...this.list]
        let a = list.splice(this.index, 1)
        list.unshift(a[0])
        this.$store.commit('SET_LIST1', list)
        this.toPage(
          `/ProjectManage/ProjectPicApp/${this.$encode(
            this.mediaData.projectCode
          )}/${this.$encode(this.mediaData.projectName)}`
        )
      } else {
        let b = this.list[this.list.length - 1]
        // 跳转到App上传资源页面
        this.toPage(
          `/ProjectManage/CreateInfoApp/${this.$encode(
            b.projectCode
          )}/${this.$encode(b.projectName)}`
        )
      }
    },
    dialogVisibleChangeMini() {
      this.dialogVisible = false
      console.log('小程序点击', this.list)
      // console.log(this.mediaData.projectCode,"kkmediaDate")
      if (this.mediaData.projectCode) {
        let list = [...this.list]
        let a = list.splice(this.index, 1)
        list.unshift(a[0])
        this.$store.commit('SET_LIST1', list)

        // 单页页面
        // this.toPage(
        //   `/ProjectManage/ProjectPic/${this.$encode(
        //     this.mediaData.projectCode
        //   )}/${this.$encode(this.mediaData.projectName)}`
        // )
        // 创建模型页面
        this.toPage(
          `/ProjectManage/CreateInfoMini/${this.$encode(
            this.mediaData.projectCode
          )}/${this.$encode(this.mediaData.projectName)}`
        )
      } else {
        let b = this.list[this.list.length - 1]
        console.log('222', b)
        // 跳转到上传资源页面
        this.toPage(
          `/ProjectManage/CreateInfoMini/${this.$encode(
            b.projectCode
          )}/${this.$encode(b.projectName)}`
        )
      }
    },
    // 编辑
    handleEdit(item) {
      // console.log(this.AddComTitle《)
      this.AddComTitle = '修改项目'
      // console.log(this.AddComTitle,"xiugai")
      this.showAdd = true
      this.mediaData = item
      this.flag = false
    },
    // 删除
    handleDelete(item) {
      MessageBox(`此操作将永久删除文件, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          searchAPI
            .delProjectByCode({
              // userCode: item.userCode,
              projectCode: item.projectCode
            })
            .then((res) => {
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
    @loading()
    // 查看小程序码
    handleWatchQR(item) {
      this.$message.warning('暂未开放')
      // return publicApi.getUnlimited({
      //     page: this.$store.state.base.miniPath,
      //     scene: item.projectCode,
      //     width: 430
      // }).then(res => {
      //     if(res.code === 1000){
      //         this.imgInfo = {
      //             src: `data:image/png;base64,${res.data}`,
      //             projectName: item.projectName
      //         }
      //         this.showImg = true
      //     }
      // })
    },
    handleToEdit(item, index) {
      this.index = index
      this.mediaData = item
      this.dialogVisible = true
    },
    handleAdd() {
      if (this.memberType == 1 && this.list.length >= 3) {
        this.$message.error('权限不够，无法添加')
      } else {
        this.mediaData = {}
        this.showAdd = true
        this.AddComTitle = '新增项目'
      }
      // this.AddComTitle = '新增项目'
      // console.log(this.AddComTitle,"新增")
      // this.mediaData = {}
      // this.showAdd = true
    },
    handleAddConfirm() {
      // console.log("console.log.res")
      this.fetchList()
      this.showAdd = false
      // list = this.list
      if (this.flag) {
        this.dialogVisible = true
      }
      this.flag = !this.flag
      this.mediaData = {}
    },
    handlePop(item, value) {
      Object.assign(item, {
        popshow: value
      })
    },
    @loading()
    fetchList() {
      searchAPI
        .Search({
          // customerCode: sessionStorage.customerCode
          userCode: sessionStorage.userCode
        })
        .then(async (res) => {
          // console.log("打印res",res)
          if (res.code === 1000) {
            let list = []
            // console.log("查找null",res)
            try {
              if (
                res.data.map((v) => v.bookCoverObsPath + v.bookCoverObsName)
                  .length > 0
              ) {
                console.log('获取数据data', res.data)
                list = await publicApi
                  .getPicUrl(
                    res.data.map((v) => v.bookCoverObsPath + v.bookCoverObsName)
                  )
                  .then((res) => {
                    // console.log("获取图片地址",res)
                    if (res.code === 1000) {
                      return res.data
                    }
                  })
              }
            } catch (error) {
              // console.log("报错err",error)
            }

            // console.log(res.data)    // null
            // 原因foreach不能对null进行 所以可以给[]

            // if(res.data == null){
            //   res.data = []
            // }else{
            res.data.forEach((item) => {
              let imgItem = list.find(
                (v) => v.path === item.bookCoverObsPath + item.bookCoverObsName
              )
              Object.assign(item, {
                bookerCover: imgItem?.url || ''
              })
            })
            this.list = res.data.map((v) => {
              return {
                ...v,
                popshow: false,
                addTime: v.addTime || ''
              }
            })
            sessionStorage.setItem('list1', JSON.stringify(this.list))
            // }
          }
        })
    }
  },
  // 获取表格列表
  activated() {
    this.fetchList()
  }
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
    flex: 0 0 300px;
    width: 300px;
    margin-bottom: 30px;
  }
  .projectItem {
    position: relative;
    cursor: pointer;
    flex: 0 0 300px;
    width: 300px;
    height: 400px;
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
      height: 328px;
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
      height: 72px;
      color: #020202;
      font-size: 14px;
      line-height: 20px;
      padding: 12px 9px;
      box-sizing: border-box;
      background: #f7f8fa;
      .projectName {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .projectTime {
        color: #727272;
        font-size: 12px;
        margin-top: 16px;
      }
    }
  }
}
</style>
