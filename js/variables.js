var canvas, stage;
var WIDTH = window.innerWidth - 50;
var HEIGHT = window.innerHeight - 50;

var rings = 40;
var radius = 50;
var sheeps = [];
var grasses = [];

var image = {
  grass: 'assets/images/sheep_walk.png',
  sheep: 'assets/images/sheep_walk.png'
}

var spriteSheet = new createjs.SpriteSheet({
  framerate: 30,
  "images": ["assets/images/sheep_walk.png"],
  "frames": {"regX": 0, "height": 128, "count": 16, "regY": 0, "width": 128, "margin": 0},
  // define two animations, run (loops, 1.5x speed) and jump (returns to run):
  "animations": {
    "up": [0, 3, "up", 0.3],
    "down": [8, 11, "down", 0.3],
    "right": [12, 15, "right", 0.3],
    "left": [4, 7, "left", 0.3],
  }
});
