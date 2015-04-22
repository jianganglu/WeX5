/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var Tree = require("../tree");
	require('css!./css/tree').load();

	var TreeDesigner = Tree.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);

			this.$domNode.children('div.x-tree-head').addClass('x-min-height').attr("d_canAddChild", "true").attr("d_canRemove", false);
			this.$domNode.children('.x-tree-content').attr("d_canRemove", false).attr('d_selectable', false);
			this.$domNode.find('.x-tree-template').addClass('x-min-height').attr("d_canAddChild", "true").attr("d_canRemove", false).attr(
					'd_selectable', false).children().addClass('x-min-height');
			this.$domNode.find('.x-tree-head .breadcrumb').attr("d_canRemove", false);
		},
		_bindEvent : function() {
			var label = this.$domNode.attr('rootLabel');
			if (!label)
				label = '根';
			this.getModel().componentPromise(this.$domNode.find('.x-tree-head .breadcrumb')[0]).done(function(bar) {
				bar.push({
					label : label
				});
			});
		},
		dispose : function() {// 覆盖组件的实现
		}
	});

	return {
		'$UI/system/components/justep/tree/tree' : TreeDesigner
	};
});