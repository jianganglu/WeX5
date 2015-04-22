import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.ActionUtils;

public class Holidays extends com.justep.ui.impl.JProcessorImpl {
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String y = request.getParameter("year");
		String m = request.getParameter("month");
		String result = getHolidays(y, m);

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(result.getBytes("UTF-8"));
		output.flush();
		output.close();
	}
	
	private String getHolidays(String year, String month){
		JSONObject obj = get("http://opendata.baidu.com/api.php?query=" + year + "%E5%B9%B4" + month + "%E6%9C%88&resource_id=6018&ie=utf8&oe=gbk&format=json");
		JSONArray a =  (JSONArray)obj.get("data");
		obj = (JSONObject)a.get(0);
		a = (JSONArray)obj.get("holiday");
		String result = JSONArray.toJSONString(a);
		return result;
	}

	private JSONObject get(String url) {  
          
        HttpClient client = new HttpClient();
        GetMethod get = new GetMethod(url);  
        JSONObject json = null;  
        try {  
			int statusCode = client.executeMethod(get);
			if (statusCode == HttpStatus.SC_OK) {
				String jsonText = get.getResponseBodyAsString();
				json = (JSONObject)JSONObject.parse(jsonText);
				return json;
			}
        } catch (Exception e) {  
            throw new RuntimeException(e);  
        } finally{  
            //关闭连接 ,释放资源  
			get.releaseConnection();
        }  
        return json;  
    }  	
}
