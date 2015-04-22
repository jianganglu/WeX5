package com.justep.designer.components;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.jface.window.Window;
import org.w3c.dom.Element;

import com.justep.designer.util.JsCallJavaUtil;
import com.justep.jetty.embedded.JettyServer;
import com.justep.studio.StudioPlugin2;
import com.justep.studio.data.DSUtil;
import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.dialog.CommonSelectorDialog;
import com.justep.studio.ui.editors.xui.BaseComponent;
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.ui.editors.xui.XuiDesignerConfig;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.util.CommonUtil;
import com.justep.studio.util.StudioConfig;
import com.justep.studio.util.XPathUtil;


public class Commands extends BaseComponent{
 
	private List<String> getCurrentCommandItems(XuiElement currentElement){
		List<String> list = new ArrayList<String>();
		Element curSrcE = currentElement.getOriginElement();
		List<Element> items = XPathUtil.selectElementNodes(curSrcE, "*");
		if(items.size()>0){
			for(Element itemE : items){
				String itemName = itemE.getAttribute("component");
				if(itemName != null && !itemName.equals("")){
				  list.add(itemName);
				}
			}
		}
		return list;
	}
	
	private DataSet createCommandItemDataset(XuiElement currentElement,String[] items){
		DataSet dataset = new DataSet();
		DSUtil.createSelectedColumn(dataset);
		DSUtil.createColumn(dataset, "name","名称","string", true, false, 150).setDisenableFilterCondition("selected==true");
		DSUtil.createColumn(dataset, "text","标签","string", true, false, 150).setDisenableFilterCondition("selected==true");
		DSUtil.createColumn(dataset, "binding-component","图片","string", true, false, 150).setVisible(false);	
		
		List<String> currentItemList = getCurrentCommandItems(currentElement);
		
		XuiDesignerConfig config =  currentElement.getXuiDataModel().getConfig();
		for(String item:items ){
			org.dom4j.Element configE = config.getXuiElementConfigByName(item);
			String text = configE.attributeValue("text");
			text = CommonUtil.isEmpty(text)?"":item;
			String bindingCom = configE.attributeValue("binding-component");
			boolean selected = currentItemList.contains(bindingCom)?true:false;
			dataset.addRecord(new Object[]{selected,item,text,configE.attributeValue("binding-component")});
		}
		return dataset;
	}

	public Map<String,Object> setCommand(XuiElement currentElement,HashMap<String,Object> param){ 
		if(param!= null){
			XuiDataModel model = currentElement.getXuiDataModel();
			String sItem = (String)param.get("commandItems");
			String[] items = sItem.split(",");
			DataSet dataSet = createCommandItemDataset(currentElement,items);
			CommonSelectorDialog dlg = new CommonSelectorDialog(StudioPlugin2.getShell(),"选择Command");
			dlg.setInitialSize(450,520);
			dlg.setDataSet(dataSet);
			dlg.open();
			if(dlg.getReturnCode() == Window.OK){
				List<DataRecord> drs = dataSet.getData();
				for(DataRecord dr:drs){
					XuiElement targetE = currentElement.getChildByAttr(null,null, "component",dr.getString("binding-component"));
					if(!dr.getBoolean(DSUtil.SELECTED)){
						if(targetE != null){
							model.deleteElement(targetE);
						}
					}else{
						if(targetE == null){
							model.addElement(dr.getString("name"),currentElement, null);
						}
					}
				}
				this.repaint(currentElement);
			}
		}
		return null;
	}
	
	/**
	 * 选择操作.
	 * @param currentXuiElement
	 * @return
	 */
	public Map<String, String> selectOperation(XuiElement currentXuiElement) {
		XuiDataModel xuiDataModel = currentXuiElement.getXuiDataModel();
		String url = "$UI/system/components/designerCommon/propEdtorPages/operationSelector/operationSelector.w";
	    if(url != null && !url.equals("")){
	    	url = url +(url.indexOf("?")==-1?"?":"&")+"filePath="+xuiDataModel.getFilePath()+"&port="+JettyServer.getPort()+"&uiPath="+StudioConfig.getUIPath();
	    }
	    Map<String,Object> pageParams = new HashMap<String,Object>();
	    pageParams.put("d_id", currentXuiElement.getDesignId());
	    String targetPath = StudioConfig.getUIPath()+"/system/components/designerCommon";
	    Map<String,Object> context = new HashMap<String,Object>();
	    context.put("url", url);
	    context.put("pageParams", pageParams);
	    JsCallJavaUtil.executeJavaMethod(targetPath,"com.justep.designer.service.XuiService", "openPage".toString(), context);
      
	    String returnValue = (String)context.get("returnValue");
	    if(returnValue != null && !returnValue.equals("")){
	     if(returnValue.startsWith("[")){
	    	 returnValue = returnValue.substring(1);
	     }
	     if(returnValue.endsWith("]")){
	    	 returnValue = returnValue.substring(0,returnValue.length()-1);
	     }
	     String[] items = returnValue.split(",");
	     xuiDataModel.getUndoRedoManager().startBatch();
	     try{
		     for(String item:items){
		    	 item = item.replace("\"", "'");
		          String template =  " <a component=\"$UI/system/components/justep/button/button\" class=\"btn btn-link btn-icon-left\"  onClick=\""+item+"\"> "+
		                  "         <i/>  "+
		                  "         <span></span> "+
		                  "       </a>  ";
		          Map<String,Object> params = new HashMap<String,Object>();
		          params.put("componentName", "$UI/system/components/justep/button/button");
		          params.put("templateContent", template);
		          params.put("parentElementId", currentXuiElement.getDesignId());
		          params.put("paintComponent", true);
		          params.put("autoSelect", false);
		          xuiDataModel.getUndoRedoManager().createComponent(params);
		     }
		     
	     }finally{
	    	 xuiDataModel.getUndoRedoManager().endBatch();
	     }
	    }
		return null;
	}
	
	public Map<String,Object> addCommand(XuiElement currentElement){
		XuiDataModel model = currentElement.getXuiDataModel();
		model.addElement("commandQ", currentElement, null);
		this.repaint(currentElement);
		return null;	
	}
}