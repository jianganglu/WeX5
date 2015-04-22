import java.io.File;

import org.eclipse.jface.dialogs.MessageDialog;

import com.justep.studio.ui.editors.xui.BaseComponent;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.util.ExtSpaceUIUtil;

public class ExcelLayout extends BaseComponent{
	
	public void gotoExcelLayout(XuiElement currentElement) { 
	
		String src = currentElement.getOriginElement().getAttribute("src");
		if(src.equals("")){
			 MessageDialog.openInformation(this.getDesigner().getShell(), "提示", "请选择excel布局文件");
			 return;
		}
		String filePath = new File(this.getDesigner().getEditorPart().getDataModel().getFilePath()).getParent()+"/"+src;
		if(ExtSpaceUIUtil.isInExtSpace(filePath)){
			filePath = ExtSpaceUIUtil.getRealPath(filePath);
		}
		File source = new File(filePath);
		if(!source.exists()){
			 MessageDialog.openInformation(this.getDesigner().getShell(), "提示", "excel布局文件："+src+"不存在");
			 return;
		}
         this.getDesigner().getEditorPart().getEditorContainerPanel().showDesignePanel("excel",currentElement);
	}
	
	public void closeExcelLayout(XuiElement currentElement){
		this.getDesigner().getEditorPart().getEditorContainerPanel().showDesignePanel("web-designer",currentElement);
		this.repaint(currentElement);
	}
	
//	public void newComponentByRelation(XuiElement currentElement){
//		
//	}
//	public void initContextItemEnabled(Item item) {
//		String method = (String)item.getData("method");
//		if("gotoExcelLayout".equals(method)){
//			if(LayoutUtils.isCellLayout(this.getXuiElement())){
//				 this.setItemEnabled(item,true);
//			}else{
//				 this.setItemEnabled(item,false);
//			}
//		}
//	}
}
