/*! 
* BeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var Component = justep.Component;
	var Bind = justep.Bind;
	var Express = justep.Express;
	var List = require("../list/list");
	var Data = require("../data/data");

	var url = require.normalizeName("./tree");
	var ComponentConfig = require("./tree.config");

	var Tree = List
			.extend({
				getConfig : function() {
					return ComponentConfig;
				},
				constructor : function(options) {
					this.labelColumn = null;
					this.rootLabel = justep.Message.getMessage(justep.Message.JUSTEP231085);
					this.contexts = {};
					this.context = Bind.observable({
						pageIndex : -1,
						row : null,
						datas : null
					});
					this.callParent(options);
				},
				dispose : function() {
					var data = this.getData(), bar = this.getBar();
					data.off('onAfterRefresh', this._doDataRefresh);
					bar.off('onClick', this._doBarClick);
					this.callParent();
				},
				clsContexts : function() {
					this.contexts = {};
					var context = this.context.get();
					context.pageIndex = -1;
					context.row = null;
					context.datas = null;
				},
				clear : function() {
					this.clsContexts();
					this.getBar().clear();
					var bar = this.getBar();
					bar.push({
						label : this.rootLabel
					});
				},
				updateContext : function(row) {
					var data = this.getData();
					var context = this.contexts[row?data.getRowID(row):undefined];
					if (context)
						this.context.set(context);
					else {
						context = {
							pageIndex : 1,
							row : row,
							datas : row ? row.rows : this.getData().datas
						};
						this.context.set(context);
					}
					var scroll = this.getScroll();
					if (scroll)
						scroll.refresh();// 刷新滚动区域的大小
				},
				saveContext : function() {
					var context = this.context.get(), data = this.getData();
					this.contexts[context ? data.getRowID(context.row) : null] = context;
				},
				doInit : function(value, bindingContext) {
					this.callParent(value, bindingContext);
				},
				_getForeachNode : function() {
					return this.$domNode.find('.x-tree-template:first');
				},
				_bindEvent : function() {
					var data = this.getData();
					data.on('onAfterRefresh', this._doDataRefresh, this);
					data.on('onDataChange', this._doDataClear, this);

					var me = this;
					this.getModel().componentPromise(this.$domNode.find('.x-tree-head .breadcrumb')[0]).done(function(bar) {
						bar.on('onClick', me._doBarClick, me);
						bar.push({
							label : me.rootLabel
						});
					});
					this._getForeachNode().on('click', '.x-tree-link', {
						comp : this
					}, function(evt) {
						return evt.data.comp._doRowLinkClick(evt);
					}).on('click', {
						comp : this
					}, function(evt) {
						evt.data.comp._doRowClick(evt);
						return true;
					});
					this.callParent();
				},
				_doRowLinkClick : function(evt) {
					this.saveContext();
					var bindContext = Bind.contextFor(evt.target || evt.srcElement), row = bindContext.$object, data = this.getData();
					var eData = {
						source : this,
						bindingContext : bindContext,
						row : row,
						data : data,
						cancel : false
					};
					this.fireEvent('onBeforeLoadChildren', eData);
					if (!eData.cancel && !data.isLeaf(row)) {// 叶子节点不展开
						if (!data.isLoaded(row)) {
							if (!this.hasListener('onCustomLoadChildren')) {
								data.loadNextPageData({
									append : false,
									parent : row
								});
							} else {
								eData = {
									source : this,
									bindingContext : bindContext,
									row : row,
									data : data
								};
								this.fireEvent('onCustomLoadChildren', eData);
							}
						}
						if (row && row.rows && row.rows.get().length > 0) {// 有数据进入
							data.to(row.rows.get()[0]);
							this.updateContext(row);
							this.getBar().push({
								label : row.val(this.labelColumn),
								row : row
							});
							return false;
						}
					}
					return true;
				},
				_doBarClick : function(evt) {
					this.saveContext();
					var temp = evt.source.popTo(evt.data);
					if (temp && temp.length > 0)
						this.getData().to(temp[temp.length - 1].row);
					this.updateContext(evt.data.row);
				},
				_doDataClear : function(evt) {
					if (evt.selfChanged && evt.type == 'clear' && !evt.parent)
						this.clear();
				},
				_doDataRefresh : function(evt) {
					if (!evt.options.parent) {// data刷新后重新画tree
						this.refresh();
					}
				},
				getBar : function() {
					return Component.getComponent(this.$domNode.find('.x-tree-head .breadcrumb')[0]);
				},
				getScroll : function() {
					return Component.getComponent(this.$domNode.find('.x-scroll:first')[0]);
				},
				getForeachData : function() {
					var context = this.context.get();
					if (context.pageIndex == -1)
						return [];

					if (context.datas) {
						var data = this.getData();
						if (data instanceof Data) {
							var datas = context.datas.get(), list_limit = (-1 == this.limit ? data.limit : this.limit);
							var size = datas.length, offset = (-1 == this.limit ? data.getOffset(context.row) : (list_limit * context.pageIndex)), total = data
									.getTotal(context.row);
							this.hasMore = offset < size || (size > 0 && total > 0 && (offset - (-1 == this.limit?0:list_limit)) < total);
							if (data.limit != list_limit || this.filter) {
								if (this.filter && 'string' == typeof (this.filter))
									this.filter = new Express(this.filter);
								var ret = [];
								var ctx = Bind.contextFor(this.domNode);
								for ( var i = 0, j = 0; (i < offset && j < size); j++) {
									var b = true;
									if (this.filter instanceof Express) {
										ctx.$row = datas[j];
										b = Express.eval(this.filter, ctx.$object, ctx);
									}
									if (b) {
										ret.push(datas[j]);
										i++;
									}
								}
								delete ctx.$row;
								if (i < offset && size < total && this._canLoadData) {
									if (data.loaded) {
										data.loadNextPageData({
											append : true,
											parent : context.row
										});
										if (datas.length > size)
											return this.getForeachData();// 增加判断，如果没有加载到数据不再进行数据加载
									}
								}
								return ret;
							} else {
								if (offset <= size) {
									return datas;
								} else {
									if (data.loaded && size < total && this._canLoadData) {
										data.loadNextPageData({
											append : true,
											parent : context.row
										});
										if (datas.length > size)
											return this.getForeachData();// 增加判断，如果没有加载到数据不再进行数据加载
										else
											return datas;
									} else
										return datas;
								}
							}
						}
					}
					return [];
				},
				propertyChangedHandler : function(key, oldVal, value) {
					if ('rootLabel' == key)
						if (this._inited)
							this.getBar().setLabel(0, value);
						else
							this.callParent(key, oldVal, value);
				},
				loadNextPage : function() {
					if (this.hasMore) {
						var context = this.context.get();
						if (-1 == this.limit)
							this.getData().loadNextPageData({
								append : true,
								parent : context.row
							});
						else {
							this._canLoadData = true;
							try {
								context.pageIndex++;
								this.context.set(context);
							} finally {
								this._canLoadData = false;
							}
						}
					}
				},
				refresh : function(refreshData) {
					if (this.data) {
						var context = this.context.get();
						var data = this.getData();
						var row = context.row;
						if ((refreshData && data instanceof Data) || (!data.autoLoad && !data.isLoaded()))
							data.refreshData({
								parent : row
							});
						this._canLoadData = true;
						try {
							context = {
								pageIndex : 1,
								row : row,
								datas : row ? row.rows : this.getData().datas
							};
							this.context.set(context);
						} finally {
							this._canLoadData = false;
						}
						data.first();
					}
					this._getForeachNode().removeClass('hide');
				}
			});

	Component.register(url, Tree);
	return Tree;
});