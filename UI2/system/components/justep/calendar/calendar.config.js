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
			view: "string",
			views: "string",
			day: "string",
			firstDay: 'string',
			timeStart: 'string',
			timeEnd: 'string',
			timeSplit: 'string',
			lunarDay: 'boolean'
		},
		events:["onAfterEventsLoad", "onAfterViewLoad", "onEventsSelected"]
	};
});