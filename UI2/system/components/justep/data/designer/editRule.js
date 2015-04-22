/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	//var justep = require('$UI/system/lib/justep');
	var XML = require("$UI/system/lib/base/xml");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	var Model = function() {
		/*
ruleXID
readonly_XID
readonly_expr_XID

col_fString_XID
col_fString_required_XID
col_fString_required_expr_XID
col_fString_required_message_XID

col_fInteger_constraint_XID
col_fInteger_constraint_expr_XID
col_fInteger_constraint_message_XID

col_fInteger_readonly_XID
col_fInteger_readonly_expr_XID

col_fInteger_calculate_XID
col_fInteger_calculate_expr_XID
		 */
		this.xids = {};
		this.callParent();
	};

	Model.prototype.def2xml = function() {
		var self = this, data = this.comp('data'), rule = '<rule '+(this.xids['ruleXID']?('xid="'+this.xids['ruleXID']+'"'):'')+'>';
		var dataReadonly = this.comp('dataReadonly').val();
		if (dataReadonly) {// data的只读规则
			rule += ('<readonly '+(this.xids['readonly_XID']?('xid="'+this.xids['readonly_XID']+'"'):'')+'><expr '+(this.xids['readonly_expr_XID']?('xid="'+this.xids['readonly_expr_XID']+'"'):'')+'><![CDATA[' + dataReadonly + ']]></expr></readonly>');
		}
		data
				.each(function(param) {
					var colXml = '', hasDef = false, colName = data.getValue('name', param.row);
					colXml += '<col '+(self.xids['col_'+colName+'_XID']?('xid="'+self.xids['col_'+colName+'_XID']+'"'):'')+' name="' + colName + '">';
					if (data.getValue('readonly', param.row)) {
						colXml += ('<readonly '+(self.xids['col_'+colName+'_readonly_XID']?('xid="'+self.xids['col_'+colName+'_readonly_XID']+'"'):'')+'><expr '+(self.xids['col_'+colName+'_readonly_expr_XID']?('xid="'+self.xids['col_'+colName+'_readonly_expr_XID']+'"'):'')+'><![CDATA[' + data.getValue('readonly', param.row) + ']]></expr></readonly>');
						hasDef = true;
					}
					if (data.getValue('calculate', param.row)) {
						colXml += ('<calculate '+(self.xids['col_'+colName+'_calculate_XID']?('xid="'+self.xids['col_'+colName+'_calculate_XID']+'"'):'')+'><expr '+(self.xids['col_'+colName+'_calculate_expr_XID']?('xid="'+self.xids['col_'+colName+'_calculate_expr_XID']+'"'):'')+'><![CDATA[' + data.getValue('calculate', param.row) + ']]></expr></calculate>');
						hasDef = true;
					}
					if (data.getValue('required', param.row)) {
						colXml += ('<required '+(self.xids['col_'+colName+'_required_XID']?('xid="'+self.xids['col_'+colName+'_required_XID']+'"'):'')+'><expr '+(self.xids['col_'+colName+'_required_expr_XID']?('xid="'+self.xids['col_'+colName+'_required_expr_XID']+'"'):'')+'><![CDATA['
								+ data.getValue('required') + ']]></expr><message '+(self.xids['col_'+colName+'_required_message_XID']?('xid="'+self.xids['col_'+colName+'_required_message_XID']+'"'):'')+'><![CDATA['
								+ (data.getValue('requiredMessage') ? data.getValue('requiredMessage', param.row) : '') + ']]></message></required>');
						hasDef = true;
					}
					if (data.getValue('constraint', param.row)) {
						colXml += ('<constraint '+(self.xids['col_'+colName+'_constraint_XID']?('xid="'+self.xids['col_'+colName+'_constraint_XID']+'"'):'')+'><expr '+(self.xids['col_'+colName+'_constraint_expr_XID']?('xid="'+self.xids['col_'+colName+'_constraint_expr_XID']+'"'):'')+'><![CDATA['
								+ data.getValue('constraint', param.row) + ']]></expr><message '+(self.xids['col_'+colName+'_constraint_message_XID']?('xid="'+self.xids['col_'+colName+'_constraint_message_XID']+'"'):'')+'><![CDATA['
								+ (data.getValue('constraintMessage', param.row) ? data.getValue('constraintMessage', param.row) : '') + ']]></message></constraint>');
						hasDef = true;
					}
					colXml += '</col>';
					if (hasDef)
						rule += colXml;
				});
		return rule + '</rule>';
	};

	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function() {
		return {
			def : this.def2xml()
		};
	};

	Model.prototype.init = function() {
		var self = this;
		var initData = xuiService.getPageParams();// 获取传入的参数
		var ruleDef = self.xml2def(initData.xml);// 初始化属性值
		var cols = initData.cols;
		self.cols2data(cols, ruleDef);
	};

	Model.prototype.cols2data = function(cols, ruleDef) {
		this.comp('dataReadonly').val(ruleDef['readonly'].expr);
		if ($.isArray(cols)) {
			var defaultValues = [];
			for ( var i = 0; i < cols.length; i++) {
				var o = {
					name : cols[i]['alias'],
					type : cols[i]['data-type'],
					displayName : cols[i]['label']
				};
				var colRuleDef = ruleDef.col[o.name];
				if (colRuleDef) {
					o.readonly = colRuleDef.readonly.expr;
					o.calculate = colRuleDef.calculate.expr;
					o.required = colRuleDef.required.expr;
					o.requiredMessage = colRuleDef.required.message;
					o.constraint = colRuleDef.constraint.expr;
					o.constraintMessage = colRuleDef.constraint.message;
				}
				defaultValues.push(o);
			}

			var data = this.comp('data');
			data.newData({
				defaultValues : defaultValues
			});
			data.first();
		}
	};

	Model.prototype.xml2def = function(xmlStr) {
		if (xmlStr) {
			var ruleDef = {
				readonly : {},
				col : {}
			};
			/*
			ruleXID
			readonly_XID
			readonly_expr_XID

			col_fString_XID
			col_fString_required_XID
			col_fString_required_expr_XID
			col_fString_required_message_XID

			col_fInteger_constraint_XID
			col_fInteger_constraint_expr_XID
			col_fInteger_constraint_message_XID

			col_fInteger_readonly_XID
			col_fInteger_readonly_expr_XID

			col_fInteger_calculate_XID
			col_fInteger_calculate_expr_XID
					this.xids = {};
					 */
			var $data = $(XML.fromString(xmlStr).documentElement), $rule = $data.children('rule'), self = this;
			this.xids['ruleXID'] = $rule.attr('xid');
			var $ruleReadonly = $rule.children('readonly');
			this.xids['readonly_XID'] = $ruleReadonly.attr('xid');
			var $ruleReadonlyExpr = $ruleReadonly.children('expr');
			this.xids['readonly_expr_XID'] = $ruleReadonlyExpr.attr('xid');
			ruleDef['readonly'].expr = $.trim($ruleReadonlyExpr.text());
			$rule.children('col').each(function() {
				var $col = $(this), def = {};
				if ($col.attr('name')) {
					var colName = $col.attr('name');
					self.xids['col_'+colName+'_XID'] = $col.attr('xid');
					
					var $colReadonly = $col.children('readonly');
					self.xids['col_'+colName+'_readonly_XID'] = $colReadonly.attr('xid');
					var $colReadonlyExpr = $colReadonly.children('expr');
					self.xids['col_'+colName+'_readonly_expr_XID'] = $colReadonlyExpr.attr('xid');
					def['readonly'] = {
						expr : $.trim($colReadonlyExpr.text())
					};

					var $colcalculate = $col.children('calculate');
					self.xids['col_'+colName+'_calculate_XID'] = $colcalculate.attr('xid');
					var $colcalculateExpr = $colcalculate.children('expr');
					self.xids['col_'+colName+'_calculate_expr_XID'] = $colcalculateExpr.attr('xid');
					def['calculate'] = {
						expr : $.trim($colcalculateExpr.text())
					};

					var $colrequired = $col.children('required');
					self.xids['col_'+colName+'_required_XID'] = $colrequired.attr('xid');
					var $colrequiredExpr = $colrequired.children('expr');
					self.xids['col_'+colName+'_required_expr_XID'] = $colrequiredExpr.attr('xid');
					var $colrequiredMessage = $colrequired.children('message');
					self.xids['col_'+colName+'_required_message_XID'] = $colrequiredMessage.attr('xid');
					def['required'] = {
						expr : $.trim($colrequiredExpr.text()),
						message : $.trim($colrequiredMessage.text())
					};

					var $colconstraint = $col.children('constraint');
					self.xids['col_'+colName+'_constraint_XID'] = $colconstraint.attr('xid');
					var $colconstraintExpr = $colconstraint.children('expr');
					self.xids['col_'+colName+'_constraint_expr_XID'] = $colconstraintExpr.attr('xid');
					var $colconstraintMessage = $colconstraint.children('message');
					self.xids['col_'+colName+'_constraint_message_XID'] = $colconstraintMessage.attr('xid');
					def['constraint'] = {
						expr : $.trim($colconstraintExpr.text()),
						message : $.trim($colconstraintMessage.text())
					};
					ruleDef.col[$col.attr('name')] = def;
				}
			});
			return ruleDef;
		}
	};

	Model.prototype.modelLoad = function(event) {
		this.init();
	};
	
	/**
	 * 打开表达式编辑器.
     */
	Model.prototype.openExpressionEditor = function(currentProp){
		var comp = this.comp("data");
		xuiService.openEditor("jSExpressionEditor", {value : comp.getValue(currentProp)}, function(result) {
			comp.setValue(currentProp, result.value);
		});
	};
	
	Model.prototype.readonlyExprClick = function(event) {
		this.openExpressionEditor("readonly");
	};

	Model.prototype.calculateExprClick = function(event){
		this.openExpressionEditor("calculate");
	};

	Model.prototype.requiredExprClick = function(event){
		this.openExpressionEditor("required");
	};

	Model.prototype.constraintExprClick = function(event){
		this.openExpressionEditor("constraint");
	};

	Model.prototype.dataReadonlyExprClick = function(event){
		var comp = this.comp("dataReadonly");
		xuiService.openEditor("jSExpressionEditor", {value : comp.val()}, function(result) {
			comp.val(result.value);
		});
	};

	return Model;
});