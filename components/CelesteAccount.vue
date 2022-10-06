<template>
  <el-card
    class="box-card"
    shadow="always"
    style="border-radius: 12px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
  >
    <div slot="header">
      <span v-show="!isLogin" style="font-size: 20px; font-weight: bold">账号</span>
      <span v-show="isLogin">您好，<span :style="userStyle">【{{userData.preFixList}}】</span>{{userData.name}} ！ </span>
      <span v-show="isLogin" style="float : right"><el-button  @click="logout" type="text">[退出]</el-button></span>
    </div>
    <div v-show="!isLogin">
      <span style="font-size: 14px">
        创建一个CelesteNet账号,来进入服务器与大家一起联机游玩.
        并获得设置自己的[头像],[头衔]等功能的权限.</span
      >
      <el-button style="margin-top: 10px" @click="showLoginDialog"
        >创建/登录 你的CelesteNet账号</el-button
      >
    </div>
    <div v-show="isLogin">
      <el-button>查看我的个人资料~</el-button>
    </div>
  </el-card>
</template>
<script>
import { nullLiteral } from '@babel/types';

export default {
  props: {
    showLoginDialog: Function,
  },
  data() {
    return {
      isLogin: false,
      userData: {
        name: '',
        preFixList: '',
      },
      userStyle:{
        color:'#FFFFFF',
        fontWeight:'bold'
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      let info = sessionStorage.getItem("PLAYER_USERINFO");
      //这里有一个坑，如果没有获取到用户信息，返回一个null字符串
      let userinfo  = undefined;
      try{
        userinfo = eval ("(" + info + ")")
      }catch (e){

      }
      if(userinfo){
        this.isLogin = true;
        this.setUserInfo(userinfo.userName,userinfo.userPrefix,userinfo.color)
      }else{
        this.isLogin = false;
      }
      
    },
    // , , nowPrefix, image
    setUserInfo(userName, preFixList, color) {
      this.userData.name = userName;
      this.userData.preFixList = preFixList;
      // this.userData.nowPrefix = nowPrefix;
      this.userStyle.color = color;
      this.isLogin = true;
    },
    logout(){
        // this.isLogin = false;
        // sessionStorage.setItem("PLAYER_USERINFO", undefined);

        let self = this;
        this.$http({
          method: 'post',
          url: '/api/player/logout',
        }).then((res) => {
          // console.log(res.data.code);
          if(res.data.code === 200) {
            this.isLogin = false;
            sessionStorage.setItem("PLAYER_USERINFO", null);
            self.$message({
              message: "退出成功",
              type: "success",
              showClose: true,
            });
            self.$router.push('/');
          }else{
            self.$message({
              message: "未知错误",
              type: "error",
              showClose: true,
            });
          }
        });
        }
  },
};
</script>
<style>
.box-card {
  background: #0f0e1a;
  color: white;
}
.box-card .el-card__header {
  border-bottom: 0px;
  padding-bottom: 5px;
}
.box-card .el-card__body {
  padding-top: 5px;
}
</style>
