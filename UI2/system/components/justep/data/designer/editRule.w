<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window container-fluid">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:107px;top:110px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="data" idColumn="name"> 
      <column name="name" type="String" label="名称" xid="column1"/>  
      <column name="type" type="String" label="类型" xid="column2"/>  
      <column name="displayName" type="String" label="显示名称" xid="column3"/>  
      <column name="readonly" type="String" label="只读规则" xid="column4"/>  
      <column name="calculate" type="String" label="计算规则" xid="column5"/>  
      <column name="required" type="String" label="必填规则" xid="column6"/>  
      <column name="requiredMessage" type="String" label="必填规则提示信息" xid="column7"/>  
      <column name="constraint" type="String" label="约束规则" xid="column8"/>  
      <column name="constraintMessage" type="String" label="约束规则提示信息" xid="column9"/> 
    </div> 
  </div>
  
  <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter">  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
      xid="labelEdit1"> 
      <label class="x-label" xid="label1">Data只读：</label>  
      <div class="x-edit" xid="div1"> 
        <div class="input-group"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="dataReadonly" placeHolder="只读表达式"/>  
          <span class="input-group-btn"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="设置" xid="dataReadonlyExpr" onClick="dataReadonlyExprClick"> 
              <i/>  
              <span>设置</span> 
            </a> 
          </span> 
        </div> 
      </div> 
    </div> 
  </div>
    
  <div component="$UI/system/components/bootstrap/row/row" class="row"> 
    <div class="col col-xs-6 col-spliter-right" style="overflow: auto;height:400px;"> 
      <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true"
        rowActiveClass="active" class="table table-hover table-striped" xid="dataTables1"
        data="data"> 
        <columns xid="columns1">
          <column name="name" xid="column10" orderable="false"/>  
          <column name="displayName" xid="column11" orderable="false"/>
        </columns>
      </div> 
    </div>  
    <div class="col col-xs-6"> 
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"> 
        <label class="x-label">只读：</label>  
        <div class="x-edit"> 
          <div class="input-group"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="readonly" placeHolder="只读表达式" bind-ref="data.ref('readonly')"/>  
            <span class="input-group-btn"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-default"
                label="设置" xid="readonlyExpr" onClick="readonlyExprClick"> 
                <i/>  
                <span>设置</span> 
              </a> 
            </span> 
          </div> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"> 
        <label class="x-label">计算：</label>  
        <div class="x-edit"> 
          <div class="input-group"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="calculate" placeHolder="计算表达式" bind-ref="data.ref('calculate')"/>  
            <span class="input-group-btn"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-default"
                label="设置" xid="calculateExpr" onClick="calculateExprClick"> 
                <i/>  
                <span>设置</span> 
              </a> 
            </span> 
          </div> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"> 
        <label class="x-label">必填：</label>  
        <div class="x-edit"> 
          <div class="input-group"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="required" placeHolder="必填规则表达式" bind-ref="data.ref('required')"/>  
            <span class="input-group-btn"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-default"
                label="设置" xid="requiredExpr" onClick="requiredExprClick"> 
                <i/>  
                <span>设置</span> 
              </a> 
            </span> 
          </div> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"> 
        <label class="x-label"/>  
        <div class="x-edit"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="required_message" placeHolder="必填规则提示信息" bind-ref="data.ref('requiredMessage')"/> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"> 
        <label class="x-label">约束：</label>  
        <div class="x-edit"> 
          <div class="input-group"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="constraint" placeHolder="约束规则表达式" bind-ref="data.ref('constraint')"/>  
            <span class="input-group-btn"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-default"
                label="设置" xid="constraintExpr" onClick="constraintExprClick"> 
                <i/>  
                <span>设置</span> 
              </a> 
            </span> 
          </div> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"> 
        <label class="x-label"/>  
        <div class="x-edit"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="constraint_message" placeHolder="约束规则提示信息" bind-ref="data.ref('constraintMessage')"/> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
