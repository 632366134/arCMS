<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb" mode="out-in">
        <template v-for="(item, index) in list">
          <el-breadcrumb-item v-if="index == list.length - 1" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
          <el-breadcrumb-item v-else :key="item.path">
            <span @click.stop="handleLink(item)">{{item.meta.title}}</span>
          </el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  watch: {
    $route(router) {
      this.addList();
    }
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    handleLink(item) {
      if (
        item.path !== this.$route.path &&
        item.redirect !== this.$route.path
      ) {
        this.$router.push(item.path);
      }
    },
    addList() {
      let matched = this.$route.matched.filter(v => {
        return (
          // v.path !== "/HomePage" &&
          // v.path !== "/Home" &&
          v.meta &&
          Object.keys(v.meta).length > 0
        );
      });
      let homePage = { path: "/Home", name: "/Home", meta: { title: "Home" } };
      this.list = [...matched];
    },
    checkOne() {
      return this.$route;
    }
  },
  created() {
    this.$nextTick(() => {
      this.addList();
    });
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  height: 48px;
  line-height: 48px;
  padding: 13px 33px 11px;
  box-sizing: border-box;
}
</style>