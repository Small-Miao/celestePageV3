<template>
  <div>
    <div class="footer">
      <div> celesteNet &copy;  {{year}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year:'',
    }
  },
  created() {
    this.getYear();
  },
  methods: {
    getYear(){
      let date = new Date();
      this.year = date.getFullYear();
    },
  },
}
</script>
<style scoped>
.footer{
  bottom: 0px;
  position: fixed;
  width: 100%;
  background-color: #130b25;
  color: #ffffff;
  text-align: center;
  line-height: 60px;
}
</style>
