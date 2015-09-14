var BaseFormView = function(el){
	this.init(el);
}

BaseFormView.prototype = Utils.extend(BaseView.prototype, {
	init: function(el){
		BaseView.prototype.init.apply(this, arguments);
		this.validator = new FormValidator({
			el: this.el
		});
	},

	show: function(show){
		if(show !== false){
			this.validator.resetValidationStates()
		}

		BaseView.prototype.show.apply(this, arguments);
	},

	getData: function(){
		var data = {}
		var elements = this.el.querySelectorAll('textarea, select, input');
		for(var i=0, l = elements.length; i<l; i++){
			if(elements[i].attributes.name){
				data[elements[i].attributes.name.value] = elements[i].value
			}	
		}

		return data;
	},

	setData: function(data){
		var elements = this.el.querySelectorAll('textarea, select, input');
		for(var i=0, l = elements.length; i<l; i++){
			var prop = elements[i].attributes.name.value;
			if(data.hasOwnProperty(prop)){
				elements[i].value = data[prop];
			}	
		}
	},

	isValid: function(){
		return this.validator.isValid();
	}
});