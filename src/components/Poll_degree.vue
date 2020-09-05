<template>
    <div>
        <div>
            <Small_map/>
            <div class="degreeBox">
    <el-table
    :data="PmArray"
    style="width: 100%;"
    height="280"
    size="medium"
  >
    <el-table-column 

      prop="name"
      >
    </el-table-column>
    <el-table-column
      prop="value"
     >
    </el-table-column>
 
  </el-table>
                
            </div>
            <div class="degreeBox1">
                <div style="font-weight:600; font-size:40px;">
                    海水酸碱度影响分析
                </div>
                <br>
                海水pH值是海水酸碱度的一种标志。海水的pH 值大于7,所以海水呈弱碱性。海水pH值因季节和区域的不同而不同，夏季时，由于增温和强烈的光合 作用，使上层海水中二氧化碳含量和氢离子浓度下降，于是pH值上升，即碱性增强，冬季时则相反，pH值下降，在溶解氧高的海区，pH值也高；反之， pH值就低。
            </div>
            <div class="seawPH">
            海水酸碱度：88    
        </div>
        </div> 
        
    <div>
        <Line_chart/>
    </div>
    </div>
    
</template>

<script>

import Line_chart from './Line_chart'
import Small_map from './Small_map'

export default {
    name:"Poll_degree",
    data(){
        return{
            PmArray:[
                {
                    name:'PM10',
                    value:3.6
                },
                {
                    name:'PM2.5',
                    value:5.9
                },
                {
                    name:'SO2',
                    value:4.8
                },
                {
                    name:'NO2',
                    value:6.1
                },
                {
                    name:'CO',
                    value:3.3
                },
                {
                    name:'O3',
                    value:5.2
                },
            ]
        }
    },
    components:{
        Line_chart,
        Small_map
    }
}
</script>

<style>
.seawPH{
    height: 100px;
    width: 160px;
    font-size: 30px;
    font-weight: 600;
    border: blueviolet 1px solid;
    border-radius: 5px;
    position: absolute;
    right: 100px;
    top: 500px;

}
.degreeBox{
    margin-left: 15px;
    border-radius: 5px;
    height: 280px;
    width: 400px;
    position: absolute;
    bottom: 160px;
    font-weight: 1000;
    font-size: 40px;
    /* display: flex;
    flex-direction: column; */
}
.degreeBox1{
    border: blue 1px solid;
    border-radius: 5px;
    width: 500px;
    height: 300px;
    position: absolute;
    top: 100px;
    left: 900px;
    text-align: center;
    font-size: 20px;
}
</style>