const inquirer = require("inquirer");
const mysql = require("mysql");
const { Employee } = require("./employee");
const {
	menuChoices,
	viewMenuPrompts,
	addMenuPrompt,
	addEmployeePrompt,
	managerQuestions,
} = require("./questions");
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
				connection.query("SELECT * FROM employee", (err, res) => {
					if (err) throw err;
					console.table(res);
					viewMenu(mainMenu);
				});
			case "Role":
				console.log("View Role");
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
	const query = "INSERT INTO employee SET ?";
	inquirer.prompt(addMenuPrompt).then((res) => {
		switch (res.typeToAdd) {
			case "Employee":
				inquirer.prompt(addEmployeePrompt).then((res) => {
					switch (res.employeeChoice) {
						case "Manager":
							inquirer.prompt(managerQuestions).then((res) => {
								console.log(res);
								connection.query(
									query,
									{
										first_name: res.managerFirstName,
										last_name: res.managerLastName,
										role_id: 1000,
										manager_id: 15,
									},
									(err, res) => {
										console.table(res);
									}
								);
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
							console.log(res);
							console.log("Error");
					}
				});
				break;
			case "Role":
				console.log("Add Role");
				break;
			case "Department":
				console.log("Add Department");
				break;
			case "Back":
				console.log("Exiting");
				mainMenu();
				break;
			default:
				console.log(res);
				console.log("Error");
		}

		// const newEmployee = new Employee(
		// 	res.firstName,
		// 	res.lastName,
		// 	res.roleId,
		// 	res.managerId
		// );
		// newEmployee.addToDb();
		// mainMenu();
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
