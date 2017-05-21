/**
 * Created by ahmed on 3/19/2017.
 */
(function () {
    angular.module('myMainApp.mdl').factory('tryServices', ['$http', tryServices]);
    function tryServices($http) {

        function getData() {
            return $http.get('http://localhost:8000/problem/');
        }

        function postProblem(poster, content, category) {
            console.log('Post Data');
            return $http.post('http://localhost:8000/problem/',{
                content: content,
                problem_rate: 1,
                category: category,
                publish_user: poster
            });
        }

        function postComment(userId, problemId, content) {
            console.log('Post Comment');
            return $http.post('http://localhost:8000/comment/',{
                content: content,
                problem: problemId,
                user: userId
            });
        }

        return{
            getData : getData,
            postProblem : postProblem,
            postComment: postComment
        };
    }
})();

