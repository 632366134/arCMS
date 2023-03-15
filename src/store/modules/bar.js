/**
 * tab切换栏
 */
let baseBar = [
    {
        title: "Home",
        path: "/Home",
        name: "Home",
        fullPath: "/Home"
    }
]

export function getBaseList() {
    if (sessionStorage.barList) {
        return JSON.parse(sessionStorage.barList)
    }
    return [...baseBar]
}

export default {
    namespaced: true,
    state: {
        barList: getBaseList(),
        barIndex: 0
    },
    mutations: {
        /**
         * 添加bar
         * @param {*} state 
         * @param {baseBar} value 
         */
        Add_BarList(state, value) {
            //修改；路由fullPath
            let editIndex = null
            if (
                !state.barList.some((v, i) => {
                    //当前存在该路由
                    if (v.path === value.path) {
                        // 存在该路由但是fullPath 不同 （招标设置） 
                        this.commit('bar/Set_BarIndex', i)
                        if (v.fullPath !== value.fullPath) {
                            editIndex = i
                            return true
                        }
                    }
                    return v.path === value.path;
                })
            ) {
                state.barList.push({
                    title: value.meta.title,
                    path: value.path,
                    name: value.name,
                    fullPath: value.fullPath
                });
                this.commit('bar/Set_BarIndex', state.barList.length - 1)
            }
            if (editIndex !== null) {
                this.commit('bar/Edit_BarList', {
                    index: editIndex,
                    value
                })
            }
        },
        /**
         * 重置tab
         * @param {*} state 
         */
        Reset_BarList(state) {
            state.barIndex = 0
            state.barList = [...baseBar]
        },
        /**
         * 删除tab
         * @param {*} state 
         * @param {*} index tab下标
         * @param {*} keepAlive 是否需要清除缓存里面的路由
         * @param {*} keepFull 是否需要保留当前的路径
         * @param {*} mustKeep 是否必须保留缓存
         */
        Del_BarList(state, { index, keepAlive, keepFull, fullPath, mustKeep }) {
            let { name } = state.barList[index]
            let oldFullPath = state.barList[index].fullPath
            if (!mustKeep && keepAlive) {
                this.dispatch("permission/toggleCachList", {
                    name,
                    type: 0
                });
            }
            state.barList.splice(index, 1)
            if (!keepFull && fullPath === oldFullPath) {
                sessionStorage.removeItem('fullPath')
            }
        },
        /**
         * 设置barList
         * @param {*} state 
         * @param {*} value 
         */
        Set_BarList(state, value) {
            state.barList = value
        },
        /**
         * 设置bar 当前选中下标
         * @param {*} state 
         * @param {*} value 
         */
        Set_BarIndex(state, value) {
            state.barIndex = value
        },
        /**
         * 修改barList 深拷贝 解决监听不到的问题
         * @param {*} state 
         * @param {index: "下标", value: baseBar} param1 
         */
        Edit_BarList(state, { index, value }) {
            let list = JSON.parse(JSON.stringify(state.barList))
            list[index] = {
                title: value.meta.title,
                path: value.path,
                name: value.name,
                fullPath: value.fullPath
            }
            this.commit('bar/Set_BarList', list)
        },

    },
    actions: {
        /**
         * 返回
         * @param {*} param0 
         * @param {*} param1  当前路由
         */
        handleBack({ commit }, { nowRoute, mustKeep }) {
            return new Promise((resolve, reject) => {
                if (!nowRoute) {
                    reject()
                }
                let list = this.state.bar.barList, index
                list.map((v, i) => {
                    if (v.name === nowRoute.name) {
                        index = i
                    }
                })
                if (index !== undefined) {
                    commit('Del_BarList', { index, keepAlive: nowRoute.meta.keepAlive, keepFull: true, fullPath: nowRoute.fullPath, mustKeep })
                }
                resolve()
            })
        }
    }
}