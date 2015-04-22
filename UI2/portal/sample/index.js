define(function(require){
	var $ = require("jquery"),
		FastClick = require("$UI/system/components/justep/lib/fastclick"),
		Notification = require('./js/notification'),
		RouteUtil = require('$UI/system/lib/route/routeUtil'),
		WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer"),
		justep = require("$UI/system/lib/justep");
	
	require("$UI/system/lib/cordova/cordova");
	require('$UI/system/lib/jquery/transition');
	
	require("w!$UI/portal/sample/main/main.w");
	require("w!$UI/portal/sample/menu/left2.w");
	
	//为了compose后postMessage到这里终止
	window.isPortalWindow = true;
	
	//主要配置
	var mainPage = {
			url: '$model/UI2/portal/sample/main/main.w',
			process: "/portal/process/message/messageProcess", 
			activity: "mainActivity"},
		leftPage = '$UI/portal/sample/menu/left2.w',
		mainPageId = 'main';
	
	var Model = function(){
		this.init();
		this.callParent();
		this.initRoute();
	};
	
	Model.prototype = {
		getBSessionID: function(){
			return this.getContext().getBSessionID();
		},
		getLanguage: function(){
			return this.getContext().getLanguage();
		},
		getSkin: function(){
			return this.getContext().getSkin();
		},
		//返回一个.w url
		getURL: function(url, args){
			
			if(!url) return;
			if(typeof url !== 'string'){
				args = url;//TODO clone;
				url = args.url;
				delete args.url;
			}
			args = args || {};
			if(url && url.indexOf("http")!==0){
				//args.language = args.language || this.getLanguage();
				//args.skin = args.skin || this.getSkin();
				//args.bsessionid = justep.URL.getBSessionID();
				var params = [];
				for(var key in args){
					if(args.hasOwnProperty(key))
						params.push(key + '=' + (args[key] || ''));
				}
				params = params.join('&');
				url = url + (url.indexOf('?') == -1?'?':'&') + params;
				url = require.toUrl(url);
            }
            return url;
		},
		init: function(){
			//初始化接受postMessage消息
			var me = this;
			$(window).on('message',function(message){
				var data = message.originalEvent.data;
				try{/*这里是为了兼容IE9*/
					data = JSON.parse(data);
				}catch(e){}	
				if(data.type == "portal" && data.event){
					var name = data.event.name;
					if(typeof me[name] == 'function')
							me[name].apply(me, data.event.args);
				}
			});
		},
		getActivePage: function(){
			var pages = this.comp('pages');
			var activeXid = pages.getActiveXid();
			var $active = pages.getContent(activeXid);
			return $active; 
		},
		
		dispatchChange : function(innerStateValue){
			
			var $active = this.getActivePage();
			if($active.innerContainer && $active.innerContainer.getInnerModel()){
				$active.innerContainer.getInnerModel().postMessage({
					type:"routeState",
					newUrl:innerStateValue
				});
			}
		},
		
		subscribeChange : function(){
			var pages = this.comp('pages');
			for(var i in pages.contents){
				var content = pages.contents[i];
				if(content.innerContainer){
					content.innerContainer.off('onRouteStatePublish');
				}
			}
			var $active = this.getActivePage();
			if($active.innerContainer){
				$active.innerContainer.on('onRouteStatePublish',function(event){
					this.addRouteInnerItem($active.xid,event.hashbang,event.isReplace);
				},this);
			};
		},
		
		addRouteInnerItem : function(xid,hashbang,isReplace){
			var $routeState = this.$routeState;
			$routeState.addInnerState(xid,'',hashbang);
			$routeState.publishState(isReplace);
		},
		
		initRoute:function(){
			var self = this;
			/*var formateUrl = function(url){
				if(url){
					var urlArray = url.split('#!');
					if(urlArray.length > 1){
						urlArray[1] = "("+ urlArray[1] +")";
					}
					return urlArray.join('#!');
				}
				return;
			};
			
			this.$routeState.on('onDispathChange',function(event){
				var message = event.data;
				message.newUrl
				var newUrl = message.newUrl;
				var oldUrl = message.oldUrl;
				//message.newUrl = formateUrl(newUrl);
				//message.oldUrl = formateUrl(oldUrl);
			},this);*/
			
			this.$routeState.on('onRoute',function(event){
				self.doRoute(event);
			},this);
		},
		doRoute :function(event){
			var pages = this.comp('pages');
			var self = this;
			var dtd = event.dtd;
			if(event.routeState == 'leave'){
				event.cancel = true;
				var leaveXid = event.xid;
				var $leave = pages.getContent(leaveXid);
				if($leave){
					$leave.off('onRouteStatePublish');
				}
			}else if(event.routeState == 'enter'){
				event.async = true;
				event.cancel = true; 
				var paramValue = RouteUtil.getParamValue(event.param);
				var innerStateValue = RouteUtil.getInnerStateValue(event.param);
				var xid = event.xid;
				var activeXid= pages.getActiveXid();
				if(activeXid == xid){
					this.dispatchChange(innerStateValue);
				}else{
					if(xid == mainPageId){
						/**
						 * 首页比较特殊 必须要打开，同样不能关闭
						 * 首页的进入，在url上理解为点击返回按钮 
						 */
						pages.getContent(activeXid).off('onRouteStatePublish');
						this.closePage()
						dtd.resolve();
						this.dispatchChange(innerStateValue);
					}else{
						this.openPage(xid,{},function(){
							dtd.resolve();
							self.dispatchChange(innerStateValue);
						});
					}
				}
			}else if(event.routeState == 'update'){
				event.cancel = true;
				var innerStateValue = RouteUtil.getInnerStateValue(event.param);
				this.dispatchChange(innerStateValue);
			}
		},
		openPage: function(path, options,fn){
			if(typeof options == 'function'){
				fn = options;
				options = {};
			}
			if(typeof path == 'object'){
				path = path.url;
			}
			var me = this;
			options = options || {};
			var pages = this.comp('pages'),
				url = this.getURL(path, options),
				pid = path;
			if(!pages.has(pid)){
				this.loadPage(pid,url,function(err){
					if (err){
						setTimeout(function(){
							//hcr 特殊点, 必须知道错误对话框的btn
							$("#__justepErrorDialog__").find(".x-error-close").one("click", function(){
								setTimeout(function(){
									//以下逻辑应该和closePage类似, maduo支持closePage传pid后, 直接调用即可
									var index = me.openeds.indexOf(pid);
									if (index !== -1){
										me.openeds.splice(index, 1);
									}
									if (pages.getContent(pid))
										pages.getContent(pid).dispose();
								});
							}); 
						});
					}
					
				});
				
				function after(){
					pages.to(pid,function(param){
						fn && fn(param);
						me.subscribeChange(param);
					});
					me.openeds.push(pid);
					me.current = justep.Util.clone(options);
					me.current.path = path;
					me.comp('portal').show('content');	
				}
				setTimeout(after, 200);
			}else{
				fn && fn();
				this.subscribeChange();
			}	
		},
		loadPage: function(xid,url,fn){
			var pages = this.comp('pages');
			var content = pages.getContent(xid);
			if(!content){
				content = pages.add({xid: xid});
			}
			var parentNode = content.$domNode.get(0);
			var compose = new WindowContainer({
				parentNode: parentNode,
				src: url,
				onLoad: function(){
					fn && fn();
					content.on("onActive", function(){
						if(compose.getInnerModel()){
							compose.getInnerModel().fireEvent('onActive');
						}
					});
				},
				onLoadError: function(err){
					fn && fn(err);
				}
			});
			content.innerContainer = compose; 
		},
		closePage: function(){
			var pages = this.comp('pages');
			if(this.openeds[this.openeds.length - 1] !== mainPageId){
				var pid = this.openeds.pop();
				var to = this.openeds[this.openeds.length - 1];
				if(to != mainPageId)
					pages.remove(pid, to);
				else
					pages.remove(pid);
			}
		},
		reload: function(options){
			var url = window.location.href;
			if(window.location.hash)
				url = url.replace(window.location.hash, '');
			if(this.current && this.current.path  != mainPageId){
				url = url + '#' + justep.URL.getSearch({current: this.current});
			}
			url = new justep.URL(url);
			url.setParam(options);
			window.location.href = url.toString();
		},
		clear: function(){
			var pages = this.comp('pages');
			pages.to(mainPageId, function(){
				pages.removeOther();
			});
		},
		toggleMenu: function(){
			this.comp('portal').toggleLeft();
		},
		setSkin: function(value){
			var cur = this.getContext().getSkin();
			if(cur != value){
				this.myStore('skin', value);
				this.reload({$skin: value});
			}
		},
		setLang: function(value){
			var cur = this.getContext().getLang();
			if(cur != value){
				this.myStore('lang', value);
				this.reload({lang: value});
			}
		},
		setDebug: function(value){
			this.myStore('debug', value);
			if(value)
				$("#debugBar").show();
			else
				$("#debugBar").hide();
		},
		store: function(name, value){
			if(value !== undefined){
				localStorage.setItem(name, value);		
			}else{
				value = localStorage.getItem(name);
				if(value === 'true') value = true;
				if(value === 'false') value = false;
				return value;
			}
		},
		myStore: function(name, value){
			name = this.getContext().getCurrentPersonID() + '.' + name;
			return this.store(name, value);
		}
	};
		
	Model.prototype.modelLoad = function(event){
		var pages = this.comp('pages'),
			portal = this.comp('portal');

		//加载主页面
		this.loadPage(mainPageId,this.getURL(mainPage));
		
		//加载左边栏
		portal.loadLeftContent(this.getURL(leftPage));
		
		//open stack
		this.openeds = [mainPageId];
		
		//初始当前页
		var current = getParameter('current');
		if(current && current.path){
			var path = current.path;
			delete current.path;
			this.openPage(path, current);
		}else if(current && current != "main"){
			this.openPage(current);
		}
		
		FastClick.attach(document.body);
		
		var self = this;
		document.addEventListener("deviceready", function() {
			var exitAppTicker = 0;
			var listener = function(){
				if(pages.getActiveIndex() == 0){
					if(exitAppTicker == 0){
						exitAppTicker++;
						var msg = $('<div class="alert alert-success" style="z-index:999;text-align:center;font-size:16px;-webkit-transition:all 0.4s;-webkit-transform:translate3d(0,-100%,0);font-weight:bold;position:absolute;top:0;left:0;width:100%;">再按一次退出应用</div>').appendTo('body');
						setTimeout(function(){
							msg.transform('translate3d(0,0,0)');
						},1);
						setTimeout(function(){
							exitAppTicker = 0;
							msg.transform('translate3d(0,-100%,0)').transitionEnd(function(){
								msg.remove();
							});
						},2000);
					}else if(exitAppTicker == 1){
						navigator.app.exitApp();
					}	
				}else{
					history.back();
				}
			};
			document.addEventListener('backbutton', listener, false);
			$(window).on('beforeunload', function(){
				document.removeEventListener('backbutton', listener, false);
		    });
        }, false);
        
	};
	
	

	Model.prototype.toggleLeftClick = function(event){
		this.comp('portal').toggleLeft();
	};

	Model.prototype.prevClick = function(event){
		this.comp('pages').prev();
	};

	Model.prototype.nextClick = function(event){
		this.comp('pages').next();
	};

	Model.prototype.clearClick = function(event){
		this.clear();
	};

	Model.prototype.refreshClick = function(event){
		this.reload();
		window.location.reload();
	};
	
	return Model;
	
	function getParameter(name){
		var search = window.location.search;
		var params = {};
		search = search ? search : "";
		var hash = window.location.hash;
		if (hash && (hash.indexOf("=")!=-1)){
			search += "&" + hash.substring(1);
		}
		
		if (search.charAt(0) == "?"){
			search = search.substring(1);
		}
		
		var items = search.split("&");
		for (var i=0; i<items.length; i++){
			var item = items[i];
			var index = item.indexOf("=");
			if (item && (index!=-1)){
				var key = item.substring(0, index),
					value = decodeURIComponent(item.substring(index+1));
				if(key.indexOf('.') == '-1')
					params[key] = value;
				else{
					key = key.split('.');
					var obj = params[key[0]] = params[key[0]] || {};
					for(var j = 1;j<key.length-1;j++){
						obj = obj[key[j]] || {}; 
					}
					obj[key.pop()] = value;
				}
			}
		}
		return params[name];
	};

});