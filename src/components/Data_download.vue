// 数据下载接口 , 导出地址等  ;首页右侧信息栏底部
<template>  
    <div class="downBox">
        <div class="downApi">
            数据下载接口
        </div>
        <br>
        <el-select v-model="selected" @change="sele" placeholder="请选择下载数据时间段">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
        <div class="exportApi">
            导出地址
            <br>
            <br>
            <el-button @click="downExcel" type="primary" plain>点击下载</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name:"Data_download",
    data() {
      return {
        selected:"",
        options: [
        {
          value: '1',
          label: '今日',
        }, {
          value: '2',
          label: '近一周',
        }, {
          value: '3',
          label: '当月内',
        }, {
          value: '4',
          label: '三个月内',
        }, {
          value: '5',
          label: '近一年内',
        }
        ]
      };
    },
    methods:{
        sele(){
            console.log(this.$data.selected);

        },
        downExcel(){
            if(this.$data.selected == ''){
                this.$notify.error({
                title: '提示',
                message: '请选择时间段'
        });
            }else{
                let urls = "http://175.24.65.62:8900/data/1/"+this.$data.selected+'/period'
                window.location.href = urls;
                // console.log('下载'+this.$data.selected+'Excel');
            }
           
        }
    }
}
</script>

<style>
.downBox{
    width: 100%;
    height: 300px;
    margin-top: 15px;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}
.downApi{
padding-top: 35px;
}
.exportApi{
margin-top: 40px;
}
</style>