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
    console.log('Welcome to Bamazon Supervisor!')
    console.log('');
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'choose',
            message: 'Please select an option below: (Type the number and press enter)',
            choices: ['View Product Sales by Department', 'Create New Department', 'Exit']
        }
    ]).then(function(answer) {
        if (answer.choose === 'View Product Sales by Department') {
            productSales();
        }
        else if (answer.choose === 'Create New Department') {
            createDept();
        }
        else if (answer.choose === 'Exit') {
            connection.end();
        }
    })
}

function productSales() {
    var query = 'SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(product_sales) AS product_sales FROM departments, products WHERE departments.department_name = products.department_name GROUP BY departments.department_id, departments.department_name, departments.over_head_costs ORDER BY departments.department_id;'
    connection.query(query, function(err, res) {
        if (err) throw err;
        var table = new Table({   
            head: ['ID', 'Department', 'Overhead Costs', 'Product Sales', 'Total Profit'],
            colWidths: [5, 25, 20, 20, 20]
        });
        for (var i = 0; i < res.length; i++) {
            // table.push(  
            //     [(JSON.parse(JSON.stringify(res))[i]["department_id"]), (JSON.parse(JSON.stringify(res))[i]["department_name"]), ("$ "+JSON.parse(JSON.stringify(res))[i]["over_head_costs"]), ("$ "+JSON.parse(JSON.stringify(res))[i]["product_sales"]), ("$ "+parseFloat(res[i].product_sales - res[i].over_head_costs))]);
            table.push([res[i].department_id, res[i].department_name, '$ ' + res[i].over_head_costs, '$ ' + res[i].product_sales, '$ ' + (res[i].product_sales - res[i].over_head_costs)]); 
        }
        console.log("\n" + table.toString()); 
        console.log("");
        endConnection();
    })  
}

function createDept() {
    inquirer.prompt([
        {
            name: 'name',
            message: 'What department would you like to create?',
            type: 'input'
        },
        {
            name: 'cost',
            message: 'What is the overhead cost for this department?',
            type: 'input'
        }
    ]).then(function(answer) {
        var query = 'INSERT INTO departments SET ?';
        connection.query(query, [
            {
                department_name: answer.name,
                over_head_costs: answer.cost
            }
        ], function(err, res) {
            if (err) throw err;
            console.log('');
            console.log('You created a new ' + answer.name + ' department with $' + answer.cost + ' overhead!')
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