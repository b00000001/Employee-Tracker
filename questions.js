const menuChoices = [
	{
		type: "list",
		name: "menuChoice",
		message: "What would you like to do?",
		choices: [
			"View All Employees",
			"View all Employees by Department",
			"View all Employees by Manager",
			"Add Employee",
			"Remove Employee",
			"Update Employee Role",
			"Update Employee Manager",
			"View All Roles",
			"Add Role",
			"Remove Role",
		],
	},
];

const addEmployeePrompt = [
	{
		type: "input",
		name: "firstName",
		message: "Please enter the first name of the employee to add.",
		default: "John Doe",
	},
	{
		type: "input",
		name: "lastName",
		message: "Please enter the last name of the employee.",
		default: "John Doe",
	},
];

module.exports = { menuChoices, addEmployeePrompt };
