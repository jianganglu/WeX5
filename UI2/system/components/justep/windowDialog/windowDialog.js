/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Model = justep.ModelBase;
	var Dialog = require("../dialog/dialog");
	var WindowContainer = require("../windowContainer/windowContainer");
	var RouteUtil = require("$UI/system/lib/route/routeUtil");
	var Mapping = require("./js/receiveMapping");
	var url = require.normalizeName("./windowDialog");
	var ComponentConfig = require("./windowDialog.config");
	
	var WindowDialog = Dialog.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		constructor : function(options) {
			this.src = '';
			this.process = '';
			this.activity = '';
			this.forceRefreshOnOpen = false;
			this._compose = null;
			this._composeOK = $.Deferred();
			this.callParent(options);
		},
		dispose : function() {
			this.getModel().off(Model.MESSAGE_EVENT, this.doReceiver, this);
			this.callParent();
		},
		doInit : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			// 产生组件通讯的唯一标识,使用xid
			var xid = this.$domNode.attr('xid');
			if (!xid) {
				xid = justep.UUID.createUUID();
				this.$domNode.attr('xid', xid);
			}
			// 这里new
			// compose后因为父组件还没有完成，导致bind没有执行，所以在WindowContainer.LOAD_EVENT事件进行this._compose
			// = compose;
			var composeCfg = {
				src : this.src,
				process : this.process,
				activity : this.activity
			};
			composeCfg['xid'] = '_compose_' + xid + '_';
			this._compose = new WindowContainer(composeCfg);// , parentNode:
															// this._getBodyNode()[0]
			
			this._compose.on(WindowContainer.LOAD_EVENT, function() {
				this._composeOK.resolve();
				this.fireEvent(WindowContainer.LOAD_EVENT, {
					source : this
				});
				this.initRouter();
			}, this);
			this.getModel().on(Model.MESSAGE_EVENT, this.doReceive, this);// bind数据接收处理
		},
		
		initRouter : function(){
			if(!this.routable){
				return;
			}
			this._compose.off('onRouteStatePublish');
			this._compose.on('onRouteStatePublish',function(event){
				this.addRouteInnerItem('', event.hashbang,event.isReplace);
			},this);
		},
		
		doRoute : function(name,param,routeState){
			if(!this.routable){
				return;
			}
			if(name == ""){
				if(routeState == "enter"){
					if(RouteUtil.containeInnerState(param)){
						var paramValue = RouteUtil.getParamValue(param);
						var innerStateValue = RouteUtil.getInnerStateValue(param);
						var jsonParam = undefined;
						try{
							jsonParam = JSON.parse(paramValue)
						}catch(e){
						}
						this.open(jsonParam);
						var self = this;
						if(this._composeOK){
							this._composeOK.done(function(){
								var innerModel = self._compose.getInnerModel();
								innerModel.postMessage({
									type:"routeState",
									newUrl:innerStateValue
								});
							});
						}
					}else{
						var jsonParam = undefined;
						try{
							jsonParam = JSON.parse(param);
						}catch(e){
							
						};
						this.open(jsonParam);
					}
				}else if(routeState == "leave"){
					this.close();
				}else if(routeState == "update"){
					//update 情况只有innerModel的状态发生变化
					var innerStateValue = RouteUtil.getInnerStateValue(param);
					var self = this;
					if(this._composeOK){
						this._composeOK.done(function(){
							var innerModel = self._compose.getInnerModel();
							innerModel.postMessage({
								type:"routeState",
								newUrl:innerStateValue
							});
						});
					}
				}
			}
		},
		
		addRouteItem : function(type,param){
			if(!this.routable){
				return;
			}
			var $routeState = this.getModel().$routeState;
			var xid = this.$domNode.attr('xid');
			if(type == 'open'){
				try{
					$routeState.addState(xid,'',JSON.stringify(param));
					$routeState.publishState();
				}catch(e){
					//JSON.stringify(param) error 
				}
			}else if(type == 'close'){
				$routeState.removeState(xid,'','');
				$routeState.publishState();
			}
		},
		
		addRouteInnerItem : function(type,hashbang,isReplace){
			if(!this.routable){
				return;
			}
			var $routeState = this.getModel().$routeState;
			var xid = this.$domNode.attr('xid');
			if(type == 'open'){
				$routeState.addInnerState(xid,'',hashbang);
				
				$routeState.publishState();
			}
		},
		
		
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "src":
			case "process":
			case "activity":
				if (oldVal != value && this._inited){
					this._refresh();
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
		doReceive : function(event) {
			var data = event.message;
			if (data && data.target == this) {//判断投递给自己的消息才处理
				data.sender = data.source;
				data.source = this;
				delete data.target;
				this.fireEvent('onReceive', data);
				//增加mapping处理
				Mapping.receiveByMapping(this,data.data);
			}
		},
		render : function() {
			this.callParent();
		},
		_refresh : function(){
			if(this._compose){
				this._composeOK = $.Deferred();
				this._compose.setSrc(this.src);
				this._compose.setProcess(this.process);
				this._compose.setActivity(this.activity);
				this._compose.refresh();
			}
		},
		_setDialogParam : function(option) {
		},
		open : function(option) {
			//先显示对话框，后面逻辑有可能依赖对话框的大小
			this.callParent(option);
			if (option)
				this.set(option);
			if (!justep.Bind.isBound(this._compose.domNode)) {
				var parentNode = this._getBodyNode()[0];
				this._compose.setCSS({height: '100%',position: 'relative'});
				justep.Component.addComponent(parentNode, this._compose);
			}else{
				if(this.forceRefreshOnOpen){
					this._refresh();
				}
			}
			if(this._composeOK){
				var self = this;
				this._composeOK.done(function() {// 使用promise机制等待页面刷新成功后
					self._setDialogParam(option);
					var innerModel = self._compose.getInnerModel();
					innerModel.postMessage({
						source : self,
						type : 'WindowDialog',
						data : option ? option.data : undefined
					});
					//投递变化信息给子窗口
					innerModel.fireEvent('onResize',{source:self._compose});
				});
			}
		}
	});

	justep.Component.addOperations(WindowDialog, {
		open : {
			label : "",
			argsDef: [{name:'option',displayName:justep.Message.getMessage(justep.Message.JUSTEP231098)}],
			method : function(args) {
				return this.owner.open(args.option);
			}
		},
		close : {
			label : "",
			method : function(args) {
				return this.owner.close();
			}
		}
	});
	
	justep.Component.register(url, WindowDialog);
	return WindowDialog;
});