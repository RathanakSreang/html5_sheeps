function Sheep() {
  this.obj = new createjs.Sprite(spriteSheet, "left");


  this.obj.x = Math.random() * canvas.width;
  this.obj.y = Math.random() * canvas.height;
  this.directionX = Math.random() < 0.5 ? -1 : 1;
  this.speedX = 1.5;
  this.directionY = Math.random() < 0.5 ? -1 : 1;
  this.speedY = 1.5;

  this.action = "FindGrass";
  this.event = "Nothing";
  // this.obj.gotoAndPlay('up');

  this.walk = function() {
    this.obj.x += this.speedX * this.directionX;
    if(this.obj.x >= WIDTH) {
      this.directionX = -1;
      // this.obj.gotoAndPlay('left');
      this.speedX = 1.5 * Math.random();
    } else if(this.obj.x <= 0) {
      this.directionX = 1;
      this.speedX = 1.5 * Math.random();
      // this.obj.gotoAndPlay('right');
    }

    this.obj.y += this.speedY * this.directionY;
    if(this.obj.y >= HEIGHT) {
      this.directionY = -1;
      this.speedY = 1.5 * Math.random();
      // this.obj.gotoAndPlay('up');
    } else if(this.obj.y <= 0) {
      this.directionY = 1;
      this.speedY = 1.5 * Math.random();
      // this.obj.gotoAndPlay('down');
    }
  };

  this.getBounds = function() {
    return {
      x: this.obj.x,
      y: this.obj.y,
      width: this.obj.getBounds().width,
      height: this.obj.getBounds().height,
    }
  }

  this.Activity = function() {
    this.event = this._getEventSurrounding();

    switch(this.action) {
      case "FindGrass":
        this.walk();
        switch(this.event) {
          case "SeenWolf":
            this.action = "Run";
          break;

          case "FoundGrass":
            this.action = "Eat";
          break;
        }
      break;

      case "Run":
        this.walk();

        switch(this.event) {
          case "NotSeenWolf":
            this.action = "FindGrass";
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
            this.action = "FindGrass";
          break;
        }
      break;
    }
  };

  this._getEventSurrounding = function() {
    // check is seen wolf
    if(this._SeenWolf()) {
      return "SeenWolf";
    }


    var event = "";
    for(var i = 0; i < grasses.length; i++) {
      if(this._PosibbleToEatGrass(grasses[i])) {
        return "EatGrass";
      }

      if(this._SeenNearbyGrass(grasses[i])) {
        event = "FoundGrass";
      }
    }

    if(event !== "") {
      return event;
    }

    return "Nothing";
  }

  this._SeenWolf = function() {
    return false;
  }

  this._PosibbleToEatGrass = function(grass) {
    return false;
  }

  this._SeenNearbyGrass = function(grass) {
    // if(this.getBounds())
    // console.log(this.getBounds());
    // console.log(grass.getBounds());
    return this.checkIntersection(grass.getBounds(), this.getBounds());
  }

  this.checkIntersection = function(rect1,rect2) {
    var gap = 0;

    if(rect1.x - gap < rect2.x + rect2.width &&
       rect1.x + rect1.width + gap > rect2.x &&
       rect1.y - gap < rect2.y + rect2.height &&
       rect1.y + rect1.height + gap > rect2.y) {
      return true;
    }

    return false;
  }

}
