define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.newBtnClick = function(event) {
		var mainData = this.comp("{{list_data}}");
		mainData.newData();
		this.goTotab();
	};

	Model.prototype.goTotab = function() {
		var tabs = this.comp("tabs");
		tabs.setActiveTab("nav-detail");
	}

	Model.prototype.orderTablesRowDblClick = function(event){
		var mainData = this.comp("{{list_data}}");
		mainData.to(event.bindingContext.$object);
		this.goTotab();
	};
	
	Model.prototype.DataSaveCommit = function(event){
		justep.Util.hint("保存成功！", {type: 'success', parent: this.getRootNode()});
	};
	return Model;
});