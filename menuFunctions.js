const inquirer = require("inquirer");
const mysql = require("mysql");
const { Employee } = require("./employee");
const {
	menuChoices,
	viewMenuPrompts,
	addMenuPrompt,
	addEmployeePrompt,
	managerQuestions,
	addRole,
} = require("./questions");
const Role = require("./role");
const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "", //
	database: "employee",
});
const viewMenu = (mainMenu) => {
	inquirer.prompt(viewMenuPrompts).then((res) => {
		switch (res.typeToView) {
			case "Employee":
				connection.query("SELECT * FROM employee.employee", (err, res) => {
					if (err) throw err;
					console.table(res);
					viewMenu(mainMenu);
				});
				break;
			case "Role":
				connection.query("SELECT * FROM employee.role", (err, res) => {
					if (err) throw err;
					console.table(res);
					viewMenu(mainMenu);
				});
				break;
			case "Department":
				console.log("View Dept");
				break;
			case "Main Menu":
				mainMenu();
			default:
				console.log("error");
				return "Error";
		}
	});
};
const addMenu = (mainMenu) => {
	inquirer.prompt(addMenuPrompt).then((res) => {
		switch (res.typeToAdd) {
			case "Employee":
				inquirer.prompt(addEmployeePrompt).then((res) => {
					switch (res.employeeChoice) {
						case "Manager":
							inquirer.prompt(managerQuestions).then((res) => {
								const newEmployee = new Employee(
									res.managerFirstName,
									res.managerLastName,
									1000,
									15
								);
								newEmployee.addToDb();
								console.log("Successfully Added Manager");
								addMenu(mainMenu);
							});
						case "Intern":
							console.log("Add Employee Intern type");
							break;
						case "Employee":
							console.log("Add Employee default type");
							break;
						case "Back":
							addMenu(mainMenu);
							break;
						default:
							console.log("Error");
					}
				});
				break;
			case "Role":
				console.log("Add Role");
				inquirer.prompt(addRole).then((res) => {
					console.log("Add Role", res);
					const newRole = new Role(res.roleToAdd, res.roleSalary);
					newRole.addToDb(res);
					addMenu(mainMenu);
				});
				break;
			case "Department":
				console.log("Add Department");
				break;
			case "Back":
				console.log("Exiting");
				mainMenu();
				break;
			default:
				console.log("Error");
		}
	});
};
const viewEmployeeByDept = () => {};
const viewEmployeeByMgr = () => {};
const deleteMenu = (mainMenu) => {
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

module.exports = { viewMenu, addMenu, deleteMenu };
