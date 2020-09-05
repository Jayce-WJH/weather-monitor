<template>

  <div class="ces-main">
     <el-row>
        <!-- 页面tag -->
        <el-tag class="themetag">用户上报信息共享平台</el-tag>
        <!-- 一键上报button -->
        <el-button type="primary" @click="dialogFormVisible = true" style="float:right">一键上报</el-button>
      </el-row> 

<!-- 表格开始 -->
 <el-table :data="tableData" border style="width: 100%">
      <el-table-column  prop="areaName" label="海域名称" ></el-table-column>
      <el-table-column  prop="longitude" label="经度"  ></el-table-column>
      <el-table-column  prop="latitude" label="纬度" ></el-table-column>
      <el-table-column  prop="checkType" label="上报类型"  ></el-table-column>
      <el-table-column  prop="details" label="信息详情"  ></el-table-column>
      <el-table-column  prop="riskRating" label="危险等级" ></el-table-column>
</el-table> 
<!-- 表格结束 -->

        <!-- 上报表单 -->
 <el-dialog title="上报信息输入表" :visible.sync="dialogFormVisible">
 
<el-form :label-position="'left'" :model="form">
  <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
  <el-form-item label="海域名称" :label-width="formLabelWidth">
    <el-input v-model="form.areaName" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item label="经度" :label-width="formLabelWidth">
    <el-input v-model="form.longitude" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="纬度" :label-width="formLabelWidth">
    <el-input v-model="form.latitude" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="上报信息详情" :label-width="formLabelWidth">
    <el-input v-model="form.details" autocomplete="off"></el-input>
  </el-form-item> 

        <el-form-item label="信息共享类型" :label-width="formLabelWidth">
          <el-select v-model="form.checkType" placeholder="请选择信息共享类型">
            <el-option label="紧急事故求助" value="1" ></el-option>
            <el-option label="污染问题" value="2"></el-option>
            <el-option label="天气问题" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="危险等级" :label-width="formLabelWidth">
          <el-select v-model="form.riskRating" placeholder="请选择危险等级">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item> 
  </el-form>    
   <!--确定和取消按钮 -->
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="updata">确 定</el-button>
  </div>
 </el-dialog>


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
        that : this,
        tableData : [// 表格数据
          ],

        //模态框数据
        dialogFormVisible: false,//隐藏与显示
        form: {
          areaName: '',
          longitude: '',
          latitude: '',
          checkType: '',
          details: '',
          riskRating: ''
        },
      //和分页相关的变量 
      total:undefined,  // 总页数
      page_size:5,
      page:1,

        formLabelWidth: '120px',
         }
    },
            //获取数据
    created(){
            this.GetAllData();
          },
    methods:{
      handleCurrentChange(val){
        console.log(val);
      //筛选条件变了 重新获取值
      this.GetAllData();
    },
      //获取数据
      GetAllData(){
      //后台会提供一个接口 axios 访问后台接口 获取数据 this.abledata=获取的数据
             let url='/report/details';
        axios.get(url,{params:{
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
      //上报信息
      updata(){
        //this.tableData.push(this.form);

       axios.post('/report/',this.form)
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
      
      }

    }
  }

</script>

 
<style scoped>
</style>
