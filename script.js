document.addEventListener('DOMContentLoaded', () => {
    sideMenu.style.left = '0';
    showMenuButton.classList.add('flip-button');
    mainContent.classList.add('shifted-right');
  });
  
const showMenuButton = document.getElementById('show-menu');
const hideMenuButton = document.getElementById('hide-menu');
const sideMenu = document.getElementById('side-menu');
const mainContent = document.getElementsByClassName('main-content')[0]; 

showMenuButton.addEventListener('click', () => {
  sideMenu.style.left = '0';
  showMenuButton.classList.add('flip-button');
  mainContent.classList.add('shifted-right'); // add the new class to the main content
});

hideMenuButton.addEventListener('click', () => {
  sideMenu.style.left = '-205px';
  mainContent.classList.remove('shifted-right'); // remove the class when hiding the menu
});
