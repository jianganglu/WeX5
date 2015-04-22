<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xhtml="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    style="height:auto;left:388px;top:482px;">
    <div component="$UI/system/components/justep/data/data" xid="data1" idColumn="col0" autoLoad="true">
      <column label="col0" name="col0" type="String" xid="default1"/>  
      <column label="col1" name="col1" type="String" xid="default2"/>  
      <data xid="default3">[{"col0":"boy","col1":"男"},{"col0":"girl","col1":"女"}]</data>
    </div>
  <div component="$UI/system/components/justep/data/data" xid="data2" idColumn="col0" autoLoad="true"><column label="col0" name="col0" type="String" xid="default4"></column>
  <column label="col1" name="col1" type="String" xid="default5"></column>
  <data xid="default6">[{&quot;col0&quot;:&quot;已婚&quot;,&quot;col1&quot;:&quot;已婚&quot;},{&quot;col0&quot;:&quot;未婚&quot;,&quot;col1&quot;:&quot;未婚&quot;}]</data></div>
  <div component="$UI/system/components/justep/data/data" xid="data4" idColumn="col0" autoLoad="true"><column label="col0" name="col0" type="String" xid="default9"></column>
  <data xid="default10">[{&quot;col0&quot;:&quot;大学本科&quot;},{&quot;col0&quot;:&quot;硕士&quot;},{&quot;col0&quot;:&quot;博士&quot;}]</data></div><div component="$UI/system/components/justep/data/data" xid="data3" idColumn="col0" autoLoad="true"><column label="col0" name="col0" type="String" xid="default7"></column>
  <data xid="default8">[{&quot;col0&quot;:&quot;汉族&quot;},{&quot;col0&quot;:&quot;壮族&quot;},{&quot;col0&quot;:&quot;苗族&quot;}]</data></div>
  <div component="$UI/system/components/justep/data/data" xid="data5" idColumn="col0" autoLoad="true"><column label="col0" name="col0" type="String" xid="default11"></column>
  <data xid="default12">[{&quot;col0&quot;:&quot;高级&quot;},{&quot;col0&quot;:&quot;中级&quot;},{&quot;col0&quot;:&quot;初级&quot;},{&quot;col0&quot;:&quot;暂无&quot;},{&quot;col0&quot;:&quot;其它&quot;}]</data></div></div>  
    <div component="$UI/system/components/justep/excelLayout/excelLayout" style="height:117%;width:912px;"
    xid="excellayout1" src="new_xls.xml" class="x-excel-layout"> 
    <input component="$UI/system/components/justep/input/input" class="form-control"
      xid="input1" style="height:100%;"/>  
    <input component="$UI/system/components/justep/input/input" class="form-control"
      xid="input2"/>
    <input component="$UI/system/components/justep/input/input" class="form-control"
      xid="input4"/>  
    <input component="$UI/system/components/justep/input/input" class="form-control"
      xid="input5"/>  
    <input component="$UI/system/components/justep/input/input" class="form-control"
      xid="input3"/>  
    <input component="$UI/system/components/justep/input/input" class="form-control"
      xid="input6"/>  
    <select component="$UI/system/components/justep/select/select" class="form-control"
      xid="select1" bind-options="data3" bind-optionsLabel="col0" bind-optionsValue="col0"/>  
    <span component="$UI/system/components/justep/select/radioGroup" class="x-radio-group"
      xid="radioGroup2" bind-itemset="data2" bind-itemsetLabel="ref('col1')" bind-itemsetValue="ref('col0')"/>  
    <span component="$UI/system/components/justep/select/radioGroup" class="x-radio-group"
      xid="radioGroup5" bind-itemset="data1" bind-itemsetLabel="ref('col1')" bind-itemsetValue="ref('col0')"/>  
    <input component="$UI/system/components/justep/input/input" class="form-control"
      xid="input11"/>  
    <input component="$UI/system/components/justep/input/input" class="form-control"
      xid="input12"/>  
    <input component="$UI/system/components/justep/input/input" class="form-control"
      xid="input13"/>  
    <select component="$UI/system/components/justep/select/select" class="form-control"
      xid="select3" bind-options="data4" bind-optionsLabel="col0" bind-optionsValue="col0"/>  
    <span component="$UI/system/components/justep/select/checkboxGroup" class="x-checkbox-group"
      xid="checkboxGroup2" bind-itemset="data5" bind-itemsetLabel="ref('col0')" bind-itemsetValue="ref('col0')"/>  
    <input component="$UI/system/components/justep/input/input" class="form-control"
      xid="input14"/>  
    <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control"
      xid="textarea3" style="height:100%;"/>  
    <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control"
      xid="textarea4" style="height:100%;"/>  
    <div class="x-blob" component="$UI/system/components/justep/blob/blobImage"
      style="height:100%;" xid="blobImage2"> 
      <div class="x-blob-bar" xid="div2"> 
        <i class="x-blob-edit icon-compose" xid="i3"/>  
        <i class="x-blob-del icon-close-round" xid="i4"/>
      </div>  
      <img class="x-blob-img x-autofill" xid="image2"/>
    </div>
  <input component="$UI/system/components/justep/input/input" class="form-control" xid="input15"></input>
  <input component="$UI/system/components/justep/input/input" class="form-control" xid="input16"></input>

  </div>
</div>
