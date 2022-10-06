<template>
  <el-card class="event">
    <div slot="header">
      <span style="font-size: 20px; font-weight: bold">群服更新日志</span>
    </div>
    <div style="padding:15px;">
      <!-- <a-timeline pending="Dev..." :reverse="reverse"> -->
        <a-timeline pending="Dev..."></a-timeline>
        <a-timeline-item>v 0.1.0 初步版本</a-timeline-item>
      </a-timeline>
    </div>
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
