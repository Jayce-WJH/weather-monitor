<template>
  <div>
      <div >
        <Small_map/>
        <div>   当前海上湿度较高，会导致大气颗粒物的质量浓度增加，污染会持续加重；若出现降雨，则颗粒物会被冲刷走，污染得以缓解。</div>
      </div>
    <div >
        <Line_chart/>
    </div>
  </div>
</template>

<script>
import Small_map from './Small_map'
import Line_chart from './Line_chart'

export default {
    name:"poll_forecast",
    data(){
        return{
            
        }
    },
    mounted(){

    },
    
    components:{
        Small_map,
        Line_chart
    },
    methods:{
       
    },
    
    
}
</script>

<style>

.Box1{
    border: springgreen 1px solid;
    border-radius: 5px;
    height: 600px;
    width: 100%;
}

.bor{
    border:rebeccapurple 1px solid;
}
</style>