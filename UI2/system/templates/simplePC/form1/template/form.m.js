define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var MessageDialog = require("$UI/system/components/justep/messageDialog/messageDialog")
	var Model = function(){
		this.callParent();
	};

	Model.prototype.saveCommit = function(event){
		if (!messageDlg) 
			var messageDlg = new MessageDialog({parentNode:this.getElementByXid("window")})
			messageDlg.show({type:"OK",title:'提示',message:"数据保存成功"})
	};
	
	return Model;
});
