import RoomCard from './room-card';

const roomCards = document.querySelectorAll('.js-room-card');
roomCards.forEach((item) => new RoomCard(item));
