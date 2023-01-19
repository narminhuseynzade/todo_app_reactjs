'use strict';

let themeButton = document.querySelector('.theme-btn');
let themeButtonImage = document.querySelector('.theme-icon');
let userForm = document.querySelector('.user-form');
let userList = document.querySelector('.list');
let clearCompletedBtn = document.querySelector('.clear-completed');
let counter = document.querySelector('.count');
let allListBtn = document.querySelector('.all');

let allList = [];
let activeList = [];
let completedList = [];

// dark mode handler 
themeButton.addEventListener('click', function(){
    if (document.documentElement.dataset.theme === 'dark') {
        document.documentElement.dataset.theme = 'light';  
        themeButtonImage.src = 'assets/images/icon-moon.svg';
    }
    else {
        document.documentElement.dataset.theme = 'dark';  
        themeButtonImage.src = 'assets/images/icon-sun.svg';
    }
}); 


userForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let {checkbox, text} = userForm.elements;
    if (text.value.length === 0) {
        alert('Please, enter something.');
    }
    else {
        display(allList);

        let newItem = `
        <div class="list-item">
            <div class="list-container">
                <input class="list-item-checkbox" type="checkbox" >
                <p class="text">${text.value}</p>
            </div>

            <button class="delete" type="button">
                <img src="./assets/images/icon-cross.svg" aria-label="delete">
            </button>
        </div>
        `
        userList.insertAdjacentHTML('afterbegin', newItem);
        counter.textContent++;
        allList.push(userList.children[0]);

        if (checkbox.checked) {
            document.querySelector('.list-item-checkbox').checked = true;
            document.querySelector('.text').classList.add('line-through');
            counter.textContent--;
            completedList.push(userList.children[0]);
        }else {
            activeList.push(userList.children[0]);
        }

        document.querySelector('.list-item-checkbox').addEventListener('click', checkCompleted); 
        document.querySelector('.delete').addEventListener('click', function() {
            deleteITem(this);
        });

        text.value = '';
        checkbox.checked = false;
    }
});

function checkCompleted() {
    let text = this.parentElement.children[1];
    let container = this.parentElement.parentElement;
    if (this.checked) {
        text.classList.add('line-through');
        counter.textContent--;
        completedList.push(container);
        activeList.splice(activeList.indexOf(container), 1);
    }else {
        text.classList.remove('line-through');
        counter.textContent++;
        completedList.splice(completedList.indexOf(container), 1);
        activeList.push(container);
    }

}

function deleteITem(element) {
    element.parentElement.remove();
    let container = element.parentElement.children[0];
    if (!container.children[0].checked){
        counter.textContent--;
    }

    // removing from lists
    allList.splice(allList.indexOf(element.parentElement), 1);

    if (completedList.indexOf(element.parentElement) !== -1) {
        completedList.splice(completedList.indexOf(element.parentElement), 1);
    } else {
        activeList.splice(activeList.indexOf(element.parentElement), 1);
    }
}

clearCompletedBtn.addEventListener('click', function() {
    document.querySelectorAll('.list-item-checkbox').forEach(function (element) {
        if (element.checked) {
            deleteITem(element.parentElement);
        }
    });
});

function display(array) {
    let [...userListArray] = userList.children;
    for (let elem of userListArray) {
        if (elem.className === 'list-item') {
            elem.remove();
        }
    }
   
    for (let elem of array) {
        userList.insertAdjacentElement('afterbegin', elem);
    }
}


// filtr buttons
document.querySelectorAll('.all').forEach(function(elem) {
    elem.addEventListener('click', function() {
        display(allList);
    });
});

document.querySelectorAll('.active').forEach(function(elem) {
    elem.addEventListener('click', function() {
        display(activeList);
    });
});

document.querySelectorAll('.completed').forEach(function(elem) {
    elem.addEventListener('click', function() {
        display(completedList);
    });
});