<template>
    <div id="app" v-cloak>
        <!-- <IEModal v-if="showIe" /> -->
        <transition name="slide" mode="out-in">
            <router-view v-if="isRouterAlive"></router-view>
        </transition>
    </div>
</template>

<script>
// import IEModal from "./components/IEModal";
export default {
    data() {
        return {
            isRouterAlive: true,
        }
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        },
    },
    provide() {
        return {
            reload: this.reload,
        }
    },
    name: 'App',
    components: {
        // IEModal,
    },
    computed: {
        showIe() {
            return window.navigator.userAgent.includes('Trident')
        },
    },
    created() {
        this.$nextTick(() => {})
    },
    mounted() {
        this.$nextTick(() => {
            if (document.querySelector('#loading')) {
                document.querySelector('#loading').remove()
            }
        })
    },
}
</script>

<style lang="scss">
@import '~@assets/css/mixins.scss';
html,
body,
#app {
    /* 不显示滚动条 */
    // overflow: hidden !important;
    width: 100%;
    height: 100%;
    font-family: PingFang SC;
}
.container {
    height: 100%;
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
    overflow: auto;
}

// aframe自带html上面的样式
.a-fullscreen {
    position: relative !important;
}
:root {
    --input-height: 40px;
    --color: #829FFF;
}
.breadcrumb{
    position: relative;
    z-index: 2;
    padding: 22px 40px 37px;
}

.pagination {
    text-align: right;
}
.ma10 {
    margin-top: 10px;
}
.ma15 {
    margin-top: 15px;
}
.ma20 {
    margin-top: 20px;
}
.ma25 {
    margin-top: 25px;
}
.ml10 {
    margin-left: 10px;
}
.ml15 {
    margin-left: 15px;
}
.ml25 {
    margin-left: 25px;
}
.primary {
    color: #00baff;
    cursor: pointer;
}
.primary:hover {
    color: #66b1ff;
}
.primary:active,
.primary:focus {
    color: #66b1ff;
}
.success {
    color: #67c23a;
    cursor: pointer;
}
.success:hover {
    color: #85ce61;
}
.success:active,
.success:focus {
    color: #85ce61;
}
.danger {
    color: #f56c6c;
}
.danger:hover {
    color: #f78989;
}
.danger:active,
.danger:focus {
    color: #f78989;
}
.warning {
    color: #e6a23c;
}
.warning:hover {
    color: #ebb563;
}
.warning:active,
.warning:focus {
    color: #ebb563;
}
.cancel {
    color: #999;
}
.cancel:hover {
    color: #999;
}
.cancel:active,
.cancel:focus {
    color: #999;
}
.disabledText {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: transparent;
}
.disabledText:hover {
    color: #c0c4cc;
}

.disabledBtn,
.disabledBtn:hover {
    cursor: not-allowed;
    background-image: none;
    color: #fff;
    background-color: #a0cfff;
    border-color: #a0cfff;
}
.dangerBtn {
    &.disabledBtn,
    &.disabledBtn:hover {
        cursor: not-allowed;
        background-image: none;
        color: #fff;
        background-color: #fab6b6;
        border-color: #fab6b6;
    }
}
.mainPage {
    padding: 15px;
    background: #fff;
    box-sizing: border-box;
}
.el-breadcrumb {
    line-height: inherit;
}
.bigPic .el-image-viewer__close {
    position: absolute;
    left: calc(50% + 164px);
    top: auto !important;
    color: #fff;
    transform: translateX(-50%);
    bottom: 30px;
}
.biTian .el-form-item__label {
    position: relative;
}

.biTian .buBiTian .el-form-item__label:before {
    content: '';
}
</style>
