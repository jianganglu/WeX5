define(function(require) { 
	require('css!../css/form').load();
	 require("$UI/system/components/justep/common/res");
	 var Component = require("$UI/system/lib/base/component");
	 var ViewComponent = require("$UI/system/lib/base/viewComponent");
	 var url = require.normalizeName("./formRow5Btn2");
	 Component.register(url, ViewComponent);
	 return {"$UI/system/components/fragment/form/formRow5Btn2":ViewComponent};
	});