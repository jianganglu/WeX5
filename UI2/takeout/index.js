define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Baas = require("$UI/demo/baas/baas");
		
	require("$UI/system/lib/cordova/cordova");
	require("cordova!org.apache.cordova.device");
	require("res!./img");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		var self = this;
		
		$(self.getElementByXid("photoDiv")).hide();
		
		// 获取url上的code参数 - 微信授权code，用于获取微信用户信息
		var weixinCode = this.getContext().getRequestParameter("code");

		// 判断运行环境是否在X5移动客户端中，如果在移动客户端中，则当deviceready后取手机设备uuid作为用户唯一标识
		if (justep.Browser.isX5App) {
			document.addEventListener("deviceready", function() {
				self.loadUserData({
					"id" : window.device.uuid,
					"name" : "新用户（来自X5APP的用户）"
				});
			}, false);
		} else if (weixinCode !== "") {
			// 微信用户
			$.getJSON("/baas/weixin/userinfo?code=" + weixinCode, function(weixinUser) {
				$(self.getElementByXid("photoDiv")).show();
				$(self.getElementByXid("photoImage")).attr("src", weixinUser.headimgurl);
				self.loadUserData({
					"id" : weixinUser.openid,
					"name" : weixinUser.nickname + "（来自微信的用户）",
					"address" : weixinUser.country + weixinUser.province + weixinUser.city
				});
			});
		} else {
			this.loadUserData({
				"id" : "user",
				"name" : "新用户"
			});
		}
	};

	Model.prototype.loadUserData = function(userInfo) {
		this._userID = userInfo.id;
		
		var userData = this.comp("userData");
		userData.refreshData();
		// 如果客户信息为空，新增客户信息
		if (userData.getCount() === 0) {
			this.createNewUser(userInfo);
		}
		
		// 加载客户信息后，加载客户已有的订单
		this.comp("orderData").refreshData();
		this.comp("orderList").refresh();
	};

	Model.prototype.createNewUser = function(userInfo) {
		this.comp("userData").newData({
			index : 0,
			defaultValues : [ {
				"fID" : userInfo.id,
				"fName" : userInfo.name,
				"fAddress" : userInfo.address
			} ]
		});
	};

	Model.prototype.addCartBtnClick = function(event) {
		var row = event.bindingContext.$object;
		var cartData = this.comp("cartData");
		if (cartData.find(['fFoodID'], [row.val('fID')]).length === 0) {
			cartData.newData({
				index : 0,
				defaultValues : [ {
					"fFoodID" : row.val("fID"),
					"fName" : row.val("fName"),
					"fPrice" : row.val("fPrice"),
					"fCount" : 1
				} ]
			});
		}
	};

	Model.prototype.addCountBtnClick = function(event) {
		var row = event.bindingContext.$object;
		row.val("fCount", row.val("fCount") + 1);
	};

	Model.prototype.reduceCountBtnClick = function(event) {
		var row = event.bindingContext.$object;
		row.val("fCount", (row.val("fCount") > 0) ? row.val("fCount") - 1 : 0);
	};

	Model.prototype.saveOrderBtnClick = function(event) {
		var self = this;
		var orderData = this.comp("orderData");
		var cartData = this.comp("cartData");
		var userData = this.comp("userData");
		
		// 数据校验
		if ($.trim(userData.val("fName")) === "" || $.trim(userData.val("fPhoneNumber")) === "" || $.trim(userData.val("fAddress")) === "") {
			justep.Util.hint("请填写完整的用户信息", {
				"type" : "danger"
			});
			return;
		}

		// 合并订单内容 
		var content = "";
		cartData.each(function(options) {
			var row = options.row;
			content = content + row.val("fName") + "(" + row.val("fCount") + ") ";
		});

		// 生成订单数据
		var orderRows = orderData.newData({
			index : 0,
			defaultValues : [ {
				"fID" : justep.UUID.createUUID(),
				"fCreateTime" : justep.Date.toString(new Date(), justep.Date.STANDART_FORMAT),
				"fContent" : content,
				"fUserID" : userData.val("fID"),
				"fUserName" : userData.val("fName"),
				"fPhoneNumber" : userData.val("fPhoneNumber"),
				"fAddress" : userData.val("fAddress"),
				"fSum" : cartData.sum("calcMoney") + ""
			} ]
		});

		// 保存数据
		var params = {
			"userData" : userData.toJson(true),
			"orderData" : orderData.toJson(true)
		};
		var success = function(resultData) {
			orderData.applyUpdates();
			userData.applyUpdates();
			// 保存成功清除购物车，并跳转到订单页
			cartData.clear();
			justep.Util.hint("下单成功，谢谢您的订餐！");
			self.comp("contents").to("orderContent");
		};
		var error = function(msg) {
			// 保存失败后清除订单数据
			orderData.deleteData(orderRows);
			Baas.showError(msg);
		};
		Baas.sendRequest({
			"url" : "/takeout",
			"action" : "save",
			"params" : params,
			"success" : success,
			"error" : error
		});
		
	};

	Model.prototype.cleanCartBtnClick = function(event) {
		this.comp("cartData").clear();
	};

	Model.prototype.saveUserBtnClick = function(event) {
		var userData = this.comp("userData");
		var params = {
			"userData" : userData.toJson(true)
		};
		var success = function(resultData) {
			userData.applyUpdates();
			justep.Util.hint("用户信息保存成功");
		};
		Baas.sendRequest({
			"url" : "/takeout",
			"action" : "save",
			"params" : params,
			"success" : success
		});
	};

	// 转换动态图片URL 
	Model.prototype.transURL = function(url) {
		return require.toUrl(url);
	};
	
	Model.prototype.foodDataCustomRefresh = function(event){
		var data = event.source;
		var params = {
//			"columns" : data.getColumnIDs(),
// 			应从前端传入完整列定义（Baas.getDataColumns(data)）， 以解决oracle等数据库不区分date、time、datetime，导致的数据格式转换问题；
//			服务端兼容了以前只传入列名字符串（data.getColumnIDs()）的写法，但是已不再推荐。				
			"columns" : Baas.getDataColumns(data)
		};
		var success = function(resultData) {
			var append = event.options && event.options.append;
			data.loadData(resultData, append);
		};
		Baas.sendRequest({
			"url" : "/takeout",
			"action" : "queryFood",
			"params" : params,
			"success" : success
		});
	};
	
	Model.prototype.userDataCustomRefresh = function(event){
		var data = event.source;
		var params = {
			"columns" : Baas.getDataColumns(data),
			"id" : this._userID
		};
		var success = function(resultData) {
			var append = event.options && event.options.append;
			data.loadData(resultData, append);
		};
		Baas.sendRequest({
			"url" : "/takeout",
			"action" : "queryUser",
			"params" : params,
			"success" : success
		});
	};
	
	Model.prototype.orderDataCustomRefresh = function(event){
		var data = event.source;
		var params = {
			"columns" : Baas.getDataColumns(data),
			"limit" : event.limit,
			"offset" : event.offset,
			"userID" : this._userID
		};
		var success = function(resultData) {
			var append = event.options && event.options.append;
			data.loadData(resultData, append);
		};
		Baas.sendRequest({
			"url" : "/takeout",
			"action" : "queryOrder",
			"params" : params,
			"success" : success
		});
	};
	
	return Model;
});