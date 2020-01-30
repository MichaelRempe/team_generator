const Employee = require("./Employee");

class Manager extends Employee{
    constructor(officeNum){
        super()
        this.officeNum = officeNum;
    }
    getOfficeNum(){
        return this.officeNum;
    }
} 

module.exports = Manager;