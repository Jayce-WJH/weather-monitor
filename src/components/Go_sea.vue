<template>
    <div>
        <div>
            <Small_map :cdata="cda"/>
        </div>
        
        <div>
            <Line_chart/>
            
        </div>
    </div>
</template>

<script>
import Small_map from './Small_map'
import Line_chart from './Line_chart'
// import store from '../store/index'
export default {
    name:"Go_sea",
    data(){
        return{
            cda:{
                areaid:4,
                number: 49,
                text:'',
                time:'',
            }
        }
    },
    components:{
        Line_chart,
        Small_map
    },
    mounted(){
        let that = this;
        let urlx = "http://175.24.65.62:8900/tips/?areaid=4";  //+store.state.equip_id.toString();
    
    this.$axios
      .get(urlx)
      .then(function (response) {
        console.log(response.data.data[0]);
        
        that.$set(that.$data.cda, "areaid", response.data.data[0].areaid);
        that.$set(that.$data.cda, "number", response.data.data[0].number);
        that.$set(that.$data.cda, "text", response.data.data[0].text);
        that.$set(that.$data.cda, "time", response.data.data[0].time);  
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}
</script>

<style>

</style>