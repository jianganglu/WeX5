/*! 
* BeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) { 
	require("$UI/system/components/justep/common/res");
	var Component = require("$UI/system/lib/base/component");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var url = require.normalizeName("./badge");
	Component.register(url, ViewComponent);
	return ViewComponent;
});