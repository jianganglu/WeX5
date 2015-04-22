/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	require('css!./css/dialog').load();

	var $ = require("jquery");
	
	var justep = require("$UI/system/lib/justep");

	var url = require.normalizeName("./dialog");
	var ComponentConfig = require("./dialog.config");

	var Dialog = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		constructor : function(options) {
			this.callParent(options);
			this.showTitle = false;
			this.title = '';
			this.status = 'maximize';
			this.opened = false;
			this.width = '80%';
			this.height = '80%';
			this.top = null;
			this.left = null;
			this.routable = false;
		},
		dispose : function() {
			$(window).off('resize', this.__resizeHandle);
			this.callParent();
		},
		doInit : function(value, bindingContext) {
		    //屏蔽鼠标滚轮
			var self = this;
			this.$domNode.on('mousewheel',function(e){
				if(self.opened) e.stopPropagation();
			});
			
			this._getTitleNode().mousedown(function(evt){
				self._dragStart(evt);
			});
			this.__dragMoveHandle = $.proxy(this._dragMove, this);
			this.__dragEndHandle = $.proxy(this._dragEnd, this);
			this.__closeHandle = $.proxy(this.close, this);
			this.__resizeHandle = $.proxy(this.doResize, this);
			this.$domNode.mousemove(this.__dragMoveHandle).mouseup(this.__dragEndHandle).find('.x-dialog-title:first > button.close').on('click',this.__closeHandle);
			$(window).on('resize', this.__resizeHandle);
		},
		_dragStart: function(evt){
			var target = evt.target;
			if(!$(target).is('button.close')){
				this.$domNode.addClass('x-dialog-drag');
				this._moving = true;
				this._dragContext = {
					onselectstart:document.onselectstart,
					x: evt.clientX,
					y: evt.clientY,
					dlg: this._getDialogNode().offset()
				};
				document.onselectstart=function(){return false;};
			}
		},
		_dragMove: function(evt){
			if(this._moving && this._dragContext){
				var left = evt.clientX - this._dragContext.x + this._dragContext.dlg.left;
				var top = evt.clientY - this._dragContext.y + this._dragContext.dlg.top;
				this._getDialogNode().offset({top:top,left:left});
				this._moved = true;
			}
		},
		_dragEnd: function(evt){
			this.$domNode.removeClass('x-dialog-drag');
			this._moving = false;
			if(this._dragContext && $.isFunction(this._dragContext.onselectstart))
				document.onselectstart=this._dragContext.onselectstart;
			this._dragContext = null;
		},
		doRoute : function(name,param,routeState){
			if(!this.routable){
				return;
			}
			if(name === ""){
				if(routeState == "enter"){
					this.open();
				}else if(routeState == "leave"){
					this.close();
				}
			}
		},
		addRouteItem : function(type){
			if(!this.routable){
				return;
			}
			var $routeState = this.getModel().$routeState;
			var xid = this.$domNode.attr('xid');
			if(type == 'open'){
				$routeState.addState(xid,'','');
				$routeState.publishState();
			}else if(type == 'close'){
				$routeState.removeState(xid,'','');
				$routeState.publishState();
			}
		},
		
		doResize : function() {
			if (this.opened) {
				this.render();
			}
		},
		buildTemplate : function(cfg) {
			if (!cfg)
				cfg = {};
			var xid = cfg.xid || justep.UUID.createUUID(); 
			this.set(cfg);
			return $('<span xid="' + xid + '" component="' + url + '">' + '<div class="x-dialog-overlay">' + '</div>'
					+ '<div class="x-dialog" style="display:none;" showTitle="' + !!cfg.showTitle + '">' + '<div class="x-dialog-title">' 
					+ '<button type="button" class="close"><span>×</span></button>' 
					+ '<h4 class="x-dialog-title-text">' + (cfg.title ? cfg.title : '')	+ '</h4>' 
					+ '</div>' + '<div class="x-dialog-body">' + (cfg.content ? cfg.content : '')
					+ '</div>' + '</div>' + '</span>');
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "showTitle":
				if(this._inited)
					this._getDialogNode()[value?'attr':'removeAttr']('showTitle','true');
				break;
			case "title":
				if (oldVal != value && this._inited) {
					this._getTitleTextNode().text(value);
				}
				break;
			case "status":
			case "width":
			case "height":
				if (oldVal != value) {
					this.needRender = this._inited;
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
		_getDialogNode : function() {
			return this.$domNode.find('div.x-dialog:first');
		},
		_getOverlayNode : function() {
			return this.$domNode.find('div.x-dialog-overlay:first');
		},
		_getTitleTextNode : function() {
			return this.$domNode.find('.x-dialog-title-text:first');
		},
		_getTitleNode : function() {
			return this.$domNode.find('.x-dialog-title:first');
		},
		_getBodyNode : function() {
			return this.$domNode.find('.x-dialog-body:first');
		},
		close : function() {
			this._getDialogNode().removeClass('x-dialog-in').hide();
			this._getOverlayNode().removeClass('x-dialog-overlay-visible');
			// justep.Util.enableTouchMove(document.body);
			$('body').removeClass('x-dialog-body-overflow-hidden');
			this.opened = false;
			this.fireEvent('onClose', {
				source : this
			});
			this.addRouteItem("close");
		},
		setContent: function(content){
			this._getBodyNode().html(content);
		},
		render : function() {
			this.callParent();
			var $w = $(window);
			var fillCss = {
				height : $w.height(),
				width : $w.width()
			};
			var normalCss = {
				height : this.height,
				width : this.width
			};
			this._getOverlayNode().css(fillCss);
			var $dlg = this._getDialogNode();
			if(this.status === 'maximize')
				$dlg.css(fillCss).removeClass('x-dialog-normal');
			else
				$dlg.css(normalCss).addClass('x-dialog-normal');
			if(this.opened) this._setDialogTopLeft();
		},
		_setDialogTopLeft: function(){
			var $w = $(window);
			var $dlg = this._getDialogNode();
			var dlgH = $dlg.outerHeight(), winH = $w.height(), dlgW = $dlg.outerWidth(), winW = $w.width();
			var mTop = (this.top === null)?(dlgH>=winH?10:(winH-dlgH)/2):this.top;
			var mLeft = (this.left === null)?(dlgW>=winW?0:(winW-dlgW)/2):this.left;
			if(this.status === 'maximize'){
				mTop = 0;
				mLeft = 0;
			}
			$dlg.css({'top':mTop,'left':mLeft});
		},
		open : function(option) {
			// lzg 暂时屏蔽,影响较大
			// justep.Util.disableTouchMove(document.body);
			$('body').addClass('x-dialog-body-overflow-hidden');
			var $dlg = this._getDialogNode();
			this._getOverlayNode().addClass('x-dialog-overlay-visible');
			this.render();
			$dlg.show().addClass('x-dialog-in');
			if(!this._moved) this._setDialogTopLeft();//需要显示后才能计算出高度
			this.addRouteItem('open',option);
			this.opened = true;
			this.fireEvent('onOpen', {
				source : this
			});
		}
	});

	justep.Component.addOperations(Dialog, {
		open : {
			label : "",
			method : function(args) {
				return this.owner.open();
			}
		},
		close : {
			label : "",
			method : function(args) {
				return this.owner.close();
			}
		}
	});

	justep.Component.register(url, Dialog);
	return Dialog;
});