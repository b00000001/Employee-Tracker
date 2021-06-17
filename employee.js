const mysql = require("mysql");
class Employee {
	constructor(firstName, lastName, role, manager) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
		this.manager = manager;
		this.connection = mysql.createConnection({
			port: 3306,
			user: "root",
			database: "employee",
		});
	}
	addToDb() {
		this.connection.query(
			`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('${this.firstName}', '${this.lastName}', 100, 2001)`,
			(err, res) => {
				if (err) throw err;
				console.log("Successfully added record.");
			}
		);
	}
}

module.exports = { Employee };