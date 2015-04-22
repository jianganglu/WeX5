<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:mobile" xmlns:xui="http://www.justep.com/xui">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:251px;top:406px;"><div component="$UI/system/components/justep/data/data" autoLoad="false" xid="data" idColumn="id" autoNew="true"><column label="id" name="id" type="String" xid="default1"></column>
  <column label="begin" name="begin" type="Date" xid="default2"></column>
  <column label="end" name="end" type="Date" xid="default3"></column></div></div> 
<span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver" style="left:151px;top:204px;" onReceive="windowReceiverReceive"></span>
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel2">
   <div class="x-panel-content container" xid="content1"><div component="$UI/system/components/bootstrap/row/row" class="row" xid="row1">
   <div class="col col-xs-12" xid="col1"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelInput3">
   <label class="x-label" xid="label3" style="width:70px;"><![CDATA[开始日期]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input3" bind-ref="data.ref('begin')"></input></div></div>
   </div>
  <div component="$UI/system/components/bootstrap/row/row" class="row" xid="row2">
   <div class="col col-xs-12" xid="col4"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelInput4">
   <label class="x-label" xid="label4" style="width:70px;"><![CDATA[结束日期]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input4" bind-ref="data.ref('end')"></input></div></div>
   </div></div>
   <div class="x-panel-bottom" xid="bottom1"><a class="btn btn-link btn-only-label x-dialog-button" component="$UI/system/components/justep/button/button" label="取消" onClick='{"operation":"windowReceiver.windowCancel"}' xid="button1111" xui:update-mode="merge">
   <i xid="i13"></i>
   <span xid="span13">取消</span></a>
  <a class="btn btn-primary btn-only-label x-dialog-button" component="$UI/system/components/justep/button/button" label="确定" onClick="okBtnClick" xid="okBtn" xui:update-mode="merge">
   <i xid="i12"></i>
   <span xid="span12">确定</span></a></div></div></div>