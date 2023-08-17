// Output a message to the console
console.log('This is a popup!');

// Execute code after the DOM content has been fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Find the exit button by its ID
  const exitButton = document.getElementById('exitButton');

  // Add a click event listener to the exit button
  exitButton.addEventListener('click', function() {
    // Close the popup window
    window.close();
  });
});

// Execute code after the DOM content has been fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Find the hamburger button by its ID
  const hamburger = document.getElementById('hamburger');
  
  // Find the links element by its ID
  const links = document.getElementById('links');

  // Add a click event listener to the hamburger button
  hamburger.addEventListener('click', function() {
    // Toggle the display of links between 'none' and 'block'
    links.style.display = links.style.display === 'none' ? 'block' : 'none';

    // Toggle a class on the hamburger button for styling purposes
    hamburger.classList.toggle('open');
  });
});