<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window"
  sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:148px;top:433px;"
    onLoad="modelLoad">
    <div component="$UI/system/components/justep/data/data" xid="appData" idColumn="ID">
      <data xid="default4">[]</data>  
      <column label="ID" name="ID" type="String" xid="default8"/>  
      <column label="AppName" name="AppName" type="String" xid="default9"/>  
      <column label="Checked" name="Checked" type="Boolean" xid="default10"/>
    </div>
  </div>  
  <div xid="serverDiv"> 
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
      xid="labelInput1"> 
      <label class="x-label" xid="label2"><![CDATA[服务地址：]]></label>  
      <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
        xid="serverURL" placeHolder="例：http://ip:port，不设置则为本地"/>
    </div>
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
      xid="labelInput3"> 
      <label class="x-label" xid="label6"><![CDATA[首页：]]></label>
      <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
        xid="indexURL" placeHolder="例：/webPath/UI2/resName/index.w 或 /index.html"/>
    </div>
    <label xid="label1" class="x-label" style="width:100%;"><![CDATA[选择需要打包的资源：]]></label>
  </div>  
  <textarea class="form-control x-edit" component="$UI/system/components/justep/textarea/textarea" xid="uiResDirs" readonly="true"></textarea><div xid="uiResDirsTree" style="overflow-y:auto;visibility:hidden;">
  </div>
  <!--   
  <div xid="div1" style="margin-left: 60px; float: left;"><div style='margin-top: 10px;'><div xid='jqxCheckBox'>Three Check States</div></div></div>
  -->
  </div>
