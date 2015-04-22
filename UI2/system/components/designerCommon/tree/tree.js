define(function(require){
function loadTreeJs(jQuery){
	/*
	jQWidgets v3.2.2 (2014-Mar-21)
	Copyright (c) 2011-2014 jQWidgets.
	License: http://jqwidgets.com/license/
	*/

	(function ($) {
	    $.jqx = $.jqx || {}

	    $.jqx.define = function (namespace, classname, baseclass) {
	        namespace[classname] = function () {
	            if (this.baseType) {
	                this.base = new namespace[this.baseType]();
	                this.base.defineInstance();
	            }
	            this.defineInstance();
	        }

	        namespace[classname].prototype.defineInstance = function () { };
	        namespace[classname].prototype.base = null;
	        namespace[classname].prototype.baseType = undefined;

	        if (baseclass && namespace[baseclass])
	            namespace[classname].prototype.baseType = baseclass;
	    }

	    // method call
	    $.jqx.invoke = function (object, args) {
	        if (args.length == 0)
	            return;

	        var method = typeof (args) == Array || args.length > 0 ? args[0] : args;
	        var methodArg = typeof (args) == Array || args.length > 1 ? Array.prototype.slice.call(args, 1) : $({}).toArray();

	        while (object[method] == undefined && object.base != null) {
	            if (object[method] != undefined && $.isFunction(object[method]))
	                return object[method].apply(object, methodArg);

	            if (typeof method == 'string') {
	                var methodLowerCase = method.toLowerCase();
	                if (object[methodLowerCase] != undefined && $.isFunction(object[methodLowerCase])) {
	                    return object[methodLowerCase].apply(object, methodArg);
	                }
	            }
	            object = object.base;
	        }

	        if (object[method] != undefined && $.isFunction(object[method]))
	            return object[method].apply(object, methodArg);

	        if (typeof method == 'string') {
	            var methodLowerCase = method.toLowerCase();
	            if (object[methodLowerCase] != undefined && $.isFunction(object[methodLowerCase])) {
	                return object[methodLowerCase].apply(object, methodArg);
	            }
	        }

	        return;
	    }
	    $.jqx.hasProperty = function (obj, property) {
	        if (typeof (property) == 'object') {
	            for (var prop in property) {
	                var o = obj;
	                while (o) {
	                    if (o.hasOwnProperty(prop))
	                        return true;
	                    if (o.hasOwnProperty(prop.toLowerCase()))
	                        return true;
	                    o = o.base;
	                }
	                return false;
	            }
	        }
	        else {
	            while (obj) {
	                if (obj.hasOwnProperty(property))
	                    return true;
	                if (obj.hasOwnProperty(property.toLowerCase()))
	                    return true;
	                obj = obj.base;
	            }
	        }

	        return false;
	    }

	    $.jqx.hasFunction = function (object, args) {
	        if (args.length == 0)
	            return false;

	        if (object == undefined)
	            return false;

	        var method = typeof (args) == Array || args.length > 0 ? args[0] : args;
	        var methodArg = typeof (args) == Array || args.length > 1 ? Array.prototype.slice.call(args, 1) : {};

	        while (object[method] == undefined && object.base != null) {
	            if (object[method] && $.isFunction(object[method]))
	                return true;

	            if (typeof method == 'string') {
	                var methodLowerCase = method.toLowerCase();
	                if (object[methodLowerCase] && $.isFunction(object[methodLowerCase]))
	                    return true;
	            }
	            object = object.base;
	        }

	        if (object[method] && $.isFunction(object[method]))
	            return true;

	        if (typeof method == 'string') {
	            var methodLowerCase = method.toLowerCase();
	            if (object[methodLowerCase] && $.isFunction(object[methodLowerCase]))
	                return true;
	        }

	        return false;
	    }

	    $.jqx.isPropertySetter = function (obj, args) {
	        if (args.length == 1 && typeof (args[0]) == 'object')
	            return true;

	        if (args.length == 2 &&
	            typeof (args[0]) == 'string' &&
	            !$.jqx.hasFunction(obj, args)) {
	            return true;
	        }

	        return false;
	    }

	    $.jqx.validatePropertySetter = function (obj, args, suppressException) {
	        if (!$.jqx.propertySetterValidation)
	            return true;

	        if (args.length == 1 && typeof (args[0]) == 'object') {
	            for (var i in args[0]) {
	                var o = obj;
	                while (!o.hasOwnProperty(i) && o.base)
	                    o = o.base;

	                if (!o || !o.hasOwnProperty(i)) {
	                    if (!suppressException) {
	                        var hasLowerCase = o.hasOwnProperty(i.toString().toLowerCase());
	                        if (!hasLowerCase) {
	                            throw 'Invalid property: ' + i;
	                        }
	                        else return true;
	                    }
	                    return false;
	                }
	            }

	            return true;
	        }

	        if (args.length != 2) {
	            if (!suppressException)
	                throw 'Invalid property: ' + args.length >= 0 ? args[0] : '';

	            return false;
	        }

	        while (!obj.hasOwnProperty(args[0]) && obj.base)
	            obj = obj.base;

	        if (!obj || !obj.hasOwnProperty(args[0])) {
	            if (!suppressException)
	                throw 'Invalid property: ' + args[0];

	            return false;
	        }

	        return true;
	    }

	    $.jqx.set = function (object, args) {
	        if (args.length == 1 && typeof (args[0]) == 'object') {
	            $.each(args[0], function (key, value) {
	                var obj = object;
	                while (!obj.hasOwnProperty(key) && obj.base != null)
	                    obj = obj.base;

	                if (obj.hasOwnProperty(key)) {
	                    $.jqx.setvalueraiseevent(obj, key, value);
	                }
	                else if (obj.hasOwnProperty(key.toLowerCase())) {
	                    $.jqx.setvalueraiseevent(obj, key.toLowerCase(), value);
	                }
	                else if ($.jqx.propertySetterValidation)
	                    throw "jqxCore: invalid property '" + key + "'";
	            });
	        }
	        else if (args.length == 2) {
	            while (!object.hasOwnProperty(args[0]) && object.base)
	                object = object.base;

	            if (object.hasOwnProperty(args[0])) {
	                $.jqx.setvalueraiseevent(object, args[0], args[1]);
	            }
	            else if (object.hasOwnProperty(args[0].toLowerCase())) {
	                $.jqx.setvalueraiseevent(object, args[0].toLowerCase(), args[1]);
	            }
	            else if ($.jqx.propertySetterValidation)
	                throw "jqxCore: invalid property '" + args[0] + "'";
	        }
	    }

	    $.jqx.setvalueraiseevent = function (object, key, value) {
	        var oldVal = object[key];

	        object[key] = value;

	        if (!object.isInitialized)
	            return;

	        if (object.propertyChangedHandler != undefined)
	            object.propertyChangedHandler(object, key, oldVal, value);

	        if (object.propertyChangeMap != undefined && object.propertyChangeMap[key] != undefined)
	            object.propertyChangeMap[key](object, key, oldVal, value);
	    };

	    $.jqx.get = function (object, args) {
	        if (args == undefined || args == null)
	            return undefined;

	        if (object.propertyMap) {
	            var newVal = object.propertyMap(args);
	            if (newVal != null)
	                return newVal;
	        }

	        if (object.hasOwnProperty(args))
	            return object[args];

	        if (object.hasOwnProperty(args.toLowerCase()))
	            return object[args.toLowerCase()];

	        var arg = undefined;
	        if (typeof (args) == Array) {
	            if (args.length != 1)
	                return undefined;
	            arg = args[0];
	        }
	        else if (typeof (args) == 'string')
	            arg = args;

	        while (!object.hasOwnProperty(arg) && object.base)
	            object = object.base;

	        if (object)
	            return object[arg];

	        return undefined;
	    }

	    $.jqx.serialize = function (obj) {
	        var txt = '';
	        if ($.isArray(obj)) {
	            txt = '['
	            for (var i = 0; i < obj.length; i++) {
	                if (i > 0)
	                    txt += ', ';
	                txt += $.jqx.serialize(obj[i]);
	            }
	            txt += ']';
	        }
	        else if (typeof (obj) == 'object') {
	            txt = '{';
	            var j = 0;
	            for (var i in obj) {
	                if (j++ > 0)
	                    txt += ', ';
	                txt += i + ': ' + $.jqx.serialize(obj[i]);
	            }
	            txt += '}';
	        }
	        else
	            txt = obj.toString();

	        return txt;
	    }

	    $.jqx.propertySetterValidation = true;

	    $.jqx.jqxWidgetProxy = function (controlName, element, args) {
	        var host = $(element);
	        var vars = $.data(element, controlName);
	        if (vars == undefined) {
	            return undefined;
	        }

	        var obj = vars.instance;

	        if ($.jqx.hasFunction(obj, args))
	            return $.jqx.invoke(obj, args);

	        if ($.jqx.isPropertySetter(obj, args)) {
	            if ($.jqx.validatePropertySetter(obj, args)) {
	                $.jqx.set(obj, args);
	                return undefined;
	            }
	        } else {
	            if (typeof (args) == 'object' && args.length == 0)
	                return;
	            else if (typeof (args) == 'object' && args.length == 1 && $.jqx.hasProperty(obj, args[0]))
	                return $.jqx.get(obj, args[0]);
	            else if (typeof (args) == 'string' && $.jqx.hasProperty(obj, args[0]))
	                return $.jqx.get(obj, args);
	        }

	        throw "jqxCore: Invalid parameter '" + $.jqx.serialize(args) + "' does not exist.";
	        return undefined;
	    }

	    $.jqx.applyWidget = function (element, controlName, args, instance) {
	        var WinJS = false;
	        try {
	            WinJS = window.MSApp != undefined;
	        }
	        catch (e) {
	        }

	        var host = $(element);
	        if (!instance) {
	            instance = new $.jqx['_' + controlName]();
	        }
	        else {
	            instance.host = host;
	            instance.element = element;
	        }
	        if (element.id == "") {
	            element.id = $.jqx.utilities.createId();
	        }

	        var vars = { host: host, element: element, instance: instance };

	        instance.widgetName = controlName;

	        $.data(element, controlName, vars);
	        $.data(element, 'jqxWidget', vars.instance);

	        var inits = new Array();
	        var instance = vars.instance;
	        while (instance) {
	            instance.isInitialized = false;
	            inits.push(instance);
	            instance = instance.base;
	        }
	        inits.reverse();
	        inits[0].theme = $.jqx.theme || '';

	        $.jqx.jqxWidgetProxy(controlName, element, args);

	        for (var i in inits) {
	            instance = inits[i];
	            if (i == 0) {
	                instance.host = host;
	                instance.element = element;
	                instance.WinJS = WinJS;
	            }
	            if (instance != undefined) {
	                if (instance.createInstance != null) {
	                    if (WinJS) {
	                        MSApp.execUnsafeLocalFunction(function () {
	                            instance.createInstance(args);
	                        });
	                    }
	                    else {
	                        instance.createInstance(args);
	                    }
	                }
	            }
	        }

	        for (var i in inits) {
	            if (inits[i] != undefined) {
	                inits[i].isInitialized = true;
	            }
	        }

	        if (WinJS) {
	            MSApp.execUnsafeLocalFunction(function () {
	                vars.instance.refresh(true);
	            });
	        }
	        else {
	            vars.instance.refresh(true);
	        }

	    }

	    $.jqx.jqxWidget = function (name, base, params) {
	        var WinJS = false;
	        try {
	            jqxArgs = Array.prototype.slice.call(params, 0);
	        }
	        catch (e) {
	            jqxArgs = '';
	        }

	        try {
	            WinJS = window.MSApp != undefined;
	        }
	        catch (e) {
	        }

	        var controlName = name;

	        var baseControl = '';
	        if (base)
	            baseControl = '_' + base;
	        $.jqx.define($.jqx, '_' + controlName, baseControl);

	        $.fn[controlName] = function () {
	            var args = Array.prototype.slice.call(arguments, 0);

	            if (args.length == 0 || (args.length == 1 && typeof (args[0]) == 'object')) {
	                if (this.length == 0) {
	                    if (this.selector) {
	                        throw new Error('Invalid jQuery Selector - ' + this.selector + '! Please, check whether the used ID or CSS Class name is correct.');
	                    }
	                    else {
	                        throw new Error('Invalid jQuery Selector! Please, check whether the used ID or CSS Class name is correct.');
	                    }
	                }

	                return this.each(function () {
	                    var host = $(this);
	                    var element = this; // element == this == host[0]
	                    var vars = $.data(element, controlName);

	                    if (vars == null) {
	                        $.jqx.applyWidget(element, controlName, args, undefined);
	                    }
	                    else {
	                        $.jqx.jqxWidgetProxy(controlName, this, args);
	                    }
	                }); // each
	            }
	            else {
	                if (this.length == 0) {
	                    if (this.selector) {
	                        throw new Error('Invalid jQuery Selector - ' + this.selector + '! Please, check whether the used ID or CSS Class name is correct.');
	                    }
	                    else {
	                        throw new Error('Invalid jQuery Selector! Please, check whether the used ID or CSS Class name is correct.');
	                    }
	                }

	                var returnVal = null;

	                var cnt = 0;
	                this.each(function () {
	                    var result = $.jqx.jqxWidgetProxy(controlName, this, args);

	                    if (cnt == 0) {
	                        returnVal = result;
	                        cnt++;
	                    }
	                    else {
	                        if (cnt == 1) {
	                            var tmp = [];
	                            tmp.push(returnVal);
	                            returnVal = tmp;
	                        }
	                        returnVal.push(result);
	                    }
	                }); // each
	            }

	            return returnVal;
	        }

	        try {
	            $.extend($.jqx['_' + controlName].prototype, Array.prototype.slice.call(params, 0)[0]);
	        }
	        catch (e) {
	        }

	        $.extend($.jqx['_' + controlName].prototype, {
	            toThemeProperty: function (propertyName, override) {
	                if (this.theme == '')
	                    return propertyName;

	                if (override != null && override) {
	                    return propertyName + '-' + this.theme;
	                }

	                return propertyName + ' ' + propertyName + '-' + this.theme;
	            }
	        });

	        $.jqx['_' + controlName].prototype.refresh = function () {
	            if (this.base)
	                this.base.refresh(true);
	        }
	        $.jqx['_' + controlName].prototype.createInstance = function () {
	        }
	        $.jqx['_' + controlName].prototype.applyTo = function (element, args) {
	            if (!(args instanceof Array)) {
	                var a = [];
	                a.push(args);
	                args = a;
	            }

	            $.jqx.applyWidget(element, controlName, args, this);
	        }

	        $.jqx['_' + controlName].prototype.getInstance = function () {
	            return this;
	        }
	        $.jqx['_' + controlName].prototype.propertyChangeMap = {};

	        $.jqx['_' + controlName].prototype.addHandler = function (source, event, func, data) {
	            switch (event) {
	                case 'mousewheel':
	                    if (window.addEventListener) {
	                        if ($.jqx.browser.mozilla) {
	                            source[0].addEventListener('DOMMouseScroll', func, false);
	                        }
	                        else {
	                            source[0].addEventListener('mousewheel', func, false);
	                        }
	                        return false;
	                    }
	                    break;
	                case 'mousemove':
	                    if (window.addEventListener && !data) {
	                        source[0].addEventListener('mousemove', func, false);
	                        return false;
	                    }
	                    break;
	            }

	            if (data == undefined || data == null) {
	                if (source.on) {
	                    source.on(event, func);
	                }
	                else {
	                    source.bind(event, func);
	                }
	            }
	            else {
	                if (source.on) {
	                    source.on(event, data, func);
	                }
	                else {
	                    source.bind(event, data, func);
	                }
	            }
	        };

	        $.jqx['_' + controlName].prototype.removeHandler = function (source, event, func) {
	            switch (event) {
	                case 'mousewheel':
	                    if (window.removeEventListener) {
	                        if ($.jqx.browser.mozilla) {
	                            source[0].removeEventListener('DOMMouseScroll', func, false);
	                        }
	                        else {
	                            source[0].removeEventListener('mousewheel', func, false);
	                        }
	                        return false;
	                    }
	                    break;
	                case 'mousemove':
	                    if (func) {
	                        if (window.removeEventListener) {
	                            source[0].removeEventListener('mousemove', func, false);
	                        }
	                    }
	                    break;
	            }

	            if (event == undefined) {
	                if (source.off) {
	                    source.off();
	                }
	                else source.unbind();
	                return;
	            }

	            if (func == undefined) {
	                if (source.off) {
	                    source.off(event);
	                }
	                else {
	                    source.unbind(event);
	                }
	            }
	            else {
	                if (source.off) {
	                    source.off(event, func);
	                }
	                else {
	                    source.unbind(event, func);
	                }
	            }
	        };
	    } // jqxWidget

	    $.jqx.theme = $.jqx.theme || "";
	    $.jqx.ready = function () {
	        $(window).trigger('jqxReady');
	    }
	    $.jqx.init = function () {
	        $.each(arguments[0], function (index, value) {
	            if (index == "theme") {
	                $.jqx.theme = value;
	            }
	            if (index == "scrollBarSize") {
	                $.jqx.utilities.scrollBarSize = value;
	            }
	            if (index == "touchScrollBarSize") {
	                $.jqx.utilities.touchScrollBarSize = value;
	            }
	            if (index == "scrollBarButtonsVisibility") {
	                $.jqx.utilities.scrollBarButtonsVisibility = value;
	            }
	        });
	    }

	    // Utilities
	    $.jqx.utilities = $.jqx.utilities || {};
	    $.extend($.jqx.utilities,
	    {
	        scrollBarSize: 15,
	        touchScrollBarSize: 10,
	        scrollBarButtonsVisibility: "visible",
	        createId: function () {
	            var S4 = function () {
	                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	            };
	            return "jqxWidget" + S4() + S4();
	        },

	        setTheme: function (oldTheme, theme, element) {
	            if (typeof element === 'undefined') {
	                return;
	            }
	            var classNames = element[0].className.split(' '),
	                oldClasses = [], newClasses = [],
	                children = element.children();
	            for (var i = 0; i < classNames.length; i += 1) {
	                if (classNames[i].indexOf(oldTheme) >= 0) {
	                    if (oldTheme.length > 0) {
	                        oldClasses.push(classNames[i]);
	                        newClasses.push(classNames[i].replace(oldTheme, theme));
	                    }
	                    else {
	                        newClasses.push(classNames[i] + '-' + theme);
	                    }
	                }
	            }
	            this._removeOldClasses(oldClasses, element);
	            this._addNewClasses(newClasses, element);
	            for (var i = 0; i < children.length; i += 1) {
	                this.setTheme(oldTheme, theme, $(children[i]));
	            }
	        },

	        _removeOldClasses: function (classes, element) {
	            for (var i = 0; i < classes.length; i += 1) {
	                element.removeClass(classes[i]);
	            }
	        },

	        _addNewClasses: function (classes, element) {
	            for (var i = 0; i < classes.length; i += 1) {
	                element.addClass(classes[i]);
	            }
	        },

	        getOffset: function (el) {
	            var left = $.jqx.mobile.getLeftPos(el[0]);
	            var top = $.jqx.mobile.getTopPos(el[0]);
	            return { top: top, left: left };
	        },

	        resize: function(element, callback, destroy, checkForHidden)
	        {
	            if (checkForHidden === undefined) {
	                checkForHidden = true;
	            }

	            var index = -1;
	            var that = this;
	            var getHiddenIndex = function (element) {
	                if (!that.hiddenWidgets) {
	                    return -1;
	                }

	                var hiddenIndex = -1;
	                for (var i = 0; i < that.hiddenWidgets.length; i++) {
	                    if (element.id) {
	                        if (that.hiddenWidgets[i].id == element.id) {
	                            hiddenIndex = i;
	                            break;
	                        }
	                    }
	                    else {
	                        if (that.hiddenWidgets[i].id == element[0].id) {
	                            hiddenIndex = i;
	                            break;
	                        }
	                    }
	                }
	                return hiddenIndex;
	            }


	            if (this.resizeHandlers) {
	                for (var i = 0; i < this.resizeHandlers.length; i++) {
	                    if (element.id) {
	                        if (this.resizeHandlers[i].id == element.id) {
	                            index = i;
	                            break;
	                        }
	                    }
	                    else {
	                        if (this.resizeHandlers[i].id == element[0].id) {
	                            index = i;
	                            break;
	                        }
	                    }
	                }

	                if (destroy === true) {
	                    if (index != -1) {
	                        this.resizeHandlers.splice(index, 1);
	                    }

	                    if (this.resizeHandlers.length == 0) {
	                        var w = $(window);
	                        if (w.off) {
	                            w.off('resize.jqx');
	                            w.off('orientationchange.jqx');
	                            w.off('orientationchanged.jqx');
	                        }
	                        else {
	                            w.unbind('resize.jqx');
	                            w.unbind('orientationchange.jqx');
	                            w.unbind('orientationchanged.jqx');
	                        }
	                        this.resizeHandlers = null;
	                    }
	                    var hiddenIndex = getHiddenIndex(element);
	                    if (hiddenIndex != -1 && this.hiddenWidgets) {
	                        this.hiddenWidgets.splice(hiddenIndex, 1);
	                    }
	                    return;
	                }
	            }
	            else if (destroy === true) {
	                var hiddenIndex = getHiddenIndex(element);
	                if (hiddenIndex != -1 && this.hiddenWidgets) {
	                    this.hiddenWidgets.splice(hiddenIndex, 1);
	                }
	                return;
	            }
	            var that = this;
	            var doResize = function (isHidden, type) {
	                if (!that.resizeHandlers)
	                    return;

	                var getParentsCount = function (element) {
	                    var index = -1;
	                    var parent = element.parentNode;
	                    while (parent) {
	                        index++;
	                        parent = parent.parentNode;
	                    }
	                    return index;
	                }

	                var compare = function (value1, value2) {
	                    if (!value1.widget || !value2.widget)
	                        return 0;

	                    var parents1 = getParentsCount(value1.widget[0]);
	                    var parents2 = getParentsCount(value2.widget[0]);

	                    try {
	                        if (parents1 < parents2) { return -1; }
	                        if (parents1 > parents2) { return 1; }
	                    }
	                    catch (error) {
	                        var er = error;
	                    }

	                    return 0;
	                };

	                that.hiddenWidgets = new Array();
	                that.resizeHandlers.sort(compare);
	                for(var i = 0; i < that.resizeHandlers.length; i++)
	                {
	                    var handler = that.resizeHandlers[i];
	                    var widget = handler.widget;
	                    var data = handler.data;
	                    if (!data) continue;
	                    if (!data.jqxWidget) continue;

	                    var width = data.jqxWidget.width;
	                    var height = data.jqxWidget.height;

	                    if (data.jqxWidget.base) {
	                        if (width == undefined) {
	                            width = data.jqxWidget.base.width;
	                        }
	                        if (height == undefined) {
	                            height = data.jqxWidget.base.height;
	                        }
	                    }

	                    var percentageSize = false;
	                    if (width != null && width.toString().indexOf("%") != -1) {
	                        percentageSize = true;
	                    }

	                    if (height != null && height.toString().indexOf("%") != -1) {
	                        percentageSize = true;
	                    }

	                    if ($.jqx.isHidden(widget)) {
	                        if (getHiddenIndex(widget) === -1) {
	                            if (percentageSize || isHidden === true) {
	                                if (handler.data.nestedWidget !== true) {
	                                    that.hiddenWidgets.push(handler);
	                                }
	                            }
	                        }
	                    }
	                    else if (isHidden === undefined || isHidden !== true) {
	                        if (percentageSize) {
	                            handler.callback(type);
	                            if (that.hiddenWidgets.indexOf(handler) >= 0) {
	                                that.hiddenWidgets.splice(that.hiddenWidgets.indexOf(handler), 1);
	                            }
	                        }
	                    }
	                };
	                if (that.hiddenWidgets.length > 0) {
	                    that.hiddenWidgets.sort(compare);
	                    if (that.__resizeInterval) clearInterval(that.__resizeInterval);
	                    that.__resizeInterval = setInterval(function () {
	                        var hasHiddenWidget = false;
	                        var currentHiddenWidgets = new Array();
	                        for (var p = 0; p < that.hiddenWidgets.length; p++) {
	                            var handler = that.hiddenWidgets[p];
	                            if ($.jqx.isHidden(handler.widget)) {
	                                hasHiddenWidget = true;
	                                currentHiddenWidgets.push(handler);
	                            }
	                            else {
	                                if (handler.callback) {
	                                    handler.callback(type);
	                                }
	                            }
	                        }
	                        that.hiddenWidgets = currentHiddenWidgets;
	                        if (!hasHiddenWidget) {
	                            clearInterval(that.__resizeInterval);
	                        }
	                    }, 100);
	                }
	            }

	            if (!this.resizeHandlers) {
	                this.resizeHandlers = new Array();
	             
	                var w = $(window);
	                if (w.on) {
	                    this._resizeTimer = null;
	                    w.on('resize.jqx', function (event) {
	                        if (that._resizeTimer != undefined) {
	                            clearTimeout(that._resizeTimer);
	                        }
	                        that._resizeTimer = setTimeout(function () {
	                            doResize(null, 'resize');
	                        }, 10);
	                    });
	                    w.on('orientationchange.jqx', function (event) {
	                        doResize(null, 'orientationchange');
	                    });
	                    w.on('orientationchanged.jqx', function (event) {
	                        doResize(null, 'orientationchange');
	                    });
	                }
	                else {
	                    w.bind('resize.jqx', function (event) {
	                        doResize(null, 'orientationchange');
	                    });
	                    w.bind('orientationchange.jqx', function (event) {
	                        doResize(null, 'orientationchange');
	                    });
	                    w.bind('orientationchanged.jqx', function (event) {
	                        doResize(null, 'orientationchange');
	                    });
	                }
	            }
	            if (checkForHidden) {
	                if (index === -1) {
	                    this.resizeHandlers.push({ id: element[0].id, widget: element, callback: callback, data: element.data() });
	                }
	            }
	            if ($.jqx.isHidden(element) && checkForHidden === true) {
	                doResize(true);
	            }
	        },

	        html: function (element, value) {
	            if (!$(element).on) {
	                return $(element).html(value);
	            }
	            try
	            {
	                return jQuery.access(element, function (value) {
	                    var elem = element[0] || {},
	                        i = 0,
	                        l = element.length;

	                    if (value === undefined) {
	                        return elem.nodeType === 1 ?
	                            elem.innerHTML.replace(rinlinejQuery, "") :
	                            undefined;
	                    }

	                    var rnoInnerhtml = /<(?:script|style|link)/i,
	                        nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
	            "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	                        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	                        rtagName = /<([\w:]+)/,
	                        rnocache = /<(?:script|object|embed|option|style)/i,
	                        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	                        rleadingWhitespace = /^\s+/,
	                        wrapMap = {
	                            option: [1, "<select multiple='multiple'>", "</select>"],
	                            legend: [1, "<fieldset>", "</fieldset>"],
	                            thead: [1, "<table>", "</table>"],
	                            tr: [2, "<table><tbody>", "</tbody></table>"],
	                            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
	                            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
	                            area: [1, "<map>", "</map>"],
	                            _default: [0, "", ""]
	                        };

	                    if (typeof value === "string" && !rnoInnerhtml.test(value) &&
	                        (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) &&
	                        (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
	                        !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

	                        value = value.replace(rxhtmlTag, "<$1></$2>");

	                        try {
	                            for (; i < l; i++) {
	                                elem = this[i] || {};
	                                if (elem.nodeType === 1) {
	                                    jQuery.cleanData(elem.getElementsByTagName("*"));
	                                    elem.innerHTML = value;
	                                }
	                            }

	                            elem = 0;
	                        } catch (e) { }
	                    }

	                    if (elem) {
	                        element.empty().append(value);
	                    }
	                }, null, value, arguments.length);
	            }
	            catch (error) {
	                return $(element).html(value);
	            }
	        },

	        hasTransform: function (el) {
	            var transform = "";
	            transform = el.css('transform');

	            if (transform == "" || transform == 'none') {
	                transform = el.parents().css('transform');
	                if (transform == "" || transform == 'none') {
	                    var browserInfo = $.jqx.utilities.getBrowser();
	                    if (browserInfo.browser == 'msie') {
	                        transform = el.css('-ms-transform');
	                        if (transform == "" || transform == 'none') {
	                            transform = el.parents().css('-ms-transform');
	                        }
	                    }
	                    else if (browserInfo.browser == 'chrome') {
	                        transform = el.css('-webkit-transform');
	                        if (transform == "" || transform == 'none') {
	                            transform = el.parents().css('-webkit-transform');
	                        }
	                    }
	                    else if (browserInfo.browser == 'opera') {
	                        transform = el.css('-o-transform');
	                        if (transform == "" || transform == 'none') {
	                            transform = el.parents().css('-o-transform');
	                        }
	                    }
	                    else if (browserInfo.browser == 'mozilla') {
	                        transform = el.css('-moz-transform');
	                        if (transform == "" || transform == 'none') {
	                            transform = el.parents().css('-moz-transform');
	                        }
	                    }
	                } else {
	                    return transform != "" && transform != 'none';
	                }
	            }
	            if (transform == "" || transform == 'none') {
	                transform = $(document.body).css('transform');
	            }
	            return transform != "" && transform != 'none' && transform != null;
	        },

	        getBrowser: function () {
	            var ua = navigator.userAgent.toLowerCase();

	            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
			        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
			        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
			        /(msie) ([\w.]+)/.exec(ua) ||
			        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
			        [];

	            var obj = {
	                browser: match[1] || "",
	                version: match[2] || "0"
	            };
	            if (ua.indexOf("rv:11.0") >= 0 && ua.indexOf(".net4.0c") >= 0) {
	                obj.browser = "msie";
	                obj.version = "11";
	                match[1] = "msie";
	            }
	            obj[match[1]] = match[1];
	            return obj;
	        }
	    });
	    $.jqx.browser = $.jqx.utilities.getBrowser();
	    $.jqx.isHidden = function (element) {
	        try
	        {
	            var w = element[0].offsetWidth, h = element[0].offsetHeight;
	            if (w === 0 || h === 0)
	                return true;
	            else {
	                return false;
	            }
	        }
	        catch (error) {
	            return false;
	        }
	    };

	    $.jqx.ariaEnabled = true;
	    $.jqx.aria = function (that, property, value) {
	        if (!$.jqx.ariaEnabled)
	            return;

	        if (property == undefined) {
	            $.each(that.aria, function (index, value) {
	                var attrValue = !that.base ? that.host.attr(index) : that.base.host.attr(index);
	                if (attrValue != undefined && !$.isFunction(attrValue)) {
	                    var newValue = attrValue;
	                    switch (value.type) {
	                        case "number":
	                            newValue = new Number(attrValue);
	                            if (isNaN(newValue)) newValue = attrValue;
	                            break;
	                        case "boolean":
	                            newValue = attrValue == "true" ? true : false;
	                            break;
	                        case "date":
	                            newValue = new Date(attrValue);
	                            if (newValue == "Invalid Date" || isNaN(newValue)) newValue = attrValue;
	                            break;
	                    }

	                    that[value.name] = newValue;
	                }
	                else {
	                    var attrValue = that[value.name];
	                    if ($.isFunction(attrValue)) attrValue = that[value.name]();
	                    if (attrValue == undefined) attrValue = "";
	                    try
	                    {
	                        !that.base ? that.host.attr(index, attrValue.toString()) : that.base.host.attr(index, attrValue.toString());
	                    }
	                    catch (error) {
	                    }
	                }
	            });
	        }
	        else {
	            try {
	                if (that.host) {
	                    if (!that.base) {
	                        if (that.host) {
	                            if (that.element.setAttribute) {
	                                that.element.setAttribute(property, value.toString());
	                            }
	                            else {
	                                that.host.attr(property, value.toString());
	                            }
	                        }
	                        else {
	                            that.attr(property, value.toString());
	                        }
	                    }
	                    else {
	                        if (that.base.host) {
	                            that.base.host.attr(property, value.toString());
	                        }
	                        else {
	                            that.attr(property, value.toString());
	                        }
	                    }
	                }
	                else if (that.setAttribute) {
	                    that.setAttribute(property, value.toString());
	                }
	            }
	            catch (error) {
	            }
	        }
	    };

	    if (!Array.prototype.indexOf) {
	        Array.prototype.indexOf = function (elt /*, from*/) {
	            var len = this.length;

	            var from = Number(arguments[1]) || 0;
	            from = (from < 0)
	                ? Math.ceil(from)
	                : Math.floor(from);
	            if (from < 0)
	                from += len;

	            for (; from < len; from++) {
	                if (from in this &&
	                this[from] === elt)
	                    return from;
	            }
	            return -1;
	        };
	    }

	    $.jqx.mobile = $.jqx.mobile || {};
	    $.jqx.position = function (event) {
	        var left = parseInt(event.pageX);
	        var top = parseInt(event.pageY);

	        if ($.jqx.mobile.isTouchDevice()) {
	            var touches = $.jqx.mobile.getTouches(event);
	            var touch = touches[0];
	            left = parseInt(touch.pageX);
	            top = parseInt(touch.pageY);
	        }
	        return { left: left, top: top }
	    }

	    $.extend($.jqx.mobile,
	    {
	        _touchListener: function (e, me) {
	            var createTouchEvent = function (name, e) {
	                var event = document.createEvent('MouseEvents');

	                event.initMouseEvent(
	                    name,
	                    e.bubbles,
	                    e.cancelable,
	                    e.view,
	                    e.detail,
	                    e.screenX,
	                    e.screenY,
	                    e.clientX,
	                    e.clientY,
	                    e.ctrlKey,
	                    e.altKey,
	                    e.shiftKey,
	                    e.metaKey,
	                    e.button,
	                    e.relatedTarget
	                );
	                event._pageX = e.pageX;
	                event._pageY = e.pageY;

	                return event;
	            }

	            var eventMap = { 'mousedown': 'touchstart', 'mouseup': 'touchend', 'mousemove': 'touchmove' };
	            var event = createTouchEvent(eventMap[e.type], e);
	            e.target.dispatchEvent(event);

	            var fn = e.target['on' + eventMap[e.type]];
	            if (typeof fn === 'function') fn(e);
	        },

	        setMobileSimulator: function (element, value) {
	            if (this.isTouchDevice()) {
	                return;
	            }

	            this.simulatetouches = true;
	            if (value == false) {
	                this.simulatetouches = false;
	            }

	            var eventMap = { 'mousedown': 'touchstart', 'mouseup': 'touchend', 'mousemove': 'touchmove' };

	            var self = this;
	            if (window.addEventListener) {
	                var subscribeToEvents = function () {
	                    for (var key in eventMap) {
	                        if (element.addEventListener) {
	                            element.removeEventListener(key, self._touchListener);
	                            element.addEventListener(key, self._touchListener, false);
	                        }

	                        //  document.removeEventListener(key, self._touchListener);
	                        //  document.addEventListener(key, self._touchListener, false);
	                    }
	                }

	                if ($.jqx.browser.msie) {
	                    subscribeToEvents();
	                }
	                else {
	                    subscribeToEvents();
	                }
	            }
	        },

	        isTouchDevice: function () {
	            if (this.touchDevice != undefined)
	                return this.touchDevice;

	            var txt = "Browser CodeName: " + navigator.appCodeName + "";
	            txt += "Browser Name: " + navigator.appName + "";
	            txt += "Browser Version: " + navigator.appVersion + "";
	            txt += "Platform: " + navigator.platform + "";
	            txt += "User-agent header: " + navigator.userAgent + "";

	            if (txt.indexOf('Android') != -1)
	                return true;

	            if (txt.indexOf('IEMobile') != -1)
	                return true;

	            if (txt.indexOf('Windows Phone') != -1)
	                return true;

	            if (txt.indexOf('WPDesktop') != -1)
	                return true;
	         
	            if (txt.indexOf('ZuneWP7') != -1)
	                return true;

	            if (txt.indexOf('BlackBerry') != -1 && txt.indexOf('Mobile Safari') != -1)
	                return true;

	            if (txt.indexOf('ipod') != -1)
	                return true;

	            if (txt.indexOf('nokia') != -1 || txt.indexOf('Nokia') != -1)
	                return true;

	            if (txt.indexOf('Chrome/17') != -1)
	                return false;

	            if (txt.indexOf('CrOS') != -1)
	                return false;

	            if (txt.indexOf('Opera') != -1 && txt.indexOf('Mobi') == -1 && txt.indexOf('Mini') == -1 && txt.indexOf('Platform: Win') != -1) {
	                return false;
	            }

	            if (txt.indexOf('Opera') != -1 && txt.indexOf('Mobi') != -1 && txt.indexOf('Opera Mobi') != -1) {
	                return true;
	            }

	            var deviceTypes = {
	                    ios: 'i(?:Pad|Phone|Pod)(?:.*)CPU(?: iPhone)? OS ',
	                    android: '(Android |HTC_|Silk/)',
	                    blackberry: 'BlackBerry(?:.*)Version\/',
	                    rimTablet: 'RIM Tablet OS ',
	                    webos: '(?:webOS|hpwOS)\/',
	                    bada: 'Bada\/'
	            }

	            // check for IPad, IPhone, IE and Chrome
	            try {
	                if (this.touchDevice != undefined)
	                    return this.touchDevice;

	                this.touchDevice = false;
	                for (i in deviceTypes) {
	                    if (deviceTypes.hasOwnProperty(i)) {
	                        prefix = deviceTypes[i];                  
	                        match = txt.match(new RegExp('(?:' + prefix + ')([^\\s;]+)'));
	                        if (match) {
	                            if (i.toString() == "blackberry") {
	                                // handle touches through mouse pointer.
	                                this.touchDevice = false;
	                                return false;
	                            }

	                            this.touchDevice = true;
	                            return true;
	                        }
	                    }
	                }

	                if (navigator.platform.toLowerCase().indexOf('win') != -1) {
	                    if (navigator.userAgent.indexOf('Windows Phone') >= 0 || navigator.userAgent.indexOf('WPDesktop') >= 0 || navigator.userAgent.indexOf('IEMobile') >= 0 || navigator.userAgent.indexOf('ZuneWP7') >= 0) {
	                        this.touchDevice = true;
	                        return true;
	                    }
	                    else {
	                        if (navigator.userAgent.indexOf('Touch') >= 0) {
	                            var supported = ('MSPointerDown' in window);
	                            if (supported) {
	                                this.touchDevice = true;
	                                return true;
	                            }
	                            if (navigator.userAgent.indexOf('ARM') >= 0) {
	                                this.touchDevice = true;
	                                return true;
	                            }

	                            this.touchDevice = false;
	                            return false;
	                        }
	                    }
	                }

	                if (navigator.platform.toLowerCase().indexOf('win') != -1) {
	                    this.touchDevice = false;
	                    return false;
	                }
	                if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
	                    this.touchDevice = true;
	                }
	                return this.touchDevice;
	            } catch (e) {
	                this.touchDevice = false;
	                return false;
	            }
	        },

	        getLeftPos: function (inputObj) {
	            var returnValue = inputObj.offsetLeft;
	            while ((inputObj = inputObj.offsetParent) != null) {
	                if (inputObj.tagName != 'HTML') {
	                    returnValue += inputObj.offsetLeft;
	                    if (document.all) returnValue += inputObj.clientLeft;
	                }
	            }
	            return returnValue;
	        },

	        getTopPos: function (inputObj) {
	            var returnValue = inputObj.offsetTop;
	            var initialOffset = $(inputObj).coord();
	            while ((inputObj = inputObj.offsetParent) != null) {
	                if (inputObj.tagName != 'HTML') {
	                    returnValue += (inputObj.offsetTop - inputObj.scrollTop);
	                    if (document.all) returnValue += inputObj.clientTop;
	                }
	            }
	            var agent = navigator.userAgent.toLowerCase();
	            var wp8 = (agent.indexOf('windows phone') != -1 || agent.indexOf('WPDesktop') != -1 || agent.indexOf('ZuneWP7') != -1 || agent.indexOf('msie 9') != -1 || agent.indexOf('msie 11') != -1 || agent.indexOf('msie 10') != -1) && agent.indexOf('touch') != -1;
	            if (wp8) {
	                return initialOffset.top;
	            }

	            if (this.isSafariMobileBrowser()) {
	                if (this.isSafari4MobileBrowser() && this.isIPadSafariMobileBrowser()) {
	                    return returnValue;
	                }
	                if (agent.indexOf('version/7') != -1) {
	                    return initialOffset.top;
	                }

	                returnValue = returnValue + $(window).scrollTop();
	            }

	            return returnValue;
	        },

	        isChromeMobileBrowser: function () {
	            var agent = navigator.userAgent.toLowerCase();
	            var result = agent.indexOf('android') != -1;
	            return result;
	        },

	        isOperaMiniMobileBrowser: function () {
	            var agent = navigator.userAgent.toLowerCase();
	            var result = agent.indexOf('opera mini') != -1 || agent.indexOf('opera mobi') != -1;
	            return result;
	        },

	        isOperaMiniBrowser: function () {
	            var agent = navigator.userAgent.toLowerCase();
	            var result = agent.indexOf('opera mini') != -1;
	            return result;
	        },

	        isNewSafariMobileBrowser: function () {
	            var agent = navigator.userAgent.toLowerCase();
	            var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1;
	            result = result && (agent.indexOf('version/5') != -1);
	            return result;
	        },

	        isSafari4MobileBrowser: function () {
	            var agent = navigator.userAgent.toLowerCase();
	            var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1;
	            result = result && (agent.indexOf('version/4') != -1);
	            return result;
	        },

	        isWindowsPhone: function () {
	            var agent = navigator.userAgent.toLowerCase();
	            var result = (agent.indexOf('windows phone') != -1 || agent.indexOf('WPDesktop') != -1 || agent.indexOf('ZuneWP7') != -1 || agent.indexOf('msie 9') != -1 || agent.indexOf('msie 11') != -1 || agent.indexOf('msie 10') != -1) && agent.indexOf('touch') != -1;
	            return result;
	        },

	        isSafariMobileBrowser: function () {
	            var agent = navigator.userAgent.toLowerCase();
	            var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1;
	            return result;
	        },

	        isIPadSafariMobileBrowser: function () {
	            var agent = navigator.userAgent.toLowerCase();
	            var result = agent.indexOf('ipad') != -1;
	            return result;
	        },

	        isMobileBrowser: function () {
	            var agent = navigator.userAgent.toLowerCase();
	            var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1 || agent.indexOf('android') != -1;
	            return result;
	        },

	        // Get the touch points from this event
	        getTouches: function (e) {
	            if (e.originalEvent) {
	                if (e.originalEvent.touches && e.originalEvent.touches.length) {
	                    return e.originalEvent.touches;
	                } else if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
	                    return e.originalEvent.changedTouches;
	                }
	            }

	            if (!e.touches) {
	                e.touches = new Array();
	                e.touches[0] = e.originalEvent != undefined ? e.originalEvent : e;

	                if (e.originalEvent != undefined && e.pageX)
	                    e.touches[0] = e;
	                if (e.type == 'mousemove') e.touches[0] = e;
	            }

	            return e.touches;
	        },

	        getTouchEventName: function (name) {
	            if (this.isWindowsPhone()) {
	                if (name.toLowerCase().indexOf('start') != -1) return 'MSPointerDown';
	                if (name.toLowerCase().indexOf('move') != -1) return 'MSPointerMove';
	                if (name.toLowerCase().indexOf('end') != -1) return 'MSPointerUp';
	            }
	            else {
	                return name;
	            }
	        },

	        // Dispatches a fake mouse event from a touch event
	        dispatchMouseEvent: function (name, touch, target) {
	            if (this.simulatetouches)
	                return;

	            var e = document.createEvent('MouseEvent');
	            e.initMouseEvent(name, true, true, touch.view, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	            if (target != null) {
	                target.dispatchEvent(e);
	            }
	        },

	        // Find the root node of this target
	        getRootNode: function (target) {
	            while (target.nodeType !== 1) {
	                target = target.parentNode;
	            }
	            return target;
	        },

	        setTouchScroll: function (enable, key) {
	            if (!this.enableScrolling) this.enableScrolling = [];
	            this.enableScrolling[key] = enable;
	        },

	        touchScroll: function (element, scrollHeight, callback, key, horizontalScroll, verticalScroll) {
	            if (element == null)
	                return;

	            var me = this;
	            var scrollY = 0;
	            var touchY = 0;
	            var movedY = 0;
	            var scrollX = 0;
	            var touchX = 0;
	            var movedX = 0;
	            if (!this.scrolling) this.scrolling = [];
	            this.scrolling[key] = false;
	            var moved = false;
	            var $element = $(element);
	            var touchTags = ['select', 'input', 'textarea'];
	            var touchStart = 0;
	            var touchEnd = 0;
	            if (!this.enableScrolling) this.enableScrolling = [];
	            this.enableScrolling[key] = true;
	            var key = key;
	            var touchStartName = this.getTouchEventName('touchstart') + ".touchScroll";
	            var touchEndName = this.getTouchEventName('touchend') + ".touchScroll";
	            var touchMoveName = this.getTouchEventName('touchmove') + ".touchScroll";

	            var touchStart = function (event) {
	                if (!me.enableScrolling[key])
	                    return true;

	                // Allow certain HTML tags to receive touch events
	                if ($.inArray(event.target.tagName.toLowerCase(), touchTags) !== -1) {
	                    return;
	                }

	                var touches = me.getTouches(event);
	                var touch = touches[0];
	                if (touches.length == 1) {
	                    me.dispatchMouseEvent('mousedown', touch, me.getRootNode(touch.target));
	                }

	                moved = false;
	                touchY = touch.pageY;
	                touchX = touch.pageX;
	                if (me.simulatetouches) {
	                    touchY = touch._pageY;
	                    touchX = touch._pageX;
	                }
	                me.scrolling[key] = true;

	                scrollY = 0;
	                scrollX = 0;
	                return true;
	            }

	            if ($element.on) {
	                $element.on(touchStartName, touchStart);
	            }
	            else {
	                $element.bind(touchStartName, touchStart);
	            }

	            var touchMove = function (event) {
	                if (!me.enableScrolling[key])
	                    return true;

	                if (!me.scrolling[key]) {
	                    return true;
	                }
	                var touches = me.getTouches(event);
	                if (touches.length > 1) {
	                    return true;
	                }

	                var pageY = touches[0].pageY;
	                var pageX = touches[0].pageX;

	                if (me.simulatetouches) {
	                    pageY = touches[0]._pageY;
	                    pageX = touches[0]._pageX;
	                }

	                var dy = pageY - touchY;
	                var dx = pageX - touchX;
	                touchEnd = pageY;
	                touchHorizontalEnd = pageX;
	                movedY = dy - scrollY;
	                movedX = dx - scrollX;
	                moved = true;
	                scrollY = dy;
	                scrollX = dx;
	            
	                var hScrollVisible = horizontalScroll != null ? horizontalScroll[0].style.visibility != 'hidden' : true;
	                var vScrollVisible = verticalScroll != null ? verticalScroll[0].style.visibility != 'hidden' : true;

	                if (hScrollVisible || vScrollVisible) {
	                    if ((movedX !== 0 && hScrollVisible) || (movedY !== 0 && vScrollVisible)) {
	                        callback(-movedX * 1, -movedY * 1, dx, dy, event);
	                        event.preventDefault();
	                        event.stopPropagation();
	                        if (event.preventManipulation) {
	                            event.preventManipulation();
	                        }
	                        return false;
	                    }
	                }
	            }

	            if ($element.on) {
	                $element.on(touchMoveName, touchMove);
	            }
	            else $element.bind(touchMoveName, touchMove);

	            if (this.simulatetouches) {
	                var windowBindFunc = $(window).on != undefined || $(window).bind;
	                var windowMouseUp = function (event) {
	                    me.scrolling[key] = false;
	                };
	                $(window).on != undefined ? $(document).on('mouseup.touchScroll', windowMouseUp) : $(document).bind('mouseup.touchScroll', windowMouseUp);

	                if (window.frameElement) {
	                    if (window.top != null) {
	                        var eventHandle = function (event) {
	                            me.scrolling[key] = false;
	                        };

	                        if (window.top.document) {
	                            $(window.top.document).on ? $(window.top.document).on('mouseup', eventHandle) : $(window.top.document).bind('mouseup', eventHandle);
	                        }
	                    }
	                }

	                var docBindFunc = $(document).on != undefined || $(document).bind;
	                var touchEndFunc = function (event) {
	                    if (!me.scrolling[key]) {
	                        return true;
	                    }
	                    me.scrolling[key] = false;
	                    var touch = me.getTouches(event)[0],
							target = me.getRootNode(touch.target);

	                    // Dispatch fake mouse up and click events if this touch event did not move
	                    me.dispatchMouseEvent('mouseup', touch, target);
	                    me.dispatchMouseEvent('click', touch, target);
	                };

	                $(document).on != undefined ? $(document).on('touchend', touchEndFunc) : $(document).bind('touchend', touchEndFunc);
	            }

	            var touchCancel = function (event) {
	                if (!me.enableScrolling[key])
	                    return true;

	                var touch = me.getTouches(event)[0];
	                if (!me.scrolling[key]) {
	                    return true;
	                }
	                me.scrolling[key] = false;
	                if (moved) {
	                    me.dispatchMouseEvent('mouseup', touch, target);
	                } else {
	                    var touch = me.getTouches(event)[0],
							target = me.getRootNode(touch.target);

	                    //        event.preventDefault();
	                    //         event.stopPropagation();
	                    // Dispatch fake mouse up and click events if this touch event did not move
	                    me.dispatchMouseEvent('mouseup', touch, target);
	                    me.dispatchMouseEvent('click', touch, target);
	                    return true;
	                }
	            }

	            if ($element.on) {
	                $element.on('dragstart', function (event) {
	                    event.preventDefault();
	                });
	                $element.on('selectstart', function (event) {
	                    event.preventDefault();
	                });
	            }
	            $element.on ? $element.on(touchEndName + ' touchcancel.touchScroll', touchCancel) : $element.bind(touchEndName + ' touchcancel.touchScroll', touchCancel);
	        }
	    });

	    $.jqx.cookie = $.jqx.cookie || {};
	    $.extend($.jqx.cookie,
	    {
	        cookie: function (key, value, options) {
	            // set cookie.
	            if (arguments.length > 1 && String(value) !== "[object Object]") {
	                options = jQuery.extend({}, options);

	                if (value === null || value === undefined) {
	                    options.expires = -1;
	                }

	                if (typeof options.expires === 'number') {
	                    var days = options.expires, t = options.expires = new Date();
	                    t.setDate(t.getDate() + days);
	                }

	                value = String(value);

	                return (document.cookie = [
	                encodeURIComponent(key), '=',
	                options.raw ? value : encodeURIComponent(value),
	                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
	                options.path ? '; path=' + options.path : '',
	                options.domain ? '; domain=' + options.domain : '',
	                options.secure ? '; secure' : ''
	        ].join(''));
	            }
	            // get cookie...
	            options = value || {};
	            var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
	            return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
	        }
	    });

	    // stringutilities
	    $.jqx.string = $.jqx.string || {};
	    $.extend($.jqx.string,
	    {
	        replace: function (text, stringToFind, stringToReplace) {
	            if (stringToFind === stringToReplace) return this;
	            var temp = text;
	            var index = temp.indexOf(stringToFind);
	            while (index != -1) {
	                temp = temp.replace(stringToFind, stringToReplace);
	                index = temp.indexOf(stringToFind);
	            }
	            return temp;
	        },

	        contains: function (fullString, value) {
	            if (fullString == null || value == null)
	                return false;

	            return fullString.indexOf(value) != -1;
	        },

	        containsIgnoreCase: function (fullString, value) {
	            if (fullString == null || value == null)
	                return false;

	            return fullString.toUpperCase().indexOf(value.toUpperCase()) != -1;
	        },

	        equals: function (fullString, value) {
	            if (fullString == null || value == null)
	                return false;

	            fullString = this.normalize(fullString);

	            if (value.length == fullString.length) {
	                return fullString.slice(0, value.length) == value;
	            }

	            return false;
	        },

	        equalsIgnoreCase: function (fullString, value) {
	            if (fullString == null || value == null)
	                return false;

	            fullString = this.normalize(fullString);

	            if (value.length == fullString.length) {
	                return fullString.toUpperCase().slice(0, value.length) == value.toUpperCase();
	            }

	            return false;
	        },

	        startsWith: function (fullString, value) {
	            if (fullString == null || value == null)
	                return false;

	            return fullString.slice(0, value.length) == value;
	        },

	        startsWithIgnoreCase: function (fullString, value) {
	            if (fullString == null || value == null)
	                return false;

	            return fullString.toUpperCase().slice(0, value.length) == value.toUpperCase();
	        },

	        normalize: function (fullString) {
	            if (fullString.charCodeAt(fullString.length - 1) == 65279) {
	                fullString = fullString.substring(0, fullString.length - 1);
	            }

	            return fullString;
	        },

	        endsWith: function (fullString, value) {
	            if (fullString == null || value == null)
	                return false;

	            fullString = this.normalize(fullString);
	            return fullString.slice(-value.length) == value;
	        },

	        endsWithIgnoreCase: function (fullString, value) {
	            if (fullString == null || value == null)
	                return false;

	            fullString = this.normalize(fullString);

	            return fullString.toUpperCase().slice(-value.length) == value.toUpperCase();
	        }
	    });

	    $.extend(jQuery.easing, {
	        easeOutBack: function (x, t, b, c, d, s) {
	            if (s == undefined) s = 1.70158;
	            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	        },
	        easeInQuad: function (x, t, b, c, d) {
	            return c * (t /= d) * t + b;
	        },
	        easeInOutCirc: function (x, t, b, c, d) {
	            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	        },
	        easeInOutSine: function (x, t, b, c, d) {
	            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	        },
	        easeInCubic: function (x, t, b, c, d) {
	            return c * (t /= d) * t * t + b;
	        },
	        easeOutCubic: function (x, t, b, c, d) {
	            return c * ((t = t / d - 1) * t * t + 1) + b;
	        },
	        easeInOutCubic: function (x, t, b, c, d) {
	            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	            return c / 2 * ((t -= 2) * t * t + 2) + b;
	        },
	        easeInSine: function (x, t, b, c, d) {
	            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	        },
	        easeOutSine: function (x, t, b, c, d) {
	            return c * Math.sin(t / d * (Math.PI / 2)) + b;
	        },
	        easeInOutSine: function (x, t, b, c, d) {
	            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	        }
	    });
	})(jQuery);
	(function ($) {
	    $.extend(jQuery.event.special,
	    {
	        "close": { noBubble: true },
	        "open": { noBubble: true },
	        "cellclick": { noBubble: true },
	        "rowclick": { noBubble: true },
	        "tabclick": { noBubble: true },
	        "selected": { noBubble: true },
	        "expanded": { noBubble: true },
	        "collapsed": { noBubble: true },
	        "valuechanged": { noBubble: true },
	        "expandedItem": { noBubble: true },
	        "collapsedItem": { noBubble: true },
	        "expandingItem": { noBubble: true },
	        "collapsingItem": { noBubble: true }
	    });

	    $.fn.extend({
	        ischildof: function (filter_string) {
	            var parents = $(this).parents().get();

	            for (var j = 0; j < parents.length; j++) {
	                if (typeof filter_string != "string") {
	                    var parent = parents[j];
	                    if (filter_string !== undefined) {
	                        if (parent == filter_string[0])
	                            return true;
	                    }
	                }
	                else {
	                    if (filter_string !== undefined) {
	                        if ($(parents[j]).is(filter_string)) {
	                            return true;
	                        }
	                    }
	                }
	            }

	            return false;
	        }
	    });

	    $.fn.jqxProxy = function () {
	        var widget = $(this).data().jqxWidget;

	        var args = Array.prototype.slice.call(arguments, 0);
	        return $.jqx.jqxWidgetProxy(widget.widgetName, widget.element, args);
	    }

	    var originalVal = this.originalVal = $.fn.val;
	    $.fn.val = function (value) {
	        if (typeof value == 'undefined') {
	            if ($(this).hasClass('jqx-widget')) {
	                var widget = $(this).data().jqxWidget;
	                if (widget && widget.val) {
	                    return widget.val();
	                }
	            }
	            return originalVal.call(this);
	        }
	        else {
	            if ($(this).hasClass('jqx-widget')) {
	                var widget = $(this).data().jqxWidget;
	                if (widget && widget.val) {
	                    if (arguments.length != 2) {
	                        return widget.val(value);
	                    }
	                    else {
	                        return widget.val(value, arguments[1]);
	                    }
	                }
	            }

	            return originalVal.call(this, value);
	        }
	    };

	    $.fn.coord = function (options) {
	        var docElem, win,
	            box = { top: 0, left: 0 },
	            elem = this[0],
	            doc = elem && elem.ownerDocument;
	        if (!doc) {
	            return;
	        }
	        docElem = doc.documentElement;
	        if (!jQuery.contains(docElem, elem)) {
	            return box;
	        }
	        if (typeof elem.getBoundingClientRect !== undefined) {
	            box = elem.getBoundingClientRect();
	        }
	        var getWindow = function(elem) {
	            return jQuery.isWindow(elem) ?
	                elem :
	                elem.nodeType === 9 ?
	                    elem.defaultView || elem.parentWindow :
	                    false;
	        };

	        win = getWindow(doc);
	        var additionalLeftOffset = 0;
	        var additionalTopOffset = 0;
	        var agent = navigator.userAgent.toLowerCase();
	        var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1;
	        if (result) {
	            // fix for iphone/ipad left offsets.
	            additionalLeftOffset = 2;
	        }
	        if (true == options) {
	            if ($(document.body).css('position') != 'static') {
	                var coords = $(document.body).coord();
	                additionalLeftOffset = -coords.left;
	                additionalTopOffset = -coords.top;
	            }
	        }

	        return {
	            top: additionalTopOffset + box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
	            left: additionalLeftOffset + box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
	        };
	    };
	})(jQuery);

	/*
	jQWidgets v3.2.2 (2014-Mar-21)
	Copyright (c) 2011-2014 jQWidgets.
	License: http://jqwidgets.com/license/
	*/


	(function ($) {
	    $.jqx.cssroundedcorners = function (value) {
	        var cssMap = {
	            'all': 'jqx-rc-all',
	            'top': 'jqx-rc-t',
	            'bottom': 'jqx-rc-b',
	            'left': 'jqx-rc-l',
	            'right': 'jqx-rc-r',
	            'top-right': 'jqx-rc-tr',
	            'top-left': 'jqx-rc-tl',
	            'bottom-right': 'jqx-rc-br',
	            'bottom-left': 'jqx-rc-bl'
	        };

	        for (prop in cssMap) {
	            if (!cssMap.hasOwnProperty(prop))
	                continue;

	            if (value == prop)
	                return cssMap[prop];
	        }
	    }

	    $.jqx.jqxWidget("jqxButton", "", {});

	    $.extend($.jqx._jqxButton.prototype, {
	        defineInstance: function () {
	            this.cursor = 'arrow';
	            // rounds the button corners.
	            this.roundedCorners = 'all';
	            // enables / disables the button
	            this.disabled = false;
	            // sets height to the button.
	            this.height = null;
	            // sets width to the button.
	            this.width = null;
	            this.overrideTheme = false;
	            this.enableHover = true;
	            this.enableDefault = true;
	            this.enablePressed = true;
	            this.rtl = false;
	            this._ariaDisabled = false;
	            this._scrollAreaButton = false;
	            this.aria =
	            {
	                "aria-disabled": { name: "disabled", type: "boolean" }
	            };
	        },

	        createInstance: function (args) {
	            var self = this;
	            this._setSize();

	            if (!this._ariaDisabled) {
	                this.host.attr('role', 'button');
	            }
	            if (!this.overrideTheme) {
	                this.host.addClass(this.toThemeProperty($.jqx.cssroundedcorners(this.roundedCorners)));
	                if (this.enableDefault) {
	                    this.host.addClass(this.toThemeProperty('jqx-button'));
	                }
	                this.host.addClass(this.toThemeProperty('jqx-widget'));
	            }

	            this.isTouchDevice = $.jqx.mobile.isTouchDevice();
	            if (!this._ariaDisabled) {
	                $.jqx.aria(this);
	            }

	            if (this.cursor != 'arrow') {
	                if (!this.disabled) {
	                    this.host.css({ cursor: this.cursor });
	                }
	                else {
	                    this.host.css({ cursor: 'arrow' });
	                }
	            }

	            var eventNames = 'mouseenter mouseleave mousedown focus blur';
	            if (this._scrollAreaButton) {
	                var eventNames = 'mousedown';
	            }

	            if (this.isTouchDevice) {
	                this.addHandler(this.host, $.jqx.mobile.getTouchEventName('touchstart'), function (event) {
	                    self.isPressed = true;
	                    self.refresh();
	                });
	                this.addHandler($(document), $.jqx.mobile.getTouchEventName('touchend') + "." + this.element.id, function (event) {
	                    self.isPressed = false;
	                    self.refresh();
	                });
	            }

	            this.addHandler(this.host, eventNames, function (event) {
	                switch (event.type) {
	                    case 'mouseenter':
	                        if (!this.isTouchDevice) {
	                            if (!self.disabled && self.enableHover) {
	                                self.isMouseOver = true;
	                                self.refresh();
	                            }
	                        }
	                        break;
	                    case 'mouseleave':
	                        if (!this.isTouchDevice) {
	                            if (!self.disabled && self.enableHover) {
	                                self.isMouseOver = false;
	                                self.refresh();
	                            }
	                        }
	                        break;
	                    case 'mousedown':
	                        if (!self.disabled) {
	                            self.isPressed = true;
	                            self.refresh();
	                        }
	                        break;
	                    case 'focus':
	                        if (!self.disabled) {
	                            self.isFocused = true;
	                            self.refresh();
	                        }
	                        break;
	                    case 'blur':
	                        if (!self.disabled) {
	                            self.isFocused = false;
	                            self.refresh();
	                        }
	                        break;
	                }
	            });

	            this.mouseupfunc = function (event) {
	                if (!self.disabled) {
	                    self.isPressed = false;
	                    self.refresh();
	                }
	            }

	            this.addHandler($(document), 'mouseup.button' + this.element.id, this.mouseupfunc);

	            try {
	                if (document.referrer != "" || window.frameElement) {
	                    if (window.top != null && window.top != window.self) {
	                        var parentLocation = '';
	                        if (window.parent && document.referrer) {
	                            parentLocation = document.referrer;
	                        }

	                        if (parentLocation.indexOf(document.location.host) != -1) {
	                            var eventHandle = function (event) {
	                                self.isPressed = false;
	                                self.refresh();
	                            };

	                            if (window.top.document) {
	                                this.addHandler($(window.top.document), 'mouseup', eventHandle);
	                            }
	                        }
	                    }
	                }
	            }
	            catch (error) {
	            }
	            
	            this.propertyChangeMap['roundedCorners'] = function (instance, key, oldVal, value) {
	                instance.host.removeClass(instance.toThemeProperty($.jqx.cssroundedcorners(oldVal)));
	                instance.host.addClass(instance.toThemeProperty($.jqx.cssroundedcorners(value)));
	            };
	            this.propertyChangeMap['width'] = function (instance, key, oldVal, value) {
	                instance._setSize();
	                instance.refresh();
	            };
	            this.propertyChangeMap['height'] = function (instance, key, oldVal, value) {
	                instance._setSize();
	                instance.refresh();
	            };
	            this.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
	                if (oldVal != value) {
	                    instance.host[0].disabled = value;
	                    instance.host.attr('disabled', value);
	                    instance.refresh();
	                    if (!value) {
	                        instance.host.css({ cursor: instance.cursor });
	                    }
	                    else {
	                        instance.host.css({ cursor: 'default' });
	                    }

	                    $.jqx.aria(instance, "aria-disabled", instance.disabled);
	                }
	            };
	            this.propertyChangeMap['rtl'] = function (instance, key, oldVal, value) {
	                if (oldVal != value) {
	                    instance.refresh();
	                }
	            };
	            this.propertyChangeMap['theme'] = function (instance, key, oldVal, value) {
	                instance.host.removeClass();

	                instance.host.addClass(instance.toThemeProperty('jqx-button'));
	                instance.host.addClass(instance.toThemeProperty('jqx-widget'));
	                if (!instance.overrideTheme) {
	                    instance.host.addClass(instance.toThemeProperty($.jqx.cssroundedcorners(instance.roundedCorners)));
	                }
	                instance._oldCSSCurrent = null;
	                instance.refresh();
	            };
	            if (this.disabled) {
	                this.element.disabled = true;
	                this.host.attr('disabled', true);
	            }
	        }, // createInstance

	        resize: function (width, height) {
	            this.width = width;
	            this.height = height;
	            this._setSize();
	        },

	        val: function () {
	            var input = this.host.find('input');
	            if (input.length > 0) {
	                if (arguments.length == 0 || typeof (value) == "object") {
	                    return input.val();
	                }
	                input.val(value);
	                this.refresh();
	                return input.val();
	            }

	            if (arguments.length == 0 || typeof (value) == "object") {
	                if (this.element.nodeName.toLowerCase() == "button") {
	                    return $(this.element).text();
	                }
	                return this.element.value;
	            }
	            this.element.value = arguments[0];
	            if (this.element.nodeName.toLowerCase() == "button") {
	                $(this.element).text(arguments[0]);
	            }

	            this.refresh();
	        },

	        _setSize: function () {
	            if (this.width != null && (this.width.toString().indexOf("px") != -1 || this.width.toString().indexOf("%") != -1)) {
	                this.host.css('width', this.width);
	            }
	            else {
	                if (this.width != undefined && !isNaN(this.width)) {
	                    this.host.css('width', this.width);
	                }
	            }
	            if (this.height != null && (this.height.toString().indexOf("px") != -1 || this.height.toString().indexOf("%") != -1)) {
	                this.host.css('height', this.height);
	            }
	            else if (this.height != undefined && !isNaN(this.height)) {
	                this.host.css('height', parseInt(this.height));
	            }
	        },

	        _removeHandlers: function () {
	            this.removeHandler(this.host, 'selectstart');
	            this.removeHandler(this.host, 'click');
	            this.removeHandler(this.host, 'focus');
	            this.removeHandler(this.host, 'blur');
	            this.removeHandler(this.host, 'mouseenter');
	            this.removeHandler(this.host, 'mouseleave');
	            this.removeHandler(this.host, 'mousedown');
	            this.removeHandler($(document), 'mouseup.button' + this.element.id, this.mouseupfunc);
	            if (this.isTouchDevice) {
	                this.removeHandler(this.host, $.jqx.mobile.getTouchEventName('touchstart'));
	                this.removeHandler($(document), $.jqx.mobile.getTouchEventName('touchend') + "." + this.element.id);
	            }
	            this.mouseupfunc = null;
	            delete this.mouseupfunc;
	        },

	        focus: function()
	        {
	            this.host.focus();
	        },

	        destroy: function () {
	            this._removeHandlers();
	            var vars = $.data(this.element, "jqxButton");
	            if (vars) {
	                delete vars.instance;
	            }
	            this.host.removeClass();
	            this.host.removeData();
	            this.host.remove();
	            delete this.set;
	            delete this.get;
	            delete this.call;
	            delete this.propertyChangeMap['roundedCorners'];
	            delete this.propertyChangeMap['width'];
	            delete this.propertyChangeMap['height'];
	            delete this.propertyChangeMap['disabled'];
	            delete this.propertyChangeMap['rtl'];
	            delete this.propertyChangeMap['theme'];
	            delete this.propertyChangeMap;
	            delete this.element;
	            delete this.host;
	        },

	        render: function()
	        {
	            this.refresh();
	        },

	        refresh: function () {
	            if (this.overrideTheme)
	                return;

	            var cssFocused = this.toThemeProperty('jqx-fill-state-focus');
	            var cssDisabled = this.toThemeProperty('jqx-fill-state-disabled');
	            var cssNormal = this.toThemeProperty('jqx-fill-state-normal');
	            if (!this.enableDefault) {
	                cssNormal = "";
	            }

	            var cssHover = this.toThemeProperty('jqx-fill-state-hover');
	            var cssPressed = this.toThemeProperty('jqx-fill-state-pressed');
	            var cssPressedHover = this.toThemeProperty('jqx-fill-state-pressed');
	            if (!this.enablePressed) {
	                cssPressed = "";
	            }
	            var cssCurrent = '';
	            if (!this.host) {
	                return;
	            }

	            this.host[0].disabled = this.disabled;

	            if (this.disabled) {
	                cssCurrent = cssDisabled;
	            }
	            else {
	                if (this.isMouseOver && !this.isTouchDevice) {
	                    if (this.isPressed)
	                        cssCurrent = cssPressedHover;
	                    else
	                        cssCurrent = cssHover;
	                }
	                else {
	                    if (this.isPressed)
	                        cssCurrent = cssPressed;
	                    else
	                        cssCurrent = cssNormal;
	                }
	            }

	            if (this.isFocused) {
	                cssCurrent += " " + cssFocused;
	            }

	            if (cssCurrent != this._oldCSSCurrent) {
	                if (this._oldCSSCurrent) {
	                    this.host.removeClass(this._oldCSSCurrent);
	                }
	                this.host.addClass(cssCurrent);
	                this._oldCSSCurrent = cssCurrent;
	            }
	            if (this.rtl) {
	                this.host.addClass(this.toThemeProperty('jqx-rtl'));
	                this.host.css('direction', 'rtl');
	            }
	        }
	    });

	    //// LinkButton
	    $.jqx.jqxWidget("jqxLinkButton", "", {});

	    $.extend($.jqx._jqxLinkButton.prototype, {
	        defineInstance: function () {
	            // enables / disables the button
	            this.disabled = false;
	            // sets height to the button.
	            this.height = null;
	            // sets width to the button.
	            this.width = null;
	            this.rtl = false;
	            this.href = null;
	        },

	        createInstance: function (args) {
	            var self = this;
	            this.host.onselectstart = function () { return false; };
	            this.host.attr('role', 'button');

	            var height = this.height || this.host.height();
	            var width = this.width || this.host.width();
	            this.href = this.host.attr('href');
	            this.target = this.host.attr('target');
	            this.content = this.host.text();
	            this.element.innerHTML = "";
	            this.host.append("<input type='button' class='jqx-wrapper'/>");
	            var wrapElement = this.host.find('input');
	            wrapElement.addClass(this.toThemeProperty('jqx-reset'));
	            wrapElement.width(width);
	            wrapElement.height(height);
	            wrapElement.val(this.content);
	            this.host.find('tr').addClass(this.toThemeProperty('jqx-reset'));
	            this.host.find('td').addClass(this.toThemeProperty('jqx-reset'));
	            this.host.find('tbody').addClass(this.toThemeProperty('jqx-reset'));
	            this.host.css('color', 'inherit');
	            this.host.addClass(this.toThemeProperty('jqx-link'));

	            wrapElement.css({ width: width });
	            wrapElement.css({ height: height });
	            var param = args == undefined ? {} : args[0] || {};
	            wrapElement.jqxButton(param);

	            if (this.disabled) {
	                this.host[0].disabled = true;
	            }

	            this.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
	                instance.host[0].disabled = value;
	                instance.host.find('input').jqxButton({ disabled: value });
	            }

	            this.addHandler(wrapElement, 'click', function (event) {
	                if (!this.disabled) {
	                    self.onclick(event);
	                }
	                return false;
	            });
	        },

	        onclick: function (event) {
	            if (this.target != null) {
	                window.open(this.href, this.target);
	            }
	            else {
	                window.location = this.href;
	            }
	        }
	    });
	    //// End of LinkButton

	    //// RepeatButton
	    $.jqx.jqxWidget("jqxRepeatButton", "jqxButton", {});

	    $.extend($.jqx._jqxRepeatButton.prototype, {
	        defineInstance: function () {
	            this.delay = 50;
	        },

	        createInstance: function (args) {
	            var self = this;

	            var isTouchDevice = $.jqx.mobile.isTouchDevice();

	            var up = !isTouchDevice ? 'mouseup.' + this.base.element.id : 'touchend.' + this.base.element.id;
	            var down = !isTouchDevice ? 'mousedown.' + this.base.element.id : 'touchstart.' + this.base.element.id;

	            this.addHandler($(document), up, function (event) {
	                if (self.timeout != null) {
	                    clearTimeout(self.timeout);
	                    self.timeout = null;
	                    self.refresh();
	                }
	                if (self.timer != undefined) {
	                    clearInterval(self.timer);
	                    self.timer = null;
	                    self.refresh();
	                }
	            });

	            this.addHandler(this.base.host, down, function (event) {
	                if (self.timer != null) {
	                    clearInterval(self.timer);
	                }
	 
	                self.timeout = setTimeout(function () {
	                    clearInterval(self.timer);
	                    self.timer = setInterval(function (event) { self.ontimer(event); }, self.delay);
	                }, 150);
	            });

	            this.mousemovefunc = function (event) {
	                if (!isTouchDevice) {
	                    if (event.which == 0) {
	                        if (self.timer != null) {
	                            clearInterval(self.timer);
	                            self.timer = null;
	                        }
	                    }
	                }
	            }

	            this.addHandler(this.base.host, 'mousemove', this.mousemovefunc);
	        },

	        destroy: function()
	        {
	            var isTouchDevice = $.jqx.mobile.isTouchDevice();
	            var up = !isTouchDevice ? 'mouseup.' + this.base.element.id : 'touchend.' + this.base.element.id;
	            var down = !isTouchDevice ? 'mousedown.' + this.base.element.id : 'touchstart.' + this.base.element.id;
	            this.removeHandler(this.base.host, 'mousemove', this.mousemovefunc);
	            this.removeHandler(this.base.host, down);
	            this.removeHandler($(document), up);
	            this.timer = null;
	            delete this.mousemovefunc;
	            delete this.timer;
	            var vars = $.data(this.base.element, "jqxRepeatButton");
	            if (vars) {
	                delete vars.instance;
	            }
	            $(this.base.element).removeData();
	            this.base.destroy();
	            delete this.base;

	        },

	        stop: function () {
	            clearInterval(this.timer);
	            this.timer = null;
	        },

	        ontimer: function (event) {
	            var event = new jQuery.Event('click');
	            if (this.base != null && this.base.host != null) {
	                this.base.host.trigger(event);
	            }
	        }
	    });
	    //// End of RepeatButton
	    //// ToggleButton
	    $.jqx.jqxWidget("jqxToggleButton", "jqxButton", {});

	    $.extend($.jqx._jqxToggleButton.prototype, {
	        defineInstance: function () {
	            this.toggled = false;
	            this.aria =
	            {
	                "aria-checked": { name: "toggled", type: "boolean" },
	                "aria-disabled": { name: "disabled", type: "boolean" }
	            };
	        },

	        createInstance: function (args) {
	            var self = this;
	            this.base.overrideTheme = true;
	            this.isTouchDevice = $.jqx.mobile.isTouchDevice();
	            $.jqx.aria(this);

	            this.propertyChangeMap['toggled'] = function (instance, key, oldVal, value) {
	                instance.refresh();
	            };
	            this.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
	                self.base.disabled = value;
	                instance.refresh();
	            };

	            this.addHandler(this.base.host, 'click', function (event) {
	                if (!self.base.disabled) {
	                    self.toggle();
	                }
	            });

	            if (!this.isTouchDevice) {
	                this.addHandler(this.base.host, 'mouseenter', function (event) {
	                    if (!self.base.disabled) {
	                        self.refresh();
	                    }
	                });

	                this.addHandler(this.base.host, 'mouseleave', function (event) {
	                    if (!self.base.disabled) {
	                        self.refresh();
	                    }
	                });
	            }

	            this.addHandler(this.base.host, 'mousedown', function (event) {
	                if (!self.base.disabled) {
	                    self.refresh();
	                }
	            });

	            this.addHandler($(document), 'mouseup', function (event) {
	                if (!self.base.disabled) {
	                    self.refresh();
	                }
	            });
	        },

	        _removeHandlers: function () {
	            this.removeHandler(this.base.host, 'click');
	            this.removeHandler(this.base.host, 'mouseenter');
	            this.removeHandler(this.base.host, 'mouseleave');
	            this.removeHandler(this.base.host, 'mousedown');
	            this.removeHandler($(document), 'mouseup');
	        },

	        toggle: function () {
	            this.toggled = !this.toggled;
	            this.refresh();
	            $.jqx.aria(this, "aria-checked", this.toggled);
	        },

	        unCheck: function () {
	            this.toggled = false;
	            this.refresh();
	        },

	        check: function () {
	            this.toggled = true;
	            this.refresh();
	        },

	        refresh: function () {
	            var cssDisabled = this.base.toThemeProperty('jqx-fill-state-disabled');
	            var cssNormal = this.base.toThemeProperty('jqx-fill-state-normal');
	            var cssHover = this.base.toThemeProperty('jqx-fill-state-hover');
	            var cssPressed = this.base.toThemeProperty('jqx-fill-state-pressed');
	            var cssPressedHover = this.base.toThemeProperty('jqx-fill-state-pressed');
	            var cssCurrent = '';
	            this.base.host[0].disabled = this.base.disabled;

	            if (this.base.disabled) {
	                cssCurrent = cssDisabled;
	            }
	            else {
	                if (this.base.isMouseOver && !this.isTouchDevice) {
	                    if (this.base.isPressed || this.toggled)
	                        cssCurrent = cssPressedHover;
	                    else
	                        cssCurrent = cssHover;
	                }
	                else {
	                    if (this.base.isPressed || this.toggled)
	                        cssCurrent = cssPressed;
	                    else
	                        cssCurrent = cssNormal;
	                }
	            }

	            if (this.base.host.hasClass(cssDisabled) && cssDisabled != cssCurrent)
	                this.base.host.removeClass(cssDisabled);

	            if (this.base.host.hasClass(cssNormal) && cssNormal != cssCurrent)
	                this.base.host.removeClass(cssNormal);

	            if (this.base.host.hasClass(cssHover) && cssHover != cssCurrent)
	                this.base.host.removeClass(cssHover);

	            if (this.base.host.hasClass(cssPressed) && cssPressed != cssCurrent)
	                this.base.host.removeClass(cssPressed);

	            if (this.base.host.hasClass(cssPressedHover) && cssPressedHover != cssCurrent)
	                this.base.host.removeClass(cssPressedHover);

	            if (!this.base.host.hasClass(cssCurrent))
	                this.base.host.addClass(cssCurrent);
	        }
	    });
	    //// End of ToggleButton

	})(jQuery);
	
	/*
	jQWidgets v3.2.2 (2014-Mar-21)
	Copyright (c) 2011-2014 jQWidgets.
	License: http://jqwidgets.com/license/
	*/

	(function ($) {
	$.jqx.jqxWidget("jqxScrollBar", "", {});

	$.extend($.jqx._jqxScrollBar.prototype, {

	        defineInstance: function () {
	            // Type: Number
	            // Default: null
	            // Sets the scrollbar height.
	            this.height = null;
	            // Type: Number
	            // Default: null
	            // Sets the scrollbar width.
	            this.width = null;
	            // Type: Number
	            // Default: false. This means that the scrollbar is horizontally oriented by default.
	            // Sets the scrollbar orientation.
	            this.vertical = false;
	            // Type: Number
	            // Default: 0
	            // Sets the minimum scroll value.
	            this.min = 0;
	            // Type: Number
	            // Default: 0
	            // Sets the maximum scroll value.
	            this.max = 1000;
	            // Type: Number
	            // Default: 0
	            // Sets the scroll value. The value can be between min and max.
	            this.value = this.min;
	            // Type: Number
	            // Default: 0
	            // Sets the scroll step when any arrow button is clicked.
	            this.step = 10;
	            // Type: Number
	            // Default: 0
	            // Sets the scroll step when the user clicks on the empty scroll space between arrow button and thumb.
	            this.largestep = 50;
	            // Type: Number
	            // Default: 10
	            // sets the thumb's minimum size.
	            this.thumbMinSize = 10;
	            // Type: Number
	            // Default: 0
	            // sets the thumb's size.
	            this.thumbSize = 0;
	            // Type: Number or 'auto'
	            // Default: 'auto'
	            // sets the thumb's drag step.
	            this.thumbStep = 'auto';
	            // Type: String
	            // Default: 'all'
	            // sets the rounded corners string.
	            this.roundedCorners = 'all';
	            // Type: Boolean
	            // Default: true
	            // Sets whether the scroll buttons are visible.
	            this.showButtons = true;
	            // Type: Boolean
	            // Default: false
	            // Sets whether the scrollbar is disabled or not.
	            this.disabled = false;
	            // Sets whether the scrollbar is on touch device.
	            this.touchMode = 'auto';
	            this.touchModeStyle = 'auto';
	            this.thumbTouchSize = 0;
	            // disable jquery trigger function. It is very slow if you call it on mouse move. This could improve performance.
	            this._triggervaluechanged = true;
	            this.rtl = false;
	            this.areaDownCapture = false;
	            this.areaUpCapture = false;
	            this._initialLayout = false;
	        },

	        createInstance: function (args) {
	            this.render();
	        }, // createInstance

	        render: function () {
	            this._mouseup = new Date();
	            var self = this;
	            var html = "<div id='jqxScrollOuterWrap' style='width:100%; height: 100%; align:left; border: 0px; valign:top; position: relative;'>" +
	                "<div id='jqxScrollWrap' style='width:100%; height: 100%; left: 0px; top: 0px; align:left; valign:top; position: absolute;'>" +
	                "<div id='jqxScrollBtnUp' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>" +
	                "<div id='jqxScrollAreaUp' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>" +
	                "<div id='jqxScrollThumb' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>" +
	                "<div id='jqxScrollAreaDown' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>" +
	                "<div id='jqxScrollBtnDown' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>" +
	                "</div>" +
	                "</div>";

	            if ($.jqx.utilities && $.jqx.utilities.scrollBarButtonsVisibility == "hidden") {
	                this.showButtons = false;
	            }

	            if (self.WinJS) {
	                MSApp.execUnsafeLocalFunction(function () {
	                    self.host.html(html);
	                });
	            }
	            else {
	                this.element.innerHTML = html;
	            }

	            if (this.width != undefined && parseInt(this.width) > 0) {
	                this.host.width(parseInt(this.width));
	            }

	            if (this.height != undefined && parseInt(this.height) > 0) {
	                this.host.height(parseInt(this.height));
	            }
	            this.isPercentage = false;
	            if (this.width != null && this.width.toString().indexOf("%") != -1) {
	                this.host.width(this.width);
	                this.isPercentage = true;
	            }

	            if (this.height != null && this.height.toString().indexOf("%") != -1) {
	                this.host.height(this.height);
	                this.isPercentage = true;
	            }
	            if (this.isPercentage) {
	                var that = this;
	                $.jqx.utilities.resize(this.host, function () {
	                    that._arrange();
	                }, false);
	            }
	            this.thumbCapture = false;
	            this.scrollOuterWrap = $(this.element.firstChild);
	            this.scrollWrap = $(this.scrollOuterWrap[0].firstChild);
	            this.btnUp = $(this.scrollWrap[0].firstChild);
	            this.areaUp = $(this.btnUp[0].nextSibling);
	            this.btnThumb = $(this.areaUp[0].nextSibling);
	            this.arrowUp = $('<div></div>');
	            this.arrowUp.appendTo(this.btnUp);
	            this.areaDown = $(this.btnThumb[0].nextSibling);
	            this.btnDown = $(this.areaDown[0].nextSibling);
	            this.arrowDown = $('<div></div>');
	            this.arrowDown.appendTo(this.btnDown);

	            var elID = this.element.id;
	            this.btnUp[0].id = "jqxScrollBtnUp" + elID;
	            this.btnDown[0].id = "jqxScrollBtnDown" + elID;
	            this.btnThumb[0].id = "jqxScrollThumb" + elID;
	            this.areaUp[0].id = "jqxScrollAreaUp" + elID;
	            this.areaDown[0].id = "jqxScrollAreaDown" + elID;
	            this.scrollWrap[0].id = "jqxScrollWrap" + elID;
	            this.scrollOuterWrap[0].id = "jqxScrollOuterWrap" + elID;

	            if (!this.host.jqxRepeatButton) {
	                throw new Error('jqxScrollBar: Missing reference to jqxbuttons.js.');
	                return;
	            }

	            this.btnUp.jqxRepeatButton({_ariaDisabled: true, overrideTheme: true, disabled: this.disabled });
	            this.btnDown.jqxRepeatButton({ _ariaDisabled: true, overrideTheme: true, disabled: this.disabled });
	            this.btnDownInstance = $.data(this.btnDown[0], 'jqxRepeatButton').instance;
	            this.btnUpInstance = $.data(this.btnUp[0], 'jqxRepeatButton').instance;

	            this.areaUp.jqxRepeatButton({_scrollAreaButton: true, _ariaDisabled: true, overrideTheme: true });
	            this.areaDown.jqxRepeatButton({ _scrollAreaButton: true, _ariaDisabled: true, overrideTheme: true });
	            this.btnThumb.jqxButton({ _ariaDisabled: true, overrideTheme: true, disabled: this.disabled });
	            this.propertyChangeMap['value'] = function (instance, key, oldVal, value) {
	                if (!(isNaN(value))) {
	                    if (oldVal != value) {
	                        instance.setPosition(parseFloat(value), true);
	                    }
	                }
	            }

	            this.propertyChangeMap['width'] = function (instance, key, oldVal, value) {
	                if (instance.width != undefined && parseInt(instance.width) > 0) {
	                    instance.host.width(parseInt(instance.width));
	                    instance._arrange();
	                }
	            }

	            this.propertyChangeMap['height'] = function (instance, key, oldVal, value) {
	                if (instance.height != undefined && parseInt(instance.height) > 0) {
	                    instance.host.height(parseInt(instance.height));
	                    instance._arrange();
	                }
	            }

	            this.propertyChangeMap['theme'] = function (instance, key, oldVal, value) {
	                instance.setTheme();
	            }

	            this.propertyChangeMap['max'] = function (instance, key, oldVal, value) {
	                if (!(isNaN(value))) {
	                    if (oldVal != value) {
	                        instance.max = parseInt(value);
	                        if (instance.min > instance.max)
	                            instance.max = instance.min + 1;

	                        instance._arrange();
	                        instance.setPosition(instance.value);
	                    }
	                }
	            }

	            this.propertyChangeMap['min'] = function (instance, key, oldVal, value) {
	                if (!(isNaN(value))) {
	                    if (oldVal != value) {
	                        instance.min = parseInt(value);
	                        if (instance.min > instance.max)
	                            instance.max = instance.min + 1;

	                        instance._arrange();
	                        instance.setPosition(instance.value);
	                    }
	                }
	            }

	            this.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
	                if (oldVal != value) {
	                    if (value) {
	                        instance.host.addClass(instance.toThemeProperty('jqx-fill-state-disabled'));
	                    }
	                    else {
	                        instance.host.removeClass(instance.toThemeProperty('jqx-fill-state-disabled'));
	                    }
	                    instance.btnUp.jqxRepeatButton('disabled', instance.disabled);
	                    instance.btnDown.jqxRepeatButton('disabled', instance.disabled);
	                    instance.btnThumb.jqxButton('disabled', instance.disabled);
	                }
	            }

	            this.propertyChangeMap['touchMode'] = function (instance, key, oldVal, value) {
	                if (oldVal != value) {
	                    instance._updateTouchBehavior();
	                    if (value === true) {
	                        instance.showButtons = false;
	                        instance.refresh();
	                    }
	                    else if (value === false) {
	                        instance.showButtons = true;
	                        instance.refresh();
	                    }
	                }
	            }

	            this.buttonUpCapture = false;
	            this.buttonDownCapture = false;
	            this._updateTouchBehavior();
	            this.setPosition(this.value);
	            this._addHandlers();
	            this.setTheme();
	        },

	        resize: function (width, height) {
	            this.width = width;
	            this.height = height;
	            this._arrange();
	        },

	        _updateTouchBehavior: function () {
	            this.isTouchDevice = $.jqx.mobile.isTouchDevice();
	            if (this.touchMode == true) {
	                if ($.jqx.browser.msie && $.jqx.browser.version < 9) {
	                    this.setTheme();
	                    return;
	                }

	                this.isTouchDevice = true;
	                $.jqx.mobile.setMobileSimulator(this.btnThumb[0]);
	                this._removeHandlers();
	                this._addHandlers();
	                this.setTheme();
	            }
	            else if (this.touchMode == false) {
	                this.isTouchDevice = false;
	            }
	        },

	        _addHandlers: function () {
	            var self = this;

	            var touchSupport = false;
	            try
	            {
	                if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
	                    touchSupport = true;
	                    this._touchSupport = true;
	                }
	            }
	            catch(err)
	            {
	            }

	            if (self.isTouchDevice || touchSupport) {
	                this.addHandler(this.btnThumb, $.jqx.mobile.getTouchEventName('touchend'), function (event) {
	                    var btnThumbPressedClass = self.vertical ? self.toThemeProperty('jqx-scrollbar-thumb-state-pressed') : self.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal');
	                    var btnThumbPressedFillClass = self.toThemeProperty('jqx-fill-state-pressed');
	                    self.btnThumb.removeClass(btnThumbPressedClass);
	                    self.btnThumb.removeClass(btnThumbPressedFillClass);
	                    if (!self.disabled) self.handlemouseup(self, event);
	                    return false;
	                });

	                this.addHandler(this.btnThumb, $.jqx.mobile.getTouchEventName('touchstart'), function (event) {
	                    if (!self.disabled) {
	                        if (self.touchMode == true) {
	                            event.clientX = event.originalEvent.clientX;
	                            event.clientY = event.originalEvent.clientY;
	                        }
	                        else {
	                            var e = event;
	                            if (e.originalEvent.touches && e.originalEvent.touches.length) {
	                                event.clientX = e.originalEvent.touches[0].clientX;
	                                event.clientY = e.originalEvent.touches[0].clientY;
	                            }
	                            else {
	                                event.clientX = event.originalEvent.clientX;
	                                event.clientY = event.originalEvent.clientY;
	                            }
	                        }

	                        self.handlemousedown(event);
	                        if (event.preventDefault) {
	                            event.preventDefault();
	                        }
	                    }
	                });

	                $.jqx.mobile.touchScroll(this.element, self.max, function (left, top, dx, dy, event) {
	                    if (self.host.css('visibility') == 'visible') {
	                        if (self.touchMode == true) {
	                            event.clientX = event.originalEvent.clientX;
	                            event.clientY = event.originalEvent.clientY;
	                        }
	                        else {
	                            var e = event;
	                            if (e.originalEvent.touches && e.originalEvent.touches.length) {
	                                event.clientX = e.originalEvent.touches[0].clientX;
	                                event.clientY = e.originalEvent.touches[0].clientY;
	                            }
	                            else {
	                                event.clientX = event.originalEvent.clientX;
	                                event.clientY = event.originalEvent.clientY;
	                            }
	                        }
	                        var btnThumbPressedClass = self.vertical ? self.toThemeProperty('jqx-scrollbar-thumb-state-pressed') : self.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal');
	                        self.btnThumb.addClass(btnThumbPressedClass);
	                        self.btnThumb.addClass(self.toThemeProperty('jqx-fill-state-pressed'));
	                        self.thumbCapture = true;
	                        self.handlemousemove(event);
	                    }
	                }, self.element.id);
	            }

	            this.addHandler(this.btnUp, 'click', function (event) {
	                var step = self.step;
	                if (self.rtl && !self.vertical) {
	                    step = -self.step;
	                }

	                if (self.buttonUpCapture && !self.isTouchDevice) {
	                    if (!self.disabled) {
	                        self.setPosition(self.value - step);
	                    }
	                }
	                else if (!self.disabled && self.isTouchDevice) {
	                    self.setPosition(self.value - step);
	                }
	            });
	            this.addHandler(this.btnDown, 'click', function (event) {
	                var step = self.step;
	                if (self.rtl && !self.vertical) {
	                    step = -self.step;
	                }

	                if (self.buttonDownCapture && !self.isTouchDevice) {
	                    if (!self.disabled) self.setPosition(self.value + step)
	                }
	                else if (!self.disabled && self.isTouchDevice) self.setPosition(self.value + step);
	            });

	            if (!this.isTouchDevice) {
	                try
	                {
	                    if (document.referrer != "" || window.frameElement) {
	                        if (window.top != null && window.top != window.self) {
	                            var parentLocation = null;
	                            if (window.parent && document.referrer) {
	                                parentLocation = document.referrer;
	                            }

	                            if (parentLocation && parentLocation.indexOf(document.location.host) != -1) {
	                                var eventHandle = function (event) {
	                                    if (!self.disabled) self.handlemouseup(self, event);
	                                };

	                                if (window.top.document.addEventListener) {
	                                    window.top.document.addEventListener('mouseup', eventHandle, false);

	                                } else if (window.top.document.attachEvent) {
	                                    window.top.document.attachEvent("on" + 'mouseup', eventHandle);
	                                }
	                            }
	                        }
	                    }
	                }
	                catch (error) {
	                }

	                this.addHandler(this.btnDown, 'mouseup', function (event) {
	                    if (!self.btnDownInstance.base.disabled && self.buttonDownCapture) {
	                        self.buttonDownCapture = false;
	                        self.btnDown.removeClass(self.toThemeProperty('jqx-scrollbar-button-state-pressed'));
	                        self.btnDown.removeClass(self.toThemeProperty('jqx-fill-state-pressed'));
	                        self._removeArrowClasses('pressed', 'down');
	                        self.handlemouseup(self, event);
	                        var step = self.step;
	                        if (self.rtl && !self.vertical) {
	                            step = -self.step;
	                        }
	                        self.setPosition(self.value + step)
	                        return false;
	                    }
	                });
	                this.addHandler(this.btnUp, 'mouseup', function (event) {
	                    if (!self.btnUpInstance.base.disabled && self.buttonUpCapture) {
	                        self.buttonUpCapture = false;
	                        self.btnUp.removeClass(self.toThemeProperty('jqx-scrollbar-button-state-pressed'));
	                        self.btnUp.removeClass(self.toThemeProperty('jqx-fill-state-pressed'));
	                        self._removeArrowClasses('pressed', 'up');
	                        self.handlemouseup(self, event);
	                        var step = self.step;
	                        if (self.rtl && !self.vertical) {
	                            step = -self.step;
	                        }
	                        self.setPosition(self.value - step)
	                        return false;
	                    }
	                });

	                this.addHandler(this.btnDown, 'mousedown', function (event) {
	                    if (!self.btnDownInstance.base.disabled) {
	                        self.buttonDownCapture = true;
	                        self.btnDown.addClass(self.toThemeProperty('jqx-fill-state-pressed'));
	                        self.btnDown.addClass(self.toThemeProperty('jqx-scrollbar-button-state-pressed'));
	                        self._addArrowClasses('pressed', 'down');
	                        return false;
	                    }
	                });
	                this.addHandler(this.btnUp, 'mousedown', function (event) {
	                    if (!self.btnUpInstance.base.disabled) {
	                        self.buttonUpCapture = true;
	                        self.btnUp.addClass(self.toThemeProperty('jqx-fill-state-pressed'));
	                        self.btnUp.addClass(self.toThemeProperty('jqx-scrollbar-button-state-pressed'));
	                        self._addArrowClasses('pressed', 'up');
	                        return false;
	                    }
	                });
	            }

	            var eventName = 'click';
	            if (this.isTouchDevice) {
	                eventName = $.jqx.mobile.getTouchEventName('touchend');
	            }

	            this.addHandler(this.areaUp, eventName, function (event) {
	                if (!self.disabled) {
	                    var step = self.largestep;
	                    if (self.rtl && !self.vertical) {
	                        step = -self.largestep;
	                    }

	                    self.setPosition(self.value - step); return false;
	                }
	            });
	            this.addHandler(this.areaDown, eventName, function (event) {
	                if (!self.disabled) {
	                    var step = self.largestep;
	                    if (self.rtl && !self.vertical) {
	                        step = -self.largestep;
	                    }
	                    self.setPosition(self.value + step);
	                    return false;
	                }
	            });
	            this.addHandler(this.areaUp, 'mousedown', function (event) { if (!self.disabled) { self.areaUpCapture = true; return false; } });
	            this.addHandler(this.areaDown, 'mousedown', function (event) { if (!self.disabled) { self.areaDownCapture = true; return false; } });

	            this.addHandler(this.btnThumb, 'mousedown', function (event) {
	                if (!self.disabled) {
	                    self.handlemousedown(event);
	                }
	                return false;
	            });
	            this.addHandler(this.btnThumb, 'dragstart', function (event) {
	                return false;
	            });

	            this.addHandler($(document), 'mouseup.' + this.element.id, function (event) { if (!self.disabled) self.handlemouseup(self, event); });

	            if (!this.isTouchDevice) {
	                this.mousemoveFunc = function (event) {
	                    if (!self.disabled) {
	                        self.handlemousemove(event);
	                    }
	                }

	                this.addHandler($(document), 'mousemove.' + this.element.id, this.mousemoveFunc);
	                this.addHandler($(document), 'mouseleave.' + this.element.id, function (event) { if (!self.disabled) self.handlemouseleave(event); });
	                this.addHandler($(document), 'mouseenter.' + this.element.id, function (event) { if (!self.disabled) self.handlemouseenter(event); });

	                if (!self.disabled) {
	                    this.addHandler(this.btnUp, 'mouseenter', function () {
	                        if (!self.disabled && !self.btnUpInstance.base.disabled && self.touchMode != true) {
	                            self.btnUp.addClass(self.toThemeProperty('jqx-scrollbar-button-state-hover'));
	                            self.btnUp.addClass(self.toThemeProperty('jqx-fill-state-hover'));
	                            self._addArrowClasses('hover', 'up');
	                        }});
	                    this.addHandler(this.btnUp, 'mouseleave', function () {
	                        if (!self.disabled && !self.btnUpInstance.base.disabled && self.touchMode != true) {
	                            self.btnUp.removeClass(self.toThemeProperty('jqx-scrollbar-button-state-hover'));
	                            self.btnUp.removeClass(self.toThemeProperty('jqx-fill-state-hover'));
	                            self._removeArrowClasses('hover', 'up');                       
	                        }});

	                    var thumbHoverClass = self.toThemeProperty('jqx-scrollbar-thumb-state-hover');
	                    if (!self.vertical) {
	                        thumbHoverClass = self.toThemeProperty('jqx-scrollbar-thumb-state-hover-horizontal');
	                    }

	                    this.addHandler(this.btnThumb, 'mouseenter', function () {
	                        if (!self.disabled && self.touchMode != true) {
	                            self.btnThumb.addClass(thumbHoverClass);
	                            self.btnThumb.addClass(self.toThemeProperty('jqx-fill-state-hover'));
	                        }
	                    });

	                    this.addHandler(this.btnThumb, 'mouseleave', function () {
	                        if (!self.disabled && self.touchMode != true) {
	                            self.btnThumb.removeClass(thumbHoverClass);
	                            self.btnThumb.removeClass(self.toThemeProperty('jqx-fill-state-hover'));
	                        }
	                    });

	                    this.addHandler(this.btnDown, 'mouseenter', function () {
	                        if (!self.disabled && !self.btnDownInstance.base.disabled && self.touchMode != true) {
	                            self.btnDown.addClass(self.toThemeProperty('jqx-scrollbar-button-state-hover'));
	                            self.btnDown.addClass(self.toThemeProperty('jqx-fill-state-hover'));
	                            self._addArrowClasses('hover', 'down');
	                        }
	                    });

	                    this.addHandler(this.btnDown, 'mouseleave', function () {
	                        if (!self.disabled && !self.btnDownInstance.base.disabled && self.touchMode != true) {
	                            self.btnDown.removeClass(self.toThemeProperty('jqx-scrollbar-button-state-hover'));
	                            self.btnDown.removeClass(self.toThemeProperty('jqx-fill-state-hover'));
	                            self._removeArrowClasses('hover', 'down');
	                        }
	                    });
	                }
	            }
	        },

	        destroy: function () {
	            var btnUp = this.btnUp;
	            var btnDown = this.btnDown;
	            var btnThumb = this.btnThumb;
	            var elWrap = this.scrollWrap;
	            var areaUp = this.areaUp;
	            var areaDown = this.areaDown;

	            this.arrowUp.remove();
	            delete this.arrowUp;
	            this.arrowDown.remove();
	            delete this.arrowDown;

	            areaDown.removeClass();
	            areaUp.removeClass();
	            btnDown.removeClass();
	            btnUp.removeClass();
	            btnThumb.removeClass();

	            btnUp.jqxRepeatButton('destroy');
	            btnDown.jqxRepeatButton('destroy');
	            areaUp.jqxRepeatButton('destroy');
	            areaDown.jqxRepeatButton('destroy');
	            btnThumb.jqxButton('destroy');
	            var vars = $.data(this.element, "jqxScrollBar");

	            this._removeHandlers();
	            this.btnUp = null;
	            this.btnDown = null;
	            this.scrollWrap = null;
	            this.areaUp = null;
	            this.areaDown = null;
	            this.scrollOuterWrap = null;
	            delete this.mousemoveFunc;
	            delete this.btnDownInstance;
	            delete this.btnUpInstance;
	            delete this.scrollOuterWrap;
	            delete this.scrollWrap;          
	            delete this.btnDown;
	            delete this.areaDown;
	            delete this.areaUp;
	            delete this.btnDown;
	            delete this.btnUp;
	            delete this.btnThumb;
	            delete this.propertyChangeMap['value'];
	            delete this.propertyChangeMap['min'];
	            delete this.propertyChangeMap['max'];
	            delete this.propertyChangeMap['touchMode'];
	            delete this.propertyChangeMap['disabled'];
	            delete this.propertyChangeMap['theme'];
	            delete this.propertyChangeMap;
	            if (vars) {
	                delete vars.instance;
	            }
	            this.host.removeData();
	            this.host.remove();
	            delete this.host;
	            delete this.set;
	            delete this.get;
	            delete this.call;
	            delete this.element;
	        },

	        _removeHandlers: function () {
	            this.removeHandler(this.btnUp, 'mouseenter');
	            this.removeHandler(this.btnDown, 'mouseenter');
	            this.removeHandler(this.btnThumb, 'mouseenter');
	            this.removeHandler(this.btnUp, 'mouseleave');
	            this.removeHandler(this.btnDown, 'mouseleave');
	            this.removeHandler(this.btnThumb, 'mouseleave');
	            this.removeHandler(this.btnUp, 'click');
	            this.removeHandler(this.btnDown, 'click');
	            this.removeHandler(this.btnDown, 'mouseup');
	            this.removeHandler(this.btnUp, 'mouseup');
	            this.removeHandler(this.btnDown, 'mousedown');
	            this.removeHandler(this.btnUp, 'mousedown');
	            this.removeHandler(this.areaUp, 'mousedown');
	            this.removeHandler(this.areaDown, 'mousedown');
	            this.removeHandler(this.areaUp, 'click');
	            this.removeHandler(this.areaDown, 'click');
	            this.removeHandler(this.btnThumb, 'mousedown');
	            this.removeHandler(this.btnThumb, 'dragstart');
	            this.removeHandler($(document), 'mouseup.' + this.element.id);
	            if (!this.mousemoveFunc) {
	                this.removeHandler($(document), 'mousemove.' + this.element.id);
	            }
	            else {
	                this.removeHandler($(document), 'mousemove.' + this.element.id, this.mousemoveFunc);
	            }

	            this.removeHandler($(document), 'mouseleave.' + this.element.id);
	            this.removeHandler($(document), 'mouseenter.' + this.element.id);
	            var self = this;
	        },

	        _addArrowClasses: function (state, button) {
	            if (state == 'pressed') state = 'selected';
	            if (state != '') {
	                state = '-' + state;
	            }

	            if (this.vertical) {
	                if (button == 'up' || button == undefined) {
	                    this.arrowUp.addClass(this.toThemeProperty("jqx-icon-arrow-up" + state));
	                }

	                if (button == 'down' || button == undefined) {
	                    this.arrowDown.addClass(this.toThemeProperty("jqx-icon-arrow-down" + state));
	                }
	            }
	            else {
	                if (button == 'up' || button == undefined) {
	                    this.arrowUp.addClass(this.toThemeProperty("jqx-icon-arrow-left" + state));
	                }

	                if (button == 'down' || button == undefined) {
	                    this.arrowDown.addClass(this.toThemeProperty("jqx-icon-arrow-right" + state));
	                }
	            }
	        },

	        _removeArrowClasses: function (state, button) {
	            if (state == 'pressed') state = 'selected';
	            if (state != '') {
	                state = '-' + state;
	            }

	            if (this.vertical) {
	                if (button == 'up' || button == undefined) {
	                    this.arrowUp.removeClass(this.toThemeProperty("jqx-icon-arrow-up" + state));
	                }

	                if (button == 'down' || button == undefined) {
	                    this.arrowDown.removeClass(this.toThemeProperty("jqx-icon-arrow-down" + state));
	                }
	            }
	            else {
	                if (button == 'up' || button == undefined) {
	                    this.arrowUp.removeClass(this.toThemeProperty("jqx-icon-arrow-left" + state));
	                }

	                if (button == 'down' || button == undefined) {
	                    this.arrowDown.removeClass(this.toThemeProperty("jqx-icon-arrow-right" + state));
	                }
	            }
	        },

	        setTheme: function () {
	            var btnUp = this.btnUp;
	            var btnDown = this.btnDown;
	            var btnThumb = this.btnThumb;
	            var elWrap = this.scrollWrap;
	            var areaUp = this.areaUp;
	            var areaDown = this.areaDown;
	            var arrowUp = this.arrowUp;
	            var arrowDown = this.arrowDown;

	            this.scrollWrap[0].className = this.toThemeProperty('jqx-reset');
	            this.scrollOuterWrap[0].className = this.toThemeProperty('jqx-reset');

	            var areaClassName = this.toThemeProperty('jqx-reset');
	            this.areaDown[0].className = areaClassName;
	            this.areaUp[0].className = areaClassName;

	            var hostClass = this.toThemeProperty('jqx-scrollbar') + " " + this.toThemeProperty('jqx-widget') + " " + this.toThemeProperty('jqx-widget-content');
	            this.host.addClass(hostClass);
	            btnDown[0].className = this.toThemeProperty('jqx-scrollbar-button-state-normal');
	            btnUp[0].className = this.toThemeProperty('jqx-scrollbar-button-state-normal');

	            var thumbClass = "";
	            if (this.vertical) {
	                arrowUp[0].className = areaClassName + " " + this.toThemeProperty("jqx-icon-arrow-up");
	                arrowDown[0].className = areaClassName + " " + this.toThemeProperty("jqx-icon-arrow-down");
	                thumbClass = this.toThemeProperty('jqx-scrollbar-thumb-state-normal');
	            }
	            else {
	                arrowUp[0].className = areaClassName + " " + this.toThemeProperty("jqx-icon-arrow-left");
	                arrowDown[0].className = areaClassName + " " + this.toThemeProperty("jqx-icon-arrow-right");
	                thumbClass = this.toThemeProperty('jqx-scrollbar-thumb-state-normal-horizontal');
	            }
	            thumbClass += " " + this.toThemeProperty('jqx-fill-state-normal');

	            btnThumb[0].className = thumbClass;

	            if (this.disabled) {
	                elWrap.addClass(this.toThemeProperty('jqx-fill-state-disabled'));
	                elWrap.removeClass(this.toThemeProperty('jqx-scrollbar-state-normal'));
	            }
	            else {
	                elWrap.addClass(this.toThemeProperty('jqx-scrollbar-state-normal'));
	                elWrap.removeClass(this.toThemeProperty('jqx-fill-state-disabled'));
	            }

	            if (this.roundedCorners == 'all') {
	                this.host.addClass(this.toThemeProperty('jqx-rc-all'));
	                if (this.vertical) {
	                    var rct = $.jqx.cssroundedcorners('top');
	                    rct = this.toThemeProperty(rct);
	                    btnUp.addClass(rct);

	                    var rcb = $.jqx.cssroundedcorners('bottom');
	                    rcb = this.toThemeProperty(rcb);
	                    btnDown.addClass(rcb);

	                }
	                else {
	                    var rcl = $.jqx.cssroundedcorners('left');
	                    rcl = this.toThemeProperty(rcl);
	                    btnUp.addClass(rcl);

	                    var rcr = $.jqx.cssroundedcorners('right');
	                    rcr = this.toThemeProperty(rcr);
	                    btnDown.addClass(rcr);
	                }
	            }
	            else {
	                var rc = $.jqx.cssroundedcorners(this.roundedCorners);
	                rc = this.toThemeProperty(rc);
	                elBtnUp.addClass(rc);
	                elBtnDown.addClass(rc);
	            }

	            var rc = $.jqx.cssroundedcorners(this.roundedCorners);
	            rc = this.toThemeProperty(rc);
	            if (!btnThumb.hasClass(rc)) {
	                btnThumb.addClass(rc);
	            }

	            if (this.isTouchDevice && this.touchModeStyle != false) {
	                this.showButtons = false;
	                btnThumb.addClass(this.toThemeProperty('jqx-scrollbar-thumb-state-normal-touch'));
	            }
	        },

	        // returns true, if the user is dragging the thumb or the increase or decrease button is pressed.
	        isScrolling: function () {
	            if (this.thumbCapture == undefined || this.buttonDownCapture == undefined || this.buttonUpCapture == undefined || this.areaDownCapture == undefined || this.areaUpCapture == undefined)
	                return false;

	            return this.thumbCapture || this.buttonDownCapture || this.buttonUpCapture || this.areaDownCapture || this.areaUpCapture;
	        },

	        handlemousedown: function (event) {
	            if (this.thumbCapture == undefined || this.thumbCapture == false) {
	                this.thumbCapture = true;
	                var btnThumb = this.btnThumb;
	                if (btnThumb != null) {
	                    btnThumb.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
	                    if (this.vertical) {
	                        btnThumb.addClass(this.toThemeProperty('jqx-scrollbar-thumb-state-pressed'));
	                    }
	                    else {
	                        btnThumb.addClass(this.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal'));
	                    }
	                }
	            }

	            this.dragStartX = event.clientX;
	            this.dragStartY = event.clientY;
	            this.dragStartValue = this.value;
	        },

	        toggleHover: function (event, element) {
	            //element.toggleClass('jqx-fill-state-hover');
	        },

	        refresh: function () {
	            this._arrange();
	        },

	        _setElementPosition: function (element, x, y) {
	            if (!isNaN(x)) {
	                if (parseInt(element[0].style.left) != parseInt(x)) {
	                    element[0].style.left = x + 'px';
	                }
	            }
	            if (!isNaN(y)) {
	                if (parseInt(element[0].style.top) != parseInt(y)) {
	                    element[0].style.top = y + 'px';
	                }
	            }
	        },

	        _setElementTopPosition: function (element, y) {
	            if (!isNaN(y)) {
	                element[0].style.top = y + 'px';
	            }
	        },

	        _setElementLeftPosition: function (element, x) {
	            if (!isNaN(x)) {
	                element[0].style.left = x + 'px';
	            }
	        },

	        handlemouseleave: function (event) {
	            var btnUp = this.btnUp;
	            var btnDown = this.btnDown;
	                   
	            if (this.buttonDownCapture || this.buttonUpCapture) {
	                btnUp.removeClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
	                btnDown.removeClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
	                this._removeArrowClasses('pressed');
	            }
	         
	            if (this.thumbCapture != true)
	                return;

	            var btnThumb = this.btnThumb;
	            var btnThumbPressedClass = this.vertical ? this.toThemeProperty('jqx-scrollbar-thumb-state-pressed') : this.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal');
	            btnThumb.removeClass(btnThumbPressedClass);
	            btnThumb.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
	        },

	        handlemouseenter: function (event) {
	            var btnUp = this.btnUp;
	            var btnDown = this.btnDown;

	            if (this.buttonUpCapture) {
	                btnUp.addClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
	                btnUp.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
	                this._addArrowClasses('pressed', 'up');
	            }

	            if (this.buttonDownCapture) {
	                btnDown.addClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
	                btnDown.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
	                this._addArrowClasses('pressed', 'down');
	            }

	            if (this.thumbCapture != true)
	                return;

	            var btnThumb = this.btnThumb;
	            if (this.vertical) {
	                btnThumb.addClass(this.toThemeProperty('jqx-scrollbar-thumb-state-pressed'));
	            }
	            else {
	                btnThumb.addClass(this.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal'));
	            }
	            btnThumb.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
	        },

	        handlemousemove: function (event) {
	            var btnUp = this.btnUp;
	            var btnDown = this.btnDown;
	            var which = 0;

	            if (btnDown == null || btnUp == null)
	                return;

	            if (btnUp != null && btnDown != null && this.buttonDownCapture != undefined && this.buttonUpCapture != undefined) {
	                if (this.buttonDownCapture && event.which == which) {
	                    btnDown.removeClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
	                    btnDown.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
	                    this._removeArrowClasses('pressed', 'down');

	                    this.buttonDownCapture = false;
	                }
	                else if (this.buttonUpCapture && event.which == which) {
	                    btnUp.removeClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
	                    btnUp.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
	                    this._removeArrowClasses('pressed', 'up');
	                    this.buttonUpCapture = false;
	                }
	            }

	            if (this.thumbCapture != true)
	                return false;

	            var btnThumb = this.btnThumb;

	            if (event.which == which && !this.isTouchDevice && !this._touchSupport) {
	                this.thumbCapture = false;
	                this._arrange();
	                var btnThumbPressedClass = this.vertical ? this.toThemeProperty('jqx-scrollbar-thumb-state-pressed') : this.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal');
	                btnThumb.removeClass(btnThumbPressedClass);
	                btnThumb.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
	                return true;
	            }

	            if (event.preventDefault != undefined) {
	                event.preventDefault();
	            }

	            if (event.originalEvent != null) {
	                event.originalEvent.mouseHandled = true;
	            }

	            if (event.stopPropagation != undefined) {
	                event.stopPropagation();
	            }

	            var diff = 0;

	            try {
	                if (!this.vertical)
	                    diff = event.clientX - this.dragStartX;
	                else
	                    diff = event.clientY - this.dragStartY;
	                var btnAndThumbSize = this._btnAndThumbSize;
	                if (!this._btnAndThumbSize) {
	                    btnAndThumbSize = (this.vertical) ?
	                    btnUp.height() + btnDown.height() + btnThumb.height() :
	                    btnUp.width() + btnDown.width() + btnThumb.width();
	                }

	                var ratio = (this.max - this.min) / (this.scrollBarSize - btnAndThumbSize);
	                if (this.thumbStep == 'auto') {
	                    diff *= ratio;
	                }
	                else {
	                    diff *= ratio;
	                    if (Math.abs(this.dragStartValue + diff - this.value) >= parseInt(this.thumbStep)) {
	                        var step = Math.round(parseInt(diff) / this.thumbStep) * this.thumbStep;
	                        if (this.rtl && !this.vertical) {
	                            this.setPosition(this.dragStartValue - step);
	                        }
	                        else {
	                            this.setPosition(this.dragStartValue + step);
	                        }
	                        return false;
	                    }
	                    else {
	                        return false;
	                    }
	                }

	                var step = diff;
	                if (this.rtl && !this.vertical) {
	                    step = -diff;
	                }

	                this.setPosition(this.dragStartValue + step);
	            }
	            catch (error) {
	                alert(error);
	            }

	            return false;
	        },

	        handlemouseup: function (self, event) {
	            var prevent = false;
	        
	            if (this.thumbCapture) {
	                this.thumbCapture = false;

	                var btnThumb = this.btnThumb;
	                var btnThumbPressedClass = this.vertical ? this.toThemeProperty('jqx-scrollbar-thumb-state-pressed') : this.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal');
	                btnThumb.removeClass(btnThumbPressedClass);
	                btnThumb.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
	                prevent = true;
	                this._mouseup = new Date();
	            }

	            this.areaDownCapture = this.areaUpCapture = false;
	            if (this.buttonUpCapture || this.buttonDownCapture) {
	                var btnUp = this.btnUp;
	                var btnDown = this.btnDown;

	                this.buttonUpCapture = false;
	                this.buttonDownCapture = false;
	                btnUp.removeClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
	                btnDown.removeClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
	                btnUp.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
	                btnDown.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
	                this._removeArrowClasses('pressed');

	                prevent = true;
	                this._mouseup = new Date();
	            }

	            if (prevent) {
	                if (event.preventDefault != undefined) {
	                    event.preventDefault();
	                }

	                if (event.originalEvent != null) {
	                    event.originalEvent.mouseHandled = true;
	                }

	                if (event.stopPropagation != undefined) {
	                    event.stopPropagation();
	                }
	            }
	        },

	        // sets the value.
	        // @param Number. Sets the ScrollBar's value.
	        setPosition: function (position, update) {
	            var element = this.element;

	            if (position == undefined || position == NaN)
	                position = this.min;

	            if (position >= this.max) {
	                position = this.max;
	            }

	            if (position < this.min) {
	                position = this.min;
	            }

	            if (this.value !== position || update == true) {
	                if (position == this.max) {
	                    var completeEvent = new jQuery.Event('complete');
	                    this.host.trigger(completeEvent);
	                }
	                var oldvalue = this.value;
	                if (this._triggervaluechanged) {
	                    var event = new jQuery.Event('valuechanged');
	                    event.previousValue = this.value;
	                    event.currentValue = position;
	                }

	                this.value = position;
	                this._positionelements();
	                //this._arrange();

	                if (this._triggervaluechanged) {
	                    this.host.trigger(event);
	                }

	                if (this.valuechanged) {
	                    this.valuechanged({ currentValue: this.value, previousvalue: oldvalue });
	                }
	            }

	            return position;
	        },

	        _getThumbSize: function (scrollLen) {
	            var diff = this.max - this.min;

	            var size = 0;
	            if (diff > 1) {
	                size = (scrollLen / (diff + scrollLen) * scrollLen);
	            }
	            else if (diff == 1) {
	                size = scrollLen;
	            }

	            if (this.thumbSize > 0) {
	                size = this.thumbSize;
	            }

	            if (size < this.thumbMinSize)
	                size = this.thumbMinSize;

	            return Math.min(size, scrollLen);
	        },

	        _positionelements: function () {
	            var element = this.element;
	            var elAreaUp = this.areaUp;
	            var elAreaDown = this.areaDown;
	            var elBtnUp = this.btnUp;
	            var elBtnDown = this.btnDown;
	            var elThumb = this.btnThumb;
	            var elWrap = this.scrollWrap;

	            var height = this._height ? this._height : this.host.height();
	            var width = this._width ? this._width : this.host.width();

	            var btnSize = (!this.vertical) ? height : width;
	            if (!this.showButtons) {
	                btnSize = 0;
	            }

	            var scrollBarSize = (!this.vertical) ? width : height;
	            this.scrollBarSize = scrollBarSize;
	            var thumbSize = this._getThumbSize(scrollBarSize - 2 * btnSize);
	            thumbSize = Math.round(thumbSize);

	            if (thumbSize < this.thumbMinSize)
	                thumbSize = this.thumbMinSize;

	            if (height == NaN || height < 10)
	                height = 10;

	            if (width == NaN || width < 10)
	                width = 10;

	            btnSize += 2;
	            this.btnSize = btnSize;

	            var btnAndThumbSize = this._btnAndThumbSize;

	            if (!this._btnAndThumbSize) {
	                var btnAndThumbSize = (this.vertical) ?
	                2 * this.btnSize + elThumb.outerHeight() :
	                2 * this.btnSize + elThumb.outerWidth();

	                btnAndThumbSize = Math.round(btnAndThumbSize);
	            }

	            var upAreaSize = (scrollBarSize - btnAndThumbSize) / (this.max - this.min) * (this.value - this.min);
	            if (this.rtl && !this.vertical) {
	                upAreaSize = (scrollBarSize - btnAndThumbSize) / (this.max - this.min) * (this.max - this.value - this.min);
	            }

	            upAreaSize = Math.round(upAreaSize);
	            if (upAreaSize < 0) {
	                upAreaSize = 0;
	            }
	            if (this.vertical) {
	                var newDownSize = scrollBarSize - upAreaSize - btnAndThumbSize;
	                if (newDownSize < 0) newDownSize = 0;
	                elAreaDown[0].style.height = newDownSize + 'px';
	                elAreaUp[0].style.height = upAreaSize + 'px';

	                this._setElementTopPosition(elAreaUp, btnSize);
	                this._setElementTopPosition(elThumb, btnSize + upAreaSize);
	                this._setElementTopPosition(elAreaDown, btnSize + upAreaSize + thumbSize);
	            }
	            else {
	                elAreaUp[0].style.width = upAreaSize + 'px';
	                if (scrollBarSize - upAreaSize - btnAndThumbSize >= 0) {
	                    elAreaDown[0].style.width = scrollBarSize - upAreaSize - btnAndThumbSize + 'px';
	                }
	                else {
	                    elAreaDown[0].style.width = '0px';
	                }

	                this._setElementLeftPosition(elAreaUp, btnSize);
	                this._setElementLeftPosition(elThumb, btnSize + upAreaSize);
	                this._setElementLeftPosition(elAreaDown, 2 + btnSize + upAreaSize + thumbSize);
	            }
	        },

	        _arrange: function () {
	            if (this._initialLayout) {
	                this._initialLayout = false;
	                return;
	            }

	            var element = this.element;
	            var elAreaUp = this.areaUp;
	            var elAreaDown = this.areaDown;
	            var elBtnUp = this.btnUp;
	            var elBtnDown = this.btnDown;
	            var elThumb = this.btnThumb;
	            var elWrap = this.scrollWrap;

	            var height = parseInt(this.element.style.height);
	            var width = parseInt(this.element.style.width);
	            if (this.isPercentage) {
	                var height = this.host.height();
	                var width = this.host.width();
	            }
	           
	            if (isNaN(height)) height = 0;
	            if (isNaN(width)) width = 0;

	            this._width = width;
	            this._height = height;
	            var btnSize = (!this.vertical) ? height : width;
	            if (!this.showButtons) {
	                btnSize = 0;
	            }

	            elBtnUp[0].style.width = btnSize + 'px';
	            elBtnUp[0].style.height = btnSize + 'px';
	            elBtnDown[0].style.width = btnSize + 'px';
	            elBtnDown[0].style.height = btnSize + 'px';

	            if (this.vertical) {
	                elWrap[0].style.width = width + 2 + 'px';
	            }
	            else {
	                elWrap[0].style.height = height + 2 + 'px';
	            }

	            // position the up button
	            this._setElementPosition(elBtnUp, 0, 0);

	            var btnSizeAndBorder = btnSize + 2;
	            // position the down button
	            if (this.vertical) {
	                this._setElementPosition(elBtnDown, 0, height - btnSizeAndBorder);
	            }
	            else {
	                this._setElementPosition(elBtnDown, width - btnSizeAndBorder, 0);
	            }

	            var scrollBarSize = (!this.vertical) ? width : height;
	            this.scrollBarSize = scrollBarSize;
	            var thumbSize = this._getThumbSize(scrollBarSize - 2 * btnSize);
	            thumbSize = Math.round(thumbSize);

	            if (thumbSize < this.thumbMinSize)
	                thumbSize = this.thumbMinSize;

	            var touchStyle = false;
	            if (this.isTouchDevice && this.touchModeStyle != false) {
	                touchStyle = true;
	            }

	            if (!this.vertical) {
	                elThumb[0].style.width = thumbSize + 'px';
	                elThumb[0].style.height = height + 'px';
	                if (touchStyle && this.thumbTouchSize !== 0) {
	                    elThumb.css({ height: this.thumbTouchSize + 'px' });
	                    elThumb.css('margin-top', (this.host.height() - this.thumbTouchSize) / 2);
	                }
	            }
	            else {
	                elThumb[0].style.width = width + 'px';
	                elThumb[0].style.height = thumbSize + 'px';

	                if (touchStyle && this.thumbTouchSize !== 0) {
	                    elThumb.css({ width: this.thumbTouchSize + 'px' });
	                    elThumb.css('margin-left', (this.host.width() - this.thumbTouchSize) / 2);
	                }
	            }

	            if (height == NaN || height < 10)
	                height = 10;

	            if (width == NaN || width < 10)
	                width = 10;

	            btnSize += 2;
	            this.btnSize = btnSize;

	            var btnAndThumbSize = (this.vertical) ?
	                2 * this.btnSize + (2 + parseInt(elThumb[0].style.height)) :
	                2 * this.btnSize + (2 + parseInt(elThumb[0].style.width));

	            btnAndThumbSize = Math.round(btnAndThumbSize);
	            this._btnAndThumbSize = btnAndThumbSize;

	            var upAreaSize = (scrollBarSize - btnAndThumbSize) / (this.max - this.min) * (this.value - this.min);
	            if (this.rtl && !this.vertical) {
	                upAreaSize = (scrollBarSize - btnAndThumbSize) / (this.max - this.min) * (this.max - this.value - this.min);
	            }
	            upAreaSize = Math.round(upAreaSize);
	            if (upAreaSize === -Infinity || upAreaSize == Infinity) upAreaSize = 0;
	            if (isNaN(upAreaSize)) {
	                upAreaSize = 0;
	            }
	            if (upAreaSize < 0) {
	                upAreaSize = 0;
	            }

	            if (this.vertical) {
	                var newAreaHeight = (scrollBarSize - upAreaSize - btnAndThumbSize);
	                if (newAreaHeight < 0) newAreaHeight = 0;
	                elAreaDown[0].style.height = newAreaHeight + 'px';
	                elAreaDown[0].style.width = width + 'px';
	                elAreaUp[0].style.height = upAreaSize + 'px';
	                elAreaUp[0].style.width = width + 'px';

	                var hostHeight = parseInt(this.element.style.height);
	                if (this.isPercentage) {
	                    hostHeight = this.host.height();
	                }

	                elThumb[0].style.visibility = 'inherit';

	                if (hostHeight - 3 * parseInt(btnSize) < 0) {
	                    elThumb[0].style.visibility = 'hidden';
	                }
	                else if (hostHeight < btnAndThumbSize) {
	                    elThumb[0].style.visibility = 'hidden';
	                }
	                else if (this.element.style.visibility == 'visible') {
	                    elThumb[0].style.visibility = 'inherit';
	                }

	                this._setElementPosition(elAreaUp, 0, btnSize);
	                this._setElementPosition(elThumb, 0, btnSize + upAreaSize);
	                this._setElementPosition(elAreaDown, 0, btnSize + upAreaSize + thumbSize);
	            }
	            else {
	                if (upAreaSize > 0) {
	                    elAreaUp[0].style.width = upAreaSize + 'px';
	                }
	                if (height > 0) {
	                    elAreaUp[0].style.height = height + 'px';
	                }
	                var newAreaWidth = (scrollBarSize - upAreaSize - btnAndThumbSize);
	                if (newAreaWidth < 0) newAreaWidth = 0;

	                elAreaDown[0].style.width = newAreaWidth + 'px';
	                elAreaDown[0].style.height = height + 'px';

	                var hostWidth = parseInt(this.element.style.width);
	                if (this.isPercentage) {
	                    hostWidth = this.host.width();
	                }

	                elThumb[0].style.visibility = 'inherit';
	                if (hostWidth - 3 * parseInt(btnSize) < 0) {
	                    elThumb[0].style.visibility = 'hidden';
	                }
	                else if (hostWidth < btnAndThumbSize) {
	                    elThumb[0].style.visibility = 'hidden';
	                }
	                else if (this.element.style.visibility == 'visible') {
	                    elThumb[0].style.visibility = 'inherit';
	                }

	                this._setElementPosition(elAreaUp, btnSize, 0);
	                this._setElementPosition(elThumb, btnSize + upAreaSize, 0);
	                this._setElementPosition(elAreaDown, 2 + btnSize + upAreaSize + thumbSize, 0);
	            }
	        }
	    }); // jqxScrollBar
	})(jQuery);

	/*
	jQWidgets v3.2.2 (2014-Mar-21)
	Copyright (c) 2011-2014 jQWidgets.
	License: http://jqwidgets.com/license/
	*/

	(function ($) {

	    $.jqx.jqxWidget("jqxPanel", "", {});

	    $.extend($.jqx._jqxPanel.prototype, {

	        defineInstance: function () {
	            //Type: String.
	            //Default: null.
	            //Sets the panel width.
	            this.width = null;
	            //Type: String.
	            //Default: null.
	            //Sets the panel height.
	            this.height = null;
	            // gets or sets whether the panel is disabled.
	            this.disabled = false;
	            // Type: Number
	            // Default: 15
	            // gets or sets the scrollbars size.
	            this.scrollBarSize = $.jqx.utilities.scrollBarSize;
	            // Type: String
	            // Default: 'fixed'
	            // Sets the sizing mode. In the 'fixed' mode, the panel displays scrollbars, if its content requires it. 
	            // In the wrap mode, the scrollbars are not displayed and the panel automatically changes its size.
	            // Possible Values: 'fixed', 'wrap'
	            this.sizeMode = 'fixed';
	            // Type: Boolean
	            // Default: false
	            // Automatically updates the panel, if its children size is changed.
	            this.autoUpdate = false;
	            // Type: Number
	            // Default: 500
	            // Gets or sets the autoUpdate interval.
	            this.autoUpdateInterval = 500;
	            this.touchMode = 'auto';
	            this.horizontalScrollBarMax = null;
	            this.verticalScrollBarMax = null;
	            this.touchModeStyle = 'auto';
	            this.rtl = false;
	            // jqxPanel events.
	            this.events =
				[
	            // occurs when the layout is performed.
			  	   'layout',
	     		];
	        },

	        // creates a new jqxPanel instance.
	        createInstance: function (args) {
	            this.render();
	        },

	        render: function () {
	            var self = this;
	            if ($.jqx.utilities.scrollBarSize != 15) {
	                this.scrollBarSize = $.jqx.utilities.scrollBarSize;
	            }
	            this.host.addClass(this.toThemeProperty("jqx-panel"));
	            this.host.addClass(this.toThemeProperty("jqx-widget"));
	            this.host.addClass(this.toThemeProperty("jqx-widget-content"));
	            this.host.addClass(this.toThemeProperty("jqx-rc-all"));

	            var panelStructure = $("<div id='panelWrapper' style='overflow: hidden; width: 100%; height: 100%; background-color: transparent; -webkit-appearance: none; outline: none; align:left; border: 0px; padding: 0px; margin: 0px; left: 0px; top: 0px; valign:top; position: relative;'>" +
	                "<div id='panelContent' style='-webkit-appearance: none; -moz-box-sizing: border-box; box-sizing: border-box; width: 100%; height: 100%; outline: none; border: none; padding: 0px; position: absolute; margin: 0px; align:left; valign:top; left: 0px; top: 0px;'/>" +
	                "<div id='verticalScrollBar' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
	                "<div id='horizontalScrollBar' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
	                "<div id='bottomRight' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
	                "</div>");

	            if (!this.host.jqxButton) {
	                throw new Error("jqxPanel: Missing reference to jqxbuttons.js.");
	            }
	            if (!this.host.jqxScrollBar) {
	                throw new Error("jqxPanel: Missing reference to jqxscrollbar.js.");
	            }

	            var children = this.host.children();
	            this._rtl = false;
	            if (children.length > 0 && children.css('direction') == 'rtl') {
	                this.rtl = true;
	                this._rtl = true;
	            }

	            this.host.wrapInner(panelStructure);
	            var verticalScrollBar = this.host.find("#verticalScrollBar");
	            verticalScrollBar[0].id = this.element.id + 'verticalScrollBar';

	            this.vScrollBar = verticalScrollBar.jqxScrollBar({ 'vertical': true, rtl: this.rtl, touchMode: this.touchMode, theme: this.theme });
	            var horizontalScrollBar = this.host.find("#horizontalScrollBar");
	            horizontalScrollBar[0].id = this.element.id + 'horizontalScrollBar';
	            this.hScrollBar = horizontalScrollBar.jqxScrollBar({ 'vertical': false, rtl: this.rtl, touchMode: this.touchMode, theme: this.theme });
	            this.content = this.host.find("#panelContent");
	            this.wrapper = this.host.find("#panelWrapper");
	            this.content.addClass(this.toThemeProperty('jqx-widget-content'));
	            this.wrapper[0].id = this.wrapper[0].id + this.element.id;
	            this.content[0].id = this.content[0].id + this.element.id;
	            this.bottomRight = this.host.find("#bottomRight").addClass(this.toThemeProperty('jqx-panel-bottomright')).addClass(this.toThemeProperty('jqx-scrollbar-state-normal'));
	            this.bottomRight[0].id = 'bottomRight' + this.element.id;

	            this.vScrollBar.css('visibility', 'inherit');
	            this.hScrollBar.css('visibility', 'inherit');
	            this.vScrollInstance = $.data(this.vScrollBar[0], 'jqxScrollBar').instance;
	            this.hScrollInstance = $.data(this.hScrollBar[0], 'jqxScrollBar').instance;

	            var me = this;
	            this.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
	                me.vScrollBar.jqxScrollBar({ disabled: me.disabled });
	                me.hScrollBar.jqxScrollBar({ disabled: me.disabled });
	            };

	            this.vScrollBar.jqxScrollBar({ disabled: this.disabled });
	            this.hScrollBar.jqxScrollBar({ disabled: this.disabled });

	            this._addHandlers();

	            if (this.width == null) this.width = this.content.width();
	            if (this.height == null) this.height = this.content.height();

	            this._arrange();

	            this.contentWidth = me.content[0].scrollWidth;
	            this.contentHeight = me.content[0].scrollHeight;

	            if (this.autoUpdate) {
	                me._autoUpdate();
	            }

	            this.propertyChangeMap['autoUpdate'] = function (instance, key, oldVal, value) {
	                if (me.autoUpdate) {
	                    me._autoUpdate();
	                }
	                else {
	                    clearInterval(me.autoUpdateId);
	                    me.autoUpdateId = null;
	                }
	            }

	            // unload
	            this.addHandler($(window), 'unload', function () {
	                if (me.autoUpdateId != null) {
	                    clearInterval(me.autoUpdateId);
	                    me.autoUpdateId = null;
	                    me.destroy();
	                }
	            });

	            this._updateTouchScrolling();
	            this._render();
	        },

	        hiddenParent: function () {
	            return $.jqx.isHidden(this.host);
	        },

	        _updateTouchScrolling: function () {
	            var self = this;
	            if (this.touchMode == true) {
	                $.jqx.mobile.setMobileSimulator(this.element);
	            }

	            var isTouchDevice = this.isTouchDevice();
	            if (isTouchDevice) {
	                $.jqx.mobile.touchScroll(this.element, self.vScrollInstance.max, function (left, top) {
	                    if (self.vScrollBar.css('visibility') != 'hidden') {
	                        var oldValue = self.vScrollInstance.value;
	                        self.vScrollInstance.setPosition(oldValue + top);
	                    }
	                    if (self.hScrollBar.css('visibility') != 'hidden') {
	                        var oldValue = self.hScrollInstance.value;
	                        self.hScrollInstance.setPosition(oldValue + left);
	                    }
	                }, this.element.id, this.hScrollBar, this.vScrollBar);
	                this._arrange();
	            }

	            this.vScrollBar.jqxScrollBar({ touchMode: this.touchMode });
	            this.hScrollBar.jqxScrollBar({ touchMode: this.touchMode });
	        },

	        isTouchDevice: function () {
	            var isTouchDevice = $.jqx.mobile.isTouchDevice();
	            if (this.touchMode == true) {
	                isTouchDevice = true;
	            }
	            else if (this.touchMode == false) {
	                isTouchDevice = false;
	            }
	            if (isTouchDevice && this.touchModeStyle != false) {
	                this.scrollBarSize = $.jqx.utilities.touchScrollBarSize;
	            }
	            return isTouchDevice;
	        },

	        // append element.
	        // @param element
	        append: function (element) {
	            if (element != null) {
	                this.content.append(element);
	                this._arrange();
	            }
	        },

	        setcontent: function (html) {
	            this.content[0].innerHTML = html;
	            this._arrange();
	            var that = this;
	            setTimeout(function () {
	                that._arrange();
	            }, 100);
	        },

	        // prepend element.
	        // @param element
	        prepend: function (element) {
	            if (element != null) {
	                this.content.prepend(element);
	                this._arrange();
	            }
	        },

	        // clears the content.
	        clearcontent: function () {
	            this.content.text('');
	            this.content.children().remove();
	            this._arrange();
	        },

	        // remove element.
	        // @param element
	        remove: function (element) {
	            if (element != null) {
	                $(element).remove();
	                this._arrange();
	            }
	        },

	        _autoUpdate: function () {
	            var me = this;
	            this.autoUpdateId = setInterval(function () {
	                var newWidth = me.content[0].scrollWidth;
	                var newHeight = me.content[0].scrollHeight;
	                var doarrange = false;
	                if (me.contentWidth != newWidth) {
	                    me.contentWidth = newWidth;
	                    doarrange = true;
	                }

	                if (me.contentHeight != newHeight) {
	                    me.contentHeight = newHeight;
	                    doarrange = true;
	                }

	            //    if ($.jqx.browser.mozilla) doarrange = true;
	                if (doarrange) {
	                    me._arrange();
	                }
	            }, this.autoUpdateInterval);
	        },

	        _addHandlers: function () {
	            var self = this;
	            this.addHandler(this.vScrollBar, 'valuechanged', function (event) {
	                self._render(self);
	            });

	            this.addHandler(this.hScrollBar, 'valuechanged', function (event) {
	                self._render(self);
	            });

	            this.addHandler(this.host, 'mousewheel', function (event) {
	                self.wheel(event, self);
	            });

	            this.addHandler(this.wrapper, 'scroll', function (event) {
	                if (self.wrapper[0].scrollTop != 0) {
	                    self.wrapper[0].scrollTop = 0;
	                }

	                if (self.wrapper[0].scrollLeft != 0) {
	                    self.wrapper[0].scrollLeft = 0;
	                }
	            });
	       
	            this.addHandler(this.host, 'mouseleave', function (event) {
	                self.focused = false;
	            });

	            this.addHandler(this.host, 'focus', function (event) {
	                self.focused = true;
	            });

	            this.addHandler(this.host, 'blur', function (event) {
	                self.focused = false;
	            });

	            this.addHandler(this.host, 'mouseenter', function (event) {
	                self.focused = true;
	            });
	            $.jqx.utilities.resize(this.host, function () {
	                if ($.jqx.isHidden(self.host))
	                    return;

	                self._arrange(false);
	            });
	        },

	        resize: function (width, height) {
	            this.width = width;
	            this.height = height;
	            this._arrange(false);
	        },

	        _removeHandlers: function () {
	            var self = this;
	            this.removeHandler(this.vScrollBar, 'valuechanged');
	            this.removeHandler(this.hScrollBar, 'valuechanged');
	            this.removeHandler(this.host, 'mousewheel');
	            this.removeHandler(this.host, 'mouseleave');
	            this.removeHandler(this.host, 'focus');
	            this.removeHandler(this.host, 'blur');
	            this.removeHandler(this.host, 'mouseenter');
	            this.removeHandler(this.wrapper, 'scroll');
	            this.removeHandler($(window), 'resize.' + this.element.id);
	        },

	        // performs mouse wheel.
	        wheel: function (event, self) {
	            var delta = 0;
	            // fix for IE8 and IE7
	            if (event.originalEvent && $.jqx.browser.msie && event.originalEvent.wheelDelta) {
	                delta = event.originalEvent.wheelDelta / 120;
	            }

	            if (!event) /* For IE. */
	                event = window.event;
	            if (event.wheelDelta) { /* IE/Opera. */
	                delta = event.wheelDelta / 120;
	            } else if (event.detail) { /** Mozilla case. */
	                delta = -event.detail / 3;
	            }

	            if (delta) {
	                var result = self._handleDelta(delta);

	                if (!result) {
	                    if (event.preventDefault)
	                        event.preventDefault();
	                }

	                if (!result) {
	                    return result;
	                }
	                else return false;
	            }

	            if (event.preventDefault)
	                event.preventDefault();
	            event.returnValue = false;
	        },

	        // scrolls down.
	        scrollDown: function () {
	            if (this.vScrollBar.css('visibility') == 'hidden')
	                return false;

	            var vScrollInstance = this.vScrollInstance;
	            if (vScrollInstance.value + vScrollInstance.largestep <= vScrollInstance.max) {
	                vScrollInstance.setPosition(vScrollInstance.value + vScrollInstance.largestep);
	                return true;
	            }
	            else {
	                if (vScrollInstance.value + vScrollInstance.largestep != vScrollInstance.max) {
	                    vScrollInstance.setPosition(vScrollInstance.max);
	                    return true;
	                }
	            }

	            return false;
	        },

	        // scrolls up.
	        scrollUp: function () {
	            if (this.vScrollBar.css('visibility') == 'hidden')
	                return false;

	            var vScrollInstance = this.vScrollInstance;
	            if (vScrollInstance.value - vScrollInstance.largestep >= vScrollInstance.min) {
	                vScrollInstance.setPosition(vScrollInstance.value - vScrollInstance.largestep);
	                return true;
	            }
	            else {
	                if (vScrollInstance.value - vScrollInstance.largestep != vScrollInstance.min) {
	                    vScrollInstance.setPosition(vScrollInstance.min);
	                    return true;
	                }
	            }
	            return false;
	        },

	        _handleDelta: function (delta) {
	            if (this.focused) {
	                var oldvalue = this.vScrollInstance.value;
	                if (delta < 0) {
	                    this.scrollDown();
	                }
	                else this.scrollUp();
	                var newvalue = this.vScrollInstance.value;
	                if (oldvalue != newvalue) {
	                    return false;
	                }
	            }

	            return true;
	        },

	        _render: function (self) {
	            if (self == undefined) self = this;
	            var vScroll = self.vScrollInstance.value;
	            var hScroll = self.hScrollInstance.value;
	            if (this.rtl) {
	                if (this.hScrollBar[0].style.visibility != 'hidden') {
	                    if (this._rtl == false) {
	                        hScroll = self.hScrollInstance.max - hScroll;
	                    }
	                    else {
	                        hScroll = -self.hScrollInstance.value;
	                    }
	                }
	            }
	            self.content.css({ left: -hScroll + 'px', top: -vScroll + 'px' });
	        },

	        // Moves the scrollbars to a specific position.
	        // @param left. Specifies the horizontal scrollbar position.
	        // @param top. Specifies the vertical scrollbar position.
	        scrollTo: function (left, top) {
	            if (left == undefined || top == undefined)
	                return;

	            this.vScrollInstance.setPosition(top);
	            this.hScrollInstance.setPosition(left);
	        },

	        // Gets scrollable height.
	        getScrollHeight: function () {
	            return this.vScrollInstance.max;
	        },

	        // Gets vertical scroll position.
	        getVScrollPosition: function () {
	            return this.vScrollInstance.value;
	        },

	        // Gets scrollable width.
	        getScrollWidth: function () {
	            return this.hScrollInstance.max;
	        },

	        // gets the horizontal scroll position.
	        getHScrollPosition: function () {
	            return this.hScrollInstance.value;
	        },

	        _getScrollSize: function () {
	            // scrollbar Size.
	            var scrollSize = this.scrollBarSize;
	            if (isNaN(scrollSize)) {
	                scrollSize = parseInt(scrollSize);
	                if (isNaN(scrollSize)) {
	                    scrollSize = '17px';
	                }
	                else scrollSize = scrollSize + 'px';
	            }

	            if (this.isTouchDevice()) {
	                scrollSize = $.jqx.utilities.touchScrollBarSize;
	            }

	            scrollSize = parseInt(scrollSize);
	            return scrollSize;
	        },

	        _getScrollArea: function () {
	            var contentLeft = 0;
	            this.content.css('margin-right', '0px');
	            this.content.css('max-width', '9999999px');
	            if ($.jqx.browser.msie && $.jqx.browser.version < 10) {
	                contentLeft = parseInt(this.content.css('left'));
	                this.content.css('left', 0);
	            }
	            this.content.css('overflow', 'auto');
	            if (this.rtl) {
	                this.content.css('direction', 'rtl');
	            }
	            var contentWidth = parseInt(this.content[0].scrollWidth);
	            $.each(this.content.children(), function () {
	                contentWidth = Math.max(contentWidth, this.scrollWidth);
	                contentWidth = Math.max(contentWidth, $(this).outerWidth());
	            });
	            if ($.jqx.browser.msie && $.jqx.browser.version < 10) {
	                this.content.css('left', contentLeft);
	            }

	            var contentHeight = parseInt(this.content[0].scrollHeight);
	            this.content.css('overflow', 'visible');

	            if ($.jqx.browser.msie && $.jqx.browser.version < 9) {
	                var contentHeight = parseInt(this.content[0].scrollHeight);

	                switch (this.sizeMode) {
	                    case "wrap":
	                        var contentHeight = parseInt(this.content[0].scrollHeight);
	                        var contentWidth = parseInt(this.content[0].scrollWidth);
	                        break;
	                    case "horizontalWrap":
	                    case "horizontalwrap":
	                        break;
	                    case "verticalWrap":
	                    case "verticalwrap":
	                        var contentHeight = parseInt(this.content[0].scrollHeight);
	                        break;
	                }
	            }
	            if (this.rtl) {
	                this.content.css('direction', 'ltr');
	            }

	            return { width: contentWidth, height: contentHeight };
	        },

	        _arrange: function (updateDefaultSize) {
	            if (updateDefaultSize !== false) {
	                if (this.width != null) {
	                    this.host.width(this.width);
	                }
	                if (this.height != null) {
	                    this.host.height(this.height);
	                }
	            }

	            var scrollSize = this._getScrollSize();
	            var width = this.host.width();
	            var height = this.host.height();
	            var contentArea = this._getScrollArea();
	            var contentWidth = contentArea.width;
	            var contentHeight = contentArea.height;
	            var vScrollMaximum = contentHeight - parseInt(Math.round(this.host.height()));
	            var hScrollMaximum = contentWidth -  parseInt(Math.round(this.host.width()));
	            // sync with user defined horizontalScrollBarMax and verticalScrollBarMax
	            if (this.horizontalScrollBarMax != undefined) {
	                hScrollMaximum = this.horizontalScrollBarMax;
	            }
	            if (this.verticalScrollBarMax != undefined) {
	                vScrollMaximum = this.verticalScrollBarMax;
	            }

	            var updateVScrollVisibility = function (that, vScrollMaximum) {
	                var borderOffset = 5;
	                // update vertical scroll's visibility.
	                if (vScrollMaximum > borderOffset) {
	                    that.vScrollBar.jqxScrollBar({ 'max': vScrollMaximum });
	                    that.vScrollBar.css('visibility', 'inherit');
	                }
	                else {
	                    that.vScrollBar.jqxScrollBar('setPosition', 0);
	                    that.vScrollBar.css('visibility', 'hidden');
	                }
	            }

	            var updateHScrollVisibility = function (that, hScrollMaximum) {
	                // update horizontal scroll's visibility.
	                if (hScrollMaximum > 0) {
	                    if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
	                        if (hScrollMaximum - 10 <= scrollSize) {
	                            that.hScrollBar.css('visibility', 'hidden');
	                            that.hScrollBar.jqxScrollBar('setPosition', 0);
	                        }
	                        else {
	                            that.hScrollBar.jqxScrollBar({ 'max': hScrollMaximum + 4 });
	                            that.hScrollBar.css('visibility', 'inherit');
	                        }
	                    }
	                    else {
	                        that.hScrollBar.jqxScrollBar({ 'max': hScrollMaximum + 4 });
	                        that.hScrollBar.css('visibility', 'inherit');
	                    }
	                }
	                else {
	                    that.hScrollBar.css('visibility', 'hidden');
	                    that.hScrollBar.jqxScrollBar('setPosition', 0);
	                }
	            }

	            switch (this.sizeMode) {
	                case "wrap":
	                    this.host.width(contentWidth);
	                    this.host.height(contentHeight);
	                    this.vScrollBar.css('visibility', 'hidden');
	                    this.hScrollBar.css('visibility', 'hidden');
	                    return;
	                case "horizontalWrap":
	                case "horizontalwrap":
	                    this.host.width(contentWidth);
	                    this.hScrollBar.css('visibility', 'hidden');
	                    updateVScrollVisibility(this, vScrollMaximum);
	                    this._arrangeScrollbars(scrollSize, contentWidth, height);
	                    return;
	                case "verticalWrap":
	                case "verticalwrap":
	                    this.host.height(contentHeight);
	                    this.vScrollBar.css('visibility', 'hidden');
	                    updateHScrollVisibility(this, hScrollMaximum);
	                    this._arrangeScrollbars(scrollSize, width, height);
	                    return;
	            }

	            updateVScrollVisibility(this, vScrollMaximum);

	            var borderSize = 2;
	            // set maximum values.
	            if (this.vScrollBar.css('visibility') != 'hidden') {
	                if (this.horizontalScrollBarMax == undefined) {
	                    if ((!this.isTouchDevice() && hScrollMaximum > 0) || (hScrollMaximum > 0)) {
	                        hScrollMaximum += scrollSize + borderSize;
	                    }
	                }
	            }
	            updateHScrollVisibility(this, hScrollMaximum);

	            if (this.hScrollBar.css('visibility') != 'hidden') {
	                this.vScrollBar.jqxScrollBar({ 'max': vScrollMaximum + scrollSize + borderSize });
	            }

	            this._arrangeScrollbars(scrollSize, width, height);
	        },

	        _arrangeScrollbars: function (scrollSize, width, height) {
	            var vscrollVisible = this.vScrollBar[0].style.visibility != 'hidden';
	            var hscrollVisible = this.hScrollBar[0].style.visibility != 'hidden';

	            var borderSize = 2;
	            var scrollBorderSize = 2;

	            this.hScrollBar.height(scrollSize);
	            this.hScrollBar.css({ top: height - scrollSize - borderSize - scrollBorderSize + 'px', left: '0px' });
	            this.hScrollBar.width(width - borderSize + 'px');

	            this.vScrollBar.width(scrollSize);
	            this.vScrollBar.height(parseInt(height) - borderSize + 'px');
	            this.vScrollBar.css({ left: parseInt(width) - parseInt(scrollSize) - borderSize - scrollBorderSize + 'px', top: '0px' });
	            if (this.rtl) {
	                this.vScrollBar.css({ left: '0px' });
	                var leftMargin = vscrollVisible ? parseInt(scrollSize) + 'px' : 0;
	                if (this.content.children().css('direction') != 'rtl') {
	                    var ie7 = false;
	                    if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
	                        ie7 = true;
	                    }
	                    if (!ie7) {
	                        this.content.css('padding-left', leftMargin);
	                    }
	                }
	            }
	            else {
	                if (this.vScrollBar.css('visibility') != 'hidden') {
	                    this.content.css('max-width', this.host.width() - this.vScrollBar.outerWidth());
	                }
	            }

	            if ((this.vScrollBar.css('visibility') != 'hidden') && (this.hScrollBar.css('visibility') != 'hidden')) {
	                this.bottomRight.css('visibility', 'inherit');
	                this.bottomRight.css({ left: 1 + parseInt(this.vScrollBar.css('left')), top: 1 + parseInt(this.hScrollBar.css('top')) });
	                this.bottomRight.width(parseInt(scrollSize) + 3);
	                this.bottomRight.height(parseInt(scrollSize) + 3);
	                if (this.rtl) {
	                    this.bottomRight.css({ left: '0px' });
	                    this.hScrollBar.css({ left: scrollSize + scrollBorderSize + 'px' });
	                }
	                this.hScrollBar.width(width - (1 * scrollSize) - borderSize - scrollBorderSize + 'px');
	                this.vScrollBar.height(parseInt(height) - borderSize - scrollSize - scrollBorderSize + 'px');
	            }
	            else this.bottomRight.css('visibility', 'hidden');
	            this.hScrollInstance.refresh();
	            this.vScrollInstance.refresh();
	        },

	        destroy: function () {
	            clearInterval(this.autoUpdateId);
	            this.autoUpdateId = null;
	            this.autoUpdate = false;
	            $.jqx.utilities.resize(this.host, null, true);              
	            this._removeHandlers();
	            this.removeHandler($(window), 'unload');
	            this.vScrollBar.jqxScrollBar('destroy');
	            this.hScrollBar.jqxScrollBar('destroy');
	            this.host.remove();
	        },

	        _raiseevent: function (id, oldValue, newValue) {
	            if (this.isInitialized != undefined && this.isInitialized == true) {
	                var evt = this.events[id];
	                var event = new jQuery.Event(evt);
	                event.previousValue = oldValue;
	                event.currentValue = newValue;
	                event.owner = this;
	                var result = this.host.trigger(event);
	                return result;
	            }
	        },

	        beginUpdateLayout: function () {
	            this.updating = true;
	        },

	        resumeUpdateLayout: function () {
	            this.updating = false;
	            this.vScrollInstance.value = 0;
	            this.hScrollInstance.value = 0;
	            this._arrange();
	            this._render();
	        },

	        propertyChangedHandler: function (object, key, oldValue, value) {
	            if (!object.isInitialized)
	                return;

	            if (key == 'rtl') {
	                this.vScrollBar.jqxScrollBar({ rtl: value });
	                this.hScrollBar.jqxScrollBar({ rtl: value });
	                object._arrange();
	            }

	            if (!object.updating) {
	                if (key == 'scrollBarSize' || key == 'width' || key == 'height') {
	                    if (oldValue != value) {
	                        object._arrange();
	                    }
	                }
	            }
	            if (key == 'touchMode') {
	                if (value != 'auto') {
	                    object._updateTouchScrolling();
	                }
	            }
	            if (key == 'theme') {
	                object.host.removeClass();
	                object.host.addClass(this.toThemeProperty("jqx-panel"));
	                object.host.addClass(this.toThemeProperty("jqx-widget"));
	                object.host.addClass(this.toThemeProperty("jqx-widget-content"));
	                object.host.addClass(this.toThemeProperty("jqx-rc-all"));
	                object.vScrollBar.jqxScrollBar({ theme: this.theme });
	                object.hScrollBar.jqxScrollBar({ theme: this.theme });
	                object.bottomRight.removeClass();
	                object.bottomRight.addClass(this.toThemeProperty('jqx-panel-bottomright'));
	                object.bottomRight.addClass(this.toThemeProperty('jqx-scrollbar-state-normal'));
	                object.content.removeClass();
	                object.content.addClass(this.toThemeProperty('jqx-widget-content'));
	            }
	        },

	        invalidate: function()
	        {
	            if ($.jqx.isHidden(this.host))
	                return;
	            
	            this.refresh();
	        },

	        refresh: function (initialRefresh) {
	            this._arrange();
	        }
	    });
	})(jQuery);

	/*
	jQWidgets v3.2.2 (2014-Mar-21)
	Copyright (c) 2011-2014 jQWidgets.
	License: http://jqwidgets.com/license/
	*/


	(function ($) {

	    $.jqx.jqxWidget("jqxTree", "", {});

	    $.extend($.jqx._jqxTree.prototype, {
	        defineInstance: function () {
	            //Type: Array
	            //Gets the tree's items.
	            this.items = new Array();
	            //Type: Number.
	            //Default: null.
	            //Sets the width.
	            this.width = null;
	            //Type: Number.
	            //Default: null.
	            //Sets the height.
	            this.height = null;
	            //Type: String.
	            //Default: easeInOutSine.
	            //Gets or sets the animation's easing to one of the JQuery's supported easings.         
	            this.easing = 'easeInOutCirc';
	            //Type: Number.
	            //Default: 'fast'.
	            //Gets or sets the duration of the show animation.         
	            this.animationShowDuration = 'fast';
	            //Type: Number.
	            //Default: 'fast'.
	            //Gets or sets the duration of the hide animation.
	            this.animationHideDuration = 'fast';
	            //Type: Array.
	            this.treeElements = new Array();
	            //Type: Boolean.
	            //Default: true.
	            //Enables or disables the tree.
	            this.disabled = false;
	            // Type: Boolean
	            // Default: true
	            // enables or disables the hover state.
	            this.enableHover = true;
	            // Type: Boolean
	            // Default: true
	            // enables or disables the key navigation.
	            this.keyboardNavigation = true;
	            this.enableKeyboardNavigation = true;
	            // Type: String
	            // Default: click
	            // Gets or sets user interaction used for expanding or collapsing any item. Possible values ['click', 'dblclick'].
	            this.toggleMode = 'dblclick';
	            // Type: Object
	            // Default: null
	            // data source.
	            this.source = null;
	            // Type: Boolean
	            // Default: false
	            // Gets or sets whether the tree should display a checkbox next to each item.
	            this.checkboxes = false;
	            this.checkSize = 13;
	            this.toggleIndicatorSize = 16;
	            // Type: Boolean
	            // Default: false
	            // Gets or sets whether the tree checkboxes have three states - checked, unchecked and indeterminate.           
	            this.hasThreeStates = false;
	            // Type: Object
	            // Default: null
	            // Private
	            // gets the selected item. To select an item, use the selectItem function.
	            this.selectedItem = null;
	            this.touchMode = 'auto';
	            // tree events.
	            // expand is triggered when the user expands a tree item.
	            // collapse is triggered when the user collapses a tree item.
	            // select is triggered when the user selects a tree item.
	            // add is triggered when the user adds a new tree item.
	            // remove is triggered when the user removes a tree item.
	            // checkchange is triggered when the user checks, unchecks or the checkbox is in indeterminate state.
	            this.allowDrag = true;
	            this.allowDrop = true;
	            this.searchMode = 'startswithignorecase';
	            this.incrementalSearch = true;
	            this.incrementalSearchDelay = 700;
	            this.animationHideDelay = 0;
	            this.submitCheckedItems = false;
	            this.dragStart = null;
	            this.dragEnd = null;
	            this.rtl = false;
	            // Possible values: 'none, 'default', 'copy'
	            this.dropAction = 'default';
	            this.events =
			    [
	                'expand', 'collapse', 'select', 'initialized', 'added', 'removed', 'checkChange', 'dragEnd', 'dragStart'
			    ];
	            this.aria =
	            {
	                "aria-activedescendant": { name: "getActiveDescendant", type: "string" },
	                "aria-disabled": { name: "disabled", type: "boolean" }
	            };
	        },

	        createInstance: function (args) {
	            var self = this;
	            this.host.attr('role', 'tree');
	            this.host.attr('data-role', 'treeview');

	            this.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
	                if (self.disabled) {
	                    self.host.addClass(self.toThemeProperty('jqx-tree-disabled'));
	                }
	                else {
	                    self.host.removeClass(self.toThemeProperty('jqx-tree-disabled'));
	                }
	                $.jqx.aria(self, "aria-disabled", value);
	            }

	            if (this.width != null && this.width.toString().indexOf("px") != -1) {
	                this.host.width(this.width);
	            }
	            else
	                if (this.width != undefined && !isNaN(this.width)) {
	                    this.host.width(this.width);
	                };

	            if (this.height != null && this.height.toString().indexOf("px") != -1) {
	                this.host.height(this.height);
	            }
	            else if (this.height != undefined && !isNaN(this.height)) {
	                this.host.height(this.height);
	            };

	            if (this.width != null && this.width.toString().indexOf("%") != -1) {
	                this.host.width(this.width);
	            }
	            if (this.height != null && this.height.toString().indexOf("%") != -1) {
	                this.host.height(this.height);
	            }

	            this.host.attr('tabIndex', 1);

	            if (this.disabled) {
	                this.host.addClass(this.toThemeProperty('jqx-tree-disabled'));
	                $.jqx.aria(this, "aria-disabled", true);
	            }

	            if (this.host.jqxDragDrop) {
	                jqxTreeDragDrop();
	            }

	            this.originalInnerHTML = this.element.innerHTML;
	            this.createdTree = false;
	            if (this.element.innerHTML.indexOf('UL')) {
	                var innerElement = this.host.find('ul:first');
	                if (innerElement.length > 0) {
	                    this.createTree(innerElement[0]);
	                    this.createdTree = true;
	                }
	            }

	            if (this.source != null) {
	                var html = this.loadItems(this.source);
	                this.element.innerHTML = html;
	                var innerElement = this.host.find('ul:first');
	                if (innerElement.length > 0) {
	                    this.createTree(innerElement[0]);
	                    this.createdTree = true;
	                }
	            }

	            this._itemslength = this.items.length;

	            if (!this.createdTree) {
	                if (this.host.find('ul').length == 0) {
	                    this.host.append($('<ul></ul>'));
	                    var innerElement = this.host.find('ul:first');
	                    if (innerElement.length > 0) {
	                        this.createTree(innerElement[0]);
	                        this.createdTree = true;
	                    }

	                    this.createdTree = true;
	                }
	            }

	            if (this.createdTree == true) {
	                this._render();
	                this._handleKeys();
	            }

	            this._updateCheckLayout();
	        },

	        checkItems: function (item, baseItem) {
	            var me = this;
	            if (item != null) {
	                var count = 0;
	                var hasIndeterminate = false;
	                var itemsCount = 0;

	                var childItems = $(item.element).find('li');
	                itemsCount = childItems.length;

	                $.each(childItems, function (index) {
	                    var child = me.itemMapping["id" + this.id].item;
	                    if (child.checked != false) {
	                        if (child.checked == null) {
	                            hasIndeterminate = true;
	                        }
	                        count++;
	                    }
	                });

	                if (item != baseItem) {
	                    if (count == itemsCount) {
	                        this.checkItem(item.element, true, 'tree');
	                    }
	                    else {
	                        if (count > 0) {
	                            this.checkItem(item.element, null, 'tree');
	                        }
	                        else this.checkItem(item.element, false, 'tree');

	                    }
	                }
	                else {
	                    var checked = baseItem.checked;
	                    var childItems = $(baseItem.element).find('li');
	                    $.each(childItems, function () {
	                        var child = me.itemMapping["id" + this.id].item;
	                        me.checkItem(this, checked, 'tree');
	                    });
	                }

	                this.checkItems(this._parentItem(item), baseItem);
	            }
	            else {
	                var checked = baseItem.checked;
	                var childItems = $(baseItem.element).find('li');
	                $.each(childItems, function () {
	                    var child = me.itemMapping["id" + this.id].item;
	                    me.checkItem(this, checked, 'tree');
	                });
	            }
	        },

	        _getMatches: function (value, startIndex) {
	            if (value == undefined || value.length == 0)
	                return -1;

	            var items = this.items;
	            var visibleItems = new Array();
	            for (var i = 0; i < items.length; i++) {
	                if (this._isVisible(items[i]) && !items[i].disabled)
	                    visibleItems.push(items[i]);
	            }
	            items = visibleItems;
	            if (startIndex != undefined) {
	                items = items.slice(startIndex);
	            }
	      
	            var keyMatches = new Array();
	            $.each(items, function (i) {
	                var itemValue = this.label;
	                if (!itemValue) itemValue = "";
	                var match = $.jqx.string.startsWithIgnoreCase(itemValue.toString(), value);

	                if (match) {
	                    keyMatches.push({ id: this.id, element: this.element });
	                }
	            });
	            return keyMatches;
	        },

	        _handleKeys: function () {
	            var self = this;
	            this.addHandler(this.host, 'keydown', function (event) {
	                var key = event.keyCode;
	                if (self.keyboardNavigation || self.enableKeyboardNavigation) {
	                    if (self.selectedItem != null) {
	                        var element = self.selectedItem.element;
	                        if (self.incrementalSearch && (!(key >= 33 && key <= 40))) {
	                            var matchindex = -1;
	                            if (!self._searchString) {
	                                self._searchString = "";
	                            }

	                            if ((key == 8 || key == 46) && self._searchString.length >= 1) {
	                                self._searchString = self._searchString.substr(0, self._searchString.length - 1);
	                            }

	                            var letter = String.fromCharCode(key);

	                            var isDigit = (!isNaN(parseInt(letter)));
	                            var toReturn = false;
	                            if ((key >= 65 && key <= 97) || isDigit || key == 8 || key == 32 || key == 46) {
	                                if (!event.shiftKey) {
	                                    letter = letter.toLocaleLowerCase();
	                                }

	                                if (key != 8 && key != 32 && key != 46) {
	                                    if (!(self._searchString.length > 0 && self._searchString.substr(0, 1) == letter))
	                                        self._searchString += letter;
	                                }

	                                if (key == 32) {
	                                    self._searchString += " ";
	                                }
	                                self._searchTime = new Date();
	                                var selection = self.selectedItem;
	                                if (selection) {
	                                    var rowKey = selection.id;
	                                    var index = -1;
	                                    for (var i = 0; i < self.items.length; i++) {
	                                        if (self.items[i].id == rowKey) {
	                                            index = i+1;
	                                            break;
	                                        }
	                                    }

	                                    var foundRows = self._getMatches(self._searchString, index);
	                                    if (foundRows.length == 0 || (foundRows.length > 0 && foundRows[0].id == rowKey)) {
	                                        var foundRows = self._getMatches(self._searchString);
	                                    }
	                                }
	                                else {
	                                    var foundRows = self._getMatches(self._searchString);
	                                }

	                                if (foundRows.length > 0) {
	                                    var selection = self.selectedItem;
	                                    if (self.selectedItem && self.selectedItem.id != foundRows[0].id) {
	                                        self.clearSelection();
	                                        self.selectItem(foundRows[0].element);
	                                    }
	                                    self._lastSearchString = self._searchString;
	                                }
	                            }

	                            if (self._searchTimer != undefined) {
	                                clearTimeout(self._searchTimer);
	                            }

	                            if (key == 27 || key == 13) {
	                                self._searchString = "";
	                                self._lastSearchString = "";
	                            }

	                            self._searchTimer = setTimeout(function () {
	                                self._searchString = "";
	                                self._lastSearchString = "";
	                            }, 500);

	                            if (matchindex >= 0) {
	                                return;
	                            }
	                            if (toReturn)
	                                return false;
	                        }
	                        

	                        switch (key) {
	                            case 32:
	                                if (self.checkboxes) {
	                                    self.fromKey = true;
	                                    var checked = $(self.selectedItem.checkBoxElement).jqxCheckBox('checked');
	                                    self.checkItem(self.selectedItem.element, !checked, 'tree');
	                                    if (self.hasThreeStates) {
	                                        self.checkItems(self.selectedItem, self.selectedItem);
	                                    }
	                                    return false;
	                                }
	                                return true;
	                            case 33:
	                                var itemsOnPage = self._getItemsOnPage();
	                                var prevItem = self.selectedItem;
	                                for (var i = 0; i < itemsOnPage; i++) {
	                                    prevItem = self._prevVisibleItem(prevItem);
	                                }
	                                if (prevItem != null) {
	                                    self.selectItem(prevItem.element);
	                                    self.ensureVisible(prevItem.element);
	                                }
	                                else {
	                                    self.selectItem(self._firstItem().element);
	                                    self.ensureVisible(self._firstItem().element);
	                                }
	                                return false;
	                            case 34:
	                                var itemsOnPage = self._getItemsOnPage();
	                                var nextItem = self.selectedItem;
	                                for (var i = 0; i < itemsOnPage; i++) {
	                                    nextItem = self._nextVisibleItem(nextItem);
	                                }
	                                if (nextItem != null) {
	                                    self.selectItem(nextItem.element);
	                                    self.ensureVisible(nextItem.element);
	                                }
	                                else {
	                                    self.selectItem(self._lastItem().element);
	                                    self.ensureVisible(self._lastItem().element);
	                                }
	                                return false;
	                            case 37:                             
	                            case 39:
	                                if ((key == 37 && !self.rtl) || (key == 39 && self.rtl)) {
	                                    if (self.selectedItem.hasItems && self.selectedItem.isExpanded) {
	                                        self.collapseItem(element);
	                                    }
	                                    else {
	                                        var parentItem = self._parentItem(self.selectedItem);
	                                        if (parentItem != null) {
	                                            self.selectItem(parentItem.element);
	                                            self.ensureVisible(parentItem.element);
	                                        }
	                                    }
	                                }
	                                if ((key == 39 && !self.rtl) || (key == 37 && self.rtl)) {
	                                    if (self.selectedItem.hasItems) {
	                                        if (!self.selectedItem.isExpanded) {
	                                            self.expandItem(element);
	                                        }
	                                        else {
	                                            var nextItem = self._nextVisibleItem(self.selectedItem);
	                                            if (nextItem != null) {
	                                                self.selectItem(nextItem.element);
	                                                self.ensureVisible(nextItem.element);
	                                            }
	                                        }
	                                    }
	                                }
	                                return false;
	                            case 13:
	                                if (self.selectedItem.hasItems) {
	                                    if (self.selectedItem.isExpanded) {
	                                        self.collapseItem(element);
	                                    }
	                                    else {
	                                        self.expandItem(element);
	                                    }
	                                }
	                                return false;
	                            case 36:
	                                self.selectItem(self._firstItem().element);
	                                self.ensureVisible(self._firstItem().element);
	                                return false;
	                            case 35:
	                                self.selectItem(self._lastItem().element);
	                                self.ensureVisible(self._lastItem().element);
	                                return false;
	                            case 38:
	                                var prevItem = self._prevVisibleItem(self.selectedItem);
	                                if (prevItem != null) {
	                                    self.selectItem(prevItem.element);
	                                    self.ensureVisible(prevItem.element);
	                                }
	                                return false;
	                            case 40:
	                                var nextItem = self._nextVisibleItem(self.selectedItem);
	                                if (nextItem != null) {
	                                    self.selectItem(nextItem.element);
	                                    self.ensureVisible(nextItem.element);
	                                }
	                                return false;
	                        }
	                    }
	                }
	            });
	        },

	        _firstItem: function () {
	            var item = null;
	            var me = this;
	            var innerElement = this.host.find('ul:first');
	            var liTags = $(innerElement).find('li');

	            for (i = 0; i <= liTags.length - 1; i++) {
	                var listTag = liTags[i];
	                item = this.itemMapping["id" + listTag.id].item;
	                if (me._isVisible(item)) {
	                    return item;
	                }
	            }

	            return null;
	        },

	        _lastItem: function () {
	            var item = null;
	            var me = this;
	            var innerElement = this.host.find('ul:first');
	            var liTags = $(innerElement).find('li');

	            for (i = liTags.length - 1; i >= 0; i--) {
	                var listTag = liTags[i];
	                item = this.itemMapping["id" + listTag.id].item;
	                if (me._isVisible(item)) {
	                    return item;
	                }
	            }

	            return null;
	        },

	        _parentItem: function (item) {
	            if (item == null || item == undefined)
	                return null;

	            var parent = item.parentElement;
	            if (!parent) return null;
	            var parentItem = null;

	            $.each(this.items, function () {
	                if (this.element == parent) {
	                    parentItem = this;
	                    return false;
	                }
	            });

	            return parentItem;
	        },

	        _nextVisibleItem: function (item) {
	            if (item == null || item == undefined)
	                return null;

	            var currentItem = item;
	            while (currentItem != null) {
	                currentItem = currentItem.nextItem;
	                if (this._isVisible(currentItem) && !currentItem.disabled)
	                    return currentItem;
	            }

	            return null;
	        },

	        _prevVisibleItem: function (item) {
	            if (item == null || item == undefined)
	                return null;

	            var currentItem = item;
	            while (currentItem != null) {
	                currentItem = currentItem.prevItem;
	                if (this._isVisible(currentItem) && !currentItem.disabled)
	                    return currentItem;
	            }

	            return null;
	        },

	        _isVisible: function (item) {
	            if (item == null || item == undefined)
	                return false;

	            if (!this._isElementVisible(item.element))
	                return false;

	            var currentItem = this._parentItem(item);

	            if (currentItem == null)
	                return true;

	            if (currentItem != null) {
	                if (!this._isElementVisible(currentItem.element)) {
	                    return false;
	                }

	                if (currentItem.isExpanded) {
	                    while (currentItem != null) {
	                        currentItem = this._parentItem(currentItem);
	                        if (currentItem != null && !this._isElementVisible(currentItem.element)) {
	                            return false;
	                        }

	                        if (currentItem != null && !currentItem.isExpanded)
	                            return false;
	                    }
	                }
	                else {
	                    return false;
	                }
	            }

	            return true;
	        },

	        _getItemsOnPage: function () {
	            var itemsCount = 0;
	            var position = this.panel.jqxPanel('getVScrollPosition');
	            var height = parseInt(this.host.height());
	            var itemsHeight = 0;
	            var firstItem = this._firstItem();

	            if (parseInt($(firstItem.element).height()) > 0) {
	                while (itemsHeight <= height) {
	                    itemsHeight += parseInt($(firstItem.element).outerHeight());
	                    itemsCount++;
	                }
	            }

	            return itemsCount;
	        },

	        _isElementVisible: function (element) {
	            if (element == null)
	                return false;

	            if ($(element).css('display') != 'none' && $(element).css('visibility') != 'hidden') {
	                return true;
	            }

	            return false;
	        },

	        refresh: function (initialRefresh) {
	            if (this.width != null && this.width.toString().indexOf("px") != -1) {
	                this.host.width(this.width);
	            }
	            else
	                if (this.width != undefined && !isNaN(this.width)) {
	                    this.host.width(this.width);
	                };

	            if (this.height != null && this.height.toString().indexOf("px") != -1) {
	                this.host.height(this.height);
	            }
	            else if (this.height != undefined && !isNaN(this.height)) {
	                this.host.height(this.height);
	            };

	            if (this.panel) {
	                if (this.width != null && this.width.toString().indexOf("%") != -1) {
	                    var me = this;
	                    this.panel.jqxPanel('width', '100%');
	                    me.removeHandler($(window), 'resize.jqxtree' + me.element.id);
	                    me.addHandler($(window), 'resize.jqxtree' + me.element.id,
	                    function () {
	                        me._calculateWidth();
	                    });
	                }
	                else {
	                    this.panel.jqxPanel('width', this.host.width());
	                }
	                this.panel.jqxPanel('_arrange');
	            }
	            this._calculateWidth();
	            if ($.jqx.isHidden(this.host)) {
	                var me = this;
	                this._hiddenTimer = setInterval(function () {
	                    if (!$.jqx.isHidden(me.host)) {
	                        clearInterval(me._hiddenTimer);
	                        me._calculateWidth();
	                    }
	                }, 100);
	            }
	            if (initialRefresh != true) {
	                if (this.checkboxes) {
	                    this._updateCheckLayout(null);
	                }
	            }
	        },

	        resize: function(width, height)
	        {
	            this.width = width;
	            this.height = height;
	            this.refresh();
	        },

	        loadItems: function (items) {
	            if (items == null) {
	                return;
	            }

	            var self = this;
	            this.items = new Array();
	            var html = '<ul>';
	            $.map(items, function (item) {
	                if (item == undefined)
	                    return null;

	                html += self._parseItem(item);
	            });

	            html += '</ul>';
	            return html;
	        },

	        _parseItem: function (item) {
	            var html = "";

	            if (item == undefined)
	                return null;

	            var label = item.label;
	            if (!item.label && item.html) {
	                label = item.html;
	            }
	            if (!label) {
	                label = "Item";
	            }

	            if (typeof item === 'string') {
	                label = item;
	            }

	            var expanded = false;
	            if (item.expanded != undefined && item.expanded) {
	                expanded = true;
	            }

	            var locked = false;
	            if (item.locked != undefined && item.locked) {
	                locked = true;
	            }

	            var selected = false;
	            if (item.selected != undefined && item.selected) {
	                selected = true;
	            }

	            var disabled = false;
	            if (item.disabled != undefined && item.disabled) {
	                disabled = true;
	            }

	            var checked = false;
	            if (item.checked != undefined && item.checked) {
	                checked = true;
	            }

	            var icon = item.icon;
	            var iconsize = item.iconsize;

	            html += '<li';
	            if (expanded) {
	                html += ' item-expanded="true" ';
	            }

	            if (locked) {
	                html += ' item-locked="true" ';
	            }

	            if (disabled) {
	                html += ' item-disabled="true" ';
	            }

	            if (selected) {
	                html += ' item-selected="true" ';
	            }

	            if (iconsize) {
	                html += ' item-iconsize="' + item.iconsize + '" ';
	            }

	            if (icon != null && icon != undefined) {
	                html += ' item-icon="' + icon + '" ';
	            }

	            if (item.label && !item.html) {
	                html += ' item-label="' + label + '" ';
	            }

	            if (item.value != null) {
	                html += ' item-value="' + item.value + '" ';
	            }

	            if (item.checked != undefined) {
	                html += ' item-checked="' + checked + '" ';
	            }

	            var id = "";
	            if (item.id != undefined) {
	                id = item.id;
	                html += ' id="' + id + '" ';
	            }
	            else {
	                id = this.createID();
	                html += ' id="' + id + '" ';
	            }

	            html += '>' + label;

	            if (item.items) {
	                html += this.loadItems(item.items);
	            }
	            if (!this._valueList) this._valueList = new Array();
	            this._valueList[id] = item.value;

	            html += '</li>';
	            return html;
	        },

	        // ensures the visibility of an element.
	        // @ param element.
	        ensureVisible: function (element) {
	            if (element == null || element == undefined)
	                return;

	            var position = this.panel.jqxPanel('getVScrollPosition');
	            var hposition = this.panel.jqxPanel('getHScrollPosition');
	            var height = parseInt(this.host.height());
	            var elementPosition = $(element).position().top;

	            if (elementPosition <= position || elementPosition >= height + position) {
	                this.panel.jqxPanel('scrollTo', hposition, elementPosition - height + $(element).outerHeight());
	            }
	        },

	        _syncItems: function (elements) {
	            this._visibleItems = new Array();
	            var me = this;
	            $.each(elements, function () {
	                var $element = $(this);
	                if ($element.css('display') != 'none') {
	                    var height = $element.outerHeight();
	                    if ($element.height() > 0) {
	                        var top = parseInt($element.offset().top);
	                        me._visibleItems[me._visibleItems.length] = { element: this, top: top, height: height, bottom: top + height };
	                    }
	                }
	            });
	        },

	        hitTest: function (left, top) {
	            var me = this;
	            var treeInstance = this;
	            var treeItem = null;
	            var elements = this.host.find('.draggable');
	            this._syncItems(elements);

	            if (treeInstance._visibleItems) {
	                var hostLeft = parseInt(treeInstance.host.offset().left);
	                var hostWidth = treeInstance.host.outerWidth();

	                $.each(treeInstance._visibleItems, function (index) {
	                    if (left >= hostLeft && left < hostLeft + hostWidth)
	                        if (this.top + 5 < top && top < this.top + this.height) {
	                            var parentElement = $(this.element).parents('li:first');
	                            if (parentElement.length > 0) {
	                                treeItem = treeInstance.getItem(parentElement[0]);
	                                if (treeItem != null) {
	                                    treeItem.height = this.height;
	                                    treeItem.top = this.top;
	                                    return false;
	                                }
	                            }
	                        }
	                });
	            }
	            return treeItem;
	        },

	        addBefore: function(items, sibling, refresh)
	        {
	            return this.addBeforeAfter(items, sibling, true, refresh);
	        },

	        addAfter: function (items, sibling, refresh) {
	            return this.addBeforeAfter(items, sibling, false, refresh);
	        },

	        addBeforeAfter: function (items, sibling, before, refresh) {
	            var treeInstance = this;

	            var array = new Array();

	            if (sibling && sibling.treeInstance != undefined) {
	                sibling = sibling.element;
	            }

	            if (!$.isArray(items)) {
	                array[0] = items;
	            }
	            else array = items;

	            var html = "";
	            var me = this;
	            $.each(array, function () {
	                html += me._parseItem(this);
	            });
	            var el = $(html);
	            if (treeInstance.element.innerHTML.indexOf('UL')) {
	                var innerElement = treeInstance.host.find('ul:first');
	            }

	            if (sibling == undefined && sibling == null) {
	                innerElement.append(el);
	            }
	            else {
	                if (before) {
	                    $(sibling).before(el);
	                }
	                else {
	                    $(sibling).after(el);
	                }
	            }

	            var liTags = el;
	            for (var index = 0; index < liTags.length; index++) {
	                this._createItem(liTags[index]);
	                var subTags = $(liTags[index]).find('li');
	                if (subTags.length > 0) {
	                    for (var j = 0; j < subTags.length; j++) {
	                        this._createItem(subTags[j]);
	                    }
	                }
	            }

	            var update = function (drag) {
	                me._refreshMapping(false);
	                me._updateItemsNavigation();
	                if (drag && me.allowDrag && me._enableDragDrop) {
	                    me._enableDragDrop();
	                }
	                if (me.selectedItem != null) {
	                    $(me.selectedItem.titleElement).addClass(me.toThemeProperty('jqx-fill-state-pressed'));
	                    $(me.selectedItem.titleElement).addClass(me.toThemeProperty('jqx-tree-item-selected'));
	                }
	            }

	            if (refresh == false) {
	                update(true);
	                this._raiseEvent('4', { items: this.getItems() });
	                return;
	            }

	            update(false);
	            me._render();
	            this._raiseEvent('4', { items: this.getItems() });
	            if (me.checkboxes) {
	                me._updateCheckLayout(null);
	            }
	        },

	        addTo: function (items, parentElement, refresh) {
	            var treeInstance = this;

	            var array = new Array();

	            if (parentElement && parentElement.treeInstance != undefined) {
	                parentElement = parentElement.element;
	            }

	            if (!$.isArray(items)) {
	                array[0] = items;
	            }
	            else array = items;

	            var html = "";
	            var me = this;
	            $.each(array, function () {
	                html += me._parseItem(this);
	            });
	            var el = $(html);
	            if (treeInstance.element.innerHTML.indexOf('UL')) {
	                var innerElement = treeInstance.host.find('ul:first');
	            }

	            if (parentElement == undefined && parentElement == null) {
	                innerElement.append(el);
	            }
	            else {
	                parentElement = $(parentElement);
	                var parentUL = parentElement.find('ul:first');
	                if (parentUL.length == 0) {
	                    ulElement = $('<ul></ul>');
	                    $(parentElement).append(ulElement);
	                    parentUL = parentElement.find('ul:first');
	                    var item = treeInstance.itemMapping["id" + parentElement[0].id].item;
	                    item.subtreeElement = parentUL[0];
	                    item.hasItems = true;
	                    parentUL.addClass(treeInstance.toThemeProperty('jqx-tree-dropdown'));
	                    if (me.rtl) {
	                        parentUL.addClass(treeInstance.toThemeProperty('jqx-tree-dropdown-rtl'));
	                    }
	                    parentUL.append(el);
	                    var element = parentUL.find('li:first');
	                    item.parentElement = element;
	                }
	                else {
	                    parentUL.append(el);
	                }
	            }

	            var liTags = el;
	            for (var index = 0; index < liTags.length; index++) {
	                this._createItem(liTags[index]);
	                var subTags = $(liTags[index]).find('li');
	                if (subTags.length > 0) {
	                    for (var j = 0; j < subTags.length; j++) {
	                        this._createItem(subTags[j]);
	                    }
	                }
	            }

	            var update = function (drag) {
	                me._refreshMapping(false);
	                me._updateItemsNavigation();
	                if (drag && me.allowDrag && me._enableDragDrop) {
	                    me._enableDragDrop();
	                }
	                if (me.selectedItem != null) {
	                    $(me.selectedItem.titleElement).addClass(me.toThemeProperty('jqx-fill-state-pressed'));
	                    $(me.selectedItem.titleElement).addClass(me.toThemeProperty('jqx-tree-item-selected'));
	                }
	            }

	            if (refresh == false) {
	                update(true);
	                this._raiseEvent('4', { items: this.getItems() });
	                return;
	            }

	            update(false);
	            me._render();
	            if (me.checkboxes) {
	                me._updateCheckLayout(null);
	            }
	            this._raiseEvent('4', { items: this.getItems() });
	        },

	        updateItem: function(element, content)
	        {
	            var item = element.treeInstance != undefined ? element : this.getItem(element);
	            if (!item) {
	                var tmp = element;
	                element = content;
	                content = tmp;
	                var item = element.treeInstance != undefined ? element : this.getItem(element);
	            }

	            if (item) {
	                if (typeof (content) === "string") {
	                    content = { label: content };
	                }

	                if (content.value) {
	                    item.value = content.value;
	                }
	                if (content.label) {
	                    item.label = content.label;
	                    $.jqx.utilities.html($(item.titleElement), content.label);
	                    var ie7 = $.jqx.browser.msie && $.jqx.browser.version < 8;
	                    if (ie7) {
	                        $(document.body).append(this._measureItem);
	                        this._measureItem.html($(item.titleElement).text());
	                        var width = this._measureItem.width();
	                        if (item.icon) {
	                            width += 20;
	                        }
	                        if ($($(item.titleElement).find('img')).length > 0) {
	                            width += 20;
	                        }

	                        $(item.titleElement).css('max-width', width + 'px');
	                        this._measureItem.remove();
	                    }
	                }

	                if (content.icon) {
	                    if ($(item.element).children('.itemicon').length > 0) {
	                        $(item.element).find('.itemicon')[0].src = content.icon;
	                    }
	                    else {
	                        var iconsize = content.iconsize;
	                        if (!iconsize) iconsize = 16;

	                        var icon = $('<img width="' + iconsize + '" height="' + iconsize + '" style="float: left;" class="itemicon" src="' + content.icon + '"/>');
	                        $(item.titleElement).prepend(icon);
	                        icon.css('margin-right', '4px');
	                        if (this.rtl) {
	                            icon.css('margin-right', '0px');
	                            icon.css('margin-left', '4px');
	                            icon.css('float', 'right');
	                        }
	                    }
	                }

	                if (content.expanded) {
	                    this.expandItem(item);
	                }
	                if (content.disabled) {
	                    this.disableItem(item);
	                }
	                if (content.selected) {
	                    this.selectItem(item);
	                }
	                return true;
	            }
	           
	            return false;
	        },
	        // removes an element.
	        // @param element
	        removeItem: function (element, refresh) {
	            if (element == undefined || element == null) {
	                return;
	            }

	            if (element.treeInstance != undefined) element = element.element;

	            var me = this;
	            var id = element.id;

	            var itemIndex = -1;
	            var itemToRemove = this.getItem(element);
	            if (itemToRemove) {
	                itemIndex = this.items.indexOf(itemToRemove);
	                if (itemIndex != -1) {
	                   (function removeItemFunc(item) {
	                        var itemIndex = -1;
	                        itemIndex = this.items.indexOf(item);
	                        if (itemIndex != -1) {
	                            this.items.splice(itemIndex, 1);
	                        }
	                        var itemElements = $(item.element).find('li');
	                        var itemsCount = itemElements.length;
	                        var me = this;
	                        var items = new Array();
	                        if (itemsCount > 0) {
	                            $.each(itemElements, function (index) {
	                                var child = me.itemMapping["id" + this.id].item;
	                                items.push(child);
	                            });

	                            for (var i = 0; i < items.length; i++) {
	                                removeItemFunc.apply(this, [items[i]]);
	                            }
	                        }
	                    }).apply(this, [itemToRemove]);
	                }
	            }
	            if (this.host.find('#' + element.id).length > 0) {
	                $(element).remove();
	            }
	            
	            if (refresh == false) {
	                this._raiseEvent('5');
	                return;
	            }

	            me._updateItemsNavigation();
	            me._render();
	            if (me.selectedItem != null) {
	                if (me.selectedItem.element == element) {
	                    $(me.selectedItem.titleElement).removeClass(me.toThemeProperty('jqx-fill-state-pressed'));
	                    $(me.selectedItem.titleElement).removeClass(me.toThemeProperty('jqx-tree-item-selected'));
	                    me.selectedItem = null;
	                }
	            }
	            this._raiseEvent('5');
	            if (me.checkboxes) {
	                me._updateCheckLayout(null);
	            }
	        },

	        clear: function () {
	            this.items = new Array();
	            this.itemMapping = new Array();
	            var element = this.host.find('ul:first');
	            if (element.length > 0) {
	                element[0].innerHTML = "";
	            }
	            this.selectedItem = null;
	        },

	        // disables a tree item.
	        // @param element
	        disableItem: function (element) {
	            if (element == null)
	                return false;
	            if (element.treeInstance != undefined) element = element.element;

	            var me = this;
	            $.each(me.items, function () {
	                var item = this;
	                if (item.element == element) {
	                    // me.collapseItem(item.element);
	                    item.disabled = true;
	                    //      $(item.titleElement).removeClass(me.toThemeProperty('jqx-fill-state-pressed'));
	                    //      $(item.titleElement).removeClass(me.toThemeProperty('jqx-tree-item-selected'));
	                    $(item.titleElement).addClass(me.toThemeProperty('jqx-fill-state-disabled'));
	                    $(item.titleElement).addClass(me.toThemeProperty('jqx-tree-item-disabled'));
	                    if (me.checkboxes && item.checkBoxElement) {
	                        $(item.checkBoxElement).jqxCheckBox({ disabled: true });
	                    }
	                    return false;
	                }
	            });
	        },

	        _updateInputSelection: function () {
	            if (this.input) {
	                if (this.selectedItem == null) {
	                    this.input.val("");
	                }
	                else {
	                    var label = this.selectItem.value;
	                    if (label == null) label = this.selectedItem.label;
	                    this.input.val(label);
	                }
	                if (this.checkboxes) {
	                    var items = this.getCheckedItems();
	                    if (this.submitCheckedItems) {
	                        var str = "";
	                        for (var i = 0; i < items.length; i++) {
	                            var value = items[i].value;
	                            if (value == null) value = items[i].label;
	                            if (i == items.length - 1) {
	                                str += value;
	                            }
	                            else {
	                                str += value + ",";
	                            }
	                        }
	                        this.input.val(str);
	                    }
	                }
	            }
	        },

	        getCheckedItems: function () {
	            var checkedItems = new Array();
	            var me = this;
	            $.each(me.items, function () {
	                var item = this;
	                if (item.checked) checkedItems.push(item);
	            });
	            return checkedItems;
	        },

	        getUncheckedItems: function () {
	            var checkedItems = new Array();
	            var me = this;
	            $.each(me.items, function () {
	                var item = this;
	                if (!item.checked) checkedItems.push(item);
	            });
	            return checkedItems;
	        },

	        checkAll: function () {
	            var me = this;
	            $.each(me.items, function () {
	                var item = this;
	                if (!item.disabled) {
	                    item.checked = true;
	                    $(item.checkBoxElement).jqxCheckBox('_setState', true);
	                }
	            });
	            this._raiseEvent('6', { element: this, checked: true });
	        },

	        uncheckAll: function () {
	            var me = this;
	            $.each(me.items, function () {
	                var item = this;
	                if (!item.disabled) {
	                    item.checked = false;
	                    $(item.checkBoxElement).jqxCheckBox('_setState', false);
	                }
	            });
	            this._raiseEvent('6', { element: this, checked: false });
	        },

	        // checks a tree item.
	        // @param element
	        // @param checked state - true, false or null
	        checkItem: function (element, checked, owner) {
	            if (element == null)
	                return false;

	            if (checked === undefined) {
	                checked = true;
	            }

	            if (element.treeInstance != undefined) element = element.element;

	            var me = this;
	            var stateChanged = false;
	            var treeItem = null;
	            $.each(me.items, function () {
	                var item = this;
	                if (item.element == element && !item.disabled) {
	                    stateChanged = true;
	                    item.checked = checked;
	                    treeItem = item;
	                    $(item.checkBoxElement).jqxCheckBox({ checked: checked });
	                    return false;
	                }
	            });

	            if (stateChanged) {
	                this._raiseEvent('6', { element: element, checked: checked });
	                this._updateInputSelection();
	            }
	            if (owner == undefined) {
	                if (treeItem) {
	                    if (this.hasThreeStates) {
	                        this.checkItems(treeItem, treeItem);
	                    }
	                }
	            }
	        },

	        uncheckItem: function (element) {
	            this.checkItem(element, false);
	        },

	        // enables a tree item.
	        // @param element
	        enableItem: function (element) {
	            if (element == null)
	                return false;

	            if (element.treeInstance != undefined) element = element.element;

	            var me = this;
	            $.each(me.items, function () {
	                var item = this;
	                if (item.element == element) {
	                    item.disabled = false;
	                    $(item.titleElement).removeClass(me.toThemeProperty('jqx-fill-state-disabled'));
	                    $(item.titleElement).removeClass(me.toThemeProperty('jqx-tree-item-disabled'));
	                    if (me.checkboxes && item.checkBoxElement) {
	                        $(item.checkBoxElement).jqxCheckBox({ disabled: false });
	                    }
	                    return false;
	                }
	            });
	        },

	        // enables all items.
	        enableAll: function () {
	            var me = this;
	            $.each(me.items, function () {
	                var item = this;
	                item.disabled = false;
	                $(item.titleElement).removeClass(me.toThemeProperty('jqx-tree-item-disabled'));
	                $(item.titleElement).removeClass(me.toThemeProperty('jqx-fill-state-disabled'));
	                if (me.checkboxes && item.checkBoxElement) {
	                    $(item.checkBoxElement).jqxCheckBox({ disabled: false });
	                }
	            });
	        },

	        // locks a tree item.
	        // @param element
	        lockItem: function (element) {
	            if (element == null)
	                return false;

	            var me = this;
	            $.each(me.items, function () {
	                var item = this;
	                if (item.element == element) {
	                    item.locked = true;
	                    return false;
	                }
	            });
	        },

	        // unlocks a tree item.
	        // @param element
	        unlockItem: function (element) {
	            if (element == null)
	                return false;

	            var me = this;
	            $.each(me.items, function () {
	                var item = this;
	                if (item.element == element) {
	                    item.locked = false;
	                    return false;
	                }
	            });
	        },

	        // gets all tree items.
	        getItems: function () {
	            return this.items;
	        },

	        // gets item's instance.
	        getItem: function (element) {
	            if (element == null || element == undefined)
	                return null;

	            if (this.itemMapping["id" + element.id]) {
	                var item = this.itemMapping["id" + element.id].item;
	                return item;
	            }

	            return null;
	        },

	        // gets whether the element is expanded.
	        isExpanded: function (element) {
	            if (element == null || element == undefined)
	                return false;

	            var item = this.itemMapping["id" + element.id].item;
	            if (item != null) {
	                return item.isExpanded;
	            }

	            return false;
	        },

	        // gets whether the element is selected.
	        isSelected: function (element) {
	            if (element == null || element == undefined)
	                return false;

	            var item = this.itemMapping["id" + element.id].item;
	            if (item != null) {
	                return item == this.selectedItem;
	            }

	            return false;
	        },

	        getPrevItem: function (element) {
	            var item = this.getItem(element);
	            if (element.treeInstance != undefined) item = element;
	            var prevItem = this._prevVisibleItem(item);
	            return prevItem;
	        },

	        getNextItem: function (element) {
	            var item = this.getItem(element);
	            if (element.treeInstance != undefined) item = element;

	            var nextItem = this._nextVisibleItem(item);
	            return nextItem;
	        },

	        getSelectedItem: function (element) {
	            return this.selectedItem;
	        },

	        val: function (value) {
	            if (arguments.length == 0 || typeof (value) == "object") {
	                return this.selectedItem;
	            }
	            if (typeof value == "string") {
	                var element = this.host.find("#" + value);
	                if (element.length > 0) {
	                    var item = this.getItem(element[0]);
	                    this.selectItem(item);
	                }
	            }
	            else {
	                var item = this.getItem(value);
	                this.selectItem(item);
	            }
	        },

	        getActiveDescendant: function()
	        {
	            if (this.selectedItem) {
	                return this.selectedItem.element.id;
	            }
	            return "";
	        },

	        clearSelection: function()
	        {
	            this.selectItem(null);
	        },

	        // selects an item.
	        // @param element
	        selectItem: function (element) {
	            if (this.disabled)
	                return;

	            var me = this;

	            if (element && element.treeInstance != undefined) element = element.element;

	            if (element == null || element == undefined) {
	                if (me.selectedItem != null) {
	                    $(me.selectedItem.titleElement).removeClass(me.toThemeProperty('jqx-fill-state-pressed'));
	                    $(me.selectedItem.titleElement).removeClass(me.toThemeProperty('jqx-tree-item-selected'));
	                    me.selectedItem = null;
	                }
	                return;
	            }

	            if (this.selectedItem != null && this.selectedItem.element == element)
	                return;

	            var oldSelectedElement = this.selectedItem != null ? this.selectedItem.element : null;
	            if (oldSelectedElement) {
	                $(oldSelectedElement).removeAttr('aria-selected');
	            }

	            $.each(me.items, function () {
	                var item = this;
	                if (!item.disabled) {
	                    if (item.element == element) {
	                        if (me.selectedItem == null || (me.selectedItem != null && me.selectedItem.titleElement != item.titleElement)) {
	                            if (me.selectedItem != null) {
	                                $(me.selectedItem.titleElement).removeClass(me.toThemeProperty('jqx-fill-state-pressed'));
	                                $(me.selectedItem.titleElement).removeClass(me.toThemeProperty('jqx-tree-item-selected'));
	                            }

	                            $(item.titleElement).addClass(me.toThemeProperty('jqx-fill-state-pressed'));
	                            $(item.titleElement).addClass(me.toThemeProperty('jqx-tree-item-selected'));
	                            me.selectedItem = item;
	                            $(item.element).attr('aria-selected', 'true');
	                            $.jqx.aria(me, "aria-activedescendant", item.element.id);
	                        }
	                    }
	                }
	            });
	            this._updateInputSelection();
	            this._raiseEvent('2', { element: element, prevElement: oldSelectedElement });
	        },

	        // collapses all items.
	        collapseAll: function () {
	            this.isUpdating = true;
	            var me = this;
	            var items = me.items;
	            var tmp = this.animationHideDuration;
	            this.animationHideDuration = 0;
	            $.each(items, function () {
	                var item = this;
	                if (item.isExpanded == true) {
	                    me._collapseItem(me, item);
	                }
	            });
	            setTimeout(function () {
	                me.isUpdating = false;
	                me._calculateWidth();
	            }, this.animationHideDuration);
	            this.animationHideDuration = tmp;
	        },

	        // expands all items.
	        expandAll: function () {
	            var me = this;
	            this.isUpdating = true;
	            var tmp = this.animationShowDuration;
	            this.animationShowDuration = 0;
	            $.each(this.items, function () {
	                var item = this;
	                if (item.hasItems) {
	                    me._expandItem(me, item);
	                }
	            });
	          
	            setTimeout(function () {
	                me.isUpdating = false;
	                me._calculateWidth();
	            }, this.animationShowDuration);
	            this.animationShowDuration = tmp;
	        },

	        //  @param element
	        //  expands a tree item by its html element.
	        collapseItem: function (element) {
	            if (element == null)
	                return false;

	            if (element.treeInstance != undefined) element = element.element;

	            var me = this;
	            $.each(this.items, function () {
	                var item = this;
	                if (item.isExpanded == true && item.element == element) {
	                    me._collapseItem(me, item);
	                    return false;
	                }
	            });

	            return true;
	        },

	        // @param element
	        // expands a tree item by its html element.
	        expandItem: function (element) {
	            if (element == null)
	                return false;

	            if (element.treeInstance != undefined) element = element.element;

	            var me = this;
	            $.each(me.items, function () {
	                var item = this;

	                if (item.isExpanded == false && item.element == element && !item.disabled && !item.locked) {
	                    me._expandItem(me, item);
	                    if (item.parentElement) {
	                        me.expandItem(item.parentElement);
	                    }
	                }
	            });

	            return true;
	        },

	        _getClosedSubtreeOffset: function (item) {
	            var $subtree = $(item.subtreeElement);
	            var top = -$subtree.outerHeight();
	            var left = -$subtree.outerWidth();
	            left = 0;
	            return { left: left, top: top };
	        },

	        _collapseItem: function (me, item, subs, force) {
	            if (me == null || item == null)
	                return false;

	            if (item.disabled)
	                return false;

	            if (me.disabled)
	                return false;

	            if (me.locked)
	                return false;

	            var $subtree = $(item.subtreeElement);

	            var subtreeOffset = this._getClosedSubtreeOffset(item);
	            var top = subtreeOffset.top;
	            var left = subtreeOffset.left;

	            $treeElement = $(item.element);
	            var delay = me.animationHideDelay;
	            delay = 0;

	            if ($subtree.data('timer').show != null) {
	                clearTimeout($subtree.data('timer').show);
	                $subtree.data('timer').show = null;
	            }

	            var hideFunc = function () {
	                item.isExpanded = false;

	                if (me.checkboxes) {
	                    var checkboxes = $subtree.find('.chkbox');
	                    checkboxes.stop();
	                    checkboxes.css('opacity', 1);
	                    $subtree.find('.chkbox').animate({ opacity: 0 }, 50);
	                }
	                var $arrowSpan = $(item.arrow);
	                me._arrowStyle($arrowSpan, "", item.isExpanded);

	                $subtree.slideUp(me.animationHideDuration, function () {
	                    item.isCollapsing = false;
	                    me._calculateWidth();
	                    var $arrowSpan = $(item.arrow);
	                    me._arrowStyle($arrowSpan, "", item.isExpanded);
	                    $subtree.hide();
	                    me._raiseEvent('1', { element: item.element });
	                })
	            }

	            if (delay > 0) {
	                $subtree.data('timer').hide = setTimeout(function () {
	                    hideFunc();
	                }, delay);
	            }
	            else {
	                hideFunc();
	            }
	        },

	        _expandItem: function (me, item) {
	            if (me == null || item == null)
	                return false;

	            if (item.isExpanded)
	                return false;

	            if (item.locked)
	                return false;

	            if (item.disabled)
	                return false;

	            if (me.disabled)
	                return false;

	            var $subtree = $(item.subtreeElement);
	            // stop hiding process.
	            if (($subtree.data('timer')) != null && $subtree.data('timer').hide != null) {
	                clearTimeout($subtree.data('timer').hide);
	            }

	            var $treeElement = $(item.element);

	            var top = 0;
	            var left = 0;

	            if (parseInt($subtree.css('top')) == top) {
	                item.isExpanded = true;
	                return;
	            }

	            var $arrowSpan = $(item.arrow);
	            me._arrowStyle($arrowSpan, "", item.isExpanded);


	            if (me.checkboxes) {
	                var checkboxes = $subtree.find('.chkbox');
	                checkboxes.stop();
	                checkboxes.css('opacity', 0);
	                checkboxes.animate({ opacity: 1 }, me.animationShowDuration);
	            }

	            $subtree.slideDown(me.animationShowDuration, me.easing,
	                        function () {
	                            var $arrowSpan = $(item.arrow);
	                            item.isExpanded = true;
	                            me._arrowStyle($arrowSpan, "", item.isExpanded);
	                            item.isExpanding = false;
	                            me._raiseEvent('0', { element: item.element });
	                            me._calculateWidth();
	                        }) //animate subtree into view         
	            //     }, 0);

	            if (me.checkboxes) {
	                me._updateCheckItemLayout(item);
	                if (item.subtreeElement) {
	                    var listTags = $(item.subtreeElement).find('li');
	                    $.each(listTags, function () {
	                        var subItem = me.getItem(this);
	                        if (subItem != null) {
	                            me._updateCheckItemLayout(subItem);
	                        }
	                    });
	                }
	            }
	        },

	        _calculateWidth: function () {
	            var me = this;
	            var checkboxOffset = this.checkboxes ? 20 : 0;
	            var maxWidth = 0;

	            if (this.isUpdating)
	                return;

	            $.each(this.items, function () {
	                var height = $(this.element).height();
	                if (height != 0) {
	                    var titleWidth = this.titleElement.outerWidth() + 10 + checkboxOffset + (1 + this.level) * 20;
	                    maxWidth = Math.max(maxWidth, titleWidth);
	                    if (this.hasItems) {
	                        var paddingOffset = parseInt($(this.titleElement).css('padding-top'));
	                        if (isNaN(paddingOffset)) {
	                            paddingOffset = 0;
	                        }

	                        paddingOffset = paddingOffset * 2;
	                        paddingOffset += 2;

	                        var offset = (paddingOffset + $(this.titleElement).height()) / 2 - 17 / 2;
	                        if ($.jqx.browser.msie && $.jqx.browser.version < 9) {
	                            $(this.arrow).css('margin-top', '3px');
	                        }
	                        else {
	                            if (parseInt(offset) >= 0) {
	                                $(this.arrow).css('margin-top', parseInt(offset) + 'px');
	                            }
	                        }
	                    }
	                }
	            });

	            if (this.toggleIndicatorSize > 16) {
	                maxWidth = maxWidth + this.toggleIndicatorSize - 16;
	            }

	            if (me.panel) {
	                if (maxWidth > this.host.width()) {
	                    var scrollWidth = maxWidth - this.host.width();
	                    var vScrollOffset = me.panel.jqxPanel('vScrollBar').css('visibility') !== "hidden" ? 10 : 0;
	                    scrollWidth += vScrollOffset;
	                    me.panel.jqxPanel({ horizontalScrollBarMax: scrollWidth });
	                }
	                else {
	                    me.panel.jqxPanel({ horizontalScrollBarMax: 0 });
	                }
	            }

	            this.host.find('ul:first').width(maxWidth);
	            var minWidth = this.host.width() - 30;
	            if (minWidth > 0) {
	                this.host.find('ul:first').css('min-width', minWidth);
	            }
	            if (me.panel) {
	                me.panel.jqxPanel('_arrange');
	            }
	        },

	        _arrowStyle: function ($arrowSpan, uiState, expanded) {
	            var me = this;
	            if ($arrowSpan.length > 0) {
	                $arrowSpan.removeClass();
	                var state = "";
	                if (uiState == 'hover') state = "-" + uiState;
	                var expandState = expanded ? "-expand" : "-collapse";
	                var className = 'jqx-tree-item-arrow' + expandState + state;
	                $arrowSpan.addClass(me.toThemeProperty(className));
	                if (!this.rtl) {
	                    var expandState = !expanded ? "-right" : "-down";

	                    $arrowSpan.addClass(me.toThemeProperty('jqx-icon-arrow' + expandState + ''));
	                }

	                if (this.rtl) {
	                    $arrowSpan.addClass(me.toThemeProperty(className + '-rtl'));
	                    var expandState = !expanded ? "-left" : "-down";

	                    $arrowSpan.addClass(me.toThemeProperty('jqx-icon-arrow' + expandState + ''));
	                }
	            }
	        },

	        _initialize: function (mode, oldmode) {
	            var me = this;
	            var maxHeight = 0;
	            this.host.addClass(me.toThemeProperty('jqx-widget'));
	            this.host.addClass(me.toThemeProperty('jqx-widget-content'));
	            this.host.addClass(me.toThemeProperty('jqx-tree'));
	            this._updateDisabledState();

	            var ie7 = $.jqx.browser.msie && $.jqx.browser.version < 8;
	            $.each(this.items, function () {
	                var item = this;
	                $element = $(item.element);
	                var $arrowSpan = null;

	                if (me.checkboxes && !item.hasItems && item.checkBoxElement) {
	                    $(item.checkBoxElement).css('margin-left', '0px');
	                }

	                if (!ie7) {
	                    if (!item.hasItems) {
	                        if (!me.rtl) {
	                            item.element.style.marginLeft = parseInt(me.toggleIndicatorSize) + 'px';
	                        }
	                        else {
	                            item.element.style.marginRight = parseInt(me.toggleIndicatorSize) + 'px';
	                        }
	                        var oldArrow = $(item.arrow);
	                        if (oldArrow.length > 0) {
	                            oldArrow.remove();
	                            item.arrow = null;
	                        }
	                        return true;
	                    }
	                    else item.element.style.marginLeft = '0px';
	                }
	                else {
	                    if (!item.hasItems && $(item.element).find('ul').length > 0) {
	                        $(item.element).find('ul').remove();
	                    }
	                }

	                var oldArrow = $(item.arrow);
	                if (oldArrow.length > 0) {
	                    oldArrow.remove();
	                }

	                $arrowSpan = $('<span style="height: 17px; border: none; background-color: transparent;" id="arrow' + $element[0].id + '"></span>');
	                $arrowSpan.prependTo($element);
	                if (!me.rtl) {
	                    $arrowSpan.css('float', 'left');
	                }
	                else {
	                    $arrowSpan.css('float', 'right');
	                }
	                $arrowSpan.css('clear', 'both');

	                $arrowSpan.width(me.toggleIndicatorSize);
	                me._arrowStyle($arrowSpan, "", item.isExpanded);

	                var paddingOffset = parseInt($(this.titleElement).css('padding-top'));
	                if (isNaN(paddingOffset)) {
	                    paddingOffset = 0;
	                }

	                paddingOffset = paddingOffset * 2;
	                paddingOffset += 2;

	                var offset = (paddingOffset + $(this.titleElement).height()) / 2 - 17 / 2;
	                if ($.jqx.browser.msie && $.jqx.browser.version < 9) {
	                    $arrowSpan.css('margin-top', '3px');
	                }
	                else {
	                    if (parseInt(offset) >= 0) {
	                        $arrowSpan.css('margin-top', parseInt(offset) + 'px');
	                    }
	                }
	                $element.addClass(me.toThemeProperty('jqx-disableselect'));
	                $arrowSpan.addClass(me.toThemeProperty('jqx-disableselect'));

	                var eventName = 'click';
	                var isTouchDevice = me.isTouchDevice();
	                if (isTouchDevice) {
	                    eventName = $.jqx.mobile.getTouchEventName('touchend');
	                }
	                me.addHandler($arrowSpan, eventName, function () {
	                    if (!item.isExpanded) {
	                        me._expandItem(me, item);
	                    }
	                    else {
	                        me._collapseItem(me, item);
	                    }

	                    return false;
	                });

	                me.addHandler($arrowSpan, 'selectstart', function () {
	                    return false;
	                });

	                me.addHandler($arrowSpan, 'mouseup', function () {
	                    if (!isTouchDevice) {
	                        return false;
	                    }
	                });

	                item.hasItems = $(item.element).find('li').length > 0;

	                item.arrow = $arrowSpan[0];
	                if (!item.hasItems) {
	                    $arrowSpan.css('visibility', 'hidden');
	                }

	                $element.css('float', 'none');
	            });
	        },

	        _getOffset: function (object) {
	            var scrollTop = $(window).scrollTop();
	            var scrollLeft = $(window).scrollLeft();
	            var isSafari = $.jqx.mobile.isSafariMobileBrowser();
	            var offset = $(object).offset();
	            var top = offset.top;
	            var left = offset.left;
	            if (isSafari != null && isSafari) {
	                return { left: left - scrollLeft, top: top - scrollTop };
	            }
	            else return $(object).offset();
	        },

	        _renderHover: function ($treeElement, item, isTouchDevice) {
	            var me = this;
	            if (!isTouchDevice) {
	                var $titleElement = $(item.titleElement);
	                me.addHandler($titleElement, 'mouseenter', function () {
	                    if (!item.disabled && me.enableHover && !me.disabled) {
	                        $titleElement.addClass(me.toThemeProperty('jqx-fill-state-hover'));
	                        $titleElement.addClass(me.toThemeProperty('jqx-tree-item-hover'));
	                    }
	                });
	                me.addHandler($titleElement, 'mouseleave', function () {
	                    if (!item.disabled && me.enableHover && !me.disabled) {
	                        $titleElement.removeClass(me.toThemeProperty('jqx-fill-state-hover'));
	                        $titleElement.removeClass(me.toThemeProperty('jqx-tree-item-hover'));
	                    }
	                });
	            }
	        },

	        _updateDisabledState: function () {
	            if (this.disabled) {
	                this.host.addClass(this.toThemeProperty('jqx-fill-state-disabled'));
	            }
	            else {
	                this.host.removeClass(this.toThemeProperty('jqx-fill-state-disabled'));
	            }
	        },

	        _addInput: function () {
	            if (this.input == null) {
	                var name = this.host.attr('name');
	                if (!name) name = this.element.id;
	                else {
	                    this.host.attr('name', "");
	                }

	                this.input = $("<input type='hidden'/>");
	                this.host.append(this.input);
	                this.input.attr('name', name);
	                this._updateInputSelection();
	            }
	        },

	        render: function () {
	            this._updateItemsNavigation();
	            this._render();
	        },

	        _render: function (updateEvents, updateDrag) {
	            if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
	                var me = this;
	                $.each(this.items, function () {
	                    var $element = $(this.element);
	                    var $parent = $element.parent();
	                    var totalWidth = parseInt(this.titleElement.css('margin-left')) + this.titleElement[0].scrollWidth + 13;

	                    $element.css('min-width', totalWidth);

	                    var parentWidth = parseInt($parent.css('min-width'));
	                    if (isNaN(parentWidth)) parentWidth = 0;
	                    var elementMinWidth = $element.css('min-width');

	                    if (parentWidth < parseInt($element.css('min-width'))) {
	                        $parent.css('min-width', elementMinWidth);
	                    }
	                    this.titleElement[0].style.width = null;
	                });
	            }

	            var zIndex = 1000;
	            var popupElementoffset = [5, 5];
	            var me = this;
	            $.data(me.element, 'animationHideDelay', me.animationHideDelay);
	            $.data(document.body, 'treeel', this);
	            this._initialize();

	            var isTouchDevice = this.isTouchDevice();
	            if (isTouchDevice && this.toggleMode == 'dblclick') {
	                this.toggleMode = 'click';
	            }

	            if (updateEvents == undefined || updateEvents == true) {
	                $.each(this.items, function () {
	                    me._updateItemEvents(me, this);
	                });
	            }
	            if (this.allowDrag && this._enableDragDrop && (updateDrag == undefined || updateDrag == true)) {
	                this._enableDragDrop();
	            }
	            this._addInput();
	            // add panel.
	            if (this.host.jqxPanel) {
	                if (this.host.find('#panel' + this.element.id).length > 0) {
	                    this.panel.jqxPanel({ touchMode: this.touchMode });
	                    this.panel.jqxPanel('refresh');
	                    return;
	                }

	                this.host.find('ul:first').wrap('<div style="background-color: transparent; overflow: hidden; width: 100%; height: 100%;" id="panel' + this.element.id + '"></div>');
	                var panel = this.host.find('div:first');
	                var sizeMode = 'fixed';

	                if (this.height == null || this.height == 'auto') {
	                    sizeMode = 'verticalwrap';
	                }
	                if (this.width == null || this.width == 'auto') {
	                    if (sizeMode == 'fixed') {
	                        sizeMode = 'horizontalwrap';
	                    }
	                    else sizeMode = 'wrap';
	                }

	                panel.jqxPanel({ rtl: this.rtl, theme: this.theme, width: '100%', height: '100%', touchMode: this.touchMode, sizeMode: sizeMode });
	                if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
	                    panel.jqxPanel('content').css('left', '0px');
	                }
	                panel.data({ nestedWidget: true });
	                if (this.height == null || (this.height != null && this.height.toString().indexOf('%') != -1)) {
	                    if (this.isTouchDevice()) {
	                        this.removeHandler(panel, $.jqx.mobile.getTouchEventName('touchend') + '.touchScroll touchcancel.touchScroll');
	                        this.removeHandler(panel, $.jqx.mobile.getTouchEventName('touchmove') + '.touchScroll');
	                        this.removeHandler(panel, $.jqx.mobile.getTouchEventName('touchstart') + '.touchScroll');
	                    }
	                }

	                var panelInstance = $.data(panel[0], 'jqxPanel').instance;
	                if (panelInstance != null) {
	                    this.vScrollInstance = panelInstance.vScrollInstance;
	                    this.hScrollInstance = panelInstance.hScrollInstance;
	                }
	                this.panelInstance = panelInstance;
	                if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
	                    this.host.attr('hideFocus', true);
	                    this.host.find('div').attr('hideFocus', true);
	                    this.host.find('ul').attr('hideFocus', true);
	                }

	                panel[0].className = '';
	                this.panel = panel;
	            }
	            this._raiseEvent('3', this);
	        },

	        focus: function () {
	            try {
	                this.host.focus();

	            }
	            catch (error) {
	            }
	        },

	        _updateItemEvents: function (me, item) {
	            var isTouchDevice = this.isTouchDevice();
	            if (isTouchDevice) {
	                this.toggleMode = $.jqx.mobile.getTouchEventName('touchend');
	            }

	            var $treeElement = $(item.element);

	            if (me.enableRoundedCorners) {
	                $treeElement.addClass(me.toThemeProperty('jqx-rc-all'));
	            }

	            var checkEventName = !isTouchDevice ? 'mousedown' : $.jqx.mobile.getTouchEventName('touchend');
	            if (me.touchMode === true) {
	                me.removeHandler($(item.checkBoxElement), 'mousedown');
	            }
	            me.removeHandler($(item.checkBoxElement), checkEventName);
	            me.addHandler($(item.checkBoxElement), checkEventName, function (event) {
	                if (!me.disabled) {
	                    if (!this.treeItem.disabled) {
	                        this.treeItem.checked = !this.treeItem.checked;
	                        me.checkItem(this.treeItem.element, this.treeItem.checked, 'tree');
	                        if (me.hasThreeStates) {
	                            me.checkItems(this.treeItem, this.treeItem);
	                        }
	                    }
	                }
	                return false;
	            });

	            var $titleElement = $(item.titleElement);

	            me.removeHandler($treeElement);

	            var drag = this.allowDrag && this._enableDragDrop;
	            if (!drag) {
	                me.removeHandler($titleElement);
	            }
	            else {
	                me.removeHandler($titleElement, 'mousedown.item');
	                me.removeHandler($titleElement, 'click');
	                me.removeHandler($titleElement, 'dblclick');
	                me.removeHandler($titleElement, 'mouseenter');
	                me.removeHandler($titleElement, 'mouseleave');
	            }

	            me._renderHover($treeElement, item, isTouchDevice);
	            var $subtree = $(item.subtreeElement);
	            if ($subtree.length > 0) {
	                var display = item.isExpanded ? 'block' : 'none';
	                $subtree.css({ overflow: 'hidden', display: display })
	                $subtree.data('timer', {});
	            }

	            me.addHandler($titleElement, 'selectstart', function (event) {
	                return false;
	            });

	            if ($.jqx.browser.opera) {
	                me.addHandler($titleElement, 'mousedown.item', function (event) {
	                    return false;
	                });
	            }

	            if (me.toggleMode != 'click') {
	                me.addHandler($titleElement, 'click', function (event) {
	                    me.selectItem(item.element);

	                    if (me.panel != null) {
	                        me.panel.jqxPanel({ focused: true });
	                    }
	                    $titleElement.focus();
	                });
	            }

	            me.addHandler($titleElement, me.toggleMode, function (event) {
	                if ($subtree.length > 0) {
	                    clearTimeout($subtree.data('timer').hide)
	                }

	                if (me.panel != null) {
	                    me.panel.jqxPanel({ focused: true });
	                }

	                me.selectItem(item.element);
	                if (item.isExpanding == undefined)
	                    item.isExpanding = false;
	                if (item.isCollapsing == undefined)
	                    item.isCollapsing = false;

	                if ($subtree.length > 0) {
	                    if (!item.isExpanded) {
	                        if (false == item.isExpanding) {
	                            item.isExpanding = true;
	                            me._expandItem(me, item);
	                        }
	                    }
	                    else {
	                        if (false == item.isCollapsing) {
	                            item.isCollapsing = true;
	                            me._collapseItem(me, item, true);
	                        }
	                    }
	                    return false;
	                }
	            });
	        },

	        isTouchDevice: function () {
	            if (this._isTouchDevice != undefined) return this._isTouchDevice;
	            var isTouchDevice = $.jqx.mobile.isTouchDevice();
	            if (this.touchMode == true) {
	                isTouchDevice = true;
	            }
	            else if (this.touchMode == false) {
	                isTouchDevice = false;
	            }
	            this._isTouchDevice = isTouchDevice;
	            return isTouchDevice;
	        },

	        createID: function () {
	            return $.jqx.utilities.createId();
	        },

	        // creates the tree.
	        createTree: function (uiObject) {
	            if (uiObject == null)
	                return;

	            var self = this;
	            var liTags = $(uiObject).find('li');
	            var k = 0;

	            this.items = new Array();

	            this.itemMapping = new Array();
	            $(uiObject).addClass(self.toThemeProperty('jqx-tree-dropdown-root'));
	            if (this.rtl) {
	                $(uiObject).addClass(self.toThemeProperty('jqx-tree-dropdown-root-rtl'));
	            }
	          
	            if (this.rtl || $.jqx.browser.msie && $.jqx.browser.version < 8) {
	                this._measureItem = $("<span style='position: relative; visibility: hidden;'></span>");
	                this._measureItem.addClass(this.toThemeProperty('jqx-widget'));
	                this._measureItem.addClass(this.toThemeProperty('jqx-fill-state-normal'));
	                this._measureItem.addClass(this.toThemeProperty('jqx-tree-item'));
	                this._measureItem.addClass(this.toThemeProperty('jqx-item'));
	                $(document.body).append(this._measureItem);
	            }
	            if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
	   //             $(uiObject).css('position', 'relative');
	    //            $(uiObject).css('left', '-40px');
	            }

	            for (var index = 0; index < liTags.length; index++) {
	                this._createItem(liTags[index]);
	            }

	            if (this.rtl || $.jqx.browser.msie && $.jqx.browser.version < 8) {
	                this._measureItem.remove();
	            }

	            this._updateItemsNavigation();
	            this._updateCheckStates();
	        },

	        _updateCheckLayout: function (level) {
	            var me = this;
	            if (!this.checkboxes) return;

	            $.each(this.items, function () {
	                if (this.level == level || level == undefined) {
	                    me._updateCheckItemLayout(this);
	                }
	            });
	        },

	        _updateCheckItemLayout: function (item) {
	            if (this.checkboxes) {
	                if ($(item.titleElement).css('display') != 'none') {
	                    var checkbox = $(item.checkBoxElement);
	                    var offset = $(item.titleElement).outerHeight() / 2 - 1 - parseInt(this.checkSize) / 2;
	                    checkbox.css('margin-top', offset);
	                    if (!this.rtl) {
	                        if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
	                            item.titleElement.css('margin-left', parseInt(this.checkSize) + 25);
	                        }
	                        else {
	                            if (item.hasItems) {
	                                checkbox.css('margin-left', this.toggleIndicatorSize);
	                            }
	                        }
	                    }
	                }
	            }
	        },

	        _updateCheckStates: function () {
	            var me = this;
	            if (me.hasThreeStates) {
	                $.each(this.items, function () {
	                    me._updateCheckState(this);
	                });
	            }
	            else {
	                $.each(this.items, function () {
	                    if (this.checked == null) {
	                        me.checkItem(this.element, false, 'tree');
	                    }
	                });
	            }
	        },

	        _updateCheckState: function (item) {
	            if (item == null || item == undefined)
	                return;
	            var me = this;
	            var count = 0;
	            var hasIndeterminate = false;
	            var itemsCount = 0;

	            var childItems = $(item.element).find('li');
	            itemsCount = childItems.length;

	            if (item.checked && itemsCount > 0) {
	                $.each(childItems, function (index) {
	                    var child = me.itemMapping["id" + this.id].item;
	                    var checked = child.element.getAttribute('item-checked');
	                    if (checked == undefined || checked == null || checked == 'true' || checked == true) {
	                        me.checkItem(child.element, true, 'tree');
	                    }
	                });
	            }

	            $.each(childItems, function (index) {
	                var child = me.itemMapping["id" + this.id].item;
	                if (child.checked != false) {
	                    if (child.checked == null) {
	                        hasIndeterminate = true;
	                    }
	                    count++;
	                }
	            });

	            if (itemsCount > 0) {
	                if (count == itemsCount) {
	                    this.checkItem(item.element, true, 'tree');
	                }
	                else {
	                    if (count > 0) {
	                        this.checkItem(item.element, null, 'tree');
	                    }
	                    else this.checkItem(item.element, false, 'tree');
	                }
	            }
	        },

	        _updateItemsNavigation: function () {
	            var innerElement = this.host.find('ul:first');
	            var liTags = $(innerElement).find('li');
	            var k = 0;
	            for (var i = 0; i < liTags.length; i++) {
	                var listTag = liTags[i];
	                if (this.itemMapping["id" + listTag.id]) {
	                    var treeItem = this.itemMapping["id" + listTag.id].item;
	                    if (!treeItem)
	                        continue;

	                    treeItem.prevItem = null;
	                    treeItem.nextItem = null;
	                    if (i > 0) {
	                        if (this.itemMapping["id" + liTags[i - 1].id]) {
	                            treeItem.prevItem = this.itemMapping["id" + liTags[i - 1].id].item;
	                        }
	                    }

	                    if (i < liTags.length - 1) {
	                        if (this.itemMapping["id" + liTags[i + 1].id]) {
	                            treeItem.nextItem = this.itemMapping["id" + liTags[i + 1].id].item;
	                        }
	                    }
	                }
	            }
	        },

	        _applyTheme: function (oldTheme, newTheme) {
	            var me = this;
	            this.host.removeClass('jqx-tree-' + oldTheme);
	            this.host.removeClass('jqx-widget-' + oldTheme);
	            this.host.removeClass('jqx-widget-content-' + oldTheme);
	            this.host.addClass(me.toThemeProperty('jqx-tree'));
	            this.host.addClass(me.toThemeProperty('jqx-widget'));
	            var uiObject = this.host.find('ul:first');
	            $(uiObject).removeClass(me.toThemeProperty('jqx-tree-dropdown-root-' + oldTheme));
	            $(uiObject).addClass(me.toThemeProperty('jqx-tree-dropdown-root'));
	            if (this.rtl) {
	                $(uiObject).removeClass(me.toThemeProperty('jqx-tree-dropdown-root-rtl-' + oldTheme));
	                $(uiObject).addClass(me.toThemeProperty('jqx-tree-dropdown-root-rtl'));
	            }
	            var liTags = $(uiObject).find('li');
	            for (var index = 0; index < liTags.length; index++) {
	                var listTag = liTags[index];
	                $(listTag).children().each(function () {
	                    if (this.tagName == 'ul' || this.tagName == 'UL') {
	                        $(this).removeClass(me.toThemeProperty('jqx-tree-dropdown-' + oldTheme));
	                        $(this).addClass(me.toThemeProperty('jqx-tree-dropdown'));
	                        if (me.rtl) {
	                            $(this).removeClass(me.toThemeProperty('jqx-tree-dropdown-rtl-' + oldTheme));
	                            $(this).addClass(me.toThemeProperty('jqx-tree-dropdown-rtl'));
	                        }
	                        return false;
	                    }
	                });
	            }

	            $.each(this.items, function () {
	                var item = this;
	                var $treeElement = $(item.element);

	                $treeElement.removeClass(me.toThemeProperty('jqx-tree-item-li-' + oldTheme));
	                $treeElement.addClass(me.toThemeProperty('jqx-tree-item-li'));
	                if (this.rtl) {
	                    $treeElement.removeClass(me.toThemeProperty('jqx-tree-item-li-' + oldTheme));
	                    $treeElement.addClass(me.toThemeProperty('jqx-tree-item-li'));
	                }
	                $(item.titleElement).removeClass(me.toThemeProperty('jqx-tree-item-' + oldTheme));
	                $(item.titleElement).addClass(me.toThemeProperty('jqx-tree-item'));

	                $(item.titleElement).removeClass('jqx-item-' + oldTheme);
	                $(item.titleElement).addClass(me.toThemeProperty('jqx-item'));

	                var $arrowSpan = $(item.arrow);
	                if ($arrowSpan.length > 0) {
	                    me._arrowStyle($arrowSpan, "", item.isExpanded);
	                }

	                if (item.checkBoxElement) {
	                    $(item.checkBoxElement).jqxCheckBox({ theme: newTheme });
	                }
	                if (me.enableRoundedCorners) {
	                    $treeElement.removeClass('jqx-rc-all-' + oldTheme);
	                    $treeElement.addClass(me.toThemeProperty('jqx-rc-all'));
	                }
	            });

	            if (this.host.jqxPanel) {
	                this.panel.jqxPanel({ theme: newTheme });
	            }
	        },

	        _refreshMapping: function (updateEvents, tags) {
	            var liTags = this.host.find('li');
	            var itemMapping = new Array();

	            var newItems = new Array();
	            var storage = $.data(document.body, 'treeItemsStorage');
	            var me = this;
	            for (var index = 0; index < liTags.length; index++) {
	                var listTag = liTags[index];
	                var $listTag = $(listTag);
	                var item = storage[listTag.id];
	                if (item == null) {
	                    continue;
	                }
	                newItems[newItems.length] = item;
	                if (updateEvents == undefined || updateEvents == true) {
	                    this._updateItemEvents(this, item);
	                }
	                item.level = $listTag.parents('li').length;
	                item.treeInstance = this;
	                var parentElement = null;
	                var parentId = null;
	                if (item.titleElement[0].className.indexOf('jqx-fill-state-pressed') != -1) {
	                    $(item.titleElement).removeClass(me.toThemeProperty('jqx-fill-state-pressed'));
	                    $(item.titleElement).removeClass(me.toThemeProperty('jqx-tree-item-selected'));
	                }

	                var children = $listTag.children();
	                children.each(function () {
	                    if (this.tagName == 'ul' || this.tagName == 'UL') {
	                        item.subtreeElement = this;
	                        $(this).addClass(me.toThemeProperty('jqx-tree-dropdown'));
	                        if (me.rtl) {
	                            $(this).addClass(me.toThemeProperty('jqx-tree-dropdown-rtl'));
	                        }
	                        return false;
	                    }
	                });

	                var parents = $listTag.parents();
	                parents.each(function () {
	                    if ((this.tagName == 'li' || this.tagName == 'LI')) {
	                        parentId = this.id;
	                        parentElement = this;
	                        return false;
	                    }
	                });

	                item.parentElement = parentElement;
	                item.parentId = parentId;
	                item.hasItems = $(item.element).find('li').length > 0;

	                if (item != null) {
	                    itemMapping[index] = { element: listTag, item: item };
	                    itemMapping["id" + listTag.id] = itemMapping[index];
	                }
	            }

	            this.itemMapping = itemMapping;
	            this.items = newItems;
	        },

	        _createItem: function (element) {
	            if (element == null || element == undefined)
	                return;

	            var id = element.id;
	            if (!id) {
	                id = this.createID();
	            }

	            var listTag = element;
	            var $listTag = $(element);

	            listTag.id = id;

	            var treeItemsStorage = $.data(document.body, 'treeItemsStorage');
	            if (treeItemsStorage == undefined) {
	                treeItemsStorage = new Array();
	            }

	            var k = this.items.length;
	            this.items[k] = new $.jqx._jqxTree.jqxTreeItem();
	            this.treeElements[id] = this.items[k];
	            treeItemsStorage[listTag.id] = this.items[k];
	            $.data(document.body, 'treeItemsStorage', treeItemsStorage)
	            k = this.items.length;
	            var parentId = 0;
	            var me = this;
	            var parentElement = null;

	            $listTag.attr('role', 'treeitem');
	            $listTag.children().each(function () {
	                if (this.tagName == 'ul' || this.tagName == 'UL') {
	                    me.items[k - 1].subtreeElement = this;
	                    $(this).addClass(me.toThemeProperty('jqx-tree-dropdown'));
	                    if (me.rtl) {
	                        $(this).addClass(me.toThemeProperty('jqx-tree-dropdown-rtl'));
	                        $(this).css('clear', 'both');
	                    }
	                    return false;
	                }
	            });

	            $listTag.parents().each(function () {
	                if ((this.tagName == 'li' || this.tagName == 'LI')) {
	                    parentId = this.id;
	                    parentElement = this;
	                    return false;
	                }
	            });

	            var expanded = element.getAttribute('item-expanded');
	            if (expanded == null || expanded == undefined || (expanded != 'true' && expanded != true)) {
	                expanded = false;
	            }
	            else expanded = true;
	            listTag.removeAttribute('item-expanded');
	            var locked = element.getAttribute('item-locked');
	            if (locked == null || locked == undefined || (locked != 'true' && locked != true)) {
	                locked = false;
	            }
	            else locked = true;
	            listTag.removeAttribute('item-locked');

	            var selected = element.getAttribute('item-selected');
	            if (selected == null || selected == undefined || (selected != 'true' && selected != true)) {
	                selected = false;
	            }
	            else selected = true;
	            listTag.removeAttribute('item-selected');

	            var disabled = element.getAttribute('item-disabled');
	            if (disabled == null || disabled == undefined || (disabled != 'true' && disabled != true)) {
	                disabled = false;
	            }
	            else disabled = true;
	            listTag.removeAttribute('item-disabled');

	            var checked = element.getAttribute('item-checked');
	            if (checked == null || checked == undefined || (checked != 'true' && checked != true)) {
	                checked = false;
	            }
	            else checked = true;

	            var title = element.getAttribute('item-title');
	            if (title == null || title == undefined || (title != 'true' && title != true)) {
	                title = false;
	            }
	            listTag.removeAttribute('item-title');

	            var icon = element.getAttribute('item-icon');
	            var iconsize = element.getAttribute('item-iconsize');
	            var label = element.getAttribute('item-label');
	            var value = element.getAttribute('item-value');

	            listTag.removeAttribute('item-icon');
	            listTag.removeAttribute('item-iconsize');
	            listTag.removeAttribute('item-label');
	            listTag.removeAttribute('item-value');

	            var treeItem = this.items[k - 1];
	            treeItem.id = id;
	            if (treeItem.value == undefined) {
	                if (this._valueList && this._valueList[id]) {
	                    treeItem.value = this._valueList[id];
	                }
	                else {
	                    treeItem.value = value;
	                }
	            }
	            treeItem.icon = icon;
	            treeItem.iconsize = iconsize;
	            treeItem.parentId = parentId;
	            treeItem.disabled = disabled;
	            treeItem.parentElement = parentElement;
	            treeItem.element = element;
	            treeItem.locked = locked;
	            treeItem.selected = selected;
	            treeItem.checked = checked;
	            treeItem.isExpanded = expanded;
	            treeItem.treeInstance = this;

	            this.itemMapping[k - 1] = { element: listTag, item: treeItem };
	            this.itemMapping["id" + listTag.id] = this.itemMapping[k - 1];
	            var hasTitleAttribute = false;
	            var isSameLI = false;
	            hasTitleAttribute = false;
	            if (this.rtl) {
	                $(treeItem.element).css('float', 'right');
	                $(treeItem.element).css('clear', 'both');
	            }

	            if (!hasTitleAttribute || !isSameLI) {
	                if ($(listTag.firstChild).length > 0) {
	                    if (treeItem.icon) {
	                        var iconsize = treeItem.iconsize;
	                        if (!iconsize) iconsize = 16;

	                        var icon = $('<img width="' + iconsize + '" height="' + iconsize + '" style="float: left;" class="itemicon" src="' + treeItem.icon + '"/>');
	                        $(listTag).prepend(icon);
	                        icon.css('margin-right', '4px');
	                        if (this.rtl) {
	                            icon.css('margin-right', '0px');
	                            icon.css('margin-left', '4px');
	                            icon.css('float', 'right');
	                        }
	                    }

	                    var ulindex = listTag.innerHTML.indexOf('<ul');
	                    if (ulindex == -1) {
	                        ulindex = listTag.innerHTML.indexOf('<UL');
	                    }

	                    if (ulindex == -1) {
	                        treeItem.originalTitle = listTag.innerHTML;
	                        listTag.innerHTML = '<div style="display: inline-block;">' + listTag.innerHTML + '</div>';
	                        treeItem.titleElement = $($(listTag)[0].firstChild);
	                    }
	                    else {
	                        var listhtml = listTag.innerHTML.substring(0, ulindex);
	                        listhtml = $.trim(listhtml);
	                        treeItem.originalTitle = listhtml;
	                        listhtml = $('<div style="display: inline-block;">' + listhtml + '</div>');

	                        var ul = $(listTag).find('ul:first');
	                        ul.remove();
	                        listTag.innerHTML = "";
	                        $(listTag).prepend(listhtml);
	                        $(listTag).append(ul);

	                        treeItem.titleElement = listhtml;
	                        if (this.rtl) {
	                            listhtml.css('float', 'right');
	                        }
	                    }

	                    if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
	                        $($(listTag)[0].firstChild).css('display', 'inline-block');
	                        var removeMeasureItem = false;
	                        if (this._measureItem.parents().length == 0) {
	                            $(document.body).append(this._measureItem);
	                            removeMeasureItem = true;
	                        }
	                        this._measureItem.css('min-width', '20px');
	                        this._measureItem[0].innerHTML = ($(treeItem.titleElement).text());
	                        var width = this._measureItem.width();
	                        if (treeItem.icon) {
	                            width += 20;
	                        }
	                        if ($($(item.titleElement).find('img')).length > 0) {
	                            width += 20;
	                        }
	                        $($(listTag)[0].firstChild).css('max-width', width + 'px');
	                        if (removeMeasureItem) {
	                            this._measureItem.remove();
	                        }
	                    }
	                }
	                else {
	                    treeItem.originalTitle = "Item";
	                    $(listTag).append($('<span>Item</span>'));
	                    $(listTag.firstChild).wrap('<span/>');
	                    treeItem.titleElement = $(listTag)[0].firstChild;
	                    if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
	                        $(listTag.firstChild).css('display', 'inline-block');
	                    }
	                }
	            }

	            var $itemTitle = $(treeItem.titleElement);
	            var itemTitleClassName = this.toThemeProperty('jqx-rc-all');

	            if (this.allowDrag) {
	                $itemTitle.addClass('draggable');
	            }
	            if (label == null || label == undefined) {
	                label = treeItem.titleElement;
	                treeItem.label = $.trim($itemTitle.text());
	            }
	            else treeItem.label = label;

	            $(listTag).addClass(this.toThemeProperty('jqx-tree-item-li'));
	            if (this.rtl) {
	                $(listTag).addClass(this.toThemeProperty('jqx-tree-item-li-rtl'));
	            }
	            itemTitleClassName += " " + this.toThemeProperty('jqx-tree-item') + " " + this.toThemeProperty('jqx-item');
	            if (this.rtl) {
	                itemTitleClassName += " " + this.toThemeProperty('jqx-tree-item-rtl')
	            }

	            $itemTitle[0].className = $itemTitle[0].className + " " + itemTitleClassName;

	            treeItem.level = $(element).parents('li').length;

	            treeItem.hasItems = $(element).find('li').length > 0;
	            if (this.rtl && treeItem.parentElement) {
	                if (!this.checkboxes) {
	                    $itemTitle.css('margin-right', '5px');
	                }
	            }

	            if (this.checkboxes) {
	                if (this.host.jqxCheckBox) {
	                    var checkbox = $('<div style="position: absolute; width: 18px; height: 18px;" tabIndex=0 class="chkbox"/>');
	                    checkbox.width(parseInt(this.checkSize));
	                    checkbox.height(parseInt(this.checkSize));
	                    $(listTag).prepend(checkbox);

	                    if (this.rtl) {
	                        checkbox.css('float', 'right');
	                        checkbox.css('position', 'static');
	                    }

	                    checkbox.jqxCheckBox({ hasInput: false, checked: treeItem.checked, boxSize: this.checkSize, animationShowDelay: 0, animationHideDelay: 0, disabled: disabled, theme: this.theme });
	                    if (!this.rtl) {
	                        $itemTitle.css('margin-left', parseInt(this.checkSize) + 6);
	                    }
	                    else {
	                        var minMargin = 5;
	                        // if (treeItem.hasItems)
	                        //   minMargin = this.toggleIndicatorSize;
	                        if (treeItem.parentElement) {
	                            checkbox.css('margin-right', minMargin + 5 + 'px');
	                        }
	                        else {
	                            checkbox.css('margin-right', minMargin + 'px');
	                        }
	                    }

	                    treeItem.checkBoxElement = checkbox[0];
	                    checkbox[0].treeItem = treeItem;
	                    var offset = $itemTitle.outerHeight() / 2 - 1 - parseInt(this.checkSize) / 2;
	                    checkbox.css('margin-top', offset);
	                    if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
	                        $itemTitle.css('width', '1%');
	                        $itemTitle.css('margin-left', parseInt(this.checkSize) + 25);
	                    }
	                    else {
	                        if (treeItem.hasItems) {
	                            if (!this.rtl) {
	                                checkbox.css('margin-left', this.toggleIndicatorSize);
	                            }
	                        }
	                    }
	                }
	                else {
	                    throw new Error('jqxTree: Missing reference to jqxcheckbox.js.');
	                    return;
	                }
	            }
	            else {
	                if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
	                    $itemTitle.css('width', '1%');
	                }
	            }

	            if (disabled) {
	                this.disableItem(treeItem.element);
	            }

	            if (selected) {
	                this.selectItem(treeItem.element);
	            }

	            if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
	                $(listTag).css('margin', '0px');
	                $(listTag).css('padding', '0px');
	            }
	        },

	        destroy: function () {
	            this.removeHandler($(window), 'resize.jqxtree' + this.element.id);
	            this.host.removeClass();
	            if (this.isTouchDevice()) {
	                this.removeHandler(this.panel, $.jqx.mobile.getTouchEventName('touchend') + '.touchScroll touchcancel.touchScroll');
	                this.removeHandler(this.panel, $.jqx.mobile.getTouchEventName('touchmove') + '.touchScroll');
	                this.removeHandler(this.panel, $.jqx.mobile.getTouchEventName('touchstart') + '.touchScroll');
	            }
	            var me = this;
	            var isTouchDevice = this.isTouchDevice();
	            $.each(this.items, function () {
	                var item = this;
	                var $treeElement = $(this.element);
	                var checkEventName = !isTouchDevice ? 'click' : $.jqx.mobile.getTouchEventName('touchend');
	                me.removeHandler($(item.checkBoxElement), checkEventName);
	                var $titleElement = $(item.titleElement);
	                me.removeHandler($treeElement);
	                var drag = me.allowDrag && me._enableDragDrop;
	                if (!drag) {
	                    me.removeHandler($titleElement);
	                }
	                else {
	                    me.removeHandler($titleElement, 'mousedown.item');
	                    me.removeHandler($titleElement, 'click');
	                    me.removeHandler($titleElement, 'dblclick');
	                    me.removeHandler($titleElement, 'mouseenter');
	                    me.removeHandler($titleElement, 'mouseleave');
	                }
	                $arrowSpan = $(item.arrow);
	                if ($arrowSpan.length > 0) {
	                    me.removeHandler($arrowSpan, checkEventName);
	                    me.removeHandler($arrowSpan, 'selectstart');
	                    me.removeHandler($arrowSpan, 'mouseup');

	                    if (!isTouchDevice) {
	                        me.removeHandler($arrowSpan, 'mouseenter');
	                        me.removeHandler($arrowSpan, 'mouseleave');
	                    }

	                    me.removeHandler($titleElement, 'selectstart');
	                }
	                if ($.jqx.browser.opera) {
	                    me.removeHandler($titleElement, 'mousedown.item');
	                }

	                if (me.toggleMode != 'click') {
	                    me.removeHandler($titleElement, 'click');
	                }

	                me.removeHandler($titleElement, me.toggleMode);
	            });
	            if (this.panel) {
	                this.panel.jqxPanel('destroy');
	                this.panel = null;
	            }
	            this.host.remove();
	        },

	        _raiseEvent: function (id, arg) {
	            if (arg == undefined)
	                arg = { owner: null };

	            var evt = this.events[id];
	            args = arg;
	            args.owner = this;

	            var event = new jQuery.Event(evt);
	            event.owner = this;
	            event.args = args;

	            var result = this.host.trigger(event);
	            return result;
	        },

	        propertyChangedHandler: function (object, key, oldvalue, value) {
	            if (this.isInitialized == undefined || this.isInitialized == false)
	                return;

	            if (key == 'submitCheckedItems') {
	                object._updateInputSelection();
	            }

	            if (key == 'disabled') {
	                object._updateDisabledState();
	            }

	            if (key == 'theme') {
	                object._applyTheme(oldvalue, value);
	            }

	            if (key == "keyboardNavigation") {
	                object.enableKeyboardNavigation = value;
	            }

	            if (key == 'width' || key == 'height') {
	                object.refresh();
	                object._initialize();
	                object._calculateWidth();

	                if (object.host.jqxPanel) {
	                    var sizeMode = 'fixed';
	                    if (this.height == null || this.height == 'auto') {
	                        sizeMode = 'verticalwrap';
	                    }
	                    if (this.width == null || this.width == 'auto') {
	                        if (sizeMode == 'fixed') {
	                            sizeMode = 'horizontalwrap';
	                        }
	                        else sizeMode = 'wrap';
	                    }

	                    object.panel.jqxPanel({ sizeMode: sizeMode });
	                }
	            }

	            if (key == 'touchMode') {
	                object._isTouchDevice = null;
	                if (value) {
	                    object.enableHover = false;
	                }
	                object._render();
	            }

	            if (key == 'source' || key == 'checkboxes') {
	                if (this.source != null) {
	                    var expandedItems = [];
	                    $.each(object.items, function () {
	                        if (this.isExpanded) {
	                            expandedItems[expandedItems.length] = { label: this.label, level: this.level };
	                        }
	                    });

	                    var html = object.loadItems(object.source);
	                    if (!object.host.jqxPanel) {
	                        object.element.innerHTML = html;
	                    }
	                    else {
	                        object.panel.jqxPanel('setcontent', html);
	                    }

	                    var disabled = object.disabled;
	                    var innerElement = object.host.find('ul:first');
	                    if (innerElement.length > 0) {
	                        object.createTree(innerElement[0]);
	                        object._render();
	                    }

	                    var me = object;
	                    var duration = me.animationShowDuration;
	                    me.animationShowDuration = 0;
	                    object.disabled = false;
	                    if (expandedItems.length > 0) {
	                        $.each(object.items, function () {
	                            for (var m = 0; m < expandedItems.length; m++) {
	                                if (expandedItems[m].label == this.label && expandedItems[m].level == this.level) {
	                                    var item = me.getItem(this.element);
	                                    me._expandItem(me, item);
	                                }
	                            }
	                        });
	                    }
	                    object.disabled = disabled;
	                    me.animationShowDuration = duration;
	                }
	            }

	            if (key == 'hasThreeStates') {
	                object._render();
	                object._updateCheckStates();
	            }

	            if (key == 'toggleIndicatorSize') {
	                object._updateCheckLayout();
	                object._render();
	            }
	        }
	    });
	})(jQuery);

	(function ($) {
	    $.jqx._jqxTree.jqxTreeItem = function(id, parentId, type) {
	        var treeItem =
	        {
	            // gets the item's label.
	            label: null,
	            // gets the id.
	    	    id: id,
	            // gets the parent id.
	            parentId: parentId,
	            // gets the parent element.
	            parentElement: null,
	            // gets the parent item instance.
	            parentItem: null,
	            // gets whether the item is disabled.
	            disabled: false,
	            // gets whether the item is selected.
	            selected: false,
	            // gets whether the item is locked.
	            locked: false,
	            // gets the checked state.
	            checked: false,
	            // gets the item's level.
	            level: 0,
	            // gets a value whether the item is opened.
	            isExpanded: false,
	            // has sub elements.
	            hasItems: false,
	            // li element
	            element: null,
	            // subtree element.
	            subtreeElement: null,
	            // checkbox element.
	            checkBoxElement: null,
	            // titleElement element.
	            titleElement: null,
	            // arrow element.
	            arrow: null,
	            // prev item.
	            prevItem: null,
	            // next item.
	            nextItem: null
	         }
	        return treeItem;
	    }; // 
	})(jQuery);

	/*
	jQWidgets v3.2.2 (2014-Mar-21)
	Copyright (c) 2011-2014 jQWidgets.
	License: http://jqwidgets.com/license/
	*/

	(function ($) {

	    $.jqx.jqxWidget("jqxCheckBox", "", {});

	    $.extend($.jqx._jqxCheckBox.prototype, {
	        defineInstance: function () {
	            // Type: Number
	            // Default: 250
	            // Gets or sets the delay of the fade animation when the CheckBox is going to be opened.
	            this.animationShowDelay = 300,
	            // Type: Number
	            // Default: 300
	            // Gets or sets the delay of the fade animation when the CheckBox is going to be closed. 
	             this.animationHideDelay = 300,
	            // Type: Number.
	            // Default: null.
	            // Sets the width.
	            this.width = null;
	            // Type: Number.
	            // Default: null.
	            // Sets the height.
	            this.height = null;
	            // Type: String
	            // Default: '13px'
	            // Gets or sets the checkbox's size.
	            this.boxSize = '13px';
	            // Type: Bool and Null
	            // Default: false
	            // Gets or sets the ckeck state.
	            // Possible Values: true, false and null.
	            this.checked = false;
	            // Type: Bool
	            // Default: false
	            // Gets or sets whether the checkbox has 3 states - checked, unchecked and indeterminate.
	            this.hasThreeStates = false;
	            // Type: Bool
	            // Default: false
	            // Gets whether the CheckBox is disabled.
	            this.disabled = false;
	            // Type: Bool
	            // Default: true
	            // Gets or sets whether the clicks on the container are handled as clicks on the check box.
	            this.enableContainerClick = true;
	            // Type: Bool
	            // Default: true
	            // Gets or sets whether the checkbox is locked. In this mode the user is not allowed to check/uncheck the checkbox.
	            this.locked = false;
	            // Type: String
	            // Default: ''
	            // Gets or sets the group name. When this property is set, the checkboxes in the same group behave as radio buttons.
	            this.groupName = '';
	            this.keyboardCheck = true;
	            this.enableHover = true;
	            this.hasInput = true;
	            this.rtl = false;
	            this.updated = null;
	            this.disabledContainer = false;
	            this._canFocus = true;
	            this.aria =
	            {
	                "aria-checked": { name: "checked", type: "boolean" },
	                "aria-disabled": { name: "disabled", type: "boolean" }
	            };
	            // 'checked' is triggered when the checkbox is checked.
	            // 'unchecked' is triggered when the checkbox is unchecked.
	            // 'indeterminate' is triggered when the checkbox's ckecked property is going to be null.
	            // 'change' is triggered when the checkbox's state is changed.
	            this.events =
				 [
				    'checked', 'unchecked', 'indeterminate', 'change'
	             ];
	        },

	        createInstance: function (args) {
	            this.render();
	        },

	        _addInput: function()
	        {
	            if (this.hasInput) {
	                if (this.input) this.input.remove();
	                var name = this.host.attr('name');
	                if (!name) name = this.element.id;
	                this.input = $("<input type='hidden'/>");
	                this.host.append(this.input);
	                this.input.attr('name', name);
	                this.input.val(this.checked);

	                this.host.attr('role', 'checkbox');
	                $.jqx.aria(this);
	            }
	        },

	        render: function()
	        {
	            this.init = true;
	            var me = this;
	            this.setSize();
	            this.propertyChangeMap['width'] = function (instance, key, oldVal, value) {
	                me.setSize();
	            };

	            this.propertyChangeMap['height'] = function (instance, key, oldVal, value) {
	                me.setSize();
	            };
	            this._removeHandlers();

	            if (this.checkbox) {
	                this.checkbox.remove();
	                this.checkbox = null;
	            }
	            if (this.checkMark) {
	                this.checkMark.remove();
	                this.checkMark = null;
	            }
	            if (this.box) {
	                this.box.remove();
	                this.box = null;
	            }
	            if (this.clear) {
	                this.clear.remove();
	                this.clear = null;
	            }
	           
	            if (this.boxSize == null) this.boxSize = 13;
	            var boxSize = parseInt(this.boxSize) + 'px';
	            this.checkbox = $('<div><div style="width: ' + boxSize + '; height: ' + boxSize + ';"><span style="width: ' + boxSize + '; height: ' + boxSize + ';"></span></div></div>');
	            this.host.prepend(this.checkbox);
	            if (!this.disabledContainer) {
	                if (!this.host.attr('tabIndex')) {
	                    this.host.attr('tabIndex', 0);
	                }
	                this.clear = $('<div style="clear: both;"></div>');
	                this.host.append(this.clear);
	            }

	            this.checkMark = $(this.checkbox[0].firstChild.firstChild);//$(this.checkbox).find('span');
	            this.box = this.checkbox;

	            this.box.addClass(this.toThemeProperty('jqx-checkbox-default') + " " + this.toThemeProperty('jqx-fill-state-normal') + " " + this.toThemeProperty('jqx-rc-all'));

	            if (this.disabled) {
	                this.disable();
	            }

	            if (!this.disabledContainer) {
	                this.host.addClass(this.toThemeProperty('jqx-widget'));
	                this.host.addClass(this.toThemeProperty('jqx-checkbox'));
	            }

	            if (this.locked && !this.disabledContainer) {
	                this.host.css('cursor', 'auto');
	            }

	            var checked = this.element.getAttribute('checked');
	            if (checked == 'checked' || checked == 'true' || checked == true) {
	                this.checked = true;
	            }

	            this._addInput();
	            this._render();
	            this._addHandlers();
	            this.init = false;
	        },

	        refresh: function (initialRefresh) {
	            if (!initialRefresh) {
	                this.setSize();
	                this._render();
	            }
	        },

	        resize: function (width, height) {
	            this.width = width;
	            this.height = height;
	            this.refresh();
	        },

	        setSize: function () {
	            if (this.width != null && this.width.toString().indexOf("px") != -1) {
	                this.host.width(this.width);
	            }
	            else
	                if (this.width != undefined && !isNaN(this.width)) {
	                    this.host.width(this.width);
	                };

	            if (this.height != null && this.height.toString().indexOf("px") != -1) {
	                this.host.height(this.height);
	            }
	            else if (this.height != undefined && !isNaN(this.height)) {
	                this.host.height(this.height);
	            };
	        },

	        _addHandlers: function () {
	            var me = this;

	            var isTouchDevice = $.jqx.mobile.isTouchDevice();
	            var eventName = 'mousedown';
	            if (isTouchDevice) eventName = $.jqx.mobile.getTouchEventName('touchend');

	            this.addHandler(this.box, eventName, function (event) {
	                if (!me.disabled && !me.enableContainerClick && !me.locked) {
	                    me.toggle();
	                    if (me.updated) {
	                        event.owner = me;
	                        me.updated(event, me.checked, me.oldChecked);
	                    }
	                    if (event.preventDefault) {
	                        event.preventDefault();
	                    }
	                    return false;
	                }
	            });

	            if (!this.disabledContainer) {
	                this.addHandler(this.host, 'keydown', function (event) {
	                    if (!me.disabled && !me.locked && me.keyboardCheck) {
	                        if (event.keyCode == 32) {
	                            if (!me._canFocus) {
	                                return true;
	                            }

	                            me.toggle();
	                            if (me.updated) {
	                                event.owner = me;
	                                me.updated(event, me.checked, me.oldChecked);
	                            }
	                            if (event.preventDefault) {
	                                event.preventDefault();
	                            }
	                            return false;
	                        }
	                    }
	                });

	                this.addHandler(this.host, eventName, function (event) {
	                    if (!me.disabled && me.enableContainerClick && !me.locked) {
	                        me.toggle();
	                        if (event.preventDefault) {
	                            event.preventDefault();
	                        }
	                        return false;
	                    }
	                });

	                this.addHandler(this.host, 'selectstart', function (event) {
	                    if (!me.disabled && me.enableContainerClick) {
	                        if (event.preventDefault) {
	                            event.preventDefault();
	                        }
	                        return false;
	                    }
	                });

	                this.addHandler(this.host, 'mouseup', function (event) {
	                    if (!me.disabled && me.enableContainerClick) {
	                        if (event.preventDefault) {
	                            event.preventDefault();
	                        }
	                    }
	                });

	                this.addHandler(this.host, 'focus', function (event) {
	                    if (!me.disabled && !me.locked) {
	                        if (!me._canFocus) {
	                            return true;
	                        }

	                        if (me.enableHover) {
	                            me.box.addClass(me.toThemeProperty('jqx-checkbox-hover'));
	                        }
	                        me.box.addClass(me.toThemeProperty('jqx-fill-state-focus'));
	                        if (event.preventDefault) {
	                            event.preventDefault();
	                        }
	                        me.hovered = true;
	                        return false;
	                    }
	                });

	                this.addHandler(this.host, 'blur', function (event) {
	                    if (!me.disabled && !me.locked) {
	                        if (!me._canFocus) {
	                            return true;
	                        }
	                        if (me.enableHover) {
	                            me.box.removeClass(me.toThemeProperty('jqx-checkbox-hover'));
	                        }
	                        me.box.removeClass(me.toThemeProperty('jqx-fill-state-focus'));
	                        if (event.preventDefault) {
	                            event.preventDefault();
	                        }
	                        me.hovered = false;
	                        return false;
	                    }
	                });

	                this.addHandler(this.host, 'mouseenter', function (event) {
	                    if (me.locked) {
	                        me.host.css('cursor', 'arrow')
	                    }
	                    if (me.enableHover) {
	                        if (!me.disabled && me.enableContainerClick && !me.locked) {
	                            me.box.addClass(me.toThemeProperty('jqx-checkbox-hover'));
	                            me.box.addClass(me.toThemeProperty('jqx-fill-state-hover'));
	                            if (event.preventDefault) {
	                                event.preventDefault();
	                            }
	                            me.hovered = true;
	                            return false;
	                        }
	                    }
	                });

	                this.addHandler(this.host, 'mouseleave', function (event) {
	                    if (me.enableHover) {
	                        if (!me.disabled && me.enableContainerClick && !me.locked) {
	                            me.box.removeClass(me.toThemeProperty('jqx-checkbox-hover'));
	                            me.box.removeClass(me.toThemeProperty('jqx-fill-state-hover'));
	                            if (event.preventDefault) {
	                                event.preventDefault();
	                            }
	                            me.hovered = false;
	                            return false;
	                        }
	                    }
	                });

	                this.addHandler(this.box, 'mouseenter', function () {
	                    if (me.locked) {
	                        return;
	                    }

	                    if (!me.disabled && !me.enableContainerClick) {
	                        me.box.addClass(me.toThemeProperty('jqx-checkbox-hover'));
	                        me.box.addClass(me.toThemeProperty('jqx-fill-state-hover'));
	                    }
	                });

	                this.addHandler(this.box, 'mouseleave', function () {
	                    if (!me.disabled && !me.enableContainerClick) {
	                        me.box.removeClass(me.toThemeProperty('jqx-checkbox-hover'));
	                        me.box.removeClass(me.toThemeProperty('jqx-fill-state-hover'));
	                    }
	                });
	            }
	        },

	        focus: function () {
	            try {
	                this.host.focus();
	            }
	            catch (error) {
	            }
	        },

	        _removeHandlers: function () {
	            var isTouchDevice = $.jqx.mobile.isTouchDevice();
	            var eventName = 'mousedown';
	            if (isTouchDevice) eventName = 'touchend';

	            if (this.box) {
	                this.removeHandler(this.box, eventName);
	                this.removeHandler(this.box, 'mouseenter');
	                this.removeHandler(this.box, 'mouseleave');
	            }
	            this.removeHandler(this.host, eventName);
	            this.removeHandler(this.host, 'mouseup');
	            this.removeHandler(this.host, 'selectstart');
	            this.removeHandler(this.host, 'mouseenter');
	            this.removeHandler(this.host, 'mouseleave');
	            this.removeHandler(this.host, 'keydown');
	            this.removeHandler(this.host, 'blur');
	            this.removeHandler(this.host, 'focus');
	        },

	        _render: function () {
	            if (!this.disabled) {
	                if (this.enableContainerClick) {
	                    this.host.css('cursor', 'pointer');
	                }
	                else
	                    if (!this.init) {
	                        this.host.css('cursor', 'auto');
	                    }
	            }
	            else {
	                this.disable();
	            }
	            if (this.rtl) {
	                this.box.addClass(this.toThemeProperty('jqx-checkbox-rtl'));
	                this.host.addClass(this.toThemeProperty('jqx-rtl'));
	            }

	            this.updateStates();
	        },

	        _setState: function (checked) {
	            if (this.checked != checked) {
	                this.checked = checked;
	                if (this.checked) {
	                    this.checkMark[0].className = this.toThemeProperty('jqx-checkbox-check-checked');
	                }
	                else if (this.checked == null) {
	                    this.checkMark[0].className = this.toThemeProperty('jqx-checkbox-check-indeterminate');
	                }
	                else {
	                    this.checkMark[0].className = "";
	                }
	            }
	        },

	        val: function (value) {
	            if (arguments.length == 0 || (value != null && typeof (value) == "object")) {
	                return this.checked;
	            }

	            if (typeof value == "string") {
	                if (value == "true") this.check();
	                if (value == "false") this.uncheck();
	                if (value == "") this.indeterminate();
	            }
	            else {
	                if (value == true) this.check();
	                if (value == false) this.uncheck();
	                if (value == null) this.indeterminate();
	            }
	            return this.checked;
	        },

	        // checks the ckeckbox.
	        check: function () {
	            this.checked = true;
	            var me = this;
	            this.checkMark.removeClass();

	            if ($.jqx.browser.msie || this.animationShowDelay == 0) {
	                this.checkMark.addClass(this.toThemeProperty('jqx-checkbox-check-checked'));
	            }
	            else {
	                this.checkMark.addClass(this.toThemeProperty('jqx-checkbox-check-checked'));
	                this.checkMark.css('opacity', 0);
	                this.checkMark.stop().animate({ opacity: 1 }, this.animationShowDelay, function () {
	                });
	            }
	       
	            if (this.groupName != null && this.groupName.length > 0) {
	                var checkboxes = $.find(this.toThemeProperty('.jqx-checkbox', true));
	                $.each(checkboxes, function () {
	                    var groupName = $(this).jqxCheckBox('groupName');
	                    if (groupName == me.groupName && this != me.element) {
	                        $(this).jqxCheckBox('uncheck')
	                    }
	                });
	            }

	            this._raiseEvent('0', true);
	            this._raiseEvent('3', { checked: true });
	            if (this.input != undefined) {
	                this.input.val(this.checked);
	                $.jqx.aria(this, "aria-checked", this.checked);
	            }
	        },

	        // unchecks the checkbox.
	        uncheck: function () {
	            this.checked = false;
	            var me = this;

	            if ($.jqx.browser.msie || this.animationHideDelay == 0) {
	                if (me.checkMark[0].className != "")
	                {
	                    me.checkMark[0].className = "";
	                }
	            }
	            else {
	                this.checkMark.css('opacity', 1);
	                this.checkMark.stop().animate({ opacity: 0 }, this.animationHideDelay, function () {
	                    if (me.checkMark[0].className != "") {
	                        me.checkMark[0].className = "";
	                    }
	                });
	            }

	            this._raiseEvent('1');
	            this._raiseEvent('3', { checked: false });
	            if (this.input != undefined) {
	                this.input.val(this.checked);
	                $.jqx.aria(this, "aria-checked", this.checked);
	            }
	        },

	        // sets the indeterminate state.
	        indeterminate: function () {
	            this.checked = null;
	            this.checkMark.removeClass();

	            if ($.jqx.browser.msie || this.animationShowDelay == 0) {
	                this.checkMark.addClass(this.toThemeProperty('jqx-checkbox-check-indeterminate'));
	            }
	            else {
	                this.checkMark.addClass(this.toThemeProperty('jqx-checkbox-check-indeterminate'));
	                this.checkMark.css('opacity', 0);
	                this.checkMark.stop().animate({ opacity: 1 }, this.animationShowDelay, function () {
	                });
	            }

	            this._raiseEvent('2');
	            this._raiseEvent('3', { checked: null });
	            if (this.input != undefined) {
	                this.input.val(this.checked);
	                $.jqx.aria(this, "aria-checked", "undefined");
	            }
	        },

	        // toggles the check state.
	        toggle: function () {
	            if (this.disabled)
	                return;

	            if (this.locked)
	                return;

	            if (this.groupName != null && this.groupName.length > 0) {
	                if (this.checked != true) {
	                    this.checked = true;
	                    this.updateStates();
	                }
	                return;
	            }

	            this.oldChecked = this.checked;
	            if (this.checked == true) {
	                this.checked = this.hasThreeStates ? null : false;
	            }
	            else {
	                this.checked = this.checked != null;
	            }

	            this.updateStates();
	            if (this.input != undefined) {
	                this.input.val(this.checked);
	            }
	        },

	        // updates check states depending on the value of the 'checked' property.
	        updateStates: function () {
	            if (this.checked) {
	                this.check();
	            }
	            else if (this.checked == false) {
	                this.uncheck();
	            }
	            else if (this.checked == null) {
	                this.indeterminate();
	            }
	        },

	        // disables the checkbox.
	        disable: function () {
	            this.disabled = true;

	            if (this.checked == true) {
	                this.checkMark.addClass(this.toThemeProperty('jqx-checkbox-check-disabled'));
	            }
	            else if (this.checked == null) {
	                this.checkMark.addClass(this.toThemeProperty('jqx-checkbox-check-indeterminate-disabled'));
	            }
	            this.box.addClass(this.toThemeProperty('jqx-checkbox-disabled-box'));
	            this.host.addClass(this.toThemeProperty('jqx-checkbox-disabled'));
	            this.host.addClass(this.toThemeProperty('jqx-fill-state-disabled'));
	            this.box.addClass(this.toThemeProperty('jqx-checkbox-disabled'));
	            $.jqx.aria(this, "aria-disabled", this.disabled);
	        },

	        // enables the checkbox.
	        enable: function () {
	            if (this.checked == true) {
	                this.checkMark.removeClass(this.toThemeProperty('jqx-checkbox-check-disabled'));
	            }
	            else if (this.checked == null) {
	                this.checkMark.removeClass(this.toThemeProperty('jqx-checkbox-check-indeterminate-disabled'));
	            }
	            this.box.removeClass(this.toThemeProperty('jqx-checkbox-disabled-box'));
	            this.host.removeClass(this.toThemeProperty('jqx-checkbox-disabled'));
	            this.host.removeClass(this.toThemeProperty('jqx-fill-state-disabled'));
	            this.box.removeClass(this.toThemeProperty('jqx-checkbox-disabled'));
	            this.disabled = false;
	            $.jqx.aria(this, "aria-disabled", this.disabled);
	        },

	        destroy: function () {
	            this.host.remove();
	        },

	        _raiseEvent: function (id, args) {
	            if (this.init) return;
	            var evt = this.events[id];
	            var event = new jQuery.Event(evt);
	            event.owner = this;
	            event.args = args;
	            try
	            {
	                var result = this.host.trigger(event);
	            }
	            catch (error) {

	            }

	            return result;
	        },

	        propertyChangedHandler: function (object, key, oldvalue, value) {
	            if (this.isInitialized == undefined || this.isInitialized == false)
	                return;

	            if (key == object.enableContainerClick && !object.disabled && !object.locked) {
	                if (value) {
	                    object.host.css('cursor', 'pointer');
	                }
	                else object.host.css('cursor', 'auto');
	            }

	            if (key == "rtl") {
	                if (value) {
	                    object.box.addClass(object.toThemeProperty('jqx-checkbox-rtl'));
	                    object.host.addClass(object.toThemeProperty('jqx-rtl'));
	                }
	                else
	                {
	                    object.box.removeClass(object.toThemeProperty('jqx-checkbox-rtl'));
	                    object.host.removeClass(object.toThemeProperty('jqx-rtl'));
	                }
	            }

	            if (key == "boxSize") {
	                object.render();
	            }

	            if (key == 'theme') {
	                $.jqx.utilities.setTheme(oldvalue, value, object.host);
	            }

	            if (key == 'checked') {
	                if (value != oldvalue) {
	                    switch (value) {
	                        case true:
	                            object.check();
	                            break;
	                        case false:
	                            object.uncheck();
	                            break;
	                        case null:
	                            object.indeterminate();
	                            break;
	                    }
	                }
	            }

	            if (key == 'disabled') {
	                if (value != oldvalue) {
	                    if (value) {
	                        object.disable();
	                    } else object.enable();
	                }
	            }
	        }
	    });
	})(jQuery);
	
	
}

return loadTreeJs; 
});
