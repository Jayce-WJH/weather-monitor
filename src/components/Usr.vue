<template>

  <div class="ces-main">
     <el-row>
        <!-- 页面tag -->
        <el-tag class="themetag">用户列表</el-tag>
        <!-- 添加用户按钮 -->
        <div class="buttons" style="float:right">
       <!--  <template slot-scope="scope"> -->
        <el-button type="primary" @click="AddUsr">添加用户</el-button>
        <!-- 解冻按钮 -->
        <el-button type="primary" @click="thaw()">解冻操作</el-button> 
      <!-- </template> -->
      </div>
      </el-row> 

<!-- 表格开始 -->
 <el-table :data="tableData" border style="width: 100%">
      <el-table-column  prop="user_id"   label="用户工号" width="80"></el-table-column>
      <el-table-column  prop="username"   label="用户名"  width="80"></el-table-column>
<!--       <el-table-column  prop="is_active"  label="冻结状态" width="170" ></el-table-column> -->
      <el-table-column  prop="email"  label="邮箱"  ></el-table-column>
      <el-table-column  prop="telephone"  label="电话"  ></el-table-column>
      <el-table-column  prop="gender"     label="性别" width="115" ></el-table-column>
      <el-table-column  prop="authority"   label="角色" width="145" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click='Editor(scope.row)' type="text" size="small">编辑</el-button>
        <el-button @click="Delete(scope.row)" type="text" size="small">冻结</el-button>
      </template>
    </el-table-column>
</el-table> 
<!-- 表格结束 -->

<!-- 用户表单  开始-->
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
<el-form  :model="form" :rules="rules" >
  <el-form-item label="用户工号" prop="user_id" :label-width="formLabelWidth">
      <el-input v-model="form.user_id" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="username" :label-width="formLabelWidth">
    <el-input v-model="form.username" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password"  autocomplete="off"></el-input>
    </el-form-item> 
  <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
    <el-input v-model="form.email" autocomplete="off"></el-input>
  </el-form-item> 
    <el-form-item label="电话" prop="telephone" :label-width="formLabelWidth">
    <el-input v-model="form.telephone" autocomplete="off"></el-input>
  </el-form-item>
 <el-form-item label="冻结状态" prop="is_active" :label-width="formLabelWidth">
    <el-select v-model="form.is_active" placeholder="请选择冻结状态">
      <el-option label=激活 value= true></el-option>
      <el-option label="冻结" value= false ></el-option>
    </el-select> 
   </el-form-item> 
  <el-form-item label="性别" prop="gender" :label-width="formLabelWidth">
    <el-select v-model="form.gender" placeholder="请选择性别">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="角色" prop="authority" :label-width="formLabelWidth">
    <el-select v-model="form.authority" placeholder="请选择权限类型">
      <el-option label="普通管理员" value="普通管理员"></el-option>
      <el-option label="超级管理员" value="超级管理员"></el-option>
    </el-select>
  </el-form-item>
</el-form>    
   <!--确定和取消按钮 -->
   <div  class="dialog-footer" >
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="BtnOk('ruleForm')">确 定</el-button>
  </div>
 </el-dialog> 
 <!-- 用户表单   结束-->

<!-- 修改表单  开始-->
  <el-dialog :title="title" :visible.sync="dialogForm2Visible">
<el-form  :model="form2" :rules="rules"  >
  <el-form-item label="用户工号" prop="user_id" :label-width="formLabelWidth">
      <el-input v-model="form2.user_id" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="username" :label-width="formLabelWidth">
    <el-input v-model="form2.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
    <el-input v-model="form2.email" autocomplete="off"></el-input>
  </el-form-item> 
    <el-form-item label="电话" prop="telephone" :label-width="formLabelWidth">
    <el-input v-model="form2.telephone" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="性别" prop="gender" :label-width="formLabelWidth">
    <el-select v-model="form2.gender" placeholder="请选择性别">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="角色" prop="authority" :label-width="formLabelWidth">
    <el-select v-model="form2.authority" placeholder="请选择权限类型">
      <el-option label="普通管理员" value="普通管理员"></el-option>
      <el-option label="超级管理员" value="超级管理员"></el-option>
    </el-select>
  </el-form-item>
</el-form>    
   <!--确定和取消按钮 -->
   <div  class="dialog-footer" >
    <el-button @click="dialogForm2Visible = false">取 消</el-button>
    <el-button type="primary" @click="BtnOk2()">确 定</el-button>
  </div>
 </el-dialog> 
 <!-- 修改表单   结束-->

     <!-- 分页开始 -->
      <div class="page" style="position: absolute; height:20px;right: 20px;">
        <el-pagination layout="prev, pager, next" :total="total" :page-size="page_size" :current-page.sync="page"  @current-change="handleCurrentChange"
          >
        </el-pagination>
      </div>
    <!-- 分页结束 -->

</div>
</template>

<script>
  // 哪里需要请求数据 就在哪里导入***************************************
import  axios from '@/http/axios.js'

 export default {
    data () {
      return {
        //表格数据 
        tableData : [     
          ],// 表格数据，对象数组
        //表单默认为新增
        title:'新增用户',
        //模态框的相关数据
        //添加表单的显示与隐藏参数
        dialogFormVisible: false,
        dialogForm2Visible: false,
        dialogVisible : false,
        //添加用户表单的数据列表
        form: {
          user_id: '',
          username: '',
          password: '',
          email: '',
          telephone: '',
          gender: '',
          authority: '',
          is_active: ''
        },
        form2: {
          user_id: '',
          username: '',
          email: '',
          telephone: '',
          gender: '',
          authority: '',
          is_active: ''
        },
        formLabelWidth: '100px',//label宽度
         //和分页相关的变量 
      total:undefined,  // 总页数
      page_size:5,
      page:1,
        //输入规则
        rules: {
        user_id:[
          { len: 5,message: '长度需5个字符', trigger: 'blur' }
        ],
        password: [
          { min: 6 ,message: '密码需大于6位', trigger: 'blur' }
        ]
        },
          
         }
    },
           //获取数据
    mounted(){
          console.log("created");
            //后台会提供一个接口 axios 访问后台接口 获取数据 this.abledata=获取的数据
          this.GetAllData();
    },
    methods:{
      handleCurrentChange(val){
        console.log(val);
      //筛选条件变了 重新获取值
      this.GetAllData();
    },
      GetAllData(){
      //后台会提供一个接口 axios 访问后台接口 获取数据 this.abledata=获取的数据
       let url='/users/';
        axios.get(url,{params:{
         user_id:this.user_id,
         page_size:this.page_size,
        page:this.page,
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
      //新增用户按钮
      AddUsr(){
        //axios 发送数据到后台 
        this.title="新增用户";      
        this.dialogFormVisible = true;
        this.form={};
      },
      //确认新增的按钮
      BtnOk(){
                         
            //数组的插入数据的函数 push
           //把表单数据放到tableData 数组里 插入数据
           axios.post('/users/',this.form)
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

      BtnOk2(){
             let url2='/users/'+this.form2.user_id+'/';
             axios.put(url2,this.form2)
            .then((response)=>{
            console.log(response);
            this.$notify.success({
                  title: '成功',
                  message: '修改成功'
                });
             this.GetAllData();
             }).catch((error)=>{
             console.log(error);
              this.$notify.success({
                  title: '失败',
                  message: '修改失败'
                });
           }) 
            
          this.dialogForm2Visible = false;
          
     
      },
      //冻结确定按钮
     Delete(row){
      //this.form=row;
      // console.log("Delete******");
       this.$confirm('冻结后用户不再能登录管理模式，解冻需点击解冻按钮, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          
        }).then(() => {
            // this.id=row.user_id,
             // console.log(this.id);
          axios.delete('/users/'+row.user_id+'/')
          .then((response)=>{
            console.log(response);
            this.$notify.success({
                  title: '成功',
                  message: '冻结成功'
                });
             this.GetAllData();
          }).catch((error)=>{
            console.log(error);
              this.$notify.success({
                  title: '失败',
                  message: '冻结失败'
                });
           })          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消冻结'
          });          
        });
     },
     //解冻按钮操作
     thaw(){
         this.$prompt('请输入需要解冻的工号', '解冻', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
         }).then((value) => {
        //   //this.tableData[value-1].is_active = false,//冻结状态设为0          
        //   this.$message({
        //     type: 'success',
        //     message: '工号： ' + value + '解除成功'
        //   });
        console.log("value:",value.value);
            axios.patch('/users/'+value.value+'/')
            .then((response)=>{
              console.log(response);
              this.$notify.success({
                  title: '成功',
                  message: '解冻成功'
                });
             this.GetAllData();
            }).catch((error)=>{
              console.log(error);
              this.$notify.success({
                  title: '失败',
                  message: '解冻失败'
                });
            })
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '取消解除'           
           });       
         });
     },
     //编辑按钮
     Editor(row){
      this.title="修改信息";
      this.dialogForm2Visible = true;
      console.log(this.form2);
      this.form2=row;
      console.log(this.form2);
     }
    }
  }

</script>

 
<style scoped>

</style>