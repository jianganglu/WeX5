/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	/**
	 *
	 #!contents1/page/1/!/windowDialog1/(open)/(title#!contents1/page/1/!/windowDialog1/(open)/title)/location/center/!/data1/row/6
	 * 
	 */
	var $=require('jquery'),
		Object = require("$UI/system/lib/base/object"),
		LinkedHashMap = require('./linkedHashMap');
	
	var HashbangToken = "#!",
		StateSeriesSplitToken = "!",
		LeftBarcketToken = "(",
		RightBarcketToken = ")",
		SegmentSplitToken = "/";
	
	var HashbangReader = function(hashValue){
		this.hashValue = hashValue;
		
	};
	
	HashbangReader.prototype.read = function(str){
		var char = this.hashValue.charAt(0);
		this.hashValue = this.hashValue.slice(1);
		return char;
	};
	
	HashbangReader.prototype.readMatch = function(str){
		if(this.beginWith(str)){
			this.hashValue = this.hashValue.slice(str.length);
			return str;
		}
	};
	
	HashbangReader.prototype.beginWith = function(str){
		if(this.hashValue.indexOf(str) == 0){
			return true;
		}
		return false;
	};
	
	HashbangReader.prototype.eof = function(str){
		if(this.hashValue.length == 0){
			return true;
		}
		return false;
	};
	
	var Node = function(){
		this.type = "";
		this.text = "";
	};
	
	Node.prototype.hasNext = function(){
		return this.nextNode ? true : false;
	};	
	
	Node.prototype.createNode = function(){
		var node = new Node();
		node.preNode = this;
		this.nextNode = node;
		return node;
	};
	
	Node.prototype.each = function(fn,scope){
		fn.call(scope,this);
		if(this.hasNext()){
			this.nextNode.each(fn,scope);
		}
	};
	
	Node.prototype.getFirstNode = function(){
		var firstNode;
		while(this.preNode){
			firstNode = this.preNode;
		}
		if(typeof firstNode == 'undefined'){
			return this;
		}
		return firstNode;
	};
	
	
	
	var HashbangParser = Object.extend({
		constructor: function(hashValue){
			this.callParent();
			var hashbangIndex = hashValue.indexOf(HashbangToken);
			if(hashbangIndex == -1){
				hashValue = HashbangToken;
			}else{
				hashValue = hashValue.substring(hashbangIndex);
				hashValue = decodeURIComponent(hashValue);
			}
			this.reader = new HashbangReader(hashValue);
			this.currentNode = new Node();
			this.firstNode = this.currentNode;
		},
		parse : function(){
			if(!this.reader.readMatch(HashbangToken)){
				console.log("非法起始字符串，必须以#!开头");
				return new LinkeHashMap();
			}
			this._parse();
			var routeStates = this.toRouteState();
			return routeStates;
		},
		toRouteState : function(){
			var xid,name,param,stateSeries,routeStates = new LinkedHashMap();
			this.firstNode.each(function(node){
				if(node.type == "xid"){
					xid = node.text;
					if(routeStates.has(xid)){
						stateSeries = routeStates.get(xid);
					}else{
						stateSeries = new LinkedHashMap();
						routeStates.add(xid,stateSeries);
					}
				}else if(node.type == "nameSegment"){
					name = node.text;
				}else if(node.type == "paramSegment"){
					param = node.text;
					stateSeries.add(name,param);
				}
			},this);
			routeStates.each(function(xid, states, i){
				if(states.size() == 0){
					//支持xid的简写方式，认为name 和 param 为‘’
					states.add('','');
				}
			});
			return routeStates;
		},
		_parse : function(){
			this.nextToken();
			this.toRouteState();
		},
		nextToken : function(){
			if(!this.reader.eof()){
				var char = this.reader.read();
				switch(char){
					case SegmentSplitToken :
						if(this.currentNode.type == "barcketSegment"){
							this.currentNode.text += char;
							break;
						}else if(this.reader.beginWith(StateSeriesSplitToken)){
							this.currentNode = this.currentNode.createNode();
							this.currentNode.type = "stateSeriesSplitSegment";
							break;
						}else{
							if(this.currentNode.type == "xid"){
								this.currentNode = this.currentNode.createNode();
								this.currentNode.type = "nameSegment";
								break;
							}else if(this.currentNode.type == "nameSegment"){
								this.currentNode = this.currentNode.createNode();
								this.currentNode.type = "paramSegment";
								break;
							}else if(this.currentNode.type == "paramSegment"){
								this.currentNode.text += char;
								break;
							}else if(this.currentNode.type == "stateSeriesSplitSegment"){
								this.currentNode = this.currentNode.createNode();
								this.currentNode.type = "xid";
								break;
							}
						}
					case LeftBarcketToken :
						if(this.currentNode.type == "barcketSegment"){
							this.currentNode.text += char;
							this.currentNode.leftBarcketNum++; 
						}else{
							if(this.currentNode.type == ''){
								this.currentNode.type = 'xid';
							}
							this.currentNode.oldType = this.currentNode.type;
							this.currentNode.type = "barcketSegment";
							this.currentNode.leftBarcketNum = 1;
						}
						break;
					case RightBarcketToken : 
						if(this.currentNode.type == "barcketSegment"){
							this.currentNode.leftBarcketNum--;
							if(this.currentNode.leftBarcketNum == 0){
								this.currentNode.type = this.currentNode.oldType;
								delete this.currentNode.oldType;
							}else{
								this.currentNode.text += char;
							}
						}else{
							console.log('没有左括号匹配到右括号作为参数处理，此处不建议在参数或者hashbang中带括号而不编码');
						}
						break;
					default:
						if(this.currentNode.type == ''){
							this.currentNode.type = "xid";
						}
						this.currentNode.text += char;
				}
				this.nextToken();
			}
		}
	});
	return HashbangParser;
});