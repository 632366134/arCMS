<template>
  <div class="">
    <el-button
        class="el-scroll-icon"
        :icon="iconArrow"
        circle
        @click="RightMenuHide()"
      >
        <div class="is-dark">点击{{ hideShow }}侧边栏</div>
  </div>
</template>

<script>
export default {
  nama:'RightMenu',
  data(){
    return {
      RightMenuShow:false,
      iconArrow:'el-icon-arrow-right',
      hideShow: '隐藏',
    }
  },
  methods:{
    RightMenuHide() {
      if (this.RightMenuShow) {
        this.iconArrow = 'el-icon-arrow-left'
        document
          .querySelector('.left-menu')
          .querySelector('.el-scroll-icon')
          .classList.add('el-scroll-icon-hide')
        this.hideShow = '显示'
      } else {
        this.iconArrow = 'el-icon-arrow-Right'
        document
          .querySelector('.left-menu')
          .querySelector('.el-scroll-icon')
          .classList.remove('el-scroll-icon-hide')
        this.hideShow = '隐藏'
      }
      this.RightMenuShow = !this.RightMenuShow
    },
  }
}
</script>

<style>

</style>