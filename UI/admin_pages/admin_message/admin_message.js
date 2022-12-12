'use strict';

const url = 'http://localhost:3000';

const nameofuser = document.querySelector('.username');
const btnparent = document.querySelector('#btnparent');
const btnmessage = document.querySelector('#btnmessage');
let user = JSON.parse(sessionStorage.getItem('user'));

nameofuser.innerHTML = user.USERNAME;

btnlist.addEventListener('click', () => {
    location.href="../admin_userlist/admin_userlist.html"
});

  btnannouncement.addEventListener('click', () => {
    location.href="../admin_announcement/admin_announcement.html"
});

  