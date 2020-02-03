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
// Validates string input (name, username, school)
function isString(val){
    if(val === '' || typeof(val) !== typeof("sampleString")){
        return "valid input contains a string type and cannot be blank"
    }
} 
// Validates numeric input (room number)
function isNum(val){
    if(typeof(val) !== typeof(1)){
        return "valid input must be numeric"
    }
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
            name: "name",
            // validate: function valid(name){
            //     if(name === ""){
            //         return "Invalid String Entry";
            //     }
            //     else if(typeof(name) != typeof("string")){
            //         return "Invalid String Entry";
            //     }else{
            //         return true;
            //     }
            // }
        },
        {
            type: "input",
            message: "Please provide Manager's office number:",
            name: "officeNumber",
            // validate: function valid(num){

            // }
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
            fs.writeFile("./output/team.txt", "        Team        \n========================\n", (err) => {
                if (err) { console.log(err) } else {
                    fs.appendFile("./output/team.txt", my_toString(manager), (err) => {
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
            fs.writeFile("./output/team.txt", "        Team        \n========================\n", (err) => {
                if (err) { console.log(err) } else {
                    fs.appendFile("./output/team.txt", my_toString(manager), (err) => {
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
            // validate: function validName(name) {
            //     if(name == '' || typeof(name)== "NaN") {
            //         return "Valid name requires length of 1 and cannot be a number";                    
            //     }
            // }
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
                        fs.appendFile("./output/team.txt", my_toString(team[i]), (err) => {
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
                        fs.appendFile("./output/team.txt", my_toString(team[i]), (err) => {
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
