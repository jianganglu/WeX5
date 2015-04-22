define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Baas = require("$UI/demo/baas/baas");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.userDataCustomRefresh = function(event) {
		// 数据分页加载
		
		var data = event.source;
		var params = {
			// 列定义
			"columns" : Baas.getDataColumns(data),
			"limit" : event.limit,
			"offset" : event.offset,
			"search" : this.getElementByXid("searchInput").value
		};
		var success = function(resultData) {
			// event.options.append - 数据是否增量加载
			var append = event.options && event.options.append;
			data.loadData(resultData, append);
		};
		Baas.sendRequest({
			"url" : "/demo",
			"action" : "queryUser",
			"params" : params,
			"success" : success
		});
	};

	Model.prototype.userDataCustomSave = function(event) {
		var data = event.source;
		var params = {
			"data" : data.toJson(true)
		};
		var success = function(resultData) {
			// 保存成功后，必须调用data.applyUpdates()，用于数据集确认数据已更新
			data.applyUpdates();
		};
		Baas.sendRequest({
			"url" : "/demo",
			"action" : "saveUser",
			"params" : params,
			"success" : success
		});
	};

	return Model;
});