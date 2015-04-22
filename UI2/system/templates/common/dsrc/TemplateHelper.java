import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.XPath;
import org.dom4j.io.SAXReader;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.common.SystemUtils;
import com.justep.ui.JustepConfig;
import com.justep.ui.util.NetUtils;

// 本逻辑可逐步取代templateService.js对应的调用，形成纯Web的方案，目前templateService.js依赖Studio
public class TemplateHelper extends com.justep.ui.impl.JProcessorImpl {

	static String MODEL_PATH = "__modelPath__";
	static String UI = "__ui__";
	static String WEB_APP = "__webApp__";

	static private String modelPathToAbsPath(String path, String modelPath, String ui) {
		path = SystemUtils.processUIVar(path, ui);
		path = SystemUtils.removeModelVar(path);
		return new File(modelPath + path).getAbsolutePath();
	}

	private JSONObject call(String function, JSONObject params) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException,
			ClassNotFoundException {
		Method method = Class.forName("TemplateHelper$" + function).getDeclaredMethod("run", JSONObject.class);
		return (JSONObject) method.invoke(this, params);
	}

	protected static class getActivity {

		// 根据需要新建的.w路径，获取BIZ的process中定义过的对应activity
		// prames.targetPath 例如：E:/X5/UI/SA/OPM/agent
		// result.activity 例如：["mainActivity", "otherActivity"]
		@SuppressWarnings("unchecked")
		static protected JSONObject run(JSONObject params) throws UnsupportedEncodingException, FileNotFoundException, DocumentException {
			String targetPath = params.get("targetPath").toString();
			targetPath = URLDecoder.decode(targetPath, "utf-8");
			String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
			File targetFile = new File(targetPath);
			File modelFile = new File(modelPath);
			String path = targetFile.getAbsolutePath().substring(modelFile.getAbsolutePath().length() + File.separator.length());
			path = path.substring(path.indexOf(File.separator));
			File bizFile = new File(modelPath + File.separator + "BIZ" + path);
			JSONObject result = new JSONObject();
			JSONArray activity = new JSONArray();
			if (bizFile.isDirectory()) {
				for (File file : bizFile.listFiles()) {
					if (!file.isDirectory()) {
						if (file.getAbsolutePath().endsWith(".process.m")) {
							SAXReader xReader = new SAXReader();
							InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "UTF-8");
							Document doc = xReader.read(isr);
							Element root = doc.getRootElement();
							String defaultNamespace = doc.getRootElement().getNamespaceURI();
							HashMap<String, String> nsMap = new HashMap<String, String>();
							nsMap.put("default", defaultNamespace);
							XPath x = doc.createXPath("//default:static-activity");
							x.setNamespaceURIs(nsMap);
							List<Element> nodes = x.selectNodes(root);
							for (int i = 0; i < nodes.size(); i++) {
								activity.add(nodes.get(i).attributeValue("name"));
							}
							x = doc.createXPath("//default:business-activity");
							x.setNamespaceURIs(nsMap);
							nodes = x.selectNodes(root);
							for (int i = 0; i < nodes.size(); i++) {
								activity.add(nodes.get(i).attributeValue("name"));
							}
						}
					}
				}
			}
			result.put("activity", activity);
			result.put("flag", "true");
			return result;
		}
	}

	protected static class getFiles {
		static String imgPath = "system/templates/index/img";
		static HashMap<String, String> imgMap;
		static {
			imgMap = new HashMap<String, String>();
			imgMap.put(".w", "w.gif");
			imgMap.put(".css", "css.gif");
			imgMap.put(".js", "js.gif");
			imgMap.put(".xml", "xml.gif");
			imgMap.put(".config.xml", "config.xml.gif");
			imgMap.put(".action.m", "action.gif");
			imgMap.put(".mapping.m", "mapping.gif");
			imgMap.put(".ontology.m", "ontology.gif");
			imgMap.put(".process.m", "P.gif");
		}

		static private String getIconPath(String webApp, String ui, String fileName) {
			if ("folder".equals(fileName)) {
				return "/" + webApp + "/" + ui + "/" + imgPath + "/folder.gif";
			} else {
				for (String img : imgMap.keySet()) {
					if (fileName.endsWith(img)) {
						return "/" + webApp + "/" + ui + "/" + imgPath + "/" + imgMap.get(img);
					}
				}
				return "/" + webApp + "/" + ui + "/" + imgPath + "/file.gif";
			}
		}

		static private JSONObject smartAddItem(JSONArray list, File file, String iconPath, String baseDir, JSONArray blackList) {
			String value = file.toString().substring(baseDir.length() + File.separator.length()).replaceAll("\\\\", "/");
			if (!blackList.contains(value)) {
				JSONObject item = new JSONObject();
				item.put("value", value);
				item.put("label", file.getName());
				item.put("icon", iconPath);
				list.add(item);
				return item;
			}
			return null;
		};

		// 根据路径获取路径下的文件/文件夹信息
		// prames.path 例如：/UI2/takeout
		// prames.types 例如：.w、.m 用来标识要过滤的范围，为空则默认显示文件夹
		// prames.baseDir 基础路径，构建树形层次依赖
		// prames.blackList 文件黑名单，在范围类的不返回
		// result.files 例如：["value" : "demo", "label" : "/UI2/demo", "icon" :
		// "img/file.gif"]
		static protected JSONObject run(JSONObject params) {
			String modelPath = params.getString(MODEL_PATH);
			String ui = params.getString(UI);
			String webApp = params.getString(WEB_APP);
			String path = params.getString("path");
			path = modelPathToAbsPath(path, modelPath, ui);
			JSONArray fileTypes = params.getJSONArray("fileTypes");
			String baseDir = params.getString("baseDir");
			baseDir = modelPathToAbsPath(baseDir, modelPath, ui);
			JSONArray blackList = params.getJSONArray("blackList");
			JSONObject result = new JSONObject();
			File[] files = (new File(path)).listFiles();
			if (files != null) {
				JSONArray list = new JSONArray();
				for (int i = 0; i < files.length; i++) {
					File file = files[i];
					String fileName = file.getName();
					if (!fileName.startsWith(".")) {
						if (file.isDirectory()) {
							JSONObject item = smartAddItem(list, file, getIconPath(webApp, ui, "folder"), baseDir, blackList);
							if ((item != null) && (files[i].listFiles() != null)) {
								JSONArray jsonArray = new JSONArray();
								JSONObject jsonObject = new JSONObject();
								jsonObject.put("label", "Loading...");
								jsonObject.put("value", "");
								jsonArray.add(jsonObject);
								item.put("items", jsonArray);
							}
						} else {
							// 没有传递类型只显示目录
							for (int j = 0; j < fileTypes.size(); j++) {
								String type = ((String) fileTypes.get(j)).trim();
								if ("".equals(type)) {
									continue;
								} else if (fileName.endsWith(type.replace("*", "")) || "*.*".equals(type)) {
									String iconPath = getIconPath(webApp, ui, fileName);
									smartAddItem(list, file, iconPath, baseDir, blackList);
									break;
								}
							}
						}
					}
				}
				result.put("files", list);
				result.put("flag", "true");
			}
			return result;
		}
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String postData = getPostData(request);
		// 本过程为通用调用，通过反射调用对应函数完成请求
		JSONObject object = JSONObject.parseObject(postData);
		// 函数名
		String function = object.get("function").toString();
		// 参数
		JSONObject params = (JSONObject) object.get("params");

		// 参数中增加当前环境变量，用于路径处理
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		String ui = JustepConfig.getUIValue(NetUtils.getRequestPath(request));
		String webApp = NetUtils.getContextName(request);
		params.put(MODEL_PATH, modelPath);
		params.put(UI, ui);
		params.put(WEB_APP, webApp);

		response.setCharacterEncoding("UTF-8");
		String result;
		try {
			result = call(function, params).toString();
		} catch (Exception e) {
			result = "{flag:'false'}";
			e.printStackTrace();
		}
		response.getWriter().write(result);
		response.flushBuffer();
	}

}
