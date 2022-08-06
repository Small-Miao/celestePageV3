/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.5.5-10.5.15-MariaDB : Database - celeste
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`celeste` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `celeste`;

/*Table structure for table `cdks` */

DROP TABLE IF EXISTS `cdks`;

CREATE TABLE `cdks` (
  `cdkid` bigint(20) NOT NULL AUTO_INCREMENT,
  `cdk` varchar(32) DEFAULT NULL COMMENT '16位的CDK',
  `resource` varchar(50) DEFAULT NULL COMMENT '兑换物品',
  `resource_type` tinyint(4) DEFAULT NULL COMMENT '0 头衔 1 头衔颜色',
  `starttime` datetime DEFAULT NULL COMMENT '兑换开始时间',
  `endtime` datetime DEFAULT NULL COMMENT '兑换结束时间',
  `used` tinyint(4) DEFAULT NULL COMMENT '1 已使用 0 未使用',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`cdkid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `logs` */

DROP TABLE IF EXISTS `logs`;

CREATE TABLE `logs` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `log_time` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `log_userid` bigint(20) NOT NULL DEFAULT 0,
  `log_api` text DEFAULT NULL,
  `log_data` text DEFAULT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `map_data` */

DROP TABLE IF EXISTS `map_data`;

CREATE TABLE `map_data` (
  `mp_map_sid` varchar(50) DEFAULT NULL COMMENT '地图 SID',
  `mp_main_mod` varchar(50) NOT NULL DEFAULT 'N/A' COMMENT '所属MOD',
  `mp_map_name` varchar(50) DEFAULT NULL COMMENT '地图名称',
  `mp_map_difficulty` varchar(50) DEFAULT NULL COMMENT '地图难度',
  `mp_map_download_url` varchar(50) DEFAULT NULL COMMENT '地图下载url',
  `mp_map_image` varchar(50) DEFAULT NULL COMMENT '地图缩略图',
  `mp_map_author` varchar(50) NOT NULL DEFAULT 'N/A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `map_user_data` */

DROP TABLE IF EXISTS `map_user_data`;

CREATE TABLE `map_user_data` (
  `mp_data_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '数据记录',
  `mp_data_sid` varchar(50) NOT NULL DEFAULT 'N/A' COMMENT '地图ID',
  `mp_player_uid` bigint(20) NOT NULL DEFAULT -1 COMMENT '玩家UID',
  `mp_player_rank` int(11) NOT NULL DEFAULT -1 COMMENT '评级',
  `mp_player_time` varchar(50) DEFAULT NULL COMMENT '游玩时间',
  `mp_player_upload_date` text DEFAULT NULL COMMENT '数据上传时间',
  `mp_player_lastplay_time` varchar(50) DEFAULT NULL COMMENT '上次游玩时间',
  `mp_player_play_times` int(11) NOT NULL DEFAULT 0 COMMENT '玩家游玩次数',
  `mp_player_name` varchar(50) NOT NULL DEFAULT '0',
  `mp_b_side` tinyint(4) DEFAULT NULL COMMENT '是否为B面',
  `mp_c_side` tinyint(4) DEFAULT NULL COMMENT '是否为C面',
  `mp_speed_strawberry` tinyint(4) DEFAULT NULL COMMENT '是否为速通梅',
  `mp_golden_strawberry` tinyint(4) DEFAULT NULL COMMENT '是否为金草莓',
  `mp_hide` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`mp_data_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4086 DEFAULT CHARSET=utf8;

/*Table structure for table `prefix_data` */

DROP TABLE IF EXISTS `prefix_data`;

CREATE TABLE `prefix_data` (
  `u_uid` int(11) DEFAULT NULL,
  `u_prefix` varchar(50) DEFAULT NULL,
  `u_color` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `send_email_log` */

DROP TABLE IF EXISTS `send_email_log`;

CREATE TABLE `send_email_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) DEFAULT NULL COMMENT 'ip地址',
  `day` varchar(20) DEFAULT NULL COMMENT '发送日期yyyy-MM-dd',
  `code` varchar(10) DEFAULT NULL COMMENT '发送的验证码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `gm_uid` bigint(20) NOT NULL AUTO_INCREMENT,
  `gm_username` varchar(50) DEFAULT NULL COMMENT '用户名',
  `gm_password` varchar(50) DEFAULT NULL COMMENT '密码(md5)',
  `gm_email` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
  `gm_token` varchar(128) DEFAULT NULL COMMENT 'token',
  `gm_prefix` varchar(50) DEFAULT NULL COMMENT '头衔',
  `gm_isban` smallint(6) NOT NULL DEFAULT 0 COMMENT '是否封禁',
  `bot_gold` varchar(50) DEFAULT NULL COMMENT '机器人金币',
  `bot_last_sign` date DEFAULT NULL COMMENT '上次签到日期',
  `gm_color` text DEFAULT '#ffffff',
  `gm_description` varchar(500) DEFAULT NULL COMMENT '个人简介',
  `invite_code` varchar(50) DEFAULT NULL COMMENT '邀请码',
  `invited_code` varchar(50) DEFAULT NULL COMMENT '被邀请码',
  `gm_onlinetime` int(11) DEFAULT NULL COMMENT '在线时间(单位分钟)',
  PRIMARY KEY (`gm_uid`)
) ENGINE=InnoDB AUTO_INCREMENT=11690 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
