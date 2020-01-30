const Employee = require("./lib/Employee");
const Inquirer = require("inquire");

let count = 0;

while(input != exit){
    Inquirer.prompt([
        {
            type: "input",
            message: "Please provide name of Employee/Team-member:",
            name: "name"
        },
        {
            type: "list",
            message: "Select team member's role:",
            name: "role",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }
    ]).then(function(response){
        let name = response.name;
        let role = response.role;
        let id = count;
        if(response.role === "Manager"){
            // new inquire for office number
            Inquirer.prompt([
                {
                    type: "input",
                    message: "Please provide Manager's office number:",
                    name: "officeNumber"
                }
            ]).then(function(data){
                const Manager =  new Manager(name, role, id, data.officeNumber);
                // generate ManagerCard()
            })
        }
        if(response.role === "Engineer"){
            // new inquire for Github
            Inquirer.prompt([
                {
                    type: "input",
                    message: "Please provide Engineer's github username:",
                    name: "userName"
                }
            ]).then(function(data){
                const Engineer = new Engineer(name, role, id, data.userName);
                // generate ManagerCard()
            })
        }
        if(response.role === "Intern"){
            // new inquire for University
            Inquirer.prompt([
                {
                    type: "input",
                    message: "Please provide Intern's current university name:",
                    name: "school"
                }
            ]).then(function(data){
                const Intern = new Intern(name, role, id, data.school);
                // generate ManagerCard()
            })
        }
    })
}