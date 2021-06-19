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
const addEmployeePrompt = [
	{
		type: "list",
		name: "employeeChoice",
		message: "Please enter the type of employee you wish to add.",
		choices: ["Employee", "Manager", "Intern", "Back"],
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

const managerQuestions = [
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
	{
		type: "list",
		name: "managerDept",
		message: "What Department is this manager working in?",
		choices: ["Engineering", "Executive", "Sales", "Retail"],
	},
];
module.exports = {
	menuChoices,
	addEmployeePrompt,
	viewMenuPrompts,
	managerQuestions,
	addMenuPrompt,
	addRole,
};
