/**
 * 1.图片文件名称不能带#
 * 2.非default名称必须带#
 * 3.default默认颜色为#00BAFF
 */

 const resolve = (path) => {
    return `static/images/icon/${path}`
 }

export default {
    "setting": {
        img: {
            default: resolve("setting_00BAFF.png"),
            "#FFFFFF": resolve("setting_FFFFFF.png")
        },
        icon: "custom-icon-setting"
    },
    "add": {
        img: {
            default: resolve(""),
            "#FFFFFF": resolve("add_FFFFFF.png")
        },
        icon: "custom-icon-add"
    },
    "add_2": {
        img: {
            default: resolve(""),
            "#FFFFFF": resolve("add_2_FFFFFF.png")
        },
        icon: "custom-icon-add_2"
    },
    "delete": {
        img: {
            default: resolve(""),
            "#FFFFFF": resolve("delete_FFFFFF.png")
        },
        icon: "custom-icon-delete"
    },
    "delete_2": {
        img: {
            default: resolve(""),
            "#FFFFFF": resolve("delete_2_FFFFFF.png")
        },
        icon: "custom-icon-delete_2"
    },
    "search": {
        img: {
            default: resolve(""),
            "#FFFFFF": resolve("search_FFFFFF.png")
        },
        icon: "custom-icon-search"
    },
    "search_2": {
        img: {
            default: resolve(""),
            "#FFFFFF": resolve("search_2_FFFFFF.png")
        },
        icon: "custom-icon-search_2"
    },
    "warning": {
        img: {
            default: resolve(""),
            "#FD7167": resolve("warning_FD7167.png")
        },
        icon: "custom-icon-warning"
    },
}