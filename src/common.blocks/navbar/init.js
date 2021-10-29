import Navbar from './Navbar';

const navbars = document.querySelectorAll('.js-navbar');
navbars.forEach((item) => new Navbar(item));
