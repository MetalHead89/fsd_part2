'use strict'

const burger = document.querySelector('.header__burger');
const hideMenu = document.querySelector('.navbar_vertical');
const hideMenuItems = hideMenu.querySelectorAll('.navbar__item_vertical');

burger.onclick = function() {
    if (hideMenu) {
        hideMenu.classList.toggle('navbar_vertical-opened');
        for (let item of hideMenuItems) {
            item.classList.toggle('navbar__item_vertical-opened');
        }
    }
}