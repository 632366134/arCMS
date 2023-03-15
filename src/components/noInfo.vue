<template>
    <div class="noInfo">
        <img src="@assets/images/noInfo.png" alt="" />
        <div class="noText">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'noInfo',
}
</script>

<style lang="scss" scoped>
.noInfo {
    width: 100%;
    text-align: center;
    padding: 15px 0;
    img {
        width: 300px;
    }
    .noText {
        color: #999;
    }
}
</style>