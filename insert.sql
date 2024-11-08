-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table bansach.accounts: ~3 rows (approximately)
INSERT INTO `accounts` (`account_id`, `username`, `password`, `email`, `phone_number`, `role_id`, `status`, `last_login`, `otp`, `otp_exprire`, `createdAt`, `updatedAt`) VALUES
	(1, 'johndoe', 'password123', 'johndoe@example.com', '123-456-7890', 3, 1, '2024-09-14 08:00:00', NULL, NULL, '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 'janesmith', 'password456', 'janesmith@example.com', '987-654-3210', 2, 1, '2024-09-13 08:00:00', NULL, NULL, '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(3, 'truong', '$2a$10$gLZ3gowSpnzht.KUJEX6te/8heimaI/qEtMPcv0bumxAQB7UvgOcC', 'truong123@gmail.com', '0123456789', NULL, NULL, NULL, NULL, NULL, '2024-09-30 09:04:54', '2024-09-30 09:04:54');

-- Dumping data for table bansach.authors: ~2 rows (approximately)
INSERT INTO `authors` (`author_id`, `name`, `bio`, `createdAt`, `updatedAt`) VALUES
	(1, 'John Doe', 'An award-winning author known for his adventure novels.', '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 'Jane Smith', 'A famous writer of children’s books.', '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.billpromotions: ~2 rows (approximately)
INSERT INTO `billpromotions` (`billPromotion_id`, `conditional`, `discount_type`, `discount_value`, `start_at`, `end_at`, `createdAt`, `updatedAt`) VALUES
	(1, 500000, 'PhanTram', 5, '2024-09-01 00:00:00', '2024-09-30 23:59:59', '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 1000000, 'TrucTiep', 100000, '2024-10-01 00:00:00', '2024-10-15 23:59:59', '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.bookauthors: ~2 rows (approximately)
INSERT INTO `bookauthors` (`book_id`, `author_id`, `createdAt`, `updatedAt`) VALUES
	(1, 1, '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(1, 2, '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.bookdiscount: ~2 rows (approximately)
INSERT INTO `bookdiscount` (`discount_id`, `discount_name`, `discount_value`, `discount_type`, `start_at`, `end_at`, `createdAt`, `updatedAt`) VALUES
	(1, 'Black friday', 10, 'PhanTram', '2024-09-01 00:00:00', '2024-09-30 23:59:59', '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 'For fun', 20000, 'TrucTiep', '2024-10-01 00:00:00', '2024-10-15 23:59:59', '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.bookimages: ~3 rows (approximately)
INSERT INTO `bookimages` (`bookImage_id`, `book_id`, `url`, `is_main`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 'cube.png', 0, '2024-09-30 08:51:54', '2024-09-30 08:51:54'),
	(2, 1, '404.png', 1, '2024-09-30 08:51:54', '2024-09-30 08:51:54'),
	(3, 2, 'cube.png', 1, '2024-09-30 09:47:47', '2024-09-30 09:47:48'),
	(4, 3, '404.png', 1, '2024-09-30 09:47:47', '2024-09-30 09:47:48'),
	(5, 4, '404.png', 1, '2024-09-30 09:47:47', '2024-09-30 09:47:48'),
	(6, 5, '404.png', 1, '2024-09-30 09:47:47', '2024-09-30 09:47:48'),
	(7, 6, '404.png', 1, '2024-09-30 09:47:47', '2024-09-30 09:47:48'),
	(8, 7, '404.png', 1, '2024-09-30 09:47:47', '2024-09-30 09:47:48');

-- Dumping data for table bansach.books: ~2 rows (approximately)
INSERT INTO `books` (`book_id`, `title`, `num_page`, `size`, `weight`, `publication_year`, `price_receipt`, `profit_rate`, `decription`, `stock_quantity`, `status_id`, `language_id`, `publisher_id`, `genre_id`, `discount_id`, `cover_format_id`, `createdAt`, `updatedAt`) VALUES
	(1, 'The Great Adventure', 300, '20x15cm', '500g', 2020, 100000.00, 0.20, 'A great adventure book.', 50, 1, 1, 1, 1, NULL, 1, '2024-09-30 08:51:54', '2024-09-30 08:51:54'),
	(2, 'The Choosen One', 100, '20x10cm', '300g', 2024, 50000.00, 0.20, 'truong book', 100, 1, 2, 2, 3, 2, 2, '2024-09-30 09:45:25', '2024-09-30 09:45:25'),
	(3, 'The Choosen One', 100, '20x10cm', '300g', 2024, 50000.00, 0.20, 'truong book', 100, 1, 2, 2, 3, 2, 2, '2024-09-30 09:45:25', '2024-09-30 09:45:25'),
	(4, 'The Choosen One', 100, '20x10cm', '300g', 2024, 50000.00, 0.20, 'truong book', 100, 1, 2, 2, 3, 2, 2, '2024-09-30 09:45:25', '2024-09-30 09:45:25'),
	(5, 'The Choosen One', 100, '20x10cm', '300g', 2024, 50000.00, 0.20, 'truong book', 100, 1, 2, 2, 3, 2, 2, '2024-09-30 09:45:25', '2024-09-30 09:45:25'),
	(6, 'The Choosen One', 100, '20x10cm', '300g', 2024, 50000.00, 0.20, 'truong book', 100, 1, 2, 2, 3, 2, 2, '2024-09-30 09:45:25', '2024-09-30 09:45:25'),
	(7, 'The Choosen One', 100, '20x10cm', '300g', 2024, 50000.00, 0.20, 'truong book', 100, 1, 2, 2, 3, 2, 2, '2024-09-30 09:45:25', '2024-09-30 09:45:25'),
	(,8 'The Choosen One', 100, '20x10cm', '300g', 2024, 50000.00, 0.20, 'truong book', 100, 1, 2, 2, 3, 2, 2, '2024-09-30 09:45:25', '2024-09-30 09:45:25');

-- Dumping data for table bansach.bookstatus: ~3 rows (approximately)
INSERT INTO `bookstatus` (`id`, `status_name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Đang bán', '2024-09-30 08:51:54', '2024-09-30 08:51:54'),
	(2, 'Ngưng bán', '2024-09-30 08:51:54', '2024-09-30 08:51:54'),
	(3, 'Sắp bán', '2024-09-30 08:51:54', '2024-09-30 08:51:54');

-- Dumping data for table bansach.booktranslators: ~0 rows (approximately)

-- Dumping data for table bansach.coverformats: ~2 rows (approximately)
INSERT INTO `coverformats` (`cover_id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Hardcover', '2024-09-30 08:51:54', '2024-09-30 08:51:54'),
	(2, 'Paperback', '2024-09-30 08:51:54', '2024-09-30 08:51:54');

-- Dumping data for table bansach.customers: ~2 rows (approximately)
INSERT INTO `customers` (`customer_id`, `firstName`, `lastName`, `phone_number`, `email`, `account_id`, `createdAt`, `updatedAt`) VALUES
	(1, 'John', 'Doe', '123-456-7890', 'johndoe@example.com', 1, '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 'Jane', 'Smith', '987-654-3210', 'janesmith@example.com', 2, '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.genres: ~3 rows (approximately)
INSERT INTO `genres` (`genre_id`, `name`, `parent_id`, `createdAt`, `updatedAt`) VALUES
	(1, 'Fiction', NULL, '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 'Adventure', 1, '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(3, 'Children', NULL, '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.goodsreceipt: ~2 rows (approximately)
INSERT INTO `goodsreceipt` (`receipt_id`, `total`, `provider_id`, `create_at`, `createdAt`, `updatedAt`) VALUES
	(1, 500000.00, 1, '2024-09-01 08:00:00', '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 1500000.00, 2, '2024-09-10 08:00:00', '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.goodsreceiptdetails: ~2 rows (approximately)
INSERT INTO `goodsreceiptdetails` (`book_id`, `receipt_id`, `quantity`, `price`, `subtotal`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 10, 50000.00, 500000.00, '2024-09-30 08:50:58', '2024-09-30 08:50:58'),
	(1, 2, 20, 75000.00, 1500000.00, '2024-09-30 08:50:58', '2024-09-30 08:50:58');

-- Dumping data for table bansach.languages: ~3 rows (approximately)
INSERT INTO `languages` (`id`, `language_code`, `language_name`, `createdAt`, `updatedAt`) VALUES
	(1, 'vi', 'Vietnamese', '2024-09-30 08:51:54', '2024-09-30 08:51:54'),
	(2, 'en', 'English', '2024-09-30 08:51:54', '2024-09-30 08:51:54'),
	(3, 'fr', 'French', '2024-09-30 08:51:54', '2024-09-30 08:51:54');

-- Dumping data for table bansach.orderdetails: ~2 rows (approximately)
INSERT INTO `orderdetails` (`order_id`, `book_id`, `quantity`, `price`, `discount_id`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 2, 100000.00, 1, '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 1, 5, 200000.00, NULL, '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.orders: ~2 rows (approximately)
INSERT INTO `orders` (`order_id`, `customer_id`, `order_date`, `total_amount`, `status_id`, `address`, `billPromotion_id`, `createdAt`, `updatedAt`) VALUES
	(1, 1, '2024-09-12 10:30:00', 550000.00, 1, '789 Market Street, Metropolis', 1, '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 2, '2024-09-13 14:00:00', 1200000.00, 2, '123 Main Street, Citytown', 2, '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.orderstatus: ~3 rows (approximately)
INSERT INTO `orderstatus` (`id`, `status_name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Chờ xác nhận', '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 'Chờ thanh toán', '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(3, 'Đã thanh toán', '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.providers: ~2 rows (approximately)
INSERT INTO `providers` (`id`, `name`, `address`, `email`, `phone_number`, `createdAt`, `updatedAt`) VALUES
	(1, 'Global Books Supply', '789 Market Street, Metropolis', 'contact@globalbooks.com', '123-456-7890', '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 'BookWorld Distribution', '321 Maple Avenue, Suburbia', 'info@bookworld.com', '987-654-3210', '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.publishers: ~2 rows (approximately)
INSERT INTO `publishers` (`publisher_id`, `name`, `address`, `createdAt`, `updatedAt`) VALUES
	(1, 'XYZ Publishers', '456 Oak Street, Villagetown', '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 'ABC Publishing', '123 Main Street, Citytown', '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.roles: ~3 rows (approximately)
INSERT INTO `roles` (`role_id`, `role_name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Admin', '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(2, 'Staff', '2024-09-30 08:50:02', '2024-09-30 08:50:02'),
	(3, 'Customer', '2024-09-30 08:50:02', '2024-09-30 08:50:02');

-- Dumping data for table bansach.translators: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
