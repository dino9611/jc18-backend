-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: bejc18
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `phone`
--

DROP TABLE IF EXISTS `phone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_numb` varchar(45) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone`
--

LOCK TABLES `phone` WRITE;
/*!40000 ALTER TABLE `phone` DISABLE KEYS */;
INSERT INTO `phone` VALUES (3,'0822',3),(5,'0821',5),(6,'0833',NULL);
/*!40000 ALTER TABLE `phone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` int DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'popok hokage',50000,NULL),(2,'kunai hitam',40000,NULL),(3,'shuriken hokage',150000,NULL),(4,'motor ajas',500000,NULL),(6,'bukti bca',20000,'/products/PROD1634629230406.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(70) DEFAULT NULL,
  `password` varchar(70) DEFAULT NULL,
  `isVerified` tinyint DEFAULT '0',
  `role_id` int NOT NULL DEFAULT '3',
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'lara croft',NULL,'abc',0,3,'jl. pelabuhan'),(3,'Raymond Hamilton',NULL,'dictum',0,3,'Ap #304-8456 Vehicula Ave'),(5,'Kasper Hogan',NULL,'Duis',0,3,'P.O. Box 980, 5889 Lectus. Av.'),(6,'Alisa Ford',NULL,'urna',0,3,'P.O. Box 540, 487 Ante Av.'),(7,'Troy Hayden',NULL,'elit,',0,3,'Ap #588-7583 Sit Rd.'),(8,'Akeem Merrill',NULL,'dapibus',0,3,'P.O. Box 389, 8776 Et St.'),(9,'Ray Ayala',NULL,'bibendum',0,3,'6109 At St.'),(10,'Ezekiel Lloyd',NULL,'eu',0,3,'148-4853 Volutpat St.'),(11,'Armand Campos',NULL,'nec',0,3,'589-3911 Tellus Rd.'),(12,'Teagan Mills',NULL,'Pellentesque',0,3,'Ap #953-9570 Metus. Avenue'),(13,'Colette Green',NULL,'nec',0,3,'665 Neque. Rd.'),(14,'Eliana Benjamin',NULL,'lectus',0,3,'345-792 Pede Rd.'),(15,'Kirestin Gillespie',NULL,'dolor',0,3,'P.O. Box 202, 1238 Ipsum Rd.'),(16,'Devin Acevedo',NULL,'lorem',0,3,'450-9237 Donec St.'),(17,'Nelle Stevenson',NULL,'lorem',0,3,'Ap #275-3973 Bibendum Rd.'),(18,'Josephine Cameron',NULL,'ornare',0,3,'837-9081 Nunc Street'),(19,'Dieter Nixon',NULL,'Cum',0,3,'P.O. Box 379, 714 Varius Rd.'),(20,'Chester Pickett',NULL,'a,',0,3,'Ap #617-6762 Sit Rd.'),(21,'Uriah Huber',NULL,'urna.',0,3,'Ap #392-179 Mi St.'),(22,'Ignatius Tyler',NULL,'ut',0,3,'Ap #390-4786 Metus. Road'),(23,'Nathan Hartman',NULL,'augue',0,3,'Ap #423-4036 Et, Av.'),(24,'Ivory Hendrix',NULL,'Vivamus',0,3,'748-4377 Mauris Street'),(25,'Daquan Waller',NULL,'at,',0,3,'Ap #192-4865 Aenean Av.'),(26,'Belle Saunders',NULL,'Donec',0,3,'P.O. Box 152, 8320 Eu Street'),(27,'Ifeoma Bowers',NULL,'sociis',0,3,'Ap #858-686 Dapibus Rd.'),(28,'Ava Phelps',NULL,'et',0,3,'Ap #629-5383 Sed St.'),(29,'Naida Mckinney',NULL,'enim.',0,3,'741-8871 Sagittis Road'),(30,'Gary Fitzpatrick',NULL,'et,',0,3,'Ap #534-8844 Nec Avenue'),(31,'Fredericka Wong',NULL,'Etiam',0,3,'174-7838 In Avenue'),(32,'Isaiah Donovan',NULL,'felis',0,3,'Ap #798-1590 Molestie Road'),(33,'Julian Case',NULL,'laoreet',0,3,'Ap #614-5064 Arcu. Avenue'),(34,'Zenaida Ryan',NULL,'sit',0,3,'8815 Velit. Rd.'),(35,'Samantha Patel',NULL,'malesuada',0,3,'4147 Consectetuer St.'),(36,'Tasha Hopkins',NULL,'mattis.',0,3,'Ap #847-2662 Mollis Ave'),(37,'William Huff',NULL,'mollis.',0,3,'882-2413 Fringilla Av.'),(38,'Dennis Middleton',NULL,'taciti',0,3,'700-3334 Et St.'),(39,'Maite Key',NULL,'inceptos',0,3,'P.O. Box 452, 6112 Sed Ave'),(40,'Xander Wells',NULL,'nascetur',0,3,'1698 Imperdiet Street'),(41,'Nell Buckley',NULL,'nec',0,3,'5228 Nisl Street'),(42,'Ria Marsh',NULL,'dui,',0,3,'P.O. Box 804, 4695 Feugiat Ave'),(43,'Lacota Fisher',NULL,'sit',0,3,'6467 Lectus Ave'),(44,'Kathleen Grimes',NULL,'sed',0,3,'Ap #858-4597 Aenean Ave'),(45,'Rowan Clark',NULL,'eros',0,3,'778 Gravida Rd.'),(46,'Vaughan Coffey',NULL,'egestas.',0,3,'P.O. Box 839, 9386 Blandit St.'),(47,'Aiko Powers',NULL,'pede,',0,3,'6059 Vel Rd.'),(48,'Kay Briggs',NULL,'risus.',0,3,'Ap #135-5358 Aliquam Rd.'),(49,'Chester Hewitt',NULL,'ante',0,3,'992-2388 Donec Avenue'),(50,'Guy Mckay',NULL,'fringilla,',0,3,'Ap #342-6523 Dui. Road'),(51,'September Riggs',NULL,'Vivamus',0,3,'454-5759 At, Rd.'),(52,'Tanya Lara',NULL,'Donec',0,3,'Ap #689-2129 Proin St.'),(53,'Coby Snyder',NULL,'eget',0,3,'Ap #747-2251 Nunc Road'),(54,'Emi Allison',NULL,'magna',0,3,'7014 Donec Avenue'),(55,'Callie Robles',NULL,'sem.',0,3,'468-5600 Commodo St.'),(56,'Griffin Skinner',NULL,'enim',0,3,'P.O. Box 514, 6675 Vitae Rd.'),(57,'Petra Hardy',NULL,'non,',0,3,'Ap #659-8494 Ipsum. Rd.'),(58,'Leslie Nicholson',NULL,'amet',0,3,'P.O. Box 976, 4063 Netus Rd.'),(59,'Ralph Cannon',NULL,'ut',0,3,'588-3388 Augue Av.'),(60,'Stacey Brewer',NULL,'eget',0,3,'4563 Justo. St.'),(61,'Holly Kent',NULL,'Donec',0,3,'Ap #742-1201 Blandit Av.'),(62,'Abraham Weeks',NULL,'justo.',0,3,'Ap #696-3692 Luctus Rd.'),(63,'Ralph Luna',NULL,'sed',0,3,'244-9632 Non Ave'),(64,'Malachi Sawyer',NULL,'nibh.',0,3,'157-5889 Tellus Road'),(65,'Forrest Harvey',NULL,'Maecenas',0,3,'P.O. Box 628, 3744 Sit Street'),(66,'Benedict Ashley',NULL,'penatibus',0,3,'1036 Scelerisque Av.'),(67,'Wylie Dalton',NULL,'turpis.',0,3,'328-9267 Aliquam Ave'),(68,'Xaviera Pearson',NULL,'nec',0,3,'8724 Magna St.'),(69,'Shoshana Vargas',NULL,'faucibus',0,3,'Ap #679-1249 Ligula Road'),(70,'Jerry Cox',NULL,'hendrerit',0,3,'241-8578 Ut Ave'),(71,'Carlos Kaufman',NULL,'pede.',0,3,'364-8263 Viverra. Road'),(72,'David Jacobson',NULL,'sodales',0,3,'5403 Est St.'),(73,'Kameko Yang',NULL,'tempus',0,3,'702-4913 Quisque Rd.'),(74,'Dana Gilmore',NULL,'placerat,',0,3,'Ap #266-6543 Sem Avenue'),(75,'Allistair Matthews',NULL,'felis.',0,3,'600-2151 Eget, Rd.'),(76,'Kamal Rasmussen',NULL,'eros',0,3,'Ap #246-6805 Fames Rd.'),(77,'Luke Morin',NULL,'interdum',0,3,'3360 Semper Avenue'),(78,'Sharon Singleton',NULL,'est.',0,3,'Ap #826-7488 Est. Av.'),(79,'Perry Fitzpatrick',NULL,'nonummy',0,3,'Ap #710-3269 Lectus St.'),(80,'Burke Bradshaw',NULL,'semper',0,3,'108-6737 Sed Rd.'),(81,'Illana Sellers',NULL,'nec',0,3,'Ap #525-4602 Amet, Rd.'),(82,'Amery Cash',NULL,'commodo',0,3,'809-8358 Aliquet Road'),(83,'Wynter Bartlett',NULL,'ornare,',0,3,'950-7371 Vel, St.'),(84,'Lilah Copeland',NULL,'mus.',0,3,'P.O. Box 956, 8571 A Av.'),(85,'Raymond Burnett',NULL,'lectus',0,3,'Ap #357-8027 Ante Ave'),(86,'Maggie Rasmussen',NULL,'Donec',0,3,'250-8434 Metus Avenue'),(87,'Paki Lambert',NULL,'interdum.',0,3,'410-8979 Sed Street'),(88,'Kasimir Little',NULL,'urna.',0,3,'350-6155 Non, Road'),(89,'Caryn Snyder',NULL,'urna',0,3,'2117 Malesuada St.'),(90,'Geraldine Mendez',NULL,'dui,',0,3,'356-808 Mi Rd.'),(91,'Blythe Goodman',NULL,'Donec',0,3,'2792 Sapien Rd.'),(92,'April Shaffer',NULL,'Duis',0,3,'Ap #521-1032 Purus Ave'),(93,'Sandra Baldwin',NULL,'nulla.',0,3,'P.O. Box 525, 9831 Pellentesque Street'),(94,'Yolanda Graves',NULL,'nibh',0,3,'963 Ut, Rd.'),(95,'Octavia Lara',NULL,'Proin',0,3,'Ap #502-5134 Purus, St.'),(96,'Vladimir Gross',NULL,'malesuada',0,3,'9216 Enim, Rd.'),(97,'Thor Rhodes',NULL,'auctor.',0,3,'9577 Ipsum. Ave'),(98,'Yvonne Snider',NULL,'luctus',0,3,'897-336 Sed Avenue'),(99,'Thane Austin',NULL,'leo.',0,3,'P.O. Box 571, 7167 Est Avenue'),(100,'Emerson Santos',NULL,'Proin',0,3,'7323 Congue, St.'),(101,'Leah Burt',NULL,'magna',0,3,'4179 Augue Avenue'),(102,'Rosalyn Stone',NULL,'arcu.',0,3,'8164 Commodo Avenue'),(103,'dino',NULL,'abcd',0,3,'jl. kesejahteraan'),(104,'dinos',NULL,'abcd',0,3,'jl. kesejahteraan'),(105,'dinos',NULL,'abcd',0,3,'jl. kesejahteraan'),(106,'maulana',NULL,'abcd',0,3,'jl. kesejahteraan'),(107,'dinosa',NULL,'abcd',0,3,NULL),(108,'zaky',NULL,'abcd',0,3,NULL),(109,'katerin',NULL,'3f97d64c8703abacdccd5e2eff6a925b0673f4c0eeac83a3e44483c00b7baaa2',0,3,NULL),(110,'rio','dinopwdk@gmail.com','3f97d64c8703abacdccd5e2eff6a925b0673f4c0eeac83a3e44483c00b7baaa2',0,3,NULL),(111,'katerina','dinopwdk@gmail.com','298ea4347324639787050aedc93ebab0a473e8f3dbad87d600ae0892e626c5a9',1,3,NULL),(112,'kevin','dinopwdk@gmail.com','298ea4347324639787050aedc93ebab0a473e8f3dbad87d600ae0892e626c5a9',1,3,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `users_without_phone`
--

DROP TABLE IF EXISTS `users_without_phone`;
/*!50001 DROP VIEW IF EXISTS `users_without_phone`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `users_without_phone` AS SELECT 
 1 AS `id`,
 1 AS `username`,
 1 AS `password`,
 1 AS `role_id`,
 1 AS `address`,
 1 AS `phone_numb`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `users_without_phone`
--

/*!50001 DROP VIEW IF EXISTS `users_without_phone`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `users_without_phone` AS select `u`.`id` AS `id`,`u`.`username` AS `username`,`u`.`password` AS `password`,`u`.`role_id` AS `role_id`,`u`.`address` AS `address`,`p`.`phone_numb` AS `phone_numb` from (`user` `u` left join `phone` `p` on((`u`.`id` = `p`.`user_id`))) where (`p`.`phone_numb` is null) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-22  9:58:19
