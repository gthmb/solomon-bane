module("SelectValidationField Tests");

QUnit.test("SelectValidationField.doValidation", function( assert ) {
	var sel = createElement({
		type: 'select',
		atts: {
			required: true
		}
	});

	var defaultOpt = createElement({
		type: 'option',
		atts: {
			disabled: true,
			selected: true
		}
	});

	var opt1 = createElement({
		type: 'option',
		atts: {
			value: 1
		}
	});

	sel.appendChild(defaultOpt);
	sel.appendChild(opt1);

	var svf = new SelectValidationField(sel);

	// check defaults
	assert.strictEqual(svf.required, true);
	assert.strictEqual(svf.valid, false);

	// call validate and re-check defaults
	svf.validate()
	assert.strictEqual(svf.required, true);
	assert.strictEqual(svf.valid, false);

	// select a valid option, validate and check
	sel.selectedIndex = 1;
	svf.validate()
	assert.strictEqual(svf.valid, true);

	// make selectec option invalid, validate and check
	opt1.removeAttribute('value');
	svf.validate()
	assert.strictEqual(svf.valid, false);
});