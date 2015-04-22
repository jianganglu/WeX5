/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/
define(function(require) {
	var $ = require("jquery"), 
		Component = require("$UI/system/lib/base/component"), 
		BindComponent = require("$UI/system/lib/base/bindComponent"),
		BindMapping = require("$UI/system/lib/bind/bind.mapping"),
		justep = require('$UI/system/lib/justep'),
		Uploader = require('$UI/system/components/justep/uploader/uploader'),
		url = require.normalizeName("./attachmentSimple");
	
	var ComponentConfig = require("./attachmentSimple.config");
	
	require('css!./css/attachment').load();
	
	var AttachmentSimple = BindComponent.extend({
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
    		this.state = "upload";
            this.initAttachmentValue([]);
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		
		getContextID: function(){
			return this.getModel().getContextID();
		},
		
		_callModelFn : function(){
			var event = arguments[2];
			event.bindingContext = justep.Bind.contextFor(event.currentTarget);
			return this.getModel()[arguments[0]].apply(this.getModel(), [event]);
		},
		
		_attachDataEvent : function() {
			var data = this.bindData;
			if (data && (!this.eventAttached)) {
				/*var dataRefreshCallback = function(event) {
					this._refreshChangeLog();
				};
				data.on("onAfterRefresh",dataRefreshCallback,this);*/
				
				this.eventAttached = true;
			}
		},
		
		/**
		 * 组件展现逻辑
		 * @param initValue
		 */
		initAttachmentValue: function(initValue){
			var self = this;
			if(this.$attachmentItems){
				BindMapping.fromJS(initValue,this.$attachmentItems);
			}else{
				this.$attachmentItems = BindMapping.fromJS(initValue);
			}
		},
		initUploader:function(){
			var self = this;
			var actionUrl = require.toUrl("$UI/system/service/doc/common/simpleFileStore.j");
			self.uploader = new Uploader(self.$domNode.find('.x-item-upload'),{
                actionUrl:actionUrl
            });
			
			self.uploader.on('onStart',function(event){
				var storeFileName = (new justep.UUID()).valueOf();
				self.uploader.data = {
						storeFileName : storeFileName,
						ownerID:self.getOwnerID()
				}
			});
			
			
			self.uploader.on('onProgress',function(event){
				self.$domNode.find('.x-doc-process-bar').show().css('width',event.percentComplete);
				var _data = {
					source: self,
					event:event
				};
				self.fireEvent('onProgress',_data);
			});
			self.uploader.on('onFileSelected',function(event){
				var _data = {
					source: self,
					event:event
				};
				self.fireEvent('onFileSelected',_data);
			});
			self.uploader.on('onSuccess',function(data,fileName){
				self.$domNode.find('.x-doc-process-bar').hide().css('width','0%');
				var _data = {
					source: self,
					data:data,
					fileName:fileName
				};
				self.fireEvent('onSuccess',_data);
				// data.response 为 ResponseXML
				/*var file = $(data.response).find("file");
				var kind = $(file).attr("mediatype");
				var cacheName = $(file).attr("file-name");
				var size = $(file).attr("fileSize");
				self.uploadDoc.call(self,fileName,kind,size,cacheName);
				*/
				self.changeState("upload");
				var data = self.uploader.data;
				self.addItem(_data.fileName,data.storeFileName,data.ownerID);
				self.uploader.data = {};
			});
			self.uploader.on('onError',function(event){
				var _data = {
					source: self,
					event:event
				};
				self.fireEvent('onError',_data);
				self.changeState("upload");
				self.uploader.data = {};
			});
		},
		controlsDescendantBindings: function(){
			return true;
		},
		doInit: function(value, bindingContext, allBindings){
			this.callParent(value, bindingContext, allBindings);
			this.$state = justep.Bind.observable(this.state);
			
			this.initUploader();
			var self = this;
			
			$('body').on('click',function(event){
				if(self.$state && self.$state.get() == 'remove' && (!$(event.target).hasClass('x-remove-barget')) && (!$(event.target).hasClass('x-item-remove')) ){
					self.changeState("upload");
				}
			});
			justep.Bind.applyBindings(self,this.$domNode.find('.x-attachment').get(0));
		},
		
		doUpdate: function(value, bindingContext, allBindings){
			this.callParent(value, bindingContext, allBindings);
			if(justep.Bind.isObservable(this.ref) && this.ref['define']){
				if(this.bindData == undefined){
					this.bindData = this.ref['define'].data;
					this._attachDataEvent();
					this.bindRelation = this.ref['define'].defCol.name;
				}
				var _value = [];
				try {
    				_value = JSON.parse(this.ref.get());
    			}catch(e){
    				_value =[];
    			}
				this.initAttachmentValue(_value);
				if(this.$attachmentItems.get().length == 0){
            		this.changeState("upload");
            	}
         	}
		},
		/**
		 * controller
		 */
		changeState : function(state){
            this.$state.set(state);
        },
        
        getFileUrl : function(realFileName,storeFileName,ownerID,operateType){
        	var url = '$UI/system/service/doc/common/simpleFileStore.j?realFileName=' + realFileName + '&storeFileName='+storeFileName + '&ownerID='+ownerID + '&operateType=' + operateType;
        	return require.toUrl(url);
        },
        
        getPictureUrl : function($object){
        	var realFileName = $object.realFileName.get();
        	var storeFileName = $object.storeFileName.get();
        	var ownerID = this.getOwnerID();
        	var operateType = "browse";
        	var imgFileType = ".jpg,.jpeg,.jpe,.png,.gif,.tiff,.tif,.svg,.svgz,.svg";
        	var url = "";
        	if(imgFileType.indexOf((String(/\.[^\.]+$/.exec(realFileName)).toLowerCase())) >= 0){
        		url = this.getFileUrl(realFileName,storeFileName,ownerID,operateType);
        	}else if(".mp3,.wav".indexOf((String(/\.[^\.]+$/.exec(realFileName)).toLowerCase())) >= 0){
        		url = require.toUrl('$UI/system/components/justep/attachment/css/mp3.png');
        	}else if(".mp4,.wmv,.mov,.MOV".indexOf((String(/\.[^\.]+$/.exec(realFileName)).toLowerCase())) >= 0){
        		url = require.toUrl('$UI/system/components/justep/attachment/css/mp4.png');
        	}else if(".avi".indexOf((String(/\.[^\.]+$/.exec(realFileName)).toLowerCase())) >= 0){
        		url = require.toUrl('$UI/system/components/justep/attachment/css/avi.png');
        	}else if(".doc,.docx".indexOf((String(/\.[^\.]+$/.exec(realFileName)).toLowerCase())) >= 0){
        		url = require.toUrl('$UI/system/components/justep/attachment/css/doc.png');
        	}else if(".ppt,.pptx".indexOf((String(/\.[^\.]+$/.exec(realFileName)).toLowerCase())) >= 0){
        		url = require.toUrl('$UI/system/components/justep/attachment/css/ppt.png');
        	}else if(".txt,.text".indexOf((String(/\.[^\.]+$/.exec(realFileName)).toLowerCase())) >= 0){
        		url = require.toUrl('$UI/system/components/justep/attachment/css/txt.png');
        	}else if(".pdf".indexOf((String(/\.[^\.]+$/.exec(realFileName)).toLowerCase())) >= 0){
        		url = require.toUrl('$UI/system/components/justep/attachment/css/pdf.png');
        	}else if(".xls,.xlsx".indexOf((String(/\.[^\.]+$/.exec(realFileName)).toLowerCase())) >= 0){
        		url = require.toUrl('$UI/system/components/justep/attachment/css/xlsx.png');
        	}else{
        		url = require.toUrl('$UI/system/components/justep/attachment/css/other.png');
        	}
        	return url;
        },
        
        previewPicture: function($object){
        	var url = this.getPictureUrl($object);
        	if(url){
        		return "url("+url+")";
        	}
        },
        
        deleteFile:function(storeFileName,ownerID){
        	this.removeItemByStoreID(storeFileName,ownerID);
        },
        
        downloadFile:function(realFileName,storeFileName,ownerID){
        	var url = this.getFileUrl(realFileName,storeFileName,ownerID,"download");
        	window.open(url,"_download_");
        },
        
        previewOrRemoveItem : function($object){
        	var realFileName = $object.realFileName.get();
        	var storeFileName = $object.storeFileName.get();
        	var ownerID = this.getOwnerID();
        	if(this.$state.get() == 'upload'){
        		this.downloadFile(realFileName,storeFileName,ownerID);
            }else if(this.$state.get() == 'remove'){
            	this.deleteFile(storeFileName,ownerID);
            }
        },
        
        //Utils
        getItemByStoreID :function(storeFileName,ownerID){
    		var items = this.getItems(ownerID);
    		if(items){
    			for(var i =0 ;i<items.length ; i++){
    				if(items[i].storeFileName == storeFileName){
    					return items[i];
    				}
    			}
    		}
    	},
    	removeItemByStoreID:function(storeFileName,ownerID){
    		var items = this.getItems(ownerID);
    		if(items){
    			for(var i =0 ;i<items.length ; i++){
    				if(items[i].storeFileName == storeFileName){
    					items.splice(i,1);
    				}
    			}
    		}
    		this.bindData.setValueByID(this.bindRelation,JSON.stringify(items),ownerID);
    	},
    	addItem : function(realFileName,storeFileName,ownerID){
    		var items = this.getItems();
    		items.push({
    			storeFileName :storeFileName,
    			realFileName : realFileName
    		});
    		this.bindData.setValueByID(this.bindRelation,JSON.stringify(items),ownerID);
    	},
    	getOwnerID : function(){
    		return this.bindData.getRowID(this.ref['define'].row);
    	} ,
    	getItems : function(ownerID){
    		var data = [];
    		var value = "";
    		value = this.bindData.getValueByID(this.bindRelation, ownerID);
    		if(value){
    			try {
    				data = JSON.parse(value);
    			}catch(e){
    				console.log("绑定的数据解析失败[value:"+value+"]",e);
    				data =[];
    			}
    		}
    		return data;
    	}
	});	
		
	Component.register(url, AttachmentSimple);
	return AttachmentSimple;
});
