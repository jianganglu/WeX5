import java.io.File;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import com.justep.filesystem.ExtFileSystemProvider;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.util.ExtSpaceUIUtil;
import com.justep.studio.util.StudioConfig;

public class ExcelFileListDatasource {

	public List<String[]> getDatasource(PropertyItem propertyItem) {
		List<String[]> list = new ArrayList<String[]>();
		String filePath = ((XuiElement) propertyItem.getOwerElement()).getXuiDataModel().getFilePath();
		File dir = new File(filePath).getParentFile();
		String parentPath = dir.getPath().replace("\\", "/").replace("\\\\", "/")+"/";
		
		if(ExtSpaceUIUtil.isInExtSpace(parentPath)){
			ExtFileSystemProvider p = new ExtFileSystemProvider(StudioConfig.getUIPath());
			List<File> files = p.getFiles(parentPath,true, ".xls", true);
			for (File file : files) {
				list.add(new String[] { file.getName(), file.getName() });
			}
		}else{
			LinkedList<File> fileList = new LinkedList<File>();
			fileList.add(dir);
			while (!fileList.isEmpty()) {
				File f1 = fileList.removeLast();
				if (f1.isFile() && f1.getName().contains(".xls")) {
					String fileTempPath = f1.getPath().replace("\\", "/").replace("\\\\", "/").replace(".xlsx", ".xml").replace(".xls", ".xml");
					fileTempPath = fileTempPath.replace(parentPath, "");
					list.add(new String[] { fileTempPath, fileTempPath });
				} else if (f1.isDirectory() && !f1.getName().equals(".svn")) {
					File[] files = f1.listFiles();
					for (File f2 : files) {
						fileList.add(f2);
					}
				}
			}
		}
		return list;
	}
}
