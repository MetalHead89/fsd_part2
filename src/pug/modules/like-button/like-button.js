'use strict'

class LikeButton {
    constructor(button, checked) {
        this.likeChecked = checked;
        this.likeButton = button;
    }
}

let likeButtons = document.querySelectorAll('.like-button');

for (let likeButton of likeButtons) {
    const checked = likeButton.classList.contains('like-button_cheked') ? true : false;
    let buttonObject = new LikeButton(likeButton, checked);
    buttonObject.likeButton.onclick = () => onClickLikeButton(buttonObject);
}

function onClickLikeButton(buttonObject) {
    let heart = buttonObject.likeButton.children[0]
    let likeCounter = buttonObject.likeButton.children[1]

    if(buttonObject.likeChecked) {
        likeCounter.innerText = parseInt(likeCounter.innerText) - 1;
        heart.innerText = 'favorite_border';
    } else {
        heart.innerText = 'favorite'
        likeCounter.innerText = parseInt(likeCounter.innerText) + 1;
    }

    buttonObject.likeButton.classList.toggle('like-button_cheked');
    buttonObject.likeButton.classList.toggle('like-button_un-cheked');
    buttonObject.likeChecked = !buttonObject.likeChecked
}