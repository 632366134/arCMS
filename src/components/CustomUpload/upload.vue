<template>
    <div></div>
</template>

<script>
/**
 * 不通过选择文件上传
 */
import mixins from './mixins'
export default {
    name: 'uploadCom',
    mixins: [mixins],
    props: {
        value: {
            type: Array,
        },
        uploadInfo: {
            type: Object,
            required: true,
            default: () => ({
                folder: '',
                fileNum: '',
                name: '',
            }),
        },
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
</style>