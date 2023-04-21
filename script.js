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
    deleteAccordionIcons = document.querySelectorAll('.delete-accordion, .fas, .fa-trash'),
    categoryLinks = document.querySelectorAll('a[data-category]');
homeScreen = document.querySelector('#home-screen-container');

let optionsContainer = document.querySelector('.options-container'),
    optionsList = document.querySelector('.options-list');

// page loads
document.addEventListener('DOMContentLoaded', () => {
    sideMenu.style.left = '0';
    mainContent.classList.add('shifted-right');
    mainMenu.classList.add('shifted-right');
    homeScreen.classList.add('shifted-right');
    footer.style.display = 'none';
    mainContent.style.display = 'none';
    mainMenu.style.display = 'none';
    addAccordionButton.style.display = 'none';
    // get data
    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            initialUpdateDOM(data);
        })
        .catch(error => {
            alert('Error fetching data:', error);
        });
});

function initialUpdateDOM(data) {
    for (const category in data) {
      let newListItem = document.createElement('li');
      let newCategory = document.createElement('a');
      newCategory.setAttribute('href', '#');
      newCategory.style.display = 'inline-block';
      newCategory.textContent = category;
      newCategory.setAttribute('data-category', category);
      newListItem.appendChild(newCategory);
      optionsList.insertBefore(newListItem, optionsList.firstChild);
      newCategory.addEventListener('click', () => { highlight(newCategory) });
      newCategory.addEventListener('click', () => {
        selectCategory(newCategory.getAttribute('data-category'));
      })
      const notes = data[category];
      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const noteTitle = Object.keys(note)[0];
        const noteContent = Object.values(note)[0];
        const accordionId = `${category}-${i}`;
        createInitialAccordions(accordionId, noteTitle, noteContent);
        console.log(`created ${i} accordion`);
      }
    }
    optionsContainer.appendChild(optionsList);
  }
  
  function createInitialAccordions(id, title, content) {
    const categoryNote = document.createElement('div'),
      accordionContainer = document.createElement('div'),
      accordionButton = document.createElement('button'),
      accordionTitle = document.createElement('span'),
      deleteAccordionIcon = document.createElement('i'),
      accordionPanel = document.createElement('div'),
      accordionTextArea = document.createElement('p');
  
    deleteAccordionIcon.classList.add('delete-accordion', 'fas', 'fa-trash');
    deleteAccordionIcon.addEventListener('click', deleteAccordion);
  
    accordionTitle.innerHTML = title;
    accordionTextArea.innerHTML = content;
  
    categoryNote.setAttribute('id', id);
    accordionTitle.classList.add('accordion-title');
  
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
  
    categoryNote.appendChild(accordionContainer);
    mainContent.appendChild(categoryNote);
    console.log(categoryNote);
  }
  

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
    homeScreen.classList.toggle('shifted-right', show);
    mainMenuElements.classList.toggle('fullscreen-width', !show);
}

// update category text color
categoryLinks.forEach(category => category.addEventListener('click', () => {
    highlight(category);
}));

function highlight(element) {
    console.log(element);
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
    // newCategory.setAttribute('data-category', '');
    // newCategory.textContent = 'New Option';

    // Create a hidden input element for editing
    const input = document.createElement('input');
    input.classList.add('new-category-input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'New Option');
    input.style.display = 'none';

    // Attach event listeners to the new elements
    newCategory.addEventListener('click', showInput);
    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            create();
        }
    });
    input.addEventListener('blur', () => {
        create();
    });

    function showInput() {
        newCategory.style.display = 'none';
        input.style.display = 'inline-block';
        input.focus();
        newCategory.removeEventListener('click', showInput);
    }

    function create() {
        newCategory.style.display = 'inline-block';
        newCategory.textContent = input.value;
        newCategory.setAttribute('data-category', input.value);
        input.style.display = 'none';
    }

    // Add the new elements to the DOM
    newListItem.appendChild(newCategory);
    newListItem.appendChild(input);
    optionsList.insertBefore(newListItem, optionsList.firstChild);
    optionsContainer.appendChild(optionsList);

    // Trigger click event on new anchor element to put it into edit mode
    newCategory.click();

    newCategory.addEventListener('click', () => {
        highlight(newCategory);
    });
    newCategory.addEventListener('click', () => {
        selectCategory(newCategory.dataset.category);
    });

}

// TODO  hide and show panel is problematic

// show only active category, operate on the accordions
document.addEventListener("click", (event) => {
    checkPanelClick(event);
});
deleteAccordionIcons.forEach(icon => icon.addEventListener('click', deleteAccordion));

document.querySelectorAll('a[data-category]').forEach(a => a.addEventListener('click', function () {
    selectCategory(this.dataset.category);
}));



function checkPanelClick(event) {
    if (event.target.classList.contains("accordion")) { // Check if the clicked element is an accordion
        document.querySelectorAll('.panel').forEach(panel => panel.style.display = 'none');
        showPanel(event.target);
    }
    if ((!event.target.classList.contains('accordion'))) {
        document.querySelectorAll('.panel').forEach(panel => panel.style.display = 'none');
        hidePanel(event.target);
    }
    if (event.target.classList.contains('panel-content')) {
        event.target.parentNode.style.display = 'block';
    }
    if (event.target.classList.contains('accordion-input')) {
        event.target.parentNode.nextElementSibling.style.display = 'block';
    }
}

function showPanel(element) {
    let panel = element.nextElementSibling;
    hidePanel(element);
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        panel.style.display = "none";
    }
    else {
        element.classList.add('active');
        panel.style.display = "block";
    }

}

function hidePanel(element) {
    let active = document.querySelector('.accordion.active');
    if (active && active != element) {
        active.classList.remove('active');
        active.nextElementSibling.style.display = "none";
    }
}

function deleteAccordion(e) {
    e.stopPropagation();
    const container = e.target.closest('.accordion-container');
    container.classList.add('fade-out');
    setTimeout(() => {
        container.parentNode.removeChild(container);
    }, 200);
}

function selectCategory(category) {
    mainContent.style.display = 'block';
    mainMenu.style.display = 'block';
    addAccordionButton.style.display = 'block';
    homeScreen.style.display = 'none';

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

    deleteAccordionIcon.classList.add('delete-accordion', 'fas', 'fa-trash');
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

    // setTimeout(() => {
    //     accordionButton.click();
    //     accordionButton.classList.add('active');
    //     accordionTitle.click();
    // }, 0);

}
