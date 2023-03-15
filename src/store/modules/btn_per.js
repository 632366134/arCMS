export default {
    namespaced: true,
    state: {
        //按钮类型和可以使用的对应权限
        //类型pageName/功能pinjyin: ['权限1']
        btnType: {
            "page1/addUser": []
        }
    },
    getters: {
        getType: (state) => (type, permission) => {
            if (!type || !permission) {
                return false
            }
            if(!state.btnType[type]){
                return false
            }
            return state.btnType[type].includes(permission)
        }
    },
    mutations: {

    },
    actions: {

    }
}