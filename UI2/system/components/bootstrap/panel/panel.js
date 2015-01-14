define(function(require) {
	require("$UI/system/components/justep/common/res");
	require("../lib/js/bootstrap");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./panel");
	
	
	var Panel = justep.ViewComponent.extend({
		//构造函数
		/**
		 * config参数的格式：
		 * 	{
		 * 		parentNode: xx, //xx是标准的dom节点
		 * 		attr: {name: value, ...},
    	 * 		heading: '',
    	 * 		body: '',
    	 * 		footer: ''	
		 * 		
		 * 	}
		 */
    	constructor: function(config){
			this.callParent(config);
    	},
    	
    	dispose: function(){
    		this.callParent();
    	},
    	
    	//动态创建组件
    	/**
    	 * config的格式：
    	 * {
    	 * 	attr: {name: value, ...},
    	 * 	heading: '',
    	 * 	body: '',
    	 * 	footer: ''	
    	 * }
    	 */
    	buildTemplate: function(config){
    		if (config){
    			var content = "<div class='panel panel-default' component='" + url + "'>" +
									"<div class='panel-heading'>" +
									(config.heading ? config.heading : '') + 
									"</div>" +
									"<div class='panel-body'>" +
									(config.body ? config.body : '') + 
									"</div>" + 
									"<div class='panel-footer'>" +
									(config.footer ? config.footer : '') +
									"</div>" +
								"</div>";
        		var template = $(content);

        		if (config.attr)
    				for (var name in config.attr){
    					if (name === "class"){
    						template.addClass(config.attr[name]);
    					}else{
    						template.attr(name, config.attr[name]);
    					}
    				}
    				
        		
        		return template;
    		}
    		
    		
        },
        
        //组件初始化
        init: function(value, bindingContext){
	        this.callParent(value, bindingContext);
        },
        
        //组件初始化
        update: function(value, bindingContext){
	        this.callParent(value, bindingContext);
        }
   	});
	
	justep.Component.register(url, Panel);
	return Panel;
});
