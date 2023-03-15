<template>
  <div class="bgc">
    <div class="topbar">
      <img class="logostyle" src="@/assets/arlogo.png" />
      <h1 class="label">AR科技</h1>
    </div>
    <div class="pageLogin">
      <div class="content">
        <div class="formTitle">欢迎注册AR宣传册</div>
        <el-form>
          <el-tooltip
            class="item"
            effect="dark"
            content="用户名不能含中文,长度必须在6到20个字符之间"
            placement="bottom"
          >
            <el-form-item
              label="账户用户名"
              :label-width="formLabelWidth"
              required
              ><el-input
                v-model.trim="form.account"
                style="width: 300px"
                placeholder="请输入账户用户名"
              ></el-input
            ></el-form-item>
          </el-tooltip>
          <el-form-item label="手机号" :label-width="formLabelWidth" required
            ><el-input
              v-model.trim="form.tel"
              style="width: 300px"
              placeholder="请输入手机号"
            ></el-input
          ></el-form-item>
          <el-form-item label="联系人姓名" :label-width="formLabelWidth">
            <el-input
              v-model="form.linkName"
              :label-width="formLabelWidth"
              style="width: 300px"
              placeholder="请输入联系人姓名"
            ></el-input
          ></el-form-item>
          <!-- <el-tooltip class="item" effect="dark" content="Right Top 提示文字" placement="right-start"> -->
          <el-form-item label="公司名称" :label-width="formLabelWidth" required>
            <el-input
              v-model="form.companyName"
              :label-width="formLabelWidth"
              style="width: 300px"
              placeholder="请输入公司名称"
            ></el-input
          ></el-form-item>
          <!-- </el-tooltip> -->

          <el-form-item
            label="联系人邮件"
            :label-width="formLabelWidth"
            required
          >
            <el-input
              v-model="form.linkEmail"
              :label-width="formLabelWidth"
              style="width: 300px"
              placeholder="请输入联系人邮件"
            ></el-input
          ></el-form-item>
          <el-tooltip
            class="item"
            effect="dark"
            content="密码可由数字、大写字母、小写字母组成，但至少包含其中2种且长度必须在8到20个字符之间"
            placement="bottom"
          >
            <el-form-item
              label="请设置密码"
              :label-width="formLabelWidth"
              required
              ><el-input
                type="password"
                v-model.trim="form.pw"
                style="width: 300px"
                placeholder="请设置密码"
                show-password
              ></el-input
            ></el-form-item>
          </el-tooltip>
          <el-form-item
            label="请再次输入密码"
            :label-width="formLabelWidth"
            required
          >
            <el-input
              type="password"
              v-model.trim="form.pw1"
              style="width: 300px"
              placeholder="请再次输入密码"
            ></el-input
          ></el-form-item>
          <div class="footer-btn">
            <el-button type="primary" style="width: 100px" @click="regis()"
              >提交</el-button
            >
          </div>
        </el-form>
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
import { registAPI } from '@/API'
export default {
  data() {
    return {
      form: {
        account: '',
        tel: '',
        pw: '',
        pw1: '',
        companyName: '',
        linkEmail: '',
        linkName: ''
      },
      formLabelWidth: '130px'
    }
  },
  methods: {
    func() {
      this.toPage('/Login')
    },
    regis(form) {
      if (
        this.form.account == '' ||
        this.form.account == undefined ||
        this.form.account == null
      ) {
        this.$message({
          message: '请输入账户用户名',
          type: 'warning'
        })
      } else if (
        this.form.companyName == '' ||
        this.form.companyName == undefined ||
        this.form.companyName == null
      ) {
        this.$message({ message: '请输入公司名称', type: 'warning' })
        // } else if (
        //       this.form.linkName == '' ||
        //       this.form.linkName == undefined ||
        //       this.form.linkName == null
        //   ) {
        //       this.$message({ message: '请输入联系人姓名', type: 'warning' })
      } else if (
        this.form.pw == '' ||
        this.form.pw == undefined ||
        this.form.pw == null
      ) {
        this.$message({ message: '请输入密码', type: 'warning' })
      } else if (this.form.pw == this.form.pw1) {
        registAPI
          .Regist({
            userAccount: this.form.account, // 用户的账户名*（后台登录名）
            password: this.form.pw, //*
            email: this.form.linkEmail, //*
            userName: this.form.linkName, //联系人是昵称
            companyName: this.form.companyName, // 公司名称*
            mobile: this.form.tel //*
          })
          .then((res) => {
            if (res.code == 1000) {
              this.func()
              console.log(res.data)
              this.$message({
                message: '注册成功',
                type: 'success'
              })
            }
          })
      } else {
        this.$message({
          message: '密码输入不一致',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bgc {
  background: #f3f7f9;
  min-height: 880px;
}
.topbar {
  height: 80px;
  width: 90%;
  box-shadow: 0px 5px 5px 0px rgba(0, 15, 106, 0.02);
  background: #ffffff;
  padding-left: 10%;
  .logostyle {
    height: 39px;
    width: 34px;

    padding-top: 21px;
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
}
.pageLogin {
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  max-width: 800px;
  height: 100%;
  align-items: center;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  .content {
    // box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.16);
    padding: 50px 80px;
    border-radius: 10px;
    // border: 2px solid #efefef;
    background: #ffffff;
    .formTitle {
      margin-bottom: 30px;
      text-align: center;
      color: #829fff;
      font-size: 24px;
      font-weight: 500;
    }
  }
  .footer-btn {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  // margin-top: 100px;
}
.beian {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  text-align: center;
  background: #f3f7f9;
  .police {
    width: 100%;
    height: 13px;
    font-size: 12px;
    background: #f3f7f9;
    font-family: PingFang SC;
    font-weight: 400;
    color: #020202;
    line-height: 48px;
  }
}
</style>
