/**
 * Created by ahmed on 4/7/2017.
 */
(function () {
    angular.module('myMainApp.mdl')
        .directive('userInfo', ['$filter', 'findUserByIdService', function($filter, findUserByIdService) {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {
                    id: "="
                },
                template: '<a style="text-decoration:none;">{{user}}</a>',
                controller: function($scope) {
                    $scope.user = '';
                    findUserByIdService.getAllUsers()
                        .then(function (response) {
                            var poster_user = $filter('filter')(response.data, function (d) {
                                return d.id == $scope.id;
                            })[0];
                            if(poster_user) {
                                $scope.user = poster_user.username;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        }]);
})();