<template>
  <div class="page">
    <div class="topbar">
      <img class="logostyle" src="@/assets/arlogo.png" />
      <h1 class="label">AR科技</h1>
    </div>
    <div class="reso">
      <img class="post" src="@/assets/poster.jpg" />
      <div class="info">
        <div class="qr" @click="handleSwitch">
          <img v-if="qrr === true" src="@/assets/qr.png" />
          <img v-if="qrr === false" src="@/assets/pcicon.png" />
        </div>
        <div class="help">
          <img v-if="qrr === true" src="@/assets/scan.png" />
          <img v-if="qrr === false" src="@/assets/type.png" />
        </div>
        <QRlogin v-if="qrr == false"></QRlogin>
        <el-tabs
          v-if="qrr == true"
          v-model="activeName"
          class="button"
          @tab-click="handleClick"
        >
          <el-tab-pane label="密码登录" name="first">
            <child1 v-if="isChildUpdate1"></child1
          ></el-tab-pane>
          <el-tab-pane label="短信登录" name="second">
            <child2 v-if="isChildUpdate2"></child2
          ></el-tab-pane>
        </el-tabs>

        <!-- <Accountlog2></Accountlog2> -->
      </div>
    </div>

    <div class="beian">
      <h3 class="police">
        Copyright© 2021-2023 无锡英领之途信息科技有限公司版权所有
        <a href="https://beian.miit.gov.cn" target="_blank"
          >苏ICP备18046040号-4</a
        >
      </h3>
    </div>
  </div>
</template>

<script>
import Accountlog from './components/Accountlog.vue'
import Accountlog2 from './components/Accountlog2.vue'
import QRlogin from './components/QRlogin.vue'
export default {
  components: {
    child1: Accountlog,
    child2: Accountlog2,
    QRlogin
  },
  data() {
    return {
      activeName: 'first',
      isChildUpdate1: true,
      isChildUpdate2: false,
      qrr: true
    }
  },

  methods: {
    handleClick(tab) {
      if (tab.name == 'first') {
        this.isChildUpdate1 = true
        this.isChildUpdate2 = false
      } else if (tab.name == 'second') {
        this.isChildUpdate1 = false
        this.isChildUpdate2 = true
      }
    },
    handleSwitch() {
      this.qrr = !this.qrr
      console.log(this.qrr)
    }
  }
}
</script>
<style lang="scss" >
.page {
  width: 100%;
  height: 100%;
  min-height: 900px;
  background-color: #f3f7f9;
  .logostyle {
    height: 39px;
    width: 34px;

    padding-top: 21px;
  }

  .topbar {
    height: 80px;
    width: 90%;
    box-shadow: 0px 5px 5px 0px rgba(0, 15, 106, 0.02);
    background: #ffffff;
    padding-left: 10%;
  }
  .reso {
    height: 80%;
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 1000px;
  }

  .el-checkbox {
    color: #8f8e8e;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #8f8e8e;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #829fff;
  }

  .label {
    margin-top: -53px;
    width: 69px;
    height: 19px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #020202;
    line-height: 60px;

    padding-left: 50px;
  }

  .post {
    display: inline-block;
    width: 400px;
    height: 620px;

    border-radius: 10px 0px 0px 10px;
  }
  .info {
    //margin-left: 400px;
    display: inline-block;
    overflow: hidden;
    width: 600px;
    height: 620px;
    background: #ffffff;
    border-radius: 0px 10px 10px 0px;
  }
  .help {
    text-align: right;
    position: relative;
    border: transparent;
    top: 20px;
  }
  .wxlabel {
    line-height: 30px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #676666;
  }
  .qr {
    float: right;
    padding: 50px;
    cursor: pointer;
    :hover {
    }
  }
  .el-button {
    border: transparent;
  }
  .button {
    //display: flex;
    margin-top: 125px;
    width: 359px;
    margin-left: 120px;
  }
  .el-tabs__active-bar {
    background-color: #829fff;
  }
  .el-input__inner {
    height: 46px;
    height: 46px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding-left: 40px;
    background-color: transparent;
  }
  .el-input--primary:hover {
    border-color: transparent;
  }

  .beian {
    margin-left: auto;
    margin-right: auto;
    width: 1200px;
    text-align: center;
  }
  .police {
    width: 100%;
    height: 13px;
    font-size: 12px;

    font-family: PingFang SC;
    font-weight: 400;
    color: #020202;
    line-height: 48px;
  }
}
</style>
