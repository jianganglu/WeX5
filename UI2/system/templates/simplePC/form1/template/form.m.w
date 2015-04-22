<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;">{{#each datas}}
    <div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="true" concept="{{data_concept}}" orderBy="{{data_orderBy}}"
      columns="{{data_relations}}" onSaveCommit="saveCommit"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/>  
      <calculateRelation relation="calcCheckBox"/> 
    </div>{{/each}}
  </div>  
  <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar"
    xid="toolBar1"> 
    <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group"
      tabbed="false" xid="bar"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="button1" onClick="{operation:'{{form_data}}.new'}"> 
        <i xid="i1"/>  
        <span xid="span1"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="button2" onClick="{operation:'{{form_data}}.save'}"> 
        <i xid="i2"/>  
        <span xid="span2"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="button3" onClick="{operation:'{{form_data}}.refresh'}"> 
        <i xid="i3"/>  
        <span xid="span3"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="button4" onClick="{operation:'{{form_data}}.firstRow'}"> 
        <i xid="i4"/>  
        <span xid="span4"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="button5" onClick="{operation:'{{form_data}}.prevRow'}"> 
        <i xid="i5"/>  
        <span xid="span5"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="button6" onClick="{operation:'{{form_data}}.nextRow'}"> 
        <i xid="i6"/>  
        <span xid="span6"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="button7" onClick="{operation:'{{form_data}}.lastRow'}"> 
        <i xid="i7"/>  
        <span xid="span7"/> 
      </a> 
    </div> 
  </div>  
  <div class="form-horizontal" style="margin:15px" component="$UI/system/components/bootstrap/form/form">{{#each form1}}
    <div class="form-group"> 
      <div class="col-sm-2"> 
        <label class="control-label" bind-text="{{form_data}}.label('{{fieldName1}}')"/> 
      </div>  
      <div class="col-sm-4">{{#if form_selectDataID}} 
        <select class="form-control" component="$UI/system/components/justep/select/select"
          bind-ref="{{form_data}}.ref('{{form_refID}}')" bind-labelRef="{{form_data}}.ref('{{fieldName1}}')"
          bind-options="{{form_selectDataID}}" bind-optionsLabel="{{form_selectLabelName}}"
          bind-optionsValue="{{form_selectConcept}}" bind-optionsCaption="请选择..."/>{{else}}{{#if passwordfieldName1}}
        <input component="$UI/system/components/justep/input/password" class="form-control x-edit"
          data="{{form_data}}" bind-ref="{{form_data}}.ref('{{fieldName1}}')"/>{{/if}}{{#if rangefieldName1}}
        <input component="$UI/system/components/justep/input/range" class="x-edit"
          bind-ref="{{form_data}}.ref('{{fieldName1}}')" min="-10000" max="10000"/>{{/if}}{{#if outputfieldName1}}
        <span class="x-output" component="$UI/system/components/justep/output/output"
          data="{{form_data}}" bind-ref="{{form_data}}.ref('{{fieldName1}}')"/>{{/if}}{{#if textfieldName1}}
        <textarea class="form-control" component="$UI/system/components/justep/textarea/textarea"
          data="{{form_data}}" bind-ref="{{form_data}}.ref('{{fieldName1}}')"/> {{/if}}{{#if inputfieldName1}}
        <input class="form-control" component="$UI/system/components/justep/input/input"
          data="{{form_data}}" bind-ref="{{form_data}}.ref('{{fieldName1}}')"/>{{/if}}{{/if}}
      </div>{{#if fieldName2}} 
      <div class="col-sm-2"> 
        <label class="control-label" bind-text="{{form_data}}.label('{{fieldName2}}')"/> 
      </div>  
      <div class="col-sm-4">{{#if form_selectDataID}} 
        <select class="form-control" component="$UI/system/components/justep/select/select"
          bind-ref="{{form_data}}.ref('{{form_refID}}')" bind-labelRef="{{form_data}}.ref('{{fieldName2}}')"
          bind-options="{{form_selectDataID}}" bind-optionsLabel="{{form_selectLabelName}}"
          bind-optionsValue="{{form_selectConcept}}" bind-optionsCaption="请选择..."/>{{else}}{{#if passwordfieldName2}}
        <input component="$UI/system/components/justep/input/password" class="form-control x-edit"
          data="{{form_data}}" bind-ref="{{form_data}}.ref('{{fieldName2}}')"/>{{/if}}{{#if rangefieldName2}}
        <input component="$UI/system/components/justep/input/range" class="x-edit"
          bind-ref="{{form_data}}.ref('{{fieldName2}}')" min="-10000" max="10000"/>{{/if}}{{#if outputfieldName2}}
        <span class="x-output" component="$UI/system/components/justep/output/output"
          data="{{form_data}}" bind-ref="{{form_data}}.ref('{{fieldName2}}')"/>{{/if}}{{#if textfieldName2}}
        <textarea class="form-control" component="$UI/system/components/justep/textarea/textarea"
          data="{{form_data}}" bind-ref="{{form_data}}.ref('{{fieldName2}}')"/> {{/if}}{{#if inputfieldName2}}
        <input class="form-control" component="$UI/system/components/justep/input/input"
          data="{{form_data}}" bind-ref="{{form_data}}.ref('{{fieldName2}}')"/>{{/if}}{{/if}}
      </div>{{/if}}
    </div>{{/each}}
  </div> 
</div>
