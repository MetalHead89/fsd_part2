import RoomCard from './RoomCard';

const roomCards = document.querySelectorAll('.js-room-card');
roomCards.forEach((item) => new RoomCard(item));
