<template>
  <div class="headerBg">
    <div class="header">
      <div class="left">
        <span>你好，欢迎来到良著</span>
        <span class="spanCenter"
          ><img src="~@/assets/images/wangtu/map.png"
        /></span>
        <span class="spanRight"
          >全国<i class="el-icon-arrow-down iconLeft"></i
        ></span>
      </div>
      <div class="right">
        <span>请登录</span>
        <span>|</span>
        <span @click="toLogon">注册</span>
        <span>网站导航</span>
        <span>服务热线：400-888-1234</span>
        <span @click="toLogin" class="lastSpan">知产联盟</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderTop",
  data() {
    return {};
  },
  methods: {
    toLogon() {
      window.open("#/logon");
    },
    toLogin() {
      window.open("#/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.headerBg {
  background: #eee;
  width: 100%;
}
.header {
  width: 1150px;
  height: 50px;
  // font-size: 15px;
font-size: var(--smallTitleSize);

  z-index: 999;
  color: #1c1c1c;
  margin: auto;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eee;
  .left {
    display: flex;
    .spanCenter {
      margin: 0 10px 0 18px;
      display: flex;
      align-items: center;
      img {
        height: 17px;
      }
    }
    .spanRight {
      font-weight: bold;
    }
    .iconLeft {
      margin-left: 8px;
    }
    .yanse {
      color: #00baff;
    }
  }
  .right {
    span {
      margin-left: 15px;
    }
    .lastSpan {
      color: #fd7167;
    }
  }
}
</style>