<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:6px;height:auto;left:455px;" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="data" idColumn="name" confirm-delete="false" confirm-refresh="false"> 
      <column name="name" type="String" label="名称"/>  
      <column name="type" type="String" label="数据类型"/>  
      <column name="displayName" type="String" label="显示名称"/>  
      <column name="selected" type="Boolean" label="选中"/>  
      </div> 
  </div>
  <div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group">
	  <div style="margin-top:10px;" component="$UI/system/components/designerCommon/grid/grid" xid="grid" data="data" width="755" height="420" editable="true"> 
	    <column ref="selected" width="80" type="checkbox"/>  
	    <column ref="name"/>  
	    <column ref="type"/>  
	    <column ref="displayName" />
	  </div> 
  </div>  
</div>
