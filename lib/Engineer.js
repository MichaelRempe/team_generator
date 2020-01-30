const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, role, id, gitHub){
        super(name, role, id);
        this.gitHub = gitHub;
    }
    getGitHub(){
        return this.gitHub;
    }
}

module.exports = Engineer;