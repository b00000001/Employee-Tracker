console.log("Hello");
const inquirer = require("inquirer");
const inquire = require("inquirer");
const menuChoices = require("./questions");

inquirer.prompt(menuChoices).then((res) => {
	switch (res.menuChoice) {
		case "View All Employees":
			console.log("Menu choice view all employees");
	}
});
