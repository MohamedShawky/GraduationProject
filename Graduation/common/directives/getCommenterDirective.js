/**
 * Created by ahmed on 4/17/2017.
 */
(function () {
    angular.module('myMainApp.mdl')
        .directive('commenterDirective', ['$filter', '$http', function($filter, $http) {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {
                    name: "="
                },
                template: '<p>{{user}}</a>',
                controller: function($scope) {
                    console.log('ahmed');
                    $scope.user = '';
                    $http({method:'GET', url:'http://localhost:8000/user/'}).
                        then(function (response) {
                        var poster_user = $filter('filter')(response.data, function (d) {
                            return d.id == $scope.name;
                        })[0];
                        if(poster_user) {
                            $scope.user = poster_user.username;
                            console.warn('ooooooooooooooooooooooooooooooo');
                        }else{
                            console.warn('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            }
        }]);
})();