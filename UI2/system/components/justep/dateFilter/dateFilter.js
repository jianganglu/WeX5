/*! 
* BeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");

	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Data = require("$UI/system/components/justep/data/data");
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");

	var url = require.normalizeName("./dateFilter");
	var ComponentConfig = require("./dateFilter.config");
	
	var CUSTOM_DIALOG = require.toUrl("$UI/system/components/justep/dateFilter/customDate.a");

	var DateFilter = justep.ViewComponent
			.extend({
				getConfig : function() {
					return ComponentConfig;
				},
				
				constructor : function(options) {
					this.callParent(options);
					this.filterData = "";
					this.filterMode = "singleDate";
					this.dateCol = null;
					this.beginDateCol = null;
					this.endDateCol = null;
					this.defaultValue = null;
					this.options = "";
					this.autoRefresh = true;

					this.selectedValue = justep.Bind.observable("");
					this.selectedLabel = justep.Bind.observable("");
					
					this.customBeginDate = this._getToday();
					this.customEndDate = this._getToday();
					
					this.optionsDataID = justep.UUID.createUUID();
				},
				
				buildTemplate : function(config) {
					if (!config) {
						config = {};
					}
					config.xid = config.xid ? config.xid : justep.UUID.createUUID();
					this.set(config);
					
					var domNode = $(justep.String.format('<div component="{0}" xid="{1}"></div>', url, config.xid));
					
					// TODO wj: 未完整实现
					var gridSelectConfig = config["gridSelect"];
					gridSelectConfig["bind-ref"] = "$model.comp($element.parentElement).seletedValue";
					gridSelectConfig["bind-labelRef"] = "$model.comp($element.parentElement).seletedLabel";
					gridSelectConfig["parentNode"] = domNode[0];
					new GridSelect(gridSelectConfig["parentNode"]);
					
					return domNode;
				},
				
				init : function(value, bindingContext) {
					this.callParent(value, bindingContext);
					this._initOptionsData();

					var data = this.getFilterData();
					if (this.defaultValue && data) {
						var event = function() {
							data.off(Data.EVENT_REFRESHDATA_BEFORE, event, this);
							var bak = this.autoRefresh;
							this.autoRefresh = false;
							try {
								this.filter();
							} finally {
								this.autoRefresh = bak;
							}
						}
						data.on(Data.EVENT_REFRESHDATA_BEFORE, event, this);
					}
				},

				getFilterData : function() {
					return this.getModel().comp(this.filterData);
				},
				
				getGridSelect : function() {
					var dom = $("[component='$model/UI2/system/components/justep/gridSelect/gridSelect']", this.$domNode)[0];
					return this.getModel().comp(dom);
				},

				filter : function() {
					if (this.hasListener("onFilter")) {
						this.fireEvent("onFilter", {
							"source" : this
						});
					} else {
						var data = this.getFilterData();
						data.setFilter(this.getFilterFlag(), this.getFilterStr());
						if (this.autoRefresh) {
							data.refreshData();
						}
					}
				},

				getFilterFlag : function() {
					return "_DATE_FILTER_" + this.$domNode.attr("xid");
				},
				
				_getOptionDate : function(option, k) {
					var cfg = this._getOptionsConfig()[option];
					if (cfg) {
						var d = cfg[k];
						return (typeof(d) == "function") ? d.call() : d;
					}
				},
				
				getDateRange : function(option) {
					option = option || this.selectedValue.get() || this.defaultValue; 
					return {
						"begin" : this._getOptionDate(option, "begin"),
						"end" : this._getOptionDate(option, "end") 
					}
				},
				
				_createDateFilter : function(relation, operator, d) {
					return "(" + relation + " " + operator + " stringToDate('" + justep.Date.toString(d, justep.Date.STANDART_FORMAT_SHOT) + "'))";
				},
				
				getFilterStr : function() {
					var gridSelect = this.getGridSelect();
					var data = this.getFilterData();
					var beginRelation, endRelation;
					if (this.filterMode == "singleDate") {
						beginRelation = endRelation = data.defCols[this.dateCol].relation;
					} else {
						beginRelation = data.defCols[this.beginDateCol].relation;
						endRelation = data.defCols[this.endDateCol].relation;
					}

					var filters = [];
					var range = this.getDateRange();
					if (range.begin) {
						filters.push(this._createDateFilter(endRelation, ">=", range.begin));
					}
					if (range.end) {
						var endDate = new Date(range.end);
						endDate.setDate(endDate.getDate() + 1);
						filters.push(this._createDateFilter(beginRelation, "<", endDate));
					}
					
					return filters.join(" AND ");
				},
				
				_getNow : function() {
					if (!this._now) {
						this._now = new Date();
					}
					return this._now;
				},
				
				_getToday : function() {
					if (!this._today) {
						var now = this._getNow();
						this._today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
					}
					return this._today;
				},

				_getOptionsConfig : function() {
					if (!this._dateOptions) {
						var self = this;
						var today = this._getToday();
						this._dateOptions = {
								"all" : {
									"label" : "全部",
									"begin" : null,
									"end" : null
								},
								"today" : {
									"label" : "今天",
									"begin" : new Date(today),
									"end" : new Date(today)
								},
								"yesterday" : {
									"label" : "昨天",
									"begin" : new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
									"end" : new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
								},
								"thisWeek" : {
									"label" : "本周",
									"begin" : new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1),
									"end" : new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7)
								},
								"lastWeek" : {
									"label" : "上周",
									"begin" : new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 6),
									"end" : new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
								},
								"thisMonth" : {
									"label" : "本月",
									"begin" : new Date(today.getFullYear(), today.getMonth(), 1),
									"end" : new Date(today.getFullYear(), today.getMonth() + 1, 0)
								},
								"lastMonth" : {
									"label" : "上月",
									"begin" : new Date(today.getFullYear(), today.getMonth() - 1, 1),
									"end" : new Date(today.getFullYear(), today.getMonth(), 0)
								},
								"thisYear" : {
									"label" : "本年",
									"begin" : new Date(today.getFullYear(), 0, 1),
									"end" : new Date(today.getFullYear() + 1, 0, 0)
								},
								"lastYear" : {
									"label" : "去年",
									"begin" : new Date(today.getFullYear() - 1, 0, 1),
									"end" : new Date(today.getFullYear(), 0, 0)
								},
								"custom" : {
									"label" : "自定义",
									"begin" : function() {
										return new Date(self.customBeginDate);
									},
									"end" : function() {
										return new Date(self.customEndDate);
									}
								}
							};
					}
					return this._dateOptions;
				},
				
				_initOptionsData : function() {
					this.optionsData = new Data(this.getModel(), {
						"xid" : this.optionsDataID,
						"defCols" : {
							"id" : {
								"type" : "String",
								"label" : "label"
							},
							"lable" : {
								"type" : 'String',
								"label" : "label"
							}
						},
						"idColumn" : "id"
					});
					var options = this.options ? this.options.split(",") : null;
					var rows = [];
					$.each(this._getOptionsConfig(), function(id, data) {
						if (!options || $.inArray(id, options) != -1) {
							rows.push({
								"id" : {"value" : id},
								"label" : {"value" : data.label}
							});
						}
					});
					this.optionsData.loadData({
						"@type" : "table",
						"rows" : rows
					});
				},
				
				_getDefaultLabel : function() {
					var value = this.defaultValue;
					var options = this._getOptionsConfig(); 
					if (value && options[value]) {
						return options[value].label;
					}
					return "";
				},
				
				openCustomDialog : function() {
					this._getCustomDialog().open({
						"data" : {
							"begin" : this.customBeginDate,
							"end" : this.customEndDate
						}
					});
				},
				
				_getCustomDialog : function() {
					if (!this._customDialog) {
						var self = this;
						this._customDialog = new WindowDialog({
							"title" : "自定义",
							"showTitle" : justep.Browser.isPC,
							"status" : justep.Browser.isPC ? "normal" : "maximize",
							"height" : "250px",
							"width" : "300px",
							"parentNode" : this.domNode,
							"src" : CUSTOM_DIALOG,
							"onReceive" : function(event) {
								self._onCustomDialogReceive(event);
							}
						});
					}
					return this._customDialog;
				},
				
				_onCustomDialogReceive : function(event) {
					this.customBeginDate = event.data.begin;
					this.customEndDate = event.data.end;
					this.filter();
				},
				
				_onUpdateValue : function(event) {
					var self = event.source.getModel().comp(event.source.domNode.parentElement); 
					var value =  self.selectedValue.get();
					if (value == "custom") {
						self.openCustomDialog();
					} else {
						self.filter();
					}
				}
				
			});

	justep.Component.register(url, DateFilter);
	return DateFilter;
});