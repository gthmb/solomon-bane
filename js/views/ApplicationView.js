var ApplicationView = function(el){
	this.init(el);
}

ApplicationView.prototype = Utils.extend(BaseFormView.prototype, {
	
	init: function(el){
		BaseFormView.prototype.init.apply(this, arguments);

		this.ageValidator = new AgeValidator({
			min: 18,
			month_el: this.el.querySelector('.dob-inpt-month'),
			day_el: this.el.querySelector('.dob-inpt-day'),
			year_el: this.el.querySelector('.dob-inpt-year'),
			date_el: this.el.querySelector('.dob-inpt-year'),
			validationHelper: this.el.querySelector('.validation-helper-age')
		});

		
		this.submit = this.el.querySelector('.btn-user-form-submit'),
		this.spinner = this.el.querySelector('.throbber'),
		this.submitError = this.el.querySelector('.submit-error'),
		this.dob = this.el.querySelector('[name=dob]')
	},

	show: function(show){
		if(show !== false){
			Utils.removeClass(this.submit, 'hidden');
			Utils.addClass(this.spinner, 'hidden');
			Utils.addClass(this.submitError, 'hidden');	
		}
		BaseFormView.prototype.show.apply(this, arguments);
	},

	showError: function(){
		Utils.addClass(this.spinner, 'hidden');
		Utils.removeClass(this.submit, 'hidden');
		Utils.removeClass(this.submitError, 'hidden');
	},

	hideSubmit: function(){
		Utils.removeClass(this.spinner, 'hidden');
		Utils.addClass(this.submit, 'hidden');
		Utils.addClass(this.submitError, 'hidden');
	},

	isValid: function(){
		var valid = BaseFormView.prototype.isValid.apply(this, arguments);

		if(valid){
			if(!this.ageValidator.isValid()){
				valid = false;
				this.ageValidator.year_el.focus();
			} else {
				this.dob.value = this.ageValidator.dob.toISOString();
			}
		}

		return valid;
	}
});