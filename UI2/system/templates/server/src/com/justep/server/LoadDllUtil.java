package com.justep.server;

import com.justep.common.SystemUtils;
import com.justep.filesystem.FileSystem;
import com.justep.filesystem.FileSystemWrapper;

public class LoadDllUtil {
	public static void loadDll() {
		FileSystem fs = FileSystemWrapper.instance();
		String x86Path = fs.getRealPath("/UI2/system/templates/report/server/lib");
		String os = System.getProperty("os.name");
		boolean OS_Windows = os.startsWith("Windows");
		if (OS_Windows) {
			String libpath = SystemUtils.normalizeLib(x86Path, "jacob-1.14.3");
			System.setProperty("jacob.dll.path", libpath);

		}else{
			throw new RuntimeException("jacob donn't support non-windows");
		}
	}
}