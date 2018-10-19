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
    console.log('Welcome to Bamazon Supervisor.')
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'choose',
            message: 'Please select an option below:',
            choices: ['View Product Sales by Department', 'Create New Department']
        }
    ]).then(function(answer) {
        if (answer.choose === 'View Product Sales by Department') {
            productSales();
        }
        else if (answer.choose === 'Create New Department') {
            createDept();
        }
    })
}

function productSales() {
    var query = 'SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales FROM departments INNER JOIN products ON departments.department_name = products.department_name;';
    connection.query(query, function(err, res) {
        if (err) throw err;
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].department_id + ' | ' + res[i].department_name + ' | ' + res[i].over_head_costs + ' | ' + res[i].product_sales + ' | ' + (res[i].product_sales - res[i].over_head_costs));
        }
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
            console.log('You created a new ' + answer.name + ' department with $' + answer.cost + ' overhead!')
        })
    })
}