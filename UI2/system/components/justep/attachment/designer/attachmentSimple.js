/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery"),
		AttachmentSimple = require("../attachmentSimple"),
		Component = require("$UI/system/lib/base/component"),
		justep = require('$UI/system/lib/justep'),
		bind = require("bind"),
		xuiService = require("$UI/system/components/designerCommon/js/xuiService"),
		xuiDoc = xuiService.getXuiDoc();
	
	var AttachmentSimpleDesign = AttachmentSimple.extend({
		init:function(value, bindingContext){
			this.$domNode.find('div').attr('d_selectable',"false");
		}
	});
	
	return {
		'$UI/system/components/justep/attachment/attachmentSimple':AttachmentSimpleDesign
	};
});