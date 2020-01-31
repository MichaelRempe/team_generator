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
let count = 1; //Count = ID
const team = []; //Empty array to push team onto

buildTeam = () => {
    console.log("\n=========Build your professional team here!==========\n")
    Inquirer.prompt([
        {
            type: "input",
            message: "Please provide name of Employee/Team-member:",
            name: "name",
            validate: function validName(name){
                return name !== '';
            }
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
                    name: "officeNumber",
                    validate: function validNum(){
                        return name !== NaN;
                    }
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
                    console.log(`\n ---NEW TEAM MEMBER --- \n`);
                    buildTeam();
                } else if (data.done === "Yes") {
                    fs.writeFile("team.txt", "        Team        \n========================\n", (err) => {
                        if (err) { console.log(err) } else {
                            for (let i = 0; i < team.length; i++) {
                                fs.appendFile("team.txt", my_toString(team[i]), (err) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log("\n");
                                        console.log(`${team[i].name} was added to the team`)
                                    }
                                })
                            }
                        }
                    })
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
                    console.log(`\n ---NEW TEAM MEMBER --- \n`)
                    buildTeam();
                } else if (data.done === "Yes") {
                    fs.writeFile("team.txt", "    Team    \n============", (err) => {
                        if (err) { console.log(err) } else {
                            for (let i = 0; i < team.length; i++) {
                                fs.appendFile("team.txt", my_toString(team[i]), (err) => {
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
                    console.log(`\n ---NEW TEAM MEMBER --- \n`)
                    buildTeam();
                } else if (data.done === "Yes") {
                    fs.writeFile("team.txt", "    Team    \n============\n", (err) => {
                        if (err) { console.log(err) } else {
                            for (let i = 0; i < team.length; i++) {
                                fs.appendFile("team.txt", my_toString(team[i]), (err) => {
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
    })
}
my_toString = (object) => {
    if (object.role === "Manager") {
        return `Position: ${object.role}\nName: ${object.name}\nEmployee ID: ${object.id}\nContact: ${object.email}\nOffice Number: ${object.officeNum}\n-------------------------\n`
    }
    if (object.role === "Engineer") {
        return `Position: ${object.role}\nName: ${object.name}\nEmployee ID: ${object.id}\nContact: ${object.email}\nGithub Username: ${object.gitHub}\n-------------------------\n`

    } else {
        return `Position: ${object.role}\nName: ${object.name}\nEmployee ID: ${object.id}\nContact:${object.email}\nUniversity: ${object.school}\n-------------------------\n`
    }
}
buildTeam();
