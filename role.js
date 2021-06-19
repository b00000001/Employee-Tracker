const mysql = require("mysql");
class Role {
	constructor(title, salary) {
		title = this.title;
		salary = this.salary;
		this.connection = mysql.createConnection({
			port: 3306,
			user: "root",
			database: "employee",
		});
	}
	addToDb(res) {
		this.connection.query(
			"INSERT INTO employee.role SET ?",
			{ title: res.roleToAdd, salary: res.roleSalary, department_id: 2000 },
			(err, res) => {
				console.log("New role added to database");
				if (err) throw err;
			}
		);
	}
}

module.exports = Role;
