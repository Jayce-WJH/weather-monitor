<template>

  <div class="ces-main">
    <!-- 页面tag -->
    <el-tag class="themetag">操作日志</el-tag>


    <el-form>
        <el-form-item label="数据导出" prop="authority" >
      <!-- 下载时间选择下拉框 -->
      <el-select  v-model="down" placeholder="请选择时间段">
      <el-option label="今日" value="1"></el-option>
      <el-option label="一周" value="2"></el-option>
      <el-option label="当月" value="3"></el-option>
      <el-option label="三个月" value="4"></el-option>
      <el-option label="一年" value="5"></el-option>
     </el-select>
      <!-- 下载按钮 -->
    <el-button type="info" icon="el-icon-download" circle @click="download"></el-button>
      </el-form-item>
    </el-form>

   <!-- 表格开始 -->
 <el-table :data="tableData" border style="width: 100%">
      <el-table-column  prop="id" label="序号" ></el-table-column>
      <el-table-column  prop="log_name" label="操作人用户名"  ></el-table-column>
      <el-table-column  prop="address" label="地址" ></el-table-column>
      <el-table-column  prop="content" label="操作内容"  ></el-table-column>
      <el-table-column  prop="time" label="操作时间"  ></el-table-column>
</el-table> 
<!-- 表格结束 -->

  </div>
</template>

<script>
  // 哪里需要请求数据 就在哪里导入***************************************
import  axios from '@/http/axios.js'

 export default {

    data () {
      return {
        that : this,
        down:'',
        tableData : [
          ],// 表格数据
          }
    },
     created(){
            this.GetAllData();
          },
    methods:{
      GetAllData(){
      //后台会提供一个接口 axios 访问后台接口 获取数据 this.abledata=获取的数据
        let url='/logs/';
        axios.get(url)
       .then((response)=>{
        // 后台传来什么样的值
         console.log(response);
         this.tableData=response.data.data.results;
       }).catch((error)=>{
        console.log(error);
        this.$notify.error({
          title: '失败',
          message: '获取数据失败'
        });
       })

      },
      download(){

      }
    }
  }

</script>

 
<style scoped>

</style>
