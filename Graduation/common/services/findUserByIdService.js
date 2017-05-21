/**
 * Created by ahmed on 3/25/2017.
 */

(function () {
    angular.module('myMainApp.mdl').factory('findUserByIdService', ['$http', findUserByIdService]);
    function findUserByIdService($http) {
      
        function getAllUsers() {
            return $http.get('http://localhost:8000/user/');
        }

        return{
            getAllUsers : getAllUsers
        };
    }
})();
