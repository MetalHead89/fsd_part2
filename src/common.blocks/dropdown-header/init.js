import DropdownHeader from './DropdownHeader';
import DropdownHeaderStore from './DropdownHeaderStore';

const headers = document.querySelectorAll('.js-dropdown-header');

headers.forEach((header) => DropdownHeaderStore.addHeader(new DropdownHeader(header)));
