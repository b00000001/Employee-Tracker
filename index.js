console.log("Hello");
const inquirer = require("inquirer");
const inquire = require("inquirer");
const { viewMenu, addMenu, deleteMenu } = require("./menuFunctions");
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
		case "View Menu":
			viewMenu(inquirerMainPrompt);
			break;
		case "Add Menu":
			addMenu(inquirerMainPrompt);
			break;
		case "Remove Menu":
			deleteMenu(inquirerMainPrompt);
			break;
		case "Exit":
			console.log("Good Bye!");
			process.exit();
			break;
		default:
			console.log("error");
	}
};
init();
