const UserService = require('./userService');
const ApiService = require('./__mocks__/apiService');


test('Testowanie metody getUsers z apiService', ()=>{
    const userService = new UserService(new ApiService());
    console.log(userService.getActiveUsers());
});