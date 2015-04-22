import org.dom4j.Element;



public class Tree extends com.justep.system.component.List{
	protected Element getTemplate(){
		return (Element)eDef.selectSingleNode(".//*[contains(@class,'x-tree-template')]");
	}
}
