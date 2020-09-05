<template>
  <div class="flexBox">
    <div class="index_1">
      <!-- 中间主体部分 -->
      <!-- Data_map -->
      <!-- <Data_map/> -->
      <Map @csbname="csbvalue"/>
    </div>

    <!-- 右侧信息栏 -->
    <div class="index_2">
      <!-- Right_info_01 -->
      <Right_info_01 :c01="cobj01" />
      <!-- Right_info_02 -->
      <Right_info_02 :c02="cobj02" />
      <!-- Data_download -->
      <Data_download />
    </div>
  </div>
</template>

<script>
import Right_info_01 from "./Right_info_01";
import Right_info_02 from "./Right_info_02";
import Data_download from "./Data_download";
// import Data_map from './Data_map'
import Map from "./Map";

export default {
  name: "Home_index",
  data() {
    return {
      equip_id: 1,
      cobj01: {
        AQI: 413.3333,
        WindSpeed: 10,
        latitude: 111,
        longitude: 111,
        nowtime: "2020-7-23  01:00",
        area_id: 3,
      },
      cobj02: {
        AQI: 413.3333,
        AirPressure: 156,
        CO: 124,
        CO2: 91.5,
        Humidity: 96,
        Light: 69,
        NO2: 88,
        O3: 68,
        PM10: 104,
        PM25: 102,
        SO2: 73,
        Temperature: 33,
        device_id: 1,
        WindDirection: "W",
      },
    };
  },
  created() {
    this.http();
  },
  methods:{
    csbvalue(data){
        console.log("子组件传递的设备名称",data);
        this.$set(this.$data,'equip_id',data);
        this.http();
    },
    http(){
              let urlx =
      "http://175.24.65.62:8900/data/" + this.$data.equip_id + "/indexdata";
    let that = this;
    this.$axios
      .get(urlx)
      .then(function (response) {
        console.log(response.data.data);
        that.$set(that.$data, "cobj01", {
          AQI: response.data.data.AQI,
          WindSpeed: response.data.data.WindSpeed,
          latitude: response.data.data.latitude,
          longitude: response.data.data.longitude,
          nowtime: response.data.data.nowtime,
          area_id: response.data.data.area_id,
        });
        that.$set(that.$data, "cobj02", {
          AQI: response.data.data.AQI,
          AirPressure: response.data.data.AirPressure,
          CO: response.data.data.CO,
          CO2: response.data.data.CO2,
          Humidity:response.data.data.Humidity ,
          Light: response.data.data.Light,
          NO2: response.data.data.NO2,
          O3: response.data.data.O3,
          PM10:response.data.data.PM10,
          PM25: response.data.data.PM25,
          SO2:response.data.data. SO2,
          Temperature:response.data.data.Temperature ,
          device_id: response.data.data.device_id,
          WindDirection: response.data.data.WindDirection,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  components: {
    Right_info_01,
    Right_info_02,
    Data_download,
    // Data_map,
    Map,
  },
};
</script>

<style>
.index_1 {
  height: 100%;
  width: 69%;
  border: red 1px solid;
}
.index_2 {
  height: 100%;
  width: 30%;
  margin-left: 20px;
}

.flexBox {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>