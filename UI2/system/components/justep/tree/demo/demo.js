/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Model = function() {
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.button1Click = function(event) {
		var tree = this.comp('tree');
		tree.loadNextPage();
	};

	Model.prototype.showTreeSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/tree/demo/demo.w&xid=demoTree"
		});
	};
	Model.prototype.closeWin = function(event){
		justep.Portal.closeWindow();
	};
	return Model;
});
