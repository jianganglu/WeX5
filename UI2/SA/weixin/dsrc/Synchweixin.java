import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.justep.biz.client.Action;
import com.justep.biz.client.ActionResult;

import com.justep.weixin.cp.WxHelper;

public class Synchweixin extends com.justep.ui.impl.JProcessorImpl  {
	Logger logger = Logger.getLogger(Synchweixin.class);
	
	@Override
	public void execute(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		super.execute(req, resp);
		ClassLoader cl = Thread.currentThread().getContextClassLoader();
		try {
			
			Thread.currentThread().setContextClassLoader(Synchweixin.class.getClassLoader());
			doExec(req,resp);
		} finally{
			Thread.currentThread().setContextClassLoader(cl);
		}
		
	}
	
	private void doExec(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException{	
		String actionName = req.getParameter("actionName");
		String agentId = req.getParameter("agentId");
		String AccountType = req.getParameter("AccountType");
		String keepTopOrg = req.getParameter("keepTopOrg");
		Action action = new Action();
		action.setName(actionName);
		if(agentId != null && !agentId.equals(""))
			action.setParameter("AppID", agentId);
		if(AccountType != null && !AccountType.equals(""))
			action.setParameter("AccountType", AccountType);
		if(keepTopOrg != null && !keepTopOrg.equals(""))
			action.setParameter("keepTopOrg", keepTopOrg);
		ActionResult result = WxHelper.invokeAction(action,req);
			
		if (!result.isSuccess()){
			throw new RuntimeException(result.getMessage());
		}
	
	}
}
