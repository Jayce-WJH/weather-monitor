<template>
  <!-- 侧边导航栏 -->
  <el-aside class="nav">
    <el-row :span="6" class="tac">
      <el-col>
        <el-menu
          :default-active="this.$route.path"
          @open="handleOpen"
          @close="handleClose"
          class="el-menu-vertical-demo"
          background-color="rgba(3, 65, 91, 0.996078431372549)"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item v-for="(item,i) in asides" :index="item.path" :key="i">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.lable}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
// import Global from "../js/Global";
export default {
  data() {
    return {
      asides: [{
              path: "/Home_index",
              lable: "首页",
              icon: "menu"
            },
            {
              path: "/updata",
              lable: "一键上报",
              icon: "thumb"
            },
            {
              path: "/statistics",
              lable: "数据模块统计",
              icon: "s-data"
            }]
    };
  },
  props: {
    cstat: {
        
    }
  },
  watch: {
    cstat: {
      deep: true,
      handler(newValue) {
        console.log(newValue);
        if (newValue.visitor) {
          //游客模式
          let visitorArr = [
            {
              path: "/Home_index",
              lable: "首页",
              icon: "menu"
            },
            {
              path: "/updata",
              lable: "一键上报",
              icon: "thumb"
            },
            {
              path: "/statistics",
              lable: "数据模块统计",
              icon: "s-data"
            }
          ];
          this.$set(this.$data, "asides", visitorArr);
        } else if (newValue.admin) {
          //管理员模式
          let adminArr = [
            {
              path: "/Home_index",
              lable: "首页",
              icon: "menu"
            },
            {
              path: "/updata",
              lable: "一键上报",
              icon: "thumb"
            },
            {
              path: "/Equipment",
              lable: "设备管理",
              icon: "cpu"
            },
            {
              path: "/Alarm",
              lable: "报警管理",
              icon: "magic-stick"
            },
            {
              path: "/Alarm_statistic",
              lable: "报警统计",
              icon: "magic-stick"
            },
            {
              path: "/statistics",
              lable: "数据模块统计",
              icon: "s-data"
            }
          ];

          this.$set(this.$data, "asides", adminArr);
        } else if (newValue.adminSup) {
          //超级管理员模式
          let adminSupArr = [
            {
              path: "/Home_index",
              lable: "首页",
              icon: "menu"
            },
            {
              path: "/updata",
              lable: "一键上报",
              icon: "thumb"
            },
            {
              path: "/Equipment",
              lable: "设备管理",
              icon: "cpu"
            },
            {
              path: "/Alarm",
              lable: "报警管理",
              icon: "magic-stick"
            },
            {
              path: "/Alarm_statistic",
              lable: "报警统计",
              icon: "magic-stick"
            },
            {
              path: "/Area_manage",
              lable: "海洋区域管理",
              icon: "map-location"
            },
            {
              path: "/Usr",
              lable: "用户管理",
              icon: "s-custom"
            },
            {
              path: "/Log",
              lable: "操作日志",
              icon: "tickets"
            },
            {
              path: "/statistics",
              lable: "数据模块统计",
              icon: "s-data"
            }
          ];
          this.$set(this.$data, "asides", adminSupArr);
        }
      }
    }
  },
  // created() {
  //   console.log("导航栏页的游客值" + Global.loginState.visitor);
  //   console.log("导航栏页的admin值" + Global.loginState.admin);
  //   console.log("导航栏页的SupAdmin值" + Global.loginState.admin);
  //   console.log("父组件给的stat值：" + this.$props.cstat);
  // },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    test(e) {
      console.log("okkk");
      console.log(e.index);
    }
  },
  components: {}
};
</script>

<style>
.el-aside {
  color: #333;
  /* display: block;
    position: relative;
    overflow-y: scroll;
    background-color: #324157 !important; */
}

.nav {
  height: 100%;
  display: block;
  position: relative;
  overflow-y: scroll;
  background-color: rgba(198, 218, 232, 0.996078431372549) !important;
}
</style>