<template>
  <el-container style="height:100%;">
    <!-- 头部 -->
    <el-header>
      <!-- 导航头部在这里 -->
      <div class="header">
        <div style="color:white; display:flex;flex-direction: row; font-size:20px;">
          <img src="../assets/logo.png" style="width:60;height:60px;" alt srcset />
          One Piece ——邻近海域气象监测系统
        </div>

        <!-- 小图标 -->
        <!-- <img src="" alt="" srcset=""> -->
        <!-- 登录登出按钮 -->
        <el-row class="login_btn">
          <!-- <el-button type="primary" @click="test">TEST</el-button> -->
          <el-button @click="dialogFormVisible = true" v-if="login_flg" type="primary">登录</el-button>
          <el-button @click="exit" v-if="exit_flg" type="primary">登出</el-button>
        </el-row>
      </div>
    </el-header>
    <!-- 侧边导航和主题内容 -->
    <el-container>
      <!-- 左侧导航栏 -->
      <NavBar :cstat="stat" />
      <!-- 主体内容 -->
      <Main />

      <!-- 登录窗口 -->
      <el-dialog :visible.sync="dialogFormVisible">
        <div class="login-box">
          <el-form
            :rules="loginFormRules"
            ref="loginForm"
            :model="loginForm"
            label-position="right"
            label-width="auto"
            show-message
          >
            <span class="login-title">欢迎登录</span>
            <div style="margin-top: 5px"></div>
            <el-form-item label="用户名" prop="loginName">
              <el-col :span="22">
                <el-input type="text" v-model="loginForm.loginName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="loginPassword">
              <el-col :span="22">
                <el-input type="password" v-model="loginForm.loginPassword"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loginSubmit('loginForm')">普管登录</el-button>
              <el-button type="primary" @click="superSubmit('loginForm')">超管登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from "./NavigationBar";
import Main from "./Main";
import Global from "../js/Global";
import store from "../store/index";
export default {
  name: "Home",
  data() {
    return {
      stat: null,
      that: this,
      exit_flg: false, //登出按钮的显示
      login_flg:true,
      loginForm: {
        loginName: "",
        loginPassword: ""
      }, //登录输入信息
      dialogFormVisible: false, //登录框的显示和隐藏
      loginFormRules: {
        //登录验证规则
        loginName: [
          { required: true, message: "账号不可为空", trigger: "blur" }
        ],
        loginPassword: [
          { required: true, message: "密码不可为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    test() {
      //测试请求接口
      // this.$axios
      //   .get("http://175.24.65.62:8000/login")
      //   .then(function(response) {
      //     console.log("获取服务器信息成功");
      //     console.log("Node服务端返回值：" + response);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      // let that =this;
      this.$axios({
        url: "/login",
        method: "post",
        baseURL: "http://175.24.65.62:8900",
        data: {
          username: "零零三",
          password: "lingling03"
        },
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(function(response) {
          console.log(response);
          console.log(response.data.data.access);
          store.state.token = response.data.data.access;
          if (response.data.data.authority == 1) {
            console.log("普管yes");
            store.state.admin_stat = true;
          } else if (response.data.data.authority == 2) {
            console.log("超管yes");
            // that.$set(store.state,'adminSup',true)
            store.state.sadmin_stat = true;
          }
          console.log("ADM" + store.state.admin_stat);
          console.log("SUP" + store.state.sadmin_stat);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    exit() {
  
      console.log("登出");
      this.clear_token();
      window.location.reload();//刷新界面
      this.$set(this.$data, "exit_flg", false);//隐藏登出按钮
      this.$set(this.$data, "login_flg", true); //显示登录
      this.messageOpen(); //提示消息
    },

    clear_token(){
       store.state.user_stat = true;
       store.state.admin_stat=false;
       store.state.sadmin_stat =false;
       store.state.token = '';
       window.sessionStorage.removeItem('token');
    },
    loginSubmit(formName) {
      let that = this;
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          console.log("to loginSuccess");
          //this.$router.replace("/home");
          console.log(this.loginForm.loginName);
          let login_name = this.loginForm.loginName;
          let login_password = this.loginForm.loginPassword;

          //登录成功后改变登录状态
          this.$axios({
            url: "/login",
            method: "post",
            baseURL: "http://175.24.65.62:8900",
            data: {
              username: login_name,
              password: login_password
            },
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
            .then(function(response) {
              console.log(response);
              console.log(response.data.data.access);
              store.state.token = response.data.data.access;
              if (response.data.data.authority == 1) {
                console.log("普管yes");
                store.state.admin_stat = true;
              } else if (response.data.data.authority == 2) {
                console.log("超管yes");
                // that.$set(store.state,'adminSup',true)
                store.state.sadmin_stat = true;
              }
              console.log("ADM" + store.state.admin_stat);
              console.log("SUP" + store.state.sadmin_stat);
              Global.loginState = {
                visitor: false,
                admin: true, //侧边栏打开管理员模式
                adminSup: false
              };
              that.$set(that.$data, "stat", Global.loginState);
              //登出按钮显示
              that.$set(that.$data, "exit_flg", true);
              that.$set(that.$data, "dialogFormVisible", false);
              that.$set(that.$data, "login_flg", false);
            })
            .catch(function(error) {
              console.log(error);
              that.$message({
            type: "info",
            message: "密码或账号错误"
          });
            });
        } else {
          return false;
        }
      });
    },
    superSubmit(formName) {
      let that = this;
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          console.log("super to loginSuccess");
          //this.$router.replace("/home");//与普通管理员跳转页面不同
          //alert(JSON.stringify(this.loginForm)); //可以直接把this.user对象传给后端进行校验用户名和密码
          let login_name = this.loginForm.loginName;
          let login_password = this.loginForm.loginPassword;

          //登录成功后改变登录状态
          this.$axios({
            url: "/login",
            method: "post",
            baseURL: "http://175.24.65.62:8900",
            data: {
              username: login_name,
              password: login_password
            },
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
            .then(function(response) {
              console.log(response);
              console.log(response.data.data.access);
              // store.state.token = response.data.data.access;
              that.$store.commit('set_token', response.data.data.access);
              
              if (response.data.data.authority == '普通管理员') {
                console.log("普管yes");
                store.state.admin_stat = true;
              } else if (response.data.data.authority == '超级管理员') {
                console.log("超管yes");
                // that.$set(store.state,'adminSup',true)
                store.state.sadmin_stat = true;
                Global.loginState = {
                  visitor: false,
                  admin: false, //打开超级管理员模式
                  adminSup: true
                };
                that.$set(that.$data, "stat", Global.loginState);
                //登出按钮显示
                that.$set(that.$data, "exit_flg", true);
                that.$set(that.$data, "dialogFormVisible", false); //关闭登录窗口
                that.$set(that.$data, "login_flg", false);
              }
              console.log("ADM" + store.state.admin_stat);
              console.log("SUP" + store.state.sadmin_stat);
            })
            .catch(function(error) {
              console.log(error);
          that.$message({
            type: "info",
            message: "密码或账号错误"
          });
            });
        } else {
          return false;
        }
      });
    },

    messageOpen() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Global.loginState = {
            visitor: true,
            admin: false, //打开管理员模式
            adminSup: false
          };
          this.$set(this.$data, "stat", Global.loginState);

          this.$message({
            type: "success",
            message: "退出成功!"




          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "退出已取消"

          });
        });
    }
  },
  components: {
    NavBar,
    Main
  }
};
</script>

<style>
.let_top {
  margin-top: 60px;
}
.el-header {
  color: #333;
  background-color: rgba(3, 65, 91, 0.996078431372549);
  line-height: 60px;
}
.header {
  display: flex;
  flex-direction: row;
}

.login_btn {
  margin-left: 800px;
  height: 60px;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #66cd00;
  font-size: 30px;
  font-weight: bold;
}
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px palegreen;
}
</style>