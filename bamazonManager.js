var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  promptUser();
});

function promptUser() {
    console.log('Welcome to Bamazon!');
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'choose',
            message: 'What would you like to do?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ]).then(function(userChoice) {
        if (userChoice.choose === 'View Products for Sale') {
            viewProducts();
        }
        else if (userChoice.choose === 'View Low Inventory') {
            lowInventory();
        }
        else if (userChoice.choose === 'Add to Inventory') {
            addInventory();
        }
        else if (userChoice.choose === 'Add New Product') {
            addProduct();
        }
    })
}

function viewProducts() {
    var query = 'SELECT * FROM products';
    connection.query(query, function(err, res) {
        if (err) throw err;
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ' | ' + res[i].product_name + ' | ' + res[i].department_name + ' | ' + '$' + res[i].price + ' | ' + res[i].stock_quantity);
        }
    })
}

function lowInventory() {
    var query = 'SELECT * FROM products';
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var j = 0; j < res.length; j++) {
            if (res[j].stock_quantity <= 5) {
                console.log(res[j].item_id + ' | ' + res[j].product_name + ' | ' + res[j].department_name + ' | ' + '$' + res[j].price + ' | ' + res[j].stock_quantity);
            }
        }
    })
}

function addInventory() {
    inquirer.prompt([
        {
            name: 'id',
            message: 'Choose the ID of the product you would like to add inventory to.\n',
            type: 'input'
        },
        {
            name: 'quantity',
            message: 'How many units would you like to add?',
            type: 'input'
        }
    ]).then(function(answer) {
        var uniqueId = parseInt(answer.id);
        var uniqueQuantity = parseInt(answer.quantity);
        // console.log(uniqueId);
        // console.log(uniqueQuantity);
        var query = 'SELECT * FROM products WHERE item_id = ?';
        connection.query(query, [uniqueId], function(err, res) {
            if (err) throw err;
            connection.query('UPDATE products SET ? WHERE ?', [
                {
                    stock_quantity: res[0].stock_quantity + uniqueQuantity
                },
                {
                    item_id: uniqueId
                }
            ], function(error, results) {
                if (error) throw error;
                console.log('You added ' + uniqueQuantity + ' units to the inventory!');
                console.log('The new inventory is now: ' + (uniqueQuantity + res[0].stock_quantity + '.'));
            });
        })
    })
    viewProducts();
}

function addProduct() {
    inquirer.prompt([
        {
            name: 'name',
            message: 'What item would you like to add?',
            type: 'input'
        },
        {
            name: 'department',
            message: 'What department is this item in?',
            type: 'input'
        },
        {
            name: 'price',
            message: 'What is the price of this item?',
            type: 'input'
        },
        {
            name: 'quantity',
            message: 'How many units would you like to add?',
            type: 'input'
        }
    ]).then(function(answer) {
        var query = 'INSERT INTO products SET ?';
        connection.query(query, [
            {
                product_name: answer.name,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity
            }
        ],
        function(err, res) {
            if (err) throw err;
            console.log('Thank you! You have added ' + answer.name + ' to the inventory!');
        })
    })
}