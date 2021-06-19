const mysql = require("mysql");

class Department {
	constructor(name) {
		this.name = name;
		this.connection = mysql.createConnection({
			port: 3306,
			user: "root",
			database: "employee",
		});
	}
	addToDb(res) {
		this.connection.query(
			"INSERT INTO employee.department SET ?",
			{ name: res.deptToAdd },
			(err, res) => {
				if (err) throw err;
				console.log("Successfully added department");
			}
		);
	}
}
module.exports = Department;
