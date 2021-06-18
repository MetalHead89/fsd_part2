class LikeButton {
  constructor(button, isChecked) {
    this.isLikeChecked = isChecked;
    this.likeButton = button;
  }

  likeToggle() {
    this.isLikeChecked = !this.isLikeChecked;
  }
}

const likeButtons = document.querySelectorAll('.js-like-button');

function onClickLikeButton(buttonObject) {
  const heart = buttonObject.likeButton.children[0];
  const likeCounter = buttonObject.likeButton.children[1];

  if (buttonObject.isLikeChecked) {
    likeCounter.innerText = parseInt(likeCounter.innerText, 10) - 1;
    heart.innerText = 'favorite_border';
  } else {
    heart.innerText = 'favorite';
    likeCounter.innerText = parseInt(likeCounter.innerText, 10) + 1;
  }

  buttonObject.likeButton.classList.toggle('like-button_checked');
  buttonObject.likeToggle();
}

for (let likeIndex = 0; likeIndex < likeButtons.length; likeIndex += 1) {
  const likeButton = likeButtons[likeIndex];
  const isChecked = likeButton.classList.contains('like-button_checked');
  const buttonObject = new LikeButton(likeButton, isChecked);
  buttonObject.likeButton.onclick = () => onClickLikeButton(buttonObject);
}
