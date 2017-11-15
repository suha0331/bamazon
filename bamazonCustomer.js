var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamzon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("\n" + "Welcome to Bamazon!" + "\n");
    console.log("------------------------------------------------------------")
    start();
})

function start() {
    inquirer
        .prompt([{
            name: "start",
            type: "input",
            message: "Do you want to go shopping? (Y/N)",
            validate: function(choice) {
                if (choice.toUpperCase() === 'Y') {
                    return display();
            
                } else {
                    console.log("Are you sure?");
                    start();
                }
            }

        }]);
}

//Display items for sale
function display() {
    connection.query('SELECT * FROM Products', function(err, res) {
        if (err) throw err;
        console.log("\n ");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].itemId + ") " + " Product: " + res[i].productName + " | " + "Department: " + res[i].departmentId + " | " + "Price: " + res[i].price);
            console.log("------------------------------------------------------------")
        }
    })
    questions();
}

function questions() {
    inquirer
        .prompt([{
                name: "itemId",
                type: "input",
                message: "Which item number would you like to buy?"
            },

            {
                name: "productQuantity",
                type: "input",
                message: "How many would you like?"
            }
        ])
        .then(function(answers) {
            chosenItem = parseInt(answers.itemId);
            chosenQty = parseInt(answers.productQuantity);
            // Set Variables
            console.log("Item ID: " + chosenItem);
            console.log("Quantity: " + chosenQty);
            //Run MySQL Query
            connection.query("SELECT productName, departmentId, price, stockQuantity FROM products WHERE itemId = " + chosenItem, function(err, res) {
                var total = (chosenQty * parseFloat(res[0].price));
                var newQty = parseInt(res[0].stockQuantity) - parseInt(chosenQty);
                if (err) throw err;
                console.log("Available Stock: " + res[0].stockQuantity);
                // Compare stock with amount requested
                if (res[0].stockQuantity >= chosenQty) {
                    console.log("------------- " + res[0].productName.toUpperCase() + " PURCHASE RECEIPT -------------");
                    console.log("Quantity: " + chosenQty + "\nPrice: $" + res[0].price + " \n----------------\nTotal Amount: $" + total + " \n");
                    // return updateSql(newQty);
                    connection.end();
                } else {
                    console.log("*----- INSUFFICIENT QUANTITY " + res[0].productName.toUpperCase() + " SUPPLY -----*");
                    console.log("Select another item or lower quantity! \n");
                    questions();
                }
            });

        });
}

// This doesnt work
// function updateSql(newQty) {
//     return connection.query("UPDATE products SET ? WHERE ?", { stockQuantity: newQty });
//     if (err) throw err;
// }