/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var XML = require("$UI/system/lib/base/xml");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	var Model = function() {
		this.callParent();
	};
	
	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function(){
		var cols = [], data = this.comp('data');
		data.each(function(param){
			var name = data.getValue('name', param.row);
			if(data.getValue('selected', param.row)) cols.push(name);
		});
		return {cols:cols}; 
	};
	
	Model.prototype.cols2data = function(cols,xmlStr){
		if ($.isArray(cols)) {
			var $grid = $(XML.fromString(xmlStr).documentElement);

			var defaultValues = [];
			for ( var i = 0; i < cols.length; i++) {
				var name = cols[i]['alias'];
				if($grid.find("column[name='"+name+"']").size()>0) continue;
				var o = {
						name : name,
						type : cols[i]['data-type'],
						displayName : cols[i]['label'], 
						selected : false
				};
				defaultValues.push(o);
			}
			
			var data = this.comp('data');
			data.newData({
				defaultValues : defaultValues
			});
			data.first();
		}
	};
	
	Model.prototype.modelLoad = function(event) {
		var self = this;
		//window.setTimeout(function(){
			//创建grid的下拉选择
			var initData = xuiService.getPageParams();// 获取传入的参数
			self.cols2data(initData.cols,initData.xml);// 初始化属性值
		//}, 1000);
	};

	return Model;
});