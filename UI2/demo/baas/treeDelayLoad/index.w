<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window demo-simpleData" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:219px;top:122px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="regionData" idColumn="fID" isTree="true" limit="5" onCustomRefresh="regionDataCustomRefresh"> 
      <column label="fID" name="fID" type="String" xid="default4"/>  
      <column label="fName" name="fName" type="String" xid="default5"/>  
      <column label="fParentID" name="fParentID" type="String" xid="default6"/>  
      <column label="fType" name="fType" type="String" xid="default7"/>  
      <treeOption xid="default1" parentRelation="fParentID" delayLoad="true"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="树形逐级加载"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="button" xid="button5" onClick="{operation:'window.close'}"> 
            <i xid="i9"/>  
            <span xid="span9"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">树形逐级加载</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/tree/tree" class="x-tree x-inner-scroll"
        xid="tree1" data="regionData" labelColumn="fName" rootLabel="行政区划"> 
        <div class="x-tree-head" xid="div4"> 
          <ul component="$UI/system/components/bootstrap/breadcrumb/breadcrumb"
            class="breadcrumb" xid="ul1"/> 
        </div>  
        <div class="x-tree-content" xid="div5"> 
          <div component="$UI/system/components/justep/scrollView/scrollView"
            supportPullDown="true" supportPullUp="true" hScroll="false" vScroll="true"
            hScrollbar="false" vScrollbar="true" bounce="true" class="x-scroll" xid="scrollView1"> 
            <div class="x-content-center x-pull-down container" xid="div6"> 
              <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i1"/>  
              <span class="x-pull-down-label" xid="span1">下拉刷新...</span> 
            </div>  
            <ul class="x-tree-template x-scroll-content" xid="treeTemplateUl1"> 
              <li xid="li1" class="x-tree-link"> 
                <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
                  xid="row1"> 
                  <div class="x-col" xid="col1"> 
                    <div component="$UI/system/components/justep/output/output"
                      class="x-output" xid="output1" bind-ref="ref('fName')"/>
                  </div>  
                  <div class="x-col x-col-fixed" xid="col4" style="width:auto;"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn btn-link btn-only-icon" label="button" xid="button2"
                      icon="icon-chevron-right" bind-visible="$object.val('fType')!='zone'"> 
                      <i xid="i3" class="icon-chevron-right"/>  
                      <span xid="span5"/> 
                    </a> 
                  </div> 
                </div> 
              </li> 
            </ul>  
            <div class="x-content-center x-pull-up" xid="div7"> 
              <span class="x-pull-up-label" xid="span2">加载更多...</span> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
