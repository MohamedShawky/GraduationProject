/**
 * Created by ahmed-halawa on 4/26/2017.
 */
(function () {
    angular.module('myMainApp.mdl').controller('signup.ctrl', ['$scope', 'signUpServices',
        function ($scope, signUpServices) {
        // these for ng-model
        $scope.userName = '';
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.email = '';
        $scope.password = '';
        $scope.confirmPassword = '';

        // validations
        $scope.validateUserstNameLength = false;
        $scope.validateEmail = false;
        $scope.showPassValidation = false;
        $scope.showConfirmPasswordValidation = false;

        //this will applied on user name ToDo [Check and Validate Length]
        $scope.characterLength = 3;
        $scope.checkLength = function (field) {
            if(field.length < $scope.characterLength){
                return false;
            }else if(field.length >= $scope.characterLength){
                return true;
            }
        };

        // this is ToDo [Check and Validate Email]
        $scope.checkEmail = function (email) {
            var pattern = /[a-zA-Z0-9 _.]{3,}@[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,3}/;
            if(email.match(pattern)){
                return true;
            }else if (!email.match(pattern)) {
                return false;
            }
        };

        $scope.checkPassLength = function (pass) {
            if(pass.length < 5){
                return false;
            }else if (pass.length >= 5){
                return true;
            }
        };

        $scope.checkConfirmPassword = function (confirm) {
            if($scope.password === confirm){
                return true;
            }else if($scope.password === confirm){
                return false;
            }
        };

        $scope.signUp = function () {

            if(!$scope.checkLength($scope.userName)) {
                $scope.validateUserstNameLength = true;
            }else if($scope.checkLength($scope.userName)){
                $scope.validateUserstNameLength = false;
            }

            if(!$scope.checkEmail($scope.email)){
                $scope.validateEmail = true;
            }else if($scope.checkEmail($scope.email)){
                $scope.validateEmail = false;
            }

            if(!$scope.checkPassLength($scope.password)){
                $scope.showPassValidation = true;
                $scope.flag1 = false;
            }else if($scope.checkPassLength($scope.password)){
                $scope.showPassValidation = false;
                $scope.flag1 = true;
            }

            if(!$scope.checkConfirmPassword($scope.confirmPassword)){
                $scope.showConfirmPasswordValidation = true;
            }else if($scope.checkConfirmPassword($scope.confirmPassword)){
                $scope.showConfirmPasswordValidation = false;
            }

            if($scope.validateUserstNameLength == false && $scope.validateEmail == false
                && $scope.showPassValidation == false && $scope.showConfirmPasswordValidation == false){

                signUpServices.postUserData(
                    $scope.userName,
                    $scope.firstName,
                    $scope.lastName,
                    $scope.password,
                    $scope.email)
                    .then(function (result) {
                        console.log(result);
                        $scope.userName = '';
                        $scope.firstName = '';
                        $scope.lastName = '';
                        $scope.email = '';
                        $scope.password = '';
                        $scope.confirmPassword = '';
                    },function (data, status) {
                        console.log(data);
                        console.log(status);
                    });
            }

        };

    }
    ]);
})();
