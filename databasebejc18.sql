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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
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
  `password` varchar(70) DEFAULT NULL,
  `role_id` int NOT NULL DEFAULT '3',
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'lara croft','abc',3,'jl. pelabuhan'),(3,'Raymond Hamilton','dictum',3,'Ap #304-8456 Vehicula Ave'),(5,'Kasper Hogan','Duis',3,'P.O. Box 980, 5889 Lectus. Av.'),(6,'Alisa Ford','urna',3,'P.O. Box 540, 487 Ante Av.'),(7,'Troy Hayden','elit,',3,'Ap #588-7583 Sit Rd.'),(8,'Akeem Merrill','dapibus',3,'P.O. Box 389, 8776 Et St.'),(9,'Ray Ayala','bibendum',3,'6109 At St.'),(10,'Ezekiel Lloyd','eu',3,'148-4853 Volutpat St.'),(11,'Armand Campos','nec',3,'589-3911 Tellus Rd.'),(12,'Teagan Mills','Pellentesque',3,'Ap #953-9570 Metus. Avenue'),(13,'Colette Green','nec',3,'665 Neque. Rd.'),(14,'Eliana Benjamin','lectus',3,'345-792 Pede Rd.'),(15,'Kirestin Gillespie','dolor',3,'P.O. Box 202, 1238 Ipsum Rd.'),(16,'Devin Acevedo','lorem',3,'450-9237 Donec St.'),(17,'Nelle Stevenson','lorem',3,'Ap #275-3973 Bibendum Rd.'),(18,'Josephine Cameron','ornare',3,'837-9081 Nunc Street'),(19,'Dieter Nixon','Cum',3,'P.O. Box 379, 714 Varius Rd.'),(20,'Chester Pickett','a,',3,'Ap #617-6762 Sit Rd.'),(21,'Uriah Huber','urna.',3,'Ap #392-179 Mi St.'),(22,'Ignatius Tyler','ut',3,'Ap #390-4786 Metus. Road'),(23,'Nathan Hartman','augue',3,'Ap #423-4036 Et, Av.'),(24,'Ivory Hendrix','Vivamus',3,'748-4377 Mauris Street'),(25,'Daquan Waller','at,',3,'Ap #192-4865 Aenean Av.'),(26,'Belle Saunders','Donec',3,'P.O. Box 152, 8320 Eu Street'),(27,'Ifeoma Bowers','sociis',3,'Ap #858-686 Dapibus Rd.'),(28,'Ava Phelps','et',3,'Ap #629-5383 Sed St.'),(29,'Naida Mckinney','enim.',3,'741-8871 Sagittis Road'),(30,'Gary Fitzpatrick','et,',3,'Ap #534-8844 Nec Avenue'),(31,'Fredericka Wong','Etiam',3,'174-7838 In Avenue'),(32,'Isaiah Donovan','felis',3,'Ap #798-1590 Molestie Road'),(33,'Julian Case','laoreet',3,'Ap #614-5064 Arcu. Avenue'),(34,'Zenaida Ryan','sit',3,'8815 Velit. Rd.'),(35,'Samantha Patel','malesuada',3,'4147 Consectetuer St.'),(36,'Tasha Hopkins','mattis.',3,'Ap #847-2662 Mollis Ave'),(37,'William Huff','mollis.',3,'882-2413 Fringilla Av.'),(38,'Dennis Middleton','taciti',3,'700-3334 Et St.'),(39,'Maite Key','inceptos',3,'P.O. Box 452, 6112 Sed Ave'),(40,'Xander Wells','nascetur',3,'1698 Imperdiet Street'),(41,'Nell Buckley','nec',3,'5228 Nisl Street'),(42,'Ria Marsh','dui,',3,'P.O. Box 804, 4695 Feugiat Ave'),(43,'Lacota Fisher','sit',3,'6467 Lectus Ave'),(44,'Kathleen Grimes','sed',3,'Ap #858-4597 Aenean Ave'),(45,'Rowan Clark','eros',3,'778 Gravida Rd.'),(46,'Vaughan Coffey','egestas.',3,'P.O. Box 839, 9386 Blandit St.'),(47,'Aiko Powers','pede,',3,'6059 Vel Rd.'),(48,'Kay Briggs','risus.',3,'Ap #135-5358 Aliquam Rd.'),(49,'Chester Hewitt','ante',3,'992-2388 Donec Avenue'),(50,'Guy Mckay','fringilla,',3,'Ap #342-6523 Dui. Road'),(51,'September Riggs','Vivamus',3,'454-5759 At, Rd.'),(52,'Tanya Lara','Donec',3,'Ap #689-2129 Proin St.'),(53,'Coby Snyder','eget',3,'Ap #747-2251 Nunc Road'),(54,'Emi Allison','magna',3,'7014 Donec Avenue'),(55,'Callie Robles','sem.',3,'468-5600 Commodo St.'),(56,'Griffin Skinner','enim',3,'P.O. Box 514, 6675 Vitae Rd.'),(57,'Petra Hardy','non,',3,'Ap #659-8494 Ipsum. Rd.'),(58,'Leslie Nicholson','amet',3,'P.O. Box 976, 4063 Netus Rd.'),(59,'Ralph Cannon','ut',3,'588-3388 Augue Av.'),(60,'Stacey Brewer','eget',3,'4563 Justo. St.'),(61,'Holly Kent','Donec',3,'Ap #742-1201 Blandit Av.'),(62,'Abraham Weeks','justo.',3,'Ap #696-3692 Luctus Rd.'),(63,'Ralph Luna','sed',3,'244-9632 Non Ave'),(64,'Malachi Sawyer','nibh.',3,'157-5889 Tellus Road'),(65,'Forrest Harvey','Maecenas',3,'P.O. Box 628, 3744 Sit Street'),(66,'Benedict Ashley','penatibus',3,'1036 Scelerisque Av.'),(67,'Wylie Dalton','turpis.',3,'328-9267 Aliquam Ave'),(68,'Xaviera Pearson','nec',3,'8724 Magna St.'),(69,'Shoshana Vargas','faucibus',3,'Ap #679-1249 Ligula Road'),(70,'Jerry Cox','hendrerit',3,'241-8578 Ut Ave'),(71,'Carlos Kaufman','pede.',3,'364-8263 Viverra. Road'),(72,'David Jacobson','sodales',3,'5403 Est St.'),(73,'Kameko Yang','tempus',3,'702-4913 Quisque Rd.'),(74,'Dana Gilmore','placerat,',3,'Ap #266-6543 Sem Avenue'),(75,'Allistair Matthews','felis.',3,'600-2151 Eget, Rd.'),(76,'Kamal Rasmussen','eros',3,'Ap #246-6805 Fames Rd.'),(77,'Luke Morin','interdum',3,'3360 Semper Avenue'),(78,'Sharon Singleton','est.',3,'Ap #826-7488 Est. Av.'),(79,'Perry Fitzpatrick','nonummy',3,'Ap #710-3269 Lectus St.'),(80,'Burke Bradshaw','semper',3,'108-6737 Sed Rd.'),(81,'Illana Sellers','nec',3,'Ap #525-4602 Amet, Rd.'),(82,'Amery Cash','commodo',3,'809-8358 Aliquet Road'),(83,'Wynter Bartlett','ornare,',3,'950-7371 Vel, St.'),(84,'Lilah Copeland','mus.',3,'P.O. Box 956, 8571 A Av.'),(85,'Raymond Burnett','lectus',3,'Ap #357-8027 Ante Ave'),(86,'Maggie Rasmussen','Donec',3,'250-8434 Metus Avenue'),(87,'Paki Lambert','interdum.',3,'410-8979 Sed Street'),(88,'Kasimir Little','urna.',3,'350-6155 Non, Road'),(89,'Caryn Snyder','urna',3,'2117 Malesuada St.'),(90,'Geraldine Mendez','dui,',3,'356-808 Mi Rd.'),(91,'Blythe Goodman','Donec',3,'2792 Sapien Rd.'),(92,'April Shaffer','Duis',3,'Ap #521-1032 Purus Ave'),(93,'Sandra Baldwin','nulla.',3,'P.O. Box 525, 9831 Pellentesque Street'),(94,'Yolanda Graves','nibh',3,'963 Ut, Rd.'),(95,'Octavia Lara','Proin',3,'Ap #502-5134 Purus, St.'),(96,'Vladimir Gross','malesuada',3,'9216 Enim, Rd.'),(97,'Thor Rhodes','auctor.',3,'9577 Ipsum. Ave'),(98,'Yvonne Snider','luctus',3,'897-336 Sed Avenue'),(99,'Thane Austin','leo.',3,'P.O. Box 571, 7167 Est Avenue'),(100,'Emerson Santos','Proin',3,'7323 Congue, St.'),(101,'Leah Burt','magna',3,'4179 Augue Avenue'),(102,'Rosalyn Stone','arcu.',3,'8164 Commodo Avenue'),(103,'dino','abcd',3,'jl. kesejahteraan'),(104,'dinos','abcd',3,'jl. kesejahteraan'),(105,'dinos','abcd',3,'jl. kesejahteraan'),(106,'maulana','abcd',3,'jl. kesejahteraan');
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

-- Dump completed on 2021-10-12 12:18:16
