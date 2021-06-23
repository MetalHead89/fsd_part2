import Navbar from './navbar';

const navbars = document.querySelectorAll('.navbar');
navbars.forEach((item) => new Navbar(item));
