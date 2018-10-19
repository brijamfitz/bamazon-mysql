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

CREATE TABLE departments(
    department_id INT(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50),
    over_head_costs DECIMAL(11,2),
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('electronics', 69000);
INSERT INTO departments (department_name, over_head_costs)
VALUES ('firearms', 33000);
INSERT INTO departments (department_name, over_head_costs)
VALUES ('food', 25000);
INSERT INTO departments (department_name, over_head_costs)
VALUES ('sporting goods', 50000);

ALTER TABLE products
ADD product_sales DECIMAL(11,2);

SELECT * FROM products;

SELECT * FROM departments;

SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales
FROM departments
INNER JOIN products ON departments.department_name = products.department_name;