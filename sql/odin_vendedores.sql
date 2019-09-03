CREATE DATABASE  IF NOT EXISTS `odin` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `odin`;
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
-- Table structure for table `vendedores`
--

DROP TABLE IF EXISTS `vendedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendedores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `bairro` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `cep` varchar(255) DEFAULT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `cnpj_cpf` varchar(255) DEFAULT NULL,
  `rg` varchar(255) DEFAULT NULL,
  `status` varchar(2) DEFAULT '1',
  `observacoes` varchar(255) DEFAULT NULL,
  `apelido` varchar(45) DEFAULT NULL,
  `vendedorescol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendedores`
--

LOCK TABLES `vendedores` WRITE;
/*!40000 ALTER TABLE `vendedores` DISABLE KEYS */;
INSERT INTO `vendedores` VALUES (1,'Augustinho Gonçalves Marques','','RUA CLOTÁRIO PORTUGAL  749 APT 403 B','CENTRO','','','','APUCARANA','PR','41378563972','30717279','0','BANCO HSBC\n\nAGÊNCIA: 0096\nCONTA CORRENTE: 04256-40',NULL,NULL),(2,'Roberto Pupp','','RUA CAROBA 87','PARQUE VERDE','','85807800','','CASCAVEL','PR','50224921991','3561302','1','BANCO DO BRASIL\n\nAGENCIA: 0531-2\n\nCONTA CORRENTE: 39.510-2',NULL,NULL),(3,'Ricardo Jose Da Silva','','','JARDIM INTERLAGOS','','','','APUCARANA','PR','3816339930','84992728','1','',NULL,NULL),(4,'Valdecir Aparecido Usson','valdecirusson@hotmail.com','RUA BENEDITO BARBOSA DE SIQUEIRA N° 4131','DULCELÂNDIA','','15350000','','AURIFLAMA','SP','5827376809','17623315','0','BANCO BRADESCO \n\nAGÊNCIA: 1920-8\nCONTA CORRENTE: 0007234-6',NULL,NULL),(5,'Isaque Castro Cardoso','','RUA NHUNDIAQUARA    N°490','CENTENÁRIO','','82960120','','CURITIBA','PR','40481301968','3108489','1','BANCO DO BRASIL\n\nAGÊNCIA : 3020-1\nCONTA CORRENTE: 15098-3',NULL,NULL),(6,'João Carlos Silva De Moraes','','RUA DO ROSÁRIO N°1962','CENTRO','','13400186','','PIRACICABA','SP','75043521872','5969544','1','BANCO BRADESCO\n\nAGÊNCIA: 0912\nCONTA CORRENTE:0000264-0',NULL,NULL),(7,'Alioclipio Viana Da Cruz','','RUA GUILHERMINA  N°200','PAUL ','','29115260','','VILA VELHA','ES','25237578772','70834750','1','',NULL,NULL),(8,'Nivaldo Luis Rossato','','RUA MARACAHÍ  N° 44 Apt. 13 ','VILA FELIZ','','86803030','','APUCARANA','PR','41374690910','2124939','1','BANCO ITAU\n\nAGÊNCIA: 0082\nCONTA CORRENTE: 64541-7',NULL,NULL),(9,'Fagundes E Miranda Ltda','sevenwear@hotmail.com','AV. PINHO ARAUCARIA','JD. PINHEIROS','','86803370','','APUCARANA','PR','3945380000125','90215361-61','0','',NULL,NULL),(11,'Wagner Marcelo','','RUA BARÃO DO RIO BRANCO  58','CENTRO','','80010180','','CURITIBA','PR','','','1','',NULL,NULL),(12,'Luiz Carlos Moraes','','RUA JOSÉ BARRETO N° 60','JARDIM TAMI','','86803285','','APUCARANA','PR','24015512987','1.073733-PR','1','',NULL,NULL),(13,'Maria De Fatima Usson','fatimausson@hotmail.com','','','','','','AURIFLAMA','SP','26968743876','28337213-8','1','',NULL,NULL),(14,'Antonio Cesar Nolepa','nolepa1@hotmail.com.br','RUA GARIBALDI','JARDIM SANTO ANTONIO','','86705666','','ARAPONGAS','PR','78457378953','39778513','0','ITAU \nAGENCIA: 0113\nC/C: 41583-0\nCAMILA DA ROCHA NOLEPA',NULL,NULL),(15,'Valentim Carvalho','','RUA LUIZ DELFINO467','BELA VISTA','','89804380','','CHAPECÓ','SC','29513227987','760286','1','FELIPE (54) 9199-7396 \nRUA CASTELO BRANCO 290 CENTRO\nCEP: 99250-000\nSERAFINA CORREA - RS',NULL,NULL),(16,'Erasmo Carlos De Oliveira','eco_23@hotmail.com','RUA PROFESSOR FRANCISCO MORATO','SÃO GERALDO ','','17501020','','MARILIA','SP','28033187840','321858188','1','',NULL,NULL),(17,'Alvaro Ferraz De Freitas','','RUA JOSÉ CONEGLIAN, 151','JARDIM OHARA','','17506410','','MARILIA','SP','3657462821','14882305','1','HSBC\nAGENCIA: 0934\nC/C: 00422-18',NULL,NULL),(18,'Anderson Alves De Souza','representanderson@hotmail.com','RUA JOSÉ MARIA ASSUMPÇÃO - 91','TERRAS DE SANTA MARIA','','18530000','','TIETÊ','SP','22200605862','34243021-x','1','',NULL,NULL),(19,'Carlos Alberto Francischini','calfrancis10@hotmail.com','RUA SOLDADO RONALDO DE SEIXAS 40 APTO 101 - BLOCO 18','JARDIM EUROPA','','31620315','','BELO HORIZONTE','MG','16550089867','','1','',NULL,NULL),(20,'Ricardo Domingos','ricardodomingos-@hotmail.com','RUA ANTONIO BERTOLLO - 90 ','ELDORADO','','15850000','','URUPÊS','SP','24651626831','25.716.530-7','1','',NULL,NULL),(21,'Jean Carlos Pestana','','RUA MANOEL EVARISTO SANTANA','CDHU','','15190000','','NHANDEARA','SP','3095644841','17773489','1','',NULL,NULL),(22,'Daniel Henrique Pimenta Da Silva','danielpimenta08@gmail.com','AVENIDA TIRADENTES','CENTRO','','36680000','','SÃO JOÃO NEPOMUCENO','MG','7543282607','135.87390','1','data de nascimento 27/12/1985',NULL,NULL),(23,'Wellington Antonio De Lima','wlima_21@hotmail.com','RUA COTIA - 780','AGUDO ROMÃO','','15802160','','CATANDUVA','SP','33613379848','43.530.948-1','1','',NULL,NULL),(24,'Israel Magela Fernandes Da Silva','israelmagela09@hotmail.com','RUA CRAVO - 190','JARDIM DAS FLORES','','86810280','','APUCARANA','PR','48149675604','486.631.41','0','',NULL,NULL),(25,'Alan Rodrigo Soares','','RUA SÃO TIAGO - 152','DOM ROMEU ALBERTI','','','','APUCARANA','PR','7041671909','10.557.333-2','0','',NULL,NULL),(26,'Ademir Adão Da Silva','ademirbatatinha@hotmail.com','RUA TIRADENTES - 63','CENTRO','','86720000','','SABÁUDIA','PR','43456880944','129.636-62','0','',NULL,NULL),(27,'Rogério Rodrigues Moreira','rhtjeans@hotmail.com','RUA GRACILIANO RAMOS  711','JARDIM PLANALTO','','83409350','','COLOMBO','PR','3435577975','70298104','0','',NULL,NULL),(28,'Cleverson Silva','jvbsrepresentacoes@hotmail.com','RUA SERRA PARANAPIACABA 105','ADRIANO CORREIA','','','','APUCARANA','PR','3142015990','70.216.8688','0','',NULL,NULL),(29,'Jair Antonio Da Silva','','RUA LORI - 545','CENTRO','','86701300','','ARAPONGAS','PR','54254833920','','0','',NULL,NULL),(30,'Daniel Leite Rodrigues','dfr165@gmail.com','RUA ITABIRA 99','NITEROI','','','','BETIM','MG','26807686803','8100818','0','',NULL,NULL);
/*!40000 ALTER TABLE `vendedores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-02 21:20:47
