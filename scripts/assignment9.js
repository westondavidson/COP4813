var context = myCanvas.getContext('2d');

var dx= 4;
var dy = 4;
var y = 150;
var x = 10;
var color = '#800A39';

var requestId = window.requestAnimationFrame(draw);

function init(){
window.requestAnimationFrame(draw);

}

function ballStop(){

cancelAnimationFrame(draw);

}


function draw(){
	context.clearRect(0,0,320,320);
	context.beginPath();
	context.fillStyle=color;
	context.arc(x,y,20,0,Math.PI*2,true);
	context.closePath();
	context.fill();

  if( x<0 || x > 270)
  dx=-dx;
  //requestAnimationFrame(draw);

  if( y<0 || y> 270)
  dy=-dy;
  x+=dx;
  y+=dy;


  window.requestAnimationFrame(draw);

}

function ballSpeedUp(){
init();
}


init();
