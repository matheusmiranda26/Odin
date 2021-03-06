-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: odin
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pagamentos_vendas`
--

DROP TABLE IF EXISTS `pagamentos_vendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagamentos_vendas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` date DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `numeroPagamento` varchar(45) DEFAULT NULL,
  `dataPagamento` date DEFAULT NULL,
  `idVendas` int(10) NOT NULL,
  `numeroParcela` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pagamentos_vendas_vendas1_idx` (`idVendas`),
  CONSTRAINT `fk_pagamentos_vendas_vendas1` FOREIGN KEY (`idVendas`) REFERENCES `vendas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamentos_vendas`
--

LOCK TABLES `pagamentos_vendas` WRITE;
/*!40000 ALTER TABLE `pagamentos_vendas` DISABLE KEYS */;
INSERT INTO `pagamentos_vendas` VALUES (1,'2019-07-08',123.50,'1','2019-07-08',1,NULL),(2,'2019-08-08',123.50,'2',NULL,1,NULL),(3,'2019-08-08',100.50,'2',NULL,1,NULL),(4,'2019-08-08',100.50,'2',NULL,1,NULL),(5,'2019-07-08',100.50,'1',NULL,91,NULL),(6,'2019-08-08',100.50,'2',NULL,91,NULL),(7,'2019-08-08',100.50,'2',NULL,91,NULL),(8,'2019-08-31',100.00,'563',NULL,104,'1/1'),(9,'2019-08-31',100.00,'563',NULL,105,'1/1'),(10,'2019-08-31',100.00,'123',NULL,106,'1/1'),(11,'2019-08-31',100.00,'123',NULL,107,'1/1'),(12,'2019-08-31',200.00,'26',NULL,108,'1/1'),(13,'2019-08-31',200.00,'26',NULL,109,'1/1'),(14,'2019-08-31',200.00,'123',NULL,117,'1/1'),(15,'2019-10-25',106.67,NULL,NULL,118,'2/3'),(16,'2019-09-25',106.67,NULL,NULL,118,'1/3'),(17,'2019-11-25',106.67,NULL,NULL,118,'3/3'),(18,'2019-09-19',100.00,'123','2019-09-15',119,'1/3'),(19,'2019-10-19',100.00,NULL,NULL,119,'2/3'),(20,'2019-11-19',100.00,NULL,NULL,119,'3/3'),(21,'2019-09-22',83.33,'123/a',NULL,120,'1/3'),(22,'2019-10-22',83.33,'123/b',NULL,120,'2/3'),(23,'2019-11-22',83.33,'123/c',NULL,120,'3/3'),(24,'2019-09-22',83.33,'123/a',NULL,121,'1/3'),(25,'2019-10-22',83.33,'123/b',NULL,121,'2/3'),(26,'2019-11-22',83.33,'123/c',NULL,121,'3/3'),(27,'2019-09-22',83.33,'123/a',NULL,122,'1/3'),(28,'2019-10-22',83.33,'123/b',NULL,122,'2/3'),(29,'2019-11-22',83.33,'123/c',NULL,122,'3/3'),(30,'2019-09-22',25.00,NULL,NULL,123,'1/4'),(31,'2019-10-22',25.00,NULL,NULL,123,'2/4'),(32,'2019-11-22',25.00,NULL,NULL,123,'3/4'),(33,'2019-12-22',25.00,NULL,NULL,123,'4/4'),(34,'2019-09-22',247.50,'165',NULL,124,'1/4'),(35,'2019-10-22',247.50,'1515',NULL,124,'2/4'),(36,'2019-11-22',247.50,'6151',NULL,124,'3/4'),(37,'2019-12-22',247.50,'151515',NULL,124,'4/4'),(38,'2019-09-22',24.75,'165','2019-09-22',125,'1/4'),(39,'2019-10-22',247.50,'1515',NULL,125,'2/4'),(40,'2019-11-22',247.50,'6151',NULL,125,'3/4'),(41,'2019-12-22',247.50,'151515',NULL,125,'4/4'),(42,'2019-09-22',247.50,'165','2019-09-22',126,'1/4'),(43,'2019-10-22',247.50,'1515/b','2019-10-22',126,'2/4'),(44,'2019-11-22',247.75,'6151','2019-10-22',126,'3/4'),(45,'2019-12-22',247.50,'151515','2019-10-02',126,'4/4');
/*!40000 ALTER TABLE `pagamentos_vendas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-09 21:23:29
