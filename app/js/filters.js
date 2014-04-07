'use strict';

/* Filters */

angular.module('phonecatFilters', []).filter('checkmark', function() {
	return function(input) {
		if(input == true || input == false) {
			return input ? '\u2713' : '\u2718';
		} else {
			return input;
		}
	};
});