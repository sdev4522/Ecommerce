-- MySQL dump 10.13  Distrib 8.4.4, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: wowy
-- ------------------------------------------------------
-- Server version	8.4.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activations`
--

DROP TABLE IF EXISTS `activations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `code` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `completed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `activations_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activations`
--

LOCK TABLES `activations` WRITE;
/*!40000 ALTER TABLE `activations` DISABLE KEYS */;
INSERT INTO `activations` VALUES (1,1,'vVlkmBKb6LKvOO5juDb6vHhx5SbnpvDh',1,'2025-09-11 01:45:47','2025-09-11 01:45:47','2025-09-11 01:45:47');
/*!40000 ALTER TABLE `activations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_notifications`
--

DROP TABLE IF EXISTS `admin_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_label` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `permission` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_notifications`
--

LOCK TABLES `admin_notifications` WRITE;
/*!40000 ALTER TABLE `admin_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ads`
--

DROP TABLE IF EXISTS `ads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ads` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expired_at` datetime DEFAULT NULL,
  `location` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `key` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clicked` bigint NOT NULL DEFAULT '0',
  `order` int DEFAULT '0',
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `open_in_new_tab` tinyint(1) NOT NULL DEFAULT '1',
  `tablet_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ads_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_adsense_slot_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ads_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ads`
--

LOCK TABLES `ads` WRITE;
/*!40000 ALTER TABLE `ads` DISABLE KEYS */;
INSERT INTO `ads` VALUES (1,'Smart Offer','2030-09-11 00:00:00','not_set','IZ6WU8KUALYD','promotion/1.png','/products',0,1,'published','2025-09-11 01:45:53','2025-09-11 01:45:53',1,NULL,NULL,NULL,NULL),(2,'Sale off','2030-09-11 00:00:00','not_set','ILSFJVYFGCPZ','promotion/2.png','/products',0,2,'published','2025-09-11 01:45:53','2025-09-11 01:45:53',1,NULL,NULL,NULL,NULL),(3,'New Arrivals','2030-09-11 00:00:00','not_set','ILSDKVYFGXPH','promotion/3.png','/products',0,3,'published','2025-09-11 01:45:53','2025-09-11 01:45:53',1,NULL,NULL,NULL,NULL),(4,'Gaming Area','2030-09-11 00:00:00','not_set','ILSDKVYFGXPJ','promotion/4.png','/products',0,4,'published','2025-09-11 01:45:53','2025-09-11 01:45:53',1,NULL,NULL,NULL,NULL),(5,'Smart Offer','2030-09-11 00:00:00','not_set','IZ6WU8KUALYE','promotion/5.png','/products',0,5,'published','2025-09-11 01:45:53','2025-09-11 01:45:53',1,NULL,NULL,NULL,NULL),(6,'Repair Services','2030-09-11 00:00:00','banner-big','IZ6WU8KUALYF','promotion/6.png','/products',0,6,'published','2025-09-11 01:45:53','2025-09-11 01:45:53',1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `ads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ads_translations`
--

DROP TABLE IF EXISTS `ads_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ads_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ads_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tablet_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ads_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ads_translations`
--

LOCK TABLES `ads_translations` WRITE;
/*!40000 ALTER TABLE `ads_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ads_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_histories`
--

DROP TABLE IF EXISTS `audit_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_histories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `user_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'Botble\\ACL\\Models\\User',
  `module` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `request` longtext COLLATE utf8mb4_unicode_ci,
  `action` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actor_id` bigint unsigned NOT NULL,
  `actor_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'Botble\\ACL\\Models\\User',
  `reference_id` bigint unsigned NOT NULL,
  `reference_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `audit_histories_user_id_index` (`user_id`),
  KEY `audit_histories_module_index` (`module`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_histories`
--

LOCK TABLES `audit_histories` WRITE;
/*!40000 ALTER TABLE `audit_histories` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` bigint unsigned NOT NULL DEFAULT '0',
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `author_id` bigint unsigned DEFAULT NULL,
  `author_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Botble\\ACL\\Models\\User',
  `icon` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int unsigned NOT NULL DEFAULT '0',
  `is_featured` tinyint NOT NULL DEFAULT '0',
  `is_default` tinyint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categories_parent_id_index` (`parent_id`),
  KEY `categories_status_index` (`status`),
  KEY `categories_created_at_index` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Ecommerce',0,'Qui quaerat quia consequuntur voluptas explicabo quos. Vitae enim omnis rerum at vel est. Sunt accusantium quaerat velit dolor.','published',1,'Botble\\ACL\\Models\\User',NULL,0,0,1,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(2,'Fashion',0,'Ratione temporibus ut ad error qui sed. Laborum eos maiores necessitatibus voluptatem. Inventore nisi et sequi qui et dolores.','published',1,'Botble\\ACL\\Models\\User',NULL,0,1,0,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(3,'Electronic',0,'Ea accusantium quibusdam veritatis tempore cupiditate. Fuga aliquam cumque fuga ipsum accusantium et eaque. Enim aut nesciunt in aut quia porro. Voluptate omnis ut facere et rem nostrum.','published',1,'Botble\\ACL\\Models\\User',NULL,0,1,0,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(4,'Commercial',0,'Exercitationem aliquid nemo pariatur officiis veniam. Molestias odit id deserunt iure consectetur. Atque aut totam blanditiis necessitatibus. Tenetur magnam veniam mollitia expedita est repellat.','published',1,'Botble\\ACL\\Models\\User',NULL,0,1,0,'2025-09-11 01:45:46','2025-09-11 01:45:46');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories_translations`
--

DROP TABLE IF EXISTS `categories_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categories_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`categories_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_translations`
--

LOCK TABLES `categories_translations` WRITE;
/*!40000 ALTER TABLE `categories_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state_id` bigint unsigned DEFAULT NULL,
  `country_id` bigint unsigned DEFAULT NULL,
  `record_id` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` tinyint NOT NULL DEFAULT '0',
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint unsigned NOT NULL DEFAULT '0',
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `zip_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cities_slug_unique` (`slug`),
  KEY `idx_cities_name` (`name`),
  KEY `idx_cities_state_status` (`state_id`,`status`),
  KEY `idx_cities_status` (`status`),
  KEY `idx_cities_state_id` (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities_translations`
--

DROP TABLE IF EXISTS `cities_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cities_id` bigint unsigned NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`cities_id`),
  KEY `idx_cities_trans_city_lang` (`cities_id`,`lang_code`),
  KEY `idx_cities_trans_name` (`name`),
  KEY `idx_cities_trans_cities_id` (`cities_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities_translations`
--

LOCK TABLES `cities_translations` WRITE;
/*!40000 ALTER TABLE `cities_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `cities_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_custom_field_options`
--

DROP TABLE IF EXISTS `contact_custom_field_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_custom_field_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `custom_field_id` bigint unsigned NOT NULL,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int NOT NULL DEFAULT '999',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_custom_field_options`
--

LOCK TABLES `contact_custom_field_options` WRITE;
/*!40000 ALTER TABLE `contact_custom_field_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_custom_field_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_custom_field_options_translations`
--

DROP TABLE IF EXISTS `contact_custom_field_options_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_custom_field_options_translations` (
  `contact_custom_field_options_id` bigint unsigned NOT NULL,
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`contact_custom_field_options_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_custom_field_options_translations`
--

LOCK TABLES `contact_custom_field_options_translations` WRITE;
/*!40000 ALTER TABLE `contact_custom_field_options_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_custom_field_options_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_custom_fields`
--

DROP TABLE IF EXISTS `contact_custom_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_custom_fields` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `required` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `placeholder` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '999',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_custom_fields`
--

LOCK TABLES `contact_custom_fields` WRITE;
/*!40000 ALTER TABLE `contact_custom_fields` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_custom_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_custom_fields_translations`
--

DROP TABLE IF EXISTS `contact_custom_fields_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_custom_fields_translations` (
  `contact_custom_fields_id` bigint unsigned NOT NULL,
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `placeholder` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`contact_custom_fields_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_custom_fields_translations`
--

LOCK TABLES `contact_custom_fields_translations` WRITE;
/*!40000 ALTER TABLE `contact_custom_fields_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_custom_fields_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_replies`
--

DROP TABLE IF EXISTS `contact_replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_replies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_replies`
--

LOCK TABLES `contact_replies` WRITE;
/*!40000 ALTER TABLE `contact_replies` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `custom_fields` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unread',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nationality` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` tinyint NOT NULL DEFAULT '0',
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint unsigned NOT NULL DEFAULT '0',
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_countries_name` (`name`),
  KEY `idx_countries_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries_translations`
--

DROP TABLE IF EXISTS `countries_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `countries_id` bigint unsigned NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nationality` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`countries_id`),
  KEY `idx_countries_trans_country_lang` (`countries_id`,`lang_code`),
  KEY `idx_countries_trans_name` (`name`),
  KEY `idx_countries_trans_countries_id` (`countries_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries_translations`
--

LOCK TABLES `countries_translations` WRITE;
/*!40000 ALTER TABLE `countries_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `countries_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dashboard_widget_settings`
--

DROP TABLE IF EXISTS `dashboard_widget_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dashboard_widget_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `settings` text COLLATE utf8mb4_unicode_ci,
  `user_id` bigint unsigned NOT NULL,
  `widget_id` bigint unsigned NOT NULL,
  `order` tinyint unsigned NOT NULL DEFAULT '0',
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dashboard_widget_settings_user_id_index` (`user_id`),
  KEY `dashboard_widget_settings_widget_id_index` (`widget_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dashboard_widget_settings`
--

LOCK TABLES `dashboard_widget_settings` WRITE;
/*!40000 ALTER TABLE `dashboard_widget_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `dashboard_widget_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dashboard_widgets`
--

DROP TABLE IF EXISTS `dashboard_widgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dashboard_widgets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dashboard_widgets`
--

LOCK TABLES `dashboard_widgets` WRITE;
/*!40000 ALTER TABLE `dashboard_widgets` DISABLE KEYS */;
/*!40000 ALTER TABLE `dashboard_widgets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_tokens`
--

DROP TABLE IF EXISTS `device_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `platform` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `app_version` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `device_tokens_token_unique` (`token`),
  KEY `device_tokens_user_type_user_id_index` (`user_type`,`user_id`),
  KEY `device_tokens_platform_is_active_index` (`platform`,`is_active`),
  KEY `device_tokens_is_active_index` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_tokens`
--

LOCK TABLES `device_tokens` WRITE;
/*!40000 ALTER TABLE `device_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `device_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_abandoned_carts`
--

DROP TABLE IF EXISTS `ec_abandoned_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_abandoned_carts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned DEFAULT NULL,
  `session_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cart_data` json NOT NULL,
  `total_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `items_count` int NOT NULL DEFAULT '0',
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `abandoned_at` timestamp NULL DEFAULT NULL,
  `reminder_sent_at` timestamp NULL DEFAULT NULL,
  `reminders_sent` int NOT NULL DEFAULT '0',
  `is_recovered` tinyint(1) NOT NULL DEFAULT '0',
  `recovered_at` timestamp NULL DEFAULT NULL,
  `recovered_order_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_abandoned_carts_abandoned_at_is_recovered_index` (`abandoned_at`,`is_recovered`),
  KEY `ec_abandoned_carts_created_at_is_recovered_index` (`created_at`,`is_recovered`),
  KEY `ec_abandoned_carts_customer_id_index` (`customer_id`),
  KEY `ec_abandoned_carts_session_id_index` (`session_id`),
  KEY `ec_abandoned_carts_email_index` (`email`),
  KEY `ec_abandoned_carts_recovered_order_id_index` (`recovered_order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_abandoned_carts`
--

LOCK TABLES `ec_abandoned_carts` WRITE;
/*!40000 ALTER TABLE `ec_abandoned_carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_abandoned_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_brands`
--

DROP TABLE IF EXISTS `ec_brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_brands` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `order` tinyint unsigned NOT NULL DEFAULT '0',
  `is_featured` tinyint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_brands`
--

LOCK TABLES `ec_brands` WRITE;
/*!40000 ALTER TABLE `ec_brands` DISABLE KEYS */;
INSERT INTO `ec_brands` VALUES (1,'Perxsion',NULL,NULL,'brands/1.png','published',0,1,'2025-09-11 01:45:09','2025-09-11 01:45:09'),(2,'Hiching',NULL,NULL,'brands/2.png','published',1,1,'2025-09-11 01:45:09','2025-09-11 01:45:09'),(3,'Kepslo',NULL,NULL,'brands/3.png','published',2,1,'2025-09-11 01:45:09','2025-09-11 01:45:09'),(4,'Groneba',NULL,NULL,'brands/4.png','published',3,1,'2025-09-11 01:45:09','2025-09-11 01:45:09'),(5,'Babian',NULL,NULL,'brands/5.png','published',4,1,'2025-09-11 01:45:09','2025-09-11 01:45:09'),(6,'Valorant',NULL,NULL,'brands/6.png','published',5,1,'2025-09-11 01:45:09','2025-09-11 01:45:09'),(7,'Pure',NULL,NULL,'brands/7.png','published',6,1,'2025-09-11 01:45:09','2025-09-11 01:45:09');
/*!40000 ALTER TABLE `ec_brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_brands_translations`
--

DROP TABLE IF EXISTS `ec_brands_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_brands_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_brands_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`lang_code`,`ec_brands_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_brands_translations`
--

LOCK TABLES `ec_brands_translations` WRITE;
/*!40000 ALTER TABLE `ec_brands_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_brands_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_cart`
--

DROP TABLE IF EXISTS `ec_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_cart` (
  `identifier` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instance` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`identifier`,`instance`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_cart`
--

LOCK TABLES `ec_cart` WRITE;
/*!40000 ALTER TABLE `ec_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_currencies`
--

DROP TABLE IF EXISTS `ec_currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_currencies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `symbol` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_prefix_symbol` tinyint unsigned NOT NULL DEFAULT '0',
  `decimals` tinyint unsigned DEFAULT '0',
  `order` int unsigned DEFAULT '0',
  `is_default` tinyint NOT NULL DEFAULT '0',
  `exchange_rate` double NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_currencies`
--

LOCK TABLES `ec_currencies` WRITE;
/*!40000 ALTER TABLE `ec_currencies` DISABLE KEYS */;
INSERT INTO `ec_currencies` VALUES (1,'USD','$',1,2,0,1,1,'2025-09-11 01:45:09','2025-09-11 01:45:09'),(2,'EUR','€',0,2,1,0,0.84,'2025-09-11 01:45:09','2025-09-11 01:45:09'),(3,'VND','₫',0,0,2,0,23203,'2025-09-11 01:45:09','2025-09-11 01:45:09'),(4,'NGN','₦',1,2,2,0,895.52,'2025-09-11 01:45:09','2025-09-11 01:45:09');
/*!40000 ALTER TABLE `ec_currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_customer_addresses`
--

DROP TABLE IF EXISTS `ec_customer_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_customer_addresses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_id` bigint unsigned NOT NULL,
  `is_default` tinyint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `zip_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_customer_addresses`
--

LOCK TABLES `ec_customer_addresses` WRITE;
/*!40000 ALTER TABLE `ec_customer_addresses` DISABLE KEYS */;
INSERT INTO `ec_customer_addresses` VALUES (1,'Harley Lang IV','john.smith@botble.com','+12522518219','TD','District of Columbia','East Makenna','9868 Medhurst Hill',1,1,'2025-09-11 01:45:33','2025-09-11 01:45:33','42405-7525'),(2,'Harley Lang IV','john.smith@botble.com','+19842831604','PH','Maryland','Hamillmouth','2736 Jaydon Forest',1,0,'2025-09-11 01:45:33','2025-09-11 01:45:33','38868-5931'),(3,'Dr. Jeff Eichmann','customer@botble.com','+18308621001','SH','Rhode Island','Jayneside','897 Funk Ridge Apt. 192',2,1,'2025-09-11 01:45:34','2025-09-11 01:45:34','10808'),(4,'Dr. Jeff Eichmann','customer@botble.com','+15759081422','SO','Montana','Port Maximemouth','73526 Mustafa Mall Apt. 743',2,0,'2025-09-11 01:45:34','2025-09-11 01:45:34','46626-2590'),(5,'Prof. Jaylen Trantow','vrolfson@example.net','+18643902083','PH','Montana','Mckaylaport','7259 Myra Plain',3,1,'2025-09-11 01:45:35','2025-09-11 01:45:35','37687-1911'),(6,'Audreanne Stroman','trevor09@example.net','+17259596899','LY','Connecticut','Hamillton','2060 Feest Canyon Apt. 349',4,1,'2025-09-11 01:45:35','2025-09-11 01:45:35','85984'),(7,'Tamia Legros','rbalistreri@example.org','+18595711203','ZW','Mississippi','East Donview','513 Ullrich Stream',5,1,'2025-09-11 01:45:36','2025-09-11 01:45:36','29614'),(8,'Violet Hills','opal54@example.com','+19286396515','PY','New Hampshire','North Gilbert','311 Sigmund Road',6,1,'2025-09-11 01:45:36','2025-09-11 01:45:36','54761'),(9,'Berneice Steuber','cristian90@example.net','+19704341449','NI','New York','Veronicaview','158 Marilou Drives Apt. 164',7,1,'2025-09-11 01:45:37','2025-09-11 01:45:37','59512-0845'),(10,'Stephen Heller','gottlieb.trycia@example.com','+17636885675','MN','Tennessee','Carterfort','59389 Abernathy Port',8,1,'2025-09-11 01:45:37','2025-09-11 01:45:37','73649-0461'),(11,'Cali Schultz DVM','leo.hermann@example.com','+13305240587','GN','Nebraska','DuBuqueland','9378 Estella Field',9,1,'2025-09-11 01:45:38','2025-09-11 01:45:38','35859'),(12,'Alex Schroeder','jaskolski.chanelle@example.com','+12099020334','GG','New York','Caramouth','69498 Mosciski Viaduct',10,1,'2025-09-11 01:45:38','2025-09-11 01:45:38','70442');
/*!40000 ALTER TABLE `ec_customer_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_customer_deletion_requests`
--

DROP TABLE IF EXISTS `ec_customer_deletion_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_customer_deletion_requests` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `customer_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'waiting_for_confirmation',
  `reason` text COLLATE utf8mb4_unicode_ci,
  `confirmed_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ec_customer_deletion_requests_token_unique` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_customer_deletion_requests`
--

LOCK TABLES `ec_customer_deletion_requests` WRITE;
/*!40000 ALTER TABLE `ec_customer_deletion_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_customer_deletion_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_customer_password_resets`
--

DROP TABLE IF EXISTS `ec_customer_password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_customer_password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `ec_customer_password_resets_email_index` (`email`),
  KEY `ec_customer_password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_customer_password_resets`
--

LOCK TABLES `ec_customer_password_resets` WRITE;
/*!40000 ALTER TABLE `ec_customer_password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_customer_password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_customer_recently_viewed_products`
--

DROP TABLE IF EXISTS `ec_customer_recently_viewed_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_customer_recently_viewed_products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_customer_recently_viewed_products`
--

LOCK TABLES `ec_customer_recently_viewed_products` WRITE;
/*!40000 ALTER TABLE `ec_customer_recently_viewed_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_customer_recently_viewed_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_customer_used_coupons`
--

DROP TABLE IF EXISTS `ec_customer_used_coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_customer_used_coupons` (
  `discount_id` bigint unsigned NOT NULL,
  `customer_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`discount_id`,`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_customer_used_coupons`
--

LOCK TABLES `ec_customer_used_coupons` WRITE;
/*!40000 ALTER TABLE `ec_customer_used_coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_customer_used_coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_customers`
--

DROP TABLE IF EXISTS `ec_customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_customers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `email_verify_token` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'activated',
  `private_notes` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_customers`
--

LOCK TABLES `ec_customers` WRITE;
/*!40000 ALTER TABLE `ec_customers` DISABLE KEYS */;
INSERT INTO `ec_customers` VALUES (1,'Harley Lang IV','john.smith@botble.com','$2y$12$mX3cMPDLVkgAUrD/Q9yYCeejX3KccY.y049TbTqGdsctn8pt8erO.','customers/3.jpg','1985-08-16','+19599444671',NULL,'2025-09-11 01:45:33','2025-09-11 01:45:33','2025-09-11 08:45:33',NULL,'activated',NULL),(2,'Dr. Jeff Eichmann','customer@botble.com','$2y$12$37H0bmKGLdE..w7aacAsYeq2e5TGOJ9Uk1ZnpXV01xBVJke70HO/G','customers/5.jpg','2003-09-08','+15516715836',NULL,'2025-09-11 01:45:34','2025-09-11 01:45:34','2025-09-11 08:45:34',NULL,'activated',NULL),(3,'Prof. Jaylen Trantow','vrolfson@example.net','$2y$12$nlkdKIlWtR4kZkQ5PF11LehQy1EuoH4c1evXfsxGNsT4z0Atzl5G6','customers/1.jpg','1994-08-16','+13856537261',NULL,'2025-09-11 01:45:35','2025-09-11 01:45:35','2025-09-11 08:45:35',NULL,'activated',NULL),(4,'Audreanne Stroman','trevor09@example.net','$2y$12$QWvWAzw/svlczmKJ2ULIWegJ4Rmr6lwQy3lPUb/YynV8rXQqfNahy','customers/2.jpg','2003-09-02','+14359756110',NULL,'2025-09-11 01:45:35','2025-09-11 01:45:35','2025-09-11 08:45:35',NULL,'activated',NULL),(5,'Tamia Legros','rbalistreri@example.org','$2y$12$N/AG6UYHnn6T.zs7YFrgdeRYO6/DmJV/gT2wi/TEpXmr.gnxo4z96','customers/3.jpg','2004-09-10','+15737258372',NULL,'2025-09-11 01:45:36','2025-09-11 01:45:36','2025-09-11 08:45:36',NULL,'activated',NULL),(6,'Violet Hills','opal54@example.com','$2y$12$D1fVFZ1Tevc2DDezAgx48.6G0PnOHmf3eEr00panJ2.V2nXFtLzDi','customers/4.jpg','1989-08-18','+17046366251',NULL,'2025-09-11 01:45:36','2025-09-11 01:45:36','2025-09-11 08:45:36',NULL,'activated',NULL),(7,'Berneice Steuber','cristian90@example.net','$2y$12$0zu1NH06VP4Tzra1Yl.g4eW5ezbO/.xOPaLFLu3.qWZ6ax/8b52B6','customers/5.jpg','1976-09-08','+15132586405',NULL,'2025-09-11 01:45:37','2025-09-11 01:45:37','2025-09-11 08:45:37',NULL,'activated',NULL),(8,'Stephen Heller','gottlieb.trycia@example.com','$2y$12$n3ka.1ll.H2ti8Ww1C0M2.sA4zLOhGaIAXDAB7qo/aTTtx5eH9WRG','customers/6.jpg','1990-08-22','+16367025625',NULL,'2025-09-11 01:45:37','2025-09-11 01:45:37','2025-09-11 08:45:37',NULL,'activated',NULL),(9,'Cali Schultz DVM','leo.hermann@example.com','$2y$12$TUR1CVUAmkWn/6NCzm89ze7X/X56zBqVZ.d16kMSlmPiq05/beBRO','customers/7.jpg','2002-08-23','+15083848691',NULL,'2025-09-11 01:45:38','2025-09-11 01:45:38','2025-09-11 08:45:38',NULL,'activated',NULL),(10,'Alex Schroeder','jaskolski.chanelle@example.com','$2y$12$zxmSSGPToAt/AGnDqzksU.0WponHG96HzhSAMqBePQ1x0sWusk2oe','customers/8.jpg','1996-08-25','+16608342125',NULL,'2025-09-11 01:45:38','2025-09-11 01:45:38','2025-09-11 08:45:38',NULL,'activated',NULL);
/*!40000 ALTER TABLE `ec_customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_discount_customers`
--

DROP TABLE IF EXISTS `ec_discount_customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_discount_customers` (
  `discount_id` bigint unsigned NOT NULL,
  `customer_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`discount_id`,`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_discount_customers`
--

LOCK TABLES `ec_discount_customers` WRITE;
/*!40000 ALTER TABLE `ec_discount_customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_discount_customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_discount_product_categories`
--

DROP TABLE IF EXISTS `ec_discount_product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_discount_product_categories` (
  `discount_id` bigint unsigned NOT NULL,
  `product_category_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`discount_id`,`product_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_discount_product_categories`
--

LOCK TABLES `ec_discount_product_categories` WRITE;
/*!40000 ALTER TABLE `ec_discount_product_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_discount_product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_discount_product_collections`
--

DROP TABLE IF EXISTS `ec_discount_product_collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_discount_product_collections` (
  `discount_id` bigint unsigned NOT NULL,
  `product_collection_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`discount_id`,`product_collection_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_discount_product_collections`
--

LOCK TABLES `ec_discount_product_collections` WRITE;
/*!40000 ALTER TABLE `ec_discount_product_collections` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_discount_product_collections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_discount_products`
--

DROP TABLE IF EXISTS `ec_discount_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_discount_products` (
  `discount_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`discount_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_discount_products`
--

LOCK TABLES `ec_discount_products` WRITE;
/*!40000 ALTER TABLE `ec_discount_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_discount_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_discounts`
--

DROP TABLE IF EXISTS `ec_discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_discounts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `total_used` int unsigned NOT NULL DEFAULT '0',
  `value` double DEFAULT NULL,
  `type` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT 'coupon',
  `can_use_with_promotion` tinyint(1) NOT NULL DEFAULT '0',
  `can_use_with_flash_sale` tinyint(1) NOT NULL DEFAULT '0',
  `discount_on` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_quantity` int unsigned DEFAULT NULL,
  `type_option` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'amount',
  `target` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'all-orders',
  `min_order_price` decimal(15,2) DEFAULT NULL,
  `apply_via_url` tinyint(1) NOT NULL DEFAULT '0',
  `display_at_checkout` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ec_discounts_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_discounts`
--

LOCK TABLES `ec_discounts` WRITE;
/*!40000 ALTER TABLE `ec_discounts` DISABLE KEYS */;
INSERT INTO `ec_discounts` VALUES (1,'Discount 1','9LVR3S4GQYAP','2025-09-10 08:45:40','2025-09-12 08:45:40',NULL,0,129,'coupon',0,0,NULL,NULL,'shipping','all-orders',NULL,0,1,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL),(2,'Discount 2','LMXFRMDKG12P','2025-09-10 08:45:40',NULL,NULL,0,861,'coupon',0,0,NULL,NULL,'shipping','all-orders',NULL,0,1,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL),(3,'Discount 3','0W8ZRCF5Q6EV','2025-09-10 08:45:40',NULL,NULL,0,681,'coupon',0,0,NULL,NULL,'amount','all-orders',NULL,0,1,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL),(4,'Discount 4','AWWPT8OPPWOK','2025-09-10 08:45:40','2025-09-18 08:45:40',NULL,0,627,'coupon',0,0,NULL,NULL,'same-price','all-orders',NULL,0,1,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL),(5,'Discount 5','PRIP9COAU6DJ','2025-09-10 08:45:40',NULL,NULL,0,78,'coupon',0,0,NULL,NULL,'same-price','all-orders',NULL,0,1,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL),(6,'Discount 6','DW4W1OY379T1','2025-09-10 08:45:40','2025-10-08 08:45:40',NULL,0,270,'coupon',0,0,NULL,NULL,'same-price','all-orders',NULL,0,1,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL),(7,'Discount 7','IFXMK7A23THJ','2025-09-10 08:45:40',NULL,NULL,0,580,'coupon',0,0,NULL,NULL,'amount','all-orders',NULL,0,1,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL),(8,'Discount 8','QXZMLOWBPBN0','2025-09-10 08:45:40','2025-09-25 08:45:40',NULL,0,845,'coupon',0,0,NULL,NULL,'amount','all-orders',NULL,0,1,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL),(9,'Discount 9','VB3VQSXJI3CQ','2025-09-10 08:45:40','2025-10-05 08:45:40',NULL,0,902,'coupon',0,0,NULL,NULL,'amount','all-orders',NULL,0,1,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL),(10,'Discount 10','X8X1KYUG2ZG5','2025-09-10 08:45:40',NULL,NULL,0,296,'coupon',0,0,NULL,NULL,'same-price','all-orders',NULL,0,1,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL);
/*!40000 ALTER TABLE `ec_discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_flash_sale_products`
--

DROP TABLE IF EXISTS `ec_flash_sale_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_flash_sale_products` (
  `flash_sale_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `price` double unsigned DEFAULT NULL,
  `quantity` int unsigned DEFAULT NULL,
  `sold` int unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_flash_sale_products`
--

LOCK TABLES `ec_flash_sale_products` WRITE;
/*!40000 ALTER TABLE `ec_flash_sale_products` DISABLE KEYS */;
INSERT INTO `ec_flash_sale_products` VALUES (1,22,414.4,7,1),(2,5,609.93,12,1);
/*!40000 ALTER TABLE `ec_flash_sale_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_flash_sales`
--

DROP TABLE IF EXISTS `ec_flash_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_flash_sales` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_date` datetime NOT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_flash_sales`
--

LOCK TABLES `ec_flash_sales` WRITE;
/*!40000 ALTER TABLE `ec_flash_sales` DISABLE KEYS */;
INSERT INTO `ec_flash_sales` VALUES (1,'Deal of the Day.','2025-10-08 00:00:00','published','2025-09-11 01:45:40','2025-09-11 01:45:40'),(2,'Gadgets &amp; Accessories','2025-10-05 00:00:00','published','2025-09-11 01:45:40','2025-09-11 01:45:40');
/*!40000 ALTER TABLE `ec_flash_sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_flash_sales_translations`
--

DROP TABLE IF EXISTS `ec_flash_sales_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_flash_sales_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_flash_sales_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_flash_sales_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_flash_sales_translations`
--

LOCK TABLES `ec_flash_sales_translations` WRITE;
/*!40000 ALTER TABLE `ec_flash_sales_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_flash_sales_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_global_option_value`
--

DROP TABLE IF EXISTS `ec_global_option_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_global_option_value` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `option_id` bigint unsigned NOT NULL COMMENT 'option id',
  `option_value` tinytext COLLATE utf8mb4_unicode_ci COMMENT 'option value',
  `affect_price` double DEFAULT NULL COMMENT 'value of price of this option affect',
  `order` int NOT NULL DEFAULT '9999',
  `affect_type` tinyint NOT NULL DEFAULT '0' COMMENT '0. fixed 1. percent',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_global_option_value`
--

LOCK TABLES `ec_global_option_value` WRITE;
/*!40000 ALTER TABLE `ec_global_option_value` DISABLE KEYS */;
INSERT INTO `ec_global_option_value` VALUES (1,1,'1 Year',0,9999,0,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(2,1,'2 Year',10,9999,0,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(3,1,'3 Year',20,9999,0,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(4,2,'4GB',0,9999,0,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(5,2,'8GB',10,9999,0,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(6,2,'16GB',20,9999,0,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(7,3,'Core i5',0,9999,0,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(8,3,'Core i7',10,9999,0,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(9,3,'Core i9',20,9999,0,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(10,4,'128GB',0,9999,0,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(11,4,'256GB',10,9999,0,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(12,4,'512GB',20,9999,0,'2025-09-11 01:45:40','2025-09-11 01:45:40');
/*!40000 ALTER TABLE `ec_global_option_value` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_global_option_value_translations`
--

DROP TABLE IF EXISTS `ec_global_option_value_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_global_option_value_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_global_option_value_id` bigint unsigned NOT NULL,
  `option_value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_global_option_value_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_global_option_value_translations`
--

LOCK TABLES `ec_global_option_value_translations` WRITE;
/*!40000 ALTER TABLE `ec_global_option_value_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_global_option_value_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_global_options`
--

DROP TABLE IF EXISTS `ec_global_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_global_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Name of options',
  `option_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'option type',
  `required` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Checked if this option is required',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_global_options`
--

LOCK TABLES `ec_global_options` WRITE;
/*!40000 ALTER TABLE `ec_global_options` DISABLE KEYS */;
INSERT INTO `ec_global_options` VALUES (1,'Warranty','Botble\\Ecommerce\\Option\\OptionType\\RadioButton',1,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(2,'RAM','Botble\\Ecommerce\\Option\\OptionType\\RadioButton',1,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(3,'CPU','Botble\\Ecommerce\\Option\\OptionType\\RadioButton',1,'2025-09-11 01:45:40','2025-09-11 01:45:40'),(4,'HDD','Botble\\Ecommerce\\Option\\OptionType\\Dropdown',0,'2025-09-11 01:45:40','2025-09-11 01:45:40');
/*!40000 ALTER TABLE `ec_global_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_global_options_translations`
--

DROP TABLE IF EXISTS `ec_global_options_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_global_options_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_global_options_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_global_options_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_global_options_translations`
--

LOCK TABLES `ec_global_options_translations` WRITE;
/*!40000 ALTER TABLE `ec_global_options_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_global_options_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_grouped_products`
--

DROP TABLE IF EXISTS `ec_grouped_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_grouped_products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `parent_product_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `fixed_qty` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_grouped_products`
--

LOCK TABLES `ec_grouped_products` WRITE;
/*!40000 ALTER TABLE `ec_grouped_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_grouped_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_invoice_items`
--

DROP TABLE IF EXISTS `ec_invoice_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_invoice_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint unsigned NOT NULL,
  `reference_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qty` int unsigned NOT NULL,
  `price` decimal(15,2) NOT NULL DEFAULT '0.00',
  `sub_total` decimal(15,2) unsigned NOT NULL,
  `tax_amount` decimal(15,2) unsigned NOT NULL DEFAULT '0.00',
  `discount_amount` decimal(15,2) unsigned NOT NULL DEFAULT '0.00',
  `amount` decimal(15,2) unsigned NOT NULL,
  `options` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_invoice_items_reference_type_reference_id_index` (`reference_type`,`reference_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_invoice_items`
--

LOCK TABLES `ec_invoice_items` WRITE;
/*!40000 ALTER TABLE `ec_invoice_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_invoice_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_invoices`
--

DROP TABLE IF EXISTS `ec_invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_invoices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `reference_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference_id` bigint unsigned NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_zip_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_address_line` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_tax_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_total` decimal(15,2) unsigned NOT NULL,
  `tax_amount` decimal(15,2) DEFAULT '0.00',
  `shipping_amount` decimal(15,2) unsigned NOT NULL DEFAULT '0.00',
  `payment_fee` decimal(15,2) DEFAULT '0.00',
  `discount_amount` decimal(15,2) unsigned NOT NULL DEFAULT '0.00',
  `shipping_option` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_method` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
  `coupon_code` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount_description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(15,2) unsigned NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `payment_id` bigint unsigned DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ec_invoices_code_unique` (`code`),
  KEY `ec_invoices_reference_type_reference_id_index` (`reference_type`,`reference_id`),
  KEY `ec_invoices_payment_id_index` (`payment_id`),
  KEY `ec_invoices_status_index` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_invoices`
--

LOCK TABLES `ec_invoices` WRITE;
/*!40000 ALTER TABLE `ec_invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_option_value`
--

DROP TABLE IF EXISTS `ec_option_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_option_value` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `option_id` bigint unsigned NOT NULL COMMENT 'option id',
  `option_value` tinytext COLLATE utf8mb4_unicode_ci COMMENT 'option value',
  `affect_price` double DEFAULT NULL COMMENT 'value of price of this option affect',
  `order` int NOT NULL DEFAULT '9999',
  `affect_type` tinyint NOT NULL DEFAULT '0' COMMENT '0. fixed 1. percent',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_option_value`
--

LOCK TABLES `ec_option_value` WRITE;
/*!40000 ALTER TABLE `ec_option_value` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_option_value` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_option_value_translations`
--

DROP TABLE IF EXISTS `ec_option_value_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_option_value_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_option_value_id` bigint unsigned NOT NULL,
  `option_value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_option_value_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_option_value_translations`
--

LOCK TABLES `ec_option_value_translations` WRITE;
/*!40000 ALTER TABLE `ec_option_value_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_option_value_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_options`
--

DROP TABLE IF EXISTS `ec_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Name of options',
  `option_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'option type',
  `product_id` bigint unsigned NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '9999',
  `required` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Checked if this option is required',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_options`
--

LOCK TABLES `ec_options` WRITE;
/*!40000 ALTER TABLE `ec_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_options_translations`
--

DROP TABLE IF EXISTS `ec_options_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_options_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_options_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_options_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_options_translations`
--

LOCK TABLES `ec_options_translations` WRITE;
/*!40000 ALTER TABLE `ec_options_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_options_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_order_addresses`
--

DROP TABLE IF EXISTS `ec_order_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_order_addresses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_id` bigint unsigned NOT NULL,
  `zip_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'shipping_address',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_order_addresses`
--

LOCK TABLES `ec_order_addresses` WRITE;
/*!40000 ALTER TABLE `ec_order_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_order_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_order_histories`
--

DROP TABLE IF EXISTS `ec_order_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_order_histories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `order_id` bigint unsigned NOT NULL,
  `extras` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_order_histories`
--

LOCK TABLES `ec_order_histories` WRITE;
/*!40000 ALTER TABLE `ec_order_histories` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_order_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_order_product`
--

DROP TABLE IF EXISTS `ec_order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_order_product` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `qty` int NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `tax_amount` decimal(15,2) DEFAULT '0.00',
  `options` text COLLATE utf8mb4_unicode_ci,
  `product_options` text COLLATE utf8mb4_unicode_ci COMMENT 'product option data',
  `product_id` bigint unsigned DEFAULT NULL,
  `product_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight` double DEFAULT '0',
  `restock_quantity` int unsigned DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `product_type` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'physical',
  `times_downloaded` int NOT NULL DEFAULT '0',
  `license_code` text COLLATE utf8mb4_unicode_ci,
  `downloaded_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_order_product`
--

LOCK TABLES `ec_order_product` WRITE;
/*!40000 ALTER TABLE `ec_order_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_order_referrals`
--

DROP TABLE IF EXISTS `ec_order_referrals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_order_referrals` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ip` varchar(39) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `landing_domain` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `landing_page` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `landing_params` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referral` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gclid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fclid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utm_source` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utm_campaign` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utm_medium` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utm_term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `utm_content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referrer_url` text COLLATE utf8mb4_unicode_ci,
  `referrer_domain` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_order_referrals_order_id_index` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_order_referrals`
--

LOCK TABLES `ec_order_referrals` WRITE;
/*!40000 ALTER TABLE `ec_order_referrals` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_order_referrals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_order_return_histories`
--

DROP TABLE IF EXISTS `ec_order_return_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_order_return_histories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `order_return_id` bigint unsigned NOT NULL,
  `action` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_order_return_histories`
--

LOCK TABLES `ec_order_return_histories` WRITE;
/*!40000 ALTER TABLE `ec_order_return_histories` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_order_return_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_order_return_items`
--

DROP TABLE IF EXISTS `ec_order_return_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_order_return_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_return_id` bigint unsigned NOT NULL COMMENT 'Order return id',
  `order_product_id` bigint unsigned NOT NULL COMMENT 'Order product id',
  `product_id` bigint unsigned NOT NULL COMMENT 'Product id',
  `product_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qty` int NOT NULL COMMENT 'Quantity return',
  `price` decimal(15,2) NOT NULL COMMENT 'Price Product',
  `reason` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `refund_amount` decimal(12,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_order_return_items`
--

LOCK TABLES `ec_order_return_items` WRITE;
/*!40000 ALTER TABLE `ec_order_return_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_order_return_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_order_returns`
--

DROP TABLE IF EXISTS `ec_order_returns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_order_returns` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_id` bigint unsigned NOT NULL COMMENT 'Order ID',
  `store_id` bigint unsigned DEFAULT NULL COMMENT 'Store ID',
  `user_id` bigint unsigned NOT NULL COMMENT 'Customer ID',
  `reason` text COLLATE utf8mb4_unicode_ci COMMENT 'Reason return order',
  `order_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Order current status',
  `return_status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Return status',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ec_order_returns_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_order_returns`
--

LOCK TABLES `ec_order_returns` WRITE;
/*!40000 ALTER TABLE `ec_order_returns` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_order_returns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_order_tax_information`
--

DROP TABLE IF EXISTS `ec_order_tax_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_order_tax_information` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `company_name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_tax_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_order_tax_information_order_id_index` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_order_tax_information`
--

LOCK TABLES `ec_order_tax_information` WRITE;
/*!40000 ALTER TABLE `ec_order_tax_information` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_order_tax_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_orders`
--

DROP TABLE IF EXISTS `ec_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `shipping_option` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_method` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
  `status` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `amount` decimal(15,2) NOT NULL,
  `tax_amount` decimal(15,2) DEFAULT '0.00',
  `shipping_amount` decimal(15,2) DEFAULT NULL,
  `payment_fee` decimal(15,2) DEFAULT '0.00',
  `description` text COLLATE utf8mb4_unicode_ci,
  `coupon_code` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount_amount` decimal(15,2) DEFAULT NULL,
  `sub_total` decimal(15,2) NOT NULL,
  `is_confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `discount_description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_finished` tinyint(1) DEFAULT '0',
  `cancellation_reason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cancellation_reason_description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `token` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `proof_file` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `private_notes` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ec_orders_code_unique` (`code`),
  KEY `ec_orders_user_id_status_created_at_index` (`user_id`,`status`,`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_orders`
--

LOCK TABLES `ec_orders` WRITE;
/*!40000 ALTER TABLE `ec_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_attribute_sets`
--

DROP TABLE IF EXISTS `ec_product_attribute_sets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_attribute_sets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_layout` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'dropdown',
  `is_searchable` tinyint unsigned NOT NULL DEFAULT '1',
  `is_comparable` tinyint unsigned NOT NULL DEFAULT '1',
  `is_use_in_product_listing` tinyint unsigned NOT NULL DEFAULT '0',
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `order` tinyint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `use_image_from_product_variation` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order`,`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_attribute_sets`
--

LOCK TABLES `ec_product_attribute_sets` WRITE;
/*!40000 ALTER TABLE `ec_product_attribute_sets` DISABLE KEYS */;
INSERT INTO `ec_product_attribute_sets` VALUES (1,'Color','color','visual',1,1,1,'published',0,'2025-09-11 01:45:11','2025-09-11 01:45:11',0),(2,'Size','size','text',1,1,1,'published',1,'2025-09-11 01:45:11','2025-09-11 01:45:11',0);
/*!40000 ALTER TABLE `ec_product_attribute_sets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_attribute_sets_translations`
--

DROP TABLE IF EXISTS `ec_product_attribute_sets_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_attribute_sets_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_product_attribute_sets_id` bigint unsigned NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_product_attribute_sets_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_attribute_sets_translations`
--

LOCK TABLES `ec_product_attribute_sets_translations` WRITE;
/*!40000 ALTER TABLE `ec_product_attribute_sets_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_attribute_sets_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_attributes`
--

DROP TABLE IF EXISTS `ec_product_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_attributes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `attribute_set_id` bigint unsigned NOT NULL,
  `title` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint unsigned NOT NULL DEFAULT '0',
  `order` tinyint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attribute_set_status_index` (`attribute_set_id`),
  KEY `idx_attribute_set_id` (`attribute_set_id`),
  KEY `idx_attribute_set_order_id` (`attribute_set_id`,`order`,`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_attributes`
--

LOCK TABLES `ec_product_attributes` WRITE;
/*!40000 ALTER TABLE `ec_product_attributes` DISABLE KEYS */;
INSERT INTO `ec_product_attributes` VALUES (1,1,'Green','green','#5FB7D4',NULL,1,1,'2025-09-11 01:45:11','2025-09-11 01:45:11'),(2,1,'Blue','blue','#333333',NULL,0,2,'2025-09-11 01:45:11','2025-09-11 01:45:11'),(3,1,'Red','red','#DA323F',NULL,0,3,'2025-09-11 01:45:11','2025-09-11 01:45:11'),(4,1,'Black','black','#2F366C',NULL,0,4,'2025-09-11 01:45:11','2025-09-11 01:45:11'),(5,1,'Brown','brown','#87554B',NULL,0,5,'2025-09-11 01:45:11','2025-09-11 01:45:11'),(6,2,'S','s',NULL,NULL,1,1,'2025-09-11 01:45:11','2025-09-11 01:45:11'),(7,2,'M','m',NULL,NULL,0,2,'2025-09-11 01:45:11','2025-09-11 01:45:11'),(8,2,'L','l',NULL,NULL,0,3,'2025-09-11 01:45:11','2025-09-11 01:45:11'),(9,2,'XL','xl',NULL,NULL,0,4,'2025-09-11 01:45:11','2025-09-11 01:45:11'),(10,2,'XXL','xxl',NULL,NULL,0,5,'2025-09-11 01:45:11','2025-09-11 01:45:11');
/*!40000 ALTER TABLE `ec_product_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_attributes_translations`
--

DROP TABLE IF EXISTS `ec_product_attributes_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_attributes_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_product_attributes_id` bigint unsigned NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_product_attributes_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_attributes_translations`
--

LOCK TABLES `ec_product_attributes_translations` WRITE;
/*!40000 ALTER TABLE `ec_product_attributes_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_attributes_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_categories`
--

DROP TABLE IF EXISTS `ec_product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` bigint unsigned NOT NULL DEFAULT '0',
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `order` int unsigned NOT NULL DEFAULT '0',
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_featured` tinyint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_product_categories_parent_id_status_created_at_index` (`parent_id`,`status`,`created_at`),
  KEY `ec_product_categories_parent_id_status_index` (`parent_id`,`status`),
  KEY `idx_categories_status_order` (`status`,`order`),
  KEY `idx_categories_order` (`order`),
  KEY `ec_product_categories_slug_index` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_categories`
--

LOCK TABLES `ec_product_categories` WRITE;
/*!40000 ALTER TABLE `ec_product_categories` DISABLE KEYS */;
INSERT INTO `ec_product_categories` VALUES (1,'Hot Promotions',NULL,0,NULL,'published',0,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10','far fa-star',NULL),(2,'Electronics',NULL,0,NULL,'published',1,'product-categories/1.jpg',1,'2025-09-11 01:45:10','2025-09-11 01:45:10','wowy-font-cpu',NULL),(3,'Home Audio & Theaters',NULL,2,NULL,'published',0,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,NULL),(4,'TV & Videos',NULL,2,NULL,'published',1,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,NULL),(5,'Camera, Photos & Videos',NULL,2,NULL,'published',2,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,NULL),(6,'Cellphones & Accessories',NULL,2,NULL,'published',3,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,NULL),(7,'Headphones',NULL,2,NULL,'published',4,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,NULL),(8,'Videos games',NULL,2,NULL,'published',5,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,NULL),(9,'Wireless Speakers',NULL,2,NULL,'published',6,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,NULL),(10,'Office Electronic',NULL,2,NULL,'published',7,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,NULL),(11,'Clothing',NULL,0,NULL,'published',2,'product-categories/2.jpg',1,'2025-09-11 01:45:10','2025-09-11 01:45:10','wowy-font-tshirt',NULL),(12,'Computers',NULL,0,NULL,'published',3,'product-categories/3.jpg',1,'2025-09-11 01:45:10','2025-09-11 01:45:10','wowy-font-desktop',NULL),(13,'Computer & Tablets',NULL,12,NULL,'published',0,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,NULL),(14,'Laptop',NULL,12,NULL,'published',1,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,NULL),(15,'Monitors',NULL,12,NULL,'published',2,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,NULL),(16,'Computer Components',NULL,12,NULL,'published',3,NULL,0,'2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,NULL),(17,'Home & Kitchen',NULL,0,NULL,'published',4,'product-categories/4.jpg',1,'2025-09-11 01:45:10','2025-09-11 01:45:10','wowy-font-home',NULL),(18,'Health & Beauty',NULL,0,NULL,'published',5,'product-categories/5.jpg',1,'2025-09-11 01:45:10','2025-09-11 01:45:10','wowy-font-dress',NULL),(19,'Jewelry & Watch',NULL,0,NULL,'published',6,'product-categories/6.jpg',1,'2025-09-11 01:45:11','2025-09-11 01:45:11','wowy-font-diamond',NULL),(20,'Technology Toys',NULL,0,NULL,'published',7,'product-categories/7.jpg',1,'2025-09-11 01:45:11','2025-09-11 01:45:11','far fa-microchip',NULL),(21,'Drive & Storages',NULL,20,NULL,'published',0,NULL,0,'2025-09-11 01:45:11','2025-09-11 01:45:11',NULL,NULL),(22,'Gaming Laptop',NULL,20,NULL,'published',1,NULL,0,'2025-09-11 01:45:11','2025-09-11 01:45:11',NULL,NULL),(23,'Security & Protection',NULL,20,NULL,'published',2,NULL,0,'2025-09-11 01:45:11','2025-09-11 01:45:11',NULL,NULL),(24,'Accessories',NULL,20,NULL,'published',3,NULL,0,'2025-09-11 01:45:11','2025-09-11 01:45:11',NULL,NULL),(25,'Phones',NULL,0,NULL,'published',8,'product-categories/8.jpg',1,'2025-09-11 01:45:11','2025-09-11 01:45:11','wowy-font-smartphone',NULL),(26,'Babies & Moms',NULL,0,NULL,'published',9,NULL,0,'2025-09-11 01:45:11','2025-09-11 01:45:11','wowy-font-teddy-bear',NULL),(27,'Sport & Outdoor',NULL,0,NULL,'published',10,NULL,0,'2025-09-11 01:45:11','2025-09-11 01:45:11','wowy-font-kite',NULL),(28,'Books & Office',NULL,0,NULL,'published',11,NULL,0,'2025-09-11 01:45:11','2025-09-11 01:45:11','far fa-book',NULL),(29,'Cars & Motorcycles',NULL,0,NULL,'published',12,NULL,0,'2025-09-11 01:45:11','2025-09-11 01:45:11','far fa-car',NULL),(30,'Home Improvements',NULL,0,NULL,'published',13,NULL,0,'2025-09-11 01:45:11','2025-09-11 01:45:11','wowy-font-home',NULL);
/*!40000 ALTER TABLE `ec_product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_categories_translations`
--

DROP TABLE IF EXISTS `ec_product_categories_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_categories_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_product_categories_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`lang_code`,`ec_product_categories_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_categories_translations`
--

LOCK TABLES `ec_product_categories_translations` WRITE;
/*!40000 ALTER TABLE `ec_product_categories_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_categories_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_categorizables`
--

DROP TABLE IF EXISTS `ec_product_categorizables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_categorizables` (
  `category_id` bigint unsigned NOT NULL,
  `reference_id` bigint unsigned NOT NULL,
  `reference_type` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`,`reference_id`,`reference_type`),
  KEY `ec_product_categorizables_category_id_index` (`category_id`),
  KEY `ec_product_categorizables_reference_id_index` (`reference_id`),
  KEY `ec_product_categorizables_reference_type_index` (`reference_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_categorizables`
--

LOCK TABLES `ec_product_categorizables` WRITE;
/*!40000 ALTER TABLE `ec_product_categorizables` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_categorizables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_category_product`
--

DROP TABLE IF EXISTS `ec_product_category_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_category_product` (
  `category_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`product_id`,`category_id`),
  KEY `ec_product_category_product_category_id_index` (`category_id`),
  KEY `ec_product_category_product_product_id_index` (`product_id`),
  KEY `idx_product_category` (`product_id`,`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_category_product`
--

LOCK TABLES `ec_product_category_product` WRITE;
/*!40000 ALTER TABLE `ec_product_category_product` DISABLE KEYS */;
INSERT INTO `ec_product_category_product` VALUES (1,4),(1,6),(1,8),(1,17),(1,21),(2,15),(2,18),(3,9),(3,24),(4,14),(5,2),(6,11),(6,22),(6,23),(7,7),(7,10),(7,16),(7,18),(8,24),(9,2),(9,5),(9,12),(9,14),(10,5),(10,6),(10,14),(11,7),(11,12),(11,18),(12,2),(12,12),(12,19),(12,21),(13,12),(13,13),(13,17),(13,23),(14,7),(14,8),(15,1),(15,9),(15,13),(15,17),(16,16),(16,23),(17,2),(17,9),(17,11),(17,14),(17,18),(17,19),(17,22),(18,3),(18,15),(19,8),(19,10),(20,3),(20,20),(20,21),(20,24),(21,3),(21,20),(22,1),(22,10),(22,11),(22,15),(22,19),(23,6),(23,17),(23,22),(24,1),(24,3),(24,19),(24,20),(24,23),(25,1),(25,4),(25,7),(25,9),(25,11),(25,15),(25,16),(26,4),(26,5),(26,10),(27,24),(28,13),(28,22),(29,8),(29,13),(29,21),(30,4),(30,5),(30,6),(30,16),(30,20);
/*!40000 ALTER TABLE `ec_product_category_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_collection_products`
--

DROP TABLE IF EXISTS `ec_product_collection_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_collection_products` (
  `product_collection_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`product_id`,`product_collection_id`),
  KEY `ec_product_collection_products_product_collection_id_index` (`product_collection_id`),
  KEY `ec_product_collection_products_product_id_index` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_collection_products`
--

LOCK TABLES `ec_product_collection_products` WRITE;
/*!40000 ALTER TABLE `ec_product_collection_products` DISABLE KEYS */;
INSERT INTO `ec_product_collection_products` VALUES (1,2),(1,11),(1,15),(1,16),(1,22),(2,1),(2,4),(2,8),(2,12),(2,14),(2,17),(2,18),(2,19),(2,20),(2,24),(3,3),(3,5),(3,6),(3,7),(3,9),(3,10),(3,13),(3,21),(3,23);
/*!40000 ALTER TABLE `ec_product_collection_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_collections`
--

DROP TABLE IF EXISTS `ec_product_collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_collections` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_featured` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_collections`
--

LOCK TABLES `ec_product_collections` WRITE;
/*!40000 ALTER TABLE `ec_product_collections` DISABLE KEYS */;
INSERT INTO `ec_product_collections` VALUES (1,'New Arrival','new-arrival',NULL,NULL,'published','2025-09-11 01:45:11','2025-09-11 01:45:11',0),(2,'Best Sellers','best-sellers',NULL,NULL,'published','2025-09-11 01:45:11','2025-09-11 01:45:11',0),(3,'Special Offer','special-offer',NULL,NULL,'published','2025-09-11 01:45:11','2025-09-11 01:45:11',0);
/*!40000 ALTER TABLE `ec_product_collections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_collections_translations`
--

DROP TABLE IF EXISTS `ec_product_collections_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_collections_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_product_collections_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_product_collections_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_collections_translations`
--

LOCK TABLES `ec_product_collections_translations` WRITE;
/*!40000 ALTER TABLE `ec_product_collections_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_collections_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_cross_sale_relations`
--

DROP TABLE IF EXISTS `ec_product_cross_sale_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_cross_sale_relations` (
  `from_product_id` bigint unsigned NOT NULL,
  `to_product_id` bigint unsigned NOT NULL,
  `is_variant` tinyint(1) NOT NULL DEFAULT '0',
  `price` decimal(15,2) DEFAULT '0.00',
  `price_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'fixed',
  `apply_to_all_variations` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`from_product_id`,`to_product_id`),
  KEY `ec_product_cross_sale_relations_from_product_id_index` (`from_product_id`),
  KEY `ec_product_cross_sale_relations_to_product_id_index` (`to_product_id`),
  KEY `idx_product_cross_sale` (`from_product_id`,`to_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_cross_sale_relations`
--

LOCK TABLES `ec_product_cross_sale_relations` WRITE;
/*!40000 ALTER TABLE `ec_product_cross_sale_relations` DISABLE KEYS */;
INSERT INTO `ec_product_cross_sale_relations` VALUES (1,8,0,0.00,'fixed',1),(1,10,0,0.00,'fixed',1),(1,11,0,0.00,'fixed',1),(1,14,0,0.00,'fixed',1),(1,17,0,0.00,'fixed',1),(1,18,0,0.00,'fixed',1),(2,1,0,0.00,'fixed',1),(2,4,0,0.00,'fixed',1),(2,13,0,0.00,'fixed',1),(2,15,0,0.00,'fixed',1),(2,18,0,0.00,'fixed',1),(2,23,0,0.00,'fixed',1),(2,24,0,0.00,'fixed',1),(3,5,0,0.00,'fixed',1),(3,9,0,0.00,'fixed',1),(3,12,0,0.00,'fixed',1),(3,15,0,0.00,'fixed',1),(3,17,0,0.00,'fixed',1),(3,18,0,0.00,'fixed',1),(3,19,0,0.00,'fixed',1),(4,3,0,0.00,'fixed',1),(4,5,0,0.00,'fixed',1),(4,6,0,0.00,'fixed',1),(4,17,0,0.00,'fixed',1),(4,19,0,0.00,'fixed',1),(4,24,0,0.00,'fixed',1),(5,1,0,0.00,'fixed',1),(5,9,0,0.00,'fixed',1),(5,10,0,0.00,'fixed',1),(5,15,0,0.00,'fixed',1),(5,16,0,0.00,'fixed',1),(5,19,0,0.00,'fixed',1),(6,7,0,0.00,'fixed',1),(6,9,0,0.00,'fixed',1),(6,15,0,0.00,'fixed',1),(6,21,0,0.00,'fixed',1),(6,24,0,0.00,'fixed',1),(7,2,0,0.00,'fixed',1),(7,3,0,0.00,'fixed',1),(7,4,0,0.00,'fixed',1),(7,5,0,0.00,'fixed',1),(7,12,0,0.00,'fixed',1),(7,13,0,0.00,'fixed',1),(8,1,0,0.00,'fixed',1),(8,2,0,0.00,'fixed',1),(8,7,0,0.00,'fixed',1),(8,13,0,0.00,'fixed',1),(8,17,0,0.00,'fixed',1),(8,18,0,0.00,'fixed',1),(8,23,0,0.00,'fixed',1),(9,5,0,0.00,'fixed',1),(9,8,0,0.00,'fixed',1),(9,12,0,0.00,'fixed',1),(9,16,0,0.00,'fixed',1),(9,21,0,0.00,'fixed',1),(9,24,0,0.00,'fixed',1),(10,4,0,0.00,'fixed',1),(10,6,0,0.00,'fixed',1),(10,17,0,0.00,'fixed',1),(10,18,0,0.00,'fixed',1),(10,23,0,0.00,'fixed',1),(10,24,0,0.00,'fixed',1),(11,3,0,0.00,'fixed',1),(11,5,0,0.00,'fixed',1),(11,7,0,0.00,'fixed',1),(11,8,0,0.00,'fixed',1),(11,16,0,0.00,'fixed',1),(11,24,0,0.00,'fixed',1),(12,5,0,0.00,'fixed',1),(12,6,0,0.00,'fixed',1),(12,8,0,0.00,'fixed',1),(12,9,0,0.00,'fixed',1),(12,16,0,0.00,'fixed',1),(12,21,0,0.00,'fixed',1),(12,24,0,0.00,'fixed',1),(13,1,0,0.00,'fixed',1),(13,15,0,0.00,'fixed',1),(13,16,0,0.00,'fixed',1),(13,17,0,0.00,'fixed',1),(13,20,0,0.00,'fixed',1),(14,2,0,0.00,'fixed',1),(14,3,0,0.00,'fixed',1),(14,4,0,0.00,'fixed',1),(14,8,0,0.00,'fixed',1),(14,12,0,0.00,'fixed',1),(14,19,0,0.00,'fixed',1),(15,1,0,0.00,'fixed',1),(15,4,0,0.00,'fixed',1),(15,18,0,0.00,'fixed',1),(15,19,0,0.00,'fixed',1),(15,24,0,0.00,'fixed',1),(16,2,0,0.00,'fixed',1),(16,3,0,0.00,'fixed',1),(16,5,0,0.00,'fixed',1),(16,7,0,0.00,'fixed',1),(16,9,0,0.00,'fixed',1),(16,10,0,0.00,'fixed',1),(16,13,0,0.00,'fixed',1),(17,1,0,0.00,'fixed',1),(17,3,0,0.00,'fixed',1),(17,5,0,0.00,'fixed',1),(17,6,0,0.00,'fixed',1),(17,14,0,0.00,'fixed',1),(17,22,0,0.00,'fixed',1),(17,24,0,0.00,'fixed',1),(18,1,0,0.00,'fixed',1),(18,2,0,0.00,'fixed',1),(18,6,0,0.00,'fixed',1),(18,12,0,0.00,'fixed',1),(18,14,0,0.00,'fixed',1),(18,17,0,0.00,'fixed',1),(18,21,0,0.00,'fixed',1),(19,2,0,0.00,'fixed',1),(19,7,0,0.00,'fixed',1),(19,9,0,0.00,'fixed',1),(19,10,0,0.00,'fixed',1),(19,13,0,0.00,'fixed',1),(19,18,0,0.00,'fixed',1),(19,20,0,0.00,'fixed',1),(20,2,0,0.00,'fixed',1),(20,3,0,0.00,'fixed',1),(20,10,0,0.00,'fixed',1),(20,11,0,0.00,'fixed',1),(20,12,0,0.00,'fixed',1),(20,21,0,0.00,'fixed',1),(21,1,0,0.00,'fixed',1),(21,6,0,0.00,'fixed',1),(21,7,0,0.00,'fixed',1),(21,10,0,0.00,'fixed',1),(21,11,0,0.00,'fixed',1),(21,19,0,0.00,'fixed',1),(22,1,0,0.00,'fixed',1),(22,4,0,0.00,'fixed',1),(22,10,0,0.00,'fixed',1),(22,14,0,0.00,'fixed',1),(22,18,0,0.00,'fixed',1),(22,24,0,0.00,'fixed',1),(23,4,0,0.00,'fixed',1),(23,7,0,0.00,'fixed',1),(23,14,0,0.00,'fixed',1),(23,15,0,0.00,'fixed',1),(23,16,0,0.00,'fixed',1),(23,22,0,0.00,'fixed',1),(24,1,0,0.00,'fixed',1),(24,7,0,0.00,'fixed',1),(24,8,0,0.00,'fixed',1),(24,11,0,0.00,'fixed',1),(24,19,0,0.00,'fixed',1),(24,23,0,0.00,'fixed',1);
/*!40000 ALTER TABLE `ec_product_cross_sale_relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_files`
--

DROP TABLE IF EXISTS `ec_product_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_files` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned DEFAULT NULL,
  `url` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extras` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_product_files_product_id_index` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_files`
--

LOCK TABLES `ec_product_files` WRITE;
/*!40000 ALTER TABLE `ec_product_files` DISABLE KEYS */;
INSERT INTO `ec_product_files` VALUES (1,4,'ecommerce/digital-product-files/4.jpg','{\"filename\":\"4.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/4.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"4\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(2,4,'ecommerce/digital-product-files/4-1.jpg','{\"filename\":\"4-1.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/4-1.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"4-1\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(3,8,'ecommerce/digital-product-files/8.jpg','{\"filename\":\"8.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/8.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"8\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(4,8,'ecommerce/digital-product-files/8-1.jpg','{\"filename\":\"8-1.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/8-1.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"8-1\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(5,12,'ecommerce/digital-product-files/12.jpg','{\"filename\":\"12.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/12.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"12\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(6,12,'ecommerce/digital-product-files/12-1.jpg','{\"filename\":\"12-1.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/12-1.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"12-1\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(7,16,'ecommerce/digital-product-files/16.jpg','{\"filename\":\"16.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/16.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"16\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(8,20,'ecommerce/digital-product-files/20.jpg','{\"filename\":\"20.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/20.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"20\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(9,20,'ecommerce/digital-product-files/20-1.jpg','{\"filename\":\"20-1.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/20-1.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"20-1\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(10,24,'ecommerce/digital-product-files/24.jpg','{\"filename\":\"24.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/24.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"24\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(11,24,'ecommerce/digital-product-files/24-1.jpg','{\"filename\":\"24-1.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/24-1.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"24-1\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(12,27,'ecommerce/digital-product-files/4-1.jpg','{\"filename\":\"4-1.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/4-1.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"4-1\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(13,28,'ecommerce/digital-product-files/4-2.jpg','{\"filename\":\"4-2.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/4-2.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"4-2\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(14,33,'ecommerce/digital-product-files/8-1.jpg','{\"filename\":\"8-1.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/8-1.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"8-1\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(15,34,'ecommerce/digital-product-files/8.jpg','{\"filename\":\"8.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/8.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"8\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(16,35,'ecommerce/digital-product-files/8.jpg','{\"filename\":\"8.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/8.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"8\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(17,36,'ecommerce/digital-product-files/12-1.jpg','{\"filename\":\"12-1.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/12-1.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"12-1\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(18,44,'ecommerce/digital-product-files/16.jpg','{\"filename\":\"16.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/16.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"16\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(19,45,'ecommerce/digital-product-files/16.jpg','{\"filename\":\"16.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/16.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"16\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(20,46,'ecommerce/digital-product-files/16.jpg','{\"filename\":\"16.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/16.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"16\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31'),(21,47,'ecommerce/digital-product-files/16.jpg','{\"filename\":\"16.jpg\",\"url\":\"ecommerce\\/digital-product-files\\/16.jpg\",\"mime_type\":\"image\\/jpeg\",\"size\":9803,\"modified\":\"2025-09-11 08:45:31\",\"name\":\"16\",\"extension\":\"jpg\"}','2025-09-11 01:45:31','2025-09-11 01:45:31');
/*!40000 ALTER TABLE `ec_product_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_label_products`
--

DROP TABLE IF EXISTS `ec_product_label_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_label_products` (
  `product_label_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`product_label_id`,`product_id`),
  KEY `ec_product_label_products_product_label_id_index` (`product_label_id`),
  KEY `ec_product_label_products_product_id_index` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_label_products`
--

LOCK TABLES `ec_product_label_products` WRITE;
/*!40000 ALTER TABLE `ec_product_label_products` DISABLE KEYS */;
INSERT INTO `ec_product_label_products` VALUES (1,3),(1,6),(1,9),(1,12),(1,15),(1,24),(3,18),(3,21);
/*!40000 ALTER TABLE `ec_product_label_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_labels`
--

DROP TABLE IF EXISTS `ec_product_labels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_labels` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `text_color` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_labels`
--

LOCK TABLES `ec_product_labels` WRITE;
/*!40000 ALTER TABLE `ec_product_labels` DISABLE KEYS */;
INSERT INTO `ec_product_labels` VALUES (1,'Hot','#d71e2d','published','2025-09-11 01:45:11','2025-09-11 01:45:11',NULL),(2,'New','#02856e','published','2025-09-11 01:45:11','2025-09-11 01:45:11',NULL),(3,'Sale','#fe9931','published','2025-09-11 01:45:11','2025-09-11 01:45:11',NULL);
/*!40000 ALTER TABLE `ec_product_labels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_labels_translations`
--

DROP TABLE IF EXISTS `ec_product_labels_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_labels_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_product_labels_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_product_labels_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_labels_translations`
--

LOCK TABLES `ec_product_labels_translations` WRITE;
/*!40000 ALTER TABLE `ec_product_labels_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_labels_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_license_codes`
--

DROP TABLE IF EXISTS `ec_product_license_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_license_codes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `license_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `assigned_order_product_id` bigint unsigned DEFAULT NULL,
  `assigned_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_product_license_codes_product_id_status_index` (`product_id`,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_license_codes`
--

LOCK TABLES `ec_product_license_codes` WRITE;
/*!40000 ALTER TABLE `ec_product_license_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_license_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_related_relations`
--

DROP TABLE IF EXISTS `ec_product_related_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_related_relations` (
  `from_product_id` bigint unsigned NOT NULL,
  `to_product_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`from_product_id`,`to_product_id`),
  KEY `ec_product_related_relations_from_product_id_index` (`from_product_id`),
  KEY `ec_product_related_relations_to_product_id_index` (`to_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_related_relations`
--

LOCK TABLES `ec_product_related_relations` WRITE;
/*!40000 ALTER TABLE `ec_product_related_relations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_related_relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_specification_attribute`
--

DROP TABLE IF EXISTS `ec_product_specification_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_specification_attribute` (
  `product_id` bigint unsigned NOT NULL,
  `attribute_id` bigint unsigned NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `hidden` tinyint(1) NOT NULL DEFAULT '0',
  `order` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`,`attribute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_specification_attribute`
--

LOCK TABLES `ec_product_specification_attribute` WRITE;
/*!40000 ALTER TABLE `ec_product_specification_attribute` DISABLE KEYS */;
INSERT INTO `ec_product_specification_attribute` VALUES (1,6,'56.87 cm',0,0),(1,7,'81.21 cm',0,0),(1,8,'2560x1440',0,0),(2,1,'19.34 cm',0,0),(2,2,'7.15 cm',0,0),(2,3,'78.01 cm',0,0),(2,4,'99.39 cm',0,0),(2,5,'13.84 cm',0,0),(3,6,'26.89 cm',0,0),(3,7,'66.33 cm',0,0),(3,8,'1920x1080',0,0),(4,1,'20.86 cm',0,0),(4,2,'34.64 cm',0,0),(4,3,'11.92 cm',0,0),(4,4,'71.58 cm',0,0),(4,5,'97.31 cm',0,0),(5,1,'36.88 cm',0,0),(5,2,'75.16 cm',0,0),(5,3,'94.41 cm',0,0),(5,4,'22.27 cm',0,0),(5,5,'78.11 cm',0,0),(6,6,'78.42 cm',0,0),(6,7,'39.15 cm',0,0),(6,8,'1920x1080',0,0),(7,1,'50.15 cm',0,0),(7,2,'85.67 cm',0,0),(7,3,'61.49 cm',0,0),(7,4,'48.61 cm',0,0),(7,5,'68.65 cm',0,0),(8,6,'84 cm',0,0),(8,7,'54.91 cm',0,0),(8,8,'1920x1080',0,0),(9,1,'21.32 cm',0,0),(9,2,'24.77 cm',0,0),(9,3,'72.24 cm',0,0),(9,4,'5.36 cm',0,0),(9,5,'62.2 cm',0,0),(10,1,'31.94 cm',0,0),(10,2,'75.06 cm',0,0),(10,3,'71.38 cm',0,0),(10,4,'95.62 cm',0,0),(10,5,'8.18 cm',0,0),(11,6,'88.06 cm',0,0),(11,7,'60.89 cm',0,0),(11,8,'3840x2160',0,0),(12,6,'8.01 cm',0,0),(12,7,'21.31 cm',0,0),(12,8,'1920x1080',0,0),(13,1,'74.28 cm',0,0),(13,2,'10 cm',0,0),(13,3,'1.85 cm',0,0),(13,4,'78.52 cm',0,0),(13,5,'40.32 cm',0,0),(14,6,'1.74 cm',0,0),(14,7,'28.77 cm',0,0),(14,8,'3840x2160',0,0),(15,1,'81.07 cm',0,0),(15,2,'66.07 cm',0,0),(15,3,'61.2 cm',0,0),(15,4,'84.41 cm',0,0),(15,5,'21.19 cm',0,0),(16,6,'27.93 cm',0,0),(16,7,'33.62 cm',0,0),(16,8,'1920x1080',0,0),(17,6,'63.27 cm',0,0),(17,7,'65.59 cm',0,0),(17,8,'3840x2160',0,0),(18,1,'8.75 cm',0,0),(18,2,'30.84 cm',0,0),(18,3,'10.28 cm',0,0),(18,4,'37.79 cm',0,0),(18,5,'59.03 cm',0,0),(19,1,'36.21 cm',0,0),(19,2,'23.16 cm',0,0),(19,3,'86.99 cm',0,0),(19,4,'41.18 cm',0,0),(19,5,'33.6 cm',0,0),(20,1,'63.41 cm',0,0),(20,2,'85.96 cm',0,0),(20,3,'6.81 cm',0,0),(20,4,'36.38 cm',0,0),(20,5,'30.73 cm',0,0),(21,6,'50.05 cm',0,0),(21,7,'80.39 cm',0,0),(21,8,'1920x1080',0,0),(22,6,'77.06 cm',0,0),(22,7,'51.36 cm',0,0),(22,8,'3840x2160',0,0),(23,1,'96.66 cm',0,0),(23,2,'29.85 cm',0,0),(23,3,'2.85 cm',0,0),(23,4,'65.23 cm',0,0),(23,5,'8.22 cm',0,0),(24,1,'36.3 cm',0,0),(24,2,'72.18 cm',0,0),(24,3,'75.5 cm',0,0),(24,4,'29.06 cm',0,0),(24,5,'22.71 cm',0,0);
/*!40000 ALTER TABLE `ec_product_specification_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_specification_attribute_translations`
--

DROP TABLE IF EXISTS `ec_product_specification_attribute_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_specification_attribute_translations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `attribute_id` bigint unsigned NOT NULL,
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `psat_unique` (`product_id`,`attribute_id`,`lang_code`),
  KEY `psat_product_attribute_index` (`product_id`,`attribute_id`),
  KEY `psat_product_id_index` (`product_id`),
  KEY `psat_attribute_id_index` (`attribute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_specification_attribute_translations`
--

LOCK TABLES `ec_product_specification_attribute_translations` WRITE;
/*!40000 ALTER TABLE `ec_product_specification_attribute_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_specification_attribute_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_tag_product`
--

DROP TABLE IF EXISTS `ec_product_tag_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_tag_product` (
  `product_id` bigint unsigned NOT NULL,
  `tag_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`product_id`,`tag_id`),
  KEY `ec_product_tag_product_product_id_index` (`product_id`),
  KEY `ec_product_tag_product_tag_id_index` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_tag_product`
--

LOCK TABLES `ec_product_tag_product` WRITE;
/*!40000 ALTER TABLE `ec_product_tag_product` DISABLE KEYS */;
INSERT INTO `ec_product_tag_product` VALUES (1,1),(1,2),(1,5),(2,1),(2,2),(2,3),(3,1),(3,2),(3,4),(4,3),(4,4),(4,5),(5,1),(5,2),(5,3),(6,2),(6,3),(6,4),(7,2),(7,3),(7,4),(8,3),(8,4),(8,5),(9,2),(9,3),(9,4),(10,1),(10,3),(10,4),(11,1),(11,3),(11,4),(12,2),(12,3),(12,4),(13,2),(13,4),(13,5),(14,1),(14,4),(14,5),(15,1),(15,4),(15,5),(16,1),(16,4),(16,5),(17,1),(17,3),(17,5),(18,1),(18,3),(18,4),(19,1),(19,2),(19,5),(20,1),(20,2),(20,4),(21,1),(21,2),(21,3),(22,2),(22,4),(22,5),(23,1),(23,3),(23,4),(24,2),(24,4),(24,5);
/*!40000 ALTER TABLE `ec_product_tag_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_tags`
--

DROP TABLE IF EXISTS `ec_product_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_tags` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_tags`
--

LOCK TABLES `ec_product_tags` WRITE;
/*!40000 ALTER TABLE `ec_product_tags` DISABLE KEYS */;
INSERT INTO `ec_product_tags` VALUES (1,'Wallet',NULL,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(2,'Bags',NULL,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(3,'Shoes',NULL,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(4,'Clothes',NULL,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(5,'Hand bag',NULL,'published','2025-09-11 01:45:11','2025-09-11 01:45:11');
/*!40000 ALTER TABLE `ec_product_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_tags_translations`
--

DROP TABLE IF EXISTS `ec_product_tags_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_tags_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_product_tags_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_product_tags_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_tags_translations`
--

LOCK TABLES `ec_product_tags_translations` WRITE;
/*!40000 ALTER TABLE `ec_product_tags_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_tags_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_up_sale_relations`
--

DROP TABLE IF EXISTS `ec_product_up_sale_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_up_sale_relations` (
  `from_product_id` bigint unsigned NOT NULL,
  `to_product_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`from_product_id`,`to_product_id`),
  KEY `ec_product_up_sale_relations_from_product_id_index` (`from_product_id`),
  KEY `ec_product_up_sale_relations_to_product_id_index` (`to_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_up_sale_relations`
--

LOCK TABLES `ec_product_up_sale_relations` WRITE;
/*!40000 ALTER TABLE `ec_product_up_sale_relations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_up_sale_relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_variation_items`
--

DROP TABLE IF EXISTS `ec_product_variation_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_variation_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `attribute_id` bigint unsigned NOT NULL,
  `variation_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ec_product_variation_items_attribute_id_variation_id_unique` (`attribute_id`,`variation_id`),
  KEY `attribute_variation_index` (`attribute_id`,`variation_id`),
  KEY `idx_variation_id` (`variation_id`),
  KEY `idx_variation_attribute_covering` (`variation_id`,`attribute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_variation_items`
--

LOCK TABLES `ec_product_variation_items` WRITE;
/*!40000 ALTER TABLE `ec_product_variation_items` DISABLE KEYS */;
INSERT INTO `ec_product_variation_items` VALUES (1,1,1),(13,1,7),(21,1,11),(25,1,13),(37,1,19),(41,1,21),(47,1,24),(57,1,29),(5,2,3),(27,2,14),(39,2,20),(45,2,23),(49,2,25),(51,2,26),(55,2,28),(59,2,30),(63,2,32),(11,3,6),(17,3,9),(19,3,10),(3,4,2),(7,4,4),(15,4,8),(31,4,16),(33,4,17),(35,4,18),(53,4,27),(61,4,31),(67,4,34),(9,5,5),(23,5,12),(29,5,15),(43,5,22),(65,5,33),(46,6,23),(52,6,26),(6,7,3),(24,7,12),(28,7,14),(34,7,17),(36,7,18),(54,7,27),(64,7,32),(22,8,11),(30,8,15),(40,8,20),(48,8,24),(60,8,30),(66,8,33),(2,9,1),(4,9,2),(12,9,6),(16,9,8),(18,9,9),(26,9,13),(38,9,19),(50,9,25),(58,9,29),(8,10,4),(10,10,5),(14,10,7),(20,10,10),(32,10,16),(42,10,21),(44,10,22),(56,10,28),(62,10,31),(68,10,34);
/*!40000 ALTER TABLE `ec_product_variation_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_variations`
--

DROP TABLE IF EXISTS `ec_product_variations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_variations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned DEFAULT NULL,
  `configurable_product_id` bigint unsigned NOT NULL,
  `is_default` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ec_product_variations_product_id_configurable_product_id_unique` (`product_id`,`configurable_product_id`),
  KEY `configurable_product_index` (`product_id`,`configurable_product_id`),
  KEY `idx_configurable_product_id` (`configurable_product_id`),
  KEY `idx_product_variations_config` (`configurable_product_id`,`is_default`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_variations`
--

LOCK TABLES `ec_product_variations` WRITE;
/*!40000 ALTER TABLE `ec_product_variations` DISABLE KEYS */;
INSERT INTO `ec_product_variations` VALUES (1,25,2,1),(2,26,3,1),(3,27,4,1),(4,28,4,0),(5,29,7,1),(6,30,7,0),(7,31,7,0),(8,32,7,0),(9,33,8,1),(10,34,8,0),(11,35,8,0),(12,36,12,1),(13,37,13,1),(14,38,14,1),(15,39,14,0),(16,40,14,0),(17,41,14,0),(18,42,15,1),(19,43,15,0),(20,44,16,1),(21,45,16,0),(22,46,16,0),(23,47,16,0),(24,48,18,1),(25,49,18,0),(26,50,21,1),(27,51,21,0),(28,52,21,0),(29,53,22,1),(30,54,22,0),(31,55,23,1),(32,56,23,0),(33,57,23,0),(34,58,23,0);
/*!40000 ALTER TABLE `ec_product_variations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_views`
--

DROP TABLE IF EXISTS `ec_product_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_views` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `views` int NOT NULL DEFAULT '1',
  `date` date NOT NULL DEFAULT '2025-09-11',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ec_product_views_product_id_date_unique` (`product_id`,`date`),
  KEY `ec_product_views_product_id_index` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_views`
--

LOCK TABLES `ec_product_views` WRITE;
/*!40000 ALTER TABLE `ec_product_views` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_product_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_product_with_attribute_set`
--

DROP TABLE IF EXISTS `ec_product_with_attribute_set`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_product_with_attribute_set` (
  `attribute_set_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `order` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`,`attribute_set_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_product_with_attribute_set`
--

LOCK TABLES `ec_product_with_attribute_set` WRITE;
/*!40000 ALTER TABLE `ec_product_with_attribute_set` DISABLE KEYS */;
INSERT INTO `ec_product_with_attribute_set` VALUES (1,2,0),(2,2,0),(1,3,0),(2,3,0),(1,4,0),(2,4,0),(1,7,0),(2,7,0),(1,8,0),(2,8,0),(1,12,0),(2,12,0),(1,13,0),(2,13,0),(1,14,0),(2,14,0),(1,15,0),(2,15,0),(1,16,0),(2,16,0),(1,18,0),(2,18,0),(1,21,0),(2,21,0),(1,22,0),(2,22,0),(1,23,0),(2,23,0);
/*!40000 ALTER TABLE `ec_product_with_attribute_set` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_products`
--

DROP TABLE IF EXISTS `ec_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `images` text COLLATE utf8mb4_unicode_ci,
  `video_media` text COLLATE utf8mb4_unicode_ci,
  `sku` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int unsigned NOT NULL DEFAULT '0',
  `quantity` int unsigned DEFAULT NULL,
  `allow_checkout_when_out_of_stock` tinyint unsigned NOT NULL DEFAULT '0',
  `with_storehouse_management` tinyint unsigned NOT NULL DEFAULT '0',
  `stock_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'in_stock',
  `is_featured` tinyint unsigned NOT NULL DEFAULT '0',
  `brand_id` bigint unsigned DEFAULT NULL,
  `is_variation` tinyint NOT NULL DEFAULT '0',
  `variations_count` int unsigned NOT NULL DEFAULT '0',
  `reviews_count` int unsigned NOT NULL DEFAULT '0',
  `reviews_avg` decimal(3,2) NOT NULL DEFAULT '0.00',
  `sale_type` tinyint NOT NULL DEFAULT '0',
  `price` double unsigned DEFAULT NULL,
  `sale_price` double unsigned DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `length` double DEFAULT NULL,
  `wide` double DEFAULT NULL,
  `height` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `tax_id` bigint unsigned DEFAULT NULL,
  `views` bigint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by_id` bigint unsigned DEFAULT '0',
  `created_by_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Botble\\ACL\\Models\\User',
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_type` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT 'physical',
  `barcode` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost_per_item` double DEFAULT NULL,
  `generate_license_code` tinyint(1) NOT NULL DEFAULT '0',
  `license_code_type` enum('auto_generate','pick_from_list') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'auto_generate',
  `minimum_order_quantity` int unsigned DEFAULT '0',
  `maximum_order_quantity` int unsigned DEFAULT '0',
  `notify_attachment_updated` tinyint(1) NOT NULL DEFAULT '0',
  `specification_table_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_products_brand_id_status_is_variation_created_at_index` (`brand_id`,`status`,`is_variation`,`created_at`),
  KEY `sale_type_index` (`sale_type`),
  KEY `start_date_index` (`start_date`),
  KEY `end_date_index` (`end_date`),
  KEY `sale_price_index` (`sale_price`),
  KEY `is_variation_index` (`is_variation`),
  KEY `ec_products_sku_index` (`sku`),
  KEY `idx_products_export` (`id`,`is_variation`),
  KEY `idx_variation_name_id` (`is_variation`,`name`,`id`),
  KEY `ec_products_variations_count_index` (`variations_count`),
  KEY `ec_products_reviews_count_index` (`reviews_count`),
  KEY `ec_products_reviews_avg_index` (`reviews_avg`),
  KEY `ec_products_slug_index` (`slug`),
  KEY `idx_products_status_variation` (`status`,`is_variation`,`id`),
  KEY `idx_products_price_sale` (`sale_type`,`sale_price`,`price`),
  KEY `idx_products_order_created` (`order`,`created_at`),
  KEY `idx_products_stock` (`with_storehouse_management`,`stock_status`,`quantity`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_products`
--

LOCK TABLES `ec_products` WRITE;
/*!40000 ALTER TABLE `ec_products` DISABLE KEYS */;
INSERT INTO `ec_products` VALUES (1,'Smart Home Speaker','smart-home-speaker','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/1.jpg\",\"products\\/1-1.jpg\",\"products\\/1-2.jpg\",\"products\\/1-3.jpg\"]',NULL,'SN-111',0,12,0,1,'in_stock',1,3,0,0,10,2.70,0,1393,1136,NULL,NULL,18,19,13,712,NULL,166504,'2025-09-11 01:45:24','2025-09-11 01:45:50',0,'Botble\\ACL\\Models\\User',NULL,'physical','1989552716555',NULL,0,'auto_generate',0,0,0,2),(2,'Headphone Ultra Bass','headphone-ultra-bass','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/2.jpg\",\"products\\/2-1.jpg\",\"products\\/2-2.jpg\",\"products\\/2-3.jpg\"]',NULL,'DQ-181-A1',0,15,0,1,'in_stock',1,5,0,1,10,2.60,0,1848,NULL,NULL,NULL,19,12,16,663,NULL,102820,'2025-09-11 01:45:25','2025-09-11 01:45:50',0,'Botble\\ACL\\Models\\User',NULL,'physical','5574721923962',NULL,0,'auto_generate',0,0,0,1),(3,'Boxed - Bluetooth Headphone','boxed-bluetooth-headphone','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/3.jpg\",\"products\\/3-1.jpg\",\"products\\/3-2.jpg\",\"products\\/3-3.jpg\"]',NULL,'NV-106-A1',0,12,0,1,'in_stock',1,3,0,1,10,3.40,0,963,NULL,NULL,NULL,15,12,15,525,NULL,117987,'2025-09-11 01:45:25','2025-09-11 01:45:50',0,'Botble\\ACL\\Models\\User',NULL,'physical','4999623879062',NULL,0,'auto_generate',0,0,0,2),(4,'Chikie - Bluetooth Speaker (Digital)','chikie-bluetooth-speaker','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/4.jpg\",\"products\\/4-1.jpg\",\"products\\/4-2.jpg\",\"products\\/4-3.jpg\"]',NULL,'GY-152-A1',0,13,0,1,'in_stock',1,4,0,2,10,2.90,0,1613,1225.88,NULL,NULL,17,16,12,597,NULL,154115,'2025-09-11 01:45:25','2025-09-11 01:45:50',0,'Botble\\ACL\\Models\\User',NULL,'digital','6829642855403',NULL,0,'auto_generate',0,0,0,1),(5,'Camera Hikvision HK-35VS8','camera-hikvision-hk-35vs8','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/5.jpg\",\"products\\/5-1.jpg\",\"products\\/5-2.jpg\",\"products\\/5-3.jpg\"]',NULL,'YM-109',0,13,0,1,'in_stock',1,1,0,0,10,3.00,0,1229,753,NULL,NULL,20,10,10,594,NULL,51542,'2025-09-11 01:45:25','2025-09-11 01:45:50',0,'Botble\\ACL\\Models\\User',NULL,'physical','8302053531848',NULL,0,'auto_generate',0,0,0,1),(6,'Camera Samsung SS-24','camera-samsung-ss-24','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/6.jpg\",\"products\\/6-1.jpg\"]',NULL,'FO-136',0,15,0,1,'in_stock',1,5,0,0,10,2.70,0,1242,1130,NULL,NULL,16,20,11,552,NULL,125241,'2025-09-11 01:45:25','2025-09-11 01:45:50',0,'Botble\\ACL\\Models\\User',NULL,'physical','5499359583916',NULL,0,'auto_generate',0,0,0,2),(7,'Leather Watch Band','leather-watch-band','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/7.jpg\",\"products\\/7-1.jpg\"]',NULL,'NT-169-A1',0,13,0,1,'in_stock',1,1,0,4,10,3.50,0,1261,NULL,NULL,NULL,10,12,18,846,NULL,7089,'2025-09-11 01:45:25','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','0084249920565',NULL,0,'auto_generate',0,0,0,1),(8,'Apple iPhone 13 Plus (Digital)','apple-iphone-13-plus','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/8.jpg\",\"products\\/8-1.jpg\"]',NULL,'S1-198-A1',0,11,0,1,'in_stock',1,3,0,3,10,3.30,0,690,510.6,NULL,NULL,13,12,10,607,NULL,190759,'2025-09-11 01:45:25','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'digital','5151115638956',NULL,0,'auto_generate',0,0,0,2),(9,'Macbook Pro 2015','macbook-pro-2015','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/9.jpg\",\"products\\/9-1.jpg\"]',NULL,'AG-151',0,12,0,1,'in_stock',1,1,0,0,10,3.10,0,1337,710,NULL,NULL,13,20,15,798,NULL,43560,'2025-09-11 01:45:25','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','5753557687747',NULL,0,'auto_generate',0,0,0,1),(10,'Macbook Air 12 inch','macbook-air-12-inch','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/10.jpg\",\"products\\/10-1.jpg\"]',NULL,'QB-111',0,19,0,1,'in_stock',1,1,0,0,9,2.56,0,590,221,NULL,NULL,19,14,11,728,NULL,20687,'2025-09-11 01:45:25','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','9272750185950',NULL,0,'auto_generate',0,0,0,1),(11,'Apple Watch Serial 7','apple-watch-serial-7','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/11.jpg\",\"products\\/11-1.jpg\"]',NULL,'DD-151',0,20,0,1,'in_stock',1,4,0,0,10,2.70,0,2215,1513,NULL,NULL,18,11,13,756,NULL,69674,'2025-09-11 01:45:25','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','7545471477881',NULL,0,'auto_generate',0,0,0,2),(12,'Macbook Pro 13 inch (Digital)','macbook-pro-13-inch','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/12.jpg\",\"products\\/12-1.jpg\"]',NULL,'2M-145-A1',0,18,0,1,'in_stock',1,7,0,1,10,3.20,0,1606,1365.1,NULL,NULL,18,13,12,754,NULL,129803,'2025-09-11 01:45:26','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'digital','4850923468557',NULL,0,'auto_generate',0,0,0,2),(13,'Apple Keyboard','apple-keyboard','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/13.jpg\",\"products\\/13-1.jpg\"]',NULL,'U6-198-A1',0,17,0,1,'in_stock',1,1,0,1,10,3.20,0,989,NULL,NULL,NULL,15,17,12,549,NULL,67540,'2025-09-11 01:45:26','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','5527174515789',NULL,0,'auto_generate',0,0,0,1),(14,'MacSafe 80W','macsafe-80w','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/14.jpg\",\"products\\/14-1.jpg\"]',NULL,'Q6-179-A1',0,19,0,1,'in_stock',1,3,0,4,9,4.00,0,2067,NULL,NULL,NULL,12,19,14,743,NULL,23652,'2025-09-11 01:45:26','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','2702837943144',NULL,0,'auto_generate',0,0,0,2),(15,'Hand playstation','hand-playstation','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/15.jpg\",\"products\\/15-1.jpg\"]',NULL,'F8-180-A1',0,17,0,1,'in_stock',1,3,0,2,10,2.30,0,1772,NULL,NULL,NULL,12,18,12,768,NULL,167970,'2025-09-11 01:45:26','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','5446155916417',NULL,0,'auto_generate',0,0,0,1),(16,'Apple Airpods Serial 3 (Digital)','apple-airpods-serial-3','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/16.jpg\"]',NULL,'Q2-146-A1',0,18,0,1,'in_stock',1,3,0,4,10,3.40,0,894,634.74,NULL,NULL,16,13,15,758,NULL,151951,'2025-09-11 01:45:26','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'digital','1117939818039',NULL,0,'auto_generate',0,0,0,2),(17,'Cool Smart Watches','cool-smart-watches','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/17.jpg\"]',NULL,'JY-151',0,11,0,1,'in_stock',1,7,0,0,10,2.60,0,678,479,NULL,NULL,17,13,10,834,NULL,162859,'2025-09-11 01:45:26','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','8881592615252',NULL,0,'auto_generate',0,0,0,2),(18,'Black Smart Watches','black-smart-watches','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/18.jpg\",\"products\\/18-1.jpg\",\"products\\/18-2.jpg\"]',NULL,'Y2-182-A1',0,19,0,1,'in_stock',1,2,0,2,10,3.00,0,547,NULL,NULL,NULL,11,13,17,858,NULL,159462,'2025-09-11 01:45:26','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','7017646588727',NULL,0,'auto_generate',0,0,0,1),(19,'Leather Watch Band Serial 3','leather-watch-band-serial-3','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/19.jpg\",\"products\\/19-1.jpg\"]',NULL,'NR-178',0,18,0,1,'in_stock',1,5,0,0,10,3.30,0,516,105,NULL,NULL,17,13,11,814,NULL,50316,'2025-09-11 01:45:26','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','9321748924900',NULL,0,'auto_generate',0,0,0,1),(20,'Macbook Pro 2015 13 inch (Digital)','macbook-pro-2015-13-inch','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/20.jpg\",\"products\\/20-1.jpg\"]',NULL,'XB-149',0,18,0,1,'in_stock',1,5,0,0,10,2.60,0,703,635,NULL,NULL,16,20,16,730,NULL,138048,'2025-09-11 01:45:27','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'digital','0507278731396',NULL,0,'auto_generate',0,0,0,1),(21,'Historic Alarm Clock','historic-alarm-clock','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/21.jpg\",\"products\\/21-1.jpg\"]',NULL,'XU-190-A1',0,12,0,1,'in_stock',1,4,0,3,10,3.00,0,1970,NULL,NULL,NULL,17,19,10,557,NULL,141074,'2025-09-11 01:45:27','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'physical','7340150307554',NULL,0,'auto_generate',0,0,0,2),(22,'Black Glasses','black-glasses','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/22.jpg\",\"products\\/22-1.jpg\"]',NULL,'DT-108-A1',0,15,0,1,'in_stock',1,7,0,2,10,3.20,0,592,NULL,NULL,NULL,12,18,17,633,NULL,148596,'2025-09-11 01:45:27','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'physical','6651874398836',NULL,0,'auto_generate',0,0,0,2),(23,'Phillips Mouse','phillips-mouse','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/23.jpg\",\"products\\/23-1.jpg\"]',NULL,'QK-146-A1',0,14,0,1,'in_stock',1,3,0,4,10,2.40,0,819,NULL,NULL,NULL,13,14,13,567,NULL,156493,'2025-09-11 01:45:27','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'physical','6142559058607',NULL,0,'auto_generate',0,0,0,1),(24,'Gaming Keyboard (Digital)','gaming-keyboard','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline.</p>\n<p><img alt=\"icon\" src=\"/storage/general/clock.png\" style=\"height:15px;\">  1 Year AL Jazeera Brand Warranty\n</p>\n<p><img alt=\"icon\" src=\"/storage/general/paper-plane.png\" style=\"height:15px;\">   30 Day Return Policy</p>\n<p><img alt=\"icon\" src=\"/storage/general/credit-card.png\" style=\"height:15px;\">  Cash on Delivery available\n</p>\n','<p>Short Hooded Coat features a straight body, large pockets with button flaps, ventilation air holes, and a string\n    detail along the hemline. The style is completed with a drawstring hood, featuring Rains’ signature built-in\n    cap. Made from waterproof, matte PU, this lightweight unisex rain jacket is an ode to nostalgia through its classic\n    silhouette and utilitarian design details.</p>\n<p>- Casual unisex fit</p>\n\n<p>- 64% polyester, 36% polyurethane</p>\n\n<p>- Water column pressure: 4000 mm</p>\n\n<p>- Model is 187cm tall and wearing a size S / M</p>\n\n<p>- Unisex fit</p>\n\n<p>- Drawstring hood with built-in cap</p>\n\n<p>- Front placket with snap buttons</p>\n\n<p>- Ventilation under armpit</p>\n\n<p>- Adjustable cuffs</p>\n\n<p>- Double welted front pockets</p>\n\n<p>- Adjustable elastic string at hempen</p>\n\n<p>- Ultrasonically welded seams</p>\n\n<p>This is a unisex item, please check our clothing &amp; footwear sizing guide for specific Rains jacket sizing\n    information. RAINS comes from the rainy nation of Denmark at the edge of the European continent, close to the ocean\n    and with prevailing westerly winds; all factors that contribute to an average of 121 rain days each year. Arising\n    from these rainy weather conditions comes the attitude that a quick rain shower may be beautiful, as well as moody-\n    but first and foremost requires the right outfit. Rains focus on the whole experience of going outside on rainy\n    days, issuing an invitation to explore even in the most mercurial weather.</p>\n','published','[\"products\\/24.jpg\",\"products\\/24-1.jpg\"]',NULL,'OB-147',0,19,0,1,'in_stock',1,5,0,0,10,2.90,0,476,393,NULL,NULL,15,19,11,748,NULL,93931,'2025-09-11 01:45:27','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'digital','6430558048874',NULL,0,'auto_generate',0,0,0,1),(25,'Headphone Ultra Bass',NULL,NULL,NULL,'published','[\"products\\/2-1.jpg\"]',NULL,'DQ-181-A1',0,15,0,1,'in_stock',0,5,1,0,0,0.00,0,1848,NULL,NULL,NULL,19,12,16,663,NULL,0,'2025-09-11 01:45:27','2025-09-11 01:45:50',0,'Botble\\ACL\\Models\\User',NULL,'physical','5230160313763',NULL,0,'auto_generate',0,0,0,NULL),(26,'Boxed - Bluetooth Headphone',NULL,NULL,NULL,'published','[\"products\\/3-1.jpg\"]',NULL,'NV-106-A1',0,12,0,1,'in_stock',0,3,1,0,0,0.00,0,963,NULL,NULL,NULL,15,12,15,525,NULL,0,'2025-09-11 01:45:27','2025-09-11 01:45:50',0,'Botble\\ACL\\Models\\User',NULL,'physical','5110223263733',NULL,0,'auto_generate',0,0,0,NULL),(27,'Chikie - Bluetooth Speaker (Digital)',NULL,NULL,NULL,'published','[\"products\\/4-1.jpg\"]',NULL,'GY-152-A1',0,13,0,1,'in_stock',0,4,1,0,0,0.00,0,1613,1225.88,NULL,NULL,17,16,12,597,NULL,0,'2025-09-11 01:45:28','2025-09-11 01:45:50',0,'Botble\\ACL\\Models\\User',NULL,'digital','3750274798727',NULL,0,'auto_generate',0,0,0,NULL),(28,'Chikie - Bluetooth Speaker (Digital)',NULL,NULL,NULL,'published','[\"products\\/4-2.jpg\"]',NULL,'GY-152-A1-A2',0,13,0,1,'in_stock',0,4,1,0,0,0.00,0,1613,1193.62,NULL,NULL,17,16,12,597,NULL,0,'2025-09-11 01:45:28','2025-09-11 01:45:50',0,'Botble\\ACL\\Models\\User',NULL,'digital','0794010702084',NULL,0,'auto_generate',0,0,0,NULL),(29,'Leather Watch Band',NULL,NULL,NULL,'published','[\"products\\/7-1.jpg\"]',NULL,'NT-169-A1',0,13,0,1,'in_stock',0,1,1,0,0,0.00,0,1261,NULL,NULL,NULL,10,12,18,846,NULL,0,'2025-09-11 01:45:28','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','8179820766150',NULL,0,'auto_generate',0,0,0,NULL),(30,'Leather Watch Band',NULL,NULL,NULL,'published','[\"products\\/7.jpg\"]',NULL,'NT-169-A1-A2',0,13,0,1,'in_stock',0,1,1,0,0,0.00,0,1261,NULL,NULL,NULL,10,12,18,846,NULL,0,'2025-09-11 01:45:28','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','4462470391877',NULL,0,'auto_generate',0,0,0,NULL),(31,'Leather Watch Band',NULL,NULL,NULL,'published','[\"products\\/7.jpg\"]',NULL,'NT-169-A1-A3',0,13,0,1,'in_stock',0,1,1,0,0,0.00,0,1261,NULL,NULL,NULL,10,12,18,846,NULL,0,'2025-09-11 01:45:28','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','1915790763204',NULL,0,'auto_generate',0,0,0,NULL),(32,'Leather Watch Band',NULL,NULL,NULL,'published','[\"products\\/7.jpg\"]',NULL,'NT-169-A1-A4',0,13,0,1,'in_stock',0,1,1,0,0,0.00,0,1261,NULL,NULL,NULL,10,12,18,846,NULL,0,'2025-09-11 01:45:28','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','7508638827264',NULL,0,'auto_generate',0,0,0,NULL),(33,'Apple iPhone 13 Plus (Digital)',NULL,NULL,NULL,'published','[\"products\\/8-1.jpg\"]',NULL,'S1-198-A1',0,11,0,1,'in_stock',0,3,1,0,0,0.00,0,690,510.6,NULL,NULL,13,12,10,607,NULL,0,'2025-09-11 01:45:28','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'digital','7430246279312',NULL,0,'auto_generate',0,0,0,NULL),(34,'Apple iPhone 13 Plus (Digital)',NULL,NULL,NULL,'published','[\"products\\/8.jpg\"]',NULL,'S1-198-A1-A2',0,11,0,1,'in_stock',0,3,1,0,0,0.00,0,690,572.7,NULL,NULL,13,12,10,607,NULL,0,'2025-09-11 01:45:28','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'digital','0143960177556',NULL,0,'auto_generate',0,0,0,NULL),(35,'Apple iPhone 13 Plus (Digital)',NULL,NULL,NULL,'published','[\"products\\/8.jpg\"]',NULL,'S1-198-A1-A3',0,11,0,1,'in_stock',0,3,1,0,0,0.00,0,690,496.8,NULL,NULL,13,12,10,607,NULL,0,'2025-09-11 01:45:28','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'digital','5857960024851',NULL,0,'auto_generate',0,0,0,NULL),(36,'Macbook Pro 13 inch (Digital)',NULL,NULL,NULL,'published','[\"products\\/12-1.jpg\"]',NULL,'2M-145-A1',0,18,0,1,'in_stock',0,7,1,0,0,0.00,0,1606,1365.1,NULL,NULL,18,13,12,754,NULL,0,'2025-09-11 01:45:28','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'digital','2610151319807',NULL,0,'auto_generate',0,0,0,NULL),(37,'Apple Keyboard',NULL,NULL,NULL,'published','[\"products\\/13-1.jpg\"]',NULL,'U6-198-A1',0,17,0,1,'in_stock',0,1,1,0,0,0.00,0,989,NULL,NULL,NULL,15,17,12,549,NULL,0,'2025-09-11 01:45:29','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','0958790778770',NULL,0,'auto_generate',0,0,0,NULL),(38,'MacSafe 80W',NULL,NULL,NULL,'published','[\"products\\/14-1.jpg\"]',NULL,'Q6-179-A1',0,19,0,1,'in_stock',0,3,1,0,0,0.00,0,2067,NULL,NULL,NULL,12,19,14,743,NULL,0,'2025-09-11 01:45:29','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','9093580877385',NULL,0,'auto_generate',0,0,0,NULL),(39,'MacSafe 80W',NULL,NULL,NULL,'published','[\"products\\/14.jpg\"]',NULL,'Q6-179-A1-A2',0,19,0,1,'in_stock',0,3,1,0,0,0.00,0,2067,NULL,NULL,NULL,12,19,14,743,NULL,0,'2025-09-11 01:45:29','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','6231785065357',NULL,0,'auto_generate',0,0,0,NULL),(40,'MacSafe 80W',NULL,NULL,NULL,'published','[\"products\\/14.jpg\"]',NULL,'Q6-179-A1-A3',0,19,0,1,'in_stock',0,3,1,0,0,0.00,0,2067,NULL,NULL,NULL,12,19,14,743,NULL,0,'2025-09-11 01:45:29','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','1951064934567',NULL,0,'auto_generate',0,0,0,NULL),(41,'MacSafe 80W',NULL,NULL,NULL,'published','[\"products\\/14.jpg\"]',NULL,'Q6-179-A1-A4',0,19,0,1,'in_stock',0,3,1,0,0,0.00,0,2067,NULL,NULL,NULL,12,19,14,743,NULL,0,'2025-09-11 01:45:29','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','7884496220264',NULL,0,'auto_generate',0,0,0,NULL),(42,'Hand playstation',NULL,NULL,NULL,'published','[\"products\\/15-1.jpg\"]',NULL,'F8-180-A1',0,17,0,1,'in_stock',0,3,1,0,0,0.00,0,1772,NULL,NULL,NULL,12,18,12,768,NULL,0,'2025-09-11 01:45:29','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','1051271749418',NULL,0,'auto_generate',0,0,0,NULL),(43,'Hand playstation',NULL,NULL,NULL,'published','[\"products\\/15.jpg\"]',NULL,'F8-180-A1-A2',0,17,0,1,'in_stock',0,3,1,0,0,0.00,0,1772,NULL,NULL,NULL,12,18,12,768,NULL,0,'2025-09-11 01:45:29','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','6769185907262',NULL,0,'auto_generate',0,0,0,NULL),(44,'Apple Airpods Serial 3 (Digital)',NULL,NULL,NULL,'published','[\"products\\/16.jpg\"]',NULL,'Q2-146-A1',0,18,0,1,'in_stock',0,3,1,0,0,0.00,0,894,634.74,NULL,NULL,16,13,15,758,NULL,0,'2025-09-11 01:45:29','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'digital','8536628041207',NULL,0,'auto_generate',0,0,0,NULL),(45,'Apple Airpods Serial 3 (Digital)',NULL,NULL,NULL,'published','[\"products\\/16.jpg\"]',NULL,'Q2-146-A1-A2',0,18,0,1,'in_stock',0,3,1,0,0,0.00,0,894,661.56,NULL,NULL,16,13,15,758,NULL,0,'2025-09-11 01:45:29','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'digital','3062993077350',NULL,0,'auto_generate',0,0,0,NULL),(46,'Apple Airpods Serial 3 (Digital)',NULL,NULL,NULL,'published','[\"products\\/16.jpg\"]',NULL,'Q2-146-A1-A3',0,18,0,1,'in_stock',0,3,1,0,0,0.00,0,894,804.6,NULL,NULL,16,13,15,758,NULL,0,'2025-09-11 01:45:29','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'digital','5948411194961',NULL,0,'auto_generate',0,0,0,NULL),(47,'Apple Airpods Serial 3 (Digital)',NULL,NULL,NULL,'published','[\"products\\/16.jpg\"]',NULL,'Q2-146-A1-A4',0,18,0,1,'in_stock',0,3,1,0,0,0.00,0,894,759.9,NULL,NULL,16,13,15,758,NULL,0,'2025-09-11 01:45:30','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'digital','1451551059143',NULL,0,'auto_generate',0,0,0,NULL),(48,'Black Smart Watches',NULL,NULL,NULL,'published','[\"products\\/18-1.jpg\"]',NULL,'Y2-182-A1',0,19,0,1,'in_stock',0,2,1,0,0,0.00,0,547,NULL,NULL,NULL,11,13,17,858,NULL,0,'2025-09-11 01:45:30','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','1648433846100',NULL,0,'auto_generate',0,0,0,NULL),(49,'Black Smart Watches',NULL,NULL,NULL,'published','[\"products\\/18-2.jpg\"]',NULL,'Y2-182-A1-A2',0,19,0,1,'in_stock',0,2,1,0,0,0.00,0,547,NULL,NULL,NULL,11,13,17,858,NULL,0,'2025-09-11 01:45:30','2025-09-11 01:45:51',0,'Botble\\ACL\\Models\\User',NULL,'physical','4901415276010',NULL,0,'auto_generate',0,0,0,NULL),(50,'Historic Alarm Clock',NULL,NULL,NULL,'published','[\"products\\/21-1.jpg\"]',NULL,'XU-190-A1',0,12,0,1,'in_stock',0,4,1,0,0,0.00,0,1970,NULL,NULL,NULL,17,19,10,557,NULL,0,'2025-09-11 01:45:30','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'physical','7889584109544',NULL,0,'auto_generate',0,0,0,NULL),(51,'Historic Alarm Clock',NULL,NULL,NULL,'published','[\"products\\/21.jpg\"]',NULL,'XU-190-A1-A2',0,12,0,1,'in_stock',0,4,1,0,0,0.00,0,1970,NULL,NULL,NULL,17,19,10,557,NULL,0,'2025-09-11 01:45:30','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'physical','2089442066414',NULL,0,'auto_generate',0,0,0,NULL),(52,'Historic Alarm Clock',NULL,NULL,NULL,'published','[\"products\\/21.jpg\"]',NULL,'XU-190-A1-A3',0,12,0,1,'in_stock',0,4,1,0,0,0.00,0,1970,NULL,NULL,NULL,17,19,10,557,NULL,0,'2025-09-11 01:45:30','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'physical','8323424261348',NULL,0,'auto_generate',0,0,0,NULL),(53,'Black Glasses',NULL,NULL,NULL,'published','[\"products\\/22-1.jpg\"]',NULL,'DT-108-A1',0,15,0,1,'in_stock',0,7,1,0,0,0.00,0,592,NULL,NULL,NULL,12,18,17,633,NULL,0,'2025-09-11 01:45:30','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'physical','7474980288476',NULL,0,'auto_generate',0,0,0,NULL),(54,'Black Glasses',NULL,NULL,NULL,'published','[\"products\\/22.jpg\"]',NULL,'DT-108-A1-A2',0,15,0,1,'in_stock',0,7,1,0,0,0.00,0,592,NULL,NULL,NULL,12,18,17,633,NULL,0,'2025-09-11 01:45:30','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'physical','8452467800082',NULL,0,'auto_generate',0,0,0,NULL),(55,'Phillips Mouse',NULL,NULL,NULL,'published','[\"products\\/23-1.jpg\"]',NULL,'QK-146-A1',0,14,0,1,'in_stock',0,3,1,0,0,0.00,0,819,NULL,NULL,NULL,13,14,13,567,NULL,0,'2025-09-11 01:45:30','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'physical','8261982139528',NULL,0,'auto_generate',0,0,0,NULL),(56,'Phillips Mouse',NULL,NULL,NULL,'published','[\"products\\/23.jpg\"]',NULL,'QK-146-A1-A2',0,14,0,1,'in_stock',0,3,1,0,0,0.00,0,819,NULL,NULL,NULL,13,14,13,567,NULL,0,'2025-09-11 01:45:30','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'physical','8064641786312',NULL,0,'auto_generate',0,0,0,NULL),(57,'Phillips Mouse',NULL,NULL,NULL,'published','[\"products\\/23.jpg\"]',NULL,'QK-146-A1-A3',0,14,0,1,'in_stock',0,3,1,0,0,0.00,0,819,NULL,NULL,NULL,13,14,13,567,NULL,0,'2025-09-11 01:45:30','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'physical','2707065249631',NULL,0,'auto_generate',0,0,0,NULL),(58,'Phillips Mouse',NULL,NULL,NULL,'published','[\"products\\/23.jpg\"]',NULL,'QK-146-A1-A4',0,14,0,1,'in_stock',0,3,1,0,0,0.00,0,819,NULL,NULL,NULL,13,14,13,567,NULL,0,'2025-09-11 01:45:30','2025-09-11 01:45:52',0,'Botble\\ACL\\Models\\User',NULL,'physical','7629894607930',NULL,0,'auto_generate',0,0,0,NULL);
/*!40000 ALTER TABLE `ec_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_products_translations`
--

DROP TABLE IF EXISTS `ec_products_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_products_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_products_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `content` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`lang_code`,`ec_products_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_products_translations`
--

LOCK TABLES `ec_products_translations` WRITE;
/*!40000 ALTER TABLE `ec_products_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_products_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_review_replies`
--

DROP TABLE IF EXISTS `ec_review_replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_review_replies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `review_id` bigint unsigned NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ec_review_replies_review_id_user_id_unique` (`review_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_review_replies`
--

LOCK TABLES `ec_review_replies` WRITE;
/*!40000 ALTER TABLE `ec_review_replies` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_review_replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_reviews`
--

DROP TABLE IF EXISTS `ec_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned DEFAULT NULL,
  `customer_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_id` bigint unsigned NOT NULL,
  `star` double NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `images` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ec_reviews_product_id_customer_id_unique` (`product_id`,`customer_id`),
  KEY `ec_reviews_product_id_customer_id_status_created_at_index` (`product_id`,`customer_id`,`status`,`created_at`),
  KEY `review_relation_index` (`product_id`,`customer_id`,`status`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_reviews`
--

LOCK TABLES `ec_reviews` WRITE;
/*!40000 ALTER TABLE `ec_reviews` DISABLE KEYS */;
INSERT INTO `ec_reviews` VALUES (1,1,NULL,NULL,24,5,'Good app, good backup service and support. Good documentation.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/14-1.jpg\"]'),(2,8,NULL,NULL,20,2,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\",\"products\\/2.jpg\",\"products\\/3-2.jpg\",\"products\\/11-1.jpg\"]'),(3,2,NULL,NULL,21,1,'Solution is too robust for our purpose so we didn\'t use it at the end. But I appreciate customer support during initial configuration.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3.jpg\",\"products\\/5.jpg\",\"products\\/9-1.jpg\"]'),(4,1,NULL,NULL,23,2,'Clean & perfect source code','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-2.jpg\",\"products\\/3.jpg\",\"products\\/8-1.jpg\"]'),(5,9,NULL,NULL,5,5,'Second or third time that I buy a Botble product, happy with the products and support. You guys do a good job :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5.jpg\",\"products\\/6-1.jpg\",\"products\\/14-1.jpg\",\"products\\/20-1.jpg\"]'),(6,5,NULL,NULL,12,4,'Best ecommerce CMS online store!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/11.jpg\",\"products\\/13.jpg\",\"products\\/24-1.jpg\"]'),(7,8,NULL,NULL,4,3,'Ok good product. I have some issues in customizations. But its not correct to blame the developer. The product is good. Good luck for your business.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1.jpg\",\"products\\/16.jpg\"]'),(8,6,NULL,NULL,12,2,'The code is good, in general, if you like it, can you give it 5 stars?','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-3.jpg\",\"products\\/3-2.jpg\",\"products\\/15.jpg\"]'),(9,3,NULL,NULL,14,5,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/7-1.jpg\",\"products\\/9-1.jpg\",\"products\\/16.jpg\"]'),(10,3,NULL,NULL,24,4,'Best ecommerce CMS online store!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5.jpg\",\"products\\/11-1.jpg\",\"products\\/17.jpg\"]'),(11,8,NULL,NULL,14,5,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/20-1.jpg\"]'),(12,9,NULL,NULL,2,1,'Ok good product. I have some issues in customizations. But its not correct to blame the developer. The product is good. Good luck for your business.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\",\"products\\/19.jpg\",\"products\\/23.jpg\"]'),(13,8,NULL,NULL,6,3,'Solution is too robust for our purpose so we didn\'t use it at the end. But I appreciate customer support during initial configuration.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/9.jpg\",\"products\\/11-1.jpg\",\"products\\/18-1.jpg\",\"products\\/19-1.jpg\"]'),(14,5,NULL,NULL,14,2,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-2.jpg\",\"products\\/5-1.jpg\",\"products\\/14-1.jpg\",\"products\\/17.jpg\"]'),(15,2,NULL,NULL,16,5,'I Love this Script. I also found how to add other fees. Now I just wait the BIG update for the Marketplace with the Bulk Import. Just do not forget to make it to be Multi-language for us the Botble Fans.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\",\"products\\/5-2.jpg\",\"products\\/20.jpg\",\"products\\/23-1.jpg\"]'),(16,2,NULL,NULL,15,1,'Best ecommerce CMS online store!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/18.jpg\",\"products\\/20-1.jpg\"]'),(17,1,NULL,NULL,10,1,'Second or third time that I buy a Botble product, happy with the products and support. You guys do a good job :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\",\"products\\/3-3.jpg\",\"products\\/23-1.jpg\"]'),(18,9,NULL,NULL,15,1,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\",\"products\\/9.jpg\",\"products\\/22-1.jpg\",\"products\\/23.jpg\"]'),(19,6,NULL,NULL,21,2,'Amazing code, amazing support. Overall, im really confident in Botble and im happy I made the right choice! Thank you so much guys for coding this masterpiece','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\"]'),(20,7,NULL,NULL,15,1,'Very enthusiastic support! Excellent code is written. It\'s a true pleasure working with.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-2.jpg\"]'),(21,10,NULL,NULL,21,1,'Great E-commerce system. And much more : Wonderful Customer Support.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/15-1.jpg\",\"products\\/15.jpg\",\"products\\/16.jpg\"]'),(22,10,NULL,NULL,20,1,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5.jpg\"]'),(23,9,NULL,NULL,9,3,'Clean & perfect source code','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1.jpg\",\"products\\/2-2.jpg\"]'),(24,9,NULL,NULL,13,4,'Ok good product. I have some issues in customizations. But its not correct to blame the developer. The product is good. Good luck for your business.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/6.jpg\"]'),(25,1,NULL,NULL,17,1,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-3.jpg\",\"products\\/4.jpg\",\"products\\/12.jpg\",\"products\\/13-1.jpg\"]'),(26,9,NULL,NULL,17,3,'I Love this Script. I also found how to add other fees. Now I just wait the BIG update for the Marketplace with the Bulk Import. Just do not forget to make it to be Multi-language for us the Botble Fans.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-1.jpg\",\"products\\/10-1.jpg\"]'),(27,10,NULL,NULL,18,1,'Second or third time that I buy a Botble product, happy with the products and support. You guys do a good job :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\"]'),(30,1,NULL,NULL,20,3,'Great E-commerce system. And much more : Wonderful Customer Support.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\"]'),(31,8,NULL,NULL,10,3,'The best store template! Excellent coding! Very good support! Thank you so much for all the help, I really appreciated.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/22-1.jpg\"]'),(32,2,NULL,NULL,9,3,'Those guys now what they are doing, the release such a good product that it\'s a pleasure to work with ! Even when I was stuck on the project, I created a ticket and the next day it was replied by the team. GOOD JOB guys. I love working with them :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/8-1.jpg\",\"products\\/8.jpg\",\"products\\/10.jpg\"]'),(33,5,NULL,NULL,10,4,'Those guys now what they are doing, the release such a good product that it\'s a pleasure to work with ! Even when I was stuck on the project, I created a ticket and the next day it was replied by the team. GOOD JOB guys. I love working with them :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/8-1.jpg\"]'),(35,5,NULL,NULL,24,3,'Clean & perfect source code','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-3.jpg\",\"products\\/5.jpg\",\"products\\/6-1.jpg\",\"products\\/20-1.jpg\"]'),(36,4,NULL,NULL,13,3,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-3.jpg\",\"products\\/16.jpg\",\"products\\/21-1.jpg\",\"products\\/21.jpg\"]'),(37,4,NULL,NULL,22,5,'We have received brilliant service support and will be expanding the features with the developer. Nice product!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/8.jpg\",\"products\\/19-1.jpg\"]'),(39,4,NULL,NULL,21,5,'Great E-commerce system. And much more : Wonderful Customer Support.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/22-1.jpg\"]'),(40,4,NULL,NULL,4,3,'Second or third time that I buy a Botble product, happy with the products and support. You guys do a good job :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-2.jpg\",\"products\\/7-1.jpg\",\"products\\/18-2.jpg\",\"products\\/24-1.jpg\"]'),(41,7,NULL,NULL,21,2,'The best ecommerce CMS! Excellent coding! best support service! Thank you so much..... I really like your hard work.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\",\"products\\/8.jpg\",\"products\\/9.jpg\",\"products\\/19-1.jpg\"]'),(43,5,NULL,NULL,9,3,'Customer Support are grade (A*), however the code is a way too over engineered for it\'s purpose.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-1.jpg\",\"products\\/22-1.jpg\"]'),(44,7,NULL,NULL,20,1,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\",\"products\\/24-1.jpg\"]'),(45,7,NULL,NULL,11,4,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-3.jpg\",\"products\\/4.jpg\",\"products\\/8-1.jpg\"]'),(46,3,NULL,NULL,18,5,'Second or third time that I buy a Botble product, happy with the products and support. You guys do a good job :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\",\"products\\/5.jpg\",\"products\\/15.jpg\",\"products\\/18-2.jpg\"]'),(47,3,NULL,NULL,22,2,'The script is the best of its class, fast, easy to implement and work with , and the most important thing is the great support team , Recommend with no doubt.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-1.jpg\",\"products\\/5-1.jpg\"]'),(48,3,NULL,NULL,4,3,'I Love this Script. I also found how to add other fees. Now I just wait the BIG update for the Marketplace with the Bulk Import. Just do not forget to make it to be Multi-language for us the Botble Fans.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-2.jpg\",\"products\\/6-1.jpg\",\"products\\/21-1.jpg\",\"products\\/24.jpg\"]'),(49,8,NULL,NULL,5,4,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-3.jpg\",\"products\\/5-2.jpg\",\"products\\/14.jpg\",\"products\\/24-1.jpg\"]'),(51,3,NULL,NULL,19,3,'Those guys now what they are doing, the release such a good product that it\'s a pleasure to work with ! Even when I was stuck on the project, I created a ticket and the next day it was replied by the team. GOOD JOB guys. I love working with them :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\",\"products\\/15.jpg\",\"products\\/24-1.jpg\"]'),(52,3,NULL,NULL,3,5,'As a developer I reviewed this script. This is really awesome ecommerce script. I have convinced when I noticed that it\'s built on fully WordPress concept.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/11.jpg\",\"products\\/14-1.jpg\",\"products\\/15-1.jpg\",\"products\\/22-1.jpg\"]'),(55,5,NULL,NULL,3,4,'Perfect +++++++++ i love it really also i get to fast ticket answers... Thanks Lot BOTBLE Teams','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-3.jpg\",\"products\\/5-2.jpg\",\"products\\/18-1.jpg\",\"products\\/22-1.jpg\"]'),(56,8,NULL,NULL,21,4,'Good app, good backup service and support. Good documentation.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-2.jpg\",\"products\\/1.jpg\",\"products\\/22-1.jpg\"]'),(57,6,NULL,NULL,9,2,'As a developer I reviewed this script. This is really awesome ecommerce script. I have convinced when I noticed that it\'s built on fully WordPress concept.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3.jpg\",\"products\\/22.jpg\"]'),(58,9,NULL,NULL,6,3,'Amazing code, amazing support. Overall, im really confident in Botble and im happy I made the right choice! Thank you so much guys for coding this masterpiece','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\"]'),(59,6,NULL,NULL,20,2,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2.jpg\",\"products\\/4.jpg\"]'),(60,8,NULL,NULL,16,2,'Very enthusiastic support! Excellent code is written. It\'s a true pleasure working with.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/18.jpg\",\"products\\/20-1.jpg\"]'),(62,9,NULL,NULL,10,2,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-2.jpg\",\"products\\/3-1.jpg\",\"products\\/3-3.jpg\",\"products\\/5-1.jpg\"]'),(63,1,NULL,NULL,19,2,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/16.jpg\",\"products\\/19-1.jpg\"]'),(64,2,NULL,NULL,1,3,'These guys are amazing! Responses immediately, amazing support and help... I immediately feel at ease after Purchasing..','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/7-1.jpg\",\"products\\/20.jpg\"]'),(65,10,NULL,NULL,9,2,'Solution is too robust for our purpose so we didn\'t use it at the end. But I appreciate customer support during initial configuration.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/8-1.jpg\"]'),(66,6,NULL,NULL,1,3,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5.jpg\",\"products\\/22-1.jpg\"]'),(68,3,NULL,NULL,17,2,'Great E-commerce system. And much more : Wonderful Customer Support.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/7-1.jpg\",\"products\\/23-1.jpg\",\"products\\/23.jpg\"]'),(70,7,NULL,NULL,8,5,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2.jpg\",\"products\\/20.jpg\",\"products\\/24-1.jpg\"]'),(71,5,NULL,NULL,6,4,'Those guys now what they are doing, the release such a good product that it\'s a pleasure to work with ! Even when I was stuck on the project, I created a ticket and the next day it was replied by the team. GOOD JOB guys. I love working with them :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/14.jpg\"]'),(73,5,NULL,NULL,1,1,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/8-1.jpg\",\"products\\/10.jpg\",\"products\\/15.jpg\"]'),(74,5,NULL,NULL,22,1,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-3.jpg\",\"products\\/5-2.jpg\",\"products\\/21.jpg\"]'),(75,7,NULL,NULL,6,4,'Second or third time that I buy a Botble product, happy with the products and support. You guys do a good job :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-1.jpg\",\"products\\/5.jpg\",\"products\\/7-1.jpg\",\"products\\/9.jpg\"]'),(77,9,NULL,NULL,19,4,'Customer Support are grade (A*), however the code is a way too over engineered for it\'s purpose.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/6-1.jpg\",\"products\\/17.jpg\"]'),(79,8,NULL,NULL,19,5,'Those guys now what they are doing, the release such a good product that it\'s a pleasure to work with ! Even when I was stuck on the project, I created a ticket and the next day it was replied by the team. GOOD JOB guys. I love working with them :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3.jpg\",\"products\\/9-1.jpg\",\"products\\/14.jpg\",\"products\\/24.jpg\"]'),(80,8,NULL,NULL,18,5,'Best ecommerce CMS online store!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/15-1.jpg\",\"products\\/21-1.jpg\"]'),(82,5,NULL,NULL,19,4,'The script is the best of its class, fast, easy to implement and work with , and the most important thing is the great support team , Recommend with no doubt.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/21-1.jpg\"]'),(83,10,NULL,NULL,19,3,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/18-2.jpg\"]'),(84,2,NULL,NULL,8,4,'We have received brilliant service support and will be expanding the features with the developer. Nice product!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5.jpg\",\"products\\/8.jpg\",\"products\\/16.jpg\",\"products\\/17.jpg\"]'),(85,2,NULL,NULL,24,1,'As a developer I reviewed this script. This is really awesome ecommerce script. I have convinced when I noticed that it\'s built on fully WordPress concept.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\"]'),(87,10,NULL,NULL,12,4,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\",\"products\\/22.jpg\"]'),(89,5,NULL,NULL,11,1,'Best ecommerce CMS online store!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5.jpg\",\"products\\/20.jpg\"]'),(91,4,NULL,NULL,20,4,'Amazing code, amazing support. Overall, im really confident in Botble and im happy I made the right choice! Thank you so much guys for coding this masterpiece','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4.jpg\",\"products\\/10-1.jpg\"]'),(92,5,NULL,NULL,4,2,'Very enthusiastic support! Excellent code is written. It\'s a true pleasure working with.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/22.jpg\",\"products\\/24.jpg\"]'),(93,10,NULL,NULL,4,4,'The best store template! Excellent coding! Very good support! Thank you so much for all the help, I really appreciated.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-1.jpg\",\"products\\/10-1.jpg\",\"products\\/14-1.jpg\",\"products\\/24.jpg\"]'),(94,6,NULL,NULL,23,3,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4.jpg\"]'),(95,6,NULL,NULL,4,1,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-2.jpg\",\"products\\/5.jpg\",\"products\\/6-1.jpg\"]'),(96,3,NULL,NULL,12,3,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-3.jpg\",\"products\\/20.jpg\",\"products\\/22.jpg\"]'),(99,10,NULL,NULL,6,2,'Solution is too robust for our purpose so we didn\'t use it at the end. But I appreciate customer support during initial configuration.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4.jpg\",\"products\\/11.jpg\",\"products\\/18.jpg\"]'),(100,1,NULL,NULL,9,5,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-3.jpg\",\"products\\/4-1.jpg\",\"products\\/13.jpg\",\"products\\/21-1.jpg\"]'),(101,7,NULL,NULL,23,2,'Clean & perfect source code','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\",\"products\\/3-1.jpg\",\"products\\/3.jpg\"]'),(103,9,NULL,NULL,4,1,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-3.jpg\",\"products\\/15-1.jpg\"]'),(104,5,NULL,NULL,13,2,'Great E-commerce system. And much more : Wonderful Customer Support.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/11.jpg\",\"products\\/12.jpg\",\"products\\/15-1.jpg\",\"products\\/23-1.jpg\"]'),(106,1,NULL,NULL,14,4,'Those guys now what they are doing, the release such a good product that it\'s a pleasure to work with ! Even when I was stuck on the project, I created a ticket and the next day it was replied by the team. GOOD JOB guys. I love working with them :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3.jpg\"]'),(108,1,NULL,NULL,6,1,'Amazing code, amazing support. Overall, im really confident in Botble and im happy I made the right choice! Thank you so much guys for coding this masterpiece','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/9.jpg\",\"products\\/15.jpg\"]'),(110,5,NULL,NULL,21,3,'Second or third time that I buy a Botble product, happy with the products and support. You guys do a good job :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-1.jpg\",\"products\\/19-1.jpg\",\"products\\/20-1.jpg\"]'),(112,5,NULL,NULL,18,3,'Those guys now what they are doing, the release such a good product that it\'s a pleasure to work with ! Even when I was stuck on the project, I created a ticket and the next day it was replied by the team. GOOD JOB guys. I love working with them :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/7.jpg\",\"products\\/13-1.jpg\"]'),(113,2,NULL,NULL,22,5,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3.jpg\",\"products\\/12.jpg\"]'),(114,6,NULL,NULL,5,1,'Perfect +++++++++ i love it really also i get to fast ticket answers... Thanks Lot BOTBLE Teams','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\",\"products\\/9.jpg\",\"products\\/10-1.jpg\",\"products\\/14.jpg\"]'),(116,2,NULL,NULL,11,2,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/20.jpg\",\"products\\/22-1.jpg\"]'),(117,3,NULL,NULL,16,3,'The best ecommerce CMS! Excellent coding! best support service! Thank you so much..... I really like your hard work.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-3.jpg\",\"products\\/5-1.jpg\",\"products\\/13.jpg\",\"products\\/15.jpg\"]'),(118,5,NULL,NULL,5,4,'Best ecommerce CMS online store!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-1.jpg\",\"products\\/8-1.jpg\",\"products\\/14.jpg\"]'),(121,10,NULL,NULL,14,4,'Clean & perfect source code','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\",\"products\\/4-3.jpg\",\"products\\/7.jpg\"]'),(122,7,NULL,NULL,19,2,'Good app, good backup service and support. Good documentation.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/14-1.jpg\"]'),(124,1,NULL,NULL,16,5,'Clean & perfect source code','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/13.jpg\",\"products\\/21-1.jpg\",\"products\\/24-1.jpg\"]'),(129,10,NULL,NULL,1,1,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-1.jpg\",\"products\\/10.jpg\",\"products\\/11.jpg\",\"products\\/16.jpg\"]'),(133,3,NULL,NULL,8,2,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/10.jpg\",\"products\\/21-1.jpg\",\"products\\/21.jpg\"]'),(134,1,NULL,NULL,15,3,'Perfect +++++++++ i love it really also i get to fast ticket answers... Thanks Lot BOTBLE Teams','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\",\"products\\/15-1.jpg\"]'),(135,2,NULL,NULL,4,2,'Ok good product. I have some issues in customizations. But its not correct to blame the developer. The product is good. Good luck for your business.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-1.jpg\",\"products\\/3-3.jpg\",\"products\\/4.jpg\"]'),(139,2,NULL,NULL,13,1,'Amazing code, amazing support. Overall, im really confident in Botble and im happy I made the right choice! Thank you so much guys for coding this masterpiece','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/8.jpg\",\"products\\/11-1.jpg\",\"products\\/18-2.jpg\",\"products\\/23.jpg\"]'),(140,10,NULL,NULL,17,2,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/13-1.jpg\",\"products\\/22-1.jpg\"]'),(141,7,NULL,NULL,24,1,'Those guys now what they are doing, the release such a good product that it\'s a pleasure to work with ! Even when I was stuck on the project, I created a ticket and the next day it was replied by the team. GOOD JOB guys. I love working with them :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\",\"products\\/15.jpg\",\"products\\/22-1.jpg\"]'),(143,1,NULL,NULL,8,5,'Great system, great support, good job Botble. I\'m looking forward to more great functional plugins.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-3.jpg\",\"products\\/8-1.jpg\",\"products\\/16.jpg\",\"products\\/17.jpg\"]'),(144,6,NULL,NULL,11,2,'Customer Support are grade (A*), however the code is a way too over engineered for it\'s purpose.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\"]'),(145,7,NULL,NULL,14,4,'Ok good product. I have some issues in customizations. But its not correct to blame the developer. The product is good. Good luck for your business.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/13.jpg\"]'),(149,2,NULL,NULL,14,5,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/14.jpg\"]'),(151,8,NULL,NULL,13,5,'Ok good product. I have some issues in customizations. But its not correct to blame the developer. The product is good. Good luck for your business.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/11.jpg\",\"products\\/18-2.jpg\"]'),(152,3,NULL,NULL,2,1,'The best ecommerce CMS! Excellent coding! best support service! Thank you so much..... I really like your hard work.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/10.jpg\"]'),(154,2,NULL,NULL,10,3,'I Love this Script. I also found how to add other fees. Now I just wait the BIG update for the Marketplace with the Bulk Import. Just do not forget to make it to be Multi-language for us the Botble Fans.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\"]'),(155,3,NULL,NULL,21,3,'The best store template! Excellent coding! Very good support! Thank you so much for all the help, I really appreciated.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/9-1.jpg\",\"products\\/11.jpg\",\"products\\/14-1.jpg\",\"products\\/22-1.jpg\"]'),(156,4,NULL,NULL,15,5,'Perfect +++++++++ i love it really also i get to fast ticket answers... Thanks Lot BOTBLE Teams','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\",\"products\\/3.jpg\",\"products\\/5-2.jpg\",\"products\\/14-1.jpg\"]'),(157,9,NULL,NULL,18,4,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-2.jpg\",\"products\\/2-1.jpg\",\"products\\/4.jpg\",\"products\\/14-1.jpg\"]'),(158,5,NULL,NULL,15,2,'I Love this Script. I also found how to add other fees. Now I just wait the BIG update for the Marketplace with the Bulk Import. Just do not forget to make it to be Multi-language for us the Botble Fans.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1.jpg\",\"products\\/4-3.jpg\",\"products\\/7-1.jpg\",\"products\\/20-1.jpg\"]'),(159,3,NULL,NULL,5,3,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\",\"products\\/6-1.jpg\",\"products\\/24-1.jpg\"]'),(161,3,NULL,NULL,11,5,'Great E-commerce system. And much more : Wonderful Customer Support.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/9-1.jpg\",\"products\\/10-1.jpg\",\"products\\/22.jpg\",\"products\\/24.jpg\"]'),(166,3,NULL,NULL,6,2,'Ok good product. I have some issues in customizations. But its not correct to blame the developer. The product is good. Good luck for your business.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\",\"products\\/19.jpg\"]'),(167,8,NULL,NULL,11,5,'Customer Support are grade (A*), however the code is a way too over engineered for it\'s purpose.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-2.jpg\",\"products\\/22.jpg\",\"products\\/23.jpg\",\"products\\/24-1.jpg\"]'),(171,4,NULL,NULL,3,1,'Those guys now what they are doing, the release such a good product that it\'s a pleasure to work with ! Even when I was stuck on the project, I created a ticket and the next day it was replied by the team. GOOD JOB guys. I love working with them :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/6.jpg\"]'),(176,6,NULL,NULL,15,3,'Second or third time that I buy a Botble product, happy with the products and support. You guys do a good job :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-3.jpg\",\"products\\/12.jpg\",\"products\\/22.jpg\"]'),(177,4,NULL,NULL,24,4,'The best store template! Excellent coding! Very good support! Thank you so much for all the help, I really appreciated.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-3.jpg\",\"products\\/18-1.jpg\"]'),(181,6,NULL,NULL,7,5,'Clean & perfect source code','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/14.jpg\"]'),(182,9,NULL,NULL,16,3,'Very enthusiastic support! Excellent code is written. It\'s a true pleasure working with.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3.jpg\",\"products\\/4-1.jpg\",\"products\\/9-1.jpg\",\"products\\/15.jpg\"]'),(183,9,NULL,NULL,12,5,'Great E-commerce system. And much more : Wonderful Customer Support.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\",\"products\\/13.jpg\",\"products\\/18-2.jpg\",\"products\\/24.jpg\"]'),(185,7,NULL,NULL,7,3,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-1.jpg\",\"products\\/5.jpg\",\"products\\/12.jpg\",\"products\\/23.jpg\"]'),(188,7,NULL,NULL,22,3,'Very enthusiastic support! Excellent code is written. It\'s a true pleasure working with.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/13-1.jpg\",\"products\\/17.jpg\",\"products\\/19.jpg\"]'),(190,1,NULL,NULL,18,4,'We have received brilliant service support and will be expanding the features with the developer. Nice product!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/12.jpg\"]'),(194,4,NULL,NULL,6,1,'Perfect +++++++++ i love it really also i get to fast ticket answers... Thanks Lot BOTBLE Teams','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-2.jpg\",\"products\\/4-1.jpg\",\"products\\/22.jpg\",\"products\\/23.jpg\"]'),(197,6,NULL,NULL,3,2,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/19-1.jpg\"]'),(199,7,NULL,NULL,16,5,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/24.jpg\"]'),(201,3,NULL,NULL,7,2,'Perfect +++++++++ i love it really also i get to fast ticket answers... Thanks Lot BOTBLE Teams','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-3.jpg\",\"products\\/3.jpg\",\"products\\/11.jpg\",\"products\\/15.jpg\"]'),(204,4,NULL,NULL,17,3,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/9-1.jpg\",\"products\\/19-1.jpg\",\"products\\/20.jpg\",\"products\\/22-1.jpg\"]'),(206,10,NULL,NULL,24,1,'Solution is too robust for our purpose so we didn\'t use it at the end. But I appreciate customer support during initial configuration.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-2.jpg\",\"products\\/7-1.jpg\",\"products\\/7.jpg\"]'),(207,7,NULL,NULL,18,1,'As a developer I reviewed this script. This is really awesome ecommerce script. I have convinced when I noticed that it\'s built on fully WordPress concept.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\",\"products\\/5-1.jpg\",\"products\\/18.jpg\"]'),(209,10,NULL,NULL,3,4,'As a developer I reviewed this script. This is really awesome ecommerce script. I have convinced when I noticed that it\'s built on fully WordPress concept.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-2.jpg\",\"products\\/2.jpg\",\"products\\/24.jpg\"]'),(210,6,NULL,NULL,6,3,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-3.jpg\",\"products\\/3-1.jpg\",\"products\\/24-1.jpg\",\"products\\/24.jpg\"]'),(213,5,NULL,NULL,8,1,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/10.jpg\",\"products\\/21.jpg\",\"products\\/22.jpg\"]'),(214,10,NULL,NULL,22,5,'Customer Support are grade (A*), however the code is a way too over engineered for it\'s purpose.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-1.jpg\"]'),(215,2,NULL,NULL,2,4,'The code is good, in general, if you like it, can you give it 5 stars?','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-3.jpg\",\"products\\/19-1.jpg\",\"products\\/23-1.jpg\"]'),(224,8,NULL,NULL,9,2,'The best ecommerce CMS! Excellent coding! best support service! Thank you so much..... I really like your hard work.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-3.jpg\"]'),(225,10,NULL,NULL,7,4,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1.jpg\",\"products\\/2-1.jpg\",\"products\\/9.jpg\",\"products\\/15-1.jpg\"]'),(231,4,NULL,NULL,9,2,'Perfect +++++++++ i love it really also i get to fast ticket answers... Thanks Lot BOTBLE Teams','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/12-1.jpg\"]'),(234,8,NULL,NULL,23,3,'These guys are amazing! Responses immediately, amazing support and help... I immediately feel at ease after Purchasing..','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-3.jpg\",\"products\\/23.jpg\"]'),(235,6,NULL,NULL,13,3,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3.jpg\",\"products\\/4-3.jpg\",\"products\\/4.jpg\",\"products\\/22.jpg\"]'),(238,6,NULL,NULL,16,2,'Customer Support are grade (A*), however the code is a way too over engineered for it\'s purpose.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4.jpg\",\"products\\/9-1.jpg\",\"products\\/24.jpg\"]'),(239,2,NULL,NULL,5,1,'Perfect +++++++++ i love it really also i get to fast ticket answers... Thanks Lot BOTBLE Teams','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-3.jpg\",\"products\\/5-2.jpg\",\"products\\/19-1.jpg\"]'),(240,2,NULL,NULL,23,4,'We have received brilliant service support and will be expanding the features with the developer. Nice product!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-1.jpg\",\"products\\/9-1.jpg\",\"products\\/21.jpg\"]'),(241,7,NULL,NULL,9,4,'The best ecommerce CMS! Excellent coding! best support service! Thank you so much..... I really like your hard work.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-1.jpg\",\"products\\/2-2.jpg\",\"products\\/14.jpg\"]'),(242,6,NULL,NULL,14,2,'We have received brilliant service support and will be expanding the features with the developer. Nice product!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\",\"products\\/23-1.jpg\"]'),(244,1,NULL,NULL,21,4,'Great system, great support, good job Botble. I\'m looking forward to more great functional plugins.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/12.jpg\",\"products\\/14-1.jpg\",\"products\\/21.jpg\",\"products\\/23.jpg\"]'),(245,6,NULL,NULL,8,1,'Clean & perfect source code','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\",\"products\\/6.jpg\",\"products\\/7.jpg\",\"products\\/8-1.jpg\"]'),(246,10,NULL,NULL,15,2,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-1.jpg\",\"products\\/12.jpg\",\"products\\/21-1.jpg\"]'),(249,3,NULL,NULL,15,1,'Ok good product. I have some issues in customizations. But its not correct to blame the developer. The product is good. Good luck for your business.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-1.jpg\",\"products\\/12.jpg\",\"products\\/13.jpg\",\"products\\/21-1.jpg\"]'),(250,10,NULL,NULL,5,2,'The code is good, in general, if you like it, can you give it 5 stars?','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/9.jpg\",\"products\\/18-1.jpg\"]'),(257,7,NULL,NULL,17,4,'Perfect +++++++++ i love it really also i get to fast ticket answers... Thanks Lot BOTBLE Teams','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/19.jpg\",\"products\\/22.jpg\"]'),(258,1,NULL,NULL,13,3,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3.jpg\",\"products\\/5-2.jpg\"]'),(260,8,NULL,NULL,7,4,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-3.jpg\",\"products\\/4-1.jpg\",\"products\\/14.jpg\",\"products\\/21-1.jpg\"]'),(263,1,NULL,NULL,7,5,'I Love this Script. I also found how to add other fees. Now I just wait the BIG update for the Marketplace with the Bulk Import. Just do not forget to make it to be Multi-language for us the Botble Fans.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/6.jpg\",\"products\\/18-1.jpg\"]'),(264,3,NULL,NULL,23,1,'Good app, good backup service and support. Good documentation.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-2.jpg\",\"products\\/8-1.jpg\",\"products\\/15-1.jpg\"]'),(267,10,NULL,NULL,10,4,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-2.jpg\",\"products\\/3-3.jpg\",\"products\\/20.jpg\"]'),(269,2,NULL,NULL,3,1,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4.jpg\",\"products\\/10-1.jpg\"]'),(271,7,NULL,NULL,12,3,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-3.jpg\",\"products\\/3-1.jpg\"]'),(279,4,NULL,NULL,19,4,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/9.jpg\",\"products\\/15-1.jpg\",\"products\\/21.jpg\"]'),(284,2,NULL,NULL,6,4,'The script is the best of its class, fast, easy to implement and work with , and the most important thing is the great support team , Recommend with no doubt.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-1.jpg\",\"products\\/17.jpg\"]'),(285,1,NULL,NULL,5,4,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/19-1.jpg\"]'),(287,6,NULL,NULL,18,3,'Those guys now what they are doing, the release such a good product that it\'s a pleasure to work with ! Even when I was stuck on the project, I created a ticket and the next day it was replied by the team. GOOD JOB guys. I love working with them :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-1.jpg\",\"products\\/9-1.jpg\",\"products\\/11.jpg\"]'),(288,4,NULL,NULL,23,4,'As a developer I reviewed this script. This is really awesome ecommerce script. I have convinced when I noticed that it\'s built on fully WordPress concept.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/9-1.jpg\"]'),(290,8,NULL,NULL,24,5,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/15.jpg\",\"products\\/18-1.jpg\"]'),(297,4,NULL,NULL,11,2,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\"]'),(306,3,NULL,NULL,13,4,'Very enthusiastic support! Excellent code is written. It\'s a true pleasure working with.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3.jpg\"]'),(318,1,NULL,NULL,4,5,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\",\"products\\/12.jpg\",\"products\\/24-1.jpg\"]'),(323,4,NULL,NULL,2,4,'Clean & perfect source code','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-2.jpg\"]'),(324,9,NULL,NULL,22,1,'Solution is too robust for our purpose so we didn\'t use it at the end. But I appreciate customer support during initial configuration.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-1.jpg\",\"products\\/4-3.jpg\",\"products\\/17.jpg\"]'),(326,6,NULL,NULL,19,5,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/21.jpg\"]'),(331,9,NULL,NULL,7,5,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-1.jpg\",\"products\\/5-3.jpg\"]'),(342,1,NULL,NULL,11,3,'The best store template! Excellent coding! Very good support! Thank you so much for all the help, I really appreciated.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/9-1.jpg\",\"products\\/21.jpg\",\"products\\/22-1.jpg\"]'),(346,7,NULL,NULL,1,4,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\",\"products\\/14-1.jpg\"]'),(352,7,NULL,NULL,3,4,'These guys are amazing! Responses immediately, amazing support and help... I immediately feel at ease after Purchasing..','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4.jpg\",\"products\\/13.jpg\"]'),(356,10,NULL,NULL,8,3,'We have received brilliant service support and will be expanding the features with the developer. Nice product!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5.jpg\",\"products\\/16.jpg\"]'),(358,9,NULL,NULL,20,5,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/6.jpg\",\"products\\/12-1.jpg\",\"products\\/14-1.jpg\",\"products\\/18.jpg\"]'),(362,9,NULL,NULL,24,4,'As a developer I reviewed this script. This is really awesome ecommerce script. I have convinced when I noticed that it\'s built on fully WordPress concept.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1.jpg\"]'),(364,5,NULL,NULL,7,3,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\",\"products\\/4.jpg\",\"products\\/19.jpg\",\"products\\/24.jpg\"]'),(367,6,NULL,NULL,24,1,'Ok good product. I have some issues in customizations. But its not correct to blame the developer. The product is good. Good luck for your business.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2.jpg\",\"products\\/20-1.jpg\",\"products\\/23-1.jpg\"]'),(368,4,NULL,NULL,16,5,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-1.jpg\",\"products\\/8.jpg\",\"products\\/12-1.jpg\"]'),(370,9,NULL,NULL,21,5,'Very enthusiastic support! Excellent code is written. It\'s a true pleasure working with.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-2.jpg\",\"products\\/11.jpg\"]'),(376,6,NULL,NULL,10,1,'Customer Support are grade (A*), however the code is a way too over engineered for it\'s purpose.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-3.jpg\",\"products\\/15-1.jpg\",\"products\\/18-1.jpg\",\"products\\/21.jpg\"]'),(378,7,NULL,NULL,5,2,'Great system, great support, good job Botble. I\'m looking forward to more great functional plugins.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/14.jpg\"]'),(385,10,NULL,NULL,16,1,'The best ecommerce CMS! Excellent coding! best support service! Thank you so much..... I really like your hard work.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\",\"products\\/18.jpg\"]'),(386,4,NULL,NULL,18,2,'The best store template! Excellent coding! Very good support! Thank you so much for all the help, I really appreciated.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/22-1.jpg\"]'),(395,4,NULL,NULL,14,5,'The best store template! Excellent coding! Very good support! Thank you so much for all the help, I really appreciated.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-1.jpg\",\"products\\/1-3.jpg\",\"products\\/17.jpg\"]'),(397,2,NULL,NULL,19,1,'Best ecommerce CMS online store!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-3.jpg\",\"products\\/3-1.jpg\",\"products\\/20-1.jpg\"]'),(400,7,NULL,NULL,13,5,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\",\"products\\/14.jpg\"]'),(416,3,NULL,NULL,1,3,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-1.jpg\",\"products\\/21-1.jpg\"]'),(418,5,NULL,NULL,20,4,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/8.jpg\",\"products\\/10.jpg\",\"products\\/18-2.jpg\"]'),(420,6,NULL,NULL,22,3,'Perfect +++++++++ i love it really also i get to fast ticket answers... Thanks Lot BOTBLE Teams','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-2.jpg\",\"products\\/4-1.jpg\",\"products\\/20.jpg\"]'),(421,9,NULL,NULL,1,2,'Clean & perfect source code','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-1.jpg\",\"products\\/3-1.jpg\",\"products\\/5-1.jpg\",\"products\\/24-1.jpg\"]'),(422,9,NULL,NULL,3,4,'Great system, great support, good job Botble. I\'m looking forward to more great functional plugins.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/13-1.jpg\"]'),(424,9,NULL,NULL,11,1,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/8.jpg\",\"products\\/10.jpg\",\"products\\/18.jpg\"]'),(430,2,NULL,NULL,12,2,'The best ecommerce CMS! Excellent coding! best support service! Thank you so much..... I really like your hard work.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/11-1.jpg\",\"products\\/16.jpg\"]'),(437,8,NULL,NULL,1,4,'The code is good, in general, if you like it, can you give it 5 stars?','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1.jpg\"]'),(438,10,NULL,NULL,11,2,'These guys are amazing! Responses immediately, amazing support and help... I immediately feel at ease after Purchasing..','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/7-1.jpg\",\"products\\/13.jpg\",\"products\\/15-1.jpg\"]'),(448,2,NULL,NULL,7,1,'The code is good, in general, if you like it, can you give it 5 stars?','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3.jpg\",\"products\\/8.jpg\",\"products\\/18-1.jpg\",\"products\\/19.jpg\"]'),(450,6,NULL,NULL,2,4,'These guys are amazing! Responses immediately, amazing support and help... I immediately feel at ease after Purchasing..','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-1.jpg\",\"products\\/4.jpg\",\"products\\/5-1.jpg\",\"products\\/11-1.jpg\"]'),(456,10,NULL,NULL,2,3,'The best store template! Excellent coding! Very good support! Thank you so much for all the help, I really appreciated.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-1.jpg\",\"products\\/14.jpg\",\"products\\/21-1.jpg\"]'),(458,7,NULL,NULL,4,5,'Great system, great support, good job Botble. I\'m looking forward to more great functional plugins.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4.jpg\",\"products\\/5.jpg\",\"products\\/23-1.jpg\"]'),(460,4,NULL,NULL,7,3,'The best ecommerce CMS! Excellent coding! best support service! Thank you so much..... I really like your hard work.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-2.jpg\",\"products\\/17.jpg\"]'),(465,4,NULL,NULL,8,4,'Best ecommerce CMS online store!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-3.jpg\",\"products\\/5-2.jpg\",\"products\\/5.jpg\",\"products\\/15.jpg\"]'),(472,9,NULL,NULL,8,5,'Clean & perfect source code','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/19.jpg\",\"products\\/22-1.jpg\"]'),(474,4,NULL,NULL,12,5,'Very enthusiastic support! Excellent code is written. It\'s a true pleasure working with.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\",\"products\\/7.jpg\",\"products\\/23.jpg\"]'),(480,8,NULL,NULL,3,5,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-2.jpg\",\"products\\/5.jpg\",\"products\\/12.jpg\"]'),(494,3,NULL,NULL,9,5,'Perfect +++++++++ i love it really also i get to fast ticket answers... Thanks Lot BOTBLE Teams','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\",\"products\\/9.jpg\",\"products\\/13-1.jpg\"]'),(507,3,NULL,NULL,20,3,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1.jpg\",\"products\\/14.jpg\",\"products\\/15-1.jpg\",\"products\\/18-2.jpg\"]'),(508,5,NULL,NULL,17,2,'The best ecommerce CMS! Excellent coding! best support service! Thank you so much..... I really like your hard work.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/11.jpg\",\"products\\/17.jpg\",\"products\\/23-1.jpg\",\"products\\/23.jpg\"]'),(528,1,NULL,NULL,3,4,'The script is the best of its class, fast, easy to implement and work with , and the most important thing is the great support team , Recommend with no doubt.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-3.jpg\",\"products\\/4-3.jpg\",\"products\\/14.jpg\",\"products\\/19.jpg\"]'),(530,1,NULL,NULL,12,2,'Customer Support are grade (A*), however the code is a way too over engineered for it\'s purpose.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/6-1.jpg\",\"products\\/9-1.jpg\",\"products\\/17.jpg\",\"products\\/18.jpg\"]'),(534,1,NULL,NULL,22,4,'These guys are amazing! Responses immediately, amazing support and help... I immediately feel at ease after Purchasing..','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\",\"products\\/12.jpg\"]'),(538,5,NULL,NULL,23,1,'The best ecommerce CMS! Excellent coding! best support service! Thank you so much..... I really like your hard work.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/23.jpg\"]'),(574,8,NULL,NULL,22,3,'Great E-commerce system. And much more : Wonderful Customer Support.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-2.jpg\",\"products\\/19.jpg\"]'),(583,8,NULL,NULL,2,1,'Very enthusiastic support! Excellent code is written. It\'s a true pleasure working with.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-1.jpg\",\"products\\/9.jpg\"]'),(614,8,NULL,NULL,17,3,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/3-3.jpg\",\"products\\/5-2.jpg\",\"products\\/9-1.jpg\",\"products\\/12-1.jpg\"]'),(624,5,NULL,NULL,16,3,'Very enthusiastic support! Excellent code is written. It\'s a true pleasure working with.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1.jpg\"]'),(649,2,NULL,NULL,17,1,'Good app, good backup service and support. Good documentation.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-3.jpg\",\"products\\/8-1.jpg\"]'),(659,1,NULL,NULL,2,2,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/9-1.jpg\"]'),(661,2,NULL,NULL,18,2,'Clean & perfect source code','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-3.jpg\",\"products\\/6-1.jpg\",\"products\\/10.jpg\"]'),(672,5,NULL,NULL,2,4,'The best store template! Excellent coding! Very good support! Thank you so much for all the help, I really appreciated.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-2.jpg\",\"products\\/22-1.jpg\",\"products\\/24-1.jpg\"]'),(674,8,NULL,NULL,8,3,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-3.jpg\",\"products\\/8-1.jpg\",\"products\\/11.jpg\",\"products\\/13-1.jpg\"]'),(683,9,NULL,NULL,23,1,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-3.jpg\",\"products\\/9-1.jpg\",\"products\\/15-1.jpg\"]'),(695,8,NULL,NULL,12,2,'Second or third time that I buy a Botble product, happy with the products and support. You guys do a good job :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/4-2.jpg\",\"products\\/14.jpg\",\"products\\/18-1.jpg\",\"products\\/23.jpg\"]'),(703,8,NULL,NULL,15,4,'Amazing code, amazing support. Overall, im really confident in Botble and im happy I made the right choice! Thank you so much guys for coding this masterpiece','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5.jpg\",\"products\\/23.jpg\"]'),(714,4,NULL,NULL,10,2,'As a developer I reviewed this script. This is really awesome ecommerce script. I have convinced when I noticed that it\'s built on fully WordPress concept.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/24.jpg\"]'),(731,1,NULL,NULL,1,3,'For me the best eCommerce script on Envato at this moment: modern, clean code, a lot of great features. The customer support is great too: I always get an answer within hours!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/5-2.jpg\",\"products\\/8.jpg\",\"products\\/10.jpg\",\"products\\/24.jpg\"]'),(752,10,NULL,NULL,23,3,'I Love this Script. I also found how to add other fees. Now I just wait the BIG update for the Marketplace with the Bulk Import. Just do not forget to make it to be Multi-language for us the Botble Fans.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-1.jpg\"]'),(785,10,NULL,NULL,13,2,'This web app is really good in design, code quality & features. Besides, the customer support provided by the Botble team was really fast & helpful. You guys are awesome!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/8-1.jpg\"]'),(882,3,NULL,NULL,10,3,'It\'s not my first experience here on Codecanyon and I can honestly tell you all that Botble puts a LOT of effort into the support. They answer so fast, they helped me tons of times. REALLY by far THE BEST EXPERIENCE on Codecanyon. Those guys at Botble are so good that they deserve 5 stars. I recommend them, I trust them and I can\'t wait to see what they will sell in a near future. Thank you Botble :)','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-1.jpg\",\"products\\/2.jpg\",\"products\\/4-2.jpg\"]'),(893,4,NULL,NULL,1,3,'This script is well coded and is super fast. The support is pretty quick. Very patient and helpful team. I strongly recommend it and they deserve more than 5 stars.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/1-3.jpg\",\"products\\/12-1.jpg\"]'),(911,2,NULL,NULL,20,1,'Very enthusiastic support! Excellent code is written. It\'s a true pleasure working with.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/12-1.jpg\",\"products\\/14.jpg\"]'),(934,4,NULL,NULL,5,4,'Ok good product. I have some issues in customizations. But its not correct to blame the developer. The product is good. Good luck for your business.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/18-1.jpg\"]'),(961,6,NULL,NULL,17,5,'We have received brilliant service support and will be expanding the features with the developer. Nice product!','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/6-1.jpg\",\"products\\/21-1.jpg\",\"products\\/23-1.jpg\"]'),(991,7,NULL,NULL,2,2,'Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.','published','2025-09-11 01:45:39','2025-09-11 01:45:39','[\"products\\/2-2.jpg\",\"products\\/9.jpg\"]');
/*!40000 ALTER TABLE `ec_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_shared_wishlists`
--

DROP TABLE IF EXISTS `ec_shared_wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_shared_wishlists` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_ids` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ec_shared_wishlists_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_shared_wishlists`
--

LOCK TABLES `ec_shared_wishlists` WRITE;
/*!40000 ALTER TABLE `ec_shared_wishlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_shared_wishlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_shipment_histories`
--

DROP TABLE IF EXISTS `ec_shipment_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_shipment_histories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `shipment_id` bigint unsigned NOT NULL,
  `order_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Botble\\ACL\\Models\\User',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_shipment_histories`
--

LOCK TABLES `ec_shipment_histories` WRITE;
/*!40000 ALTER TABLE `ec_shipment_histories` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_shipment_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_shipments`
--

DROP TABLE IF EXISTS `ec_shipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_shipments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `weight` double DEFAULT '0',
  `shipment_id` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rate_id` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `cod_amount` decimal(15,2) DEFAULT '0.00',
  `cod_status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `cross_checking_status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `price` decimal(15,2) DEFAULT '0.00',
  `store_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `tracking_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_company_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estimate_date_shipped` datetime DEFAULT NULL,
  `date_shipped` datetime DEFAULT NULL,
  `customer_delivered_confirmed_at` timestamp NULL DEFAULT NULL,
  `label_url` text COLLATE utf8mb4_unicode_ci,
  `metadata` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_shipments`
--

LOCK TABLES `ec_shipments` WRITE;
/*!40000 ALTER TABLE `ec_shipments` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_shipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_shipping`
--

DROP TABLE IF EXISTS `ec_shipping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_shipping` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_shipping`
--

LOCK TABLES `ec_shipping` WRITE;
/*!40000 ALTER TABLE `ec_shipping` DISABLE KEYS */;
INSERT INTO `ec_shipping` VALUES (1,'All',NULL,'2025-09-11 01:45:39','2025-09-11 01:45:39');
/*!40000 ALTER TABLE `ec_shipping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_shipping_rule_items`
--

DROP TABLE IF EXISTS `ec_shipping_rule_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_shipping_rule_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `shipping_rule_id` bigint unsigned NOT NULL,
  `country` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adjustment_price` decimal(15,2) DEFAULT '0.00',
  `is_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_shipping_rule_items`
--

LOCK TABLES `ec_shipping_rule_items` WRITE;
/*!40000 ALTER TABLE `ec_shipping_rule_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_shipping_rule_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_shipping_rules`
--

DROP TABLE IF EXISTS `ec_shipping_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_shipping_rules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_id` bigint unsigned NOT NULL,
  `type` varchar(24) COLLATE utf8mb4_unicode_ci DEFAULT 'based_on_price',
  `from` decimal(15,2) DEFAULT '0.00',
  `to` decimal(15,2) DEFAULT '0.00',
  `price` decimal(15,2) DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_shipping_rules`
--

LOCK TABLES `ec_shipping_rules` WRITE;
/*!40000 ALTER TABLE `ec_shipping_rules` DISABLE KEYS */;
INSERT INTO `ec_shipping_rules` VALUES (1,'Free delivery',1,'based_on_price',1000.00,NULL,0.00,'2025-09-11 01:45:39','2025-09-11 01:45:39'),(2,'Flat Rate',1,'based_on_price',0.00,NULL,20.00,'2025-09-11 01:45:39','2025-09-11 01:45:39'),(3,'Local Pickup',1,'based_on_price',0.00,NULL,0.00,'2025-09-11 01:45:39','2025-09-11 01:45:39');
/*!40000 ALTER TABLE `ec_shipping_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_specification_attributes`
--

DROP TABLE IF EXISTS `ec_specification_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_specification_attributes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `group_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` text COLLATE utf8mb4_unicode_ci,
  `default_value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `author_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_specification_attributes_author_type_author_id_index` (`author_type`,`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_specification_attributes`
--

LOCK TABLES `ec_specification_attributes` WRITE;
/*!40000 ALTER TABLE `ec_specification_attributes` DISABLE KEYS */;
INSERT INTO `ec_specification_attributes` VALUES (1,1,'Height','text',NULL,NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL),(2,1,'Width','text',NULL,NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL),(3,1,'Weight','text',NULL,NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL),(4,2,'Power','text',NULL,NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL),(5,2,'Speed','text',NULL,NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL),(6,3,'Battery Life','text',NULL,NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL),(7,4,'Screen Size','text',NULL,NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL),(8,4,'Resolution','select','[\"1920x1080\",\"2560x1440\",\"3840x2160\"]',NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL);
/*!40000 ALTER TABLE `ec_specification_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_specification_attributes_translations`
--

DROP TABLE IF EXISTS `ec_specification_attributes_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_specification_attributes_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_specification_attributes_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `options` text COLLATE utf8mb4_unicode_ci,
  `default_value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_specification_attributes_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_specification_attributes_translations`
--

LOCK TABLES `ec_specification_attributes_translations` WRITE;
/*!40000 ALTER TABLE `ec_specification_attributes_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_specification_attributes_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_specification_groups`
--

DROP TABLE IF EXISTS `ec_specification_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_specification_groups` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `author_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_specification_groups_author_type_author_id_index` (`author_type`,`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_specification_groups`
--

LOCK TABLES `ec_specification_groups` WRITE;
/*!40000 ALTER TABLE `ec_specification_groups` DISABLE KEYS */;
INSERT INTO `ec_specification_groups` VALUES (1,'Dimensions',NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL),(2,'Performance',NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL),(3,'Battery',NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL),(4,'Display',NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL);
/*!40000 ALTER TABLE `ec_specification_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_specification_groups_translations`
--

DROP TABLE IF EXISTS `ec_specification_groups_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_specification_groups_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_specification_groups_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_specification_groups_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_specification_groups_translations`
--

LOCK TABLES `ec_specification_groups_translations` WRITE;
/*!40000 ALTER TABLE `ec_specification_groups_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_specification_groups_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_specification_table_group`
--

DROP TABLE IF EXISTS `ec_specification_table_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_specification_table_group` (
  `table_id` bigint unsigned NOT NULL,
  `group_id` bigint unsigned NOT NULL,
  `order` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`table_id`,`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_specification_table_group`
--

LOCK TABLES `ec_specification_table_group` WRITE;
/*!40000 ALTER TABLE `ec_specification_table_group` DISABLE KEYS */;
INSERT INTO `ec_specification_table_group` VALUES (1,1,0),(1,2,0),(2,3,0),(2,4,0);
/*!40000 ALTER TABLE `ec_specification_table_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_specification_tables`
--

DROP TABLE IF EXISTS `ec_specification_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_specification_tables` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `author_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ec_specification_tables_author_type_author_id_index` (`author_type`,`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_specification_tables`
--

LOCK TABLES `ec_specification_tables` WRITE;
/*!40000 ALTER TABLE `ec_specification_tables` DISABLE KEYS */;
INSERT INTO `ec_specification_tables` VALUES (1,'General Specification',NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL),(2,'Technical Specification',NULL,'2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,NULL);
/*!40000 ALTER TABLE `ec_specification_tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_specification_tables_translations`
--

DROP TABLE IF EXISTS `ec_specification_tables_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_specification_tables_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_specification_tables_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_specification_tables_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_specification_tables_translations`
--

LOCK TABLES `ec_specification_tables_translations` WRITE;
/*!40000 ALTER TABLE `ec_specification_tables_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_specification_tables_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_store_locators`
--

DROP TABLE IF EXISTS `ec_store_locators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_store_locators` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT '0',
  `is_shipping_location` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `zip_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_store_locators`
--

LOCK TABLES `ec_store_locators` WRITE;
/*!40000 ALTER TABLE `ec_store_locators` DISABLE KEYS */;
INSERT INTO `ec_store_locators` VALUES (1,'Wowy','sales@botble.com','18006268','North Link Building, 10 Admiralty Street','SG','Singapore','Singapore',1,1,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL);
/*!40000 ALTER TABLE `ec_store_locators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_tax_products`
--

DROP TABLE IF EXISTS `ec_tax_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_tax_products` (
  `tax_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`product_id`,`tax_id`),
  KEY `ec_tax_products_tax_id_index` (`tax_id`),
  KEY `ec_tax_products_product_id_index` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_tax_products`
--

LOCK TABLES `ec_tax_products` WRITE;
/*!40000 ALTER TABLE `ec_tax_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_tax_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_tax_rules`
--

DROP TABLE IF EXISTS `ec_tax_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_tax_rules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tax_id` bigint unsigned NOT NULL,
  `country` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `percentage` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_tax_rules`
--

LOCK TABLES `ec_tax_rules` WRITE;
/*!40000 ALTER TABLE `ec_tax_rules` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_tax_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_taxes`
--

DROP TABLE IF EXISTS `ec_taxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_taxes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `percentage` float DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_taxes`
--

LOCK TABLES `ec_taxes` WRITE;
/*!40000 ALTER TABLE `ec_taxes` DISABLE KEYS */;
INSERT INTO `ec_taxes` VALUES (1,'VAT',10,1,'published','2025-09-11 01:45:31','2025-09-11 01:45:31'),(2,'None',0,2,'published','2025-09-11 01:45:31','2025-09-11 01:45:31'),(3,'Import Tax',15,3,'published','2025-09-11 01:45:31','2025-09-11 01:45:31');
/*!40000 ALTER TABLE `ec_taxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_taxes_translations`
--

DROP TABLE IF EXISTS `ec_taxes_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_taxes_translations` (
  `lang_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ec_taxes_id` bigint unsigned NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`ec_taxes_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_taxes_translations`
--

LOCK TABLES `ec_taxes_translations` WRITE;
/*!40000 ALTER TABLE `ec_taxes_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_taxes_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ec_wish_lists`
--

DROP TABLE IF EXISTS `ec_wish_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ec_wish_lists` (
  `customer_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`customer_id`,`product_id`),
  KEY `wishlist_relation_index` (`product_id`,`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ec_wish_lists`
--

LOCK TABLES `ec_wish_lists` WRITE;
/*!40000 ALTER TABLE `ec_wish_lists` DISABLE KEYS */;
/*!40000 ALTER TABLE `ec_wish_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq_categories`
--

DROP TABLE IF EXISTS `faq_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` tinyint NOT NULL DEFAULT '0',
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq_categories`
--

LOCK TABLES `faq_categories` WRITE;
/*!40000 ALTER TABLE `faq_categories` DISABLE KEYS */;
INSERT INTO `faq_categories` VALUES (1,'Shipping',0,'published','2025-09-11 01:45:11','2025-09-11 01:45:11',NULL),(2,'Payment',1,'published','2025-09-11 01:45:11','2025-09-11 01:45:11',NULL),(3,'Order &amp; Returns',2,'published','2025-09-11 01:45:11','2025-09-11 01:45:11',NULL);
/*!40000 ALTER TABLE `faq_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq_categories_translations`
--

DROP TABLE IF EXISTS `faq_categories_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq_categories_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `faq_categories_id` bigint unsigned NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`faq_categories_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq_categories_translations`
--

LOCK TABLES `faq_categories_translations` WRITE;
/*!40000 ALTER TABLE `faq_categories_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `faq_categories_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
INSERT INTO `faqs` VALUES (1,'What Shipping Methods Are Available?','Ex Portland Pitchfork irure mustache. Eutra fap before they sold out literally. Aliquip ugh bicycle rights actually mlkshk, seitan squid craft beer tempor.',1,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(2,'Do You Ship Internationally?','Hoodie tote bag mixtape tofu. Typewriter jean shorts wolf quinoa, messenger bag organic freegan cray.',1,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(3,'How Long Will It Take To Get My Package?','Swag slow-carb quinoa VHS typewriter pork belly brunch, paleo single-origin coffee Wes Anderson. Flexitarian Pitchfork forage, literally paleo fap pour-over. Wes Anderson Pinterest YOLO fanny pack meggings, deep v XOXO chambray sustainable slow-carb raw denim church-key fap chillwave Etsy. +1 typewriter kitsch, American Apparel tofu Banksy Vice.',1,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(4,'What Payment Methods Are Accepted?','Fashion axe DIY jean shorts, swag kale chips meh polaroid kogi butcher Wes Anderson chambray next level semiotics gentrify yr. Voluptate photo booth fugiat Vice. Austin sed Williamsburg, ea labore raw denim voluptate cred proident mixtape excepteur mustache. Twee chia photo booth readymade food truck, hoodie roof party swag keytar PBR DIY.',2,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(5,'Is Buying On-Line Safe?','Art party authentic freegan semiotics jean shorts chia cred. Neutra Austin roof party Brooklyn, synth Thundercats swag 8-bit photo booth. Plaid letterpress leggings craft beer meh ethical Pinterest.',2,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(6,'How do I place an Order?','Keytar cray slow-carb, Godard banh mi salvia pour-over. Slow-carb Odd Future seitan normcore. Master cleanse American Apparel gentrify flexitarian beard slow-carb next level. Raw denim polaroid paleo farm-to-table, put a bird on it lo-fi tattooed Wes Anderson Pinterest letterpress. Fingerstache McSweeney’s pour-over, letterpress Schlitz photo booth master cleanse bespoke hashtag chillwave gentrify.',3,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(7,'How Can I Cancel Or Change My Order?','Plaid letterpress leggings craft beer meh ethical Pinterest. Art party authentic freegan semiotics jean shorts chia cred. Neutra Austin roof party Brooklyn, synth Thundercats swag 8-bit photo booth.',3,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(8,'Do I need an account to place an order?','Thundercats swag 8-bit photo booth. Plaid letterpress leggings craft beer meh ethical Pinterest. Twee chia photo booth readymade food truck, hoodie roof party swag keytar PBR DIY. Cray ugh 3 wolf moon fap, fashion axe irony butcher cornhole typewriter chambray VHS banjo street art.',3,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(9,'How Do I Track My Order?','Keytar cray slow-carb, Godard banh mi salvia pour-over. Slow-carb @Odd Future seitan normcore. Master cleanse American Apparel gentrify flexitarian beard slow-carb next level.',3,'published','2025-09-11 01:45:11','2025-09-11 01:45:11'),(10,'How Can I Return a Product?','Kale chips Truffaut Williamsburg, hashtag fixie Pinterest raw denim c hambray drinking vinegar Carles street art Bushwick gastropub. Wolf Tumblr paleo church-key. Plaid food truck Echo Park YOLO bitters hella, direct trade Thundercats leggings quinoa before they sold out. You probably haven’t heard of them wayfarers authentic umami drinking vinegar Pinterest Cosby sweater, fingerstache fap High Life.',3,'published','2025-09-11 01:45:11','2025-09-11 01:45:11');
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs_translations`
--

DROP TABLE IF EXISTS `faqs_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `faqs_id` bigint unsigned NOT NULL,
  `question` text COLLATE utf8mb4_unicode_ci,
  `answer` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`lang_code`,`faqs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs_translations`
--

LOCK TABLES `faqs_translations` WRITE;
/*!40000 ALTER TABLE `faqs_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `faqs_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_meta`
--

DROP TABLE IF EXISTS `language_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language_meta` (
  `lang_meta_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `lang_meta_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lang_meta_origin` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference_id` bigint unsigned NOT NULL,
  `reference_type` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`lang_meta_id`),
  KEY `language_meta_reference_id_index` (`reference_id`),
  KEY `meta_code_index` (`lang_meta_code`),
  KEY `meta_origin_index` (`lang_meta_origin`),
  KEY `meta_reference_type_index` (`reference_type`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_meta`
--

LOCK TABLES `language_meta` WRITE;
/*!40000 ALTER TABLE `language_meta` DISABLE KEYS */;
INSERT INTO `language_meta` VALUES (1,'en_US','4c82cbb7fc5d96da0863bfe117468055',1,'Botble\\SimpleSlider\\Models\\SimpleSlider'),(2,'en_US','b7b7918b81a5315ecd02f8278f03f129',2,'Botble\\SimpleSlider\\Models\\SimpleSlider'),(3,'en_US','e232c29b0ce6e94fd1f2f11e2a0840ab',3,'Botble\\SimpleSlider\\Models\\SimpleSlider'),(4,'en_US','660e28be0baaebd485f2bd03ba737435',4,'Botble\\SimpleSlider\\Models\\SimpleSlider'),(5,'en_US','a3d133e1dcb5bde56f17a3a8fb805e03',1,'Botble\\Menu\\Models\\MenuLocation'),(6,'en_US','bb2603a656c5d0ec738fbab3a9915063',1,'Botble\\Menu\\Models\\Menu'),(7,'en_US','7995f0e510f156ee6a867204481a6918',2,'Botble\\Menu\\Models\\Menu'),(8,'en_US','e441bb42f9460640f89e82ea5554e78a',3,'Botble\\Menu\\Models\\Menu');
/*!40000 ALTER TABLE `language_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `lang_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `lang_name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lang_locale` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lang_flag` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lang_is_default` tinyint unsigned NOT NULL DEFAULT '0',
  `lang_order` int NOT NULL DEFAULT '0',
  `lang_is_rtl` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`lang_id`),
  KEY `lang_locale_index` (`lang_locale`),
  KEY `lang_code_index` (`lang_code`),
  KEY `lang_is_default_index` (`lang_is_default`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (1,'English','en','en_US','us',1,0,0);
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_files`
--

DROP TABLE IF EXISTS `media_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_files` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `folder_id` bigint unsigned NOT NULL DEFAULT '0',
  `mime_type` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `visibility` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'public',
  PRIMARY KEY (`id`),
  KEY `media_files_user_id_index` (`user_id`),
  KEY `media_files_index` (`folder_id`,`user_id`,`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_files`
--

LOCK TABLES `media_files` WRITE;
/*!40000 ALTER TABLE `media_files` DISABLE KEYS */;
INSERT INTO `media_files` VALUES (1,0,'1','1',1,'image/png',981,'brands/1.png','[]','2025-09-11 01:45:08','2025-09-11 01:45:08',NULL,'public'),(2,0,'2','2',1,'image/png',981,'brands/2.png','[]','2025-09-11 01:45:08','2025-09-11 01:45:08',NULL,'public'),(3,0,'3','3',1,'image/png',981,'brands/3.png','[]','2025-09-11 01:45:08','2025-09-11 01:45:08',NULL,'public'),(4,0,'4','4',1,'image/png',981,'brands/4.png','[]','2025-09-11 01:45:08','2025-09-11 01:45:08',NULL,'public'),(5,0,'5','5',1,'image/png',981,'brands/5.png','[]','2025-09-11 01:45:08','2025-09-11 01:45:08',NULL,'public'),(6,0,'6','6',1,'image/png',981,'brands/6.png','[]','2025-09-11 01:45:08','2025-09-11 01:45:08',NULL,'public'),(7,0,'7','7',1,'image/png',981,'brands/7.png','[]','2025-09-11 01:45:09','2025-09-11 01:45:09',NULL,'public'),(8,0,'1','1',2,'image/jpeg',5327,'product-categories/1.jpg','[]','2025-09-11 01:45:09','2025-09-11 01:45:09',NULL,'public'),(9,0,'2','2',2,'image/jpeg',5327,'product-categories/2.jpg','[]','2025-09-11 01:45:09','2025-09-11 01:45:09',NULL,'public'),(10,0,'3','3',2,'image/jpeg',5327,'product-categories/3.jpg','[]','2025-09-11 01:45:09','2025-09-11 01:45:09',NULL,'public'),(11,0,'4','4',2,'image/jpeg',5327,'product-categories/4.jpg','[]','2025-09-11 01:45:09','2025-09-11 01:45:09',NULL,'public'),(12,0,'5','5',2,'image/jpeg',5327,'product-categories/5.jpg','[]','2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,'public'),(13,0,'6','6',2,'image/jpeg',5327,'product-categories/6.jpg','[]','2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,'public'),(14,0,'7','7',2,'image/jpeg',5327,'product-categories/7.jpg','[]','2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,'public'),(15,0,'8','8',2,'image/jpeg',5327,'product-categories/8.jpg','[]','2025-09-11 01:45:10','2025-09-11 01:45:10',NULL,'public'),(16,0,'1-1','1-1',3,'image/jpeg',9803,'products/1-1.jpg','[]','2025-09-11 01:45:11','2025-09-11 01:45:11',NULL,'public'),(17,0,'1-2','1-2',3,'image/jpeg',9803,'products/1-2.jpg','[]','2025-09-11 01:45:11','2025-09-11 01:45:11',NULL,'public'),(18,0,'1-3','1-3',3,'image/jpeg',9803,'products/1-3.jpg','[]','2025-09-11 01:45:11','2025-09-11 01:45:11',NULL,'public'),(19,0,'1','1',3,'image/jpeg',9803,'products/1.jpg','[]','2025-09-11 01:45:12','2025-09-11 01:45:12',NULL,'public'),(20,0,'10-1','10-1',3,'image/jpeg',9803,'products/10-1.jpg','[]','2025-09-11 01:45:12','2025-09-11 01:45:12',NULL,'public'),(21,0,'10','10',3,'image/jpeg',9803,'products/10.jpg','[]','2025-09-11 01:45:12','2025-09-11 01:45:12',NULL,'public'),(22,0,'11-1','11-1',3,'image/jpeg',9803,'products/11-1.jpg','[]','2025-09-11 01:45:12','2025-09-11 01:45:12',NULL,'public'),(23,0,'11','11',3,'image/jpeg',9803,'products/11.jpg','[]','2025-09-11 01:45:12','2025-09-11 01:45:12',NULL,'public'),(24,0,'12-1','12-1',3,'image/jpeg',9803,'products/12-1.jpg','[]','2025-09-11 01:45:12','2025-09-11 01:45:12',NULL,'public'),(25,0,'12','12',3,'image/jpeg',9803,'products/12.jpg','[]','2025-09-11 01:45:13','2025-09-11 01:45:13',NULL,'public'),(26,0,'13-1','13-1',3,'image/jpeg',9803,'products/13-1.jpg','[]','2025-09-11 01:45:13','2025-09-11 01:45:13',NULL,'public'),(27,0,'13','13',3,'image/jpeg',9803,'products/13.jpg','[]','2025-09-11 01:45:13','2025-09-11 01:45:13',NULL,'public'),(28,0,'14-1','14-1',3,'image/jpeg',9803,'products/14-1.jpg','[]','2025-09-11 01:45:13','2025-09-11 01:45:13',NULL,'public'),(29,0,'14','14',3,'image/jpeg',9803,'products/14.jpg','[]','2025-09-11 01:45:13','2025-09-11 01:45:13',NULL,'public'),(30,0,'15-1','15-1',3,'image/jpeg',9803,'products/15-1.jpg','[]','2025-09-11 01:45:14','2025-09-11 01:45:14',NULL,'public'),(31,0,'15','15',3,'image/jpeg',9803,'products/15.jpg','[]','2025-09-11 01:45:14','2025-09-11 01:45:14',NULL,'public'),(32,0,'16','16',3,'image/jpeg',9803,'products/16.jpg','[]','2025-09-11 01:45:14','2025-09-11 01:45:14',NULL,'public'),(33,0,'17','17',3,'image/jpeg',9803,'products/17.jpg','[]','2025-09-11 01:45:14','2025-09-11 01:45:14',NULL,'public'),(34,0,'18-1','18-1',3,'image/jpeg',9803,'products/18-1.jpg','[]','2025-09-11 01:45:14','2025-09-11 01:45:14',NULL,'public'),(35,0,'18-2','18-2',3,'image/jpeg',9803,'products/18-2.jpg','[]','2025-09-11 01:45:15','2025-09-11 01:45:15',NULL,'public'),(36,0,'18','18',3,'image/jpeg',9803,'products/18.jpg','[]','2025-09-11 01:45:15','2025-09-11 01:45:15',NULL,'public'),(37,0,'19-1','19-1',3,'image/jpeg',9803,'products/19-1.jpg','[]','2025-09-11 01:45:15','2025-09-11 01:45:15',NULL,'public'),(38,0,'19','19',3,'image/jpeg',9803,'products/19.jpg','[]','2025-09-11 01:45:15','2025-09-11 01:45:15',NULL,'public'),(39,0,'2-1','2-1',3,'image/jpeg',9803,'products/2-1.jpg','[]','2025-09-11 01:45:15','2025-09-11 01:45:15',NULL,'public'),(40,0,'2-2','2-2',3,'image/jpeg',9803,'products/2-2.jpg','[]','2025-09-11 01:45:16','2025-09-11 01:45:16',NULL,'public'),(41,0,'2-3','2-3',3,'image/jpeg',9803,'products/2-3.jpg','[]','2025-09-11 01:45:16','2025-09-11 01:45:16',NULL,'public'),(42,0,'2','2',3,'image/jpeg',9803,'products/2.jpg','[]','2025-09-11 01:45:16','2025-09-11 01:45:16',NULL,'public'),(43,0,'20-1','20-1',3,'image/jpeg',9803,'products/20-1.jpg','[]','2025-09-11 01:45:16','2025-09-11 01:45:16',NULL,'public'),(44,0,'20','20',3,'image/jpeg',9803,'products/20.jpg','[]','2025-09-11 01:45:17','2025-09-11 01:45:17',NULL,'public'),(45,0,'21-1','21-1',3,'image/jpeg',9803,'products/21-1.jpg','[]','2025-09-11 01:45:17','2025-09-11 01:45:17',NULL,'public'),(46,0,'21','21',3,'image/jpeg',9803,'products/21.jpg','[]','2025-09-11 01:45:17','2025-09-11 01:45:17',NULL,'public'),(47,0,'22-1','22-1',3,'image/jpeg',9803,'products/22-1.jpg','[]','2025-09-11 01:45:17','2025-09-11 01:45:17',NULL,'public'),(48,0,'22','22',3,'image/jpeg',9803,'products/22.jpg','[]','2025-09-11 01:45:17','2025-09-11 01:45:17',NULL,'public'),(49,0,'23-1','23-1',3,'image/jpeg',9803,'products/23-1.jpg','[]','2025-09-11 01:45:18','2025-09-11 01:45:18',NULL,'public'),(50,0,'23','23',3,'image/jpeg',9803,'products/23.jpg','[]','2025-09-11 01:45:18','2025-09-11 01:45:18',NULL,'public'),(51,0,'24-1','24-1',3,'image/jpeg',9803,'products/24-1.jpg','[]','2025-09-11 01:45:18','2025-09-11 01:45:18',NULL,'public'),(52,0,'24','24',3,'image/jpeg',9803,'products/24.jpg','[]','2025-09-11 01:45:19','2025-09-11 01:45:19',NULL,'public'),(53,0,'3-1','3-1',3,'image/jpeg',9803,'products/3-1.jpg','[]','2025-09-11 01:45:19','2025-09-11 01:45:19',NULL,'public'),(54,0,'3-2','3-2',3,'image/jpeg',9803,'products/3-2.jpg','[]','2025-09-11 01:45:19','2025-09-11 01:45:19',NULL,'public'),(55,0,'3-3','3-3',3,'image/jpeg',9803,'products/3-3.jpg','[]','2025-09-11 01:45:20','2025-09-11 01:45:20',NULL,'public'),(56,0,'3','3',3,'image/jpeg',9803,'products/3.jpg','[]','2025-09-11 01:45:20','2025-09-11 01:45:20',NULL,'public'),(57,0,'4-1','4-1',3,'image/jpeg',9803,'products/4-1.jpg','[]','2025-09-11 01:45:20','2025-09-11 01:45:20',NULL,'public'),(58,0,'4-2','4-2',3,'image/jpeg',9803,'products/4-2.jpg','[]','2025-09-11 01:45:20','2025-09-11 01:45:20',NULL,'public'),(59,0,'4-3','4-3',3,'image/jpeg',9803,'products/4-3.jpg','[]','2025-09-11 01:45:21','2025-09-11 01:45:21',NULL,'public'),(60,0,'4','4',3,'image/jpeg',9803,'products/4.jpg','[]','2025-09-11 01:45:21','2025-09-11 01:45:21',NULL,'public'),(61,0,'5-1','5-1',3,'image/jpeg',9803,'products/5-1.jpg','[]','2025-09-11 01:45:21','2025-09-11 01:45:21',NULL,'public'),(62,0,'5-2','5-2',3,'image/jpeg',9803,'products/5-2.jpg','[]','2025-09-11 01:45:21','2025-09-11 01:45:21',NULL,'public'),(63,0,'5-3','5-3',3,'image/jpeg',9803,'products/5-3.jpg','[]','2025-09-11 01:45:22','2025-09-11 01:45:22',NULL,'public'),(64,0,'5','5',3,'image/jpeg',9803,'products/5.jpg','[]','2025-09-11 01:45:22','2025-09-11 01:45:22',NULL,'public'),(65,0,'6-1','6-1',3,'image/jpeg',9803,'products/6-1.jpg','[]','2025-09-11 01:45:22','2025-09-11 01:45:22',NULL,'public'),(66,0,'6','6',3,'image/jpeg',9803,'products/6.jpg','[]','2025-09-11 01:45:23','2025-09-11 01:45:23',NULL,'public'),(67,0,'7-1','7-1',3,'image/jpeg',9803,'products/7-1.jpg','[]','2025-09-11 01:45:23','2025-09-11 01:45:23',NULL,'public'),(68,0,'7','7',3,'image/jpeg',9803,'products/7.jpg','[]','2025-09-11 01:45:23','2025-09-11 01:45:23',NULL,'public'),(69,0,'8-1','8-1',3,'image/jpeg',9803,'products/8-1.jpg','[]','2025-09-11 01:45:23','2025-09-11 01:45:23',NULL,'public'),(70,0,'8','8',3,'image/jpeg',9803,'products/8.jpg','[]','2025-09-11 01:45:24','2025-09-11 01:45:24',NULL,'public'),(71,0,'9-1','9-1',3,'image/jpeg',9803,'products/9-1.jpg','[]','2025-09-11 01:45:24','2025-09-11 01:45:24',NULL,'public'),(72,0,'9','9',3,'image/jpeg',9803,'products/9.jpg','[]','2025-09-11 01:45:24','2025-09-11 01:45:24',NULL,'public'),(73,0,'1','1',4,'image/jpeg',9803,'customers/1.jpg','[]','2025-09-11 01:45:31','2025-09-11 01:45:31',NULL,'public'),(74,0,'10','10',4,'image/jpeg',9803,'customers/10.jpg','[]','2025-09-11 01:45:31','2025-09-11 01:45:31',NULL,'public'),(75,0,'2','2',4,'image/jpeg',9803,'customers/2.jpg','[]','2025-09-11 01:45:31','2025-09-11 01:45:31',NULL,'public'),(76,0,'3','3',4,'image/jpeg',9803,'customers/3.jpg','[]','2025-09-11 01:45:31','2025-09-11 01:45:31',NULL,'public'),(77,0,'4','4',4,'image/jpeg',9803,'customers/4.jpg','[]','2025-09-11 01:45:32','2025-09-11 01:45:32',NULL,'public'),(78,0,'5','5',4,'image/jpeg',9803,'customers/5.jpg','[]','2025-09-11 01:45:32','2025-09-11 01:45:32',NULL,'public'),(79,0,'6','6',4,'image/jpeg',9803,'customers/6.jpg','[]','2025-09-11 01:45:32','2025-09-11 01:45:32',NULL,'public'),(80,0,'7','7',4,'image/jpeg',9803,'customers/7.jpg','[]','2025-09-11 01:45:32','2025-09-11 01:45:32',NULL,'public'),(81,0,'8','8',4,'image/jpeg',9803,'customers/8.jpg','[]','2025-09-11 01:45:32','2025-09-11 01:45:32',NULL,'public'),(82,0,'9','9',4,'image/jpeg',9803,'customers/9.jpg','[]','2025-09-11 01:45:33','2025-09-11 01:45:33',NULL,'public'),(83,0,'1','1',5,'image/jpeg',9392,'flash-sales/1.jpg','[]','2025-09-11 01:45:40','2025-09-11 01:45:40',NULL,'public'),(84,0,'2','2',5,'image/jpeg',9392,'flash-sales/2.jpg','[]','2025-09-11 01:45:40','2025-09-11 01:45:40',NULL,'public'),(85,0,'1-1','1-1',6,'image/png',13746,'sliders/1-1.png','[]','2025-09-11 01:45:41','2025-09-11 01:45:41',NULL,'public'),(86,0,'1-2','1-2',6,'image/png',13801,'sliders/1-2.png','[]','2025-09-11 01:45:41','2025-09-11 01:45:41',NULL,'public'),(87,0,'1-3','1-3',6,'image/png',12820,'sliders/1-3.png','[]','2025-09-11 01:45:41','2025-09-11 01:45:41',NULL,'public'),(88,0,'2-1','2-1',6,'image/png',13746,'sliders/2-1.png','[]','2025-09-11 01:45:41','2025-09-11 01:45:41',NULL,'public'),(89,0,'2-2','2-2',6,'image/png',13801,'sliders/2-2.png','[]','2025-09-11 01:45:41','2025-09-11 01:45:41',NULL,'public'),(90,0,'2-3','2-3',6,'image/png',12820,'sliders/2-3.png','[]','2025-09-11 01:45:42','2025-09-11 01:45:42',NULL,'public'),(91,0,'3-1','3-1',6,'image/png',13702,'sliders/3-1.png','[]','2025-09-11 01:45:42','2025-09-11 01:45:42',NULL,'public'),(92,0,'3-2','3-2',6,'image/png',13702,'sliders/3-2.png','[]','2025-09-11 01:45:42','2025-09-11 01:45:42',NULL,'public'),(93,0,'4-1','4-1',6,'image/png',13746,'sliders/4-1.png','[]','2025-09-11 01:45:43','2025-09-11 01:45:43',NULL,'public'),(94,0,'4-2','4-2',6,'image/png',13746,'sliders/4-2.png','[]','2025-09-11 01:45:43','2025-09-11 01:45:43',NULL,'public'),(95,0,'4-3','4-3',6,'image/png',12820,'sliders/4-3.png','[]','2025-09-11 01:45:43','2025-09-11 01:45:43',NULL,'public'),(96,0,'1','1',7,'image/jpeg',9803,'news/1.jpg','[]','2025-09-11 01:45:44','2025-09-11 01:45:44',NULL,'public'),(97,0,'10','10',7,'image/jpeg',9803,'news/10.jpg','[]','2025-09-11 01:45:44','2025-09-11 01:45:44',NULL,'public'),(98,0,'11','11',7,'image/jpeg',9803,'news/11.jpg','[]','2025-09-11 01:45:44','2025-09-11 01:45:44',NULL,'public'),(99,0,'2','2',7,'image/jpeg',9803,'news/2.jpg','[]','2025-09-11 01:45:44','2025-09-11 01:45:44',NULL,'public'),(100,0,'3','3',7,'image/jpeg',9803,'news/3.jpg','[]','2025-09-11 01:45:44','2025-09-11 01:45:44',NULL,'public'),(101,0,'4','4',7,'image/jpeg',9803,'news/4.jpg','[]','2025-09-11 01:45:45','2025-09-11 01:45:45',NULL,'public'),(102,0,'5','5',7,'image/jpeg',9803,'news/5.jpg','[]','2025-09-11 01:45:45','2025-09-11 01:45:45',NULL,'public'),(103,0,'6','6',7,'image/jpeg',9803,'news/6.jpg','[]','2025-09-11 01:45:45','2025-09-11 01:45:45',NULL,'public'),(104,0,'7','7',7,'image/jpeg',9803,'news/7.jpg','[]','2025-09-11 01:45:45','2025-09-11 01:45:45',NULL,'public'),(105,0,'8','8',7,'image/jpeg',9803,'news/8.jpg','[]','2025-09-11 01:45:46','2025-09-11 01:45:46',NULL,'public'),(106,0,'9','9',7,'image/jpeg',9803,'news/9.jpg','[]','2025-09-11 01:45:46','2025-09-11 01:45:46',NULL,'public'),(107,0,'cod','cod',8,'image/png',12121,'payments/cod.png','[]','2025-09-11 01:45:47','2025-09-11 01:45:47',NULL,'public'),(108,0,'bank-transfer','bank-transfer',8,'image/png',29089,'payments/bank-transfer.png','[]','2025-09-11 01:45:48','2025-09-11 01:45:48',NULL,'public'),(109,0,'stripe','stripe',8,'image/webp',7516,'payments/stripe.webp','[]','2025-09-11 01:45:48','2025-09-11 01:45:48',NULL,'public'),(110,0,'paypal','paypal',8,'image/png',3001,'payments/paypal.png','[]','2025-09-11 01:45:49','2025-09-11 01:45:49',NULL,'public'),(111,0,'mollie','mollie',8,'image/png',8968,'payments/mollie.png','[]','2025-09-11 01:45:49','2025-09-11 01:45:49',NULL,'public'),(112,0,'paystack','paystack',8,'image/png',31015,'payments/paystack.png','[]','2025-09-11 01:45:49','2025-09-11 01:45:49',NULL,'public'),(113,0,'razorpay','razorpay',8,'image/png',8489,'payments/razorpay.png','[]','2025-09-11 01:45:49','2025-09-11 01:45:49',NULL,'public'),(114,0,'sslcommerz','sslcommerz',8,'image/png',3482,'payments/sslcommerz.png','[]','2025-09-11 01:45:50','2025-09-11 01:45:50',NULL,'public'),(115,0,'1','1',9,'image/png',5289,'promotion/1.png','[]','2025-09-11 01:45:52','2025-09-11 01:45:52',NULL,'public'),(116,0,'2','2',9,'image/png',5289,'promotion/2.png','[]','2025-09-11 01:45:52','2025-09-11 01:45:52',NULL,'public'),(117,0,'3','3',9,'image/png',5289,'promotion/3.png','[]','2025-09-11 01:45:52','2025-09-11 01:45:52',NULL,'public'),(118,0,'4','4',9,'image/png',8954,'promotion/4.png','[]','2025-09-11 01:45:52','2025-09-11 01:45:52',NULL,'public'),(119,0,'5','5',9,'image/png',5073,'promotion/5.png','[]','2025-09-11 01:45:53','2025-09-11 01:45:53',NULL,'public'),(120,0,'6','6',9,'image/png',7142,'promotion/6.png','[]','2025-09-11 01:45:53','2025-09-11 01:45:53',NULL,'public'),(121,0,'clock','clock',10,'image/png',4277,'general/clock.png','[]','2025-09-11 01:45:54','2025-09-11 01:45:54',NULL,'public'),(122,0,'credit-card','credit-card',10,'image/png',1423,'general/credit-card.png','[]','2025-09-11 01:45:54','2025-09-11 01:45:54',NULL,'public'),(123,0,'favicon','favicon',10,'image/png',3906,'general/favicon.png','[]','2025-09-11 01:45:54','2025-09-11 01:45:54',NULL,'public'),(124,0,'icon-bag','icon-bag',10,'image/png',18958,'general/icon-bag.png','[]','2025-09-11 01:45:54','2025-09-11 01:45:54',NULL,'public'),(125,0,'icon-operator','icon-operator',10,'image/png',27572,'general/icon-operator.png','[]','2025-09-11 01:45:54','2025-09-11 01:45:54',NULL,'public'),(126,0,'icon-purchase','icon-purchase',10,'image/png',29492,'general/icon-purchase.png','[]','2025-09-11 01:45:55','2025-09-11 01:45:55',NULL,'public'),(127,0,'icon-truck','icon-truck',10,'image/png',21385,'general/icon-truck.png','[]','2025-09-11 01:45:55','2025-09-11 01:45:55',NULL,'public'),(128,0,'logo-light','logo-light',10,'image/png',3810,'general/logo-light.png','[]','2025-09-11 01:45:55','2025-09-11 01:45:55',NULL,'public'),(129,0,'logo','logo',10,'image/png',4477,'general/logo.png','[]','2025-09-11 01:45:55','2025-09-11 01:45:55',NULL,'public'),(130,0,'open-graph-image','open-graph-image',10,'image/png',348710,'general/open-graph-image.png','[]','2025-09-11 01:45:56','2025-09-11 01:45:56',NULL,'public'),(131,0,'paper-plane','paper-plane',10,'image/png',5125,'general/paper-plane.png','[]','2025-09-11 01:45:56','2025-09-11 01:45:56',NULL,'public'),(132,0,'payment-methods','payment-methods',10,'image/png',476,'general/payment-methods.png','[]','2025-09-11 01:45:56','2025-09-11 01:45:56',NULL,'public');
/*!40000 ALTER TABLE `media_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_folders`
--

DROP TABLE IF EXISTS `media_folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_folders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` bigint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `media_folders_user_id_index` (`user_id`),
  KEY `media_folders_index` (`parent_id`,`user_id`,`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_folders`
--

LOCK TABLES `media_folders` WRITE;
/*!40000 ALTER TABLE `media_folders` DISABLE KEYS */;
INSERT INTO `media_folders` VALUES (1,0,'brands',NULL,'brands',0,'2025-09-11 01:45:08','2025-09-11 01:45:08',NULL),(2,0,'product-categories',NULL,'product-categories',0,'2025-09-11 01:45:09','2025-09-11 01:45:09',NULL),(3,0,'products',NULL,'products',0,'2025-09-11 01:45:11','2025-09-11 01:45:11',NULL),(4,0,'customers',NULL,'customers',0,'2025-09-11 01:45:31','2025-09-11 01:45:31',NULL),(5,0,'flash-sales',NULL,'flash-sales',0,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL),(6,0,'sliders',NULL,'sliders',0,'2025-09-11 01:45:40','2025-09-11 01:45:40',NULL),(7,0,'news',NULL,'news',0,'2025-09-11 01:45:44','2025-09-11 01:45:44',NULL),(8,0,'payments',NULL,'payments',0,'2025-09-11 01:45:47','2025-09-11 01:45:47',NULL),(9,0,'promotion',NULL,'promotion',0,'2025-09-11 01:45:52','2025-09-11 01:45:52',NULL),(10,0,'general',NULL,'general',0,'2025-09-11 01:45:54','2025-09-11 01:45:54',NULL);
/*!40000 ALTER TABLE `media_folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_settings`
--

DROP TABLE IF EXISTS `media_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `media_id` bigint unsigned DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_settings`
--

LOCK TABLES `media_settings` WRITE;
/*!40000 ALTER TABLE `media_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `media_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_locations`
--

DROP TABLE IF EXISTS `menu_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_locations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` bigint unsigned NOT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_locations_menu_id_created_at_index` (`menu_id`,`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_locations`
--

LOCK TABLES `menu_locations` WRITE;
/*!40000 ALTER TABLE `menu_locations` DISABLE KEYS */;
INSERT INTO `menu_locations` VALUES (1,1,'main-menu','2025-09-11 01:45:53','2025-09-11 01:45:53');
/*!40000 ALTER TABLE `menu_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_nodes`
--

DROP TABLE IF EXISTS `menu_nodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_nodes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` bigint unsigned NOT NULL,
  `parent_id` bigint unsigned NOT NULL DEFAULT '0',
  `reference_id` bigint unsigned DEFAULT NULL,
  `reference_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon_font` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` tinyint unsigned NOT NULL DEFAULT '0',
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `css_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `target` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '_self',
  `has_child` tinyint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_nodes_menu_id_index` (`menu_id`),
  KEY `menu_nodes_parent_id_index` (`parent_id`),
  KEY `reference_id` (`reference_id`),
  KEY `reference_type` (`reference_type`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_nodes`
--

LOCK TABLES `menu_nodes` WRITE;
/*!40000 ALTER TABLE `menu_nodes` DISABLE KEYS */;
INSERT INTO `menu_nodes` VALUES (1,1,0,NULL,NULL,'/',NULL,0,'Home',NULL,'_self',1,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(2,1,1,1,'Botble\\Page\\Models\\Page','/homepage',NULL,0,'Home 1',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(3,1,1,2,'Botble\\Page\\Models\\Page','/homepage-2',NULL,1,'Home 2',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(4,1,1,3,'Botble\\Page\\Models\\Page','/homepage-3',NULL,2,'Home 3',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(5,1,1,4,'Botble\\Page\\Models\\Page','/homepage-4',NULL,3,'Home 4',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(6,1,0,NULL,NULL,'/products',NULL,1,'Shop',NULL,'_self',1,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(7,1,6,NULL,NULL,'/products',NULL,0,'Shop Grid - Full Width',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(8,1,6,NULL,NULL,'/products?layout=product-right-sidebar',NULL,1,'Shop Grid - Right Sidebar',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(9,1,6,NULL,NULL,'/products?layout=product-left-sidebar',NULL,2,'Shop Grid - Left Sidebar',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(10,1,6,1,'Botble\\Ecommerce\\Models\\ProductCategory',NULL,NULL,3,'Products Of Category',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(11,1,0,NULL,NULL,'#',NULL,2,'Product',NULL,'_self',1,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(12,1,11,NULL,NULL,'/products/smart-home-speaker',NULL,0,'Product Right Sidebar',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(13,1,11,NULL,NULL,'/products/headphone-ultra-bass',NULL,1,'Product Left Sidebar',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(14,1,11,NULL,NULL,'/products/boxed-bluetooth-headphone',NULL,2,'Product Full Width',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(15,1,0,5,'Botble\\Page\\Models\\Page',NULL,NULL,3,'Blog',NULL,'_self',1,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(16,1,15,5,'Botble\\Page\\Models\\Page',NULL,NULL,0,'Blog Right Sidebar',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(17,1,15,13,'Botble\\Page\\Models\\Page',NULL,NULL,1,'Blog Left Sidebar',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(18,1,15,NULL,NULL,'',NULL,2,'Single Post Right Sidebar',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(19,1,15,NULL,NULL,'',NULL,3,'Single Post Left Sidebar',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(20,1,15,NULL,NULL,'',NULL,4,'Single Post Full Width',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(21,1,15,NULL,NULL,'',NULL,5,'Single Post with Product Listing',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(22,1,0,14,'Botble\\Page\\Models\\Page',NULL,NULL,4,'FAQ',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(23,1,0,6,'Botble\\Page\\Models\\Page',NULL,NULL,5,'Contact',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(24,2,0,1,'Botble\\Ecommerce\\Models\\ProductCategory',NULL,NULL,0,'Men',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(25,2,0,2,'Botble\\Ecommerce\\Models\\ProductCategory',NULL,NULL,1,'Women',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(26,2,0,3,'Botble\\Ecommerce\\Models\\ProductCategory',NULL,NULL,2,'Accessories',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(27,2,0,4,'Botble\\Ecommerce\\Models\\ProductCategory',NULL,NULL,3,'Shoes',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(28,2,0,5,'Botble\\Ecommerce\\Models\\ProductCategory',NULL,NULL,4,'Denim',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(29,2,0,6,'Botble\\Ecommerce\\Models\\ProductCategory',NULL,NULL,5,'Dress',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(30,3,0,6,'Botble\\Page\\Models\\Page',NULL,NULL,0,'Contact Us',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(31,3,0,8,'Botble\\Page\\Models\\Page',NULL,NULL,1,'About Us',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(32,3,0,9,'Botble\\Page\\Models\\Page',NULL,NULL,2,'Terms & Conditions',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(33,3,0,10,'Botble\\Page\\Models\\Page',NULL,NULL,3,'Returns & Exchanges',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(34,3,0,11,'Botble\\Page\\Models\\Page',NULL,NULL,4,'Shipping & Delivery',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53'),(35,3,0,12,'Botble\\Page\\Models\\Page',NULL,NULL,5,'Privacy Policy',NULL,'_self',0,'2025-09-11 01:45:53','2025-09-11 01:45:53');
/*!40000 ALTER TABLE `menu_nodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `menus_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,'Main menu','main-menu','published','2025-09-11 01:45:53','2025-09-11 01:45:53'),(2,'Product categories','product-categories','published','2025-09-11 01:45:53','2025-09-11 01:45:53'),(3,'Information','information','published','2025-09-11 01:45:53','2025-09-11 01:45:53');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meta_boxes`
--

DROP TABLE IF EXISTS `meta_boxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meta_boxes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `meta_key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_value` text COLLATE utf8mb4_unicode_ci,
  `reference_id` bigint unsigned NOT NULL,
  `reference_type` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `meta_boxes_reference_id_index` (`reference_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meta_boxes`
--

LOCK TABLES `meta_boxes` WRITE;
/*!40000 ALTER TABLE `meta_boxes` DISABLE KEYS */;
INSERT INTO `meta_boxes` VALUES (1,'layout','[\"product-right-sidebar\"]',1,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:24','2025-09-11 01:45:24'),(2,'is_popular','[\"1\"]',1,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:24','2025-09-11 01:45:24'),(3,'faq_ids','[[1,2,3,6,10]]',1,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(4,'layout','[\"product-left-sidebar\"]',2,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(5,'faq_ids','[[1,6,7,8,9]]',2,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(6,'layout','[\"product-full-width\"]',3,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(7,'is_popular','[\"1\"]',3,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(8,'faq_ids','[[2,3,4,7,8]]',3,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(9,'faq_ids','[[1,2,4,5,8]]',4,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(10,'is_popular','[\"1\"]',5,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(11,'faq_ids','[[2,3,7,8,10]]',5,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(12,'faq_ids','[[1,2,5,8,9]]',6,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(13,'is_popular','[\"1\"]',7,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(14,'faq_ids','[[4,5,7,9,10]]',7,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(15,'faq_ids','[[2,4,6,7,10]]',8,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(16,'is_popular','[\"1\"]',9,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(17,'faq_ids','[[1,2,3,7,9]]',9,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(18,'faq_ids','[[1,3,5,6,8]]',10,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(19,'is_popular','[\"1\"]',11,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:25','2025-09-11 01:45:25'),(20,'faq_ids','[[1,2,5,8,10]]',11,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:26','2025-09-11 01:45:26'),(21,'faq_ids','[[2,3,4,7,9]]',12,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:26','2025-09-11 01:45:26'),(22,'is_popular','[\"1\"]',13,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:26','2025-09-11 01:45:26'),(23,'faq_ids','[[1,2,4,7,8]]',13,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:26','2025-09-11 01:45:26'),(24,'faq_ids','[[2,3,4,6,8]]',14,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:26','2025-09-11 01:45:26'),(25,'is_popular','[\"1\"]',15,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:26','2025-09-11 01:45:26'),(26,'faq_ids','[[1,3,6,7,8]]',15,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:26','2025-09-11 01:45:26'),(27,'faq_ids','[[1,3,4,9,10]]',16,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:26','2025-09-11 01:45:26'),(28,'is_popular','[\"1\"]',17,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:26','2025-09-11 01:45:26'),(29,'faq_ids','[[1,3,6,8,10]]',17,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:26','2025-09-11 01:45:26'),(30,'faq_ids','[[2,4,6,9,10]]',18,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:26','2025-09-11 01:45:26'),(31,'is_popular','[\"1\"]',19,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:27','2025-09-11 01:45:27'),(32,'faq_ids','[[3,4,5,6,9]]',19,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:27','2025-09-11 01:45:27'),(33,'faq_ids','[[2,4,6,7,10]]',20,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:27','2025-09-11 01:45:27'),(34,'is_popular','[\"1\"]',21,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:27','2025-09-11 01:45:27'),(35,'faq_ids','[[1,4,5,6,8]]',21,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:27','2025-09-11 01:45:27'),(36,'faq_ids','[[2,3,4,7,10]]',22,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:27','2025-09-11 01:45:27'),(37,'is_popular','[\"1\"]',23,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:27','2025-09-11 01:45:27'),(38,'faq_ids','[[1,3,5,7,10]]',23,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:27','2025-09-11 01:45:27'),(39,'faq_ids','[[1,2,7,9,10]]',24,'Botble\\Ecommerce\\Models\\Product','2025-09-11 01:45:27','2025-09-11 01:45:27'),(40,'subtitle','[\"Limited quantities.\"]',1,'Botble\\Ecommerce\\Models\\FlashSale','2025-09-11 01:45:40','2025-09-11 01:45:40'),(41,'image','[\"flash-sales\\/1.jpg\"]',1,'Botble\\Ecommerce\\Models\\FlashSale','2025-09-11 01:45:40','2025-09-11 01:45:40'),(42,'subtitle','[\"Computers & Laptop\"]',2,'Botble\\Ecommerce\\Models\\FlashSale','2025-09-11 01:45:40','2025-09-11 01:45:40'),(43,'image','[\"flash-sales\\/2.jpg\"]',2,'Botble\\Ecommerce\\Models\\FlashSale','2025-09-11 01:45:40','2025-09-11 01:45:40'),(44,'button_text','[\"Shop now\"]',1,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(45,'subtitle','[\"Trade-In Offer\"]',1,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(46,'highlight_text','[\"On All Products\"]',1,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(47,'button_text','[\"Discover now\"]',2,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(48,'subtitle','[\"Tech Promotions\"]',2,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(49,'highlight_text','[\"Great Collection\"]',2,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(50,'button_text','[\"Shop now\"]',3,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(51,'subtitle','[\"Upcoming Offer\"]',3,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(52,'highlight_text','[\"Manufacturer\"]',3,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(53,'simple_slider_style','[\"style-2\"]',2,'Botble\\SimpleSlider\\Models\\SimpleSlider','2025-09-11 01:45:43','2025-09-11 01:45:43'),(54,'button_text','[\"Shop now\"]',4,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(55,'subtitle','[\"Trade-In Offer\"]',4,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(56,'highlight_text','[\"On All Products\"]',4,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(57,'button_text','[\"Discover now\"]',5,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(58,'subtitle','[\"Tech Promotions\"]',5,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(59,'highlight_text','[\"Great Collection\"]',5,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(60,'button_text','[\"Shop now\"]',6,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(61,'subtitle','[\"Upcoming Offer\"]',6,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(62,'highlight_text','[\"Manufacturer\"]',6,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(63,'simple_slider_style','[\"style-3\"]',3,'Botble\\SimpleSlider\\Models\\SimpleSlider','2025-09-11 01:45:43','2025-09-11 01:45:43'),(64,'button_text','[\"Shop now\"]',7,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(65,'subtitle','[\"Trade-In Offer\"]',7,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(66,'highlight_text','[\"On All Products\"]',7,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(67,'button_text','[\"Discover now\"]',8,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(68,'subtitle','[\"Tech Promotions\"]',8,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(69,'highlight_text','[\"Great Collection\"]',8,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(70,'simple_slider_style','[\"style-4\"]',4,'Botble\\SimpleSlider\\Models\\SimpleSlider','2025-09-11 01:45:43','2025-09-11 01:45:43'),(71,'button_text','[\"Shop now\"]',9,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(72,'subtitle','[\"Trade-In Offer\"]',9,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(73,'highlight_text','[\"On All Products\"]',9,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(74,'button_text','[\"Discover now\"]',10,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:43','2025-09-11 01:45:43'),(75,'subtitle','[\"Tech Promotions\"]',10,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:44','2025-09-11 01:45:44'),(76,'highlight_text','[\"Great Collection\"]',10,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:44','2025-09-11 01:45:44'),(77,'button_text','[\"Shop now\"]',11,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:44','2025-09-11 01:45:44'),(78,'subtitle','[\"Upcoming Offer\"]',11,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:44','2025-09-11 01:45:44'),(79,'highlight_text','[\"Manufacturer\"]',11,'Botble\\SimpleSlider\\Models\\SimpleSliderItem','2025-09-11 01:45:44','2025-09-11 01:45:44'),(80,'expanding_product_categories_on_the_homepage','[\"yes\"]',2,'Botble\\Page\\Models\\Page','2025-09-11 01:45:46','2025-09-11 01:45:46'),(81,'button_text','[\"Shop now\"]',1,'Botble\\Ads\\Models\\Ads','2025-09-11 01:45:53','2025-09-11 01:45:53'),(82,'subtitle','[\"Save 20% on\\niPhone 12\"]',1,'Botble\\Ads\\Models\\Ads','2025-09-11 01:45:53','2025-09-11 01:45:53'),(83,'button_text','[\"Shop now\"]',2,'Botble\\Ads\\Models\\Ads','2025-09-11 01:45:53','2025-09-11 01:45:53'),(84,'subtitle','[\"Great Camera\\nCollection\"]',2,'Botble\\Ads\\Models\\Ads','2025-09-11 01:45:53','2025-09-11 01:45:53'),(85,'button_text','[\"Shop now\"]',3,'Botble\\Ads\\Models\\Ads','2025-09-11 01:45:53','2025-09-11 01:45:53'),(86,'subtitle','[\"Shop Today\\u2019s\\nDeals & Offers\"]',3,'Botble\\Ads\\Models\\Ads','2025-09-11 01:45:53','2025-09-11 01:45:53'),(87,'button_text','[\"Shop now\"]',4,'Botble\\Ads\\Models\\Ads','2025-09-11 01:45:53','2025-09-11 01:45:53'),(88,'subtitle','[\"Save 17% on\\nAssus Laptop\"]',4,'Botble\\Ads\\Models\\Ads','2025-09-11 01:45:53','2025-09-11 01:45:53'),(89,'button_text','[\"Shop now\"]',5,'Botble\\Ads\\Models\\Ads','2025-09-11 01:45:53','2025-09-11 01:45:53'),(90,'subtitle','[\"Save 20% on\\niPhone 12\"]',5,'Botble\\Ads\\Models\\Ads','2025-09-11 01:45:53','2025-09-11 01:45:53'),(91,'button_text','[\"Learn more\"]',6,'Botble\\Ads\\Models\\Ads','2025-09-11 01:45:53','2025-09-11 01:45:53'),(92,'subtitle','[\"We\'re an Apple\\nAuthorised Service Provider\"]',6,'Botble\\Ads\\Models\\Ads','2025-09-11 01:45:53','2025-09-11 01:45:53');
/*!40000 ALTER TABLE `meta_boxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=239 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000001_create_cache_table',1),(2,'2013_04_09_032329_create_base_tables',1),(3,'2013_04_09_062329_create_revisions_table',1),(4,'2014_10_12_000000_create_users_table',1),(5,'2014_10_12_100000_create_password_reset_tokens_table',1),(6,'2016_06_10_230148_create_acl_tables',1),(7,'2016_06_14_230857_create_menus_table',1),(8,'2016_06_28_221418_create_pages_table',1),(9,'2016_10_05_074239_create_setting_table',1),(10,'2016_11_28_032840_create_dashboard_widget_tables',1),(11,'2016_12_16_084601_create_widgets_table',1),(12,'2017_05_09_070343_create_media_tables',1),(13,'2017_11_03_070450_create_slug_table',1),(14,'2019_01_05_053554_create_jobs_table',1),(15,'2019_08_19_000000_create_failed_jobs_table',1),(16,'2019_12_14_000001_create_personal_access_tokens_table',1),(17,'2021_08_02_084121_fix_old_shortcode',1),(18,'2022_04_20_100851_add_index_to_media_table',1),(19,'2022_04_20_101046_add_index_to_menu_table',1),(20,'2022_07_10_034813_move_lang_folder_to_root',1),(21,'2022_08_04_051940_add_missing_column_expires_at',1),(22,'2022_09_01_000001_create_admin_notifications_tables',1),(23,'2022_09_27_084829_fix_footer_widget',1),(24,'2022_10_14_024629_drop_column_is_featured',1),(25,'2022_10_28_030106_improve-newsletter-widget',1),(26,'2022_11_18_063357_add_missing_timestamp_in_table_settings',1),(27,'2022_12_02_093615_update_slug_index_columns',1),(28,'2023_01_30_024431_add_alt_to_media_table',1),(29,'2023_02_16_042611_drop_table_password_resets',1),(30,'2023_04_23_005903_add_column_permissions_to_admin_notifications',1),(31,'2023_05_10_075124_drop_column_id_in_role_users_table',1),(32,'2023_08_21_090810_make_page_content_nullable',1),(33,'2023_09_14_021936_update_index_for_slugs_table',1),(34,'2023_12_07_095130_add_color_column_to_media_folders_table',1),(35,'2023_12_17_162208_make_sure_column_color_in_media_folders_nullable',1),(36,'2024_04_04_110758_update_value_column_in_user_meta_table',1),(37,'2024_05_12_091229_add_column_visibility_to_table_media_files',1),(38,'2024_07_07_091316_fix_column_url_in_menu_nodes_table',1),(39,'2024_07_12_100000_change_random_hash_for_media',1),(40,'2024_09_30_024515_create_sessions_table',1),(41,'2024_12_19_000001_create_device_tokens_table',1),(42,'2024_12_19_000002_create_push_notifications_table',1),(43,'2024_12_19_000003_create_push_notification_recipients_table',1),(44,'2024_12_30_000001_create_user_settings_table',1),(45,'2025_07_06_030754_add_phone_to_users_table',1),(46,'2025_07_31_add_performance_indexes_to_slugs_table',1),(47,'2020_11_18_150916_ads_create_ads_table',2),(48,'2021_12_02_035301_add_ads_translations_table',2),(49,'2023_04_17_062645_add_open_in_new_tab',2),(50,'2023_11_07_023805_add_tablet_mobile_image',2),(51,'2024_04_01_043317_add_google_adsense_slot_id_to_ads_table',2),(52,'2025_04_21_000000_add_tablet_mobile_image_to_ads_translations_table',2),(53,'2024_04_27_100730_improve_analytics_setting',3),(54,'2015_06_29_025744_create_audit_history',4),(55,'2023_11_14_033417_change_request_column_in_table_audit_histories',4),(56,'2025_05_05_000001_add_user_type_to_audit_histories_table',4),(57,'2015_06_18_033822_create_blog_table',5),(58,'2021_02_16_092633_remove_default_value_for_author_type',5),(59,'2021_12_03_030600_create_blog_translations',5),(60,'2022_04_19_113923_add_index_to_table_posts',5),(61,'2023_08_29_074620_make_column_author_id_nullable',5),(62,'2024_07_30_091615_fix_order_column_in_categories_table',5),(63,'2025_01_06_033807_add_default_value_for_categories_author_type',5),(64,'2016_06_17_091537_create_contacts_table',6),(65,'2023_11_10_080225_migrate_contact_blacklist_email_domains_to_core',6),(66,'2024_03_20_080001_migrate_change_attribute_email_to_nullable_form_contacts_table',6),(67,'2024_03_25_000001_update_captcha_settings_for_contact',6),(68,'2024_04_19_063914_create_custom_fields_table',6),(69,'2020_03_05_041139_create_ecommerce_tables',7),(70,'2021_01_01_044147_ecommerce_create_flash_sale_table',7),(71,'2021_01_17_082713_add_column_is_featured_to_product_collections_table',7),(72,'2021_01_18_024333_add_zip_code_into_table_customer_addresses',7),(73,'2021_02_18_073505_update_table_ec_reviews',7),(74,'2021_03_10_024419_add_column_confirmed_at_to_table_ec_customers',7),(75,'2021_03_10_025153_change_column_tax_amount',7),(76,'2021_03_20_033103_add_column_availability_to_table_ec_products',7),(77,'2021_04_28_074008_ecommerce_create_product_label_table',7),(78,'2021_05_31_173037_ecommerce_create_ec_products_translations',7),(79,'2021_08_17_105016_remove_column_currency_id_in_some_tables',7),(80,'2021_08_30_142128_add_images_column_to_ec_reviews_table',7),(81,'2021_10_04_030050_add_column_created_by_to_table_ec_products',7),(82,'2021_10_05_122616_add_status_column_to_ec_customers_table',7),(83,'2021_11_03_025806_nullable_phone_number_in_ec_customer_addresses',7),(84,'2021_11_23_071403_correct_languages_for_product_variations',7),(85,'2021_11_28_031808_add_product_tags_translations',7),(86,'2021_12_01_031123_add_featured_image_to_ec_products',7),(87,'2022_01_01_033107_update_table_ec_shipments',7),(88,'2022_02_16_042457_improve_product_attribute_sets',7),(89,'2022_03_22_075758_correct_product_name',7),(90,'2022_04_19_113334_add_index_to_ec_products',7),(91,'2022_04_28_144405_remove_unused_table',7),(92,'2022_05_05_115015_create_ec_customer_recently_viewed_products_table',7),(93,'2022_05_18_143720_add_index_to_table_ec_product_categories',7),(94,'2022_06_16_095633_add_index_to_some_tables',7),(95,'2022_06_30_035148_create_order_referrals_table',7),(96,'2022_07_24_153815_add_completed_at_to_ec_orders_table',7),(97,'2022_08_14_032836_create_ec_order_returns_table',7),(98,'2022_08_14_033554_create_ec_order_return_items_table',7),(99,'2022_08_15_040324_add_billing_address',7),(100,'2022_08_30_091114_support_digital_products_table',7),(101,'2022_09_13_095744_create_options_table',7),(102,'2022_09_13_104347_create_option_value_table',7),(103,'2022_10_05_163518_alter_table_ec_order_product',7),(104,'2022_10_12_041517_create_invoices_table',7),(105,'2022_10_12_142226_update_orders_table',7),(106,'2022_10_13_024916_update_table_order_returns',7),(107,'2022_10_21_030830_update_columns_in_ec_shipments_table',7),(108,'2022_10_28_021046_update_columns_in_ec_shipments_table',7),(109,'2022_11_16_034522_update_type_column_in_ec_shipping_rules_table',7),(110,'2022_11_19_041643_add_ec_tax_product_table',7),(111,'2022_12_12_063830_update_tax_defadult_in_ec_tax_products_table',7),(112,'2022_12_17_041532_fix_address_in_order_invoice',7),(113,'2022_12_26_070329_create_ec_product_views_table',7),(114,'2023_01_04_033051_fix_product_categories',7),(115,'2023_01_09_050400_add_ec_global_options_translations_table',7),(116,'2023_01_10_093754_add_missing_option_value_id',7),(117,'2023_01_17_082713_add_column_barcode_and_cost_per_item_to_product_table',7),(118,'2023_01_26_021854_add_ec_customer_used_coupons_table',7),(119,'2023_02_08_015900_update_options_column_in_ec_order_product_table',7),(120,'2023_02_27_095752_remove_duplicate_reviews',7),(121,'2023_03_20_115757_add_user_type_column_to_ec_shipment_histories_table',7),(122,'2023_04_21_082427_create_ec_product_categorizables_table',7),(123,'2023_05_03_011331_add_missing_column_price_into_invoice_items_table',7),(124,'2023_05_17_025812_fix_invoice_issue',7),(125,'2023_05_26_073140_move_option_make_phone_field_optional_at_checkout_page_to_mandatory_fields',7),(126,'2023_05_27_144611_fix_exchange_rate_setting',7),(127,'2023_06_22_084331_add_generate_license_code_to_ec_products_table',7),(128,'2023_06_30_042512_create_ec_order_tax_information_table',7),(129,'2023_07_14_022724_remove_column_id_from_ec_product_collection_products',7),(130,'2023_08_09_012940_remove_column_status_in_ec_product_attributes',7),(131,'2023_08_15_064505_create_ec_tax_rules_table',7),(132,'2023_08_21_021819_make_column_address_in_ec_customer_addresses_nullable',7),(133,'2023_08_22_094114_drop_unique_for_barcode',7),(134,'2023_08_30_031811_add_apply_via_url_column_to_ec_discounts_table',7),(135,'2023_09_07_094312_add_index_to_product_sku_and_translations',7),(136,'2023_09_19_024955_create_discount_product_categories_table',7),(137,'2023_10_17_070728_add_icon_and_icon_image_to_product_categories_table',7),(138,'2023_11_22_154643_add_unique_in_table_ec_products_variations',7),(139,'2023_11_27_032313_add_price_columns_to_ec_product_cross_sale_relations_table',7),(140,'2023_12_06_023945_add_display_on_checkout_column_to_ec_discounts_table',7),(141,'2023_12_25_040604_ec_create_review_replies_table',7),(142,'2023_12_26_090340_add_private_notes_column_to_ec_customers_table',7),(143,'2024_01_16_070706_fix_translation_tables',7),(144,'2024_01_23_075227_add_proof_file_to_ec_orders_table',7),(145,'2024_03_26_041531_add_cancel_reason_to_ec_orders_table',7),(146,'2024_03_27_062402_create_ec_customer_deletion_requests_table',7),(147,'2024_03_29_042242_migrate_old_captcha_settings',7),(148,'2024_03_29_093946_create_ec_order_return_histories_table',7),(149,'2024_04_01_063523_add_customer_columns_to_ec_reviews_table',7),(150,'2024_04_15_092654_migrate_ecommerce_google_tag_manager_code_setting',7),(151,'2024_04_16_035713_add_min_max_order_quantity_columns_to_products_table',7),(152,'2024_05_07_073153_improve_table_wishlist',7),(153,'2024_05_07_093703_add_missing_zip_code_into_table_store_locators',7),(154,'2024_05_15_021503_fix_invoice_path',7),(155,'2024_06_20_160724_create_ec_shared_wishlists_table',7),(156,'2024_06_28_025104_add_notify_attachment_updated_column_to_ec_products_table',7),(157,'2024_07_03_030900_add_downloaded_at_column_to_ec_order_product_table',7),(158,'2024_07_14_071826_make_customer_email_nullable',7),(159,'2024_07_15_104916_add_video_media_column_to_ec_products_table',7),(160,'2024_07_26_052530_add_percentage_to_tax_rules_table',7),(161,'2024_08_14_123028_add_customer_delivered_confirmed_at_column_to_ec_shipments_table',7),(162,'2024_08_19_132849_create_specification_tables',7),(163,'2024_09_07_060744_add_author_column_to_specification_tables',7),(164,'2024_09_14_064023_add_can_use_with_flash_sale_column_to_ec_discounts_table',7),(165,'2024_09_25_073928_remove_wrong_product_slugs',7),(166,'2025_01_10_000000_fix_order_invoice_rounding_issues',7),(167,'2025_01_15_050230_migrate_old_theme_options',7),(168,'2025_01_15_optimize_products_export_index',7),(169,'2025_01_17_082713_correct_column_barcode_and_cost_per_item_to_product_table',7),(170,'2025_01_24_044641_migrate_old_country_data',7),(171,'2025_01_28_233602_add_private_notes_into_ec_orders_table',7),(172,'2025_02_13_021247_add_tax_translations',7),(173,'2025_02_24_152621_add_text_color_to_product_labels_table',7),(174,'2025_04_12_000001_add_payment_fee_to_ec_orders_table',7),(175,'2025_04_12_000002_add_payment_fee_to_ec_invoices_table',7),(176,'2025_05_05_092036_make_user_id_and_tax_amount_nullable',7),(177,'2025_05_15_082342_drop_email_unique_index_in_ec_customers_table',7),(178,'2025_06_07_081731_add_translations_for_specification_groups_and_tables',7),(179,'2025_06_17_091813_increase_note_in_shipments_table',7),(180,'2025_06_24_000001_create_ec_product_license_codes_table',7),(181,'2025_06_24_080427_add_license_code_type_to_products_table',7),(182,'2025_07_06_062402_create_ec_customer_deletion_requests_table',7),(183,'2025_07_07_161729_change_license_code_to_text_in_ec_product_license_codes_table',7),(184,'2025_07_08_162756_increase_license_code_column_size_in_ec_order_product_table',7),(185,'2025_07_09_000001_add_customer_address_fields_to_ec_invoices_table',7),(186,'2025_07_15_090809_create_ec_abandoned_carts_table',7),(187,'2025_07_24_120510_increase_barcode_column_length_in_ec_products_table',7),(188,'2025_07_31_133600_add_performance_indexes_to_ec_product_categories_table',7),(189,'2025_08_01_161205_optimize_product_variation_query_indexes',7),(190,'2025_08_08_145059_correct_tax_amount_in_order_and_invoice_tables',7),(191,'2025_09_05_025247_create_ec_product_specification_attribute_translations_table',7),(192,'2025_09_08_025516_add_variations_count_to_ec_products_table',7),(193,'2025_09_08_030755_add_reviews_cache_to_ec_products_table',7),(194,'2025_09_08_080248_add_slug_column_to_ec_product_categories_table',7),(195,'2025_09_08_080330_add_slug_column_to_ec_product_categories_translations_table',7),(196,'2025_09_08_080443_populate_slug_column_for_product_categories',7),(197,'2025_09_08_081216_add_slug_column_to_ec_products_table',7),(198,'2025_09_08_081237_add_slug_column_to_ec_products_translations_table',7),(199,'2025_09_08_081321_populate_slug_column_for_products',7),(200,'2025_09_10_073321_add_performance_indexes_to_ecommerce_tables',7),(201,'2018_07_09_221238_create_faq_table',8),(202,'2021_12_03_082134_create_faq_translations',8),(203,'2023_11_17_063408_add_description_column_to_faq_categories_table',8),(204,'2016_10_03_032336_create_languages_table',9),(205,'2023_09_14_022423_add_index_for_language_table',9),(206,'2021_10_25_021023_fix-priority-load-for-language-advanced',10),(207,'2021_12_03_075608_create_page_translations',10),(208,'2023_07_06_011444_create_slug_translations_table',10),(209,'2019_11_18_061011_create_country_table',11),(210,'2021_12_03_084118_create_location_translations',11),(211,'2021_12_03_094518_migrate_old_location_data',11),(212,'2021_12_10_034440_switch_plugin_location_to_use_language_advanced',11),(213,'2022_01_16_085908_improve_plugin_location',11),(214,'2022_08_04_052122_delete_location_backup_tables',11),(215,'2023_04_23_061847_increase_state_translations_abbreviation_column',11),(216,'2023_07_26_041451_add_more_columns_to_location_table',11),(217,'2023_07_27_041451_add_more_columns_to_location_translation_table',11),(218,'2023_08_15_073307_drop_unique_in_states_cities_translations',11),(219,'2023_10_21_065016_make_state_id_in_table_cities_nullable',11),(220,'2024_08_17_094600_add_image_into_countries',11),(221,'2025_01_08_093652_add_zip_code_to_cities',11),(222,'2025_07_31_083459_add_indexes_for_location_search_performance',11),(223,'2017_10_24_154832_create_newsletter_table',12),(224,'2024_03_25_000001_update_captcha_settings_for_newsletter',12),(225,'2017_05_18_080441_create_payment_tables',13),(226,'2021_03_27_144913_add_customer_type_into_table_payments',13),(227,'2021_05_24_034720_make_column_currency_nullable',13),(228,'2021_08_09_161302_add_metadata_column_to_payments_table',13),(229,'2021_10_19_020859_update_metadata_field',13),(230,'2022_06_28_151901_activate_paypal_stripe_plugin',13),(231,'2022_07_07_153354_update_charge_id_in_table_payments',13),(232,'2024_07_04_083133_create_payment_logs_table',13),(233,'2025_04_12_000003_add_payment_fee_to_payments_table',13),(234,'2025_05_22_000001_add_payment_fee_type_to_settings_table',13),(235,'2017_07_11_140018_create_simple_slider_table',14),(236,'2025_04_08_040931_create_social_logins_table',15),(237,'2016_10_07_193005_create_translations_table',16),(238,'2023_12_12_105220_drop_translations_table',16);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletters`
--

DROP TABLE IF EXISTS `newsletters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newsletters` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'subscribed',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletters`
--

LOCK TABLES `newsletters` WRITE;
/*!40000 ALTER TABLE `newsletters` DISABLE KEYS */;
/*!40000 ALTER TABLE `newsletters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `user_id` bigint unsigned DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `template` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pages_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (1,'Homepage','<div>[simple-slider key=\"home-slider-1\" is_autoplay=\"yes\" autoplay_speed=\"5000\"][/simple-slider]</div><div>[site-features icon1=\"general/icon-truck.png\" title1=\"Free Shipping\" subtitle1=\"Orders $50 or more\" icon2=\"general/icon-purchase.png\" title2=\"Free Returns\" subtitle2=\"Within 30 days\" icon3=\"general/icon-bag.png\" title3=\"Get 20% Off 1 Item\" subtitle3=\"When you sign up\" icon4=\"general/icon-operator.png\" title4=\"Support Center\" subtitle4=\"24/7 amazing services\"][/site-features]</div><div>[featured-product-categories title=\"Top Categories\" mobile_scroll_items=\"2\"][/featured-product-categories]</div><div>[product-collections title=\"Exclusive Products\"][/product-collections]</div><div>[theme-ads ads_1=\"IZ6WU8KUALYD\" ads_2=\"ILSFJVYFGCPZ\" ads_3=\"ILSDKVYFGXPH\"][/theme-ads]</div><div>[featured-products title=\"Featured products\" mobile_scroll_items=\"2\"][/featured-products]</div><div>[flash-sale show_popup=\"yes\"][/flash-sale]</div><div>[featured-brands title=\"Featured Brands\" mobile_scroll_items=\"2\"][/featured-brands]</div><div>[product-category-products category_id=\"12\"][/product-category-products]</div><div>[featured-news title=\"Visit Our Blog\"][/featured-news]</div>',1,NULL,'homepage',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(2,'Homepage 2','<div>[simple-slider key=\"home-slider-2\" is_autoplay=\"yes\" autoplay_speed=\"5000\"][/simple-slider]</div><div>[theme-ads ads_1=\"IZ6WU8KUALYD\" ads_2=\"ILSFJVYFGCPZ\" ads_3=\"ILSDKVYFGXPH\"][/theme-ads]</div><div>[product-collections title=\"Exclusive Products\"][/product-collections]</div><div>[theme-ads ads_1=\"IZ6WU8KUALYF\"][/theme-ads]</div><div>[featured-products title=\"Featured products\"][/featured-products]</div><div>[flash-sale show_popup=\"yes\"][/flash-sale]</div><div>[featured-brands title=\"Featured Brands\"][/featured-brands]</div><div>[featured-product-categories title=\"Top Categories\"][/featured-product-categories]</div><div>[product-category-products category_id=\"12\"][/product-category-products]</div><div>[featured-news title=\"Visit Our Blog\"][/featured-news]</div><div>[site-features icon1=\"general/icon-truck.png\" title1=\"Free Shipping\" subtitle1=\"Orders $50 or more\" icon2=\"general/icon-purchase.png\" title2=\"Free Returns\" subtitle2=\"Within 30 days\" icon3=\"general/icon-bag.png\" title3=\"Get 20% Off 1 Item\" subtitle3=\"When you sign up\" icon4=\"general/icon-operator.png\" title4=\"Support Center\" subtitle4=\"24/7 amazing services\"][/site-features]</div>',1,NULL,'homepage',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(3,'Homepage 3','<div>[simple-slider key=\"home-slider-3\" ads_1=\"ILSDKVYFGXPJ\" ads_2=\"IZ6WU8KUALYE\" is_autoplay=\"yes\" autoplay_speed=\"5000\"][/simple-slider]</div><div>[product-collections title=\"Exclusive Products\"][/product-collections]</div><div>[theme-ads ads_1=\"IZ6WU8KUALYD\" ads_2=\"ILSFJVYFGCPZ\" ads_3=\"ILSDKVYFGXPH\"][/theme-ads]</div><div>[site-features icon1=\"general/icon-truck.png\" title1=\"Free Shipping\" subtitle1=\"Orders $50 or more\" icon2=\"general/icon-purchase.png\" title2=\"Free Returns\" subtitle2=\"Within 30 days\" icon3=\"general/icon-bag.png\" title3=\"Get 20% Off 1 Item\" subtitle3=\"When you sign up\" icon4=\"general/icon-operator.png\" title4=\"Support Center\" subtitle4=\"24/7 amazing services\"][/site-features]</div><div>[featured-product-categories title=\"Top Categories\"][/featured-product-categories]</div><div>[featured-products title=\"Featured products\"][/featured-products]</div><div>[flash-sale show_popup=\"yes\"][/flash-sale]</div><div>[theme-ads ads_1=\"IZ6WU8KUALYF\"][/theme-ads]</div><div>[featured-brands title=\"Featured Brands\"][/featured-brands]</div><div>[product-category-products category_id=\"12\"][/product-category-products]</div><div>[featured-news title=\"Visit Our Blog\"][/featured-news]</div>',1,NULL,'homepage',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(4,'Homepage 4','<div>[simple-slider key=\"home-slider-4\" is_autoplay=\"yes\" autoplay_speed=\"5000\"][/simple-slider]</div><div>[site-features icon1=\"general/icon-truck.png\" title1=\"Free Shipping\" subtitle1=\"Orders $50 or more\" icon2=\"general/icon-purchase.png\" title2=\"Free Returns\" subtitle2=\"Within 30 days\" icon3=\"general/icon-bag.png\" title3=\"Get 20% Off 1 Item\" subtitle3=\"When you sign up\" icon4=\"general/icon-operator.png\" title4=\"Support Center\" subtitle4=\"24/7 amazing services\"][/site-features]</div><div>[product-collections title=\"Exclusive Products\"][/product-collections]</div><div>[featured-product-categories title=\"Top Categories\"][/featured-product-categories]</div><div>[theme-ads ads_1=\"IZ6WU8KUALYD\" ads_2=\"ILSFJVYFGCPZ\" ads_3=\"ILSDKVYFGXPH\"][/theme-ads]</div><div>[theme-ads ads_1=\"IZ6WU8KUALYF\"][/theme-ads]</div><div>[featured-products title=\"Featured products\"][/featured-products]</div><div>[flash-sale show_popup=\"yes\"][/flash-sale]</div><div>[featured-brands title=\"Featured Brands\"][/featured-brands]</div><div>[product-category-products category_id=\"12\"][/product-category-products]</div><div>[featured-news title=\"Visit Our Blog\"][/featured-news]</div>',1,NULL,'homepage',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(5,'Blog','<p>---</p>',1,NULL,'blog-right-sidebar',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(6,'Contact','<p>[google-map]502 New Street, Brighton VIC, Australia[/google-map]</p><p>[our-offices][/our-offices]</p><p>[contact-form][/contact-form]</p>',1,NULL,'default',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(7,'About us','<p>Mouse did not quite know what a Gryphon is, look at it!\' This speech caused a remarkable sensation among the trees as well as she leant against a buttercup to rest herself, and began by producing from under his arm a great deal to ME,\' said the Mock Turtle. \'And how did you manage on the look-out for serpents night and day! Why, I do so like that curious song about the temper of your nose-- What made you so awfully clever?\' \'I have answered three questions, and that you weren\'t to talk about.</p><p>I don\'t like them raw.\' \'Well, be off, then!\' said the Gryphon: and Alice heard the Queen\'s absence, and were quite silent, and looked at it again: but he could go. Alice took up the little door, so she began again: \'Ou est ma chatte?\' which was a dead silence instantly, and Alice guessed who it was, and, as the large birds complained that they must be a book of rules for shutting people up like a stalk out of it, and talking over its head. \'Very uncomfortable for the moment she appeared; but.</p><p>Alice would not give all else for two reasons. First, because I\'m on the OUTSIDE.\' He unfolded the paper as he spoke, and added \'It isn\'t mine,\' said the Pigeon in a tone of great relief. \'Now at OURS they had been running half an hour or so, and were resting in the middle. Alice kept her eyes filled with cupboards and book-shelves; here and there stood the Queen to-day?\' \'I should like to drop the jar for fear of killing somebody, so managed to put it more clearly,\' Alice replied in an angry.</p><p>THAT direction,\' waving the other ladder?--Why, I hadn\'t drunk quite so much!\' said Alice, and her eyes filled with cupboards and book-shelves; here and there was not even room for YOU, and no one else seemed inclined to say \'Drink me,\' but the great puzzle!\' And she thought at first she thought it over here,\' said the March Hare. The Hatter shook his head mournfully. \'Not I!\' said the Pigeon. \'I\'m NOT a serpent!\' said Alice a good character, But said I didn\'t!\' interrupted Alice. \'You must.</p>',1,NULL,'default',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(8,'Cookie Policy','<h3>EU Cookie Consent</h3><p>To use this website we are using Cookies and collecting some data. To be compliant with the EU GDPR we give you to choose if you allow us to use certain Cookies and to collect some Data.</p><h4>Essential Data</h4><p>The Essential Data is needed to run the Site you are visiting technically. You can not deactivate them.</p><p>- Session Cookie: PHP uses a Cookie to identify user sessions. Without this Cookie the Website is not working.</p><p>- XSRF-Token Cookie: Laravel automatically generates a CSRF \"token\" for each active user session managed by the application. This token is used to verify that the authenticated user is the one actually making the requests to the application.</p>',1,NULL,'default',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(9,'Terms &amp; Conditions','<p>I can say.\' This was such a capital one for catching mice you can\'t think! And oh, my poor little thing was to twist it up into a large mustard-mine near here. And the Eaglet bent down its head impatiently, and said, \'So you think you can find them.\' As she said to the little crocodile Improve his shining tail, And pour the waters of the same as the soldiers had to sing this:-- \'Beautiful Soup, so rich and green, Waiting in a helpless sort of knot, and then raised himself upon tiptoe, put his.</p><p>Duchess, the Duchess! Oh! won\'t she be savage if I\'ve kept her waiting!\' Alice felt a violent blow underneath her chin: it had made. \'He took me for a dunce? Go on!\' \'I\'m a poor man, your Majesty,\' said Two, in a low trembling voice, \'Let us get to twenty at that rate! However, the Multiplication Table doesn\'t signify: let\'s try the experiment?\' \'HE might bite,\' Alice cautiously replied: \'but I know all the jelly-fish out of a procession,\' thought she, \'what would become of it; so, after.</p><p>Alice. \'And be quick about it,\' said the Caterpillar. This was quite a conversation of it now in sight, hurrying down it. There was exactly three inches high). \'But I\'m NOT a serpent, I tell you!\' said Alice. \'Who\'s making personal remarks now?\' the Hatter instead!\' CHAPTER VII. A Mad Tea-Party There was no time to wash the things I used to it in time,\' said the King. Here one of the ground.\' So she tucked her arm affectionately into Alice\'s, and they sat down at her as she could, \'If you knew.</p><p>IS a Caucus-race?\' said Alice; \'that\'s not at all comfortable, and it put the Lizard in head downwards, and the cool fountains. CHAPTER VIII. The Queen\'s argument was, that her neck from being run over; and the Hatter were having tea at it: a Dormouse was sitting on a little before she gave a sudden leap out of it, and found that, as nearly as she was holding, and she crossed her hands up to her that she was about a whiting to a snail. \"There\'s a porpoise close behind it when she had peeped.</p>',1,NULL,'default',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(10,'Returns &amp; Exchanges','<p>Mock Turtle. \'She can\'t explain MYSELF, I\'m afraid, but you might knock, and I had our Dinah here, I know all the while, till at last she spread out her hand again, and that\'s very like having a game of croquet she was up to the door, and knocked. \'There\'s no sort of chance of her hedgehog. The hedgehog was engaged in a deep, hollow tone: \'sit down, both of you, and must know better\'; and this was not an encouraging opening for a minute or two. \'They couldn\'t have wanted it much,\' said the.</p><p>Knave of Hearts, and I don\'t believe there\'s an atom of meaning in it,\' but none of YOUR business, Two!\' said Seven. \'Yes, it IS his business!\' said Five, in a fight with another dig of her head struck against the ceiling, and had been anything near the right size, that it ought to be no use in crying like that!\' But she did not answer, so Alice ventured to ask. \'Suppose we change the subject. \'Go on with the Queen,\' and she crossed her hands on her hand, watching the setting sun, and thinking.</p><p>I shall be a very short time the Queen said to the little passage: and THEN--she found herself falling down a good opportunity for repeating his remark, with variations. \'I shall sit here,\' the Footman remarked, \'till tomorrow--\' At this moment the King, \'unless it was looking up into a tree. \'Did you say things are worse than ever,\' thought the poor child, \'for I never knew so much about a thousand times as large as the other.\' As soon as there was nothing else to do, and in THAT direction,\'.</p><p>King. \'Nearly two miles high,\' added the Gryphon; and then raised himself upon tiptoe, put his shoes off. \'Give your evidence,\' the King was the White Rabbit as he wore his crown over the verses on his knee, and looking at everything that was linked into hers began to get hold of this remark, and thought to herself. \'Shy, they seem to be\"--or if you\'d rather not.\' \'We indeed!\' cried the Gryphon, and, taking Alice by the Hatter, and he wasn\'t one?\' Alice asked. \'We called him Tortoise because.</p>',1,NULL,'default',NULL,'published','2025-09-11 01:45:47','2025-09-11 01:45:47'),(11,'Shipping &amp; Delivery','<p>Adventures, till she had found the fan and gloves. \'How queer it seems,\' Alice said with some curiosity. \'What a pity it wouldn\'t stay!\' sighed the Lory, who at last she spread out her hand, and Alice was thoroughly puzzled. \'Does the boots and shoes!\' she repeated in a moment: she looked down into its face in some book, but I grow up, I\'ll write one--but I\'m grown up now,\' she added in an impatient tone: \'explanations take such a rule at processions; \'and besides, what would happen next.</p><p>The King turned pale, and shut his eyes.--\'Tell her about the games now.\' CHAPTER X. The Lobster Quadrille is!\' \'No, indeed,\' said Alice. \'I don\'t quite understand you,\' she said, \'for her hair goes in such a very long silence, broken only by an occasional exclamation of \'Hjckrrh!\' from the trees as well as she was saying, and the Queen said--\' \'Get to your places!\' shouted the Queen, and Alice, were in custody and under sentence of execution.\' \'What for?\' said Alice. \'Well, I hardly know--No.</p><p>Alice could see it trying in a tone of great curiosity. \'It\'s a friend of mine--a Cheshire Cat,\' said Alice: \'I don\'t like them!\' When the sands are all pardoned.\' \'Come, THAT\'S a good way off, and found in it a violent shake at the mouth with strings: into this they slipped the guinea-pig, head first, and then, and holding it to make herself useful, and looking anxiously about her. \'Oh, do let me hear the rattle of the baby, it was only sobbing,\' she thought, \'till its ears have come, or at.</p><p>Bill\'s got to the conclusion that it was over at last, and managed to swallow a morsel of the evening, beautiful Soup! Beau--ootiful Soo--oop! Soo--oop of the Mock Turtle, suddenly dropping his voice; and Alice joined the procession, wondering very much of it altogether; but after a few minutes she heard the Queen\'s voice in the same thing as \"I sleep when I learn music.\' \'Ah! that accounts for it,\' said Alice. \'Why, you don\'t even know what \"it\" means well enough, when I sleep\" is the same.</p>',1,NULL,'default',NULL,'published','2025-09-11 01:45:47','2025-09-11 01:45:47'),(12,'Privacy Policy','<p>She was a large pigeon had flown into her face. \'Wake up, Alice dear!\' said her sister; \'Why, what are they doing?\' Alice whispered to the shore, and then keep tight hold of anything, but she could not swim. He sent them word I had it written down: but I shall be late!\' (when she thought it would like the look of things at all, as the rest of the party went back to the end: then stop.\' These were the cook, and a piece of rudeness was more than three.\' \'Your hair wants cutting,\' said the Queen.</p><p>King; \'and don\'t be nervous, or I\'ll have you executed, whether you\'re a little scream, half of fright and half of them--and it belongs to a mouse, you know. Come on!\' \'Everybody says \"come on!\" here,\' thought Alice, \'they\'re sure to happen,\' she said to Alice. \'Nothing,\' said Alice. \'Of course not,\' Alice replied thoughtfully. \'They have their tails in their paws. \'And how do you like the name: however, it only grinned when it saw mine coming!\' \'How do you call it sad?\' And she went on at.</p><p>No, there were no tears. \'If you\'re going to leave the court; but on the stairs. Alice knew it was a very curious thing, and longed to get hold of anything, but she could not possibly reach it: she could not stand, and she walked off, leaving Alice alone with the lobsters to the Gryphon. \'They can\'t have anything to say, she simply bowed, and took the place where it had made. \'He took me for asking! No, it\'ll never do to ask: perhaps I shall fall right THROUGH the earth! How funny it\'ll seem.</p><p>Very soon the Rabbit was still in sight, and no more to do so. \'Shall we try another figure of the day; and this was his first remark, \'It was the first witness,\' said the Mock Turtle recovered his voice, and, with tears running down his brush, and had to fall a long and a sad tale!\' said the Mock Turtle. \'She can\'t explain MYSELF, I\'m afraid, but you might like to have it explained,\' said the Gryphon, the squeaking of the e--e--evening, Beautiful, beautiful Soup!\' CHAPTER XI. Who Stole the.</p>',1,NULL,'default',NULL,'published','2025-09-11 01:45:47','2025-09-11 01:45:47'),(13,'Blog Left Sidebar','<p>[blog-posts paginate=\"12\"][/blog-posts]</p>',1,NULL,'blog-left-sidebar',NULL,'published','2025-09-11 01:45:47','2025-09-11 01:45:47'),(14,'FAQ','<div>[faqs][/faqs]</div>',1,NULL,'default',NULL,'published','2025-09-11 01:45:47','2025-09-11 01:45:47');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages_translations`
--

DROP TABLE IF EXISTS `pages_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pages_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`lang_code`,`pages_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages_translations`
--

LOCK TABLES `pages_translations` WRITE;
/*!40000 ALTER TABLE `pages_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_logs`
--

DROP TABLE IF EXISTS `payment_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `payment_method` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `request` longtext COLLATE utf8mb4_unicode_ci,
  `response` longtext COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_logs`
--

LOCK TABLES `payment_logs` WRITE;
/*!40000 ALTER TABLE `payment_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `currency` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL DEFAULT '0',
  `charge_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_channel` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(15,2) unsigned NOT NULL,
  `payment_fee` decimal(15,2) DEFAULT '0.00',
  `order_id` bigint unsigned DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `payment_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'confirm',
  `customer_id` bigint unsigned DEFAULT NULL,
  `refunded_amount` decimal(15,2) unsigned DEFAULT NULL,
  `refund_note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `customer_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `metadata` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_categories`
--

DROP TABLE IF EXISTS `post_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_categories` (
  `category_id` bigint unsigned NOT NULL,
  `post_id` bigint unsigned NOT NULL,
  KEY `post_categories_category_id_index` (`category_id`),
  KEY `post_categories_post_id_index` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_categories`
--

LOCK TABLES `post_categories` WRITE;
/*!40000 ALTER TABLE `post_categories` DISABLE KEYS */;
INSERT INTO `post_categories` VALUES (2,1),(3,1),(2,2),(4,2),(2,3),(3,3),(2,4),(3,4),(1,5),(4,5),(1,6),(4,6),(2,7),(3,7),(1,8),(3,8),(2,9),(4,9),(1,10),(4,10),(2,11),(3,11);
/*!40000 ALTER TABLE `post_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_tags`
--

DROP TABLE IF EXISTS `post_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_tags` (
  `tag_id` bigint unsigned NOT NULL,
  `post_id` bigint unsigned NOT NULL,
  KEY `post_tags_tag_id_index` (`tag_id`),
  KEY `post_tags_post_id_index` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_tags`
--

LOCK TABLES `post_tags` WRITE;
/*!40000 ALTER TABLE `post_tags` DISABLE KEYS */;
INSERT INTO `post_tags` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(1,2),(2,2),(3,2),(4,2),(5,2),(1,3),(2,3),(3,3),(4,3),(5,3),(1,4),(2,4),(3,4),(4,4),(5,4),(1,5),(2,5),(3,5),(4,5),(5,5),(1,6),(2,6),(3,6),(4,6),(5,6),(1,7),(2,7),(3,7),(4,7),(5,7),(1,8),(2,8),(3,8),(4,8),(5,8),(1,9),(2,9),(3,9),(4,9),(5,9),(1,10),(2,10),(3,10),(4,10),(5,10),(1,11),(2,11),(3,11),(4,11),(5,11);
/*!40000 ALTER TABLE `post_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `author_id` bigint unsigned DEFAULT NULL,
  `author_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_featured` tinyint unsigned NOT NULL DEFAULT '0',
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views` int unsigned NOT NULL DEFAULT '0',
  `format_type` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_status_index` (`status`),
  KEY `posts_author_id_index` (`author_id`),
  KEY `posts_author_type_index` (`author_type`),
  KEY `posts_created_at_index` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'4 Expert Tips On How To Choose The Right Men’s Wallet','You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.','<p>I have seen many people underestimating the power of their wallets. To them, they are just a functional item they use to carry. As a result, they often end up with the wallets which are not really suitable for them.</p>\n\n<p>You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.</p>\n\n<p style=\"text-align:center\"><img alt=\"f4\" src=\"/storage/news/1.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n\n\n<p><strong><em>For all of the reason above, here are 7 expert tips to help you pick up the right men&rsquo;s wallet for you:</em></strong></p>\n\n<h4><strong>Number 1: Choose A Neat Wallet</strong></h4>\n\n<p>The wallet is an essential accessory that you should go simple. Simplicity is the best in this case. A simple and neat wallet with the plain color and even&nbsp;<strong>minimalist style</strong>&nbsp;is versatile. It can be used for both formal and casual events. In addition, that wallet will go well with most of the clothes in your wardrobe.</p>\n\n<p>Keep in mind that a wallet will tell other people about your personality and your fashion sense as much as other clothes you put on. Hence, don&rsquo;t go cheesy on your wallet or else people will think that you have a funny and particular style.</p>\n\n<p style=\"text-align:center\"><img alt=\"f5\" src=\"/storage/news/2.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n<hr />\n<h4><strong>Number 2: Choose The Right Size For Your Wallet</strong></h4>\n\n<p>You should avoid having an over-sized wallet. Don&rsquo;t think that you need to buy a big wallet because you have a lot to carry with you. In addition, a fat wallet is very ugly. It will make it harder for you to slide the wallet into your trousers&rsquo; pocket. In addition, it will create a bulge and ruin your look.</p>\n\n<p>Before you go on to buy a new wallet, clean out your wallet and place all of the items from your wallet on a table. Throw away things that you would never need any more such as the old bills or the expired gift cards. Remember to check your wallet on a frequent basis to get rid of all of the old stuff that you don&rsquo;t need anymore.</p>\n\n<p style=\"text-align:center\"><img alt=\"f1\" src=\"/storage/news/3.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 3: Don&rsquo;t Limit Your Options Of Materials</strong></h4>\n\n<p>The types and designs of wallets are not the only things that you should consider when you go out searching for your best wallet. You have more than 1 option of material rather than leather to choose from as well.</p>\n\n<p>You can experiment with other available options such as cotton, polyester and canvas. They all have their own pros and cons. As a result, they will be suitable for different needs and requirements. You should think about them all in order to choose the material which you would like the most.</p>\n\n<p style=\"text-align:center\"><img alt=\"f6\" height=\"375\" src=\"/storage/news/4.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 4: Consider A Wallet As A Long Term Investment</strong></h4>\n\n<p>Your wallet is indeed an investment that you should consider spending a decent amount of time and effort on it. Another factor that you need to consider is how much you want to spend on your wallet. The price ranges of wallets on the market vary a great deal. You can find a wallet which is as cheap as about 5 to 7 dollars. On the other hand, you should expect to pay around 250 to 300 dollars for a high-quality wallet.</p>\n\n<p>In case you need a wallet to use for a long time, it is a good idea that you should invest a decent amount of money on a wallet. A high quality wallet from a reputational brand with the premium quality such as cowhide leather will last for a long time. In addition, it is an accessory to show off your fashion sense and your social status.</p>\n\n<p style=\"text-align:center\"><img alt=\"f2\" height=\"400\" src=\"/storage/news/5.jpg\" /></p>\n\n<p>&nbsp;</p>\n','published',1,'Botble\\ACL\\Models\\User',1,'news/1.jpg',1683,NULL,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(2,'Sexy Clutches: How to Buy &amp; Wear a Designer Clutch Bag','You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.','<p>I have seen many people underestimating the power of their wallets. To them, they are just a functional item they use to carry. As a result, they often end up with the wallets which are not really suitable for them.</p>\n\n<p>You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.</p>\n\n<p style=\"text-align:center\"><img alt=\"f4\" src=\"/storage/news/1.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n\n\n<p><strong><em>For all of the reason above, here are 7 expert tips to help you pick up the right men&rsquo;s wallet for you:</em></strong></p>\n\n<h4><strong>Number 1: Choose A Neat Wallet</strong></h4>\n\n<p>The wallet is an essential accessory that you should go simple. Simplicity is the best in this case. A simple and neat wallet with the plain color and even&nbsp;<strong>minimalist style</strong>&nbsp;is versatile. It can be used for both formal and casual events. In addition, that wallet will go well with most of the clothes in your wardrobe.</p>\n\n<p>Keep in mind that a wallet will tell other people about your personality and your fashion sense as much as other clothes you put on. Hence, don&rsquo;t go cheesy on your wallet or else people will think that you have a funny and particular style.</p>\n\n<p style=\"text-align:center\"><img alt=\"f5\" src=\"/storage/news/2.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n<hr />\n<h4><strong>Number 2: Choose The Right Size For Your Wallet</strong></h4>\n\n<p>You should avoid having an over-sized wallet. Don&rsquo;t think that you need to buy a big wallet because you have a lot to carry with you. In addition, a fat wallet is very ugly. It will make it harder for you to slide the wallet into your trousers&rsquo; pocket. In addition, it will create a bulge and ruin your look.</p>\n\n<p>Before you go on to buy a new wallet, clean out your wallet and place all of the items from your wallet on a table. Throw away things that you would never need any more such as the old bills or the expired gift cards. Remember to check your wallet on a frequent basis to get rid of all of the old stuff that you don&rsquo;t need anymore.</p>\n\n<p style=\"text-align:center\"><img alt=\"f1\" src=\"/storage/news/3.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 3: Don&rsquo;t Limit Your Options Of Materials</strong></h4>\n\n<p>The types and designs of wallets are not the only things that you should consider when you go out searching for your best wallet. You have more than 1 option of material rather than leather to choose from as well.</p>\n\n<p>You can experiment with other available options such as cotton, polyester and canvas. They all have their own pros and cons. As a result, they will be suitable for different needs and requirements. You should think about them all in order to choose the material which you would like the most.</p>\n\n<p style=\"text-align:center\"><img alt=\"f6\" height=\"375\" src=\"/storage/news/4.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 4: Consider A Wallet As A Long Term Investment</strong></h4>\n\n<p>Your wallet is indeed an investment that you should consider spending a decent amount of time and effort on it. Another factor that you need to consider is how much you want to spend on your wallet. The price ranges of wallets on the market vary a great deal. You can find a wallet which is as cheap as about 5 to 7 dollars. On the other hand, you should expect to pay around 250 to 300 dollars for a high-quality wallet.</p>\n\n<p>In case you need a wallet to use for a long time, it is a good idea that you should invest a decent amount of money on a wallet. A high quality wallet from a reputational brand with the premium quality such as cowhide leather will last for a long time. In addition, it is an accessory to show off your fashion sense and your social status.</p>\n\n<p style=\"text-align:center\"><img alt=\"f2\" height=\"400\" src=\"/storage/news/5.jpg\" /></p>\n\n<p>&nbsp;</p>\n','published',1,'Botble\\ACL\\Models\\User',1,'news/2.jpg',884,NULL,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(3,'The Top 2020 Handbag Trends to Know','You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.','<p>I have seen many people underestimating the power of their wallets. To them, they are just a functional item they use to carry. As a result, they often end up with the wallets which are not really suitable for them.</p>\n\n<p>You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.</p>\n\n<p style=\"text-align:center\"><img alt=\"f4\" src=\"/storage/news/1.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n\n\n<p><strong><em>For all of the reason above, here are 7 expert tips to help you pick up the right men&rsquo;s wallet for you:</em></strong></p>\n\n<h4><strong>Number 1: Choose A Neat Wallet</strong></h4>\n\n<p>The wallet is an essential accessory that you should go simple. Simplicity is the best in this case. A simple and neat wallet with the plain color and even&nbsp;<strong>minimalist style</strong>&nbsp;is versatile. It can be used for both formal and casual events. In addition, that wallet will go well with most of the clothes in your wardrobe.</p>\n\n<p>Keep in mind that a wallet will tell other people about your personality and your fashion sense as much as other clothes you put on. Hence, don&rsquo;t go cheesy on your wallet or else people will think that you have a funny and particular style.</p>\n\n<p style=\"text-align:center\"><img alt=\"f5\" src=\"/storage/news/2.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n<hr />\n<h4><strong>Number 2: Choose The Right Size For Your Wallet</strong></h4>\n\n<p>You should avoid having an over-sized wallet. Don&rsquo;t think that you need to buy a big wallet because you have a lot to carry with you. In addition, a fat wallet is very ugly. It will make it harder for you to slide the wallet into your trousers&rsquo; pocket. In addition, it will create a bulge and ruin your look.</p>\n\n<p>Before you go on to buy a new wallet, clean out your wallet and place all of the items from your wallet on a table. Throw away things that you would never need any more such as the old bills or the expired gift cards. Remember to check your wallet on a frequent basis to get rid of all of the old stuff that you don&rsquo;t need anymore.</p>\n\n<p style=\"text-align:center\"><img alt=\"f1\" src=\"/storage/news/3.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 3: Don&rsquo;t Limit Your Options Of Materials</strong></h4>\n\n<p>The types and designs of wallets are not the only things that you should consider when you go out searching for your best wallet. You have more than 1 option of material rather than leather to choose from as well.</p>\n\n<p>You can experiment with other available options such as cotton, polyester and canvas. They all have their own pros and cons. As a result, they will be suitable for different needs and requirements. You should think about them all in order to choose the material which you would like the most.</p>\n\n<p style=\"text-align:center\"><img alt=\"f6\" height=\"375\" src=\"/storage/news/4.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 4: Consider A Wallet As A Long Term Investment</strong></h4>\n\n<p>Your wallet is indeed an investment that you should consider spending a decent amount of time and effort on it. Another factor that you need to consider is how much you want to spend on your wallet. The price ranges of wallets on the market vary a great deal. You can find a wallet which is as cheap as about 5 to 7 dollars. On the other hand, you should expect to pay around 250 to 300 dollars for a high-quality wallet.</p>\n\n<p>In case you need a wallet to use for a long time, it is a good idea that you should invest a decent amount of money on a wallet. A high quality wallet from a reputational brand with the premium quality such as cowhide leather will last for a long time. In addition, it is an accessory to show off your fashion sense and your social status.</p>\n\n<p style=\"text-align:center\"><img alt=\"f2\" height=\"400\" src=\"/storage/news/5.jpg\" /></p>\n\n<p>&nbsp;</p>\n','published',1,'Botble\\ACL\\Models\\User',1,'news/3.jpg',2199,NULL,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(4,'How to Match the Color of Your Handbag With an Outfit','You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.','<p>I have seen many people underestimating the power of their wallets. To them, they are just a functional item they use to carry. As a result, they often end up with the wallets which are not really suitable for them.</p>\n\n<p>You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.</p>\n\n<p style=\"text-align:center\"><img alt=\"f4\" src=\"/storage/news/1.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n[featured-products title=\"Shop The Look\" limit=\"6\"][/featured-products]\n\n<p><strong><em>For all of the reason above, here are 7 expert tips to help you pick up the right men&rsquo;s wallet for you:</em></strong></p>\n\n<h4><strong>Number 1: Choose A Neat Wallet</strong></h4>\n\n<p>The wallet is an essential accessory that you should go simple. Simplicity is the best in this case. A simple and neat wallet with the plain color and even&nbsp;<strong>minimalist style</strong>&nbsp;is versatile. It can be used for both formal and casual events. In addition, that wallet will go well with most of the clothes in your wardrobe.</p>\n\n<p>Keep in mind that a wallet will tell other people about your personality and your fashion sense as much as other clothes you put on. Hence, don&rsquo;t go cheesy on your wallet or else people will think that you have a funny and particular style.</p>\n\n<p style=\"text-align:center\"><img alt=\"f5\" src=\"/storage/news/2.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n<hr />\n<h4><strong>Number 2: Choose The Right Size For Your Wallet</strong></h4>\n\n<p>You should avoid having an over-sized wallet. Don&rsquo;t think that you need to buy a big wallet because you have a lot to carry with you. In addition, a fat wallet is very ugly. It will make it harder for you to slide the wallet into your trousers&rsquo; pocket. In addition, it will create a bulge and ruin your look.</p>\n\n<p>Before you go on to buy a new wallet, clean out your wallet and place all of the items from your wallet on a table. Throw away things that you would never need any more such as the old bills or the expired gift cards. Remember to check your wallet on a frequent basis to get rid of all of the old stuff that you don&rsquo;t need anymore.</p>\n\n<p style=\"text-align:center\"><img alt=\"f1\" src=\"/storage/news/3.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 3: Don&rsquo;t Limit Your Options Of Materials</strong></h4>\n\n<p>The types and designs of wallets are not the only things that you should consider when you go out searching for your best wallet. You have more than 1 option of material rather than leather to choose from as well.</p>\n\n<p>You can experiment with other available options such as cotton, polyester and canvas. They all have their own pros and cons. As a result, they will be suitable for different needs and requirements. You should think about them all in order to choose the material which you would like the most.</p>\n\n<p style=\"text-align:center\"><img alt=\"f6\" height=\"375\" src=\"/storage/news/4.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 4: Consider A Wallet As A Long Term Investment</strong></h4>\n\n<p>Your wallet is indeed an investment that you should consider spending a decent amount of time and effort on it. Another factor that you need to consider is how much you want to spend on your wallet. The price ranges of wallets on the market vary a great deal. You can find a wallet which is as cheap as about 5 to 7 dollars. On the other hand, you should expect to pay around 250 to 300 dollars for a high-quality wallet.</p>\n\n<p>In case you need a wallet to use for a long time, it is a good idea that you should invest a decent amount of money on a wallet. A high quality wallet from a reputational brand with the premium quality such as cowhide leather will last for a long time. In addition, it is an accessory to show off your fashion sense and your social status.</p>\n\n<p style=\"text-align:center\"><img alt=\"f2\" height=\"400\" src=\"/storage/news/5.jpg\" /></p>\n\n<p>&nbsp;</p>\n','published',1,'Botble\\ACL\\Models\\User',1,'news/4.jpg',1600,NULL,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(5,'How to Care for Leather Bags','You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.','<p>I have seen many people underestimating the power of their wallets. To them, they are just a functional item they use to carry. As a result, they often end up with the wallets which are not really suitable for them.</p>\n\n<p>You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.</p>\n\n<p style=\"text-align:center\"><img alt=\"f4\" src=\"/storage/news/1.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n\n\n<p><strong><em>For all of the reason above, here are 7 expert tips to help you pick up the right men&rsquo;s wallet for you:</em></strong></p>\n\n<h4><strong>Number 1: Choose A Neat Wallet</strong></h4>\n\n<p>The wallet is an essential accessory that you should go simple. Simplicity is the best in this case. A simple and neat wallet with the plain color and even&nbsp;<strong>minimalist style</strong>&nbsp;is versatile. It can be used for both formal and casual events. In addition, that wallet will go well with most of the clothes in your wardrobe.</p>\n\n<p>Keep in mind that a wallet will tell other people about your personality and your fashion sense as much as other clothes you put on. Hence, don&rsquo;t go cheesy on your wallet or else people will think that you have a funny and particular style.</p>\n\n<p style=\"text-align:center\"><img alt=\"f5\" src=\"/storage/news/2.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n<hr />\n<h4><strong>Number 2: Choose The Right Size For Your Wallet</strong></h4>\n\n<p>You should avoid having an over-sized wallet. Don&rsquo;t think that you need to buy a big wallet because you have a lot to carry with you. In addition, a fat wallet is very ugly. It will make it harder for you to slide the wallet into your trousers&rsquo; pocket. In addition, it will create a bulge and ruin your look.</p>\n\n<p>Before you go on to buy a new wallet, clean out your wallet and place all of the items from your wallet on a table. Throw away things that you would never need any more such as the old bills or the expired gift cards. Remember to check your wallet on a frequent basis to get rid of all of the old stuff that you don&rsquo;t need anymore.</p>\n\n<p style=\"text-align:center\"><img alt=\"f1\" src=\"/storage/news/3.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 3: Don&rsquo;t Limit Your Options Of Materials</strong></h4>\n\n<p>The types and designs of wallets are not the only things that you should consider when you go out searching for your best wallet. You have more than 1 option of material rather than leather to choose from as well.</p>\n\n<p>You can experiment with other available options such as cotton, polyester and canvas. They all have their own pros and cons. As a result, they will be suitable for different needs and requirements. You should think about them all in order to choose the material which you would like the most.</p>\n\n<p style=\"text-align:center\"><img alt=\"f6\" height=\"375\" src=\"/storage/news/4.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 4: Consider A Wallet As A Long Term Investment</strong></h4>\n\n<p>Your wallet is indeed an investment that you should consider spending a decent amount of time and effort on it. Another factor that you need to consider is how much you want to spend on your wallet. The price ranges of wallets on the market vary a great deal. You can find a wallet which is as cheap as about 5 to 7 dollars. On the other hand, you should expect to pay around 250 to 300 dollars for a high-quality wallet.</p>\n\n<p>In case you need a wallet to use for a long time, it is a good idea that you should invest a decent amount of money on a wallet. A high quality wallet from a reputational brand with the premium quality such as cowhide leather will last for a long time. In addition, it is an accessory to show off your fashion sense and your social status.</p>\n\n<p style=\"text-align:center\"><img alt=\"f2\" height=\"400\" src=\"/storage/news/5.jpg\" /></p>\n\n<p>&nbsp;</p>\n','published',1,'Botble\\ACL\\Models\\User',1,'news/5.jpg',757,NULL,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(6,'We\'re Crushing Hard on Summer\'s 10 Biggest Bag Trends','You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.','<p>I have seen many people underestimating the power of their wallets. To them, they are just a functional item they use to carry. As a result, they often end up with the wallets which are not really suitable for them.</p>\n\n<p>You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.</p>\n\n<p style=\"text-align:center\"><img alt=\"f4\" src=\"/storage/news/1.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n\n\n<p><strong><em>For all of the reason above, here are 7 expert tips to help you pick up the right men&rsquo;s wallet for you:</em></strong></p>\n\n<h4><strong>Number 1: Choose A Neat Wallet</strong></h4>\n\n<p>The wallet is an essential accessory that you should go simple. Simplicity is the best in this case. A simple and neat wallet with the plain color and even&nbsp;<strong>minimalist style</strong>&nbsp;is versatile. It can be used for both formal and casual events. In addition, that wallet will go well with most of the clothes in your wardrobe.</p>\n\n<p>Keep in mind that a wallet will tell other people about your personality and your fashion sense as much as other clothes you put on. Hence, don&rsquo;t go cheesy on your wallet or else people will think that you have a funny and particular style.</p>\n\n<p style=\"text-align:center\"><img alt=\"f5\" src=\"/storage/news/2.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n<hr />\n<h4><strong>Number 2: Choose The Right Size For Your Wallet</strong></h4>\n\n<p>You should avoid having an over-sized wallet. Don&rsquo;t think that you need to buy a big wallet because you have a lot to carry with you. In addition, a fat wallet is very ugly. It will make it harder for you to slide the wallet into your trousers&rsquo; pocket. In addition, it will create a bulge and ruin your look.</p>\n\n<p>Before you go on to buy a new wallet, clean out your wallet and place all of the items from your wallet on a table. Throw away things that you would never need any more such as the old bills or the expired gift cards. Remember to check your wallet on a frequent basis to get rid of all of the old stuff that you don&rsquo;t need anymore.</p>\n\n<p style=\"text-align:center\"><img alt=\"f1\" src=\"/storage/news/3.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 3: Don&rsquo;t Limit Your Options Of Materials</strong></h4>\n\n<p>The types and designs of wallets are not the only things that you should consider when you go out searching for your best wallet. You have more than 1 option of material rather than leather to choose from as well.</p>\n\n<p>You can experiment with other available options such as cotton, polyester and canvas. They all have their own pros and cons. As a result, they will be suitable for different needs and requirements. You should think about them all in order to choose the material which you would like the most.</p>\n\n<p style=\"text-align:center\"><img alt=\"f6\" height=\"375\" src=\"/storage/news/4.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 4: Consider A Wallet As A Long Term Investment</strong></h4>\n\n<p>Your wallet is indeed an investment that you should consider spending a decent amount of time and effort on it. Another factor that you need to consider is how much you want to spend on your wallet. The price ranges of wallets on the market vary a great deal. You can find a wallet which is as cheap as about 5 to 7 dollars. On the other hand, you should expect to pay around 250 to 300 dollars for a high-quality wallet.</p>\n\n<p>In case you need a wallet to use for a long time, it is a good idea that you should invest a decent amount of money on a wallet. A high quality wallet from a reputational brand with the premium quality such as cowhide leather will last for a long time. In addition, it is an accessory to show off your fashion sense and your social status.</p>\n\n<p style=\"text-align:center\"><img alt=\"f2\" height=\"400\" src=\"/storage/news/5.jpg\" /></p>\n\n<p>&nbsp;</p>\n','published',1,'Botble\\ACL\\Models\\User',1,'news/6.jpg',1515,NULL,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(7,'Essential Qualities of Highly Successful Music','You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.','<p>I have seen many people underestimating the power of their wallets. To them, they are just a functional item they use to carry. As a result, they often end up with the wallets which are not really suitable for them.</p>\n\n<p>You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.</p>\n\n<p style=\"text-align:center\"><img alt=\"f4\" src=\"/storage/news/1.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n\n\n<p><strong><em>For all of the reason above, here are 7 expert tips to help you pick up the right men&rsquo;s wallet for you:</em></strong></p>\n\n<h4><strong>Number 1: Choose A Neat Wallet</strong></h4>\n\n<p>The wallet is an essential accessory that you should go simple. Simplicity is the best in this case. A simple and neat wallet with the plain color and even&nbsp;<strong>minimalist style</strong>&nbsp;is versatile. It can be used for both formal and casual events. In addition, that wallet will go well with most of the clothes in your wardrobe.</p>\n\n<p>Keep in mind that a wallet will tell other people about your personality and your fashion sense as much as other clothes you put on. Hence, don&rsquo;t go cheesy on your wallet or else people will think that you have a funny and particular style.</p>\n\n<p style=\"text-align:center\"><img alt=\"f5\" src=\"/storage/news/2.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n<hr />\n<h4><strong>Number 2: Choose The Right Size For Your Wallet</strong></h4>\n\n<p>You should avoid having an over-sized wallet. Don&rsquo;t think that you need to buy a big wallet because you have a lot to carry with you. In addition, a fat wallet is very ugly. It will make it harder for you to slide the wallet into your trousers&rsquo; pocket. In addition, it will create a bulge and ruin your look.</p>\n\n<p>Before you go on to buy a new wallet, clean out your wallet and place all of the items from your wallet on a table. Throw away things that you would never need any more such as the old bills or the expired gift cards. Remember to check your wallet on a frequent basis to get rid of all of the old stuff that you don&rsquo;t need anymore.</p>\n\n<p style=\"text-align:center\"><img alt=\"f1\" src=\"/storage/news/3.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 3: Don&rsquo;t Limit Your Options Of Materials</strong></h4>\n\n<p>The types and designs of wallets are not the only things that you should consider when you go out searching for your best wallet. You have more than 1 option of material rather than leather to choose from as well.</p>\n\n<p>You can experiment with other available options such as cotton, polyester and canvas. They all have their own pros and cons. As a result, they will be suitable for different needs and requirements. You should think about them all in order to choose the material which you would like the most.</p>\n\n<p style=\"text-align:center\"><img alt=\"f6\" height=\"375\" src=\"/storage/news/4.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 4: Consider A Wallet As A Long Term Investment</strong></h4>\n\n<p>Your wallet is indeed an investment that you should consider spending a decent amount of time and effort on it. Another factor that you need to consider is how much you want to spend on your wallet. The price ranges of wallets on the market vary a great deal. You can find a wallet which is as cheap as about 5 to 7 dollars. On the other hand, you should expect to pay around 250 to 300 dollars for a high-quality wallet.</p>\n\n<p>In case you need a wallet to use for a long time, it is a good idea that you should invest a decent amount of money on a wallet. A high quality wallet from a reputational brand with the premium quality such as cowhide leather will last for a long time. In addition, it is an accessory to show off your fashion sense and your social status.</p>\n\n<p style=\"text-align:center\"><img alt=\"f2\" height=\"400\" src=\"/storage/news/5.jpg\" /></p>\n\n<p>&nbsp;</p>\n','published',1,'Botble\\ACL\\Models\\User',1,'news/7.jpg',1083,NULL,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(8,'9 Things I Love About Shaving My Head','You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.','<p>I have seen many people underestimating the power of their wallets. To them, they are just a functional item they use to carry. As a result, they often end up with the wallets which are not really suitable for them.</p>\n\n<p>You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.</p>\n\n<p style=\"text-align:center\"><img alt=\"f4\" src=\"/storage/news/1.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n\n\n<p><strong><em>For all of the reason above, here are 7 expert tips to help you pick up the right men&rsquo;s wallet for you:</em></strong></p>\n\n<h4><strong>Number 1: Choose A Neat Wallet</strong></h4>\n\n<p>The wallet is an essential accessory that you should go simple. Simplicity is the best in this case. A simple and neat wallet with the plain color and even&nbsp;<strong>minimalist style</strong>&nbsp;is versatile. It can be used for both formal and casual events. In addition, that wallet will go well with most of the clothes in your wardrobe.</p>\n\n<p>Keep in mind that a wallet will tell other people about your personality and your fashion sense as much as other clothes you put on. Hence, don&rsquo;t go cheesy on your wallet or else people will think that you have a funny and particular style.</p>\n\n<p style=\"text-align:center\"><img alt=\"f5\" src=\"/storage/news/2.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n<hr />\n<h4><strong>Number 2: Choose The Right Size For Your Wallet</strong></h4>\n\n<p>You should avoid having an over-sized wallet. Don&rsquo;t think that you need to buy a big wallet because you have a lot to carry with you. In addition, a fat wallet is very ugly. It will make it harder for you to slide the wallet into your trousers&rsquo; pocket. In addition, it will create a bulge and ruin your look.</p>\n\n<p>Before you go on to buy a new wallet, clean out your wallet and place all of the items from your wallet on a table. Throw away things that you would never need any more such as the old bills or the expired gift cards. Remember to check your wallet on a frequent basis to get rid of all of the old stuff that you don&rsquo;t need anymore.</p>\n\n<p style=\"text-align:center\"><img alt=\"f1\" src=\"/storage/news/3.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 3: Don&rsquo;t Limit Your Options Of Materials</strong></h4>\n\n<p>The types and designs of wallets are not the only things that you should consider when you go out searching for your best wallet. You have more than 1 option of material rather than leather to choose from as well.</p>\n\n<p>You can experiment with other available options such as cotton, polyester and canvas. They all have their own pros and cons. As a result, they will be suitable for different needs and requirements. You should think about them all in order to choose the material which you would like the most.</p>\n\n<p style=\"text-align:center\"><img alt=\"f6\" height=\"375\" src=\"/storage/news/4.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 4: Consider A Wallet As A Long Term Investment</strong></h4>\n\n<p>Your wallet is indeed an investment that you should consider spending a decent amount of time and effort on it. Another factor that you need to consider is how much you want to spend on your wallet. The price ranges of wallets on the market vary a great deal. You can find a wallet which is as cheap as about 5 to 7 dollars. On the other hand, you should expect to pay around 250 to 300 dollars for a high-quality wallet.</p>\n\n<p>In case you need a wallet to use for a long time, it is a good idea that you should invest a decent amount of money on a wallet. A high quality wallet from a reputational brand with the premium quality such as cowhide leather will last for a long time. In addition, it is an accessory to show off your fashion sense and your social status.</p>\n\n<p style=\"text-align:center\"><img alt=\"f2\" height=\"400\" src=\"/storage/news/5.jpg\" /></p>\n\n<p>&nbsp;</p>\n','published',1,'Botble\\ACL\\Models\\User',1,'news/8.jpg',1549,NULL,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(9,'Why Teamwork Really Makes The Dream Work','You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.','<p>I have seen many people underestimating the power of their wallets. To them, they are just a functional item they use to carry. As a result, they often end up with the wallets which are not really suitable for them.</p>\n\n<p>You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.</p>\n\n<p style=\"text-align:center\"><img alt=\"f4\" src=\"/storage/news/1.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n\n\n<p><strong><em>For all of the reason above, here are 7 expert tips to help you pick up the right men&rsquo;s wallet for you:</em></strong></p>\n\n<h4><strong>Number 1: Choose A Neat Wallet</strong></h4>\n\n<p>The wallet is an essential accessory that you should go simple. Simplicity is the best in this case. A simple and neat wallet with the plain color and even&nbsp;<strong>minimalist style</strong>&nbsp;is versatile. It can be used for both formal and casual events. In addition, that wallet will go well with most of the clothes in your wardrobe.</p>\n\n<p>Keep in mind that a wallet will tell other people about your personality and your fashion sense as much as other clothes you put on. Hence, don&rsquo;t go cheesy on your wallet or else people will think that you have a funny and particular style.</p>\n\n<p style=\"text-align:center\"><img alt=\"f5\" src=\"/storage/news/2.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n<hr />\n<h4><strong>Number 2: Choose The Right Size For Your Wallet</strong></h4>\n\n<p>You should avoid having an over-sized wallet. Don&rsquo;t think that you need to buy a big wallet because you have a lot to carry with you. In addition, a fat wallet is very ugly. It will make it harder for you to slide the wallet into your trousers&rsquo; pocket. In addition, it will create a bulge and ruin your look.</p>\n\n<p>Before you go on to buy a new wallet, clean out your wallet and place all of the items from your wallet on a table. Throw away things that you would never need any more such as the old bills or the expired gift cards. Remember to check your wallet on a frequent basis to get rid of all of the old stuff that you don&rsquo;t need anymore.</p>\n\n<p style=\"text-align:center\"><img alt=\"f1\" src=\"/storage/news/3.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 3: Don&rsquo;t Limit Your Options Of Materials</strong></h4>\n\n<p>The types and designs of wallets are not the only things that you should consider when you go out searching for your best wallet. You have more than 1 option of material rather than leather to choose from as well.</p>\n\n<p>You can experiment with other available options such as cotton, polyester and canvas. They all have their own pros and cons. As a result, they will be suitable for different needs and requirements. You should think about them all in order to choose the material which you would like the most.</p>\n\n<p style=\"text-align:center\"><img alt=\"f6\" height=\"375\" src=\"/storage/news/4.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 4: Consider A Wallet As A Long Term Investment</strong></h4>\n\n<p>Your wallet is indeed an investment that you should consider spending a decent amount of time and effort on it. Another factor that you need to consider is how much you want to spend on your wallet. The price ranges of wallets on the market vary a great deal. You can find a wallet which is as cheap as about 5 to 7 dollars. On the other hand, you should expect to pay around 250 to 300 dollars for a high-quality wallet.</p>\n\n<p>In case you need a wallet to use for a long time, it is a good idea that you should invest a decent amount of money on a wallet. A high quality wallet from a reputational brand with the premium quality such as cowhide leather will last for a long time. In addition, it is an accessory to show off your fashion sense and your social status.</p>\n\n<p style=\"text-align:center\"><img alt=\"f2\" height=\"400\" src=\"/storage/news/5.jpg\" /></p>\n\n<p>&nbsp;</p>\n','published',1,'Botble\\ACL\\Models\\User',1,'news/9.jpg',1146,NULL,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(10,'The World Caters to Average People','You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.','<p>I have seen many people underestimating the power of their wallets. To them, they are just a functional item they use to carry. As a result, they often end up with the wallets which are not really suitable for them.</p>\n\n<p>You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.</p>\n\n<p style=\"text-align:center\"><img alt=\"f4\" src=\"/storage/news/1.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n\n\n<p><strong><em>For all of the reason above, here are 7 expert tips to help you pick up the right men&rsquo;s wallet for you:</em></strong></p>\n\n<h4><strong>Number 1: Choose A Neat Wallet</strong></h4>\n\n<p>The wallet is an essential accessory that you should go simple. Simplicity is the best in this case. A simple and neat wallet with the plain color and even&nbsp;<strong>minimalist style</strong>&nbsp;is versatile. It can be used for both formal and casual events. In addition, that wallet will go well with most of the clothes in your wardrobe.</p>\n\n<p>Keep in mind that a wallet will tell other people about your personality and your fashion sense as much as other clothes you put on. Hence, don&rsquo;t go cheesy on your wallet or else people will think that you have a funny and particular style.</p>\n\n<p style=\"text-align:center\"><img alt=\"f5\" src=\"/storage/news/2.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n<hr />\n<h4><strong>Number 2: Choose The Right Size For Your Wallet</strong></h4>\n\n<p>You should avoid having an over-sized wallet. Don&rsquo;t think that you need to buy a big wallet because you have a lot to carry with you. In addition, a fat wallet is very ugly. It will make it harder for you to slide the wallet into your trousers&rsquo; pocket. In addition, it will create a bulge and ruin your look.</p>\n\n<p>Before you go on to buy a new wallet, clean out your wallet and place all of the items from your wallet on a table. Throw away things that you would never need any more such as the old bills or the expired gift cards. Remember to check your wallet on a frequent basis to get rid of all of the old stuff that you don&rsquo;t need anymore.</p>\n\n<p style=\"text-align:center\"><img alt=\"f1\" src=\"/storage/news/3.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 3: Don&rsquo;t Limit Your Options Of Materials</strong></h4>\n\n<p>The types and designs of wallets are not the only things that you should consider when you go out searching for your best wallet. You have more than 1 option of material rather than leather to choose from as well.</p>\n\n<p>You can experiment with other available options such as cotton, polyester and canvas. They all have their own pros and cons. As a result, they will be suitable for different needs and requirements. You should think about them all in order to choose the material which you would like the most.</p>\n\n<p style=\"text-align:center\"><img alt=\"f6\" height=\"375\" src=\"/storage/news/4.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 4: Consider A Wallet As A Long Term Investment</strong></h4>\n\n<p>Your wallet is indeed an investment that you should consider spending a decent amount of time and effort on it. Another factor that you need to consider is how much you want to spend on your wallet. The price ranges of wallets on the market vary a great deal. You can find a wallet which is as cheap as about 5 to 7 dollars. On the other hand, you should expect to pay around 250 to 300 dollars for a high-quality wallet.</p>\n\n<p>In case you need a wallet to use for a long time, it is a good idea that you should invest a decent amount of money on a wallet. A high quality wallet from a reputational brand with the premium quality such as cowhide leather will last for a long time. In addition, it is an accessory to show off your fashion sense and your social status.</p>\n\n<p style=\"text-align:center\"><img alt=\"f2\" height=\"400\" src=\"/storage/news/5.jpg\" /></p>\n\n<p>&nbsp;</p>\n','published',1,'Botble\\ACL\\Models\\User',1,'news/10.jpg',481,NULL,'2025-09-11 01:45:46','2025-09-11 01:45:46'),(11,'The litigants on the screen are not actors','You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.','<p>I have seen many people underestimating the power of their wallets. To them, they are just a functional item they use to carry. As a result, they often end up with the wallets which are not really suitable for them.</p>\n\n<p>You should pay more attention when you choose your wallets. There are a lot of them on the market with the different designs and styles. When you choose carefully, you would be able to buy a wallet that is catered to your needs. Not to mention that it will help to enhance your style significantly.</p>\n\n<p style=\"text-align:center\"><img alt=\"f4\" src=\"/storage/news/1.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n\n\n<p><strong><em>For all of the reason above, here are 7 expert tips to help you pick up the right men&rsquo;s wallet for you:</em></strong></p>\n\n<h4><strong>Number 1: Choose A Neat Wallet</strong></h4>\n\n<p>The wallet is an essential accessory that you should go simple. Simplicity is the best in this case. A simple and neat wallet with the plain color and even&nbsp;<strong>minimalist style</strong>&nbsp;is versatile. It can be used for both formal and casual events. In addition, that wallet will go well with most of the clothes in your wardrobe.</p>\n\n<p>Keep in mind that a wallet will tell other people about your personality and your fashion sense as much as other clothes you put on. Hence, don&rsquo;t go cheesy on your wallet or else people will think that you have a funny and particular style.</p>\n\n<p style=\"text-align:center\"><img alt=\"f5\" src=\"/storage/news/2.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n<hr />\n<h4><strong>Number 2: Choose The Right Size For Your Wallet</strong></h4>\n\n<p>You should avoid having an over-sized wallet. Don&rsquo;t think that you need to buy a big wallet because you have a lot to carry with you. In addition, a fat wallet is very ugly. It will make it harder for you to slide the wallet into your trousers&rsquo; pocket. In addition, it will create a bulge and ruin your look.</p>\n\n<p>Before you go on to buy a new wallet, clean out your wallet and place all of the items from your wallet on a table. Throw away things that you would never need any more such as the old bills or the expired gift cards. Remember to check your wallet on a frequent basis to get rid of all of the old stuff that you don&rsquo;t need anymore.</p>\n\n<p style=\"text-align:center\"><img alt=\"f1\" src=\"/storage/news/3.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 3: Don&rsquo;t Limit Your Options Of Materials</strong></h4>\n\n<p>The types and designs of wallets are not the only things that you should consider when you go out searching for your best wallet. You have more than 1 option of material rather than leather to choose from as well.</p>\n\n<p>You can experiment with other available options such as cotton, polyester and canvas. They all have their own pros and cons. As a result, they will be suitable for different needs and requirements. You should think about them all in order to choose the material which you would like the most.</p>\n\n<p style=\"text-align:center\"><img alt=\"f6\" height=\"375\" src=\"/storage/news/4.jpg\" /></p>\n\n<p><br />\n&nbsp;</p>\n\n<hr />\n<h4><strong>Number 4: Consider A Wallet As A Long Term Investment</strong></h4>\n\n<p>Your wallet is indeed an investment that you should consider spending a decent amount of time and effort on it. Another factor that you need to consider is how much you want to spend on your wallet. The price ranges of wallets on the market vary a great deal. You can find a wallet which is as cheap as about 5 to 7 dollars. On the other hand, you should expect to pay around 250 to 300 dollars for a high-quality wallet.</p>\n\n<p>In case you need a wallet to use for a long time, it is a good idea that you should invest a decent amount of money on a wallet. A high quality wallet from a reputational brand with the premium quality such as cowhide leather will last for a long time. In addition, it is an accessory to show off your fashion sense and your social status.</p>\n\n<p style=\"text-align:center\"><img alt=\"f2\" height=\"400\" src=\"/storage/news/5.jpg\" /></p>\n\n<p>&nbsp;</p>\n','published',1,'Botble\\ACL\\Models\\User',0,'news/11.jpg',553,NULL,'2025-09-11 01:45:46','2025-09-11 01:45:46');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts_translations`
--

DROP TABLE IF EXISTS `posts_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `posts_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`lang_code`,`posts_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts_translations`
--

LOCK TABLES `posts_translations` WRITE;
/*!40000 ALTER TABLE `posts_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `push_notification_recipients`
--

DROP TABLE IF EXISTS `push_notification_recipients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `push_notification_recipients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `push_notification_id` bigint unsigned NOT NULL,
  `user_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `device_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `platform` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sent',
  `sent_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `clicked_at` timestamp NULL DEFAULT NULL,
  `fcm_response` json DEFAULT NULL,
  `error_message` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pnr_notification_user_index` (`push_notification_id`,`user_type`,`user_id`),
  KEY `pnr_user_status_index` (`user_type`,`user_id`,`status`),
  KEY `pnr_user_read_index` (`user_type`,`user_id`,`read_at`),
  KEY `pnr_status_index` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `push_notification_recipients`
--

LOCK TABLES `push_notification_recipients` WRITE;
/*!40000 ALTER TABLE `push_notification_recipients` DISABLE KEYS */;
/*!40000 ALTER TABLE `push_notification_recipients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `push_notifications`
--

DROP TABLE IF EXISTS `push_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `push_notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `target_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `target_value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` json DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sent',
  `sent_count` int NOT NULL DEFAULT '0',
  `failed_count` int NOT NULL DEFAULT '0',
  `delivered_count` int NOT NULL DEFAULT '0',
  `read_count` int NOT NULL DEFAULT '0',
  `scheduled_at` timestamp NULL DEFAULT NULL,
  `sent_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `push_notifications_type_created_at_index` (`type`,`created_at`),
  KEY `push_notifications_status_scheduled_at_index` (`status`,`scheduled_at`),
  KEY `push_notifications_created_by_index` (`created_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `push_notifications`
--

LOCK TABLES `push_notifications` WRITE;
/*!40000 ALTER TABLE `push_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `push_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revisions`
--

DROP TABLE IF EXISTS `revisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revisions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `revisionable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revisionable_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `key` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `old_value` text COLLATE utf8mb4_unicode_ci,
  `new_value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `revisions_revisionable_id_revisionable_type_index` (`revisionable_id`,`revisionable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revisions`
--

LOCK TABLES `revisions` WRITE;
/*!40000 ALTER TABLE `revisions` DISABLE KEYS */;
/*!40000 ALTER TABLE `revisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_users`
--

DROP TABLE IF EXISTS `role_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_users` (
  `user_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_users_user_id_index` (`user_id`),
  KEY `role_users_role_id_index` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_users`
--

LOCK TABLES `role_users` WRITE;
/*!40000 ALTER TABLE `role_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8mb4_unicode_ci,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint unsigned NOT NULL DEFAULT '0',
  `created_by` bigint unsigned NOT NULL,
  `updated_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_slug_unique` (`slug`),
  KEY `roles_created_by_index` (`created_by`),
  KEY `roles_updated_by_index` (`updated_by`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','Admin','{\"users.index\":true,\"users.create\":true,\"users.edit\":true,\"users.destroy\":true,\"roles.index\":true,\"roles.create\":true,\"roles.edit\":true,\"roles.destroy\":true,\"core.system\":true,\"core.cms\":true,\"core.manage.license\":true,\"systems.cronjob\":true,\"core.tools\":true,\"tools.data-synchronize\":true,\"media.index\":true,\"files.index\":true,\"files.create\":true,\"files.edit\":true,\"files.trash\":true,\"files.destroy\":true,\"folders.index\":true,\"folders.create\":true,\"folders.edit\":true,\"folders.trash\":true,\"folders.destroy\":true,\"settings.index\":true,\"settings.common\":true,\"settings.options\":true,\"settings.email\":true,\"settings.media\":true,\"settings.admin-appearance\":true,\"settings.cache\":true,\"settings.datatables\":true,\"settings.email.rules\":true,\"settings.others\":true,\"menus.index\":true,\"menus.create\":true,\"menus.edit\":true,\"menus.destroy\":true,\"optimize.settings\":true,\"pages.index\":true,\"pages.create\":true,\"pages.edit\":true,\"pages.destroy\":true,\"plugins.index\":true,\"plugins.edit\":true,\"plugins.remove\":true,\"plugins.marketplace\":true,\"sitemap.settings\":true,\"core.appearance\":true,\"theme.index\":true,\"theme.activate\":true,\"theme.remove\":true,\"theme.options\":true,\"theme.custom-css\":true,\"theme.custom-js\":true,\"theme.custom-html\":true,\"theme.robots-txt\":true,\"settings.website-tracking\":true,\"widgets.index\":true,\"ads.index\":true,\"ads.create\":true,\"ads.edit\":true,\"ads.destroy\":true,\"ads.settings\":true,\"analytics.general\":true,\"analytics.page\":true,\"analytics.browser\":true,\"analytics.referrer\":true,\"analytics.settings\":true,\"audit-log.index\":true,\"audit-log.destroy\":true,\"backups.index\":true,\"backups.create\":true,\"backups.restore\":true,\"backups.destroy\":true,\"plugins.blog\":true,\"posts.index\":true,\"posts.create\":true,\"posts.edit\":true,\"posts.destroy\":true,\"categories.index\":true,\"categories.create\":true,\"categories.edit\":true,\"categories.destroy\":true,\"tags.index\":true,\"tags.create\":true,\"tags.edit\":true,\"tags.destroy\":true,\"blog.settings\":true,\"posts.export\":true,\"posts.import\":true,\"captcha.settings\":true,\"contacts.index\":true,\"contacts.edit\":true,\"contacts.destroy\":true,\"contact.custom-fields\":true,\"contact.settings\":true,\"plugins.ecommerce\":true,\"ecommerce.report.index\":true,\"products.index\":true,\"products.create\":true,\"products.edit\":true,\"products.destroy\":true,\"products.duplicate\":true,\"ecommerce.product-prices.index\":true,\"ecommerce.product-prices.edit\":true,\"ecommerce.product-inventory.index\":true,\"ecommerce.product-inventory.edit\":true,\"product-categories.index\":true,\"product-categories.create\":true,\"product-categories.edit\":true,\"product-categories.destroy\":true,\"product-tag.index\":true,\"product-tag.create\":true,\"product-tag.edit\":true,\"product-tag.destroy\":true,\"brands.index\":true,\"brands.create\":true,\"brands.edit\":true,\"brands.destroy\":true,\"product-collections.index\":true,\"product-collections.create\":true,\"product-collections.edit\":true,\"product-collections.destroy\":true,\"product-attribute-sets.index\":true,\"product-attribute-sets.create\":true,\"product-attribute-sets.edit\":true,\"product-attribute-sets.destroy\":true,\"product-attributes.index\":true,\"product-attributes.create\":true,\"product-attributes.edit\":true,\"product-attributes.destroy\":true,\"tax.index\":true,\"tax.create\":true,\"tax.edit\":true,\"tax.destroy\":true,\"reviews.index\":true,\"reviews.create\":true,\"reviews.destroy\":true,\"reviews.publish\":true,\"reviews.reply\":true,\"ecommerce.shipments.index\":true,\"ecommerce.shipments.create\":true,\"ecommerce.shipments.edit\":true,\"ecommerce.shipments.destroy\":true,\"orders.index\":true,\"orders.create\":true,\"orders.edit\":true,\"orders.destroy\":true,\"discounts.index\":true,\"discounts.create\":true,\"discounts.edit\":true,\"discounts.destroy\":true,\"customers.index\":true,\"customers.create\":true,\"customers.edit\":true,\"customers.destroy\":true,\"ecommerce.customers.import\":true,\"ecommerce.customers.export\":true,\"flash-sale.index\":true,\"flash-sale.create\":true,\"flash-sale.edit\":true,\"flash-sale.destroy\":true,\"product-label.index\":true,\"product-label.create\":true,\"product-label.edit\":true,\"product-label.destroy\":true,\"ecommerce.import.products.index\":true,\"ecommerce.export.products.index\":true,\"order_returns.index\":true,\"order_returns.edit\":true,\"order_returns.destroy\":true,\"global-option.index\":true,\"global-option.create\":true,\"global-option.edit\":true,\"global-option.destroy\":true,\"ecommerce.invoice.index\":true,\"ecommerce.invoice.edit\":true,\"ecommerce.invoice.destroy\":true,\"ecommerce.settings\":true,\"ecommerce.settings.general\":true,\"ecommerce.invoice-template.index\":true,\"ecommerce.settings.currencies\":true,\"ecommerce.settings.products\":true,\"ecommerce.settings.product-search\":true,\"ecommerce.settings.digital-products\":true,\"ecommerce.settings.store-locators\":true,\"ecommerce.settings.invoices\":true,\"ecommerce.settings.product-reviews\":true,\"ecommerce.settings.customers\":true,\"ecommerce.settings.shopping\":true,\"ecommerce.settings.taxes\":true,\"ecommerce.settings.shipping\":true,\"ecommerce.shipping-rule-items.index\":true,\"ecommerce.shipping-rule-items.create\":true,\"ecommerce.shipping-rule-items.edit\":true,\"ecommerce.shipping-rule-items.destroy\":true,\"ecommerce.shipping-rule-items.bulk-import\":true,\"ecommerce.settings.tracking\":true,\"ecommerce.settings.standard-and-format\":true,\"ecommerce.settings.checkout\":true,\"ecommerce.settings.return\":true,\"ecommerce.settings.flash-sale\":true,\"ecommerce.settings.product-specification\":true,\"product-categories.export\":true,\"product-categories.import\":true,\"orders.export\":true,\"ecommerce.product-specification.index\":true,\"ecommerce.specification-groups.index\":true,\"ecommerce.specification-groups.create\":true,\"ecommerce.specification-groups.edit\":true,\"ecommerce.specification-groups.destroy\":true,\"ecommerce.specification-attributes.index\":true,\"ecommerce.specification-attributes.create\":true,\"ecommerce.specification-attributes.edit\":true,\"ecommerce.specification-attributes.destroy\":true,\"ecommerce.specification-tables.index\":true,\"ecommerce.specification-tables.create\":true,\"ecommerce.specification-tables.edit\":true,\"ecommerce.specification-tables.destroy\":true,\"plugin.faq\":true,\"faq.index\":true,\"faq.create\":true,\"faq.edit\":true,\"faq.destroy\":true,\"faq_category.index\":true,\"faq_category.create\":true,\"faq_category.edit\":true,\"faq_category.destroy\":true,\"faqs.settings\":true,\"languages.index\":true,\"languages.create\":true,\"languages.edit\":true,\"languages.destroy\":true,\"translations.import\":true,\"translations.export\":true,\"property-translations.import\":true,\"property-translations.export\":true,\"plugin.location\":true,\"country.index\":true,\"country.create\":true,\"country.edit\":true,\"country.destroy\":true,\"state.index\":true,\"state.create\":true,\"state.edit\":true,\"state.destroy\":true,\"city.index\":true,\"city.create\":true,\"city.edit\":true,\"city.destroy\":true,\"newsletter.index\":true,\"newsletter.destroy\":true,\"newsletter.settings\":true,\"payment.index\":true,\"payments.settings\":true,\"payment.destroy\":true,\"payments.logs\":true,\"payments.logs.show\":true,\"payments.logs.destroy\":true,\"simple-slider.index\":true,\"simple-slider.create\":true,\"simple-slider.edit\":true,\"simple-slider.destroy\":true,\"simple-slider-item.index\":true,\"simple-slider-item.create\":true,\"simple-slider-item.edit\":true,\"simple-slider-item.destroy\":true,\"simple-slider.settings\":true,\"social-login.settings\":true,\"plugins.translation\":true,\"translations.locales\":true,\"translations.theme-translations\":true,\"translations.index\":true,\"theme-translations.export\":true,\"other-translations.export\":true,\"theme-translations.import\":true,\"other-translations.import\":true,\"api.settings\":true,\"api.sanctum-token.index\":true,\"api.sanctum-token.create\":true,\"api.sanctum-token.destroy\":true}','Admin users role',1,1,1,'2025-09-11 01:45:47','2025-09-11 01:45:47');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'media_random_hash','3653bf083194cdf545c8765f85d895ef',NULL,'2025-09-11 01:45:50'),(2,'api_enabled','0',NULL,'2025-09-11 01:45:50'),(3,'activated_plugins','[\"language\",\"language-advanced\",\"ads\",\"analytics\",\"audit-log\",\"backup\",\"blog\",\"captcha\",\"contact\",\"cookie-consent\",\"ecommerce\",\"faq\",\"location\",\"mollie\",\"newsletter\",\"payment\",\"paypal\",\"paystack\",\"razorpay\",\"shippo\",\"simple-slider\",\"social-login\",\"sslcommerz\",\"stripe\",\"translation\"]',NULL,'2025-09-11 01:45:50'),(4,'analytics_dashboard_widgets','0','2025-09-11 01:44:59','2025-09-11 01:44:59'),(5,'enable_recaptcha_botble_contact_forms_fronts_contact_form','1','2025-09-11 01:45:00','2025-09-11 01:45:00'),(6,'api_layer_api_key','',NULL,'2025-09-11 01:45:50'),(9,'enable_recaptcha_botble_newsletter_forms_fronts_newsletter_form','1','2025-09-11 01:45:07','2025-09-11 01:45:07'),(10,'payment_cod_fee_type','fixed',NULL,'2025-09-11 01:45:50'),(11,'payment_bank_transfer_fee_type','fixed',NULL,'2025-09-11 01:45:50'),(13,'show_admin_bar','1',NULL,'2025-09-11 01:45:50'),(14,'language_hide_default','1',NULL,'2025-09-11 01:45:50'),(16,'language_display','all',NULL,'2025-09-11 01:45:50'),(17,'language_hide_languages','[]',NULL,'2025-09-11 01:45:50'),(18,'ecommerce_store_name','Wowy',NULL,NULL),(19,'ecommerce_store_phone','18006268',NULL,NULL),(20,'ecommerce_store_address','North Link Building, 10 Admiralty Street',NULL,NULL),(21,'ecommerce_store_state','Singapore',NULL,NULL),(22,'ecommerce_store_city','Singapore',NULL,NULL),(23,'ecommerce_store_country','SG',NULL,NULL),(24,'language_switcher_display','dropdown',NULL,'2025-09-11 01:45:50'),(27,'payment_cod_status','1',NULL,'2025-09-11 01:45:50'),(28,'payment_bank_transfer_status','1',NULL,'2025-09-11 01:45:50'),(29,'payment_cod_description','Please pay money directly to the postman, if you choose cash on delivery method (COD).',NULL,'2025-09-11 01:45:50'),(30,'payment_bank_transfer_description','Please send money to our bank account: ACB - 69270 213 19.',NULL,'2025-09-11 01:45:50'),(31,'payment_stripe_payment_type','stripe_checkout',NULL,'2025-09-11 01:45:50'),(32,'plugins_ecommerce_customer_new_order_status','0',NULL,'2025-09-11 01:45:50'),(33,'plugins_ecommerce_admin_new_order_status','0',NULL,'2025-09-11 01:45:50'),(34,'ecommerce_is_enabled_support_digital_products','1',NULL,'2025-09-11 01:45:50'),(35,'ecommerce_enable_license_codes_for_digital_products','1',NULL,'2025-09-11 01:45:50'),(36,'ecommerce_auto_complete_digital_orders_after_payment','1',NULL,'2025-09-11 01:45:50'),(37,'ecommerce_load_countries_states_cities_from_location_plugin','0',NULL,'2025-09-11 01:45:50'),(38,'ecommerce_product_sku_format','SF-2443-%s%s%s%s',NULL,'2025-09-11 01:45:50'),(39,'ecommerce_store_order_prefix','SF',NULL,'2025-09-11 01:45:50'),(40,'ecommerce_enable_product_specification','1',NULL,'2025-09-11 01:45:50'),(41,'payment_bank_transfer_display_bank_info_at_the_checkout_success_page','1',NULL,'2025-09-11 01:45:50'),(42,'payment_cod_logo','payments/cod.png',NULL,'2025-09-11 01:45:50'),(43,'payment_bank_transfer_logo','payments/bank-transfer.png',NULL,'2025-09-11 01:45:50'),(44,'payment_stripe_logo','payments/stripe.webp',NULL,'2025-09-11 01:45:50'),(45,'payment_paypal_logo','payments/paypal.png',NULL,'2025-09-11 01:45:50'),(46,'payment_mollie_logo','payments/mollie.png',NULL,'2025-09-11 01:45:50'),(47,'payment_paystack_logo','payments/paystack.png',NULL,'2025-09-11 01:45:50'),(48,'payment_razorpay_logo','payments/razorpay.png',NULL,'2025-09-11 01:45:50'),(49,'payment_sslcommerz_logo','payments/sslcommerz.png',NULL,'2025-09-11 01:45:50'),(50,'permalink-botble-blog-models-post','blog',NULL,'2025-09-11 01:45:50'),(51,'permalink-botble-blog-models-category','blog',NULL,'2025-09-11 01:45:50'),(52,'theme','wowy',NULL,NULL),(53,'admin_favicon','general/favicon.png',NULL,NULL),(54,'admin_logo','general/logo-light.png',NULL,NULL),(55,'theme-wowy-site_title','Wowy - Laravel Multipurpose eCommerce Script',NULL,NULL),(56,'theme-wowy-copyright','Copyright © 2025 Wowy all rights reserved. Powered by Botble.',NULL,NULL),(57,'theme-wowy-favicon','general/favicon.png',NULL,NULL),(58,'theme-wowy-logo','general/logo.png',NULL,NULL),(59,'theme-wowy-logo_light','general/logo-light.png',NULL,NULL),(60,'theme-wowy-seo_og_image','general/open-graph-image.png',NULL,NULL),(61,'theme-wowy-seo_description','Wowy is an outstanding eCommerce Laravel script. It will be the perfect solution for your current or future web shop.',NULL,NULL),(62,'theme-wowy-address','562 Wellington Road, Street 32, San Francisco',NULL,NULL),(63,'theme-wowy-hotline','1900 - 888',NULL,NULL),(64,'theme-wowy-phone','+01 2222 365 /(+91) 01 2345 6789',NULL,NULL),(65,'theme-wowy-contact_email','sale@wowy.com',NULL,NULL),(66,'theme-wowy-working_hours','10:00 - 18:00, Mon - Sat',NULL,NULL),(67,'theme-wowy-homepage_id','1',NULL,NULL),(68,'theme-wowy-blog_page_id','5',NULL,NULL),(69,'theme-wowy-cookie_consent_message','Your experience on this site will be improved by allowing cookies ',NULL,NULL),(70,'theme-wowy-cookie_consent_learn_more_url','http://wowy.test/cookie-policy',NULL,NULL),(71,'theme-wowy-cookie_consent_learn_more_text','Cookie Policy',NULL,NULL),(72,'theme-wowy-number_of_cross_sale_product','4',NULL,NULL),(73,'theme-wowy-preloader_enabled','yes',NULL,NULL),(74,'theme-wowy-preloader_version','v2',NULL,NULL),(75,'theme-wowy-social_links','[[{\"key\":\"social-name\",\"value\":\"Facebook\"},{\"key\":\"social-icon\",\"value\":\"fab fa-facebook-f\"},{\"key\":\"social-url\",\"value\":\"https:\\/\\/www.facebook.com\\/\"},{\"key\":\"social-color\",\"value\":\"#3b5999\"}],[{\"key\":\"social-name\",\"value\":\"Twitter\"},{\"key\":\"social-icon\",\"value\":\"fab fa-twitter\"},{\"key\":\"social-url\",\"value\":\"https:\\/\\/www.twitter.com\\/\"},{\"key\":\"social-color\",\"value\":\"#55ACF9\"}],[{\"key\":\"social-name\",\"value\":\"Instagram\"},{\"key\":\"social-icon\",\"value\":\"fab fa-instagram\"},{\"key\":\"social-url\",\"value\":\"https:\\/\\/www.instagram.com\\/\"},{\"key\":\"social-color\",\"value\":\"#E1306C\"}],[{\"key\":\"social-name\",\"value\":\"Linkedin\"},{\"key\":\"social-icon\",\"value\":\"fab fa-linkedin\"},{\"key\":\"social-url\",\"value\":\"https:\\/\\/www.linkedin.com\\/\"},{\"key\":\"social-color\",\"value\":\"#007bb6\"}],[{\"key\":\"social-name\",\"value\":\"Pinterest\"},{\"key\":\"social-icon\",\"value\":\"fab fa-pinterest\"},{\"key\":\"social-url\",\"value\":\"https:\\/\\/www.pinterest.com\\/\"},{\"key\":\"social-color\",\"value\":\"#cb2027\"}]]',NULL,NULL),(76,'theme-wowy-header_messages','[[{\"key\":\"icon\",\"value\":\"fa fa-bell\"},{\"key\":\"message\",\"value\":\"<b class=\\\"text-success\\\"> Trendy 25<\\/b> silver jewelry, save up 35% off today\"},{\"key\":\"link\",\"value\":\"\\/products\"},{\"key\":\"link_text\",\"value\":\"Shop now\"}],[{\"key\":\"icon\",\"value\":\"fa fa-asterisk\"},{\"key\":\"message\",\"value\":\"<b class=\\\"text-danger\\\">Supper Value Deals<\\/b> - Save more with coupons\"},{\"key\":\"link\",\"value\":null},{\"key\":\"link_text\",\"value\":null}],[{\"key\":\"icon\",\"value\":\"fa fa-angle-double-right\"},{\"key\":\"message\",\"value\":\"Get great devices up to 50% off\"},{\"key\":\"link\",\"value\":\"\\/products\"},{\"key\":\"link_text\",\"value\":\"View details\"}]]',NULL,NULL),(77,'theme-wowy-contact_info_boxes','[[{\"key\":\"name\",\"value\":\"Head Office\"},{\"key\":\"address\",\"value\":\"205 North Michigan Avenue, Suite 810, Chicago, 60601, USA\"},{\"key\":\"phone\",\"value\":\"(+01) 234 567\"},{\"key\":\"email\",\"value\":\"office@botble.com\"}],[{\"key\":\"name\",\"value\":\"Our Studio\"},{\"key\":\"address\",\"value\":\"205 North Michigan Avenue, Suite 810, Chicago, 60601, USA\"},{\"key\":\"phone\",\"value\":\"(+01) 234 567\"},{\"key\":\"email\",\"value\":\"studio@botble.com\"}],[{\"key\":\"name\",\"value\":\"Our Shop\"},{\"key\":\"address\",\"value\":\"205 North Michigan Avenue, Suite 810, Chicago, 60601, USA\"},{\"key\":\"phone\",\"value\":\"(+01) 234 567\"},{\"key\":\"email\",\"value\":\"shop@botble.com\"}]]',NULL,NULL);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `simple_slider_items`
--

DROP TABLE IF EXISTS `simple_slider_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `simple_slider_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `simple_slider_id` bigint unsigned NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `order` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `simple_slider_items`
--

LOCK TABLES `simple_slider_items` WRITE;
/*!40000 ALTER TABLE `simple_slider_items` DISABLE KEYS */;
INSERT INTO `simple_slider_items` VALUES (1,1,'Super Value Deals','sliders/1-1.png','/products','Save more with coupons &amp; up to 70% off',1,'2025-09-11 01:45:43','2025-09-11 01:45:43'),(2,1,'Tech Trending','sliders/1-2.png','/products','Save more with coupons &amp; up to 20% off',2,'2025-09-11 01:45:43','2025-09-11 01:45:43'),(3,1,'Big Deals From','sliders/1-3.png','/products','Headphone, Gaming Laptop, PC and more...',3,'2025-09-11 01:45:43','2025-09-11 01:45:43'),(4,2,'Super Value Deals','sliders/2-1.png','/products','Save more with coupons &amp; up to 70% off',1,'2025-09-11 01:45:43','2025-09-11 01:45:43'),(5,2,'Tech Trending','sliders/2-2.png','/products','Save more with coupons &amp; up to 20% off',2,'2025-09-11 01:45:43','2025-09-11 01:45:43'),(6,2,'Big Deals From','sliders/2-3.png','/products','Headphone, Gaming Laptop, PC and more...',3,'2025-09-11 01:45:43','2025-09-11 01:45:43'),(7,3,'Super Value Deals','sliders/3-1.png','/products','Save more with coupons &amp; up to 70% off',1,'2025-09-11 01:45:43','2025-09-11 01:45:43'),(8,3,'Tech Trending','sliders/3-2.png','/products','Save more with coupons &amp; up to 20% off',2,'2025-09-11 01:45:43','2025-09-11 01:45:43'),(9,4,'Super Value Deals','sliders/4-1.png','/products','Save more with coupons &amp; up to 70% off',1,'2025-09-11 01:45:43','2025-09-11 01:45:43'),(10,4,'Tech Trending','sliders/4-2.png','/products','Save more with coupons &amp; up to 20% off',2,'2025-09-11 01:45:43','2025-09-11 01:45:43'),(11,4,'Big Deals From','sliders/4-3.png','/products','Headphone, Gaming Laptop, PC and more...',3,'2025-09-11 01:45:44','2025-09-11 01:45:44');
/*!40000 ALTER TABLE `simple_slider_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `simple_sliders`
--

DROP TABLE IF EXISTS `simple_sliders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `simple_sliders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `simple_sliders`
--

LOCK TABLES `simple_sliders` WRITE;
/*!40000 ALTER TABLE `simple_sliders` DISABLE KEYS */;
INSERT INTO `simple_sliders` VALUES (1,'Home slider 1','home-slider-1',NULL,'published','2025-09-11 01:45:43','2025-09-11 01:45:43'),(2,'Home slider 2','home-slider-2',NULL,'published','2025-09-11 01:45:43','2025-09-11 01:45:43'),(3,'Home slider 3','home-slider-3',NULL,'published','2025-09-11 01:45:43','2025-09-11 01:45:43'),(4,'Home slider 4','home-slider-4',NULL,'published','2025-09-11 01:45:43','2025-09-11 01:45:43');
/*!40000 ALTER TABLE `simple_sliders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slugs`
--

DROP TABLE IF EXISTS `slugs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slugs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference_id` bigint unsigned NOT NULL,
  `reference_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prefix` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `slugs_reference_id_index` (`reference_id`),
  KEY `slugs_key_index` (`key`),
  KEY `slugs_prefix_index` (`prefix`),
  KEY `slugs_reference_index` (`reference_id`,`reference_type`),
  KEY `idx_slugs_reference` (`reference_type`,`reference_id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slugs`
--

LOCK TABLES `slugs` WRITE;
/*!40000 ALTER TABLE `slugs` DISABLE KEYS */;
INSERT INTO `slugs` VALUES (1,'perxsion',1,'Botble\\Ecommerce\\Models\\Brand','brands','2025-09-11 01:45:09','2025-09-11 01:45:09'),(2,'hiching',2,'Botble\\Ecommerce\\Models\\Brand','brands','2025-09-11 01:45:09','2025-09-11 01:45:09'),(3,'kepslo',3,'Botble\\Ecommerce\\Models\\Brand','brands','2025-09-11 01:45:09','2025-09-11 01:45:09'),(4,'groneba',4,'Botble\\Ecommerce\\Models\\Brand','brands','2025-09-11 01:45:09','2025-09-11 01:45:09'),(5,'babian',5,'Botble\\Ecommerce\\Models\\Brand','brands','2025-09-11 01:45:09','2025-09-11 01:45:09'),(6,'valorant',6,'Botble\\Ecommerce\\Models\\Brand','brands','2025-09-11 01:45:09','2025-09-11 01:45:09'),(7,'pure',7,'Botble\\Ecommerce\\Models\\Brand','brands','2025-09-11 01:45:09','2025-09-11 01:45:09'),(8,'hot-promotions',1,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(9,'electronics',2,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(10,'home-audio-theaters',3,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(11,'tv-videos',4,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(12,'camera-photos-videos',5,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(13,'cellphones-accessories',6,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(14,'headphones',7,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(15,'videos-games',8,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(16,'wireless-speakers',9,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(17,'office-electronic',10,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(18,'clothing',11,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(19,'computers',12,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(20,'computer-tablets',13,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(21,'laptop',14,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(22,'monitors',15,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(23,'computer-components',16,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(24,'home-kitchen',17,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(25,'health-beauty',18,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:10','2025-09-11 01:45:10'),(26,'jewelry-watch',19,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:11','2025-09-11 01:45:11'),(27,'technology-toys',20,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:11','2025-09-11 01:45:11'),(28,'drive-storages',21,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:11','2025-09-11 01:45:11'),(29,'gaming-laptop',22,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:11','2025-09-11 01:45:11'),(30,'security-protection',23,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:11','2025-09-11 01:45:11'),(31,'accessories',24,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:11','2025-09-11 01:45:11'),(32,'phones',25,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:11','2025-09-11 01:45:11'),(33,'babies-moms',26,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:11','2025-09-11 01:45:11'),(34,'sport-outdoor',27,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:11','2025-09-11 01:45:11'),(35,'books-office',28,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:11','2025-09-11 01:45:11'),(36,'cars-motorcycles',29,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:11','2025-09-11 01:45:11'),(37,'home-improvements',30,'Botble\\Ecommerce\\Models\\ProductCategory','product-categories','2025-09-11 01:45:11','2025-09-11 01:45:11'),(38,'wallet',1,'Botble\\Ecommerce\\Models\\ProductTag','product-tags','2025-09-11 01:45:11','2025-09-11 01:45:11'),(39,'bags',2,'Botble\\Ecommerce\\Models\\ProductTag','product-tags','2025-09-11 01:45:11','2025-09-11 01:45:11'),(40,'shoes',3,'Botble\\Ecommerce\\Models\\ProductTag','product-tags','2025-09-11 01:45:11','2025-09-11 01:45:11'),(41,'clothes',4,'Botble\\Ecommerce\\Models\\ProductTag','product-tags','2025-09-11 01:45:11','2025-09-11 01:45:11'),(42,'hand-bag',5,'Botble\\Ecommerce\\Models\\ProductTag','product-tags','2025-09-11 01:45:11','2025-09-11 01:45:11'),(43,'smart-home-speaker',1,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:25','2025-09-11 01:45:25'),(44,'headphone-ultra-bass',2,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:25','2025-09-11 01:45:25'),(45,'boxed-bluetooth-headphone',3,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:25','2025-09-11 01:45:25'),(46,'chikie-bluetooth-speaker-digital',4,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:25','2025-09-11 01:45:56'),(47,'camera-hikvision-hk-35vs8',5,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:25','2025-09-11 01:45:25'),(48,'camera-samsung-ss-24',6,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:25','2025-09-11 01:45:25'),(49,'leather-watch-band',7,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:25','2025-09-11 01:45:25'),(50,'apple-iphone-13-plus-digital',8,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:25','2025-09-11 01:45:56'),(51,'macbook-pro-2015',9,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:25','2025-09-11 01:45:25'),(52,'macbook-air-12-inch',10,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:25','2025-09-11 01:45:25'),(53,'apple-watch-serial-7',11,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:26','2025-09-11 01:45:26'),(54,'macbook-pro-13-inch-digital',12,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:26','2025-09-11 01:45:56'),(55,'apple-keyboard',13,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:26','2025-09-11 01:45:26'),(56,'macsafe-80w',14,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:26','2025-09-11 01:45:26'),(57,'hand-playstation',15,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:26','2025-09-11 01:45:26'),(58,'apple-airpods-serial-3-digital',16,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:26','2025-09-11 01:45:56'),(59,'cool-smart-watches',17,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:26','2025-09-11 01:45:26'),(60,'black-smart-watches',18,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:26','2025-09-11 01:45:26'),(61,'leather-watch-band-serial-3',19,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:27','2025-09-11 01:45:27'),(62,'macbook-pro-2015-13-inch-digital',20,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:27','2025-09-11 01:45:56'),(63,'historic-alarm-clock',21,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:27','2025-09-11 01:45:27'),(64,'black-glasses',22,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:27','2025-09-11 01:45:27'),(65,'phillips-mouse',23,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:27','2025-09-11 01:45:27'),(66,'gaming-keyboard-digital',24,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:27','2025-09-11 01:45:56'),(67,'ecommerce',1,'Botble\\Blog\\Models\\Category','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(68,'fashion',2,'Botble\\Blog\\Models\\Category','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(69,'electronic',3,'Botble\\Blog\\Models\\Category','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(70,'commercial',4,'Botble\\Blog\\Models\\Category','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(71,'general',1,'Botble\\Blog\\Models\\Tag','tag','2025-09-11 01:45:46','2025-09-11 01:45:46'),(72,'design',2,'Botble\\Blog\\Models\\Tag','tag','2025-09-11 01:45:46','2025-09-11 01:45:46'),(73,'fashion',3,'Botble\\Blog\\Models\\Tag','tag','2025-09-11 01:45:46','2025-09-11 01:45:46'),(74,'branding',4,'Botble\\Blog\\Models\\Tag','tag','2025-09-11 01:45:46','2025-09-11 01:45:46'),(75,'modern',5,'Botble\\Blog\\Models\\Tag','tag','2025-09-11 01:45:46','2025-09-11 01:45:46'),(76,'4-expert-tips-on-how-to-choose-the-right-mens-wallet',1,'Botble\\Blog\\Models\\Post','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(77,'sexy-clutches-how-to-buy-wear-a-designer-clutch-bag',2,'Botble\\Blog\\Models\\Post','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(78,'the-top-2020-handbag-trends-to-know',3,'Botble\\Blog\\Models\\Post','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(79,'how-to-match-the-color-of-your-handbag-with-an-outfit',4,'Botble\\Blog\\Models\\Post','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(80,'how-to-care-for-leather-bags',5,'Botble\\Blog\\Models\\Post','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(81,'were-crushing-hard-on-summers-10-biggest-bag-trends',6,'Botble\\Blog\\Models\\Post','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(82,'essential-qualities-of-highly-successful-music',7,'Botble\\Blog\\Models\\Post','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(83,'9-things-i-love-about-shaving-my-head',8,'Botble\\Blog\\Models\\Post','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(84,'why-teamwork-really-makes-the-dream-work',9,'Botble\\Blog\\Models\\Post','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(85,'the-world-caters-to-average-people',10,'Botble\\Blog\\Models\\Post','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(86,'the-litigants-on-the-screen-are-not-actors',11,'Botble\\Blog\\Models\\Post','blog','2025-09-11 01:45:46','2025-09-11 01:45:50'),(87,'homepage',1,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:46','2025-09-11 01:45:46'),(88,'homepage-2',2,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:46','2025-09-11 01:45:46'),(89,'homepage-3',3,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:46','2025-09-11 01:45:46'),(90,'homepage-4',4,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:46','2025-09-11 01:45:46'),(91,'blog',5,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:46','2025-09-11 01:45:46'),(92,'contact',6,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:46','2025-09-11 01:45:46'),(93,'about-us',7,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:46','2025-09-11 01:45:46'),(94,'cookie-policy',8,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:46','2025-09-11 01:45:46'),(95,'terms-conditions',9,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:47','2025-09-11 01:45:47'),(96,'returns-exchanges',10,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:47','2025-09-11 01:45:47'),(97,'shipping-delivery',11,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:47','2025-09-11 01:45:47'),(98,'privacy-policy',12,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:47','2025-09-11 01:45:47'),(99,'blog-left-sidebar',13,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:47','2025-09-11 01:45:47'),(100,'faq',14,'Botble\\Page\\Models\\Page','','2025-09-11 01:45:47','2025-09-11 01:45:47'),(101,'headphone-ultra-bass',25,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(102,'boxed-bluetooth-headphone',26,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(103,'chikie-bluetooth-speaker-digital',27,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(104,'chikie-bluetooth-speaker-digital',28,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(105,'leather-watch-band',29,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(106,'leather-watch-band',30,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(107,'leather-watch-band',31,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(108,'leather-watch-band',32,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(109,'apple-iphone-13-plus-digital',33,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(110,'apple-iphone-13-plus-digital',34,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(111,'apple-iphone-13-plus-digital',35,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(112,'macbook-pro-13-inch-digital',36,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(113,'apple-keyboard',37,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(114,'macsafe-80w',38,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(115,'macsafe-80w',39,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(116,'macsafe-80w',40,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(117,'macsafe-80w',41,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(118,'hand-playstation',42,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(119,'hand-playstation',43,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(120,'apple-airpods-serial-3-digital',44,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(121,'apple-airpods-serial-3-digital',45,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(122,'apple-airpods-serial-3-digital',46,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(123,'apple-airpods-serial-3-digital',47,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(124,'black-smart-watches',48,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(125,'black-smart-watches',49,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:56','2025-09-11 01:45:56'),(126,'historic-alarm-clock',50,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:57','2025-09-11 01:45:57'),(127,'historic-alarm-clock',51,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:57','2025-09-11 01:45:57'),(128,'historic-alarm-clock',52,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:57','2025-09-11 01:45:57'),(129,'black-glasses',53,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:57','2025-09-11 01:45:57'),(130,'black-glasses',54,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:57','2025-09-11 01:45:57'),(131,'phillips-mouse',55,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:57','2025-09-11 01:45:57'),(132,'phillips-mouse',56,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:57','2025-09-11 01:45:57'),(133,'phillips-mouse',57,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:57','2025-09-11 01:45:57'),(134,'phillips-mouse',58,'Botble\\Ecommerce\\Models\\Product','products','2025-09-11 01:45:57','2025-09-11 01:45:57');
/*!40000 ALTER TABLE `slugs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slugs_translations`
--

DROP TABLE IF EXISTS `slugs_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slugs_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slugs_id` bigint unsigned NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prefix` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT '',
  PRIMARY KEY (`lang_code`,`slugs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slugs_translations`
--

LOCK TABLES `slugs_translations` WRITE;
/*!40000 ALTER TABLE `slugs_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `slugs_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_logins`
--

DROP TABLE IF EXISTS `social_logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_logins` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` text COLLATE utf8mb4_unicode_ci,
  `refresh_token` text COLLATE utf8mb4_unicode_ci,
  `token_expires_at` timestamp NULL DEFAULT NULL,
  `provider_data` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_logins_provider_provider_id_unique` (`provider`,`provider_id`),
  KEY `social_logins_user_type_user_id_index` (`user_type`,`user_id`),
  KEY `social_logins_user_id_user_type_index` (`user_id`,`user_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_logins`
--

LOCK TABLES `social_logins` WRITE;
/*!40000 ALTER TABLE `social_logins` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `abbreviation` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_id` bigint unsigned DEFAULT NULL,
  `order` tinyint NOT NULL DEFAULT '0',
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint unsigned NOT NULL DEFAULT '0',
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `states_slug_unique` (`slug`),
  KEY `idx_states_name` (`name`),
  KEY `idx_states_status` (`status`),
  KEY `idx_states_country_id` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states_translations`
--

DROP TABLE IF EXISTS `states_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `states_id` bigint unsigned NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `abbreviation` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`states_id`),
  KEY `idx_states_trans_state_lang` (`states_id`,`lang_code`),
  KEY `idx_states_trans_name` (`name`),
  KEY `idx_states_trans_states_id` (`states_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states_translations`
--

LOCK TABLES `states_translations` WRITE;
/*!40000 ALTER TABLE `states_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `states_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_id` bigint unsigned DEFAULT NULL,
  `author_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'General',1,'Botble\\ACL\\Models\\User',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(2,'Design',1,'Botble\\ACL\\Models\\User',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(3,'Fashion',1,'Botble\\ACL\\Models\\User',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(4,'Branding',1,'Botble\\ACL\\Models\\User',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46'),(5,'Modern',1,'Botble\\ACL\\Models\\User',NULL,'published','2025-09-11 01:45:46','2025-09-11 01:45:46');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags_translations`
--

DROP TABLE IF EXISTS `tags_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags_translations` (
  `lang_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tags_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`lang_code`,`tags_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags_translations`
--

LOCK TABLES `tags_translations` WRITE;
/*!40000 ALTER TABLE `tags_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_meta`
--

DROP TABLE IF EXISTS `user_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_meta` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_meta_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_meta`
--

LOCK TABLES `user_meta` WRITE;
/*!40000 ALTER TABLE `user_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_settings`
--

DROP TABLE IF EXISTS `user_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_settings_user_type_user_id_key_unique` (`user_type`,`user_id`,`key`),
  KEY `user_settings_user_type_user_id_index` (`user_type`,`user_id`),
  KEY `user_settings_key_index` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_settings`
--

LOCK TABLES `user_settings` WRITE;
/*!40000 ALTER TABLE `user_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `first_name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_id` bigint unsigned DEFAULT NULL,
  `super_user` tinyint(1) NOT NULL DEFAULT '0',
  `manage_supers` tinyint(1) NOT NULL DEFAULT '0',
  `permissions` text COLLATE utf8mb4_unicode_ci,
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'cormier.shyann@bayer.com',NULL,NULL,'$2y$12$kJmrecn7nbWfUXkx0o.VQ.TzJK9TsoOY4d3R2wMkhMyiZ1uDqtrVS',NULL,'2025-09-11 01:45:47','2025-09-11 01:45:47','Gisselle','Aufderhar','admin',NULL,1,1,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `widgets`
--

DROP TABLE IF EXISTS `widgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `widgets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `widget_id` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sidebar_id` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `theme` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` tinyint unsigned NOT NULL DEFAULT '0',
  `data` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `widgets`
--

LOCK TABLES `widgets` WRITE;
/*!40000 ALTER TABLE `widgets` DISABLE KEYS */;
INSERT INTO `widgets` VALUES (1,'NewsletterWidget','top_footer_sidebar','wowy',1,'{\"id\":\"NewsletterWidget\",\"name\":\"Sign up to Newsletter\",\"subtitle\":\"...and receive $25 coupon for first shopping.\"}','2025-09-11 01:45:53','2025-09-11 01:45:53'),(2,'SiteInfoWidget','footer_sidebar','wowy',0,'{\"id\":\"SiteInfoWidget\",\"name\":\"Site information\"}','2025-09-11 01:45:53','2025-09-11 01:45:53'),(3,'CustomMenuWidget','footer_sidebar','wowy',1,'{\"id\":\"CustomMenuWidget\",\"name\":\"Categories\",\"menu_id\":\"product-categories\"}','2025-09-11 01:45:53','2025-09-11 01:45:53'),(4,'CustomMenuWidget','footer_sidebar','wowy',2,'{\"id\":\"CustomMenuWidget\",\"name\":\"Information\",\"menu_id\":\"information\"}','2025-09-11 01:45:53','2025-09-11 01:45:53'),(5,'PaymentMethodsWidget','footer_sidebar','wowy',3,'{\"id\":\"PaymentMethodsWidget\",\"name\":\"Payments\",\"description\":\"Secured Payment Gateways\",\"image\":\"general\\/payment-methods.png\"}','2025-09-11 01:45:53','2025-09-11 01:45:53'),(6,'BlogSearchWidget','primary_sidebar','wowy',0,'{\"id\":\"BlogSearchWidget\",\"name\":\"Search\"}','2025-09-11 01:45:53','2025-09-11 01:45:53'),(7,'BlogCategoriesWidget','primary_sidebar','wowy',1,'{\"id\":\"BlogCategoriesWidget\",\"name\":\"Categories\"}','2025-09-11 01:45:53','2025-09-11 01:45:53'),(8,'RecentPostsWidget','primary_sidebar','wowy',2,'{\"id\":\"RecentPostsWidget\",\"name\":\"Recent Posts\"}','2025-09-11 01:45:53','2025-09-11 01:45:53'),(9,'TagsWidget','primary_sidebar','wowy',4,'{\"id\":\"TagsWidget\",\"name\":\"Popular Tags\"}','2025-09-11 01:45:53','2025-09-11 01:45:53'),(10,'ProductCategoriesWidget','product_sidebar','wowy',1,'{\"id\":\"ProductCategoriesWidget\",\"name\":\"Categories\"}','2025-09-11 01:45:54','2025-09-11 01:45:54'),(11,'FeaturedProductsWidget','product_sidebar','wowy',2,'{\"id\":\"FeaturedProductsWidget\",\"name\":\"Featured Products\"}','2025-09-11 01:45:54','2025-09-11 01:45:54'),(12,'FeaturedBrandsWidget','product_sidebar','wowy',3,'{\"id\":\"FeaturedBrandsWidget\",\"name\":\"Manufacturers\"}','2025-09-11 01:45:54','2025-09-11 01:45:54');
/*!40000 ALTER TABLE `widgets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-11 15:45:59
