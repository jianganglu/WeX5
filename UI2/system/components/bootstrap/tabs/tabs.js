/*! 
* BeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./tabs");
	var $ = require("jquery");
	require('css!./css/tabs').load();
	require("../lib/js/bootstrap");
 
 
	var Tabs = justep.BindComponent.extend({
		init: function(value, bindingContext){
			var self = this;
			self.callParent(value, bindingContext);
			var $domNode = $(this.domNode);
	 
			$domNode.on("click", ">.nav>li", function() {
				var $this = $(this);
		       	var selectEvent = {source: self, tab:$this, cancel: false};
	        	self.fireEvent(Tabs.BEFRESELECT_EVENT, selectEvent);
	        	if(selectEvent.cancel == true){
	        		return;
	        	}
				self.setActiveTab($this);
			});
		},
		
		setActiveTab : function(tab){
			if(typeof tab == 'string'){
				tab = $(">.nav>li[xid='"+tab+"']",this.domNode);
			}
			$(">li", tab.parent()).removeClass("active");
			tab.addClass("active");
			
			var content = $(">a",tab).attr("content"); 
			
			$(">.tab-content>*",this.domNode).each(function(idx){  
				$(this)[this.getAttribute("xid") == content?"addClass":"removeClass"]("active");
			});
			//通知变化，主要刺激grid重画
			this.getModel().fireEvent("onResize",{source:this});
			
			var selectEvent = {source: self, tab:tab};
        	this.fireEvent(Tabs.SELECT_EVENT, selectEvent);
		}
	});
	
	Tabs.BEFRESELECT_EVENT = "onBeforeSelect";
	Tabs.SELECT_EVENT = "onSelect";
	
	justep.Component.register(url, Tabs);
	return Tabs;
});