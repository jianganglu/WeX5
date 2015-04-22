import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.ComThread;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;
import com.justep.common.SystemUtils;
import com.justep.filesystem.FileSystem;
import com.justep.filesystem.FileSystemWrapper;

public class XmlToExcel extends com.justep.ui.impl.JProcessorImpl  {
	public static final int EXCEL_FILEFORMAT_XLEXCEL8 = 56;
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String pathname = request.getParameter("pathname");
		this.xmlToExcel(pathname);
	}
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}
	
	private void xmlToExcel(String pathname) {
		pathname = pathname.replace("/", "\\");
		String targetFile = pathname.substring(0, pathname.length() - 2) + "ls";
		ComThread.InitSTA();
		ActiveXComponent app = new ActiveXComponent("Excel.Application"); // 启动Excel
		try {
			app.setProperty("Visible", new Variant(false));
			Dispatch excels = app.getProperty("Workbooks").toDispatch();
			Dispatch excel = Dispatch.invoke(excels, "Open", Dispatch.Method, new Object[] { pathname, new Variant(false), new Variant(true) }, new int[1]).toDispatch();
			Dispatch.invoke(excel, "SaveAs", Dispatch.Method, new Object[] { targetFile, new Variant(EXCEL_FILEFORMAT_XLEXCEL8) }, new int[1]); // 2003格式的二进制
			Variant f = new Variant(false);
			Dispatch.call(excel, "Close", f);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			app.invoke("Quit", new Variant[] {});
			ComThread.Release();
		}
		
	}
	static {
		FileSystem fs = FileSystemWrapper.instance();
		String path = fs.getRealPath("/UI2/system/templates/server/lib");
		String os = System.getProperty("os.name");
		boolean OS_Windows = os.startsWith("Windows");
		if (OS_Windows) {
			String libpath = SystemUtils.normalizeLib(path, "jacob-1.14.3");
			System.setProperty("jacob.dll.path", libpath);

		} else {
			throw new RuntimeException("jacob donn't support non-windows");
		}
	}
}
