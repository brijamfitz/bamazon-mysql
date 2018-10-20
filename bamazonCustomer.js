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
  displayProducts();
});

var itemIds = [];
var itemQuantity = [];
var uniqueId = 0;
var uniqueQuantity = 0;

function displayProducts() {
    console.log("Welcome to Bamazon!");
    console.log("Below is a list of all the items for sale.");
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        itemIds = [];
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ' | ' + res[i].product_name + ' | ' + res[i].department_name + ' | ' + '$' + res[i].price + ' | ' + res[i].stock_quantity); 
            itemIds.push(res[i].item_id);
            itemQuantity.push(res[i].stock_quantity);
        }
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
        // console.log(answer);
        // console.log(itemIds);
        uniqueId = parseInt(answer.id);
        // console.log(uniqueId);
        for (var j = 0; j < itemIds.length; j++) {
            if (uniqueId === itemIds[j]) {
                numProducts();
            }
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
        // console.log(answer);
        // console.log(itemQuantity);
        uniqueQuantity = parseInt(answer.quantity);
        // console.log(uniqueQuantity);
        connection.query('SELECT * FROM products WHERE item_id = ?', [uniqueId], function(err, res) {
            if (err) throw err;
            var stock = res[0].stock_quantity;
            var price = res[0].price;
            if (uniqueQuantity < stock) {
                // console.log(true);
                console.log('Thank you! Your purchase is complete!');
                console.log('Total sale: ' + '$' + (uniqueQuantity * price));
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
        // console.log(answer.confirm);
        if (answer.confirm) {
            displayProducts();
        }
        else {
            connection.end();
        }
    })
}