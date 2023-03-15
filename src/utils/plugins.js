import { checkId } from "../utils/utils"

/**
 * 获取日期格式
 * @param {*} date 日期
 * @param {*} type 日期间隔符
 * @param {*} timeType 时间间隔符
 */
export const getDate = (date, type = '-', timeType = ':') => {
    if (date) {
        date = new Date(date)
    } else {
        date = new Date()
    }
    let y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        mm = date.getMinutes(),
        s = date.getSeconds()
    m = m < 10 ? '0' + m : m
    d = d < 10 ? '0' + d : d
    h = h < 10 ? '0' + h : h
    mm = mm < 10 ? '0' + mm : mm
    s = s < 10 ? '0' + s : s
    return {
        date: `${y}${type}${m}${type}${d}`,
        time: `${h}${timeType}${mm}${timeType}${s}`
    }
}

// 日期相关
export const GetDate = {
    install(vue, options) {

        vue.prototype.$getDate = getDate

        /**
         * 获取num天之后是几月几号
         * @param {*} date 开始日期
         * @param {*} num 天数
         * @param {*} type 分隔符
         */
        vue.prototype.$getDayDate = function (date = new Date(), num, type = '-') {
            let itemDate = new Date(new Date(date).setDate(new Date(date).getDate() + Number(num))).toLocaleDateString()
            let day = this.$getDate(itemDate, type).date
            return day
        }
        /**
        * 获取生日
        * @param {*} str 身份证号
        */
        vue.prototype.$getBirthDay = (str) => {
            if (str && str.length == 18) {
                return str.slice(6, 10) + '-' + str.slice(10, 12) + '-' + str.slice(12, 14)
            }
            return ''
        }
        /**
         * 获取前后年份
         * @param {*} num 
         */
        vue.prototype.$initYear = function (num) {
            let year = new Date().getFullYear();
            let list = [],
                list2 = [];
            for (let i = 0; i < num; i++) {
                list.push(year - i);
                if (i > 0) {
                    list2.push(year + i);
                }
            }
            list = list.reverse().concat(list2);
            return list;
        }

        /**
         * 获取两个日期直接的天数
         * @param {*} startDay 
         * @param {*} endDay 
         */
        vue.prototype.$getDateNum = function (startDay = "", endDay = "") {
            if (!startDay || !endDay) return 0
            let [startDate, startTime] = startDay.split(" "),
                [endDate, endTime] = endDay.split(" ")
            let sy, sM, sd, sh = 0, sm = 0, ss = 0,
                ey, eM, ed, eh = 0, em = 0, es = 0
            if (startDate) {
                [sy, sM, sd] = startDate.split("-")
            }
            if (startTime) {
                [sh, sm, ss] = startTime.split(":")
            }
            if (endDate) {
                [ey, eM, ed] = endDate.split("-")
            }
            if (endTime) {
                [eh, em, es] = endTime.split(":")
            }
            let sTime = new Date(sy, sM - 1, sd, sh, sm, ss).getTime(), eTime = new Date(ey, eM - 1, ed, eh, em, es).getTime()
            return Math.max(Math.ceil((eTime - sTime) / 86400000), 0)
        }

        /**
         * 查询最近num年的开始日期和结束日期
         * @param {*} num 
         */
        vue.prototype.$getNowYearTime = function (num = 1) {
            let nowTime = this.$store.state.base.nowTime
            if (!nowTime) {
                const { date } = getDate()
                nowTime = `${date}`
            } else {
                nowTime = nowTime.split(" ")[0]
            }
            let [ny, nm, nd] = nowTime.split("-")
            return {
                startTime: getDate(new Date(ny - num, nm - 1, nd)).date + " 00:00:00",
                endTime: nowTime + " 23:59:59"
            }
        }
    }
}

// 工具相关
export const GetUtil = {

    install(vue, options) {
        vue.prototype.$checkId = checkId
        /**
         * 复制
         * @param {*} str 复制的内容
         * @param {*} fb 回调
         */
        vue.prototype.$copy = (str, fb) => {
            var input = document.createElement('input')
            input.value = str; // 修改文本框的内容
            input.style.opacity = 0
            document.body.appendChild(input)
            input.select(); // 选中文本
            document.execCommand("copy"); // 执行浏览器复制命令
            document.body.removeChild(input)
            if (typeof fb === 'function') {
                fb()
            }
        }
        /**
         * 生成随机code 时间戳 + 随机字符串
         * @param {*} num 随机字符串的长度
         */
        vue.prototype.$getCode = (num) => {
            num = num || 4
            let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
            let id = new Array(num).fill('').map(() => {
                return str[Math.ceil(Math.random() * (str.length - 1))]
            })
            return new Date().getTime() + id.join('')
        }
        /**
         * 合并对象
         * @param {*} obj 目标对象
         * @param {*} obj2 提供参数的对象
         */
        vue.prototype.$merge = (obj, obj2) => {
            if (typeof obj !== 'object' || typeof obj2 !== 'object') {
                return {}
            }
            let result = {}
            for (let i in obj) {
                result[i] = obj2[i] === undefined ? '' : obj2[i]
            }
            return result
        }
        /**
        * 判断两个一维数组是否存在交集
        * @param {*} arr1 
        * @param {*} arr2 
        */
        vue.prototype.$sameArray = function (arr1, arr2) {
            if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
                return {
                    result: false
                }
            }
            return {
                result: arr1.some((item) => arr2.some((v) => v === item))
            }
        }


        /**
        * 加密
        * @param {*} str 
        */
        vue.prototype.$encode = function (str) {
            return encodeURIComponent(btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            })))
        }
        /**
        * 解密
        * @param {*} str 
        */
        vue.prototype.$decode = function (str) {
            return decodeURIComponent(atob(decodeURIComponent(str)).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }
    }
}

// 文件相关
export const DownLoadFile = {
    install(vue, options) {
        /**
         * 读取图片base64以及宽高大小
         * @param {*} file 文件
         */
        vue.prototype.$readASBase = (file) => {
            return new Promise((resolve, reject) => {
                let fs = new FileReader();
                fs.readAsDataURL(file);
                fs.onload = res => {
                    let base64 = res.target.result
                    let img = new Image()
                    img.src = base64
                    let size = parseInt((base64.length - base64.length / 8 * 2) / 1024)
                    img.onload = function () {
                        resolve({
                            base64,
                            width: img.width,
                            height: img.height,
                            type: file.type.replace('image/', ''),
                            size
                        });
                    }
                };
            });
        }
        vue.prototype.$readImgBase = (src) => {
            return new Promise((resolve, reject) => {
                try {
                    let canvas = document.createElement('canvas')
                    let ctx = canvas.getContext('2d')
                    let img = new Image()
                    img.src = src
                    img.crossOrigin = 'Anonymous'
                    img.onload = () => {
                        canvas.width = img.width
                        canvas.height = img.height
                        ctx.drawImage(img, 0, 0, img.width, img.height)
                        resolve(canvas.toDataURL())
                    }
                    img.onerror = (err) => {
                        reject(err)
                    }
                } catch (error) {
                    reject(error)
                }
            });
        }

        vue.prototype.$imgToFile = function (file, size = 800) {
            return new Promise((resolve, reject) => {
                try {
                    let url = URL.createObjectURL(file)
                    let canvas = document.createElement('canvas')
                    // canvas.style.position = 'fixed'
                    // canvas.style.left = '-3000px'
                    // canvas.style.top = 0
                    // document.body.appendChild(canvas)
                    setTimeout(() => {
                        let ctx = canvas.getContext('2d')
                        let img = new Image()
                        img.src = url
                        img.crossOrigin = 'Anonymous'
                        img.onload = () => {
                            let w = img.width, h = img.height
                            if (img.width > img.height) {
                                if (img.width > size) {
                                    w = size
                                    h = Math.round(img.height * size / img.width)
                                }
                            } else {
                                if (img.height > size) {
                                    h = size
                                    w = Math.round(img.width * size / img.height)
                                }
                            }
                            canvas.width = w
                            canvas.height = h
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                            canvas.toBlob((res) => {
                                resolve(new File([res], file.name))
                            })
                        }
                        img.onerror = () => {
                            throw new Error(url + '图片加载失败')
                        }
                    }, 500);
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}

// 界面相关
export const pagePlugin = {
    install(vue, options) {

    }
}