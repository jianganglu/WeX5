package com.justep.studio.ui.editors.property.router;

import java.util.ArrayList;
import java.util.List;

import org.w3c.dom.Element;

import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.util.XPathUtil;

public class Router {
	public List<String[]> getRoutableComp(PropertyItem propertyItem) {
		List<String[]> routableComps = new ArrayList<String[]>();
		XuiDataModel dataModel = propertyItem.getOwerElement().getXuiDataModel();
		Element originElement = dataModel.getRootElement().getOriginElement();
		List<Element> contents = XPathUtil.selectElementNodes(originElement, "//*[@component='$UI/system/components/justep/contents/contents']");
		List<Element> dialogs = XPathUtil.selectElementNodes(originElement, "//*[@component='$UI/system/components/justep/dialog/dialog']");
		List<Element> windowDialogs = XPathUtil.selectElementNodes(originElement, "//*[@component='$UI/system/components/justep/windowDialog/windowDialog']");
		contents.addAll(dialogs);
		contents.addAll(windowDialogs);
		for (Element element : contents) {
			String xid = element.getAttribute("xid");
			if(xid != null){
				routableComps.add(new String[]{xid,xid});
			}
		}
		return routableComps;
	}
}
