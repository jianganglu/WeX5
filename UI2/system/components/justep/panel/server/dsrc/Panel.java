import java.util.Map;

import org.dom4j.Attribute;
import org.dom4j.Element;

import com.justep.ui.component.ComponentTemplate;


public class Panel implements ComponentTemplate {

	private Element eDef;
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		this.eDef = bound;
		
		String thValue = null;
		String bhValue = null;
		
		Element top = (Element) eDef.selectSingleNode("*[contains(@class, 'x-panel-top')]");
		if(top != null){
			top.addAttribute("component", "$model/UI2/system/components/justep/panel/child");
			thValue = top.attributeValue("height");
			String style = "";
			if(top.attribute("style") != null){
				Attribute styleAttr = top.attribute("style");
				style = styleAttr.getValue();
				style = style + ";height:" + thValue + "px";
				styleAttr.setValue(style);
			}else{
				top.addAttribute("style", "height:" + thValue + "px");
			}	
		}	

		Element bottom = (Element) eDef.selectSingleNode("*[contains(@class, 'x-panel-bottom')]");
		if(bottom != null){
			bottom.addAttribute("component", "$model/UI2/system/components/justep/panel/child");
			bhValue = bottom.attributeValue("height");
			String style = "";
			if(bottom.attribute("style") != null){
				Attribute styleAttr = bottom.attribute("style");
				style = styleAttr.getValue();
				style = style + ";height:" + bhValue + "px";
				styleAttr.setValue(style);
			}else{
				bottom.addAttribute("style", "height:" + bhValue + "px");
			}	
		}	

		Element content = (Element) eDef.selectSingleNode("*[contains(@class, 'x-panel-content')]");
		if(content != null){
			content.addAttribute("component", "$model/UI2/system/components/justep/panel/child");
			String s = "";
			if(thValue != null)
				s += ";top:" + thValue + "px";
			else if(top == null)
				s += ";top:0";
			if(bhValue != null)
				s += ";bottom:" + bhValue + "px";
			else if(bottom == null)
				s += ";bottom:0";
			if(!s.equals("")){
				if(content.attribute("style") != null){
					Attribute styleAttr = content.attribute("style");
					String style = styleAttr.getValue();
					style = style + s;
					styleAttr.setValue(style);
				}else{
					content.addAttribute("style", s);
				}	
			}
		}
	}
	
}
