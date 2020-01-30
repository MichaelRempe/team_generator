const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name, role, id, officeNum){
        super(name, role, id)
        this.officeNum = officeNum;
    }
    getOfficeNum(){
        return this.officeNum;
    }
} 

module.exports = Manager;