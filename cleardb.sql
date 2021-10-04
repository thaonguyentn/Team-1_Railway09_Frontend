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
VALUES 								('3', 		'35490000', 	'1');
INSERT INTO `heroku_1f3b8eab4ddb340`.`cart` (`quantity`, `total_price`, `user_id`) 
VALUES 								('0', '0', '2');

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

UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `path_image` = '1624773227391.jpg' WHERE (`product_id` = '1');							
									
INSERT INTO `heroku_1f3b8eab4ddb340`.`cartdetail` (`price`, `quantity`, `cart_id`, `product_id`, `status`) 
VALUES 									('15000000', '1', 		'1', 		'1', 		'Order'),
										('12490000', '1',		'1', 		'2', 		'Order'),
                                        ('8000000',  '1', 		'1', 		'3', 		'Order');


INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('123', '1');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('456', '1');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('789', '1');

INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('246', '2');
INSERT INTO `heroku_1f3b8eab4ddb340`.`productimage` (`path_image`, `product_id`) VALUES ('357', '2');

INSERT INTO `heroku_1f3b8eab4ddb340`.`product` (`product_name`, `discount`, `price`, `productRam_id`, `productMemory_id`, `productBrand_id`, `category`, `quantity`) 
VALUES 									('Oppo S55', '0', '8000000', '3', '3', '4', 'Phone', '0');


UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '20' WHERE (`product_id` = '1');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '30' WHERE (`product_id` = '2');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '20' WHERE (`product_id` = '3');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '25' WHERE (`product_id` = '5');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '10' WHERE (`product_id` = '6');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '20' WHERE (`product_id` = '7');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '20' WHERE (`product_id` = '8');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '10' WHERE (`product_id` = '9');
UPDATE `heroku_1f3b8eab4ddb340`.`product` SET `discount` = '10' WHERE (`product_id` = '10');