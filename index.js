console.log("Hello");
const inquirer = require("inquirer");
const inquire = require("inquirer");
const { viewEmployees } = require("./menuFunctions");
const { menuChoices, addEmployee, removeEmployee } = require("./questions");
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "", //
	database: "employee",
});
const afterConnect = () => {};

// connection.connect((err) => {
// 	if (err) throw err; //
// 	console.log(`Connected as id ${connection.threadId}`);
// 	afterConnect();
// });
const init = () => {
	inquirerMainPrompt();
};

const inquirerMainPrompt = () => {
	inquirer.prompt(menuChoices).then((res) => {
		handleMenuChoices(res);
	});
};
const handleMenuChoices = (res) => {
	switch (res.menuChoice) {
		case "View All Employees":
			viewEmployees();
			inquirerMainPrompt();
			break;
		case "Add Employee":
			inquirer.prompt(addEmployee).then((res) => {
				connection.query(
					`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('${res.employeeName}', 'Doe', 1002, 490);`
				);
				console.log(res);
				connection.query("SELECT * FROM employee", (err, res) => {
					if (err) throw err;
					console.table(res);
				});
				connection.end();
			});
			break;
		case "Remove Employee":
			inquirer.prompt(removeEmployee).then((res) => {
				console.log(res);
			});
			break;
		case "Update Employee Role":
			break;
		case "Update Employee Manager":
			break;
		case "Add Role":
			break;
		default:
			console.log("error");
	}
};
init();
