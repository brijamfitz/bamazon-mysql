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
  connection.end();
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
            console.log(true);
        }
        else if (answer.choice === 'Create New Department') {
            console.log(true);
        }
    })
}