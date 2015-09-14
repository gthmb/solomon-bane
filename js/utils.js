"use strict"

var Utils = {
	mouseUpCallbacks: [],

	bind: function(scope, fn){
		return function () {
	        fn.apply(scope, arguments);
	    };
	},
	
	addClass: function (el, cls){
		// trim
		cls = cls.replace(/^\s+|\s+$/g, '');
		el.className = el.className.replace(/^\s+|\s+$/g, '');

		if(el.className.indexOf(cls) == -1){
			if(el.className.length > 0){
				cls = " " + cls;
			}

			el.className += cls;
		}
	},

	removeClass: function(el, cls){
		cls = cls.replace(/^\s+|\s+$/g, '');
		el.className = el.className.replace(cls, '');
		el.className = el.className.replace(/\s{2,}/g, ' ');
		el.className = el.className.replace(/^\s+|\s+$/g, '');
	},

	restrictNumber: function(num, min, max){
		var val = parseFloat(num);
		
		if(isNaN(val)){
			return null;
		}

		if(typeof(min) == 'number'){
			val = Math.max(val, min);
		}

		if(typeof(max) == 'number'){
			val = Math.min(val, max);
		}

		return val;
	},

	padString: function(val, char, length){
		var str = String(val);
		while(str.length < length){
			str = char + str;
		}
		return str;
	}, 

	extend: function(old, newobj){
		var obj = Object.create(old);

		for(var el in newobj){
			obj[el] = newobj[el];
		}

		return obj;
	},

	post: function(obj){
		var datastr = JSON.stringify(obj.data);
		var xhr = new XMLHttpRequest();

		if(obj.success){
			xhr.addEventListener('load', function(evt) {
				var data = evt.target.response;
				try {
					data = JSON.parse(data);
				} catch (err){}

				obj.success(evt, data, xhr);
			});	
		}

		if(obj.error){
			xhr.addEventListener('error', function(evt) {
				obj.error(evt, xhr);
			});	
		}
		
		xhr.open('POST', obj.url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(datastr);
	},

	get: function(obj){
		var xhr = new XMLHttpRequest();

		if(obj.success){
			xhr.addEventListener('load', function(evt) {
				var data = evt.target.response;
				try {
					data = JSON.parse(data);
				} catch (err){}
				obj.success(evt, data, xhr);
			});	
		}

		if(obj.error){
			xhr.addEventListener('error', function(evt) {
				obj.error(evt, xhr);
			});	
		}
		
		xhr.open('GET', obj.url);
		xhr.send();
	},

	formatTemplate: function(str, params){
		return str.replace(/{(\d+)}/g, function(match, number) { 
            return typeof params[number] != 'undefined' ? params[number] : match;
        });
	},

	prettifyDate: function(date){
		var pretty = "";
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		pretty = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

		return pretty;
	},

	addMouseUpCallback: function(fn){
		this.mouseUpCallbacks.push(fn)
	}
}


"mousedown touchdown".split(" ").forEach(function(e){
	window.addEventListener(e,function(){
		Utils.touchdown = true;
	}, false);
});

"mouseup touchup".split(" ").forEach(function(e){
	window.addEventListener(e,function(){
		Utils.touchdown = false;
		for(var i=0, l=Utils.mouseUpCallbacks.length; i<l; i++){
			Utils.mouseUpCallbacks[i]();	
		}
		Utils.mouseUpCallbacks = [];
	}, false);
});