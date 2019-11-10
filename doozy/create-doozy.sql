DROP DATABASE IF EXISTS `doozy`;
CREATE DATABASE `doozy`; 
USE `doozy`;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,

  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `interests` (
  `interest_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `interest_name` varchar(50) NOT NULL,
  PRIMARY KEY (`interest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `interests` VALUES (1, 'sports');
INSERT INTO `interests` VALUES (2, 'hacking');
INSERT INTO `interests` VALUES (3, 'exercise');
INSERT INTO `interests` VALUES (4, 'dining');
INSERT INTO `interests` VALUES (5, 'museums');
INSERT INTO `interests` VALUES (6, 'art');
INSERT INTO `interests` VALUES (7, 'hiking');
INSERT INTO `interests` VALUES (8, 'gaming');
INSERT INTO `interests` VALUES (9, 'clubbing');
INSERT INTO `interests` VALUES (10, 'dancing');
INSERT INTO `interests` VALUES (11, 'reading');
INSERT INTO `interests` VALUES (12, 'tv');
INSERT INTO `interests` VALUES (13, 'theater');
INSERT INTO `interests` VALUES (14, 'movies');
INSERT INTO `interests` VALUES (15, 'concerts');
INSERT INTO `interests` VALUES (16, 'music');
INSERT INTO `interests` VALUES (17, 'shopping');
INSERT INTO `interests` VALUES (18, 'yoga');


CREATE TABLE `users_interests` (
  `user_id`    int(11) NOT NULL,
  `interest_1` tinyint(4) DEFAULT NULL,
  `interest_2` tinyint(4) DEFAULT NULL,
  `interest_3` tinyint(4) DEFAULT NULL,
  `interest_4` tinyint(4) DEFAULT NULL,
  `interest_5` tinyint(4) DEFAULT NULL,
  `interest_6` tinyint(4) DEFAULT NULL,
  KEY `FK_user_id_interests` (`user_id`),
  CONSTRAINT `FK_user_id_interests` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users_issues` (
  `user_id` int(11) NOT NULL,
  `issue_1` tinyint(4) NOT NULL,
  `issue_2` tinyint(4) NOT NULL,
  `issue_3` tinyint(4) NOT NULL,
  KEY `FK_user_id_issues` (`user_id`),
  CONSTRAINT `FK_user_id_issues` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `open_users` (
  `user_id` int(11) NOT NULL,
  `open` tinyint(1) NOT NULL,
  KEY `FK_user_id_open` (`user_id`),
  CONSTRAINT `FK_user_id_open` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;