/*============================== CREATE DATABASE =======================================*/
/*======================================================================================*/
DROP DATABASE IF EXISTS heroku_1f3b8eab4ddb340;
CREATE DATABASE heroku_1f3b8eab4ddb340;
USE heroku_1f3b8eab4ddb340;
/*============================== CREATE TABLE=== =======================================*/
/*======================================================================================*/

-- create table 1: Account
DROP TABLE IF EXISTS `Account`;
CREATE TABLE `Account`(
	account_id 		INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username		VARCHAR(50) NOT NULL UNIQUE KEY,
    fullname		VARCHAR(50) NOT NULL,
    gender			ENUM('Male', 'Female', 'Unknow') DEFAULT 'Unknow',
    email			VARCHAR(100) NOT NULL UNIQUE KEY,
    phone_number	CHAR(12),
    address			VARCHAR(500) ,
    path_image		VARCHAR(100),
    `password`		VARCHAR(255) DEFAULT '$2a$12$xZUN2GTv3pg7x1YFq8CiSuXZTitxj1XvJggmuU9D5Dx65FD93jabm',
	`role`			ENUM('Admin', 'User') DEFAULT 'User',
	`status`		ENUM('Active', 'Not_Active') DEFAULT 'Not_Active' ,
	register_date	DATETIME DEFAULT NOW()
);

-- create table 3: ProductRam
DROP TABLE IF EXISTS ProductRam;
CREATE TABLE ProductRam(
	productRam_id	SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ram_name		VARCHAR(100) NOT NULL UNIQUE KEY
);

-- create table 3: ProductMemory
DROP TABLE IF EXISTS ProductMemory;
CREATE TABLE ProductMemory(
	productMemory_id	SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    memory_name			VARCHAR(100) NOT NULL UNIQUE KEY
);

-- create table 3: ProductBrand
DROP TABLE IF EXISTS ProductBrand;
CREATE TABLE ProductBrand(
	productBrand_id		SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    brand_name			VARCHAR(100) NOT NULL UNIQUE KEY
);

-- create table 2: Product
DROP TABLE IF EXISTS Product;
CREATE TABLE Product(
	product_id			INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_name		VARCHAR(100) NOT NULL,
    `description`		NVARCHAR(1000),
    discount			SMALLINT UNSIGNED DEFAULT '0',
    price				DOUBLE UNSIGNED NOT NULL,
    camera				VARCHAR(50),
    color				VARCHAR(50),
    screenSize			VARCHAR(50),
    operatingSystem		VARCHAR(50),
    chip				VARCHAR(50),
    battery				VARCHAR(50),
    sim					VARCHAR(50),
    productRam_id		SMALLINT UNSIGNED,
    productMemory_id	SMALLINT UNSIGNED,
    productBrand_id		SMALLINT UNSIGNED,
    category			VARCHAR(100) NOT NULL,
    quantity			MEDIUMINT UNSIGNED NOT NULL,
	path_image			VARCHAR(200),
    enter_date			DATETIME DEFAULT NOW(),
    FOREIGN KEY(productRam_id)  REFERENCES ProductRam(productRam_id),
    FOREIGN KEY(productMemory_id)  REFERENCES ProductMemory(productMemory_id),
    FOREIGN KEY(productBrand_id)  REFERENCES ProductBrand(productBrand_id)
);

-- create table 3: ProductImage
DROP TABLE IF EXISTS ProductImage;
CREATE TABLE ProductImage(
	image_id		INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    path_image		VARCHAR(200),
	product_id		INT UNSIGNED NOT NULL,
    FOREIGN KEY(product_id)  REFERENCES Product(product_id)
);

-- create table 4: Register token
DROP TABLE IF EXISTS `Registation_Account_Token`;
CREATE TABLE `Registation_Account_Token`(
	id				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    token			CHAR(50) NOT NULL UNIQUE KEY,
    user_id			INT UNSIGNED NOT NULL,
	expiryDate		DATETIME NOT NULL,
	FOREIGN KEY(user_id)  REFERENCES `Account`(account_id)
);

DROP TABLE IF EXISTS `Reset_Password_Token`;
CREATE TABLE `Reset_Password_Token`(
	id				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    token			CHAR(50) NOT NULL UNIQUE KEY,
    user_id			INT UNSIGNED NOT NULL,
	expiryDate		DATETIME NOT NULL,
	FOREIGN KEY(user_id)  REFERENCES `Account`(account_id)
);

-- create table 5: Cart
DROP TABLE IF EXISTS Cart;
CREATE TABLE Cart(
	cart_id			INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    quantity		INT UNSIGNED,
    total_price		DOUBLE	UNSIGNED,
	user_id			INT UNSIGNED NOT NULL,
    FOREIGN KEY(user_id)  REFERENCES `Account`(account_id)
);

-- create table 6: CartDetail
DROP TABLE IF EXISTS CartDetail;
CREATE TABLE CartDetail(
	cartdetail_id		INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    price				DOUBLE UNSIGNED NOT NULL,
    quantity			INT UNSIGNED NOT NULL,
    cart_id				INT UNSIGNED,
    product_id			INT UNSIGNED,
    `status`			ENUM('Order', 'Not_Order') DEFAULT 'Not_Order' ,
	FOREIGN KEY(cart_id)  REFERENCES Cart(cart_id),
    FOREIGN KEY(product_id)  REFERENCES Product(product_id) ON DELETE NO ACTION
);

-- create table 7: Order
DROP TABLE IF EXISTS `Order`;
CREATE TABLE `Order`(
	order_id		INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `description`	NVARCHAR(1000),
    fullname		NVARCHAR(50) NOT NULL,
    quantity		SMALLINT UNSIGNED NOT NULL,
    total_price		DOUBLE UNSIGNED NOT NULL,
    address			VARCHAR(500) NOT NULL,
    phone			CHAR(12) NOT NULL,
    user_id			INT UNSIGNED NOT NULL,
    order_date		DATETIME DEFAULT NOW(),
    `Status`		ENUM('Active', 'Not_Active', 'End', 'Delete') DEFAULT 'Not_Active',
    FOREIGN KEY(user_id)  REFERENCES `Account`(account_id)
);

-- create table 8: OrderDetail
DROP TABLE IF EXISTS OrderDetail;
CREATE TABLE OrderDetail(
	orderdetail_id	INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    price			DOUBLE UNSIGNED NOT NULL,
    quantity		SMALLINT UNSIGNED NOT NULL,
    order_id		INT UNSIGNED NOT NULL,
    product_id		INT UNSIGNED NOT NULL,
	FOREIGN KEY(order_id)  REFERENCES `Order`(order_id),
    FOREIGN KEY(product_id)  REFERENCES Product(product_id)
);

-- create table 9: Rate
DROP TABLE IF EXISTS Rate;
CREATE TABLE Rate(
	rate_id			INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    star			DOUBLE UNSIGNED,
    `comment`		VARCHAR(255),
    rate_date		DATETIME DEFAULT NOW(),
    user_id			INT UNSIGNED NOT NULL,		
    product_id		INT UNSIGNED NOT NULL,
	FOREIGN KEY(user_id)  REFERENCES `Account`(account_id),
	FOREIGN KEY(product_id)  REFERENCES Product(product_id)
);

INSERT INTO `heroku_1f3b8eab4ddb340`.`account` (`username`, 		`fullname`, 	`email`, 		`phone_number`, `role`, `status`) 
VALUES 								('adminaccount', 'adminaccount', 'admin1@gmail.com', '0961271391', 'Admin', 'Active'),
									('useraccount',  'useraccount', 'account1@gmail.com', '0983631931', 'User', 'Active');
                                    
INSERT INTO `heroku_1f3b8eab4ddb340`.`cart` (`quantity`, `total_price`, `user_id`) 
VALUES 								('0', 		'0', 	'5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`cart` (`quantity`, `total_price`, `user_id`) 
VALUES 								('0', '0', '15');

INSERT INTO `heroku_1f3b8eab4ddb340`.`productbrand` (`brand_name`) 
VALUES 										('Apple'),
											('SamSung'),
                                            ('Xiaomi'),
                                            ('Oppo'),
                                            ('ViVo');
                                            
INSERT INTO `heroku_1f3b8eab4ddb340`.`productmemory` (`memory_name`) 
VALUES 										('16gb'),	
											('32gb'),
                                            ('64gb'),
                                            ('128gb'),
                                            ('256gb'),
                                            ('512gb');
                                            
INSERT INTO `heroku_1f3b8eab4ddb340`.`productram` (`ram_name`) 
VALUES 									('2gb'),   
										('4gb'),
                                        ('6gb'),
                                        ('8gb'),
										('12gb');
                                        
INSERT INTO `heroku_1f3b8eab4ddb340`.`product` (`product_name`, 		`price`, 	`productRam_id`, `productMemory_id`, `productBrand_id`, `category`, 	`quantity`) 
VALUES 								('Iphone 11 ', 			'15000000', 		'45', 				'45', 				'5', 		'Phone', 		'50'),
									('Iphone XR',			'12490000', 		'35', 				'35', 				'5', 		'Phone', 		'50'),			
                                    ('Iphone 8 Plus', 		'8000000', 			'25', 				'25', 				'5', 		'Phone', 		'50'),	
                                    ('Xiaomi Redmi 10', 	'3600000', 			'15', 				'5', 				'25', 		'Phone', 		'50'),	
                                    ('Xiaomi Mi 11', 		'16000000', 		'35', 				'35', 				'25', 		'Phone', 		'50'),	
                                    ('ViVo Y53', 			'6990000', 			'25', 				'35', 				'45', 		'Phone', 		'50'),	
                                    ('SamSung Galaxy Z',	'30000000', 		'45', 				'45', 				'15', 		'Phone', 		'50'),	
                                    ('SamSung Galaxy S', 	'20000000', 		'45', 				'35', 				'15', 		'Phone', 		'50'),
                                    ('Oppo Renno6', 		'9600000', 			'25', 				'15', 				'35', 		'Phone', 		'50'),	
                                    ('Oppo A74', 			'6600000', 			'15', 				'15', 				'35', 		'Phone', 		'50');								

UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '20' WHERE (`product_id` = '5');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '30' WHERE (`product_id` = '15');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '20' WHERE (`product_id` = '25');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '25' WHERE (`product_id` = '45');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '10' WHERE (`product_id` = '55');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '20' WHERE (`product_id` = '65');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '20' WHERE (`product_id` = '75');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '10' WHERE (`product_id` = '85');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '10' WHERE (`product_id` = '95');
INSERT INTO `heroku_1f3b8eab4ddb340`.`product` (`product_name`, 		`price`, 	`productRam_id`, `productMemory_id`, `productBrand_id`, `category`, 	`quantity`) 
VALUES 								('Iphone 11 ', 			'15000000', 		'45', 				'45', 				'5', 		'Phone', 		'50'),
									('Iphone XR',			'12490000', 		'35', 				'35', 				'5', 		'Phone', 		'50'),			
                                    ('Iphone 8 Plus', 		'8000000', 			'25', 				'25', 				'5', 		'Phone', 		'50'),	
                                    ('Xiaomi Redmi 10', 	'3600000', 			'15', 				'5', 				'25', 		'Phone', 		'50'),	
                                    ('Xiaomi Mi 11', 		'16000000', 		'35', 				'35', 				'25', 		'Phone', 		'50'),	
                                    ('ViVo Y53', 			'6990000', 			'25', 				'35', 				'45', 		'Phone', 		'50'),	
                                    ('SamSung Galaxy Z',	'30000000', 		'45', 				'45', 				'15', 		'Phone', 		'50'),	
                                    ('SamSung Galaxy S', 	'20000000', 		'45', 				'35', 				'15', 		'Phone', 		'50'),
                                    ('Oppo Renno6', 		'9600000', 			'25', 				'15', 				'35', 		'Phone', 		'50'),	
                                    ('Oppo A74', 			'6600000', 			'15', 				'15', 				'35', 		'Phone', 		'50');	
                                    INSERT INTO `heroku_1f3b8eab4ddb340`.`product` (`product_name`, 		`price`, 	`productRam_id`, `productMemory_id`, `productBrand_id`, `category`, 	`quantity`) 
VALUES 								('Iphone 11 ', 			'15000000', 		'45', 				'45', 				'5', 		'Phone', 		'50'),
									('Iphone XR',			'12490000', 		'35', 				'35', 				'5', 		'Phone', 		'50'),			
                                    ('Iphone 8 Plus', 		'8000000', 			'25', 				'25', 				'5', 		'Phone', 		'50'),	
                                    ('Xiaomi Redmi 10', 	'3600000', 			'15', 				'5', 				'25', 		'Phone', 		'50'),	
                                    ('Xiaomi Mi 11', 		'16000000', 		'35', 				'35', 				'25', 		'Phone', 		'50'),	
                                    ('ViVo Y53', 			'6990000', 			'25', 				'35', 				'45', 		'Phone', 		'50'),	
                                    ('SamSung Galaxy Z',	'30000000', 		'45', 				'45', 				'15', 		'Phone', 		'50'),	
                                    ('SamSung Galaxy S', 	'20000000', 		'45', 				'35', 				'15', 		'Phone', 		'50'),
                                    ('Oppo Renno6', 		'9600000', 			'25', 				'15', 				'35', 		'Phone', 		'50'),	
                                    ('Oppo A74', 			'6600000', 			'15', 				'15', 				'35', 		'Phone', 		'50');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '30' WHERE (`product_id` = '105');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '25' WHERE (`product_id` = '115');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '25' WHERE (`product_id` = '125');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '20' WHERE (`product_id` = '135');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '20' WHERE (`product_id` = '145');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '30' WHERE (`product_id` = '155');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '10' WHERE (`product_id` = '165');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '50' WHERE (`product_id` = '175');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '20' WHERE (`product_id` = '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-cautao-camera.jpg', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chinhvideo.jpg', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chuyenvideo.gif', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-quayvideo.gif', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-night-mode.jpg', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chandung.jpg', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-smarthdr.jpg', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-slofie.jpg', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-gocsieurong.jpg', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-sacnhanh.jpg', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chip.jpg', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chongnuoc.jpg', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '5');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-thietke-2.jpg', '15');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-manhinh-2.jpg', '15');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-hieunang.jpg', '15');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/vi-vn-iphone-xr-camera.jpg', '15');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/vi-vn-iphone-xr-loa.jpg', '15');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '15');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/-iphone-8-plus-128gb-slider.jpg', '25');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-thietke.jpg', '25');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-manhinh.jpg', '25');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-cauhinh.jpg', '25');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-camerasau.jpg', '25');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-selfie.jpg', '25');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-vantay.jpg', '25');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-3dtouch.jpg', '25');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-sackhongday.jpg', '25');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-DDNB1-1020x570-1.jpg', '35');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620122.jpg', '35');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-cu%CC%A3m-camera-1020x570.jpg', '35');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620139.jpg', '35');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-ma%CC%80nhi%CC%80nh-1-1020x570.jpg', '35');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620120.jpg', '35');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620126.jpg', '35');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620125.jpg', '35');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620121.jpg', '35');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-06201310.jpg', '35');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620124.jpg', '35');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '35');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-tinhnang-slider.jpg', '45');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-thietke-slider.jpg', '45');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-cauhinh-slider.jpg', '45');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-sacnhanh-slider.jpg', '45');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-tansoquet-slider.jpg', '45');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-wifi-6-slider.jpg', '45');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-manhinh-slider.jpg', '45');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-camera-slider.jpg', '45');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-pin-slider.jpg', '45');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '45');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-tongquan.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-man-hinh.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-mong-nhe.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-camera-sau.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-laynet.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/Vivo-Y53s-chupdem-780x433.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-chongrung.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-cauhinh.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-ram.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-luutru.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-multiturbo.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-thiet-ke.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-pinsac.jpg', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '55');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold-3-slider-tong-quan-1020x570.jpg', '65');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207383.jpg', '65');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207395.jpg', '65');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207409.jpg', '65');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-02074111.jpg', '65');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207396.jpg', '65');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207381.jpg', '65');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207382.jpg', '65');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207394.jpg', '65');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207380.jpg', '65');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207398.jpg', '65');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207397.jpg', '65');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-bac-da-sac-tinhnang.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-thietke.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-cameramoi.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-gocrong.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-khaudo.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-vantay.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-sackhongday.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-game.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh-1.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh-2.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-aremoji.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-amthanh.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bixby.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bixbyvision.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bonho.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-tienich.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-sim.jpg', '75');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-tinhnang-1-1020x570.jpg', '85');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-slider-man-hinh1-1020x570.jpg', '85');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-manhinh-slider.jpg', '85');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-camera-slider.jpg', '85');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-chupnhanh-slider.jpg', '85');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-quaydem1-slider-1020x570.jpg', '85');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-soloopslider.jpg', '85');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-thietke1-slider-1020x570.jpg', '85');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-tinhnang-chip.jpg', '85');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-lamamt-slider.jpg', '85');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-tinhnang-pin.jpg', '85');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-sacnhanh-slider.jpg', '85');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-tinhnang-slider.jpg', '95');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-manhin-slider.jpg', '95');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-thietke-slider.jpg', '95');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-camera-slider.jpg', '95');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-boloc-slider.jpg', '95');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-cauhinh-slider.jpg', '95');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-pinsac-slider.jpg', '95');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/oppo-A74-4G-gamefocus-slider-780x433.jpg', '95');
--
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-cautao-camera.jpg', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chinhvideo.jpg', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chuyenvideo.gif', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-quayvideo.gif', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-night-mode.jpg', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chandung.jpg', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-smarthdr.jpg', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-slofie.jpg', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-gocsieurong.jpg', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-sacnhanh.jpg', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chip.jpg', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chongnuoc.jpg', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '105');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-thietke-2.jpg', '115');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-manhinh-2.jpg', '115');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-hieunang.jpg', '115');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/vi-vn-iphone-xr-camera.jpg', '115');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/vi-vn-iphone-xr-loa.jpg', '115');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '115');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/-iphone-8-plus-128gb-slider.jpg', '125');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-thietke.jpg', '125');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-manhinh.jpg', '125');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-cauhinh.jpg', '125');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-camerasau.jpg', '125');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-selfie.jpg', '125');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-vantay.jpg', '125');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-3dtouch.jpg', '125');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-sackhongday.jpg', '125');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-DDNB1-1020x570-1.jpg', '135');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620122.jpg', '135');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-cu%CC%A3m-camera-1020x570.jpg', '135');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620139.jpg', '135');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-ma%CC%80nhi%CC%80nh-1-1020x570.jpg', '135');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620120.jpg', '135');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620126.jpg', '135');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620125.jpg', '135');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620121.jpg', '135');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-06201310.jpg', '135');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620124.jpg', '135');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '135');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-tinhnang-slider.jpg', '145');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-thietke-slider.jpg', '145');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-cauhinh-slider.jpg', '145');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-sacnhanh-slider.jpg', '145');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-tansoquet-slider.jpg', '145');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-wifi-6-slider.jpg', '145');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-manhinh-slider.jpg', '145');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-camera-slider.jpg', '145');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-pin-slider.jpg', '145');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '145');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-tongquan.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-man-hinh.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-mong-nhe.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-camera-sau.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-laynet.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/Vivo-Y53s-chupdem-780x433.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-chongrung.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-cauhinh.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-ram.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-luutru.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-multiturbo.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-thiet-ke.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-pinsac.jpg', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '155');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold-3-slider-tong-quan-1020x570.jpg', '165');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207383.jpg', '165');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207395.jpg', '165');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207409.jpg', '165');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-02074111.jpg', '165');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207396.jpg', '165');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207381.jpg', '165');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207382.jpg', '165');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207394.jpg', '165');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207380.jpg', '165');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207398.jpg', '165');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207397.jpg', '165');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-bac-da-sac-tinhnang.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-thietke.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-cameramoi.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-gocrong.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-khaudo.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-vantay.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-sackhongday.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-game.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh-1.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh-2.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-aremoji.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-amthanh.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bixby.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bixbyvision.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bonho.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-tienich.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-sim.jpg', '175');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-tinhnang-1-1020x570.jpg', '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-slider-man-hinh1-1020x570.jpg', '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-manhinh-slider.jpg', '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-camera-slider.jpg', '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-chupnhanh-slider.jpg', '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-quaydem1-slider-1020x570.jpg', '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-soloopslider.jpg', '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-thietke1-slider-1020x570.jpg', '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-tinhnang-chip.jpg', '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-lamamt-slider.jpg', '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-tinhnang-pin.jpg', '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-sacnhanh-slider.jpg', '185');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-tinhnang-slider.jpg', '195');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-manhin-slider.jpg', '195');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-thietke-slider.jpg', '195');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-camera-slider.jpg', '195');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-boloc-slider.jpg', '195');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-cauhinh-slider.jpg', '195');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-pinsac-slider.jpg', '195');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/oppo-A74-4G-gamefocus-slider-780x433.jpg', '195'); 
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-cautao-camera.jpg', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chinhvideo.jpg', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chuyenvideo.gif', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-quayvideo.gif', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-night-mode.jpg', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chandung.jpg', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-smarthdr.jpg', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-slofie.jpg', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-gocsieurong.jpg', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-sacnhanh.jpg', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chip.jpg', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chongnuoc.jpg', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '205');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-thietke-2.jpg', '215');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-manhinh-2.jpg', '215');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-hieunang.jpg', '215');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/vi-vn-iphone-xr-camera.jpg', '215');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/vi-vn-iphone-xr-loa.jpg', '215');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '215');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/-iphone-8-plus-128gb-slider.jpg', '225');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-thietke.jpg', '225');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-manhinh.jpg', '225');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-cauhinh.jpg', '225');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-camerasau.jpg', '225');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-selfie.jpg', '225');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-vantay.jpg', '225');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-3dtouch.jpg', '225');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-sackhongday.jpg', '225');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-DDNB1-1020x570-1.jpg', '235');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620122.jpg', '235');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-cu%CC%A3m-camera-1020x570.jpg', '235');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620139.jpg', '235');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-ma%CC%80nhi%CC%80nh-1-1020x570.jpg', '235');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620120.jpg', '235');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620126.jpg', '235');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620125.jpg', '235');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620121.jpg', '235');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-06201310.jpg', '235');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620124.jpg', '235');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '235');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-tinhnang-slider.jpg', '245');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-thietke-slider.jpg', '245');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-cauhinh-slider.jpg', '245');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-sacnhanh-slider.jpg', '245');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-tansoquet-slider.jpg', '245');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-wifi-6-slider.jpg', '245');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-manhinh-slider.jpg', '245');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-camera-slider.jpg', '245');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-pin-slider.jpg', '245');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '245');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-tongquan.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-man-hinh.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-mong-nhe.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-camera-sau.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-laynet.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/Vivo-Y53s-chupdem-780x433.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-chongrung.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-cauhinh.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-ram.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-luutru.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-multiturbo.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-thiet-ke.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-pinsac.jpg', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '255');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold-3-slider-tong-quan-1020x570.jpg', '265');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207383.jpg', '265');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207395.jpg', '265');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207409.jpg', '265');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-02074111.jpg', '265');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207396.jpg', '265');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207381.jpg', '265');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207382.jpg', '265');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207394.jpg', '265');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207380.jpg', '265');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207398.jpg', '265');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207397.jpg', '265');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-bac-da-sac-tinhnang.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-thietke.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-cameramoi.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-gocrong.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-khaudo.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-vantay.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-sackhongday.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-game.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh-1.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh-2.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-aremoji.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-amthanh.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bixby.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bixbyvision.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bonho.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-tienich.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-sim.jpg', '275');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-tinhnang-1-1020x570.jpg', '285');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-slider-man-hinh1-1020x570.jpg', '285');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-manhinh-slider.jpg', '285');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-camera-slider.jpg', '285');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-chupnhanh-slider.jpg', '285');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-quaydem1-slider-1020x570.jpg', '285');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-soloopslider.jpg', '285');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-thietke1-slider-1020x570.jpg', '285');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-tinhnang-chip.jpg', '285');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-lamamt-slider.jpg', '285');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-tinhnang-pin.jpg', '285');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-sacnhanh-slider.jpg', '285');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-tinhnang-slider.jpg', '295');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-manhin-slider.jpg', '295');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-thietke-slider.jpg', '295');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-camera-slider.jpg', '295');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-boloc-slider.jpg', '295');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-cauhinh-slider.jpg', '295');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-pinsac-slider.jpg', '295');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/oppo-A74-4G-gamefocus-slider-780x433.jpg', '295');
       
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/153856/iphone-xi-do-600x600.jpg' WHERE (`product_id` = '5');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/191483/iphone-xr-128gb-600x600.jpg' WHERE (`product_id` = '15');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/114114/iphone-8-plus-256gb-hh-600x600-600x600-600x600.jpg' WHERE (`product_id` = '25');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/249080/redmi-10-gray-600x600.jpg' WHERE (`product_id` = '35');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/226264/xiaomi-mi-11-xanhduong-600x600-600x600.jpg' WHERE (`product_id` = '45');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/240286/vivo-y53s-xanh-600x600.jpg' WHERE (`product_id` = '55');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/248284/samsung-galaxy-z-fold-3-green-1-600x600.jpg' WHERE (`product_id` = '65');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/179530/samsung-galaxy-s10-plus-white-600x600.jpg' WHERE (`product_id` = '75');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/236186/oppo-reno6-5g-aurora-600x600.jpg' WHERE (`product_id` = '85');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/235653/oppo-a74-blue-9-600x600.jpg' WHERE (`product_id` = '95');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/153856/iphone-xi-do-600x600.jpg' WHERE (`product_id` = '105');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/153856/iphone-xi-do-600x600.jpg' WHERE (`product_id` = '205');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/191483/iphone-xr-128gb-600x600.jpg' WHERE (`product_id` = '115');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/191483/iphone-xr-128gb-600x600.jpg' WHERE (`product_id` = '215');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/114114/iphone-8-plus-256gb-hh-600x600-600x600-600x600.jpg' WHERE (`product_id` = '125');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/114114/iphone-8-plus-256gb-hh-600x600-600x600-600x600.jpg' WHERE (`product_id` = '225');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/249080/redmi-10-gray-600x600.jpg' WHERE (`product_id` = '135');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/249080/redmi-10-gray-600x600.jpg' WHERE (`product_id` = '235');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/226264/xiaomi-mi-11-xanhduong-600x600-600x600.jpg' WHERE (`product_id` = '145');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/226264/xiaomi-mi-11-xanhduong-600x600-600x600.jpg' WHERE (`product_id` = '245');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/240286/vivo-y53s-xanh-600x600.jpg' WHERE (`product_id` = '155');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/240286/vivo-y53s-xanh-600x600.jpg' WHERE (`product_id` = '255');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/248284/samsung-galaxy-z-fold-3-green-1-600x600.jpg' WHERE (`product_id` = '165');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/248284/samsung-galaxy-z-fold-3-green-1-600x600.jpg' WHERE (`product_id` = '265');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/179530/samsung-galaxy-s10-plus-white-600x600.jpg' WHERE (`product_id` = '175');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/179530/samsung-galaxy-s10-plus-white-600x600.jpg' WHERE (`product_id` = '275');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/236186/oppo-reno6-5g-aurora-600x600.jpg' WHERE (`product_id` = '185');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/236186/oppo-reno6-5g-aurora-600x600.jpg' WHERE (`product_id` = '285');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/235653/oppo-a74-blue-9-600x600.jpg' WHERE (`product_id` = '195');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/235653/oppo-a74-blue-9-600x600.jpg' WHERE (`product_id` = '295');