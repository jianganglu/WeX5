define(function(require) {

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = this.getParent().appEngine;

		if (this.getParent().edit) {
			var config = this.appEngine.getConfig();
			this.comp("sourceMode").val(config.sourceMode == true);
			this.comp("version").val(config.version);
			this.comp("packageName").val(config.packageName);
			this.comp("extBrowser").val(config.extBrowser == true);
			this.comp("resEncryption").val(config.resEncryption == true);
			this.comp("mqttServerURL").val(config.mqttServerURL);

			this.comp("sourceMode").set({
				"disabled" : true
			});
		}
	};

	Model.prototype.getTitle = function(wizard) {
		return '配置本地应用';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return false;
	};

	Model.prototype.validate = function() {
		if (!this.comp("version").get("value")) {
			alert("“版本号”不能为空");
			return false;
		} else {
			var version = this.comp("version").get("value");
			var numbers = version.split('.');
			if (numbers.length != 3) {
				alert("“版本号”应该由点隔开的三部分构成");
				return false;
			}
			for ( var i = 0; i < numbers.length; i++) {
				if (numbers[i].match(/\d*/i) != numbers[i]) {
					alert("版本号中“" + numbers[i] + "”不是数字");
					return false;
				}
			}
		}

		if (!this.comp("packageName").get("value")) {
			alert("“应用包名”不能为空");
			return false;
		}

		var mqttServerURL = this.comp("mqttServerURL").get("value");
		if (mqttServerURL && (mqttServerURL.indexOf("tcp://") != 0)) {
			alert("“推送服务地址”必须以tcp://开头");
			return false;
		}

		return true;
	};

	Model.prototype.nextPage = function(wizard) {
		if (this.validate()) {
			var config = this.appEngine.getConfig();
			config.sourceMode = this.comp("sourceMode").get("checked") === true;
			config.version = this.comp("version").get("value");
			config.packageName = this.comp("packageName").get("value");
			config.extBrowser = this.comp("extBrowser").get("checked") === true;
			config.resEncryption = this.comp("resEncryption").get("checked") === true;
			config.mqttServerURL = this.comp("mqttServerURL").get("value");

			this.getParent().openPage({
				id : "selectPlugins",
				url : "selectPlugins.w",
				fromId : "configApp",
			});
		}
	};

	return Model;

});
