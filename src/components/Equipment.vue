<template>
  <div class="ces-main">
     <el-row>
        <!-- 页面tag -->
        <el-tag class="themetag">设备管理</el-tag>
        <!-- 添加设备按钮 -->
        <el-button type="primary" @click="AddTool" style="float:right">添加设备</el-button>

      </el-row> 
  <!-- 表格开始 -->
 <el-table :data="tableData" :model="form" border style="width: 100%" >
      <el-table-column  prop="device_id"   label="设备编号" ></el-table-column>
      <el-table-column  prop="serial"   label="设备名称"  ></el-table-column>
      <el-table-column  prop="x_index"  label="经度"  ></el-table-column>
      <el-table-column  prop="y_index"  label="纬度"  ></el-table-column>
      <el-table-column  prop="bind_area"  label="绑定状态"  ></el-table-column>
      <!-- <el-table-column  prop="is_Online"  label="在线状态"  ></el-table-column> -->
      <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button @click='Editor(scope.row)' type="text" size="small">更新</el-button>
        <el-button @click="Dele(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
</el-table> 
<!-- 表格结束 -->

<!-- 查看详情 开始-->
 <el-dialog :title="title" :visible.sync="dialogTableVisible">
  <el-form :label-position="'left'" :model="form">
  <el-form-item label="发送频率" >
    <el-input v-model="form.frequency" autocomplete="off" :disabled="true"></el-input>
  </el-form-item> 
  <el-form-item label="报警值" >
    <el-input v-model="form.thresholdValue" autocomplete="off" :disabled="true"></el-input>
  </el-form-item> 
  <el-form-item label="校准值" >
    <el-input v-model="form.calibrationValue" autocomplete="off" :disabled="true"></el-input>
  </el-form-item> 
</el-form>
</el-dialog> 
<!-- 查看详情 结束-->

<!-- 设备表单 -->
 <el-dialog title="title" :visible.sync="dialogFormVisible">
<el-form :label-position="'left'" :model="form" ref="ruleForm">
  <el-form-item label="设备序列号" :label-width="formLabelWidth">
      <el-input v-model="form.device_id" autocomplete="off"></el-input>
    </el-form-item>
  <el-form-item label="设备名称" :label-width="formLabelWidth">
    <el-input v-model="form.name" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item label="经度" :label-width="formLabelWidth">
    <el-input v-model="form.x_index" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="纬度" :label-width="formLabelWidth">
    <el-input v-model="form.y_index" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="发送频率" :label-width="formLabelWidth">
    <el-input v-model="form.frequency" autocomplete="off"></el-input>
  </el-form-item> 
  <el-form-item label="报警值" :label-width="formLabelWidth">
    <el-input v-model="form.thresholdValue" autocomplete="off"></el-input>
  </el-form-item> 
  <el-form-item label="校准值" :label-width="formLabelWidth">
    <el-input v-model="form.calibrationValue" autocomplete="off"></el-input>
  </el-form-item> 
         <el-form-item label="绑定状态" :label-width="formLabelWidth">
          <el-select v-model="form.is_bind" placeholder="请选择绑定状态">
            <el-option label="true" value="true"></el-option>
            <el-option label="false" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在线状态" :label-width="formLabelWidth">
          <el-select v-model="form.is_Online" placeholder="请选择在线状态">
            <el-option label="true" value="true"></el-option>
            <el-option label="false" value="false"></el-option>
          </el-select>
        </el-form-item>

  </el-form>    
   <!--确定和取消按钮 -->
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="BtnOk('ruleForm')">确 定</el-button>
  </div>
 </el-dialog>

</div>
</template>

<script>
  // 哪里需要请求数据 就在哪里导入***************************************
import  axios from '@/http/axios.js'
 export default {
    data () {
      return {
        that : this,
        tableData : [

          ],// 表格数据

        dialogFormVisible: false,//添加设备 表单隐藏
        form: {
          device_id: '',
          serial: '',
          x_index: '',
          y_index: '',
          bind_area: '',
          is_Online: true,
          frequency: '',
          thresholdValue: '',
          calibrationValue: '',

        },
        formLabelWidth: '120px',
        dialogTableVisible: false,//查看详情 表单隐藏
        title:'新增设备',
        idDis:false, //激活码和密钥是否可见


         }

    },
     //获取数据
    created(){
      this.GetAllData();
       },
    methods:{
      GetAllData(){
      //后台会提供一个接口 axios 访问后台接口 获取数据 this.abledata=获取的数据
       let url='/devices/device_list';
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
      //添加设备
      AddTool(){
       this.title="新增设备";
        this.dialogFormVisible = true;
        this.form={};
      },
      //查看
      // handleCheck(row) {
      //   //row读取到的是当前行的tableData数组对象
      //   this.form=row;
      //   this.dialogTableVisible =true;
      //   console.log(this.form);
      // },
      //删除
      Dele(row){
      this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           ///  id  ==> 后台  我们要删除  删除  谨慎
          
          // this.id=row.device_id,
            console.log(row.device_id);
            let url='/devices/device_delete';
          axios.delete(url,{params:{
          device_id:row.device_id,
        }})
          .then((response)=>{
            console.log(response);
            this.$notify.success({
                  title: '成功',
                  message: '删除成功'
                });
             this.GetAllData();
          }).catch((error)=>{
            console.log(error);
              this.$notify.success({
                  title: '失败',
                  message: '删除失败'
                });
           })  

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    //编辑按钮
     Editor(row){
     this.title="更新设备";
     console.log("test showrecord2");
     //this.idDis=true; //激活码和密钥不可见
     //this.dialogFormVisible = true;
     //this.form=row;

    console.log(row.device_id);
      this.$axios.put('http://175.24.65.62:8900/devices/device_update?device_id='+row.device_id)
        .then( (response)=> {
         console.log(response.data.data);
         this.$notify.success({
                  title: '成功',
                  message: '状态更新成功'
                });
         this.GetAllData();            
        }).catch((error) =>{
          console.log(error);
          this.$notify.success({
                  title: '失败',
                  message: '状态更新失败'
                });
        });


     },
     //确定添加
     BtnOk(formName){  
         this.$refs[formName].validate((valid) => {
        if(valid){
          if(this.title=='新增设备'){
              //axios 发送数据到后台
              axios.post('/devices/device_add',this.form)
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
         
          }
          if(this.title=='更新设备'){
            console.log("更新设备");


          }
        this.dialogFormVisible=false;
        }else{
          console.log('失败')
        }
          
    })

     }

    }
  }

</script>

 
<style scoped>

</style>
