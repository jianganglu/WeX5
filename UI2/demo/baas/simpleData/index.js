define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	// 引入/UI2/demo/baas/baas.js
	var Baas = require("$UI/demo/baas/baas");

	var Model = function() {
		this.callParent();
	};

	// orderData的自定义刷新事件onCustomRefresh
	Model.prototype.orderDataCustomRefresh = function(event) {
		// 获取当前数据对象
		var data = event.source;
		// 构造请求参数
		var params = {
			// 列定义
//			"columns" : data.getColumnIDs(),
// 			应从前端传入完整列定义（Baas.getDataColumns(data)）， 以解决oracle等数据库不区分date、time、datetime，导致的数据格式转换问题；
//			服务端兼容了以前只传入列名字符串（data.getColumnIDs()）的写法，但是已不再推荐。				
			"columns" : Baas.getDataColumns(data), 
			// 分页信息 - 行数
			"limit" : event.limit,
			// 分页信息 - 行偏移
			"offset" : event.offset,
			// 检索关键字
			"search" : this.getElementByXid("searchInput").value
		};
		// 请求成功后的回调方法
		var success = function(resultData) {
			// 通过event.options.append判断数据是否增量加载
			var append = event.options && event.options.append;
			// 加载返回数据到data
			data.loadData(resultData, append);
		};
		// 发送请求
		Baas.sendRequest({
			"url" : "/demo", // servlet请求地址
			"action" : "queryOrder", // action
			"params" : params, // action对应的参数
			"success" : success // 请求成功后的回调方法
		});
	};

	// orderData的自定义保存事件onCustomSave
	Model.prototype.orderDataCustomSave = function(event) {
		// 获取当前数据对象
		var data = event.source;
		// 构造请求参数
		var params = {
			"data" : data.toJson(true) // 将数据集中已变更数据导出为JSON数据
		};
		// 请求成功后的回调方法
		var success = function(resultData) {
			// 保存成功后，必须调用data.applyUpdates()，用于数据集确认数据已更新
			data.applyUpdates();
		};
		// 发送请求
		Baas.sendRequest({
			"url" : "/demo", // servlet请求地址
			"action" : "saveOrder", // action
			"params" : params, // action对应的参数
			"success" : success // 请求成功后的回调方法
		});
	};

	return Model;
});