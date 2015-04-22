/*! 
* BeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");

	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./excelLayout");
	var $ = require("jquery");
 
	var excellayout = justep.BindComponent.extend({
 
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
		},

		dispose : function() {
			this.callParent();
		},
		
		showLine : function(){
			$(this.domNode).addClass("x-excel-layout");
		},
		hideLine : function(){
			$(this.domNode).removeClass("x-excel-layout");
		}
	});

	justep.Component.register(url, excellayout);
	return excellayout;
});