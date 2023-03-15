import JSZip from "jszip";
import fileSave from 'file-saver'


export class ZipClass {
    constructor() {
        this.zip = new JSZip()
        // 解压排除的正则
        this.excludes = [/^__MACOSX/, /\.DS_Store/]
    }
    // 打包
    pack({ fileList, zipName }) {
        for (let i = 0; i < fileList.length; i++) {
            let file = fileList[i]
            this.zip.file(file.name, file)
        }
        return this.zip.generateAsync({ type: 'blob' }).then(function (blob) {
            fileSave.saveAs(blob, zipName) // 2) trigger the download
        })
    }
    // 解压
    load(file) {
        return this.zip.loadAsync(file).then(async zipData => {
            let fileList = [], errorList = []
            for (let i in zipData.files) {
                let fileItem = zipData.files[i]
                if (!fileItem.dir && this.checkFileName(i)) {
                    try {
                        let zipFile = await this.zipToFile(zipData, i)
                        fileList.push(zipFile)
                    } catch (error) {
                        console.log(error);
                        errorList.push({ msg: i + '文件解析失败' })
                    }
                }
            }
            return {
                fileList, errorList
            }
        })
    }
    // 校验zip里面的文件名称是否有效
    checkFileName(name) {
        return this.excludes.every((reg) => !reg.test(name))
    }
    // 获取图片文件的尺寸
    async getPicSize(file) {
        let result = { x: 0, y: 0 }
        if (['jpg', 'png', 'jpeg'].includes(file.name.split('.').pop().toLowerCase())) {
            await new Promise((resolve, reject) => {
                let url = URL.createObjectURL(file)
                let img = new Image()
                img.src = url
                img.onload = () => {
                    result = {
                        x: img.width,
                        y: img.height
                    }
                    resolve()
                }
                img.onerror = () => {
                    reject()
                }
            })
        }
        return result
    }
    /**
     * 将zip读取的文件转换为File格式
     * @param {*} zipData zip数据
     * @param {*} key key
     * @returns 
     */
    zipToFile(zipData, key) {
        return zipData.file(key).async('blob').then(async blob => {
            const lastIndex = key.lastIndexOf('/')
            let fileName = key.substr(lastIndex + 1), folder = key.substr(0, lastIndex)
            let file = new File([blob], fileName)
            let size = {}
            try {
                size = await this.getPicSize(file)
            } catch (error) {

            }
            return {
                raw: file,
                size,
                file: file,
                folder: folder
            }
        }).catch((err) => {
            console.log(err);
            return err
        })
    }
}