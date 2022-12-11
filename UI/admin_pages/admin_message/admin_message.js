'use strict';

const url = 'http://localhost:3000';

const btnparent = document.querySelector('#btnparent');
const btnmessage = document.querySelector('#btnmessage')

btnlist.addEventListener('click', () => {
    location.href="../admin_userlist/admin_userlist.html"
    getAllUsers();
  });

  btnannouncement.addEventListener('click', () => {
    location.href="../admin_announcement/admin_announcement.html"
    getAllUsers();
  });