const mysql = require("mysql");
const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "", //
	database: "employee",
});

const idNum = [];
const roleId = [];
const getDeptNameArray = () => {
	const deptArr = [];
	connection.query("SELECT name, id FROM employee.department", (err, res) => {
		for (department of res) {
			deptArr.push(department.name);
			idNum.push(department.id);
		}
	});
	return deptArr;
};
const getRoleNameArray = () => {
	const roleNames = [];
	connection.query("SELECT title, id FROM employee.role", (err, res) => {
		for (role of res) {
			roleNames.push(role.title);
		}
	});
	return roleNames;
};
const roleQuery = (res) => {
	connection.query(
		`SELECT id FROM employee.role WHERE title='${res.employeeRole}'`,
		(err, res) => {
			getRoleIdNum(res[0].id);
		}
	);
};

const getRoleIdNum = (res) => {
	roleId.push(res);
	// res === "Manager" ? null : getManagerId();
};

const getManagerId = (mgrName) => {
	console.log("Mgr Name", mgrName, typeof mgrName);
	// mgrName = mgrName.split(" ");
	// connection.query(
	// 	`SELECT id FROM Employee WHERE SET`,
	// 	{
	// 		first_name: mgrName[0],
	// 		last_name: mgrName[1],
	// 	},
	// 	(err, res) => {
	// 		console.log(res);
	// 	}
	// );
};
const getManagerArray = () => {
	const managerNames = [];
	connection.query(
		"SELECT first_name, last_name FROM employee WHERE manager_id=0",
		(err, res) => {
			for (manager of res) {
				managerNames.push(`${manager.first_name} ${manager.last_name}`);
			}
		}
	);
	return managerNames;
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

const employeeQuestions = [
	{
		type: "list", //
		name: "selectedDepartment",
		message: "Of what department?",
		choices: getDeptNameArray(), // an array with all of the departments.
	},
	{
		type: "input",
		name: "employeeFirstName",
		message: "Please enter employee first name",
	},
	{
		type: "input",
		name: "employeeLastName",
		message: "Please enter employee last name",
	},
	{
		type: "list",
		name: "employeeRole",
		message: "Please select your role",
		choices: getRoleNameArray(), // an array with all of the roles
	},
	{
		type: "list",
		name: "employeeMgrName",
		message: "Who is your manager?",
		choices: getManagerArray(),
		when(answers) {
			return answers.employeeRole !== "Manager";
		},
	},
];

module.exports = {
	idNum,
	menuChoices,
	getRoleIdNum,
	roleQuery,
	getManagerId,
	roleId,
	viewMenuPrompts,
	employeeQuestions,
	addMenuPrompt,
	addRole,
	addDepartment,
};
