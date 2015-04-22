define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	// 加载UI2下, 符合AMD规范的文件
	var amd1 = require("./AMD1");
	
	// 加载外网, 符合AMD规范的文件
	var outterAMD1 = require("http://wex5.com/cn/wp-content/uploads/2015/04/outterAMD1.js");

	// 加载UI2下, 不符合AMD规范的文件
	require("./noneAMD1");
	
	// 加载外网, 不符合AMD规范的文件
	require("http://wex5.com/cn/wp-content/uploads/2015/04/outterNoneAMD1.js");
	
	var Model = function(){
		this.callParent();
	};
	
	Model.prototype.importInnerBtnClick = function(event){
		// 加载UI2下, 符合AMD规范的文件
		var path = "./AMD2";
		require([path], function(m){
			m.fnOfAMD2();
		});	
	};

	Model.prototype.importOutterBtnClick = function(event){
		// 加载外网, 符合AMD规范的文件
		var path = "http://wex5.com/cn/wp-content/uploads/2015/04/outterAMD2.js";
		require([path], function(m){
			m.fnOfOutterAMD2();
		})
	};


	Model.prototype.importInnerNoneAMDBtnClick = function(event){
		// 加载UI2下, 不符合AMD规范的文件
		var path = "./noneAMD2";
		require([path], function(){
			fnOfNoneAMD2();
		});	
	};


	Model.prototype.importOutterNoneAMDBtnClick = function(event){
		// 加载外网, 不符合AMD规范的文件
		var path = "http://wex5.com/cn/wp-content/uploads/2015/04/outterNoneAMD2.js";
		require([path], function(){
			fnOfOutterNoneAMD2();
		})
	};


	Model.prototype.baiduBtnClick = function(event){
		id = this.getIDByXID("allMap");
		if (!window._baiduInitialize){
			window._baiduInitialize = function(){
			  var mp = new BMap.Map(id);
			  mp.centerAndZoom(new BMap.Point(121.491, 31.233), 11);
			};
			
			require(["http://api.map.baidu.com/api?v=1.4&ak=您的密钥&callback=_baiduInitialize"], function(){});	
		}
	};		

	return Model;
});

