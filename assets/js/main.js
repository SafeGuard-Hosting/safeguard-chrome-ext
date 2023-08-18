// Output a message to the console
console.log('This is a popup!');

// Function to load a template and inject it into a specified element
function loadTemplate(url, elementId, callback) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch(error => {
      console.error('Error loading template:', error);
    });
}

// Load header template
loadTemplate('/includes/template/nav.html', 'nav-placeholder');

// Load footer template
loadTemplate('/includes/template/footer.html', 'footer-placeholder');

// Load footer template and set current year after loading
loadTemplate('/includes/template/footer.html', 'footer-placeholder', function() {
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Set the current year in the span element
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = currentYear;
  }
});