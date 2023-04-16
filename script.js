document.addEventListener('DOMContentLoaded', () => {
    sideMenu.style.left = '0';
    mainContent.classList.add('shifted-right');
  });
  
const showMenuButton = document.getElementById('show-menu');
const hideMenuButton = document.getElementById('hide-menu');
const sideMenu = document.getElementById('side-menu');
const mainContent = document.getElementsByClassName('main-content')[0]; 

showMenuButton.addEventListener('click', () => {
  sideMenu.style.left = '0';
  showMenuButton.classList.remove('flip-button');
  hideMenuButton.classList.add('flip-button');
  mainContent.classList.add('shifted-right'); 
});

hideMenuButton.addEventListener('click', () => {
  sideMenu.style.left = '-202px';
  showMenuButton.classList.add('flip-button');
  hideMenuButton.classList.remove('flip-button');
  mainContent.classList.remove('shifted-right');
});
