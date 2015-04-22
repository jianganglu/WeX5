/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	//require("css!./css/jquery.dataTables").load();
	require("css!./css/dataTables.bootstrap").load();
	require("css!./css/dataTables.responsive").load();

	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var Data = require("$UI/system/components/justep/data/data");

	// 引入jqQrid
	require("./js/jquery.dataTables");
	require("./js/dataTables.bootstrap");
	require("./js/dataTables.responsive");

	var url = require.normalizeName("./dataTables");
	var ComponentConfig = require("./dataTables.config");

	var language = {
        "oPaginate": {
            /*
             * 默认值为First
             * 当使用全数字类型的分页组件的时候，到第一页按钮上的文字
             */
            "sFirst": '<<',//justep.Message.getMessage(justep.Message.JUSTEP231550),//"第一页",
            /*
             * 默认值为Last
             * 当使用全数字类型的分页组件的时候，到最后一页按钮上的文字
             */
            "sLast": '>>',//justep.Message.getMessage(justep.Message.JUSTEP231551),//"最后页",
            /*
             * 默认值为Next
             * 当使用全数字类型的分页组件的时候，到下一页按钮上的文字
             */
            "sNext": '>',//justep.Message.getMessage(justep.Message.JUSTEP231552),//"下一页",
            /*
             * 默认值为Previous
             * 当使用全数字类型的分页组件的时候，到前一页按钮上的文字
             */
            "sPrevious": '<',//justep.Message.getMessage(justep.Message.JUSTEP231553),//"前一页"
        },
        /*
         * 默认值activate to sort column ascending为
         * 当表格中没有数据（无视因为过滤导致的没有数据）时，该字符串年优先与sZeroRecords显示
         * 注意这是个可选参数，如果没有指定，sZeroRecrods会被使用（既不是默认值也不是给定的值）
         */
        "sEmptyTable": justep.Message.getMessage(justep.Message.JUSTEP231554),//"没有数据",
        /*
         * 默认值为Showing _START_ to _END_ of _TOTAL_ entries 
         * 该属性给终端用户提供当前页面的展示信息，字符串中的变量会随着表格的更新被动态替换，而且可以被任意移动和删除
         */
        "sInfo": justep.Message.getMessage(justep.Message.JUSTEP231555),//"当前显示_START_-_END_条，共_TOTAL_条",
        /*
         * 默认值为Showing 0 to 0 of 0 entries 
         * 当表格中没有数据时展示的表格信息，通常情况下格式会符合sInfo的格式
         */
        "sInfoEmpty": '',//justep.Message.getMessage(justep.Message.JUSTEP231556),//"没有数据",
        /*
         * 默认值为(filtered from _MAX_ total entries) 
         * 当用户过滤表格中的信息的时候，该字符串会被附加到信息字符串的后面，从而给出过滤器强度的直观概念
         */
        "sInfoFiltered": "",
        /*
         * 默认值为空字符串
         * 使用该属性可以很方便的向表格信息字符串中添加额外的信息，被添加的信息在任何时候都会被附加到表格信息组件的后面
         * sInfoEmpty和sInfoFiltered可以以任何被使用的方式进行结合
         */
        "sInfoPostFix": "",
        /*
         * 默认值为','
         * DataTable有内建的格式化数字的工具，可以用来格式化表格信息中较大的数字
         * 默认情况下会自动调用，可以使用该选项来自定义分割的字符 
         */
        "sInfoThousands": "'",
        /*
         * 默认值为Show _MENU_ entries 
         * 描述当分页组件的下拉菜单的选项被改变的时候发生的动作，'_MENU_'变量会被替换为默认的10，25，50，100
         * 如果需要的话可以被自定义的下拉组件替换
         */
        "sLengthMenu": justep.Message.getMessage(justep.Message.JUSTEP231557),//"显示_MENU_条",
        /*
         * 默认值为Loading...
         * 当使用Ajax数据源和表格在第一次被加载搜集数据的时候显示的字符串，该信息在一个空行显示
         * 向终端用户指明数据正在被加载，注意该参数在从服务器加载的时候无效，只有Ajax和客户端处理的时候有效
         */
        "sLoadingRecords": justep.Message.getMessage(justep.Message.JUSTEP231558),//"请等待数据加载中...",
        /*
         * 默认值为Processing...
         * 当表格处理用户动作（例如排序或者类似行为）的时候显示的字符串
         */
        "sProcessing": justep.Message.getMessage(justep.Message.JUSTEP231559),//"处理中...",
        /*
         * 默认为Search:
         * 描述用户在输入框输入过滤条件时的动作，变量'_INPUT_',如果用在字符串中
         * DataTable会使用用户输入的过滤条件替换_INPUT_为HTML文本组件，从而可以支配它（即用户输入的过滤条件）出现在信息字符串中的位置 
         * 如果变量没有指定，用户输入会自动添加到字符串后面
         */
        "sSearch": justep.Message.getMessage(justep.Message.JUSTEP231560),//"查询： _INPUT_",
        /*
         * 默认值为No matching records found
         * 当对数据进行过滤操作后，如果没有要显示的数据，会在表格记录中显示该字符串
         * sEmptyTable只在表格中没有数据的时候显示，忽略过滤操作
         */
        "sZeroRecords": justep.Message.getMessage(justep.Message.JUSTEP231561)//"没有数据"
    };

	var processDom = function(cfg,comp){
		var data = comp.getData();
		var type = cfg.layout;
		if('t'===type){//只有表格
			cfg.dom = "tr";
			if(data)cfg.pageLength = data.limit;
			cfg.paging = false;
		}else if('tlip'===type){//表格+分页长度+信息+分页
			cfg.dom = "tr"
				+"<'container-fluid'<'row'<'col-sm-3'l><'col-sm-3'i><'col-sm-6'p>>>";
		}else if('ptp'===type){//分页+表格+分页
			cfg.dom = "ptrp";
			if(data)cfg.pageLength = data.limit;
		}
	};
	
	var processOrder = function(data, settings){
		//aaSorting
		var orders = [], tempOrders = settings.tempOrders||[], isChanged = false, order;
		if($.isArray(settings.aaSorting) && settings.aaSorting.length>0){
			data.clearOrderBy();
			var aaSorting = settings.aaSorting, colSorting, colDef, o;
			for(var i=0;i<aaSorting.length;i++){
				colSorting = aaSorting[i];
				if(colSorting.length<2) continue;
				colDef = settings.aoColumns[colSorting[0]];
				order = 'asc'===colSorting[1]?1:0;
				data.setOrderBy(colDef.sName,order);
				o = {};
				o[colDef.sName] = order;
				orders.push(o);
				if(tempOrders.length<=i) isChanged = true;
				if(!isChanged){
					isChanged = tempOrders[i][colDef.sName] !== o[colDef.sName];
				}
			}
		}
		settings.tempOrders = orders;
		return isChanged;
	};
	
	var valToString = function(v, colDef){
		if(v instanceof Data.ErrorValue) v = v.value;
		if(v===null || v===undefined) return '';
		if(colDef.format && ('DateTime' === colDef.dataType
				||'Date' === colDef.dataType
				||'Time' === colDef.dataType))
			return justep.Date.toString(v, colDef.format);
		else return v;
	};
	
	var colVal = function(source, type, val, meta){
		var colDef = meta.settings.aoColumns[meta.col];
		if (type === 'set') {
			source.val(colDef.sName,val);
			return;
		} else if (type === 'display') {
			return valToString(source.val(colDef.sName), colDef);
		} else if (type === 'filter') {
			return source.val(colDef.sName)||"";
		}
		return source.val(colDef.sName)||"";
	};

	var DataTables = justep.ViewComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		// 构造函数
		constructor : function(options) {
			this._eventHandles = {};
			this.multiSelect = false;
			this.showRowNumber = false;
			this.data = null;
			this._lastsel = null;
			this._disON = false;
			this.rowActiveClass = '';
			this.rowAttr = null;
			this.useFooter = false;
			this.callParent(options);
		},
		dispose : function() {
			this._bindEvent(false);
			this.callParent();
		},
		buildTemplate : function(config) {
			this._cfg = config || {};
			this.data = this._cfg.data;
			if(!this._cfg.xid) this._cfg.xid=justep.UUID.createUUID();
			var str = '<table xid="'+this._cfg.xid+'" component="'+url+'"'
						+(this._cfg['style']?(' style="'+this._cfg['style']+'"'):'')
						+(this._cfg['class']?(' class="'+this._cfg['class']+'"'):'')
						+'>';
			if(this._cfg.useFooter===true){
				var tf = '<tfoot><tr>';
				var size = $.isArray(this._cfg.columns)?this._cfg.columns.length:0;
				if(this._cfg.multiSelect) size++;
				if(this._cfg.showRowNumber) size++;
				for(var i=0;i<size;i++){
					tf += '<th/>';
				}
				tf += '</tr></tfoot>';
				str += tf;
			}
			str += '</table>';
			return $(str);
		},
		
		// 初始化
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			var cfg = this._processCfg();
			this.fireEvent('onBeforeInit',{source:this,settings:cfg});
			this.$domNode.dataTable(cfg);
			this._bindEvent();
			this.fireEvent('onInit', {source:this});
			this._processFooter();
		},

		_processCfg : function(){
			var self = this;
			var data = this.getData();
			var cfg = $.extend({
				"oLanguage": language,
				"order": [],
				"layout": 't',
				"lengthMenu": [10,20,50,100],
				"bProcessing" : true,
				"bServerSide" : true,
				"responsive" : false,
				"sAjaxSource" : "data.json",
				"sAjaxDataProp": "data",
				"footerCallback": function(tfoot, aoData, start, end, display){
					self.fireEvent('onFooterRender', {
						source:self,
						tfoot:tfoot, 
						data:data, 
						start:start, 
						end:end, 
						display:display
						});
				},
				"headerCallback": function(thead, aoData, start, end, display){
					self.fireEvent('onHeaderRender', {
						source:self,
						thead:thead, 
						data:data, 
						start:start, 
						end:end, 
						display:display
						});
				},
				"createdRow": function(tr, row){
					if(self.rowAttr){
						if(!self._rowAttrExpr) self._rowAttrExpr = new justep.Express(self.rowAttr);
						var ctx = justep.Bind.contextFor(self.domNode);
						ctx.$row = row;
						var attrObj = justep.Express.eval(self._rowAttrExpr, ctx.$object, ctx);
						delete ctx.$row;
						if(!$.isEmptyObject(attrObj)) {
							if (attrObj.hasOwnProperty("style")) {
								var style = $(tr).attr('style');
								$(tr).attr('style',style?(style+attrObj.style):attrObj.style);
								delete attrObj.style;
							}
							if (attrObj.hasOwnProperty("class")) {
								$(tr).addClass(attrObj['class']);
								delete attrObj['class'];
							}
							// dot't allow to change role attribute
							try { delete attrObj.role; } catch(ra){}
							for (var attrName in attrObj) {
								if (attrObj.hasOwnProperty(attrName)) {
									$(tr).attr(attrName,attrObj[attrName]);
								}
							}
						}
					}
				},
				"fnServerData" : function(sSource, aoData, fnCallback, settings){
					if(data){
						var recodeCount = data.getTotal(),dataOffset = data.getOffset();
						{
							//没有内部分页使用外部分页，同步data的limit
							if(!settings.bPaginate) settings._iDisplayLength = data.limit;
							//aaSorting排序
							var _orderChanged = processOrder(data, settings);
							//oPreviousSearch.sSearch,bCaseInsensitive,bSmart过滤查询
							if(_orderChanged || (data.isLoaded() && dataOffset)){//判断数据没有刷新过，只是新增
								if(_orderChanged || data.limit!==settings._iDisplayLength){//分页显示不同重新刷新
									self._disON = true;
									try{
										data.refreshData({limit:settings._iDisplayLength});
									}finally{
										self._disON = false;
									}
									settings._iDisplayStart = 0;
								}
								if(data.limit>0 && settings.bPaginate){
									var dataPageIndex = Math.floor(dataOffset/data.limit);
									var tablePageIndex = Math.floor(settings._iDisplayStart/settings._iDisplayLength)+1;
									if(dataPageIndex!==tablePageIndex){
										self._disON = true;
										try{
											data.loadPageData(tablePageIndex);
										}finally{
											self._disON = false;
										}
									}
								}
							}else if(!settings.bPaginate) data.limit = settings._iDisplayLength;
						}
						fnCallback({data:data.datas.get().slice(0),recordsTotal:recodeCount,recordsFiltered:recodeCount});
					}else fnCallback({data:[],recordsTotal:0,recordsFiltered:0});
					if(data){
						self.setSelection(data.getCurrentRow(true));
					}
					self.fireEvent('onLoaded', {source:self});
				 }
			},this._cfg||this.$domNode.data('config'));
			//处理展示模板
			processDom(cfg,this);
			//处理自适应宽度
			if(cfg.flexibleWidth){
				this.$domNode.attr('width','100%').css('width','100%');
			}
			//处理自定义长度菜单
			if('string'===typeof(cfg.lengthMenu)){
				var lengthMenu = cfg.lengthMenu, s, sl, len1, len2,
				lengthMenuDefs1 = [], lengthMenuDefs2 = [];
				lengthMenu = lengthMenu.split(',');
				for(var i=0;i<lengthMenu.length;i++){
					s = lengthMenu[i];
					sl = s.split(':');
					if(sl.length=1){
						len1 = parseInt(s,10);
						lengthMenuDefs1.push(len1);
						lengthMenuDefs2.push(len1);
					}else if(sl.length>1){
						len1 = parseInt(sl[0],10);
						len2 = parseInt(sl[1],10);
						lengthMenuDefs1.push(len1);
						lengthMenuDefs2.push(len2);
					}
				}
				if(lengthMenuDefs1.length>0)
					cfg.lengthMenu = [lengthMenuDefs1,lengthMenuDefs2];
			}
			this._processColCfg(cfg);
			if(cfg.data) delete cfg.data;
			return cfg;
		},
		_processFooter: function(){
			if(this.useFooter){
				var $table = this.dataTableApi();
				var colDefs = $table.settings()[0].aoColumns;
				var self = this, footerData = {};
				$.each(colDefs,function(i,v){
					if(v.footerData){
						if(!v._footerDataExpr) v._footerDataExpr = new justep.Express(v.footerData);
						var ctx = justep.Bind.contextFor(self.domNode);
						ctx.$data = self.getData();
						footerData[v.sName] = justep.Express.eval(v._footerDataExpr, ctx.$object, ctx);
						delete ctx.$data;
					}
				});
				if(!$.isEmptyObject(footerData)) this.setFooterData(footerData);
			}
		},
		_processColCfg : function(cfg){
			var indexs = [], self = this,
				multiSelect = this.multiSelect,
				showRowNumber = this.showRowNumber,
				data = this.getData(), 
				defCols = data?data.defCols:null;
			if(multiSelect){
				cfg.columns.splice(0,0,{
	                "title": '<input type="checkbox">',
					"class":          'dataTables-cb',
	                "orderable":      false,
	                "data":           null,
	                "width":	38,
	                "defaultContent": '<input type="checkbox">'
	            });
			}
			if(showRowNumber){
				cfg.columns.splice(0,0,{
	                "title": '',
					"class":          'dataTables-num',
	                "orderable":      false,
	                "data":           null,
	                "width":	38,
	                "defaultContent": '1'
	            });
			}
			$.each(cfg.columns,function(i,v){
				if((0===i && (multiSelect || showRowNumber)) || (1===i && multiSelect && showRowNumber)) return;
				indexs.push(i);
				var dcol = defCols?defCols[v.sName]:null;
				if(undefined===v.title){
					if(dcol && dcol.label)
						v.title = dcol.label;
					else v.title = v.sName;
				}
				if(dcol && dcol.type)
					v.dataType = dcol.type;
			});
			if(!$.isArray(cfg["columnDefs"])) cfg["columnDefs"] = [];
			cfg["columnDefs"].push({
				aTargets:indexs,
				mDataProp:colVal,
				render: function(val, type, row, meta) {
					var colDef = meta.settings.aoColumns[meta.col];
					//row, colVal, html, colName
					var evtData = {
							source:self,
							colVal: val,
							html:val,
							row: row,
							rowID: row?row.getID():null,
							colName: colDef.sName
							};
					self.fireEvent('onCellRender', evtData);
	                return evtData.html;
	            }});
			if(showRowNumber){
				cfg["columnDefs"].push({
					aTargets:0,
					render: function(val, type, row, meta) {
						//row, colVal, html, colName
						var data = row?row.data:null,v = '';
						if(data){
							var offset = data.limit!==-1?data.getOffset()-data.limit:0;
							v = data.getRowIndex(row)+1+offset;
						}
						var evtData = {
								source:self,
								colVal: v,
								html:v,
								row: row,
								rowID: row?row.getID():null,
								colName: '$rowNumber'
								};
						self.fireEvent('onCellRender', evtData);
		                return evtData.html;
		            }});
			}
		},
		_bindEvent : function(on){
			on = on!==false;
			var data = this.getData();
			var api = this.dataTableApi();
			var settings = api.settings()[0];
			var self = this;
			var fn = on?'on':'off';
			this.$domNode[fn]('click', 'tbody>tr', function(evt){
				var row = api.row(this).data();
				self.setSelection(row);
				var evtData = {
						source : self,
						domEvent: evt,
						row: row,
						rowID: row?row.getID():null
					};					
				self.fireEvent('onRowClick', evtData);
		    });
			this.$domNode[fn]('dblclick', 'tbody>tr', function(evt){
				var evtData = {
						source : self,
						domEvent: evt,
						row: api.row(this).data()
					};					
				evtData.rowID = evtData.row?evtData.row.getID():null;
				self.fireEvent('onRowDblClick', evtData);
			});
			//多选支持
			if(this.multiSelect){
				this.$domNode.closest('.dataTables_wrapper').find('thead:first')[fn]('click', 'th.dataTables-cb input', function(evt){
					self.setAllRowChecked(this.checked);
					if(self.hasListener('onRowCheckedAll')){
						self.fireEvent('onRowCheckedAll', {source:self,checked:this.checked});
					}
				});
				this.$domNode.find('tbody')[fn]('click', 'td.dataTables-cb input', function(evt){
					var input = evt.target;
					var tr = $(input).closest("tr");
					var evtData;
					if(self.hasListener('onRowCheck')){
						//多选勾选前事件，可以使用cancel取消
						evtData = {
								source:self,
								row: api.row(tr).data(),
								checked:input.checked,
								cancel:false
						};
						evtData.rowID = evtData.row.getID();
						self.fireEvent('onRowCheck', evtData);
						if(evtData.cancel){
							input.checked = !input.checked;
							return;
						}
					}
					if(self.hasListener('onRowChecked')){
						//多选勾选事件
						evtData = {source:self,row:api.row(tr).data(),checked:input.checked};
						evtData.rowID = evtData.row.getID();
						self.fireEvent('onRowChecked', evtData);
					}
				});
			}
			if(data){
				this._eventHandles['__data_index_changed__'] = function(event){
					if(self._lastsel!==event.row) self.setSelection(event.row);
				}; 
				data[fn](Data.EVENT_INDEX_CHANGED,this._eventHandles['__data_index_changed__']);
				this._eventHandles['__data_value_changed__'] = function(event){
					var cell = self.getCell(event.row, event.col);
					if(cell) cell.invalidate();
					self._processFooter();
				}; 
				data[fn](Data.EVENT_VALUE_CHANGED, this._eventHandles['__data_value_changed__']);
				this._eventHandles['__data_change__'] = function(event){
					var i,rows;
					if(!self._disON && event.selfChanged
							&& (event.type === 'clear'
								|| event.type === 'refresh'
									|| event.type === 'exchangeRow'
									|| event.type === 'delete'
										|| event.type === 'new'
											|| event.type === 'slaveDataChanged')){
						if(event.type === 'refresh' || event.type === 'exchangeRow'){
							if(data.limit>-1){
								var dataOffset = data.getOffset(),iStart = dataOffset-data.limit;
								settings.iInitDisplayStart = iStart>=0?iStart:0;
							}
							self.reload();
						}else if(event.type === 'slaveDataChanged'){
							if(self._eventHandles['__roload__']) window.clearTimeout(self._eventHandles['__roload__']);
							self._eventHandles['__roload__'] = window.setTimeout(function(){self.reload();self._eventHandles['__roload__']=null;},10);
						}else if(event.type === 'clear') self.clear();
						else if(event.type === 'delete'){
							rows = event.deleteRows;
							for(i=0;i<rows.length;i++){
								self.removeRow(rows[i]);
							}
						}else if(event.type === 'new'){
							rows = event.rows;
							for(i=0;i<rows.length;i++){
								self.addRow(rows[i]);
							}
						}
						self._processFooter();
					}
				};
				data[fn](Data.EVENT_DATA_CHANGE,this._eventHandles['__data_change__']);
			}
		},
		getSelection: function(){
			return this._lastsel;
		},
		setSelection : function(row){
			var tr = this.getRow(row);
			var api = this.dataTableApi();
			var data = this.getData();
			if(tr){
				var $tr = $(tr.node());
				this._lastsel = tr.data();
				if(data) data.to(this._lastsel);
				if(this.rowActiveClass){
					if(!$tr.hasClass(this.rowActiveClass)){
						api.$('tr.'+this.rowActiveClass).removeClass(this.rowActiveClass);
						$tr.addClass(this.rowActiveClass);
						var evtData = {
								source : this,
								row: this._lastsel,
								rowID: this._lastsel?this._lastsel.getID():null
							};					
						this.fireEvent('onRowSelect', evtData);
					}
				}
			}
		},
		getCheckeds: function(){
			var ret = null;
			if(this.multiSelect){
				ret = [];
				var $table = this.dataTableApi();
				this.$domNode.find('tbody tr').each(function(){
					var row = $table.row(this).data();
					if($(this).find('td.dataTables-cb input').prop('checked'))
						ret.push(row);
				});
			}
			return ret;
		},
		isChecked: function(row){
			var tr = this.getRow(row);
			return tr?$(tr.node()).find('td.dataTables-cb input').prop('checked'):false;
		},
		setRowChecked: function(row,checked){
			var tr = this.getRow(row);
			if(tr) $(tr.node()).find('td.dataTables-cb input').prop('checked',checked);
		},
		setAllRowChecked: function(checked){
			this.$domNode.find('tbody td.dataTables-cb input').prop('checked',checked);
		},
		getData : function(){
			if(this.data)
				return this.getModel().comp(this.data);
		},
		addRow: function(row){
			var $table = this.dataTableApi();
			$table.row.add(row).draw();
		},
		removeRow: function(row){
			var r = this.getRow(row);
			if(r) r.remove().draw();
		},
		reload: function(){
			var chs = this.getCheckeds();
			var $table = this.dataTableApi();
			$table.ajax.reload();
			$table.columns.adjust();
			if($.isArray(chs)){
				var me = this;
				$.each(chs,function(i,v){
					me.setRowChecked(v, true);
				});
			}
		},
		refresh: function(){
			this.reload();
		},
		clear: function(){
			var $table = this.dataTableApi();
			$table.clear().draw();
		},
		getRow : function(row){
			var $table = this.dataTableApi();
			var ri = $table.data().indexOf(row);
			return (ri>-1)?$table.row(ri):null;
		},
		getCell : function(row,col){
			var $table = this.dataTableApi();
			var ri = $table.data().indexOf(row),ci=-1;
			var colDefs = $table.settings()[0].aoColumns;
			$.each(colDefs, function(i,colDef){
				if(colDef.sName===col){
					ci = i;
					return false;
				}
			});
			return (ri>-1 && ci>-1)?$table.cell(ri, ci):null;
		},
		dataTableApi: function(){
			return this.$domNode.DataTable();
		},
		getColumn: function(col){
			var $api = this.dataTableApi(),ci=-1;
			var colDefs = $api.settings()[0].aoColumns;
			$.each(colDefs, function(i,colDef){
				if(colDef.sName===col){
					ci = i;
					return false;
				}
			});
			return (ci>-1)?$api.column(ci):null;
		},
		hideCol: function(col){
			var column = this.getColumn(col);
			if(column)
				column.visible(true);
		},
		showCol: function(col){
			var column = this.getColumn(col);
			if(column)
				column.visible(false);
		},
		setRowCss: function(row,css){
			var tr = this.getRow(row);
			if(tr) $(tr).css(css);
		},
		setFooterData: function(fData){
			var self = this;
			$.each(fData,function(n,v){
				var col = self.getColumn(n);
				if(col) $(col.footer()).html(v);
			});
		},
		// 更新
		update : function(value, bindingContext) {
			//目前没有
		}
	});

	justep.Component.register(url, DataTables);
	return DataTables;
});