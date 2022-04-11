<template>
  <el-card class="event">
    <div slot="header">
      <span style="font-size: 20px; font-weight: bold">群服活动</span>
    </div>
    <el-skeleton :rows="6" animated />
  </el-card>
</template>
<style>
.event {
  width: 65vw;
  height: 30vh;
}
.event .el-card__body {
  padding: 10px;
}
</style>