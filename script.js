const showMenuButton = document.getElementById('show-menu'),
      hideMenuButton = document.getElementById('hide-menu'),
      sideMenu = document.getElementById('side-menu'),
      sideMenuList = sideMenu.getElementsByClassName('options-list')[0],
      mainContent = document.querySelector('.main-content'),
      mainMenu = document.querySelector('.notes-menu'),
      mainMenuElements = mainMenu.querySelector('.notes-menu-elements'),
      footer = document.getElementById("my-footer"),
      addOptionButton = document.getElementById('add_option_button'),
      addAccordionButton = document.getElementById("add-accordion-button"),
      accordionButtons = document.getElementsByClassName("accordion"),
      deleteAccordionIcons = document.querySelectorAll('.delete-accordion, .fas, .fa-trash, .fa-bounce'),
      categoryLinks = document.querySelectorAll('a[data-category]');

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
});

showMenuButton.addEventListener('click', () => {
    showSideMenu(true);
});

hideMenuButton.addEventListener('click', () => {
    showSideMenu(false);
});

function showSideMenu(show) {
    const fadeClassIn = show ? 'fade-in-right' : 'fade-out-left';
    const fadeClassOut = show ? 'fade-out-left' : 'fade-in-right';

    sideMenu.classList.add(fadeClassIn);
    sideMenu.classList.remove(fadeClassOut);
    showMenuButton.classList.toggle('flip-button', !show);
    hideMenuButton.classList.toggle('flip-button', show);
    mainContent.classList.toggle('shifted-right', show);
    mainMenu.classList.toggle('shifted-right', show);
    mainMenuElements.classList.toggle('fullscreen-width', !show);
}

addOptionButton.addEventListener('click', addNewOption);

function addNewOption() {
    let optionsContainer = document.querySelector('.options-container'),
        optionsList = document.querySelector('.options-list'),
        newListItem = document.createElement('li'),
        newCategory = document.createElement('a');

    newCategory.setAttribute('href','#');
    newCategory.setAttribute('data-category','New Option');
    newCategory.textContent = 'New Option';
    newListItem.appendChild(newCategory);
    optionsList.insertBefore(newListItem,optionsList.firstChild);
    optionsContainer.appendChild(optionsList);

    accordionButtons.forEach(button => button.addEventListener("click", showPanel));
    deleteAccordionIcons.forEach(icon => icon.addEventListener('click', deleteAccordion));
    categoryLinks.forEach(link => link.addEventListener('click', selectCategory));
}

function deleteAccordion(e) {
    e.stopPropagation();
    const container = e.target.closest('.accordion-container');
    container.parentNode.removeChild(container);
}

function selectCategory(e) {
    let constMenuHeader = document.querySelector('#notes-menu-header');
    e.preventDefault();
    const category = this.getAttribute('data-category');

    this.classList.add('selected');
    constMenuHeader.textContent = `My Notes - ${category}`;

    categoryLinks.forEach(link => {
        if (this !== link){
            link.classList.remove('selected');
        }
    });

    var notes = document.querySelectorAll('div[data-category-notes]');

    notes.forEach(note => note.style.display = 'none');

    const notesToShow = document.querySelector(`div[data-category-notes="${category}"]`);

    if (notesToShow) {
        notesToShow.style.display = 'block';
    }
}

accordionButtons.forEach(button => button.addEventListener("click", showPanel));
deleteAccordionIcons.forEach(icon => icon.addEventListener('click', deleteAccordion));
categoryLinks.forEach(link => link.addEventListener('click', selectCategory));

addAccordionButton.addEventListener("click", addNewAccordion);

function addNewAccordion() {
    const category = document.querySelector('.selected').getAttribute('data-category');

    const accordionContainer = document.createElement('div'),
          accordionButton = document.createElement('button'),
          accordionTitle = document.createElement('input'),
          deleteAccordionIcon = document.createElement('i'),
          accordionPanel = document.createElement('div'),
          accordionTextArea = document.createElement('textarea');

    deleteAccordionIcon.classList.add('delete-accordion', 'fas', 'fa-trash', 'fa-bounce');
    deleteAccordionIcon.addEventListener('click', deleteAccordion);

    accordionTitle.placeholder = 'Title...';
    accordionTextArea.placeholder = 'Content...';

    accordionContainer.classList.add('accordion-container');
    accordionButton.classList.add('accordion');
    accordionTitle.classList.add('accordion-input');
    accordionPanel.classList.add('panel');
    accordionTextArea.classList.add('panel-content');

    accordionButton.appendChild(accordionTitle);
    accordionButton.appendChild(deleteAccordionIcon);
    accordionPanel.appendChild(accordionTextArea);

    accordionContainer.appendChild(accordionButton);
    accordionContainer.appendChild(accordionPanel);

    const newAccordions = document.querySelectorAll(".accordion");

    newAccordions.forEach(button => button.addEventListener("click", showPanel));

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
    }
}
