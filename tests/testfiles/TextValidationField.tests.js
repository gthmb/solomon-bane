module("TextValidationField Tests");

QUnit.test("TextValidationField.const", function( assert ) {
	var inpt = createElement({
		type: 'input',
		atts: {
			type: 'text',
			required: true
		}
	});

	var vf = new TextValidationField(inpt);

	// check defaults
	assert.strictEqual(vf.required, true);
	assert.strictEqual(vf.valid, false);
	assert.strictEqual(vf.pattern, null);
	assert.strictEqual(vf.formats, null);
	assert.strictEqual(vf.validChars, null);
	assert.strictEqual(vf.pad, null);

	inpt = createElement({
		type: 'input',
		atts: {
			type: 'text',
			required: true,
			pattern: '^[0-9]{3}-[0-9]{2}-[0-9]{4}$',
			format: "ssn|phone|ucfirst",
			pad: '0|2',
			validChars: '\\d'
		}
	});

	vf = new TextValidationField(inpt);

	assert.strictEqual( String(vf.pattern), "/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/" );
	assert.strictEqual( String(vf.validChars), "/\\d/" );
	assert.propEqual( vf.pad, { char: '0', length: 2} )
	assert.propEqual( vf.formats, ['ssn','phone','ucfirst'] )
});

QUnit.test("TextValidationField.doValidation", function( assert ) {
	var inpt = createElement({
		type: 'input',
		atts: {
			type: 'text',
			required: true
		}
	});

	var vf = new TextValidationField(inpt);

	// call validate and re-check defaults
	vf.validate()
	assert.strictEqual(vf.required, true);
	assert.strictEqual(vf.valid, false);
	
	vf.el.value = " foo ";
	vf.validate()
	assert.strictEqual(vf.valid, true);
	assert.strictEqual(vf.el.value, 'foo');

	// test padding...
	vf.pad = {char: ' ', length: 10}
	vf.validate()
	assert.strictEqual(vf.valid, true);
	assert.strictEqual(vf.el.value, '       foo');

	vf.pad = null;
	vf.validate()
	assert.strictEqual(vf.valid, true);
	assert.strictEqual(vf.el.value, 'foo');

	// test valid chars
	vf.validChars = /\d/;
	vf.el.value = "abc123";
	vf.onChange();
	vf.validate()
	assert.strictEqual(vf.el.value, '123');

	var fakeevt = {
		which: String('a').charCodeAt(0), 
		preventDefault: function(){}
	}

	var kp = vf.onKeypress(fakeevt);
	assert.strictEqual(kp, false);

	fakeevt.which = String('1').charCodeAt(0);

	kp = vf.onKeypress(fakeevt);
	assert.strictEqual(kp, undefined);
	
	vf.validChars = null;
	
	// test pattern
	vf.pattern = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/
	vf.el.value = "foo";
	vf.validate();
	assert.strictEqual(vf.valid, false);
	assert.strictEqual(vf.el.value, "foo");

	vf.pattern = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/
	vf.el.value = "123456789";
	vf.validate();
	assert.strictEqual(vf.valid, false);

	vf.el.value = "123-45-6789";
	vf.validate();
	assert.strictEqual(vf.valid, true);
});

QUnit.test("TextValidationField.applyFormats", function( assert ) {
	var vf = new TextValidationField(createElement({
		type: 'input',
		atts: {
			format: "ucfirst"
		}
	}));

	// ucfirst
	vf.el.value = ' jon ';
	vf.validate()
	assert.strictEqual(vf.el.value, 'Jon');

	vf.formats = ['comma_int']
	vf.el.value = '1234567890';
	vf.validate()

	// comma_int
	assert.strictEqual(vf.el.value, '1,234,567,890');
	vf.el.value = ' 1 23a45!678#90.000  ';
	vf.validate()
	assert.strictEqual(vf.el.value, '1,234,567,890');

	// ssn
	vf.formats = ['ssn']
	vf.el.value = '123456789';
	vf.validate()
	assert.strictEqual(vf.el.value, '123-45-6789');

	vf.el.value = '123 45 6789';
	vf.validate()
	assert.strictEqual(vf.el.value, '123-45-6789');

	vf.el.value = '1234567890';
	vf.validate()
	assert.strictEqual(vf.el.value, '1234567890');

	vf.el.value = '12345';
	vf.validate()
	assert.strictEqual(vf.el.value, '12345');

	// phone
	vf.formats = ['phone']
	vf.el.value = '1234567890';
	vf.validate()
	assert.strictEqual(vf.el.value, '(123) 456-7890');

	vf.el.value = '123456789';
	vf.validate()
	assert.strictEqual(vf.el.value, '123456789');

	vf.el.value = '123.456.7890';
	vf.validate()
	assert.strictEqual(vf.el.value, '(123) 456-7890');

	vf.el.value = '(123) 456-7890';
	vf.validate()
	assert.strictEqual(vf.el.value, '(123) 456-7890');
});