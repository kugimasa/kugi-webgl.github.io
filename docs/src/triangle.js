const canvas = document.getElementById("triangle-canvas");
const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
const context = canvas.getContext("2d");

var position = document.getElementById("position");
var borderX = 1.5;
var borderY = 1.875;

drawTriangle();

canvas.addEventListener("mousemove", function (e) {
  var rect = e.target.getBoundingClientRect();
  var posX = e.clientX - rect.left + borderX;
  var posY = e.clientY - rect.top + borderY;
  showMousePos(posX, posY);
  // Triangle Project
});

function showMousePos(posX, posY) {
  var displayX = 2.0 * (posX / 400) - 1.0;
  var displayY = - 2.0 * (posY / 400) + 1.0;
  position.innerText = "(" + String(displayX) + "," + String(displayY) + ")";
}

function drawTriangle() {
  gl.clearColor(23.0 / 255.0, 190.0 / 255.0, 187.0 / 255.0, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFEFER_BIT);
}