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
VALUES ('Playstation 4', 'Electronics', 400, 390);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Raincoat', 'Clothing', 125, 250);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Golf Clubs', 'Sporting Goods', 899, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Hot Dogs', 'Food', 4.99, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Corvette', 'Auto', 69000, 420);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Down Parka', 'Clothing', 575, 175);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('iPhone X', 'Electronics', 1000, 350);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Sniper Rifle', 'Firearms', 600, 225);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Bowling Ball', 'Sporting Goods', 125, 800);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Snickers', 'Food', 1.50, 730);

CREATE TABLE departments(
    department_id INT(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50),
    over_head_costs DECIMAL(11,2),
    PRIMARY KEY (department_id)
);

ALTER TABLE products
ADD product_sales DECIMAL(11,2);

-- Group duplicate departments
SELECT department_id, department_name, over_head_costs, COUNT(*)
FROM departments
GROUP BY department_id, department_name, over_head_costs;

-- Join products and departments tables
SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales
FROM departments
INNER JOIN products ON departments.department_name = products.department_name;

-- Shows number of items in each department
SELECT department_name, COUNT(*)
FROM products
GROUP BY department_name;

-- Find the total sum of product sales for a particular department
SELECT department_name, SUM(product_sales)
FROM products
WHERE department_name = 'Electronics';

-- Rolling up each department's total sales
SELECT departments.department_id, departments.department_name, departments.over_head_costs,
SUM(product_sales) AS product_sales
FROM departments, products
WHERE departments.department_name = products.department_name
GROUP BY departments.department_id, departments.department_name, departments.over_head_costs
ORDER BY departments.department_id;

SELECT * FROM products;

SELECT * FROM departments;