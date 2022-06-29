CREATE DATABASE  IF NOT EXISTS `basedatos` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `basedatos`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: basedatos
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id_comment` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_comment`),
  KEY `id_user` (`id_user`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Bateria rota? dale man...',1,1,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(2,'La verdad, un desastre',1,3,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(3,'Pesimoo',1,4,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(4,'Tremendo, dame mil',1,5,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(5,'Lo super recomiendo, excelente producto',11,3,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(6,'Me esperaba algo mejor..',11,4,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(7,'No tengo mucho para decir',11,1,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(8,'Lo mejor que vi en años',11,2,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(9,'No me gusto nada',3,2,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(10,'Vienen pifiando hace años',3,3,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(11,'me encantaaaa contactame',3,4,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(12,'Esta bueno',3,5,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(13,'Me esperaba algo mejor.. jajaja',4,1,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(14,'ME FASCINA',4,2,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(15,'Notas muy sutiles, recomendadísimo',4,5,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(16,'Completamente distinto a lo que venía usando',4,4,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(17,'esta bueno para regalar, si fuera millo',5,2,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(18,'Gran innovación de la marca',5,3,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(19,'tremendooooo',5,4,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(20,'mucho humo la publicidad, no me sirve',5,1,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(21,'OKK',6,1,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(22,'hablame por wpp!',6,4,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(23,'deja que desear',6,5,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(24,'No fue lo que esperaba para nada',6,3,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(25,'No se que decir de este auto',7,3,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(26,'El vendedor es un estafador..',7,2,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(27,'muy distinto al resto :)',7,1,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(28,'Super recomendado',7,5,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(29,'Gran diseño de la marca',8,5,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(30,'como me gusta este auto dios',8,4,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(31,'esta buenisimo',8,2,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(32,'Q locura de auto por favor',8,1,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(33,'muy disconforme con todo',9,1,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(34,'INCREIBLEE',9,3,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(35,'Me encantó!',9,2,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(36,'Muy bueno',9,4,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(37,'La verdad que fue un regalo de mi mamá y no esperaba mucho, pero me sorprendió gratamente. Recomendado.',10,3,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(38,'Divinoo',10,4,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(39,'VAMO ARRIBAAAA',10,5,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(40,'Muy malo',10,2,'2022-06-13 21:54:45','2022-06-13 21:55:28'),(59,'Premium',1,5,'2022-06-13 22:59:29','2022-06-13 22:59:29'),(63,'tremendo',4,5,'2022-06-22 21:13:04','2022-06-22 21:13:04');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `name_product` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image_product` varchar(255) NOT NULL,
  `id_user` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_product`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Volkswagen modelo 2016','Scirocco con 80000 kilómetros, motor 1.6 y embriage nuevo','sirocco.jpeg',5,NULL,NULL),(3,'Volkswagen modelo 2020   ','Scirocco con 60000 kilómetros, motor 1.8 y caño de escape nuevo   ','image_product-1655239614789.jpeg',5,NULL,'2022-06-14 20:46:54'),(4,'Volkswagen modelo 2015','Scirocco con 50000 kilómetros, motor 1.4 y chasis nuevo','sirocco.jpeg',4,NULL,NULL),(5,'Chevrolet modelo 2016','Cruze con 140000 kilómetros, motor 1.4','cruze.jpeg',4,NULL,NULL),(6,'Nissan modelo 2020','Sentra con 5000 kilómetros y puerta del conductor chocada','sentra.jpg',3,NULL,NULL),(7,'Toyota modelo 2022','Etios con 0 kilómetros, motor 1.6','etios.jpeg',3,NULL,NULL),(8,'Audi modelo 2019','A6 con 180000 kilómetros, motor 1.6 con el embriague roto','a6.jpeg',2,NULL,NULL),(9,'Toyota modelo 2014','Corolla con 200000 kilómetros, motor 1.8','corolla.jpeg',2,NULL,NULL),(10,'Peugeot modelo 2010','208 10000 kilómetros y batería rota','208.jpeg',1,NULL,NULL),(11,'Audi modelo 2022','TT 0 kilómetros, motor 1','tt.jpeg',1,NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguidor_seguidos`
--

DROP TABLE IF EXISTS `seguidor_seguidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguidor_seguidos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_seguidor` int(10) DEFAULT NULL,
  `id_seguido` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_seguido` (`id_seguido`),
  KEY `id_seguidor` (`id_seguidor`),
  CONSTRAINT `seguidor_seguidos_ibfk_1` FOREIGN KEY (`id_seguido`) REFERENCES `users` (`id_user`),
  CONSTRAINT `seguidor_seguidos_ibfk_2` FOREIGN KEY (`id_seguidor`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguidor_seguidos`
--

LOCK TABLES `seguidor_seguidos` WRITE;
/*!40000 ALTER TABLE `seguidor_seguidos` DISABLE KEYS */;
INSERT INTO `seguidor_seguidos` VALUES (13,4,5),(30,5,2),(31,5,1),(34,5,4);
/*!40000 ALTER TABLE `seguidor_seguidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `image_profile` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'joaco@joaco.com','Joaquin Knez','$2a$10$6RHyE.xKDC/6NWN4xULLnOgK5koBkSSsRsOGXYms/G3HnOLaJJUCm','2000-12-23','image_profile-1654195262617.jpg','2022-06-02 18:41:02','2022-06-02 18:41:02'),(2,'nico@nico.com','Nicolas Perez','$2a$10$AxhNbmWNCkIJCWKCAN8SmOGEz2HO.Bj1/hY0MdM85./VtLqpYPm8a','2000-12-23','image_profile-1654195309728.jpg','2022-06-02 18:41:49','2022-06-02 18:41:49'),(3,'iara@iara.com','Iara Sekzer','$2a$10$xzjXM8.HrxNJur7ZcvSVzObfPxOteMsn7VApbGOKTAcp/5e5aEQAu','2000-12-23','image_profile-1654476658590.jpg','2022-06-06 00:50:59','2022-06-06 00:50:59'),(4,'juana@juana.com','Juana Mendonca','$2a$10$77uCvU489HM5CgL0THUA1.KnudNmIrMiPud3Y8XdK28GlM4Bl4ES2','2000-12-23','image_profile-1654518722467.jpg','2022-06-06 12:32:02','2022-06-13 19:41:13'),(5,'ivan@ivan.com','Ivan Fischman ','$2a$10$dguC9Tq0NJIIvrdemp9mNe20LDo9EB49AnCFfqrcL5.GznLB8ELDa','0000-00-00','image_profile-1654700130014.jpg','2022-06-08 14:55:30','2022-06-16 02:23:02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-29 12:06:55
