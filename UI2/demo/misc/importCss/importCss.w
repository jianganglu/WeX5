<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:427px;top:144px;"
    onLoad="modelLoad"/>  
  <div class="container-fluid"> 
    <h3 xid="h31" class="text-center"><![CDATA[WeX5界面模块化使用---引用css]]></h3>  
    <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar form-inline x-toolbar-spliter"
      xid="toolBar1"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
        label="动态加载UI2下的text" xid="innerTextBtn" onClick="innerTextBtnClick"> 
        <i xid="i3"/>  
        <span xid="span3">动态加载UI2下的text</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
        label="动态加载外部的text" xid="outterTextBtn" onClick="outterTextBtnClick"> 
        <i xid="i4"/>  
        <span xid="span4">动态加载外部的text</span> 
      </a> 
    </div>  
    <span xid="span10" style="display:block" class="innerCss1"><![CDATA[内部css样式1]]> </span>  
    <span style="display:block" class="innerCss2" xid="span11"><![CDATA[内部css样式2]]></span>  
    <span style="display:block" class="outterCss1" xid="span12"><![CDATA[外部css样式]]></span> 
  </div> 
</div>
