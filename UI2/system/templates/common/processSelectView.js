define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var loadTreeJs = require("$UI/system/components/designerCommon/tree/tree");
	var templateService = require("$UI/system/templates/common/js/templateService");
	loadTreeJs($);
	var Model = function() {
		this.callParent();
		this.selectedFile = null;
	};

	Model.prototype._initGridScroll = function() {
		var grid = this.getElementByXid('grid');
		$(grid).jqxGrid('scrolloffset', 0, 0);
	};

	Model.prototype._changeGridSize = function() {
		var grid = this.getElementByXid('grid');
		var height = $("body").height() - $('.file-select-navbar').height() - 36;
		var width = $("body").width() - 24;
		$(grid).jqxGrid({
			width : width,
			height : height
		});
	};

	Model.prototype._changeTreeSize = function() {
		var tree = $(this.getElementByXid("jqxTreeFile"));
		var height = $("body").height() - $('.file-select-navbar').height() - 36;
		var width = $("body").width() - 24;
		tree.jqxTree({
			width : width,
			height : height
		});
	};

	Model.prototype._hideGrid = function(hidden) {
		var grid = this.getElementByXid('grid');
		if (hidden) {
			$(grid).hide();
		} else {
			$(grid).show();
		}
	};

	Model.prototype._intTemplateGridEvent = function() {
		var self = this;
		var grid = this.getElementByXid('grid');
		$(grid).on('rowselect', function(event) {
			var args = event.args;
			var value = args.row.colValue;
			var temp = null;
			while (value.indexOf('<') != -1 && value.indexOf('>') != -1) {
				temp = value.substring(value.indexOf('<'), value.indexOf('>') + 1).replace(/\//g, "\\/");
				value = value.replace(new RegExp(temp), "");
			}
			self.selectFileClick(value);
		});
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
		var tree = $(this.getElementByXid("jqxTreeFile"));
		var self = this;
		tree.jqxTree('clear');
		data = {
			'function' : 'getFiles',
			'params' : {
				path : "/BIZ",
				baseDir : "/BIZ",
				fileTypes : [ '.process.m' ],
				blackList : [ 'system' ]
			}
		};
		tree.jqxTree({
			source : templateService.getFiles(data),

		});
		tree.on('select', function(event) {
			var args = event.args;
			var item = tree.jqxTree('getItem', args.element);
			var label = item.label;
			self.selectFileClick(item.value);
		});
		tree.on('expand', function(event) {
			self._expandDir(event.args.element);
		});
		this._hideGrid(true);
		this._intTemplateGridEvent();
		// 添加浏览器事件
		var self = this;
		$(window).resize(function() {
			self._changeGridSize();
			self._changeTreeSize();
		});
	};

	Model.prototype._expandDir = function(parent) {
		var tree = $(this.getElementByXid("jqxTreeFile"));
		var $element = $(parent);
		var loader = false;
		var loaderItem = null;
		var children = $element.find('ul:first').children();
		$.each(children, function() {
			var item = tree.jqxTree('getItem', this);
			if (item && item.label == 'Loading...') {
				loaderItem = item;
				loader = true;
				return false;
			}
			;
		});
		if (loader) {
			data = {
				'function' : 'getFiles',
				'params' : {
					path : "/BIZ/" + tree.jqxTree('getItem', parent).value,
					baseDir : "/BIZ",
					fileTypes : [ '.process.m' ],
					blackList : [ 'system' ]
				}
			};
			var files = templateService.getFiles(data);
			tree.jqxTree('addTo', files, $element[0]);
			tree.jqxTree('removeItem', loaderItem.element);
		}
	}

	Model.prototype.validate = function(wizard) {
		var msg = "";
		if (!this.selectedFile || "" == this.selectedFile.trim()) {
			msg += "流程没有选择，\n";
		}
		return msg;
	};

	Model.prototype.finish = function(wizard) {
		this.templateEngine.addContext(this.templateFile, "processDir", this.selectedFile);
	}

	// 过滤，只有选中指定的文件类型才合法
	Model.prototype.selectFileClick = function(value) {
		if (value.indexOf(".process.m") != -1) {
			this.selectedFile = "/"+value.substring(0,value.indexOf('.process.m'));
		} else {
			this.selectedFile = null;
		}
	};
	return Model;
});