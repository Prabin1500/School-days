-- MariaDB dump 10.19  Distrib 10.8.3-MariaDB, for osx10.17 (arm64)
--
-- Host: localhost    Database: appdatabase
-- ------------------------------------------------------
-- Server version	10.8.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ANNOUNCEMENT`
--

DROP TABLE IF EXISTS `ANNOUNCEMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ANNOUNCEMENT` (
  `ANNOUNCEMENTID` int(11) NOT NULL AUTO_INCREMENT,
  `TEXT` varchar(3000) NOT NULL,
  `MEDIA_FILENAME` varchar(100) DEFAULT NULL,
  `DATEANDTIME` varchar(30) NOT NULL,
  `USERSSN` varchar(11) NOT NULL,
  `CLASS` int(11) DEFAULT NULL,
  PRIMARY KEY (`ANNOUNCEMENTID`),
  KEY `USERSSN` (`USERSSN`),
  CONSTRAINT `announcement_ibfk_1` FOREIGN KEY (`USERSSN`) REFERENCES `USERS` (`USERSSN`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ANNOUNCEMENT`
--

DROP TABLE IF EXISTS `MESSAGE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MESSAGE` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(3000) NOT NULL,
  `SENDER` varchar(15) NOT NULL,
  `RECIEVER` varchar(15) NOT NULL,
  `dateandtime` varchar(30) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MESSAGE`
--

LOCK TABLES `MESSAGE` WRITE;
/*!40000 ALTER TABLE `MESSAGE` DISABLE KEYS */;
INSERT INTO `MESSAGE` VALUES
(16,'yoyo','argier96','gorub','13/12/2022 11:31:16'),
(17,'Hello argie','gorub','argier96','13/12/2022 11:31:55'),
(18,'yoyo','gorub','argier96','13/12/2022 17:32:15'),
(19,'Hello from admin','admin','gorub','13/12/2022 17:51:30'),
(20,'Hello\r\n','admin','gorub','13/12/2022 18:9:59'),
(21,'Hello admin\r\n','argier96','admin','14/12/2022 0:8:1'),
(22,'yoyoy','argier96','admin','14/12/2022 14:53:14');
/*!40000 ALTER TABLE `MESSAGE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STUDENTS`
--

DROP TABLE IF EXISTS `STUDENTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STUDENTS` (
  `CHILDSSN` varchar(11) NOT NULL,
  `FIRST_NAME` char(20) NOT NULL,
  `LAST_NAME` char(20) NOT NULL,
  `CLASS` int(11) NOT NULL,
  `USERSSN` varchar(11) NOT NULL,
  PRIMARY KEY (`CHILDSSN`),
  KEY `USERSSN` (`USERSSN`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`USERSSN`) REFERENCES `USERS` (`USERSSN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STUDENTS`
--



DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERS` (
  `USERSSN` varchar(11) NOT NULL,
  `FIRST_NAME` char(20) NOT NULL,
  `LAST_NAME` char(20) NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `PHONE_NUMBER` varchar(15) NOT NULL,
  `ROLE` char(10) NOT NULL,
  `USERNAME` varchar(15) NOT NULL,
  `PASSWORD` varchar(100) NOT NULL,
  `CLASS` int(11) DEFAULT NULL,
  PRIMARY KEY (`USERSSN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

