class ApiService {

    getUsers(){
        return [
            {
                'isActive': true
            },
            {
                'isActive': false
            }
        ]
    };
}

module.exports = ApiService;