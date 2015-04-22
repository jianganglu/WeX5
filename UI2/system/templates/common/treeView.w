<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    style="height:auto;left:218px;top:72px;"> 
    <div component="$UI/system/components/justep/data/data" xid="treeData"
      idColumn="id"> 
      <column label="id" name="id" type="String"/>  
      <column label="parent-relation(*)" name="parentRelation" type="String"/>  
      <column label="根节点标签" name="rootNodeLable" type="String"/>  
      <column label="树节点名称(*)" name="treeNodeName" type="String"/>  
      <column label="node-kind-relation" name="nodeKindRelation" type="String"/>  
      <column label="node-level-relation" name="nodeLevelRelation" type="String"/>  
      <column label="root-filter" name="rootFilter" type="String"/>  
      <rule xid="rule1"> 
        <col name="parentRelation" xid="ruleCol1"> 
          <required xid="required1"> 
            <expr xid="default1">js:true</expr>  
            <message xid="default2">parent-relation(*) 必填</message> 
          </required> 
        </col>  
        <col name="treeNodeName" xid="ruleCol2"> 
          <required xid="required2"> 
            <expr xid="default3">js:true</expr>  
            <message xid="default4">树节点名称必填</message> 
          </required> 
        </col> 
      </rule> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="canSelectData"
      idColumn="xid"> 
      <column label="xid" name="xid" type="String" xid="xid2"/>  
      <column label="可选择数据名称" name="name" type="String" xid="default7"/> 
    </div> 
  </div>  
  <div class="row" style="padding-top:50px"> 
    <div class="col-xs-9"> 
      <form class="form-horizontal data-form scroll" style="margin-right:12px"
        role="form"> 
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">根节点标签</label>  
          <div class="col-xs-9"> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                xid="input1" bind-ref="treeData.ref('rootNodeLable')"/> 
          </div> 
        </div>  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">树节点名称(*)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <output component="$UI/system/components/justep/output/output" class="form-control template-output-control"
                xid="output1" bind-value="treeData.val(&quot;treeNodeName&quot;)"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectRootLabel">选择</a> 
              </span> 
            </div> 
          </div> 
        </div>  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">parentRelation(*)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <output component="$UI/system/components/justep/output/output" class="form-control template-output-control"
                xid="output2" bind-value="treeData.val(&quot;parentRelation&quot;)"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectParentRelation">选择</a> 
              </span> 
            </div> 
          </div> 
        </div>  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">nodeKindRelation</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <output component="$UI/system/components/justep/output/output" class="form-control template-output-control"
                xid="output3" bind-value="treeData.val(&quot;nodeKindRelation&quot;)"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectNodeKind">选择</a> 
              </span> 
            </div> 
          </div> 
        </div>  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">rootFilter</label>  
          <div class="col-xs-9"> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                xid="input2" bind-ref="treeData.ref('rootFilter')"/> 
          </div> 
        </div> 
      </form> 
    </div> 
  </div> 
  </div>
