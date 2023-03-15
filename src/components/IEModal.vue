<template>
  <el-dialog
    top="16%"
    title="提示"
    :visible.sync="dialogVisible"
    width="700px"
    :before-close="handleClose"
  >
    <div class="modalMain">
      <!-- <img src="@static/images/jisuTips.png" alt="" /> -->
    </div>
    <slot name="footer">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">关闭</el-button>
      </span>
    </slot>
  </el-dialog>
</template>

<script>
export default {
  name: "IEModal",
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      setTimeout(() => {
        this.$emit("close");
      }, 400);
    },
  },
  created() {
    this.dialogVisible = true;
  },
};
</script>

<style lang="scss" scoped>
.modalMain {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>