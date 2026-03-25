class CircularObj {
  constructor(x, y, radius, f_color, s_color, context) {
    this.x = x;
    this.y = y;

    this.radius = radius;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.context = context;

    // keeping track of the original values
    // so the circle can animate around them
    this.baseY = y;
    this.baseRadius = radius;

    // these will get updated from DrawingBoard.js
    this.mouseX = x;
    this.mouseY = y;

    // simple animation values
    this.yDirection = 1;
  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      true
    );
    this.context.fill(); // set the fill
    this.context.lineWidth = 2; //change stroke
    this.context.closePath();
    this.context.stroke();
  }

  update() {
    //update circle
    this.x += 1;
  }
}
