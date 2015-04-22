/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $=require('jquery'),
		Object = require("$UI/system/lib/base/object"),
		Observable = require("$UI/system/lib/base/observable"),
		URL = require('$UI/system/lib/base/url'),
		_history = window.history,
		HashbangParser = require('./hashbangParser'),
		_lastChangeTimeStamp = new Date().getTime();
		_inited = false;
	
	
	var HashbangToken = "#!",
		StateSeriesSplitToken = "!",
		LeftBarcketToken = "(",
		RightBarcketToken = ")",
		SegmentSplitToken = "/";
	
	function ignoreVLS(url){
		return URL._removeVLS(url);
	};
	
	
	var Router = Object.extend({
		mixin:Observable,
		constructor: function(){
			this.callParent();
			Observable.prototype.constructor.call(this);
			this.interceptLinkHash();
			this.polyfillStateApi();
			var hash = location.hash; 
			if(hash == ""){
				hash = HashbangToken;
			}
			var ignoreVersionUrl = ignoreVLS(location.pathname +location.search) + hash;
			if(hash == HashbangToken){
				_inited = true;
			}else{
				setTimeout(function(){
					_inited = true;
				},800);
			}
			this.publishState({
				isFirstRoutePage:true,
				isReplace:true,
				hashbang:ignoreVersionUrl
			});
			this.subscribeState();
		}
	});
	
	
	Router.prototype.polyfillStateApi = function(){
		if(typeof _history.pushState != 'function'){
			_history.pushState = function(){};
			_history.replaceState = function(){};
		}
	};
		
	Router.prototype.interceptLinkHash = function(){
		var self = this;
		$(document).on('click.routeState','a',function(event){
			var href = $(event.currentTarget).attr('href');
			if(href && href.indexOf('#!') == 0){
				event.preventDefault();
				//debugger;
				var bindingContext = justep.Bind.contextFor(event.target);
				if(bindingContext){
					var $model = bindingContext.$model;
					if($model){
						$model.fireEvent('onRouteStatePublish',{
							hashbang: href,
							isReplace:false
						});
						$model.postMessage({
							type:"routeState",
							newUrl:href
						});
					}
				}
			}else if(href && href == '#'){
				event.preventDefault();
			}
		});
	};
	
	Router.prototype.subscribeState = function(){
		$(window).on('hashchange',$.proxy(function(event){
			_lastChangeTimeStamp = new Date().getTime();
			var e = event.originalEvent;
			var newUrl = e.newURL;
			var oldUrl = e.oldURL;
			if(newUrl == undefined){
				newUrl = location.href;
			}
			this.dispatchChange(newUrl,oldUrl);
		},this));
	};
	
	Router.prototype.dispatchChange = function(newUrl,oldUrl){
		this.rootModel.postMessage({
			type:"routeState",
			oldUrl:oldUrl,
			newUrl:newUrl
		});
	};
	
	Router.prototype.publishState = function(event){
		if(_inited == false && event.isFirstRoutePage != true){
			return;
		}
		var currentTimeStamp = new Date().getTime();
		var isReplace = event.isReplace;
		if(currentTimeStamp - _lastChangeTimeStamp < 800){
			isReplace = true;
		}
		_lastChangeTimeStamp = currentTimeStamp;
		var hashbang = event.hashbang;
		if(isReplace){
			_history.replaceState(null,null,hashbang);
		}else{
			_history.pushState(null,null,hashbang);
		}
	};
	
	Router.prototype.setRootModel = function(model){
		if(typeof this.rootModel == 'undefined'){
			this.rootModel = model;
			this.rootModel.on('onRouteStatePublish',function(event){
				this.publishState(event);
			},this);
			
			//第一次进来理解url
			this.rootModel.on('onLoad',function(event){
				var self = this;
				//TODO:onload 之后为什么还要延迟
				setTimeout(function(){
					self.dispatchChange(location.href,'');
				},1000);
			},this);
		}
	};
	
    return new Router();
});