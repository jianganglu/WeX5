define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	//加载UI2下的css文件
	require("css!./innerCss1").load();
	require("css!$UI/demo/misc/importCss/innerCss2").load();
	
	//加载外网的css文件
	require("css!http://wex5.com/cn/wp-content/uploads/2015/04/outterCss1.css").load();
	
	//加载UI2下的text文件
	var innerText1 = require("text!./innerText1.txt");
	
	//加载外网的text文件
	var outterText1 = require("text!http://wex5.com/cn/wp-content/uploads/2015/04/outterText1.txt");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
		alert("innerText1 content: " + innerText1 + "\n" 
				+ "outterText1 content: " + outterText1 );
	};

	//动态加载UI2下的text文件
	Model.prototype.innerTextBtnClick = function(event){
		var path = "text!./innerText2.txt";
		require([path], function(content){
			alert("innerText2 content: "  + content);
		});
	};


	//动态加载外网的text文件
	Model.prototype.outterTextBtnClick = function(event){
		var path = "text!http://wex5.com/cn/wp-content/uploads/2015/04/outterText2.txt";
		require([path], function(content){
			alert("outterText2 content: "  + content);
		});
	};


	return Model;
});