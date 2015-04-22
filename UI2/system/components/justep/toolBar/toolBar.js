define(function(require){
	require("$UI/system/components/justep/common/res");
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./toolBar");
	var ComponentConfig = require("./toolBar.config");
	require('css!./css/toolBar').load();

	var ToolBar = justep.ViewComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},

		constructor : function(options) {
			this.callParent(options);
		},

		dispose : function() {
			this.callParent();
		},

		buildTemplate : function(config) {
		},
		
		

	});

	justep.Component.register(url, ToolBar);
	
	return ToolBar;
});