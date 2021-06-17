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
