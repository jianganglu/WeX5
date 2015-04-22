define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Data = require("$UI/system/components/justep/data/data");

	var Model = function(){
		this.showFilterGird = justep.Bind.observable(false);
		this.initOK = justep.Bind.observable(false);
		this.result = justep.Bind.observable();
		
		this.canOK = justep.Bind.computed(function(){
			if(!this.initOK.get()) return false;
			if(this.getSelected()) return true;
			else return false;
		},this);
		
		this.callParent();
	};

	Model.prototype.getSelected = function(){
		return this.result.get();
	};
	
	Model.prototype.OKBtnClick = function(event){
		this.comp('windowReceiver').windowEnsure(this.getSelected());
	};

	Model.prototype.getTreeData = function(){
		return this.comp('dialogData');
	};
	
	Model.prototype.setSelected = function(selected) {
		return this.result.set(selected);
	};
	
	Model.prototype.windowReceiverReceive = function(event){
		if(event.data){
			if(event.data.selected){
				this.setSelected(event.data.selected);
			}
		}
		this.initOK.set(true);
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
	
	Model.prototype.treeGridRowClick = function(event){
		this.setSelected(this.getTreeData().getRowByID(event.rowID));
	};
	
	Model.prototype.searchGridRowSelect = function(event){
		this.setSelected(event.row);
	};
	
	return Model;
});
