// get problems join [shawky backend - halawa frontend]
(function () {
	angular.module('myMainApp.mdl').factory('problemsService', ['$http', function ($http) {
		function getProblemsData() {
			return $http.get('http://localhost:8000/worked/');
		}
		return{
			getProblemsData:getProblemsData
		}
	}]);
})();

// this service will post a problem to backend
(function () {
	angular.module('myMainApp.mdl').factory('postProblem', ['$http', function ($http) {
		function postProblemData(publish_user, content, category, problem_rate) {
			return $http.post('http://localhost:8000/problem/', {
				publish_user:publish_user,
				content:content,
				category:category,
				problem_rate:problem_rate
			});
		}
		return{
			postProblemData:postProblemData
		}
	}]);
})();

// this service will post a comment to backend
(function () {
	angular.module('myMainApp.mdl').factory('postCommentService', ['$http', function ($http) {
		function postCommentData(user, content, problem) {
			return $http.post('http://localhost:8000/commentproblem/', {
				user:user,
				content:content,
				problem:problem
			});
		}
		return{
			postCommentData:postCommentData
		}
	}]);
})();

// problems join service [shawky] controller
(function () {
	angular.module('myMainApp.mdl').controller('problems.ctrl', ['$scope', 'problemsService', 'authenticationService', '$localStorage',
	'postProblem', 'findUserByIdService', '$filter', 'postCommentService', function ($scope, problemsService, authenticationService,
		 $localStorage, postProblem, findUserByIdService, $filter, postCommentService) {

		$scope.currentUserNow = $localStorage.currentUser.username;
		console.log($scope.currentUserNow);

		// needed ID
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


		// get problems for ngRepeat
		problemsService.getProblemsData()
		.then(function (response) {
				$scope.problems = response.data;
		})
		.catch(function (err) {
				console.log('Error : '+err);
		});

		// this is to post problem on backend
		$scope.postProblemBackEnd = function () {
			postProblem.postProblemData($scope.neededId, $scope.newProblem.content, $scope.categoryPopUp, 1)
			.then(function (response) {
				console.log(response);
			}).catch(function (err) {
				console.log(err);
			});
		};

		// this is to post problem on frontend
		$scope.newProblem = {};
		$scope.postProblemFrontEnd = function () {
			$scope.newProblem.date = '2017-05-16T02:15:07.017000Z';
		  $scope.newProblem.publish_user = {username : $localStorage.currentUser.username};
			$scope.problems.push($scope.newProblem);
			$scope.newProblem.Comment = [];
			console.log($scope.problems);
			$scope.postProblemBackEnd();
			$scope.newProblem = {};
		};


		// this is to post comment on backend
		$scope.postCommentBackEnd = function (proId, contentModel) {
			console.log(proId);
			postCommentService.postCommentData($scope.neededId, contentModel, proId)
			.then(function (response) {
				console.log(response);
			}).catch(function (err) {
				console.log(err);
			});
		};

		// this is to post comment on frontend
		$scope.newComment = {};
		$scope.postCommentFrontEnd = function (key, proId) {
			// get array of comments from backend
			console.log(proId);
			$scope.newComment[key].date = '2017-05-16T02:15:07.017000Z';
		  $scope.newComment[key].user = {username : 'ahmed'};
			$scope.problems[key].Comment.push($scope.newComment[key]);
			$scope.postCommentBackEnd(proId, $scope.newComment[key].content)
			$scope.newComment = {};
		};

	}]);
})();
