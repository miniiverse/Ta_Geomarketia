-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 09, 2026 at 08:39 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `geomarketia`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'i:5;', 1781330411),
('laravel-cache-0ade7c2cf97f75d009975f4d720d1fa6c19f4897:timer', 'i:1781330411;', 1781330411),
('laravel-cache-1b6453892473a467d07372d45eb05abc2031647a', 'i:8;', 1782810272),
('laravel-cache-1b6453892473a467d07372d45eb05abc2031647a:timer', 'i:1782810272;', 1782810272),
('laravel-cache-356a192b7913b04c54574d18c28d46e6395428ab', 'i:4;', 1782978462),
('laravel-cache-356a192b7913b04c54574d18c28d46e6395428ab:timer', 'i:1782978462;', 1782978462),
('laravel-cache-77de68daecd823babbb58edb1c8e14d7106e83bb', 'i:1;', 1782404627),
('laravel-cache-77de68daecd823babbb58edb1c8e14d7106e83bb:timer', 'i:1782404627;', 1782404627),
('laravel-cache-902ba3cda1883801594b6e1b452790cc53948fda', 'i:4;', 1782637578),
('laravel-cache-902ba3cda1883801594b6e1b452790cc53948fda:timer', 'i:1782637578;', 1782637578),
('laravel-cache-ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'i:9;', 1782637948),
('laravel-cache-ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4:timer', 'i:1782637948;', 1782637948),
('laravel-cache-c1dfd96eea8cc2b62785275bca38ac261256e278', 'i:6;', 1783162707),
('laravel-cache-c1dfd96eea8cc2b62785275bca38ac261256e278:timer', 'i:1783162707;', 1783162707),
('laravel-cache-da4b9237bacccdf19c0760cab7aec4a8359010b0', 'i:3;', 1782662081),
('laravel-cache-da4b9237bacccdf19c0760cab7aec4a8359010b0:timer', 'i:1782662081;', 1782662081),
('laravel-cache-otp-send:127.0.0.1', 'i:2;', 1782796475),
('laravel-cache-otp-send:127.0.0.1:timer', 'i:1782796475;', 1782796475);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `created_at`) VALUES
(1, 'Retail', '2026-04-13 02:02:38'),
(2, 'Food and Beverage', '2026-04-13 02:02:38'),
(3, 'Healthcare', '2026-04-13 02:02:38');

-- --------------------------------------------------------

--
-- Table structure for table `chatbot_messages`
--

CREATE TABLE `chatbot_messages` (
  `message_id` int NOT NULL,
  `session_id` int DEFAULT NULL,
  `sender` enum('user','bot') DEFAULT NULL,
  `message_text` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chatbot_sessions`
--

CREATE TABLE `chatbot_sessions` (
  `session_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `api_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int NOT NULL,
  `province_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `province_id`, `name`) VALUES
(1, 1, 'Batam'),
(2, 1, 'Tanjungpinang');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_04_13_044458_create_personal_access_tokens_table', 2),
(5, '2026_05_21_031905_create_password_reset_otps_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `order_status` enum('paid','pending','cancelled') DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `project_id`, `order_status`, `total_amount`, `created_at`) VALUES
(1, 7, 11, 'paid', 67700.00, '2026-06-28 09:05:21'),
(2, 6, 7, 'paid', 60000.00, '2026-06-28 09:09:28'),
(3, 5, 8, 'paid', 77700.00, '2026-06-28 09:11:46'),
(4, 4, 10, 'cancelled', 166800.00, '2026-06-28 09:15:40'),
(5, 6, 11, 'paid', 67700.00, '2026-06-28 10:31:01'),
(6, 4, 11, 'paid', 67700.00, '2026-06-30 08:04:29'),
(7, 4, 7, 'paid', 60000.00, '2026-06-30 08:38:40'),
(8, 6, 9, 'cancelled', 467000.00, '2026-07-01 16:05:43'),
(9, 6, 9, 'paid', 467000.00, '2026-07-01 16:09:03');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_otps`
--

CREATE TABLE `password_reset_otps` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int NOT NULL,
  `order_id` int NOT NULL,
  `midtrans_transaction_id` varchar(100) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_status` enum('pending','settlement','expire','cancel','deny') DEFAULT 'pending',
  `gross_amount` decimal(10,2) DEFAULT NULL,
  `payment_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `order_id`, `midtrans_transaction_id`, `payment_method`, `payment_status`, `gross_amount`, `payment_time`) VALUES
(1, 1, 'ORDER-1-1782637522', 'bank_transfer', 'settlement', 67700.00, '2026-06-28 09:05:58'),
(2, 2, 'ORDER-2-1782637769', 'bank_transfer', 'settlement', 60000.00, '2026-06-28 09:09:45'),
(3, 3, 'ORDER-3-1782637907', 'qris', 'settlement', 77700.00, '2026-06-28 09:12:19'),
(4, 4, 'ORDER-4-1782638141', NULL, 'cancel', 166800.00, '2026-06-28 09:18:39'),
(5, 5, 'ORDER-5-1782642662', 'qris', 'settlement', 67700.00, '2026-06-28 10:31:52'),
(6, 6, 'ORDER-6-1782806670', 'qris', 'settlement', 67700.00, '2026-06-30 08:05:47'),
(7, 7, 'ORDER-7-1782808720', 'qris', 'settlement', 60000.00, '2026-06-30 08:39:06'),
(8, 8, 'ORDER-8-1782921944', NULL, 'cancel', 467000.00, '2026-07-01 16:06:02'),
(9, 9, 'ORDER-9-1782922143', 'bank_transfer', 'settlement', 467000.00, '2026-07-01 16:09:26');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(236, 'App\\Models\\User', 9, 'auth-token', '5fa836f57563ab232ebac79e13ecf8681de6ca5d960b30592a05135dc67132cb', '[\"*\"]', '2026-06-13 06:07:10', NULL, '2026-06-13 05:59:10', '2026-06-13 06:07:10'),
(291, 'App\\Models\\User', 3, 'auth-token', 'd3c8e3da6c6bc4597353bfd19f65b160ead254b8c3a67b8893690de361adec9e', '[\"*\"]', '2026-06-25 16:22:48', NULL, '2026-06-25 16:08:39', '2026-06-25 16:22:48'),
(314, 'App\\Models\\User', 2, 'auth-token', 'bc30de813682208a5d25e6dbdf3becb8217ea104c8b66ca1966c9613700b625d', '[\"*\"]', '2026-06-28 15:53:48', NULL, '2026-06-28 15:53:39', '2026-06-28 15:53:48'),
(327, 'App\\Models\\User', 1, 'auth-token', '729db4e4de7d699d136ba7a875264c00fde43fdec392086929724caa4f655d19', '[\"*\"]', '2026-07-02 07:47:45', NULL, '2026-07-02 07:46:42', '2026-07-02 07:47:45'),
(328, 'App\\Models\\User', 6, 'auth-token', '0ed846bfc810b3948e1b97f6f15cf4b729e188e5ddcff556a7afbe3a674e3c4e', '[\"*\"]', '2026-07-04 10:59:48', NULL, '2026-07-04 10:57:27', '2026-07-04 10:59:48');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `total_data` int DEFAULT NULL,
  `project_date` date DEFAULT NULL,
  `api_url` text,
  `thumbnail` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `user_id`, `category_id`, `city_id`, `title`, `description`, `price`, `total_data`, `project_date`, `api_url`, `thumbnail`, `created_at`, `updated_at`) VALUES
(7, 1, 1, 1, 'Computer Store, Batam, Indonesia', 'A computer store project that identifies the most suitable locations for opening a new business using geospatial and market analysis.', 50000.00, 271, '2024-10-17', 'http://127.0.0.1:8080/api/v1/Indonesia.Batam.Toko Komputer.202410170720/places', 'projects/admin/44GQeebuutEDiEa2h0muNYog4a9TmomaJAh4A802.png', '2026-06-27 17:04:08', '2026-06-27 17:05:18'),
(8, 1, 1, 1, 'Building Supply Store, Batam, Indonesia', 'A building materials store project that identifies the most suitable locations for opening a new business using geospatial and market analysis.', 67700.00, 677, '2024-08-02', 'http://127.0.0.1:8080/api/v1/Indonesia.Batam.Toko Bangunan.202408021219/places', 'projects/admin/BWNsIaju5SG3YAuUNZDyV9LZRw3QUgMA403hXZLg.png', '2026-06-27 17:06:19', '2026-06-27 17:08:08'),
(9, 1, 2, 1, 'Culinary, Batam, Indonesia', 'A food and beverage business project that identifies the most suitable locations for opening a new business using geospatial and market analysis.', 457000.00, 4570, '2024-06-16', 'http://127.0.0.1:8080/api/v1/Indonesia.Batam.Kuliner.202406162232/places', 'projects/admin/jVG8XSwIYxI04XqX6f5wCYeGg8aNcgC6VkEJjDXE.jpg', '2026-06-27 17:22:57', '2026-06-27 17:28:08'),
(10, 1, 3, 1, 'Healthcare, Batam, Indonesia', 'A healthcare business project that identifies the most suitable locations for opening a new business using geospatial and market analysis.', 156800.00, 1568, '2024-08-05', 'http://127.0.0.1:8080/api/v1/Indonesia.Batam.Kesehatan.202408050759/places', 'projects/admin/U9PuYunRIzfKe4sadpju2ifvXovk8w9typfUelMZ.jpg', '2026-06-27 17:29:01', '2026-06-27 17:30:06'),
(11, 1, 1, 1, 'Cosmetics, Batam, Indonesia', 'A retail business project that identifies the most suitable locations for opening a new business using geospatial and market analysis.', 57700.00, 577, '2024-10-29', 'http://127.0.0.1:8080/api/v1/Indonesia.Batam.Cosmetics.202410290644/places', 'projects/admin/JVoM5TlC80NvU3M7UrurVd372cLc4isLpVA1C15f.jpg', '2026-06-27 17:30:36', '2026-06-28 14:49:30');

-- --------------------------------------------------------

--
-- Table structure for table `provinces`
--

CREATE TABLE `provinces` (
  `province_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `provinces`
--

INSERT INTO `provinces` (`province_id`, `name`) VALUES
(1, 'Kepulauan Riau');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'user'),
(2, 'admin'),
(3, 'manager');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('3ICt7Z4zk6nP6wwJm9Sw20DyhyIclKyyON7gj8Bm', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU1VrUHRoWXpCUzBFb1VXRFBiVEFpdUhDZVpsbnZSRGp0a0owajdQZSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMSI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777131282),
('iGf2VKbi7LTbx7Cnyhc491usrGphCqKGhA6JGf6n', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUUhUZ1hkUktCUGVOR2lUa2F5aU9XcmV4WnBSZjM3c2pvWFNOa0dwMyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMSI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1779338636),
('QbeQrVeASj507L9UW3tTI2DICuadZyREECRQNrao', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMjJsSGdSZmFrY0dyaGJuT0ltb3FQT2VrY1BzUktuczJoaG82VHRKUSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1779435935);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `role_id` int DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `role_id`, `fullname`, `username`, `email`, `password`, `profile_photo`, `created_at`, `updated_at`) VALUES
(1, 2, 'Admin Geomarketia', 'Admin123', 'admin@gmail.com', '$2y$12$DJarRr1wqJSNRXOWLRMgIebcCDxd7cJ7CDeNI603n/ysKGzOP80g.', 'photos/admin/NUcXeweqZn9ckrMWe7mPboS3oaKYmYk992slzO40.jpg', '2026-06-25 08:22:16', '2026-06-25 08:56:32'),
(2, 3, 'Neli Fauziyah', 'Neli123', 'nelifauziyahh@gmail.com', '$2y$12$26iChqY8aRxeaTytYvrR7u7v55HbyifQKjCRMP7wAWH9NtZWdQSiO', 'photos/manager/IYhlX5NXdyZHfZo9eLLBknmM0td7eZuEY7nJNNTi.png', '2026-06-25 08:47:21', '2026-06-25 09:01:47'),
(4, 1, 'Fareysha Keyravie', 'Farey123', 'fareyshakeyravie@gmail.com', '$2y$12$i0xNQHyMDKz46xyG4um3Ku9VxCLJ08Wx5nza492V1y82070fLGi7i', 'photos/user/ylrzlVEiMWQflObG9ueSDP5rJy1IFik0sBdL5zZ1.png', '2026-06-27 16:00:28', '2026-06-30 05:06:53'),
(5, 1, 'Grace Tina', 'Grace123', 'gracetina@gmail.com', '$2y$12$pFKxZ0.XPMdzXsmAaNQyuea/I0tsyhGjjay7LUKaKtXk.Ej8nbSKG', 'photos/user/XLj7262ZNI3QzvEO6Bcg7u2UXVo5gVXSK3l25rpc.png', '2026-06-28 08:55:19', '2026-06-28 08:56:18'),
(6, 1, 'Dyta Derliana', 'Dyta123', 'dytaderliana@gmail.com', '$2y$12$pq31H03.yKeBsNQJQT0bm.4Y/Sva8rdkFbIi/57ZuD3.gfdqouilO', 'photos/user/RS4PIPdt2OwNdMiaWJ5GyGvhGCAVASvtYNzrUCQ8.jpg', '2026-06-28 08:59:29', '2026-06-28 09:00:41'),
(7, 1, 'Putri Cahyani', 'Putri123', 'putricahyani@gmail.com', '$2y$12$nQdlGhWERABgcvJIHHZJCudRVwZUbYyhLTjsE2pnajP1mM67vaNMy', 'photos/user/iEXmdArqyYptCBUZGT6HJwBh50TbWUyS6WayuaJg.jpg', '2026-06-28 09:01:39', '2026-06-28 09:02:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `chatbot_messages`
--
ALTER TABLE `chatbot_messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indexes for table `chatbot_sessions`
--
ALTER TABLE `chatbot_sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `province_id` (`province_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_reserved_at_available_at_index` (`queue`,`reserved_at`,`available_at`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `password_reset_otps`
--
ALTER TABLE `password_reset_otps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `password_reset_otps_email_index` (`email`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indexes for table `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`province_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `chatbot_messages`
--
ALTER TABLE `chatbot_messages`
  MODIFY `message_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chatbot_sessions`
--
ALTER TABLE `chatbot_sessions`
  MODIFY `session_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `password_reset_otps`
--
ALTER TABLE `password_reset_otps`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=329;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `province_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chatbot_messages`
--
ALTER TABLE `chatbot_messages`
  ADD CONSTRAINT `chatbot_messages_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `chatbot_sessions` (`session_id`);

--
-- Constraints for table `chatbot_sessions`
--
ALTER TABLE `chatbot_sessions`
  ADD CONSTRAINT `chatbot_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `chatbot_sessions_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`);

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`province_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
