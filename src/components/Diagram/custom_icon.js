import icon from "./icon.config"

export default {
    name: "customIcon",
    props: {
        isImg: "",
        size: {
            type: String,
            default: "14px"
        },
        icon: {
            required: true,
            type: String
        },
        color: {
            type: String,
            default: "default"
        }

    },

    data() {
        return {
            list: icon
        }
    },

    render(h) {
        let isImg = this.isImg === undefined ? this.$store.state.base.isImg : this.isImg
        if (isImg) {
            let src = ""
            try {
                src = this.list[this.icon].img[this.color]
            } catch (error) { }
            return h(
                "img",
                {
                    attrs: {
                        src: src,
                    },
                    style: {
                        width: this.size,
                        height: this.size,
                        display: "block"
                    }
                }
            )
        }
        return h(
            "i",
            {
                class: [this.list[this.icon].icon],
                style: {
                    "font-size": this.size,
                    "color": this.color === "default" ? "#00BAFF" : this.color
                }
            }
        )
    },
}