<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>

<%@ page import="cn.com.map.init.*" %>
<%@ page import="cn.com.map.api.*" %>
<%@ page import="org.jdom.JDOMException" %>
<%@ page import="cn.com.bettle.code.utils.decode.*" %>
<%@ page import="cn.com.bettle.code.utils.json.*" %>
<%@ page import="org.osgeo.mapguide.*" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.apache.log4j.Logger" %>
<%@ include file ="common.jsp" %>
<%
	String paras = request.getParameter("paras");
	String[] paraArray = null;
	if (paras == null || (paraArray = paras.split("-")).length < 2){
	    response.sendRedirect("../../SpatialNet/index/html/index.html");
	    return;
	}
	String userId = paraArray[0];
	String powerId = paraArray[1];
    session.setAttribute("userId", userId);

	String PROJECT_LOG = "cn.com.map.log."+PROJECT_NAME+".index";
    Logger log = Logger.getLogger(PROJECT_LOG);
    String ip= "";
	try{
		InetAddress addr = InetAddress.getLocalHost();
        ip=addr.getHostAddress().toString();//获得本机IP
        String address=addr.getHostName().toString();//获得本机名称

		response.setContentType("text/html; charset=utf-8");
		request.setCharacterEncoding("utf-8"); 
		MapManage mapManage = MapManage.getInstance(mapWebXml);
		ZMap zmap = new ZMap(PROJECT_NAME);
		mapSessionId = zmap.siteStart(request, response);
		String mapSessionIdMD5 = MD5Util.getMD5String(mapSessionId);
		mapSessionIdBase64 = Base64.encode(mapSessionIdMD5);
		log.debug("mapSessionIdBase64::"+mapSessionIdBase64);
		HttpSession websession = request.getSession();
		websession.setAttribute("mapSessionId", mapSessionId);
		websession.setAttribute("mapSessionIdMD5", mapSessionIdMD5);
		log.debug("mapSessionIdMD5::"+mapSessionIdMD5);
		log.debug("mapSessionId::"+mapSessionId);
		//RequestDispatcher rd = sc.getRequestDispatcher(fusionUrl); //定向的页面 url不能包含参数
		//rd.forward(request, response);
    }catch(Exception e){
         String message = e.getLocalizedMessage();
    	 String loginfor = "project::"+PROJECT_NAME+"  file::"+ PROJECT_NAME+"/index.jsp"+" error::"+message;
    	 String error2 = error+"?message="+URLEncoder.encode("Server error please contact the administrator to modify!");
    	 log.error(loginfor);
    	 e.printStackTrace();
		 response.sendRedirect(error2);
    }

%>
<html>

<head>
    <title><%=StringUtils.capitalise(PROJECT_NAME)%></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
</head>

<frameset rows="*" frameborder="NO" border="0" framespacing="0">
    <frame src="../../fusion/templates/mapguide/sparknet/index.html?paras=<%=paras%>&Session=<%= mapSessionId %>&ApplicationDefinition=Library://School/App/app.ApplicationDefinition&locale=en&project=<%=PROJECT_NAME %>&key=<%=URLEncoder.encode(mapSessionIdBase64) %>&ip=<%=ip %>" name="ViewerFrame">
</frameset>

</html>
