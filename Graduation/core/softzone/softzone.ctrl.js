/**
 * Created by ahmed-halawa on 4/26/2017.
 */
(function () {
    angular.module('myMainApp.mdl').controller('softzone.ctrl', ['$scope', '$filter', '$http', 'tryServices', '$localStorage',
        'findUserByIdService', 'authenticationService', function ($scope, $filter, $http, tryServices, $localStorage, findUserByIdService, authenticationService) {

            $scope.refreshPageAfterComment = function () {
                tryServices.getData().
                then(function (response) {
                    $scope.problems = response.data;
                }).catch(function () {

                });
            };

            $scope.currentUser = $localStorage.currentUser.username;
            console.log('home controller..');
            console.log($localStorage.currentUser.username);
            console.log($localStorage.currentUser);


            tryServices.getData().
            then(function (response) {
                //$scope.problems = response.data;

                $scope.displayAllProblems = function () {
                    $scope.problems = response.data;
                    $scope.tab = 0;
                };

                $scope.displaySoftWareProblems = function () {
                    $scope.problems = $filter('filter')(response.data, function (d) {
                        return d.category == 'software';
                    });
                    $scope.tab = 1;
                };

                $scope.displayDailyProblems = function () {
                    $scope.problems = $filter('filter')(response.data, function (d) {
                        return d.category == 'daily';
                    });
                    $scope.tab = 2;
                };

                $scope.displayBusinessProblems = function () {
                    $scope.problems = $filter('filter')(response.data, function (d) {
                        return d.category == 'business';
                    });
                    $scope.tab = 3;
                };

                $scope.displayAllProblems();

            }).catch(function (error) {
                console.log(error);
            });

            // $scope.posterUserPopUp = $sessionStorage.user.username;
            $scope.contentPopUp = '';
            $scope.categoryPopUp = '';

            $scope.requireContent = false;
            $scope.requireCategory = false;
            $scope.sessionUser = false;

            $scope.postProblemPopUpDialog = function () {

                $scope.requireContent = false;
                $scope.requireCategory = false;
                $scope.sessionUser = false;

                if($scope.contentPopUp == ''){
                    $scope.requireContent = true;
                    return 0;
                }

                if($scope.categoryPopUp == ''){
                    $scope.requireCategory = true;
                    return 0;
                }

                if($scope.neededId == null){
                    $scope.sessionUser = true;
                    return 0;
                }

                tryServices.postProblem($scope.neededId, $scope.contentPopUp, $scope.categoryPopUp)
                    .then(function (result) {
                        console.log(result);
                        $scope.refreshPageAfterComment();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            };

            $scope.signOut = function () {
                authenticationService.Logout();
            };


            $scope.getIdGivenUserName = function (userName) {
                  findUserByIdService.getAllUsers()
                      .then(function (response) {
                          $scope.currentUserNow = $filter('filter')(response.data, function (d) {
                              return d.username == userName;
                          })[0];

                          if($scope.currentUserNow){
                              $scope.neededId = $scope.currentUserNow.id;
                              console.log($scope.neededId)
                          }
                      })
                      .catch(function (error) {
                          console.log(error);
                      });
            };
            $scope.getIdGivenUserName($localStorage.currentUser.username);












        //    Comment

            $scope.refreshPageAfterComment = function () {
                tryServices.getData().
                then(function (response) {
                    $scope.problems = response.data;
                }).catch(function () {

                });
            };


            $scope.hiddenDiv=[];
            $scope.textModel={
                inx:'',
                val:''
            };
            $scope.showDiv = function (index) {

                // $scope.hiddenDiv[0] = undefined;
                $scope.hiddenDiv[index] = !$scope.hiddenDiv[index];
                $scope.textModel.inx = index;
                $scope.textModel.val = '';
                console.log(index);

                console.error($scope.hiddenDiv);
                console.error($scope.textModel);
            };


            $scope.submitComment = function () {
                console.log('Submit action is called');
                tryServices.postComment($scope.neededId, $scope.textModel.inx, $scope.textModel.val).
                then(function (result) {
                    console.log(result);
                    $scope.refreshPageAfterComment();
                },function (data, status) {
                    console.log(data);
                    console.log(status);
                });
            };



        }

    ]);
})();
