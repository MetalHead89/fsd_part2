import LikeButton from './LikeButton';

const likeButtons = document.querySelectorAll('.js-like-button');
likeButtons.forEach((item) => new LikeButton(item));
