<template>
  <div>
    <div id="background">
      <div id="cogwheel"></div>
      <div id="miao"></div>
    </div>
    <CelesteHeader />
    <div class="content">
      <div class="slideBar">
        <CelesteAccount />
        <CelesteServerStatus style="margin-top: 6%" />
        <CelesteDevInfo style="margin-top: 6%" />
      </div>
      <div class="mainList">
        <CelesteInfo />
        <CelesteServerEvent style="margin-top: 4%" />
        <CelesteChatLive style="margin-top: 4%" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
<style>
.mainList {
  display: flex;
  flex-direction: column;
  margin-left: 5vw;
  margin-top: 30px;
}
.headerBackGround {
  background: #130b25;
}
body {
  background: #e6def4;
}
.content {
  display: flex;
  flex: row;
}
.slideBar {
  display: flex;
  flex-direction: column;
  width: 25vw;
  height: 120vh;
  margin-top: 30px;
  margin-left: 25px;
}
#cogwheel {
  animation: cogwheel-spin 20s infinite linear;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 900px;
  max-width: calc(min(50vw, 50vh));
  height: 900px;
  max-height: calc(min(50vw, 50vh));
  background: url("../static/cogwheel.png");
  background-size: 100%;
  pointer-events: none;
  opacity: 0.4;
}
#miao {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 900px;
  max-width: calc(min(50vw, 50vh));
  height: 900px;
  max-height: calc(min(50vw, 50vh));
  background: url("../static/miao.png");
  background-size: 100%;
  pointer-events: none;
}

@keyframes cogwheel-spin {
  0% {
    transform: translate(12%, 40%) rotate(0);
  }
  100% {
    transform: translate(12%, 40%) rotate(360deg);
  }
}
#background {
  animation: bg-in 1s 0s forwards ease-out;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #1f0319;
  background-image: url("../static/background.png");
  background-size: cover;
  z-index: -1;
}
</style>
