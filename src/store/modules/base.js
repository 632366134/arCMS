import { getRoutes } from "../../utils/menuList"
// 新后台的资源
export default {
    namespaced: true,
    state: {
        topMenuList: getRoutes(),
        miniPath: 'pages/publicIndex/index', // ar识别小程序地址
        // 资源类型
        baseMedaiTypeList: [
            { name: '图片', value: 1 },
            { name: '视频', value: 2 },
            { name: '3D普通模型', value: 5 },
            { name: '3D动画模型', value: 6 },
            { name: 'prefab文件', value: 12 },

        ],
        // app资源类型
        baseAppMedaiTypeList: [
            { name: '图片', value: 3 },
            { name: '视频', value: 4 },
            { name: '3D普通模型', value: 5 },
            { name: '3D动画模型', value: 6 },
            { name: 'prefab文件', value: 12 },

        ],
        // 材质类型
        materialTypeList: [
            { name: '贴图', value: 1, reg: /\.(jpg$)|(png$)|(jpeg$)/ },
            { name: '视频封面图', value: 2, reg: /\.(jpg$)|(png$)|(jpeg$)/ },
            { name: 'mtl', value: 3, reg: /\.(mtl$)/ },
            { name: 'bin', value: 4, reg: /\.(bin$)/ },
        ],
        // app册子配置文件名称
        Assetbundle: 'Assetbundle',
        // 资源类型配置
        mediaTypeConfig: [
            { name: '图片', value: 3, reg: /(png$)|(jpg$)|(jpeg)$/ },
            {
                name: '视频',
                value: 4,
                reg: /(mp4)$/
            },
            {
                name: '3D普通模型', value: 5,
                reg: /(obj$)|(glb$)|(gltf$)|(fbx$)/
            },
            {
                name: '3D动画模型', value: 6,
                // 模型文件类型
                reg: /(obj$)|(glb$)|(gltf$)|(fbx$)/
            },
            {
                name: 'prefab文件', value: 12,
                reg: /(prefab$)/
            },
        ],
        // app非选项的其他本体文件
        appMediaOtherFiles: [
            {
                name: 'prefab文件', value: 12,
                reg: /(prefab$)/
            },
        ],
        // 资源材质配置
        mediaTypeMaterialList: [
            { name: '贴图', value: 7, reg: /(png$)|(jpg$)|(jpeg)$/ },
            { name: '视频封面图', value: 8, reg: /(png$)|(jpg$)|(jpeg)$/, mediaType: 4 },
            { name: 'mtl文件', value: 9, reg: /(mtl$)|(mtl_txt)/ },
            { name: 'bin文件', value: 10, reg: /(bin$)/ },
            { name: 'om文件', value: 11, reg: /(om$)|(om_txt$)/ }
            // { name: 'prefab文件', value: 12, reg: /(prefab$)/ },
        ]
    },
    mutations: {
        changeManager(state) {
            state.topMenuList = getRoutes()
        }
    },
    actions: {
    }
}