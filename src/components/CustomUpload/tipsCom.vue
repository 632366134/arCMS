<template>
    <div class="tips">
        <!-- <i class="el-icon-warning"></i> -->
        {{ text }} <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'uploadTips',
    props: {
        text: {
            type: String,
            default: '',
        },
    },
}
</script>

<style lang="scss" scoped>
.tips {
    clear: both;
    color: #8c8d8d;
    font-size: 12px;
}
</style>