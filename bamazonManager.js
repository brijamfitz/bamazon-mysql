var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  promptUser();
});

function promptUser() {
    console.log('');
    console.log('Welcome to Bamazon Manager!');
    console.log('');
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'choose',
            message: 'What would you like to do? (Type the number and press enter)',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
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
        else if (userChoice.choose === 'Exit') {
            connection.end();
        }
    })
}

function viewProducts() {
    var query = 'SELECT * FROM products';
    connection.query(query, function(err, res) {
        if (err) throw err;
        var table = new Table({   
            head: ['ID', 'Product', 'Department', 'Price', 'Quantity'],
            colWidths: [5, 25, 20, 20, 20]
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, '$ ' + res[i].price, res[i].stock_quantity]);                          
        }
        console.log("\n" + table.toString()); 
        console.log("");
        endConnection();
    })  
}

function lowInventory() {
    var query = 'SELECT * FROM products';
    console.log('');
    console.log('Below are the products that have an inventory of 50 units or less.')
    connection.query(query, function(err, res) {
        if (err) throw err;
        var table = new Table({   
            head: ['ID', 'Product', 'Department', 'Price', 'Quantity'],
            colWidths: [5, 25, 20, 20, 20]
        });
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 50) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, '$ ' + res[i].price, res[i].stock_quantity]); 
            }
        }
        console.log("\n" + table.toString()); 
        console.log("");
        endConnection();
    })
}

function addInventory() {
    var query = 'SELECT * FROM products';
    connection.query(query, function(err, res) {
        if (err) throw err;
        var table = new Table({   
            head: ['ID', 'Product', 'Department', 'Price', 'Quantity'],
            colWidths: [5, 25, 20, 20, 20]
        });
        for (var i = 0; i < res.length; i++) {
            // table.push(  
            //     [(JSON.parse(JSON.stringify(res))[i]["item_id"]), (JSON.parse(JSON.stringify(res))[i]["product_name"]), (JSON.parse(JSON.stringify(res))[i]["department_name"]), ("$ "+JSON.parse(JSON.stringify(res))[i]["price"].toFixed(2)), (JSON.parse(JSON.stringify(res))[i]["stock_quantity"])]);
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, '$ ' + res[i].price, res[i].stock_quantity]);                          
        }
        console.log("\n" + table.toString()); 
        console.log("");
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
                    console.log('');
                    console.log('You added ' + uniqueQuantity + ' units to the inventory!');
                    console.log('');
                    console.log('The new inventory is now: ' + (uniqueQuantity + res[0].stock_quantity + '.'));
                    console.log('');
                    endConnection();
                });
            })
        })
    })     
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
            console.log('');
            console.log('Thank you! You have added ' + answer.name + ' to the inventory!');
            console.log('');
            endConnection();
        })
    })
}

function endConnection() {
    inquirer.prompt([
        {
            name: 'confirm',
            type: 'confirm',
            message: 'Would you like to return to the main menu?'
        }
    ]).then(function(answer) {
        if (answer.confirm) {
            promptUser();
        }
        else {
            connection.end();
        }
    })
}