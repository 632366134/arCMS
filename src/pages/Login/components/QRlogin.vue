<template>
    <div>
        <div class="text">
            <label>微信二维码登录</label>
        </div>
        <div class="all">
            <div class="erwei"></div>
        </div>
        <div class="bott">
            <img src="@/assets/green.png" />
            <label class="h1">使用微信二维码登录</label>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.erwei {
    width: 250px;
    height: 250px;
    background: #8f8e8e;
    border-radius: 5px;
    margin-left: 170px;
}
.all {
    display: flex;

    flex-direction: column;
    justify-content: center;
}
.h1 {
    padding-left: 10spx;
    position: relative;
    bottom: 4px;
}
.text {
    margin-top: 130px;
    text-align: left;
    margin-left: 119px;
    margin-bottom: 37px;
}
.bott {
    margin-top: 22px;
}
</style>