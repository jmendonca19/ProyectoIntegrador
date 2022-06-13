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
  PRIMARY KEY (`id_comment`),
  KEY `id_user` (`id_user`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
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
  `id_comment` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_product`),
  KEY `id_user` (`id_user`),
  KEY `id_comment` (`id_comment`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`id_comment`) REFERENCES `comments` (`id_comment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ihjksd@gmil.com','ivan@gamil.com','$2a$10$6RHyE.xKDC/6NWN4xULLnOgK5koBkSSsRsOGXYms/G3HnOLaJJUCm','2000-12-23','image_profile-1654195262617.jpg','2022-06-02 18:41:02','2022-06-02 18:41:02'),(2,'IVANFISCHMAN@GMAIL.COM','IVAN','$2a$10$AxhNbmWNCkIJCWKCAN8SmOGEz2HO.Bj1/hY0MdM85./VtLqpYPm8a','2000-12-23','image_profile-1654195309728.jpg','2022-06-02 18:41:49','2022-06-02 18:41:49'),(3,'ivanfischman@udesa.edu.ar','Ivan Fischman','$2a$10$xzjXM8.HrxNJur7ZcvSVzObfPxOteMsn7VApbGOKTAcp/5e5aEQAu','2000-12-23','image_profile-1654476658590.jpg','2022-06-06 00:50:59','2022-06-06 00:50:59'),(4,'ivanfischman@hotmail.com','ivann','$2a$10$UTYk6axwy.R.2DJUwZr2Su2skYiDdrA.XP.bYVSdLC9RXZwyU7g4i','2000-12-23','image_profile-1654518722467.jpg','2022-06-06 12:32:02','2022-06-06 12:32:02');
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

-- Dump completed on 2022-06-06 10:38:44

INSERT INTO products
VALUES
(DEFAULT, "Volkswagen modelo 2016", "Scirocco con 80000 kilómetros, motor 1.6 y embriage nuevo", "sirocco.jpeg", 5, DEFAULT, DEFAULT),
(DEFAULT, "Volkswagen modelo 2020", "Scirocco con 60000 kilómetros, motor 1.8 y caño de escape nuevo", "sirocco.jpeg", 5, DEFAULT, DEFAULT),
(DEFAULT, "Volkswagen modelo 2015", "Scirocco con 50000 kilómetros, motor 1.4 y chasis nuevo", "sirocco.jpeg", 4, DEFAULT, DEFAULT),
(DEFAULT, "Chevrolet modelo 2016", "Cruze con 140000 kilómetros, motor 1.4", "cruze.jpeg", 4, DEFAULT, DEFAULT),
(DEFAULT, "Nissan modelo 2020", "Sentra con 5000 kilómetros y puerta del conductor chocada", "sentra.jpg", 3, DEFAULT, DEFAULT),
(DEFAULT, "Toyota modelo 2022", "Etios con 0 kilómetros, motor 1.6", "etios.jpeg", 3, DEFAULT, DEFAULT),
(DEFAULT, "Audi modelo 2019", "A6 con 180000 kilómetros, motor 1.6 con el embriague roto", "a6.jpeg", 2, DEFAULT, DEFAULT),
(DEFAULT, "Toyota modelo 2014", "Corolla con 200000 kilómetros, motor 1.8", "corolla.jpeg", 2, DEFAULT, DEFAULT),
(DEFAULT, "Peugeot modelo 2010", "208 10000 kilómetros y batería rota", "208.jpeg", 1, DEFAULT, DEFAULT),
(DEFAULT, "Audi modelo 2022", "TT 0 kilómetros, motor 1", "tt.jpeg", 1, DEFAULT, DEFAULT)

INSERT INTO comments
VALUES
(DEFAULT, "Bateria rota? dale man...", 1, 1),
(DEFAULT, "La verdad, un desastre", 1, 3), 
(DEFAULT, "Pesimoo", 1, 4), 
(DEFAULT, "Tremendo, dame mil", 1, 5),
(DEFAULT, "Lo super recomiendo, excelente producto", 11, 3),
(DEFAULT, "Me esperaba algo mejor..", 11, 4), 
(DEFAULT, "No tengo mucho para decir", 11, 1), 
(DEFAULT, "Lo mejor que vi en años", 11, 2),
(DEFAULT, "No me gusto nada", 3, 2),
(DEFAULT, "Vienen pifiando hace años", 3, 3),
(DEFAULT, "me encantaaaa contactame", 3, 4),
(DEFAULT, "Esta bueno", 3, 5),
(DEFAULT, "Me esperaba algo mejor.. jajaja", 4, 1),
(DEFAULT, "ME FASCINA", 4, 2),
(DEFAULT, "Notas muy sutiles, recomendadísimo", 4, 5),
(DEFAULT, "Completamente distinto a lo que venía usando", 4, 4),
(DEFAULT, "esta bueno para regalar, si fuera millo", 5, 2),
(DEFAULT, "Gran innovación de la marca", 5, 3),
(DEFAULT, "tremendooooo", 5, 4),
(DEFAULT, "mucho humo la publicidad, no me sirve", 5, 1),
(DEFAULT, "OKK", 6, 1),
(DEFAULT, "hablame por wpp!", 6, 4),
(DEFAULT, "deja que desear", 6, 5),
(DEFAULT, "No fue lo que esperaba para nada", 6, 3),
(DEFAULT, "No se que decir de este auto", 7, 3),
(DEFAULT, "El vendedor es un estafador..", 7, 2),
(DEFAULT, "muy distinto al resto :)", 7, 1),
(DEFAULT, "Super recomendado", 7, 5),
(DEFAULT, "Gran diseño de la marca", 8, 5),
(DEFAULT, "como me gusta este auto dios", 8, 4),
(DEFAULT, "esta buenisimo", 8, 2),
(DEFAULT, "Q locura de auto por favor", 8, 1),
(DEFAULT, "muy disconforme con todo", 9, 1),
(DEFAULT, "INCREIBLEE", 9, 3),
(DEFAULT, "Me encantó!", 9, 2),
(DEFAULT, "Muy bueno", 9, 4),
(DEFAULT, "La verdad que fue un regalo de mi mamá y no esperaba mucho, pero me sorprendió gratamente. Recomendado.", 10, 3),
(DEFAULT, "Divinoo", 10, 4),
(DEFAULT, "VAMO ARRIBAAAA", 10, 5),
(DEFAULT, "Muy malo", 10, 2);