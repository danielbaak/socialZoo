angular.module('app').controller('Login', function ($scope, $auth, $http) {

	var user = { id: '' };

	$scope.login = function () {
		$auth.authenticate('twitter');
	};

	$scope.tweet = function () {
		$http.post('api/post/tweet', '').then(function () {

		});
	}

	$scope.user = function () {
		$http.get('api/user/' + user.id, '').then(function (err, user) {
			console.log("user details: ", err, user);
			return user;
		});
	}
});