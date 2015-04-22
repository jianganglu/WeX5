<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="width:106px;height:auto;left:502px;top:179px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="dataList" idColumn="col0" autoNew="true"> 
      <column label="dataid" name="col0" type="String" xid="default1"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="setting" idColumn="dataXid"> 
      <column label="dataId" name="dataXid" type="String" xid="default2"/>  
      <column label="布局类型 " name="layoutType" type="String" xid="default3"/>  
      <column label="列数" name="colNumber" type="Integer" xid="default4"/>  
      <data xid="default6">[{"layoutType":"form","colNumber":2}]</data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="layoutType" idColumn="name"> 
      <column label="名称" name="name" type="String" xid="default10"/>  
      <column label="文本" name="text" type="String" xid="default11"/>  
      <data xid="default14">[{"name":"form","text":"表单布局"},{"name":"cellLayout","text":"表格布局"},{"name":"absoluteLayout","text":"绝对布局"}]</data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="relationList" idColumn="name"> 
      <column label="关系名" name="name" type="String" xid="default21"/>  
      <column label="标签名 " name="label" type="String" xid="default22"/>  
      <column label="组件类型" name="compType" type="String" xid="default23"/>  
      <column label="数据类型" name="data-type" type="String" xid="default24"/>  
      <column label="选择" name="selected" type="Boolean" xid="default25"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="compType" idColumn="name"> 
      <column label="组件名" name="name" type="String" xid="default8"/>  
      <column label="描述" name="text" type="String" xid="default9"/>  
      <data xid="default15">[{&quot;name&quot;:&quot;$UI/system/components/justep/input/input&quot;,&quot;text&quot;:&quot;输入框&quot;},{&quot;name&quot;:&quot;$UI/system/components/justep/textarea/textarea&quot;,&quot;text&quot;:&quot;文本域&quot;},{&quot;name&quot;:&quot;$UI/system/components/justep/output/output&quot;,&quot;text&quot;:&quot;输出框&quot;},{&quot;name&quot;:&quot;$UI/system/components/justep/select/select&quot;,&quot;text&quot;:&quot;选择框&quot;},{&quot;name&quot;:&quot;$UI/system/components/justep/button/radio&quot;,&quot;text&quot;:&quot;单选框&quot;},{&quot;name&quot;:&quot;$UI/system/components/justep/button/checkbox&quot;,&quot;text&quot;:&quot;复选框&quot;}]</data></div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="colNums" idColumn="col0"> 
      <column name="col0" type="String" xid="default12"/>  
      <data xid="default13">[{"col0":"1"},{"col0":"2"},{"col0":"3"},{"col0":"4"},{"col0":"5"},{"col0":"6"}]</data> 
    </div> 
  </div>  
  <div component="$UI/system/components/fragment/form/controlGroupForm" xid="controlGroupForm2"/>  
  <div class="form-horizontal container-fluid" component="$UI/system/components/bootstrap/form/form"
    xid="form1"> 
    <div class="form-group" xid="formGroup1"> 
      <div class="col-sm-2" xid="col13"> 
        <label class="control-label" xid="controlLabel3"><![CDATA[选择data]]></label> 
      </div>  
      <div class="col-sm-2" xid="col14"> 
        <select component="$UI/system/components/justep/select/select" class="form-control"
          xid="select2" bind-options="dataList" bind-ref="setting.ref('dataXid')"
          onChange="select2Change" bind-optionsValue="col0"/> 
      </div>  
      <div class="col-sm-2" xid="col15"> 
        <label class="control-label" xid="controlLabel2"><![CDATA[布局类型]]></label> 
      </div>  
      <div class="col-sm-2" xid="col16"> 
        <select component="$UI/system/components/justep/select/select" class="form-control"
          xid="select4" bind-options="layoutType" bind-optionsLabel="text" bind-ref="setting.ref('layoutType')"
          bind-optionsValue="name"/> 
      </div>  
      <div class="col-sm-2" xid="col5"> 
        <label class="control-label" xid="controlLabel4"><![CDATA[列数]]></label> 
      </div>  
      <div class="col-sm-2" xid="col6"> 
        <select component="$UI/system/components/justep/select/select" class="form-control"
          xid="select5" bind-options="colNums" bind-optionsLabel="col0" bind-ref="setting.ref('colNumber')"
          bind-optionsValue="col0"/> 
      </div> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/list/list" class="x-list " data="relationList"
    xid="list1"> 
    <table class="table table-bordered table-hover table-striped" component="$UI/system/components/bootstrap/table/table"
      xid="table1"> 
      <thead xid="thead1"> 
        <tr xid="tr1"> 
          <th xid="col11">#</th>  
          <th xid="col12" style="text-align:center;"><![CDATA[关系名]]></th>  
          <th xid="col17" style="text-align:center;"><![CDATA[标签名]]></th>  
          <th xid="col18" style="text-align:center;"><![CDATA[组件类型]]></th>  
          <th xid="col19" style="width:100px;text-align:center;"> 
            <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
              xid="checkAll" onChange="checkAllChange"/> 
          </th> 
        </tr> 
      </thead>  
      <tbody class="x-list-template" xid="listTemplate1"> 
        <tr xid="tr2"> 
          <td xid="td1" bind-text=" $object.index()">1</td>  
          <td xid="td2" bind-text="ref('name')"/>  
          <td xid="td3" bind-text="ref('label')"/>  
          <td xid="td4" style="padding:2px"> 
            <select component="$UI/system/components/justep/select/select" class="form-control"
              xid="select1" bind-ref="ref('compType')" bind-options="$model.compType"
              bind-optionsValue="name" bind-optionsLabel="text" style="margin:0"/> 
          </td>  
          <td xid="td5" style="text-align:center;"> 
            <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
              xid="checkbox5" bind-ref="ref('selected')"/>  
            <!--             <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left" -->  
            <!--               label="下移" xid="down" icon="icon-chevron-down" onClick="downClick">  -->  
            <!--               <i class="icon-chevron-down" xid="i4"/>   -->  
            <!--               <span xid="span4">下移</span>  -->  
            <!--             </a> -->  
            <!--           <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left" label="上移" xid="up" icon="icon-chevron-up" onClick="upClick">  -->  
            <!--       <i class="icon-chevron-up" xid="i3" />   -->  
            <!--       <span xid="span3">上移</span>  -->  
            <!--     </a> --> 
          </td> 
        </tr> 
      </tbody> 
    </table> 
  </div> 
</div>
