class LikeButton {
  constructor(button, checked) {
    this.likeChecked = checked;
    this.likeButton = button;
  }

  likeToggle() {
    this.likeChecked = !this.likeChecked;
  }
}

const likeButtons = document.querySelectorAll('.like-button');

function onClickLikeButton(buttonObject) {
  const heart = buttonObject.likeButton.children[0];
  const likeCounter = buttonObject.likeButton.children[1];

  if (buttonObject.likeChecked) {
    likeCounter.innerText = parseInt(likeCounter.innerText, 10) - 1;
    heart.innerText = 'favorite_border';
  } else {
    heart.innerText = 'favorite';
    likeCounter.innerText = parseInt(likeCounter.innerText, 10) + 1;
  }

  buttonObject.likeButton.classList.toggle('like-button_checked');
  buttonObject.likeButton.classList.toggle('like-button_unchecked');
  buttonObject.likeToggle();
}

for (let likeIndex = 0; likeIndex < likeButtons.length; likeIndex += 1) {
  const likeButton = likeButtons[likeIndex];
  const checked = likeButton.classList.contains('like-button_checked');
  const buttonObject = new LikeButton(likeButton, checked);
  buttonObject.likeButton.onclick = () => onClickLikeButton(buttonObject);
}
