class UserService {
    constructor(apiService){
       this.apiService = apiService;
    }


    getActiveUsers() {
       return this.apiService.getUsers().filter((user) => user.isActive === true);
    }
    
}

module.exports = UserService;