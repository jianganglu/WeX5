/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var HashbangToken = "#!",
		StateSeriesSplitToken = "!",
		LeftBarcketToken = "(",
		RightBarcketToken = ")",
		SegmentSplitToken = "/";
	
	return {
		containeInnerState:function(param){
			if(typeof param == 'string'){
				var hashbangTokenIndex = param.indexOf(HashbangToken);
				if(hashbangTokenIndex == -1){
					return false;
				}else{
					var leftBarcketTokenIndex = param.indexOf(LeftBarcketToken);
					if(leftBarcketTokenIndex == -1){
						return true; 
					}else if(hashbangTokenIndex < leftBarcketTokenIndex){
						return true;
					}
				}
			}
			return false;
		},
		getParamValue : function(param){
			var hashbangTokenIndex = param.indexOf(HashbangToken);
			if(hashbangTokenIndex == -1){
				return param;
			}
			return param.substring(0,hashbangTokenIndex);
		},
		getInnerStateValue : function(param){
			var hashbangTokenIndex = param.indexOf(HashbangToken);
			if(hashbangTokenIndex == -1){
				return '';
			}
			return param.substring(hashbangTokenIndex);
		},
		getSegmentSplitToken : function(){
			return SegmentSplitToken;
		}
	}
});