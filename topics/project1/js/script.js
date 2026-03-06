// get elements from the page
let startButton = document.getElementById("startBtn");
let statusText = document.getElementById("status");

// keep track of how many times the user tried
let attempts = 0;

// when the mouse goes over the button
startButton.addEventListener("mouseenter", moveButton);

function moveButton() {
  // increase attempt counter
  attempts++;

  // update the message
  statusText.textContent = "Nice try. Attempts: " + attempts;

  // window size
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  // random position
  let randomX = Math.random() * (windowWidth - 150);
  let randomY = Math.random() * (windowHeight - 60);

  // make button moveable
  startButton.style.position = "absolute";

  // move button
  startButton.style.left = randomX + "px";
  startButton.style.top = randomY + "px";
}
