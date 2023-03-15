<template>
    <div class="slider">
        <slot name="before"></slot>
        <el-slider
            :step="0.1"
            @change="handleSliderChange"
            :min="min"
            :max="max"
            v-model="sliderValue"
        ></el-slider>
        <slot name="after"></slot>
        <el-input
            v-notempty="{ value }"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
            v-model="inputValue"
        ></el-input>
    </div>
</template>

<script>
export default {
    name: 'Slider',
    props: {
        value: {
            type: [String, Number],
        },
    },
    watch: {
        value: {
            immediate: true,
            handler(newVal) {
                this.inputValue = newVal + ''
                this.sliderValue = +newVal
            },
        },
    },
    data() {
        return {
            min: -20,
            max: 20,
            sliderValue: 0,
            inputValue: '',
            oldVal: '',
        }
    },
    methods: {
        emit() {
            this.$emit('input', +this.inputValue)
        },
        // 存储前一个值 如果新的值校验不过 用这个赋值
        handleInputFocus() {
            this.oldVal = this.inputValue
        },
        /**
         * 校验数字格式
         * 将输入的值设置为滑动条的默认值 改变滑动条的最大最小值
         */
        handleInputBlur() {
            setTimeout(() => {
                if (!/^((-?)[0-9]*)(\.[0-9]{0,3})?$/.test(this.inputValue)) {
                    this.inputValue = this.oldVal
                    this.$message.warning('请输入正确的数字，最多支持3位小数。')
                } else {
                    if (this.oldVal !== this.inputValue) {
                        let value = +this.inputValue
                        this.min = value - 50
                        this.max = value + 50
                        this.sliderValue = value
                        this.emit()
                    }
                }
            }, 300)
        },
        // 滚动条变化之后设置输入框里面的值
        handleSliderChange() {
            this.inputValue = this.sliderValue
            this.emit()
        },
    },
}
</script>

<style lang="scss" scoped>
.slider {
    display: flex;
    align-items: center;
    .el-slider {
        width: 200px;
        margin: 0 10px;
    }
    .el-input {
        width: 80px;
        margin-left: 24px;
        height: 30px;
        line-height: 30px;
        ::v-deep {
            .el-input__inner {
                text-align: center;
            }
        }
    }
    ::v-deep {
        .el-slider__runway {
            background: #bfcefe;
        }
        .el-slider__bar {
            background: #bfcefe;
        }
    }
}
</style>