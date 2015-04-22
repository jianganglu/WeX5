import java.util.List;
import java.util.Map;

import org.dom4j.Attribute;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.QName;

import com.justep.ui.component.ComponentTemplate;
import com.justep.ui.xml.XMLConstants;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class CellLayout implements ComponentTemplate {
	private static final int DEFAULT_ROW_HEIGHT = 19;
	private static final int DEFAULT_COL_WIDTH = 80;
	
	private boolean hasCssItem(String cssText,String cssItem){
		if(cssText != null){
            String[] items = cssText.split(";");
            for(String item:items){
            	item = item.trim();
            	String[] subItems = item.split(":");
            	if(subItems.length>0){
            		if(subItems[0].trim().equalsIgnoreCase(cssItem)){
            			return true;
            		}
            	}
            }
		}
		return false;
	}
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) throws XBLException {
		int defaultRowHeight = Integer.parseInt(bound.attributeValue("row-height", DEFAULT_ROW_HEIGHT+""));
		int defaultColumnWidth = Integer.parseInt(bound.attributeValue("column-width", DEFAULT_COL_WIDTH+""));
		Element root  = bound;//DocumentHelper.createElement("root");
		Element content = bound.element("layout-content");
		if(content==null){
			return ;
		}
		String tableText = content.getText().trim();
		bound.remove(content);
		if(tableText.equals("")){
			return ;
		}
//		tableText = tableText.replace("<table", "<xhtml:table xmlns:xhtml=\"http://www.w3.org/1999/xhtml\"  class=\"no-editor-border\" ").replace("</table>", "</xhtml:table>");
//		tableText = tableText.replace("<tr", "<xhtml:tr").replace("</tr>", "</xhtml:tr>");
//		tableText = tableText.replace("<td", "<xhtml:td").replace("</td>", "</xhtml:td>");
		Element table = null;
		try {
			table = DocumentHelper.parseText(tableText).getRootElement(); 
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		if(table==null){
			return ;
		}
		
		int totalHeight = 0;
		int totalWidth = 0;
		@SuppressWarnings("unchecked")
		List<Element> trs = table.elements("tr");
		for (int i = 0; i < trs.size(); i++) {
			Element tr = trs.get(i);
			
			@SuppressWarnings("unchecked")
			List<Element> tds = tr.elements("td");
			for (int j = 0; j < tds.size(); j++) {
				Element td = tds.get(j);
				if(i==0){
					td.addAttribute("class", "first-row first-cell");
					if(j!=0){
						String style = td.attributeValue("style");
						int colWidth = defaultColumnWidth;
						if(style==null){
							td.addAttribute("style", "WIDTH:"+colWidth+"px;");
						}else if(!hasCssItem(style,"width")){//!style.toUpperCase().contains("\"WIDTH:") && !style.toUpperCase().contains(" WIDTH:")){
							td.remove(td.attribute("style"));
							td.addAttribute("style", style+";WIDTH:"+colWidth+"px;");
						}else{
							try{
								style = style.toUpperCase();
								String tmp = style.substring(style.indexOf("WIDTH:")+6); 
								tmp= tmp.substring(0,tmp.indexOf("PX")).trim();
								colWidth = Integer.parseInt(tmp);
							}catch(Exception e){
								e.printStackTrace();
							}
						}
						totalWidth += colWidth;
					}
				}
				if(j==0){
					td.addAttribute("class","first-col" );
					if(i!=0){
						String style = td.attributeValue("style");
						int rowHeight = defaultRowHeight;
						if(style==null){
							td.addAttribute("style", "HEIGHT:"+rowHeight+"px;");
						}else if(!hasCssItem(style,"height")){//!style.toUpperCase().contains("\"HEIGHT:") && !style.toUpperCase().contains(" WIDTH:")){
							td.remove(td.attribute("style"));
							td.addAttribute("style", style+";HEIGHT:"+rowHeight+"px;");
						}else{
							try{
								style = style.toUpperCase();
								String tmp = style.substring(style.indexOf("HEIGHT:")+7); 
								tmp= tmp.substring(0,tmp.indexOf("PX")).trim();
								rowHeight = Integer.parseInt(tmp);
							}catch(Exception e){
								e.printStackTrace();
							}
						}
						totalHeight += rowHeight;
					}
				}

				String componentId = td.attributeValue("componentId");
				if(componentId!=null){
					Element control =(Element) bound.selectSingleNode(".//*[@xid='"+componentId+"' ]");
					if(control!=null){
//						try {
							control.getParent().remove(control);
							//Element c = DocumentHelper.parseText(control.asXML()).getRootElement();
							td.add(control);
							//td.remove(td.attribute("componentId"));
//						} catch (DocumentException e) {
//							e.printStackTrace();
//						}
					}
				}
			
			}
			
		}
		
		Attribute tableStyleAttr = table.attribute("style");
		String boundStyle = bound.attributeValue("style");
		String tableStyle = boundStyle+";"+tableStyleAttr.getValue()+";WIDTH:"+totalWidth+"px;HEIGHT:"+totalHeight+"px;";
		table.remove(tableStyleAttr);
		table.addAttribute("style", tableStyle);
	
		root.add(table);
	}
}
