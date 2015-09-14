(function(){

	var views = {
		landing: new LandingView(document.querySelector('#landing')),
		basics: new BaseFormView(document.querySelector('#basics')),
		application: new ApplicationView(document.querySelector('#application')),
		viewApplications: new ViewApplicationsView(document.querySelector('#view-applications')),
		prevAppModal: new BaseView(document.querySelector('#previous-applications-modal')),		
		thanks: new BaseView(document.querySelector('#thanks')),
		footer: new BaseView(document.querySelector('footer')),
	}

	var router = new Router(views);

	// form submission listners
	views.basics.el.addEventListener('submit', onBasicsSubmit, false);
	views.application.el.addEventListener('submit', onApplicationSubmit, false);
	views.viewApplications.el.addEventListener('submit', onViewApplicationsSubmit, false);

	// forms submittal callbacks
	function onApplicationSubmit(evt){
		evt.preventDefault();
		if(!views.application.isValid()){
			return;
		}
		views.application.hideSubmit();
		Utils.post({
			url: '{{SERVER_ADDRESS}}/applications',
			data: views.application.getData(),
			success: function(evt, data, xhr) {
				window.location = "#thanks";
			},
			error: function(evt, xhr) {
				views.application.showError();
			}
		})
	}

	function onBasicsSubmit(evt){
		evt.preventDefault();
		views.prevAppModal.show(false);
		if(!views.basics.isValid()){
			return;
		}
		var basicData = views.basics.getData();
		checkForExistingApplications( {
			email: basicData.email, 
			ssn: basicData.ssn, 
			hasApps: function(apps){
				views.application.setData(apps.pop())
				views.viewApplications.setData(basicData);
				views.prevAppModal.show();
			}, 
			hasNoApps: function(){
				views.application.setData({
					first_name: basicData.first_name,
					last_name: basicData.last_name,
					email: basicData.email
				})
				window.location = "#apply";
		}});
	}

	function onViewApplicationsSubmit(evt){
		evt.preventDefault();
		if(!views.viewApplications.isValid()){
			return;
		}

		views.viewApplications.showSpinner();
		views.viewApplications.clearResults();

		var searchData = views.viewApplications.getData();
		checkForExistingApplications( {
			email: searchData.email, 
			ssn: searchData.ssn, 
			hasApps: function(apps){
				views.viewApplications.populateResults(apps);
			}, 
			hasNoApps: function(){
				views.viewApplications.populateResults([]);
			},
			anyway: function(){
				views.viewApplications.showSpinner(false);
				views.viewApplications.showResults();
		}});
	}

	function checkForExistingApplications( params ){
		Utils.get({
			url: '{{SERVER_ADDRESS}}/search?email=' + params.email + '&ssn=' + params.ssn,
			success: function(evt, data, xhr){
				if(data.applications.length){
					params.hasApps(data.applications);
					if(params.anyway) params.anyway();
				} else {
					params.hasNoApps();
					if(params.anyway) params.anyway();
				}
			}, 
			error: function(evt, xhr){
				params.hasNoApps();
				if(params.anyway) params.anyway();
			}
		})
	}
})()