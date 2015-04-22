/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
	};

	Model.prototype.backBtnClick = function(){
		justep.Portal.closeWindow();
	};

	Model.prototype.yearBtnClick = function(event){
		this.comp('calendar').setView("year");
	};

	Model.prototype.monthBtnClick = function(event){
		this.comp('calendar').setView("month");
	};

	Model.prototype.weekBtnClick = function(event){
		this.comp('calendar').setView("week");
	};

	Model.prototype.dayBtnClick = function(event){
		this.comp('calendar').setView("day");
	};

	Model.prototype.prevBtnClick = function(event){
		this.comp('calendar').navigate("prev");
	};

	Model.prototype.todayBtnClick = function(event){
		this.comp('calendar').navigate("today");
	};

	Model.prototype.nextBtnClick = function(event){
		this.comp('calendar').navigate("next");
	};

	Model.prototype.calendarAfterEventsLoad = function(event){
	};

	Model.prototype.calendarAfterViewLoad = function(event){
		this.comp('viewTypeButtonGroup').select(event.view + "Btn");
	};

	Model.prototype.calendarEventsLoad = function(event){
		return [
			{
				"id": "293",
				"title": "This is warning class event with very long title to check how it fits to evet in day view",
				"url": "http://www.example.com/",
				"class": "event-warning",
				"start": "1362938400000",
				"end":   "1363197686300"
			},
			{
				"id": "256",
				"title": "Event that ends on timeline",
				"url": "http://www.example.com/",
				"class": "event-warning",
				"start": "1363155300000",
				"end":   "1363227600000"
			},
			{
				"id": "276",
				"title": "Short day event",
				"url": "http://www.example.com/",
				"class": "event-success",
				"start": "1363245600000",
				"end":   "1363252200000"
			},
			{
				"id": "294",
				"title": "This is information class ",
				"url": "http://www.example.com/",
				"class": "event-info",
				"start": "1363111200000",
				"end":   "1363284086400"
			},
			{
				"id": "297",
				"title": "This is success event",
				"url": "http://www.example.com/",
				"class": "event-success",
				"start": "1363234500000",
				"end":   "1363284062400"
			},
			{
				"id": "54",
				"title": "This is simple event",
				"url": "http://www.example.com/",
				"class": "",
				"start": "1363712400000",
				"end":   "1363716086400"
			},
			{
				"id": "532",
				"title": "This is inverse event",
				"url": "http://www.example.com/",
				"class": "event-inverse",
				"start": "1364407200000",
				"end":   "1364493686400"
			},
			{
				"id": "548",
				"title": "This is special event",
				"url": "http://www.example.com/",
				"class": "event-special",
				"start": "1363197600000",
				"end":   "1363629686400"
			},
			{
				"id": "295",
				"title": "Event 3",
				"url": "http://www.example.com/",
				"class": "event-important",
				"start": "1364320800000",
				"end":   "1364407286400"
			}
		];
	};

	Model.prototype.calendarEventsSelected = function(event){
		event;
		debugger;
	};
	
	Model.prototype.showCalendarSource = function(event){
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/calendar/demo/demo.w&xid=calendar"
		});
	};

	Model.prototype.showJsSource = function(event){
		this.comp("windowDialog").open({
			data : "system/components/justep/calendar/demo/demo.js"
		});
	};

	return Model;
});