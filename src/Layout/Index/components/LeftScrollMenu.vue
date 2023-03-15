<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneRoute">
      <router-link :to="item.path">
        <el-menu-item
          :index="oneRoute.path"
          :class="!oneRoute.meta.icon ? 'pal' : ''"
        >
          <div class="titleCenter">
            <i v-if="oneRoute.meta.icon" :class="oneRoute.meta.icon"></i>
            <span slot="title">{{
              oneRoute.meta ? oneRoute.meta.title : ''
            }}</span>
          </div>
        </el-menu-item>
      </router-link>
    </template>
    <template v-else>
      <el-submenu :index="item.path" :class="[isCollapse ? 'hidden' : '']">
        <template slot="title">
          <div class="titleCenter">
            <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta ? item.meta.title : '' }}</span>
          </div>
        </template>
        <Left-scroll-menu
          v-for="child in item.children"
          :item="child"
          :key="child.path"
          :base-path="child.path"
        />
      </el-submenu>
    </template>
    <!-- <template>
      <div class="smalltext">图标：
      </div>
    </template>
    <template>
      <div class="smalltext">悬浮效果：
      </div>
    </template> -->
  </div>
</template>

<script>
// import { Fragment } from "vue-fragment";
import { mapState } from 'vuex'
export default {
  name: 'LeftScrollMenu',
  props: {
    item: Object,
    basePath: String
  },
  watch: {},
  // components: { Fragment },
  computed: {
    ...mapState({
      isCollapse: (state) => {
        return state.permission.isCollapse
      }
    }),
    hasOneRoute() {
      if (this.item.meta && this.item.meta.isOne) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.oneRoute = {
          ...this.item.children[0]
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.oneRoute.meta.icon = this.item.children[0].meta.icon
        return true
      } else if (!this.item.children) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.oneRoute = {
          ...this.item
        }
        return true
      }
      return false
    }
  },
  data() {
    return {
      oneRoute: {}
    }
  },
  methods: {
    checkChild(list) {
      let num = 0
      if (list.children) {
        list.children.map((v) => {
          if (v.hidden) {
            num++
          }
        })
      }
      if (list.children && num == list.children.length - 1) {
        // 有多个子菜单要显示
        return true
      } else {
        return false
      }
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.titleCenter {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.menuRightIcon {
  position: absolute;
  top: 50%;
  right: 20px;
  margin-top: -7px;
  transition: transform 0.3s;
  transform-origin: center center;
  &.active {
    transform: rotate(180deg);
  }
}
.menuIcon {
  margin-right: 12px;
}
.hidden {
  ::v-deep span {
    display: none;
  }
  ::v-deep .el-submenu__icon-arrow {
    display: none;
  }
}

.smalltext {
  //   width: 48px;
  // height: 19px;
  font-size: 20px;
  // font-family: PingFang SC;
  font-weight: 500;
  color: #010101;
  line-height: 60px;
  margin-left: 10px;
}
</style>