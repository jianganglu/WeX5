/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $=require('jquery'),
		Observable = require("$UI/system/lib/base/observable"),
		Object = require("$UI/system/lib/base/object"),
		LinkedHashMap = require("$UI/system/lib/route/linkedHashMap"),
		HashbangParser = require('./hashbangParser'),
		RouteUtil = require('./routeUtil'),
		router = require('./router');
		
	
	var HashbangToken = "#!",
		StateSeriesSplitToken = "!",
		LeftBarcketToken = "(",
		RightBarcketToken = ")",
		SegmentSplitToken = "/";
	
	function _toHashbang(routeStates){
		var hashbang = HashbangToken;
		routeStates.each(function(xid, states, i){
			if(i != 0){
				hashbang += SegmentSplitToken + StateSeriesSplitToken + SegmentSplitToken;
			}
			states.each(function(name,param,j){
				if(j != 0){
					hashbang += SegmentSplitToken + StateSeriesSplitToken + SegmentSplitToken;
				}
				if(name == '' && param == ''){
					hashbang += escapeParam(xid);
					return;
				}
				hashbang += escapeParam(xid) + SegmentSplitToken;
				hashbang += escapeParam(name) + SegmentSplitToken;
				hashbang += escapeParam(param);
			});
		});
		return hashbang;
	};
	
	function escapeParam(param){
		if(typeof param == 'string' && (param.indexOf(SegmentSplitToken) != -1 || param.indexOf(HashbangToken) != -1 || param.indexOf(StateSeriesSplitToken) != -1 || param.indexOf(LeftBarcketToken) != -1 || param.indexOf(RightBarcketToken) != -1)){
			param = LeftBarcketToken + param + RightBarcketToken;
		}
		return param;
	};
	
	var RouteState = Object.extend({
		mixins:Observable,
		constructor: function(model){
			this.callParent();
			Observable.prototype.constructor.call(this);
			this.ownerModel = model;
			router.setRootModel(model);
			this.stateSeries = new LinkedHashMap();
			this.bindEvent();
			
		},
		getModel : function(){
			return this.ownerModel;
		},
		bindEvent : function(){
			this.ownerModel.on('onMessage',function(event){
				var message = event.message;
				if(message.type && message.type == "routeState"){
					this.dispatchChange(message);
				}
			},this);
		},
		toHashbang : function(){
			return _toHashbang(this.stateSeries);
		},
		/**
		 * 格式
		 *   xid/page/1/#/xid2/page2/2
		 * 
		 */
		dispatchChange : function(message){
			/**
			 * type 
			 *   enter 进入这个状态
			 *   leave 离开这个状态
			 *   update 状态变化
			 */
			var event = {
					data:message,
					cancel:false
			};
			this.fireEvent('onDispathChange',event);
			if(event.cancel){
				return;
			}
			var changeType = "";
			var newStateSeries = new HashbangParser(message.newUrl).parse();
			var oldStateSeries =  this.stateSeries;
			
			
			/**
			 TODO:此处是否需要记录this.stateSeries 严格来说可以根据oldUrl来推断出来oldState，
				但是考虑到可能出现中间插入不收控制的hash值 所以此处暂时采用oldStates来做判断
			var oldStateHashbang = _toHashbang(this.stateSeries);
			var oldUrl = message.oldUrl;
			var hashbangIndex = oldUrl.indexOf(HashbangToken);
			
			if(hashbangIndex == -1){
				oldUrl = HashbangToken;
			}else{
				oldUrl = oldUrl.substring(hashbangIndex);
			}
			var oldUrlHashbang = _toHashbang(new HashbangParser(oldUrl).parse());
			if(oldStateHashbang != oldUrlHashbang){
				console.log('old state not match [oldUrlHashbang]:' + oldUrlHashbang + '[oldStateHashbang]:' + oldStateHashbang);
			}
			*/
			this.stateSeries = newStateSeries;
			/**
			 * 通过新状态序列能比较出来 enter 和 update
			 */
			newStateSeries.each(function(xid, states, i){
				
				var routeState = "";
				if(oldStateSeries.has(xid)){
					/**
					 * 原来有xid 对应的任何状态，
					 * 需要根据详细状态来判断
					 */
					var newStates = newStateSeries.get(xid);
					var oldStates = oldStateSeries.get(xid);
					newStates.each(function(name,param,i){
						if(oldStates.has(name)){
							routeState = "update";
						}else{
							routeState = "enter";
						}
						this.doRoute(xid,name,param,routeState);
					},this);
				}else{
					/**
					 * 原来没有xid 对应的任何状态，
					 * 这次变化对当前xid来说所有状态都是进入
					 */
					routeState = "enter";
					var newStates = newStateSeries.get(xid);
					newStates.each(function(name,param,i){
						this.doRoute(xid,name,param,routeState);
					},this)
				}
			},this);
			/**
			 * 通过老状态序列能比较出来leave
			 */
			oldStateSeries.each(function(xid, states, i){
				var routeState = "";
				var oldStates = oldStateSeries.get(xid);
				if(typeof oldStates == 'undefined'){
					return;
				}
				if(newStateSeries.has(xid)){
					var newStates = newStateSeries.get(xid);
					oldStates.each(function(name,param,i){
						if(!newStates.has(name)){
							routeState = "leave";
							this.doRoute(xid,name,param,routeState);
						}
					},this)
				}else{
					oldStates.each(function(name,param,i){
						routeState = "leave";
						this.doRoute(xid,name,param,routeState);
					},this)
				}
			},this);
		},
		doRoute: function(xid,name,param,routeState){
			
			var dtd = $.Deferred();
			var event = {
					source:this,
					cancel:false,
					xid:xid,
					name:name,
					param:param,
					routeState:routeState,
					async:false,
					dtd:dtd
				};
			this.fireEvent('onRoute',event);
			if(event.cancel){
				return;
			}
			var self = this;
			dtd.promise().done(function(){
				try{
					var comp = self.ownerModel.comp(xid);
					if(comp && comp.doRoute){
						comp.doRoute(name,param,routeState);
					}
				}catch(e){
					console.log("根据xid%s路由失败，原因%s",xid,e.stack);
				}
			});
			
			if(event.async == false){
				dtd.resolve();
			}
		},
		
		removeState : function(xid,name){
			var states = this.stateSeries.get(xid);
			if(states){
				states.remove(name);
				if(states.size() == 0){
					this.stateSeries.remove(xid)
				}
			}
		},
		addState : function(xid,name,param){
			
			if(param == 'undefined' || typeof param == 'undefined'){
				param = '';
			}
			var states = this.stateSeries.get(xid);
			if(!states){
				states = new LinkedHashMap();
				this.stateSeries.add(xid,states);
			}
			states.add(name,param);
		},
		
		addInnerState : function(xid,name,hashbang){
			
			var states = this.stateSeries.get(xid);
			if(!states){
				states = new LinkedHashMap();
				this.stateSeries.add(xid,states);
			}
			
			if(states.has(name)){
				var param = states.get(name);
				param = RouteUtil.getParamValue(param);
				if(hashbang != HashbangToken){
					param = param + hashbang;
				}
				states.add(name,param);
			}else{
				states.add(name,hashbang);
			}
		},
		
		publishState : function(isReplace){
			
			this.fireEvent('onRouteStatePublish',{
				hashbang: this.toHashbang(),
				isReplace:isReplace
			});
		}
	});
    return RouteState;
});