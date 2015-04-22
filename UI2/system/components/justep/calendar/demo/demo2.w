<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:285px;top:13px;"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"> 
    <div class="x-panel-top"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="日程"
        class="x-titlebar"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label="返回"
            class="btn btn-link btn-icon-left" icon="icon-chevron-left" onClick="backBtnClick"
            xid="backBtn"> 
            <i class="icon-chevron-left"/>  
            <span>返回</span> 
          </a> 
        </div>  
        <div class="x-titlebar-title">日程</div>  
        <div class="x-titlebar-right reverse"/> 
      </div> 
    </div>  
    <div class="x-panel-content"> 
      <div component="$UI/system/components/justep/bar/bar" class="x-bar" xid="bar1"
        style="background-color:white;"> 
        <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group btn-group-sm"
          tabbed="true" xid="viewTypeButtonGroup" selected="monthBtn"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="年" xid="yearBtn" onClick="yearBtnClick"> 
            <i xid="i7"/>  
            <span xid="span9">年</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="月" xid="monthBtn" onClick="monthBtnClick"> 
            <i xid="i1"/>  
            <span xid="span1">月</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="周" xid="weekBtn" onClick="weekBtnClick"> 
            <i xid="i2"/>  
            <span xid="span2">周</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="天" xid="dayBtn" onClick="dayBtnClick"> 
            <i xid="i3"/>  
            <span xid="span3">天</span> 
          </a> 
        </div>  
        <div style="flex:1"></div> 
      </div>  
      <div style="height:48px;" class="clearfix">  
	      <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group btn-group-sm pull-right"
	        tabbed="false" xid="viewTypeButtonGroup"> 
	        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
	          xid="prevBtn" onClick="prevBtnClick" icon="icon-chevron-left"> 
	          <i xid="i8" class="icon-chevron-left"/>  
	          <span xid="span6"/> 
	        </a>
	        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
	          label="今天" xid="todaybtn" onClick="todayBtnClick"> 
	          <i xid="i9"/>  
	          <span xid="span7">今天</span> 
	        </a>  
	        <div class="btn-group" style="min-width: 0;"> 
	          <button class="btn btn-default dropdown-toggle btn-sm" type="button"
	            id="dropdownMenu1" data-toggle="dropdown">月
	            <span class="caret"/> 
	          </button>  
	          <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"
	            style="     width: 40px; "> 
	            <li role="presentation">
	              <a role="menuitem" tabindex="-1" href="#">年</a>
	            </li>  
	            <li role="presentation">
	              <a role="menuitem" tabindex="-1" href="#">月</a>
	            </li>  
	            <li role="presentation">
	              <a role="menuitem" tabindex="-1" href="#">天</a>
	            </li> 
	          </ul> 
	        </div>  
	        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
	          xid="nextBtn" onClick="nextBtnClick" icon="icon-chevron-right"> 
	          <i xid="i10" class="icon-chevron-right"/>  
	          <span xid="span10"/> 
	        </a> 
	      </div>
	  <div>      
      <div component="$UI/system/components/justep/calendar/calendar" view="month"
        xid="calendar" onAfterEventsLoad="calendarAfterEventsLoad" onAfterViewLoad="calendarAfterViewLoad"
        day="2013-01-01" timeStart="06:00" timeEnd="22:00" timeSplit="60" firstDay="monday"/> 
    </div> 
  </div>  
 	 </div> 
  </div> 
</div>