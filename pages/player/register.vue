<template>
    <div>
        <div id="background">
          <div id="cogwheel"></div>
          <div id="miao"></div>
        </div>
      <CelesteHeader />
      <div class="logindata">
        <div class="logintext" v-show = "isRegester">
          <h2>用户注册</h2>
        </div>
        <div class="formdata" v-show = "isRegester" >
          <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-suffix="：">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="form.username"
                clearable
                placeholder="请输入用户名"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                clearable
                placeholder="请输入密码"
                show-password
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="comfirm_password">
              <el-input
                v-model="form.comfirm_password"
                clearable
                placeholder="请输入确认密码"
                show-password
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                clearable
                placeholder="请输入邮箱"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input
              v-model="form.code"
              :maxlength="4"
              auto-complete="off"
              placeholder="请输入验证码"
              style="width: 40%;float: left;"
            >
            </el-input>
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" class="login-code-img" />
            </div>
            </el-form-item>
            <el-form-item label="邮箱验证码" prop="email_code" style="margin-top: 10px;">
              <el-input style="width: 40%;float: left;margin-right: 20px;"
                v-model="form.email_code"
                clearable
                :maxlength="6"
                placeholder="请输入邮箱验证码"
              ></el-input>
              <el-button type="primary" ref = "emailcodebutton"
              @click="getEmailCode" 
              style="border: none;"
              :disabled = "isSend"
              :style="{backgroundColor:isSend?'gray':'cornflowerblue'}"
          >{{codeName}}</el-button>
            </el-form-item> 
          </el-form>
        </div>
        
        <div class="tool">
        </div>
        <div class="butt" v-show = "isRegester">
          <el-button type="primary" @click="register" style="margin-right: 40px;"
          >注册</el-button
          >
          <el-button type="warning" @click="back"
          >返回</el-button
          >
        </div>

        <el-card v-show = "!isRegester" class="re-card">
          <div class = "text">
            <span class="re-span"> 您已注册成功！2秒后自动跳转到登录页面！ </span>
          </div>
        </el-card>
      </div>
      <!-- <footerBar /> -->
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
      //  用户名自定义校验
      let self = this;
      const usernameValidate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空！'));
        }else{
          this.$http({
            method: 'post',
            url: '/api/player/checkUsername',
            data: {
              username: this.form.username,
            }
          }).then(res => {
            if(res.data.data.exits) {
              callback(new Error('用户名已存在!'));
            } else {
              callback();
            }
          });
        }
      };

      //  确认密码校验规则
      const passwordValidate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空！'));
        }else if(value.length < 5 || value.length > 16){
          callback(new Error('请输入5-16位的密码'));
          return;
        }
        this.$refs['form'].validateField('comfirm_password');
        callback();
      };

      //  确认密码校验规则
      const comfirm_passwordValidate = (rule, value, callback) => {
        if (self.form.password && !value) {
          callback(new Error('确认密码不能为空'));
        }else if(self.form.password !== value) {
          callback(new Error('两次输入的密码不一致'));
        }else{
          callback();
        }
      };

      return {
        isSend: false,
        codeName: "发送邮箱验证码",
        totalTime: 60,
        timer: '',

        isRegester: true,
        codeUrl:'',
        form: {
          username: "",
          password: "",
          comfirm_password: "",
          email:"",
          code:"",
          email_code:"",
        },
        // checked: false,
        rules: {
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            { max: 16, message: "不能大于16个字符", trigger: "blur" },
            { required: true, validator: usernameValidate, trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min:5,max: 16, message: "请输入5-16位的密码", trigger: "blur" },
            { required: true, validator: passwordValidate, trigger: "blur" }
          ],
          comfirm_password: [
            { required: true, message: "请输入确认密码", trigger: "blur" },
            { min:5,max: 16, message: "请输入5-16位的密码", trigger: "blur" },
            { required: true, validator: comfirm_passwordValidate, trigger: "blur" }
          ],
          code:[
            { required: true, message: "请输入验证码", trigger: "blur" },
            { min:4,max: 4, message: "请输入4位验证码", trigger: "blur" },
          ],
          email:[
            { required: true, message: "请输入邮箱", trigger: "blur" },
            // { type: 'string', patter: /^\w{1,18}@[a-z0-9]+(\.[a-z]{2,4})+$/i, message: "请输入正确的邮箱", trigger: "blur" },
            { type: 'email', message: "请输入正确的邮箱", trigger: ["blur","change"] },
            // { min:6,max: 6, message: "请输入6位邮箱验证码", trigger: "blur" },
          ],
          email_code:[
            { required: true, message: "请输入邮箱验证码", trigger: "blur" },
            { min:6,max: 6, message: "请输入6位邮箱验证码", trigger: "blur" },
          ],
        },
      };
    },
    mounted() {
      this.getCode();
    },
    methods: {
        // 返回按钮的回调函数
        back() {
            this.$router.push({path:'/'});
        },
        // 获取邮箱验证码
        getEmailCode() {
          if(!this.form.code) {
            this.$message({
                  message: "请输入图片验证码！",
                  type: "error",
                  showClose: true,
                });
                return;
          }
          if(!this.form.email) {
            this.$message({
                  message: "请先输入邮箱！",
                  type: "error",
                  showClose: true,
                });
                return;
          }
          if(this.isSend) {
            return;
          }
          this.isSend = true;
          this.codeName = this.totalTime + 's后重新发送';
          let self = this;

          this.$http({
                method: 'post',
                url: '/api/player/sendCode',
                data:{
                'email':self.form.email,
                'code':self.form.code,
                },
            }).then((res) => {
              console.log(res.data.code);
              if(res.data.code === 401) {
                self.$message({
                  message: "邮箱已注册",
                  type: "error",
                  showClose: true,
                });
                self.getCode();
              }else if(res.data.code === 402) {
                self.$message({
                  message: "发送失败，明天再试试吧~",
                  type: "error",
                  showClose: true,
                });
                self.getCode();
              }else if(res.data.code === 400) {
                self.$message({
                  message: "此邮箱无效",
                  type: "error",
                  showClose: true,
                });
                self.getCode();
              }else if(res.data.code === 403) {
                self.$message({
                  message: "出错了",
                  type: "error",
                  showClose: true,
                });
                self.getCode();
              }else if(res.data.code === 200) {
                self.$message({
                  message: "发送成功",
                  type: "success",
                  showClose: true,
                });
                self.getCode();
                self.states = -1;
              }else if(res.data.code === 406) {
                self.$message({
                  message: "发送失败，请检查网络",
                  type: "error",
                  showClose: true,
                });
                self.getCode();
              }else if(res.data.code === 407) {
                self.$message({
                  message: "验证码错误",
                  type: "error",
                  showClose: true,
                });
                self.getCode();
              }else if(res.data.code === 408) {
                self.$message({
                  message: "验证码已发送",
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
            }).catch(err => {
              console.dir(err)
              this.$message({
                message: "出错了",
                type: "error",
                showClose: true,
              });
            });
          this.timer = setInterval(() => {            
            this.totalTime--;
            this.codeName = this.totalTime + 's后重新发送';
            if(this.totalTime < 0) {
              clearInterval(this.timer);
              this.codeName = '重新发送验证码';
              this.totalTime = 60;
              this.isSend = false;
            }
          }, 1000);
        },
        register() {
            let self = this;
            this.$refs['form'].validate((valid) => {
            if (valid) {
                self.playerRegister();
            } else {
                self.$message.error('请按照要求填写');
                return false;
            }
            });
        },
      playerRegister(){
        let self = this;
        this.$http({
          method: 'post',
          url: '/api/player/register',
          data: self.form,
        }).then((res) => {
            if (res.data.code == 200) {
              localStorage.setItem("USERINFO", JSON.stringify(res.data));
              self.$message({
                message: res.data.username+",您已注册成功！",
                type: "success",
                showClose: true,
              });
              self.isRegester = false;
              self.$refs.form.resetFields();
              setTimeout("location.href='/'",2000);
              // self.$router.push({path:'/'});
            } else if(res.data.code === 400){
              console.log(res.data);
              self.$message({
                message: "参数非法",
                type: "error",
                showClose: true,
              });
            }else if(res.data.code == 401){
              self.$message({
                message: "该邮箱已注册",
                type: "error",
                showClose: true,
              });
              self.getCode();
            }else if(res.data.code == 403){
              self.$message({
                message: "用户名已存在",
                type: "error",
                showClose: true,
              });
              self.getCode();
            }else if(res.data.code == 402){
              self.$message({
                message: "邮箱验证码错误",
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
              message: "出错了",
              type: "error",
              showClose: true,
            });
          });
      },
      // 用户注册
      // register() {
      //   let self = this;
      //   this.$http({
      //       method: 'post',
      //       url:'/api/player/checkUsername',
      //       data:{
      //       'username':self.user_form.username
      //       },
      //   }).then(res => {
      //       console.log(res.data.code);
      //       if(res.data.code === 400) {
      //       self.$message({
      //           message: "参数非法",
      //           type: "error",
      //       });
      //       }else if(res.data.data.exist) {
      //       alert('用户名已存在');
      //       }
      //   }).catch(err => {
      //       console.dir(err)
      //       self.$message({
      //           message: "注册失败",
      //           type: "error",
      //           showClose: true,
      //       });
      //   });
      // },
      getCode(){
        this.codeUrl = '/api/captcha?width=120&height=40&t='+new Date().getTime();
      },
    },
  };
  </script>
  
  <style scoped>
    #background {
      animation: bg-in 1s 0s forwards ease-out;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: #1f0319;
      background-image: url("../../static/background.png");
      background-size: cover;
      z-index: -1;
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
      background: url("../../static/cogwheel.png");
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
      background: url("../../static/miao.png");
      background-size: 100%;
      pointer-events: none;
    }
  
    .box-card {
      /* background-color: aliceblue; */
      width: 680px;
      height:200px;
    }
    .re-card .el-card__body {
      padding-left: 50%;
      width:400px;
      height: 300px;
      background-color: #606266;
    }
    .re-span {
      text-align:center;
      vertical-align: middle;
      line-height: 150px;
      /* margin-top: 50%; */
    }
    .text {
      font-size: large;
      height: 150px;
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
    height: 500px;
    transform: translate(-50%);
    margin-top: 1%;
    margin-left: 50%;
    /* overflow: auto; */
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
    margin:0px 0 2% 6%;
  }
  </style>
  