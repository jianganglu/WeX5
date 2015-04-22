define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var biz = require('$UI/system/lib/biz');
	var Encoder = require("$UI/SA/weixin/weixinEncoder");
	var isLoad = "0";
	var Model = function(){
		this.callParent();
	};



	Model.prototype.btnOrgSynchClick = function(event){
		var row = this.comp("corpdata").getCurrentRow();
	    if(row.val("scorpID")==null || row.val("scorpID") == ""){
	    	alert("请先输入企业号及应用");
	    	return;
	    }
	    
		var actionName = "orgSynchToWeixinAction";
		var configKey = row.val("scorpID") ;//"wx415777370afff2293";  //wxd869657006aa364d
		var AccountType = this.comp("data2").getValue("fValue");    
		var keepTopOrg = this.comp("checkbox").value; 
		if(keepTopOrg == null)
		   keepTopOrg = "0";          
		var SynchToWxUrl = require.toUrl('$UI/SA/weixin/Synchweixin.j?actionName='+actionName+"&AccountType="+AccountType+"&keepTopOrg="+keepTopOrg+"&configKey="+configKey);
		alert("同步操作已在后台执行，执行结果请查看日志");
		debugger;
       
	    var result = $.ajax({
	            type: "POST",
	            processData: false,
	            url:  SynchToWxUrl,
	            success: function(data){
                       
                      },
	            cache:false,
	            async: true
	        });
	   
	};



	Model.prototype.treedataCreate = function(event){
		 debugger;
		event.source.defTreeOption.isTree = true;
		event.source.defTreeOption.prarentRelation = "parent";
		event.source.defTreeOption.nodeKindRelation = "Name";
		event.source.directDeleteMode = true;
	};



	Model.prototype.btnnewClick = function(event){
		var row = this.comp("corpdata").getCurrentRow();
	    if(row.val("scorpID")==null || row.val("scorpID") == ""){
	    	alert("请先输入企业号");
	    	return;
	    }
		
		var data = this.comp("treedata");	
		var len = data.getCount();

		var level = "应用";
		 data.newData({
			index : 0,
			defaultValues : [ {
				"id" : justep.UUID.createUUID(),
			    "corpId":row.val("scorpID"),
				"level":level
			} ]
		});
	};



	Model.prototype.btnsubNewClick = function(event){
		var data = this.comp("treedata");
		var ParentRow = data.getCurrentRow();
		var parent = ParentRow.val("id");
		var level = ParentRow.val("level");
		var appid = ParentRow.val("appID");
	    var corpId = ParentRow.val("corpId");
	    var httpURL = ParentRow.val("httpURL");
		var defaultlevel = "";  
		if(level == "应用"){
		    defaultlevel = "一级菜单";
		    //一级菜单最多为3个
		    var rows = this.comp('treedata').find(['parent'],[parent]);
		    if(rows.length == 3){
		    	alert("一级菜单最多3个");
		    	return;
		    }
		}
	    else if(level == "一级菜单"){
		    defaultlevel = "二级菜单";
		    var rows = this.comp('treedata').find(['parent'],[parent]);
		    if(rows.length == 5){
		    	alert("二级菜单最多5个");
		    	return;
		    }
		}
		else{
			  alert("菜单树最多三级");
			 return;
		 }
		
		 data.newData({
		    parent : ParentRow,
			index : 0,
			defaultValues : [ {
				"id" : justep.UUID.createUUID(),
				"parent":parent,
				"level":defaultlevel,
				"appID":appid,
				"corpId":corpId,
				"sType":"功能菜单",
				"httpURL":httpURL
			} ]
		});
	};

    Model.prototype.saveMenuData = function() {
       var data = this.comp("treedata");
       var json = data.toJson();
       var sjson = JSON.stringify(json);       
       delete  json.userdata;   
       var jsonStr =JSON.stringify(json);
       var params = new biz.Request.ActionParam();                                
	   params.setString("strJson", jsonStr);
       biz.Request.sendBizRequest({
            "context": this.getContext(),                    
             	
			"action": "saveMenuConfigAction",
			"parameters": params,
		
			"callback": function(result) {
				if (result.state) {
			    
				} else {
					throw new Error("保存失败！|" + result.response.message);
				}
			}
       });
	};
	
	 Model.prototype.checkURL = function() {
		 var data = this.comp('treedata');
		 var info = "";
		 data.each(function(options) {
			var row = options.row;	
			if(row.val("level")!= "应用"  && !row.hasChildren() &&  (row.val("URL")==null || row.val("URL")== "")){
				info = info + row.val("name") +"\n"
			}
			
		});
		return info;
		
	 };
	 
	 Model.prototype.checkName = function(){
		 var data = this.comp('treedata');
		 var info = "";
		 
		 data.each(function(options) {
			var row = options.row;	
			if(row.val("Name")==null || row.val("Name")== ""){
				info = "名称不能为空，请补充完整！";
				return ;
			}
			
		});
		
		return info;
		
	 };
	 

	Model.prototype.btnSynchClick = function(event){
		 //同步菜单
     //检查是否有名称为空的数据
     var info = this.checkName();
     if(info != ""){
		alert(info);
		return;
	 }
	
	 //检查最末级数据是否有功能URL，如果没有，则提示添加
	 info = this.checkURL();
     if(info != ""){
		alert("以下菜单节点需要设置功能路径："+info);
		return;
	 }
       //获取所有一级菜单的应用
       this.saveMenuData();
      var rows = this.comp('treedata').find(['level'],['应用']);
      if(rows.length==0){ 
    	  alert('没有获取到应用');
    	  return;
      }
  
      var actionName="menuSynchToWxAction";
      var errInfo = "";
       for(var i =0;i<rows.length;i++){
           var AppID = rows[i].val("appID");//"1";
           var configKey =rows[i].val("corpId") + AppID;// "wx415777370afff229";
           
     
           var SynchToWxUrl = require.toUrl('$UI/SA/weixin/Synchweixin.j?actionName='+actionName+"&agentId="+AppID+"&configKey="+configKey);
	       var result = $.ajax({
	            type: "POST",
	            processData: false,
	            url:  SynchToWxUrl,
	            cache:false,
	            async: false
	        });
	        
	        if (!result.state){	        	  
	        	var errInfo = errInfo + "ID为："+AppID +" 的应用同步菜单失败\n";
	        }
   
       }
       if(errInfo != "" && errInfo != undefined)
    	   alert(errInfo);
       else
           alert("同步菜单成功");
	};
	

	Model.prototype.functionDialogReceive = function(event){
		 debugger;
	     var data = event.data;
	     var treedata = this.comp("treedata");

         treedata.setValue("path",data.row.path.value.latestValue );  
	     var URL =  data.row.url.value.latestValue+"?process="+data.row.process.value.latestValue+"&activity="+data.row.activity.value.latestValue;
	     URL = URL.replace("$UI","../..");
	     var appid = treedata.val("corpId");
	     var configKey = treedata.val("corpId")+treedata.val("appID");
	     var httpURL = treedata.val("httpURL");
		 var wxURL = weixinEncoder(URL,appid,configKey,httpURL);
		 treedata.setValue("funcURL",URL);
		 treedata.setValue("URL",wxURL);
	};
	

	Model.prototype.input_button1Click = function(event){
		
	    var treedata = this.comp("treedata");
	    var level = treedata.val("level");
	    if(level == "应用"){
	    	alert("应用节点不需要选择功能");
	    	return;
	    }
	    

		this.comp("functionDialog").open({
				"data" : {
					"roots" : "UI2",
					"files" : ".function.xml", 
					"identity" : true
				}	
			});
	};
	

	Model.prototype.treedataCustomRefresh = function(event){
		//加载菜单数据
		if(isLoad == "0"){
		biz.Request.sendBizRequest({
		    "context": this.getContext(),                     
		  
			"action": "getMenuConfigAction",
			
			"callback": function(result) {
			if (result.state) {
			    var configstr = result.response;
			    if(configstr != null && configstr!= "" && configstr != "invalid"){
			    	configstr = "{\"@type\" : \"table\",\"rows\" :"+configstr+"}" ;
			    	
			    	event.source.loadData($.parseJSON(configstr));			    	
			      
			    }
				  
				} else {
					throw new Error("加载数据失败！|" + result.response.message);
				}
			}
		  });
		  isLoad = "1";
		}
	};
	

	Model.prototype.modelModelConstructDone = function(event){
		var treeData = this.comp("treedata"); 
		isLoad = "0";
		if (!treeData.isLoaded()) {
			treeData.refreshData();
		}
		
		this.comp("corpdata").newData({
			index : 0,
			defaultValues : [ {
				"id" : justep.UUID.createUUID()
			   
			} ]
		});
	};
	

	Model.prototype.btnDeleteClick = function(event){
		//删除需要从最末级开始
		 var data = this.comp('treedata');
	     var parent = data.getCurrentRowID();
		 var rows = data.find(['parent'],[parent]);
		 if(rows.length > 0){
			 alert("当前数据有子节点，请先删除下级节点！");
			 return;
		 }
		 data.deleteData(data.getCurrentRow());
		
		 //删除完成后保存配置
		 this.saveMenuData();
	};
	

	Model.prototype.treedataValueChanged = function(event){
	    if(event.col == "Name"){
	        var row = event.row.row;
	        if(row.level.value.latestValue == "一级菜单" && event.value.length>=16){
	            alert("一级菜单标题不能超过16个字节！");
	        	event.value = row.Name.originalValue;	
	        	this.comp('treedata').getCurrentRow().val("Name",event.value);	        	
	        }
	        
	        if(row.level.value.latestValue == "二级菜单" && event.value.length>=40){
	            alert("二级菜单标题不能超过40个字节！");
	        	event.value = row.Name.originalValue;	        
	        	this.comp('treedata').getCurrentRow().val("Name",event.value); 	
	        }   	    
	    }
       if(event.col == "appID" || event.col == "corpId" || event.col == "httpURL" ){
    	  //修改这些数据后，需要重新生成微信菜单的URL
	
    	   var row = this.comp("treedata").getCurrentRow();
    	   if(row.val("appID")!= "" && row.val("corpId")!= "" && row.val("httpURL")!= "" && row.val("funcURL") != ""){//funcURL
         	  var URL = row.val("funcURL");
         	  var appid = row.val("corpId");
         	  var configKey = row.val("corpId")+row.val("appID");
         	  var httpURL = row.val("httpURL");
         	
         	  var	  wxURL = weixinEncoder(URL,appid,configKey,httpURL);
        
         	  this.comp("treedata").setValue("URL",wxURL);
           }	     
       } 
	};
	
	

	Model.prototype.tabItem2Click = function(event){
		var lbValue = $(this.getElementByXid("label3"));
		lbValue[0].innerText = "企业号：";
		var row = this.comp("corpdata").getCurrentRow();
		 row.val('scorpID','');	
	};
	

	Model.prototype.tabItem1Click = function(event){
		var lbValue = $(this.getElementByXid("label3"));
		lbValue[0].innerText = "企业号及应用";
		var row = this.comp("corpdata").getCurrentRow();
		 row.val('scorpID','');
	    
	};
	

	Model.prototype.btnlogoutClick = function(event){
	    var data = this.comp("treedata");
		var ParentRow = data.getCurrentRow();
		var parent = ParentRow.val("id");
		var level = ParentRow.val("level");
		var appid = ParentRow.val("appID");
	    var corpId = ParentRow.val("corpId");
	    var httpURL = ParentRow.val("httpURL");
		var defaultlevel = "";  
		if(level == "应用"){
		    defaultlevel = "一级菜单";
		    //一级菜单最多为3个
		    var rows = this.comp('treedata').find(['parent'],[parent]);
		    if(rows.length == 3){
		    	alert("一级菜单最多3个");
		    	return;
		    }
		}
	    else if(level == "一级菜单"){
		    defaultlevel = "二级菜单";
		    var rows = this.comp('treedata').find(['parent'],[parent]);
		    if(rows.length == 5){
		    	alert("二级菜单最多5个");
		    	return;
		    }
		}
		else{
			  alert("菜单树最多三级");
			 return;
		 }
		 
		
		 var URL=prompt("请输入菜单访问路径");
	     if(URL)
	     {
           data.newData({
		    parent : ParentRow,
			index : 0,
			defaultValues : [ {
				"id" : justep.UUID.createUUID(),
				"parent":parent,
				"level":defaultlevel,
				"appID":appid,
				"corpId":corpId,
				"URL":URL,
				"sType":"非功能菜单",
			} ]
           });
	     }
    
		 
	};
	

	return Model;
});