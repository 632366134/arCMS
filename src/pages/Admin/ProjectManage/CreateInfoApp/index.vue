<template>
<!-- APP -->
  <div class="container">
    <div class="leftMain">
      <!-- <PageBG /> -->
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/ProjectManage/ProjectList' }">
            项目管理
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="prevPage">{{
            projectName
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>App上传资源</el-breadcrumb-item>
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
import { adminPublicApi as publicApi } from '@/API'
export default {
  name: 'CreateInfoApp1',
  provide() {
    return {
      mediaData: this.mediaData
    }
  },
  components: {
    PageBG,
    MediaCom
  },
  data() {
    return {
      prevPage: {},
      projectName: '',
      projectCode: '',
      mediaData: {},
      step: 1,
      isShow: false
    }
  },
  methods: {},
  async created() {
    const { projectCode, projectName, mediaData } = this.$route.params
    this.projectCode = this.$decode(projectCode)
    console.log("111",this.projectCode)
    this.projectName = this.$decode(projectName)
    console.log(mediaData)
    if (typeof mediaData !== 'undefined') {
      this.mediaData = JSON.parse(this.$decode(mediaData))
    }
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
