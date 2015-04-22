<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:463px;top:331px;"> 
    <div component="$UI/system/components/justep/data/bizData" xid="listData"
      concept="SA_OPOrg" autoLoad="true"> 
      <reader xid="default4" action="/system/logic/action/queryOrgAction"/> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver"
    xid="windowReceiver" style="top:2px;left:606px;" onReceive="windowReceiverReceive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top2"> 
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row1"> 
        <div class="col col-xs-6 col-md-4" xid="col1">
          <div component="$UI/system/components/justep/smartFilter/smartFilter" xid="smartFilter1" filterData="listData" filterCols="sName,sCode">
   
   <input type="text" class="form-control" placeholder="搜索" data-bind="valueUpdate: ['input', 'afterkeydown']" bind-value="$model.comp($element.parentElement).searchText" bind-change="$model.comp($element.parentElement).onInputChange.bind($model.comp($element.parentElement))" xid="input1"></input>
   </div></div>  
        <div class="col col-xs-6 col-md-8" xid="col3">
          <div component="$UI/system/components/justep/button/buttonGroup"
            class="btn-group pull-right" tabbed="true" xid="buttonGroup2">
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
              xid="preBtn" onClick="{&quot;operation&quot;:&quot;listData.prevPage&quot;}"> 
              <i xid="i5"/>  
              <span xid="span5">上页</span>
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
              xid="nextBtn" onClick="{&quot;operation&quot;:&quot;listData.nextPage&quot;}"> 
              <i xid="i6"/>  
              <span xid="span6">下页</span>
            </a>
          </div>
        </div>
      </div>
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div style="height:100%;" xid="searchDiv" class="x-bordered"> 
        <div component="$UI/system/components/justep/dataTables/dataTables"
          flexibleWidth="true" data="listData" rowActiveClass="active" class="table"
          xid="dataTables" scrollCollapse="false" ordering="false" lengthMenu="20"
          onRowSelect="dataTablesRowSelect"> 
          <columns> 
            <column name="sName"/> 
          </columns> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1" height="42"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label x-dialog-button"
        label="取消" xid="cancelBtn" onClick="{&quot;operation&quot;:&quot;windowReceiver.windowCancel&quot;}"> 
        <i xid="i2"/>  
        <span xid="span2">取消</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-primary x-dialog-button"
        label="确定" xid="OKBtn" onClick="OKBtnClick" bind-enable="canOK"> 
        <i xid="i1"/>  
        <span xid="span1">确定</span> 
      </a> 
    </div> 
  </div> 
</div>
