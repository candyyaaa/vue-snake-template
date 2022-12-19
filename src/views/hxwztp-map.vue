<!--
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-16 15:41:51
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-19 17:55:33
-->
<template>
  <div
    class="hxwztp-map__wrap"
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <div ref="topologyRef" class="map-box"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'

window.topologyData = {
  scene: null,
  camera: null,
  renderer: null,
  renderer2d: null,
  renderer3d: null,
  control: null,
  mapGroup: null,
  // 地市
  cityArr: [],
  // 打点
  pointArr: [],
  // 计数点
  countArr: [],
  // 弹窗
  labelArr: []
}
export default {
  components: {},
  data () {
    return {
      loading: false,
      // 开始视角
      startView: {
        x: 0,
        y: 300,
        z: 800
      },
      animationTimer: null,
      // 浙江省中间坐标
      mapCenter: {
        lng: 120.7,
        lat: 29,
        height: 0
      },
      // 地市顶部
      uniformsCityTop: {
        time: { value: 1.0 },
        speed: { value: 1.0 },
        // x滚动
        rotateX: { value: 0.1 },
        // y滚动
        rotateY: { value: 0.1 },
        repeatX: { value: 0.005 },
        repeatY: { value: -0.005 },
        uColor: { value: { x: 1, y: 0, z: 0 } },
        vUv: { value: { x: 1, y: 1 } },
        map: { value: '' },
        map1: { value: '' },
        uopacity: { value: 1.0 }
      },
      // 省份侧边1
      uniformsSide1: {
        time: { value: 3.0 },
        speed: { value: 3.0 },
        // x滚动
        rotateX: { value: 0.0 },
        // y滚动
        rotateY: { value: 3.0 },
        repeatX: { value: 0.02 },
        repeatY: { value: 0.02 },
        uColor: { value: { x: 3, y: 0, z: 0 } },
        vUv: { value: { x: 3, y: 3 } },
        map: { value: '' },
        map1: { value: '' },
        uopacity: { value: 1.0 }
      },
      mapScale: 10000 - 10,
      mapObj: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initTopology()
    })
  },
  methods: {
    initTopology () {
      const width = this.$refs.topologyRef.offsetWidth || 0
      const height = this.$refs.topologyRef.offsetHeight || 0

      window.topologyData.scene = new THREE.Scene()
      window.topologyData.camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        1,
        10000
      )
      window.topologyData.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      // 设置渲染物体阴影
      window.topologyData.renderer.shadowMap.enabled = true
      window.topologyData.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      window.topologyData.renderer.setSize(width, height)
      console.log('width ----------->', width)
      console.log('height ----------->', height)

      this.createLight()
      this.createCamera()
      this.createRenderer()

      // 增加浙江地图
      this.addMap()
    },
    createLight () {
      const scene = window.topologyData.scene
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
      scene.add(ambientLight)
      // 平行光
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
      scene.add(dirLight)
      // dirLight.color.setHSL( 0.1, 1, 0.95 )
      dirLight.position.set(1, 1, 0)
      dirLight.position.multiplyScalar(100)
      dirLight.castShadow = true
      dirLight.shadow.mapSize.width = 2048
      dirLight.shadow.mapSize.height = 2048
      const d = 1000
      dirLight.shadow.camera.left = -d
      dirLight.shadow.camera.right = d
      dirLight.shadow.camera.top = d
      dirLight.shadow.camera.bottom = -d
      dirLight.shadow.camera.far = 3500
      dirLight.shadow.bias = -0.001
    },
    createCamera () {
      const scene = window.topologyData.scene
      const camera = window.topologyData.camera
      // 相机
      camera.position.set(this.startView.x, this.startView.y, this.startView.z)
      camera.lookAt(scene.position)

      scene.add(camera)
    },
    createRenderer () {
      const scene = window.topologyData.scene
      const renderer = window.topologyData.renderer
      const camera = window.topologyData.camera
      const el = this.$refs.topologyRef

      // 控制器
      const control = new OrbitControls(window.topologyData.camera, renderer.domElement)
      control.maxPolarAngle = Math.PI / 2
      window.topologyData.control = control

      // 渲染
      el.appendChild(renderer.domElement)

      renderer.shadowMap.enabled = true
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.render(scene, camera)
      renderer.setClearColor(0xeeeeee, 0.0)
      window.topologyData.mapGroup = new THREE.Group()
      window.topologyData.mapGroup.position.set(50, -220, 0)
      const helper = new THREE.AxesHelper(500)
      scene.add(helper)
      scene.add(window.topologyData.mapGroup)
      // 渲染
      this.render()
    },
    render () {
      this.renderTimer = requestAnimationFrame(this.render)

      window.topologyData.renderer.render(window.topologyData.scene, window.topologyData.camera)
    },
    addMap () {
      // this.loading = true
      this.http.get('testjson/330000-all.json').then(res => {
        const mapData = res.data
        console.log('zjMap then----------->', mapData)

        const map = new THREE.Group()
        const sideScale = 3.5

        // 省论跨
        const provinceLineMaterial = new LineMaterial({
          color: '#c4ffe8',
          linewidth: 2 / 1000,
          dashed: false,
          transparent: true,
          opacity: 1
        })

        // 各地市边界论跨
        const cityLineMaterial = new LineMaterial({
          color: '#3b8796',
          linewidth: 2 / 1000,
          dashed: false,
          transparent: true,
          opacity: 1
        })

        // 省份材质
        const provinceMat = this.getMatProvince()
        // 地市材质
        const cityMat = this.getMatCity()
        // 地市标记
        const cityGeoTriangle = new THREE.CylinderGeometry(10, 0, 10, 32, 1, true)
        // 已添加的名称
        const addNameArr = []

        mapData.features.forEach(feature => {
          const name = feature.properties.name && feature.properties.name.replace('市', '')
          const adcode = feature.properties.adcode
          const center = feature.properties.centroid

          // 记录各地市对象
          this.mapObj[adcode] = {
            name: name,
            longitude: center[0],
            latitude: center[1],
            lng: center[0],
            lat: center[1]
          }

          // 新建一个省份容器：用来存放省份对应的模型和轮廓线
          const province = new THREE.Object3D()
          const coordinates = feature.geometry.coordinates

          coordinates.forEach(polygonList => {
            polygonList.forEach(polygon => {
              // 线
              const positions = []
              // 形状
              const shape = new THREE.Shape()

              for (let i = 0; i < polygon.length; i++) {
                const pos = this.lngLatToCoord({ lng: polygon[i][0], lat: polygon[i][1] })
                positions.push(pos.x || 0, 0.01, pos.z || 0)
                i === 0 ? shape.moveTo(pos.x || 0, pos.z || 0) : shape.lineTo(pos.x || 0, pos.z || 0)
              }

              // 线
              const linGeometry = new LineGeometry()
              linGeometry.setPositions(positions)
              const line = new Line2(linGeometry, name === '浙江省' ? provinceLineMaterial : cityLineMaterial)
              line.renderOrder = name === '浙江省' ? 2 : 1
              line.visible = true

              if (name === '浙江省') {
                const geometry1 = new THREE.ExtrudeGeometry(shape, {
                  steps: 1,
                  depth: sideScale * 20,
                  bevelEnabled: true,
                  bevelThickness: 1,
                  bevelSize: 0,
                  bevelOffset: 1,
                  bevelSegments: 0
                })
                const mesh1 = new THREE.Mesh(geometry1, [provinceMat.top, provinceMat.side1])
                // const mesh1 = new THREE.Mesh(geometry1, [null, provinceMat.side1])
                mesh1.rotation.x = Math.PI / 2
                // 对象是否渲染到阴影贴图中(对象是否可以产生阴影)
                mesh1.castShadow = true
                // 地面材质是否接收阴影
                mesh1.receiveShadow = true

                // 2
                const geometry2 = new THREE.ExtrudeGeometry(shape, {
                  steps: 1,
                  depth: sideScale * 2,
                  bevelEnabled: true,
                  bevelThickness: 1,
                  bevelSize: 0,
                  bevelOffset: 1,
                  bevelSegments: 0
                })
                const mesh2 = new THREE.Mesh(geometry2, [null, provinceMat.side2])
                mesh2.rotation.x = Math.PI / 2
                mesh2.position.y = sideScale * -20
                // 需要发光
                mesh2._ENABLEBLOOM = true

                // 3
                const geometry3 = new THREE.ExtrudeGeometry(shape, {
                  steps: 1,
                  depth: sideScale * 6,
                  bevelEnabled: true,
                  bevelThickness: 1,
                  bevelSize: 0,
                  bevelOffset: 1,
                  bevelSegments: 0
                })
                const mesh3 = new THREE.Mesh(geometry3, [null, provinceMat.side3])
                mesh3.rotation.x = Math.PI / 2
                mesh3.position.y = sideScale * -22
                province.add(mesh1)
                province.add(mesh2)
                province.add(mesh3)
              } else {
                // 添加名称
                console.log('name ----------->', name)
                if (addNameArr.indexOf(name) === -1) {
                  addNameArr.push(name)
                  // 中心点
                  const pos = this.lngLatToCoord({ lng: center[0], lat: center[1] })
                  console.log('pos ----------->', pos)
                  // 白色
                  const dotGroup = new THREE.Object3D()
                  dotGroup.position.set(pos.x, 5, pos.z)
                  dotGroup.scale.set(0, 0, 0)
                  dotGroup._NAME = '白色-父级'
                  dotGroup.visible = false
                  // 圆点
                  const dot = new THREE.Mesh(cityGeoTriangle, cityMat && cityMat.dot)
                  dot.renderOrder = 4
                  dot._NAME = '圆点'
                  dot._CITYNAME = name
                  console.log('dot ----------->', dot)
                  // 需要发光
                  // dot._ENABLEBLOOM = true
                  // 绑定事件
                  // dot._EVENT = _EVENT
                  // 白色名称
                  const cityName = this.getText({
                    name: name + '市',
                    textStyle: {
                      thickness: 22
                    }
                  })
                  cityName.renderOrder = 6
                  cityName.position.y = 5
                  cityName._NAME = '白色-名称'
                  cityName._CITYNAME = name + '市'
                  // cityName._EVENT = _EVENT
                  // 需要发光
                  // cityName._ENABLEBLOOM = true
                  // 放到集合
                  dotGroup.add(dot)
                  dotGroup.add(cityName)
                  console.log('dotGroup ----------->', dotGroup)
                  province.add(dotGroup)
                }
              }

              // 放到集合
              map.add(line)
            })
          })

          // 唯一名称
          province.name = name
          province._CITYNAME = name
          province._ADCODE = adcode
          map.add(province)
          if (name !== '浙江省') {
            window.topologyData.cityArr.push(province)
          }
        })
        window.topologyData.mapGroup.scale.set(1, 0.1, 1)
        window.topologyData.mapGroup.add(map)
        console.log('map ----------->', map)
        // 开场动画
        this.loading = false
        // this.handleAnimate()
      })
    },
    getMatProvince () {
      const textureLoader = new THREE.TextureLoader()
      const texture = textureLoader.load(require('@/assets/img/zj/hxwztp/map-bg.jpg'), texture => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.offset.set(0.5, 0.5)
        texture.repeat.set(0.0025, 0.0025)
      })
      const cityMaterialMesh1 = new THREE.MeshLambertMaterial({
        depthTest: true,
        depthWrite: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
        map: texture
      })

      // // 侧边1
      // const textureSide = textureLoader.load(require('@/assets/img/zj/hxwztp/map-side.png'), textureSide => {
      //   textureSide.wrapS = THREE.RepeatWrapping
      //   textureSide.wrapT = THREE.RepeatWrapping
      //   textureSide.offset.set(0.5, 0.5)
      //   textureSide.repeat.set(0.0025, 0.0025)
      // })
      // const cityMaterialSide1 = new THREE.MeshLambertMaterial({
      //   depthTest: true,
      //   depthWrite: true,
      //   side: THREE.DoubleSide,
      //   transparent: true,
      //   opacity: 0.95,
      //   map: textureSide
      // })
      // 侧边1
      const textureSide = textureLoader.load(require('@/assets/img/zj/hxwztp/map-side.png'))
      const textureSide1 = textureLoader.load(require('@/assets/img/zj/hxwztp/flow-point.png'))
      this.uniformsSide1.map.value = textureSide
      this.uniformsSide1.map1.value = textureSide1
      const s1 = this.getScrollShader()
      const cityMaterialSide1 = new THREE.ShaderMaterial({
        // 是否受光照影响
        // lights: true,
        uniforms: this.uniformsSide1,
        vertexShader: s1.vs,
        fragmentShader: s1.fs,
        side: THREE.DoubleSide,
        transparent: true,
        depthTest: true,
        depthWrite: false
      })

      const cityMaterialSide2 = new THREE.MeshLambertMaterial({
        depthTest: true,
        depthWrite: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
        color: '#257f6e'
        // map: textureSide
      })

      const cityMaterialSide3 = new THREE.MeshLambertMaterial({
        depthTest: true,
        depthWrite: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
        color: '#045049'
        // map: textureSide
      })

      return {
        top: cityMaterialMesh1,
        side1: cityMaterialSide1,
        side2: cityMaterialSide2,
        side3: cityMaterialSide3
      }
    },
    // 获取单个地市材质
    getMatCity () {
      const textureLoader = new THREE.TextureLoader()
      const textureSide = textureLoader.load(require('@/assets/img/zj/hxwztp/map-bg.jpg'), texture => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.offset.set(0.5, 0.5)
        texture.repeat.set(0.0025, 0.0025)
      })
      const textureSide1 = textureLoader.load(require('@/assets/img/zj/hxwztp/map-bg.jpg'))
      this.uniformsCityTop.map.value = textureSide
      this.uniformsCityTop.map1.value = textureSide1
      const s1 = this.getFlowShader()
      return {
        // 顶部
        top: new THREE.ShaderMaterial({
          uniforms: this.uniformsCityTop,
          vertexShader: s1.vs,
          fragmentShader: s1.fs,
          side: THREE.DoubleSide,
          transparent: true,
          depthTest: true,
          depthWrite: true
        }),
        // 侧边1
        side1: new THREE.MeshLambertMaterial({
          depthTest: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1,
          color: '#9e50fc'
          // map: textureSide
        }),
        // 圆点标记
        dot: new THREE.MeshBasicMaterial({
          depthTest: true,
          depthWrite: false,
          transparent: true,
          opacity: 1,
          side: THREE.DoubleSide,
          map: textureLoader.load(require('@/assets/img/zj/hxwztp/map-sign.png'))
        })
      }
    },
    // 获取名称精灵
    getText (item) {
      const text = (item && item.name) || ''
      const config = Object.assign(
        {
          fontsize: 42,
          width: 300,
          height: 150,
          thickness: 4,
          color: '#ffffff',
          fontface: 'Arial',
          background: ''
        },
        item && item.textStyle
      )
      const imgStyle = Object.assign({
        // 背景图片
        img: null,
        x: 0,
        y: 0,
        width: 300,
        height: 150
      }, item && item.imgStyle)
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const texture = new THREE.Texture(canvas)
      texture.needsUpdate = true
      // canvas.width = config.width
      // context.width = config.width
      // canvas.height = config.height
      // context.height = config.height
      if (imgStyle && imgStyle.img) {
        var image = new Image()
        image.src = imgStyle.img
        image.onload = () => {
          context.drawImage(image, imgStyle.x, imgStyle.y, imgStyle.width, imgStyle.height)
          if (config.background) {
            context.fillStyle = config.background
            config.background && context.fillRect(0, 0, config.width, config.height)
          }
          context.lineWidth = config.fontsize
          context.lineHeight = config.fontsize
          context.fillStyle = config.color
          context.textAlign = 'center'
          context.font = 'Bold ' + config.fontsize + 'px ' + config.fontface
          context.fillText(text, config.width / 2, config.fontsize + config.thickness)
          texture.needsUpdate = true
        }
      } else {
        if (config.background) {
          context.fillStyle = config.background
          config.background && context.fillRect(0, 0, config.width, config.height)
        }
        context.lineWidth = config.fontsize
        context.lineHeight = config.fontsize
        context.fillStyle = config.color
        context.textAlign = 'center'
        context.font = 'Bold ' + config.fontsize + 'px ' + config.fontface
        context.fillText(text, config.width / 2, config.fontsize + config.thickness)
      }
      const spriteMaterial = new THREE.SpriteMaterial({
        transparent: true,
        depthTest: true,
        depthWrite: false,
        map: texture
      })
      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.set(
        1 * config.fontsize * 0.8,
        0.5 * config.fontsize * 0.8,
        1.5 * config.fontsize * 0.8
      )
      sprite.position.y = -5
      console.log('sprite ----------->', sprite)
      return sprite
    },
    // 带底图滚动
    getFlowShader () {
      return {
        vs: `
          varying vec2 vUv;
          varying vec3 fNormal;
          varying vec3 vPosition;
          void main()
          {
              vUv = uv;
              fNormal=normal;
              vPosition=position;
              vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
              gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fs: `
          uniform float time;
          varying vec2 vUv;
          uniform sampler2D map;
          uniform sampler2D map1;
          uniform float rotateX;
          uniform float rotateY;
          uniform float repeatX;
          uniform float repeatY;
          uniform float uopacity;
          varying vec3 fNormal;
          varying vec3 vPosition;
          void main( void ) {
              vec2 position = vUv;
              vec3 tempNomal= normalize(fNormal);
              float power=step(0.95,abs(tempNomal.y));
              vec4 colorb=texture2D(map, vec2(fract(vUv.x * 0.002 - 0.5), fract(vUv.y * 0.002 - 0.5)));
              vec4 colora = texture2D(map1, vec2(fract(vUv.x * repeatX - time * rotateX), fract(vUv.y * repeatY - time * rotateY)));
              if(power>0.95){
                  gl_FragColor =colorb;
              }else{
                  gl_FragColor = colorb + colora;
              }
          }
        `
      }
    },
    // 不带底图滚动
    getScrollShader () {
      return {
        vs: `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix*viewMatrix*modelMatrix*vec4( position, 1.0 );
          }
        `,
        fs: `
          uniform float time;
          uniform float repeatX;
          uniform float repeatY;
          uniform float speed;
          varying vec2 vUv;
          uniform sampler2D map;
          uniform vec3 uColor;
          void main() {
            vec4 finalcolor=texture2D(map, vec2(vUv.x, fract(vUv.y * repeatY + time*speed)));
            gl_FragColor =finalcolor;
          }
        `
      }
    },
    // 经纬度转坐标轴
    lngLatToCoord ({ lng, lat, center, scale }) {
      center = center || this.mapCenter
      const mapScale = scale || this.mapScale
      lng = lng - center.lng
      lat = lat - center.lat
      const x = (lng * 2.003750834) / 180
      let z =
        Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180)
      z = (z * 2.003750834) / 180
      return {
        x: x * mapScale,
        y: 0,
        z: -z * mapScale
      }
    },
    // 坐标轴转经纬度
    coordToLngLat ({ x, y, z }) {
      const mapScale = this.mapScale
      const lng = (x / 2.003750834) * 180
      let lat = (z / 2.003750834) * 180
      lat =
        (180 / Math.PI) *
        (2 * Math.atan(Math.exp((lat * Math.PI) / 180)) - Math.PI / 2)
      return {
        lng: lng / mapScale + this.mapCenter.lng,
        lat: lat / mapScale + this.mapCenter.lat
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hxwztp-map__wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("~@/assets/img/gx/bg.png") no-repeat left top;
  overflow: hidden;

  .map-box {
    position: absolute;
    bottom: 10px;
    left: 50%;
    width: 930px;
    height: 850px;
    margin: 0 auto;
    background: rgba(5, 38, 49, 0.7);
    border: 1px solid rgba(5, 38, 49, 0.7);
    transform: translate(-50%, 0);
  }
}
</style>
