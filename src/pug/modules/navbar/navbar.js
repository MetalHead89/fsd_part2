'use strict'

let entryCheck = false;
const entryButtons = document.querySelectorAll('.navbar__button-entry-container');
const registrationButtons = document.querySelectorAll('.navbar__button-registration-container');
const accountNames = document.querySelectorAll('.navbar__account-name');
const separators = document.querySelectorAll('.navbar__separator-item');
const dropdownItems = document.querySelectorAll('.navbar__dropdown-title_vertical');

for (let button of entryButtons) {
    button.onclick = signIn;
}
for (let name of accountNames) {
    name.onclick = signIn;
}

function signIn() {
    if (entryCheck) {
        for (let button of entryButtons) {
            button.removeAttribute('style');
        }
        for (let button of registrationButtons) {
            button.removeAttribute('style');
        }
        for (let name of accountNames) {
            name.removeAttribute('style');
        }
        for (let separator of separators) {
            separator.removeAttribute('style');
        }
        entryCheck = false;
    } else {
        for (let button of entryButtons) {
            button.style.display = 'none';
        }
        for (let button of registrationButtons) {
            button.style.display = 'none';
        }
        for (let name of accountNames) {
            name.style.display = 'flex'
            name.style.paddingRight = 0;
        }
        for (let separator of separators) {
            separator.style.display = 'flex'
        }
        entryCheck = true;
    }
}

for (let item of dropdownItems) {
    console.log('asd')
    item.onclick = function() {
        item.nextElementSibling.classList.toggle('navbar__hidden-list_vertical-opened')
    }
}