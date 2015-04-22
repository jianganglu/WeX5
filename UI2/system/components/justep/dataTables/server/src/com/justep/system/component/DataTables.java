package com.justep.system.component;

import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;

import org.dom4j.Element;
import org.dom4j.QName;

import com.alibaba.fastjson.JSONObject;
import com.justep.system.transform.Mate;
import com.justep.system.transform.Transform;
import com.justep.ui.component.ComponentTemplate;
import com.justep.ui.xml.XMLConstants;

public class DataTables implements ComponentTemplate{
	public static String xml2jsonCfg = "{\"attrs\":{"
			+"            \"columns\":{"
		    +"                     \"type\":'List',"
		    +"                     \"target\":'columns',"
			+"                     \"itemName\":'column',"
		    +"                     \"itemType\":'Map'"
		    +"                     },"
			+"            \"name\":{"
		    +"                     \"target\":'sName',"
		    +"                     \"type\":'String'"
		    +"                     },"
			+"            \"ordering\":{"
		    +"                     \"type\":'Boolean'"
		    +"                     },"
			+"            \"responsive\":{"
		    +"                     \"type\":'Boolean'"
		    +"                     },"
			+"            \"multiSelect\":{"
		    +"                     \"type\":'Boolean'"
		    +"                     },"
			+"            \"showRowNumber\":{"
		    +"                     \"type\":'Boolean'"
		    +"                     },"
			+"            \"stateSave\":{"
		    +"                     \"type\":'Boolean'"
		    +"                     },"
			+"            \"flexibleWidth\":{"
		    +"                     \"type\":'Boolean'"
		    +"                     },"
			+"            \"scrollCollapse\":{"
		    +"                     \"type\":'Boolean'"
		    +"                     },"
			+"            \"orderable\":{"
		    +"                     \"type\":'Boolean'"
		    +"                     },"
			+"            \"visible\":{"
		    +"                     \"type\":'Boolean'"
		    +"                     },"
			+"            \"searchable\":{"
		    +"                     \"type\":'Boolean'"
		    +"                     },"		    
			+"            \"pageLength\":{"
		    +"                     \"type\":'Integer'"
		    +"                     },"		    
			+"            \"label\":{"
		    +"                     \"target\":'title',"
		    +"                     \"type\":'String'"
		    +"                     }"
			+"           }"
		    +"}";

	private Element eDataTableDef;

	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		this.eDataTableDef = bound;
		this.eDataTableDef.setQName(new QName("table", XMLConstants.XHTML_NAMESPACE));
		
		//产生xid
		if(null==eDataTableDef.attribute("xid")) eDataTableDef.addAttribute("xid", createXID());
		//生成grid的配置
		JSONObject cfg = processGridConfig();
		if(null!=cfg){
			bound.addAttribute("data-config", cfg.toJSONString());
			
			//生成footer
			if("true".equalsIgnoreCase(cfg.getString("useFooter"))){
				Element tfoot = this.eDataTableDef.addElement(new QName("tfoot", XMLConstants.XHTML_NAMESPACE));
				Element tr = tfoot.addElement(new QName("tr", XMLConstants.XHTML_NAMESPACE));
				
				int size = cfg.getJSONArray("columns").size();
				if(cfg.containsKey("multiSelect")&&cfg.getBoolean("multiSelect")) size++;
				if(cfg.containsKey("showRowNumber")&&cfg.getBoolean("showRowNumber")) size++;
				for(int i=0;i<size;i++){
					tr.addElement(new QName("th", XMLConstants.XHTML_NAMESPACE));
				}
			}
		}
	}

	private JSONObject processGridConfig(){
		Mate mate = new Mate(xml2jsonCfg);
		JSONObject ret = (JSONObject)Transform.asJSON(eDataTableDef, mate);
		//删除定义节点
		eDataTableDef.clearContent();
		//去除多余的属性
		java.util.List<String> removeAttrs = new ArrayList<String>();
		for(String key : ret.keySet()){
			if(key.startsWith("on")
				||key.startsWith("bind-")
				||"xid".equals(key)
				||"component".equals(key)
				||"style".equals(key)
				||"class".equals(key))
				removeAttrs.add(key);
		}
		for(String attr : removeAttrs){
			ret.remove(attr);
		}

		return ret;
	}
	
	private String createXID(){
		return UUID.randomUUID().toString().toUpperCase().replaceAll("-", "");
	}
	
}
