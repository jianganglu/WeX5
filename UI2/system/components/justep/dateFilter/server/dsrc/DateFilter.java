import java.util.Map;
import java.util.UUID;

import org.dom4j.Element;
import com.justep.ui.component.ComponentTemplate;

public class DateFilter implements ComponentTemplate {
	private Element eDef;
	private String xID;
	private String dataID;

	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events, Map<String, Object> context) {
		eDef = bound;
		xID = eDef.attributeValue("xid");
		dataID = UUID.randomUUID().toString();
		eDef.addAttribute("optionsDataID", dataID);
		processGridSelect();
	}

	private void processGridSelect() {
		Element gridSelect = (Element) eDef.selectSingleNode("./*[contains(@component,'/system/components/justep/gridSelect/gridSelect')]");
		gridSelect.addAttribute("bind-ref", "$model.comp($element.parentElement).selectedValue");
		gridSelect.addAttribute("bind-labelRef", "$model.comp($element.parentElement).selectedLabel");
		gridSelect.addAttribute("defaultLabel", "$model.comp('" + xID + "')._getDefaultLabel()");
		gridSelect.addAttribute("onUpdateValueBak", gridSelect.attributeValue("onUpdateValue")); 
		gridSelect.addAttribute("onUpdateValue", "comp('" + xID + "')._onUpdateValue");

		Element option = gridSelect.element("option");
		option.addAttribute("data", dataID);
		option.addAttribute("value", "id");
		option.addAttribute("label", "label");
		
		Element columns = option.addElement("columns");
		Element column = columns.addElement("column");
		column.addAttribute("name", "label");
	}

}
