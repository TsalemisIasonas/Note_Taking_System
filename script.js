const showMenuButton = document.getElementById('show-menu');
const hideMenuButton = document.getElementById('hide-menu');
const sideMenu = document.getElementById('side-menu');
const sideMenuList = sideMenu.getElementsByClassName('options-list');
const mainContent = document.getElementsByClassName('main-content')[0];
const mainMenu = document.getElementsByClassName('notes-menu')[0];
const mainMenuElements = mainMenu.getElementsByClassName('notes-menu-elements')[0];
const footer = document.getElementById("my-footer");
const addOptionButton = document.getElementById('add_option_button');
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

addOptionButton.addEventListener('click',function(){
    let optionsContainer = document.querySelector('.options-container');
    let optionsList = document.querySelector('.options-list');
    let newListItem = document.createElement('li');
    let newCategory = document.createElement('a');
    newCategory.setAttribute('href','#');
    newCategory.setAttribute('data-category','New Option');
    newCategory.innerHTML = 'New Option'
    newListItem.appendChild(newCategory);
    optionsList.appendChild(newListItem);
    optionsContainer.appendChild(optionsList);
})



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

// categories
var categoryLinks = document.querySelectorAll('a[data-category]');

for (var i = 0; i < categoryLinks.length; i++) {
  categoryLinks[i].addEventListener('click', function(e) {
    let constMenuHeader = document.querySelector('#notes-menu-header');
    e.preventDefault();
    category = this.getAttribute('data-category');
    this.classList.add('selected');
    constMenuHeader.innerHTML = 'My Notes - ' + category;
    for (var i = 0; i < categoryLinks.length; i++) {
        if (this != categoryLinks[i]){
            categoryLinks[i].classList.remove('selected');
        }
    }
    var notes = document.querySelectorAll('div[data-category-notes]');
    for (var j = 0; j < notes.length; j++) {
      notes[j].style.display = 'none';
    }
    var notesToShow = document.querySelector(`div[data-category-notes="${category}"]`);
    if (notesToShow) {
      notesToShow.style.display = 'block';
    }
  });
}

addAccordionButton.addEventListener("click",function(){
    var category = document.querySelector('.selected').getAttribute('data-category');
    console.log(category);
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

    
    accordionContainer.appendChild(accordionButton);
    accordionButton.appendChild(accordionTitle);
    accordionButton.appendChild(deleteAccordionIcon);
    accordionContainer.appendChild(accordionPanel);
    accordionPanel.appendChild(accordionTextArea);

    var newAccordions = document.getElementsByClassName("accordion");
    for (var i = 0; i < newAccordions.length; i++) {
        newAccordions[i].addEventListener("click", showPanel);
    }

    let categoryNote = document.querySelector(`div[data-category-notes="${category}"]`);
    if (categoryNote) {
      categoryNote.appendChild(accordionContainer);
      mainContent.appendChild(categoryNote);
    }
    else {
        categoryNote = document.createElement('div');
        categoryNote.setAttribute('data-category-notes',category);
        categoryNote.appendChild(accordionContainer);
        mainContent.appendChild(categoryNote);
        console.log(categoryNote);
    }
});
