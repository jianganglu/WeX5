<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:431px;top:134px;">{{#each datas}}
    <div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="true" autoNew="false" concept="{{data_concept}}"
      columns="{{data_relations}}"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/>  
      <rule xid="rule4"> 
        <readonly xid="readonly3"> 
          <expr xid="default12">true</expr> 
        </readonly> 
      </rule> 
    </div>{{/each}}
  </div>  
  <span component="$UI/system/components/justep/bizFilter/bizFilter" xid="filter"
    filterData="{{list_data}}"/>  
  <div component="$UI/system/components/justep/process/process" xid="process"
    data="{{list_data}}" autoClose="false" autoStart="false" autoSave="false" autoFilter="false"/>  
  <div component="$UI/system/components/bootstrap/tabs/tabs" xid="tabs"> 
    <ul class="nav nav-tabs" xid="nav"> 
      <li class="active" xid="listLi"> 
        <a content="listContent" xid="listItem"><![CDATA[列表]]></a> 
      </li>  
      <li role="presentation" xid="detailLi"> 
        <a content="detailContent" xid="detailItem"><![CDATA[详细]]></a> 
      </li> 
    </ul>  
    <div class="tab-content" xid="content"> 
      <div class="tab-pane active container-fluid" xid="listContent"> 
        <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter form-inline" xid="listBar"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            icon="icon-image" xid="chartBtn" onClick="chart2BtnClick"> 
            <i xid="i8" icon="icon-image" class="icon-image"/>  
            <span xid="span8">流程图</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="refreshBtn" onClick="{operation:'{{list_data}}.refresh'}"> 
            <i xid="i1"/>  
            <span xid="span1"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            label="" xid="filterBtn" icon="icon-search" onClick="{operation:'filter.menu'}"> 
            <i xid="i4" class="icon-search"/>  
            <span xid="span5"/> 
          </a>
          <div component="$UI/system/components/justep/smartFilter/smartFilter"
          xid="smartFilter1" filterData="{{list_data}}" style="float: right;" filterCols="{{list_columns}}"> 
          <input type="text" class="form-control" placeholder="搜索" data-bind="valueUpdate: ['input', 'afterkeydown']"
            bind-value="$model.comp($element.parentElement).searchText" bind-change="$model.comp($element.parentElement).onInputChange.bind($model.comp($element.parentElement))"
            xid="input1"/> 
        </div>
        </div>  
        <div component="$UI/system/components/justep/dataTables/dataTables"
          flexibleWidth="false" rowActiveClass="active" class="table table-condensed table-hover"
          xid="list" data="{{list_data}}" pagingType="simple_numbers" lengthMenu="10,25,50,100" responsive="true" onRowDblClick="listTablesRowDblClick"> 
          <columns xid="column">{{#each list}} 
            <column name="{{list_field1}}"/>{{#if list_field2}}
            <column name="{{list_field2}}"/>{{/if}}{{/each}}
          </columns> 
        </div>  
        <div component="$UI/system/components/justep/pagerBar/pagerBar" class="x-pagerbar container-fluid"
          xid="pagerBar" data="{{list_data}}"> 
          <div class="row" xid="div1"> 
            <div class="col-sm-3" xid="div2"> 
              <div class="x-pagerbar-length" xid="div4"> 
                <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect"
                  class="x-pagerlimitselect" xid="pagerLimitSelect2"> 
                  <span xid="span7">显示</span>  
                  <select component="$UI/system/components/justep/select/select"
                    class="form-control input-sm" xid="select2"> 
                    <option value="10" xid="default14">10</option>  
                    <option value="20" xid="default15">20</option>  
                    <option value="50" xid="default16">50</option>  
                    <option value="100" xid="default17">100</option> 
                  </select>  
                  <span xid="span10">条</span> 
                </label> 
              </div> 
            </div>  
            <div class="col-sm-3" xid="div9"> 
              <div class="x-pagerbar-info" xid="div10">当前显示1-10条，共16条</div> 
            </div>  
            <div class="col-sm-6" xid="div11"> 
              <div class="x-pagerbar-pagination" xid="div12"> 
                <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination"
                  xid="pagination1"> 
                  <li class="prev" xid="li3"> 
                    <a href="#" xid="a1"> 
                      <span aria-hidden="true" xid="span11">«</span>  
                      <span class="sr-only" xid="span12">Previous</span> 
                    </a> 
                  </li>  
                  <li class="next" xid="li4"> 
                    <a href="#" xid="a5"> 
                      <span aria-hidden="true" xid="span13">»</span>  
                      <span class="sr-only" xid="span14">Next</span> 
                    </a> 
                  </li> 
                </ul> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div>  
      <div class="tab-pane" xid="detailContent"> 
        <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter form-inline" xid="detailBar"> 
          <div component="$UI/system/components/justep/button/buttonGroup"
            class="btn-group" tabbed="true" xid="detialBar"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
              icon="icon-image" xid="chart2Btn" onClick="chartBtnClick"> 
              <i xid="i9" icon="icon-image" class="icon-image"/>  
              <span xid="span9">流程图</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              xid="preBtn" onClick="{operation:'{{form_data}}.prevRow'}"> 
              <i xid="i3"/>  
              <span xid="span3"/> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              xid="nextBtn" onClick="{operation:'{{form_data}}.nextRow'}"> 
              <i xid="i5"/>  
              <span xid="span4"/> 
            </a> 
          </div> 
        </div>  
        <div xid="mainForm" class="form-horizontal container-fluid" component="$UI/system/components/bootstrap/form/form">{{#each form1}}
          <div xid="formGroup{{addOne @index}}" class="form-group"> 
            <div xid="col{{addOne @index}}1" class="col-sm-2"> 
              <label xid="{{fieldName1}}L" class="control-label" bind-text="{{form_data}}.label('{{fieldName1}}')"/> 
            </div>  
            <div xid="col{{addOne @index}}2" class="col-sm-4"> 
              <output xid="{{fieldName1}}" component="$UI/system/components/justep/output/output" class="form-control"
                bind-ref="{{form_data}}.ref('{{fieldName1}}')"/> 
            </div> {{#if fieldName2}} 
            <div xid="col{{addOne @index}}3" class="col-sm-2"> 
              <label xid="{{fieldName2}}L" class="control-label" bind-text="{{form_data}}.label('{{fieldName2}}')"/> 
            </div>  
            <div xid="col{{addOne @index}}4" class="col-sm-4"> 
              <output xid="{{fieldName2}}" class="form-control" component="$UI/system/components/justep/output/output"
                bind-ref="{{form_data}}.ref('{{fieldName2}}')"/> 
            </div> {{/if}}
          </div>{{/each}}
        </div> 
      </div> 
    </div> 
  </div> 
</div>
