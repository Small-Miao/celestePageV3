<template>
  <el-card
    class="box-card"
    shadow="always"
    style="border-radius: 12px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
  >
    <div slot="header">
      <span style="font-size: 20px; font-weight: bold">账号</span>
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

    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    showLoginDialog: Function,
  },
  data(){
    return{
      isLogin:false,
      userData:{}
    }
  },
  methods:{
    setUserInfo(userName,preFixList,nowPrefix,image){
        this.userData.name = userName;
        this.userData.preFixList = preFixList;
        this.userData.nowPrefix = nowPrefix;
        this.userData.image = image;
        this.isLogin = true;
    }
  }
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
