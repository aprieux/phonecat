'use strict';

/* Controllers */
var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.phones = [];
	$scope.phoneOrder = 'age';
	$scope.phoneLimit = 20;
	$http.get('phones/phones.json').success(function(data) {
		$scope.phones = data;
	});
}]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
		$scope.phone = data;
	});
}]);
