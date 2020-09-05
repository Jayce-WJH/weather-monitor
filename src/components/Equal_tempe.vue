<template>
    <div>
        <Small_map/>
        <div class="et" >
            
            <div style="font-size:25px; font-weight: 800;">
                水温对海洋生物影响分析
            </div>
            <br>
            <div style="font-size:20px; "> 
                 当海水出现升温的问题时，海水中CO2的溶解度较低，这个问题，会影响那些海洋植物光合作用的能力，CO2减少了，生成的有机物也相应减少，光合作用所释放的氧气也相应减少。这对于海洋生物来说，意味着某些吃草性生物缺少食物来源。海水升温，还会有另一个问题，就是含氧量减少的问题。温度较高的海水中，氧气的浓度较低。研究表明，当海洋温度每上升1℃，海水中就会损失32 pmol的含氧量（约24 mmol kg-1）。这个才是致命的问题所在。前面出现的食物短缺问题，还可以寻找新的食物来源，氧气不足，随时都可能窒息而亡。虽然，海水升温，最直接的只是造成很多海洋生物的死亡，看起来，似乎与我们人类没有太大的联系。其实，对我们人类的影响也是很深远的。我们人类虽然是地球上最具智慧的生命，但是离不开地球的生态系统。
            </div>

        </div>
    </div>
</template>

<script>
import Small_map from './Small_map'
export default {
    name:"Equal_tempe",
    components:{
        Small_map
    }
}
</script>

<style>
.et{
    
    width: 100%;
    text-align: center;
}
</style>