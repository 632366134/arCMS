<template>
  <div class="menu" @mouseleave="handleMenuLeave">
    <el-scrollbar
      @wheel.native.prevent="handleScroll"
      :vertical="false"
      class="navigationMain clearfix"
      ref="scrollContainer"
    >
      <div
        :style="{
          width: lineInfo.width + 'px',
          left: lineInfo.left + 'px',
        }"
        class="line"
      ></div>
      <!-- <div
        v-for="(item, index) in menuList"
        :key="index"
        :class="['menuItem', showIndex === index ? 'active' : '']"
        @click="handleChangeMenu(item, index)"
        ref="menuItemRef"
        @mouseenter="handleMenuEnter"
      >
        <div>{{ item.name }}</div>
      </div> -->
    </el-scrollbar>
  </div>
</template>

<script>

export default {
  name: "TopMenu",
  data() {
    let menuList = [];
    menuList = this.$store.state.base.topMenuList;
    if (sessionStorage.permission !== "0") {
      if (sessionStorage.permissionOldMode) {
        let permissionOldMode = JSON.parse(sessionStorage.permissionOldMode);
        menuList = menuList.filter((item1) => {
          return permissionOldMode.some((item2) => {
            return item1.permissionCode == item2.permissionCode;
          });
        });
      }
    }

    return {
      menuList,
      showIndex: "",
      lineInfo: {
        width: 0,
        left: 0,
      },
    };
  },
  methods: {
    handleMenuEnter(e) {
      this.calcLine(e.target);
    },
    handleMenuLeave() {
      this.calcLine();
    },
    calcLine(el) {
      let showEl =
        el ||
        (this.$refs.menuItemRef && this.$refs.menuItemRef[this.showIndex]);
      if (!showEl) {
        this.lineInfo = {
          width: 0,
          left: 0,
        };
        return;
      }
      this.lineInfo = {
        width: showEl.offsetWidth,
        left:
          showEl.offsetLeft - this.$refs.scrollContainer.$refs.wrap.scrollLeft,
      };
    },
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft - eventDelta / 4;
    },
    handleChangeMenu(item, index) {
      if (index === this.showIndex) {
        return;
      }
      if (sessionStorage.permission !== "0") {
        if (sessionStorage.permissionOldMode) {
          let permissionOldMode = JSON.parse(sessionStorage.permissionOldMode);
          if (
            !permissionOldMode.some(
              (v) => v.permissionCode === item.permissionCode
            )
          ) {
            this.$message.warning("您暂无权限使用该功能");
            return;
          }
        } else {
          return;
        }
      }
      sessionStorage.nowMenuPermission = item.permissionCode;
      this.showIndex = index;
      this.calcLine();
      this.$store.dispatch("permission/getRoutes").then(() => {}); //重置路由
      // this.$store.commit('permission/Reset_CACHLIST') //重置缓存
      // this.$store.commit('bar/Reset_BarList') //重置顶部标签lan
      if (this.$route.name !== "Home") {
        this.$router.push("/Home");
      }
    },
  },
  created() {
    // let menuList = [],
    let showIndex = "",
      menuList = this.menuList;
    if (Array.isArray(menuList)) {
      menuList.forEach((v, i) => {
        if (v.permissionCode == sessionStorage.nowMenuPermission) {
          showIndex = i;
        }
      });
    }
    this.showIndex = showIndex;
    this.$nextTick(() => {
      this.calcLine();
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~@assets/css/navigationBar.scss";
.menu {
  position: relative;
  width: 100%;
  height: 100%;
}
.navigationMain {
  position: relative;
  box-shadow: none;
  margin-left: 0px;
  height: 64px;
  padding: 0;
  ::v-deep .el-scrollbar__view {
    height: 100%;
  }
  .menuItem {
    position: relative;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    color: #fff;
    // font-size: 15px;
    font-size: var(--smallTitleSize);

    height: 100%;
    box-sizing: border-box;
    padding: 32px 45px 0;
    img {
      width: 15px;
      height: 15px;
      margin-bottom: 4px;
    }
    &:hover {
      background: #074ea5;
    }
    &.active :after {
    }
  }
}
.line {
  // display: block;
  // height: 6px;
  // position: absolute;
  // bottom: 0;
  // background: #fd7167;
  // z-index: 10;
  // transition: left 0.2s linear;
}
</style>