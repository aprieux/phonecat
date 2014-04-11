'use strict';

/* App Module */
var phonecatApp = angular.module('phonecatApp', [
	'ngRoute',
	'ngAnimate',
	'ngResource',
	'phonecatControllers',
	'phonecatFilters',
	'phonecatServices',
	'phonecatAnimations',
	'phonecatStylize'
]);

phonecatApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/phones', {
	   templateUrl: 'partials/phone-list.html',
	   controller: 'PhoneListCtrl'
	}).when('/phones/:phoneId', {
		templateUrl: 'partials/phone-detail.html',
		controller: 'PhoneDetailCtrl'
	}).when('/closure', {
		templateUrl: 'partials/closure.html',
		controller: 'ClosureCtrl'
	}).otherwise({
		redirectTo: '/phones'
    });
}]);