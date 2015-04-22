/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	require("../lib/js/bootstrap");
	var Component = require("$UI/system/lib/base/component"), 
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		url = require.normalizeName("./pager");
	var ComponentConfig = require("./pager.config");
	var Data = require("$UI/system/components/justep/data/data");

	require('css!./css/pager').load();
	
	var Pager = ViewComponent.extend({
		getUrl : function() {
			return url;
		},
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
		},
		// 动态创建组件
		buildTemplate : function(config) {
			//default value
			return Str.format("<div class='pager' xid='{0}' componet='{1}'></div>", config.xid);
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		
		init: function(){
			this.data = null;
			this.callParent();
			this.$el = $(this.domNode);
			this.$preBtn = $('>li', this.$el).eq(0);
			this.$nextBtn = $('>li', this.$el).eq(1);
			this._init();
			
			this.dataComp = this.getModel().comp(this.data);
			var me = this;
			this.dataComp && this.dataComp.on(Data.EVENT_DATA_CHANGE,function(event){
				var rows,i;
				if(event.selfChanged
						&& (event.type === 'clear'
							|| event.type === 'refresh'
								|| event.type === 'delete'
									|| event.type === 'new')){
					var limit = me.dataComp.limit;
					var length = Math.ceil(me.dataComp.getTotal()/limit);
					var index = me.dataComp.getOffset()/limit - 1; 
					me._init(length, index);
				}
			});
			this.$preBtn.click(function(){
				if(!$(this).hasClass('disabled'))
					me.dataComp.loadPageData(me.currentIndex);
			});
			this.$nextBtn.click(function(){
				if(!$(this).hasClass('disabled'))
					me.dataComp.loadPageData(me.currentIndex+2);
			});
		},
		_init: function(length, index){
			this.currentIndex = index;
			if(!length){
				this.$preBtn.addClass('disabled');
				this.$nextBtn.addClass('disabled');
			}else if(index == 0){
				this.$preBtn.addClass('disabled');
				this.$nextBtn.removeClass('disabled');
			}else if(index == (length - 1)){
				this.$preBtn.removeClass('disabled');
				this.$nextBtn.addClass('disabled');
			}else{
				this.$preBtn.removeClass('disabled');
				this.$nextBtn.removeClass('disabled');
			}
		}
	});
	
	Component.register(url, Pager);
	return Pager;
});
