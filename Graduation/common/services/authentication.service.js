(function () {
    angular.module('myMainApp.mdl').factory('authenticationService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(username, password, callback) {
            $http.post('http://localhost:8000/api-token-auth/', { username: username, password: password })
                .then(function (response) {
                    // login successful if there's a token in the response
                    if (response.data.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        console.log(response.data.token);
                        $localStorage.currentUser = { username: username, token: response.data.token };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'ahmed ' + response.data.token;

                        console.log('vi');
                        console.log($http.defaults.headers.common.Authorization);

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                }).catch(function (error) {
                    // console.log('an error');
                    // console.log(error);
                    callback(false);
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            console.log('user has been deleted..');
        }
    }
})();
