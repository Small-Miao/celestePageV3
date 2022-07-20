<template>
  <div>
    <HeaderBar />
    <div class="content_mian">
      <nuxt-child/>
    </div>
    <footerBar />
  </div>
</template>
<script>
import HeaderBar from '../../components/Header'
import footerBar from '../../components/Footer'
export default {
  name: "admin",
  components: {
    HeaderBar,footerBar
  },
}
</script>
<style>
.content_mian{
  margin: 20px 20px ;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
