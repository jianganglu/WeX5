define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Baas = require("$UI/demo/baas/baas");
	
	var Model = function() {
		this.callParent();
	};

	Model.prototype.regionDataCustomRefresh = function(event){
		// 树形数据一次加载，data.treeOption.delayLoad=false
		
		var data = event.source;
		var params = {
			"columns" : Baas.getDataColumns(data)
		};
		var success = function(resultData) {
			data.loadData(resultData);
		};
		Baas.sendRequest({
			"url" : "/demo",
			"action" : "queryRegionTree",
			"params" : params,
			"success" : success
		});
	};

	return Model;
});