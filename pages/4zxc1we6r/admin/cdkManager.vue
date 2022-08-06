<template>
  <div>
    <el-page-header @back="goBack" content="CDK管理"></el-page-header>
    <el-divider></el-divider>
    <div class="toolbar">
      <div class="search">
        <el-input v-model="search.keyword" placeholder="请输入头衔名称" style="width:300px"></el-input>
        <el-select v-model="search.resourceType" placeholder="请选择" style="width:120px">
          <el-option :key="2" label="全部" :value="2"></el-option>
          <el-option :key="0" label="头衔" :value="0"></el-option>
          <el-option :key="1" label="头衔颜色" :value="1"></el-option>
        </el-select>
        <el-select v-model="search.used" placeholder="请选择" style="width:120px">
          <el-option :key="2" label="全部" :value="2"></el-option>
          <el-option :key="0" label="未兑换" :value="0"></el-option>
          <el-option :key="1" label="已兑换" :value="1"></el-option>
        </el-select>
        <el-button icon="el-icon-search" plain @click="queryData"></el-button>
      </div>
      <div class="actionbar">
        <el-button type="primary" @click="generate">生成</el-button>
        <el-button type="danger" :disabled="multipleSelection.length == 0" >删除</el-button>
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
        prop="cdk"
        label="CDK">
      </el-table-column>
      <el-table-column
        align="center"
        prop="resource"
        label="兑换物品"
        width="200"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.resource_type == 1">
            <el-tag :color="scope.row.resource" style="width: 80px">　　</el-tag>
          </template>
          <template v-else>
            {{scope.row.resource}}
          </template>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="resource_type"
        label="兑换类型"
        width="180">
        <template slot-scope="scope">
          <el-tag :type="scope.row.resource_type == 1 ? 'warning':'primary'">{{ scope.row.resource_type == 1 ?'头衔颜色':'头衔' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="starttime"
        label="兑换开始时间"
      width="200">
      </el-table-column>
      <el-table-column
        align="center"
        prop="endtime"
        label="兑换结束时间"
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        prop="used"
        width="80"
        label="使用情况">
        <template slot-scope="scope">
          <el-tag :type="scope.row.used == 1 ? 'success':'info'">{{ scope.row.used == 1 ?'已兑换':'未兑换' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                    >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" style="padding-bottom: 120px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

    <el-drawer
      title="生成CDK"
      :visible.sync="drawer">
      <div slot="title">
        <i class="el-icon-mouse"></i>&nbsp;&nbsp;生成CDK
      </div>
      <div class="demo-drawer_content">
        <el-form ref="cdkform" :model="cdkModel" :rules="rules" label-width="100px" label-suffix="：">
          <el-form-item label="生成类型" prop="resourceType">
            <el-switch
              v-model="cdkModel.resourceType"
              active-text="头衔颜色"
              active-color="#E6A23C"
              :active-value="1"
              :inactive-value="0"
              inactive-color="#409EFF"
              inactive-text="头衔"
              @change="changeResourceType"
            >
            </el-switch>
          </el-form-item>
          <el-form-item v-if="cdkModel.resourceType == 0" label="头衔" prop="resource">
            <el-input v-model="cdkModel.resource" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item v-else label="头衔颜色" prop="resource">
            <el-color-picker v-model="cdkModel.resource"></el-color-picker>
          </el-form-item>
          <el-form-item  label="开始时间" prop="starttime">
            <el-date-picker
              v-model="cdkModel.starttime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item  label="截至时间" prop="endtime">
            <el-date-picker
              v-model="cdkModel.endtime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item  label="生成个数" prop="generate_num">
            <el-input-number v-model="cdkModel.generate_num"  :min="1" :max="100" label="一次生成多少个CDK"></el-input-number>
          </el-form-item>

        </el-form>
      </div>
      <div class="demo-drawer__footer">
        <el-button type="primary" @click="generateCDK" >提 交</el-button>
        <el-button @click="closeGenerateDrawer">关 闭</el-button>
      </div>
    </el-drawer>


  </div>
</template>
<script>
export default {
  data() {
    return {
      search:{
        keyword:'',
        resourceType:2,
        used:2,
      },
      currentPage: 1,//当前页数
      pagesize:20,
      total:0,//总数
      tableData: [],
      multipleSelection:[],

      cdkModel:{
        resource:'',
        resourceType: 1,
        starttime:'',
        endtime:'',
        generate_num:1,
      },
      rules: {
        resource:[
          { required: true, message: '请选择头衔颜色或者填写头衔名称', trigger: 'blur' },
        ],
        starttime:[
          {  required: true, message: '请选择玩家可以开始兑换的日期', trigger: 'change' }
        ],
        endtime:[
          {  required: true, message: '请选择CDK兑换截至日期', trigger: 'change' }
        ]
      },

      drawer:false,
      delModal:false,


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
        url: '/api/admin/cdk/list',
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

    generate(){
      this.cdkModel={
        resource:'',
        resourceType: 1,
        starttime:'',
        endtime:'',
        generate_num:1,
      }
      if (this.$refs['cdkform'] ) {
        this.$refs['cdkform'].resetFields();
      }
      this.drawer = true;
    },

    closeGenerateDrawer(){
      this.drawer = false;
    },

    generateCDK(){
      let self = this;
      this.$refs['cdkform'].validate((valid) => {
        if (valid) {
          self.$http({
            method: 'post',
            url: '/api/admin/cdk/generate',
            data: self.cdkModel
          }).then(function(res){
            if(res.data.code == 200){
              self.$message.success('生成成功');
              self.closeGenerateDrawer();
              self.queryData();
            }else {
              self.$message.error(res.data.message);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    changeResourceType(){
      this.cdkModel.resource='';
    },

    goBack(){
      this.$router.push({path:'/4zxc1we6r/admin/home'})
    },

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
