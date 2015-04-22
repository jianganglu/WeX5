/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
    var xuiDoc = xuiService.getXuiDoc();
	require('css!./css/absoluteLayout').load();
	var absoluteLayout = function(config) {
		this.domNode = this.templateNode = config.templateNode;
		this.domNode.setAttribute("tabindex",'0');
	};

	absoluteLayout.prototype = { 
		init : function(){
			var self = this;
			$(this.domNode).bind({
			mousedown:function(event){
				self._mousedown(event);
			},
			mouseup:function(event){
				self._mouseup(event);
			},
			keydown : function(event){ 
				self._keydown(event);
			},
			mousemove:function(event){
				self._mousemove(event);
			}});
		},
		
		_keydown : function(event){   
			var dx = 0, dy = 0; 
			var selections =  this.getSelections(); 
			if (selections.length > 0) {
				switch (event.keyCode) {
					case 37 : // 左移键
						dx = -1;
						break;
					case 38 :// 上移
						dy = -1;
						break;
					case 39 :// 右移
						dx = 1;
						break;
					case 40 :// 下移
						dy = 1;
						break;
				}
				if (dx !== 0 || dy !== 0) {  
					var ids = [],css = [];
					for(var i =0;i<selections.length;i+=1){
						var $e = $(selections[i]);
						var left = parseInt($e.css("left"),10) + dx;
						var top = parseInt($e.css("top"),10) + dy;
						if(left<0){
							left = 0;
						}
						if(top<0){
							top = 0;
						}
						ids.push(selections[i].getAttribute("d_id"));	
						css.push({top:top+"px",left:left+"px"});
					} 
					xuiDoc.batchSetCSS(ids,css);
					event.preventDefault();  
					event.stopPropagation();
					return false;
				}
			}
		},
		
		_mousedown : function(event){ 
			var target = event.target;
			this.mousedownX = event.clientX;
			this.mousedownY = event.clientY;
			this.currentSelect = null;
			this.mouseDownTarget = event.target;
			this.action = null;
			if(!this.ownerDesigner.ctx.action && target == this.domNode){
				this.ownerDesigner.executeSelect(event,target);
				this._dragSelect(event);
				event.stopPropagation();				
			}else{
				var currentE = this.ownerDesigner.findSelectableElement(target);  
				if(currentE.parentNode == this.domNode){  
					this.currentSelect = currentE;
					if(!this.ownerDesigner.isSelected(currentE)){
						this.ownerDesigner.executeSelect(event,target);						
					}
					event.stopPropagation();
				}
			}
		},
		
		_mouseup : function(event) {
			if (this.ownerDesigner.ctx.action === null) {
				if (event.button == 2) {
					if(this.ownerDesigner.getSelections().length>1){
						this.ownerDesigner.dispatchEvent({
							event : "contextmenu",
							selections : JSON.stringify([this.domNode.getAttribute("d_id")]),
							componentNames : JSON.stringify([this.domNode.getAttribute("componentName")])
						});
						event.stopPropagation();
					}
				}
			}
		},
		
		_mousemove :function(event){
			var action = this.ownerDesigner.ctx.action ;
			if(action === this.ownerDesigner.actionType.READY_CREATE){ 
				if(event.target == this.domNode){
					this.ownerDesigner.insertPos  = this.calcuInsertPos(event.clientX,event.clientY);
					event.stopPropagation();
				}
			}else if(this.action == this.ownerDesigner.actionType.MOVE){
				event.stopPropagation();
			}else if(!this.ownerDesigner.ctx.action){
				if(event.which==1 && this.currentSelect && (Math.abs(event.clientY-this.mousedownY)>5 || Math.abs(event.clientX-this.mousedownX)>5)){
					this.action = this.ownerDesigner.actionType.MOVE;
					this._dragMove(event);
					event.stopPropagation();
				}
			}
		},
		
		/**拖拽移动位置**/
		_dragMove : function(event){
			var self = this;
			var $currentTarget = $(this.ownerDesigner.findSelectableElement(this.mouseDownTarget));
			var $domNode = $(this.domNode);
			var elements = this.getSelections();
			var oldPos = [];
			var startX = event.clientX;
			var startY = event.clientY;
			var i,l = elements.length;
			var body = document.body;
			
			var minX = 10000, minY = 10000, maxX = 0, maxY = 0;
			var mostLeftE;// 记录最左边最上边的一个控件
			var mostTopE;// 记录最上边最左边的一个控件
			for (i = 0; i < l; i += 1) {
				var $e = $(elements[i]);
				var pos = $e.position();
				var bound = $e.getBound();
				oldPos.push({
					top : pos.top,
					left : pos.left
				});

				if (bound.x < minX || bound.x == minX && bound.y < minY) {
					mostLeftE = elements[i];
				}
				if (bound.y < minY || bound.y == minY && bound.x < minX) {
					mostTopE = elements[i];
				}
				minX = Math.min(minX, bound.x);
				minY = Math.min(minY, bound.y);
				maxX = Math.max(maxX, bound.x + bound.w);
				maxY = Math.max(maxY, bound.y + bound.h);
			}
			var currentBound = {x:minX,y:minY,w:maxX-minX,h:maxY-minY}; //当前选择图形的区域信息
			
			var otherBounds = [];
			var childNodes = this.domNode.childNodes;
			for(i = 0;i<childNodes.length;i+=1){
				var childNode = childNodes[i];
				if(childNode.nodeType == 1 && !self.ownerDesigner.isSelected(childNode)){
					otherBounds.push($(childNode).getBound());
				}
			}
			
			var mouseMove = function(event){
				if(event.which !=1){
					mouseUp(event);
					event.stopPropagation();
					return;
				}
				var dx = event.clientX - startX;
				var dy = event.clientY - startY;
				
				 
                currentBound.x = Math.max(minX + dx,0); //不允许拖出左边界或者上边界,最小坐标为5
                currentBound.y = Math.max(minY + dy,0); 
                currentBound = self.autoAlign(currentBound, otherBounds,self.domNode);//执行自动对齐后返回新的坐标点
            

				for (i = 0; i < l; i += 1) {
					var newX = Math.round(oldPos[i].left + (currentBound.x - minX) + self.domNode.scrollLeft);
					var newY = Math.round(oldPos[i].top + (currentBound.y - minY) + self.domNode.scrollTop);
					if(newX<0){
						newX = 0;
					}
					if(newY<0){
						newY = 0;
					}

					$(elements[i]).css({
						left : newX + "px",
						top : newY + "px"
					});
					if (elements[i].selectionBox) {
						elements[i].selectionBox.paint();
					}
					self.ownerDesigner.repaintResizeBoxes();
				} 
				self.showLocationTip($currentTarget);
				event.stopPropagation();
			};
			
			var mouseUp = function(event){
				self.action = null;
				if(self.locationTip){
					self.locationTip.remove();
					self.locationTip = null;
				}
				self.clearAlighLine(self.domNode);
				$domNode.unbind("mousemove", mouseMove);
				$(body).unbind("mouseup", mouseUp);
				self.ownerDesigner.dispatchStyleChangedEvent();
			};
			
			$domNode.bind("mousemove", mouseMove);
			$(body).bind("mouseup", mouseUp);
		},
		
		showLocationTip : function($targetElement){
			if(!this.locationTip){
				this.locationTip = $("<div style='z-index:10;position:absolute;height:14px;padding:2px;background:#FFFFB9;font-size:9px;'></div>").appendTo(this.domNode);
			}
			var top = $targetElement.css("top");
			var left = $targetElement.css("left");
			
			this.locationTip.css({top:top,left:left}).html(top+","+left); 
		},
		
		/**
		 * 拖拽框选.
		 */
		_dragSelect : function(event) {
			var currentE = event.target;
			if (currentE == this.domNode) {
				var self = this;
				var selectDiv;
				var offset = $(this.domNode).offset();
				var $domNode = $(currentE);
				var scrollOffset = {
					left : self.domNode.scrollLeft,
					top : self.domNode.scrollTop
				};// canvas.getParentScrollOffset(targetE);
				console.log("left:"+scrollOffset.left+"==top:"+scrollOffset.top);
				var x = event.clientX - offset.left + scrollOffset.left , y = event.clientY - offset.top + scrollOffset.top ;
				var oldX = event.clientX, oldY = event.clientY;
 
				var body = document.body;
				var mouseMove = function(event) {
					if(event.which != 1){
						//mouseUp(event);
						return;
					}
			 
					if (!selectDiv) {
						selectDiv = $(
								"<div style='opacity:0.5;filter:alpha(opacity=50);background:white;position:absolute;line-height:1px;height:1px;border:1px dashed green;top:" + y + "px;left:" + x
										+ "px'>&nbsp;</div>").appendTo(currentE);
					}
					var w = event.clientX - oldX ;
					var h = event.clientY - oldY ;
					
					var newScrollLeft = self.domNode.scrollLeft;
					if(newScrollLeft != scrollOffset.left){//滚动条在拖拽中滚动
						w += (newScrollLeft - scrollOffset.left);
					}
					var newScrollTop = self.domNode.scrollTop;
					if(newScrollTop != scrollOffset.top){ //滚动条在拖拽中滚动
						h += (newScrollTop - scrollOffset.top);
					}
					if (w < 1) {
						selectDiv.css("left", (x + w) + "px");
					}
					if (h < 1) {
						selectDiv.css("top", (y + h) + "px");
					}
					selectDiv.width(Math.abs(w));
					selectDiv.height(Math.abs(h));
					event.stopPropagation();
				};

				var mouseUp = function(event) {
					$domNode.unbind("mousemove", mouseMove);
					$(body).unbind("mouseup", mouseUp);
					event.stopPropagation();
					if (selectDiv) {
						var dgBound = selectDiv.getBound();
						selectDiv.remove();
						var childNodes = currentE.childNodes;
						var isFirst = true;
						for ( var i = 0, l = childNodes.length; i < l; i++) {
							var childNode = childNodes[i];
							if(childNode.nodeType == 1 && childNode.getAttribute("d_id")){
								if (self.containInBound(dgBound, $(childNode).getBound())) {
									self.ownerDesigner[isFirst?"setSelection":"addSelection"](childNode);
									isFirst = false;
								}
							}
						}
						if(!isFirst){
							self.ownerDesigner.dispatchSelectionChangedEvent();
						}
					}
					selectDiv = null;
				};
				$domNode.bind("mousemove", mouseMove);
				$(body).bind("mouseup", mouseUp);
			}
		},
		
		getRegularBound : function(bound) {
			var x1 = bound.x + bound.w;
			var y1 = bound.y + bound.h;
			var minX = Math.min(bound.x, x1);
			var minY = Math.min(bound.y, y1);
			return {
				x : minX,
				y : minY,
				w : Math.abs(bound.w),
				h : Math.abs(bound.h)
			};
		},

		/** 判断一个区域是否包含一个或者部分包含在另外一个区域中* */
		containInBound : function(sBound, tBound) {
			sBound = this.getRegularBound(sBound);
			return Math.abs((sBound.x + sBound.x + sBound.w)
					- (tBound.x + tBound.x + tBound.w)) < (sBound.x + sBound.w
					+ tBound.x + tBound.w - sBound.x - tBound.x)
					&& Math.abs((sBound.y + sBound.y + sBound.h)
							- (tBound.y + tBound.y + tBound.h)) < (sBound.y
							+ sBound.h + tBound.y + tBound.h - sBound.y - tBound.y);
		},
		calcuInsertPos:function(clientX,clientY){ 
			this.ownerDesigner.hideCursor();
			var $domNode = $(this.domNode);
			var offset = $domNode.offset();
			return {position:"absolute",left:clientX - offset.left + this.domNode.scrollLeft,top:clientY - offset.top + this.domNode.scrollTop,parent:this.domNode,pos:1};
		},
		
		paintContent : function(){
			
		},
		
		getSelections : function(){
			var newSelections = [];
			var selections = this.ownerDesigner.getSelections();
			for(var i =0 ,l = selections.length;i<l;i+=1){
				if((!selections[i].getAttribute("d_id") && selections[i].parentNode != this.domNode) || selections[i] == this.domNode){
					continue;
				}
				newSelections.push(selections[i]);
			}
			return newSelections;
		},

		/** 自动对齐* */
		autoAlign : function(currentBound/* 当前区域 */, otherBounds/* 数组，其他的区域 */, viewElement/* 视图元素 */,scrollTop,scrollLeft) {
			if (!otherBounds || otherBounds.length === 0) {
				return currentBound;
			}
 
			var div;
			if (!viewElement)
				viewElement = document.body;
			if (!viewElement.valignLine) {
				div = document.createElement("div");
				div.style.cssText = "left:0px;display:none;overflow:hidden;border-top:1px dotted green;position:absolute;width:100%;height:1px;";
				viewElement.appendChild(div);
				viewElement.valignLine = div;
			}

			if (!viewElement.halignLine) {
				div = document.createElement("div");
				div.style.cssText = "top:0px;display:none;overflow:hidden;border-left:1px dotted green;position:absolute;width:1px;height:100%;";
				viewElement.appendChild(div);
				viewElement.halignLine = div;
			}

			var minVOffset = {
				offset : 6,
				bound : null,
				align : null
			};
			var minHOffset = {
				offset : 6,
				bound : null,
				align : null
			};
			for ( var i = 0; i < otherBounds.length; i++) {
				var b2 = otherBounds[i];
				var top_top = Math.abs(currentBound.y - b2.y);
				if (top_top < minVOffset.offset) {
					minVOffset.offset = top_top;
					minVOffset.bound = b2;
					minVOffset.align = "top";
				}
				if (Math.abs(b2.h - currentBound.h) > 2) {// 高度不相同才比较
					var vcenter_vcenter = Math.abs(currentBound.y + currentBound.h / 2 - b2.y - b2.h / 2);
					if (vcenter_vcenter < minVOffset.offset) {
						minVOffset.offset = vcenter_vcenter;
						minVOffset.bound = b2;
						minVOffset.align = "vcenter";
					}
					var bottom_bottom = Math.abs(currentBound.y + currentBound.h - b2.y - b2.h);
					if (bottom_bottom < minVOffset.offset) {
						minVOffset.offset = bottom_bottom;
						minVOffset.bound = b2;
						minVOffset.align = "bottom";
					}
				}

				var left_left = Math.abs(currentBound.x - b2.x);
				if (left_left < minHOffset.offset) {
					minHOffset.offset = left_left;
					minHOffset.bound = b2;
					minHOffset.align = "left";
				}
				if (Math.abs(b2.w - currentBound.w) > 2) {// 宽度不相同才比较
					var hcenter_hcenter = Math.abs(currentBound.x + currentBound.w / 2 - b2.x - b2.w / 2);
					if (hcenter_hcenter < minHOffset.offset) {
						minHOffset.offset = hcenter_hcenter;
						minHOffset.bound = b2;
						minHOffset.align = "hcenter";
					}
					var right_right = Math.abs(currentBound.x + currentBound.w - b2.x - b2.w);
					if (right_right < minHOffset.offset) {
						minHOffset.offset = right_right;
						minHOffset.bound = b2;
						minHOffset.align = "right";
					}
				}

			}

			// TODO 有偏移量处理
			if (minVOffset.bound) {
				var top;
				if (minVOffset.align == "top") {
					currentBound.y = minVOffset.bound.y;
					top = minVOffset.bound.y;
				} else if (minVOffset.align == "vcenter") {
					currentBound.y = minVOffset.bound.y + minVOffset.bound.h / 2 - currentBound.h / 2;
					top = (minVOffset.bound.y + minVOffset.bound.h / 2);
				} else {// bottom
					currentBound.y = minVOffset.bound.y + minVOffset.bound.h - currentBound.h;
					top = (minVOffset.bound.y + minVOffset.bound.h);
				}
				viewElement.valignLine.style.top = (top-1 + viewElement.scrollTop) + "px";
				viewElement.valignLine.style.left = viewElement.scrollLeft + "px";
				viewElement.valignLine.style.display = "block";
			} else {
				viewElement.valignLine.style.display = "none";
			}

			if (minHOffset.bound) {
				var left ;
				if (minHOffset.align == "left") {
					currentBound.x = minHOffset.bound.x;
					left = (minHOffset.bound.x);
				} else if (minHOffset.align == "hcenter") {
					currentBound.x = minHOffset.bound.x + minHOffset.bound.w / 2 - currentBound.w / 2;
					left = (minHOffset.bound.x + minHOffset.bound.w / 2);
				} else {// right
					currentBound.x = minHOffset.bound.x + minHOffset.bound.w - currentBound.w;
					left = (minHOffset.bound.x + minHOffset.bound.w);
				}
				viewElement.halignLine.style.left = (left-2 + viewElement.scrollLeft) + "px";
				viewElement.halignLine.style.top = viewElement.scrollTop + "px";
				viewElement.halignLine.style.display = "block";
			} else {
				viewElement.halignLine.style.display = "none";
			}

			return currentBound;
		},

		/** 清除自动对齐线条* */
		clearAlighLine : function(viewElement) {
			if (!viewElement)
				viewElement = document.body;
			if (viewElement.valignLine)
				viewElement.valignLine.parentNode.removeChild(viewElement.valignLine);//.style.display="none";
			if (viewElement.halignLine)
				viewElement.halignLine.parentNode.removeChild(viewElement.halignLine);//.style.display="none";
			viewElement.halignLine = null;
			viewElement.valignLine = null;
		},
		/**顶部或者左边对齐**/
		topOrLeftAlign : function(direction/*方向 left or top*/){
			var selections = this.getSelections();
			if(selections.length === 0){
				return;
			}
			var minValue = 10000;
			var i,l = selections.length;
			for(i =0;i<l;i+=1){
				var tempLeft = parseInt($(selections[i]).css(direction),10);
				if(tempLeft<minValue){
					minValue = tempLeft;
				}
			}
			var ids = [],css = [];
			for(i =0,l = selections.length;i<l;i+=1){
				ids.push(selections[i].getAttribute("d_id"));	
				var cfg = {};
				cfg[direction] = minValue+"px";
				css.push(cfg);
			}
			xuiDoc.batchSetCSS(ids,css);
		},
		
		bottomOrRightAlign : function(direction,item1,item2){
			var selections = this.getSelections();
			if(selections.length === 0){
				return;
			}
			var maxValue = 0;
			var i,l = selections.length;
			for(i =0;i<l;i+=1){
				var bound = $(selections[i]).getBound();
				var tempValue = bound[item1] + bound[item2];
				if(tempValue > maxValue){
					maxValue = tempValue;
				}
			}
			
			var ids = [],css = [];
			for(i =0,l = selections.length;i<l;i+=1){
				var currentValue = maxValue - $(selections[i]).getBound()[item2] -1;
				ids.push(selections[i].getAttribute("d_id"));	
				var cfg = {};
				cfg[direction] = currentValue+"px";
				css.push(cfg);
			}
			xuiDoc.batchSetCSS(ids,css);
		},
		
		onBuildMenu : function(config){
			var list = this.ownerDesigner.getSelections();
			if(list.length == 1 && list[0] == this.domNode){
				config.menuItems = [];				
			}
		},
		
		centerAlign : function(direction,item1,item2){
			var selections = this.getSelections();
			if(selections.length === 0){
				return;
			}
			var ids = [],css = [];
			var baseBound = $(selections[0]).getBound();
			var baseValue = baseBound[item1] + baseBound[item2]/2;
			for(var i =1,l = selections.length;i<l;i+=1){
				var newValue = baseValue - $(selections[i]).getBound()[item2]/2;
				ids.push(selections[i].getAttribute("d_id"));	
				var cfg = {};
				cfg[direction] = newValue+"px";
				css.push(cfg);
			}
			xuiDoc.batchSetCSS(ids,css);
		},
		
		spaceEqually : function(direction,item1,item2){
			var selections = this.getSelections();
			selections.sort(function(a,b){
				return parseInt($(a).css(direction),10) > parseInt($(b).css(direction),10)?1:-1;
			});
			var l = selections.length;
			var bound0 = $(selections[0]).getBound();
			var boundLast = $(selections[l-1]).getBound();
			
			var min_x = bound0[item1] + bound0[item2];
			var max_x = boundLast[item1];
			var dis = max_x - min_x;
			
			var  i ;
			for(i = 1;i<l-1;i++){		
				dis -= $(selections[i]).getBound()[item2];
			}
			var avg =  (dis)/(l-1);
			if(avg<=0){ 
				avg = 20;
			}
			var ids = [],css = [];
			var newValue = min_x + (direction == 'left'?avg:0);//TODO: 垂直方向为何取0？
			for(i = 1;i<l;i++){
				var cfg = {};
				cfg[direction] = newValue+"px";
				ids.push(selections[i].getAttribute("d_id"));	
				css.push(cfg);
				newValue += $(selections[i]).getBound()[item2] + avg;
			}
			xuiDoc.batchSetCSS(ids,css);
		},
		
		replicateSize : function(sizeType,item){
			var selections = this.getSelections();
			if(selections.length < 2){
				return;
			}
			var ids = [],css = [];
			var newValue = $(selections[0]).getBound()[item];
			for(var i =1,l = selections.length;i<l;i+=1){
				ids.push(selections[i].getAttribute("d_id"));	
				var cfg = {};
				cfg[sizeType] = newValue+"px";
				css.push(cfg);
			}
			xuiDoc.batchSetCSS(ids,css);
		},
		
		/**
		 * 左对齐.
		 */
		leftAlign : function(){
			this.topOrLeftAlign("left");
		},
		
		/** 顶部对齐 **/
		topAlign : function(){
			this.topOrLeftAlign("top");
		},
		
		/** 右对齐 **/
		rightAlign : function(){
			this.bottomOrRightAlign("left", "x", "w");
		},	
		
		/** 底部对齐 **/
		bottomAlign : function(){
			this.bottomOrRightAlign("top", "y", "h");
		},
		
		/**水平中心对齐**/
		horizontalCenterAlign : function(){
			this.centerAlign("top", "y", "h");
		},
		
		/**垂直中心对齐**/
		verticalCenterAlign : function(){
			this.centerAlign("left", "x", "w");
		},
		
		/**水平等间距**/
		horizontalSpaceEqually : function(){
			this.spaceEqually("left", "x", "w");
		},
		
		/**垂直等间距**/
		verticalSpaceEqually : function(){
			this.spaceEqually("top", "y", "h");
		},
		
		/**复制宽度**/
		replicateWidth : function(){
			this.replicateSize("width", "w");
		},
		
		/**复制高度**/
		replicateHeight : function(){
			this.replicateSize("height", "h");
		},
		
		/** 水平居中*/
		horizontalCenter : function(){
			var selections = this.getSelections();
			if(selections.length < 2){
				return;
			}
			var ids = [],css = [];
			var pWidth = $(this.domNode).getBound()["w"];
			for(var i =0,l = selections.length;i<l;i+=1){
				var newValue = (pWidth-$(selections).getBound().w)/2;
				ids.push(selections[i].getAttribute("d_id"));	
				var cfg = {};
				cfg["left"] = newValue+"px";
				$(selections[i]).css(cfg);
				this.ownerDesigner.reSelect(selections[i],true);
				css.push(cfg);
			}
			xuiDoc.batchSetCSS(ids,css);
		},
		
		/**垂直居中**/
		verticalCenter : function(){
			var selections = this.getSelections();
			if(selections.length < 2){
				return;
			}
			var ids = [],css = [];
			var pHeight = $(this.domNode).getBound()["h"];
			for(var i =0,l = selections.length;i<l;i+=1){
				var newValue = (pHeight-$(selections).getBound().h)/2;
				ids.push(selections[i].getAttribute("d_id"));	
				var cfg = {};
				cfg["top"] = newValue+"px";
				$(selections[i]).css(cfg);
				this.ownerDesigner.reSelect(selections[i],true);
				css.push(cfg);
			}
			xuiDoc.batchSetCSS(ids,css);
		}
	};

	return {
		'$UI/system/components/justep/absoluteLayout/absoluteLayout' : absoluteLayout
	};
});