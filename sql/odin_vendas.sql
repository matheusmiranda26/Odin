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
-- Table structure for table `vendas`
--

DROP TABLE IF EXISTS `vendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendas` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `desconto` decimal(10,2) DEFAULT NULL,
  `idCliente` int(10) NOT NULL,
  `formaPagamento` varchar(45) DEFAULT NULL,
  `condicaoPagamento` varchar(45) DEFAULT NULL,
  `numeroNF` varchar(45) DEFAULT NULL,
  `numeroPedido` varchar(45) DEFAULT NULL,
  `quantidade` varchar(45) DEFAULT NULL,
  `valorTotal` varchar(45) DEFAULT NULL,
  `idTransportadora` int(10) DEFAULT NULL,
  `deletedAt` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Vendas_clientes_idx` (`idCliente`),
  CONSTRAINT `fk_Vendas_clientes` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendas`
--

LOCK TABLES `vendas` WRITE;
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
INSERT INTO `vendas` VALUES (1,'2019-06-08',320.50,NULL,10,'cheque','1','987','54','11',NULL,NULL,'22:05:21'),(89,'2019-06-08',123.50,NULL,9,'boleto','1','321455','123','50',NULL,NULL,'19:27:48'),(91,'2019-06-08',123.50,NULL,9,'boleto','1','321455','123','50',NULL,NULL,'19:27:48'),(104,'2019-07-31',100.00,NULL,10,'boleto','1','221','52','20',NULL,NULL,'19:27:46'),(105,'2019-07-31',100.00,NULL,10,'boleto','1','221','52','20',NULL,NULL,'19:27:46'),(106,'2019-07-31',100.00,NULL,10,'boleto','1','123','50','10',NULL,NULL,'19:27:46'),(107,'2019-07-31',100.00,NULL,10,'boleto','1','123','50','10',NULL,NULL,'19:27:50'),(108,'2019-07-31',200.00,NULL,10,'boleto','1','321','50','10',NULL,NULL,'19:27:50'),(109,'2019-07-31',200.00,NULL,10,'boleto','1','321','50','10',NULL,NULL,'19:27:50'),(110,'2019-07-31',100.00,NULL,10,'boleto','1','121','15','50',NULL,NULL,'19:27:50'),(111,'2019-07-31',100.00,NULL,10,'boleto','1','121','15','50',NULL,NULL,'19:27:51'),(113,'2019-07-31',500.00,NULL,9,'boleto','1','das','das','50',NULL,NULL,'19:27:41'),(117,'2019-07-31',200.00,NULL,9,'boleto','1','123','25','10',NULL,NULL,'19:27:42'),(118,'2019-08-25',320.00,NULL,9,'boleto','3','150','123','20',NULL,NULL,'19:27:43'),(119,'2019-08-19',300.00,NULL,9,'boleto','3','123','123','510',NULL,NULL,'19:27:43'),(120,'2019-08-22',250.00,NULL,9,'boleto','3','123','3565','40',NULL,NULL,'19:27:44'),(121,'2019-08-22',250.00,NULL,9,'boleto','3','123','3565','40',NULL,NULL,'19:27:44'),(122,'2019-08-22',250.00,NULL,9,'boleto','3','123','3565','40',NULL,NULL,'19:27:45'),(123,'2019-08-22',100.00,0.00,9,'boleto','4','1354','123','50','100.00',1,NULL),(124,'2019-08-22',1000.00,10.00,10,'cheque','4','113','125','50','990',1,NULL),(125,'2019-08-22',1000.00,10.00,10,'cheque','4','113','125','50','990',1,NULL),(126,'2019-08-22',1000.00,10.00,10,'cheque','4','113','125','50','990',1,NULL);
/*!40000 ALTER TABLE `vendas` ENABLE KEYS */;
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
