const inquirer = require("inquirer");
const mysql = require("mysql");
const { menuChoices, addEmployeePrompt } = require("./questions");
const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "", //
	database: "employee",
});
const viewEmployees = (mainMenu) => {
	connection.query("SELECT * FROM employee", (err, res) => {
		if (err) throw err;
		console.table(res);
		mainMenu();
	});
};
const addEmployee = (mainMenu) => {
	inquirer.prompt(addEmployeePrompt).then((res) => {
		connection.query(
			`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('${res.employeeName}', 'Doe', 1002, 490);`
		);
		connection.query("SELECT * FROM employee", (err, res) => {
			if (err) throw err;
			console.table(res);
			mainMenu();
		});
	});
};
const viewEmployeeByDept = () => {};
const viewEmployeeByMgr = () => {};
const removeEmployee = (mainMenu) => {
	const employeeArray = [];
	connection.query("SELECT * FROM employee", (err, res) => {
		if (err) throw err;
		for (employee of res) {
			employeeArray.push(`Name: ${employee.first_name}, ID: ${employee.id}`);
		}
		console.log(employeeArray);
		inquirer
			.prompt([
				{
					type: "list",
					name: "employeeChosen",
					message: "Please select the Employee record to delete.",
					choices: employeeArray,
				},
			])
			.then((res) => {
				console.log(res.employeeChosen.split(" "));
				console.log(`Deleting record for ${res.employeeChosen}`);
				connection.query(
					"DELETE FROM employee WHERE ?",
					{ id: res.employeeChosen.split(" ")[3] },
					(err, res) => {
						if (err) throw err;
					}
				);
				mainMenu();
			});
	});
};

// const deleteEmployee = (res) => {
//     connection.query('DELETE FROM employee WHERE ?', {
//         empID: res.id
//     }, (err, res) => {})
// }

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

module.exports = { viewEmployees, addEmployee, removeEmployee };
