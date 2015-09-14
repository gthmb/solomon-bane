module("Utils Tests");

QUnit.test("Utils.bind", function( assert ) {
	var foo = {
		bar: true
	}

	function unbound(){
		assert.notOk(this == foo);
	}

	var bound = Utils.bind(foo, function(){
		assert.ok(this == foo);
	});

	unbound();
	bound();
});

QUnit.test("Utils addClass/removeClass", function( assert ) {
	var classes = "foo foo-bar";
	var el = document.createElement('div');
	el.className = classes;

	// add new one
	Utils.addClass(el, 'my-class');
	assert.equal(el.className, classes + " my-class");

	// remove it
	Utils.removeClass(el, 'my-class');
	assert.equal(el.className, classes);

	// remove defaults
	Utils.removeClass(el, 'foo');
	assert.equal(el.className, 'foo-bar');

	Utils.removeClass(el, 'foo-bar');
	assert.equal(el.className, '');

	// add multiple
	Utils.addClass(el, classes);
	assert.equal(el.className, classes);

	// remove multiple
	Utils.removeClass(el, classes);
	assert.equal(el.className, "");

	// remove one that does not exist
	Utils.removeClass(el, 'dummy');
	assert.equal(el.className, "");

	// add defaults
	Utils.addClass(el, classes);
	assert.equal(el.className, classes);

	// re-add a default
	Utils.addClass(el, "foo");
	assert.equal(el.className, classes);

	// re-add all defaults
	Utils.addClass(el, classes);
	assert.equal(el.className, classes);
});

QUnit.test("Utils.restrictNumber", function( assert ) {
	assert.strictEqual( Utils.restrictNumber(13, 0, 10), 10);
	assert.strictEqual( Utils.restrictNumber("13", 0, 10), 10);
	assert.strictEqual( Utils.restrictNumber(13, 15, 30), 15);
	assert.strictEqual( Utils.restrictNumber("foo", 15, 30), null);
});

QUnit.test("Utils.padString", function( assert ) {
	assert.strictEqual( Utils.padString(1, '0', 3), "001");
	assert.strictEqual( Utils.padString(10, '0', 3), "010");
	assert.strictEqual( Utils.padString(100, '0', 3), "100");
	assert.strictEqual( Utils.padString(1000, '0', 3), "1000");
	assert.notStrictEqual( Utils.padString(1, '0', 3), "1");
	assert.strictEqual( Utils.padString('hi', ' ', 3), " hi");
});

QUnit.test("Utils.extend", function( assert ) {
	var foo = { bar: true };
	
	var hello = { 
		world: 'earth',
		say: function(){
			return 'hi ' + this.world
		}
	}

	var extended = Utils.extend(foo, hello);

	assert.strictEqual( extended.world, hello.world );
	assert.strictEqual( extended.say, hello.say );
	assert.notEqual( foo.world, hello.world );
	assert.notEqual( foo.say, hello.say );
});

QUnit.test("Utils.formatTemplate", function( assert ) {
	var str = "<p class='{0}'>{1}</p>";

	var res = Utils.formatTemplate(str, ['.success', 'yay!']);
	assert.strictEqual(res, "<p class='.success'>yay!</p>");

	var res = Utils.formatTemplate(str, [, 'yay!']);
	assert.strictEqual(res, "<p class='{0}'>yay!</p>");
});

QUnit.test("Utils.prettifyDate", function( assert ) {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	for(var i=0; i<12; i++){
		var date = new Date(2015, i, 1);
		var res = Utils.prettifyDate(date);
		assert.strictEqual(res, months[i] + " 1, 2015");	
	}
	
});