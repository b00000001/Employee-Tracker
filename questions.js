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
		name: "employeeName",
		message: "Please enter the name of the employee to add.",
		default: "John Doe",
	},
];

module.exports = { menuChoices, addEmployeePrompt };
