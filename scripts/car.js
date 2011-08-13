var car1=null;
var car2=null;
var car1Dom=null;
var car2Dom=null;
var car1speed=null;
var car2speed=null;
var car1timeout=null;
var car2timeout=null;
var trackLength;
var carWidth=60;
var reset=false;
var car1reset=false;
var car2reset=false;

function car(position, accelleration)
{
	this.position = position;
	this.accelleration = accelleration;
	this.accellerate = function(){
		this.position += accelleration;				
		return this.position;
	}
}

$(document).ready(function(){
	trackLength = $(".track:first").width() - $(".track:first").position().left;
	trackStart = $(".track:first").position().left;
	car1Dom = $("#car1");
	car2Dom = $("#car2");
	car1speed = $("#car1speed");
	car2speed = $("#car2speed");
	resetRace();
	$("#go").click(function(){
		resetRace();
		car1reset=false;
		car2reset=false;
		updateCarPositions();	
	});	
	$("#car1go").click(function(){
		resetCar1();
		car1reset=false;
		updateCar1Position();
	});
	$("#car2go").click(function(){
		resetCar2();
		car2reset=false;
		updateCar2Position();
	});
	car1speed.change(function(){
		resetRace();
	});
	car2speed.change(function(){
		resetRace();
	});
});
function resetRace()
{
	resetCar1();
	resetCar2();
}
function resetCar1()
{
	car1 = new car(0,parseInt(car1speed.val()));
	car1Dom.css("left",car1.position+"px");
	car1Dom.attr("class",GetCarClassFromValue(car1.accelleration));
	clearTimeout(car1timeout);
	car1reset=true;
}
function resetCar2()
{
	car2 = new car(0,parseInt(car2speed.val()));
	car2Dom.css("left",car2.position+"px");
	car2Dom.attr("class",GetCarClassFromValue(car2.accelleration));
	clearTimeout(car2timeout);
	car2reset=true;
}
function GetCarClassFromValue(val)
{
	if(val==1)
		return "slow";
	if(val==3)
		return "medium";
	if(val==5)
		return "fast";
	return "slow";
}
function updateCarPositions()
{
	updateCar1Position();
	updateCar2Position();
}
function updateCar1Position()
{
	car1Dom.css("left",car1.accellerate());
	if(car1.position-carWidth < trackLength && car1reset==false)
		car1timeout=setTimeout(updateCar1Position,20);
}
function updateCar2Position()
{
	car2Dom.css("left",car2.accellerate());
	if(car2.position-carWidth < trackLength && car2reset==false)
		car2timeout=setTimeout(updateCar2Position,20);
}
