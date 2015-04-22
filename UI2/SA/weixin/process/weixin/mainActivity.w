<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:69px;top:179px;"
    onModelConstructDone="modelModelConstructDone"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data" idColumn="errInfo"> 
      <column label="同步信息" name="errInfo" type="String" xid="default1"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="treedata" idColumn="id" onCreate="treedataCreate" onCustomRefresh="treedataCustomRefresh"
      onValueChanged="treedataValueChanged"> 
      <data xid="default6">[]</data>  
      <column label="名称" name="Name" type="String" xid="default2"/>  
      <column label="微信URL" name="URL" type="String" xid="default3"/>  
      <column label="id" name="id" type="String" xid="default4"/>  
      <column label="父" name="parent" type="String" xid="default5"/>  
      <column label="操作类型" name="sType" type="String" xid="default7"/>  
      <column label="菜单键值" name="sKey" type="String" xid="default8"/>  
      <column label="应用ID" name="appID" type="String" xid="default9"/>  
      <column label="层级" name="level" type="String" xid="default10"/>  
      <column label="企业号" name="corpId" type="String" xid="default11"/>  
      <column label="功能路径" name="path" type="String" xid="default13"/>  
      <column label="访问地址" name="httpURL" type="String" xid="default14"/>  
      <column label="功能URL" name="funcURL" type="String" xid="default15"/>  
      <rule xid="rule5"> 
        <col name="URL" xid="ruleCol5"> 
          <readonly xid="readonly5"> 
            <expr xid="default26">true</expr>
          </readonly> 
        </col> 
      </rule>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="corpdata" idColumn="id" autoNew="false"> 
      <data xid="default12">[]</data>  
      <column label="企业号" name="scorpID" type="String" xid="default20"/>  
      <column label="ID" name="id" type="String" xid="default21"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data1" idColumn="fName">
      <column label="col0" name="fName" type="String" xid="default16"/>  
      <data xid="default18">[{"fName":"人员编码"},{"fName":"人员ID"}]</data>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data2" idColumn="fValue">
      <column label="col0" name="fValue" type="String" xid="default17"/>  
      <data xid="default19">[{"fValue":"人员编码"}]</data>
    </div>
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="functionDialog"
    src="$UI/SA/OPM/dialogs/selectFunction/selectSingleFunction.w" title="选择功能" onReceive="functionDialogReceive"
    status="normal" width="500px" height="600px" style="left:369px;top:57px;"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel"
    xid="panel1" style="width:100%;height:600px;"> 
    <div class="x-panel-top" xid="top1" height="60px"> 
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="title" xid="controlGroupUse" style="height:48px;"> 
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput1" style="height:25px;width:500px;"> 
          <label class="x-label" xid="label3"><![CDATA[企业号及应用]]></label>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input6" bind-ref="corpdata.ref('scorpID')" style="height:25px;"/> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div xid="div1" style="height:100%;float:left;padding:0 2px;border-right:dashed thin lightgray;width:100%;"> 
        <div component="$UI/system/components/bootstrap/tabs/tabs" xid="tabs1"
          style="width:100%;clip:rect(auto auto auto auto);height:90%;"> 
          <ul class="nav nav-tabs" xid="tabNav1"> 
            <li class="active" xid="li1"> 
              <a content="tabContent1" xid="tabItem1" bind-click="tabItem1Click">组织机构管理</a> 
            </li>  
            <li role="presentation" xid="li2"> 
              <a content="tabContent2" xid="tabItem2" bind-click="tabItem2Click">菜单同步</a> 
            </li> 
          </ul>  
          <div class="tab-content" xid="div2" style="height:100%;width:100%;"> 
            <div class="tab-pane active" xid="tabContent1" style="width:100%;height:100%;"> 
              <div xid="div3" style="height:100%;width:100%;"> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link btn-icon-left" label="组织机构同步" xid="btnOrgSynch"
                  onClick="btnOrgSynchClick" style="height:35px;"> 
                  <i xid="i9"/>  
                  <span xid="span8">组织机构同步</span> 
                </a>  
                <label xid="label1"><![CDATA[同步账号：]]></label>
                <span component="$UI/system/components/justep/select/radioGroup"
                  class="x-radio-group" xid="radioGroup1" bind-ref="data2.ref('fValue')"
                  bind-itemset="data1" bind-itemsetValue="ref('fName')" bind-itemsetLabel="ref('fName')"/>  
                <span component="$UI/system/components/justep/button/checkbox"
                  class="x-checkbox" xid="checkbox" label="保留一级机构" checkedValue="1"/>
                <textarea cols="5" rows="5" xid="textarea1" style="width:100%;height:90%;"
                  bind-text="data.ref('errInfo')"/> 
              </div> 
            </div>  
            <div class="tab-pane" xid="tabContent2" style="height:100%;width:100%;"> 
              <div component="$UI/system/components/justep/button/buttonGroup"
                class="btn-group" tabbed="true" xid="buttonGroup2"> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link btn-icon-left" label="新建应用" xid="btnnew" onClick="btnnewClick"
                  icon="icon-android-add"> 
                  <i xid="i10" class="icon-android-add"/>  
                  <span xid="span10">新建应用</span> 
                </a>  
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link btn-icon-left" label="新建菜单" xid="btnsubNew"
                  onClick="btnsubNewClick" icon="icon-android-add"> 
                  <i xid="i8" class="icon-android-add"/>  
                  <span xid="span9">新建菜单</span> 
                </a>  
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link btn-icon-left" label="新建链接" xid="btnlogout"
                  icon="icon-android-add" onClick="btnlogoutClick"> 
                  <i xid="i3" class="icon-android-add"/>  
                  <span xid="span3">新建链接</span>
                </a>
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link btn-icon-left" label="删除" xid="btnDelete" onClick="btnDeleteClick"
                  icon="icon-android-remove"> 
                  <i xid="i2" class="icon-android-remove"/>  
                  <span xid="span2">删除</span> 
                </a>  
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link btn-icon-left" label="同步菜单" xid="btnSynch" onClick="btnSynchClick"
                  icon="icon-android-checkmark"> 
                  <i xid="i1" class="icon-android-checkmark"/>  
                  <span xid="span1">同步菜单</span> 
                </a> 
              </div>  
              <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true"
                xid="grid1" data="treedata" width="90%" directEdit="true" expandColumn="Name"
                height="auto" appearance="treeGrid"> 
                <columns xid="columns1"> 
                  <column width="180" name="Name" xid="column1" editable="true"
                    label="名称"> 
                    <editor xid="editor1"> 
                      <input component="$UI/system/components/justep/input/input"
                        class="x-edit-focusin" xid="input1" bind-ref="ref('Name')"/> 
                    </editor> 
                  </column>  
                  <column width="150" name="corpId" xid="column7" editable="true"
                    label="企业号"> 
                    <editor xid="editor5"> 
                      <input component="$UI/system/components/justep/input/input"
                        class="x-edit-focusin" xid="input3" bind-ref="ref('corpId')"/> 
                    </editor> 
                  </column>  
                  <column width="80" name="appID" xid="column3" editable="true"
                    label="应用ID"> 
                    <editor xid="editor4"> 
                      <input component="$UI/system/components/justep/input/input"
                        class="x-edit-focusin" xid="input2" bind-ref="ref('appID')"/> 
                    </editor> 
                  </column>  
                  <column width="200" name="httpURL" xid="column8" label="访问地址"
                    editable="true"> 
                    <editor xid="editor6"> 
                      <input component="$UI/system/components/justep/input/input"
                        class="x-edit-focusin" xid="input4" bind-ref="ref('httpURL')"
                        style="width:193px;"/> 
                    </editor> 
                  </column>  
                  <column width="300" name="path" xid="column2" label="功能路径" editable="true"> 
                    <editor xid="editor2"> 
                      <input type="button" value="选择功能" xid="input8" bind-click="input_button1Click"/> 
                    </editor> 
                  </column>  
                  <column width="100" name="level" xid="column4" label="级别类型">
                    <editor xid="editor3"> 
                      <div component="$UI/system/components/justep/output/output"
                        class="x-output" xid="output1" bind-ref="ref('level')"/>
                    </editor>
                  </column>  
                  <column width="300" name="URL" xid="column5" label="微信访问地址"
                    editable="true">
                    <editor xid="editor7"> 
                      <input component="$UI/system/components/justep/input/input"
                        class="x-edit-focusin" xid="input5" bind-ref="ref('URL')"/>
                    </editor>
                  </column> 
                </columns> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
