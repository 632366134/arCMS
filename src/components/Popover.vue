<template>
    <div
        :class="['popover', show ? 'active' : '']"
        :style="{
            width: width + 'px',
            left: left + 'px',
            top: top + 28 + 'px',
        }"
    >
        <div class="sanjiao"></div>
        <div class="popContent">{{ content }}</div>
    </div>
</template>

<script>
export default {
    name: 'Popover',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        width: {
            type: Number,
            default: 306,
        },
        top: {
            type: Number,
            default: 0,
        },
        left: {
            type: Number,
            default: 0,
        },
        content: {
            type: String,
            default: '',
        },
    },
}
</script>

<style lang="scss" scoped>
.popover {
    position: absolute;
    background: #fff;
    border-radius: 10px;
    z-index: 10;
    opacity: 0;
    transition: all 0.1s linear;
    transform: scale(0);
    transform-origin: left top;
    padding: 23px 23px 41px;
    box-sizing: border-box;
    color: #020202;
    font-size: 14px;
    line-height: 1.8;
    text-indent: 2em;
    box-shadow: 0 0 10px rgb(211, 209, 209);
    &.active {
        opacity: 1;
        transform: scale(1);
    }
    .sanjiao {
        position: absolute;
        left: 30px;
        top: -28px;
        border: 15px solid transparent;
        border-bottom-color: #fff;
        z-index: 1;
    }
}
</style>