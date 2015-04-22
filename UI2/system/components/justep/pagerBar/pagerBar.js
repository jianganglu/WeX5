/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {

	var Component = require("$UI/system/lib/base/component"), 
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		url = require.normalizeName("./pagerBar");
	var ComponentConfig = require("./pagerBar.config");
	var Data = require("$UI/system/components/justep/data/data");

	require('css!./css/pagerBar').load();
	
	var Bar = ViewComponent.extend({
		getUrl : function() {
			return url;
		},
		label: "当前显示{0}-{1}条，共{2}条",
		// 构造函数
		constructor : function(options) {
			this.data = null;
			this.callParent(options);
		},
		// 动态创建组件
		buildTemplate : function(config) {
			//default value
			return Str.format("<div class='x-pagerbar' xid='{0}' componet='{1}'></div>", config.xid);
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		
		init: function(){
			this.callParent();
			this.$el = $(this.domNode);
			this.setLabel();
			var me = this;
			if(this.data){
				this.bindData = this.getModel().comp(me.data);
				this.bindData.on(Data.EVENT_DATA_CHANGE, function(event){
					var limit = me.bindData.limit;
					var total = me.bindData.getTotal();
					var offset = me.bindData.getOffset(); 
					me.setLabel(offset-limit, limit, total);
				});	
			}
		},
		
		setLabel: function(offset, limit, total){
			var str = this.emptyLabel || '';
			if(total !== undefined && total !== 0){
				str = Str.format(this.label, offset + 1, Math.min(offset + limit, total), total);
			}	
			$('.x-pagerbar-info', this.$el).html(str);
		}
	});
	
	Component.register(url, Bar);
	return Bar;
});
