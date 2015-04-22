<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data" idColumn="id"> 
      <column label="id" name="id" type="String" xid="default1"/>  
      <column label="introTitle" name="introTitle" type="String" xid="default2"/>  
      <column label="dept" name="dept" type="String" xid="default3"/>  
      <column label="total" name="total" type="String" xid="default4"/>  
      <column label="remark" name="remark" type="String" xid="default5"/>  
      <data xid="default5">[{"id":"1","introTitle":"笔记本","dept":"技术部","total":"25","remark":"北京市"},{"id":"2","introTitle":"手机","dept":"产品部","total":"47","remark":"北京市"}]</data> 
    </div> 
  </div>  
  <div component="$UI/system/components/fragment/list/listRow1Sum" xid="listRow1Sum2" style="height:100%;"> 
    <div component="$UI/system/components/justep/list/list" class="x-list listRow1Sum-margin5"
      xid="list2" data="data"> 
      <ul class="x-list-template" xid="listTemplateUl2"> 
        <li class="list-row-bottom" xid="li2"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row3"> 
            <div class="x-col" xid="col7"> 
              <div component="$UI/system/components/justep/output/output" class="x-output listRow1Sum-text-bold"
                xid="output5" bind-ref="ref('introTitle')"/> 
            </div>  
            <div class="x-col x-col-10" xid="col8"> 
              <div component="$UI/system/components/justep/output/output" class="x-output"
                xid="output6" bind-ref="ref('dept')"/> 
            </div>  
            <div xid="col9"> 
              <div component="$UI/system/components/justep/output/output" class="x-output text-center listRow1Sum-margin10"
                xid="output7" bind-ref="ref('remark')"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row"
            style="color:#FF0000;" xid="row4"> 
            <div class="x-col" xid="col10"/>  
            <div xid="col11"> 
              <label class="listRow1Sum-text-bold" xid="span2">合计</label> 
            </div>  
            <div xid="col12"> 
              <div component="$UI/system/components/justep/output/output" class="x-output listRow1Sum-text-bold listRow1Sum-margin10"
                xid="output8" bind-ref="ref('total')"/> 
            </div> 
          </div> 
        </li> 
      </ul> 
    </div> 
  </div> 
</div>
