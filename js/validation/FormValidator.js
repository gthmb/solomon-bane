var FormValidator = function(obj){
	this.init(obj);
}

FormValidator.prototype = {
	init: function(obj){
		this.el = obj.el;
		this.fields = [];
		this.requireds = [];
		
		var validateme = this.el.querySelectorAll("[validate=true], [required=true]");
		for(var i=0, l=validateme.length; i<l; i++){
			var field = ValidationFieldFactory.create(validateme[i]);

			if(field.required){
				this.requireds.push(field);
			}

			this.fields.push(field);
		}

		this.el.addEventListener('submit', Utils.bind(this, this.onSubmit), true);
	},

	onSubmit: function(evt){		
		if(!this.isValid()){
			evt.preventDefault();
		}
	},

	isValid: function(){
		var isvalid = true;

		for(var el in this.requireds){
			this.requireds[el].validate();
			if(!this.requireds[el].valid){
				if(isvalid){
					this.requireds[el].el.focus();
				}
				isvalid = false;
			}
		}
		
		return isvalid;
	},

	resetValidationStates: function(){
		for(var el in this.fields){
			this.fields[el].resetValidationState()
		}
	}
}