<template>
  <div>
    <div class="header_content">
      <div class="header_logo"/>
      <div class="header_login">{{ loginName }} 丨 <span @click="logout" style="cursor:pointer;">退出</span></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginName:''
    }
  },
  created() {
    this.loginName = localStorage.getItem("USERNAME");
  },
  methods:{
    logout(){
      let self = this;
      this.$http({
        method:'post',
        url:'/api/admin/logout',
      }).then((res)=>{
        if (res.data.code == 200) {
          localStorage.setItem("USERNAME", '');
          localStorage.setItem("token", '');
          self.$message({
            message: "退出成功",
            type: "success",
            showClose: true,
          });
          self.$router.push({path:'/adminLogin'});
        } else{
          self.$message({
            message: "未知异常",
            type: "error",
            showClose: true,
          });
        }
      })
    }
  }
}
</script>
<style scoped>
.header_content {
  background: #130b25;
  height: 10vh;
}
.header_logo {
  background-image: url("../static/header.png");
  position: absolute;
  top: calc(15% - 96px);
  left: 10%;
  width: 95%;
  max-width: calc(2197px / 4);
  max-height: calc(200px / 4);
  transform: translate(-50%, -50%);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: drop-shadow(0 0 16px rgba(15, 0, 34, 0.8));
}
.header_login{
  position: absolute;
  top: calc(15% - 96px);
  float: right;
  right: 2%;
  width: 5%;
  max-width: calc(2197px / 4);
  max-height: calc(200px / 4);
  transform: translate(-50%, -50%);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: drop-shadow(0 0 16px rgba(15, 0, 34, 0.8));
  color: #eeeeee;
}
</style>
