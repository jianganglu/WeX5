<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window">  
  <div component="$UI/system/components/justep/model/model" style="height:auto;left:520px;top:248px;" onLoad="model1Load"> 
    <div component="$UI/system/components/justep/data/bizData" xid="mainData"
      autoLoad="true" concept="DEMO_TABLE1" columns="DEMO_TABLE1,version,fString,fInteger,fFloat,fDecimal,fDate,fDateTime,fTime,fText,fParent,fString0"
      limit="10" isTree="false"> 
      <reader action="/demo/components/logic/action/queryDEMO_TABLE1Action"/>  
      <writer action="/demo/components/logic/action/saveDEMO_TABLE1Action"/>  
      <creator action="/demo/components/logic/action/createDEMO_TABLE1Action"/>  
      <treeOption xid="default14" parentRelation="fParent" delayLoad="true" nodeKindRelation="fString0"/>  
      <rule xid="rule1"> 
        <col name="fDecimal" xid="ruleCol2"> 
          <readonly xid="readonly2"> 
            <expr xid="default2">js:true</expr> 
          </readonly> 
        </col> 
      </rule> 
    </div> 
  </div> 
  <div data="mainData" component="$UI/system/components/justep/dataTables/dataTables" class="table table-striped table-hover x-dt-title-center" xid="example" lengthMenu="10,20,50,100" flexibleWidth="false" rowActiveClass="active" multiSelect="true" pageLength="20" useFooter="true">
	  <columns>
	  	<column name="fString" label="字符串" orderable="false" className="x-dt-title-center x-dt-cell-center" footerData="'记录数:'+$data.getTotal()">
	  	</column>
	  	<column name="fInteger" label="整形" className="x-dt-title-center x-dt-cell-right" footerData="'合计:'+$data.sum('fInteger')">
	  	</column>
	  	<column name="fDateTime" label="日期时间" format="yyyy-MM-dd hh:mm">
	  	</column>
	  <column name="fFloat" xid="column1" className="x-dt-title-center x-dt-cell-right"></column>
  <column name="fDecimal" xid="column2" className="x-dt-title-center x-dt-cell-right x-text-right"></column></columns>
  </div>
<div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid" xid="pagerBar1" data="mainData">
   <div class="row" xid="div1">
    <div class="col-sm-3" xid="div2">
     <div class="x-pagerbar-length" xid="div3">
      <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect" class="x-pagerlimitselect" xid="pagerLimitSelect1">
       <span xid="span1">显示</span>
       <select component="$UI/system/components/justep/select/select" class="form-control input-sm" xid="select1">
        <option value="10" xid="default1">10</option>
        <option value="20" xid="default3">20</option>
        <option value="50" xid="default4">50</option>
        <option value="100" xid="default5">100</option></select> 
       <span xid="span2">条</span></label> </div> </div> 
    <div class="col-sm-3" xid="div5">
     <div class="x-pagerbar-info" xid="div6">当前显示0条，共0条</div></div> 
    <div class="col-sm-6" xid="div7">
     <div class="x-pagerbar-pagination" xid="div8">
      <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination" xid="pagination1">
       <li class="prev" xid="li1">
        <a href="#" xid="a1">
         <span aria-hidden="true" xid="span3">«</span>
         <span class="sr-only" xid="span4">Previous</span></a> </li> 
       <li class="next" xid="li2">
        <a href="#" xid="a2">
         <span aria-hidden="true" xid="span10">»</span>
         <span class="sr-only" xid="span11">Next</span></a> </li> </ul> </div> </div> </div> </div><div xid="div4"><a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left" xid="button2" onClick='{"operation":"mainData.firstRow"}'>
   <i xid="i1"></i>
   <span xid="span5"></span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left" xid="button3" onClick='{"operation":"mainData.prevRow"}'>
   <i xid="i2"></i>
   <span xid="span6">上一条</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left" xid="button4" onClick='{"operation":"mainData.nextRow"}'>
   <i xid="i3"></i>
   <span xid="span7">下一条</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left" xid="button5" onClick='{"operation":"mainData.lastRow"}'>
   <i xid="i4"></i>
   <span xid="span8">最后条</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left" xid="button6" onClick='{"operation":"mainData.refresh"}'>
   <i xid="i5"></i>
   <span xid="span9"></span></a></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelInput1">
   <label class="x-label" xid="label1" bind-text="mainData.label('fString')"></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input1" bind-ref="mainData.ref('fString')"></input></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelInput2">
   <label class="x-label" xid="label2" bind-text="mainData.label('fInteger')"></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input2" bind-ref="mainData.ref('fInteger')"></input></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelInput3">
   <label class="x-label" xid="label3" bind-text="mainData.label('fDateTime')"></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input3" bind-ref="mainData.ref('fDateTime')"></input></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelInput4">
   <label class="x-label" xid="label4" bind-text="mainData.label('fFloat')"></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input4" bind-ref="mainData.ref('fFloat')"></input></div></div>
