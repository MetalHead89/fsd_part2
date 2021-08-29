/* eslint-disable no-new */

import RoomRateCard from './room-rate-card';
import DateDropdownStore from '../date-dropdown/date-dropdown-store';

require('../date-dropdown/init');

const roomRateCards = document.querySelectorAll('.js-room-rate-card');

roomRateCards.forEach((roomRateCard) => {
  const dateDropdown = DateDropdownStore.getDateDropdownByElement(
    roomRateCard.querySelector('.js-date-dropdown')
  );

  new RoomRateCard(roomRateCard, dateDropdown);
});
