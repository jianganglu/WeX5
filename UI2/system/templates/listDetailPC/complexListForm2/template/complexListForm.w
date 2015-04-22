<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:375px;top:94px;">{{#each datas}}
    <div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="true" concept="{{data_concept}}"
      columns="{{data_relations}}" autoNew="false" onSaveCommit="dataSaveCommit"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/>  
    </div>{{/each}}{{#each detaildatas}}
    <div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="true" concept="{{data_concept}}"
      columns="{{data_relations}}" autoNew="false"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/>  
      <calculateRelation relation="calcCheckBox"/> 
      <master xid="default1" data="mainData" relation="{{masterColumn}}"/>
    </div>{{/each}}
  </div>  
  <div xid="view"> 
    <div component="$UI/system/components/justep/controlGroup/controlGroup"
      class="x-control-group" title="{{form_title}}" xid="mainControlGroup" collapsible="true"> 
      <div class="x-control-group-title" xid="controlGroupTitle"> 
        <span xid="span2"/> 
      </div>  
      <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter" xid="listBar"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="newBtn" label="新建" onClick='{"operation":"{{form_data}}.new"}' bind-enable="$model.hasMainData"> 
          <i xid="i8"/>  
          <span xid="span8">新建</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="saveBtn" onClick='{"operation":"{{form_data}}.save"}' label="保存"> 
          <i xid="i71"/>  
          <span xid="span7">保存</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-icon-left"
          xid="refreshBtn" onClick="{operation:'{{form_data}}.refresh'}"> 
          <i xid="i1"/>  
          <span xid="span12"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          label="" xid="filterBtn" icon="icon-search" onClick="{operation:'bizFilter.show'}"> 
          <i xid="i4" class="icon-search"/>  
          <span xid="span5"/> 
        </a> 
      </div>  
      <div xid="mainForm" class="form-horizontal container-fluid" component="$UI/system/components/bootstrap/form/form">{{#each form1}}
        <div xid="formGroup{{addOne @index}}" class="form-group"> 
          <div xid="col{{addOne @index}}1" class="col-sm-2"> 
            <label xid="{{fieldName1}}L" class="control-label" bind-text="{{form_data}}.label('{{fieldName1}}')"/> 
          </div>  
          <div xid="col{{addOne @index}}2" class="col-sm-4">{{#if form_selectDataID}} 
            <select xid="{{fieldName1}}" class="form-control" component="$UI/system/components/justep/select/select"
              bind-ref="{{form_data}}.ref('{{form_refID}}')" bind-labelRef="{{form_data}}.ref('{{fieldName1}}')"
              bind-options="{{form_selectDataID}}" bind-optionsLabel="{{form_selectLabelName}}"
              bind-optionsValue="{{form_selectConcept}}" bind-optionsCaption="请选择..."/>{{else}}{{#if passwordfieldName1}}
            <input xid="{{fieldName1}}" component="$UI/system/components/justep/input/password" class="form-control x-edit"
              bind-ref="{{form_data}}.ref('{{fieldName1}}')"/>{{/if}}{{#if rangefieldName1}}
            <input xid="{{fieldName1}}" component="$UI/system/components/justep/input/range" class="x-edit"
              bind-ref="{{form_data}}.ref('{{fieldName1}}')" min="-10000" max="10000"/>{{/if}}{{#if outputfieldName1}}
            <output xid="{{fieldName1}}" class="form-control" component="$UI/system/components/justep/output/output"
              bind-ref="{{form_data}}.ref('{{fieldName1}}')"/>{{/if}}{{#if textfieldName1}}
            <textarea xid="{{fieldName1}}" class="form-control" component="$UI/system/components/justep/textarea/textarea"
              bind-ref="{{form_data}}.ref('{{fieldName1}}')"/> {{/if}}{{#if inputfieldName1}}
            <input xid="{{fieldName1}}" class="form-control" component="$UI/system/components/justep/input/input"
              bind-ref="{{form_data}}.ref('{{fieldName1}}')"/>{{/if}}{{/if}}
          </div>{{#if fieldName2}} 
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
              bind-ref="{{form_data}}.ref('{{fieldName2}}')"/>{{/if}}{{#if textfieldName2}}
            <textarea xid="{{fieldName2}}" class="form-control" component="$UI/system/components/justep/textarea/textarea"
              bind-ref="{{form_data}}.ref('{{fieldName2}}')"/> {{/if}}{{#if inputfieldName2}}
            <input xid="{{fieldName2}}" class="form-control" component="$UI/system/components/justep/input/input"
              bind-ref="{{form_data}}.ref('{{fieldName2}}')"/>{{/if}}{{/if}}
          </div>{{/if}}
        </div>{{/each}}
      </div> 
    </div>  
    <div component="$UI/system/components/justep/controlGroup/controlGroup"
      class="x-control-group" title="{{detail_title}}" xid="detailControlGroup" collapsible="true"> 
      <div class="x-control-group-title" xid="controlGroupTitle1"> 
        <span xid="span1"/> 
      </div>  
      <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter form-inline" xid="detailBar">  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="addBtn" icon="icon-plus" label="添加" onClick="{operation:'{{detail_data}}.new'}"> 
          <i xid="i6" class="icon-plus"/>  
          <span xid="span10">添加</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="deleteBtn" onClick="{operation:'{{detail_data}}.delete'}"> 
          <i xid="i7"/>  
          <span xid="span11">删除</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="preRowBtn" onClick="{operation:'{{detail_data}}.prevRow'}"> 
          <i xid="i11"/>  
          <span xid="span23"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="nextRowBtn" onClick="{operation:'{{detail_data}}.nextRow'}"> 
          <i xid="i12"/>  
          <span xid="span24"/> 
        </a>  
      </div>  
      <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true"
        xid="detailGrid" data="{{detail_data}}" height="auto" class="x-grid-no-bordered"> 
        <columns xid="column">{{#each detail_list}} 
          <column name="{{list_field1}}" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('{{list_field1}}')"/> 
            </editor> 
          </column>{{#if list_field2}}
          <column name="{{list_field2}}" editable="true"> 
            <editor> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                bind-ref="ref('{{list_field2}}')"/> 
            </editor> 
          </column>{{/if}}{{/each}}
        </columns> 
      </div>
      <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid" xid="pagerBar" data="{{detail_data}}"> 
    <div class="row" xid="div1"> 
      <div class="col-sm-3" xid="div2"> 
        <div class="x-pagerbar-length" xid="div4"> 
          <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect" class="x-pagerlimitselect" xid="pagerLimitSelect1"> 
            <span xid="span15">显示</span>  
            <select component="$UI/system/components/justep/select/select" class="form-control input-sm" xid="select1"> 
              <option value="10" xid="default9">10</option>  
              <option value="20" xid="default10">20</option>  
              <option value="50" xid="default14">50</option>  
              <option value="100" xid="default15">100</option>
            </select>  
            <span xid="span16">条</span>
          </label> 
        </div> 
      </div>  
      <div class="col-sm-3" xid="div5"> 
        <div class="x-pagerbar-info" xid="div6">当前显示1-10条，共16条</div>
      </div>  
      <div class="col-sm-6" xid="div7"> 
        <div class="x-pagerbar-pagination" xid="div8"> 
          <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination" xid="pagination1"> 
            <li class="prev" xid="li1"> 
              <a href="#" xid="a1"> 
                <span aria-hidden="true" xid="span17">«</span>  
                <span class="sr-only" xid="span18">Previous</span>
              </a> 
            </li>  
            <li class="next" xid="li2"> 
              <a href="#" xid="a3"> 
                <span aria-hidden="true" xid="span19">»</span>  
                <span class="sr-only" xid="span20">Next</span>
              </a> 
            </li> 
          </ul> 
        </div> 
      </div> 
    </div> 
  </div>
    </div> 
  </div>  
  <span component="$UI/system/components/justep/bizFilter/bizFilter" xid="bizFilter"
    filterData="{{form_data}}" style="left:28px;top:290px;"/> 
</div>
