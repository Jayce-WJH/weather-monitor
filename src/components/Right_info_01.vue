// 网格号，经纬度，极端天气标记，APi指数页面
<template>
  <div class="outsideBox">
    <div style="height: 130px;">
      <el-container>
        <el-aside style="width:110px; ">
          <div class="gridBox">
            <div style="text-align: center;font-size:20px;">
              网格号
              <br />
              {{grid_number}}
            </div>
          </div>
        </el-aside>
        <el-container>
          <el-header style="background-color:white; text-align: center;">
            <div class="different_weather">
              {{differ_weather}}
              <i
                v-if="differ_weather == '极端恶劣天气'"
                style="color:red; font-size:30px;"
                class="el-icon-lightning"
              ></i>
            </div>
          </el-header>
          <el-main class="date">
            <div class="nowDate">{{nowDate}}</div>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <div class="apiBox">
      <div class="itude">
        经度：{{longitude}}°
        <br />
        纬度：{{latitude}}°
      </div>

      <div class="apiNum">
        AQI指数:
        <br />
        {{aqiNumber}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Right_info_01",
  // props: {
  //    cObj01 :{
  //         type:Object,
  //         default: () => []
  //     }
  // } ,
  props: ["c01"],
  data() {
    return {
      grid_number: this.$props.c01.area_id, //网格号
      differ_weather: "极端恶劣天气", //天气情况
      nowDate: this.$props.c01.nowtime, //日期
      aqiNumber: this.$props.c01.AQI,
      longitude: this.$props.c01.longitude,
      latitude: this.$props.c01.latitude,
    };
  },
    watch: {
    c01: {
      deep: true,
      handler(newValue) {
        console.log(newValue);
        this.$set(this.$data, "aqiNumber", newValue.AQI.toString().slice(0,7));
        this.$set(this.$data, "grid_number", newValue.area_id);
        this.$set(this.$data ,"nowDate", newValue.nowtime);
        this.$set(this.$data, "longitude", newValue.longitude);
        this.$set(this.$data, "latitude", newValue.latitude);
      },
    },
  },
  mounted() {
    // console.log('xxx'+this.$props.c01.AQI);
    console.log("R1shuju :");
    console.log(this.$props.c01);
 
    setTimeout(() => {
      console.log("R1shuju :");
      console.log(this.$props.c01);
    //   let aqq = this.$props.c01.AQI 
    //   console.log('jq:'+aqq.toString().slice(0,7));
        this.$set(this.$data, "grid_number", this.$props.c01.area_id);
        this.$set(this.$data, "nowDate", this.$props.c01.nowtime);
        this.$set(this.$data, "aqiNumber", this.$props.c01.AQI.toString().slice(0,7));
        this.$set(this.$data, "longitude", this.$props.c01.longitude);
        this.$set(this.$data, "latitude", this.$props.c01.latitude);
    }, 600);

  },
};
</script>

<style>
.outsideBox {
  width: 320px;
  height: 250px;
  /* text-align: center; */
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.gridBox {
  margin-top: 40px;
  width: 80px;
  height: 50px;
  margin: 40px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
.different_weather {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  font-size: 20px;
  border-radius: 12px;
  margin-left: -21px;
  width: 200px;
}
.date {
  margin-top: 5px;
  height: 20px;
  width: 200px;
  text-align: center;
  font-size: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
.apiBox {
  display: flex;
  flex-direction: row;
  margin: 30px auto;
  text-align: center;
}
.itude {
  /* border: steelblue 1px solid; */
  border-radius: 5px;
  width: 145px;
  margin-left: 12px;
  font-size: 25px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.apiNum {
  /* border: steelblue 1px solid; */
  border-radius: 5px;
  width: 145px;
  margin-left: 10px;
  font-size: 25px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style> 