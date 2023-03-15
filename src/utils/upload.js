import axios from "axios"
import { AJAXIP, getSessionStr } from "./axiosIP"


const upload = function ({
    ip = AJAXIP,
    url = '',
    data,
    onUploadProgress,
    contentType = 'application/x-www-form-urlencoded;charset=utf-8',
}) {
    return new Promise((resolve, reject) => {
        let config = {
            headers: {
                'content-type': contentType,
            },
            onUploadProgress: (e) => {
                if (e) {
                    let progress = (e.loaded / e.total * 100 | 0)
                    progress = Math.min(progress, 99)
                    onUploadProgress && onUploadProgress(progress)
                }
            }
        };
        url = getSessionStr(url)
        axios.post(
            url = ip + url,
            data,
            config
        ).then(res => {
            onUploadProgress(100)
            resolve(res.data)
        }).catch(() => {
            reject()
        })
    })
}

export default upload

export const uploadNew = ({
    ip = '',
    url = '',
    data,
    onUploadProgress,
    contentType = 'multipart/form-data',
}) => new Promise((resolve, reject) => {
    console.log(data)
    let config = {
        headers: {
            'content-type': contentType,
        },
        onUploadProgress: (e) => {
            if (e) {
                let progress = (e.loaded / e.total * 100 | 0)
                progress = Math.min(progress, 99)
                onUploadProgress && onUploadProgress(progress)
            }
        }
    };
    axios.post(
        url = ip + url,
        data,
        config
    ).then(res => {
        if (res.status == 204) {
            onUploadProgress && onUploadProgress(100)
            resolve(Object.assign(res, { code: 1000 }))
            console.log(res)
        } else {
            reject(res)
        }
    }).catch((error) => {
        reject(error)
    })
})