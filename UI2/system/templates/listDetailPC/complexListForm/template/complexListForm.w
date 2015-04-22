<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:309px;top:56px;">{{#each datas}}
    <div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="true" concept="{{data_concept}}" orderBy="{{data_orderBy}}"
      columns="{{data_relations}}" autoNew="false" onSaveCommit="dataSaveCommit"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/>  
      <calculateRelation relation="calcCheckBox"/> 
    </div>{{/each}}{{#each detaildatas}}
    <div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="true" concept="{{data_concept}}" columns="{{data_relations}}"
      autoNew="false"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/>  
      <master xid="default1" data="mainData" relation="{{masterColumn}}"/> 
    </div>{{/each}}
  </div>  
  <div xid="view"> 
    <div component="$UI/system/components/justep/controlGroup/controlGroup"
      class="x-control-group" title="{{list_title}}" xid="mainControlGroup" collapsible="true"> 
      <div class="x-control-group-title" xid="controlGroupTitle1"> 
        <span xid="span2"/> 
      </div>  
      <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter form-inline" xid="mainBar"> 
        <div component="$UI/system/components/justep/smartFilter/smartFilter"
          xid="smartFilter" filterData="mainData" filterCols="{{list_columns}}" class="pull-right"> 
          <input type="text" class="form-control" placeholder="搜索" data-bind="valueUpdate: ['input', 'afterkeydown']"
            bind-value="$model.comp($element.parentElement).searchText" bind-change="$model.comp($element.parentElement).onInputChange.bind($model.comp($element.parentElement))"
            xid="input1"/> 
        </div>
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="newBtn" label="新建" onClick='{operation:"mainData.new"}'> 
          <i xid="i8"/>  
          <span xid="span8">新建</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="saveBtn" onClick='{"operation":"mainData.save"}' label="保存"> 
          <i xid="i7"/>  
          <span xid="span7">保存</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="button1" onClick='{"operation":"mainData.delete"}'> 
          <i xid="i2"/>  
          <span xid="span3"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link  btn-icon-left"
          xid="refreshBtn" onClick="{operation:'mainData.refresh'}"> 
          <i xid="i1"/>  
          <span xid="span1"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          label="" xid="filterBtn" icon="icon-search" onClick="{operation:'bizFilter.menu'}"> 
          <i xid="i4" class="icon-search"/>  
          <span xid="span5"/> 
        </a>  
      </div>  
      <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true"
        xid="mainGrid" data="mainData" height="auto" class="x-grid-no-bordered"> 
        <columns xid="column">{{#each list}} 
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
      <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid"
        xid="bar" data="mainData"> 
        <div class="row" xid="div11"> 
          <div class="col-sm-3" xid="div12"> 
            <div class="x-pagerbar-length" xid="div13"> 
              <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect"
                class="x-pagerlimitselect" xid="pagerLimitSelect2"> 
                <span xid="span411">显示</span>  
                <select component="$UI/system/components/justep/select/select"
                  class="form-control input-sm" xid="select11"> 
                  <option value="10" xid="default9">10</option>  
                  <option value="20" xid="default10">20</option>  
                  <option value="50" xid="default14">50</option>  
                  <option value="100" xid="default15">100</option> 
                </select>  
                <span xid="span61">条</span> 
              </label> 
            </div> 
          </div>  
          <div class="col-sm-3" xid="div14"> 
            <div class="x-pagerbar-info" xid="div15">当前显示0条，共0条</div> 
          </div>  
          <div class="col-sm-6" xid="div16"> 
            <div class="x-pagerbar-pagination" xid="div17"> 
              <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination"
                xid="pagination11"> 
                <li class="prev" xid="li11"> 
                  <a href="#" xid="a11"> 
                    <span aria-hidden="true" xid="span114">«</span>  
                    <span class="sr-only" xid="span115">Previous</span> 
                  </a> 
                </li>  
                <li class="next" xid="li21"> 
                  <a href="#" xid="a21"> 
                    <span aria-hidden="true" xid="span161">»</span>  
                    <span class="sr-only" xid="span171">Next</span> 
                  </a> 
                </li> 
              </ul> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div component="$UI/system/components/justep/controlGroup/controlGroup"
      class="x-control-group" title="{{detail_title}}" xid="detailControlGroup" collapsible="true"> 
      <div class="x-control-group-title" xid="controlGroupTitle12"> 
        <span xid="span12"/> 
      </div>  
      <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter" xid="detailBar"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="addBtn" icon="icon-plus" label="添加" onClick="{operation:'{{detail_data}}.new'}"> 
          <i xid="i6" class="icon-plus"/>  
          <span xid="span10">添加</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
          xid="deleteBtn" onClick="{operation:'{{detail_data}}.delete'}"> 
          <i xid="i17"/>  
          <span xid="span11">删除</span> 
        </a> 
      </div>  
      <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true"
        xid="detailGrid" data="{{detail_data}}" height="auto" class="x-grid-no-bordered"> 
        <columns xid="columns">{{#each detail_list}} 
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
      <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid"
        xid="pagerBar1" data="detailData"> 
        <div class="row" xid="div122"> 
          <div class="col-sm-3" xid="div222"> 
            <div class="x-pagerbar-length" xid="div322"> 
              <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect"
                class="x-pagerlimitselect" xid="pagerLimitSelect"> 
                <span xid="span41">显示</span>  
                <select component="$UI/system/components/justep/select/select"
                  class="form-control input-sm" xid="sele"> 
                  <option value="10" xid="default9">10</option>  
                  <option value="20" xid="default10">20</option>  
                  <option value="50" xid="default14">50</option>  
                  <option value="100" xid="default15">100</option> 
                </select>  
                <span xid="span116">条</span> 
              </label> 
            </div> 
          </div>  
          <div class="col-sm-3" xid="div4"> 
            <div class="x-pagerbar-info" xid="div5">当前显示0条，共0条</div> 
          </div>  
          <div class="col-sm-6" xid="div6"> 
            <div class="x-pagerbar-pagination" xid="div7"> 
              <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination"
                xid="pagination1"> 
                <li class="prev" xid="li1"> 
                  <a href="#" xid="a1"> 
                    <span aria-hidden="true" xid="span14">«</span>  
                    <span class="sr-only" xid="span15">Previous</span> 
                  </a> 
                </li>  
                <li class="next" xid="li2"> 
                  <a href="#" xid="a2"> 
                    <span aria-hidden="true" xid="span16">»</span>  
                    <span class="sr-only" xid="span17">Next</span> 
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
    filterData="{{list_data}}" style="left:28px;top:290px;"/> 
</div>
