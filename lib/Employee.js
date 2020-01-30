class Employee{
    constructor(name, role, id){
        this.name = name;
        this.role = role;
        this.id = id;
        this.email = `${this.name}@BCS.email.com`;
    }
    getName(){
        return this.name;
    }
    getRole(){
        return this.role;
    }
    getEmail(){
        return this.email;
    }
    getId(){
        return this.id;
    }
}

module.exports = Employee;