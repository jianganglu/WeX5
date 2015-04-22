<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:380px;top:216px;">{{#each datas}}
    <div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="false" autoNew="true" concept="{{data_concept}}"
      columns="{{data_relations}}"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/> 
    </div>{{/each}}{{#each detaildatas}}
    <div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="true" autoNew="false" concept="{{data_concept}}"
      columns="{{data_relations}}"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/>  
      <master xid="default1" data="mainData" relation="{{masterColumn}}"/> 
    </div>{{/each}}
  </div>  
  <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    xid="moreMenu" opacity="0" anchor="moreBtn" direction="left-bottom"> 
    <div class="x-popMenu-overlay" xid="moreMenuOverlay"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="moreContent"> 
      <li class="x-menu-item" xid="backItem"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-icon-left"
          xid="backBtn" onClick="{operation:'process.back'}"> 
          <i xid="i8"/>  
          <span xid="span6"/> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="suspendItem"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-icon-left"
          xid="suspendBtn" onClick="{operation:'process.suspend'}"> 
          <i xid="i3"/>  
          <span xid="span3"/> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="abortItem"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-icon-left"
          xid="abortBtn" onClick="{operation:'process.abort'}"> 
          <i xid="i4"/>  
          <span xid="span4"/> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="chartItem"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-icon-left"
          xid="chartBtn" onClick="{operation:'process.showChart'}"> 
          <i xid="i5"/>  
          <span xid="span5"/> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="recordItem"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="recordBtn" onClick="{operation:'process.processRecord'}"> 
          <i xid="i55"/>  
          <span xid="span55"/> 
        </a> 
      </li> 
    </ul> 
  </div>  
  <div component="$UI/system/components/justep/process/process" xid="process"
    data="mainData" style="width:24px;height:5px;left:184px;top:769px;"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="selectDialog.w" height="400px" status="normal" onReceive="productDialogReceive"> 
    <result concept="detailData" operation="edit" origin="dialogData" xid="default10">{{#each detaildatas}}
      <mapping from="{{data_concept}}" to="{{data_concept}}" locator="true" xid="{{data_concept}}M"/>{{/each}}{{#each detail_list}}
      <mapping from="{{list_field1}}" to="{{list_field1}}" xid="{{list_field1}}M"/>{{#if list_field2}}
      <mapping from="{{list_field2}}" to="{{list_field2}}" xid="{{list_field2}}M"/>{{/if}} {{/each}}
    </result> 
  </span>  
  <div xid="view"> 
    <div class="form-horizontal container-fluid" component="$UI/system/components/bootstrap/form/form"
      xid="mainForm"> 
      <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter form-inline"
        xid="processBar"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="advanceBtn" onClick="{operation:'process.advance'}"> 
          <i xid="i2"/>  
          <span xid="span2">流转</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="saveBtn" onClick="{operation:'{{form_data}}.save'}"> 
          <i xid="i1"/>  
          <span xid="span1"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left btn-only-label"
          label="更多" xid="moreBtn" onClick="{operation:'moreMenu.show'}"> 
          <i xid="i15"/>  
          <span xid="span15">更多</span> 
        </a> 
      </div> {{#each form1}} 
      <div xid="formGroup{{@index}}" class="form-group"> 
        <div xid="col{{addOne @index}}1" class="col-sm-2"> 
          <label xid="{{fieldName1}}L" class="control-label" bind-text="{{form_data}}.label('{{fieldName1}}')"/> 
        </div>  
        <div xid="col{{addOne @index}}2" class="col-sm-4">{{#if form_selectDataID}}
          <select xid="{{fieldName1}}" class="form-control" component="$UI/system/components/justep/select/select"
            bind-ref="{{form_data}}.ref('{{form_refID}}')" bind-labelRef="{{form_data}}.ref('{{fieldName1}}')"
            bind-options="{{form_selectDataID}}" bind-optionsLabel="{{form_selectLabelName}}"
            bind-optionsValue="{{form_selectConcept}}" bind-optionsCaption="请选择..."/>{{else}}{{#if passwordfieldName1}}
          <input xid="{{fieldName1}}" component="$UI/system/components/justep/input/password"
            class="form-control x-edit" bind-ref="{{form_data}}.ref('{{fieldName1}}')"/>{{/if}}{{#if rangefieldName1}}
          <input xid="{{fieldName1}}" component="$UI/system/components/justep/input/range"
            class="x-edit" bind-ref="{{form_data}}.ref('{{fieldName1}}')" min="-10000"
            max="10000"/>{{/if}}{{#if outputfieldName1}}
          <output xid="{{fieldName1}}" component="$UI/system/components/justep/output/output"
            class="form-control" bind-ref="{{form_data}}.ref('{{fieldName1}}')"/>{{/if}}{{#if textfieldName1}}
          <textarea xid="{{fieldName1}}" class="form-control" component="$UI/system/components/justep/textarea/textarea"
            bind-ref="{{form_data}}.ref('{{fieldName1}}')"/> {{/if}}{{#if inputfieldName1}}
          <input xid="{{fieldName1}}" class="form-control" component="$UI/system/components/justep/input/input"
            bind-ref="{{form_data}}.ref('{{fieldName1}}')"/>{{/if}}{{/if}}
        </div> {{#if fieldName2}}
        <div xid="col{{addOne @index}}3" class="col-sm-2"> 
          <label xid="{{fieldName2}}L" class="control-label" bind-text="{{form_data}}.label('{{fieldName2}}')"/> 
        </div>  
        <div xid="col{{addOne @index}}4" class="col-sm-4">{{#if form_selectDataID}}
          <select xid="{{fieldName2}}" class="form-control" component="$UI/system/components/justep/select/select"
            bind-ref="{{form_data}}.ref('{{form_refID}}')" bind-labelRef="{{form_data}}.ref('{{fieldName2}}')"
            bind-options="{{form_selectDataID}}" bind-optionsLabel="{{form_selectLabelName}}"
            bind-optionsValue="{{form_selectConcept}}" bind-optionsCaption="请选择..."/>{{else}}{{#if passwordfieldName2}}
          <input xid="{{fieldName2}}" component="$UI/system/components/justep/input/password"
            class="form-control x-edit" bind-ref="{{form_data}}.ref('{{fieldName2}}')"/>{{/if}}{{#if rangefieldName2}}
          <input xid="{{fieldName2}}" component="$UI/system/components/justep/input/range"
            class="x-edit" bind-ref="{{form_data}}.ref('{{fieldName2}}')" min="-10000"
            max="10000"/>{{/if}}{{#if outputfieldName2}}
          <span xid="{{fieldName2}}" component="$UI/system/components/justep/output/output"
            class="form-control" bind-ref="{{form_data}}.ref('{{fieldName2}}')"/>{{/if}}{{#if textfieldName2}}
          <textarea xid="{{fieldName2}}" class="form-control" component="$UI/system/components/justep/textarea/textarea"
            data="{{form_data}}" bind-ref="{{form_data}}.ref('{{fieldName2}}')"/> {{/if}}{{#if inputfieldName2}}
          <input xid="{{fieldName2}}" class="form-control" component="$UI/system/components/justep/input/input"
            bind-ref="{{form_data}}.ref('{{fieldName2}}')"/>{{/if}}{{/if}}
        </div> {{/if}}
      </div> {{/each}}
    </div>  
    <div component="$UI/system/components/justep/controlGroup/controlGroup"
      xid="detailCG" class="x-control-group" title="{{detail_title}}" collapsible="true"> 
      <div class="x-control-group-title"> 
        <span xid="span7">title</span> 
      </div>  
      <div> 
        <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter form-inline"
          xid="listBar"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="addBtn" icon="icon-plus" label="添加" onClick="addProductBtnClick"> 
            <i xid="i6" class="icon-plus"/>  
            <span xid="span10">添加</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            label="编辑" xid="editBtn" icon="icon-edit" onClick="editProductBtnClick"
            bind-enable="$model.hasOrderDetail()"> 
            <i xid="i9" class="icon-edit"/>  
            <span xid="span13">编辑</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="deleteBtn" onClick="{operation:'detailData.delete'}"> 
            <i xid="i7"/>  
            <span xid="span11">删除</span> 
          </a> 
        </div>  
        <div component="$UI/system/components/justep/dataTables/dataTables"
          flexibleWidth="true" class="table table-condensed table-hover" xid="detailTable"
          data="{{detail_data}}" pagingType="simple" rowActiveClass="active" onRowDblClick="editProductBtnClick"> 
          <columns xid="column">{{#each detail_list}}
            <column name="{{list_field1}}" label="{{list_field1Label}}"/> {{#if list_field2}}
            <column name="{{list_field2}}" label="{{list_field2Label}}"/> {{/if}} {{/each}}
          </columns> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
