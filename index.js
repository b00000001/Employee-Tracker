console.log('Hello');
const inquirer = require('inquirer');
const inquire = require('inquirer');
const {menuChoices, addEmployee, removeEmployee } = require('./questions');

inquirer.prompt(menuChoices).then((res) => {
  switch (res.menuChoice) {
    case 'Add Employee':
	  inquirer.prompt(addEmployee).then((res) => {
		  console.log(res);
	  })
      break;
    case 'Remove Employee':
		inquirer.prompt(removeEmployee).then((res) => {
			console.log(res);
		})
      break;
    case 'Update Employee Role':
      break;
    case 'Update Employee Manager':
      break;
    case 'Add Role':
      break;
	  default: 
	  console.log('error')
  }
});
