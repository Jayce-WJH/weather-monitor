<template>
  <div>
      <div>
          <Small_map/>
      </div>
      <div>
          <Line_chart :curlPath="urlPath"/>
      </div>
  </div>
</template>

<script>
import Small_map from './Small_map'
import Line_chart from './Line_chart'
export default {
    name:"History_air",
    data(){
        return{
            urlPath:'test'
        }
    },
    components:{
        Line_chart,
        Small_map
    },
    
    mounted(){
        
    }
}
</script>

<style>

</style>