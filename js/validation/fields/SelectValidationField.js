var SelectValidationField = function(el){
	this.init(el);
}

SelectValidationField.prototype = Utils.extend(BaseValidationField.prototype, {
	doValidation: function(){
		this.valid = (
			this.el.selectedIndex > 0 && 
			this.el.options[this.el.selectedIndex].value
		) ? true : false;
	}
});