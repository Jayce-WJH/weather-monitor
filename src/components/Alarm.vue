<template>

  <div class="ces-main">

        <!-- 页面tag -->
  <el-tag >告警列表</el-tag>
  <!-- 表格开始 -->
 <el-table :data="tableData" :model="form" border style="width: 100%" >
    <el-table-column property="id" label="序号" ></el-table-column>
    <el-table-column property="time" label="报警时间" ></el-table-column>
    <el-table-column property="place" label="报警地点" ></el-table-column>
    <el-table-column property="device_id" label="设备编号" ></el-table-column>
    <el-table-column property="area_id" label="区域编号" ></el-table-column>
    <el-table-column property="type" label="报警类型" ></el-table-column>
    <el-table-column property="data" label="报警值" ></el-table-column>
    <el-table-column property="status" label="处理状态(0:未处理 1:已处理)" ></el-table-column>
      <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button @click="handleCheck(scope.row)" type="text" size="small">查看</el-button>
        <el-button @click='Delete(scope.row)' type="text" size="small">解除报警</el-button>
      </template>
    </el-table-column>
</el-table> 
<!-- 表格结束 -->

<!-- 解除报警信息填报表单 开始-->
<el-dialog title="告警信息" :visible.sync="dialogFormVisible">
<el-form :label-position="'left'" :model="form2">
  <el-form-item label="处理人姓名" :label-width="formLabelWidth">
    <el-input v-model="form2.name" autocomplete="off"></el-input>
  </el-form-item> 
  <el-form-item label="联系方式" :label-width="formLabelWidth">
    <el-input v-model="form2.telephone" autocomplete="off"></el-input>
  </el-form-item> 
  <el-form-item label="处理时间" :label-width="formLabelWidth">
    <el-input v-model="form2.time" autocomplete="off"></el-input>
  </el-form-item> 
<el-form-item label="处理说明" :label-width="formLabelWidth">
    <el-input v-model="form2.moredetail" autocomplete="off"></el-input>
  </el-form-item> 

  </el-form>    
   <!--确定和取消按钮 -->
    <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="BtnOk()">确 定</el-button>
  </div>
 </el-dialog> 
 <!-- 解除报警信息填报表单 结束--> 
  
<!--  查看告警详情 -->
<el-dialog title="告警详情" :visible.sync="dialogTableVisible">
 <el-form :label-position="'left'" :model="form2">
    <el-form-item label="负责人" >
    <el-input v-model="form2.name" autocomplete="off" :disabled="true"></el-input>
   </el-form-item> 
   <el-form-item label="联系方式" >
    <el-input  v-model="form2.telephone" autocomplete="off" :disabled="true"></el-input>
   </el-form-item> 
  <el-form-item label="处理时间" >
    <el-input  v-model="form2.time" autocomplete="off" :disabled="true" value-format="yyyy-MM-dd HH:mm:ss" ></el-input>
  </el-form-item> 
  <el-form-item label="处理说明" >
    <el-input  v-model="form2.moredetail" autocomplete="off" :disabled="true"></el-input>
  </el-form-item> 
</el-form>
</el-dialog>
<!--  查看告警结束 -->

  </div>
</template>

<script>
  // 哪里需要请求数据 就在哪里导入***************************************
import  axios from '@/http/axios.js'
 export default {
    data () {
      return {

        tableData : [
          ],// 表格数据

        dialogTableVisible: false,
        dialogFormVisible: false,
        //表单数据
        form: {
          id: '',
          time: '',
          place: '',
          device_id: '',
          area_id:'',
          type: '',
          data:'',
          status: '',


        },
        form2:{
          dismissid:'',
          name:'',
          telephone:'',
          time:'',
          moredetail:''
        },
        temp:[],
        formLabelWidth: '120px',
     //获取数据
         }
    },
    created(){
          this.GetAllData();
     },
    methods:{
    GetAllData(){
      //后台会提供一个接口 axios 访问后台接口 获取数据 this.abledata=获取的数据
             let url='/warning/';
        axios.get(url,{params:{
         // page_size:this.page_size,
         // page:this.page,
         dismissid:this.form2.dismissid,

        }})
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
     //解除报警信息填报确定按钮
     BtnOk(){
          console.log(this.form2.dismissid);
          console.log(this.form2);
           axios.post('/warning/done',this.form2)
           .then((response)=>{
            console.log("如果成功：",response);
            this.GetAllData();
           }).catch((error)=>{
            this.$notify.error({
                  title: '失败',
                  message: '新增失败'
             });

             console.log(error)// 打印失败的信息
        }) 

            let url2='/warning/'+this.form2.dismissid+'/status';
             axios.put(url2)
            .then((response)=>{
            console.log(response);
            this.$notify.success({
                  title: '成功',
                  message: '解除成功'
                });
             this.GetAllData();
             }).catch((error)=>{
             console.log(error);
              this.$notify.success({
                  title: '失败',
                  message: '解除失败'
                });
           })             
            
          this.dialogFormVisible = false;
     },
     //查看详情
     handleCheck(row){  

       this.dialogTableVisible = true;
       this.form2.dismissid=row.id;
       console.log('dismissid:',this.form2.dismissid);
       let url='/warning/detail';
        axios.get(url,{params:{
          dismissid:this.idd,
        }})
       .then((response)=>{
        // 后台传来什么样的值
         console.log(response);
         //this.form2=response.data.data.results;
         this.$set(this.temp=response.data.data.results);
         this.$set(this.form2=this.temp[0]);
         console.log('form2:',this.form2);
       }).catch((error)=>{
        console.log(error);
        this.$notify.error({
          title: '失败',
          message: '查看失败'
        });
       })

     },
     //解除报警
     Delete(row){
      //this.form2=row;
      this.form2.dismissid=row.id;
      console.log(this.form2.dismissid);
      this.dialogFormVisible = true;
     }
    }
  }

</script>

 
<style scoped>

</style>
