module("BaseView Tests");

QUnit.test("BaseView.show", function( assert ) {
	var el = createElement({
		type: 'div'
	});

	var bv = new BaseView(el);

	bv.show(false);
	assert.ok(el.className.indexOf('hidden') > -1);

	bv.show();
	assert.ok(el.className.indexOf('hidden') == -1);
	assert.ok(el.className.indexOf('fade-in') > -1);

	bv.show(false);
	bv.show(true);
	assert.ok(el.className.indexOf('hidden') == -1);
	assert.ok(el.className.indexOf('fade-in') > -1);
});