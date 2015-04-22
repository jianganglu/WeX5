define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var bizService = require("$UI/system/components/designerCommon/js/bizModelService");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	
	var templateMap = {
	
	};
	
	var layoutData;
	var componentName;
	
	var Model = function(){
		this.callParent();
	};
	
	Model.prototype.getCompTemplate = function(compName){
	    return '';
	};
	
	/**获取组件模板***/
	Model.prototype.getCompTemplate = function(compName,appendAttrs){
	   var templateContent = templateMap[compName];
	   if(!templateContent){
	     templateContent =  xuiDoc.getTemplate(compName);
	     templateMap[compName] = templateContent;
	   }
	   if(templateContent){
		   var idx = templateContent.indexOf(">");
		   var idx1 = templateContent.indexOf("/>");
		   if(idx1>0 && idx1<idx){
		      idx = idx1;
		   }
		   if(idx>0){
		      templateContent = templateContent.substring(0,idx)+appendAttrs+templateContent.substring(idx);
		   }
	   }
	   return templateContent;
	}
	
	Model.prototype.addClass = function(templateContent,cls){
		   var idx = templateContent.indexOf(">");
		   var idx1 = templateContent.indexOf("/>");
		   if(idx1>0 && idx1<idx){
		      idx = idx1;
		   }
		   if(idx>0){
		      var str = templateContent.substring(0,idx);
		      var idx2 = str.indexOf(" class");
		      if(idx2>0){
		    	 var idx3 =  templateContent.indexOf('\"',idx2);
		    	 templateContent = templateContent.substring(0,idx3+1)+" "+cls+" "+templateContent.substring(idx3+1);
		      }else{
		    	  templateContent = templateContent.substring(0,idx)+' class="'+cls+'" '+templateContent.substring(idx);
		      }
		   }
	   return templateContent;
	}
		
	
	
	
	/**构建表单布局**/
	Model.prototype.buildFormLayout = function(dataXid/*数据xid*/,rows/*选择的行数据*/,colNumber/*创建的列数*/){
	   layoutData = "";
	   var colSplitMap = {"1":[2,8],"2":[2,4],"3":[2,2],"4":[1,2]};//列数比例映射
	   var buf = [];
	   buf.push('<div class="form-horizontal container-fluid" component="$UI/system/components/bootstrap/form/form">');
	   for(var i = 0,l = rows.length ; i<l ;){
		    buf.push('<div class="form-group">');
		    var colSplitItem = colSplitMap[""+colNumber];
		    for(var j = 0 ; j<colNumber ; j+=1){
		       var row = rows[i++];
		       if(!row){
		          break;
		       }
		       var name = row.val("name");
		     
		       var template = this.getCompTemplate(row.val("compType"),' bind-ref="'+dataXid+'.ref(\''+name+'\')"');
	
			   buf.push('<div class="col-sm-'+colSplitItem[0]+'"><label class="control-label" bind-text="'+dataXid+'.label(\''+name+'\')">'+row.val("label")+'</label> </div>');
			   buf.push('<div class="col-sm-'+colSplitItem[1]+'">'+template+'</div>');
		    }
		    
		    buf.push('</div>');
	   }
	   buf.push('</div>');
	   return buf.join("");
	}
	
	/**构建表格布局**/
	Model.prototype.buildCellLayout = function(dataXid/*数据xid*/,rows/*选择的行数据*/,colNumber/*创建的列数*/){
	   layoutData = "";
	   var layoutContentbuf = [];
	   var controlBuf = [];
	   layoutContentbuf.push('<layout-content xid="default7"><![CDATA[ ');
	   layoutContentbuf.push('<table cellspacing="0" cellpadding="0" rowHeight="22" columnWidth="80" style="border-collapse:collapse;table-layout:fixed;width:1px;">');
	   
	   //创建第一行
	   layoutContentbuf.push('<tr><td/>');
	   for(var j = 0 ; j<colNumber ; j+=1){
	      layoutContentbuf.push('<td style="width: 100px;"/>');
          layoutContentbuf.push('<td style="width: 180px;"/>');
	   }
	   layoutContentbuf.push("</tr>");

	   for(var i = 0,l = rows.length ; i<l ;){
	    	layoutContentbuf.push('<tr><td/>');
		    for(var j = 0 ; j<colNumber ; j+=1){
		       var row = rows[i++];
		       if(!row){
		          break;
		       }
		       var name = row.val("name");
		       var xid1 = "controlLabel_xx"+i;
		       var xid2 = "input_xx"+i;
		       
		        var template = this.getCompTemplate(row.val("compType"),' xid="'+xid2+'"'+' bind-ref="'+dataXid+'.ref(\''+name+'\')"');
		        
		        template = this.addClass(template, "x-cell-control");
		        
		       controlBuf.push('<label xid="'+xid1+'" class="control-label" bind-text="'+dataXid+'.label(\''+name+'\')">'+row.val("label")+'</label>');
		       controlBuf.push(template);
			   
			   layoutContentbuf.push('<td style="width: 100px;"  componentId="'+xid1+'"></td>');
			   layoutContentbuf.push('<td style="width: 180px;"  componentId="'+xid2+'"></td>');
		    }
		    layoutContentbuf.push("</tr>");
	   }
	   
	   layoutContentbuf.push('</table>');
	   layoutContentbuf.push(']]></layout-content>');
	   
	   return '<div class="x-cell-layout" component="$UI/system/components/justep/cellLayout/cellLayout" style="width:100%; height: 100%;">'+layoutContentbuf.join("")+controlBuf.join("")+'</div>';
	}
 
	/**构建Excel布局**/
	Model.prototype.buildExcelLayout = function(rows,colNumber){
	
	}
	
	/**构建绝对布局**/
	Model.prototype.buildAbsoluteLayout = function(dataXid/*数据xid*/,rows/*选择的行数据*/,colNumber/*创建的列数*/){
	   layoutData = "";
 
	   var buf = [];
	   buf.push('<div class="x-absolute-layout" component="$UI/system/components/justep/absoluteLayout/absoluteLayout"  style="width:100%; height: 100%;" >');
	  var offsetTop = 15,colSpace = 40,rowSpace = 50,labelWidth = 120,controlWidth = 160;
	   for(var i = 0,l = rows.length ; i<l ;){
		    var offsetLeft = 15;
		    for(var j = 0 ; j<colNumber ; j+=1){
		       var row = rows[i++];
		       if(!row){
		          break;
		       }
		       var name = row.val("name");
		       var labelStyle = 'style="position:absolute;width:'+labelWidth+'px;left:'+offsetLeft+'px;top:'+(offsetTop+8)+'px;"';
		       offsetLeft = offsetLeft +10 + labelWidth;
		       var controlStyle = ' style="position:absolute;width:'+controlWidth+'px;left:'+offsetLeft+'px;top:'+offsetTop+'px;"';
		       var template = this.getCompTemplate(row.val("compType"),controlStyle+' bind-ref="'+dataXid+'.ref(\''+name+'\')"');
		      
			   buf.push('<label '+labelStyle+' class="control-label" bind-text="'+dataXid+'.label(\''+name+'\')">'+row.val("label")+'</label> ');
			   buf.push(template);
			   
			   offsetLeft =offsetLeft + controlWidth + colSpace;
		    }
		    offsetTop += rowSpace; 
	   }
	   buf.push('</div>');
	   return buf.join("");
	}
	
	/**点确定前调用的处理，做校验**/
	Model.prototype.beforeOkAction = function(){
	   var settingData = this.comp("setting");
	   var dataXid = settingData.val("dataXid");
	   if(!dataXid){
	       return "请选择data";
	   }
	      
	   var rows = [];
	   var relationListData = this.comp("relationList");
		relationListData.each(function(param){
		    var selected = relationListData.getValue("selected",param.row);
		    if(selected){
		      rows.push(param.row);
		    }
		});
	   if(rows.length == 0){
	       return "请选择关系";
	   }
	
	   var layoutType = settingData.val("layoutType");
	   var colNumber = settingData.val("colNumber");
	   	   
	   if(layoutType == 'form'){
	      layoutData = this.buildFormLayout(dataXid,rows, colNumber);
	   }else if(layoutType == 'cellLayout'){
	      layoutData = this.buildCellLayout(dataXid,rows, colNumber);
	   }else if(layoutType == 'absoluteLayout'){
	      layoutData = this.buildAbsoluteLayout(dataXid,rows, colNumber);
	   }
	}
	
	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function(){
		return {templateContent:layoutData,componentName:componentName}; 
	};

	Model.prototype.modelLoad = function(event){
	    //获取上下文参数
		this.context = xuiService.getPageParams();
		var data = this.comp("dataList");
		var sNodes = xuiDoc.selectNodes("//*[@component='$UI/system/components/justep/data/bizData' or @component='$UI/system/components/justep/data/data']");
		$(sNodes).each(function(idx){
		   var $this = $(this);  
		   data.add({col0:$this.attr("xid")});
		});
	};

	/** 上移 **/
	Model.prototype.upClick = function(event){

	};

	/** 下移 **/
	Model.prototype.downClick = function(event){

	};

    /** 选择数据 **/
	Model.prototype.select2Change = function(event){
		 var value = event.value;  
		 if(value){
		   var datasource =  xuiDoc.getEditorDataSource("RelationDatasource.getDatasource","xid",value);
		   for(var i = 0;i<datasource.length;i+=1){
		      datasource[i].compType = "$UI/system/components/justep/input/input";
		   }
		  this.comp("relationList").loadData({rows:datasource});
		 }
	};
	
 

	Model.prototype.checkAllChange = function(event){
	   var relationListData = this.comp("relationList");
		relationListData.each(function(param){
			relationListData.setValue("selected",event.value,param.row)
		});
	};
	
 

	return Model;
});