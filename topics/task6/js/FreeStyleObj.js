class FreeStyleObj {
    constructor(x, y, length, f_color, s_color,context) {
      // We write instructions to set up a Flower here
      // Position and size information
      this.x = x;
      this.y = y;
      this.fill_color = f_color;
      this.stroke_color = s_color;
      this.theta = 0;
      this.length = length;
      this.yOffset = 20;
      this.angularSpeed = 0.07;
      this.context = context;

      // keep original values so mic input can change them
      this.baseYOffset = 20;
      this.baseAngularSpeed = 0.07;

      // this will be updated from the microphone code
      this.micLevel = 0;

      // simple extra animation
      this.baseY = y;
      this.yDirection = 1;
    }
  
    display() {
      this.theta =0; //reset everytime
      this.context.fillStyle = this.fill_color; // change the color we are using
      this.context.strokeStyle = this.stroke_color; // change the color we are using
      this.context.beginPath();
      this.context.moveTo(this.x,this.y)
      for(let i =this.x; i< this.x+this.length; i++){
      this.context.lineTo(i,(Math.sin(this.theta)*5)+this.y)
      this.context.lineTo(i,(Math.sin(this.theta)*5)+this.y+this.yOffset)
      this.theta+=this.angularSpeed;
      }
      this.context.stroke(); //set the stroke
    }

    update(){
      //update freestyle
      // console.log("free style update")

      // small up and down movement
      this.y += this.yDirection;

      if (this.y > this.baseY + 10 || this.y < this.baseY - 10) {
        this.yDirection *= -1;
      }

      // microphone affects at least two properties
      this.yOffset = this.baseYOffset + this.micLevel;
      this.angularSpeed = this.baseAngularSpeed + this.micLevel * 0.01;
    }
  }
  