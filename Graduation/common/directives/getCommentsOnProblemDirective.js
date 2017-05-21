/**
 * Created by ahmed on 4/16/2017.
 */
// (function () {
//     angular.module('softZoneAppModule').directive('commentDirective', ['$http', commentDirective]);
//     function commentDirective($http) {
//         return {
//             templateUrl: 'directives/getCommentsOnProblemDirectiveView.html',
//             restrict: 'E',
//             transclude: true,
//             replace: true,
//             scope:{
//                 src:"="
//             },
//             controller:function($scope){
//                 console.info("enter directive controller");
//                 $scope.comments = [];
//                 console.log($scope.src);
//
//                 $http(
//                     {
//                         method: 'GET',
//                         url:'http://localhost:3000/api/comments/on/'+$scope.src
//                     }).then(function (result) {
//                     $scope.comments = result.data;
//                     console.log(result.data);
//                 }).catch(function (err) {
//                     console.log('Error is here : '+err);
//                 });
//             }
//         }
//     }
// })();
(function () {
    angular.module('myMainApp.mdl').directive('commentDirective', ['$http', '$filter', commentDirective]);
    function commentDirective($http, $filter) {
        return {
            // templateUrl: 'directives/getCommentsOnProblemDirectiveView.html',

            template:'<div class="panel-default" ng-repeat="comment in comments">' +
            '<div class="panel-body">' +
            '<div class="pull-left"> <a href="#"> ' +
            '<img class="media-object img-circle" src="img/client3.jpg" width="35px" height="35px" style="margin-right:8px; margin-top:-5px;"> ' +
            '</a> ' +
            '</div>' +
            '<h4><a href="#" style="text-decoration:none;"><strong><commenter-directive name="comment.user"></commenter-directive></strong></a></h4> <hr>' +
            '<div class="post-content">Yet another post.<br><br> {{comment.content}} <br><small><small>' +
            '<a href="#" style="text-decoration:none; color:grey;"><i>' +
            '<i class="fa fa-clock-o" aria-hidden="true"></i> {{comment.date}}</i>' +
            '</a></small></small> </div>' +
            '</div>' +
            '</div>',



            restrict: 'E',
            transclude: true,
            replace: true,
            scope:{
                src:"="
            },
            controller:function($scope){
                console.info("enter directive controller");
                $scope.comments = [];
                console.log($scope.src);

                $http(
                    {
                        method: 'GET',
                        url:'http://localhost:8000/comment/'
                    }).then(function (result) {
                    var commentsOnProblem = $filter('filter')(result.data, function (d) {
                        return d.problem == $scope.src;
                    });
                    if(commentsOnProblem) {
                        $scope.comments = commentsOnProblem;
                    }
                }).catch(function (err) {
                    console.log('Error is here : '+err);
                });
            }
        }
    }
})();