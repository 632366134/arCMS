<template>
  <div>
    <div class="canvas" ref="canvas"></div>
    <!-- <video autoplay ref="video" class="videoClass" :src="videoUrl"></video> -->
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let renderer, scene, camera, controls

export default {
  data() {
    return {
      videoUrl: '',
      modelList: []
    }
  },
  props: ['projectCode'],
  async mounted() {
    console.log('mounted3D')
    this.UseCanvasThreejsPreiview(this.$refs.canvas)
    let list = this.modelUrl
    let length = list.length
    console.log('edit加载3')
    console.log(length, 'edit加载4')
    if (length <= 0) return
    for (let i = 0; i < list.length; i++) {
      const v = list[i]
      if (v.mediaType) {
        let { mediaUrl, mediaCode } = v
        console.log('edit加载1')
        await this.CreateModel('https:' + mediaUrl, mediaCode)
        console.log('edit加载2')
      } else {
        let { folder, name, mediaCode } = v
        await this.CreateModel(
          `https://ar-p2.obs.cn-east-3.myhuaweicloud.com/${folder}${name}`,
          mediaCode
        )
      }
    }
  },

  computed: {
    modelParamList() {
      return this.$store.state.modelParamList
    },
    modelUrl() {
      return this.$store.state.successUploadList
    },
    uploadIndex() {
      return this.$store.state.uploadIndex
    },
    paramIndex() {
      return this.$store.state.paramIndex
    },
    delModelFlag() {
      return this.$store.state.delModelFlag
    }
  },
  watch: {
    // length: {
    //   handler() {
    //     if (this.length < this.modelList.length) {
    //       console.log(123)

    //       this.modelList.splice(this.paramIndex, 1)
    //     }
    //   }
    // },
    modelUrl: {
      async handler() {
        console.log('modelUrlchange')
        if (this.uploadIndex === null) return
        if (this.delModelFlag) {
          let old = this.modelList[this.uploadIndex]
          scene.remove(old)
          this.modelList.splice(this.uploadIndex, 1)
          this.$store.commit('SET_delModelFlag', false)
          return
        }
        let data = this.modelUrl[this.uploadIndex]
        console.log(data, 'data')
        if (!data) return
        let data2
        try {
          data2 = JSON.parse(JSON.stringify(data))
        } catch (error) {
          return
        }
        console.log(data2, '加载模型1data')
        if (Object.keys(data2).length === 0) {
          let old = this.modelList[this.uploadIndex]
          scene.remove(old)
          this.modelList.splice(this.uploadIndex, 1, {})
          return
        } else {
          // this.modelList.splice(this.uploadIndex, 1)
        }

        if (typeof old != 'undefined') {
          if (data2.mediaCode !== old.meidaCode) return
        }
        if (data.mediaType) {
          console.log('1')
          let { mediaUrl, mediaCode } = data
          await this.CreateModel(mediaUrl, mediaCode)
        } else {
          console.log('2')
          let { folder, name, mediaCode } = data
          await this.CreateModel(
            `https://ar-p2.obs.cn-east-3.myhuaweicloud.com/${folder}${name}`,
            mediaCode
          )
        }
      }
    },
    modelParamList: {
      async handler() {
        if (this.delModelFlag) return
        console.log('modelParamListchange')
        if (this.modelList.length < this.modelUrl.length) return
        console.log('modelParamListchange?')

        // scene.remove(this.modelList[this.paramIndex])
        let modeldata2 = this.modelList[this.paramIndex]
        let modeldata
        try {
          modeldata = JSON.parse(JSON.stringify(modeldata2))
          console.log(modeldata)
        } catch (error) {
          return
        }
        if (Object.values(modeldata).length == 0) return

        let paramdata = this.modelParamList[this.paramIndex]
        let position, scale, rotation
        paramdata.forEach((v) => {
          switch (v.modelParamType) {
            case 1:
              position = v.modelParamInfo.split('|')
              break
            case 2:
              scale = v.modelParamInfo.split('|')
              break
            case 3:
              rotation = v.modelParamInfo.split('|')
              break
            default:
              break
          }
        })

        modeldata2.position.set(position[0], position[1], position[2])
        modeldata2.rotation.set(rotation[0], rotation[1], rotation[2])
        modeldata2.scale.set(scale[0], scale[0], scale[0])
        controls.update()
      },
      deep: true
    }
    // modelUrl: {
    //   async handler() {
    //     console.log('加载模型2')
    //     let oldList = this.modelList
    //     oldList.forEach((val) => {
    //       scene.remove(val)
    //     })
    //     let list = this.modelUrl
    //     let length = list.length
    //     if (length <= 0) return
    //     this.modelList = []
    //     for (let i = 0; i < list.length; i++) {
    //       const v = list[i]
    //       if (v.mediaType) {
    //         let { mediaUrl, mediaCode } = v
    //         await this.CreateModel(mediaUrl, mediaCode)
    //       } else {
    //         let { folder, name, mediaCode } = v
    //         console.log('加载模型1')
    //         await this.CreateModel(
    //           `https://ar-p2.obs.cn-east-3.myhuaweicloud.com/${folder}${name}`,
    //           mediaCode
    //         )
    //       }
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // },
    // modelParamList: {
    //   handler() {
    //     let list = this.modelParamList
    //     let position, rotation, scale
    //     if (list.length <= 0 || this.modelUrl.length <= 0) return
    //     this.modelList.forEach((v, i) => {
    //       list.forEach((v2, i2) => {
    //         if (v2[0].mediaCode === v.mediaCode) {
    //           v2.forEach((item) => {
    //             switch (item.modelParamType) {
    //               case 1:
    //                 position = item.modelParamInfo.split('|')
    //                 break
    //               case 2:
    //                 scale = item.modelParamInfo.split('|')
    //                 break
    //               case 3:
    //                 rotation = item.modelParamInfo.split('|')
    //                 break
    //               default:
    //                 break
    //             }
    //           })
    //         }
    //       })
    //       if (v) {
    //         console.log('update!', scale)
    //         v.position.set(position[0], position[1], position[2])
    //         v.rotation.set(rotation[0], rotation[1], rotation[2])
    //         v.scale.set(scale[0], scale[0], scale[0])
    //         controls.update()
    //       }
    //     })
    //   },
    //   deep: true
    // }
  },
  methods: {
    initTHREE() {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, 375 / 667, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setClearColor('#ccc')
      renderer.setSize(600, 900)
      controls = new OrbitControls(camera, renderer.domElement)

      const light = new THREE.AmbientLight(0x404040, 2) // soft white light
      scene.add(light)
      let light1 = new THREE.HemisphereLight(0xffffff, 0x444444) // 半球光
      light1.position.set(0, 0.2, 0)
      scene.add(light1)
      light1 = new THREE.HemisphereLight(0xffffff, 0x444444) // 半球光
      light1.position.set(0, -0.2, 0)
      scene.add(light1)
      const light2 = new THREE.DirectionalLight(0xffffff, 0.5) // 平行光
      light2.position.set(0, 0.2, 0.1)
      scene.add(light2)
      const light3 = new THREE.DirectionalLight(0xffffff, 0.5) // 平行光
      light2.position.set(0, 0.2, -0.1)
      scene.add(light3)
      const light4 = new THREE.DirectionalLight(0xffffff, 0.5) // 平行光
      light2.position.set(0.1, 0.2, 0)
      scene.add(light4)
      const light5 = new THREE.DirectionalLight(0xffffff, 0.5) // 平行光
      light2.position.set(-0.1, 0.2, 0)
      scene.add(light5)
      const light6 = new THREE.DirectionalLight(0xffffff, 0.5) // 平行光
      light2.position.set(0, 0.1, 0)
      scene.add(light6)
      const geometry = new THREE.PlaneGeometry(8, 14.2)
      const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide
      })
      const plane = new THREE.Mesh(geometry, material)
      // plane.rotateX(Math.PI / 2)
      plane.position.z = -1
      camera.position.z = 20

      scene.add(plane)
    },
    CreateModel(data, mediaCode) {
      console.log('生成模型！')
      console.log(data, mediaCode)
      return new Promise(async (resolve, reject) => {
        let object = new THREE.Object3D()

        let model
        let type = data.slice(data.lastIndexOf('.') + 1)
        if (type === 'glb') {
          model = await new GLTFLoader().loadAsync(data)
          model = model.scene
        } else if (type === 'fbx') {
          model = await new FBXLoader().loadAsync(data)
        } else if (type === 'mp4') {
          let video = document.createElement('video')
          video.src = data // 设置视频地址
          video.autoplay = 'autoplay' //要设置播放
          video.style.width = '320px'
          video.style.heigh = '200px'
          // video对象作为VideoTexture参数创建纹理对象
          video.setAttribute('crossorigin', 'anonymous')
          let texture = new THREE.VideoTexture(video)
          let geometryVideo = new THREE.PlaneGeometry(4, 3) //矩形平面
          let materialVideo = new THREE.MeshPhongMaterial({
            map: texture // 设置纹理贴图
          }) //材质对象Material
          model = new THREE.Mesh(geometryVideo, materialVideo) //网格模型对象Mesh
        } else if (type === 'png' || type === 'jpg') {
          let texture = await new THREE.TextureLoader().loadAsync(data)
          let geometryImage = new THREE.PlaneGeometry(5, 5) //矩形平面
          let materialImage = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true

            // side: DoubleSide // 设置纹理贴图
          }) //材质对象Material
          model = new THREE.Mesh(geometryImage, materialImage) //网格模型对象Mesh
        }
        // model.rotateX(-Math.PI / 2)
        object.add(model)
        let position, scale, rotation
        let index = this.modelParamList.findIndex((item2) => {
          return item2[0].mediaCode === mediaCode
        })
        if (index == -1) {
          index = this.paramIndex
        }
        if (index != -1) {
          this.modelParamList[index].forEach((item) => {
            switch (item.modelParamType) {
              case 1:
                position = item.modelParamInfo.split('|')
                break
              case 2:
                scale = item.modelParamInfo.split('|')
                break
              case 3:
                rotation = item.modelParamInfo.split('|')
                break
              default:
                break
            }
          })
          object.position.set(position[0], position[1], position[2])
          object.rotation.set(rotation[0], rotation[1], rotation[2])
          object.scale.set(scale[0], scale[0], scale[0])
          controls.update()
          scene.add(object)
          object.mediaCode = mediaCode
        }
        this.modelList.splice(index, 1, object)

        resolve()
      })

      // camera.position.y = 10
    },

    UseCanvasThreejsPreiview(canvas) {
      this.initTHREE()
      canvas.appendChild(renderer.domElement)
      const animate = () => {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      animate()
    }
  }
}
</script>

<style scoped>
</style>
