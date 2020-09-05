<template>
  <div class="ces-main"> 
   <!-- 页面tag  报警统计 -->
  <el-tag >报警统计</el-tag>
   <!-- 检索模块 -->
  <div class="checkInfo">
    <!-- 时间选择器 -->
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      value-formate="timestamp" 
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  <!-- 点击搜索 -->
  <el-col :span="6">
       <el-input v-model="form.areaname"  width="100" 
        placeholder="请输入需要查询的区域名称">
      </el-input>
  </el-col>
        <el-button type="primary" @click="search()">搜索</el-button>  

  </div>

    <!-- 表格开始 -->
  <el-table :data="tableData" :model="form" border style="width: 100%" >
    <el-table-column property="type" label="报警类型" ></el-table-column>
    <el-table-column property="count" label="报警次数" ></el-table-column>
    <el-table-column property="rank" label="次数排名" ></el-table-column>
    <el-table-column property="part" label="次数占比(该类报警数/总报警数)" ></el-table-column>
</el-table>  
<!-- 表格结束 -->

 </div>
</template>

<script>
 export default{
      data(){
        return{
           tableData : [
           {id:1, type:'1',count:'21',rank:'2',part:'12%'},
         {id:2, type:'2',count:'1',rank:'21',part:'2%'}
         ],
         //时间选择器件获得的时间
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
          form: {
           areaname:'',
           start_time: '',
           end_time: '',
         },

       }

     },
  methods :{
//表格默认情况下显示所有数据，点击搜索按钮后 显示相应的时间段和地点的数据
    search(){
     console.log(this.value1);
     //时间选择器获取到的时间value1  格式为Thu May 12 2016 08:00:00 GMT+0800
     this.form.start_time =this.value1[0];
     this.form.end_time = this.value1[1];
      console.log(this.form.start_time);
      console.log(this.form.end_time);


    }
  }
}
</script>

<style>
	
</style>