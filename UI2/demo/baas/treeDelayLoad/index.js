define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Baas = require("$UI/demo/baas/baas");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.regionDataCustomRefresh = function(event){
		// 树形数据逐级+分页加载，data.treeOption.delayLoad=true
		
		var data = event.source;
		// event.options.parent - 父节点的row
		var parent = event.options && event.options.parent;
		// event.options.append - 数据是否增量加载
		var append = event.options && event.options.append;
		
		var params = {
			"columns" : Baas.getDataColumns(data),
			"limit" : event.limit,
			"offset" : event.offset,
			"parent" :  parent && parent.getID()
		};
		var success = function(resultData) {
			data.loadData(resultData, append, parent);
		};
		Baas.sendRequest({
			"url" : "/demo",
			"action" : "queryRegionTreeByParent",
			"params" : params,
			"success" : success
		});
	};

	return Model;
});