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
    xid="form"><div component="$UI/system/components/justep/excelLayout/excelLayout"
          class="x-excel-layout" style="width:100%; height: 100%;" xid="excelLayout"
          src="{{fileName}}">{{#each form}}
          <label xid="T{{form_field}}L" bind-text="{{form_data}}.label('{{form_field}}')"/>{{#if form_selectDataID}}
          <select xid="T{{form_field}}F" class="form-control xui-autofill" component="$UI/system/components/justep/select/select"
            bind-ref="{{form_data}}.ref('{{form_refID}}')" bind-labelRef="{{form_data}}.ref('{{form_field}}')"
            bind-options="{{form_selectDataID}}" bind-optionsLabel="{{form_selectLabelName}}"
            bind-optionsValue="{{form_selectConcept}}" bind-optionsCaption="请选择..."/>{{else}}{{#if form_password}}
          <input xid="T{{form_field}}F" component="$UI/system/components/justep/input/password"
            class="form-control x-edit xui-autofill" data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{#if form_range}}
          <input xid="T{{form_field}}F" component="$UI/system/components/justep/input/range"
            class="x-edit xui-autofill" bind-ref="{{form_data}}.ref('{{form_field}}')" min="-10000"
            max="10000"/>{{/if}}{{#if form_output}}
          <output xid="T{{form_field}}F" class="form-control xui-autofill" component="$UI/system/components/justep/output/output"
            bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{#if form_textarea}}
          <textarea xid="T{{form_field}}F" class="form-control xui-autofill" component="$UI/system/components/justep/textarea/textarea"
            bind-ref="{{form_data}}.ref('{{form_field}}')"/> {{/if}}{{#if form_input}}
          <input xid="T{{form_field}}F" class="form-control xui-autofill" component="$UI/system/components/justep/input/input"
            bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{/if}} {{/each}}
        </div>
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
