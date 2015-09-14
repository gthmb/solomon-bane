var ViewApplicationsView = function(el){
	this.init(el);
}

ViewApplicationsView.prototype = Utils.extend(BaseFormView.prototype, {

	templates: {
		tr: document.querySelector('#application-tr')
	},

	init: function(el){
		BaseFormView.prototype.init.apply(this, arguments);

		this.spinner = this.el.querySelector('.throbber');
		this.submit = this.el.querySelector('.btn-user-form-submit');
		this.tbody = this.el.querySelector('tbody');
		this.table = this.el.querySelector('.results');
	},

	show: function(show){
		BaseFormView.prototype.show.apply(this, arguments);
		
		this.tbody.innerHTML = "";
		this.showResults(false);
	},

	showSpinner: function(show){
		if(show !== false){
			Utils.removeClass(this.spinner, 'hidden');
			Utils.addClass(this.submit, 'hidden');	
		} else {
			Utils.addClass(this.spinner, 'hidden');
			Utils.removeClass(this.submit, 'hidden');
		}
	},

	showResults: function(show){
		if(show !== false){
			Utils.removeClass(this.table, 'hidden');
		} else {
			Utils.addClass(this.table, 'hidden');
		}
	},

	clearResults: function(){
		this.tbody.innerHTML = "";
	},

	populateResults: function(arr){
		this.clearResults();

		var tr;
		if(arr.length){
			for(var i=0, l=arr.length; i<l; i++){
				tr = document.createElement('tr');
				tr.innerHTML = Utils.formatTemplate( this.templates.tr, [
					i + 1,
					arr[i].first_name + ' ' + arr[i].last_name,
					Utils.prettifyDate(new Date(arr[i].created.replace(/-/g, "/"))),
					'warning',
					arr[i].status
				]);
				this.tbody.appendChild(tr);
			}
		} else {
			tr = document.createElement('tr');
			tr.innerHTML = "<td class='info text-center'>No Applications Found. <a href='#basics'>Apply Now!</a></td>";
			this.tbody.appendChild(tr);
		}
	}
});