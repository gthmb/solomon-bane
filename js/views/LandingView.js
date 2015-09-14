var LandingView = function(el){
	this.init(el);
}

LandingView.prototype = Utils.extend(BaseView.prototype, {

	init: function(el){
		BaseView.prototype.init.apply(this, arguments);
		
		this.startButtons = this.el.querySelector('.landing-start-buttons')
	},

	show: function(show, showButtons){
		BaseView.prototype.show.apply(this, arguments);

		if(showButtons === false){
			Utils.addClass(this.startButtons, 'hidden');
		} else {
			Utils.removeClass(this.startButtons, 'hidden');	
		}
	}
});