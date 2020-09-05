<template>
  <diV id="container" class="map_m">map</diV>
</template>

<script>
import AMap from "AMap";
export default {
  name: "Map",
  created() {},
  mounted() {
    // this.createdLoca();
    this.mapInit();
  },
  methods: {
    mapInit() {
      let that = this;
      // let arr= [
      //   {
      //     name:'设备1',
      //   position:[[117.639619],[23.827427]]
      // },
      // {
      //    name:'设备2',
      //   position:[[117.632644], [23.783127]]
      // },
      // {
      //    name:'设备3',
      //   position:[[117.772440],[23.917238]]
      // },
      // ];
      let map = new AMap.Map("container", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 9, //初始化地图层级
        center: [118.15488, 24.265695], //初始化地图中心点
      });
    //    arr.forEach(function(item,index) {
    //     new AMap.Marker({
    //         map: map,
         
    //         name:arr[index].name,
    //         position: [arr.position[0], arr.position[1]],
    //         offset: new AMap.Pixel(-13, -30)
    //     }).setMap(map);

    // });
   

      var marker = new AMap.Marker({
        position: new AMap.LngLat(118.15488, 24.265695), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '设备1',
        offset: new AMap.Pixel(-13, -30),
      });
      marker.setMap(map);
       var marker2 = new AMap.Marker({
        position: new AMap.LngLat(117.639619,23.827427), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '设备2',
        offset: new AMap.Pixel(-13, -30),
      });
      marker2.setMap(map);
      var marker3 = new AMap.Marker({
        position: new AMap.LngLat(117.772440,23.917238), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '设备3',
        offset: new AMap.Pixel(-13, -30),
      });
      marker3.setMap(map);
      
    //   map.on('click', function(e) {
    //     // document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
    //     console.log(e);
    // });
     marker.on('click', function(e) {
        // document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        // console.log(e.target.w.title);
        if(e.target.w.title == '设备1'){
          that.$emit('csbname','1')
        }
    });
    marker2.on('click', function(e) {
        // document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        // console.log(e.target.w.title);
        if(e.target.w.title == '设备2'){
          that.$emit('csbname','2')
        }
    });
    marker3.on('click', function(e) {
        // document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        // console.log(e.target.w.title);
        if(e.target.w.title == '设备3'){
          that.$emit('csbname','3')
        }
    });
      
    },

  },
};
</script>

<style>
.map_m {
  border: steelblue 1px solid;
  width: 100%;
  height: 100%;
}
</style>