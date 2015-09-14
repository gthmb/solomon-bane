module("BaseValidationField Tests");

QUnit.test("BaseValidationField.const", function( assert ) {
	// should default to required=false
	assert.notOk(new BaseValidationField(createElement({
		type: 'input'
	})).required);

	// should be required=true
	assert.ok(new BaseValidationField(createElement({
		type: 'input',
		atts: {
			required: "true"
		}
	})).required);

	// should default to valid=false
	assert.notOk(new BaseValidationField(createElement({
		type: 'input'
	})).valid);

	// create a form with an input and add a validation helper
	var form = createElement({ type: 'form' });
	var first_name = createElement({
		type: 'input',
		atts: {
			name: 'first_name',
			required: 'true'	
		}
	});
	var helper = createElement({
		type: 'div',
		atts: {
			helps: 'first_name'
		}
	});
	var helper2 = createElement({
		type: 'div',
		atts: {
			helps: 'first_name'
		}
	});

	form.appendChild(first_name);
	form.appendChild(helper);

	// should store 'helper' as the validation helper
	var vf = new BaseValidationField(first_name)
	assert.equal(vf.validationHelpers[0], helper);
	assert.equal(vf.validationHelpers.length, 1);

	// append a second validation helper and make sure both are listed
	form.appendChild(helper2)
	var vf = new BaseValidationField(first_name)
	assert.equal(vf.validationHelpers[0], helper);
	assert.equal(vf.validationHelpers[1], helper2);
	assert.equal(vf.validationHelpers.length, 2);
});

QUnit.test("BaseValidationField.validate", function( assert ) {
	var vf = new BaseValidationField(createElement({
		type: 'input'
	}));

	vf.validate();
	assert.equal(vf.el.className, "");

	vf.required = true;
	vf.validate();
	assert.ok(vf.el.className.indexOf('has-error') > -1);

	vf.valid = true;
	vf.validate();
	assert.ok(vf.el.className.indexOf('has-error') == -1);

	vf.el.value = "foo";
	vf.validate();
	assert.ok(vf.el.className.indexOf('has-error') == -1);

	vf.valid = false;
	vf.validate();
	assert.ok(vf.el.className.indexOf('has-warning') == -1);

	vf.valid = true;
	vf.validate();
	assert.ok(vf.el.className.indexOf('has-error') == -1);
});
