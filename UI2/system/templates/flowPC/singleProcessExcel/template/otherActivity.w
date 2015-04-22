<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xu="http://www.xmldb.org/xupdate"
  xmlns:xui="http://www.justep.com/xui" component="$UI/system/components/justep/window/window" extends="{{parent}}"> {{#each keys}}
  <div xid="{{key_id}}" autoLoad="true" autoNew="false" xui:update-mode="merge"/> {{/each}}
</div>
