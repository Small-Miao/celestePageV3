<template>
  <div style="position: absolute;width:98%;height:auto; ">
    <el-row :gutter="12">
      <el-col :span="6">
        <ShowCard content="人员管理" class-name="el-icon-user" url="/4zxc1we6r/admin/userManager" :style="{fontSize:'18px',color:'#000000'}"></ShowCard>
      </el-col>
      <el-col :span="6">
        <ShowCard content="CDK管理" class-name="el-icon-mouse" url="/4zxc1we6r/admin/cdkManager" :style="{fontSize:'18px',color:'#000000'}"></ShowCard>
      </el-col>
<!--      <el-col :span="6">-->
<!--        <ShowCard content="测试" url="/adminLogin"></ShowCard>-->
<!--      </el-col>-->
<!--      <el-col :span="6">-->
<!--        <ShowCard content="测试" url="/adminLogin"></ShowCard>-->
<!--      </el-col>-->
    </el-row>
  </div>
</template>
<script>
import ShowCard from '../../../components/MenuBtn.vue'
export default {
  components: {
    ShowCard,
  },
  data(){
    return {
      menus:[
        {
          content:'',
          className:'',
          url:''
        }
      ]
    }
  },
  created() {
  },
  methods: {
    toRoute(){
      alert(1);
    }
  }
}
</script>

<style scoped>
</style>
