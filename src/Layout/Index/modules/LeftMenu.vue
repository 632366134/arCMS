<template>
  <div class="left-menu" id="leftMenu">
    <el-scrollbar style="height: 100%; overflow-x: hidden">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#324057"
        text-color="#fff"
        ref="menuRef"
        :collapse="isCollapse"
        :default-active="nowRouter"
        v-show="leftMenuShow"
      >
        <!-- <template>
          <el-menu-item
            class="shouqi"
            v-show="!isCollapse"
            @click="aFoldFunction()"
          >
            <i class="el-icon-s-fold"></i>
            <span slot="title">收起侧边栏</span>
          </el-menu-item>
          <el-menu-item
            class="shouqi"
            v-show="isCollapse"
            @click="aFoldFunction(true)"
          >
            <i class="el-icon-s-unfold"></i>
            <span slot="title">展开侧边栏</span>
          </el-menu-item>
        </template> -->
        <Left-scroll-menu
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          v-show="leftMenuType1"
        />
        <!-- 项目封面切换 -->
        <template>
          <div class="leftMenuType2" v-if="leftMenuType2">
            <div
              class="projectItem"
              :class="{ actived: isActivedIndex == index ? true : false }"
              v-for="(item, index) in list1"
              :key="item.basePicCode"
              @click="projectChange(index)"
            >
              <!-- <AutoImg :src="item.bookerCover" /> -->
              <div class="projectName">
                <img src="@assets/images/icon-list.png" alt="" />{{
                  item.projectName
                }}
              </div>
              <img class="cover" :src="item.bookerCover" />
            </div>
          </div>
        </template>
        <!-- 模型切换 -->
        <template>
          <div v-if="leftMenuType3" class="leftMenuType3">
            <div class="current">
              <img src="@assets/images/icon-list.png" alt="" />
              当前单页
            </div>
            <div class="other">
              <img src="@assets/images/icon-list.png" alt="" />其他单页
            </div>
            <div
              class="projectPicItem"
              :class="{ actived: isActivedIndex == index ? true : false }"
              v-for="(item, index) in list2"
              :key="item.mediaCode"
              @click="picChange(index)"
            >
              <!-- <AutoImg :src="item.bookerCover" /> -->
              <img class="cover" :src="item.picObsPath" />
            </div>
          </div>
        </template>
      </el-menu>

      <el-button
        class="el-scroll-icon"
        :icon="iconArrow"
        circle
        @click="leftMenuHide()"
      >
        <div class="is-dark">点击{{ hideShow }}侧边栏</div>
      </el-button>
    </el-scrollbar>
  </div>
</template>

<script>
import LeftScrollMenu from '../components/LeftScrollMenu'
import AutoImg from '@/components/AutoImg.vue'
import { mapState } from 'vuex'
export default {
  name: 'LeftMenu',
  provide() {},
  components: { LeftScrollMenu, AutoImg },
  computed: {
    ...mapState({
      routes: (state) => {
        return state.permission.routes
      },
      isCollapse: (state) => {
        return state.permission.isCollapse
      }
    }),
    nowRouter() {
      return this.$route.meta.showRouter || ''
    },
    list1() {
      let routerData = this.$store.state
      if (routerData.list1.length > 0) {
        let list = [...routerData.list1]
        // console.log('object,list', list)
        sessionStorage.setItem('list1', JSON.stringify(list))
        return list
      }
    },
    list2() {
      let routerData = this.$store.state
      if (routerData.list2.length > 0) {
        let list = [...routerData.list2]
        sessionStorage.setItem('list2', JSON.stringify(list))

        return list
      }
    }
  },
  data() {
    return {
      leftMenuData: [],
      elList: [],
      leftMenuShow: true,
      iconArrow: 'el-icon-arrow-right',
      hideShow: '隐藏',
      leftMenuType1: true,
      leftMenuType2: true,
      leftMenuType3: true,
      isActivedIndex: 0,
      // 测试数据
      index1: null,
      index2: null
      // list2: [
      //   {
      //     id: '1',
      //     img: '//obsa.arsnowslide.com/239208175254331392/239218117780660224.jpg'
      //   },
      //   {
      //     id: '2',
      //     img: '//obsa.arsnowslide.com/239208175254331392/251507873168187392.jpg'
      //   },
      //   {
      //     id: '3',
      //     img: '//obsa.arsnowslide.com/239208175254331392/254066694700883968.png'
      //   },

      //   {
      //     id: '3',
      //     img: '//obsa.arsnowslide.com/239208175254331392/254066694700883968.png'
      //   }
      // ]
    }
  },
  methods: {
    getActiveList(key, type) {
      this.elList = document
        .querySelector('#leftMenu')
        .querySelectorAll('.menuRightIcon')
      this.elList.forEach((item) => {
        let itemKey = item.getAttribute('data-key')
        if (key === itemKey) {
          if (type) {
            if (!item.classList.contains('active')) {
              item.classList.add('active')
            }
          } else {
            item.classList.remove('active')
          }
        } else {
        }
      })
    },
    leftMenuHide() {
      if (this.leftMenuShow) {
        this.iconArrow = 'el-icon-arrow-right'
        document
          .querySelector('.left-menu')
          .querySelector('.el-scroll-icon')
          .classList.add('el-scroll-icon-hide')
        this.hideShow = '显示'
      } else {
        this.iconArrow = 'el-icon-arrow-left'
        document
          .querySelector('.left-menu')
          .querySelector('.el-scroll-icon')
          .classList.remove('el-scroll-icon-hide')
        this.hideShow = '隐藏'
      }
      this.leftMenuShow = !this.leftMenuShow
    },
    handleOpen(key, keyPath) {
      this.getActiveList(key, true)
    },
    handleClose(key, keyPath) {
      this.getActiveList(key, false)
    },
    aFoldFunction(type) {
      this.$store.commit('permission/Set_IsCollapse', !this.isCollapse)
      if (type) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.getActiveList(this.$refs.menuRef.openedMenus[0] || '', true)
          }, 400)
        })
      }
    },
    getNowRouterSubMenu() {},
    projectChange(index) {
      if (index === 0) return
      let a = this.list1[index]

      this.$confirm('请选择创建类型', '提示', {
        confirmButtonText: '小程序版',
        cancelButtonText: 'App版',
        distinguishCancelAndClose: true,
        closeOnClickModal: true
      })
        .then(() => {
          this.list1.splice(index, 1)
          this.list1.unshift(a)
          this.$store.commit('SET_LIST1', this.list1)
          this.toReplacePath(
            `/ProjectManage/ProjectPic/${this.$encode(
              a.projectCode
            )}/${this.$encode(a.projectName)}`
          )
        })
        .catch((e) => {
          if (e === 'cancel') {
            this.list1.splice(index, 1)
            this.list1.unshift(a)
            this.$store.commit('SET_LIST1', this.list1)

            this.toReplacePath(
              `/ProjectManage/ProjectPicApp/${this.$encode(
                a.projectCode
              )}/${this.$encode(a.projectName)}`
            )
          }
        })
    },
    picChange(index) {
      if (index === 0) return
      let a = this.list2[index]
      console.log(a, index)

      const { projectCode, projectName } = this.list1[0]
      this.$nextTick(() => {
        if (this.nowRouter.indexOf('/ProjectPicInfoApp') === -1) {
          this.list2.splice(index, 1)
          this.list2.unshift(a)
          this.toReplacePath(
            `${this.nowRouter}/${this.$encode(projectCode)}/${this.$encode(
              a.basePicCode
            )}/${this.$encode(projectName)}`
          )
        } else {
          this.list2.splice(index, 1)
          this.list2.unshift(a)
          this.toReplacePath(
            `${this.nowRouter}/${this.$encode(projectCode)}/${this.$encode(
              projectName
            )}/${this.$encode(JSON.stringify(a))}`
          )
        }
      })
    }
  },

  watch: {
    list1: {
      handler() {
        if (this.list1) {
          // console.log('changelist1')
          sessionStorage.setItem('list1', JSON.stringify(this.list1))
        }
      }
    },
    list2: {
      handler() {
        if (this.list2) {
          sessionStorage.setItem('list2', JSON.stringify(this.list2))
        }
      }
    },
    $route: {
      immediate: true,
      async handler() {
        var url = document.location.href
        var type1 = 'ProjectList/'
        var type2 = 'ProjectPic/'
        var type22 = 'ProjectPicApp/'
        var type3 = 'ProjectPicInfo/'
        var type33 = 'ProjectPicInfoApp/'
        this.leftMenuType1 = true
        this.leftMenuType2 = true
        this.leftMenuType3 = true
        if (url.indexOf(type2) !== -1 || url.indexOf(type22) !== -1) {
          this.leftMenuType1 = false
          this.leftMenuType3 = false
        } else if (url.indexOf(type3) !== -1 || url.indexOf(type33) !== -1) {
          this.leftMenuType1 = false
          this.leftMenuType2 = false
        } else {
          sessionStorage.removeItem('list1')
          sessionStorage.removeItem('list2')
          this.leftMenuType2 = false
          this.leftMenuType3 = false
        }
      }
    }
  },
  mounted() {
    let list1 = JSON.parse(sessionStorage.getItem('list1'))
    let list2 = sessionStorage.getItem('list2')
    if (list2) {
      this.$store.commit('SET_LIST2', JSON.parse(list2))
    }
    this.$store.commit('SET_LIST1', list1)

    this.leftMenuData = this.$router.options.routes
    this.elList = document
      .querySelector('#leftMenu')
      .querySelectorAll('.menuRightIcon')
    this.$nextTick(() => {
      this.getActiveList(this.$refs.menuRef.openedMenus[0] || '', true)
    })
  }
}
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  box-sizing: border-box;
  width: 248px !important;
}

.left-menu .el-menu-vertical-demo {
  min-height: 100%;
  padding: 20px 22px;
}

.left-menu .el-submenu .el-menu-item {
  padding: 0 20px 0 53px !important;
}

.left-menu {
  float: left;
  height: calc(100% - 65px);
}
::v-deep .el-menu-item:nth-of-type(1) .el-icon-house {
  width: 24px;
  height: 24px;
  background: url(~@assets/images/icon-home1.png) no-repeat;
  background-size: contain;
  &:before {
    content: '';
  }
}
::v-deep .el-menu-item:nth-of-type(1).is-active .el-icon-house {
  background: url(~@assets/images/icon-home2.png) no-repeat;
  background-size: contain;
}
.left-menu .el-menu-vertical-demo {
  margin-right: -1px;
}
::v-deep .el-scrollbar .el-scrollbar__view {
  height: 100%;
}
::v-deep .el-scrollbar .el-scroll-icon {
  width: 20px;
  height: 40px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0px 10px 10px 0px;
  position: fixed;
  left: 247px;
  top: 50%;
  z-index: 100;
  padding: 0;
  .is-dark {
    display: none;
    position: absolute;
    left: calc(100% + 13px);
    top: 3px;
    border-radius: 4px;
    padding: 10px;
    z-index: 200;
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
      left: -6px;
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
::v-deep .el-scrollbar .el-scroll-icon-hide {
  left: 20px;
  width: 40px;
  border-radius: 20px;
}

::v-deep .el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
  scrollbar-width: none;
}
::v-deep .el-scrollbar__bar.is-vertical {
  width: 0;
}
::v-deep .el-scrollbar__bar.is-horizontal {
  height: 0 !important;
}
::v-deep .el-scrollbar__wrap {
  overflow: auto;
  margin-right: 0 !important;
  margin-bottom: 0 !important;
  scrollbar-width: none;
}
::v-deep ::-webkit-scrollbar {
  display: none;
}

::v-deep {
  .el-menu {
    background-color: #f9fdff !important;
    font-size: 15px;

    & > div:last-child .el-submenu:after {
      display: none;
    }
  }
  .el-submenu__title {
    background-color: #f9fdff !important;
    color: #134b8e !important;
    font-size: 15px;
  }
  .el-menu-item {
    background-color: #f9fdff !important;
    color: #134b8e !important;
    font-size: 15px;
    margin: 0 0 5px;
    border-radius: 10px;
    height: 42px;
    line-height: 42px;
    &:hover {
      color: #020202 !important;
      background-color: #f5f4f5 !important;
    }
    .gray {
      display: inline-block;
    }
    .white {
      display: none;
    }
    &.is-active {
      background-color: #829fff !important;
      color: #fff !important;
      border-radius: 10px;
      .white {
        display: inline-block;
      }
      .gray {
        display: none;
      }
    }
  }
  .el-submenu:after {
    content: '';
    display: block;
    border-bottom: 1px solid #eee;
    width: calc(100% - 20px);
    margin-left: 10px;
    box-sizing: border-box;
  }
}
.shouqi {
  color: #134b8e !important;
  height: 50px;
  &.is-active {
    background-color: #f9fdff !important;
    color: #134b8e !important;
  }
  .shouqiIcon {
    margin-right: 12px;
  }
}
// 样式二
.leftMenuType2 {
  .projectItem {
    padding: 0 11px;
    border-radius: 10px;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover:not(.actived) {
      background-color: #f5f4f5;
    }

    .projectName {
      line-height: 42px;
      font-size: 14px;
      color: #020202;
      img {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-left: 17px;
        margin-right: 9px;
        vertical-align: middle;
      }
    }
    .cover {
      display: none;
      width: 182px;
      height: 200px;
      border-radius: 10px;
    }
  }
  .actived {
    padding: 11px 11px 20px;
    background-color: #eaeaec;
    .cover {
      display: block;
    }
  }
}
.leftMenuType3 {
  position: relative;
  .current,
  .other {
    position: absolute;
    line-height: 42px;
    top: 11px;
    left: 11px;
    img {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin-left: 17px;
      margin-right: 9px;
      vertical-align: middle;
    }
  }
  .other {
    top: 282px;
  }
  .projectPicItem {
    width: 182px;
    height: 200px;
    padding: 0 11px;
    margin-bottom: 20px;
    cursor: pointer;
    .cover {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 10px;
    }
  }
  .actived {
    padding: 53px 11px 20px;
    background-color: #eaeaec;
    margin-bottom: 82px;
    border-radius: 10px;
    .cover {
      display: block;
    }
  }
}
</style>
