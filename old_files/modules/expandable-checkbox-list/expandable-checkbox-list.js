'use strict'

let isHide = true
const checkboxListTitle = document.querySelector('.expandable-checkbox-list__title');
const hideList = document.querySelector('.expandable-checkbox-list__hide-list');
checkboxListTitle.onclick = clickToCheckboxListTitle;

function clickToCheckboxListTitle() {
    if(isHide) {
        hideList.style.display = 'block';
    } else {
        hideList.style.display = 'none';
    }

    isHide = !isHide;
}
