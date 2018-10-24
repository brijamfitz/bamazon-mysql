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
  displayProducts();
});

var itemIds = [];
var itemQuantity = [];
var uniqueId = 0;
var uniqueQuantity = 0;

function displayProducts() {
    console.log('');
    console.log("Welcome to Bamazon!");
    console.log('');
    console.log("Below is a list of all the products for sale.");
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        itemIds = [];
        var table = new Table({   
            head: ['ID', 'Product', 'Department', 'Price', 'Quantity'],
            colWidths: [5, 25, 20, 20, 20]
        });
        for (var i = 0; i < res.length; i++) {        
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, '$ ' + res[i].price, res[i].stock_quantity]);      
            itemIds.push(res[i].item_id);
            itemQuantity.push(res[i].stock_quantity);           
        }
        console.log("\n" + table.toString()); 
        console.log("");
        selectProduct();
    });
}

function selectProduct() {
    inquirer.prompt([
        {
            name: 'id',
            message: 'Enter the ID of the product you would like to purchase:',
            type: 'input'
        }
    ]).then(function(answer) {
        uniqueId = parseInt(answer.id);
        if (!isNaN(uniqueId)) {
            for (var j = 0; j < itemIds.length; j++) {
                if (uniqueId === itemIds[j]) {
                    numProducts();
                }
            }
        }
        else {
            console.log('');
            console.log('Please enter a valid ID number.');
            console.log('');
            selectProduct();
        }
    })
}

function numProducts() {
    inquirer.prompt([
        {
            name: 'quantity',
            message: 'Enter the number of units you would like to purchase:',
            type: 'input'
        },
    ]).then(function(answer) {
        uniqueQuantity = parseInt(answer.quantity);
        connection.query('SELECT * FROM products WHERE item_id = ?', [uniqueId], function(err, res) {
            if (err) throw err;
            var stock = res[0].stock_quantity;
            var price = res[0].price;
            if (uniqueQuantity < stock) {
                console.log('');
                console.log('Thank you! Your purchase is complete!');
                console.log('');
                console.log('Total sale: ' + '$' + (uniqueQuantity * price) + '.');
                console.log('');
                connection.query(
                    'UPDATE products SET ? WHERE ?',
                    [
                        {
                            stock_quantity: (stock - uniqueQuantity),
                            product_sales: (uniqueQuantity * price)
                        },
                        {
                            item_id: uniqueId
                        }
                    ],
                    function(err, res) {
                        if (err) throw err;
                        endConnection();
                    }
                )
            }
            else {
                console.log('');
                console.log('The amount you chose is currently out of stock. Please choose a different amount.');
                console.log('');
                numProducts();
            }
        })   
    })
}

function endConnection() {
    inquirer.prompt([
        {
            name: 'confirm',
            type: 'confirm',
            message: 'Would you like to purchase another product?'
        }
    ]).then(function(answer) {
        if (answer.confirm) {
            displayProducts();
        }
        else {
            connection.end();
        }
    })
}