<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel3"> 
    <div class="x-panel-top" xid="top3"> 
      <h3 xid="h31" class="text-center"><![CDATA[WeX5快速集成地图]]> </h3> 
    </div>  
    <div class="x-panel-content" xid="content3"> 
      <div component="$UI/system/components/bootstrap/tabs/tabs" xid="tabs1"> 
        <ul class="nav nav-tabs" xid="ul1"> 
          <li class="active" xid="li1"> 
            <a content="tabContent1" xid="a1"><![CDATA[百度地图]]></a> 
          </li>  
          <li xid="li3"> 
            <a content="tabContent3" xid="a3"><![CDATA[高德地图]]></a> 
          </li>  
          <li xid="li4"> 
            <a content="tabContent4" xid="tabItem1"><![CDATA[Mapbar地图]]></a> 
          </li>  
        </ul>  
        <div class="tab-content" xid="div1"> 
          <div class="tab-pane active" xid="tabContent1"> 
            <div xid="baiduMap" style="height:600px;width:100%;"/> 
          </div>  
          <div class="tab-pane" xid="tabContent3"> 
            <div xid="gaodeMap" style="height:600px;width:100%;"/> 
          </div>  
          <div class="tab-pane" xid="tabContent4"> 
            <div xid="mapbarMap" style="height:600px;width:800px;"/> 
          </div>  
        </div> 
      </div> 
    </div> 
  </div> 
</div>
