var lat=42.96125;
var lng=-85.655719;
var map;
var inputLat, inputLng, latDisp, lngDisp;
var marker;

function initializeGmap(){
	if(GBrowserIsCompatible()){
		map = new GMap2(document.getElementById("map"));
		point = new GLatLng(lat,lng);
		map.setCenter(point,10);
		map.setUIToDefault();
		marker = new GMarker(point);
		map.addOverlay(marker);
	}
}

//Updates the "Current Latitude/Longitude" text underneath the map
function updateLatLngDisplay(){
	latDisp.html(lat);
	lngDisp.html(lng);
}
$(document).ready(function(){
	inputLat = $("#inputLat");
	inputLng = $("#inputLng");
	latDisp = $("#lat");
	lngDisp = $("#lng");

	latDisp.html(lat);
	lngDisp.html(lng);
	inputLat.val(lat);
	inputLng.val(lng);

	$("#plot").click(function(){
		lat = inputLat.val();
		lng = inputLng.val();
		clearError();
		if(!lat)
		{
			error("#inputLat", "Latitude was empty.");
			return;
		}
		if(!lng)
		{
			error("#inputLng", "Longitude was empty.");
			return;
		}
		geocoder = new GClientGeocoder();
		point = new GLatLng(lat,lng);
		map.setCenter(point,10);	
		updateLatLngDisplay();
		marker.setLatLng(point);
	});
	$("#addrPlot").click(function(){
		address = $("input#inputAddress").val()
		clearError();
		if(address.length==0)
		{
			error("#inputAddress","Address was null. Enter an address and try again.");
			return;
		}
		geocoder = new GClientGeocoder();
		geocoder.getLatLng(address,function(point){
			lat = point.lat();
			lng = point.lng();
			map.setCenter(point,10);
			updateLatLngDisplay();
			marker.setLatLng(point);	
			inputLat.val(lat);
			inputLng.val(lng);
		});
	});
	$("input#inputAddress").keyup(function(event){
		if(event.keyCode == 13)
			$("#addrPlot").click();
	});
	$("#inputLat").keyup(function(event){
		if(event.keyCode == 13)
			$("#plot").click();
	});
	$("#inputLng").keyup(function(event){
		if(event.keyCode == 13)
			$("#plot").click();
	});
});
function error(jq, msg)
{
	$(jq).attr("class",$(jq).attr("class") + " error");
	$("#error").html(msg);	
}
function clearError()
{
	errors = $(".error");
	if(errors.length==0)
		return;
	index = errors.attr("class").indexOf("error");
	newClass = errors.attr("class").substring(0,index); 
	errors.attr("class",newClass);
	$("#error").html("");
}

