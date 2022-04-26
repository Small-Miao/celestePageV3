<template>
  <el-card
    class="box-card"
    shadow="always"
    style="border-radius: 12px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
  >
    <div slot="header">
      <span style="font-size: 20px; font-weight: bold">服务器状态</span>
    </div>
    <div style="display: flex; flex-direction: column">
      <span>当前在线: 0</span>
      <span>总注册: 0</span>
      <span>总排名数据: 0</span>
      <span>封禁人数: 0</span>
    </div>
  </el-card>
</template>
<script>
export default {
    
}
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