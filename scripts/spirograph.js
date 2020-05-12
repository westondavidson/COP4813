
//        x = (R+r)*cos(t) - (r+O)*cos(((R+r)/r)*t)

//	y = (R+r)*sin(t) - (r+O)*sin(((R+r)/r)*t)


  var t = 0;
var c = document.getElementById("myCanvas");
var R = Math.floor(Math.random() * Math.floor(100));
var r = Math.floor(Math.random() * Math.floor(60));
var O = Math.floor(Math.random() * Math.floor(100));
var ctx = c.getContext("2d");

//variables to center equation on canvas regardless of width/height
    var xCenter = c.width / 2 ;
		var yCenter = c.height / 2 ;


function doDrawing() {
    t = 0;


    // Clear the Canvas
    ctx.clear();

    // Create a random color
    var timesRun = 0;
    var color =  '#'+Math.floor(Math.random()*16777215).toString(16);

    //ensure spirograph stays at the center of the canvas


    // Initial x and y
    var x = xCenter + (R+r)*Math.cos(t) - (r+O)*Math.cos(((R+r)/r)*t);
    var y = yCenter - (R+r)*Math.sin(t) - (r+O)*Math.sin(((R+r)/r)*t);

    // Start the Drawing
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x,y);

    //Use the timer to create drawing
    var interval = setInterval(function(){
    timesRun += 1;
    if(timesRun === 500){
        clearInterval(interval); }

    drawSpirograph();}, 20); 

}
function drawSpirograph()
{
  t += 0.1;
  x = xCenter + Math.floor((R+r)*Math.cos(t) - (r+O)*Math.cos(((R+r)/r)*t));
  y = yCenter - Math.floor((R+r)*Math.sin(t) - (r+O)*Math.sin(((R+r)/r)*t));

  ctx.lineTo(x,y);
  ctx.stroke();
}

CanvasRenderingContext2D.prototype.clear =
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }
};
