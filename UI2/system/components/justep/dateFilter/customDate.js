define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.windowReceiverReceive = function(event){
		var data = this.comp("data");
		data.setValue("begin", event.data.begin);
		data.setValue("end", event.data.end);
	};

	Model.prototype.okBtnClick = function(event){
		var data = this.comp("data");
		this.comp("windowReceiver").windowEnsure({
			"begin" : data.val("begin"),
			"end" : data.val("end")
		});
	};

	return Model;
});