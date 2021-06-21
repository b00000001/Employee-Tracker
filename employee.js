const mysql = require("mysql");
class Employee {
	constructor(firstName, lastName, role, department, manager) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
		this.department = department;
		this.manager = manager;
		this.connection = mysql.createConnection({
			port: 3306,
			user: "root",
			database: "employee",
		});
	}
	addToDb() {
		this.connection.query(
			`INSERT INTO employee (first_name, last_name, role_id, department, manager_id) VALUE ('${this.firstName}', '${this.lastName}', ${this.department}, ${this.role}, ${this.manager})`,
			(err, res) => {
				if (err) throw err;
			}
		);
	}
}

module.exports = { Employee };
