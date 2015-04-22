/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	require("../lib/js/bootstrap");
	var Component = require("$UI/system/lib/base/component"), 
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		url = require.normalizeName("./pagination");
	var ComponentConfig = require("./pagination.config");
	var Data = require("$UI/system/components/justep/data/data");

	require('css!./css/pagination').load();
	
	var Pagination = ViewComponent.extend({
		getUrl : function() {
			return url;
		},
		// 构造函数
		constructor : function(options) {
			this.length = 7;
			this.callParent(options);
		},
		// 动态创建组件
		buildTemplate : function(config) {
			//default value
			return Str.format("<div class='pagination' xid='{0}' componet='{1}'></div>", config.xid);
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		
		init: function(){
			this.data = null;
			this.callParent();
			this.$el = $(this.domNode);
			this.currentIndex = 0;
			this._init();
			
			this.dataComp = this.getModel().comp(this.data);
			var me = this;
			if(this.dataComp){
				this.dataComp.on(Data.EVENT_DATA_CHANGE,function(event){
					var rows,i;
					if(event.selfChanged
							&& (event.type === 'clear'
								|| event.type === 'refresh'
									|| event.type === 'delete'
										|| event.type === 'new')){
						var limit = me.dataComp.limit;
						var length = Math.ceil(me.dataComp.getTotal()/limit);
						var index = me.dataComp.getOffset()/limit - 1; 
						me._init(length, index);
					}
				});				
			}
		},
		_init: function(length, index){
			this.currentIndex = index; 
			var html = '<li class="prev"><a href="#"><span aria-hidden="true">&lt;</span><span class="sr-only">Previous</span></a></li>';  
			if(length){
				(index === undefined || index >= length) && (index = 0);
				var buttons = this._numbers(index, length);
				for(var i = 0; i < buttons.length; i++){
					var nub = buttons[i];
					if(index == nub)
						html +=	'<li class="paginate_button active" pageNumber="' + nub + '"><a href="#">' + (nub+1) + '</a></li>';
					else if(nub == 'ellipsis')
						html +=	'<li class="disabled"><a href="#">...</a></li>';
					else
						html +=	'<li class="paginate_button" pageNumber="' + nub + '"><a href="#">' + (nub+1) + '</a></li>';
				}
			}	
			html += '<li class="next"><a href="#"><span aria-hidden="true">&gt;</span><span class="sr-only">Next</span></a></li>';  
			this.$el.html(html);
			var me = this,
				$items = $('>li', this.$el),
				hasPrev = $items.first().hasClass('prev'),
				hasNext = $items.last().hasClass('next');
			if(!length)
				$items.addClass('disabled');
			else {
				if(hasPrev && me.currentIndex == 0){
					$('.prev', me.$el).addClass('disabled');
				}
				if(hasNext && me.currentIndex+1 == length){
					$('.next', me.$el).addClass('disabled');
				}
				$items.click(function(e){
					var $item = $(this);
					if($item.hasClass('disabled') || $item.hasClass('active')) 
						return false;
					$items.removeClass('active');
					$items.removeClass('disabled');
					if($item.hasClass('prev')){
						me.currentIndex--;
					}else if($item.hasClass('next')){
						me.currentIndex++;
					}else {
						var pageNumber = parseInt($item.attr("pageNumber"));
						me.currentIndex = pageNumber;
					}
					$('>li[pageNumber="' + pageNumber + '"]', me.$el).addClass('active');
					if(hasPrev && me.currentIndex == 0){
						$('.prev', me.$el).addClass('disabled');
					}
					if(hasNext && me.currentIndex+1 == length){
						$('.next', me.$el).addClass('disabled');
					}
					me.dataComp.loadPageData(me.currentIndex+1);
					me.fireEvent('onClick', {source: me, index: me.currentIndex});
				});
			}
		},
		_numbers: function( page, pages ) {
			var
				numbers = [],
				buttons = this.length,
				half = Math.floor( buttons / 2 ),
				i = 1;
		
			if ( pages <= buttons ) {
				numbers = _range( 0, pages );
			}
			else if ( page <= half ) {
				numbers = _range( 0, buttons-2 );
				numbers.push( 'ellipsis' );
				numbers.push( pages-1 );
			}
			else if ( page >= pages - 1 - half ) {
				numbers = _range( pages-(buttons-2), pages );
				numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
				numbers.splice( 0, 0, 0 );
			}
			else {
				numbers = _range( page-1, page+2 );
				numbers.push( 'ellipsis' );
				numbers.push( pages-1 );
				numbers.splice( 0, 0, 'ellipsis' );
				numbers.splice( 0, 0, 0 );
			}
		
			return numbers;
		}
	});
	
	var _range = function ( len, start )
	{
		var out = [];
		var end;
	
		if ( start === undefined ) {
			start = 0;
			end = len;
		}
		else {
			end = start;
			start = len;
		}
	
		for ( var i=start ; i<end ; i++ ) {
			out.push( i );
		}
	
		return out;
	};
	
	Component.register(url, Pagination);
	return Pagination;
});
