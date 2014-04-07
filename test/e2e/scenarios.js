'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {
	
	browser.get('app');

	describe('Phone List view', function() {
		var phonesRpt = by.repeater('phone in phonesFiltered = (phones | filter:phoneQuery | limitTo:phoneLimit | orderBy:phoneOrder)');
		var phones = element.all(phonesRpt);
		var nameColumn = element.all(phonesRpt.column('{{phone.name}}'));
		var filter = element(by.model('phoneQuery'));
		var order = element(by.model('phoneOrder'));
		var result = element(by.css('.result'));

		it('should have the list to 20 items and display the following result : "Total phones : 20 on 20"', function() {
			expect(phones.count()).toBe(20);
			expect(result.getText()).toBe('Total phones : 20 on 20');
		});

		it('should filter the list of phones', function() {
			filter.sendKeys('motorola');
			expect(phones.count()).toBe(8);
			expect(result.getText()).toBe('Total phones : 8 on 20');
		});

		it('should order the list of phones by default then by the select box order "Alphabetical" with a filter applyed', function() {
			filter.clear();
			filter.sendKeys('Motorola XOOM');

			expect(getNames()).toEqual(["New Motorola XOOM\u2122 with Wi-Fi", "MOTOROLA XOOM\u2122"]);
			expect(result.getText()).toBe('Total phones : 2 on 20');

			order.findElement(by.css('option[value="name"]')).click();

			expect(getNames()).toEqual(["MOTOROLA XOOM\u2122", "New Motorola XOOM\u2122 with Wi-Fi"]);
			expect(result.getText()).toBe('Total phones : 2 on 20');
		});

		// Utils
		function getNames() {
			return nameColumn.map(function(elm) {
				return elm.getText();
			});
		}

	});
	
	
	describe('Phone Detail view', function() {
		
		it('should build a well-formed url by clicking a mobile phone link', function() {
			element(by.css('ul li:nth-child(1) a')).click();
			browser.getLocationAbsUrl().then(function(url) {expect(url.split('#')[1]).toBe('/phones/motorola-xoom');});
		});
		
		it('should be on the good view regarding the url', function() {
			var phone = element(by.binding('phone.name'));
			expect(phone.getText()).toBe('MOTOROLA XOOM\u2122');
		});
		
		it('should display the main picture with the img clicked', function(){
			element(by.css('.phone-thumbs li:nth-child(2) img')).click();
			expect(element(by.css('img.phone')).getAttribute('src')).toMatch('/img\/phones\/motorola-xoom.1.jpg');
		});
		
	});
	

});
