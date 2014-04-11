'use strict';

/* Controllers */
var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'PhoneService', 'StylizeService', function($scope, PhoneService, StylizeService) {
	$scope.phoneOrder = 'age';
	$scope.phoneLimit = 20;
	$scope.phones = PhoneService.query();
	
	$scope.colorised = function(){
		StylizeService.colorised(document.body);
	}
	$scope.addEventListener = function() {
		StylizeService.addEventListener(document.body);
	};
}]).directive('searchresume', function() {
    return {
    	template: '[Filter resume] => <b class="evict">Order:</b> {{phoneOrder}} - <b class="evict">Limit:</b> {{phoneLimit}} - <b class="evict">filter:</b> {{phoneQuery}}'
    };
});

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
		$scope.phone = data;
		$scope.mainImageUrl = data.images[0];
	});
	$scope.setImage = function (imgUrl) {
		$scope.mainImageUrl = imgUrl;
	};
}]);

phonecatControllers.controller('ClosureCtrl', ['$scope', 'StylizeService', function($scope, StylizeService) {
	$scope.colorised = function() {
		StylizeService.colorised(document.body);
	};
	$scope.addEventListener = function() {
		StylizeService.addEventListener(document.body);
	};
	
}]);
