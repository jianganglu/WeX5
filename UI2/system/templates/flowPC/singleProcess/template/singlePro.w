<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;">{{#each datas}}
    <div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="false" concept="{{data_concept}}" orderBy="{{data_orderBy}}"
      columns="{{data_relations}}" autoNew="true"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/> 
    </div>{{/each}}
  </div>  
  <div component="$UI/system/components/justep/process/process" xid="process"
    data="{{form_data}}"/>  
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
  <div xid="view"> 
    <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter form-inline"
      xid="mainBar"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="advanceBtn" onClick="{operation:'process.advance'}"> 
          <i xid="i2"/>  
          <span xid="span2"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="saveBtn" onClick="{operation:'{{form_data}}.save'}"> 
          <i xid="i1"/>  
          <span xid="span1"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left btn-only-label"
          label="更多" xid="moreBtn" onClick="{operation:'moreMenu.show'}" icon="icon-ios7-more"> 
          <i xid="i15" class="icon-ios7-more"/>  
          <span xid="span15">更多</span> 
        </a> 
    </div>  
    <div xid="content"> 
      <h1 xid="h11" class="text-center">{{form_title}}</h1>  
      <div xid="mainForm" class="form-horizontal container-fluid" component="$UI/system/components/bootstrap/form/form">{{#each form1}} 
        <div xid="formGroup{{addOne @index}}" class="form-group"> 
          <div xid="col{{addOne @index}}1" class="col-sm-2"> 
            <label xid="{{fieldName1}}L" class="control-label" bind-text="{{form_data}}.label('{{fieldName1}}')"/> 
          </div>  
          <div xid="col{{addOne @index}}2" class="col-sm-4">{{#if form_selectDataID}}
            <select class="form-control" component="$UI/system/components/justep/select/select"
              bind-ref="{{form_data}}.ref('{{form_refID}}')" bind-labelRef="{{form_data}}.ref('{{fieldName1}}')"
              bind-options="{{form_selectDataID}}" bind-optionsLabel="{{form_selectLabelName}}"
              bind-optionsValue="{{form_selectConcept}}" bind-optionsCaption="请选择..."/>{{else}}{{#if passwordfieldName1}}
            <input component="$UI/system/components/justep/input/password" class="form-control x-edit"
              data="{{form_data}}" bind-ref="{{form_data}}.ref('{{fieldName1}}')"/>{{/if}}{{#if rangefieldName1}}
            <input component="$UI/system/components/justep/input/range" class="x-edit"
              bind-ref="{{form_data}}.ref('{{fieldName1}}')" min="-10000" max="10000"/>{{/if}}{{#if outputfieldName1}}
            <output class="x-output" component="$UI/system/components/justep/output/output"
              data="{{form_data}}" bind-ref="{{form_data}}.ref('{{fieldName1}}')"/>{{/if}}{{#if textfieldName1}}
            <textarea class="form-control" component="$UI/system/components/justep/textarea/textarea"
              bind-ref="{{form_data}}.ref('{{fieldName1}}')"/> {{/if}}{{#if inputfieldName1}}
            <input class="form-control" component="$UI/system/components/justep/input/input"
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
            <input xid="{{fieldName2}}" component="$UI/system/components/justep/input/password" class="form-control x-edit"
              bind-ref="{{form_data}}.ref('{{fieldName2}}')"/>{{/if}}{{#if rangefieldName2}}
            <input xid="{{fieldName2}}" component="$UI/system/components/justep/input/range" class="x-edit"
              bind-ref="{{form_data}}.ref('{{fieldName2}}')" min="-10000" max="10000"/>{{/if}}{{#if outputfieldName2}}
            <output xid="{{fieldName2}}" class="form-control" component="$UI/system/components/justep/output/output"
              data="{{form_data}}" bind-ref="{{form_data}}.ref('{{fieldName2}}')"/>{{/if}}{{#if textfieldName2}}
            <textarea xid="{{fieldName2}}" class="form-control" component="$UI/system/components/justep/textarea/textarea"
              bind-ref="{{form_data}}.ref('{{fieldName2}}')"/> {{/if}}{{#if inputfieldName2}}
            <input xid="{{fieldName2}}" class="form-control" component="$UI/system/components/justep/input/input"
              bind-ref="{{form_data}}.ref('{{fieldName2}}')"/>{{/if}}{{/if}}
          </div> {{/if}}
        </div> {{/each}}
      </div> 
    </div> 
  </div> 
</div>
