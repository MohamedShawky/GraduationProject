/**
 * Created by ahmed-halawa on 4/26/2017.
 */
(function () {
    angular.module('myMainApp.mdl').controller('login.ctrl', ['$scope', '$location',
        'authenticationService', function ($scope, $location, authenticationService) {

        $scope.username = '';
        $scope.password = '';
        $scope.loginValid = false;

        $scope.loginAction = function () {
            // loginServices.loginCheck()
            //     .then(function (response) {
            //         $scope.user = $filter('filter')(response.data, function (d) {
            //             return d.user_name == $scope.username && d.password == $scope.password;
            //         })[0];
            //         console.log($scope.user);
            //         if($scope.user != null){
            //             $location.path('/welcome');
            //             console.log('Yes');
            //         }else {
            //             console.log('Not valid');
            //             $scope.loginValid = true;
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });

            authenticationService.Login($scope.username, $scope.password, function (result) {
                if (result === true) {
                    console.log('true');
                    $location.path('/softzone');
                } else {
                    console.log('false');
                    $scope.loginValid = true;
                }
            });
            // authenticationService.Logout();

        };
        console.log('login');
    }]);
})();
