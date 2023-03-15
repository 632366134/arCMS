/**
 * 防抖
 * @param {*} time
 * @returns
 */
export const debounce = (time = 100) => {
    let timer
    return function (target, propertyKey, descriptor) {
        let fun = descriptor.value
        descriptor.value = function (...args) {
            if (timer) {
                clearTimeout(timer)
            }
            return new Promise((resolve) => {
                timer = setTimeout(() => {
                    resolve(fun.call(this, ...args))
                }, time)
            })
        }
    }
}

/**
 * 节流
 * @param {*} time
 * @returns
 */
export const throttle = (time = 30) => {
    let nowTime
    return function (target, propKey, descriptor) {
        let fun = descriptor.value
        const createFun = function () {
            return function (...args) {
                let currentTime = new Date().getTime()
                if (!nowTime || currentTime - nowTime >= time) {
                    nowTime = currentTime
                    return fun.call(this, ...args)
                }
            }
        }
        descriptor.value = createFun()
    }
}

/**
 * loading自动加载自动取消
 * @returns
 */
export const loading = (optioins = {}) => {
    return function (t, k, d) {
        let fun = d.value
        d.value = function (...args) {
            return import('element-ui').then(async res => {
                let loading = res.default.Loading.service(optioins)
                try {
                    let funBack = fun.call(this, ...args)
                    if (funBack instanceof Promise) {
                        return funBack.then(res => {
                            return res
                        }).catch((error) => {
                            return error
                        }).finally(() => {
                            loading.close()
                        })
                    } else {
                        loading.close()
                        return funBack
                    }
                } catch (error) {
                    loading.close()
                    console.log(error)
                }
            })
        }
    }
}

/**
 * 确定之后操作
 * @param {*} param0
 * @returns
 */
export const confirm = ({ message = '', title = '提示', cancelFun, ph }) => {
    return function (t, k, d) {
        const fun = d.value
        d.value = function (data) {
            return import('element-ui').then(element => {
                if (ph){
                    message = message.replace('#ph#', data[ph])
                }
                element.default.MessageBox.confirm(message, title).then(() => {
                    let funBack = fun.call(this, data)
                    return funBack
                }).catch(() => { cancelFun && cancelFun.call(this, data) })
            })
        }
    }
}