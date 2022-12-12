'use strict';

const url = 'http://localhost:3000';

const btnparent = document.querySelector('#btnparent');
const btnmessage = document.querySelector('#btnmessage');
const welcome = document.querySelector('.welcome');
const username = document.querySelector('#username');

let user = JSON.parse(sessionStorage.getItem('user'));

welcome.innerHTML ='Welcome ' + user.FIRST_NAME;
username.innerHTML = user.USERNAME;

btnlist.addEventListener('click', () => {
    location.href="../teacher_studentlist/teacher_studentlist.html"
    getAllUsers();
  });

  btnannouncement.addEventListener('click', () => {
    location.href="../teacher_announcement/teacher_announcement.html"
    getAllUsers();
  });

  