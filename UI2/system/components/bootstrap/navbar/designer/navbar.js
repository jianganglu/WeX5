/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var Bar = require("../navbar");
	
	var cls = Bar.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		}
	});

	return {'$UI/system/components/bootstrap/navbar/navbar':cls};
});