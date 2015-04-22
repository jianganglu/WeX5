/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var Router = require("../router");	
	require('css!./css/router').load();
	
	var RouterDesign = Router.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode.find('div').attr('d_selectable',"false");
			var xid = this.$domNode.attr("xid");
			this.$domNode.addClass('xui-router').text(xid?xid:'&nbsp;'); 
			this.domNode.style.position = "absolute";
			if(!this.domNode.style.top){
				this.domNode.style.top = "10px";
				this.domNode.style.left = "10px";
			}
			this.domNode.style.height = "auto";
			this.$domNode.show();
		}
	});
	
	return {
		'$UI/system/components/justep/router/router':RouterDesign
	};
});