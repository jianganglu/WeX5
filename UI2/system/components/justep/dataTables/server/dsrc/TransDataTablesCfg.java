import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.alibaba.fastjson.JSONObject;
import com.justep.system.transform.Mate;
import com.justep.system.transform.Transform;


public class TransDataTablesCfg extends com.justep.ui.impl.JProcessorImpl  {
	public void execute(HttpServletRequest request, HttpServletResponse response)  throws ServletException, IOException{
		String postData = request.getParameter("define");
		Element gridComponentE = null;
		try {
			gridComponentE = (Element) DocumentHelper.parseText(postData).getRootElement();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		Mate mate = new Mate(DataTables.xml2jsonCfg);
		JSONObject ret = (JSONObject)Transform.asJSON(gridComponentE, mate);
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
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		out.write(ret.toString());
		out.flush();
	}
}
