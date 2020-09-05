//监控项目数据值，实时空气指数等
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);  border-radius: 5px;"
      border
      fit
      highlight-current-row
      size="small"
      max-height="515;"
    >
      <el-table-column fixed prop="name" label="监控项目"></el-table-column>
      <el-table-column prop="value" label="数据值"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Right_info_02",
  // props: {
  //   cObj02: {
  //     type: Object,
  //     //['cObj02']
  //     // default() {
  //     //   return {};
  //     // },
  //     default: () => []
  //   },
  // },
  props: ["c02"],
  data() {
    return {
      tableData: [
        {
          value: this.$props.c02.AQI,
          name: "实时空气指数（AQI）",
        },
        {
          value: this.$props.c02.PM10,
          name: "PM10",
        },
        {
          value: this.$props.c02.PM25,
          name: "PM2.5",
        },
        {
          value: this.$props.c02.SO2,
          name: "SO2 1h平均/(μg/m3)",
        },
        {
          value: this.$props.c02.NO2,
          name: "NO2 1h平均/(μg/m3)",
        },
        {
          value: this.$props.c02.CO,
          name: "CO 1h平均/(μg/m3)",
        },
        {
          value: this.$props.c02.Temperature,
          name: "温度（℃）",
        },
        {
          value: this.$props.c02.Humidity,
          name: "湿度（RH）",
        },
        {
          value: this.$props.c02.device_id,
          name: "风速（m/s）",
        },
        {
          value: this.$props.c02.WindDirection,
          name: "风向",
        },
        {
          value: this.$props.c02.AirPressure,
          name: "气压（Pa）",
        },
        {
          value: this.$props.c02.Light,
          name: "光照强度（lx）",
        },
      ],
    };
  },
  watch: {
    c02: {
      deep: true,
      handler(newValue) {
        console.log(newValue);
        this.$set(this.$data.tableData[0], "value", newValue.AQI);
        this.$set(this.$data.tableData[1], "value", newValue.PM10);
        this.$set(this.$data.tableData[2], "value", newValue.PM25);
        this.$set(this.$data.tableData[3], "value", newValue.SO2);
        this.$set(this.$data.tableData[4], "value", newValue.NO2);
        this.$set(this.$data.tableData[5], "value", newValue.CO);
        this.$set(
          this.$data.tableData[6],
          "value",
          newValue.Temperature
        );
        this.$set(this.$data.tableData[7], "value", newValue.Humidity);
        this.$set(this.$data.tableData[8], "value", newValue.device_id);
        this.$set(
          this.$data.tableData[9],
          "value",
          newValue.WindDirection
        );
        this.$set(
          this.$data.tableData[10],
          "value",
          newValue.AirPressure
        );
        this.$set(this.$data.tableData[11], "value", newValue.Light);
        // console.log(oldValue);
      },
    },
  },

  mounted() {
    setTimeout(() => {
      console.log("R1shuju2 :");
      console.log(this.$props.c02);
      //   let aqq = this.$props.c01.AQI
      //   console.log('jq:'+aqq.toString().slice(0,7));
      this.$set(this.$data.tableData[0], "value", this.$props.c02.AQI);
      this.$set(this.$data.tableData[1], "value", this.$props.c02.PM10);
      this.$set(this.$data.tableData[2], "value", this.$props.c02.PM25);
      this.$set(this.$data.tableData[3], "value", this.$props.c02.SO2);
      this.$set(this.$data.tableData[4], "value", this.$props.c02.NO2);
      this.$set(this.$data.tableData[5], "value", this.$props.c02.CO);
      this.$set(this.$data.tableData[6], "value", this.$props.c02.Temperature);
      this.$set(this.$data.tableData[7], "value", this.$props.c02.Humidity);
      this.$set(this.$data.tableData[8], "value", this.$props.c02.device_id);
      this.$set(
        this.$data.tableData[9],
        "value",
        this.$props.c02.WindDirection
      );
      this.$set(this.$data.tableData[10], "value", this.$props.c02.AirPressure);
      this.$set(this.$data.tableData[11], "value", this.$props.c02.Light);
    }, 800);
  },
};
</script>

<style>
</style>