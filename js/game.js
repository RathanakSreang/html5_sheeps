function init() {
  canvas = document.getElementById("myCanvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  //check to see if we are running in a browser with touch support
  stage = new createjs.Stage(canvas);
  optimizeForTouchAndScreens ();

  for (var i = 0; i < 1; i++) {
    sheeps.push(new Sheep());
  }

  for (var i = 0; i < 1; i++) {
    grasses.push(new Grass());
  }

  // start the tick and point it at the window so we can do some work before updating the stage:
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);
}

function optimizeForTouchAndScreens () {
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage);
  }
}

function tick(event) {
  for(var i = 0; i < grasses.length; i++) {
    // grasses[i].Activity();
    stage.addChild(grasses[i].obj);
  }

  for(var i = 0; i < sheeps.length; i++) {
    sheeps[i].Activity();
    stage.addChild(sheeps[i].obj);
  }


  // draw the updates to stage:
  stage.update(event);
}
