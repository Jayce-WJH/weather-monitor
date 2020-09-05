<template>
  <div class="statBox">
      <el-row class="choice">
        <el-button @click="spread" type="warning" round>污染物扩散预测</el-button>
        <el-button @click="temperature" type="success" round>海洋水温等温线</el-button>
        <el-button @click="pollution" type="danger" round>海洋污染程度</el-button>
        <el-button @click="history" type="primary" round>历史大气数据统计</el-button>
        <el-button @click="fish" type="info" round>渔业气象服务</el-button>  	   	    
      </el-row>
  </div>
</template>

<script>
export default {
    name:"Statistics",
    methods: {
      spread(){
          console.log('污染物扩散');
          this.$router.push({ //跳转页面
            path:'/Pollution_forecast',
            query:{wmNumber:true} //雾霾指数开关
          });
      },
      temperature(){
          console.log('海洋水温');
          //Equal_tempe
           this.$router.push({ //跳转页面
            path:'/Equal_tempe',
            query:{wmNumber:true} //水温指数开关
          });
      },
      pollution(){
          console.log('海洋污染程度');
           this.$router.push({ //跳转页面
            path:'/Poll_degree',
  
          });
      },
      history(){
          console.log('历史大气数据');
            this.$router.push({ //跳转页面
            path:'/History_air',

          });
      },
      fish(){
          console.log('渔业气象服务');
            this.$router.push({ //跳转页面
            path:'/Go_sea',

          });
      }
    }
}
</script>

<style>
.statBox{
  text-align: center;
  margin: 45px auto;
}
</style>