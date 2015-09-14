var AgeValidator = function(opts){
	this.init(opts);
}

AgeValidator.prototype = {
	init: function(opts){
		this.min = opts.min * 31557600000;
		this.month_el = opts.month_el;
		this.day_el = opts.day_el;
		this.year_el = opts.year_el;
		this.validationHelper = opts.validationHelper;

		if(!this.month_el || !this.day_el || !this.day_el){
			return;
		}

		this.month_el.addEventListener('blur', Utils.bind(this, this.onFieldBlur), false);
		this.day_el.addEventListener('blur', Utils.bind(this, this.onFieldBlur), false);
		this.year_el.addEventListener('blur', Utils.bind(this, this.onFieldBlur), false);

		this.month_el.addEventListener('focus', Utils.bind(this, this.onFieldFocus), false);
		this.day_el.addEventListener('focus', Utils.bind(this, this.onFieldFocus), false);
		this.year_el.addEventListener('focus', Utils.bind(this, this.onFieldFocus), false);

		this.now = new Date();
	},

	onFieldBlur: function(evt){
		this.isValid();
	},

	onFieldFocus: function(evt){
		this.validationHelper.style.display = "";
	},

	isValid: function(){
		if(this.month_el.value && this.day_el.value && this.year_el.value){
			this.dob = new Date(this.year_el.value, this.month_el.value-1, this.day_el.value);
			if(this.now.getTime() - this.dob.getTime() < this.min){
				this.validationHelper.style.display = "block";
				return false;
			}
		}

		return true;
	}
}