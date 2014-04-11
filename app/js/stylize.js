'use strict';

/* Stylized */
var phonecatStylize = angular.module('phonecatStylize', []);

phonecatStylize.factory('StylizeService', function() {
	
	var excluded = function(elt) {
		var excludes = [/evict/], name = elt.className,  found = false;
		if(!name){return false;}
		$.each(excludes, function(index, matcher) {
			if(name.match(matcher)) {found = true;return false;}
		});
		return found;
	}
	
	return {
		colorised: function(root, brutCrawl) {
			var k = 0, r = 0, g = 0, b = 0, ra = false, ga = false;
			var crawler = function(elt) {
				k = k + 4;
				if(ra && !ga) {
					g = k, b = 0;
					if(k >= 255) {
						ga = true, g = 255, k = 0;
					}
				} else if(ga) {
					b = k;
					if(k >= 255) { 
						ra = false, ga = false, b = 255, k = 0;
					}
				} else {
					r = k, g = 0, b = 0;
					if(k >= 255) {
						ra = true, r = 255, k = 0;
					}
				}
				if(!excluded(elt)) {
					if(brutCrawl){
						if(elt.className=="thumb"){
							$(elt).css({animation:'spinIt 1s'})
						}else{
							elt.style.border = "dotted rgb(" +b+ "," +g+ "," +r+ ") 1px";
							//$(elt).css({animation:'mymove 5s infinite'})
							$(elt).css({animation:'spinIt 2s', 'background-color':"rgb(" +r+ "," +g+ ",185)"})
						}
					} else {
						if(elt.className=="thumb"){
							$(elt).css({animation:'spinIt 1s'})
						}else{
							elt.style.border = "dotted rgb(" +b+ "," +g+ "," +r+ ") 1px";
							elt.style.backgroundColor = "rgb(" +r+ "," +g+ ",185)";
						}
					}
					
				}
				if(elt.children) {
					for (var j = 0; j < elt.children.length; j++) {
						setTimeout((function(index, pNodes) {return function() {
							crawler(pNodes[index]);}}
						)(j, elt.children), 100*j*2);
					}
				}
			}
			crawler(root);
		}, 
		addEventListener: function(root) {
			var crawler = function(elt) {
				elt.addEventListener('click', function(e) {e.preventDefault();console.log(this.className);}, 'false');
				if(elt.children) {
					for (var j = 0; j < elt.children.length; j++) {
						setTimeout((function(index, pNodes) {return function() {
							crawler(pNodes[index]);}}
						)(j, elt.children), 10);
					}
				}
			};
			crawler(root);
		},
		waitingAnimation: function(elt){
			
		}
	};
});
