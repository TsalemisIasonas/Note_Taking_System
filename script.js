const showMenuButton = document.getElementById('show-menu');
const hideMenuButton = document.getElementById('hide-menu');
const sideMenu = document.getElementById('side-menu');
const mainContent = document.getElementsByClassName('main-content')[0];
const footer = document.getElementById("my-footer");
const addAccordionButton = document.getElementById("add-accordion-button");


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



var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} 

addAccordionButton.addEventListener("click",function(){
    const accordionContainer = document.createElement('div');
    const accordionButton = document.createElement('button');
    const accordionTitle = document.createElement('input');
    const accordionPanel = document.createElement('div');
    const accordionTextArea = document.createElement('textarea');
    
    accordionTitle.placeholder = 'Title...';
    accordionTextArea.placeholder = 'Content...';

    accordionContainer.classList.add('accordion-container');
    accordionButton.classList.add('accordion');
    accordionTitle.classList.add('accordion-input');
    accordionPanel.classList.add('panel');
    accordionTextArea.classList.add('panel-content');
    
    
    mainContent.appendChild(accordionContainer);
    accordionContainer.appendChild(accordionButton);
    accordionContainer.appendChild(accordionPanel);
    accordionButton.appendChild(accordionTitle);
    accordionPanel.appendChild(accordionTextArea);

})

