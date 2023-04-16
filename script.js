// Get the menu toggle button
var menuToggle = document.getElementById('menu-toggle');

// Get the side menu
var sideMenu = document.getElementById('side-menu');

// Add a click event listener to the menu toggle button
menuToggle.addEventListener('click', function() {
	// Toggle the "show-menu" class on the body element
	document.body.classList.toggle('show-menu');
});
