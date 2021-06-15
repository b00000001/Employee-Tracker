console.log("Hello");
const inquirer = require("inquirer");
const inquire = require("inquirer");
const questions = require("./questions");

inquirer.prompt(questions).then((res) => {
	console.log(res);
});
