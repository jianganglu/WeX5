/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var RTDataTables = require("../dataTables");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	
	var DataTables = RTDataTables.extend({
		constructor : function(config) {
			this.callParent(config);
		},
		init : function(value, bindingContext) {
			var $domNode = $(this.domNode);
			this.data = $domNode.attr('data');
			$domNode.html('请设置DataTables的data属性然后增加DataTables列').attr('d_resizable',false);
			var self = this;
			window.setTimeout(function(){
				self.repaintDataTableds();
			},100);
			$domNode.on("childUndoRedo",function(){//撤销重做时重画
				if(self.repaintTimer){
					clearTimeout(self.repaintTimer);
				}
				self.repaintTimer = setTimeout(function(){
					self.repaintTimer = null;
					self.repaintDataTableds();
				},150);
			});
	 
		},
		set: function(value){
			this.callParent(value);
			this.repaintDataTableds();
		},
		appendColumn: function(config) {
			var self = this;
			//获取data的did
			var dataID = this.get('data');
			var data = this.getModel().comp(dataID);
			if(!data){
				alert('请先设置DataTables的data属性');
				return;
			}
			var data_did = data.$domNode.attr('d_id');
			// 获取data列信息
			var cols = xuiDoc.getEditorDataSource("RuleRelationDatasource.getDatasource",null,data_did);
			//打开编辑器
			xuiService.openPage("$UI/system/components/justep/dataTables/designer/appendColumn.w", {
				xml : config.nodeXml,
				cols : cols
			}, function(result) {
				var cols = result.cols;
				if($.isArray(cols)){
					var configs = [];
					for(var i=0;i<cols.length;i++){
						configs.push({
							componentName : "$UI/system/components/justep/dataTables/dataTables#column",
							parentElementId : self.columns_dId,
							templateContent : '<column name="'+cols[i]+'"/>'
						});
					}
					//批量创建列
					xuiDoc.batchCreateComponent(configs, function() {
						self.repaintDataTableds();
					});
				}
				
			});
		},
		repaintDataTableds : function(){
			if(this.isRepainting){
				return;
			}
			var dataID = this.get('data');
			var data = this.getModel().comp(dataID);
			if(!data){
				this.$domNode.html('请设置dataTables的data属性然后增加dataTables列');
				return;
			}
			this.isRepainting = true;
			var xuiNode = xuiDoc.getNodeByDId(this.$domNode.attr('d_id'));
			var self = this;
			//var url = "http://127.0.0.1:8080/x5/UI2/system/components/justep/grid/server/transCfg.j";
			var url = require.toUrl("$UI/system/components/justep/dataTables/server/transDataTablesCfg.j");
			
			$.ajax({
			    async : false,
			    dataType:'json',
			    data: {"define": xuiNode},
			    type : 'POST',
			    url : url, 
			    success : function(cfg) { 
			    	self.createDataTables(cfg,xuiNode); 
			    	self.isRepainting = false;
			    	self.ownerDesigner.setSelection(self.$domNode[0]);
			    },
			    error : function(xhr,status,err) {
			       alert("转换DataTables的定义失败："+[status,xhr.readyState,err]);
			       self.isRepainting = false;
			    }
			});			
		},
		createDataTables: function(cfg,xuiNode){
			this.cfg = cfg;
			if(!this.cfg.columns||this.cfg.columns.length<1) this.cfg.columns = [{
				"title": '请添加列'
			}];
			//记录原选中组件did
			var dIds = this.ownerDesigner.getSelectionIds();
			
			if(this.__dataTables) this.__dataTables.dispose();
			this.$domNode.empty();
			cfg.parentNode = this.domNode;
			//创建展现的dataTables
			cfg.data = null;
			cfg['class'] = this.$domNode.attr('class');
			cfg['style'] = this.$domNode.attr('style');
			this.__dataTables = new RTDataTables(cfg);
			//分许定义的结构绑定did
			var cols = cfg.columns;
			for(var i=0; i<cols.length; i++){
				//设置设计时的相关属性
				this.__dataTables.$domNode.find('thead tr th:eq('+i+')').attr({"d_id":cols[i]["d_id"],"d_selectable":cols[i]["d_selectable"],"componentName":cols[i]["componentName"]})
				.prop("colDef",cols[i]);
			}
			//bing列头的did
			var $tr = $(xuiNode).find('columns');
			this.columns_dId = $tr.attr("d_id");
			this.$domNode.find('thead tr').attr({"d_id":$tr.attr("d_id"),"d_selectable":false,"componentName":$tr.attr("componentName")});
			//绑定列组件
			this.ownerDesigner.paintChildComponent(this.domNode);
			
			//选中原选中组件
			dIds = eval(dIds);
			if(dIds && dIds.length>0)
				this.ownerDesigner.setSelectionByIds({ids:dIds});
		}
	});
	
	var Column = justep.ViewComponent.extend({
		constructor : function(config) {
			this.callParent(config);
		},
		init : function(value, bindingContext) {

		},
		getOwner: function(){
			var gel = this.$domNode.closest("div[componentName='$UI/system/components/justep/dataTables/dataTables']")[0];
			return this.getModel().comp(gel);
		},
		
		set: function(value){
			var owner = this.getOwner();
			if(owner){
				if(value && value.hasOwnProperty("width")){
					var w = value['width'];
					var colDef = this.$domNode.prop("colDef");
					owner.__grid.setColWidth(colDef['name'],w);
				}else owner.repaintDataTables();
			}
		}
	});
	
	return {
		'$UI/system/components/justep/dataTables/dataTables' : DataTables,
		'$UI/system/components/justep/dataTables/dataTables#column' : Column
	};

});