define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.windowReceiverReceive = function(event){
		this.action = event.data.action;
		var mainData = this.comp('dialogData');
		mainData.clear();
		if (event.data.action === "new") {
			mainData.newData();
		} else {
			var row = mainData.add();
			row.assign(event.data);
		}
	};

	Model.prototype.cancelBtnClick = function(event){
		this.comp("windowReceiver").windowCancel();
	};

	Model.prototype.okBtnClick = function(event){
		var mainData = this.comp('dialogData');
		this.comp("windowReceiver").windowEnsure(mainData.getCurrentRow());
	};

	return Model;
});