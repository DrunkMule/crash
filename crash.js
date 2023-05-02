// Set up variables
var multiplier = 1;
var timer;
var balance = 100.00;

document.getElementById("start").addEventListener("click", function() {
  // Get the bet amount from the input field
  var betAmount = parseFloat(document.getElementById("bet-input").value);

  // Check if the bet amount is greater than the player's balance
  if (betAmount > balance) {
    alert("Du har ikke råd, lol.");
    return;
  }

  // Show the game container
  document.getElementById("game-container").style.display = "block";

  // Hide the start button
  document.getElementById("start").style.display = "none";

  // Deduct the bet amount from the balance
  balance -= betAmount;
  document.getElementById("balance-amount").innerHTML = balance.toFixed(2);

  // Call the increaseMultiplier function to start the game
  increaseMultiplier();
});

// Function to increase the multiplier over time
function increaseMultiplier() {
  multiplier += 0.1;
  document.getElementById("multiplier").innerHTML = multiplier.toFixed(1) + "x";

  // Set a timer to call this function again in 1 second
  timer = setTimeout(increaseMultiplier, 1000);

  // Randomly crash the game
  if (Math.random() < 0.15678999999 && multiplier < 100.00) {
    clearTimeout(timer);
    var betAmount = parseFloat(document.getElementById("bet-input").value);
    var winnings = multiplier * betAmount;
    document.getElementById("balance-amount").innerHTML = balance.toFixed(2);
    alert("AHAHAHAH! Spillet crashede ved " + multiplier.toFixed(1) + "x og du tabte $" + betAmount.toFixed(2) + ".");
    resetGame();
  }
}

// Add a click event listener to the cash-out button
document.getElementById("cashout").addEventListener("click", function() {
  // Stop the timer and calculate the player's winnings
  clearTimeout(timer);
  var betAmount = parseInt(document.getElementById("bet-input").value);
  var winnings = multiplier * betAmount;
  balance += winnings;

  // Display the winnings to the player
  alert("Tillykke! Du cashed ud på " + multiplier.toFixed(1) + "x og vandt $" + winnings.toFixed(2) + ".");

  // Reset the game
  resetGame();
});

// Function to reset the game
function resetGame() {
  // Hide the game container
  document.getElementById("game-container").style.display = "none";

  // Show the start button
  document.getElementById("start").style.display = "block";

  // Reset the multiplier and update the display
  multiplier = 1;
  document.getElementById("multiplier").innerHTML = multiplier.toFixed(1) + "x";

  // Reset the bet input field
  document.getElementById("bet-input").value = 1;

  // Update the balance on the page
  document.getElementById("balance-amount").innerHTML = balance.toFixed(2);
}

// Set the initial state of the game container to hidden
document.getElementById("game-container").style.display = "none";

// Show the start button
document.getElementById("start").style.display = "block";

// Update the balance on the page
document.getElementById("balance-amount").innerHTML = balance.toFixed(2);
