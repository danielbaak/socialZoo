angular.module('app').controller('Authentication', function ($scope, $auth, $http) {
	$scope.isAuthenticated = $auth.isAuthenticated;

	$scope.login = function () {
		$auth.authenticate('twitter');
	};

	$scope.logout = function () {
		$auth.logout();
	}
});