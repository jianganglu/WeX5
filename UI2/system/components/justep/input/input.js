/*! 
 * WeX5 v3 (htttp://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	require("$UI/system/components/justep/common/res");

	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	require("./js/datePicker");

	var url = require.normalizeName("./input");
	var ComponentConfig = require("./input.config");

	// 格式化数字型
	var DecimalFormat = function(pattern) {
		this.applyPattern(pattern);
	};
	DecimalFormat.SPECIAL_CHARS = [ "0", ".", "-", ",", "E", "%", "\u00A4", "\u2030" ];
	DecimalFormat.prototype.applyPattern = function(pattern) {
		if (pattern === undefined) {
			pattern = "";
		}
		function contains(arr, ch) {
			for ( var i = 0; i < arr.length; i++) {
				if (arr[i] == ch) {
					return true;
				}
			}
			return false;
		}
		for ( var i = 0; i < pattern.length; i++) {
			if (!contains(DecimalFormat.SPECIAL_CHARS, pattern.charAt(i))) {
				return;
			}
		}
		this.pattern = pattern;
	};

	DecimalFormat.prototype.format = function(number) {
		if (isNaN(number)) {
			return number;
		}
		var pattern = this.pattern;
		if (!pattern) {
			return number;
		}
		var strNum = "" + number;
		var numNum = parseFloat(number);
		var isNegative = false;
		if (numNum < 0) {
			isNegative = true;
		}
		if (isNegative) {
			strNum = strNum.substring(1, strNum.length);
			numNum = -numNum;
		}
		var pPos = pattern.indexOf("%");
		var cPos = pattern.indexOf(",");
		if (pPos != -1 || (cPos != -1 && pPos != -1)) {
			return number;
		}
		var dPos,dPosOfNum,adStrLength,snbFixed;
		if (pPos != -1) {
			if (pPos != pattern.length - 1) {
				return number;
			}
			pattern = pattern.substring(0, pattern.length - 1);
			numNum = parseFloat(number) * 100;
			strNum = '' + numNum;
			if (isNegative) {
				strNum = strNum.substring(1, strNum.length);
				numNum = -numNum;
			}
		}
		dPos = pattern.indexOf(".");
		dPosOfNum = strNum.indexOf(".");
		var result = "";
		if (dPos != -1) {
			if (dPosOfNum == -1) {
				dPosOfNum = strNum.length - 1;
			}
			adStrLength = pattern.length - dPos;
			snbFixed = parseFloat(strNum).toFixed(adStrLength - 1);
			if (isNegative) {
				result = "-" + snbFixed;
			} else {
				result = snbFixed;
			}
		} else {
			if (dPosOfNum == -1) {
				dPosOfNum = strNum.length - 1;
			}
			snbFixed = parseFloat(strNum).toFixed();
			if (isNegative) {
				result = "-" + snbFixed;
			} else {
				result = snbFixed;
			}
		}
		if (pPos != -1) {
			result += "%";
		}

		// 123456.12==>123,456.12
		var tmp = "";
		var count3 = 0;
		if (cPos != -1 && result.length) {
			dPos = result.indexOf(".");
			for ( var i = result.length - 1; i >= 0; i--) {
				var c = result.charAt(i);
				if (dPos != -1 && i >= dPos) {
					tmp = c + tmp;
				} else {
					if (count3 == 3 && c != "-") {
						count3 = 1;
						tmp = "," + tmp;
					} else {
						count3++;
					}
					tmp = c + tmp;

				}
			}
			result = tmp;
		}

		return result;
	};

	var TypeRegExp = {
		Integer : /(^-?$)|(^-?[0-9]*$)/,
		Long : /(^-?$)|(^-?[0-9]*$)/,
		Decimal : /(^-?$)|(^-?[0-9]*([.]?[0-9]*)?$)/,
		Float : /(^-?$)|(^-?[0-9]*([.]?[0-9]*)?$)/,
		Double : /(^-?$)|(^-?[0-9]*([.]?[0-9]*)?$)/
	};

	var getAfterPressText = function(input, text) {
		var src = input, srcText, selTxt, srcRange, beforeTxt;

		if (justep.Browser.IE && !justep.Browser.IE11) {
			var selRange = document.selection.createRange();
			selTxt = selRange.text;// 选中的文本
			srcRange = src.createTextRange();
			srcText = srcRange.text;
			selRange.setEndPoint("StartToStart", srcRange);
			beforeTxt = selRange.text;// 插入字符前的文本
		} else {
			selTxt = window.getSelection().toString();// 选中的文本
			srcRange = src.selectionEnd;
			srcText = src.value;
			beforeTxt = src.value.substring(0, srcRange);
		}

		var insertTxt = text;// 插入字符 String.fromCharCode(e.keyCode)
		var afterTxt = srcText.substr(beforeTxt.length);// 插入字符后的文本
		// alert(beforeTxt+"__"+insertTxt+"__"+afterTxt);
		var txt = beforeTxt.substr(0, beforeTxt.length - selTxt.length) + insertTxt + afterTxt;
		return txt;
	};

	var Input = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
			this.readonly = false;
			this.placeHolder = "";
			this.value = "";
			this.format = "";
			this.pattern = "";
			this.autoFocus = false;
			this.autoComplete = false;
			this.min = null;
			this.max = null;
			this.minLength = 1;
			this.maxLength = null;
			this.dataType = "String";
		},

		dispose : function() {
			this.$domNode.off('change focus blur keypress paste');
			this.callParent();
		},

		// 动态创建组件
		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = 'form-control';
			return "<input class='"
					+ config['class'] + "' " + (config.style ? (" style='" + config.style + "' ") : "")
					+ (config.xid ? (" xid='" + config.xid + "' ") : "") + " component='" + url + "' " + " ></input>";
		},

		_doDataTypeChange : function() {
			if (justep.Bind.isObservable(this.ref) && this.ref['define']) {
				var t = this.ref['define'].defCol.type;
				if (t !== this.dataType) {
					this.set({
						dataType : t
					});
				}
			}
		},
		_bindDataType : function() {
			if (this.dataType == 'DateTime' || this.dataType == 'Date' || this.dataType == 'Time') {
				if (!this.format) {
					if ('DateTime' == this.dataType)
						this.format = "yyyy-MM-dd hh:mm:ss";
					else if ('Date' == this.dataType)
						this.format = "yyyy-MM-dd";
					else if ('Time' == this.dataType)
						this.format = "hh:mm:ss";
				}
				var that = this;
				var type = this.dataType.toLowerCase(), format = justep.Date.STANDART_FORMAT;
				if (type == 'date')
					format = justep.Date.STANDART_FORMAT_SHOT;
				else if (type == 'time')
					format = "hh:mm:ss";
				this.$domNode.addClass(type).attr('readonly', true);
				if (justep.Browser.isMobile) {
					this.$domNode.datePicker({
						preset : type,
						seconds : true,
						ampm : false,
						format : format,
						dispalyFormat : this.format,
						beforeShow : function(input, picker) {
							if (that.min)
								picker.settings['startDate'] = that._doCalcDateExpr(that.min);
							if (that.max)
								picker.settings['endDate'] = that._doCalcDateExpr(that.max);
						}
					});
				} else {
					var self = this;
					this.$domNode.on('click', function() {
						require([ "./js/datePickerPC" ], function(DatePicker) {
							DatePicker.show(self, type === 'date' ? 0 : (type === 'time' ? 4 : 3), true);
						});
					});
				}
			} else if (this.dataType)
				this.$domNode.addClass(this.dataType.toLowerCase());
		},
		_unbindDataType : function(dataType) {
			if (this.$domNode) {
				this.$domNode.removeClass(dataType);
				if (dataType != 'DateTime' && dataType != 'Date' && dataType != 'Time')
					this.$domNode.datePicker('destroy');
			}
		},
		_doCalcDateExpr : function(expr) {
			var v = this._doCalcExpr(expr);
			if (justep.Bind.isObservable(v))
				v = v.get();
			if (v instanceof Date)
				return v;
			else if ('string' == typeof (v))
				return justep.Date.fromString(v, justep.Date.STANDART_FORMAT_SHOT);
			else {
				var msg = new justep.Message(justep.Message.JUSTEP231090);
				throw justep.Error.create(msg);
			}
		},
		_doCalcExpr : function(expr) {
			this._expr = this._expr || {};
			if (!this._expr[expr])
				this._expr[expr] = new justep.Express(expr);
			var ctx = justep.Bind.contextFor(this.domNode);
			return justep.Express.eval(this._expr[expr], ctx.$object, ctx);
		},
		// 初始化
		doInit : function(value, bindingContext) {
			var self = this;
			this.$domNode.on('change', $.proxy(this.doChange, this)).on('focus', function() {
				self._focusin = true;
				if (!self.$domNode.prop('readonly'))
					self.$domNode.val(self.value);
			}).on('blur', function() {
				self._focusin = false;
				self.render();
			}).on('keypress paste', function(evt) {
				return self._doKeypress(evt);
			});
			this._bindDataType();
		},
		isDisabled: function(){
			return this.readonly || this.callParent();
		},
		_doKeypress : function(evt) {
			if(13===evt.keyCode) return;
			var regExp = TypeRegExp[this.dataType], ok = true, keyCode, afterPressText;

			if (justep.Browser.FF && (evt.key !== 'MozPrintableKey' || (evt.key === 'MozPrintableKey' && evt.ctrlKey)))
				return;
			// 获取剪切板----处理粘贴后文字的正则校验
			var cbd = window.clipboardData || evt.clipboardData;
			if (evt.type === "paste" && cbd)
				keyCode = cbd.getData('text');
			else
				keyCode = String.fromCharCode(!justep.Browser.FF ? evt.keyCode : evt.which);

			if (regExp || this.pattern)
				afterPressText = getAfterPressText(this.domNode, keyCode);

			if (regExp) {
				ok = regExp.test(afterPressText);
			}
			if (ok && this.pattern) {
				// 用户自定义正则
				try {
					regExp = eval('/' + this.pattern + '/');
					if (regExp)
						ok = regExp.test(afterPressText);
				} catch (e) {
				}
			}
			evt.returnValue = ok;
			if (!justep.Browser.FF && !evt.returnValue)
				evt.keyCode = 0;
			return evt.returnValue;
		},
		doUpdate : function(value, bindingContext, allBindings) {
			this._doDataTypeChange();
			this.callParent(value, bindingContext, allBindings);
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "format":
				if (!this.format) {
					if ('DateTime' == this.dataType)
						this.format = "yyyy-MM-dd hh:mm:ss";
					else if ('Date' == this.dataType)
						this.format = "yyyy-MM-dd";
					else if ('Time' == this.dataType)
						this.format = "hh:mm:ss";
				}
				if (oldVal != value)
					this.needRender = this._inited;
				break;
			case "value":
				if (oldVal != value) {
					if (this._inited) {
						this.fireEvent('onChange', {
							source : this,
							originalValue : oldVal,
							value : value
						});
						this.val2ref();
					}
				}
				this.needRender = this._inited && !this._focusin;//焦点在当前组件不刺激渲染
				break;
			case "dataType":
				if (oldVal != value) {
					this.needRender = this._inited;
					this._dataTypeChanged = true;
					this._unbindDataType(oldVal);
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
		render : function() {
			this.callParent();
			if (this._dataTypeChanged) {
				this._bindDataType();
				this._dataTypeChanged = false;
			}
			var val = this.value;
			var d;
			if (val) {
				if ('DateTime' == this.dataType) {
					d = val instanceof Date ? val : justep.Date.fromString(val, justep.Date.STANDART_FORMAT);
					val = justep.Date.toString(d, this.format);
				} else if ('Date' == this.dataType) {
					d = val instanceof Date ? val : justep.Date.fromString(val, justep.Date.STANDART_FORMAT_SHOT);
					val = justep.Date.toString(d, this.format);
				} else if ('Time' == this.dataType) {
					d = val instanceof Date ? val : justep.Date.fromString(val, "hh:mm:ss");
					val = justep.Date.toString(d, this.format);
				} else if(this.format && ('Integer' == this.dataType 
						|| 'Long' == this.dataType
						|| 'Float' == this.dataType
						|| 'Double' == this.dataType
						|| 'Decimal' == this.dataType)){
					val = (new DecimalFormat(this.format)).format(val);
				}
			}
			if (val === undefined || val === null)
				val = '';
			var eData = {
				source : this,
				value : this.value,
				text : val
			};
			this.fireEvent('onRender', eData);
			this.$domNode.val(eData.text);
		},
		val : function(v) {
			if (arguments.length === 0)
				return this.value;
			this.set({
				value : v
			});
		},
		doChange : function(evt) {
			this.set({
				value : this.$domNode.val()
			});
		},

		clear : function() {
			this.set({
				value : null
			});
		}
	});

	justep.Component.register(url, Input);
	return Input;
});