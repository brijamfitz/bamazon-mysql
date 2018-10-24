# Bamazon

Bamazon is a MySQL and Node.js application that functions as an online marketplace.

Please watch the video walkthrough. It contains narration, so please have the sound turned on as well.
* [Bamazon Demo Video](https://drive.google.com/open?id=1iE_TABwLfDTecmOcuULW2LTd8QoRTjEc)

Tech used:
* MySQL
* Node.js
* NPM packages: inquirer, mysql, cli-table

The app has three core functions:

### Customer:
* User can select and purchase products from the marketplace
* Provides a total sale after a purchase is made
* Updates database after each successful purchase
* Allows the user to continue shopping or exit

### Manager:
* User can view all available products in the marketplace
* User can view products with an inventory of 50 or less
* User can add inventory to a specific product
* User can add a brand new item and all its values
* Updates database after each successful action

### Supervisor
* User can view product sales data by department. This includes:
    * Overhead Costs
    * Total Sales
    * Total Profit (this figure is not stored on the database - it is calculated on the fly)
* User can create an entirely new department
* Updates database after each successful action

Files:
* bamazonCustomer.js
* bamazonManager.js
* bamazonSupervisor.js
* schema.sql

How to Get Started:
* Clone repository
* From terminal command line, run `npm install` to install all depedencies
* Connect to a MySQL database
* Execute the `schema.sql` file in MySQL Workbench
* From terminal, run the following commands to experience Bamazon
    * Customer: `node bamazonCustomer.js`
    * Manager: `node bamazonManager.js`
    * Supervisor: `node bamazonSupervisor.js`