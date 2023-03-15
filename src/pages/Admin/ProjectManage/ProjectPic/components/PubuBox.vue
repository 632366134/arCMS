<script>
import { throttle } from '@/utils/decorator'
export default {
    name: 'PubuBox',
    props: {
        width: {
            type: Number,
            required: true,
            default: 300,
        },
        data: {
            type: Array,
            default: () => [],
        },
        marginHor: {
            type: Number,
            default: 30,
        },
    },
    watch: {
        columnList() {
            this.start()
        },
    },
    data() {
        return {
            columnList: [],
        }
    },
    methods: {
        start() {},
        calcColumn() {
            let parent = this.$el.parentElement
            let allWidth = parent.clientWidth
            let column = Math.floor(
                allWidth / (this.width + this.marginHor * 2)
            )
            this.columnList = new Array(column).fill('').map(() => [])
        },
        @throttle(100)
        handleResize() {
            this.calcColumn()
        },
    },
    render() {
        console.log(this.$slots.default)
        return (
            <div class="pubuBox">
                {this.columnList.map((item, index) => {
                    return (
                        <div
                            class="pubuColumn"
                            style={{ margin: this.marginHor + 'px' }}
                            key={index}
                            data-index={index}
                        ></div>
                    )
                })}
            </div>
        )
    },
    mounted() {
        this.$nextTick(() => {
            this.calcColumn()
        })
        window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    },
}
</script>

<style lang="scss" scoped>
.pubuBox {
    display: flex;
    .pubuColumn {
        min-height: 100px;
        flex: 1;
        background: red;
    }
}
</style>