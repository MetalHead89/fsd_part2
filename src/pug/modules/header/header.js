'use strict'

let entryCheck = false;
const entryBtn = document.querySelector('.header__button-entry-container');
const registrationBtn = document.querySelector('.header__button-registration-container');
const accountName = document.querySelector('.header__account-name');

entryBtn.onclick = signIn;
accountName.onclick = signIn;

function signIn() {
    if (entryCheck) {
        entryBtn.removeAttribute('style');
        registrationBtn.removeAttribute('style');
        accountName.removeAttribute('style');
        entryCheck = false;
    } else {
        entryBtn.style.display = 'none';
        registrationBtn.style.display = 'none';
        accountName.style.display = 'flex'
        accountName.style.paddingRight = 0;
        entryCheck = true;
    }
}