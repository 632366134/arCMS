<template>
  <el-radio-group v-model="mediaType">
    <el-radio
      v-for="(item, index) in medaiTypeList"
      :key="index"
      :label="item.value"
      :class="[item.value === 6 ? 'disabled' : '']"
    >
      <!-- :disabled="item.value === 6" -->
      {{ item.name }}
      <span @click="handleTips" v-if="item.value === 6" class="tips">
        <i class="el-icon-warning"></i>
      </span>
    </el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'MediaType',
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  inject: ['mediaDataList'],
  computed: {
    medaiTypeList() {
      return this.$store.state.base.baseAppMedaiTypeList
    }
  },
  watch: {
    mediaType(newVal) {
      this.$emit('input', newVal)
      // this.$emit('preview')
      this.mediaDataList().mediaType = this.mediaType
      // console.log(this.mediaDataList().mediaType)
    }
  },
  data() {
    return {
      mediaType: ''
    }
  },
  methods: {
    handleTips() {
      console.log('???')
    }
  },
  created() {
    this.mediaType = this.value
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  color: #929191;
  .tips {
    cursor: pointer;
    font-size: 18px;
    i {
      vertical-align: bottom;
    }
  }
}
</style>
