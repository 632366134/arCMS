<template>
    <div class="classList">
        <div v-for="(item, index) in classData" :key="index">
            <MediaList :classData="item" />
        </div>
    </div>
</template>

<script>
/**
 * 媒体分类
 */
import MediaList from './MediaList.vue'
export default {
    name: 'ClassList',
    inject: [
        'basePicData',
        'getSnowCode',
        'registeredGetDataEvent',
        'removeGetDataEvent',
    ],
    props: {
        classCode: String
    },
    components: {
        MediaList,
    },
    data() {
        return {
            // 分类信息 默认一个
            classData: [],
        }
    },
    methods: {
        getData() {
            return {
                codeLength: 0,
                fun: () => {
                    return {
                        insertClassify: this.classData.map((item) => {
                            return item
                        }),
                    }
                },
            }
        },
        getClassData() {
            this.getSnowCode().then((res) => {
                if (res.code === 1000) {
                    let basePicData = this.basePicData()
                    this.classData = [
                        {
                            projectCode: basePicData.projectCode,
                            basePicCode: basePicData.basePicCode,
                            className: '默认分类',
                            classIntroduce: '',
                            classSequence: 1,
                            classCode: this.classCode || res.data,
                        },
                    ]
                }
            })
        },
    },
    created() {
        this.getDataIndex = 'getDataClassList' + this.$getCode()
        this.registeredGetDataEvent(
            this.getDataIndex,
            this.getData
        )
        this.getClassData()
    },
    beforeDestroy() {
        this.removeGetDataEvent(this.getDataIndex)
    },
}
</script>

<style lang="scss" scoped>
</style>