<template>
  <div class="loginbody">
    <div class="logindata">
      <div class="logintext">
        <h2>Admin Login</h2>
      </div>
      <div class="formdata">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              clearable
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              clearable
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
          <el-input
            v-model="form.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%;float: left;margin-bottom: 50px;"
          >
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool">
      </div>
      <div class="butt">
        <el-button type="primary" @click="login"
        >登录</el-button
        >
      </div>
    </div>
    <footerBar />
  </div>
</template>

<script>
import footerBar from '../../components/Footer'
export default {
  name: "login",
  components: {
    footerBar
  },
  data() {
    return {
      codeUrl:'',
      form: {
        password: "",
        username: "",
        code:"",
      },
      checked: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 16, message: "不能大于16个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min:5,max: 16, message: "情输入5-16位的密码", trigger: "blur" },
        ],
        code:[
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min:4,max: 4, message: "情输入4位验证码", trigger: "blur" },
        ]
      },
    };
  },
  mounted() {
    // if(localStorage.getItem("news")){
    //   this.form=JSON.parse(localStorage.getItem("news"))
    //   this.checked=true
    // }
    this.getCode();
  },
  methods: {
    login() {
      let self = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          self.adminLogin();
        } else {
          return false;
        }
      });
    },
    adminLogin(){
      let self = this;
      this.$http({
        method: 'post',
        url: '/api/admin/login',
        data: self.form,
      }).then((res) => {
          if (res.data.code == 200) {
            localStorage.setItem("USERINFO", JSON.stringify(res.data));
            self.$message({
              message: res.data.username+",欢迎！！",
              type: "success",
              showClose: true,
            });
            self.$router.push({path:'/4zxc1we6r/admin/home'});
          } else if(res.data.code === 400){
            self.$message({
              message: "参数非法",
              type: "error",
              showClose: true,
            });
          }else if(res.data.code == 401){
            self.$message({
              message: "验证码输入有误，请重新输入",
              type: "error",
              showClose: true,
            });
            self.getCode();
          }else if(res.data.code == 201){
            self.$message({
              message: "账户名或密码错误",
              type: "error",
              showClose: true,
            });
            self.getCode();
          }else {
            self.$message({
              message: "未知错误",
              type: "error",
              showClose: true,
            });
          }
        }).catch((err) => {
          console.dir(err)
          this.$message({
            message: "账户名或密码错误",
            type: "error",
            showClose: true,
          });
        });
    },
    remenber(data){
      this.checked=data
      if(this.checked){
        localStorage.setItem("news",JSON.stringify(this.form))
      }else{
        localStorage.removeItem("news")
      }
    },
    forgetpas() {
      this.$message({
        type:"info",
        message:"功能尚未开发额😥",
        showClose:true
      })
    },
    register() {},
    getCode(){
      this.codeUrl = '/api/captcha?width=120&height=40&t='+new Date().getTime();
    },
  },
};
</script>

<style scoped>
.loginbody {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-image: url("../../static/background.jpg");
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 250px;
}

.logintext {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

.logindata {
  width: 400px;
  height: 300px;
  transform: translate(-50%);
  margin-left: 50%;
}

.tool {
  display: flex;
  justify-content: space-between;
  color: #606266;
}

.butt {
  margin-top: 10px;
  text-align: center;
}

.shou {
  cursor: pointer;
  color: #606266;
}

/*ui*/
/* /deep/ .el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */
.login-code{
  width: 30%;
  float: left;
  margin:0px 0 50px 6%;
}
</style>
