/**
 * 媒体资源的各种限制
 */
// 项目限制
export const ProjectLimit = {
    projectNum: 99, // 项目数量限制
    picNum: 99, // 每个项目最多可上传图片数量
}

// 基础图限制
export const BasePicLimit = {
    // px: 800, // 图片像素上限
    size: 10, // 文件大小(M)
    basePicType: '.jpg,.jpeg,.png', //基础图类型
}

// 资源限制
export const MediaLimit = {
    mediaNum: 5, // 每张图 可上传资源数量
    mediaModelPicType: '.jpg,.jpeg,.png', // 模型贴图格式
    mediaModelPicPX: 2048, // 模型贴图像素上限
    mediaModelPicSize: 10, // 模型贴图大小限制(M)
    mediaModelSize: 30, // 模型大小限制(M)
    mediaModelType: '.obj,.glb,.gltf', // 模型格式
    mediaPicSize: 10, // 图片大小限制(M)
    mediaPicPX: 2048, // 图片像素上限
    mediaPicType: '.jpg,.jpeg,.png',//图片格式
    mediaVideoSize: 100, // 视频大小限制(M)
    mediaVideoType: '.mp4', // 视频格式
    mediaVideoPicType: '.jpg,.jpeg,.png', //视频封面图格式
    mediaVideoPicPX: 2048, //视频封面图像素上限
    mediaVideoPicSize: 10, //视频封面图大小限制(M)
}

// 动作限制
export const ParamLimit = {
    num: 5, // 动作数量
}