import java.util.Map;

import org.dom4j.Element;

import com.justep.ui.component.ComponentTemplate;


public class PagerBar implements ComponentTemplate {

	private Element eDef;
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		this.eDef = bound;
		
		@SuppressWarnings("unchecked")
		String data = eDef.attributeValue("data");
		if(data != null){
			Element select = (Element)eDef.selectSingleNode(".//*[@component='$model/UI2/system/components/justep/pagerLimitSelect/pagerLimitSelect']");
			select.addAttribute("data", data);
			Element pagination = (Element)eDef.selectSingleNode(".//*[@component='$model/UI2/system/components/bootstrap/pagination/pagination']");
			pagination.addAttribute("data", data);
		}
		
	}
	
}
