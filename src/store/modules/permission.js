import router, { baseRouter, resetRouter } from "@/router/index"
import { getRoutes } from "../../utils/menuList"
import nofoundModel from "@/router/module/404"
/**
 *
 * 根据权限显示不同的路由
 * @param {*} allRoutes 路由列表
 * @param {*} roles 条件
 */
export function filterRoutes(allRoutes, roles) {
    let routes = allRoutes.reduce((list, item) => {
        return list.concat(item.router)
    }, [])
    let result = []
    let permission
    if (sessionStorage.pagePermission) {
        permission = JSON.parse(sessionStorage.pagePermission)
    }

    function checkSamePermission(arr1, arr2) {
        let boo = false
        for (let i = 0; i < arr1.length; i++) {
            if (arr2.includes(arr1[i])) {
                boo = true
                break
            }
        }
        return boo
    }

    /**
     * 获取可以使用的路由列表
     * @param {*} v 路由
     * @param {*} permission 拥有的页面权限
     */
    function getList(v, permission) {
        let routeItem = v
        let list = []
        if (sessionStorage.permission === '0') {
            let childList = []
            if (routeItem.children) {
                // 深度查询
                routeItem.children.forEach((item, index) => {
                    childList.push(...getList(item, permission))
                })
                if (childList.length > 0) {
                    list.push({ ...routeItem, children: childList })
                }
            } else {
                list.push(routeItem)
            }
        }
        return list
    }

    if (permission != undefined || sessionStorage.permission === '0') {
        routes.map((v) => {
            getList(v, permission).forEach((routeItem) => {
                if (routeItem.children && routeItem.children.length > 0) {
                    result.push(routeItem)
                }
            })
        })
    }
    return result.concat(nofoundModel)
}

/**
 * 判断当前账户对应的所有路由
 */
export function getAllMenu() {
    let list = []
    list = getNowModalRouter()
    return list
}


/**
 * 获取当前模块的路由
 */
export function getNowMenu(allRouters) {
    let nowMenuPermission = sessionStorage.nowMenuPermission
    return allRouters.find((v) => v.permissionCode === nowMenuPermission)?.router || []
}

/**
 * 获取用户端所有模块的路由
 */
export function getNowModalRouter() {
    let result = []
    let permissionOldMode = sessionStorage.permissionOldMode
    if (permissionOldMode) {
        getRoutes().forEach((item, index) => {
            result.push(item)
        })
    }
    return result
}

/**
 * 获取基础数据
 */
export function getBaseList() {
    if (sessionStorage.cachList) {
        return JSON.parse(sessionStorage.cachList)
    }
    return [...baseCachList]
}

//初始缓存页  home
const baseCachList = ["Home"]

export default {
    namespaced: true,
    state: {
        routes: [],//当前路由
        cachList: getBaseList(),//需要缓存的路由
        prevURL: "",
        isCollapse: false
    },
    getters: {
        get_routes(state) {
            return state.routes
        },
        get_cachList(state) {
            return state.cachList
        },
        get_prevURL(state) {
            return state.prevURL || ''
        },
    },
    mutations: {
        //设置路由
        SET_ROUTES(state, routes) {
            state.routes = baseRouter.concat(routes || [])
        },
        //添加缓存组件
        ADD_CACHLIST(state, values) {
            if (!state.cachList.includes(values)) {
                state.cachList.push(values)
            }
        },
        //重置缓存组件
        Reset_CACHLIST(state, value) {
            state.cachList = [...baseCachList]
        },
        /**
         * 删除缓存组件
         * @param {*} state
         * @param {name: "路由名称"} values
         */
        DEL_CACHLIST(state, values) {
            let index = state.cachList.indexOf(values)
            let barIndex = 0
            barIndex = this.state.bar.barList.reduce((i, item) => {
                if (item.name === values) {
                    i++
                }
                return i
            }, barIndex)
            if (barIndex > 1) {
                return
            }
            setTimeout(() => {
                state.cachList.splice(index, 1)
            }, 100);
        },
        /**
         * 展开收起侧边栏
         * @param {*} state
         * @param {Boolean} value
         */
        Set_IsCollapse(state, value) {
            state.isCollapse = value
        }
    },
    actions: {
        /**
         * 获取路由
         * @param {*} param0
         */
        getRoutes({ commit }) {
            return new Promise((resolve, reject) => {
                let allRouters = [], filterList = []
                try {
                    allRouters = getAllMenu()
                    filterList = filterRoutes(allRouters)
                } catch (error) {
                    console.log(error);
                }
                {
                    commit('SET_ROUTES', filterRoutes([{ router: getNowMenu(allRouters) }]))
                }
                {
                    resetRouter()
                    // router.addRoutes(filterList)
                   filterList.forEach((item)=>{
                    router.addRoute(item)
                    })
                }
                resolve()
            })
        },
        getLoginOutRouter({ commit }) {
            return new Promise((resolve, reject) => {
                commit('SET_ROUTES', [])
                resetRouter()
                router.addRoute([])
                resolve()
            })
        },
        /**
         * 新增删除缓存列表
         * @param {*} name
         * @param {*} type 1 -> 新增 0 -> 删除
         */
        toggleCachList({ commit }, {
            name,
            type
        }) {
            if (type === 1) {
                commit('ADD_CACHLIST', name)
            } else {
                commit('DEL_CACHLIST', name)
            }
        }
    }
}