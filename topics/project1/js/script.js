// get elements from the page
let startButton = document.getElementById("startBtn");
let statusText = document.getElementById("status");

// keep track of how many times the user tried
let attempts = 0;
let messages = [];

// load the JSON file
fetch("assets/data.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    messages = data.messages;
  });

// when the mouse goes over the button
startButton.addEventListener("mouseenter", moveButton);

// if the button gets clicked, go to loading page
startButton.addEventListener("click", goToLoadingPage);


function moveButton() {
  // increase attempt counter
  attempts++;

  // change the text if JSON has loaded
  if (messages.length > 0) {
    let randomIndex = Math.floor(Math.random() * messages.length);
    statusText.textContent = messages[randomIndex] + " Attempts: " + attempts;
  } else {
    statusText.textContent = "Nice try. Attempts: " + attempts;
  }

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

function goToLoadingPage() {
  window.location.href = "loading.html";
}