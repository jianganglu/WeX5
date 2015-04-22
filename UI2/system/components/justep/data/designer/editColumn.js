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
	
	Model.prototype.beforeOkAction = function(){
		var data = this.comp('data'), idColumn='';
		data.each(function(param){
			var name = data.getValue('name', param.row);
			if(data.getValue('isIDColumn', param.row)) idColumn = name;
		});
		if(!idColumn) return '必须设置ID列!';
	};
	
	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function(){
		var def = [], data = this.comp('data'), idColumn='';
		data.each(function(param){
			var name = data.getValue('name', param.row),
				type = data.getValue('type', param.row),
				label = data.getValue('displayName', param.row),
				xid = data.getValue('xid', param.row);
				def.push('<column '+(xid?('xid="'+xid+'"'):'')+' name="'+name+'" type="'+type+'"'+((label===undefined || label===null)?'':(' label="'+label+'"'))+'/>');
				if(data.getValue('isIDColumn', param.row)) idColumn = name;
		});
		return {def:def,idColumn:idColumn}; 
	};
	
	Model.prototype.xml2data = function(xmlStr){
		if(xmlStr){
			var $data = $(XML.fromString(xmlStr).documentElement), data = this.comp('data'), idColumn=$data.attr('idColumn');
			$data.children('column').each(function(){
				var $col = $(this);
				data.add({
						xid : $col.attr('xid'),
						name : $col.attr('name'),
						type : $col.attr('type'),
						displayName : $col.attr('label'),
						isIDColumn: $col.attr('name')!==idColumn?false:true
					});
			});
			data.first();
		}
	};
	
	Model.prototype.modelLoad = function(event) {
		var self = this;
		//window.setTimeout(function(){
			//创建grid的下拉选择
			var initData = xuiService.getPageParams();// 获取传入的参数
			self.xml2data(initData.xml);// 初始化属性值
		//}, 1000);
	};

	Model.prototype.removeRow = function(up){
		var data = this.comp('data'), row1 = data.getCurrentRow(true);
		var index = data.getRowIndex(row1);
		index += (up?-1:1);
		if(index<0 || index>=data.getCount()) return;
		var datas = data.datas.peek();
		var row2 = datas[index];
		data.exchangeRow(row1,row2);
	};

	
	Model.prototype.dataCustomNew = function(event){
		var data = event.source, col = 'col' + data.getCount();
		data.add({
				name : col,
				type : 'String'
		});
	};

	
	Model.prototype.upClick = function(event){
		this.removeRow(true);
	};

	
	Model.prototype.downClick = function(event){
		this.removeRow(false);
	};

	
	return Model;
});