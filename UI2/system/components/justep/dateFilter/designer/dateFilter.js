/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var DateFilter = require("../dateFilter");
	
	var DDateFilter = DateFilter.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode.find("*").attr("d_canRemove",false).attr('d_selectable',false).attr("d_canAddChild", false);
		}
	});
	
	return {'$UI/system/components/justep/dateFilter/dateFilter': DDateFilter};
});