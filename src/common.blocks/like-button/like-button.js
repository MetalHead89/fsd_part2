class LikeButton {
  constructor(button) {
    this._likeButton = button;
    this._isLikeChecked = this._likeButton.classList.contains(
      'like-button_checked',
    );
    this._handleLikeButtonClick = this._handleLikeButtonClick.bind(this);

    this._addEventListeners();
  }

  _addEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeButtonClick);
  }

  _likeToggle() {
    this._isLikeChecked = !this._isLikeChecked;
  }

  _handleLikeButtonClick() {
    const heart = this._likeButton.children[0];
    const likeCounter = this._likeButton.children[1];

    if (this._isLikeChecked) {
      likeCounter.innerText = parseInt(likeCounter.innerText, 10) - 1;
      heart.innerText = 'favorite_border';
    } else {
      heart.innerText = 'favorite';
      likeCounter.innerText = parseInt(likeCounter.innerText, 10) + 1;
    }

    this._likeButton.classList.toggle('like-button_checked');
    this._likeToggle();
  }
}

export default LikeButton;
