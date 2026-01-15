/**
 * Task 1
 * Noureddine Mazzene
 *
 *
 */

"use strict";

// rect 1

let rect1 = {
    x:80,
    y:80,
    w:50,
    h:50,
    color:{
        r: 200,
        g:15,
        b:180,
    }
    }

let rect2 = {
      x: 160,
      y: 160,
      w: 50,
      h: 50,
      color: {
        r: 200,
        g: 15,
        b: 180,
      },
    };

let rect3 = {
  x: 50,
  y: 160,
  w: 50,
  h: 50,
  color: {
    r: 200,
    g: 15,
    b: 180,
  },
};

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Sets the background, draws the landscape
 */
function draw() {
  //Background
  background("#000000");

  //draws the Ellipse
  drawEllipses();


}

function drawEllipses() {
  // Rect 1 draw
  push();
  noStroke();
  fill(rect1.color.r, rect1.color.g, rect1.color.b);
  rect(rect1.x, rect1.y, rect1.w, rect1.h);
  pop();

  // Rect 2 draw
  push();
  noStroke();
  fill(rect2.color.r, rect2.color.g, rect2.color.b);
  rect(rect2.x, rect2.y, rect2.w, rect2.h);
  pop();

  // Rect 3 draw
  push();
  noStroke();
  fill(rect3.color.r, rect3.color.g, rect3.color.b);
  rect(rect3.x, rect3.y+=1, rect3.w, rect3.h);
  pop();

  if (rect3.y > 400) {
    rect3.y = 0;
  };
}

function mousePressed(){
    rect1.x += 1;
    rect1.y += 1;
}

function keyPressed(SPACE) {
    rect2.x += 1;
    rect2.y += 1;

}