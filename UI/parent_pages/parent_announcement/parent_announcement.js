'use strict';

const welcome = document.querySelector('.welcome');

let user = JSON.parse(sessionStorage.getItem('user'));

console.log(user);

welcome.innerHTML ='Welcome ' + user.FIRST_NAME;