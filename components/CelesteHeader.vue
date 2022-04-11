<template>
  <div class="header_content">
    <div class="header_logo" />
    <div class="header_info">为蔚蓝所制作的联机MOD</div>
    <ul id="toplist">
      <li>
        <a
          id="toplink-manual"
          class="button"
          href="https://gamebanana.com/gamefiles/12267"
          ><i class="fa fa-download fa-3x toplink-icon"></i
          ><span class="toplink-text">下载 CelesteMiaoNet</span></a
        >
      </li>
      <li>
        <a
          id="toplink-manual"
          class="button"
          href="https://gamebanana.com/gamefiles/12267"
          ><i class="fa fa-commenting fa-3x toplink-icon" style="margin-top:10px;margin-right:30px;"></i
          ><span class="toplink-text">加入Celeste交流群</span></a
        >
      </li>
    </ul>
  </div>
</template>
<style>
.header_content {
  background: #130b25;
  height: 45vh;
}
.header_logo {
  background-image: url("../static/header.png");
  position: absolute;
  top: calc(26% - 96px);
  left: 50%;
  width: 50%;
  height: 50%;
  max-width: calc(2197px / 4);
  max-height: calc(428px / 4);
  transform: translate(-50%, -50%);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: drop-shadow(0 0 16px rgba(15, 0, 34, 0.8));
}
.header_info {
  position: relative;
  top: calc(60%);
  color: white;
  text-align: center;
  font-size: 22px;
}
#toplist {
  position: relative;
  display: flex;
  top: calc(50% + 64px);
  padding: 0;
  margin: 0 auto;
  list-style-type: none;
  width: fit-content;
  z-index: 2;
  flex-direction: row;
  flex-wrap: wrap;
}
#toplist > li {
  display: block;
  width: 280px;
  height: 64px;
  margin: 8px;
}

#toplist > * > a.button {
  padding: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
}
@media only screen and (max-width: calc(280px * 2 + 64px)) {
  #toplist {
    width: 296px;
  }
}
a.button,
a.button:visited {
  transition: background-color 0.2s, box-shadow 0.2s;
  color: rgba(255, 255, 255, 0.9);
  text-decoration-color: transparent;
  box-shadow: 0px 1px 7px rgba(31, 5, 43, 0.3),
    -0.5px -1px 6px rgba(209, 185, 255, 0.1),
    -1px -2px 5px rgba(217, 186, 231, 0.02);
  background: #4f1f5c;
  border-radius: 3px;
  padding: 8px;
  display: inline-block;
  cursor: pointer;
  z-index: 1;
  text-shadow: none;
  margin-bottom: 8px;
}
a.button:hover,
a.button:focus,
a.button:active {
  background: #8c5ba0;
  text-decoration-color: transparent;
  box-shadow: 0 1px 16px rgba(31, 5, 43, 0.5),
    -1px -1px 7px rgba(255, 255, 255, 0.09),
    1px 2px 7px rgba(230, 176, 255, 0.05) inset;
  z-index: 2;
  text-shadow: none;
}
.button-text {
  text-align: center;
}
.button-icon {
  position: relative;
  width: 24px;
  height: 24px;
  margin: 0 4px -8px 4px;
  float: left;
  background-size: cover;
}
.toplink-text {
  left: 32px;
  right: 0;
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 64px;
}
.toplink-icon {
  position: relative;
  width: 32px;
  height: 32px;
  margin: 16px;
  float: left;
  background-size: cover;
}
</style>