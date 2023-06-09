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
    categoryLinks = document.querySelectorAll('a[data-category]'),
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

    initialUpdateDOM(jsonData);     // jsonData is defined in the html

});

function initialUpdateDOM(data) {
    // create options menu
    for (const category in data) {
        // create list item for category
        let newListItem = document.createElement('li');
        let newCategory = document.createElement('a');
        let deleteCategoryIcon = document.createElement('i');
        deleteCategoryIcon.classList.add('delete-category','fas', 'fa-trash');
        deleteCategoryIcon.style.display = 'none';
        newCategory.setAttribute('href', '#');
        newCategory.style.display = 'inline-block';
        newCategory.textContent = category;
        newCategory.setAttribute('data-category', category);
        newListItem.appendChild(newCategory);
        newListItem.appendChild(deleteCategoryIcon);
        optionsList.insertBefore(newListItem, optionsList.firstChild);

        newCategory.addEventListener('click', () => { 
            highlight(newCategory,deleteCategoryIcon) ;
        });
        newCategory.addEventListener('click', () => {
            selectCategory(newCategory.getAttribute('data-category'));
        })

        deleteCategoryIcon.addEventListener('click',()=>{       
            deleteCategory(deleteCategoryIcon,category);
        })

        const categoryNote = document.createElement('div');
        categoryNote.setAttribute('data-category-notes', category);
        mainContent.appendChild(categoryNote); // append container to main content

        const notes = data[category];
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            const noteTitle = Object.keys(note)[0];
            const noteContent = Object.values(note)[0];
            createInitialAccordions(categoryNote, noteTitle, noteContent);
        }
    }

    optionsContainer.appendChild(optionsList);
}


function createInitialAccordions(categoryNote, title, content) {
    const accordionContainer = document.createElement('div'),
        accordionButton = document.createElement('button'),
        accordionTitle = document.createElement('span'),
        deleteAccordionIcon = document.createElement('i'),
        accordionPanel = document.createElement('div'),
        accordionTextArea = document.createElement('p');

    deleteAccordionIcon.classList.add('delete-accordion', 'fas', 'fa-trash');
    deleteAccordionIcon.addEventListener('click', ()=>{
        deleteAccordion(deleteAccordionIcon,title,content);
    });

    accordionTitle.innerHTML = title;
    accordionTextArea.innerHTML = content;

    accordionContainer.classList.add('accordion-container');
    accordionButton.classList.add('accordion');
    accordionTitle.classList.add('accordion-input');
    accordionTitle.classList.add('accordion-title');
    accordionPanel.classList.add('panel');
    accordionTextArea.classList.add('panel-content');

    accordionButton.appendChild(accordionTitle);
    accordionButton.appendChild(deleteAccordionIcon);
    accordionPanel.appendChild(accordionTextArea);

    accordionContainer.appendChild(accordionButton);
    accordionContainer.appendChild(accordionPanel);

    categoryNote.appendChild(accordionContainer);
    //mainContent.appendChild(categoryNote);
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

function highlight(element,deleteCategoryIcon) {
    deleteIcons = document.querySelectorAll('.delete-category');
    deleteIcons.forEach((icon) => {
        icon.style.display = 'none';
    })
    if (deleteCategoryIcon){
        deleteCategoryIcon.style.display = 'block';
    }
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
    const deleteCategoryIcons = document.querySelectorAll('.delete-category');
    deleteCategoryIcons.forEach((icon)=>{
        icon.style.display = 'none';
    })
    let newListItem = document.createElement('li'),
        newCategory = document.createElement('a');
    let deleteCategoryIcon = document.createElement('i');
    deleteCategoryIcon.classList.add('delete-category','fas', 'fa-trash');
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

    deleteCategoryIcon.addEventListener('click',()=>{       
        deleteCategory(deleteCategoryIcon,input.value);
    })

    // Add the new elements to the DOM
    newListItem.appendChild(newCategory);
    newListItem.appendChild(input);
    optionsList.insertBefore(newListItem, optionsList.firstChild);
    optionsContainer.appendChild(optionsList);

    // Trigger click event on new anchor element to put it into edit mode
    newCategory.click();

    newCategory.addEventListener('click', () => {
        highlight(newCategory,deleteCategoryIcon);
    });
    newCategory.addEventListener('click', () => {
        selectCategory(newCategory.dataset.category);
        newListItem.appendChild(deleteCategoryIcon);
    });
}

// TODO  hide and show panel is problematic

// show only active category, operate on the accordions
document.addEventListener("click", (event) => {
    checkPanelClick(event);
});
// deleteAccordionIcons.forEach(icon => icon.addEventListener('click', deleteAccordion));

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
        // IT SAYS NULL FOR NEXTELEMENT
        event.target.parentNode.nextElementSibling.classList.add('active'); // if user clicks on textArea the accordion remains active
    }
    if (event.target.classList.contains('accordion-input')) {
        event.target.parentNode.nextElementSibling.style.display = 'block';
    }
    if (event.target.classList.contains('save-accordion')) {
        event.target.parentNode.style.display = 'block';
        event.target.parentNode.parentNode.querySelector('.accordion').classList.add('active');
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

function deleteAccordion(icon,titleValue,contentValue) {
    const category = document.querySelector('.selected').getAttribute('data-category');
    // e.stopPropagation();
    const container = icon.closest('.accordion-container');
    fetch('/delete-accordion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category: category,
            titleValue: titleValue,
            contentValue: contentValue
        })
    })
    .then(response => response.text())
    container.classList.add('fade-out');
    setTimeout(() => {
        container.parentNode.removeChild(container);
    }, 200);
}

function deleteCategory(icon,category) {
    const container = icon.closest('li');
    let nextCategory = container.closest('ul');
    let accordions = document.querySelectorAll(`[data-category-notes="${category}"]`);
    fetch('/delete-category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category: category
        })
    })
    .then(response => response.text())
    container.classList.add('fade-out');
    setTimeout(() => {
        container.remove();
        accordions.forEach((accordion) => {
            accordion.classList.add('fade-out');
            accordion.remove();
        })
    }, 200);
    let options = document.querySelectorAll(`[data-category]`);
    for (let i = 0; i < options.length; i++) {
        if (options[i].innerHTML !== category) {
            nextCategory = options[i];
            break;
        }
    }
    setTimeout(()=>{
        nextCategory.click();
    },200);
}

function selectCategory(category) {
    mainContent.style.display = 'block';
    mainMenu.style.display = 'block';
    addAccordionButton.style.display = 'block';
    homeScreen.style.display = 'none';

    let notes = document.querySelectorAll('div[data-category-notes]');
    notes.forEach(note => note.style.display = 'none');

    const notesToShow = document.querySelectorAll(`div[data-category-notes="${category}"]`);

    if (notesToShow) {
        notesToShow.forEach(note => note.style.display = 'block');
    }
}

addAccordionButton.addEventListener("click", addNewAccordion);

function addNewAccordion() {
    const category = document.querySelector('.selected').getAttribute('data-category');
    const accordionContainer = document.createElement('div'),
        accordionButton = document.createElement('button'),
        accordionTitle = document.createElement('input'),
        deleteAccordionIcon = document.createElement('i'),
        saveAccordionIcon = document.createElement('i');
        accordionPanel = document.createElement('div'),
        accordionTextArea = document.createElement('textarea');

    deleteAccordionIcon.classList.add('delete-accordion', 'fas', 'fa-trash');
    deleteAccordionIcon.addEventListener('click', ()=>{
        deleteAccordion(deleteAccordionIcon,accordionTitle.value, accordionTextArea.value);
    });

    saveAccordionIcon.classList.add('save-accordion', 'fas', 'fa-check-to-slot');
    saveAccordionIcon.addEventListener('click', ()=>{
        saveAccordion(accordionContainer,category,accordionTitle.value, accordionTextArea.value);
        
    });

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
    accordionPanel.appendChild(saveAccordionIcon);  
    

    accordionContainer.appendChild(accordionButton);
    accordionContainer.appendChild(accordionPanel);

    let categoryNote = document.querySelector(`div[data-category-notes="${category}"]`);

    if (categoryNote) {
        categoryNote.appendChild(accordionContainer);
        mainContent.appendChild(categoryNote);
        mainContent.insertBefore(categoryNote, mainContent.firstChild);
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

function saveAccordion(container, category, titleValue, contentValue) {
    if (titleValue !== '' && contentValue !== '') {
        fetch('/save-accordion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: category,
                titleValue: titleValue,
                contentValue: contentValue
            })
        })
        .then(response => response.text())
        setTimeout(()=>{
            container.style.border = '2px solid #0e0';
        },300);
        setTimeout(()=>{
            container.style.border = '2px solid white';
        },1000);
    } else {
        alert("Can't save without content");
    }
}

  