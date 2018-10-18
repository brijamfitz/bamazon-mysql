DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(11,2),
    stock_quantity INT(11),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Playstation 4', 'electronics', 400, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Playstation 4', 'electronics', 400, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Playstation 4', 'electronics', 400, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Playstation 4', 'electronics', 400, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Playstation 4', 'electronics', 400, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Playstation 4', 'electronics', 400, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Playstation 4', 'electronics', 400, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Playstation 4', 'electronics', 400, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Playstation 4', 'electronics', 400, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Playstation 4', 'electronics', 400, 20);

SELECT * FROM products;
