
var _IP_PRJECT = "192.168.99.192";    //项目所在IP
var _IP_JS_API = "192.168.99.192";    //JS API所在IP
var _IP_MAP_API = "192.168.99.192";   //地图服务所在IP

var _PORT_IP_PRJECT = 8080;   //项目tomcat端口

var _PORT_JS_API=8080;    //JS API的tomcat端口

var _PORT_MAP_API=6080;  //地图服务所用端口

document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"http://"+_IP_JS_API+":"+_PORT_JS_API+"/Camera/arcgis_js/js/dojo/dijit/themes/claro/claro.css\"/>");
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"http://"+_IP_JS_API+":"+_PORT_JS_API+"/Camera/arcgis_js/js/esri/css/esri.css\" />");

djConfig = {
		parseOnLoad : true,
		isDebug : true,
		serverIP : _IP_PRJECT+":"+_PORT_IP_PRJECT
	};

document.write("<script type=\"text/javascript\" src=\"http://"+_IP_PRJECT+":"+_PORT_IP_PRJECT+"/Camera/arcgis_js/init.js\"></script>");

