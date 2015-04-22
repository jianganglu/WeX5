/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
var __checkboxComponent=require('$model/UI2/system/components/justep/button/checkbox'); 
var __selectComponent=require('$model/UI2/system/components/justep/select/select'); 
var __textareaComponent=require('$model/UI2/system/components/justep/textarea/textarea'); 
var __blobImageComponent=require('$model/UI2/system/components/justep/blob/blobImage'); 
var __radioGroupComponent=require('$model/UI2/system/components/justep/select/radioGroup'); 
var __modelComponent=require('$model/UI2/system/components/justep/model/model'); 
var __windowComponent=require('$model/UI2/system/components/justep/window/window'); 
var __checkboxGroupComponent=require('$model/UI2/system/components/justep/select/checkboxGroup'); 
var __radioComponent=require('$model/UI2/system/components/justep/button/radio'); 
var __dataComponent=require('$model/UI2/system/components/justep/data/data'); 
var __inputComponent=require('$model/UI2/system/components/justep/input/input'); 
var __excellayoutComponent=require('$model/UI2/system/components/justep/excellayout/excellayout'); 
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/justep/excellayout/demo/excelLayoutDemo'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam=true;
	this.__contextUrl=contextUrl;
	this.__id='2a42f5b842b24a9d926aa48a1fd9d58f';
	this._flag_='27780ec98e4cbe3b84c175a2b8a6889d';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"col0":{"define":"EXPRESS","label":"col0","name":"col0","relation":"EXPRESS","type":"String"},"col1":{"define":"EXPRESS","label":"col1","name":"col1","relation":"EXPRESS","type":"String"}},"directDelete":false,"events":{},"idColumn":"col0","initData":"[{\"col0\":\"boy\",\"col1\":\"男\"},{\"col0\":\"girl\",\"col1\":\"女\"}]","limit":20,"xid":"data1"});
 new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"col0":{"define":"EXPRESS","label":"col0","name":"col0","relation":"EXPRESS","type":"String"},"col1":{"define":"EXPRESS","label":"col1","name":"col1","relation":"EXPRESS","type":"String"}},"directDelete":false,"events":{},"idColumn":"col0","initData":"[{\"col0\":\"已婚\",\"col1\":\"已婚\"},{\"col0\":\"未婚\",\"col1\":\"未婚\"}]","limit":20,"xid":"data2"});
 new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"col0":{"define":"EXPRESS","label":"col0","name":"col0","relation":"EXPRESS","type":"String"}},"directDelete":false,"events":{},"idColumn":"col0","initData":"[{\"col0\":\"大学本科\"},{\"col0\":\"硕士\"},{\"col0\":\"博士\"}]","limit":20,"xid":"data4"});
 new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"col0":{"define":"EXPRESS","label":"col0","name":"col0","relation":"EXPRESS","type":"String"}},"directDelete":false,"events":{},"idColumn":"col0","initData":"[{\"col0\":\"汉族\"},{\"col0\":\"壮族\"},{\"col0\":\"苗族\"}]","limit":20,"xid":"data3"});
 new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"col0":{"define":"EXPRESS","label":"col0","name":"col0","relation":"EXPRESS","type":"String"}},"directDelete":false,"events":{},"idColumn":"col0","initData":"[{\"col0\":\"高级\"},{\"col0\":\"中级\"},{\"col0\":\"初级\"},{\"col0\":\"暂无\"},{\"col0\":\"其它\"}]","limit":20,"xid":"data5"});
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};
}}); 
return __result;});