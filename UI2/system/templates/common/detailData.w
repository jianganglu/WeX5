<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:138px;top:151px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="mainData"
      idColumn="id"> 
      <rule xid="rule4"> 
        <col name="dataId" xid="ruleCol3"> 
          <readonly xid="readonly3"> 
            <expr xid="default20">js:val('dataId')=="detailData"</expr> 
          </readonly>  
          <required> 
            <expr><![CDATA[js:true]]></expr>  
            <message xid="default23"><![CDATA[dataId不能为空，]]></message> 
          </required> 
        </col>  
        <col name="concept" xid="ruleCol4"> 
          <required> 
            <expr><![CDATA[js:true]]></expr>  
            <message xid="default24"><![CDATA[概念名不能为空，]]></message> 
          </required> 
        </col>  
        <col name="reader" xid="ruleCol5"> 
          <required> 
            <expr><![CDATA[js:true]]></expr>  
            <message xid="default25"><![CDATA[读取动作不能为空，]]></message> 
          </required> 
        </col>  
<!--         <col name="columns" xid="ruleCol6">  -->
<!--           <required>  -->
<!--             <expr><![CDATA[js:true]]></expr>   -->
<!--             <message xid="default26"><![CDATA[关系不能为空，]]></message>  -->
<!--           </required>  -->
<!--         </col>   -->
        <col name="master-column" xid="ruleCol7"> 
          <required> 
            <expr><![CDATA[js:true]]></expr>  
            <message xid="default27"><![CDATA[关联关系不能为空，]]></message> 
          </required> 
        </col> 
      </rule>  
      <column label="id" name="id" type="String" xid="default1"/>  
      <column label="业务数据列表" name="dataId" type="String" xid="default2"/>  
      <column label="canDelete" name="canDelete" type="String" xid="default3"/>  
      <column label="concept" name="concept" type="String" xid="default4"/>  
      <column label="writer" name="writer" type="String" xid="default5"/>  
      <column label="creator" name="creator" type="String" xid="default6"/>  
      <column label="reader" name="reader" type="String" xid="default8"/>  
      <column label="columns" name="columns" type="String" xid="default9"/>  
      <column label="是否显示为树形" name="isTree" type="Boolean" xid="default10"/>  
      <column label="parent-relation(*)" name="parentRelation" type="String" xid="default11"/>  
      <column label="node-kind-relation" name="nodeKindRelation" type="String"
        xid="default12"/>  
      <column label="树形展开列" name="nodeLevelRelation" type="String" xid="default13"/>  
      <column label="root-filter" name="rootFilter" type="String" xid="default14"/>  
      <column label="是否为从数据" name="isDetail" type="Boolean" xid="default15"/>  
      <column label="master-data" name="masterData" type="String" xid="default16"/>  
      <column label="master-column" name="column" type="String" xid="default17"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="treeConfigData"
      idColumn="xid"> 
      <rule xid="rule2"/>  
      <column label="xid" name="xid" type="String" xid="default18"/>  
      <column label="可选择数据名称" name="name" type="String" xid="default19"/> 
    </div> 
  </div>  
  <!--   <div class="row nav-row">  -->  
  <!--     <ul class="nav navbar-nav" style="margin-left:15px">  -->  
  <!--       <li>  -->  
  <!--         <a bind-click="addDataBtnClick" href="#" role="button"> -->  
  <!--           <i class="glyphicon glyphicon-plus"/>新增 -->  
  <!--         </a>  -->  
  <!--       </li>   -->  
  <!--       <li>  -->  
  <!--         <a bind-click="deleteDataBtnClick" href="#" role="button"> -->  
  <!--           <i class="glyphicon glyphicon-minus"/>删除 -->  
  <!--         </a>  -->  
  <!--       </li> -->  
  <!--       </ul>  -->  
  <!--   </div>   -->  
  <div class="row" style="padding-top:50px"> 
    <!--     <div class="col-xs-3">  -->  
    <!--       <ul class="nav data-nav" id="sidebar" bind-foreach="mainData.datas">  -->  
    <!--         <li bind-css="{active: $model.mainData.currentRow.get() == $object}">  -->  
    <!--           <a href="#" bind-text="ref('dataId')" bind-click="pageClick"/>  -->  
    <!--         </li>  -->  
    <!--       </ul>  -->  
    <!--     </div>   -->  
    <div class="col-xs-9 " style=""> 
      <form class="form-horizontal data-form scroll" style="margin-right:12px"
        role="form"> 
        <!--         <div class="form-group">  -->  
        <!--           <label for="text1" class="control-label col-xs-3">数据ID(dataId)</label>   -->  
        <!--           <div class="col-xs-9">  -->  
        <!--             <input component="$UI/system/components/justep/input/input" class="form-control" -->  
        <!--               xid="dataId" data="mainData" bind-ref="mainData.ref('dataId')" bind-value="mainData.ref('dataId')"/>  -->  
        <!--           </div>  -->  
        <!--         </div>   -->  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">概念(concept)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <output component="$UI/system/components/justep/output/output" class="form-control template-detail-output-control"
                xid="concept" bind-value="mainData.ref('concept')"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectConceptBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div>  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">读取动作(reader)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <output component="$UI/system/components/justep/output/output" class="form-control template-detail-output-control"
                xid="reader" bind-value="mainData.ref('reader')"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectReaderBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div>  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">写入动作(writer)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <output component="$UI/system/components/justep/output/output" class="form-control template-detail-output-control"
                xid="writer" bind-value="mainData.ref('writer')"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectWriterBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div>  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">新建动作(creator)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <output component="$UI/system/components/justep/output/output" class="form-control template-detail-output-control"
                xid="creator" bind-value="mainData.ref('creator')"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectCreatorBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div>  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">关系(columns)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <output component="$UI/system/components/justep/output/output" class="form-control template-detail-output-control"
                xid="columns" bind-value="mainData.ref('columns')"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectRelationsBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div>  
        <!--         <div class="form-group">  -->  
        <!--           <label for="text1" class="control-label col-xs-3">是否显示为树</label>   -->  
        <!--           <div class="col-xs-9">  -->  
        <!--             <span component="$UI/system/components/justep/button/checkbox" xid="isTree" -->  
        <!--               class="x-checkbox" name="checkbox" onChange="isTreeChange" checkedValue="1"/>  -->  
        <!--           </div>  -->  
        <!--         </div> -->  
        <!--         <div class="form-group tree" style="display:none;">  -->  
        <!--           <label for="text1" class="control-label col-xs-3">parent-relation(*):</label>   -->  
        <!--           <div class="col-xs-9">  -->  
        <!--             <select class="form-control" component="$UI/system/components/justep/select/select" -->  
        <!--               bind-ref="mainData.ref('parentRelation')" bind-labelRef="mainData.ref('parentRelation')" -->  
        <!--               bind-options="treeConfigData" bind-optionsValue="name" bind-optionsCaption="" -->  
        <!--               bind-click="select1Click" />  -->  
        <!--           </div>  -->  
        <!--         </div>   -->  
        <!--         <div class="form-group tree" style="display:none;">  -->  
        <!--           <label for="text1" class="control-label col-xs-3">node-kind-relation:</label>   -->  
        <!--           <div class="col-xs-9">  -->  
        <!--             <select class="form-control" component="$UI/system/components/justep/select/select" -->  
        <!--               bind-ref="mainData.ref('nodeKindRelation')" bind-labelRef="mainData.ref('nodeKindRelation')" -->  
        <!--               bind-options="treeConfigData" bind-optionsValue="name" bind-optionsCaption="" -->  
        <!--               bind-click="select1Click"/>  -->  
        <!--           </div>  -->  
        <!--         </div> -->  
        <!--         <div class="form-group tree" style="display:none;">  -->  
        <!--           <label for="text1" class="control-label col-xs-3">树形展开列</label>   -->  
        <!--           <div class="col-xs-9">  -->  
        <!--             <select class="form-control" component="$UI/system/components/justep/select/select" -->  
        <!--               bind-ref="mainData.ref('nodeLevelRelation')" bind-labelRef="mainData.ref('nodeLevelRelation')" -->  
        <!--               bind-options="treeConfigData" bind-optionsValue="name" bind-optionsCaption="" -->  
        <!--               bind-click="select1Click"/>  -->  
        <!--           </div>  -->  
        <!--         </div>   -->  
        <!--         <div class="form-group" bind-visible="$model.mainData.val('dataId')!='dialogData'">  -->  
        <!--           <label for="text2" class="control-label col-xs-3">是否为从数据</label>   -->  
        <!--           <div class="col-xs-9">  -->  
        <!--             <span component="$UI/system/components/justep/button/checkbox" xid="isDetail" -->  
        <!--               class="x-checkbox" name="checkbox"  onChange="isDetailChange" -->  
        <!--               checkedValue="1"/>  -->  
        <!--           </div>  -->  
        <!--         </div>   -->  
        <!--         <div class="form-group detail" style="display:none;">  -->  
        <!--           <label for="text2" class="control-label col-xs-3">master-data(*):</label>   -->  
        <!--           <div class="col-xs-9">  -->  
        <!--             <select class="form-control" component="$UI/system/components/justep/select/select" -->  
        <!--               bind-labelRef="mainData.ref('masterData')" -->  
        <!--               bind-options="mainData" bind-optionsValue="dataId" bind-optionsCaption="select the masterData" bind-value="mainData.ref('masterData')"/>  -->  
        <!--           </div>  -->  
        <!--         </div>   -->  
        <div class="form-group detail"> 
          <label for="text2" class="control-label col-xs-3">关联关系:</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <output component="$UI/system/components/justep/output/output" class="form-control template-detail-output-control"
                xid="column" bind-value="mainData.ref('column')"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectColumnBtnClick">选择</a> 
              </span>
            </div> 
          </div> 
        </div> 
      </form> 
    </div> 
  </div> 
</div>
