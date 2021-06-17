const inquirer = require("inquirer");
const mysql = require("mysql");
const { menuChoices } = require("./questions");
const viewEmployees = () => {
	const connection = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "", //
		database: "employee",
	});
	connection.query("SELECT * FROM employee", (err, res) => {
		if (err) throw err;
		console.table(res);
		inquirer.prompt(menuChoices).then((res) => {
			console.log(res);
		});
	});
};
const viewEmployeeByDept = () => {};
const viewEmployeeByMgr = () => {};

/* "View All Employees",
			"View all Employees by Department",
			"View all Employees by Manager",
			"Add Employee",
			"Remove Employee",
			"Update Employee Role",
			"Update Employee Manager",
			"View All Roles",
			"Add Role",
			"Remove Role", */

module.exports = { viewEmployees };
