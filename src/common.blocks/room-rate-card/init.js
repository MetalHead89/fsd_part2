import RoomRateCard from './room-rate-card';

const roomRateCards = document.querySelectorAll('.js-room-rate-card');
roomRateCards.forEach((item) => new RoomRateCard(item));
