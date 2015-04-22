/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var Model = function(){
		this.callParent();
	};
	Model.prototype.modelLoad = function(event){

	};

	Model.prototype.button1Click = function(event){
		this.comp("excellayout1").showLine();
	};

	Model.prototype.button2Click = function(event){
		this.comp("excellayout1").hideLine();
	};

	return Model;
});
