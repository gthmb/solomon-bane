var BaseView = function(el){
	this.init(el)
}

BaseView.prototype = {
	el: null,

	templates: {},

	init: function(el){
		this.el = el;

		for(var el in this.templates){
			this.templates[el] = (this.templates[el]) ? (this.templates[el]).innerHTML : "";
		}
	},

	show: function(show){
		if(this.el){
			if(show === false){
				Utils.addClass(this.el, 'hidden');
			} else {
				Utils.addClass(this.el, 'fade-in');
				Utils.removeClass(this.el, 'hidden');
			}
		}
	}
}