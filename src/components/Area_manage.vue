 <template>

  <div class="ces-main">
     <el-row>
        <!-- 页面tag -->
        <el-tag class="themetag">海洋区域管理</el-tag>
        <!-- 添加/修改区域按钮 -->
        <el-button type="primary" @click="AddArea" style="float:right">增加区域</el-button>
      </el-row> 
<!-- 区域信息表格  开始 -->
<el-table :data="tableData" :model="form" border style="width: 100%" >
      <el-table-column property="area_id" label="区域编号" ></el-table-column>
    <el-table-column property="area_name" label="区域名称" ></el-table-column>
    <el-table-column property="longitude" label="经度"></el-table-column>
    <el-table-column property="latitude" label="纬度" ></el-table-column>
    <el-table-column property="radius" label="区域半径" ></el-table-column>
    <el-table-column property="status" label="监控状态" ></el-table-column>
      <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button @click='Edit(scope.row)' type="text" size="small">激活监控</el-button>
        <el-button @click='Dele(scope.row)' type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
</el-table> 
<!-- 区域信息表格  结束 -->

<!-- 区域信息表单 -->
 <el-dialog title="新增区域"  :visible.sync="dialogFormVisible">
<el-form :label-position="'left'" :model="form">
  <el-form-item label="区域编号" :label-width="formLabelWidth">
      <el-input v-model="form.area_id" autocomplete="off"></el-input>
    </el-form-item>
  <el-form-item label="区域名称" :label-width="formLabelWidth">
    <el-input v-model="form.area_name" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item label="区域圆心经度" :label-width="formLabelWidth">
    <el-input v-model="form.longitude" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="区域圆心纬度" :label-width="formLabelWidth">
    <el-input v-model="form.latitude" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="区域半径" :label-width="formLabelWidth">
    <el-input v-model="form.radius" autocomplete="off"></el-input>
  </el-form-item>
  </el-form>    
   <!--确定和取消按钮 -->
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="BtnOk()">确 定</el-button>
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

        dialogFormVisible: false,
        form:  {
        area_id: '',
        area_name: '',
        longitude: '',
        latitude:'' ,
        radius:'' ,
        //status:'' 
      },
      delete_id:'',
      change_id:'',
        formLabelWidth: '120px',


         }
    },
    //获取数据
    created(){
     this.GetAllData();
    },
    methods:{
       GetAllData(){
      //后台会提供一个接口 axios 访问后台接口 获取数据 this.abledata=获取的数据
        let url='/areas/area_list';
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
      //添加区域
      AddArea(){
        this.dialogFormVisible = true;
        this.form={};
      },
      //编辑信息
      Edit(row){
      
       console.log(row.area_id);
      this.$axios.put('http://175.24.65.62:8900/areas/area_update?area_id='+row.area_id)
        .then( (response)=> {
         console.log(response.data.data);
         this.$notify.success({
                  title: '成功',
                  message: '修改成功'
                });
         this.GetAllData();            
        }).catch((error) =>{
          console.log(error);
          this.$notify.success({
                  title: '失败',
                  message: '修改失败'
                });
        });

      }, 
      //删除信息
      Dele(row){
        this.$confirm('删除操作将无法恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          
        }).then(() => {
            // this.id=row.user_id,
            console.log(row.area_id);
            this.delete_id=row.area_id;
            let url='/areas/area_delete';
          axios.delete(url,{params:{
          area_id:this.delete_id,
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
      //确认新增的按钮
      BtnOk(){
       //数组的插入数据的函数 push
           //把表单数据放到tableData 数组里 插入数据
           axios.post('/areas/area_add',this.form)
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
            
          this.dialogFormVisible = false;
      },
    }
  }

</script>

 
<style scoped>

</style>
