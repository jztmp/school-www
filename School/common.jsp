<%@ page import="java.util.*" %>
<%@ page import="java.io.*" %>
<%@ page import="java.text.*" %>
<%@ page import="javax.servlet.jsp.*" %>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="java.net.*" %>

<%

    String PROJECT_NAME = "School";
    
    String error = "error.jsp";
    ServletContext sc = getServletContext();
	String basicPath = sc.getRealPath("/");
    String mapWebXml = basicPath+"/MapWeb.xml";
    String IP = InetAddress.getLocalHost().getHostAddress();
    int Port = request.getServerPort();
    String crentUrl = request.getRequestURI();
    String basicUrl = "http://"+IP+":"+Port;
    String mapSessionId = "";
    String mapSessionIdBase64 = "";

    
%>

