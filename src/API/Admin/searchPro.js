/**
 * 所有登录的接口
 */

import axios from '@/utils/axios.js'

const baseProject = 'brounche/'

/**
 *
 * 表格查找接口
 * @param {*} param0
 */

const Search = (data) => {
  return axios({
    url: `${baseProject}resource/selProjectList`,
    data
  })
}
/**
 *
 * 添加主体项目基准图信息
 * @param {*} param0
 */

const insertBasePic = (data) => {
  return axios({
    url: `${baseProject}resource/insertBasePic`,
    data
  })
}
/**
 *
 * 添加主体项目分类详情列表
 * @param {*} param0
 */

const insertClassify = (data) => {
  return axios({
    url: `${baseProject}resource/insertClassify`,
    data
  })
}
/**
 *
 * 添加主体项目基准图绑定媒体资源信息
 * @param {*} param0
 */

const insertMediaList = (data) => {
  return axios({
    url: `${baseProject}resource/insertMediaList`,
    data
  })
}
/**
 *
 * 添加主体项目指定资源交互动画信息列表
 * @param {*} param0
 */

const insertAnimationList = (data) => {
  return axios({
    url: `${baseProject}resource/insertAnimationList`,
    data
  })
}
/**
 *
 * 添加主体项目指定资源附属文件信息列表
 * @param {*} param0
 */

const insertMaterialList = (data) => {
  return axios({
    url: `${baseProject}resource/insertMaterialList`,
    data
  })
}
/**
 *
 * 添加资源基本参数列表
 * @param {*} param0
 */

const insertBaseParamList = (data) => {
  return axios({
    url: `${baseProject}resource/insertBaseParamList`,
    data
  })
}
/**
 *
 * 扫描图片展示资源
 * @param {*} param0
 */

const showResource = (data) => {
  return axios({
    url: `${baseProject}resource/showResource`,
    data
  })
}
/**
 *
 * 查询主体项目基准图详情信息列表
 * @param {*} param0
 */

const selPicVoList = (data) => {
  return axios({
    // url: `${baseProject}resource/selBasePicList`,
    url: `${baseProject}resource/selPicVoList`,
    data
  })
}



/**
 *
 * 查询主体项目基准图详情
 * @param {*} param0
 */

const selBasePic = (data) => {
  return axios({
    url: `${baseProject}resource/selBasePic`,
    data
  })
}
/**
 *
 * 查询资源详情信息列表[动画，附属文件，基本参数]
 * @param {*} param0
 */

const selResourceAMB = (data) => {
  return axios({
    url: `${baseProject}resource/selResourceAMB`,
    data
  })
}
/**
 *
 * 查询主体项目基准图绑定资源详情列表(支持带分类编号)
 * @param {*} param0
 */

const selMediaList = (data) => {
  return axios({
    url: `${baseProject}resource/selMediaList`,
    data
  })
}
// resource/selBasePicList
/**
 *
 * 上传动画，附属文件，基本参数，模型参数列表
 * @param {*} param0
 */

const uploadResourceAMB = (data) => {
  return axios({
    url: `${baseProject}resource/uploadResourceAMB`,
    data
  })
}

/**
 *
 * 新增项目App类型
 * @param {*} param0
 */

const createMediaApps = (data) => {
  return axios({
    url: `${baseProject}resource/createMediaApps`,
    data
  })
}

/**
 *
 * 新增项目App类型参数
 * @param {*} param0
 */

const createMediaModelParamApps = (data) => {
  return axios({
    url: `${baseProject}resource/createMediaModelParamApps`,
    data
  })
}
// 修改项目App类型

const updateMediaApps = (data) => {
  return axios({
    url: `${baseProject}resource/updateMediaApps`,
    data
  })
}
const updateMediaModelParamApps = (data) => {
  return axios({
    url: `${baseProject}resource/updateMediaModelParamApps`,
    data
  })
}

// 修改项目APP类型参数

/**
 *
 * 查询项目
 * @param {*} param0
 */

const selMediaApps = (data) => {
  return axios({
    url: `${baseProject}resource/selMediaApps`,
    data
  })
}

/**
 *
 * 删除项目
 * @param {*} param0
 */

const delProjectByCode = (data) => {
  return axios({
    url: `${baseProject}resource/delProjectByCode`,
    params:data
  })
}

/**
 *
 * 编辑修改项目
 * @param {*} param0
 */

 const updateProject = (data) => {
  return axios({
    url: `${baseProject}resource/updateProject`,
    data
  })
}


/**
 *
 * 删除模型
 * @param {*} param0
 */

 const delMediaApps = (data) => {
  return axios({
    url: `${baseProject}resource/delMediaApps`,
    // params:data
    data
  })
}

/**
 *
 * 修改模型
 * @param {*} param0
 */

 const updateMediaParamModelApps = (data) => {
  return axios({
    url: `${baseProject}resource/updateMediaParamModelApps`,
    params:data
  })
}
export default {
  updateMediaParamModelApps,
  delMediaApps,
  updateMediaApps,
  updateMediaModelParamApps,
  // delMediaApps,
  delProjectByCode,
  updateProject,
  selMediaApps,
  createMediaModelParamApps,
  createMediaApps,
  uploadResourceAMB,
  selMediaList,
  selResourceAMB,
  selBasePic,
  // selBasePicList,
  selPicVoList,
  showResource,
  insertAnimationList,
  insertMaterialList,
  insertBaseParamList,
  insertMediaList,
  insertClassify,
  insertBasePic,
  Search
}
