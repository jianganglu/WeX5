/*! 
 * WeX5 v3 (htttp://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var $ = require("jquery");
	var Util = require("$UI/system/components/justep/common/designer/common");
	var Barcode = require("../barcodeImage");
	require('css!./css/base').load();
	var _Barcode = Barcode.extend({
		init : function(value, bindingContext) {
			debugger;
			var $domNode = $(this.domNode);
			$domNode.append("<img class='xui-barcodeImage'/>");
			var cfg = Util.attr2js(this.$domNode, [ 'type' ]);
			//this.value = $domNode.attr('bind-ref');
			var type = this.$domNode.attr("type") ? this.$domNode.attr("type") : "{}";
			
			this.value = this.getCodeByType(type);
			this.callParent(value, bindingContext);
			if (cfg)
				this.set(cfg);
		},
		getCodeByType : function(type){debugger
			if(type == 'code93' || type == 'code39' || type == 'code128' || type == 'pdf417' || type == 'datamatrix' || type == 'datamatrix'){
				return 'abcde';
			}else if(type == 'codabar' || type == 'intl2of5' || type == 'postnet'){
				return 18;
			}else if(type == 'itf14'){
				return 1234567890123;
			}else if(type == 'upc-a'){
				return 12345678901;
			}else if(type == 'upc-e' || type == 'ean-8' || type == 'royal-mail-cbc'){
				return 1234567;
			}else if(type == 'ean-13' || type == 'ean-128'){
				return 123456789012;
			}else if(type == 'usps4cb'){
				return 12345678901234567890;
			}else if(type == 'qr'){
				return '中华人民共和国';
			}
			
		}
	});
	return {
		'$UI/system/components/justep/barcode/barcodeImage' : _Barcode
	};
});