var Router = function(views){
	this.init(views);
}

Router.prototype = {
	init: function(views){
		this.views = views;

		window.addEventListener('hashchange', Utils.bind(this, this.handleRoutes));
		window.addEventListener('load', Utils.bind(this, this.handleRoutes));
	},

	handleRoutes: function(evt){
		var hash = evt.target.location.hash

		switch(hash){
			case '':
			case '#':
				this.views.landing.show();
				this.views.basics.show(false);
				this.views.prevAppModal.show(false);
				this.views.footer.show(false);
				this.views.thanks.show(false);
				this.views.application.show(false);
				this.views.viewApplications.show(false);
				break;

			case '#basics':
				this.views.basics.show(true);
				this.views.basics.el.querySelector('[name=first_name]').focus();
				this.views.landing.show(true, false);
				this.views.footer.show();
				this.views.prevAppModal.show(false);
				this.views.thanks.show(false);
				this.views.application.show(false);
				this.views.viewApplications.show(false);				
				break;

			case '#apply':
				this.views.application.show();
				this.views.landing.show(false);
				this.views.basics.show(false);
				this.views.prevAppModal.show(false);
				this.views.footer.show();
				this.views.thanks.show(false);
				this.views.viewApplications.show(false);
				break;

			case '#view-applications':
				this.views.viewApplications.show();
				this.views.landing.show(false);
				this.views.basics.show(false);
				this.views.prevAppModal.show(false);
				this.views.footer.show();
				this.views.thanks.show(false);
				this.views.application.show(false);
				break;

			case '#thanks':
				this.views.thanks.show();
				this.views.footer.show();
				this.views.landing.show(false);
				this.views.basics.show(false);
				this.views.prevAppModal.show(false);
				this.views.application.show(false);
				this.views.viewApplications.show(false);
				break;
		}
	}
}