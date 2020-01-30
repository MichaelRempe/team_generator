const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, role, id, school){
        super(name, role, id)
        this.school = school;
    }
    getSchool(){
        return this.school;
    }
}

module.exports = Intern;