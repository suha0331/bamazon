CREATE DATABASE bamazon;

CREATE TABLE Products (
	itemId int NOT NULL AUTO_INCREMENT,
	productName VARCHAR (250),
	departmentId VARCHAR (250),
	price DECIMAL(7,2),
	stockQuantity INTEGER (10),
	PRIMARY KEY(itemId)
);

SELECT * FROM Products;
USE bamazon;

INSERT INTO Products (productName, departmentId, price, stockQuantity)
VALUES
	('Coat', 'Clothe', 82.50, 300),
	('Blouse', 'Clothe', 35.99, 200),
	('Cardigan', 'Clothe', 79.99, 350),
	('Jeans', 'Clothe', 39.50, 100),
	('Dress', 'Clothe', 26.00, 250),
	('Blazer', 'Clothe', 59.99, 230),
	('Pants', 'Clothe', 35.99, 150),
	('Boots', 'Shoes', 35.99, 20),
	('Watch', 'Accessories', 120.00, 40),
	('Earrings', 'Accessories', 25.99, 10);




