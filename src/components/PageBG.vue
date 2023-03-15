<template>
    <div class="pageBg">
        <div class="bgBox">
            画册内部主页
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageBG',
}
</script>

<style lang="scss" scoped>
.pageBg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    color: #829fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 98px;
    // padding: 0 0px;
    box-sizing: border-box;
    .bgBox{
        background-image: url(~@assets/images/logobg.png);
        width: 100%;
        height: 259px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
    }
}
</style>