function createElement(opts){
	var type = opts.type || 'div';
	var elmt = document.createElement(type);

	for(var el in opts.atts){
		elmt.setAttribute(el, opts.atts[el]);
	}

	if(opts.inner){
		elmt.innerHTML = opts.inner;
	}

	return elmt;
}