<%@ page import="cn.com.map.init.*" %>
<%@ page import="cn.com.map.api.*" %>
<%@ page import="org.jdom.JDOMException" %>
<%@ page import="com.bettle.utils.code.*" %>
<%@ page import="org.osgeo.mapguide.*" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ include file ="common.jsp" %>
<%

    String errorMessage = "";

	try{
		request.setCharacterEncoding("utf-8"); 
        errorMessage = URLDecoder.decode(new String(request.getParameter("message").getBytes("iso8859_1")),"utf-8");//兼容双字节字符
		
    }catch(Exception e){
    
    }

%>
<html>

<head>
    <title>error</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
</head>

<body>
  <%= errorMessage%>
</body>
</html>
