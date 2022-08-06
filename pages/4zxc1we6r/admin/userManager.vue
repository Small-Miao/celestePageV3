<template>
  <div>
    <el-page-header @back="goBack" content="用户管理"></el-page-header>
    <el-divider></el-divider>
    <div class="toolbar">
      <div class="search">
        关键字：<el-input v-model="search.keyword" placeholder="请输入内容" style="width:300px"></el-input>
        <el-button icon="el-icon-search" plain @click="queryData"></el-button>
      </div>
      <div class="actionbar">
        <el-button type="primary" @click="addBtn">添加</el-button>
        <el-button type="danger" :disabled="multipleSelection.length == 0" @click="delBatchBtn">删除</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;padding: 10px;"
      @selection-change="handleSelectionChange">
      <el-table-column
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        prop="gm_uid"
        label="UID"
        width="80">
      </el-table-column>
      <el-table-column
        align="center"
        prop="gm_username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="gm_prefix"
        label="头衔"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="bot_gold"
        label="金币">
      </el-table-column>
      <el-table-column
        align="center"
        prop="bot_last_sign"
        label="最后一次登录时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="gm_isban"
        width="80"
        label="是否封禁">
        <template slot-scope="scope">
          <el-tag :type="scope.row.gm_isban == 1 ? 'danger':'success'">{{ scope.row.gm_isban == 1 ?'封禁':'正常' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="editBtn(scope.row.gm_uid)"
          >编辑</el-button>
          <el-button
            size="mini"
            @click="resetPassword(scope.row.gm_uid)"
          >重置密码</el-button>
<!--          这个功能做的意义并不大，删除的功能在这个环境中应该用的非常非常少-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="danger"-->
<!--          >删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

    <el-drawer
      :visible.sync="adddra"
      class="demo-drawer"
      :show-close="false"
      :wrapperClosable="false"
      :size="480"
    >
      <div slot="title">
        <i class="el-icon-s-custom"></i>&nbsp;&nbsp;{{title}}
      </div>
      <div class="demo-drawer_content">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix="：">
          <el-form-item label="用户名" prop="gm_username">
            <el-input v-model="form.gm_username" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="gm_password">
            <el-input v-model="form.gm_password" :show-password="true" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="头衔" prop="gm_prefix">
            <el-input v-model="form.gm_prefix" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="form.gm_isban"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="封禁"
              inactive-text="正常"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="金币">
            <el-input-number v-model="form.bot_gold" size="mini" :min="0" :max="99999" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="标志色彩">
            <el-color-picker v-model="form.gm_color"></el-color-picker>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button type="primary" @click="onSubmit" >提 交</el-button>
          <el-button @click="onCancel">关 闭</el-button>
        </div>
      </div>
    </el-drawer>

    <el-drawer
      :visible.sync="editdra"
      class="demo-drawer"
      :show-close="false"
      :wrapperClosable="false"
      :size="480"
    >
      <div slot="title">
        <i class="el-icon-s-custom"></i>&nbsp;&nbsp;{{title}}
      </div>
      <div class="demo-drawer_content">
        <el-form ref="editform" :model="editModel" label-width="100px" label-suffix="：">
          <el-form-item label="用户名" prop="gm_username">
            {{editModel.gm_username}}
          </el-form-item>
          <el-form-item label="头衔" prop="gm_prefix">
            <el-input v-model="editModel.gm_prefix" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="editModel.gm_isban"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="封禁"
              inactive-text="正常"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="金币">
            <el-input-number v-model="editModel.bot_gold" size="mini" :min="0" :max="99999" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="标志色彩">
            <el-color-picker v-model="editModel.gm_color"></el-color-picker>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button type="primary" @click="editSubmit" >提 交</el-button>
          <el-button @click="editCancel">关 闭</el-button>
        </div>
      </div>
    </el-drawer>

    <el-dialog title="重置密码" :visible.sync="resetPasswordModal" width="20%">
      <el-form :model="resetPasswordForm" ref="resetPasswordForm":rules="resetRules">
        <el-form-item label="新密码" :label-width="100"  prop="newPassword">
          <el-input v-model="resetPasswordForm.newPassword" :show-password="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="100" prop="newPassword1">
          <el-input v-model="resetPasswordForm.newPassword1" :show-password="true" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetPasswordModal = false">取 消</el-button>
        <el-button type="primary" @click="resetPasswordSureBtn">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    //用户名自定义校验
    let self = this;
    const validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名！'));
      } else {
        this.$http({
          method: 'post',
          url: '/api/user/checkUserName',
          data: {
            gm_username: this.form.gm_username,
            gm_uid: this.form.gm_uid,
          }
        }).then(function (response) {
          if (response.data.code == 200) {
            if (response.data.data.count > 0) {
              callback(new Error('用户名已存在'));
            } else {
              callback();
            }
          } else {
            callback();
          }
        });
      }
    };
    const pwdValidate = (rule, value, callback) => {
      if(!value){
        callback(new Error('请输入新密码'));
        return;
      }else if(value.length < 5 || value.length > 16){
        callback(new Error('请输入5-16个字符'));
        return;
      }
      this.$refs['resetPasswordForm'].validateField('password1');
      callback();
    };
    const pwdCheckValidate = (rule, value, callback) => {
      if (self.resetPasswordForm.newPassword != '' && value == '') {
        callback(new Error('确认密码不能为空'));
      } else if (self.resetPasswordForm.newPassword != value) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
    return {
      search:{
        keyword:'',
      },
      currentPage: 1,//当前页数
      pagesize:20,
      total:0,//总数
      tableData: [
        {
          gm_isban:0
        }
      ],
      multipleSelection:[],

      prefixs:[],

      adddra:false,
      title:'',
      form: {
        gm_username: '',
        gm_password: '',
        bot_gold: 0,
        gm_color: '',
        gm_isban: 0,
      },
      rules: {
        gm_username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {  max: 10, message: '请输入10个以内的字符', trigger: 'blur' },
          {required: true, validator: validateUserName, trigger: 'blur'}

        ],
        gm_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {  min: 5,max:16, message: '请输入5-16个字符', trigger: 'blur' }
        ],
      },
      editdra:false,
      editModel:{
        gm_username:'',
        gm_uid: 0,
        gm_color:'',
        gm_isban:0,
        gm_prefix: ''
      },

      delModal:false,


      resetPassModelUid:0,
      resetPasswordModal:false,
      resetPasswordForm:{
        newPassword:'',
        newPassword1:'',
      },
      resetRules:{
        newPassword: [
          {required: true, validator: pwdValidate, trigger: 'blur'}
        ],
        newPassword1: [
          {required: true, validator: pwdCheckValidate, trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData(){
      let self = this;
      this.$http({
        method: 'post',
        url: '/api/admin/user/list',
        data: {
          'search': self.search,
          'page': self.currentPage,
          'pagesize': self.pagesize,
        }
      }).then((res)=>{
          if(res.data.code == 200){
            self.tableData = res.data.data.data;
            self.total = res.data.data.count;
            self.multipleSelection= [];
          }else{
            self.$message.error(res.data.message);
          }
      }).catch((err)=>{
        console.log(err);
      })
    },
    queryData(){
      this.currentPage =1;
      this.getData();
    },
    handleCurrentChange(page){
      this.currentPage = page;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.forEach((row,index) => {
        this.multipleSelection.push(row.gm_uid);
      })
    },


    addBtn(){
      this.title= '添加用户';
      this.prefixs = [];//新添加的用户应该是没有头衔的
      this.form={
        gm_username: '',
        gm_password: '',
        bot_gold: 0,
        gm_prefix:'',
        gm_color: '',
        gm_isban: 0,
      }
      this.adddra  = true;
    },
    onSubmit() {
      let self = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          self.addUser();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onCancel(){
      this.adddra = false;
    },
    addUser(){
      let self = this;
      this.$http({
        method: 'post',
        url: '/api/admin/user/add',
        data: self.form,
      }).then((res)=>{
        if(res.data.code == 200){
          self.$message.success("操作成功");
          self.onCancel();
          self.currentPage = 1;
          self.getData();
        }else{
          self.$message.error(res.data.message);
        }
      }).catch((err)=>{
        console.log(err);
      })
    },


    editBtn(gm_uid){
      let self = this;
      this.$http({
        method: 'post',
        url: '/api/admin/user/getUser',
        data: {
          'gm_uid': gm_uid,
        }
      }).then((res)=>{
        if(res.data.code == 200){
          self.editModel = res.data.data.data[0];
          self.title = '修改用户';
          self.editdra = true;
        }else{
          self.$message.error(res.data.message);
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    editSubmit(){
      let self = this;
      this.$refs['editform'].validate((valid) => {
        if (valid) {
          self.editUser();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editCancel(){
      this.editdra = false;
    },
    editUser(){
      let self = this;
      this.$http({
        method: 'post',
        url: '/api/admin/user/edit',
        data: self.editModel,
      }).then((res)=>{
        if(res.data.code == 200){
          self.$message.success("操作成功");
          self.editCancel();
          self.currentPage = 1;
          self.getData();
        }else{
          self.$message.error(res.data.message);
        }
      }).catch((err)=>{
        console.log(err);
      })
    },

    resetPassword(gmUid){
      this.resetPassModelUid = gmUid;
      this.resetPasswordForm={
        newPassword:'',
        newPassword1:'',
      };
      this.resetPasswordModal = true;
    },
    resetPasswordSureBtn(){
      let self = this;
      this.$refs['resetPasswordForm'].validate((valid) => {
        if (valid) {
          self.setNewPassword();
        } else {
          self.$message.error("请按照要求填写")
          return false;
        }
      });
    },
    setNewPassword(){
      let self = this;
      this.$http({
        method: 'post',
        url: '/api/admin/user/resetPassword',
        data: {
          gm_uid:self.resetPassModelUid,
          newpassword:self.resetPasswordForm.newPassword,
          newpassword1:self.resetPasswordForm.newPassword1,
        },
      }).then((res)=>{
        if(res.data.code == 200){
          self.$message.success("操作成功");
          self.resetPasswordModal = false;
          self.resetPassModelUid = 0;
        }else{
          self.$message.error(res.data.message);
        }
      }).catch((err)=>{
        console.log(err);
      })
    },

    delBatchBtn(){
      if(this.multipleSelection.length == 0){
        this.$message.error('未选中数据');
        return;
      }
      let self = this;
      this.$confirm('此操作将不可恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.delUser();
      }).catch(() => {
      });
    },
    delUser(){
      let self = this;
      this.$http({
        method: 'post',
        url: '/api/admin/user/del',
        data: {
          gm_uids:self.multipleSelection
        },
      }).then((res)=>{
        if(res.data.code == 200){
          self.$message.success("操作成功");
          self.currentPage = 1;
          self.getData();
        }else{
          self.$message.error(res.data.message);
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    goBack(){
      this.$router.push({path:'/4zxc1we6r/admin/home'})
    }

  },
}
</script>

<style scoped>
.el-table .success-row {
  background: #f0f9eb;
}
.el-page-header{
  padding: 24px 24px 0px 24px;
  width:100%;
  height: auto;
}
.toolbar{
  margin-bottom: 60px;
  width:100%;
  height: auto;
  padding: 10px 10px;
}
.search{
  float: left;
  width:50%;
  padding: 0px 10px;
}
.actionbar{
  float: right;
  width:48%;
  text-align: right;
  padding: 0px 10px;
}
.pagination{
  text-align: right;
  height: 40px;
  margin-top: 15px;
}
.demo-drawer_content{
  margin-bottom: 50px;
  padding: 0px 20px;
}

.demo-drawer__footer{
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: left;
  background-color: white;
}
</style>
