import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.swt.widgets.Composite;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.RowLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Table;
import org.w3c.dom.Element;
import org.w3c.dom.Document;

import swing2swt.layout.BorderLayout;

import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.W3cDocumentHelper;
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.ui.editors.xui.XuiDataSourceManager;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.exjface.DataSetTableViewer;
import com.justep.studio.util.XPathUtil;

public class EditMappingPage extends Composite implements IPropertyDialogPage {

	private Table table;
	private DataSet dataset,dataset1,dataset2,ds1bak;
	private DataSetTableViewer tableViewer;
	private DataSetTableViewer tv1,tv2;
	private PropertyItem propertyItem;
	//private Text conpectText;
	private Button operationRadio1;
	private Button operationRadio2;
	private Button operationRadio3;
	private Button operationRadio4;
	private Combo conceptCombo1,conceptCombo2;
	private Group group1,group2;
	private Document winTar,winOri;
	private Map<String,Object> map1,map2;
	private Label lblwaiting;
	private XuiElement xblElement = null;
	private Composite com2;
	
	private XuiElement fromData;
	private XuiElement toData;
	
	public EditMappingPage(Composite parent, int style) {
		super(parent, style);
		this.setSize(820, 500);
		map1 = new LinkedHashMap<String,Object>();
		map2 = new LinkedHashMap<String,Object>();
	}
	
	private void initDataset(){
		dataset=new DataSet();
		dataset.addColumn("fromlbl").setLength(180).setDataType("String").setHeader("弹出窗口关系").setEditable(false).setEditor("TextCellEditor");
		dataset.addColumn("tolbl").setLength(170).setDataType("String").setHeader("主窗口关系").setEditable(false).setEditor("TextCellEditor");
		dataset.addColumn("from").setVisible(false);
		dataset.addColumn("to").setVisible(false);
		dataset.addColumn("locator").setLength(65).setDataType("bool").setHeader("是否鉴别").setEditable(true).setEditor("TextCellEditor");
//		dataset.addColumn("remark").setLength(100).setDataType("String").setEditable(false).setEditor("TextCellEditor");	
		
		ds1bak = new DataSet();
		ds1bak.addColumn("relation").setDataType("String");
		ds1bak.addColumn("label").setDataType("String");
		ds1bak.addColumn("concept").setDataType("String");		
		
		dataset1=new DataSet();
		dataset1.addColumn("name").setLength(165).setDataType("String").setHeader("弹出窗口关系").setEditable(false).setEditor("TextCellEditor");
		dataset1.addColumn("relation").setLength(150).setDataType("String").setVisible(false);
		
		dataset2=new DataSet();
		dataset2.addColumn("name").setLength(165).setDataType("String").setHeader("主窗口关系").setEditable(false).setEditor("TextCellEditor");
		dataset2.addColumn("relation").setLength(150).setDataType("String").setVisible(false);
	}

	private void createContents(Composite container){
		BorderLayout borderLayout = new BorderLayout(0,0);
		container.setLayout(borderLayout);
		
		Composite groupcom = new Composite(container, SWT.NONE);
		groupcom.setLayout(new FillLayout());
		groupcom.setLayoutData(BorderLayout.WEST);
		group1 = new Group(groupcom, SWT.NONE);
		//group1.setBounds(0,0, 180, 420);
		group1.setText("弹出窗口概念");
		group1.setLayout(new BorderLayout(0, 0));
		group2 = new Group(groupcom, SWT.NONE);
		//group2.setBounds(180,0, 180, 420);
		group2.setText("目标概念");		
		group2.setLayout(new BorderLayout(0, 0));
		
		conceptCombo1 = new Combo(group1,SWT.NONE);
		//conceptCombo1.setBounds(5, 15, 170, 20);
		conceptCombo1.setLayoutData(BorderLayout.NORTH);
		
		conceptCombo1.addSelectionListener(new SelectionAdapter(){
			public void widgetSelected(final SelectionEvent e) {
				concetpCombo1Selection();
			}				
		});		
		
		conceptCombo2 = new Combo(group2,SWT.NONE);
		//conceptCombo2.setBounds(5, 15, 170, 20);
		conceptCombo2.setLayoutData(BorderLayout.NORTH);
		
		conceptCombo2.addSelectionListener(new SelectionAdapter(){
			public void widgetSelected(final SelectionEvent e) {
				conceptCombo2Selection();
			}				
		});		

		tv1 = new DataSetTableViewer(group1, SWT.BORDER | SWT.MULTI);
		table = tv1.getTable();
		table.setLinesVisible(true);
		table.setHeaderVisible(true);	
		//table.setBounds(5,37, 170, 380);
		table.setLayoutData(BorderLayout.CENTER);
		
		tv2 = new DataSetTableViewer(group2, SWT.BORDER | SWT.MULTI);
		table = tv2.getTable();
		table.setLinesVisible(true);
		table.setHeaderVisible(true);	
		//table.setBounds(5,37, 170, 380);
		table.setLayoutData(BorderLayout.CENTER);
		
		Composite com = new Composite(container, SWT.NONE);
		com.setLayout(new BorderLayout(0,0));
		com.setLayoutData(BorderLayout.CENTER);
		//映射关系展现
		Composite com1 = new Composite(com, SWT.NONE);
		//com1.setBounds(360, 0, 500, 26);
		com1.setLayout(new RowLayout());
		com1.setLayoutData(BorderLayout.NORTH);
					
//		Label conpectLabel = new Label(com1, SWT.HORIZONTAL | SWT.LEFT | SWT.SHADOW_NONE );
//		conpectLabel.setBounds(4, 30, 60, 20);
//		conpectLabel.setText("目标概念：");
		
//		Label conpectLabel1 = new Label(com1, SWT.HORIZONTAL | SWT.LEFT | SWT.SHADOW_NONE );
//		conpectLabel1.setBounds(285, 6, 200, 20);
//		conpectLabel1.setText("（使用 CTRL 或 SHIFT 键进行多选）");
						
				
		Button addMappingBtn = new Button(com1,SWT.PUSH|SWT.FLAT);
		//addMappingBtn.setBounds(2, 2, 70, 20);
		addMappingBtn.setText("添加映射");
		
		addMappingBtn.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(final SelectionEvent e) {
				tableViewer.getTable().forceFocus();

				List<DataRecord> dl1 = dataset1.getSelectedRecord();
				List<DataRecord> dl2 = dataset2.getSelectedRecord();
				
				int dl1size = dl1.size();
				int dl2size = dl2.size();
				
				int max = dl1size>dl2size?dl1size:dl2size;

				if (max==0){
					dataset.addRecord(new Object[] {"","","","",false});					
				}else {
					for(int i = 0;i < max;i++){
						String v1 = i<dl1size?dl1.get(i).getString("name"):"";
						String v2 = i<dl2size?dl2.get(i).getString("name"):"";
						String v3 = i<dl1size?dl1.get(i).getString("relation"):"";
						String v4 = i<dl2size?dl2.get(i).getString("relation"):"";
						
						//String v3 = "";
/*						if (i<dl1size){
							v3 = remarkTargetConcept(dl1.get(i).getString("concept"),conceptCombo2.getText());
							v3 = v3.equals("")?checkRepeatRelation(clearBrackets(dl1.get(i).getString("text"))):v3;
						}
*/						dataset.addRecord(new Object[] {v1,v2,v3,v4,false});
					}					
				}	

				tableViewer.refresh();				
			}
		});
		
	

		Button delMappingBtn = new Button(com1,SWT.PUSH|SWT.FLAT);
		//delMappingBtn.setBounds(72, 2, 70, 20);
		delMappingBtn.setText("删除映射");

		delMappingBtn.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(final SelectionEvent e) {
				if(tableViewer.getTable().getColumnCount()<=0){
					return;
				}
				List<DataRecord> list = dataset.getSelectedRecord();
				
				if(list.size()>0){
					dataset.deleteRecord(list.get(0));
				}
				
			}
		});	
		
		Button delAllRelation = new Button(com1,SWT.PUSH|SWT.FLAT);
		//delAllRelation.setBounds(142, 2, 100, 20);
		delAllRelation.setText("删除全部映射");

		delAllRelation.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(final SelectionEvent e) {
				dataset.removeAll();
				tableViewer.refresh();
			}
		});	

//		Button checkBtn = new Button(com1,SWT.PUSH|SWT.FLAT);
//		checkBtn.setBounds(242, 2, 40, 20);
//		checkBtn.setText("检查");
//
//		checkBtn.addSelectionListener(new SelectionAdapter() {
//			public void widgetSelected(final SelectionEvent e) {
//				checkAll();
//			}
//		});		

		com2 = new Composite(com, SWT.NONE);
		//com2.setBounds(362, 396, 500, 20);
		com2.setLayout(new RowLayout());
		com2.setLayoutData(BorderLayout.SOUTH);

		Label operationLabel = new Label(com2, SWT.HORIZONTAL | SWT.LEFT | SWT.SHADOW_NONE );
		//operationLabel.setBounds(2, 6, 118, 20);
		operationLabel.setText("主窗口数据操作方式：");
		
		operationRadio1 = new Button(com2,SWT.NONE|SWT.RADIO|SWT.LEFT);
		//operationRadio1.setBounds(120, 2, 65, 20);
		operationRadio1.setText("新增全部");
		operationRadio1.setToolTipText("将返回数据全部新增到目标概念");
		
		operationRadio2 = new Button(com2,SWT.NONE|SWT.RADIO|SWT.LEFT);
		//operationRadio2.setBounds(188, 2, 138, 20);
		operationRadio2.setText("根据鉴别列修改或新增");
		operationRadio2.setToolTipText("根据鉴别列与目标概念数据进行比对，相同则修改，不同则新增");

		operationRadio3 = new Button(com2,SWT.NONE|SWT.RADIO|SWT.LEFT);
		//operationRadio3.setBounds(326, 2, 150, 20);
		operationRadio3.setText("删除全部后新增");
		operationRadio3.setToolTipText("删除所有目标概念数据，将返回数据全部新增");

		operationRadio4 = new Button(com2,SWT.NONE|SWT.RADIO|SWT.LEFT);
		operationRadio4.setText("修改当前行数据");
		operationRadio4.setToolTipText("根据映射关系，修改主窗口对应的当前行数据");		
		
		initDataset();		
		
		Composite com3 = new Composite(com, SWT.NONE);
		//com3.setBounds(364, 26, 430, 370);
		com3.setLayout(new FillLayout());
		com3.setLayoutData(BorderLayout.CENTER);
		
		tableViewer = new DataSetTableViewer(com3, SWT.BORDER | SWT.FULL_SELECTION);
		table = tableViewer.getTable();
		table.setLinesVisible(true);
		table.setHeaderVisible(true);	
		//table.setBounds(0, 0, 420, 370);
		tableViewer.setDataSet(dataset);
		
		tv1.setDataSet(dataset1);
		tv2.setDataSet(dataset2);

		final Label lbl = new Label(com1, SWT.SHADOW_NONE );
		lbl.moveAbove(table);
		//lbl.setBounds(120, 100, 200, 14);
		lbl.setAlignment(SWT.CENTER);
		lbl.setText("正在加载，请稍候......");	
		lbl.setBackground(new Color(getDisplay(),255,255,150));
		
		Thread t = new Thread(new Runnable(){
			public void run() {
				getDisplay().syncExec(new Runnable(){
					public void run() {
						setTableDataByXML(xblElement);	
						lbl.dispose();
						}
					}				
				);								
			}
		});
		
		t.start();		
		
	}
	
	private void concetpCombo1Selection() {
		Thread t = new Thread(new Runnable(){
			public void run() {
				getDisplay().syncExec(new Runnable(){
					public void run() {
						paintProcess(group1,tv1.getTable());
						
						String value = conceptCombo1.getText();
						if (value != ""){
							if (map1.get(value)==null){
								map1.put(value, getRelation(winOri,value));
							}
							dataset1.removeAll();
							
							@SuppressWarnings("unchecked")
							Map<String,String> map = (Map<String,String>)map1.get(value);
							for (String s:map.keySet()){
								dataset1.addRecord(new Object[]{map.get(s)+"["+s+"]",s});        				            			
							}
						}
						tv1.refresh();
						
						lblwaiting.dispose();
					}			
					}				
				);								
			}
		});
		
		t.start();
		
	}

	private void conceptCombo2Selection(){
		Thread t = new Thread(new Runnable(){
			public void run() {
				getDisplay().syncExec(new Runnable(){
					public void run() {
						paintProcess(group2,tv2.getTable());
					
						String value = conceptCombo2.getText();
						if (value != ""){
							if (map2.get(value)==null){
								map2.put(value, getRelation(winTar,value));
							}
							dataset2.removeAll();
							
							@SuppressWarnings("unchecked")
							Map<String,String> map = (Map<String,String>)map2.get(value);
							for (String s:map.keySet()){
								dataset2.addRecord(new Object[]{map.get(s)+"["+s+"]",s});         				            			
							}
						}
						tv2.refresh();
						
						lblwaiting.dispose();
					}			
					}				
				);								
			}
		});
		
		t.start();
	}
	
	public Object getReturnValue() {
		createMappingXMLByTableData();
		return null;
	}

	public String isValid() {
		return this.dataset.validate();
	}
	
	private void paintProcess(Composite container,Table tb){		
		lblwaiting = new Label(container, SWT.HORIZONTAL | SWT.CENTER | SWT.SHADOW_NONE );
		lblwaiting.moveAbove(tb);
		lblwaiting.setBackground(new Color(getDisplay(), 255, 255, 150));
		lblwaiting.setBounds(20, 200, 120,16);
		lblwaiting.setText("正在载入,请稍候...");
	}

	public void setPropertyItem(PropertyItem arg0) {
		this.propertyItem = arg0;
		xblElement = (XuiElement) this.propertyItem.getOwerElement();
		this.winTar = xblElement.getOriginElement().getOwnerDocument();		

		try {
			String url = xblElement.getProperyValue("src");
			this.winOri = xblElement.getXuiDataModel().parseWFile(url);
		} catch (Exception e) {
			e.printStackTrace();
		}	
		
		this.createContents(this);			
	}

	public void setReturnValueStrategy(IPropertyValueStrategy arg0) {
		
	}
	
	@SuppressWarnings("unchecked")
	private void setTableDataByXML(XuiElement xblElement){
		dataset.removeAll();
		String operation = "";
		
		List<Element> el = XPathUtil.selectNodes(this.winOri, ".//*[starts-with(@component,'$UI/system/components/justep/data/')]");//[@concept!='']		
		for (Element e:el){
			conceptCombo1.add(e.getAttribute("xid"));			
		}
		
		List<Element> ell = XPathUtil.selectNodes(this.winTar, ".//*[starts-with(@component,'$UI/system/components/justep/data/')]");//[@concept!='']		
		for (Element e:ell){
			conceptCombo2.add(e.getAttribute("xid"));			
		}
		
		XuiElement ResultElement = xblElement.getChildByTagName("result");
		if(ResultElement != null){
			final String concept = ResultElement.getProperyValue("concept");
			final String origin = ResultElement.getProperyValue("origin");
			operation = ResultElement.getProperyValue("operation");

			if (!"".equals(origin)){
				conceptCombo1.setText(origin);
				map1.put(origin, getRelation(winOri,conceptCombo1.getText()));							
				Map<String,String> map = (Map<String,String>)map1.get(origin);
				for (String s:map.keySet()){
					dataset1.addRecord(new Object[]{map.get(s)+"["+s+"]",s});
				}
				tv1.refresh();
				
			}
			if (!"".equals(concept)){
				conceptCombo2.setText(concept);
				map2.put(concept, getRelation(winTar,conceptCombo2.getText()));	
				Map<String,String> map = (Map<String,String>)map2.get(concept);
				for (String s:map.keySet()){
					dataset2.addRecord(new Object[]{map.get(s)+"["+s+"]",s});  
				}
				tv2.refresh();
			}
			
			//mapping
			List<XuiElement> mappingElementList = ResultElement.getChildListByTagName("mapping");
			Object[] values = new Object[5];
			for(XuiElement mappingElement:mappingElementList){		
				String s1 = (mappingElement.getProperyValue("from"));
				String s2 = (mappingElement.getProperyValue("to")); 
				
				values[0] = (!("").equals(s1)&&s1!=null)?((Map<String,String>)map1.get(origin)).get(s1)+"["+s1+"]":"";
				values[1] = (!("").equals(s2)&&s2!=null)?((Map<String,String>)map2.get(concept)).get(s2)+"["+s2+"]":"";;
				values[2] = (!("").equals(s1)&&s1!=null)?s1:"";
				values[3] = (!("").equals(s2)&&s2!=null)?s2:"";
				values[4] = "true".equals(mappingElement.getProperyValue("locator"))?true:false;
				dataset.addRecord(values);
			}			
			tableViewer.refresh();
		}
		
		if (operation.equals("new")||operation==null||operation.equals("null")||operation.equals("")){
			operationRadio1.setSelection(true);				
		}else if(operation.equals("edit")){
			operationRadio2.setSelection(true);
		}else if (operation.equals("clear")){
			operationRadio3.setSelection(true);
		}else if (operation.equals("modify")){
			operationRadio4.setSelection(true);
		}
	}
	
	//生成mapping写入页面
	public void createMappingXMLByTableData()
	{
		XuiElement xblElement = (XuiElement) this.propertyItem.getOwerElement();
		
		xblElement.removeChildren("result");
		XuiDataModel model = xblElement.getXuiDataModel();
		
		String operation = operationRadio1.getSelection()?"new":"";
		operation = operationRadio2.getSelection()?"edit":operation;
		operation = operationRadio3.getSelection()?"clear":operation;
		operation = operationRadio4.getSelection()?"modify":operation;
		
		if (dataset.getDataRecords().size()>0){
			StringBuffer dataXML = new StringBuffer();
			dataXML.append("<result concept =\"").append(conceptCombo2.getText()).append("\" operation = \"")
			.append(operation).append("\" origin = \"").append(conceptCombo1.getText()).append("\">");
			List<DataRecord> drList = this.dataset.getData();
			
			for(DataRecord dr:drList){
				String locator = dr.getString("locator").equals("true")?" locator = \"true\"":"";			
				dataXML.append("<mapping from=\"").append((dr.getString("from")))
				.append("\" to=\"").append((dr.getString("to"))).append("\"")
				.append(locator).append("/>");
			}
			dataXML.append("</result>");
			
			model.addElement("result", xblElement,null,null, dataXML.toString(),null);						
		}
	}
	
	@SuppressWarnings("unchecked")
	private Map<String,String> getRelation(Document doc,String concept){
		
		Map<String,String> relationMap = new LinkedHashMap<String,String>();
		
		if(fromData==null){
		//TODO:原有通过doc取得数据的代码
		List<Element> el = XPathUtil.selectNodes(doc, ".//*[starts-with(@component,'$UI/system/components/justep/data/')][@xid='"+concept+"']");			
		for (Element e:el){
			String dataId = e.getAttribute("xid");
			if (dataId != null){
				List<Element> ecols = XPathUtil.selectNodes(e,".//*[local-name()='column']");
				if(null!=ecols && ecols.size()>0){
					for(Element ecol : ecols){
						String name = ecol.getAttribute("name");
						String label = ecol.getAttribute("label");
						relationMap.put(name, (label!=null&&!"".equals(label))?label:name);
					}
				}else{
					Element readerE = W3cDocumentHelper.getFirstChildXmlElementByTag(e, "reader");
					String moduleName = null;
					String actionName = null;
					
					if (readerE == null)
					{
						List<Element> readerEL = XPathUtil.selectNodes(doc, ".//*[local-name()='reader']");
						if (readerEL==null){
							readerEL = XPathUtil.selectNodes(doc.getParentNode().getOwnerDocument(), ".//*[local-name()='reader']");
						}
						
						if (readerEL==null){
							return null;
						}
						
						readerE = readerEL.get(0);
					}		
					
					if(readerE!=null){
						String action = readerE.getAttribute("action");
						int idx = action.lastIndexOf("/");
						if(idx!=-1){
							moduleName = action.substring(0,idx);
							actionName = action.substring(idx+1);
						}
					}
					
					if(moduleName!=null){
						try {
							DataSet ds = XuiDataSourceManager.getRelationsOfActionMainConcept(moduleName,actionName,true);
							
							int size = ds.getDataRecords().size();
							for (int i = 0; i < size; i++){
								relationMap.put(ds.getString(i, "alias"), ds.getString(i, "label"));
							}
						} catch (Exception e1) {
							e1.printStackTrace();
						}
						
					}
				}
			}
		}

		}else{
			//TODO xyh add 通过xuiDataModel取得数据
			XuiElement dataElement = this.fromData;
			if(!dataElement.getId().equals(concept)){
				dataElement = this.toData;
			}
			System.out.println("aaaa:"+dataElement.getId());
			String reader = dataElement.getProperyValue("reader");
			if(reader==null || reader.trim().equals("")){
				return relationMap;
			}
			
			int idx = reader.lastIndexOf("/");
			String moduleName = reader.substring(0,idx);
			String actionName = reader.substring(idx+1);
			
			
			DataSet ds = XuiDataSourceManager.getRelationsOfActionMainConcept(moduleName,actionName);
			
			int size = ds.getDataRecords().size();
			for (int i = 0; i < size; i++){
				relationMap.put(ds.getString(i, "alias"), ds.getString(i, "label"));
			}
			 
		}
		
		return relationMap;		
	}
	
		
	//xhy add - 为支持模板向导中重用
	public void refreshData(XuiElement fromData, XuiElement toData){
		this.fromData = fromData;
		this.toData = toData;
		
		conceptCombo1.removeAll();
		conceptCombo2.removeAll();
		dataset.removeAll();
		dataset1.removeAll();
		dataset2.removeAll();
		ds1bak.removeAll();
		map1.clear();
		map2.clear();
		
		conceptCombo1.add(fromData.getId());
		conceptCombo1.setText(fromData.getId());
		conceptCombo1.setEnabled(false);
		concetpCombo1Selection();
		
		conceptCombo2.add(toData.getId());
		conceptCombo2.setText(toData.getId());
		conceptCombo2.setEnabled(false);
		conceptCombo2Selection();

		tableViewer.refresh();
		com2.setVisible(false);
	}
}
