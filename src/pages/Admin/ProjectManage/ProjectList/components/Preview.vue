<template>
    <div>
        <base-dia
            :title="title"
            @close="$emit('close')"
            @confirm="handleConfirm"
            width="800px"
            :closeByModal="false"
            :closeByPress="false"
            :hiddenConfirm="true"
            cancelText="关闭"
        >
            <div style="text-align: center;">
                <img :src="info.src" width="430px" alt="" />
            </div>
        </base-dia>
    </div>
</template>

<script>
import baseDia from '@/components/dialogBase.vue'
export default {
    name: 'PreviewCom',
    components: {
        baseDia,
    },
    props: {
        info: Object,
    },
    computed: {
        title(){
            return this.info.projectName + '小程序码'
        }
    },
    data() {
        return {}
    },
    methods: {
        handleConfirm() {
            if (this.check()) {
                this.submitAction()
            }
        },
    },
    created() {},
}
</script>

<style lang="scss" scoped>
</style>