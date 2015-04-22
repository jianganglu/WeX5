/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var LinkedHashMap = function() {
		this.array = [];
		this.map = {};
	};
	
	LinkedHashMap.prototype = {
		constructor : LinkedHashMap,
		has : function(key, value) {
			if( key in this.map) {
				return true;
			}
			return false;
		},
		add : function(key, value) {
			var me = this;
			if(typeof key == 'undefined') {
				return;
			}
			if( key in me.map) {
				me.map[key] = value;
			} else {
				me.array.push(key);
				me.map[key] = value;
			}
		},
		remove : function(key) {
			var me = this;
			if( key in me.map) {
				delete me.map[key];
				for(var i = 0; i < me.array.length; i++) {
					if(me.array[i] == key) {
						me.array.splice(i, 1);
						break;
					}
				}
			}
		},
		size : function() {
			return this.array.length;
		},
		each : function(fn, scope) {
			var me = this;
			var scope = scope || window;
			var fn = fn || null;
			if(fn == null || typeof (fn) != "function") {
				return;
			}
			for(var i = 0; i < me.array.length; i++) {
				var key = me.array[i];
				var value = me.map[key];
				var re = fn.call(scope, key, value, i, me.array, me.map);
				if(re == false) {
					break;
				}
			}
		},
		get : function(key) {
			return this.map[key];
		}
	};
	return LinkedHashMap;
});