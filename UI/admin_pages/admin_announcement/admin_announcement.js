'use strict';

const url = 'http://localhost:3000';

const btnparent = document.querySelector('#btnparent');
const btnmessage = document.querySelector('#btnmessage')

btnparent.addEventListener('click', () => {
    location.href="../admin_userlist/admin_userlist.html"
    getAllUsers();
  });

  btnmessage.addEventListener('click', () => {
    location.href="../admin_message/admin_message.html"
    getAllUsers();
  });