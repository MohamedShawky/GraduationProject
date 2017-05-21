(function () {
	angular.module('myMainApp.mdl').factory('problemsService', ['$http', function ($http) {
		function getProblemsData() {
			return $http.get('http://localhost:8000/problem/');
		}
		return{
			getProblemsData:getProblemsData
		}
	}]);
})();


template:'  <div class="comment" ng-repeat="comment in comments">'+
			'<hr>'+
			'<div class="media" style="padding: 1% 1% 1% 4%;">'+
			'<div class="media-left">'+
			'<a href="#">'+
				'<img class="media-object img-circle" style="width: 40px;height: 40px;" src="img/client2.jpg" width="32" height="32" alt="...">'+
			'</a>'+
			'</div>'+
				'<div class="media-body">'+
					'<a href="#" class="anchor-username">'+
						'<p style="font-size: 15px;" class="media-heading">{{comment.user.username}}</p>'+
					'</a>'+
							'<a href="#" class="anchor-time">{{comment.date}}</a>'+
			'</div>'+
			'<section class="post-body">'+
				'<div style="padding: 1%;">'+
			'<p style="line-height: 1.6em; margin: 0 0 10px 0;font-size: 14px; font-family: 'Roboto', sans-serif; color: #4b4f56;">'+
											{{comment.content}}
			'</p></div>'+
			'</section>'+
			'</div>'+
			'</div>',
