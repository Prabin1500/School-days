'use strict';

const url = 'http://localhost:3000';

const nameofuser = document.querySelector('.username');
const btnannouncement = document.querySelector('#btnannouncement')
const welcome = document.querySelector('.welcome');

let user = JSON.parse(sessionStorage.getItem('user'));

welcome.innerHTML ='Welcome ' + user.FIRST_NAME;
nameofuser.innerHTML = user.USERNAME;

btnannouncement.addEventListener('click', () => {
  location.href="../parent_announcement/parent_announcement.html"
  getAllUsers();
});



  