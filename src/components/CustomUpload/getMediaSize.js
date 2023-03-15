if (!window.isRegisteredLoad) {
    window.isRegisteredLoad = true
    window.addEventListener('model-loaded', (e) => {
        let id = e.target.getAttribute('data-id')
        let obj = e.target.object3D, modelInfo = {
            aniList: []
        }
        if (obj?.children) {
            for (let i = 0; i < obj.children.length; i++) {
                let item = obj.children[i]
                if (item?.animations) {
                    item.animations.forEach((aItem) => {
                        modelInfo.aniList.push({
                            name: aItem.name
                        })
                    })
                }
            }
        }
        // eslint-disable-next-line no-undef
        let box = new THREE.Box3().setFromObject(obj)
        let fItem = GetSize.finishObjList.find((v) => v.id === id)
        if (fItem) {
            Object.assign(fItem, {
                info: {
                    size: box.size(),
                    center: box.center(),
                    modelInfo: modelInfo
                }
            })
        }
    })
}


export default class GetSize {
    static finishObjList = []
    constructor() {
        this.config = {
            obj: this.calcObj.bind(this),
            video: this.calcVide.bind(this),
            glb: this.calcGlb.bind(this),
            gltf: this.calcGlb.bind(this)
        }
    }
    initEl() {
        let el = document.getElementById('calcBox')
        if (el) {
            this.el = el
        } else {
            return new Promise((resolve) => {
                this.el = document.createElement('div')
                this.el.id = 'calcBox'
                this.el.style.position = 'fixed'
                this.el.style.left = '200vw'
                this.el.style.display = 'none'
                document.body.appendChild(this.el)
                setTimeout(() => {
                    resolve()
                }, 100);
            })
        }
    }
    async calc({ name, mediaType, url }) {
        try {

            await this.initEl()
            const type = name.split('.').pop().toLowerCase()
            let result
            if (mediaType === 2) {
                result = await this.config['video'](url)
            } else if (mediaType === 5 || mediaType === 6) {
                result = await this.config[type](url)
            }
            console.log('获取到的资源信息:', result);
            return result
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    }
    calcVide(url) {
        return new Promise((resolve, reject) => {
            try {
                let video = document.createElement('video')
                video.src = url
                video.autoplay = false
                this.el.appendChild(video)
                video.addEventListener('canplay', (e) => {
                    resolve({
                        size: {
                            x: e.target.videoWidth,
                            y: e.target.videoHeight,
                            z: 0
                        }
                    })
                    video.remove()
                })
                video.addEventListener('error', () => {
                    reject()
                })
            } catch (error) {
                reject(error)
            }
        })
    }
    calcObj(url) {
        return new Promise((resolve, reject) => {
            let id = 'id' + Date.now()
            GetSize.finishObjList.push({
                id,
                info: null
            })
            try {
                let scene = document.createElement('a-scene')
                let obj = document.createElement('a-obj-model')
                obj.setAttribute('src', url)
                obj.setAttribute('data-id', id)
                scene.append(obj)
                this.el.append(scene)
                this.timerFectch(id).then(res => {
                    resolve(res)
                    scene.remove()
                })
            } catch (error) {
                reject(error)
            }
        })
    }
    calcGlb(url) {
        return new Promise((resolve, reject) => {
            let id = 'id' + Date.now()
            GetSize.finishObjList.push({
                id,
                info: null
            })
            try {
                let scene = document.createElement('a-scene')
                let obj = document.createElement('a-gltf-model')
                obj.setAttribute('src', url)
                obj.setAttribute('data-id', id)
                scene.append(obj)
                this.el.append(scene)
                this.timerFectch(id).then(res => {
                    resolve(res)
                    scene.remove()
                })
            } catch (error) {
                reject(error)
            }
        })
    }
    // 轮询
    timerFectch(id) {
        return new Promise((resolve, reject) => {
            let fItem = GetSize.finishObjList.find((v) => v.id === id)
            // console.log(fItem)
            if (fItem && fItem.info !== null) {
                // console.log(fItem);
                resolve(fItem.info)
            } else {
                // console.log('not found');
                setTimeout(() => {
                    this.timerFectch(id).then(res => {
                        resolve(res)
                    }).catch((error) => {
                        console.log(error)
                        reject(error)
                    })
                }, 300);
            }
        })
    }
}