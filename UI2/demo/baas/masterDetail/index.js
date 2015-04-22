define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Baas = require("$UI/demo/baas/baas");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.userDataCustomRefresh = function(event) {
		// 主表数据加载
		var data = event.source;
		var params = {
			"columns" : Baas.getDataColumns(data),
			"limit" : event.limit,
			"offset" : event.offset
		};
		var success = function(resultData) {
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

	Model.prototype.orderDataCustomRefresh = function(event){
		// 从表数据加载
		var userData = this.comp("userData");
		var orderData = event.source;
		var params = {
			"columns" : Baas.getDataColumns(orderData),
			"limit" : event.limit,
			"offset" : event.offset,
			// 主表ID
			"userID" : userData.getCurrentRowID()
		};
		var success = function(resultData) {
			var append = event.options && event.options.append;
			orderData.loadData(resultData, append);
		};
		Baas.sendRequest({
			"url" : "/demo",
			"action" : "queryOrder",
			"params" : params,
			"success" : success
		});
	};

	Model.prototype.userDataCustomSave = function(event) {
		// 主表与子表数据在一个请求内同时保存
		var userData = event.source;
		var orderData = this.comp("orderData");
		var params = {
			"userData" : userData.toJson(true),
			"orderData" : orderData.toJson(true)
		};
		var success = function(resultData) {
			// 这里应该先支持从表，后执行主表
			orderData.applyUpdates();
			userData.applyUpdates();
		};
		Baas.sendRequest({
			"url" : "/demo",
			"action" : "saveMasterDetail",
			"params" : params,
			"success" : success
		});
	};

	return Model;
});