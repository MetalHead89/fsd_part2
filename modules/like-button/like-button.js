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
    // likeButton.onclick = onClickLikeButton;
}

function onClickLikeButton(buttonObject) {
    let heart = buttonObject.button.children[0]
    let likeCounter = buttonObject.button.children[1]
    likeCounter.innerText = parseInt(likeCounter.innerText) + 1
}

