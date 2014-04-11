'use strict';

/* Stylized */
var phonecatStylize = angular.module('phonecatStylize', ['ngResource']);

phonecatStylize.factory('StylizeService', ['$resource', function($resource) {
	return {colorised: function(nodes) {

		var excluded = function(elt) {
			var excludes = [/view-frame/, /phoneSearch/];
			var name = elt.className;
			if(!name)
				return false;
			var found = false;
			$.each(excludes, function(index, matcher) {
				if(name.match(matcher)) {
					found = true;
					return false;
				}
			});
			return found;
		}

		var k = 0;
		var r = 0
		var g = 0;
		var b = 0;
		var ra = false;
		var ga = false;

		for (var i = 0; i < nodes.length; i++) {
			k = k + 8;
			var crawler = function(elt, count) {
				k = k + 8;
				if(ra && !ga) {
					g = k;
					b = 0;
					if(k >= 255) {
						ga = true;
						g = 255;
						k = 0;
					}
				} else if(ga) {
					b = k;
					if(k >= 255) {
						ra = false;
						ga = false;
						b = 255;
						k = 0;
					}
				} else {
					r = k;
					g = 0;
					b = 0;
					if(k >= 255) {
						ra = true;
						r = 255;
						k = 0;
					}
				}
				if(!excluded(elt)) {
					elt.style.border = "dotted rgb(" + b + "," + g + "," + r + ") 1px";
					elt.style.backgroundColor = "rgb(" + r + "," + r + "," + g + ")";
				}
				if(elt.children) {
					for (var j = 0; j < elt.children.length; j++) {
						count = count + j;
						setTimeout((function(p1, p2, p3) {
							return function() {
								crawler(p2[p1], p3);
							}
						})(j, elt.children, count), 500);
						console.log(k);
					}
				}
			}
			crawler(nodes[i], i + 1);
		}
	}, 
	addEventListener: function(nodes) {
		for (var i = 0; i < nodes.length; i++) {
			var crawler = function(elt) {
				elt.addEventListener('click', function(e) {
					e.preventDefault();
					console.log(this.className);
				}, 'false');
				if(elt.children) {
					for (var j = 0; j < elt.children.length; j++) {
						setTimeout((function(index, pNodes) {
							return function() {
								crawler(pNodes[index]);
							}
						})(j, elt.children), 10 * i);
					}
				}
			};
			crawler(nodes[i]);
		}
	}};
}]);
