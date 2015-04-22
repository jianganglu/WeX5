<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:260px;top:346px;">{{#each detailFormData}} 
    <div component="$UI/system/components/justep/data/bizData" xid="dialogData"
      concept="{{concept}}" columns="{{columns}}"> 
      <reader action="{{reader}}"/>  
      <writer action="{{writer}}"/>  
      <creator action="{{creator}}"/> 
    </div>{{/each}}
  </div>  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver"
    xid="windowReceiver" onReceive="windowReceiverReceive"/>  
  <div xid="view"> 
    <div class="form-horizontal container-fluid" component="$UI/system/components/bootstrap/form/form"> 
      {{#each detailForm}}
      <div class="form-group">
      <div class="col-sm-2"> 
            <label class="control-label" bind-text="dialogData.label('{{fieldName1}}')"></label> 
       </div>
       <div class="col-sm-4">
       	{{#if form_selectDataID}}
               <select class="form-control" component="$UI/system/components/justep/select/select" 
                 bind-ref="dialogData.ref('{{form_refID}}')" bind-labelRef="dialogData.ref('{{fieldName1}}')"
                 bind-options="{{form_selectDataID}}" bind-optionsLabel="{{form_selectLabelName}}" 
                 bind-optionsValue="{{form_selectConcept}}" bind-optionsCaption="请选择..."/>{{else}}{{#if passwordfieldName1}}
               <input component="$UI/system/components/justep/input/password"
                 class="form-control x-edit" data="dialogData" bind-ref="dialogData.ref('{{fieldName1}}')"/>{{/if}}{{#if rangefieldName1}}
               <input component="$UI/system/components/justep/input/range" class="x-edit"
                 bind-ref="dialogData.ref('{{fieldName1}}')" min="-10000" max="10000"/>{{/if}}{{#if outputfieldName1}}
               <span class="x-output" component="$UI/system/components/justep/output/output"
                 data="dialogData" bind-ref="dialogData.ref('{{fieldName1}}')"/>{{/if}}{{#if textfieldName1}}
               <textarea class="form-control" component="$UI/system/components/justep/textarea/textarea"
                 data="dialogData" bind-ref="dialogData.ref('{{fieldName1}}')"/> {{/if}}{{#if inputfieldName1}}
               <input class="form-control" component="$UI/system/components/justep/input/input"
                data="dialogData" bind-ref="dialogData.ref('{{fieldName1}}')"/>{{/if}}{{/if}} 
       </div> 
          {{#if fieldName2}}
          <div class="col-sm-2"> 
            <label class="control-label" bind-text="dialogData.label('{{fieldName2}}')"></label> 
          </div>
          <div class="col-sm-4">
       	{{#if form_selectDataID}}
               <select class="form-control" component="$UI/system/components/justep/select/select" 
                 bind-ref="dialogData.ref('{{form_refID}}')" bind-labelRef="dialogData.ref('{{fieldName2}}')"
                 bind-options="{{form_selectDataID}}" bind-optionsLabel="{{form_selectLabelName}}" 
                 bind-optionsValue="{{form_selectConcept}}" bind-optionsCaption="请选择..."/>{{else}}{{#if passwordfieldName2}}
               <input component="$UI/system/components/justep/input/password"
                 class="form-control x-edit" data="dialogData" bind-ref="dialogData.ref('{{fieldName2}}')"/>{{/if}}{{#if rangefieldName2}}
               <input component="$UI/system/components/justep/input/range" class="x-edit"
                 bind-ref="dialogData.ref('{{fieldName2}}')" min="-10000" max="10000"/>{{/if}}{{#if outputfieldName2}}
               <span class="x-output" component="$UI/system/components/justep/output/output"
                 data="dialogData" bind-ref="dialogData.ref('{{fieldName2}}')"/>{{/if}}{{#if textfieldName2}}
               <textarea class="form-control" component="$UI/system/components/justep/textarea/textarea"
                 data="dialogData" bind-ref="dialogData.ref('{{fieldName2}}')"/> {{/if}}{{#if inputfieldName2}}
               <input class="form-control" component="$UI/system/components/justep/input/input"
                data="dialogData" bind-ref="dialogData.ref('{{fieldName2}}')"/>{{/if}}{{/if}} 
       </div>  
          {{/if}}
      </div>{{/each}}   
      <div class="x-panel-bottom" style="text-align:right;padding-top:5px;"
        xid="panelPanel"> 
        <a class="btn btn-primary" component="$UI/system/components/justep/button/button"
          label="确    定" onClick="okBtnClick" style="margin-left:30px;width:80px;"
          xid="okBtn"> 
          <i xid="i3_1"/>  
          <span xid="span3_1">确 定</span> 
        </a>  
        <a class="btn btn-default" component="$UI/system/components/justep/button/button"
          label="取    消" onClick="cancelBtnClick" style="margin-left:30px;width:80px;"
          xid="cancelBtn"> 
          <i xid="i4_1"/>  
          <span xid="span4_1">取 消</span> 
        </a> 
      </div> 
    </div>
  </div> 
</div>
