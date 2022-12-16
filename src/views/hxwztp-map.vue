<!--
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-16 15:41:51
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-16 18:08:22
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
        y: 2000,
        z: 4000
      },
      animationTimer: null,
      // 浙江省中间坐标
      mapCenter: {
        lng: 120.7,
        lat: 29,
        height: 0
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
      const control = new OrbitControls(
        window.topologyData.camera,
        renderer.domElement
      )
      control.maxPolarAngle = Math.PI / 2
      window.topologyData.control = control

      // 渲染
      el.appendChild(renderer.domElement)

      renderer.shadowMap.enabled = true
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.render(scene, camera)
      renderer.setClearColor(0xeeeeee, 0.0)
      window.topologyData.mapGroup = new THREE.Group()
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

        const mapGroup = new THREE.Group()

        // 省论跨
        const provinceLineMaterial = new LineMaterial({
          color: '#96ccee',
          linewidth: 2 / 1000,
          dashed: false,
          transparent: true,
          opacity: 1
        })

        // 各地市边界论跨
        const cityLineMaterial = new LineMaterial({
          color: '#022736',
          linewidth: 2 / 1000,
          dashed: false,
          transparent: true,
          opacity: 1
        })

        // 已添加的名称
        const addNameArr = []

        res.features.forEach(feature => {
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
                var pos = this.lngLatToCoord({ lng: polygon[i][0], lat: polygon[i][1] })
                positions.push(pos.x || 0, 0.01, pos.z || 0)
                i === 0 ? shape.moveTo(pos.x || 0, pos.z || 0) : shape.lineTo(pos.x || 0, pos.z || 0)
              }

              // 线
              const linGeometry = new LineGeometry()
              linGeometry.setPositions(positions)
              const line = new Line2(linGeometry, name === '浙江省' ? provinceLineMaterial : cityLineMaterial)
              line.renderOrder = name === '浙江省' ? 2 : 1
              line.visible = true
            })
          })
        })
      })
    },
    // 经纬度转坐标轴
    lngLatToCoord ({ lng, lat, center, scale }) {
      center = center || this.mapCenter
      const mapScale = scale || this.mapScale
      lng = lng - center.lng
      lat = lat - center.lat
      const x = lng * 2.003750834 / 180
      let z = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180)
      z = z * 2.003750834 / 180
      return {
        x: x * mapScale,
        y: 0,
        z: -z * mapScale
      }
    },
    // 坐标轴转经纬度
    coordToLngLat ({ x, y, z }) {
      const mapScale = this.mapScale
      const lng = x / 2.003750834 * 180
      let lat = z / 2.003750834 * 180
      lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2)
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
    width: 900px;
    height: 750px;
    margin: 0 auto;
    background: rgba(5, 38, 49, 0.7);
    border: 1px solid rgba(5, 38, 49, 0.7);
    transform: translate(-50%, 0);
  }
}
</style>
