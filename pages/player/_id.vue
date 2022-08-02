<template>
  <div class="main">
    <el-row>
      <el-card class="navCard"> </el-card>
    </el-row>
    <el-row>
      <el-card class="playerHeader">
        <i class="el-icon-postcard"></i
        ><span style="margin-left: 2vh">玩家信息</span>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="playerInfo">
        <el-avatar
          shape="square"
          :size="size"
          src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        ></el-avatar>
        <span style="margin-top: 0.7vh; margin-left: 1vw">Small_Miao</span>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="playerInfoD">
        <div class="playerRankInfo">
          <div>
            <div style="font-size: 12px">服务器排名</div>
            <span class="playerRankText">#1</span>
          </div>
          <div style="margin-left: 25px">
            <div style="font-size: 12px">服务器在线时长</div>
            <span class="playerRankText">15d 9h 50m</span>
          </div>
          <div style="margin-left: 25px">
            <div style="font-size: 12px">金草莓获得数</div>
            <span class="playerRankText">35</span>
          </div>
          <div style="margin-left: 25px">
            <div style="font-size: 12px">总关卡通关数</div>
            <span class="playerRankText">19952</span>
          </div>
        </div>
        <div></div>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="player_main">
        <span class="title">个人介绍</span>
        <div style="margin-top: 20px; font-size: 14px">
          <span>这个人很懒~ 什么都没写！</span>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="playerScore">
        <span class="title">最近通关</span>
        <div class="scoreDisplay">
          <div>
            <a>Small_Miao</a> 在 24分钟 前 通关 (金草莓)
            <a>Celeste-被遗忘的城市</a>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="playerScoreTop">
        <span class="title">成绩</span>
      </el-card>
    </el-row>
  </div>
</template>
<style>
@font-face {
  font-family: "Torus Pro";
  src: url("../../static/font/TORUSPRO-REGULAR.TTF");
}
body {
  background: #1c1719;
}
.main {
  position: fixed;
  height: 100%;
  width: 100%;
}
.navCard {
  height: 7vh;
  background: #2f1b5c;
  border: 0px;
}
.playerHeader {
  margin-top: 5vh;
  border: 0px;
  background: #2e1f25;
  margin: 5vh 22vw 0px 22vw;
  color: white;
  font-size: 20px;
}
.playerInfo {
  border: 0px;
  background: #3e3236;
  margin: 0vh 22vw 0px 22vw;
  color: white;
  font-size: 20px;
  border-radius: 0;
  font-family: "Torus Pro";
  font-style: normal;
  line-height: normal;
  font-weight: 400;
}
.playerInfo .el-card__body {
  display: flex;
  flex-direction: row;
}
.playerInfoD {
  margin-top: 0vh;
  border: 0px;
  background: #2a2226;
  margin: 0vh 22vw 0px 22vw;
  color: white;
  font-size: 20px;
  display: grid;
  grid-template-columns: 1fr auto auto;
  border-radius: 0;
  padding-left: 15px;
}
.playerRankInfo {
  display: flex;
  flex-direction: row;
}
.playerRankText {
  font-family: "Torus Pro";
  font-size: 30px;
  font-style: normal;
  line-height: normal;
  font-weight: 400;
  color: #e0c9bc;
}
.chart {
  height: 12vh;
  background: #382e32;
}
.player_main {
  margin-top: 0vh;
  border: 0px;
  background: #382e32;
  margin: 0vh 22vw 0px 22vw;
  border-radius: 0;
  color: white;
  font-size: 20px;
  display: flex;
  flex-direction: column;
}
.playerScore {
  margin-top: 0vh;
  border: 0px;
  background: #46393f;
  margin: 0vh 22vw 0px 22vw;
  border-radius: 0;
  color: white;
  font-size: 20px;
  display: flex;
  flex-direction: column;
}
.scoreDisplay {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-top: 20px;
}
a {
  transition: color 80ms linear;
  font-family: "Torus Pro";
  font-weight: bold;
  color: #dcb4c5;
}
.playerScoreTop {
  margin-top: 0vh;
  border: 0px;
  background: #2a2226;
  margin: 0vh 22vw 0px 22vw;
  border-radius: 0;
  color: white;
  font-size: 20px;
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 15px;

  line-height: 1.1;
}
.title:before {
    content: "";
    height: .75em;
    margin-top: .8em;
    margin-left: -8px;
    width: 3px;
    border-radius: 10000px;
    position: absolute;
    background-color: #ff66ab;
}
</style>
