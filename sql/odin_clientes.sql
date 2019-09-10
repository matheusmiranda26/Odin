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
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nomeCliente` varchar(100) NOT NULL,
  `nomeFantasia` varchar(50) DEFAULT NULL,
  `cnpj_cpf` varchar(20) NOT NULL,
  `inscricaoEstadual_rg` varchar(20) DEFAULT NULL,
  `email` varchar(25) DEFAULT NULL,
  `dataFundacao` date DEFAULT NULL,
  `telefoneComercial` varchar(15) DEFAULT NULL,
  `telefoneCelular` varchar(15) DEFAULT NULL,
  `tipoCliente` varchar(10) NOT NULL,
  `observacoes` varchar(255) DEFAULT NULL,
  `cep` varchar(15) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(50) DEFAULT NULL,
  `bairro` varchar(50) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT '1',
  `idVendedor` int(10) unsigned NOT NULL,
  `deletedAt` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_clientes_vendedores1_idx` (`idVendedor`),
  CONSTRAINT `fk_clientes_vendedores1` FOREIGN KEY (`idVendedor`) REFERENCES `vendedores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (9,'Ricardo Silva','Unifil','12.345.678/9123-21','6321456','ricardo@email.com','2012-02-20','(43) 3333-3333','(43) 9999-9999','juridica',NULL,'86805-620','Rua Goias','123',NULL,'Centro','Londrina','PR','1',4,NULL),(10,'Lara Beatriz',NULL,'123.456.789-66','131651651','lara@email.com','1997-01-26',NULL,'(43) 9999-9699','fisica','entrega fim de mês','86022-040','Av. JK','45','Ap 78','Centro','Apucarana','PR','1',1,NULL),(11,'Marc Queiroz',NULL,'000.000.000-00','15616165',NULL,'2011-01-20','(43) 34232-5020',NULL,'fisica',NULL,'86806-060','Rua JK','1515',NULL,'Centro','Londrina','PR','1',29,NULL);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
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
