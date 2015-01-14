<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="root" class="root">  
  <resource xid="default1"> 
    <style type="text/css"/> 
  </resource>  
  <div component="$UI/system/components/bootstrap/accordion/accordion" class="panel-group" xid="accordion1" 
  	onShow="accordion1Show" onHide="accordion1Hide"> 
    <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
      xid="panel1"> 
      <div class="panel-heading" xid="heading1"> 
        <h4 class="panel-title" xid="h41"> 
          <a href="javascript:void(0)" xid="a1">Title</a>
        </h4> 
      </div>  
      <div class="panel-body collapse in" xid="body1">
        <ul component="$UI/system/components/bootstrap/navs/navs" class="nav nav-tabs"
          xid="navs1"> 
          <li role="presentation" class="active" xid="li1"> 
            <a href="javascript:void(0)" xid="a4">Item</a>
          </li> 
        </ul>
      </div>
    </div>  
    <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
      xid="panel2"> 
      <div class="panel-heading" xid="heading2"> 
        <h4 class="panel-title" xid="h42"> 
          <a href="javascript:void(0)" xid="a2">Title</a>
        </h4> 
      </div>  
      <div class="panel-body collapse" xid="body2"/>
    </div>  
    <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
      xid="panel3"> 
      <div class="panel-heading" xid="heading3"> 
        <h4 class="panel-title" xid="h43"> 
          <a href="javascript:void(0)" xid="a3">Title</a>
        </h4> 
      </div>  
      <div class="panel-body collapse" xid="body3"/>
    </div>
  </div>
<a component="$UI/system/components/justep/button/button" class="btn btn-default" label="button" xid="button1" onClick='{"operation":"accordion1.show", "args": {"index": 1}}'>
   <i xid="i1"></i>
   <span xid="span1"></span></a></div>
