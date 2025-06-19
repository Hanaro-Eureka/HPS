/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for osx10.20 (arm64)
--
-- Host: 127.0.0.1    Database: hps
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `CheckBox`
--

DROP TABLE IF EXISTS `CheckBox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `CheckBox` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `receiptIssuedAt` datetime DEFAULT NULL,
  `hasReceipt` datetime DEFAULT NULL,
  `isIncomeTracked` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `checkbox_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CheckBox`
--

LOCK TABLES `CheckBox` WRITE;
/*!40000 ALTER TABLE `CheckBox` DISABLE KEYS */;
INSERT INTO `CheckBox` VALUES
(1,1,'2025-01-01 10:00:00','2025-02-01 10:00:00','2025-03-01 10:00:00'),
(2,2,'2025-01-05 11:00:00','2025-02-05 11:00:00','2025-03-05 11:00:00'),
(3,3,'2025-01-10 09:30:00','2025-02-10 09:30:00','2025-03-10 09:30:00'),
(4,4,'2025-01-15 15:00:00','2025-02-15 15:00:00','2025-03-15 15:00:00'),
(5,5,'2025-01-20 08:00:00','2025-02-20 08:00:00','2025-03-20 08:00:00'),
(6,6,'2025-01-25 14:30:00','2025-02-25 14:30:00','2025-03-25 14:30:00'),
(7,7,'2025-01-30 16:00:00','2025-02-28 16:00:00','2025-03-30 16:00:00'),
(8,8,'2025-01-31 12:00:00','2025-02-27 12:00:00','2025-03-31 12:00:00'),
(9,9,'2025-01-18 18:00:00','2025-02-18 18:00:00','2025-03-18 18:00:00'),
(10,10,'2025-01-22 13:00:00','2025-02-22 13:00:00','2025-03-22 13:00:00');
/*!40000 ALTER TABLE `CheckBox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FixedExpense`
--

DROP TABLE IF EXISTS `FixedExpense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `FixedExpense` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `expenseName` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastIncomeDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastAmount` int NOT NULL,
  `userId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `fixedexpense_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FixedExpense`
--

LOCK TABLES `FixedExpense` WRITE;
/*!40000 ALTER TABLE `FixedExpense` DISABLE KEYS */;
INSERT INTO `FixedExpense` VALUES
(1,'월세','2025-05-25 00:00:00',750000,1),
(2,'통신비','2025-05-20 00:00:00',95000,1),
(3,'건강보험','2025-05-10 00:00:00',130000,1),
(4,'넷플릭스','2025-05-01 00:00:00',14500,1),
(5,'클라우드요금','2025-05-03 00:00:00',33000,1),
(6,'코워킹스페이스','2025-05-08 00:00:00',250000,1),
(7,'웹사이트 호스팅','2025-05-12 00:00:00',11000,1),
(8,'정기후원','2025-05-15 00:00:00',10000,1);
/*!40000 ALTER TABLE `FixedExpense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Salary`
--

DROP TABLE IF EXISTS `Salary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Salary` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `amount` int NOT NULL,
  `depositDate` datetime NOT NULL,
  `depositorName` varchar(63) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `incomeSource` varchar(63) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=332 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Salary`
--

LOCK TABLES `Salary` WRITE;
/*!40000 ALTER TABLE `Salary` DISABLE KEYS */;
INSERT INTO `Salary` VALUES
(301,1,3210000,'2024-04-23 19:57:27','(주)유튜브','유튜브'),
(302,1,3210000,'2024-04-23 19:57:27','(주)유튜브','유튜브'),
(303,1,3630000,'2024-03-09 20:41:24','급여','크몽'),
(304,1,3890000,'2024-10-15 21:18:35','카카오급여','카카오'),
(305,1,3320000,'2025-03-20 09:48:06','(주)유튜브','유튜브'),
(306,1,3100000,'2024-08-07 13:40:10','수고하셨어요','indiflex'),
(307,1,2340000,'2025-01-23 03:37:10','하나은행','하나은행'),
(308,1,2660000,'2024-12-18 23:57:29','(주)유튜브','유튜브'),
(309,1,3690000,'2024-09-26 03:05:30','수고하셨어요','indiflex'),
(310,1,2670000,'2024-01-08 07:16:12','하나은행','하나은행'),
(311,1,3270000,'2025-05-13 13:48:46','카카오급여','카카오'),
(312,1,2720000,'2025-01-12 14:35:12','하나은행','하나은행'),
(313,1,3460000,'2024-07-16 10:12:25','수고하셨어요','indiflex'),
(314,1,3900000,'2025-03-22 20:17:50','수고하셨어요','indiflex'),
(315,1,3500000,'2024-08-11 08:15:33','(주)유튜브','유튜브'),
(316,1,3160000,'2024-05-17 23:44:08','카카오급여','카카오'),
(317,1,3240000,'2024-11-21 20:56:30','수고하셨어요','indiflex'),
(318,1,2940000,'2024-04-07 07:21:39','수고하셨어요','indiflex'),
(319,1,2880000,'2025-06-03 05:09:44','급여','크몽'),
(320,1,3260000,'2024-12-22 05:39:42','급여','크몽'),
(321,1,2580000,'2025-01-08 13:57:37','카카오급여','카카오'),
(322,1,2460000,'2024-08-20 09:01:14','(주)유튜브','유튜브'),
(323,1,3640000,'2024-12-30 11:58:49','(주)유튜브','유튜브'),
(324,1,3730000,'2024-12-26 02:39:15','(주)유튜브','유튜브'),
(325,1,3110000,'2024-01-19 18:13:40','급여','크몽'),
(326,1,3740000,'2024-03-03 18:14:25','카카오급여','카카오'),
(327,1,3690000,'2024-06-26 09:02:37','수고하셨어요','indiflex'),
(328,1,2510000,'2024-07-30 21:04:56','급여','크몽'),
(329,1,2900000,'2024-07-22 10:21:39','하나은행','하나은행'),
(330,1,3160000,'2024-05-25 12:09:29','(주)유튜브','유튜브'),
(331,1,3360000,'2024-03-13 05:53:06','수고하셨어요','indiflex');
/*!40000 ALTER TABLE `Salary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(31) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loginId` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isSalaryMan` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES
(1,'User1','user001@example.com','$2b$12$DAwvpnEME0PRw3SDJ3nyW.igj.QoCf4oF8At1rqkk.zd30twwaZfq','2025-01-01 04:33:19',1),
(2,'User2','user002@example.com','$2b$10$dummyhash002','2025-04-19 04:33:19',1),
(3,'User3','user003@example.com','$2b$10$dummyhash003','2025-03-27 04:33:19',1),
(4,'User4','user004@example.com','$2b$10$dummyhash004','2025-05-10 04:33:19',1),
(5,'User5','user005@example.com','$2b$10$dummyhash005','2024-07-08 04:33:19',1),
(6,'User6','user006@example.com','$2b$10$dummyhash006','2024-08-07 04:33:19',1),
(7,'User7','user007@example.com','$2b$10$dummyhash007','2025-02-07 04:33:19',1),
(8,'User8','user008@example.com','$2b$10$dummyhash008','2025-06-09 04:33:19',1),
(9,'User9','user009@example.com','$2b$10$dummyhash009','2024-06-24 04:33:19',1),
(10,'User10','user010@example.com','$2b$10$dummyhash010','2024-10-15 04:33:19',1),
(11,'User11','user011@example.com','$2b$10$dummyhash011','2025-06-08 04:33:19',1),
(12,'User12','user012@example.com','$2b$10$dummyhash012','2024-11-27 04:33:19',1),
(13,'User13','user013@example.com','$2b$10$dummyhash013','2024-11-26 04:33:19',1),
(14,'User14','user014@example.com','$2b$10$dummyhash014','2025-01-20 04:33:19',1),
(15,'User15','user015@example.com','$2b$10$dummyhash015','2024-12-10 04:33:19',1),
(16,'User16','user016@example.com','$2b$10$dummyhash016','2024-08-04 04:33:19',1),
(17,'User17','user017@example.com','$2b$10$dummyhash017','2025-02-24 04:33:19',1),
(18,'User18','user018@example.com','$2b$10$dummyhash018','2025-04-04 04:33:19',1),
(19,'User19','user019@example.com','$2b$10$dummyhash019','2025-03-26 04:33:19',1),
(20,'User20','user020@example.com','$2b$10$dummyhash020','2024-08-01 04:33:19',1),
(21,'User21','user021@example.com','$2b$10$dummyhash021','2025-04-27 04:33:19',1),
(22,'User22','user022@example.com','$2b$10$dummyhash022','2025-01-23 04:33:19',1),
(23,'User23','user023@example.com','$2b$10$dummyhash023','2024-11-05 04:33:19',1),
(24,'User24','user024@example.com','$2b$10$dummyhash024','2024-06-23 04:33:19',1),
(25,'User25','user025@example.com','$2b$10$dummyhash025','2024-12-23 04:33:19',1),
(26,'User26','user026@example.com','$2b$10$dummyhash026','2024-09-18 04:33:19',1),
(27,'User27','user027@example.com','$2b$10$dummyhash027','2025-05-08 04:33:19',1),
(28,'User28','user028@example.com','$2b$10$dummyhash028','2024-10-09 04:33:19',1),
(29,'User29','user029@example.com','$2b$10$dummyhash029','2024-12-15 04:33:19',1),
(30,'User30','user030@example.com','$2b$10$dummyhash030','2024-10-01 04:33:19',1),
(31,'User41','user041@example.com','$2b$10$dummyhash041','2024-07-28 04:33:19',1),
(32,'User42','user042@example.com','$2b$10$dummyhash042','2025-03-09 04:33:19',1),
(33,'User43','user043@example.com','$2b$10$dummyhash043','2024-12-14 04:33:19',1),
(34,'User44','user044@example.com','$2b$10$dummyhash044','2024-12-04 04:33:19',1),
(35,'User45','user045@example.com','$2b$10$dummyhash045','2025-05-16 04:33:19',1),
(36,'User46','user046@example.com','$2b$10$dummyhash046','2024-06-24 04:33:19',1),
(37,'User47','user047@example.com','$2b$10$dummyhash047','2024-08-25 04:33:19',1),
(38,'User48','user048@example.com','$2b$10$dummyhash048','2024-09-08 04:33:19',1),
(39,'User49','user049@example.com','$2b$10$dummyhash049','2024-12-10 04:33:19',1),
(40,'User50','user050@example.com','$2b$10$dummyhash050','2025-04-15 04:33:19',1),
(41,'User41','user041@example.com','$2b$10$dummyhash041','2024-07-28 04:33:19',1),
(42,'User42','user042@example.com','$2b$10$dummyhash042','2025-03-09 04:33:19',1),
(43,'User43','user043@example.com','$2b$10$dummyhash043','2024-12-14 04:33:19',1),
(44,'User44','user044@example.com','$2b$10$dummyhash044','2024-12-04 04:33:19',1),
(45,'User45','user045@example.com','$2b$10$dummyhash045','2025-05-16 04:33:19',1),
(46,'User46','user046@example.com','$2b$10$dummyhash046','2024-06-24 04:33:19',1),
(47,'User47','user047@example.com','$2b$10$dummyhash047','2024-08-25 04:33:19',1),
(48,'User48','user048@example.com','$2b$10$dummyhash048','2024-09-08 04:33:19',1),
(49,'User49','user049@example.com','$2b$10$dummyhash049','2024-12-10 04:33:19',1),
(50,'User50','user050@example.com','$2b$10$dummyhash050','2025-04-15 04:33:19',1);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hps'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-06-19 23:58:13
