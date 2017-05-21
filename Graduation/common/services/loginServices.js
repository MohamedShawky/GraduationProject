/**
 * Created by ahmed on 3/11/2017.
 */
(function () {
    angular.module('myMainApp.mdl').factory('loginServices', ['$http', '$sessionStorage', loginServices]);
    function loginServices($http, $sessionStorage) {

        function loginCheck(username, password, callback) {
            $http.post('http://localhost:8000/api-token-auth/', { username: username, password: password })
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        console.log(response.token);
                        // $localStorage.currentUser = { username: username, token: response.token };
                        $sessionStorage.user = { username: username, token: response.token };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }

        return{
            loginCheck : loginCheck
        };
    }
})();
