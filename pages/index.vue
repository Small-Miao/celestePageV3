<template>
  <div>
    <div id="background">
      <div id="cogwheel"></div>
      <div id="miao"></div>
    </div>
    <CelesteHeader />
    <div class="content">
      <el-dialog title="登录" width="30%" :close-on-click-modal="false" :visible.sync="loginVisible">
        <el-row>
          <el-input v-model="user_form.username" placeholder="请输入用户名"></el-input>
        </el-row>
        <el-row>
          <el-input
            v-model="user_form.password"
            show-password
            placeholder="请输入密码"
            style="margin-top: 2%"
          ></el-input>
        </el-row>
        <el-row>
          <el-input
            v-model="user_form.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%;float: left;margin-top: 2%;"
          >
          </el-input>
          <div class="login-code" style="margin-top: 2%">
            <img :src="codeUrl" @click="getCode" class="login-code-img"/>
          </div>
        </el-row>
        <el-row style="margin-top:2%">
          <el-button style="float:left;background-color: cadetblue;border: none;" type="primary" @click="register()">还没有账号？注册一个吧</el-button>
          <el-button style="float:right;" type="primary" @click="login()">登录</el-button>
          <el-button style="float:right;margin-right:1%;" type="warning">忘记密码</el-button></el-row>
      </el-dialog>
      <div class="slideBar">
        <CelesteAccount :showLoginDialog="showLoginDialog" ref ="loginMethod" />
        <CelesteServerStatus style="margin-top: 6%" />
        <CelesteDevInfo style="margin-top: 6%" />
      </div>
      <div class="mainList">
        <CelesteInfo />
        <CelesteServerEvent style="margin-top: 4%" />
        <CelesteChatLive style="margin-top: 4%" />
      </div>
    </div>
  </div>
</template>

<script>
import { register } from 'enquire.js/src';

export default {
  name: "IndexPage",
  data() {
    return {
      codeUrl:'',
      loginVisible: false,
      user_form:{
        username: "",
        password: "",
        code: " ",
      },
    };
  },
  mounted() {
    this.getCode();
  },
  methods: {
    showLoginDialog() {
      this.user_form={
        username: "",
        password: "",
        code: "",
      }
      this.loginVisible = true;
      this.resetForm('loginForm');
    },
    login(){
      let self = this;
      this.$http({
        method: 'post',
        url: '/api/player/login',
        data:self.user_form,
      }).then((res) => {
        if (res.data.code === 200) {
          sessionStorage.setItem("PLAYER_USERINFO", JSON.stringify(res.data));
          self.$message({
            message: "欢迎["+ res.data.userName +"]",
            type: "success",
            showClose: true,
          });
          this.loginVisible = false;
          console.log(res.data.userName,res.data.userPrefix,res.data.color);
          self.$refs.loginMethod.setUserInfo(res.data.userName,res.data.userPrefix,res.data.color);
        } else if(res.data.code === 400) {
          self.$message({
            message: "参数非法",
            type: "error",
            showClose: true,
          });
        }else if(res.data.code === 201) {
            self.$message({
              message: "账户名或密码错误",
              type: "error",
              showClose: true,
            });
            self.getCode();
        }else if(res.data.code === 401){
            self.$message({
              message: "验证码错误",
              type: "error",
              showClose: true,
            });
            self.getCode();
        }else{
            self.$message({
              message: "未知错误",
              type: "error",
              showClose: true,
            });
        }
      }).catch((err)=>{
        console.dir(err)
        self.$message({
            message: "账户名或密码错误",
            type: "error",
            showClose: true,
          });
      })
    },
    
    resetForm(formName){
      this[formName] = {};
 
      this.$nextTick(() => {
        // this.$refs[formName].resetFields()
      });

    },
    register(){
      let self = this;
      self.$router.push({path:'/player/register'});
    },
    getCode(){
      this.codeUrl = '/api/captcha?width=120&height=40&t='+new Date().getTime();
    },
  },
};
</script>
<style>
.mainList {
  display: flex;
  flex-direction: column;
  margin-left: 5vw;
  margin-top: 30px;
}
.headerBackGround {
  background: #130b25;
}
body {
  background: #e6def4;
}
.content {
  display: flex;
  flex: row;
}
.slideBar {
  display: flex;
  flex-direction: column;
  width: 25vw;
  height: 120vh;
  margin-top: 30px;
  margin-left: 25px;
}
#cogwheel {
  animation: cogwheel-spin 20s infinite linear;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 900px;
  max-width: calc(min(50vw, 50vh));
  height: 900px;
  max-height: calc(min(50vw, 50vh));
  background: url("../static/cogwheel.png");
  background-size: 100%;
  pointer-events: none;
  opacity: 0.4;
}
#miao {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 900px;
  max-width: calc(min(50vw, 50vh));
  height: 900px;
  max-height: calc(min(50vw, 50vh));
  background: url("../static/miao.png");
  background-size: 100%;
  pointer-events: none;
}

@keyframes cogwheel-spin {
  0% {
    transform: translate(12%, 40%) rotate(0);
  }
  100% {
    transform: translate(12%, 40%) rotate(360deg);
  }
}
#background {
  animation: bg-in 1s 0s forwards ease-out;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #1f0319;
  background-image: url("../static/background.png");
  background-size: cover;
  z-index: -1;
}
.login-code{
  width: 30%;
  float: left;
  margin:0px 0 50px 6%;
}
</style>
