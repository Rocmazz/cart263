"use strict";

let rect1 = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  color: {
    r: 60,
    g: 130,
    b: 255,},
  original: {
    r: 60,
    g: 130,
    b: 255,},
};

let rect2 = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  color: {
    r: 40,
    g: 100,
    b: 255,},
  original: {
    r: 40,
    g: 100,
    b: 255,},
};

let rect3 = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  color: { 
    r: 10, 
    g: 60, 
    b: 255 },
  original: { 
    r: 10, 
    g: 60, 
    b: 255 },
};

function setup() {
  createCanvas(400, 400);

  // sizes based on canvas
  const canvasW = width / 3;
  const canvasH = height;

  // position
  rect1.w = canvasW;
  rect1.h = canvasH;

  rect2.x = canvasW;
  rect2.w = canvasW;
  rect2.h = canvasH;

  rect3.x = canvasW * 2;
  rect3.w = canvasW;
  rect3.h = canvasH;
}

function draw() {
  background(255);

  // update colors based on hover
  turnWhite();

  // draw rectangles
  drawRect();
}

function drawRect() {
  noStroke();

  fill(rect1.color.r, rect1.color.g, rect1.color.b);
  rect(rect1.x, rect1.y, rect1.w, rect1.h);

  fill(rect2.color.r, rect2.color.g, rect2.color.b);
  rect(rect2.x, rect2.y, rect2.w, rect2.h);

  fill(rect3.color.r, rect3.color.g, rect3.color.b);
  rect(rect3.x, rect3.y, rect3.w, rect3.h);
}

function turnWhite() {

  // if hovered white, else back to original
  if (mouseX >= rect1.x && mouseX <= rect1.x + rect1.w) {
    rect1.color.r = 255;
    rect1.color.g = 255;
    rect1.color.b = 255;
  } else {
    rect1.color.r = rect1.original.r;
    rect1.color.g = rect1.original.g;
    rect1.color.b = rect1.original.b;
  }

  if (mouseX >= rect2.x && mouseX <= rect2.x + rect2.w) {
    rect2.color.r = 255;
    rect2.color.g = 255;
    rect2.color.b = 255;
  } else {
    rect2.color.r = rect2.original.r;
    rect2.color.g = rect2.original.g;
    rect2.color.b = rect2.original.b;
  }

  if (mouseX >= rect3.x && mouseX <= rect3.x + rect3.w) {
    rect3.color.r = 255;
    rect3.color.g = 255;
    rect3.color.b = 255;
  } else {
    rect3.color.r = rect3.original.r;
    rect3.color.g = rect3.original.g;
    rect3.color.b = rect3.original.b;
  }
}
