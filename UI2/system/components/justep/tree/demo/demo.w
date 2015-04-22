<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="x-flex x-flex-column">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:26px;height:auto;left:378px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="orgData" idColumn="sFID"> 
      <column label="sFID" name="sFID" type="String" xid="default1"/>  
      <column label="sName" name="sName" type="String" xid="default2"/>  
      <column label="sFName" name="sFName" type="String" xid="default3"/>  
      <column label="sOrgKindID" name="sOrgKindID" type="String" xid="default4"/>  
      <column label="sSequence" name="sSequence" type="String" xid="default5"/>  
      <column label="sParent" name="sParent" type="String" xid="default6"/>  
      <column label="sPersonID" name="sPersonID" type="String" xid="default7"/>  
      <column label="sNodeKind" name="sNodeKind" type="String" xid="default8"/>  
      <data xid="default11">[{&quot;sFID&quot;:&quot;/F92C257AEA094865A96DCB617482B37C.ogn&quot;,&quot;sName&quot;:&quot;阳光集团（演示数据）&quot;,&quot;sFName&quot;:&quot;/阳光集团（演示数据）&quot;,&quot;sOrgKindID&quot;:&quot;ogn&quot;,&quot;sSequence&quot;:&quot;/003&quot;},{&quot;sFID&quot;:&quot;/F92C257AEA094865A96DCB617482B37C.ogn/4830B1B9A8204D23A7D5D5F3338605DC.ogn&quot;,&quot;sName&quot;:&quot;广东分公司&quot;,&quot;sFName&quot;:&quot;/阳光集团（演示数据）/广东分公司&quot;,&quot;sOrgKindID&quot;:&quot;ogn&quot;,&quot;sSequence&quot;:&quot;/003/014&quot;,&quot;sParent&quot;:&quot;F92C257AEA094865A96DCB617482B37C&quot;},{&quot;sFID&quot;:&quot;/F92C257AEA094865A96DCB617482B37C.ogn/4830B1B9A8204D23A7D5D5F3338605DC.ogn/C5974B908942488C991D425143DDCA00.dpt&quot;,&quot;sName&quot;:&quot;销售部&quot;,&quot;sFName&quot;:&quot;/阳光集团（演示数据）/广东分公司/销售部&quot;,&quot;sOrgKindID&quot;:&quot;dpt&quot;,&quot;sSequence&quot;:&quot;/003/014/004&quot;,&quot;sParent&quot;:&quot;4830B1B9A8204D23A7D5D5F3338605DC&quot;}]</data></div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="tree"> 
        <div class="x-titlebar-left" xid="div2"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span3"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div3">tree</div>  
        <div class="x-titlebar-right reverse" xid="div8"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            xid="button3" icon="icon-android-note" onClick="showTreeSource" bind-visible="isVisible"> 
            <i xid="i3" class="icon-android-note"/>  
            <span xid="span5"/> 
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content x-flex x-flex-column" xid="content1" style="padding:6px 6px 6px 6px;"> 
      <div component="$UI/system/components/justep/tree/tree" class="x-tree x-inner-scroll x-flex1"
        xid="demoTree" rootLabel="组织机构" limit="8" data="orgData" labelColumn="sName"> 
        <div class="x-tree-head" xid="div4"> 
          <ul component="$UI/system/components/bootstrap/breadcrumb/breadcrumb"
            class="breadcrumb" xid="breadcrumb1"/> 
        </div>  
        <div class="x-tree-content x-scroll-view" xid="div2"> 
          <div component="$UI/system/components/justep/scrollView/scrollView"
            supportPullDown="true" supportPullUp="true" hScroll="false" vScroll="true"
            hScrollbar="false" vScrollbar="true" bounce="true" class="x-scroll" xid="scrollView1"> 
            <div class="x-content-center x-pull-down container" xid="div3"> 
              <i class="x-pull-down-img glyphicon x-icon-pull-down"/>  
              <span class="x-pull-down-label" xid="span1">下拉刷新...</span> 
            </div>  
            <div class="x-scroll-content x-tree-template" xid="treeTemplateUl1"> 
              <div class="media"> 
                <div class="x-blob x-blob-radius pull-left media-object x-org-image"
                  component="$UI/system/components/justep/org/orgImage" xid="orgImage1"
                  bind-ref="ref('sFID')"> 
                  <div class="x-blob-bar" xid="div4"> 
                    <i class="x-blob-edit icon-compose" xid="i1"/>  
                    <i class="x-blob-del icon-close-round" xid="i2"/> 
                  </div>  
                  <img class="x-blob-img x-autofill" xid="image1"/> 
                </div>  
                <div class="x-tree-link media-body" style="text-align:left;"> 
                  <i class="pull-right icon-chevron-right" xid="i1" style="float:right;font-size:20px;padding-right:6px;padding-top:6px;"
                    bind-css="{hide: val('sOrgKindID')=='psm'}"/>  
                  <div class="media-body"> 
                    <h4 class="media-heading" bind-text="ref('sName')"/>  
                    <div bind-text="ref('sFName')"/> 
                  </div> 
                </div> 
              </div> 
            </div>  
            <div class="x-content-center x-pull-up" xid="div4"> 
              <span class="x-pull-up-label" xid="span2">加载更多...</span> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w" style="left:47px;top:11px;"/> 
</div>
