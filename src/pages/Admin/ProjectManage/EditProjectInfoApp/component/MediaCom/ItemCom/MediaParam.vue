<template>
    <div class="mediaParam">
        <div class="mediaItem">
            <div class="mediaLabel">
                <img src="@assets/images/paramIcon/position.png" alt="" />
                <span>位置参数</span>
            </div>
            <div class="mediaValue">
                <div
                    class="valueItem"
                    v-for="item in positionList"
                    :key="item.key"
                >
                    <div class="valueLabel">{{ item.key }}:</div>
                    <div class="sliderValue">
                        <Slider v-model="item.value" @input="handleValueChange">
                            <template slot="before">
                                <img
                                    class="sliderIcon"
                                    :src="item.beforeIcon"
                                    alt=""
                                />
                            </template>
                            <template slot="after">
                                <img
                                    class="sliderIcon"
                                    :src="item.afterIcon"
                                    alt=""
                                />
                            </template>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
        <div class="mediaItem">
            <div class="mediaLabel">
                <img src="@assets/images/paramIcon/position.png" alt="" />
                <span>缩放参数:</span>
            </div>
            <div class="mediaValue" style="margin-left: -4px;">
                <div
                    class="valueItem"
                    v-for="item in scaleList"
                    :key="item.key"
                >
                    <div class="valueLabel"></div>
                    <div class="sliderValue">
                        <Slider v-model="item.value" @input="handleValueChange">
                            <template slot="before">
                                <img
                                    class="sliderIcon"
                                    :src="item.beforeIcon"
                                    alt=""
                                />
                            </template>
                            <template slot="after">
                                <img
                                    class="sliderIcon"
                                    :src="item.afterIcon"
                                    alt=""
                                />
                            </template>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
        <div class="mediaItem">
            <div class="mediaLabel">
                <img src="@assets/images/paramIcon/rotate.png" alt="" />
                <span>旋转参数</span>
            </div>
            <div class="mediaValue">
                <div
                    class="valueItem"
                    v-for="item in rotateList"
                    :key="item.key"
                >
                    <div class="valueLabel">{{ item.key }}:</div>
                    <div class="sliderValue">
                        <Slider v-model="item.value" @input="handleValueChange">
                            <template slot="before">
                                <img
                                    class="sliderIcon"
                                    :src="item.beforeIcon"
                                    alt=""
                                />
                            </template>
                            <template slot="after">
                                <img
                                    class="sliderIcon"
                                    :src="item.afterIcon"
                                    alt=""
                                />
                            </template>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import paramIcon from './ParamIcon'
import Slider from './Slider.vue'
export default {
    name: 'MediaParam',
    components: {
        Slider,
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                this.init()
            },
        },
    },
    data() {
        return {
            positionList: [
                {
                    key: 'x',
                    value: 0,
                    beforeIcon: paramIcon.position_x_remove,
                    afterIcon: paramIcon.position_x_add,
                },
                {
                    key: 'y',
                    value: 0,
                    beforeIcon: paramIcon.position_y_remove,
                    afterIcon: paramIcon.position_y_add,
                },
                {
                    key: 'z',
                    value: 0,
                    beforeIcon: paramIcon.position_z_remove,
                    afterIcon: paramIcon.position_z_remove,
                },
            ],
            scaleList: [
                {
                    key: '',
                    value: 1,
                    beforeIcon: paramIcon.scale_remove,
                    afterIcon: paramIcon.scale_add,
                },
            ],
            rotateList: [
                {
                    key: 'x',
                    value: 0,
                    beforeIcon: paramIcon.rotate_x_remove,
                    afterIcon: paramIcon.rotate_x_add,
                },
                {
                    key: 'y',
                    value: 0,
                    beforeIcon: paramIcon.rotate_y_remove,
                    afterIcon: paramIcon.rotate_y_add,
                },
                {
                    key: 'z',
                    value: 0,
                    beforeIcon: paramIcon.rotate_z_remove,
                    afterIcon: paramIcon.rotate_z_add,
                },
            ],
        }
    },
    methods: {
        init() {
            const { position, rotate, scale } = this.value
            position.split('|').forEach((item, index) => {
                this.positionList[index].value = +item
            })
            rotate.split('|').forEach((item, index) => {
                this.rotateList[index].value = +item
            })
            this.scaleList[0].value = scale.split('|')[0]
        },
        handleValueChange() {
            let position = this.positionList.map((v) => v.value).join('|'),
                rotate = this.rotateList.map((v) => v.value).join('|'),
                scale = new Array(3).fill(this.scaleList[0].value).join('|')
            this.$emit('input', {
                ...this.value,
                position,
                rotate,
                scale,
            })
            this.$emit('preview')
        },
    },
}
</script>

<style lang="scss" scoped>
.mediaParam {
    font-size: 14px;
    .mediaItem {
        .mediaLabel {
            line-height: 28px;
            display: inline-block;
            vertical-align: top;
            margin-right: 22px;
            span {
                vertical-align: top;
            }
            img {
                width: 28px;
                height: 28px;
                margin-right: 12px;
            }
        }
        .mediaValue {
            display: inline-block;
            vertical-align: top;
            .valueItem {
                display: flex;
                margin-bottom: 28px;
                .valueLabel {
                    min-width: 11px;
                    margin-right: 20px;
                }
                .sliderIcon {
                    width: 25px;
                    height: 25px;
                }
            }
        }
    }
}
</style>