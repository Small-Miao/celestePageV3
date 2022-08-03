<template>
  <a-layout>
    <a-layout-content style="background: #1c1719">
      <div class="main">
        <a-affix>
          <el-row>
            <el-card class="navCard"> </el-card>
          </el-row>
        </a-affix>
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
            <span style="margin-top: 0.7vh; margin-left: 1vw">{{
              userInfo.userName
            }}</span>
            <div
              style="margin-top: 0.7vh; margin-left: 1vw"
              v-for="tag in userInfo.tags"
              :key="tag"
            >
              <a-tag :color="tag.tagColor"> {{ tag.tagName }} </a-tag>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="playerInfoD">
            <div class="playerRankInfo">
              <div>
                <div style="font-size: 12px">服务器排名</div>
                <span class="playerRankText">#{{ userInfo.serverRank }}</span>
              </div>
              <div style="margin-left: 25px">
                <div style="font-size: 12px">服务器在线时长</div>
                <span class="playerRankText">{{ userInfo.onlineTime }}</span>
              </div>
              <div style="margin-left: 25px">
                <div style="font-size: 12px">金草莓获得数</div>
                <span class="playerRankText">{{
                  userInfo.goldStrawberry
                }}</span>
              </div>
              <div style="margin-left: 25px">
                <div style="font-size: 12px">总关卡通关数</div>
                <span class="playerRankText">{{
                  userInfo.globalPasslevel
                }}</span>
              </div>
            </div>
            <div></div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="player_main">
            <span class="title">个人介绍</span>
            <div style="margin-top: 20px; font-size: 14px">
              <span>{{ userInfo.userDescription }}</span>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="playerScore">
            <span class="title">最近通关</span>
            <div
              class="scoreDisplay"
              v-for="score in userInfo.userScoreOver30Day"
              :key="score"
            >
              <div>
                <a>Small_Miao</a> 在 {{ score.levelPassDate }} 通关 (金草莓)
                <a :href="score.levelUrl">{{ score.levelName }}</a>
              </div>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="playerScoreTop">
            <span class="title">成绩</span>
            <div
              class="scoreDisplay"
              v-for="score in userInfo.userBest50"
              :key="score"
            >
              <el-card class="scoreInfo" style="margin-bottom: 5px">
                <div class="scoreInfoHeader">
                  <a :href="score.levelUrl">{{ score.levelName }}</a>
                  <span>{{ score.levelPassDate }}</span>
                </div>
                <div class="scoreInfoDy">
                  <span>通关时间: {{ score.levelPasstime }} s</span>
                </div>
              </el-card>
              <el-card class="loadMore" style="margin-bottom: 5px">
                加载更多
              </el-card>
            </div>
          </el-card>
        </el-row>
      </div>
    </a-layout-content>
    <a-layout-footer style="background: #1c1719" class="footer"
      >CelesteNet © 2022</a-layout-footer
    >
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        userName: "Small_Miao",
        tags: [
          {
            tagName: "Stuff",
            tagColor: "#2db7f5",
          },
        ],
        serverRank: "1",
        onlineTime: "15d 8h 5m",
        goldStrawberry: "15",
        globalPasslevel: "135",
        userDescription: "这个人很懒~ 什么都没写！",
        userScoreOver30Day: [
          {
            levelName: "Celeste-被遗忘的城市",
            levelUrl: "/score/Celeste-B1",
            levelPasstime: "315.3",
            levelPassDate: "2022/08/01 - 18:52",
          },
        ],
        userBest50: [
          {
            levelName: "Celeste-被遗忘的城市",
            levelUrl: "/score/Celeste-B1",
            levelPasstime: "315.3",
            levelPassDate: "2022/08/01 - 18:52",
          },
        ],
      },
    };
  },
};
</script>
<style>
@font-face {
  font-family: "Torus Pro";
  src: url("../../static/font/TORUSPRO-REGULAR.TTF");
}
body {
  background: #1c1719;
}
.main {
  height: 110vh;
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
  height: 0.75em;
  margin-top: 0.8em;
  margin-left: -8px;
  width: 3px;
  border-radius: 10000px;
  position: absolute;
  background-color: #ff66ab;
}
.scoreInfo {
  display: flex;
  flex-direction: row;
  background: #54454c;
  border: 0px;
}
.scoreInfo:hover {
  background: #705c65;
}
.scoreInfo .el-card__body {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.scoreInfoHeader {
  border-radius: 15px;
  color: white;
  font-family: "Torus Pro";
  flex: 1;
  display: flex;
  flex-direction: column;
}
.scoreInfoDy {
  display: flex;
  float: right;
  flex-direction: row;
  color: #fac825;
  font-weight: bold;
  font-family: "Torus Pro";
}
.loadMore {
  display: flex;
  flex-direction: row;
  background: #54454c;
  border: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  color: white;
}
.loadMore .el-card__body {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  align-content: center;
  justify-content: center;
}
.loadMore:hover {
  background: #705c65;
}
.footer {
  font-family: "Torus Pro";
  color: white;
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: row;
}
</style>
