var BaseValidationField = function(el){
	this.init(el);

	return this;
}

BaseValidationField.prototype = {
	init: function(el){
		this.el = el;
		this.required = (this.el.attributes.required && (this.el.attributes.required.value === "true" || this.el.attributes.required.value === true)) ? true : false,
		this.valid = false;
		this.validationHelpers = (this.el.form) ? this.el.form.querySelectorAll('[helps*=' + this.el.attributes.name.value + ']') : [];

		var self = this;
		this.el.addEventListener('blur', Utils.bind(this, this.validate), this);
	},

	validate: function(evt){
		this.doValidation();

		if(this.valid){
			Utils.removeClass(this.el, 'has-error');
			Utils.removeClass(this.el, 'has-warning');
			this.hideValidationHelpers();
		} else {
			if(this.required){
				Utils.addClass(this.el, 'has-error');
				this.showValidationHelpers();
			} else if(this.el.value){
				Utils.addClass(this.el, 'has-warning');
				this.showValidationHelpers();
			}
		}
	},

	showValidationHelpers: function(){
		if(Utils.touchdown){
			Utils.addMouseUpCallback( Utils.bind(this, this.showValidationHelpers))
			return;
		}

		for(var i=0, l=this.validationHelpers.length; i<l; i++){
			this.validationHelpers[i].style.display = "block";
		}
	},

	hideValidationHelpers: function(){
		if(Utils.touchdown){
			Utils.addMouseUpCallback( Utils.bind(this, this.hideValidationHelpers))
			return;
		}

		for(var i=0, l=this.validationHelpers.length; i<l; i++){
			this.validationHelpers[i].style.display = "";
		}
	},

	resetValidationState: function(){
		this.hideValidationHelpers();
		Utils.removeClass(this.el, 'has-error');
		Utils.removeClass(this.el, 'has-warning')
	},

	/* override me */
	doValidation: function(){},
}