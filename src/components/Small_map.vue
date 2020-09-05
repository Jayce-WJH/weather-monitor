<template>
  <div class="smap">
    <!-- <img src="../../src/assets/smap.gif" style="z-index:-10;width:100%;"> -->
    <div v-if="imgshow" class="gif">
      <img class="gifimg" :src="imgUrl" style="z-index:-10;width:100%;" />
    </div>
    <div class="hours" v-if="imgshow">
      <div>
        <el-button type="primary" @click="clich('24')" value="24"  size="mini" plain style="z-index:150;">24小时</el-button>
        <el-button type="primary" @click="clich('72')" value="72" size="mini" plain style="z-index:150;">72小时</el-button>
        <el-button type="primary" @click="clich('96')" value="96" size="mini" plain style="z-index:150;">96小时</el-button>
        <el-button type="primary" @click="clich('120')" value="120" size="mini" plain style="z-index:150;">120小时</el-button>
      </div>

      <div style="margin-left:450px;">
        <el-button type="primary"  @click="clicd('20')" deep="20"  size="mini" plain style="z-index:150;">20米</el-button>
        <el-button type="primary"  @click="clicd('50')" deep="50" size="mini" plain style="z-index:150;">50米</el-button>
        <el-button type="primary"  @click="clicd('100')" deep="100" size="mini" plain style="z-index:150;">100米</el-button>
        <el-button type="primary"  @click="clicd('200')" deep="200" size="mini" plain style="z-index:150;">200米</el-button>
        <el-button type="primary"  @click="clicd('500')" deep="500" size="mini" plain style="z-index:150;">500米</el-button>
      </div>
    </div>

    <div class="datess">{{time}}</div>
    <el-button type="success" @click="back" class="back" size="mini">返回</el-button>
    <div class="grid">
      网格号
      <br />{{areaid}}
    </div>
    <div class="jwd">
      经纬度
      <br />128.13,28.33
    </div>
    <div class="dqzs" v-show="flg">
      {{airFlg.name}}
      <br />
      {{airFlg.value}}
    </div>

    <div class="wm" v-if="this.$route.query.wmNumber == true">
      <div class="wmBox">{{wmNumber1.name}}:{{wmNumber1.value}}</div>
      <br />
      <div class="wmBox1">{{wmNumber2.name}}:{{wmNumber2.value}}</div>
    </div>

    <div style="font-size:25px;color:#F56C6C;">
      {{notice}}
    </div>


    <div  class="maaap" v-if="mapshow">
        <Map/>
    </div>
  </div>
</template>

<script>
import Map from './Map'
export default {
  name: "Small_map",
  props:["cdata"],
  data() {
    return {
      areaid:'',
      time:'2020-07-24',
      notice:'请注意出海安全',
      nowdata:'24', //时间
      nowdeep:'20',
      imgUrl: 'http://www.nmefc.cn/chanpin/hyhj/c-scs/024_T_0020.png',
      imgshow: false,
      mapshow:false,
      flg: false,
      airFlg: {
        name: "大气指数",
        value: 89
      },
      wmNumber1: {
        name: "雾霾指数1",
        value: 60
      },
      wmNumber2: {
        name: "雾霾指数1",
        value: 20
      }
    };
  },
  components:{
    Map
  },
  created() {
    var Ur = this.$route.path;
    let URl = Ur.toString();
    
    console.log(URl);
    if (URl == "/Pollution_forecast") {
      this.$set(this.$data, "mapshow", true);
      //污染预测
      this.$set(this.$data, "wmNumber1", { name: "雾霾指数1", value: 45 });
      this.$set(this.$data, "wmNumber2", { name: "雾霾指数2", value: 25 });
      
    }
    if (URl == "/Equal_tempe") {
      //等温页面
      this.$set(this.$data, "wmNumber1", { name: "水温1", value: 22 });
      this.$set(this.$data, "wmNumber2", { name: "水温2", value: 33 });
      this.$set(this.$data, "imgshow", true);
      this.$set(this.$data, "mapshow", false);

      this.$axios
        .get("http://175.24.65.62:8900/data/24/20/temperature")
        .then(function(response) {
          console.log("imageUrl：" + response.data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    // if(this.$route.path =='/Poll_degree'){ //等温页面
    //     // this.$set(this.$data,'wmNumber1',{name:'水温1',value:22});
    //     // this.$set(this.$data,'wmNumber2',{name:'水温2',value:33});
    // }
    if (URl == "/History_air") {
      console.log("折线图中的路径" + URl);
      // this.$data.airFlg.flg = true;
      this.$set(this.$data, "flg", true);
      this.$set(this.$data, "mapshow", true);
      this.$set(this.$data, "airFlg", { name: "大气指数", value: 88 });
    }
    if (URl == "/Go_sea") {
      console.log("折线图中的路径" + URl);
      this.$set(this.$data, "flg", true);
      this.$set(this.$data, "mapshow", true);

      this.$set(this.$data, "airFlg", { name: "出海指数", value:this.$props.cdata.number });

      this.$set(this.$data,'areaid',this.$props.cdata.areaid);
      // this.$set(this.$data,'time',this.$props.cdata.time.toString().slice(0,10));
      this.$set(this.$data,'notice',this.$props.cdata.text);

    }

  },
  methods: {
    clich(h){
         let that = this;
        this.$data.nowdata = h;
        let UrlN = 'http://175.24.65.62:8900/data/'+h+'/'+this.$data.nowdeep+'/temperature'
        this.$axios
        .get(UrlN)
        .then(function(response) {
          console.log("imageUrl：" + response.data.data);
        //   uu=null;
          that.$set(that.$data,'imgUrl', response.data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clicd(d){
        let that = this;
        this.$data.nowdeep = d;
        let UrlN = 'http://175.24.65.62:8900/data/'+this.$data.nowdata+'/'+d+'/temperature'
        this.$axios
        .get(UrlN)
        .then(function(response) {
          console.log("imageUrl：" + response.data.data);
          that.$set(that.$data,'imgUrl', response.data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    back() {
      this.$router.push({
        //返回页面
        path: "/Statistics"
      });
    }
  }
};
</script>

<style>
.maaap{
  height: 500px;
  width: 800px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 550px;
  top: 160px;
}
.hours {
  display: flex;
  flex-direction: row;
  margin-top: 60px;
}
.gif {
  width: 800px;
  height: 500px;
  margin-left: 250px;
  z-index: -10;
}
.smap {
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 600px;
  width: 100%;
}
.gifimg {
  width: 600px;
  height: 590px;
}
.grid {
  width: 120px;
  font-size: 20px;
  border-radius: 10px;
  margin: 0 60px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 200px;
}
.jwd {
  width: 120px;
  font-size: 20px;
  border-radius: 10px;
  margin: 60px 60px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 260px;
}
.dqzs {
  width: 120px;
  font-size: 20px;
  border-radius: 10px;
  margin: 120px 60px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 290px;
}
.datess {
  width: 200px;
  height: 30px;
  font-size: 20px;
  border-radius: 10px;
  position: absolute;
  top: 150px;
  right: 100px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.back {
  position: absolute;
  top: 200px;
  right: 100px;
}
.wm {
  position: absolute;
  right: 60px;
  bottom: 200px;
}
.wmBox {
  width: 180px;
  height: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  font-size: 16px;
}
.wmBox1 {
  width: 180px;
  height: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  font-size: 16px;
}
</style>