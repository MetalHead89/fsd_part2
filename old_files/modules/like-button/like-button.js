'use strict'

class LikeButton {
    constructor(button) {
        this.likeChecked = false;
        this.likeButton = button;
    }
}

let likeButtons = document.querySelectorAll('.like-button');

for (let likeButton of likeButtons) {
    let buttonObject = new LikeButton(likeButton);
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
    buttonObject.likeChecked = !buttonObject.likeChecked
}

