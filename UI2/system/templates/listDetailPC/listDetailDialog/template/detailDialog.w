<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model">{{#each dialogDatas}}
    <div component="$UI/system/components/justep/data/bizData" xid="dialogData"
      directDelete="true" autoLoad="true" concept="{{data_concept}}"
      columns="{{data_relations}}" autoNew="false"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/>  
      <calculateRelation relation="calcCheckBox"/>
    </div>{{/each}}
  </div>  
  <div class="form-horizontal container-fluid" component="$UI/system/components/bootstrap/form/form"
    xid="form">{{#each form1}}
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
      </div> {{#if fieldName2}} 
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
      </div> {{/if}}
    </div> {{/each}}
    
    <div class="x-panel-bottom" xid="bottom1" height="42"> 
      <a class="btn btn-link btn-only-label x-dialog-button" component="$UI/system/components/justep/button/button"
        label="取    消" onClick="cancelBtnClick" style="margin-left:30px;width:80px;"
        xid="cancelBtn"> 
        <i xid="i4_1"/>  
        <span xid="span4_1">取 消</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-primary x-dialog-button"
        label="确定" xid="OKBtn" onClick="okBtnClick"> 
        <i xid="i1"/>  
        <span xid="span1">确定</span> 
      </a> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver"
    xid="windowReceiver" onReceive="windowReceiverReceive"/>
</div>
