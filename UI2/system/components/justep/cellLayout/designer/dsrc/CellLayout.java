import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.window.Window;
import org.eclipse.swt.widgets.FileDialog;

import com.justep.studio.ui.editors.property.dialog.CellLayoutPropertyDialog;
import com.justep.studio.ui.editors.xui.BaseComponent;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.editors.xui.designpanel.WindowDesignPanel;
import com.justep.studio.util.LogUtil;
import com.justep.util.xls.BinaryExcelConvert;

public class CellLayout extends BaseComponent {

	public Map<String, String> mergeCell(XuiElement currentElement) {
		return new HashMap<String, String>();
	}

	public Map<String, String> cancelCellMerging(XuiElement currentElement) {
		return new HashMap<String, String>();
	}

	public Map<String, String> insertRow(XuiElement currentElement) {
		return new HashMap<String, String>();
	}

	public Map<String, String> insertCol(XuiElement currentElement) {
		return new HashMap<String, String>();
	}
	
	public Map<String, String> insertRowAfter(XuiElement currentElement) {
		return new HashMap<String, String>();
	}

	public Map<String, String> insertColAfter(XuiElement currentElement) {
		return new HashMap<String, String>();
	}

	public Map<String, String> deleteRow(XuiElement currentElement) {
		return new HashMap<String, String>();
	}

	public Map<String, String> deleteCol(XuiElement currentElement) {
		return new HashMap<String, String>();
	}

	public boolean executeCommonToolbarAction(String key, String value) {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put(key, value);
		this.getDesigner().excuteCompMethod(this.getXuiElement().getDesignId(), "setCellStyle", paramMap);
		return false;
	}
	
	public void afterSetProperty(String name,String value){

	}

	public String decodeUnicode(String theString) { 
		 
        char aChar; 
  
        int len = theString.length(); 
  
        StringBuffer outBuffer = new StringBuffer(len); 
  
        for (int x = 0; x < len;) { 
  
            aChar = theString.charAt(x++); 
  
            if (aChar == '\\') { 
  
                aChar = theString.charAt(x++); 
  
                if (aChar == 'u') { 
  
                    // Read the xxxx 
  
                    int value = 0; 
  
                    for (int i = 0; i < 4; i++) { 
  
                        aChar = theString.charAt(x++); 
  
                        switch (aChar) { 
  
                        case '0': 
  
                        case '1': 
  
                        case '2': 
  
                        case '3': 
  
                        case '4': 
  
                        case '5': 
  
                        case '6': 
                        case '7': 
                        case '8': 
                        case '9': 
                            value = (value << 4) + aChar - '0'; 
                            break; 
                        case 'a': 
                        case 'b': 
                        case 'c': 
                        case 'd': 
                        case 'e': 
                        case 'f': 
                            value = (value << 4) + 10 + aChar - 'a'; 
                            break; 
                        case 'A': 
                        case 'B': 
                        case 'C': 
                        case 'D': 
                        case 'E': 
                        case 'F': 
                            value = (value << 4) + 10 + aChar - 'A'; 
                            break; 
                        default: 
                            throw new IllegalArgumentException( 
                                    "Malformed   \\uxxxx   encoding."); 
                        } 
  
                    } 
                    outBuffer.append((char) value); 
                } else { 
                    if (aChar == 't') 
                        aChar = '\t'; 
                    else if (aChar == 'r') 
                        aChar = '\r'; 
  
                    else if (aChar == 'n') 
  
                        aChar = '\n'; 
  
                    else if (aChar == 'f') 
  
                        aChar = '\f'; 
  
                    outBuffer.append(aChar); 
  
                } 
  
            } else
  
                outBuffer.append(aChar); 
  
        } 
  
        return outBuffer.toString(); 
  
    } 

	@SuppressWarnings("unchecked")
	public void setContent(HashMap<String,Object> map) {
		String layoutContent = (String)map.get("layout-data");
		List<String> removeComIds = (List<String>)map.get("removeComIds");
		List<String> paths = (List<String>)map.get("paths");
		XuiElement xuiElement = this.getXuiElement();
		xuiElement.getXuiDataModel().getUndoRedoManager().updateCellLayoutContent(xuiElement.getDesignId(),layoutContent,removeComIds,paths);
	}

	public Map<String, String> importFromExcel(XuiElement currentElement) {
		FileDialog dlg = new FileDialog(this.getDesigner().getShell());
		dlg.setFilterExtensions(new String[]{"*.xls;*.xlsx","*.xls","*.xlsx"});
		String fileName = dlg.open();
		if (fileName != null) {
			try {
				XuiElement view = currentElement.getParentElement();
				while(view!=null && !view.getName().equals("view") ){
					view = view.getParentElement();
				}
				if(view!=null && !view.getName().equals("view")){
					view = null;
				}

				org.dom4j.Element table = BinaryExcelConvert.convertToCellLayoutTable(fileName,currentElement,view);
				currentElement.getXuiDataModel().setPropertyValue(currentElement, currentElement.getPropertyItem("layout-data"), table.asXML());
//				currentElement.setPropertyValue("layout-data", table.asXML());
				this.getDesigner().repaintComponent(currentElement);
			} catch (Exception e) {
				e.printStackTrace();
				LogUtil.error(e.getLocalizedMessage(),e);
				MessageDialog.openError(this.getDesigner().getShell(), "导入Excel出错", e.getLocalizedMessage());
			}
		}
		return new HashMap<String, String>();
	}
	
	public Map<String, String> setCellProperties(XuiElement currentElement) {
		CellLayoutPropertyDialog dlg = new CellLayoutPropertyDialog(this.getDesigner().getShell());
		String jsonStr = this.getDesigner().executeJSMethod(WindowDesignPanel.JSMETHOD_TYPE_SELECTED_COMPONENT, "getCurrentCellProperties", new HashMap());
		if(jsonStr!=null&&!jsonStr.equals("")){
			 
		}
		if(dlg.open()==Window.OK){
			int rowHeight = dlg.getRowHeight();
			int colWidth = dlg.getColumnWidth();
			Map<String,String> map =  new HashMap<String, String>();
			map.put("rowHeight", rowHeight+"");
			map.put("columnWidth", colWidth+"");
			return map;
		}
		return null;
	}
	
	public Map<String,String> showHideCellBorder(XuiElement currentElement) {
		return new HashMap<String, String>();
	}

}