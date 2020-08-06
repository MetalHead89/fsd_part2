'use strict'

let isHide = true
const checkboxListTitleSection = document.querySelector('.expandable-checkbox-list__title-section');
const hideList = document.querySelector('.expandable-checkbox-list__hide-list');
let expandMore = document.querySelector('.expandable-checkbox-list__expand-more');

checkboxListTitleSection.onclick = clickToCheckboxListTitleSection;

function clickToCheckboxListTitleSection() {
    if(isHide) {
        hideList.style.display = 'block';
        expandMore.style.transform = 'rotate(180deg)';
    } else {
        hideList.style.display = 'none';
        expandMore.style.transform = 'rotate(0deg)';
    }

    isHide = !isHide;
}
