const showMenuButton = document.getElementById('show-menu');
const hideMenuButton = document.getElementById('hide-menu');
const sideMenu = document.getElementById('side-menu');
const mainContent = document.getElementsByClassName('main-content')[0];
const footer = document.getElementById("my-footer");


document.addEventListener('DOMContentLoaded', () => {
    sideMenu.style.left = '0';
    mainContent.classList.add('shifted-right');
    footer.style.display = 'none';

});

window.addEventListener("scroll", function () {
    if (window.pageYOffset > 500) {
        footer.style.display = 'block';
        sideMenu.classList.add('fade-out-left');
        sideMenu.classList.remove('fade-in-right');
        mainContent.classList.remove('shifted-right');
    } else {
        sideMenu.classList.add('fade-in-right');
        sideMenu.classList.remove('fade-out-left');
        mainContent.classList.add('shifted-right');
        footer.style.display = 'none';
    }
})

showMenuButton.addEventListener('click', () => {
    sideMenu.classList.add('fade-in-right');
    sideMenu.classList.remove('fade-out-left');
    showMenuButton.classList.remove('flip-button');
    hideMenuButton.classList.add('flip-button');
    mainContent.classList.add('shifted-right');
});

hideMenuButton.addEventListener('click', () => {
    sideMenu.classList.add('fade-out-left');
    sideMenu.classList.remove('fade-in-right');
    showMenuButton.classList.add('flip-button');
    hideMenuButton.classList.remove('flip-button');
    mainContent.classList.remove('shifted-right');
});



