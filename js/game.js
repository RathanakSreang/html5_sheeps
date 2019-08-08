var canvas, stage;
var WIDTH = window.innerWidth - 50;
var HEIGHT = window.innerHeight - 50;

var rings = 40;
var radius = 50;
var sheeps = [];
var foods = [];

var image = {
  grass: 'assets/images/sheep_walk.png',
  sheep: 'assets/images/sheep_walk.png'
}

var spriteSheet = new createjs.SpriteSheet({
  framerate: 30,
  "images": ["assets/images/sheep_walk.png"],
  "frames": {"regX": 0, "height": 128, "count": 16, "regY": 0, "width": 128},
  // define two animations, run (loops, 1.5x speed) and jump (returns to run):
  "animations": {
    "up": [0, 3, "up", 0.3],
    "down": [8, 11, "down", 0.3],
    "right": [12, 15, "right", 0.3],
    "left": [4, 7, "left", 0.3],
  }
});
function Food() {
  this.obj = new createjs.Shape();
  this.obj.graphics.beginFill("#00FF00").drawRect(0, 0, 20, 20);
  // this.obj = new createjs.Bitmap(image.grass);
  this.obj.x = Math.random() * canvas.width;
  this.obj.y = Math.random() * canvas.height;
}

function Sheep() {
  // this.obj = new createjs.Shape();
  // this.obj.graphics.beginFill("#828b20").drawCircle(0, 0, 20);

  this.obj = new createjs.Sprite(spriteSheet, "left");


  this.obj.x = Math.random() * canvas.width;
  this.obj.y = Math.random() * canvas.height;
  this.directionX = Math.random() < 0.5 ? -1 : 1;
  this.speedX = 1.5;
  this.directionY = Math.random() < 0.5 ? -1 : 1;
  this.speedY = 1.5;

  this.action = "FindFood";
  this.event = "Nothing";
  this.obj.gotoAndPlay('up');

  this.walk = function() {
    this.obj.x += this.speedX * this.directionX;
    if(this.obj.x >= WIDTH) {
      this.directionX = -1;
      this.obj.gotoAndPlay('left');
      this.speedX = 1.5 * Math.random();
    } else if(this.obj.x <= 0) {
      this.directionX = 1;
      this.speedX = 1.5 * Math.random();
      this.obj.gotoAndPlay('right');
    }

    this.obj.y += this.speedY * this.directionY;
    if(this.obj.y >= HEIGHT) {
      this.directionY = -1;
      this.speedY = 1.5 * Math.random();
      this.obj.gotoAndPlay('up');
    } else if(this.obj.y <= 0) {
      this.directionY = 1;
      this.speedY = 1.5 * Math.random();
      this.obj.gotoAndPlay('down');
    }

  };

  this.Activity = function() {
    // for(var i = 0; i < foods.length; i++) {
    //   // foods[i].Activity();
    //   // stage.addChild(foods[i].obj);
    //   //
    //   // console.log(i == 10);
    //   // if(ndgmr.checkPixelCollision(foods[i].obj, this.obj, 100)) {
    //   //   this.event = "FoundFood";
    //   // }
    // }

    switch(this.action) {
      case "FindFood":
        this.walk();
        switch(this.event) {
          case "SeenWolf":
            this.action = "Run";
          break;

          case "FoundFood":
            this.action = "Eat";
          break;
        }
      break;

      case "Run":
        this.walk();

        switch(this.event) {
          case "NotSeenWolf":
            this.action = "FindFood";
          break;
        }
      break;

      case "Eat":
        // this.eat();

        switch(this.event) {
          case "SeenWolf":
            this.action = "Run";
          break;

          case "NoFood":
            this.action = "FindFood";
          break;
        }
      break;
    }
  };
}

function init() {
  canvas = document.getElementById("myCanvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  //check to see if we are running in a browser with touch support
  stage = new createjs.Stage(canvas);
  optimizeForTouchAndScreens ();

  for (var i = 0; i < 20; i++) {
    sheeps.push(new Sheep());
  }

  for (var i = 0; i < 50; i++) {
    foods.push(new Food());
  }

  // start the tick and point it at the window so we can do some work before updating the stage:
  // createjs.Ticker.setFPS(60);
  // createjs.Ticker.on('tick', stage);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);
}

function optimizeForTouchAndScreens () {
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage);
  }
}

function tick(event) {
  for(var i = 0; i < foods.length; i++) {
    // foods[i].Activity();
    // stage.addChild(foods[i].obj);
  }

  for(var i = 0; i < sheeps.length; i++) {
    sheeps[i].Activity();
    stage.addChild(sheeps[i].obj);
  }


  // draw the updates to stage:
  stage.update(event);
}
