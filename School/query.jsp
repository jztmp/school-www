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
	String PROJECT_LOG = "cn.com.map.log."+PROJECT_NAME+".query";
    Logger log = Logger.getLogger(PROJECT_LOG);
    
	try{
		response.setContentType("text/html; charset=utf-8");
		mapSessionIdBase64 = URLDecoder.decode(new String(request.getParameter("mapsessionIdMD5").getBytes("iso8859_1")),"utf-8");
		String clientMapsessionIdMD5 = Base64.decode(mapSessionIdBase64);
		log.debug("2 mapSessionIdBase64::"+mapSessionIdBase64);
		HttpSession websession = request.getSession();
		mapSessionId = (String)websession.getAttribute("mapSessionId");
		log.debug("2 mapSessionId::"+mapSessionId);
		String mapSessionIdMD5 = (String)websession.getAttribute("mapSessionIdMD5");
		log.debug("2 mapSessionIdMD5::"+mapSessionIdMD5);
		
		if(!clientMapsessionIdMD5.equals(mapSessionIdMD5)){
		   String error2 = error+"?message="+URLEncoder.encode("Your session timeout, please re login! ");
		   throw new MapException(error2);
		}
		
		String layername = (String)request.getParameter("layer");
		String filter = (String)request.getParameter("filter");
		String sMapname = (String)request.getParameter("sMapname");
		
		MapManage mapManage = MapManage.getInstance(mapWebXml);
		ZMap zmap = new ZMap(PROJECT_NAME);
		zmap.setsMapName(sMapname);
		zmap.openSiteConnection(request,response,mapSessionId);
		ZLayer zLayer = new ZLayer(mapSessionId,layername,zmap); 
		ZFilter zFilter = new ZFilter(filter,null,null,-1,ZFilter.ONLY_BASIC);
		List<Map> list = zLayer.getFeatureList(zFilter);
		log.debug("----------------------5"+JsonGsonSerializeUtil.list2Json(list));
		String result = "{topics:"+JsonGsonSerializeUtil.list2Json(list)+", totalCount:"+list.size()+"}";
		response.getWriter().write(result);

    }catch(Exception e){
    	 e.printStackTrace();
         String message = e.getLocalizedMessage();
    	 String loginfor = "project::"+PROJECT_NAME+"  file::"+ PROJECT_NAME+"/query.jsp"+" error::"+message;
    	 String message2 = "{error : {info: 'Server error please contact the administrator to modify!'}}";
    	 log.error(loginfor);
		 response.getWriter().write(message2);
    }

%>

