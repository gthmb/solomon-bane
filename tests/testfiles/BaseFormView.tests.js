module("BaseFormView Tests");

QUnit.test("BaseFormView.show", function( assert ) {
	var el = createElement({
		type: 'div',
		inner: "" +
		"<form>" +
			"<input type='text' name='foo' value='bar'></input>" +
			"<input type='text' name='name' required='true'></input>" +
			"<select name='hello'>" +
				"<option disabled value=''></option>" +
				"<option value='world' selected></option>" +
				"<option value='pizza'></option>" +
				"<option value='rap music'></option>" +
			"<select>" +
		"</form>"
	});

	var fv = new BaseFormView(el);
	assert.notOk(fv.isValid());

	el.querySelector('[name=name]').value = 'jon';
	assert.ok(fv.isValid());

	assert.propEqual(fv.getData(), { foo: 'bar', name: 'jon', hello: 'world'});

	fv.setData({ name: 'colleen', hello: 'pizza'});
	assert.ok(fv.isValid());
	assert.propEqual(fv.getData(), { foo: 'bar', name: 'colleen', hello: 'pizza'});

	fv.setData({ name: null, hello: 'pizza'});
	assert.notOk(fv.isValid());

	fv.setData({ name: "bandit"});
	assert.ok(fv.isValid());

	// phantom.js and the browser yeild different results
	// fv.setData({ hello: "option does not exist"});
	// assert.strictEqual(fv.getData().hello, '');
	// assert.ok(fv.isValid());

	fv.setData({ hello: "rap music"});
	assert.strictEqual(fv.getData().hello, 'rap music');
	assert.ok(fv.isValid());
});