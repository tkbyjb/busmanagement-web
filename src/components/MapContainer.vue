<template>
  <div id="container"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  data() {
    return {
      map: null,
    };
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "d1e04ad0428a8056444357bb6ae21337", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.Scale",
          'AMap.AdvancedInfoWindow',
          "AMap.ToolBar",
          "AMap.Driving",
          "AMap.OverView",
          'AMap.ElasticMarker',
          'AMap.HawkEye',
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: 12, //初始化地图级别
            center: [116.402725, 39.900636], //初始化地图中心点位置
            layers: [
              //使用多个图层
              //   new AMap.TileLayer.Satellite(),
              //   new AMap.TileLayer.RoadNet(),
            ],
          });

          var toolbar = new AMap.ToolBar();
          this.map.addControl(toolbar);
          this.map.addControl(new AMap.Scale());
          this.map.addControl(new AMap.ElasticMarker());
          this.map.addControl(new AMap.HawkEye());
          this.map.addControl(new AMap.AdvancedInfoWindow({
              isCustom: false,
          }));

        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style  scoped>
#container {
  padding: 0px;
  margin: 20px;
  width: 1000px;
  height: 500px;
}
</style>