<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:26px;height:auto;left:378px;">{{#each datas}} 
    <div component="$UI/system/components/justep/data/bizData" xid="treeData"
      autoLoad="true" autoNew="false" concept="{{data_concept}}" columns="{{data_relations}}"
      isTree="true"> 
      <reader action="{{data_reader}}"/>{{/each}}{{#each tree}}
      <treeOption parentRelation="{{parent_relation}}" nodeKindRelation="{{node_kindRelation}}"
        rootFilter="{{root_filter}}"/>{{/each}}
    </div> 
  </div>{{#each tree}} 
  <div component="$UI/system/components/justep/grid/grid" appearance="tree"
    data="treeData" expandColumn="{{tree_nodeName}}" useVirtualRoot="true" virtualRootLabel="{{root_nodeLable}}"
    xid="treeGrid" class="x-grid-no-bordered"
    height="auto" width="100%"> 
    <columns xid="columns2"> 
      <column name="{{tree_nodeName}}" xid="column2"/> 
    </columns> 
  </div>{{/each}}
</div>
