const mysql = require("mysql");
const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "", //
	database: "employee",
});

const getDeptArray = () => {
	const deptArr = [];
	connection.query("SELECT name FROM employee.department", (err, res) => {
		for (department of res) {
			deptArr.push(department.name);
		}
	});
	return deptArr;
};

const menuChoices = [
	{
		type: "list",
		name: "menuChoice",
		message: "What would you like to do?",
		choices: ["View Menu", "Add Menu", "Remove Menu", "Exit"],
	},
];

const addMenuPrompt = [
	{
		type: "list",
		name: "typeToAdd",
		message: "Please enter what you wish to add",
		choices: ["Employee", "Role", "Department", "Back"],
	},
];

const viewMenuPrompts = [
	{
		type: "list",
		name: "typeToView",
		message: "Please select what type you wish to view",
		choices: ["Employee", "Role", "Department", "Main Menu"],
	},
];
const addRole = [
	{
		type: "input",
		name: "roleToAdd",
		message: "Please enter the type of role you wish to add",
	},
	{
		type: "input",
		name: "roleSalary",
		message: "Please enter the salary for this role.",
	},
];
const addDepartment = [
	{
		type: "input",
		name: "deptToAdd",
		message: "Please enter the department name",
	},
];

const managerQuestions = [
	{
		type: "list",
		name: "selectedDepartment",
		message: "Of what department?",
		choices: getDeptArray(), // an array with all of the departments.
	},
	{
		type: "input",
		name: "managerFirstName",
		message: "Please enter manager first name:",
	},
	{
		type: "input",
		name: "managerLastName",
		message: "Please enter manager last name:",
	},
];

module.exports = {
	menuChoices,
	viewMenuPrompts,
	managerQuestions,
	addMenuPrompt,
	addRole,
	addDepartment,
};
