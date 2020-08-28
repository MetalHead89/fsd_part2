'use strict'

let entryCheck = false;
const entryBtn = document.querySelector('.navbar__button-entry-container');
const registrationBtn = document.querySelector('.navbar__button-registration-container');
const accountName = document.querySelector('.navbar__account-name');
const separator = document.querySelector('.navbar__separator-item');

entryBtn.onclick = signIn;
accountName.onclick = signIn;

function signIn() {
    if (entryCheck) {
        entryBtn.removeAttribute('style');
        registrationBtn.removeAttribute('style');
        accountName.removeAttribute('style');
        separator.removeAttribute('style');
        entryCheck = false;
    } else {
        entryBtn.style.display = 'none';
        registrationBtn.style.display = 'none';
        accountName.style.display = 'flex'
        accountName.style.paddingRight = 0;
        separator.style.display = 'flex';
        entryCheck = true;
    }
}