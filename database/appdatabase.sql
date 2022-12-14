DROP DATABASE IF EXISTS appdatabase;
use appdatabase;

DROP TABLE IF EXISTS `announcement`;
CREATE TABLE `announcement` (
  `announcementid` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(3000) NOT NULL,
  `media_filename` varchar(100) DEFAULT NULL,
  `dateandtime` varchar(30) NOT NULL,
  `userssn` varchar(11) NOT NULL,
  `class` int(11) DEFAULT NULL,
  PRIMARY KEY (`announcementid`),
  KEY `userssn` (`userssn`),
  CONSTRAINT `announcement_ibfk_1` FOREIGN KEY (`userssn`) REFERENCES `users` (`users`)
) ;

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(3000) NOT NULL,
  `sender` varchar(15) NOT NULL,
  `reciever` varchar(15) NOT NULL,
  `dateandtime` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ;
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `childssn` varchar(11) NOT NULL,
  `first_name` char(20) NOT NULL,
  `last_name` char(20) NOT NULL,
  `class` int(11) NOT NULL,
  `userssn` varchar(11) NOT NULL,
  PRIMARY KEY (`childssn`),
  KEY `userssn` (`userssn`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`userssn`) REFERENCES `users` (`userssn`)
) ;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userssn` varchar(11) NOT NULL,
  `first_name` char(20) NOT NULL,
  `last_name` char(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `role` char(10) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL,
  `class` int(11) DEFAULT NULL,
  PRIMARY KEY (`userssn`)
);