console.log("Hello");
const inquirer = require("inquirer");
const inquire = require("inquirer");
const {
	viewEmployees,
	addEmployee,
	removeEmployee,
} = require("./menuFunctions");
const { menuChoices } = require("./questions");
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
			viewEmployees(inquirerMainPrompt);
			break;
		case "Add Employee":
			addEmployee(inquirerMainPrompt);
			break;
		case "Remove Employee":
			removeEmployee(inquirerMainPrompt);
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
