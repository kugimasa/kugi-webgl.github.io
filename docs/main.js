const canvas = document.getElementById("my-canvas");
const context = canvas.getContext("2d");
context.fillRect(0, 0, 400, 400);

var position = document.getElementById("position");
var borderX = 1.5;
var borderY = 1.875;

canvas.addEventListener("mousemove", function(e){
	var rect = e.target.getBoundingClientRect();
	var posX = e.clientX - rect.left + borderX;
  var posY = e.clientY - rect.top + borderY;
  showMousePos(posX, posY);
  // Triangle Project
});

function showMousePos(posX, posY) {
  position.innerText =  "(" + String(posX) + "," 
                            + String(posY) + ")";
}
