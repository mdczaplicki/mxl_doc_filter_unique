// ==UserScript==
// @name         Unique filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://docs.median-xl.com/doc/items/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	var uniques = $('.item-unique');
	var new_list = [];
	for (var i = 0; i < uniques.length; ++i) {
		let item = $(uniques[i]);
		new_list.push({
			'name': item.text().trim(),
			'element': item.parent().parent().parent().parent(),
			'magic': item.siblings('.item-magic').text().trim().replace(/\s\s+/g, ' ').toLowerCase()
		})
	}

	var hr = $('hr')[1];
	var filter = $('<input type="text" placeholder="Filter">')
		.css('background', 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)')
		.css('border', '1px solid #302E2E')
		.css('outline-color', '#555')
		.change(function() {
			var value = this.value.toLowerCase();
			for (var i = 0; i < new_list.length; ++i) { new_list[i].element.hide(); }
			$('.uindex').hide();
			$('.p-Items').find('.text_on_the_left').children('br').remove();
			for (var i = 0; i < new_list.length; ++i) {
				var new_obj = new_list[i];
				if (new_obj.magic.includes(value)) {
					new_obj.element.show();
				}
			}
		});
	$(hr).after(filter);
})();
