var canvas, stage;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

function init() {
  canvas = document.getElementById("myCanvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  console.log('I am in');

  //check to see if we are running in a browser with touch support
  stage = new createjs.Stage(canvas);
  createjs.Ticker.framerate = 24;
  // createjs.Ticker.on('tick', stage);
  optimizeForTouchAndScreens ();
}

function optimizeForTouchAndScreens () {
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage);
  }
}
