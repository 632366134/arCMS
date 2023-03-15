<template>
  <div>
    <orgTree
      :orgData="orgData"
      @handleOrgSearchClick="handleOrgSearchClick"
      @handleOrgAddClick="handleOrgAddClick"
      @handleOrgDeleteClick="handleOrgDeleteClick"
      @handleBottomClick="handleBottomClick"
      @handleBtnClick="handleBtnClick"
    >
      <!-- <div slot-scope="orgItem" slot="btn">
        <img src="/static/images/icon/setting_white.png" />
      </div> -->
      <!-- <div slot-scope="orgItem" slot="menu">菜单</div> -->
      <!-- <div slot-scope="orgItem" slot="footer" @click="handleItem(orgItem)">
        调整权限
      </div> -->
      <!-- <div slot-scope="{ label }">{{ label }}</div> -->
    </orgTree>
  </div>
</template>

<script>
import orgTree from "./orgTree";
export default {
  name: "tre",
  components: {
    orgTree,
  },
  data() {
    return {
      orgData: {
        label: "第一层内容",
        orgId: 0,
        hasPermission: true,
        children: [
          {
            label: "第二层内容",
            orgId: 1,
            hasPermission: false,
            children: [
              {
                label: "第二层内容",
                orgId: 4,
                hasPermission: true,
                children: [],
              },
            ],
          },
          {
            label: "第二层内容",
            orgId: 2,
            hasPermission: true,
            children: [],
          },
          {
            label: "第二层内容",
            orgId: 3,
            hasPermission: true,
            children: [],
          },
        ],
      },
    };
  },
  created() {
  },
  methods: {
    handleOrgSearchClick(item) {
      this.$message.success("查看" + item.label);
    },
    handleOrgAddClick(item) {
      if (item.children) {
        item.children.push({ label: "加的", orgId: new Date().getTime() });
      } else {
        Object.assign(item, {
          children: [{ label: "加的", orgId: new Date().getTime() }],
        });
      }
    },
    handleOrgDeleteClick(item) {
      this.$message.success("删除" + item.label);
    },
    handleBottomClick(item) {
      this.$message.success("调整/设置");
    },
    handleBtnClick(item) {
    },
  },
};
</script>

<style lang="scss" scoped>
</style>