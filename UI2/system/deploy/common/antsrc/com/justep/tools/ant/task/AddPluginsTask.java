package com.justep.tools.ant.task;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;
import org.apache.tools.ant.taskdefs.Execute;
import org.apache.tools.ant.taskdefs.Redirector;
import org.apache.tools.ant.types.Commandline;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.XPath;
import org.dom4j.io.SAXReader;

public class AddPluginsTask extends Task {

	static final String LINE_SEPARATOR = System.getProperty("line.separator");

	private HashMap<String, Plugin> pluginInfoList = new HashMap<String, Plugin>();
	private Redirector redirector = new Redirector(this);

	private String justepHome;
	private String targetDir;
	private String plugins;

	private List<String> getNeededPlugins(String plugins) throws UnsupportedEncodingException, FileNotFoundException, DocumentException {
		List<String> neededPlugins = new ArrayList<String>();
		if (plugins != null && !("".equals(plugins))) {
			String[] pluginArray = plugins.split(",");
			for (int i = 0; i < pluginArray.length; i++) {
				neededPlugins.add(pluginArray[i]);
			}
		}

		return neededPlugins;
	}

	private List<String> getInstalledPlugins() {
		File pluginsDir = new File(targetDir + "/plugins");

		if (!pluginsDir.exists()) {
			throw new BuildException("插件目录“" + pluginsDir.getAbsolutePath() + "”不存在，请检查工程是否正确");
		}

		ArrayList<String> result = new ArrayList<String>();
		for (File plugin : pluginsDir.listFiles()) {
			if (plugin.isDirectory()) {
				result.add(plugin.getName());
			}
		}
		return result;
	}

	private List<String> getDeletePlugins(List<String> installedPlugins, List<String> neededPlugins) {
		List<String> result = new ArrayList<String>();
		for (String plugin : installedPlugins) {
			if (neededPlugins.indexOf(plugin) < 0) {
				result.add(plugin);
			}
		}
		return result;
	}

	private List<String> getAddPlugins(List<String> installedPlugins, List<String> neededPlugins) {
		List<String> result = new ArrayList<String>();
		for (String plugin : neededPlugins) {
			if (installedPlugins.indexOf(plugin) < 0) {
				result.add(plugin);
			}
		}
		return result;
	}

	class Plugin {
		String id;
		List<String> dependency = new ArrayList<String>();
	};

	private Plugin getPlugin(File pluginXML) throws UnsupportedEncodingException, FileNotFoundException, DocumentException {
		Plugin result = pluginInfoList.get(pluginXML.getAbsolutePath());
		if (result == null) {
			SAXReader xReader = new SAXReader();
			InputStreamReader isr;
			isr = new InputStreamReader(new FileInputStream(pluginXML), "UTF-8");
			Document doc = xReader.read(isr);
			Element plugin = doc.getRootElement();
			result = new Plugin();
			result.id = plugin.attributeValue("id");

			String defaultNamespace = doc.getRootElement().getNamespaceURI();
			HashMap<String, String> nsMap = new HashMap<String, String>();
			nsMap.put("default", defaultNamespace);
			XPath x = doc.createXPath("default:dependency");
			x.setNamespaceURIs(nsMap);
			@SuppressWarnings("unchecked")
			List<Element> nodes = x.selectNodes(plugin);
			for (int i = 0; i < nodes.size(); i++) {
				result.dependency.add(nodes.get(i).attributeValue("id"));
			}

			pluginInfoList.put(pluginXML.getAbsolutePath(), result);
		}
		return result;
	}

	private void addPlugin(List<String> neededPlugins, String pluginID) throws UnsupportedEncodingException, FileNotFoundException, DocumentException {
		if (neededPlugins.indexOf(pluginID) >= 0) {
			return;
		}

		Plugin plugin = getPlugin(new File(targetDir + "/../plugins/" + pluginID + "/plugin.xml"));
		for (int i = 0; i < plugin.dependency.size(); i++) {
			this.addPlugin(neededPlugins, plugin.dependency.get(i));
		}
		neededPlugins.add(pluginID);
	};

	private List<String> sortPluginByDependency(List<String> plugins, Boolean addDependency) throws UnsupportedEncodingException, FileNotFoundException, DocumentException {
		List<String> sortedPlugins = new ArrayList<String>();
		for (String plugin : plugins) {
			addPlugin(sortedPlugins, plugin);
		}

		if (!addDependency) {
			for (int i = sortedPlugins.size() - 1; i >= 0; i--) {
				if (plugins.indexOf(sortedPlugins.get(i)) < 0) {
					sortedPlugins.remove(i);
				}
			}
		}

		return sortedPlugins;
	}

	private void exec(String cmd, String opration, String plugin) throws IOException, BuildException {
		Commandline cmdl = new Commandline();
		cmdl.setExecutable(cmd);
		String[] arg = { "plugin", opration, plugin };
		cmdl.addArguments(arg);

		Execute exe = new Execute(redirector.createHandler(), null);
		exe.setCommandline(cmdl.getCommandline());
		exe.setAntRun(getProject());
		exe.setWorkingDirectory(new File(targetDir));
		exe.setVMLauncher(true);

		int returnCode = exe.execute();
		if (exe.killedProcess()) {
			String msg = "Timeout: killed the sub-process";
			throw new BuildException(msg);
		}
		this.redirector.complete();
		if (Execute.isFailure(returnCode)) {
			throw new BuildException(getTaskType() + " returned: " + returnCode, getLocation());
		}
	}

	public void setJustepHome(String justepHome) {
		this.justepHome = justepHome;
	}

	public void setTargetDir(String targetDir) {
		this.targetDir = targetDir;
	}

	public void setPlugins(String plugins) {
		this.plugins = plugins;
	}

	public void execute() throws BuildException {
		try {
			if ("自动选择".equals(plugins)) {
				return;
			}

			List<String> neededPlugins = getNeededPlugins(plugins);
			List<String> installedPlugins = getInstalledPlugins();
			// file monitor
			List<String> deletePlugins = getDeletePlugins(installedPlugins, neededPlugins);
			List<String> addPlugins = getAddPlugins(installedPlugins, neededPlugins);

			File cordova = new File(this.justepHome + "/tools/cordova/bin/cordova.cmd");
			deletePlugins = sortPluginByDependency(deletePlugins, false);
			// 注意：删除应该逆序，增加是正序，排序是安装依赖关系从上到下
			for (int i = deletePlugins.size() - 1; i >= 0; i--) {
				exec(cordova.getAbsolutePath(), "remove", deletePlugins.get(i));
			}

			addPlugins = sortPluginByDependency(addPlugins, true);
			for (String plugin : addPlugins) {
				exec(cordova.getAbsolutePath(), "add", "../plugins/" + plugin);
			}
		} catch (Exception e) {
			throw new BuildException(e);
		}
	}

}