var TextValidationField = function(el){
	this.init(el);
}

TextValidationField.prototype = Utils.extend(BaseValidationField.prototype, {
	init: function(){
		BaseValidationField.prototype.init.apply(this, arguments);	

		this.pattern = this.el.attributes.pattern ? new RegExp(this.el.attributes.pattern.value) : null,
		this.formats = this.el.attributes.format ? this.el.attributes.format.value.split('|') : null;
		this.validChars = this.el.attributes.validchars ? new RegExp(this.el.attributes.validchars.value) : null;

		if(this.el.attributes.pad){
			var parr = this.el.attributes.pad.value.split('|');
			this.pad = {
				char: parr[0],
				length: parseInt(parr[1]),
			}
		} else {
			this.pad = null;
		}

		if(this.validChars){
			var self = this;
			this.el.addEventListener('keypress', Utils.bind(this, this.onKeypress), this);
			this.el.addEventListener('change', Utils.bind(this, this.onChange), this);
		}
	},

	onKeypress: function(evt){
		if(evt.which == 8 || evt.which == 9 || evt.which == 13 || evt.which == 0){
			return true;
		}

		var chr = String.fromCharCode(evt.which);
		if(!this.validChars.test(chr)){
			evt.preventDefault();
			return false;
		}
	},

	onChange: function(evt){
		var val = "";
		for(var el in this.el.value){
			if(this.validChars.test(this.el.value[el])){
				val += this.el.value[el];
			}
		}

		this.el.value = val;
	},

	doValidation: function(){
		var val = this.el.value.replace(/^\s+|\s+$/g, '');

		if(this.formats){
			val = this.applyFormats(val);
		}

		if(!val){
			this.valid = false;
			return;
		}

		if(this.pattern && !this.pattern.test(val)){
			this.valid = false;
			return;
		}

		if(this.pad){
			val = Utils.padString(val, this.pad.char, this.pad.length);
		}

		this.valid = true;

		this.el.value = val;
	},

	applyFormats:  function(val){
		for(var el in this.formats){
			var fmat = this.formats[el];
			switch(fmat){
				case 'ucfirst':
					val = val.substr(0, 1).toUpperCase() + val.substr(1);
					break;

				case 'ssn':
					val = val.replace(/[^0-9]/g, '');
					val = val.replace(/^(\d{3})(\d{2})(\d{4})$/, '$1-$2-$3');
					break;

				case 'phone':
					val = val.replace(/[^0-9]/g, '');
					val = val.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
					break;

				case 'comma_int':
					val = val.split('.')[0];
					val = val.replace(/[^0-9]/g, '');
					val = val.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,")
					break;
			}
		}

		return val;
	}
})