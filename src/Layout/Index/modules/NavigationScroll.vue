<template>
    <el-scrollbar
        @wheel.native.prevent="handleScroll"
        :vertical="false"
        class="navigationMain"
        ref="scrollContainer"
    >
        <draggale v-model="list" @change="changeDrag">
            <el-tag
                :class="[barIndex === index ? 'show' : '', 'tags']"
                v-for="(item, index) in list"
                :key="item.path"
                @click.prevent="handleLink(item)"
            >
                <span>{{ item.title }}</span>
                <span
                    @click="deleteLink(index)"
                    v-if="index != 0"
                    class="closeSpan"
                >
                    <i
                        class="el-icon-close"
                        :style="{
                            'font-size': '16px',
                            color: barIndex === index ? '#FFFFFF' : '#134B8E',
                        }"
                    ></i>
                </span>
            </el-tag>
        </draggale>
    </el-scrollbar>
</template>

<script>
import draggale from 'vuedraggable'
import { mapState } from 'vuex'
export default {
    components: { draggale },
    data() {
        return {
            list: [],
        }
    },
    computed: {
        ...mapState({
            barIndex: (state) => state.bar.barIndex,
            barList: (state) => state.bar.barList,
        }),
    },
    watch: {
        $route(routes) {
            this.setList()
        },
        barList: {
            deep: true,
            handler(newVal) {
                this.list = JSON.parse(JSON.stringify(newVal))
                sessionStorage.barList = JSON.stringify(newVal)
            },
        },
    },
    methods: {
        handleScroll(e) {
            const eventDelta = e.wheelDelta || -e.deltaY * 40
            const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
            $scrollWrapper.scrollLeft =
                $scrollWrapper.scrollLeft - eventDelta / 4
        },
        handleLink(item) {
            if (item.path !== this.$route.path) {
                if (item.fullPath) {
                    this.$router.push(item.fullPath)
                } else {
                    this.$router.push(item.path)
                }
            }
        },
        deleteLink(index) {
            let { name } = this.list[index]
            let i = this.barIndex
            let { meta, fullPath } = this.$route
            let { keepAlive } = meta
            if (index == this.barIndex) {
                let nowIndex = index == 0 ? 0 : index - 1
                this.$store.commit('bar/Set_BarIndex', nowIndex)
                this.$store.commit('bar/Del_BarList', {
                    index,
                    keepAlive,
                    fullPath,
                })
                let [prevRouter] = this.list.filter(
                    (v) => v.fullPath === sessionStorage.prevRouterFullPath
                )
                let nowRouter = this.barList[this.barIndex]
                /**
                 * 如果当前缓存记录存在上一个路由 直接back
                 * 如果不存在 回到关闭路由的前一个路由
                 */
                if (prevRouter) {
                    nowRouter && this.$router.back()
                } else {
                    nowRouter && this.$router.replace(nowRouter.fullPath)
                }
            } else if (index < this.barIndex) {
                this.$store.commit('bar/Set_BarIndex', i - 1)
                this.$store.commit('bar/Del_BarList', {
                    index,
                    keepAlive,
                    fullPath,
                })
            } else {
                this.$store.commit('bar/Del_BarList', {
                    index,
                    keepAlive,
                    fullPath,
                })
            }
        },
        setList() {
            let route = this.$route
            if (!route.meta.showInBar) {
                return this.$store.commit('bar/Set_BarIndex', '')
            }
            this.$store.commit('bar/Add_BarList', route)
        },
        changeDrag(e) {
            let name = this.$route.name
            let list = JSON.parse(JSON.stringify(this.list))
            this.$store.commit('bar/Set_BarList', list)
            list.forEach((v, i) => {
                if (v.name === this.$route.name) {
                    this.$store.commit('bar/Set_BarIndex', i)
                }
            })
        },
    },
    created() {
        this.$nextTick(() => {
            this.setList()
        })
        this.list = JSON.parse(JSON.stringify(this.barList))
    },
}
</script>

<style lang="scss" scoped>
@import '~@assets/css/navigationBar.scss';
.navigationMain {
    box-shadow: 0px 2px 4px 1px rgba(153, 153, 153, 0.18);
    background: #f9fdff;
    padding: 12px 33px;
    min-width: 1280px;

    ::v-deep .el-scrollbar__bar.is-vertical {
        width: 0;
    }
    ::v-deep .el-scrollbar__bar.is-horizontal {
        height: 0;
    }
    ::v-deep .el-scrollbar__wrap {
        overflow: auto;
        margin-right: 0 !important;
        margin-bottom: 0 !important;
    }
    .tags {
        display: inline-flex;
        position: relative;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #134b8e;
        color: #134b8e;
        background: #fff;
        padding: 0 14px;
        // font-size: 13px;
        font-size: var(--fuzhuSize);

        margin-right: 16px;
        margin-left: 0;
        user-select: none;
        border-radius: 0;
        &:last-child {
            margin-right: 0;
        }
        .closeIcon {
        }
        .closeSpan {
            transform: translateX(11px);
            display: flex;
            justify-content: center;
            align-items: center;
            padding-right: 11px;
        }
    }
    .show {
        color: red;
        background-color: #00abff;
        color: #fff;
        border-color: #00abff;
    }
}
</style>