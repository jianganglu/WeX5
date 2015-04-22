/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery"),
		RTCalendar = require("../calendar"),
		Util = require("$UI/system/components/justep/common/designer/common");
	
	var _calendar = RTCalendar.extend({
		init: function(value, bindingContext){
			var cfg = Util.attr2js(this.$domNode,['view', 'views', 'day', 'firstDay', 'timeStart', 'timeEnd', 'timeSplit', 'lunarDay'/*, 'holiday'*/]);
			if(cfg) this.set(cfg);
			this.callParent(value, bindingContext);
		}
	});
	
	
	return {'$UI/system/components/justep/calendar/calendar':_calendar};
});