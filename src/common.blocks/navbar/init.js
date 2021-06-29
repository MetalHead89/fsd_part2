import Navbar from './navbar';

const navbars = document.querySelectorAll('.js-navbar');
navbars.forEach((item) => new Navbar(item));
