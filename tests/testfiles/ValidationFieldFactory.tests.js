module("ValidationFieldFactory Tests");

QUnit.test("ValidationFieldFactory.create", function( assert ) {
	
	// select
	assert.strictEqual(ValidationFieldFactory.create(createElement({
		type: 'select'
	})) instanceof SelectValidationField, true );

	// text
	assert.strictEqual(ValidationFieldFactory.create(createElement({
		type: 'input',
		atts: {
			type: 'text'
		}
	})) instanceof TextValidationField, true );

	// number
	assert.strictEqual(ValidationFieldFactory.create(createElement({
		type: 'input',
		atts: {
			type: 'number'
		}
	})) instanceof TextValidationField, true );

	// email
	assert.strictEqual(ValidationFieldFactory.create(createElement({
		type: 'input',
		atts: {
			type: 'email'
		}
	})) instanceof TextValidationField, true );

	/* unsupported elements */

	// checkbox
	assert.strictEqual(ValidationFieldFactory.create(createElement({
		type: 'input',
		atts: {
			type: 'checkbox'
		}
	})), null);

	// textarea
	assert.strictEqual(ValidationFieldFactory.create(createElement({
		type: 'textarea'
	})), null);
});