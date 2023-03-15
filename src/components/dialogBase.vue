<template>
    <div>
        <el-dialog
            :top="top"
            :title="title"
            :visible.sync="dialogVisible"
            :width="width"
            :before-close="handleClose"
            :close-on-click-modal="closeByModal"
            :close-on-press-escape="closeByPress"
            :append-to-body="appendToBody"
        >
            <slot />
            <slot name="footer">
                <span slot="footer" class="dialog-footer">
                    <el-button type="info" v-if="!hiddenCancel" @click="handleClose">{{
                        cancelText
                    }}</el-button>
                    <el-button
                        v-if="!hiddenConfirm"
                        :type="confirmType"
                        @click="handleSubmit"
                        >{{ confirmText }}</el-button
                    >
                </span>
            </slot>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'dialogBase',
    props: {
        appendToBody: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '标题',
        },
        width: {
            type: String,
            default: '50%',
        },
        cancelText: {
            type: String,
            default: '取 消',
        },
        confirmText: {
            type: String,
            default: '确 定',
        },
        hiddenCancel: {
            type: Boolean,
            default: false,
        },
        hiddenConfirm: {
            type: Boolean,
            default: false,
        },
        confirmType: {
            type: String,
            default: 'primary',
        },
        top: {
            type: String,
            default: '15vh',
        },
        closeByModal: {
            type: Boolean,
            default: true,
        },
        closeByPress: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
            setTimeout(() => {
                this.$emit('close')
            }, 400)
        },
        handleSubmit() {
            this.$emit('confirm')
        },
    },
    created() {
        this.$nextTick(() => {
            this.dialogVisible = true
        })
    },
}
</script>

<style lang="scss" scoped>
::v-deep {
    .el-dialog__footer {
        text-align: center;
        .el-button{
          width: 180px;
        }
    }
}
</style>