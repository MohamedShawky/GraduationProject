(function () {
    angular.module('myMainApp.mdl').factory('signUpServices', ['$http', signUpServices]);
    function signUpServices($http) {

        function postUserData(userName, firstName, lastName, userPassword ,userEmail) {

            return $http.post('http://localhost:8000/api-register/', {
                username : userName,
                password : userPassword,
                first_name:firstName,
                last_name:lastName,
                email : userEmail
            });

        }
        return{
            postUserData : postUserData
        };
    }
})();

