
<template>
  <div class="custom_org" @click.prevent="showOrgId = ''">
    <vue2-org-tree
      name="test"
      :data="data"
      :horizontal="horizontal"
      :collapsable="collapsable"
      :render-content="renderContent"
      @on-expand="onExpand"
    />
  </div>
</template>
<script>
import Vue2OrgTree from "vue2-org-tree";
// import CustomIcon from "../CustomIcon";
export default {
  name: "zhiwei",
  components: {
    Vue2OrgTree,
  },
  props: {
    orgData: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      data: {},
      horizontal: false,
      collapsable: false,
      showOrgId: "",
    };
  },
  methods: {
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function (item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    },
    renderContent(h, data) {
      const { showOrgId } = this;
      const { btn, menu, footer, default: slotDefault } = this.$scopedSlots;
      const { hasPermission, label, orgId } = data;
      const active = showOrgId === orgId;

      const defaultMenu = (
        <div class="org_item_default_menu">
          <el-button
            type="primary"
            onClick={(e) => {
              this.handleOrgSearchClick(data, e);
            }}
          >
            <CustomIcon size="12px" color="#FFFFFF" icon="search_2" />
          </el-button>
          <el-button
            type="primary"
            onClick={(e) => {
              this.handleOrgAddClick(data, e);
            }}
          >
            <CustomIcon size="12px" color="#FFFFFF" icon="add_2" />
          </el-button>
          <el-button
            type="primary"
            onClick={(e) => {
              this.handleOrgDeleteClick(data, e);
            }}
          >
            <CustomIcon size="12px" color="#FFFFFF" icon="delete_2" />
          </el-button>
        </div>
      );

      return (
        <div
          class="org_item"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div class="org_item_top">
            <div class="org_item_top_main">
              {slotDefault ? slotDefault(data) : label}
            </div>
          </div>
          <div class="org_item_bottom">
            <div
              onClick={(e) => {
                this.handleBottomClick(data, e);
              }}
            >
              {footer ? (
                footer(data)
              ) : hasPermission ? (
                "调整权限"
              ) : (
                <div class="org_item_bottom_noPermission">
                  <CustomIcon size="12px" color="#FD7167" icon="warning" />
                  <i class="noPermission_text">设置权限</i>
                </div>
              )}
            </div>
          </div>
          <div
            class={["org_item_btn", active ? "active" : ""]}
            onClick={(e) => {
              this.handleBtnClick(data, e);
            }}
          >
            {btn ? (
              btn(data)
            ) : active ? (
              <CustomIcon size="14px" icon="setting" />
            ) : (
              <CustomIcon size="14px" color="#FFFFFF" icon="setting" />
            )}
          </div>
          {active ? (
            <div class="org_item_menu">{menu ? menu(data) : defaultMenu}</div>
          ) : (
            ""
          )}
        </div>
      );
    },
    // 点击查看按钮
    handleOrgSearchClick(item, e) {
      this.$emit("handleOrgSearchClick", item);
      e.stopPropagation();
    },
    // 添加按钮
    handleOrgAddClick(item, e) {
      this.$emit("handleOrgAddClick", item);
      e.stopPropagation();
    },
    // 删除按钮
    handleOrgDeleteClick(item, e) {
      this.$emit("handleOrgDeleteClick", item);
      e.stopPropagation();
    },
    // 调整权限/设置权限
    handleBottomClick(item, e) {
      this.$emit("handleBottomClick", item);
      e.stopPropagation();
    },
    // 设置按钮
    handleBtnClick(item, e) {
      this.showOrgId = item.orgId;
      this.$emit("handleOrgBtnClick", item);
      e.stopPropagation();
    },
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
      // e.stopPropagation()
    },
    collapse(list) {
      var _this = this;
      list.forEach(function (child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
  },
  created() {
    this.data = this.orgData;
  },
};
</script>
<style lang="scss" scoped>
.custom_org {
  ::v-deep {
    .org_item {
      position: relative;
      margin: -10px -15px;
      border: 1px solid #00baff;
      width: 150px;
      .org_item_top {
        padding: 19px 24px 0;
        box-sizing: border-box;
        color: #1c1c1c;
        // font-size: 15px;
font-size: var(--samllTitleSize);

        .org_item_top_main {
          min-height: 40px;
        }
      }
      .org_item_bottom {
        cursor: pointer;
        color: #00baff;
        // font-size: 12px;
        font-size: var(--fuzhuSize);

        background: #ecfaff;
        line-height: 33px;
        width: 100%;
        border-top: 1px solid rgba($color: #00ccff, $alpha: 0.2);
        .org_item_bottom_noPermission {
          color: #fd7167;
          display: flex;
          justify-content: center;
          align-items: center;
          .noPermission_text {
            margin-left: 3px;
          }
        }
      }
      .org_item_btn {
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
        clip-path: polygon(0px 0px, 38px 0px, 38px 38px);
        position: absolute;
        width: 38px;
        height: 38px;
        background: #00baff;
        right: 0;
        top: 0;
        padding-right: 5px;
        padding-top: 4px;
        box-sizing: border-box;
        z-index: 10;
        &.active {
          background: #ecfaff;
        }
      }
      .org_item_menu {
        position: absolute;
        right: -22px;
        width: 20px;
        top: -1px;
        z-index: 11;
        .org_item_default_menu {
          background: #fff;
          .el-button {
            padding: 0;
            width: 20px;
            height: 20px;
            margin-left: 0;
            margin-bottom: 1px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
  ::v-deep .org-tree-node-label-inner {
    box-shadow: none;
  }
  ::v-deep {
    .org-tree-node.is-leaf,
    .org-tree-node.collapsed {
      padding-left: 45px;
      padding-right: 45px;
    }
  }
  ::v-deep {
    .org-tree-node:not(:first-child):before,
    .org-tree-node:not(:last-child):after {
      border-color: #134b8e;
    }
  }
  ::v-deep {
    .org-tree-node:not(:first-child):before,
    .org-tree-node:not(:last-child):after {
      border-color: #134b8e;
    }
  }
  ::v-deep {
    .org-tree-node:after,
    .org-tree-node-children:before {
      border-left-color: #134b8e;
    }
  }
}
</style>