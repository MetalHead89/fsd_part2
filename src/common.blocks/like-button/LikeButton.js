import { boundMethod } from 'autobind-decorator';

class LikeButton {
  constructor(button) {
    this._likeButton = button;
    this._isLikeChecked = this._likeButton.classList.contains(
      'like-button_checked'
    );

    this._addEventListeners();
  }

  _addEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeButtonClick);
  }

  _likeToggle() {
    this._isLikeChecked = !this._isLikeChecked;
  }

  @boundMethod
  _handleLikeButtonClick() {
    const heart = this._likeButton.querySelector('.js-like-button__heart');
    const likeCounter = this._likeButton.querySelector(
      '.js-like-button__like-counter'
    );

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
