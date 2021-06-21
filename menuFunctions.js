const inquirer = require("inquirer");
const mysql = require("mysql");
const { Employee } = require("./employee");
const {
	// Imports different variables that hold question sets.
	menuChoices,
	viewMenuPrompts,
	addMenuPrompt,
	idNum,
	managerQuestions,
	employeeQuestions,
	addRole,
	addDepartment,
} = require("./questions");
const Role = require("./role");
const Department = require("./department");
const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "", //
	database: "employee",
});
/* 
-------------------------------------------------------------------------------
								View Menu
*/
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
				connection.query("SELECT * FROM employee.department", (err, res) => {
					if (err) throw err;
					console.table(res);
					viewMenu(mainMenu);
				});
				break;
			case "Main Menu":
				mainMenu();
				break;
			default:
				console.log("error");
				return "Error";
		}
	});
};
/* 
-------------------------------------------------------------------------------
								Add Menu
*/
const addMenu = (mainMenu) => {
	inquirer.prompt(addMenuPrompt).then((res) => {
		switch (res.typeToAdd) {
			case "Employee":
				inquirer
					.prompt([
						{
							type: "list",
							name: "employeeChoice",
							message: "Please enter the type of employee you wish to add.",
							choices: ["Employee", "Manager", "Intern", "Back"],
						},
					])
					.then((res) => {
						switch (res.employeeChoice) {
							case "Manager":
								inquirer.prompt(managerQuestions).then((res) => {
									const newEmployee = new Employee(
										res.firstName,
										res.lastName,
										10,
										idNum[0],
										5
									);
									console.log(newEmployee);
									addMenu(mainMenu);
								});
								break;
							case "Intern":
								console.log("Add Employee Intern type");
								break;
							case "Employee":
								inquirer.prompt(employeeQuestions).then((res) => {
									const newEmployee = new Employee(
										res.employeeFirstName,
										res.employeeLastName,
										role,
										idNum[0],
										0
									);
									console.log(newEmployee);
									addMenu(mainMenu);
								});
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
				inquirer.prompt(addDepartment).then((res) => {
					const newDept = new Department(res.depToAdd);
					newDept.addToDb(res);
					addMenu(mainMenu);
				});
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
/* 
-------------------------------------------------------------------------------
								Delete Menu
*/
const deleteMenu = (mainMenu) => {
	const employeeArray = [];
	connection.query("SELECT * FROM employee", (err, res) => {
		if (err) throw err;
		for (employee of res) {
			employeeArray.push(`Name: ${employee.first_name}, ID: ${employee.id}`);
		}
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
