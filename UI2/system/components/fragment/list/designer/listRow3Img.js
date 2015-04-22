/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) { 
	 require.css('./css/list');
	 require("$UI/system/components/justep/common/res");
	 var Component = require("$UI/system/lib/base/component");
	 var ViewComponent = require("$UI/system/lib/base/viewComponent");
	 var url = require.normalizeName("./listRow3Img");
	 Component.register(url, ViewComponent);
	 return ViewComponent;
	});
