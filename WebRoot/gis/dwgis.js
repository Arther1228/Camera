
//把查询到的点加到指定的地图中
function addPointsToMap(featureSet) {
	var features = featureSet.features;
	var graphic;
	for (var i = 0 ; i < features.length; i++) {
		graphic = features[i];
		graphic.setSymbol(stateSymbolO);
		graphic.setInfoTemplate(resultTemplate);
		cameraGraphicLayer.add(graphic);
	}
	//alert(cameraGraphicLayer.graphics.length);
}

//通过extent参数寻找点
function findPointsInExtent(extent) {
	var graphic;
	for(var i = 0;i<cameraGraphicLayer.graphics.length;i++){
		graphic=cameraGraphicLayer.graphics[i];
		if (extent.contains(graphic.geometry)) {
			map.graphics.add(graphic);
			drawSector(graphic.attributes.POINT_X, graphic.attributes.POINT_Y,graphic.attributes.RADIUS,graphic.attributes.STARTANGLE,graphic.attributes.ENDANGLE);
		}
	}
	
}

//画扇形
function drawSector(x, y,radius,startangle,endangle) {
	var pointNum=30;
	var apoint = [];
	radius = 0.0003;
	apoint = getPoints([ x, y ], radius, startangle, endangle, pointNum);

	var po = {"rings" : [ apoint ],"spatialReference" : {"wkid" : 4326}};
	var otherInfo = new esri.InfoTemplate("可视域信息:${name}","经度：${lon}</br>纬度：${lat}");
	var polygon1 = new esri.geometry.Polygon(po); //扇形
	var gr1 = new esri.Graphic(polygon1, polySymbolRed, {"lon" : x,"lat" : y,"name" : "摄像头坐标"}, otherInfo);

	sectorGraphicLayer.add(gr1); //把扇形可视域范围加到指定的图层中用于在画路径的时候,方便查询
}

function getPoints(center, radius, startAngle, endAngle, pointNum) {
	var sin,cos,x,y,angle;
	var points1 = new Array();
	
	for (var i = 0; i <= pointNum; i++) {
		angle = startAngle + (endAngle - startAngle) * i / pointNum;
		sin = Math.sin(angle * Math.PI / 180);
		cos = Math.cos(angle * Math.PI / 180);
		x = center[0] + radius * sin/4;
		y = center[1] + radius * cos/4;
		points1[i] = [ x, y ];
	}
	
	var points2 = new Array();
	for (var i = 0; i <= pointNum; i++) {
		angle = startAngle + (endAngle - startAngle) * i / pointNum;
		sin = Math.sin(angle * Math.PI / 180);
		cos = Math.cos(angle * Math.PI / 180);
		x = center[0] + radius * sin;
		y = center[1] + radius * cos;
		points2[i] = [ x, y ];
	}
	var pointsTemp=new Array();
	pointsTemp.push(points1[0]);
	for(var i = 0; i <= pointNum; i++){
		pointsTemp.push(points2[i]);
	}
	for(var i=pointNum;i>=0;i--){
		pointsTemp.push(points1[i]);
	}
    var point=pointsTemp;
	return point;
}

//按路径查摄像头
function findSectorByPolygonLine(geometry) {
	if(sectorGraphicLayer.graphics.length<=0){
		alert("请先选择区域加载扇形可视域或者当前范围无摄像头！");
		return;
	}
	//还原扇形颜色
	for(var i=0;i<sectorGraphicLayer.graphics.length;i++){
		sectorGraphicLayer.graphics[i].setSymbol(polySymbolRed);
	}
	var geometryies1Array=new Array();
	for(var i=0;i<sectorGraphicLayer.graphics.length;i++){
		geometryies1Array[i]=sectorGraphicLayer.graphics[i].geometry;
	}
	var _geometryServiceURL = "http://" +_IP_MAP_API + ":6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";
	var geometryService = new esri.tasks.GeometryService(_geometryServiceURL);
	var relationParams = new esri.tasks.RelationParameters();
	relationParams.geometries1 = geometryies1Array;
	relationParams.geometries2 = [geometry] ;
	relationParams.relation = esri.tasks.RelationParameters.SPATIAL_REL_INTERSECTION;
	geometryService.relation(relationParams, addRelateResultsToMap);
}


//按路径查道路线
function findRoadNetsByPolygonLine(geometry) {
	//把
	
	var geometryies1Array = new Array();
	for(var i = 0;i < sectorGraphicLayer.graphics.length ; i++){
		geometryies1Array[i] = sectorGraphicLayer.graphics[i].geometry;
	}
	var _geometryServiceURL = "http://" +_IP_MAP_API + ":6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";
	var geometryService = new esri.tasks.GeometryService(_geometryServiceURL);
	var relationParams = new esri.tasks.RelationParameters();
	relationParams.geometries1 = geometryies1Array;
	relationParams.geometries2 = [geometry] ;
	relationParams.relation = esri.tasks.RelationParameters.SPATIAL_REL_INTERSECTION;
	geometryService.relation(relationParams, addRelateResultsToMap);
}

