/*! 
* BeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
/**
 *  properties type: string, number, boolean, array, object
 *  binds: key是DOM上的属性名称, value是收集到component中的名称
 */
define(function(require){
	return {
		properties: {
			limit : "number",
			filter : "string",
			data : "string",
			labelColumn : "string",
			rootLabel : "string",
			autoLoad : "boolean",
			disablePullToRefresh : "boolean",
			disableInfiniteLoad : "boolean"
		},
		events:["onAfterRender","onBeforeLoadChildren","onCustomLoadChildren"],
		binds:{}
	};
});