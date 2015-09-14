var ValidationFieldFactory = {
	create: function(el){
		if(el.nodeName.toLowerCase() == 'select'){
			return new SelectValidationField(el);
		} else if(el.nodeName.toLowerCase() == 'input'){
			switch(el.type){
				case 'text':
				case 'tel':
				case 'number':
				case 'email':
					return new TextValidationField(el);
			}
		}

		return null;
	}
}