<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window demo-simpleData" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:281px;top:352px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="userData" idColumn="fID" onCustomRefresh="userDataCustomRefresh" onCustomSave="userDataCustomSave"
      limit="5"> 
      <column label="fID" name="fID" type="String" xid="default1"/>  
      <column label="fName" name="fName" type="String" xid="default2"/>  
      <column label="fPhoneNumber" name="fPhoneNumber" type="String" xid="default3"/>  
      <column label="fAddress" name="fAddress" type="String" xid="default4"/>  
      <column label="orderCount" name="orderCount" type="Integer" xid="default5"/>
    </div> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="orderData" idColumn="fID" onCustomRefresh="orderDataCustomRefresh" limit="5">
   <column label="fID" name="fID" type="String" xid="column2"></column>
   <column label="fCreateTime" name="fCreateTime" type="DateTime" xid="column3"></column>
   <column label="fContent" name="fContent" type="String" xid="column4"></column>
   <column label="fSum" name="fSum" type="Float" xid="column5"></column>
   <column label="fUserID" name="fUserID" type="String" xid="column1"></column>
   <column label="fUserName" name="fUserName" type="String" xid="default6"></column>
   <column label="fPhoneNumber" name="fPhoneNumber" type="String" xid="default7"></column>
   <column label="fAddress" name="fAddress" type="String" xid="default8"></column>
  <master xid="default9" data="userData" relation="fUserID"></master></div></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="主从数据"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="button" xid="button5" onClick="{operation:'window.close'}"> 
            <i xid="i9"/>  
            <span xid="span9"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            xid="button4" onClick="{operation:'userData.save'}"> 
            <i xid="i4"/>  
            <span xid="span4"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">主从数据</div>  
        <div class="x-titlebar-right reverse" xid="div3"> 
          </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
        active="0" xid="contents1"> 
        <div class="x-contents-content" xid="masterContent"> 
          <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1">
   <div class="x-scroll-content" xid="div6">
    <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" data="userData">
     <ul class="x-list-template" xid="listTemplateUl1">
      <li xid="li1" bind-css="{'bg-info' : $object == $model.userData.getCurrentRow()}">
       <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
        <div class="x-col x-col-67" xid="col1">
         <div component="$UI/system/components/justep/output/output" class="x-output text-primary" xid="output3" bind-ref="ref('fID')"></div></div> 
        <div class="x-col" xid="col2">
         <div component="$UI/system/components/justep/output/output" class="x-output text-danger" xid="output1" bind-text="'订单数：' + val('orderCount')"></div></div> </div> 
       <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3">
        <div class="x-col x-col-67" xid="col4">
         <input component="$UI/system/components/justep/input/input" class="form-control" xid="input1" bind-ref="ref('fName')"></input></div> 
        <div class="x-col" xid="col5">
         <input component="$UI/system/components/justep/input/input" class="form-control" xid="input2" bind-ref="ref('fPhoneNumber')"></input></div> </div> 
       <div component="$UI/system/components/justep/row/row" class="x-row" xid="row4">
        <div class="x-col" xid="col14">
         <input component="$UI/system/components/justep/input/input" class="form-control" xid="input3" bind-ref="ref('fAddress')"></input></div> </div> </li> </ul> </div> </div> 
   <div class="x-content-center x-pull-up" xid="div7">
    <span class="x-pull-up-label" xid="span5">加载更多...</span></div> </div></div>  
        <div class="x-contents-content" xid="detailContent"> 
          <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView2">
   <div class="x-scroll-content" xid="div5">
    <div component="$UI/system/components/justep/list/list" class="x-list" xid="list2" data="orderData">
     <ul class="x-list-template" xid="listTemplateUl2">
      <li xid="li2" bind-css="{'bg-info' : $object == $model.userData.getCurrentRow()}">
       <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5">
        <div class="x-col x-col-33" xid="col7">
         <div component="$UI/system/components/justep/output/output" class="x-output text-info" xid="output8" bind-ref="ref('fUserName')"></div></div> 
        <div class="x-col" xid="col8">
         <div component="$UI/system/components/justep/output/output" class="x-output" xid="output9" bind-ref='ref("fCreateTime")'></div></div> </div> 
       <div component="$UI/system/components/justep/row/row" class="x-row" xid="row6">
        <div class="x-col x-col-33" xid="col6">
         <input component="$UI/system/components/justep/input/input" class="form-control" xid="input4" bind-ref="ref('fPhoneNumber')"></input></div> 
        <div class="x-col" xid="col3">
         <input component="$UI/system/components/justep/input/input" class="form-control" xid="input5" bind-ref="ref('fAddress')"></input></div> </div> 
       <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
        <div class="x-col" xid="col9">
         <input component="$UI/system/components/justep/input/input" class="form-control" xid="input6" bind-ref="ref('fContent')"></input></div> </div> </li> </ul> </div> </div> 
   <div class="x-content-center x-pull-up" xid="div4">
    <span class="x-pull-up-label" xid="span2">加载更多...</span></div> </div></div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group btn-group-justified"
        tabbed="true" xid="buttonGroup1" style="height:48px;" selected="masterButton"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="主表（用户）" xid="masterButton" target="masterContent"> 
          <i xid="i5"/>  
          <span xid="span6">主表（用户）</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="从表（订单）" xid="detailButton" target="detailContent"> 
          <i xid="i7"/>  
          <span xid="span7">从表（订单）</span> 
        </a> 
      </div> 
    </div> 
  </div> 
</div>
