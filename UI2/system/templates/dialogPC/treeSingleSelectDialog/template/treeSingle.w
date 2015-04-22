<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:463px;top:331px;">{{#each datas}} 
    <div component="$UI/system/components/justep/data/bizData" xid="dialogData"
      autoLoad="true" autoNew="false" concept="{{data_concept}}" columns="{{data_relations}}"
      isTree="true"> 
      <reader action="{{data_reader}}"/>{{/each}}{{#each tree}}
      <treeOption parentRelation="{{parent_relation}}" nodeKindRelation="{{node_kindRelation}}"
        rootFilter="{{root_filter}}"/>{{/each}}
    </div>{{#each datas}}
    <div component="$UI/system/components/justep/data/bizData" xid="searchData"
      autoLoad="true" autoNew="false" concept="{{data_concept}}" isTree="false"> 
      <reader action="{{data_reader}}"/> 
    </div>{{/each}}
  </div>  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver"
    xid="windowReceiver" style="top:2px;left:606px;" onReceive="windowReceiverReceive"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top2"> 
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        xid="row1"> 
        <div class="col col-xs-6 col-md-4" xid="col1"> {{#each tree}}
          <div component="$UI/system/components/justep/smartFilter/smartFilter"
            xid="smartFilter1" filterData="dialogData" filterCols="{{tree_nodeName}}" onFilter="smartFilterFilter"> 
            <input type="text" class="form-control" placeholder="搜索" data-bind="valueUpdate: ['input', 'afterkeydown']"
              bind-value="$model.comp($element.parentElement).searchText" bind-change="$model.comp($element.parentElement).onInputChange.bind($model.comp($element.parentElement))"
              xid="input1"/> 
          </div> {{/each}}
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div style="height:100%;overflow-x: hidden;" bind-visible="!showFilterGird.get()" class="x-bordered">{{#each tree}} 
        <div component="$UI/system/components/justep/grid/grid" appearance="tree"
          data="dialogData" expandColumn="{{tree_nodeName}}" useVirtualRoot="true"
          virtualRootLabel="{{root_nodeLable}}" xid="treeGrid" class="x-grid-no-bordered"
          height="auto" width="100%" onRowClick="treeGridRowClick"> 
          <columns xid="columns2"> 
            <column name="{{tree_nodeName}}"/> 
          </columns> 
        </div>{{/each}}
      </div>  
      <div class="x-bordered" style="display:none;height:0;" bind-visible="showFilterGird"
        xid="searchDiv"> 
        <div component="$UI/system/components/justep/dataTables/dataTables"
          flexibleWidth="true" data="searchData" rowActiveClass="active" class="table"
          xid="searchGrid" scrollCollapse="false" ordering="false" lengthMenu="20"
          onRowSelect="searchGridRowSelect"> 
          <columns>{{#each tree}}
            <column name="{{tree_nodeName}}"/>{{/each}}
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
