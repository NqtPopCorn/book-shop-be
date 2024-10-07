CREATE TABLE `Books` (
  `book_id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `num_page` int,
  `size` varchar(255),
  `weight` varchar(255),
  `publication_year` int,
  `price_receipt` decimal(10,2),
  `profit_rate` decimal(10,2),
  `decription` varchar(255),
  `stock_quantity` int DEFAULT 0,
  `status_id` int,
  `language_id` int,
  `publisher_id` int,
  `genre_id` int,
  `discount_id` int DEFAULT null,
  `cover_format_id` int,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `BookStatus` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `status_name` varchar(255) COMMENT 'Đang bán, Ngưng bán, Sắp bán',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `BookImages` (
  `bookImage_id` int PRIMARY KEY AUTO_INCREMENT,
  `book_id` int,
  `url` varchar(255),
  `is_main` tinyint,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Languages` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `language_code` varchar(255),
  `language_name` varchar(255),
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `CoverFormats` (
  `cover_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `BookTranslators` (
  `book_id` int,
  `translator_id` int,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Translators` (
  `translator_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `bio` varchar(255),
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Customers` (
  `customer_id` int PRIMARY KEY AUTO_INCREMENT,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `phone_number` varchar(255),
  `email` varchar(255),
  `account_id` int,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Orders` (
  `order_id` int PRIMARY KEY AUTO_INCREMENT,
  `customer_id` int,
  `order_date` datetime,
  `total_amount` decimal(10,2),
  `status_id` int,
  `address` varchar(255),
  `billPromotion_id` int DEFAULT null,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `GoodsReceipt` (
  `receipt_id` int PRIMARY KEY AUTO_INCREMENT,
  `total` decimal(10,2),
  `provider_id` int,
  `create_at` datetime,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `GoodsReceiptDetails` (
  `book_id` int,
  `receipt_id` int,
  `quantity` int,
  `price` decimal(10,2),
  `subtotal` decimal(10,2),
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_id`, `receipt_id`)
);

CREATE TABLE `OrderStatus` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `status_name` varchar(255) COMMENT 'Chờ xác nhận, Chờ thanh toán, Đã thanh toán',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `OrderDetails` (
  `order_id` int,
  `book_id` int,
  `quantity` int,
  `price` decimal(10,2),
  `discount_id` int DEFAULT null,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`, `book_id`)
);

CREATE TABLE `Genres` (
  `genre_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE,
  `parent_id` int,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Authors` (
  `author_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `bio` varchar(255),
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Publishers` (
  `publisher_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `address` varchar(255),
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Providers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `address` varchar(255),
  `email` varchar(255),
  `phone_number` varchar(255),
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `BookAuthors` (
  `book_id` int,
  `author_id` int,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_id`, `author_id`)
);

CREATE TABLE `BookDiscount` (
  `discount_id` int PRIMARY KEY AUTO_INCREMENT,
  `discount_type` varchar(255) COMMENT '1.TrucTiep, 2.PhanTram',
  `discount_value` int,
  `start_at` datetime,
  `end_at` datetime,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `BillPromotions` (
  `billPromotion_id` int PRIMARY KEY AUTO_INCREMENT,
  `conditional` int COMMENT 'số tiền áp dụng',
  `discount_type` varchar(255) COMMENT '1.TrucTiep, 2.PhanTram',
  `discount_value` int,
  `start_at` datetime,
  `end_at` datetime,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Accounts` (
  `account_id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `password` varchar(255),
  `email` varchar(255),
  `phone_number` varchar(255),
  `role_id` int,
  `status` int,
  `last_login` datetime,
  `otp` varchar(255),
  `otp_exprire` datetime,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `Roles` (
  `role_id` int PRIMARY KEY AUTO_INCREMENT,
  `role_name` varchar(255) COMMENT 'Admin, Staff, Customer',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `Books` ADD FOREIGN KEY (`status_id`) REFERENCES `BookStatus` (`id`);

ALTER TABLE `Books` ADD FOREIGN KEY (`language_id`) REFERENCES `Languages` (`id`);

ALTER TABLE `Books` ADD FOREIGN KEY (`publisher_id`) REFERENCES `Publishers` (`publisher_id`);

ALTER TABLE `Books` ADD FOREIGN KEY (`genre_id`) REFERENCES `Genres` (`genre_id`);

ALTER TABLE `Books` ADD FOREIGN KEY (`discount_id`) REFERENCES `BookDiscount` (`discount_id`);

ALTER TABLE `Books` ADD FOREIGN KEY (`cover_format_id`) REFERENCES `CoverFormats` (`cover_id`);

ALTER TABLE `BookImages` ADD FOREIGN KEY (`book_id`) REFERENCES `Books` (`book_id`);

ALTER TABLE `BookTranslators` ADD FOREIGN KEY (`book_id`) REFERENCES `Books` (`book_id`);

ALTER TABLE `BookTranslators` ADD FOREIGN KEY (`translator_id`) REFERENCES `Translators` (`translator_id`);

ALTER TABLE `Customers` ADD FOREIGN KEY (`account_id`) REFERENCES `Accounts` (`account_id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`status_id`) REFERENCES `OrderStatus` (`id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`billPromotion_id`) REFERENCES `BillPromotions` (`billPromotion_id`);

ALTER TABLE `GoodsReceipt` ADD FOREIGN KEY (`provider_id`) REFERENCES `Providers` (`id`);

ALTER TABLE `GoodsReceiptDetails` ADD FOREIGN KEY (`book_id`) REFERENCES `Books` (`book_id`);

ALTER TABLE `GoodsReceiptDetails` ADD FOREIGN KEY (`receipt_id`) REFERENCES `GoodsReceipt` (`receipt_id`);

ALTER TABLE `OrderDetails` ADD FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`);

ALTER TABLE `OrderDetails` ADD FOREIGN KEY (`book_id`) REFERENCES `Books` (`book_id`);

ALTER TABLE `OrderDetails` ADD FOREIGN KEY (`discount_id`) REFERENCES `BookDiscount` (`discount_id`);

ALTER TABLE `Genres` ADD FOREIGN KEY (`parent_id`) REFERENCES `Genres` (`genre_id`);

ALTER TABLE `BookAuthors` ADD FOREIGN KEY (`book_id`) REFERENCES `Books` (`book_id`);

ALTER TABLE `BookAuthors` ADD FOREIGN KEY (`author_id`) REFERENCES `Authors` (`author_id`);

ALTER TABLE `Accounts` ADD FOREIGN KEY (`role_id`) REFERENCES `Roles` (`role_id`);
