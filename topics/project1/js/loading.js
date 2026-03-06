let backButton = document.getElementById("backBtn");
let loadingStatus = document.getElementById("loadingStatus");

//attempts counter
let backAttempts = 0;

// teasing messages
let messages = [];

// load JSON file
fetch("assets/loadingData.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    messages = data.messages;
  });

backButton.addEventListener("mouseenter", moveBackButton);
backButton.addEventListener("click", goBackHome);

// go back button that dodges player
function moveBackButton() {
  backAttempts++;

  // message change
 if (messages.length > 0) {
   let randomIndex = Math.floor(Math.random() * messages.length);
   loadingStatus.textContent =
     messages[randomIndex] + " Attempts: " + backAttempts;
 } else {
   loadingStatus.textContent = "Still loading... Attempts: " + backAttempts;
 }

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  let randomX = Math.random() * (windowWidth - 150);
  let randomY = Math.random() * (windowHeight - 60);

  backButton.style.position = "absolute";
  backButton.style.left = randomX + "px";
  backButton.style.top = randomY + "px";
}

// goes back to the start screen if clicked
function goBackHome() {
  window.location.href = "index.html";
}
