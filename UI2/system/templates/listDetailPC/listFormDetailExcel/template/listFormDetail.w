<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:pc;"
  xid="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:179px;top:72px;">{{#each datas}}
    <div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="true" concept="{{data_concept}}" columns="{{data_relations}}"
      autoNew="false" onSaveCommit="DataSaveCommit"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/> 
    </div>{{/each}}{{#each detaildatas}}
    <div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="true" concept="{{data_concept}}" columns="{{data_relations}}"
      autoNew="false"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/>  
      <master data="mainData" relation="{{masterColumn}}"/> 
    </div>{{/each}}
  </div>  
  <span component="$UI/system/components/justep/bizFilter/bizFilter" xid="bizFilter"
    filterData="{{list_data}}" style="left:28px;top:290px;"/>  
  <div component="$UI/system/components/bootstrap/tabs/tabs" xid="tabs"> 
    <ul class="nav nav-tabs" xid="nav"> 
      <li class="active" xid="nav-list"> 
        <a content="ListTabContent" xid="listItem"><![CDATA[列表]]></a> 
      </li>  
      <li role="presentation" xid="nav-detail"> 
        <a content="detailTabContent" xid="detailItem"><![CDATA[详细]]></a> 
      </li> 
    </ul>  
    <div class="tab-content" xid="content"> 
      <div class="tab-pane active" xid="ListTabContent"> 
        <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter form-inline"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="newBtn" label="新建" onClick="newBtnClick" icon="icon-plus"> 
            <i xid="i8" class="icon-plus"/>  
            <span xid="span8">新建</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="saveBtn" onClick="{&quot;operation&quot;:&quot;mainData.save&quot;}" label="保存"> 
            <i xid="i9"/>  
            <span xid="span7">保存</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="button1" onClick="{&quot;operation&quot;:&quot;mainData.delete&quot;}"> 
            <i xid="i12"/>  
            <span xid="span12">保存</span> 
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
          <div component="$UI/system/components/justep/smartFilter/smartFilter"
            xid="smartFilter" filterData="mainData" filterCols="{{list_columns}}"
            class="pull-right"> 
            <input type="text" class="form-control" placeholder="搜索" data-bind="valueUpdate: ['input', 'afterkeydown']"
              bind-value="$model.comp($element.parentElement).searchText" bind-change="$model.comp($element.parentElement).onInputChange.bind($model.comp($element.parentElement))"
              xid="input2"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/dataTables/dataTables"
          flexibleWidth="true" rowActiveClass="active" class="table table-condensed table-hover"
          xid="mainTables" data="{{list_data}}" pagingType="simple_numbers" lengthMenu="10,25,50,100"
          onRowDblClick="orderTablesRowDblClick"> 
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
                  class="x-pagerlimitselect" xid="pagerLimitSelect1"> 
                  <span xid="span15">显示</span>  
                  <select component="$UI/system/components/justep/select/select"
                    class="form-control input-sm" xid="select1"> 
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
                <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination"
                  xid="pagination1"> 
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
      <div class="tab-pane" xid="detailTabContent"> 
        <div xid="detailBar" component="$UI/system/components/justep/toolBar/toolBar"
          class="x-toolbar x-toolbar-spliter"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="newBtn2" label="新建" onClick="{&quot;operation&quot;:&quot;{{form_data}}.new&quot;}"> 
            <i xid="i2"/>  
            <span xid="span2">新建</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="saveBtn2" onClick="{&quot;operation&quot;:&quot;{{form_data}}.save&quot;}" label="保存"> 
            <i xid="i10"/>  
            <span xid="span6">保存</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="button2" onClick="{&quot;operation&quot;:&quot;{{form_data}}.delete&quot;}"> 
            <i xid="i13"/>  
            <span xid="span14"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="button3" onClick="{&quot;operation&quot;:&quot;{{form_data}}.refresh&quot;}" label="刷新"> 
            <i xid="i11"/>  
            <span xid="span9">刷新</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="preBtn" onClick="{operation:'{{form_data}}.prevRow'}"> 
            <i xid="i3"/>  
            <span xid="span3"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="nextBtn" onClick="{operation:'{{form_data}}.nextRow'}"> 
            <i xid="i5"/>  
            <span xid="span4"/> 
          </a> 
        </div>  
        <div xid="mainForm" class="form-horizontal container-fluid" component="$UI/system/components/bootstrap/form/form">
          <div component="$UI/system/components/justep/excelLayout/excelLayout"
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
              class="x-edit xui-autofill" bind-ref="{{form_data}}.ref('{{form_field}}')"
              min="-10000" max="10000"/>{{/if}}{{#if form_output}}
            <output xid="T{{form_field}}F" class="form-control xui-autofill" component="$UI/system/components/justep/output/output"
              bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{#if form_textarea}}
            <textarea xid="T{{form_field}}F" class="form-control xui-autofill" component="$UI/system/components/justep/textarea/textarea"
              bind-ref="{{form_data}}.ref('{{form_field}}')"/> {{/if}}{{#if form_input}}
            <input xid="T{{form_field}}F" class="form-control xui-autofill" component="$UI/system/components/justep/input/input"
              bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{/if}} {{/each}}
          </div>  
          <div component="$UI/system/components/justep/controlGroup/controlGroup"
            class="x-control-group" title="{{detail_title}}" xid="controlGroup1" collapsible="true"> 
            <div class="x-control-group-title" xid="controlGroupTitle1"> 
              <span xid="span21">title</span> 
            </div>  
            <div component="$UI/system/components/justep/toolBar/toolBar" class="x-toolbar x-toolbar-spliter"
              xid="listBar"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
                xid="addBtn" icon="icon-plus" label="添加" onClick="{operation:'detailData.new'}"> 
                <i xid="i6" class="icon-plus"/>  
                <span xid="span10">添加</span> 
              </a>  
              <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
                xid="deleteBtn" onClick="{operation:'{{detail_data}}.delete'}"> 
                <i xid="i7"/>  
                <span xid="span11">删除</span> 
              </a> 
            </div>  
            <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true"
              xid="detailGrid" data="{{detail_data}}" height="auto" class="x-grid-no-bordered"> 
              <columns xid="columns">{{#each detail_list}} 
                <column name="{{list_field1}}" editable="true"> 
                  <editor> 
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control" bind-ref="ref('{{list_field1}}')"/> 
                  </editor> 
                </column>{{#if list_field2}}
                <column name="{{list_field2}}" editable="true"> 
                  <editor> 
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control" bind-ref="ref('{{list_field2}}')"/> 
                  </editor> 
                </column>{{/if}}{{/each}}
              </columns> 
            </div>  
            <div component="$UI/system/components/justep/pagerBar/pagerBar"
              class="x-pagerbar container-fluid" xid="detailPagerBar" data="{{detail_data}}"> 
              <div class="row" xid="div3"> 
                <div class="col-sm-3" xid="div9"> 
                  <div class="x-pagerbar-length" xid="div10"> 
                    <label component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect"
                      class="x-pagerlimitselect" xid="pagerLimitSelect2"> 
                      <span xid="span22">显示</span>  
                      <select component="$UI/system/components/justep/select/select"
                        class="form-control input-sm" xid="select2"> 
                        <option value="10" xid="default16">10</option>  
                        <option value="20" xid="default17">20</option>  
                        <option value="50" xid="default18">50</option>  
                        <option value="100" xid="default19">100</option> 
                      </select>  
                      <span xid="span23">条</span> 
                    </label> 
                  </div> 
                </div>  
                <div class="col-sm-3" xid="div11"> 
                  <div class="x-pagerbar-info" xid="div12">当前显示0条，共0条</div> 
                </div>  
                <div class="col-sm-6" xid="div13"> 
                  <div class="x-pagerbar-pagination" xid="div14"> 
                    <ul class="pagination" component="$UI/system/components/bootstrap/pagination/pagination"
                      xid="pagination2"> 
                      <li class="prev" xid="li3"> 
                        <a href="#" xid="a2"> 
                          <span aria-hidden="true" xid="span24">«</span>  
                          <span class="sr-only" xid="span25">Previous</span> 
                        </a> 
                      </li>  
                      <li class="next" xid="li4"> 
                        <a href="#" xid="a4"> 
                          <span aria-hidden="true" xid="span26">»</span>  
                          <span class="sr-only" xid="span27">Next</span> 
                        </a> 
                      </li> 
                    </ul> 
                  </div> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
