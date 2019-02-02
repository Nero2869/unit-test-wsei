class User {
    constructor(firstName, secondName, age, aclType){
        this.firstName = firstName;
        this.secondName = secondName;
        this.age = age;
        this.aclType = aclType;
    }

    isAdult(){
        if(this.age>=18){
            return true;
        }else{
            return false;
        }
    }
}

module.exports = User;