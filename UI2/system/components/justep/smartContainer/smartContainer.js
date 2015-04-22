/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {

	var Component = require("$UI/system/lib/base/component"), Str = require("$UI/system/lib/base/string"), ViewComponent = require("$UI/system/lib/base/viewComponent"), url = require
			.normalizeName("./smartContainer");
	var ComponentConfig = require("./smartContainer.config");

	require('css!./css/smartContainer').load();

	var SmartContainer = ViewComponent.extend({
		getUrl : function() {
			return url;
		},
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
		},
		// 动态创建组件
		buildTemplate : function(config) {
			// default value
			return Str.format("<div class='x-smartcontainer' xid='{0}' componet='{1}'></div>", config.xid);
		},

		getConfig : function() {
			return ComponentConfig;
		},

		init : function() {
			this.controlWidth = 50;
			this.step = 2;
			this.callParent();
			this.$el = $(this.domNode); 
			var	toLeft, toRight, iid, me = this;

			this.$el.mousemove(function(e) {
				var mouseX = e.pageX - $(this).parent().offset().left;
				toLeft = (mouseX <= me.controlWidth);
				toRight = mouseX > (me.$el.outerWidth() - me.controlWidth);
			});

			this.$el.mouseover(function(e) {
				iid = setInterval(moveFn, 10);
			});
			this.$el.mouseout(function(e) {
				toLeft = toRight = false;
				clearInterval(iid);
			});

			function moveFn() {
				var pos = me.$el.scrollLeft();
				if (toLeft && pos > 0) {
					pos -= me.step;
					me.$el.scrollLeft(pos);
				} else if (toRight && pos < me.$el.outerWidth()) {
					pos += me.step;
					me.$el.scrollLeft(pos);
				}
			}

		}
	});

	Component.register(url, SmartContainer);
	return SmartContainer;
});
