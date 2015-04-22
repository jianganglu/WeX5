<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:mobile">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:540px;top:21px;"/> 
<a component="$UI/system/components/justep/button/button" class="btn btn-default" label="空对话框" xid="button1" onClick="{operation:'wdEmpty.open'}">
   <i xid="i1"></i>
   <span xid="span1">空对话框</span></a>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="wdEmpty" style="left:581px;top:69px;" src="$UI/demo/dialog/empty.w" title="空" showTitle="true" status="normal"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="wdMultiTree" style="left:581px;top:132px;" src="$UI/demo/dialog/multiTree.w" showTitle="true" status="normal"></span>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="列表单选" xid="button3" onClick="{operation:'wdSingleList.open'}">
   <i xid="i3"></i>
   <span xid="span3">列表单选</span></a><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="列表多选" xid="button4" onClick="{operation:'wdMultiList.open'}">
   <i xid="i4"></i>
   <span xid="span4">列表多选</span></a><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="树形单选" xid="button5" onClick="{operation:'wdSingleTree.open'}">
   <i xid="i5"></i>
   <span xid="span5">树形单选</span></a><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="树形多选" xid="button2" onClick="{operation:'wdMultiTree.open'}">
   <i xid="i2"></i>
   <span xid="span2">树形多选</span></a>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="wdSingleList" style="top:188px;left:623px;" src="$UI/demo/dialog/singleList.w" showTitle="true" status="normal"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="wdMultiList" style="left:580px;top:188px;" src="$UI/demo/dialog/multiList.w" showTitle="true" status="normal"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="wdSingleTree" style="left:621px;top:130px;" src="$UI/demo/dialog/singleTree.w" showTitle="true" status="normal"></span>
  </div>