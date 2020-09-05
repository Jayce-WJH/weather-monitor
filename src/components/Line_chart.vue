<template>
  <div class="Box2" ref="poll_area"></div>
</template>

<script>
var echarts = require("echarts");
export default {
  name: "Line_chart",
  props: {
    curlPath: {
      type: String,
    },
  },
  data() {
    return {
      chartName: "雾霾覆盖面积随时间变化折线图",
      dataArray: [
        820,
        932,
        901,
        934,
        1290,
        1330,
        1320,
        1500,
        1600,
        1200,
        800,
        500,
        1300,
      ],
      AQIArray: null,
      CO2Array: null,
      NO2Array: null,
      PHArray: null,
      SO2Array: null,
      OBJ: Object,
    };
  },
  created() {
    let urlx = "http://175.24.65.62:8900/data/" + 1 + "/ph";
    let that = this;

    this.$axios
      .get(urlx)
      .then(function (response) {
        console.log(response.data.data);
        //that.$set(that.$data,'OBJ',response.data.data)
        that.$set(that.$data, "AQIArray", response.data.data.AQI);
        that.$set(that.$data, "CO2Array", response.data.data.CO2);
        that.$set(that.$data, "NO2Array", response.data.data.NO2);
        that.$set(that.$data, "PHArray", response.data.data.PH);
        that.$set(that.$data, "SO2Array", response.data.data.SO2);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  mounted() {
    let url = window.location.href.toString().slice(23);
    // console.log("url:"+url);
    // console.log('接收父组件的数据'+this.$props.curlPath);
    
    setTimeout(() => {
        // console.log(this.$data.AQIArray);
      this.$nextTick(function () {
        this.checkName(url);
        this.initChart();
      });
    }, 1000);
  },
  methods: {
    checkName(url) {
      if (url == "/Pollution_forecast?wmNumber=true") {
        this.$set(this.$data, "chartName", "雾霾覆盖面积随时间变化折线图");
        this.$set(this.$data, "dataArray", this.$data.AQIArray);
    
      }
      if (url == "/Poll_degree") {
        this.$set(this.$data, "chartName", "海水酸碱度随时间变化");
        this.$set(this.$data, "dataArray", this.$data.PHArray);

      }
      if (url == "/History_air") {
        this.$set(this.$data, "chartName", "大气总指数随时间变化折线图");
        this.$set(this.$data, "dataArray", this.$data.CO2Array);
      }
      if (url == "/Go_sea") {
        this.$set(this.$data, "chartName", "出海指数随时间变化曲线图");
        this.$set(this.$data, "dataArray", this.$data.NO2Array);
      }
    },
    initChart() {
      var myChart = echarts.init(this.$refs.poll_area);

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "",
        },
        legend: {
          data: [this.$data.chartName],
          top: 10,
          textStyle: {
            fontSize: 20,
          },
        },
        xAxis: {
          //横坐标
          type: "category",
          boundaryGap: false,
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        },
        yAxis: {
          //纵坐标
          type: "value",
        },
        color: "#4C91D7", //蓝色
        series: [
          {
            name: this.$data.chartName,
            data: this.$data.dataArray,
            type: "line",
            areaStyle: {},
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style>
.Box2 {
  margin-top: 10px;
  border: steelblue 1px solid;
  height: 600px;
  width: 100%;
  border-radius: 5px;
}
</style>