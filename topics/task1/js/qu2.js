/**
 * Task 1
 * Noureddine Mazzene
 *
 *
 */

"use strict";

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
  drawEllipse(200, 200, 100, 100, 270, 20, 250);
    drawEllipse(125, 125, 75, 75, 200, 15, 180);
      drawEllipse(60, 60, 50, 50, 130, 10, 80);
}

function drawEllipse(x, y, w, h, r, g, b) {
  // Big Ellipse
  push();
  noStroke();
  fill(r, g, b);
  ellipse(x, y, w, h);
  pop();
}