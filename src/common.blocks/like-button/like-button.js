class LikeButton {
  constructor(button) {
    this.likeButton = button;
    this.isLikeChecked = this.likeButton.classList.contains(
      'like-button_checked',
    );
    this.addEventListeners();
  }

  addEventListeners() {
    this.likeButton.addEventListener(
      'click',
      this.handleLikeButtonClick.bind(this),
    );
  }

  likeToggle() {
    this.isLikeChecked = !this.isLikeChecked;
  }

  handleLikeButtonClick() {
    const heart = this.likeButton.children[0];
    const likeCounter = this.likeButton.children[1];

    if (this.isLikeChecked) {
      likeCounter.innerText = parseInt(likeCounter.innerText, 10) - 1;
      heart.innerText = 'favorite_border';
    } else {
      heart.innerText = 'favorite';
      likeCounter.innerText = parseInt(likeCounter.innerText, 10) + 1;
    }

    this.likeButton.classList.toggle('like-button_checked');
    this.likeToggle();
  }
}

export default LikeButton;
