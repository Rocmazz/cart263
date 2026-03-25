class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;

    // keep original size so microphone changes can animate around it
    this.baseWidth = w;
    this.baseHeight = h;

    // this will get updated from the microphone code in start.js
    this.micLevel = 0;

    // simple movement values
    this.baseX = x;
    this.xDirection = 1;
  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.fillRect(this.x, this.y,this.width, this.height);
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.lineWidth = 2; //change stroke
    this.context.strokeRect(this.x, this.y,this.width, this.height);
  }

  update(){
    //update freestyle

    // simple side to side movement
    this.x += this.xDirection;

    // make it move back and forth near its original position
    if (this.x > this.baseX + 20 || this.x < this.baseX - 20) {
      this.xDirection *= -1;
    }

    // microphone affects at least two properties: width and height
    this.width = this.baseWidth + this.micLevel * 2;
    this.height = this.baseHeight + this.micLevel;

    //console.log("rectangle update")
  }
}
