function Grass() {
  this.obj = new createjs.Sprite(spriteSheet, "left");

  this.obj.x = Math.random() * canvas.width;
  this.obj.y = Math.random() * canvas.height;

  this.getBounds = function() {
    return {
      x: this.obj.x,
      y: this.obj.y,
      width: this.obj.getBounds().width,
      height: this.obj.getBounds().height,
    }
  }
}
