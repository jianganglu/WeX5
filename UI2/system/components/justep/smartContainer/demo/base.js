/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	
	var bind = require("bind"),
		$ = require("jquery");
	
	var ctor = function(){
		this.callParent();
		this.init();
	};
	
	ctor.prototype.init = function(){
	};

	ctor.prototype.model1Load = function(event){
		var $container   = $("#mousebox"),
			controlWidth = 50,
			step = 2,
			toLeft, toRight,
			iid;

		$container.mousemove(function(e) {
			var mouseX = e.pageX - $(this).parent().offset().left;
			toLeft = (mouseX <= controlWidth); 
			toRight = mouseX > ($container.outerWidth() - controlWidth);
		});

		$container.mouseover(function(e) {
			iid = setInterval(moveFn, 10);
		});
		$container.mouseout(function(e) {
			toLeft = toRight = false; 
			clearInterval(iid);
		});
		
		function moveFn(){
			var pos = $container.scrollLeft();
			if(toLeft && pos > 0){
				pos -= step;
				$container.scrollLeft(pos);
			}else if(toRight && pos < $container.outerWidth()){
				pos += step;
				$container.scrollLeft(pos);
			}
		}
		
		return;	
		var $container   = $("#mousebox"),
			mX     = 0,   // Real mouse position
			posX   = 0;

		$container.mousemove(function(e) {
			mX = e.pageX - $(this).parent().offset().left - this.offsetLeft;
		});

		setInterval(function(){
			var leftW   = $container.outerWidth(true),
				leftSW  = $container[0].scrollWidth,
				wDiff  = (leftSW/leftW)-1;  // widths difference ratio
			posX += (mX - posX); 
			$container.scrollLeft(posX*wDiff);
		}, 10);
	};
	
	return ctor;

});

