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
const team = []; //Empty array to push team onto

//Returns random 3 digit Employee ID
generateRandom = () => {
    let r = 0;
    for (let i = 0; i < 2; i++) {
        r = Math.floor(Math.random() * (1000 - 100) + 100);
    }
    return r;
}
// Returns string literal to write to file based on employee object arg
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
//Create Manager Obj --> only called once per team
createManager = () => {
    Inquirer.prompt([
        {
            type: "input",
            message: "Please provide the name of the Team-Manager:",
            name: "name"
        },
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
        let name = data.name;
        let role = "Manager";
        let id = generateRandom();
        let officeNum = data.officeNumber;
        //Manager OBJ
        const manager = new Manager(name, role, id, officeNum);
        team.push(manager); // Add manager to team
        if (data.done === "No") {
            //Append Manager OBJ to Team Profile
            fs.writeFile("team.txt", "        Team        \n========================\n", (err) => {
                if (err) { console.log(err) } else {
                    fs.appendFile("team.txt", my_toString(manager), (err) => {
                        if (err) {
                            console.log(err)
                        } 
                    })
                }
            })
            // prompt for more team members
            console.log(`\n${manager.name} was added as Team Manager`)
            console.log(`\n---NEW TEAM MEMBER --- \n`);
            createTeam();
        } else if (data.done === "Yes") {
            //Append Manager OBJ to team File
            fs.writeFile("team.txt", "        Team        \n========================\n", (err) => {
                if (err) { console.log(err) } else {
                    fs.appendFile("team.txt", my_toString(manager), (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("\n");
                            console.log(`${manager.name} was added as Team Manager`)
                        }
                    })
                }
            })
        }
    }
    )
}
//Create the rest of the team recursively 
createTeam = () => {
    Inquirer.prompt([
        {
            type: "input",
            message: "Please provide name of Employee/Team-member:",
            name: "name",
            validate: function validName(name) {
                return name !== '';
            }
        },
        {
            type: "list",
            message: "Select new team member's role:",
            name: "role",
            choices: [
                "Engineer",
                "Intern"
            ]
        }
    ]).then(function (response) {
        let name = response.name;
        let role = response.role;
        let id = generateRandom();
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
                    console.log(`\n ---NEW TEAM MEMBER --- \n`)
                    createTeam();
                } else if (data.done === "Yes") {
                    for (let i = 1; i < team.length; i++) {
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
                    console.log(`\n ---NEW TEAM MEMBER --- \n`)
                    createTeam();
                } else if (data.done === "Yes") {
                    for (let i = 1; i < team.length; i++) {
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


//Control Flow and CLI Styling
buildTeam = () => {
    console.log("\n=========Build your professional team here!==========\n")
    createManager();

}
buildTeam();
