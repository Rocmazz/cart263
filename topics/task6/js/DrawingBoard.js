class DrawingBoard {
  /* Constructor */
  constructor(canvas, context, drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;
    //each element has a mouse clicked and a mouse over
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    // using right click as the second interaction for removing circles
    this.canvas.addEventListener("contextmenu", function (e) {
      self.rightClickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });
  }

  overCanvas(e) {
    //console.log("over");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    console.log(this.mouseOffsetX, this.mouseOffsetY);
    //differentiate which canvas
    //you can remove the console.logs ///
    if (this.drawingBoardId === "partA") {
      // passing the mouse position into each circle
      // so they can react inside their own update() method
      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        this.objectsOnCanvas[i].mouseX = this.mouseOffsetX;
        this.objectsOnCanvas[i].mouseY = this.mouseOffsetY;
      }
    }
    if (this.drawingBoardId === "partB") {
      console.log("in B");
    }
    if (this.drawingBoardId === "partC") {
      console.log("in C");
    }
    if (this.drawingBoardId === "partD") {
      console.log("in D");
    }
  }

  clickCanvas(e) {
    // console.log("clicked");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);

    //differentiate which canvas
    //you can remove the console.logs ///
    if (this.drawingBoardId === "partA") {
      // add a new circle wherever the user clicks
      // giving it a random size and fill color
      let randomRadius = Math.floor(Math.random() * 25) + 10;

      let colors = ["#FFC300", "#FF5733", "#DAF7A6", "#CF9FFF", "#33C1FF"];
      let randomFill = colors[Math.floor(Math.random() * colors.length)];

      this.addObj(
        new CircularObj(
          this.mouseOffsetX,
          this.mouseOffsetY,
          randomRadius,
          randomFill,
          "#E6E6FA",
          this.context
        )
      );
    }
    if (this.drawingBoardId === "partB") {
      console.log("in B");
    }
    if (this.drawingBoardId === "partC") {
      console.log("in C");
    }
    if (this.drawingBoardId === "partD") {
      console.log("in D");
    }
  }

  rightClickCanvas(e) {
    // stops the browser from opening the right click menu
    e.preventDefault();

    if (this.drawingBoardId === "partA") {
      // removing the most recently added circle
      if (this.objectsOnCanvas.length > 0) {
        this.objectsOnCanvas.pop();
      }
    }
  }

  /* method to add obj to canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  /* method to add display objects on canvas */
  display() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  /* method to add animate objects on canvas */
  animate() {
    // clear the canvas once before drawing all objects again
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update();
      this.objectsOnCanvas[i].display();
    }
  }

  run(videoElement) {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }
  }
}
