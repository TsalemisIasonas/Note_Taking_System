const showMenuButton = document.getElementById('show-menu');
const hideMenuButton = document.getElementById('hide-menu');
const sideMenu = document.getElementById('side-menu');
const mainContent = document.getElementsByClassName('main-content')[0];
const mainMenu = document.getElementsByClassName('notes-menu')[0];
const mainMenuElements = mainMenu.getElementsByClassName('notes-menu-elements')[0];
const footer = document.getElementById("my-footer");
const addAccordionButton = document.getElementById("add-accordion-button");

document.addEventListener('DOMContentLoaded', () => {
    sideMenu.style.left = '0';
    mainContent.classList.add('shifted-right');
    mainMenu.classList.add('shifted-right');
    footer.style.display = 'none';
});

window.addEventListener("scroll", function () {
    if (window.pageYOffset > 1000) {
        footer.style.display = 'block';
        sideMenu.classList.add('fade-out-left');
        sideMenu.classList.remove('fade-in-right');
        mainContent.classList.remove('shifted-right');
        mainMenu.classList.remove('shifted-right');
        mainMenuElements.classList.add('fullscreen-width');

    } else {
        sideMenu.classList.add('fade-in-right');
        sideMenu.classList.remove('fade-out-left');
        mainContent.classList.add('shifted-right');
        mainMenu.classList.add('shifted-right');
        mainMenuElements.classList.remove('fullscreen-width');
        footer.style.display = 'none';
    }
})

showMenuButton.addEventListener('click', () => {
    sideMenu.classList.add('fade-in-right');
    sideMenu.classList.remove('fade-out-left');
    showMenuButton.classList.remove('flip-button');
    hideMenuButton.classList.add('flip-button');
    mainContent.classList.add('shifted-right');
    mainMenu.classList.add('shifted-right');
    mainMenuElements.classList.remove('fullscreen-width');
});

hideMenuButton.addEventListener('click', () => {
    sideMenu.classList.add('fade-out-left');
    sideMenu.classList.remove('fade-in-right');
    showMenuButton.classList.add('flip-button');
    hideMenuButton.classList.remove('flip-button');
    mainContent.classList.remove('shifted-right');
    mainMenu.classList.remove('shifted-right');
    mainMenuElements.classList.add('fullscreen-width');
});

function showPanel() {
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
}

var accordionButtons = document.getElementsByClassName("accordion");
for (var i = 0; i < accordionButtons.length; i++) {
    accordionButtons[i].addEventListener("click", showPanel);
}

var deleteAccordionIcons = document.getElementsByClassName('delete-accordion', 'fas', 'fa-trash', 'fa-bounce');
for (var i = 0; i< deleteAccordionIcons.length; i++) {
    deleteAccordionIcons[i].addEventListener('click', function(e){
        e.stopPropagation();
        const container = e.target.parentNode.parentNode;
        container.parentNode.removeChild(container);
    })
}

addAccordionButton.addEventListener("click",function(){
    const accordionContainer = document.createElement('div');
    const accordionButton = document.createElement('button');
    const accordionTitle = document.createElement('input');
    const deleteAccordionIcon = document.createElement('i');
    const accordionPanel = document.createElement('div');
    const accordionTextArea = document.createElement('textarea');

    deleteAccordionIcon.classList.add('delete-accordion', 'fas', 'fa-trash', 'fa-bounce');
    deleteAccordionIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        const container = e.target.parentNode.parentNode;
        container.parentNode.removeChild(container);
    });

    accordionTitle.placeholder = 'Title...';
    accordionTextArea.placeholder = 'Content...';

    accordionContainer.classList.add('accordion-container');
    accordionButton.classList.add('accordion');
    accordionTitle.classList.add('accordion-input');
    accordionPanel.classList.add('panel');
    accordionTextArea.classList.add('panel-content');

    mainContent.appendChild(accordionContainer);
    accordionContainer.appendChild(accordionButton);
    accordionButton.appendChild(accordionTitle);
    accordionButton.appendChild(deleteAccordionIcon);
    accordionContainer.appendChild(accordionPanel);
    accordionPanel.appendChild(accordionTextArea);

    var newAccordions = document.getElementsByClassName("accordion");
    for (var i = 0; i < newAccordions.length; i++) {
        newAccordions[i].addEventListener("click", showPanel);
    }
});