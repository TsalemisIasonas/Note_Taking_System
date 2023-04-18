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
    accordionButtons = document.querySelectorAll(".accordion"),
    deleteAccordionIcons = document.querySelectorAll('.delete-accordion, .fas, .fa-trash, .fa-bounce'),
    categoryLinks = document.querySelectorAll('a[data-category]');

let optionsContainer = document.querySelector('.options-container'),
    optionsList = document.querySelector('.options-list');

// page loads
document.addEventListener('DOMContentLoaded', () => {
    sideMenu.style.left = '0';
    mainContent.classList.add('shifted-right');
    mainMenu.classList.add('shifted-right');
    footer.style.display = 'none';
});

// show footer if user scrolls under all elements
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

// show & hide side menu
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

// update category text color
categoryLinks.forEach(category => category.addEventListener('click', () => {
    highlight(category);
}));

function highlight(element) {
    elementCategory = element.getAttribute('data-category');
    element.classList.add('selected');
    document.getElementById('notes-menu-header').innerHTML = 'My Notes - ' + elementCategory;
    for (var i = 0; i < document.querySelectorAll('a[data-category]').length; i++) {
        if (document.querySelectorAll('a[data-category]')[i] != element) {
            document.querySelectorAll('a[data-category]')[i].classList.remove('selected');
        }
    }
}

// create new categories
addOptionButton.addEventListener('click', addNewOption);

function addNewOption() {
    let newListItem = document.createElement('li'),
        newCategory = document.createElement('a');

    newCategory.setAttribute('href', '#');
    newCategory.setAttribute('data-category', 'New Option');
    newCategory.textContent = 'New Option';

    newListItem.appendChild(newCategory);
    optionsList.insertBefore(newListItem, optionsList.firstChild);
    optionsContainer.appendChild(optionsList);

    newCategory.addEventListener('click', () => {
        highlight(newCategory);
    });
    newCategory.addEventListener('click', () => {
        selectCategory(newCategory.dataset.category);
    });

}


// show only active category, operate on the accordions
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("accordion")) { // Check if the clicked element is an accordion
        showPanel(event.target);
    }
});
deleteAccordionIcons.forEach(icon => icon.addEventListener('click', deleteAccordion));
document.querySelectorAll('a[data-category]').forEach(a => a.addEventListener('click', function () {
    selectCategory(this.dataset.category);
}));

function showPanel(element) {
    element.classList.toggle('active');
    let panel = element.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}

function deleteAccordion(e) {
    e.stopPropagation();
    const container = e.target.closest('.accordion-container');
    container.parentNode.removeChild(container);
}

function selectCategory(category) {
    let notes = document.querySelectorAll('div[data-category-notes]');
    notes.forEach(note => note.style.display = 'none');

    const notesToShow = document.querySelector(`div[data-category-notes="${category}"]`);

    if (notesToShow) {
        notesToShow.style.display = 'block';
    }
}

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

    newAccordions.forEach(button => button.addEventListener("click", () => {
        showPanel(button);
    }));

    let categoryNote = document.querySelector(`div[data-category-notes="${category}"]`);

    if (categoryNote) {
        categoryNote.appendChild(accordionContainer);
        mainContent.appendChild(categoryNote);
    }
    else {
        categoryNote = document.createElement('div');
        categoryNote.setAttribute('data-category-notes', category);
        categoryNote.appendChild(accordionContainer);
        mainContent.appendChild(categoryNote);
    }
}
