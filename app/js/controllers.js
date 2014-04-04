'use strict';

/* Controllers */
var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', function($scope, $http) {
	$scope.phones = [];
	$scope.phoneOrder = 'age';
	$scope.phoneLimit = 20;
	$http.get('phones/phones.json').success(function(data) {
		$scope.phones = data;
	});
});

phonecatControllers.controller('PhoneDetailCtrl', function($scope, $routeParams) {
	console.log($routeParams);
	$scope.phoneId = $routeParams.phoneId
});