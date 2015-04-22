define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Data = require("$UI/system/components/justep/data/data");

	var Model = function() {
		this.cascade = false;
		this.showFilterGird = justep.Bind.observable(false);

		this.callParent();
	};

	Model.prototype.isCascade = function() {
		return this.comp('cbCascade').val();
	};

	Model.prototype.add = function(row) {
		if (row instanceof Data.Row) {
			var data = this.comp('selectData');
			if (data.isExist(row.getID()))
				return;
			var defaultValue = {};
			$.each(data.defCols, function(col, v) {
				defaultValue[col] = row.val(col);
			});
			data.newData({
				defaultValues : [ defaultValue ]
			});
		}
	};

	Model.prototype.cascadeAddChildren = function(row) {
		var ret = row;
		if (row instanceof Data.Row) {
			if (this.isCascade()) {
				var treeData = this.getTreeData();
				treeData.each(function(p) {
					this.add(p.row);
					ret = p.row;
				}, this, row);
			}
		}
		return ret;
	};

	Model.prototype.remove = function(row) {
		var data = this.comp('selectData');
		data.deleteData(row);
	};

	Model.prototype.clear = function() {
		var data = this.comp('selectData');
		data.clear();
	};

	Model.prototype.addAll = function(treeData) {
		treeData.each(function(p) {
			this.add(p.row);
		}, this);
	};

	Model.prototype.selectGridRowDblClick = function(event) {
		this.remove(event.row);
	};

	Model.prototype.treeGridRowDblClick = function(event) {
		this.add(event.row);
		this.cascadeAddChildren(event.row);
	};

	Model.prototype.addAllBtnClick = function(event) {
		var isSearch = this.showFilterGird.get();
		this.addAll(!isSearch ? this.comp('dialogData') : this.comp('searchData'));
	};

	Model.prototype.removeAllBtnClick = function(event) {
		this.clear();
	};

	Model.prototype.addBtnClick = function(event) {
		var isSearch = this.showFilterGird.get(), row;
		if (!isSearch) {
			var treeGrid = this.comp('treeGrid');
			var rowid = treeGrid.getSelection();
			var treeData = this.comp('dialogData');
			row = treeData.getRowByID(rowid);
		} else {
			var searchGrid = this.comp('searchGrid');
			row = searchGrid.getSelection();
		}
		this.add(row);
		row = this.cascadeAddChildren(row);
		if(row instanceof Data.Row){
			row.data.to(row);
			row.data.next();
		}
	};

	Model.prototype.removeBtnClick = function(event) {
		var grid = this.comp('selectGrid');
		var rowid = grid.getSelection();
		var data = this.comp('selectData');
		data.deleteData(data.getRowByID(rowid));
	};

	Model.prototype.getSelected = function() {
		var ret = [];
		var data = this.comp('selectData');
		data.each(function(p) {
			ret.push(p.row);
		});
		return ret;
	};

	Model.prototype.OKBtnClick = function(event) {
		this.comp('windowReceiver').windowEnsure(this.getSelected());
	};

	Model.prototype.getTreeData = function() {
		return this.comp('dialogData');
	};

	Model.prototype.setSelected = function(selected) {
		this.clear();
		if ($.isArray(selected) && selected.length > 0) {
			for ( var i = 0; i < selected.length; i++) {
				this.add(selected[i]);
			}
		}
	};

	Model.prototype.windowReceiverReceive = function(event) {
		if (event.data) {
			if (event.data.selected) {
				this.setSelected(event.data.selected);
			}
		}
	};

	Model.prototype.smartFilterFilter = function(event){
		var filter = event.source;
		var v = filter.getFilterStr();
		if(v){
			this.showFilterGird.set(true);
			$(this.getElementsByXid('searchDiv')).css({height:'100%',position: 'relative'});
			var searchData = this.comp('searchData');
			searchData.setFilter(filter.getFilterFlag(), filter.getFilterStr());
			searchData.refreshData();
		}else{
			this.showFilterGird.set(false);
			$(this.getElementsByXid('searchDiv')).css({height:0,position: 'absolute'});
			this.comp('treeGrid').autoSize();
		}
		this.setSelected(null);
	};

	return Model;
});
