/*! 
* BeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	require('css!./css/calendar').load();
	require("./js/calendar");
	require("./js/language/zh-CN");
	require("./js/jstz.min");
	require("./js/underscore-min");
	
	require('$UI/system/components/bootstrap/lib/js/bootstrap');
	require.res("./tmpls");
	
	var Component = require("$UI/system/lib/base/component"), 
		ViewComponent = require("$UI/system/lib/base/viewComponent"), 
		url = require.normalizeName("./calendar"),
		ComponentConfig = require("./calendar.config"),
		lunarFn = require("./lunar"),
		DateUtil = require("$UI/system/lib/base/date"); 

	var Calendar = ViewComponent.extend({

		getConfig : function() {
			return ComponentConfig;
		},
		
		// 构造函数
		constructor : function(options) {
			this.view = 'month';
			this.views = 'year,month,week,day';
			this.day = 'now';
			this.firstDay = 1;
			this.timeStart = '06:00';
			this.timeEnd = '22:00';
			this.timeSplit = '30';
			this.lunarDay = false;
			//this.holiday = false;
			this.callParent(options);
			
		},

		buildTemplate : function(config) {
			if (config) {
			}
		},
		
		getHoliday: function(day){
			if(!this.holiday) return false;
			
			if(day == 'now')
				day = new Date();
			
			if(!(day instanceof Date)){
				day = new Date(day);
			}
			
			var y = day.getFullYear(),
				m = day.getMonth() + 1;

			var result = {}, holidays;
			$.ajax({
				async: false,
				dataType: 'json',
				type: 'GET',
				url: require.toUrl("$UI/system/components/justep/calendar/server/holidays.j?year=" + y + "&month=" + m),
				success: function(result) {
					holidays = result;
				},
				error : function(xhr, status, err) {
					//忽略
				}
			});
			
			for(var i in holidays){
				var h = holidays[i],
					d = new Date(h.festival),
					key = DateUtil.toString(d, 'dd-MM-yyyy');
				result[key] = h.name;
			}
			return result;
		},

		// 初始化
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);

			var self = this;
			
			var fnName = $(self.domNode).attr('onEventsLoad');
			if(fnName)
				self.onEventsLoad = self.getModel()[fnName];
			
			var options = {
				require: require,
				//events_source: './data.json',
				view: this.view,
				tmpl_path: function(tmplFile) {
					return require.toUrl("./tmpls/" + tmplFile + '.html');
					//webSocket port:55271 UIServer port:42316
					//return "http://localhost:8080/x5/$v3183_no_/UI2/system/components/justep/calendar/tmpls/" + tmplFile + '.html'; 
				}, 
				tmpl_cache: false,
				day: this.day,
				language: "zh-CN",
				first_day: this.firstDay,
				time_start: this.timeStart,
				time_end: this.timeEnd,
				time_split: this.timeSplit,
				lunar_day: this.lunarDay? lunarFn : null,
				//holidays: getHoliday.bind(this),
				onAfterEventsLoad: function(events) {
					self.fireEvent('onAfterEventsLoad', {source : self, events : events});
				},
				onAfterViewLoad: function(view) {
					self.fireEvent('onAfterViewLoad', {source : self, view : view});
				},
				onEventsLoad: function(begin, end, timezone){
					var events = [];
					if(self.onEventsLoad)
						events = self.onEventsLoad.call(self.getModel(), {source: self, begin: begin, end: end, timezone: timezone});
					return events; 
				},
				onEventsSelected: function(begin, end, timezone){
					var event = {source: self, begin: begin, end: end, timezone: timezone};
					return self.fireEvent('onEventsSelected', event);
				},
				classes: {
					months: {
						general: 'label'
					}
				}
			};
			
			//var name = "./tmpls/month.html";
			//var html1 = require('text!./tmpls/month.html');
			//var html = require('text!' + name);
			
			this._calendar = this.$domNode.calendar(options);
			this.setViews(this.views);
		},

		// 更新
		update : function(value, bindingContext) {

		},
		
		/**
		 * setView
		 */

		setView : function(type) {
			this.view = type;
			if(this._calendar)
				this._calendar.view(type);
		},
		
		refresh: function(){
			if(this._calendar)
				this._calendar.view(this.view);
		},
		
		setViews : function(value) {
			this.views = value;
			if(this._calendar){
				var views = ['year', 'month', 'week', 'day'];
				value = value.split(',');
				for(var i in views){
					var view = views[i];
					this._calendar.options.views[view].enable = 0;
					if(value.indexOf(view) != -1)
						this._calendar.options.views[view].enable = 1;
				}
			}
		},
		
		/**
		 * 
		 */
		navigate : function(nav) {
			this._calendar.navigate(nav);
		},
		
		/**
		 * 
		 */
		setDay: function(value){
			this.day = value;
			if(this._calendar){
				this._calendar.options.day = value;
				this._calendar.view();
			}
		},
		setFirstDay: function(value){
			this.firstDay = value;
			if(this._calendar){
				this._calendar.options['first_day'] = value;
				this._calendar.view();
			}
		},
		setTimeStart: function(value){
			this.timeStart = value;
			if(this._calendar){
				this._calendar.options['time_start'] = value;
				this._calendar.view();
			}
		},
		setTimeEnd: function(value){
			this.timeEnd = value;
			if(this._calendar){
				this._calendar.options['time_end'] = value;
				this._calendar.view();
			}
		},
		setTimeSplit: function(value){
			this.timeSplit = value;
			if(this._calendar){
				this._calendar.options['time_split'] = value;
				this._calendar.view();
			}
		},
		setLunarDay: function(value){
			this.lunarDay = value;
			if(this._calendar){
				this._calendar.options.lunar_day = value?this.lunarDay:null;
				this._calendar.view();
			}
		},
		/*
		setHoliday: function(value){
			this.holiday = value;
		},
		*/
		propertyChangedHandler: function(key, oldVal, value){
			switch(key){
				case "view":
					this.setView(value);
					break;
				case "views":
					this.setViews(value);
					break;
				case "day":
					this.setDay(value);
					break;
				case "firstDay":
					value = value == 'monday'? 1 : 0;
					this.setFirstDay(value);
					break;
				case "timeStart":
					this.setTimeStart(value);
					break;
				case "timeEnd":
					this.setTimeEnd(value);
					break;
				case "timeSplit":
					this.setTimeSplit(value);
					break;
				case "lunarDay":
					if(value == "true")
						value = true;
					if(value == "false")
						value = false;
					this.setLunarDay(value);
					break;
				/*	
				case "holiday":
					if(value == "true")
						value = true;
					if(value == "false")
						value = false;
					this.setHoliday(value);
					break;
				*/
			}
        }	
	});

	Component.register(url, Calendar);
	return Calendar;
});