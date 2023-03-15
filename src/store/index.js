import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const fileList = require.context('./modules', true, /\.js$/)


const moduleList = fileList.keys().reduce((modules, filepath) => {
  const name = filepath.replace(/^\.\/(.*)\.\w+$/, '$1')
  modules[name] = fileList(filepath).default
  return modules
}, {})

export default new vuex.Store({

  state: {
    delModelFlag: false,
    modelParamList: [],
    successUploadList: [],
    uploadIndex: null,
    paramIndex: null,
    nowRouter: {},
    /**
     * 微信菜单
     */
    // 展示在手机上面的信息
    SHOWASPHONEINFO: {
    },
    //
    MenuIndexList: [],
    MenuList: [

    ],
    // 跳转网址
    BaseMenuView: {
      type: "view",
      name: "菜单名称",
      url: "",
      isAuthorize: '0'
    },
    // 跳转小程序
    BaseMenuMini: {
      type: "miniprogram",
      name: "菜单名称",
      url: "",
      appid: "",
      pagepath: "",
    },
    // 子菜单
    BaseMenuSub: {
      type: "subbutton",
      name: "菜单名称",
      sub_button: []
    },
    // 侧边栏数据
    list1: [],
    list2: [],


  },
  mutations: {
    SET_delModelFlag(state, val) {
      state.delModelFlag = val
    },
    SET_UPLOADINDEX(state, val) {
      state.uploadIndex = val
    },
    SET_PARAMINDEX(state, val) {
      state.paramIndex = val
    },

    SET_modelParamList(state, val) {
      if (val === null) {
        state.modelParamList.splice(state.paramIndex, 1, [{ modelParamInfo: '0|0|0', modelParamType: 1 }, { modelParamInfo: '1|1|1', modelParamType: 2 }, { modelParamInfo: '0|0|0', modelParamType: 3 }, { modelParamInfo: '0|0', modelParamType: 4 }])
      } else {
        state.modelParamList.splice(state.paramIndex, 1, val)
      }
    },
    Del_modelParamList(state, val) {
      state.modelParamList.splice(state.paramIndex, 1)

    },
    EDIT_modelParamList(state, val) {
      // state.successUploadList = val ?? []
      state.modelParamList = val


    },
    Clear_modelParamList(state, val) {
      state.modelParamList = []
    },
    // 侧边栏数据控制
    SET_LIST1(state, val) {
      // console.log('changelist1Store侧边栏数据控制');
      state.list1 = val ?? []
    },
    SET_LIST2(state, val) {
      state.list2 = val || []
    },
    SET_successUploadList(state, val) {
      // state.successUploadList = val ?? []
      if (val === null) {
        state.successUploadList.splice(state.uploadIndex, 1, {})
      } else {
        state.successUploadList.splice(state.uploadIndex, 1, val)
      }

    },
    EDIT_successUploadList(state, val) {
      // state.successUploadList = val ?? []
      state.successUploadList = val

    },

    Clear_successUploadList(state, val) {
      state.successUploadList = []
    },
    Del_successUploadList(state, val) {
      if (!val) {
        state.successUploadList.splice(state.uploadIndex, 1)

      } else {
        state.successUploadList.splice(state.uploadIndex, 1, val)

      }

    },
    // 设置当前路由
    SET_NOWROUTER(state, val) {
      state.nowRouter = val || {}
    },
    // 修改手机展示信息
    CHANGE_SHOWASPHONEINFO(state, val) {
      state.SHOWASPHONEINFO = JSON.parse(JSON.stringify(val))
    },
    // 添加菜单
    Add_MenuList(state, value) {
      if (state.MenuList.length < 3) {
        state.MenuList.push(value)
      }
      this.commit('Set_MenuIndexList', [state.MenuList.length - 1])
    },
    // 删除菜单
    Del_MenuList(state, index) {
      state.MenuList.splice(index, 1)
      this.commit('Set_MenuIndexList', [0])
    },
    // 设置某一个菜单信息
    Set_MenuList(state, { value, index, type, firIndex }) {
      let list = JSON.parse(JSON.stringify(state.MenuList))
      if (type === 1) {
        list[firIndex] = value
      } else {
        list[firIndex].sub_button[index] = value
      }
      state.MenuList = list
    },
    // 设置菜单下标
    Set_MenuIndexList(state, list) {
      state.MenuIndexList = list
    },
    // 重置菜单
    Reset_MenuList(state, list) {
      state.MenuList = list
    },
    // 添加子菜单
    Add_SubMenu(state, { firIndex, value }) {
      let list = JSON.parse(JSON.stringify(state.MenuList))
      list[firIndex].sub_button.push(value)
      state.MenuList = list
      this.commit('Set_MenuIndexList', [firIndex, list[firIndex].sub_button.length - 1])
    },
    // 删除子菜单
    Del_SubMenu(state, { firIndex, index }) {
      let list = JSON.parse(JSON.stringify(state.MenuList))
      list[firIndex].sub_button.splice(index, 1)
      state.MenuList = list
      if (list[firIndex].sub_button.length > 0) {
        this.commit('Set_MenuIndexList', [firIndex, list[firIndex].sub_button.length - 1])
      } else {
        this.commit('Set_MenuIndexList', [firIndex])
      }
    },
    // 全部重置菜单
    resetAll(state) {
      state.MenuIndexList = []
      state.MenuList = [

      ]
    }
  },
  getters: {

    // Get_Detail(state){
    //   return { ...state}
    // },
    Get_MenuItem(state) {
      if (state.MenuIndexList[1] !== undefined) {
        return state.MenuList[state.MenuIndexList[0]].sub_button[state.MenuIndexList[1]]
      }
      return state.MenuList[state.MenuIndexList[0]]
    },
    Get_BaseMenuView(state) {
      return { ...state.BaseMenuView }
    },
    Get_BaseMenuMini(state) {
      return { ...state.BaseMenuMini }
    },
    Get_BaseMenuSub(state) {
      return { ...state.BaseMenuSub }
    },

  },
  modules: moduleList
})