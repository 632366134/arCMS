<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="20">
                <div class="chooseFile">
                    <input
                        :accept="accept"
                        :multiple="multiple"
                        ref="chooseFile"
                        type="file"
                        @change="changeFile"
                    />
                    <el-button class="chooseImg" type="primary">{{
                        text
                    }}</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        changeFile(e) {
            this.$emit('getFile', this.$refs.chooseFile.files)
            setTimeout(() => {
                e.target.value = ''
            }, 1000)
        }
    },
    props: {
        text: {
            type: String,
            default: '',
            required: true
        },
        accept: {
            type: String,
            default: ''
        },
        multiple: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="scss">
.chooseFile {
    // height: 40px;
    width: 140px;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    input[type='file'] {
        font-size: 100em;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
    .chooseImg {
        width: 140px;
    }
}
</style>
