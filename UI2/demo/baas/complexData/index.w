<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window demo-simpleData" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:281px;top:352px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="userData" idColumn="fID" onCustomRefresh="userDataCustomRefresh" onCustomSave="userDataCustomSave"
      limit="5"> 
      <column label="fID" name="fID" type="String" xid="default1"/>  
      <column label="fName" name="fName" type="String" xid="default2"/>  
      <column label="fPhoneNumber" name="fPhoneNumber" type="String" xid="default3"/>  
      <column label="fAddress" name="fAddress" type="String" xid="default4"/>  
      <column label="orderCount" name="orderCount" type="Integer" xid="default5"/>
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="复合数据"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="button" xid="button5" onClick="{operation:'window.close'}"> 
            <i xid="i9"/>  
            <span xid="span9"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            xid="button4" onClick="{operation:'userData.save'}"> 
            <i xid="i4"/>  
            <span xid="span4"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">复合数据</div>  
        <div class="x-titlebar-right reverse" xid="div3"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            xid="button1" onClick="{operation:'userData.new'}" target="detailContent"> 
            <i xid="i1"/>  
            <span xid="span1"/> 
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
        active="0" xid="contents1"> 
        <div class="x-contents-content" xid="listContent"> 
          <div component="$UI/system/components/justep/panel/panel" class="x-panel"
            xid="panel2" style="height:100%;width:100%;"> 
            <div class="x-panel-top" xid="top2" height="48"> 
              <div component="$UI/system/components/justep/row/row" class="x-row"
                xid="row6"> 
                <div class="x-col" xid="col11"> 
                  <div class="input-group" component="$UI/system/components/bootstrap/inputGroup/inputGroup"
                    xid="inputGroup1"> 
                    <input type="text" class="form-control" component="$UI/system/components/justep/input/input"
                      xid="searchInput" onChange="{operation:'userData.refresh'}"/>  
                    <div class="input-group-btn" xid="div4"> 
                      <a component="$UI/system/components/justep/button/button"
                        class="btn btn-default btn-only-icon" label="button" xid="button6"
                        icon="icon-android-search" onClick="{operation:'userData.refresh'}"> 
                        <i xid="i6" class="icon-android-search"/>  
                        <span xid="span10"/> 
                      </a> 
                    </div> 
                  </div> 
                </div> 
              </div> 
            </div>  
            <div class="x-panel-content" xid="content2"> 
              <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
                xid="scrollView1"> 
                <div class="x-content-center x-pull-down container" xid="div5"> 
                  <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i3"/>  
                  <span class="x-pull-down-label" xid="span3">下拉刷新...</span> 
                </div>  
                <div class="x-scroll-content" xid="div6"> 
                  <div component="$UI/system/components/justep/list/list" class="x-list"
                    xid="list1" data="userData"> 
                    <ul class="x-list-template" xid="listTemplateUl1"> 
                      <li xid="li1" bind-css="{'bg-info' : $object == $model.userData.getCurrentRow()}"> 
                        <div component="$UI/system/components/justep/row/row"
                          class="x-row" xid="row2"> 
                          <div class="x-col x-col-67" xid="col1"> 
                            <div component="$UI/system/components/justep/output/output" class="x-output text-primary" xid="output3" bind-ref="ref('fID')"></div></div>  
                          <div class="x-col" xid="col2"> 
                            <div component="$UI/system/components/justep/output/output"
                              class="x-output text-danger" xid="output1" bind-text="'订单数：' + val('orderCount')"/> 
                          </div> 
                        </div>  
                        <div component="$UI/system/components/justep/row/row"
                          class="x-row" xid="row3"> 
                          <div class="x-col x-col-67" xid="col4"> 
                            <div component="$UI/system/components/justep/output/output"
                              class="x-output" xid="output4" bind-ref="ref('fName')"/> 
                          </div>  
                          <div class="x-col" xid="col5"> 
                            <div component="$UI/system/components/justep/output/output"
                              class="x-output" xid="output5" bind-ref="ref('fPhoneNumber')"/> 
                          </div> 
                        </div>  
                        <div component="$UI/system/components/justep/row/row"
                          class="x-row" xid="row4"> 
                          <div class="x-col" xid="col14"> 
                            <div component="$UI/system/components/justep/output/output" class="x-output" xid="output2" bind-ref="ref('fAddress')"></div></div> 
                        </div> 
                      </li> 
                    </ul> 
                  </div> 
                </div>  
                <div class="x-content-center x-pull-up" xid="div7"> 
                  <span class="x-pull-up-label" xid="span5">加载更多...</span> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div>  
        <div class="x-contents-content" xid="detailContent"> 
          <div component="$UI/system/components/justep/row/row" class="x-row"
            xid="row8"> 
            <div class="x-col" xid="col26"> 
              <div component="$UI/system/components/justep/row/row" class="x-row"
                xid="row9"> 
                <div class="x-col" xid="col29"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label20" xid="labelInput1"> 
                    <label class="x-label" xid="label6"><![CDATA[fID]]></label>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input1" bind-ref="userData.ref('fID')"/> 
                  </div> 
                </div> 
              </div>  
              <div component="$UI/system/components/justep/row/row" class="x-row"
                xid="row14"> 
                <div class="x-col" xid="col38"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label20" xid="labelInput3"> 
                    <label class="x-label" xid="label8"><![CDATA[fName]]></label>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input4" bind-ref="userData.ref('fName')"/> 
                  </div> 
                </div> 
              </div>  
              <div component="$UI/system/components/justep/row/row" class="x-row"
                xid="row15"> 
                <div class="x-col" xid="col39"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label20" xid="labelInput4"> 
                    <label class="x-label" xid="label9"><![CDATA[fPhoneNumber]]></label>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input5" bind-ref="userData.ref('fPhoneNumber')"/> 
                  </div> 
                </div> 
              </div>  
              <div component="$UI/system/components/justep/row/row" class="x-row"
                xid="row16"> 
                <div class="x-col" xid="col40"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label20" xid="labelInput5"> 
                    <label class="x-label" xid="label10"><![CDATA[fAddress]]></label>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input6" bind-ref="userData.ref('fAddress')"/> 
                  </div> 
                </div> 
              </div>  
              <div component="$UI/system/components/justep/row/row" class="x-row"
                xid="row17"> 
                <div class="x-col" xid="col42"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label20" xid="labelInput9"> 
                    <label class="x-label" xid="label12"><![CDATA[orderCount]]></label>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="input10" bind-ref="userData.ref('orderCount')"/> 
                  </div> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group btn-group-justified"
        tabbed="true" xid="buttonGroup1" style="height:48px;" selected="listButton"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="列表" xid="listButton" target="listContent"> 
          <i xid="i5"/>  
          <span xid="span6">列表</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="详细" xid="button7" target="detailContent"> 
          <i xid="i7"/>  
          <span xid="span7">详细</span> 
        </a> 
      </div> 
    </div> 
  </div> 
</div>
