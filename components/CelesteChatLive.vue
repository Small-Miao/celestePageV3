<template>
  <el-card class="chat">
    <div slot="header">
      <span style="font-size: 20px; font-weight: bold">服务器Live Chat</span>
    </div>
    <el-table :data="chatData" :show-header="status" stripe style="width: 100%">
      <el-table-column prop="id">
            <template slot-scope="scope">
                {{scope.row.time}} {{scope.row.id}}:{{scope.row.chat}}
            </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      status:false,
      chatData: [
        {
          id: "[Admin]Small_Miao",
          time: "2022/04/11 17:10",
          chat: "Hello World！",
        },
      ],
    };
  },
};
</script>
<style>
.chat {
  width: 65vw;
  height: 45vh;
}
.chat .el-card__body{
    padding: 5px;
}
</style>