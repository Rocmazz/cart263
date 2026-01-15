/**
 * Task 1
 * Noureddine Mazzene
 *
 *
 */

"use strict";

let x = 200

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

  push();
  noStroke();
  fill("#9B0C6D");
  ellipse(x, 200, 100, 100);
  pop();

  // Ellipse
  push();
  noStroke();
  fill("#DF63B8");
  ellipse(x-75, 125, 75, 75);
  pop();

  // Small Ellipse
  push();
  noStroke();
  fill("#720F53");
  ellipse(x-140, 60, 50, 50);
  pop();

}