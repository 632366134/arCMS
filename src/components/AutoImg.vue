<template>
    <img :src="realSrc" :style="style" @load="handleImgLoad" v-if="load" alt="" />
    <i v-else></i>
</template>

<script>
/**
 * 根据父元素的宽高来自适应图片的尺寸
 */
import mediaIconFile from '@/assets/images/mediaIcon.png'
export default {
    name: 'AutomImg',
    props: {
        src: {
            type: String,
            required: true,
        },
    },
    computed: {
        realSrc(){
            return this.src || mediaIconFile
        }
    },
    data() {
        return {
            load: false,
            width: 0,
            height: 0,
            parentSize: {},
            style: {
                display: 'none',
            },
        }
    },
    methods: {
        getStyle(options) {
            try {
                const { width, height } = options
                let pWidth = 0,
                    pHeight = 0
                let wWidth = this.parentSize.width,
                    wHeight = this.parentSize.height
                if (width > height) {
                    pWidth = (wHeight / height) * width
                    pHeight = wHeight
                    if (pWidth < wWidth) {
                        // 宽度不够一屏
                        pHeight = (wWidth / pWidth) * pHeight
                        pWidth = wWidth
                    }
                } else {
                    pWidth = wWidth
                    pHeight = (wWidth / width) * height
                    if (pHeight < wHeight) {
                        // 高度不够一屏
                        pWidth = (wHeight / pHeight) * pWidth
                        pHeight = wHeight
                    }
                }
                return {
                    width: pWidth,
                    height: pHeight,
                }
            } catch (error) {}
            return {
                width: 0,
                height: 0,
            }
        },
        handleImgLoad(e) {
            const { width, height } = this.getStyle({
                width: e.target.width,
                height: e.target.height,
            })
            this.style = {
                width: width + 'px',
                height: height + 'px',
            }
        },
        queryParent() {
            return new Promise((resolve) => {
                let parent = this.$el.parentNode
                if (parent) {
                    resolve(parent)
                } else {
                    setTimeout(() => {
                        this.queryParent().then((parent) => {
                            resolve(parent)
                        })
                    }, 300)
                }
            })
        },
        init() {
            this.queryParent().then((el) => {
                this.parentSize = {
                    width: el.offsetWidth,
                    height: el.offsetHeight,
                }
                this.load = true
            })
        },
    },
    mounted() {
        this.init()
    },
}
</script>

<style lang="scss" scoped>
</style>