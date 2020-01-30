// Super Class
const Employee = require("./lib/Employee");
// Sub Classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// Modules
const Inquirer = require("inquirer");
const fs = require("fs");


//Global Variables
let count = 0; //Count = ID
const team = []; //Empty array to push team onto

buildTeam = () => {
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
    ]).then(function (response) {
        let name = response.name;
        let role = response.role;
        let id = count;
        if (response.role === "Manager") {
            // new inquire for office number
            Inquirer.prompt([
                {
                    type: "input",
                    message: "Please provide Manager's office number:",
                    name: "officeNumber"
                },
                {
                    type: "list",
                    message: "Is this the last team-member? (y/n)",
                    name: "done",
                    choices: [
                        "Yes",
                        "No"
                    ]
                }
            ]).then(function (data) {
                const manager = new Manager(name, role, id, data.officeNumber);
                team.push(manager); // Add new employee to team
                if (data.done === "No") {
                    count++;
                    buildTeam();
                } else if (data.done === "Yes") {
                    for (let i = 0; i < team.length; i++) {
                        fs.appendFile("team.txt", JSON.stringify(team[i], null, 2), (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(`${team[i].name} was added to the team`)
                            }
                        })
                    }
                }
            })
        }
        if (response.role === "Engineer") {
            // new inquire for Github
            Inquirer.prompt([
                {
                    type: "input",
                    message: "Please provide Engineer's github username:",
                    name: "userName"
                },
                {
                    type: "list",
                    message: "Is this the last team-member? (y/n)",
                    name: "done",
                    choices: [
                        "Yes",
                        "No"
                    ]
                }
            ]).then(function (data) {
                const engineer = new Engineer(name, role, id, data.userName);
                team.push(engineer);
                // generate ManagerCard()
                if (data.done === "No") {
                    count++;
                    buildTeam();
                } else if (data.done === "Yes") {
                    for (let i = 0; i < team.length; i++) {
                        fs.appendFile("team.txt", JSON.stringify(team[i], null, 2), (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(`${team[i].name} was added to the team`)
                            }
                        })
                    }
                }
            })
        }
        if (response.role === "Intern") {
            // new inquire for University
            Inquirer.prompt([
                {
                    type: "input",
                    message: "Please provide Intern's current university name:",
                    name: "school"
                },
                {
                    type: "list",
                    message: "Is this the last team-member? (y/n)",
                    name: "done",
                    choices: [
                        "Yes",
                        "No"
                    ]
                }
            ]).then(function (data) {
                const intern = new Intern(name, role, id, data.school);
                team.push(intern);
                // generate ManagerCard()
                if (data.done === "No") {
                    count++;
                    buildTeam();
                } else if (data.done === "Yes") {
                    for (let i = 0; i < team.length; i++) {
                        fs.appendFile("team.txt", JSON.stringify(team[i], null, 2), (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(`${team[i].name} was added to the team`)
                            }
                        })
                    }
                }
            })
        }
    })
}
buildTeam();