define(function(require) {
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var loadTreeJs = require("$UI/system/components/designerCommon/tree/tree");

	loadTreeJs($);

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = this.getParent().appEngine;

		var self = this;
		var tree = $(this.getElementByXid("uiResDirsTree"));
		tree.jqxTree('clear');
		tree.jqxTree({
			source : this._getChildren("$UI", "$UI"),
			hasThreeStates : true,
			checkboxes : true
		});
		tree.on('expand', function(event) {
			self._expandDir(event.args.element);
		});
		tree.on('checkChange', function(event) {
			var selected = [];
			var items = tree.jqxTree('getCheckedItems');
			var value;
			for ( var i = 0; i < items.length; i++) {
				if ('Loading...' != items[i].label) {
					value = items[i].value;

					var parentIncluded = false;
					var parent = items[i].parentElement;
					var parentItem;
					while (parent != null) {
						parentItem = tree.jqxTree('getItem', parent)
						if (parentItem.checked) {
							parentIncluded = true;
							break;
						}
						parent = parentItem.parentElement;
					}
					if (!parentIncluded) {
						selected.push(value);
					}
				}
			}

			self.comp("uiResDirs").val(selected.join(','));
		});

		this._recalcHeight();
		var self = this;
		$(window).resize(function() {
			self._recalcHeight();
		});

		if (this.getParent().edit) {
			var config = this.appEngine.getConfig();
			this.comp("serverURL").val(config.serverURL);
			this.comp("indexURL").val(config.indexURL);

			if (config.uiResDirs != '') {
				var uiResDirs = config.uiResDirs.split(',');
				var treeItems = tree.jqxTree('getItems');
				var loadChildren = [];
				for ( var i = 0; i < uiResDirs.length; i++) {
					var path = uiResDirs[i].split('/');
					for (j = 1; j <= path.length; j++) {
						var curPath = path.slice(0, j).join('/');
						$.each(treeItems, function() {
							var item = this;
							if (item.value == curPath) {
								self._expandDir(item.element);
								treeItems = tree.jqxTree('getItems');
								return;
							}
						});
					}

					$.each(treeItems, function() {
						var item = this;
						if (item.value == uiResDirs[i]) {
							tree.jqxTree('checkItem', item.element, true);
							return;
						}
					});
				}
			}
		}
	};

	Model.prototype._recalcHeight = function() {
		var height = $("body").height() - $(this.getElementByXid("serverDiv")).height() - 190;
		var tree = $(this.getElementByXid("uiResDirsTree"));
		tree.height(height);
		tree.css('visibility', 'visible');
	};

	Model.prototype.getTitle = function(wizard) {
		return '选择需要打包的资源';
	};

	Model.prototype._getChildren = function(path, baseDir) {
		data = {
			'function' : 'getFiles',
			'params' : {
				path : path,
				baseDir : baseDir,
				fileTypes : [],
				blackList : [ 'system' ]
			}
		};
		var self = this;
		var result = $.ajax({
			async : false,
			data : JSON.stringify(data),
			dataType : "json",
			contentType : "json",
			type : 'POST',
			url : require.toUrl("$UI/system/templates/common/templateHelper.j"),
			success : function(result) {
			},
			error : function(xhr, status, err) {
			}
		}).responseJSON;
		if (result && result.flag) {
			return result.files
		} else {
			return [];
		}
	};

	Model.prototype._expandDir = function(parent) {
		var tree = $(this.getElementByXid("uiResDirsTree"));
		var $element = $(parent);
		var loader = false;
		var loaderItem = null;
		var children = $element.find('ul:first').children();
		$.each(children, function() {
			var item = tree.jqxTree('getItem', this);
			if (item && item.label == 'Loading...') {
				loaderItem = item;
				loader = true;
				return false
			}
		});
		if (loader) {
			var files = this._getChildren("$UI/" + tree.jqxTree('getItem', parent).value, "$UI");
			tree.jqxTree('addTo', files, $element[0]);
			tree.jqxTree('removeItem', loaderItem.element);
		}
	}

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return false;
	};

	Model.prototype.validate = function() {
		if (!this.comp("indexURL").get("value")) {
			alert("“首页”不能为空");
			return false;
		}
		return true;
	};

	Model.prototype.nextPage = function(wizard) {
		if (this.validate()) {
			var config = this.appEngine.getConfig();
			config.serverURL = this.comp("serverURL").get("value");
			config.indexURL = this.comp("indexURL").get("value");
			if (!config.serverURL) {
				config.serverURL = "http://localhost";
			}
			config.uiResDirs = this.comp("uiResDirs").get("value");

			this.getParent().openPage({
				id : "configApp",
				url : "configApp.w",
				fromId : "selectAppResources"
			});
		}
	};

	return Model;
});
