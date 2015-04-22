/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require('css!./css/excelLayout').load();
	var CellLayout = function(config) {
		this.domNode = config.templateNode;
	};
	
	CellLayout.prototype = {
		init : function(){ 
			$(this.domNode).attr("d_canAddChild","false");
			$(">table>tbody>tr",this.domNode).each(function(){
				var cells = this.cells;
				for(var i = 0;i<cells.length;i+=1){
					$(">*",cells[i]).attr("d_resizable","false").attr("d_canMove","false");//.attr("d_canRemove","false");
				}
			});
		}
	};

 
	return {
		'$UI/system/components/justep/excelLayout/excelLayout' : CellLayout
	};
});