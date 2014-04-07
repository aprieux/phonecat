'use strict';

/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function() {

	beforeEach(module('phonecatApp'));
	beforeEach(module('phonecatServices'));

	describe('PhoneListCtrl', function() {
		var scope, ctrl, $httpBackend;

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('phones/phones.json').respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
			scope = $rootScope.$new();
			ctrl = $controller('PhoneListCtrl', {$scope: scope});
		}));

		it('should create "phones" model with 2 phones fetched from xhr', function() {
			expect(angular.equals(scope.phones, []));
			$httpBackend.flush();
			expect(scope.phones.length).toBe(2);
			expect(angular.equals(scope.phones, [{name: 'Nexus S'}, {name: 'Motorola DROID'}]));
		});

		it('should set the default value of phoneOrder property', function() {
			expect(scope.phoneOrder).toBe('age');
		});
	});

	describe('PhoneDetailCtrl', function() {
		var scope, ctrl, $httpBackend;
		var xyzPhoneData = function() {
			return {name: 'phone xyz', images: ['image/url1.png', 'image/url2.png']}
		};

		beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());
			$routeParams.phoneId = "xyz";
			scope = $rootScope.$new();
			ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
		}));

		it('should fetch phone detail', function() {
			expect(scope.phone).toBeUndefined();
			$httpBackend.flush();
			expect(scope.phone.name).toBe("phone xyz")
		});

	});

});
