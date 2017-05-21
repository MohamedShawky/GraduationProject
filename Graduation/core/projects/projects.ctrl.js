// get projects join [shawky backend - halawa frontend]
(function () {
	angular.module('myMainApp.mdl').factory('projectsService', ['$http', function ($http) {
		function getProjectsData() {
			return $http.get('http://localhost:8000/workedProject/');
		}
		return{
			getProjectsData:getProjectsData
		}
	}]);
})();


(function () {
	angular.module('myMainApp.mdl').controller('projects.ctrl', ['$scope', 'projectsService', function ($scope, projectsService) {
		projectsService.getProjectsData().then(function (response) {
			$scope.projects = response.data;
		}).catch(function (err) {
			console.log(err);
		});
	}]);
})();
