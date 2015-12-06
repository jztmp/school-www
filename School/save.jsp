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
		String argument = (String)request.getParameter("argument");
		Map<String,Object> propertyMap = JsonLibSerializeUtil.getMap4Json(argument);
		//Map<String,Object> propertyMap = JsonGsonSerializeUtil.json2Map(argument);
		String sMapname = (String)request.getParameter("sMapname");
		int action = Integer.parseInt((String)request.getParameter("action"));
		
		MapManage mapManage = MapManage.getInstance(mapWebXml);
		ZMap zmap = new ZMap(PROJECT_NAME);
		zmap.setsMapName(sMapname);
		zmap.openSiteConnection(request,response,mapSessionId);
		ZLayer zLayer = new ZLayer(mapSessionId,layername,zmap); 
		ZLayer zLayer2 = new ZLayer(mapSessionId,layername+"2",zmap); 
		
		switch(action){
				case 0:
						String filter = "FeatId = "+(String)propertyMap.get("FeatId");
				        String geoText = (String)request.getParameter("geoText");
				        zLayer.update(filter, geoText, propertyMap, true);
						//zLayer2.update(filter, geoText, propertyMap, true);
						break;
				case 1:
				        String geoText2 = (String)request.getParameter("geoText");
				        propertyMap.remove("FeatId");
				        zLayer.insertFeature(geoText2, propertyMap, true);
						//zLayer2.insertFeature(geoText2, propertyMap, true); 两个图层用了相同的数据源
						break;						
				case 2:
						String filter2 = "FeatId = "+(String)propertyMap.get("FeatId");
						zLayer.update(filter2, null, propertyMap, true);
						//zLayer2.update(filter2, null, propertyMap, true);
						break;
				case 3:
						String filter3 = "FeatId = "+(String)propertyMap.get("FeatId");
						zLayer.deleteFeature(filter3, true);
						//zLayer2.deleteFeature(filter3, true);
						break;
		}

		response.getWriter().write("{success:true}");

    }catch(Exception e){
    	 e.printStackTrace();
         String message = e.getLocalizedMessage();
    	 String loginfor = "project::"+PROJECT_NAME+"  file::"+ PROJECT_NAME+"/save.jsp"+" error::"+message;
    	 String message2 = "{error : {info: 'Server error please contact the administrator to modify!'}}";
    	 log.error(loginfor);
		 response.getWriter().write(message2);
    }

%>

