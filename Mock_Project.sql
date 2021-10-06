/*============================== CREATE DATABASE =======================================*/
/*======================================================================================*/
DROP DATABASE IF EXISTS Mock_Project;
CREATE DATABASE Mock_Project;
USE Mock_Project;
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

INSERT INTO `mock_project`.`account` (`username`, 		`fullname`, 	`email`, 		`phone_number`, `role`, `status`) 
VALUES 								('adminaccount', 'adminaccount', 'admin1@gmail.com', '0961271391', 'Admin', 'Active'),
									('useraccount',  'useraccount', 'account1@gmail.com', '0983631931', 'User', 'Active');
                                    
INSERT INTO `mock_project`.`cart` (`quantity`, `total_price`, `user_id`) 
VALUES 								('3', 		'35490000', 	'1');
INSERT INTO `mock_project`.`cart` (`quantity`, `total_price`, `user_id`) 
VALUES 								('0', '0', '2');

INSERT INTO `mock_project`.`productbrand` (`brand_name`) 
VALUES 										('Apple'),
											('SamSung'),
                                            ('Xiaomi'),
                                            ('Oppo'),
                                            ('ViVo');
                                            
INSERT INTO `mock_project`.`productmemory` (`memory_name`) 
VALUES 										('16gb'),	
											('32gb'),
                                            ('64gb'),
                                            ('128gb'),
                                            ('256gb'),
                                            ('512gb');
                                            
INSERT INTO `mock_project`.`productram` (`ram_name`) 
VALUES 									('2gb'),   
										('4gb'),
                                        ('6gb'),
                                        ('8gb'),
										('12gb');
                                        
INSERT INTO `mock_project`.`product` (`product_name`, 		`price`, 	`productRam_id`, `productMemory_id`, `productBrand_id`, `category`, 	`quantity`) 
VALUES 								('Iphone 11 ', 			'15000000', 		'5', 				'5', 				'1', 		'Phone', 		'50'),
									('Iphone XR',			'12490000', 		'4', 				'4', 				'1', 		'Phone', 		'50'),			
                                    ('Iphone 8 Plus', 		'8000000', 			'3', 				'3', 				'1', 		'Phone', 		'50'),	
                                    ('Xiaomi Redmi 10', 	'3600000', 			'2', 				'1', 				'3', 		'Phone', 		'50'),	
                                    ('Xiaomi Mi 11', 		'16000000', 		'4', 				'4', 				'3', 		'Phone', 		'50'),	
                                    ('ViVo Y53', 			'6990000', 			'3', 				'4', 				'5', 		'Phone', 		'50'),	
                                    ('SamSung Galaxy Z',	'30000000', 		'5', 				'5', 				'2', 		'Phone', 		'50'),	
                                    ('SamSung Galaxy S', 	'20000000', 		'5', 				'4', 				'2', 		'Phone', 		'50'),
                                    ('Oppo Renno6', 		'9600000', 			'3', 				'2', 				'4', 		'Phone', 		'50'),	
                                    ('Oppo A74', 			'6600000', 			'2', 				'2', 				'4', 		'Phone', 		'50');	

UPDATE `mock_project`.`product` SET `path_image` = '1624773227391.jpg' WHERE (`product_id` = '1');							
									
INSERT INTO `mock_project`.`cartdetail` (`price`, `quantity`, `cart_id`, `product_id`, `status`) 
VALUES 									('15000000', '1', 		'1', 		'1', 		'Order'),
										('12490000', '1',		'1', 		'2', 		'Order'),
                                        ('8000000',  '1', 		'1', 		'3', 		'Order');

UPDATE `mock_project`.`product` SET `discount` = '20' WHERE (`product_id` = '1');
UPDATE `mock_project`.`product` SET `discount` = '30' WHERE (`product_id` = '2');
UPDATE `mock_project`.`product` SET `discount` = '20' WHERE (`product_id` = '3');
UPDATE `mock_project`.`product` SET `discount` = '25' WHERE (`product_id` = '5');
UPDATE `mock_project`.`product` SET `discount` = '10' WHERE (`product_id` = '6');
UPDATE `mock_project`.`product` SET `discount` = '20' WHERE (`product_id` = '7');
UPDATE `mock_project`.`product` SET `discount` = '20' WHERE (`product_id` = '8');
UPDATE `mock_project`.`product` SET `discount` = '10' WHERE (`product_id` = '9');
UPDATE `mock_project`.`product` SET `discount` = '10' WHERE (`product_id` = '10');
INSERT INTO `mock_project`.`product` (`product_name`, 		`price`, 	`productRam_id`, `productMemory_id`, `productBrand_id`, `category`, 	`quantity`) 
VALUES 								('Iphone 11 ', 			'15000000', 		'5', 				'5', 				'1', 		'Phone', 		'50'),
									('Iphone XR',			'12490000', 		'4', 				'4', 				'1', 		'Phone', 		'50'),			
                                    ('Iphone 8 Plus', 		'8000000', 			'3', 				'3', 				'1', 		'Phone', 		'50'),	
                                    ('Xiaomi Redmi 10', 	'3600000', 			'2', 				'1', 				'3', 		'Phone', 		'50'),	
                                    ('Xiaomi Mi 11', 		'16000000', 		'4', 				'4', 				'3', 		'Phone', 		'50'),	
                                    ('ViVo Y53', 			'6990000', 			'3', 				'4', 				'5', 		'Phone', 		'50'),	
                                    ('SamSung Galaxy Z',	'30000000', 		'5', 				'5', 				'2', 		'Phone', 		'50'),	
                                    ('SamSung Galaxy S', 	'20000000', 		'5', 				'4', 				'2', 		'Phone', 		'50'),
                                    ('Oppo Renno6', 		'9600000', 			'3', 				'2', 				'4', 		'Phone', 		'50'),	
                                    ('Oppo A74', 			'6600000', 			'2', 				'2', 				'4', 		'Phone', 		'50');	
                                    INSERT INTO `mock_project`.`product` (`product_name`, 		`price`, 	`productRam_id`, `productMemory_id`, `productBrand_id`, `category`, 	`quantity`) 
VALUES 								('Iphone 11 ', 			'15000000', 		'5', 				'5', 				'1', 		'Phone', 		'50'),
									('Iphone XR',			'12490000', 		'4', 				'4', 				'1', 		'Phone', 		'50'),			
                                    ('Iphone 8 Plus', 		'8000000', 			'3', 				'3', 				'1', 		'Phone', 		'50'),	
                                    ('Xiaomi Redmi 10', 	'3600000', 			'2', 				'1', 				'3', 		'Phone', 		'50'),	
                                    ('Xiaomi Mi 11', 		'16000000', 		'4', 				'4', 				'3', 		'Phone', 		'50'),	
                                    ('ViVo Y53', 			'6990000', 			'3', 				'4', 				'5', 		'Phone', 		'50'),	
                                    ('SamSung Galaxy Z',	'30000000', 		'5', 				'5', 				'2', 		'Phone', 		'50'),	
                                    ('SamSung Galaxy S', 	'20000000', 		'5', 				'4', 				'2', 		'Phone', 		'50'),
                                    ('Oppo Renno6', 		'9600000', 			'3', 				'2', 				'4', 		'Phone', 		'50'),	
                                    ('Oppo A74', 			'6600000', 			'2', 				'2', 				'4', 		'Phone', 		'50');
UPDATE `mock_project`.`product` SET `discount` = '30' WHERE (`product_id` = '1');
UPDATE `mock_project`.`product` SET `discount` = '25' WHERE (`product_id` = '2');
UPDATE `mock_project`.`product` SET `discount` = '25' WHERE (`product_id` = '3');
UPDATE `mock_project`.`product` SET `discount` = '20' WHERE (`product_id` = '4');
UPDATE `mock_project`.`product` SET `discount` = '20' WHERE (`product_id` = '5');
UPDATE `mock_project`.`product` SET `discount` = '30' WHERE (`product_id` = '6');
UPDATE `mock_project`.`product` SET `discount` = '10' WHERE (`product_id` = '7');
UPDATE `mock_project`.`product` SET `discount` = '50' WHERE (`product_id` = '8');
UPDATE `mock_project`.`product` SET `discount` = '20' WHERE (`product_id` = '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-cautao-camera.jpg', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chinhvideo.jpg', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chuyenvideo.gif', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-quayvideo.gif', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-night-mode.jpg', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chandung.jpg', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-smarthdr.jpg', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-slofie.jpg', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-gocsieurong.jpg', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-sacnhanh.jpg', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chip.jpg', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chongnuoc.jpg', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '1');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-thietke-2.jpg', '2');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-manhinh-2.jpg', '2');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-hieunang.jpg', '2');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/vi-vn-iphone-xr-camera.jpg', '2');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/vi-vn-iphone-xr-loa.jpg', '2');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '2');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/-iphone-8-plus-128gb-slider.jpg', '3');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-thietke.jpg', '3');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-manhinh.jpg', '3');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-cauhinh.jpg', '3');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-camerasau.jpg', '3');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-selfie.jpg', '3');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-vantay.jpg', '3');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-3dtouch.jpg', '3');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-sackhongday.jpg', '3');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-DDNB1-1020x570-1.jpg', '4');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620122.jpg', '4');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-cu%CC%A3m-camera-1020x570.jpg', '4');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620139.jpg', '4');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-ma%CC%80nhi%CC%80nh-1-1020x570.jpg', '4');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620120.jpg', '4');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620126.jpg', '4');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620125.jpg', '4');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620121.jpg', '4');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-06201310.jpg', '4');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620124.jpg', '4');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '4');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-tinhnang-slider.jpg', '5');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-thietke-slider.jpg', '5');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-cauhinh-slider.jpg', '5');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-sacnhanh-slider.jpg', '5');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-tansoquet-slider.jpg', '5');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-wifi-6-slider.jpg', '5');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-manhinh-slider.jpg', '5');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-camera-slider.jpg', '5');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-pin-slider.jpg', '5');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '5');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-tongquan.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-man-hinh.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-mong-nhe.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-camera-sau.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-laynet.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/Vivo-Y53s-chupdem-780x433.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-chongrung.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-cauhinh.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-ram.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-luutru.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-multiturbo.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-thiet-ke.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-pinsac.jpg', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '6');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold-3-slider-tong-quan-1020x570.jpg', '7');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207383.jpg', '7');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207395.jpg', '7');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207409.jpg', '7');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-02074111.jpg', '7');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207396.jpg', '7');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207381.jpg', '7');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207382.jpg', '7');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207394.jpg', '7');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207380.jpg', '7');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207398.jpg', '7');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207397.jpg', '7');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-bac-da-sac-tinhnang.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-thietke.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-cameramoi.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-gocrong.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-khaudo.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-vantay.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-sackhongday.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-game.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh-1.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh-2.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-aremoji.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-amthanh.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bixby.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bixbyvision.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bonho.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-tienich.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-sim.jpg', '8');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-tinhnang-1-1020x570.jpg', '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-slider-man-hinh1-1020x570.jpg', '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-manhinh-slider.jpg', '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-camera-slider.jpg', '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-chupnhanh-slider.jpg', '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-quaydem1-slider-1020x570.jpg', '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-soloopslider.jpg', '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-thietke1-slider-1020x570.jpg', '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-tinhnang-chip.jpg', '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-lamamt-slider.jpg', '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-tinhnang-pin.jpg', '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-sacnhanh-slider.jpg', '9');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-tinhnang-slider.jpg', '10');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-manhin-slider.jpg', '10');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-thietke-slider.jpg', '10');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-camera-slider.jpg', '10');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-boloc-slider.jpg', '10');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-cauhinh-slider.jpg', '10');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-pinsac-slider.jpg', '10');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/oppo-A74-4G-gamefocus-slider-780x433.jpg', '10');
--
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-cautao-camera.jpg', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chinhvideo.jpg', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chuyenvideo.gif', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-quayvideo.gif', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-night-mode.jpg', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chandung.jpg', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-smarthdr.jpg', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-slofie.jpg', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-gocsieurong.jpg', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-sacnhanh.jpg', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chip.jpg', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chongnuoc.jpg', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '11');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-thietke-2.jpg', '12');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-manhinh-2.jpg', '12');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-hieunang.jpg', '12');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/vi-vn-iphone-xr-camera.jpg', '12');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/vi-vn-iphone-xr-loa.jpg', '12');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '12');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/-iphone-8-plus-128gb-slider.jpg', '13');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-thietke.jpg', '13');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-manhinh.jpg', '13');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-cauhinh.jpg', '13');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-camerasau.jpg', '13');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-selfie.jpg', '13');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-vantay.jpg', '13');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-3dtouch.jpg', '13');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-sackhongday.jpg', '13');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-DDNB1-1020x570-1.jpg', '14');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620122.jpg', '14');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-cu%CC%A3m-camera-1020x570.jpg', '14');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620139.jpg', '14');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-ma%CC%80nhi%CC%80nh-1-1020x570.jpg', '14');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620120.jpg', '14');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620126.jpg', '14');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620125.jpg', '14');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620121.jpg', '14');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-06201310.jpg', '14');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620124.jpg', '14');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '14');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-tinhnang-slider.jpg', '15');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-thietke-slider.jpg', '15');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-cauhinh-slider.jpg', '15');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-sacnhanh-slider.jpg', '15');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-tansoquet-slider.jpg', '15');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-wifi-6-slider.jpg', '15');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-manhinh-slider.jpg', '15');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-camera-slider.jpg', '15');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-pin-slider.jpg', '15');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '15');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-tongquan.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-man-hinh.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-mong-nhe.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-camera-sau.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-laynet.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/Vivo-Y53s-chupdem-780x433.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-chongrung.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-cauhinh.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-ram.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-luutru.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-multiturbo.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-thiet-ke.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-pinsac.jpg', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '16');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold-3-slider-tong-quan-1020x570.jpg', '17');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207383.jpg', '17');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207395.jpg', '17');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207409.jpg', '17');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-02074111.jpg', '17');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207396.jpg', '17');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207381.jpg', '17');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207382.jpg', '17');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207394.jpg', '17');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207380.jpg', '17');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207398.jpg', '17');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207397.jpg', '17');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-bac-da-sac-tinhnang.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-thietke.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-cameramoi.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-gocrong.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-khaudo.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-vantay.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-sackhongday.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-game.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh-1.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh-2.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-aremoji.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-amthanh.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bixby.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bixbyvision.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bonho.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-tienich.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-sim.jpg', '18');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-tinhnang-1-1020x570.jpg', '19');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-slider-man-hinh1-1020x570.jpg', '19');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-manhinh-slider.jpg', '19');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-camera-slider.jpg', '19');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-chupnhanh-slider.jpg', '19');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-quaydem1-slider-1020x570.jpg', '19');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-soloopslider.jpg', '19');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-thietke1-slider-1020x570.jpg', '19');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-tinhnang-chip.jpg', '19');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-lamamt-slider.jpg', '19');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-tinhnang-pin.jpg', '19');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-sacnhanh-slider.jpg', '19');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-tinhnang-slider.jpg', '20');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-manhin-slider.jpg', '20');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-thietke-slider.jpg', '20');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-camera-slider.jpg', '20');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-boloc-slider.jpg', '20');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-cauhinh-slider.jpg', '20');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-pinsac-slider.jpg', '20');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/oppo-A74-4G-gamefocus-slider-780x433.jpg', '20'); 
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-cautao-camera.jpg', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chinhvideo.jpg', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chuyenvideo.gif', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-quayvideo.gif', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-night-mode.jpg', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chandung.jpg', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-smarthdr.jpg', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-slofie.jpg', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-gocsieurong.jpg', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-sacnhanh.jpg', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chip.jpg', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/210644/Slider/vi-vn-iphone-11-128gb-chongnuoc.jpg', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '21');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-thietke-2.jpg', '22');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-manhinh-2.jpg', '22');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/-iphone-xr-hieunang.jpg', '22');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/vi-vn-iphone-xr-camera.jpg', '22');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/191483/Slider/vi-vn-iphone-xr-loa.jpg', '22');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '22');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/-iphone-8-plus-128gb-slider.jpg', '23');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-thietke.jpg', '23');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-manhinh.jpg', '23');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-cauhinh.jpg', '23');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-camerasau.jpg', '23');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-selfie.jpg', '23');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-vantay.jpg', '23');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-3dtouch.jpg', '23');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/225734/Slider/vi-vn-iphone-8-plus-128gb-sackhongday.jpg', '23');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-DDNB1-1020x570-1.jpg', '24');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620122.jpg', '24');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-cu%CC%A3m-camera-1020x570.jpg', '24');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620139.jpg', '24');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-ma%CC%80nhi%CC%80nh-1-1020x570.jpg', '24');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620120.jpg', '24');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620126.jpg', '24');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620125.jpg', '24');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620121.jpg', '24');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-06201310.jpg', '24');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/249080/Slider/xiaomi-redmi-10-4gb-64gb-230821-0620124.jpg', '24');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '24');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-tinhnang-slider.jpg', '25');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-thietke-slider.jpg', '25');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-cauhinh-slider.jpg', '25');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-sacnhanh-slider.jpg', '25');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-tansoquet-slider.jpg', '25');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-wifi-6-slider.jpg', '25');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-manhinh-slider.jpg', '25');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-camera-slider.jpg', '25');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/226264/Slider/vi-vn-xiaomi-mi-11-5g-pin-slider.jpg', '25');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '25');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-tongquan.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-man-hinh.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-mong-nhe.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-camera-sau.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-laynet.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/Vivo-Y53s-chupdem-780x433.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-chongrung.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-cauhinh.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-ram.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-luutru.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-multiturbo.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-thiet-ke.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/240286/Slider/vi-vn-vivo-y53s-pinsac.jpg', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/bg_csmh_tgdd-min.png?v=11', '26');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold-3-slider-tong-quan-1020x570.jpg', '27');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207383.jpg', '27');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207395.jpg', '27');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207409.jpg', '27');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-02074111.jpg', '27');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207396.jpg', '27');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207381.jpg', '27');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207382.jpg', '27');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207394.jpg', '27');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207380.jpg', '27');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207398.jpg', '27');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/248284/Slider/samsung-galaxy-z-fold3-5g-512gb-060921-0207397.jpg', '27');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-bac-da-sac-tinhnang.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-thietke.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-cameramoi.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-gocrong.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-khaudo.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-vantay.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-sackhongday.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-game.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh-1.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-manhinh-2.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-aremoji.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-amthanh.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bixby.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bixbyvision.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-bonho.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-tienich.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/203207/Slider/vi-vn-samsung-galaxy-s10-plus-128gb-bac-da-sac-sim.jpg', '28');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-tinhnang-1-1020x570.jpg', '29');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-slider-man-hinh1-1020x570.jpg', '29');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-manhinh-slider.jpg', '29');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-camera-slider.jpg', '29');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-chupnhanh-slider.jpg', '29');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-quaydem1-slider-1020x570.jpg', '29');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-soloopslider.jpg', '29');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/oppo-reno6-thietke1-slider-1020x570.jpg', '29');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-tinhnang-chip.jpg', '29');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-lamamt-slider.jpg', '29');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-tinhnang-pin.jpg', '29');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/236186/Slider/vi-vn-oppo-reno6-sacnhanh-slider.jpg', '29');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-tinhnang-slider.jpg', '30');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-manhin-slider.jpg', '30');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-thietke-slider.jpg', '30');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-camera-slider.jpg', '30');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-boloc-slider.jpg', '30');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-cauhinh-slider.jpg', '30');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/vi-vn-oppo-a74-4g-pinsac-slider.jpg', '30');
INSERT INTO `mock_project`.`productimage` (`path_image`, `product_id`) VALUES ('https://cdn.tgdd.vn/Products/Images/42/235653/Slider/oppo-A74-4G-gamefocus-slider-780x433.jpg', '30');

UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/153856/iphone-xi-do-600x600.jpg' WHERE (`product_id` = '1');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/191483/iphone-xr-128gb-600x600.jpg' WHERE (`product_id` = '2');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/114114/iphone-8-plus-256gb-hh-600x600-600x600-600x600.jpg' WHERE (`product_id` = '3');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/249080/redmi-10-gray-600x600.jpg' WHERE (`product_id` = '4');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/226264/xiaomi-mi-11-xanhduong-600x600-600x600.jpg' WHERE (`product_id` = '5');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/240286/vivo-y53s-xanh-600x600.jpg' WHERE (`product_id` = '6');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/248284/samsung-galaxy-z-fold-3-green-1-600x600.jpg' WHERE (`product_id` = '7');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/179530/samsung-galaxy-s10-plus-white-600x600.jpg' WHERE (`product_id` = '8');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/236186/oppo-reno6-5g-aurora-600x600.jpg' WHERE (`product_id` = '9');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/235653/oppo-a74-blue-9-600x600.jpg' WHERE (`product_id` = '10');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/153856/iphone-xi-do-600x600.jpg' WHERE (`product_id` = '11');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/153856/iphone-xi-do-600x600.jpg' WHERE (`product_id` = '21');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/191483/iphone-xr-128gb-600x600.jpg' WHERE (`product_id` = '12');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/191483/iphone-xr-128gb-600x600.jpg' WHERE (`product_id` = '22');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/114114/iphone-8-plus-256gb-hh-600x600-600x600-600x600.jpg' WHERE (`product_id` = '13');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/114114/iphone-8-plus-256gb-hh-600x600-600x600-600x600.jpg' WHERE (`product_id` = '23');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/249080/redmi-10-gray-600x600.jpg' WHERE (`product_id` = '14');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/249080/redmi-10-gray-600x600.jpg' WHERE (`product_id` = '24');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/226264/xiaomi-mi-11-xanhduong-600x600-600x600.jpg' WHERE (`product_id` = '15');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/226264/xiaomi-mi-11-xanhduong-600x600-600x600.jpg' WHERE (`product_id` = '25');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/240286/vivo-y53s-xanh-600x600.jpg' WHERE (`product_id` = '16');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/240286/vivo-y53s-xanh-600x600.jpg' WHERE (`product_id` = '26');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/248284/samsung-galaxy-z-fold-3-green-1-600x600.jpg' WHERE (`product_id` = '17');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/248284/samsung-galaxy-z-fold-3-green-1-600x600.jpg' WHERE (`product_id` = '27');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/179530/samsung-galaxy-s10-plus-white-600x600.jpg' WHERE (`product_id` = '18');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/179530/samsung-galaxy-s10-plus-white-600x600.jpg' WHERE (`product_id` = '28');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/236186/oppo-reno6-5g-aurora-600x600.jpg' WHERE (`product_id` = '19');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/236186/oppo-reno6-5g-aurora-600x600.jpg' WHERE (`product_id` = '29');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/235653/oppo-a74-blue-9-600x600.jpg' WHERE (`product_id` = '20');
UPDATE `mock_project`.`product` SET `path_image` = 'https://cdn.tgdd.vn/Products/Images/42/235653/oppo-a74-blue-9-600x600.jpg' WHERE (`product_id` = '30');	