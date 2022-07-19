<template>
  <div style="width:300px;margin: 20px auto;">
    <el-card >
      <div style="text-align:center;padding: 10px 0px" @click="toDetail">
        <i :class="className" :style="style"></i>
        <h3><a >{{content}}</a></h3>
      </div>
    </el-card>
  </div>
</template>
<script>

export default {
  name: 'ShowCard',
  props: {
    className:{
      type:String,
      default:'el-icon-document'
    },
    content:{
      type:String,
      default: '　'
    },
    url:{
      type:String,
      default:''
    },
    style:{
      type:String,
      default:'font-size:80px;color:#456101'
    }
  },
  data() {
    return {}
  },
  created: function () {

  },
  methods: {
    toDetail(){
      if(this.url.startsWith("http") || this.url.startsWith("https")){
        window.open(this.url);
      }else{
        this.$router.push({path: this.url});
      }
    }
  }
}
</script>
