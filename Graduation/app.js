/**
 * Created by ahmed-halawa on 4/26/2017.
 */
(function () {

    angular.module('myMainApp.mdl', ['ui.router', 'ngStorage']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login',{
                url:'/login',
                controller:'login.ctrl',
                templateUrl:'core/login/login1.tpl.html'
            })
            .state('signup',{
                url:'/signup',
                controller:'signup.ctrl',
                templateUrl:'core/signup/signup.tpl.html'
            })
            .state('softzone',{
                url:'/softzone',
                controller:'softzone.ctrl',
                templateUrl:'core/softzone/softzone.tpl.html'
            })
            .state('softzone.problems',{
                url:'/problems',
                controller:'problems.ctrl',
                templateUrl:'core/problems/problems.tpl.html'
            })
            .state('softzone.projects',{
              url:'/projects',
              controller:'projects.ctrl',
              templateUrl:'core/projects/projects.tpl.html'
            })

    }]).run(run);



    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'ahmed ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }

    angular.module('myMainApp.mdl').directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
            console.log("NG ENTER ___ -----")
        };
    });
})();




//chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
