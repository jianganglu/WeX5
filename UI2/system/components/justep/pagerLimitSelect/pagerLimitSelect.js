/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require('$UI/system/lib/justep');
	require('css!./css/pagerLimitSelect').load();
	var url = require.normalizeName("./pagerLimitSelect");
	var ComponentConfig = require("./pagerLimitSelect.config");
	var Select = require('$UI/system/components/justep/select/select');

	var SelectLimit = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		// 构造函数
		constructor : function(options) {
			this.data = null;
			this.defaultValue = 20;
			this.hasLabel = true;
			this.callParent(options);
		},
		
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			var me = this;
			this.$el = $(this.domNode);

			var xid = $('>select', this.$el).attr('xid');
			this.getModel().componentPromise(xid).done(function(select){
				me.select = select;
				me.select.val(me.defaultValue);
				if(me.data){
					var bindData = me.getModel().comp(me.data);
					bindData.limit = parseInt(me.select.val());
				}	
				me.select.on('onChange', function(event){
					if(me.data){
						var bindData = me.getModel().comp(me.data);
						var limit = parseInt(event.value);
						bindData.limit = limit;
						bindData.refreshData();
					}
				});
			});
			if(this.hasLabel){
				this.$el.addClass('hasLabel');
			}
		},
		buildTemplate: function(config) {
			return '';
		},
		
		propertyChangedHandler: function(key, oldVal, value){
			var $el = $(this.domNode);
			switch(key){
			case 'hasLabel':
				if(value == 'true' || value == true){
					$el.addClass('hasLabel');
					this.hasLabel = true; 
				}else{
					$el.removeClass('hasLabel');
					this.hasLabel = false; 
				}
				break;
			case 'defaultValue':
				this.defaultValue = parseInt(value);
				break;
			}
		},
		
		dispose : function() {
			this.callParent();
		}
	});

	justep.Component.register(url, SelectLimit);
	return SelectLimit;
});