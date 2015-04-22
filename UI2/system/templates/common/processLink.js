define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var bizModeService = require("$UI/system/components/designerCommon/js/bizModelService");
	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
		this.targetPath = this.templateEngine.targetPath;
		this.realPath = this.targetPath.substring(this.targetPath.indexOf('UI2') + 3, this.targetPath.length);// 截取UI2下一级全目录/demo/misc/process/order
		this.model = bizModeService.parseModel(this.realPath);
		var jsonprocess = this.model.findProcess(this.model.getProcessList()[0].name);// 查找process,返回json格式
		var proMsg = [];
		if (jsonprocess.businessActivityList != undefined) {// jsonprocess.businessActivityList==
			// undefined说明是静态环节
			for ( var i = 0; i < jsonprocess.businessActivityList.length; i++) {
				var temp = jsonprocess.businessActivityList[i];
				proMsg.push({
					"name" : temp.labelList[0].text,
					"identification" : temp.name,
					"crefile" : temp.name + ".w",
				});
			}
			;
		}
		this.comp("processData").clear();
		if (proMsg.length > 0) {
			this.comp("processData").newData({
				defaultValues : proMsg
			})
		}
		var self = this;
		var grid = this.getElementByXid("grid");
		var setVisible = function() {
			$(grid).css("visibility", "visible");
		};
		var changeGridSize = function() {
			self._changeGridSize(grid);
			window.setTimeout(setVisible, 5);
		};
		window.setTimeout(changeGridSize, 5);
		$(window).resize(function() {
			changeGridSize();
		});
	};

	Model.prototype._changeGridSize = function(grid) {
		var width = $("body").width() * 10 / 12 - 20;
		$(grid).jqxGrid({
			width : width,
		});
	};

	Model.prototype.validate = function(wizard) {
		var data = this.comp("processData");
		var msg = "";
		if (data.getCount() == 0) {
			msg += "不存在流程环节，该向导只支持创建流程\n";
		}
		return msg;
	}
	
	Model.prototype.finish = function(wizard) {
		var processData = this.comp("processData");
		var self = this;
		var keys = [];
		keys.push({
			"key_id" : "mainData"
		})
		for ( var key in this.templateEngine.getConfig().current.datas) {
			keys.push({
				"key_id" : this.templateEngine.getConfig().current.datas[key]['dataId']
			});
		}
		var index = 1;
		var parentFileName = processData.getFirstRow().val("crefile");
		processData.each(function(param) {
			if(index >1){
				self.templateEngine.addContext(self.templateFile, "parent", parentFileName, param.row.val('crefile'));
			}else{
				self.templateEngine.addContext(self.templateFile, "keys", keys, param.row.val('crefile'));
				self.templateEngine.addContext(self.templateFile, "parent", self.templateEngine.targetFileName + ".w", param.row.val('crefile'));
			}
			index++;
		});
	}
	
	return Model;
});